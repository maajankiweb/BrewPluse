import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Order, saveRuntimeOrder } from '@/lib/models/Order';
import {
  TableSession,
  saveRuntimeSession,
} from '@/lib/models/TableSession';
import { Payment, saveRuntimePayment } from '@/lib/models/Payment';
import { verifyRazorpayWebhookSignature } from '@/lib/razorpay';
import { syncLiveOrderToFirestore, syncLiveTableToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

/**
 * POST /api/payments/razorpay/webhook
 * Handles Razorpay webhook events: payment.captured, order.paid, payment.failed
 * Cryptographically verifies raw payload signature using timingSafeEqual.
 */
export async function POST(request: Request) {
  try {
    const signature = request.headers.get('x-razorpay-signature') || '';
    const rawBody = await request.text();

    if (!signature || !rawBody) {
      return NextResponse.json(
        { error: { code: 'INVALID_REQUEST', message: 'Missing webhook signature or body' } },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error('[Razorpay Webhook] Invalid signature rejected.');
      return NextResponse.json(
        { error: { code: 'INVALID_SIGNATURE', message: 'Invalid webhook signature' } },
        { status: 400 }
      );
    }

    let payload: any;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { error: { code: 'INVALID_JSON', message: 'Malformed JSON payload' } },
        { status: 400 }
      );
    }

    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity;
    const orderEntity = payload.payload?.order?.entity;

    const paymentId = paymentEntity?.id;
    const orderId = paymentEntity?.order_id || orderEntity?.id;
    const amount = paymentEntity?.amount || orderEntity?.amount || 0; // in paise
    const notes = paymentEntity?.notes || orderEntity?.notes || {};

    const storeSlug = notes.storeSlug || 'default';
    const orderNumber = notes.orderNumber;
    const sessionId = notes.sessionId;

    const conn = await connectMongoDB();

    if (event === 'payment.captured' || event === 'order.paid') {
      // 1. Record / Update Payment (Idempotent on razorpay.paymentId)
      if (paymentId) {
        const paymentData = {
          storeId: storeSlug,
          sessionId: sessionId || 'default',
          mode: 'online' as const,
          amount,
          currency: paymentEntity?.currency || 'INR',
          status: 'captured' as const,
          razorpay: {
            orderId,
            paymentId,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        if (conn) {
          try {
            await Payment.findOneAndUpdate(
              { 'razorpay.paymentId': paymentId },
              paymentData,
              { upsert: true, new: true }
            );
          } catch (err) {}
        }

        saveRuntimePayment({
          id: `pay_${paymentId}`,
          ...paymentData,
        });
      }

      // 2. Activate Order (pending_payment -> placed)
      let order: any = null;
      if (orderNumber) {
        if (conn) {
          try {
            order = await Order.findOne({ orderNumber });
          } catch (e) {}
        }
        if (!order) {
          const allOrders = Object.values(global.runtimeOrders || {}).flat();
          order = allOrders.find((o) => o.orderNumber === orderNumber);
        }
      }

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
          updatedAt: new Date(),
        });

        syncLiveOrderToFirestore(String(order.orderNumber || order._id || order.id), {
          storeId: order.storeId,
          status: 'placed',
          tableNumber: order.table,
          total: order.total,
          paymentStatus: 'paid',
        }).catch(() => {});
      }

      // 3. Settle TableSession Totals
      const targetSessionId = sessionId || order?.sessionId;
      let session: any = null;
      if (targetSessionId) {
        if (conn) {
          try {
            session = await TableSession.findById(targetSessionId);
          } catch (e) {}
        }
        if (!session) {
          const allSessions = Object.values(global.runtimeTableSessions || {}).flat();
          session = allSessions.find((s) => s.id === targetSessionId);
        }
      }

      if (session) {
        session.totals.paid = (session.totals.paid || 0) + amount;
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
    } else if (event === 'payment.failed') {
      if (paymentId) {
        if (conn) {
          try {
            await Payment.findOneAndUpdate(
              { 'razorpay.paymentId': paymentId },
              { status: 'failed', updatedAt: new Date() },
              { upsert: true }
            );
          } catch (err) {}
        }
        saveRuntimePayment({
          id: `pay_${paymentId}`,
          storeId: storeSlug,
          sessionId: sessionId || 'default',
          mode: 'online',
          amount,
          currency: 'INR',
          status: 'failed',
          razorpay: { paymentId, orderId },
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }

    // Always respond 200 OK quickly per webhook spec
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('[Razorpay Webhook Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Webhook processing failed' } },
      { status: 500 }
    );
  }
}
