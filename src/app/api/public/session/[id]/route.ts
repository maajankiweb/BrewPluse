import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { TableSession, getRuntimeSessions } from '@/lib/models/TableSession';
import { Order, findRuntimeOrdersBySessionId } from '@/lib/models/Order';
import { getGuestSessionFromRequest } from '@/lib/guestSession';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/public/session/:id
 * Fetches the guest's live dining session tab, including all orders placed,
 * real-time kitchen statuses, bill totals, and amount due.
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id: sessionId } = await params;
    if (!sessionId) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Session ID is required.' } },
        { status: 400 }
      );
    }

    // Optional guest cookie verification
    const guestSession = getGuestSessionFromRequest(request);

    const conn = await connectMongoDB();
    let session: any = null;

    if (conn) {
      try {
        session = await TableSession.findById(sessionId).lean();
      } catch (err) {}
    }

    if (!session) {
      const allRuntime = Object.values(global.runtimeTableSessions || {}).flat();
      session = allRuntime.find((s) => s.id === sessionId);
    }

    if (!session) {
      return NextResponse.json(
        { error: { code: 'SESSION_NOT_FOUND', message: 'Dining session not found.' } },
        { status: 404 }
      );
    }

    // Load all orders for this table session
    let orders: any[] = [];
    if (conn) {
      try {
        orders = await Order.find({ sessionId })
          .sort({ createdAt: -1 })
          .lean();
      } catch (err) {}
    }

    if (orders.length === 0) {
      orders = findRuntimeOrdersBySessionId(session.storeId, sessionId);
    }

    return NextResponse.json({
      success: true,
      session: {
        id: String(session._id || session.id),
        storeId: session.storeId,
        tableId: session.tableId,
        status: session.status,
        billRequestedAt: session.billRequestedAt,
        billRequestMethod: session.billRequestMethod,
        currency: session.currency || 'INR',
        totals: {
          subtotal: (session.totals?.subtotal || 0) / 100,
          tax: (session.totals?.tax || 0) / 100,
          serviceCharge: (session.totals?.serviceCharge || 0) / 100,
          platformFee: (session.totals?.platformFee || 0) / 100,
          grandTotal: (session.totals?.grandTotal || 0) / 100,
          paid: (session.totals?.paid || 0) / 100,
          due: (session.totals?.due || 0) / 100,
        },
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
      ordersCount: orders.length,
    });
  } catch (error: any) {
    console.error('[Public Session GET Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to fetch session' } },
      { status: 500 }
    );
  }
}
