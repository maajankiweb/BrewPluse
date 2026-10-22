import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { TableSession } from '@/lib/models/TableSession';
import { Order, findRuntimeOrdersBySessionId } from '@/lib/models/Order';
import { Payment, getRuntimePayments } from '@/lib/models/Payment';
import { Table, findRuntimeTableById } from '@/lib/models/Table';
import { requireStaff } from '@/lib/authService';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/table-sessions/:id
 * Roles: owner, manager, cashier
 * Returns the full dining session bill, including all orders, items, totals, and recorded payments.
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager', 'cashier']);
    if (!auth.authorized) {
      return auth.response;
    }

    const { id: sessionId } = await params;
    if (!sessionId) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Session ID is required' } },
        { status: 400 }
      );
    }

    const storeId = auth.storeSlug;
    const conn = await connectMongoDB();

    let session: any = null;
    if (conn) {
      try {
        session = await TableSession.findOne({ _id: sessionId, storeId });
      } catch (err) {}
    }

    if (!session) {
      const allSessions = global.runtimeTableSessions?.[storeId] || [];
      session = allSessions.find((s) => s.id === sessionId);
    }

    if (!session) {
      return NextResponse.json(
        { error: { code: 'SESSION_NOT_FOUND', message: 'Dining session not found for this store' } },
        { status: 404 }
      );
    }

    // 1. Fetch Orders in this Session
    let orders: any[] = [];
    if (conn) {
      try {
        orders = await Order.find({ storeId, sessionId }).sort({ createdAt: 1 }).lean();
      } catch (err) {}
    }
    if (orders.length === 0) {
      orders = findRuntimeOrdersBySessionId(storeId, sessionId);
    }

    // 2. Fetch Payments in this Session
    let payments: any[] = [];
    if (conn) {
      try {
        payments = await Payment.find({ storeId, sessionId }).sort({ createdAt: 1 }).lean();
      } catch (err) {}
    }
    if (payments.length === 0) {
      payments = getRuntimePayments(sessionId);
    }

    // 3. Resolve Table Number
    let tableNumber = 'Table';
    if (conn) {
      try {
        const tbl = await Table.findById(session.tableId);
        if (tbl) tableNumber = tbl.number;
      } catch (err) {}
    }
    if (tableNumber === 'Table') {
      const rtTbl = findRuntimeTableById(session.tableId);
      if (rtTbl) tableNumber = rtTbl.number;
    }

    return NextResponse.json({
      success: true,
      session: {
        id: String(session._id || session.id),
        tableId: session.tableId,
        tableNumber,
        status: session.status,
        customer: session.customer,
        billRequestedAt: session.billRequestedAt,
        billRequestMethod: session.billRequestMethod,
        closedAt: session.closedAt,
        currency: session.currency || 'INR',
        totals: {
          subtotal: (session.totals?.subtotal || 0) / 100,
          tax: (session.totals?.tax || 0) / 100,
          serviceCharge: (session.totals?.serviceCharge || 0) / 100,
          platformFee: (session.totals?.platformFee || 0) / 100,
          discount: (session.totals?.discount || 0) / 100,
          grandTotal: (session.totals?.grandTotal || 0) / 100,
          paid: (session.totals?.paid || 0) / 100,
          due: (session.totals?.due || 0) / 100,
        },
        createdAt: session.createdAt,
      },
      orders: orders.map((o) => ({
        id: String(o._id || o.id),
        orderNumber: o.orderNumber,
        status: o.status,
        paymentStatus: o.paymentStatus,
        paymentIntent: o.paymentIntent,
        items: o.items,
        total: o.total,
        createdAt: o.createdAt,
      })),
      payments: payments.map((p) => ({
        id: String(p._id || p.id),
        mode: p.mode,
        amount: (p.amount || 0) / 100,
        status: p.status,
        reference: p.reference,
        receivedBy: p.receivedBy,
        createdAt: p.createdAt,
      })),
    });
  } catch (error: any) {
    console.error('[Admin Table Session GET Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to fetch table session' } },
      { status: 500 }
    );
  }
}
