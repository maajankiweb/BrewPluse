import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import { Order, saveRuntimeOrder } from '@/lib/models/Order';
import { TableSession, saveRuntimeSession } from '@/lib/models/TableSession';
import { requireStaff } from '@/lib/authService';
import { isValidOrderTransition } from '@/lib/orderStateMachine';
import { syncLiveOrderToFirestore } from '@/lib/firebaseAdmin';
import { logPaymentAudit } from '@/lib/auditLog';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: { id: string };
}

const UpdateStatusSchema = z.object({
  status: z.enum([
    'placed',
    'accepted',
    'preparing',
    'ready',
    'served',
    'completed',
    'cancelled',
  ]),
  notes: z.string().max(200).optional(),
});

/**
 * PATCH /api/admin/orders/:id/status
 * Roles: owner, manager, cashier, chef, barista
 * Validates state-machine transitions and mirrors update to Firestore liveOrders.
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager', 'cashier', 'chef', 'barista']);
    if (!auth.authorized) {
      return auth.response;
    }

    const orderIdOrNum = params.id;
    if (!orderIdOrNum) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Order ID is required' } },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    const parsed = UpdateStatusSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid status payload',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const targetStatus = parsed.data.status;
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

    // Fallback to runtime memory cache
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

    const currentStatus = order.status || 'placed';

    // State machine transition verification
    const check = isValidOrderTransition(currentStatus, targetStatus);
    if (!check.valid) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_TRANSITION',
            message: check.reason,
            currentStatus,
            targetStatus,
          },
        },
        { status: 409 }
      );
    }

    // Set timestamps
    const now = new Date();
    const timestamps = order.timestamps || {};
    if (targetStatus === 'accepted' && !timestamps.acceptedAt) {
      timestamps.acceptedAt = now;
    } else if (targetStatus === 'ready' && !timestamps.readyAt) {
      timestamps.readyAt = now;
    } else if (targetStatus === 'served' && !timestamps.servedAt) {
      timestamps.servedAt = now;
    }

    order.status = targetStatus;
    order.timestamps = timestamps;
    if (parsed.data.notes) {
      order.notes = order.notes ? `${order.notes} | ${parsed.data.notes}` : parsed.data.notes;
    }

    // Handle paid order cancellation -> refund_pending & session recalculation (Spec §9.11, §10 Case 13)
    let refundPendingFlag = false;
    if (targetStatus === 'cancelled') {
      if (order.paymentStatus === 'paid') {
        order.paymentStatus = 'refund_pending';
        refundPendingFlag = true;

        logPaymentAudit({
          storeId,
          sessionId: order.sessionId || 'default',
          orderId: String(order._id || order.id),
          amountPaise: Math.round((order.total || 0) * 100),
          method: order.paymentMode || 'online',
          receivedBy: {
            staffId: auth.user?.uid,
            email: auth.user?.email,
            role: auth.user?.role,
          },
          action: 'refund_flagged',
          notes: `Order ${order.orderNumber} cancelled by staff after payment. Flagged for refund review.`,
        });
      }

      // Recalculate session totals if order belonged to an active session
      if (order.sessionId) {
        let session: any = null;
        if (conn) {
          try {
            session = await TableSession.findById(order.sessionId);
          } catch (e) {}
        }
        if (!session) {
          const allRuntime = Object.values(global.runtimeTableSessions || {}).flat();
          session = allRuntime.find((s) => s.id === order.sessionId);
        }

        if (session && session.totals) {
          const orderTotalPaise = Math.round((order.total || 0) * 100);
          const orderSubtotalPaise = Math.round((order.subtotal || 0) * 100);
          session.totals.grandTotal = Math.max(0, (session.totals.grandTotal || 0) - orderTotalPaise);
          session.totals.subtotal = Math.max(0, (session.totals.subtotal || 0) - orderSubtotalPaise);
          session.totals.due = Math.max(0, (session.totals.grandTotal || 0) - (session.totals.paid || 0));

          if (conn && typeof session.save === 'function') {
            try {
              await session.save();
            } catch (e) {}
          }
          saveRuntimeSession({
            ...((session.toObject && session.toObject()) || session),
            id: String(session._id || session.id),
            totals: session.totals,
            updatedAt: now,
          });
        }
      }
    }

    if (conn && typeof order.save === 'function') {
      try {
        await order.save();
      } catch (err) {
        console.warn('[Admin Order Status PATCH DB save]:', err);
      }
    }

    // Update in-memory runtime cache
    const updatedOrderPlain = {
      ...((order.toObject && order.toObject()) || order),
      id: String(order._id || order.id),
      status: targetStatus,
      timestamps,
      updatedAt: now,
    };
    saveRuntimeOrder(updatedOrderPlain);

    // Sync to Firestore liveOrders
    const orderKey = String(order.orderNumber || order._id || order.id);
    const itemsSummary = (order.items || [])
      .map((i: any) => `${i.quantity || i.qty || 1}x ${i.name}`)
      .join(', ')
      .slice(0, 150);

    syncLiveOrderToFirestore(orderKey, {
      storeId,
      status: targetStatus,
      tableNumber: order.table,
      itemsSummary,
      total: order.total,
      paymentStatus: order.paymentStatus || 'pending',
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      order: updatedOrderPlain,
      transition: {
        from: currentStatus,
        to: targetStatus,
      },
    });
  } catch (error: any) {
    console.error('[Admin Order Status PATCH Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to update order status' } },
      { status: 500 }
    );
  }
}
