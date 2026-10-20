import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import { TableSession, saveRuntimeSession } from '@/lib/models/TableSession';
import { Payment, saveRuntimePayment } from '@/lib/models/Payment';
import { Order, saveRuntimeOrder, findRuntimeOrdersBySessionId } from '@/lib/models/Order';
import { Table, findRuntimeTableById } from '@/lib/models/Table';
import { requireStaff } from '@/lib/authService';
import { syncLiveTableToFirestore, syncLiveOrderToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: { id: string };
}

const RecordPaymentSchema = z.object({
  mode: z.enum(['cash', 'upi_manual', 'card_pos']).optional(),
  method: z.enum(['cash', 'upi_manual', 'card_pos']).optional(),
  amount: z.number().positive('Amount must be greater than zero').optional(),
  reference: z.string().max(100).optional(),
});

/**
 * POST /api/admin/table-sessions/:id/payments
 * Roles: owner, manager, cashier
 * Records an offline payment (Cash, Manual UPI, POS Card) against an active table session.
 * Updates session due amount, marks session 'paid' if settled, and marks orders 'paid'.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager', 'cashier']);
    if (!auth.authorized) {
      return auth.response;
    }

    const sessionId = params.id;
    if (!sessionId) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Session ID is required' } },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => null);
    const parsed = RecordPaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid payment payload',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const paymentMode = parsed.data.mode || parsed.data.method || 'cash';
    const rawAmount = parsed.data.amount;
    const reference = parsed.data.reference;
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

    if (session.status === 'closed') {
      return NextResponse.json(
        {
          error: {
            code: 'SESSION_CLOSED',
            message: 'Cannot record payment on a closed table session.',
          },
        },
        { status: 409 }
      );
    }

    if (session.totals?.due <= 0 && session.status === 'paid') {
      return NextResponse.json(
        {
          error: {
            code: 'ALREADY_PAID',
            message: 'This session has already been settled in full.',
          },
        },
        { status: 409 }
      );
    }

    const paymentAmountPaise =
      rawAmount !== undefined
        ? Math.round(rawAmount > 1000 ? rawAmount : rawAmount * 100)
        : session.totals.due;

    // 1. Create Payment Record
    const staffIdentifier = auth.user?.email || auth.user?.uid || 'cashier';
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    const paymentData = {
      storeId,
      sessionId,
      mode: paymentMode,
      amount: paymentAmountPaise,
      currency: session.currency || 'INR',
      status: 'captured' as const,
      receivedBy: staffIdentifier,
      reference: reference?.trim() || undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    let createdPayment: any = null;
    if (conn) {
      try {
        createdPayment = await Payment.create(paymentData);
      } catch (err) {}
    }

    const finalPayment = createdPayment || {
      _id: paymentId,
      id: paymentId,
      ...paymentData,
    };
    saveRuntimePayment({
      id: String(finalPayment._id || finalPayment.id),
      ...paymentData,
    });

    // 2. Update TableSession Totals & Status
    session.totals.paid = (session.totals.paid || 0) + paymentAmountPaise;
    session.totals.due = Math.max(0, session.totals.grandTotal - session.totals.paid);
    const isFullyPaid = session.totals.due <= 0;

    if (isFullyPaid) {
      session.status = 'paid';
    }

    if (conn && typeof session.save === 'function') {
      try {
        await session.save();
      } catch (err) {}
    }

    saveRuntimeSession({
      ...((session.toObject && session.toObject()) || session),
      id: String(session._id || session.id),
      status: session.status,
      totals: session.totals,
      updatedAt: new Date(),
    });

    // 3. Mark all unpaid orders in this session as paid
    if (conn) {
      try {
        await Order.updateMany(
          { storeId, sessionId, paymentStatus: 'pending' },
          {
            $set: {
              paymentStatus: 'paid',
              paymentMode: paymentMode === 'cash' ? 'Cash' : paymentMode === 'upi_manual' ? 'UPI (Counter)' : 'POS Card',
              updatedAt: new Date(),
            },
          }
        );
      } catch (e) {}
    }

    const runtimeOrdersList = findRuntimeOrdersBySessionId(storeId, sessionId);
    for (const ord of runtimeOrdersList) {
      if (ord.paymentStatus === 'pending') {
        ord.paymentStatus = 'paid';
        ord.paymentMode = paymentMode === 'cash' ? 'Cash' : paymentMode === 'upi_manual' ? 'UPI (Counter)' : 'POS Card';
        saveRuntimeOrder(ord);
        syncLiveOrderToFirestore(String(ord.orderNumber || ord._id || ord.id), {
          storeId,
          status: ord.status,
          tableNumber: ord.table,
          total: ord.total,
          paymentStatus: 'paid',
        }).catch(() => {});
      }
    }

    // 4. Resolve table & sync to Firestore
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
      status: session.status,
      dueAmount: session.totals.due / 100,
      billRequested: session.status === 'bill_requested',
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      payment: {
        id: String(finalPayment._id || finalPayment.id),
        mode: finalPayment.mode,
        amount: finalPayment.amount / 100,
        reference: finalPayment.reference,
        receivedBy: finalPayment.receivedBy,
        createdAt: finalPayment.createdAt,
      },
      session: {
        id: String(session._id || session.id),
        status: session.status,
        totals: {
          subtotal: session.totals.subtotal / 100,
          grandTotal: session.totals.grandTotal / 100,
          paid: session.totals.paid / 100,
          due: session.totals.due / 100,
        },
      },
      isFullyPaid,
      message: isFullyPaid
        ? 'Session settled in full.'
        : `Partial payment recorded. Remaining due: ₹${(session.totals.due / 100).toFixed(2)}`,
    });
  } catch (error: any) {
    console.error('[Record Payment Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to record payment' } },
      { status: 500 }
    );
  }
}
