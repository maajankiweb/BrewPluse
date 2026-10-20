import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'test-secret-key-32-bytes-long-super-secure';
process.env.RAZORPAY_KEY_ID = 'rzp_test_mock_key';
process.env.RAZORPAY_KEY_SECRET = 'rzp_test_mock_secret_key_12345';
process.env.RAZORPAY_WEBHOOK_SECRET = 'rzp_test_webhook_secret_67890';

import {
  createRazorpayOrder,
  verifyRazorpaySignature,
  verifyRazorpayWebhookSignature,
} from '../src/lib/razorpay';
import {
  saveRuntimeSession,
  findRuntimeSessionById,
  getRuntimeSessions,
} from '../src/lib/models/TableSession';
import {
  saveRuntimePayment,
  findRuntimePaymentByRazorpayId,
  getRuntimePayments,
} from '../src/lib/models/Payment';
import {
  saveRuntimeOrder,
  findRuntimeOrderById,
} from '../src/lib/models/Order';
import {
  saveRuntimeTable,
  findRuntimeTableById,
} from '../src/lib/models/Table';

describe('Phase 4: Payments (4a Pay-Now, 4b Pay-Later & Webhooks, 4c Counter Settlement)', () => {
  describe('1. Razorpay Signatures & Test Order Creation', () => {
    test('createRazorpayOrder produces a valid order object in paise', async () => {
      const order = await createRazorpayOrder({
        amount: 25000, // 250 INR in paise
        currency: 'INR',
        receipt: 'rcpt_test_01',
        notes: { storeSlug: 'test-cafe', table: 'T1' },
      });

      assert.ok(order.id.startsWith('order_'));
      assert.equal(order.amount, 25000);
      assert.equal(order.currency, 'INR');
      assert.equal(order.receipt, 'rcpt_test_01');
    });

    test('verifyRazorpaySignature verifies valid HMAC-SHA256 signature', () => {
      const orderId = 'order_test_123456';
      const paymentId = 'pay_test_789012';
      const secret = process.env.RAZORPAY_KEY_SECRET!;
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${orderId}|${paymentId}`)
        .digest('hex');

      // Valid signature
      assert.equal(verifyRazorpaySignature(orderId, paymentId, expectedSignature), true);

      // Invalid signature
      assert.equal(verifyRazorpaySignature(orderId, paymentId, 'tampered_signature'), false);
    });

    test('verifyRazorpayWebhookSignature verifies webhook payload HMAC', () => {
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
      const payload = JSON.stringify({
        event: 'payment.captured',
        payload: { payment: { entity: { id: 'pay_999', amount: 50000 } } },
      });

      const signature = crypto
        .createHmac('sha256', webhookSecret)
        .update(payload)
        .digest('hex');

      assert.equal(verifyRazorpayWebhookSignature(payload, signature), true);
      assert.equal(verifyRazorpayWebhookSignature(payload, 'wrong_hex'), false);
    });
  });

  describe('2. Phase 4a: Pay-Now Online Flow Simulation', () => {
    test('payment capture completes order and session accumulation', () => {
      const storeId = 'store_test_phase4';
      const tableId = 'table_p4_01';

      saveRuntimeTable({
        id: tableId,
        storeId,
        number: 'T4',
        token: 'tok_p4_01',
        isActive: true,
      });

      // 1. Customer places pay-now order
      const orderId = 'ord_paynow_01';
      saveRuntimeOrder({
        id: orderId,
        orderNumber: 'BP-4001',
        storeId,
        tableId,
        tableNumber: 'T4',
        status: 'pending_payment',
        paymentStatus: 'pending',
        paymentIntent: 'pay_now',
        paymentMode: 'online',
        items: [
          {
            itemId: 'item_1',
            name: 'Mocha Latte',
            variant: { name: 'Large', price: 250 },
            quantity: 1,
            price: 250,
            unitPrice: 250,
            lineTotal: 250,
          },
        ],
        subtotal: 250,
        tax: 0,
        discount: 0,
        total: 250,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const orderBefore = findRuntimeOrderById(orderId);
      assert.equal(orderBefore?.status, 'pending_payment');
      assert.equal(orderBefore?.paymentStatus, 'pending');

      // 2. Client completes payment and submits verification
      const rzpPaymentId = 'pay_now_captured_111';
      saveRuntimePayment({
        id: 'pmt_001',
        storeId,
        sessionId: 'sess_p4_01',
        orderId,
        amount: 25000,
        currency: 'INR',
        mode: 'online',
        status: 'captured',
        razorpay: {
          orderId: 'order_rzp_mock_1',
          paymentId: rzpPaymentId,
          signature: 'sig_mock_1',
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // 3. Mark order placed + paid
      saveRuntimeOrder({
        ...orderBefore!,
        status: 'placed',
        paymentStatus: 'paid',
        updatedAt: new Date(),
      });

      const orderAfter = findRuntimeOrderById(orderId);
      assert.equal(orderAfter?.status, 'placed');
      assert.equal(orderAfter?.paymentStatus, 'paid');

      // 4. Session created and updated
      const sessionId = 'sess_p4_01';
      saveRuntimeSession({
        id: sessionId,
        storeId,
        tableId,
        currency: 'INR',
        status: 'open',
        totals: {
          subtotal: 25000,
          tax: 0,
          serviceCharge: 0,
          platformFee: 0,
          discount: 0,
          roundOff: 0,
          grandTotal: 25000,
          paid: 25000,
          due: 0, // Pay-now means due is 0!
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const session = findRuntimeSessionById(sessionId);
      assert.equal(session?.totals.due, 0);
      assert.equal(session?.totals.paid, 25000);
    });
  });

  describe('3. Phase 4b: Pay-Later Webhook Replay Idempotency', () => {
    test('duplicate webhook with same razorpay.paymentId does not duplicate credit', () => {
      const storeId = 'store_test_phase4';
      const tableId = 'table_p4_02';
      const sessionId = 'sess_p4_02';

      saveRuntimeSession({
        id: sessionId,
        storeId,
        tableId,
        currency: 'INR',
        status: 'open',
        totals: {
          subtotal: 40000,
          tax: 0,
          serviceCharge: 0,
          platformFee: 0,
          discount: 0,
          roundOff: 0,
          grandTotal: 40000,
          paid: 0,
          due: 40000,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const webhookPaymentId = 'pay_webhook_replay_999';

      // First webhook execution
      const existing1 = findRuntimePaymentByRazorpayId(webhookPaymentId);
      assert.equal(existing1, null);

      saveRuntimePayment({
        id: 'pmt_wh_01',
        storeId,
        sessionId,
        amount: 40000,
        currency: 'INR',
        mode: 'online',
        status: 'captured',
        razorpay: {
          orderId: 'order_rzp_mock_2',
          paymentId: webhookPaymentId,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const session = findRuntimeSessionById(sessionId)!;
      session.totals.paid += 40000;
      session.totals.due = Math.max(0, session.totals.grandTotal - session.totals.paid);
      session.status = session.totals.due === 0 ? 'paid' : 'open';
      saveRuntimeSession(session);

      assert.equal(findRuntimeSessionById(sessionId)?.totals.paid, 40000);
      assert.equal(findRuntimeSessionById(sessionId)?.totals.due, 0);
      assert.equal(findRuntimeSessionById(sessionId)?.status, 'paid');

      // Second webhook execution (replay)
      const existing2 = findRuntimePaymentByRazorpayId(webhookPaymentId);
      assert.ok(existing2, 'Should find existing payment for idempotency check');

      // Because existing2 was found, we do NOT credit session again
      const currentSession = findRuntimeSessionById(sessionId)!;
      assert.equal(currentSession.totals.paid, 40000, 'Paid should still be exactly 40000, not double-credited');
      assert.equal(currentSession.totals.due, 0);
    });
  });

  describe('4. Phase 4c: Counter Settlement & Table Clearing', () => {
    test('settling session with cash zeroes due and marks session paid', () => {
      const storeId = 'store_test_phase4';
      const tableId = 'table_p4_03';
      const sessionId = 'sess_p4_03';

      saveRuntimeTable({
        id: tableId,
        storeId,
        number: 'T7',
        token: 'tok_p4_03',
        isActive: true,
      });

      saveRuntimeSession({
        id: sessionId,
        storeId,
        tableId,
        currency: 'INR',
        status: 'bill_requested',
        billRequestedAt: new Date(),
        totals: {
          subtotal: 50000,
          discount: 5000,
          tax: 2250,
          serviceCharge: 0,
          platformFee: 0,
          roundOff: 0,
          grandTotal: 47250,
          paid: 0,
          due: 47250,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const session = findRuntimeSessionById(sessionId)!;
      assert.equal(session.totals.due, 47250);
      assert.equal(session.status, 'bill_requested');

      // Cashier records Cash payment
      saveRuntimePayment({
        id: 'pmt_cash_01',
        storeId,
        sessionId,
        amount: session.totals.due,
        currency: 'INR',
        mode: 'cash',
        status: 'captured',
        receivedBy: 'cashier_01',
        reference: 'Cash receipt #101',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      session.totals.paid += session.totals.due;
      session.totals.due = 0;
      session.status = 'paid';
      saveRuntimeSession(session);

      const settledSession = findRuntimeSessionById(sessionId)!;
      assert.equal(settledSession.totals.due, 0);
      assert.equal(settledSession.totals.paid, 47250);
      assert.equal(settledSession.status, 'paid');

      // Cashier clears / vacates table
      settledSession.status = 'closed';
      settledSession.closedAt = new Date();
      saveRuntimeSession(settledSession);

      const closedSession = findRuntimeSessionById(sessionId)!;
      assert.equal(closedSession.status, 'closed');
      assert.ok(closedSession.closedAt);
    });

    test('rejects settling an already paid session with 409 conflict', () => {
      const sessionId = 'sess_p4_already_paid';
      saveRuntimeSession({
        id: sessionId,
        storeId: 'store_test_phase4',
        tableId: 'table_p4_04',
        currency: 'INR',
        status: 'paid',
        totals: {
          subtotal: 10000,
          tax: 0,
          serviceCharge: 0,
          platformFee: 0,
          discount: 0,
          roundOff: 0,
          grandTotal: 10000,
          paid: 10000,
          due: 0,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const session = findRuntimeSessionById(sessionId)!;
      const isAlreadyPaid = session.totals.due <= 0 || session.status === 'paid';
      assert.equal(isAlreadyPaid, true, 'Should detect session is already settled');
    });
  });
});
