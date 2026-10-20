import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import { Order, saveRuntimeOrder } from '@/lib/models/Order';
import {
  TableSession,
  saveRuntimeSession,
} from '@/lib/models/TableSession';
import { Payment, saveRuntimePayment } from '@/lib/models/Payment';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { syncLiveOrderToFirestore, syncLiveTableToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

const VerifyPaymentSchema = z.object({
  razorpay_order_id: z.string().min(1, 'Order ID is required'),
  razorpay_payment_id: z.string().min(1, 'Payment ID is required'),
  razorpay_signature: z.string().min(1, 'Signature is required'),
  orderNumber: z.string().optional(),
  orderId: z.string().optional(),
  sessionId: z.string().optional(),
});

/**
 * POST /api/public/payments/razorpay/verify
 * Client payment success callback.
 * Cryptographically verifies HMAC-SHA256 signature and releases the order.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const parsed = VerifyPaymentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid payment verification payload',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderNumber,
      orderId,
      sessionId,
    } = parsed.data;

    // Verify HMAC-SHA256 signature using timing-safe buffer comparison
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_SIGNATURE',
            message: 'Payment verification failed: signature does not match.',
          },
        },
        { status: 400 }
      );
    }

    const conn = await connectMongoDB();

    // 1. Find matching order
    let order: any = null;
    const searchTarget = orderId || orderNumber;
    if (searchTarget) {
      if (conn) {
        try {
          if (searchTarget.match(/^[0-9a-fA-F]{24}$/)) {
            order = await Order.findById(searchTarget);
          }
          if (!order) {
            order = await Order.findOne({ orderNumber: searchTarget });
          }
        } catch (e) {}
      }
      if (!order) {
        const allRuntime = Object.values(global.runtimeOrders || {}).flat();
        order = allRuntime.find(
          (o) => o.orderNumber === searchTarget || String(o._id || o.id) === searchTarget
        );
      }
    }

    // 2. Find matching table session
    const resolvedSessionId = sessionId || order?.sessionId;
    let session: any = null;
    if (resolvedSessionId) {
      if (conn) {
        try {
          session = await TableSession.findById(resolvedSessionId);
        } catch (e) {}
      }
      if (!session) {
        const allRuntime = Object.values(global.runtimeTableSessions || {}).flat();
        session = allRuntime.find((s) => s.id === resolvedSessionId);
      }
    }

    // Amount paid in paise
    const paidAmountPaise = order ? Math.round(order.total * 100) : session?.totals?.due || 0;

    // 3. Persist Payment Record (Idempotent on razorpay.paymentId)
    const paymentData = {
      storeId: order?.storeId || session?.storeId || 'default',
      sessionId: resolvedSessionId || 'default',
      orderId: order ? String(order._id || order.id) : undefined,
      mode: 'online' as const,
      amount: paidAmountPaise,
      currency: 'INR',
      status: 'captured' as const,
      razorpay: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (conn) {
      try {
        await Payment.findOneAndUpdate(
          { 'razorpay.paymentId': razorpay_payment_id },
          paymentData,
          { upsert: true, new: true }
        );
      } catch (err) {}
    }

    saveRuntimePayment({
      id: `pay_${razorpay_payment_id}`,
      ...paymentData,
    });

    // 4. Update Order (pending_payment -> placed)
    if (order) {
      order.status = 'placed';
      order.paymentStatus = 'paid';
      order.paymentMode = 'Online Razorpay';
      if (!order.timestamps?.placedAt) {
        order.timestamps = { ...order.timestamps, placedAt: new Date() };
      }

      if (conn && typeof order.save === 'function') {
        try {
          await order.save();
        } catch (err) {}
      }

      saveRuntimeOrder({
        ...((order.toObject && order.toObject()) || order),
        id: String(order._id || order.id),
        status: 'placed',
        paymentStatus: 'paid',
        paymentMode: 'Online Razorpay',
        updatedAt: new Date(),
      });

      // Sync to Firestore liveOrders
      syncLiveOrderToFirestore(String(order.orderNumber || order._id || order.id), {
        storeId: order.storeId,
        status: 'placed',
        tableNumber: order.table,
        total: order.total,
        paymentStatus: 'paid',
      }).catch(() => {});
    }

    // 5. Update Session Totals
    if (session) {
      session.totals.paid = (session.totals.paid || 0) + paidAmountPaise;
      session.totals.due = Math.max(0, session.totals.grandTotal - session.totals.paid);
      if (session.totals.due <= 0) {
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

      syncLiveTableToFirestore(session.tableId, {
        tableNumber: order?.table || 'Table',
        status: session.status,
        dueAmount: session.totals.due / 100,
        billRequested: session.status === 'bill_requested',
      }).catch(() => {});
    }

    return NextResponse.json({
      success: true,
      verified: true,
      order: order
        ? {
            orderNumber: order.orderNumber,
            status: 'placed',
            paymentStatus: 'paid',
          }
        : undefined,
      session: session
        ? {
            id: String(session._id || session.id),
            status: session.status,
            due: session.totals.due / 100,
          }
        : undefined,
    });
  } catch (error: any) {
    console.error('[Razorpay Verify Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Payment verification failed' } },
      { status: 500 }
    );
  }
}
