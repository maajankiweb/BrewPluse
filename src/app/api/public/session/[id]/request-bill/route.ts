import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import { TableSession, saveRuntimeSession } from '@/lib/models/TableSession';
import { Table, findRuntimeTableById } from '@/lib/models/Table';
import { createRazorpayOrder } from '@/lib/razorpay';
import { syncLiveTableToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

const RequestBillSchema = z.object({
  method: z.enum(['online', 'counter']),
});

/**
 * POST /api/public/session/:id/request-bill
 * Sets session to 'bill_requested'.
 * If method is 'online', generates a Razorpay order for the remaining due balance.
 * If method is 'counter', raises a cashier dashboard alert.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: sessionId } = await params;
    if (!sessionId) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Session ID is required.' } },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    const parsed = RequestBillSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request payload. Method must be "online" or "counter".',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const { method } = parsed.data;
    const conn = await connectMongoDB();

    let session: any = null;
    if (conn) {
      try {
        if (sessionId.match(/^[0-9a-fA-F]{24}$/)) {
          session = await TableSession.findById(sessionId);
        }
        if (!session) {
          session = await TableSession.findOne({
            tableId: sessionId,
            status: { $in: ['open', 'bill_requested'] },
          });
        }
      } catch (err) {}
    }

    if (!session) {
      const allSessions = Object.values(global.runtimeTableSessions || {}).flat();
      session =
        allSessions.find((s) => s.id === sessionId) ||
        allSessions.find(
          (s) => s.tableId === sessionId && (s.status === 'open' || s.status === 'bill_requested')
        );
    }

    if (!session) {
      return NextResponse.json(
        { error: { code: 'SESSION_NOT_FOUND', message: 'Dining session not found.' } },
        { status: 404 }
      );
    }

    if (session.status === 'paid' || session.status === 'closed') {
      return NextResponse.json(
        {
          error: {
            code: 'SESSION_ALREADY_SETTLED',
            message: 'This table bill has already been settled.',
          },
        },
        { status: 409 }
      );
    }

    const duePaise = session.totals?.due ?? 0;
    const now = new Date();

    session.status = 'bill_requested';
    session.billRequestedAt = now;
    session.billRequestMethod = method;

    if (conn && typeof session.save === 'function') {
      try {
        await session.save();
      } catch (err) {}
    }

    saveRuntimeSession({
      ...((session.toObject && session.toObject()) || session),
      id: String(session._id || session.id),
      status: 'bill_requested',
      billRequestedAt: now,
      billRequestMethod: method,
      updatedAt: now,
    });

    // Lookup table for real tableNumber
    let tableNumber = 'Table';
    if (conn) {
      try {
        const tbl = await Table.findById(session.tableId);
        if (tbl) tableNumber = tbl.number;
      } catch (e) {}
    }
    if (tableNumber === 'Table') {
      const rtTbl = findRuntimeTableById(session.tableId);
      if (rtTbl) tableNumber = rtTbl.number;
    }

    syncLiveTableToFirestore(session.tableId, {
      tableNumber,
      status: 'bill_requested',
      dueAmount: duePaise / 100,
      billRequested: true,
    }).catch(() => {});

    // For online bill settlement: prepare Razorpay order for due amount
    let razorpayPayload: any = undefined;
    if (method === 'online' && duePaise > 0) {
      const rpOrder = await createRazorpayOrder({
        amount: duePaise,
        currency: 'INR',
        receipt: `bill_${sessionId.slice(-6)}`,
        notes: {
          storeSlug: session.storeId,
          sessionId: String(session._id || session.id),
          tableNumber,
        },
      });

      razorpayPayload = {
        orderId: rpOrder.id,
        keyId:
          process.env.RAZORPAY_KEY_ID ||
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          'rzp_test_brewpluse2026',
        amount: duePaise,
        currency: 'INR',
      };
    }

    return NextResponse.json({
      success: true,
      session: {
        id: String(session._id || session.id),
        status: session.status,
        billRequestMethod: session.billRequestMethod,
        due: duePaise / 100,
      },
      razorpay: razorpayPayload,
      message:
        method === 'online'
          ? 'Online bill checkout generated.'
          : 'Bill requested. Staff has been notified to attend your table.',
    });
  } catch (error: any) {
    console.error('[Request Bill Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to request bill' } },
      { status: 500 }
    );
  }
}
