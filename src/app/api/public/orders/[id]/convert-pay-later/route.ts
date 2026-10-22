import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Order, saveRuntimeOrder, findRuntimeOrderById } from '@/lib/models/Order';
import {
  TableSession,
  saveRuntimeSession,
  findRuntimeActiveSession,
} from '@/lib/models/TableSession';
import { Table, findRuntimeTableById } from '@/lib/models/Table';
import { syncLiveOrderToFirestore, syncLiveTableToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/public/orders/:id/convert-pay-later
 * Spec Section 10 Case 6:
 * When online payment fails or guest abandons checkout, converts 'pending_payment' order
 * to 'pay_later' ('placed'), accumulating onto table session tab.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: orderId } = await params;
    if (!orderId) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Order ID is required' } },
        { status: 400 }
      );
    }

    const conn = await connectMongoDB();
    let order: any = null;

    if (conn) {
      try {
        if (orderId.match(/^[0-9a-fA-F]{24}$/)) {
          order = await Order.findById(orderId);
        }
        if (!order) {
          order = await Order.findOne({ orderNumber: orderId });
        }
      } catch (e) {}
    }

    if (!order) {
      order = findRuntimeOrderById(orderId);
    }

    if (!order) {
      const allRuntime = Object.values(global.runtimeOrders || {}).flat();
      order = allRuntime.find(
        (o) => o.orderNumber === orderId || String(o._id || o.id) === orderId
      );
    }

    if (!order) {
      return NextResponse.json(
        { error: { code: 'ORDER_NOT_FOUND', message: 'Order not found' } },
        { status: 404 }
      );
    }

    if (order.status !== 'pending_payment') {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_ORDER_STATE',
            message: `Cannot convert order in state '${order.status}'. Only 'pending_payment' orders can be converted.`,
          },
        },
        { status: 409 }
      );
    }

    const now = new Date();
    order.status = 'placed';
    order.paymentIntent = 'pay_later';
    order.paymentStatus = 'pending';
    order.paymentMode = 'Pay Later at Counter';
    if (!order.timestamps?.placedAt) {
      order.timestamps = { ...order.timestamps, placedAt: now };
    }
    order.updatedAt = now;

    if (conn && typeof order.save === 'function') {
      try {
        await order.save();
      } catch (e) {}
    }

    saveRuntimeOrder({
      ...((order.toObject && order.toObject()) || order),
      id: String(order._id || order.id),
      status: 'placed',
      paymentIntent: 'pay_later',
      paymentStatus: 'pending',
      updatedAt: now,
    });

    // Accumulate onto Table Session
    const storeId = order.storeId;
    const tableId = order.tableId;
    let session: any = null;

    if (order.sessionId) {
      if (conn) {
        try {
          session = await TableSession.findById(order.sessionId);
        } catch (e) {}
      }
      if (!session) {
        const allRuntime = Object.values(global.runtimeTableSessions || {}).flat();
        session = allRuntime.find((s) => s.id === order.sessionId);
      }
    }

    if (!session && tableId) {
      if (conn) {
        try {
          session = await TableSession.findOne({
            storeId,
            tableId,
            status: { $in: ['open', 'bill_requested'] },
          });
        } catch (e) {}
      }
      if (!session) {
        session = findRuntimeActiveSession(storeId, tableId);
      }
    }

    const orderTotalPaise = Math.round((order.total || 0) * 100);
    const orderSubtotalPaise = Math.round((order.subtotal || 0) * 100);
    const orderTaxPaise = Math.round((order.tax || 0) * 100);

    if (session) {
      session.totals.subtotal = (session.totals.subtotal || 0) + orderSubtotalPaise;
      session.totals.tax = (session.totals.tax || 0) + orderTaxPaise;
      session.totals.grandTotal = (session.totals.grandTotal || 0) + orderTotalPaise;
      session.totals.due = Math.max(0, session.totals.grandTotal - (session.totals.paid || 0));
      session.updatedAt = now;

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

      // Sync live table
      syncLiveTableToFirestore(session.tableId, {
        storeId,
        tableNumber: order.table,
        status: session.status,
        dueAmount: session.totals.due / 100,
        billRequested: session.status === 'bill_requested',
      }).catch(() => {});
    }

    // Sync live order to kitchen
    syncLiveOrderToFirestore(String(order.orderNumber || order._id || order.id), {
      storeId,
      status: 'placed',
      tableNumber: order.table,
      total: order.total,
      paymentStatus: 'pending',
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: 'Order converted to Pay-Later tab and sent to kitchen.',
      order: {
        id: String(order._id || order.id),
        orderNumber: order.orderNumber,
        status: order.status,
        paymentIntent: order.paymentIntent,
        paymentStatus: order.paymentStatus,
      },
      session: session
        ? {
            id: String(session._id || session.id),
            status: session.status,
            due: (session.totals?.due || 0) / 100,
          }
        : undefined,
    });
  } catch (error: any) {
    console.error('[Convert Order Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to convert order' } },
      { status: 500 }
    );
  }
}
