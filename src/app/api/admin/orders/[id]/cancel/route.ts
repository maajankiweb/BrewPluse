import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import { Order, saveRuntimeOrder } from '@/lib/models/Order';
import { requireStaff } from '@/lib/authService';
import { syncLiveOrderToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const CancelOrderSchema = z.object({
  reason: z.string().min(1, 'Cancellation reason is required').max(300),
});

/**
 * POST /api/admin/orders/:id/cancel
 * Roles: owner, manager
 * Cancels an active order. If paid online, flags refund_pending for manager/settlement review.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager']);
    if (!auth.authorized) {
      return auth.response;
    }

    const { id: orderIdOrNum } = await params;
    if (!orderIdOrNum) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Order ID is required' } },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    const parsed = CancelOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid cancellation request',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const storeId = auth.storeSlug;
    const conn = await connectMongoDB();
    let order: any = null;

    if (conn) {
      try {
        order = await Order.findOne({
          storeId,
          $or: [{ _id: orderIdOrNum.match(/^[0-9a-fA-F]{24}$/) ? orderIdOrNum : null }, { orderNumber: orderIdOrNum }],
        });
      } catch (err) {}
    }

    if (!order) {
      const list = global.runtimeOrders?.[storeId] || [];
      order = list.find(
        (o) => String(o._id || o.id) === orderIdOrNum || o.orderNumber === orderIdOrNum
      );
    }

    if (!order) {
      return NextResponse.json(
        { error: { code: 'ORDER_NOT_FOUND', message: 'Order not found for your store' } },
        { status: 404 }
      );
    }

    if (['served', 'completed'].includes(order.status)) {
      return NextResponse.json(
        {
          error: {
            code: 'CANNOT_CANCEL',
            message: `Cannot cancel order with status '${order.status}'. Items have already been delivered.`,
          },
        },
        { status: 409 }
      );
    }

    const isPaid = order.paymentStatus === 'paid';
    const cancellationNote = `CANCELLED (${auth.user.role} ${auth.user.email || ''}): ${parsed.data.reason}`;

    order.status = 'cancelled';
    order.notes = order.notes ? `${order.notes} | ${cancellationNote}` : cancellationNote;
    if (isPaid) {
      (order as any).refundPending = true;
    }

    if (conn && typeof order.save === 'function') {
      try {
        await order.save();
      } catch (err) {}
    }

    const updatedOrderPlain = {
      ...((order.toObject && order.toObject()) || order),
      id: String(order._id || order.id),
      status: 'cancelled',
      refundPending: isPaid,
      updatedAt: new Date(),
    };
    saveRuntimeOrder(updatedOrderPlain);

    // Sync to Firestore
    syncLiveOrderToFirestore(String(order.orderNumber || order._id || order.id), {
      storeId,
      status: 'cancelled',
      tableNumber: order.table,
      total: order.total,
      paymentStatus: isPaid ? 'refund_pending' : order.paymentStatus,
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      order: updatedOrderPlain,
      refundPending: isPaid,
      message: isPaid
        ? 'Order cancelled. An online refund has been flagged for settlement.'
        : 'Order cancelled successfully.',
    });
  } catch (error: any) {
    console.error('[Admin Order Cancel Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to cancel order' } },
      { status: 500 }
    );
  }
}
