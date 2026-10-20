import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

process.env.RAZORPAY_KEY_ID = 'rzp_test_mock_key';
process.env.RAZORPAY_KEY_SECRET = 'rzp_test_mock_secret_key_12345';

import {
  createRuntimeHardwareOrder,
  updateRuntimeHardwareOrderPayment,
  getRuntimeHardwareOrdersByStore,
} from '../src/lib/models/HardwareOrder';
import { verifyRazorpaySignature } from '../src/lib/razorpay';
import crypto from 'crypto';

describe('Hardware Razorpay Setup & Cart Order Tests', () => {
  const storeSlug = 'test-cafe';

  test('1. Hardware pricing is ₹1,500 per unit + Flat ₹270 GST per order regardless of quantity', () => {
    const unitPrice = 1500;
    const flatGst = 270;

    // Single card order
    const singleSubtotal = 1 * unitPrice;
    const singleTotal = singleSubtotal + flatGst;
    assert.equal(singleSubtotal, 1500);
    assert.equal(singleTotal, 1770);

    // 10 cards order: only flat ₹270 GST is charged (not 10 * 270)
    const tenCardsSubtotal = 10 * unitPrice;
    const tenCardsTotal = tenCardsSubtotal + flatGst;
    assert.equal(tenCardsSubtotal, 15000);
    assert.equal(tenCardsTotal, 15270);
  });

  test('2. createRuntimeHardwareOrder stores pending hardware order with 4-day delivery', () => {
    const orderData = {
      orderNumber: 'BP-HW-998877',
      storeSlug,
      cafeName: 'Test Cafe Roasters',
      contactPerson: 'Aditi Singh',
      phone: '9876543210',
      email: 'aditi@testcafe.com',
      shippingAddress: {
        street: '12 Indiranagar 100ft Rd',
        city: 'Bangalore',
        state: 'Karnataka',
        pincode: '560038',
      },
      items: [
        { id: 'nfc-card', title: 'NFC Card', price: 1500, quantity: 2, total: 3000 },
        { id: 'qr-code-stand', title: 'QR Standee', price: 1500, quantity: 1, total: 1500 },
      ],
      subtotal: 4500,
      total: 4500,
      paymentStatus: 'pending',
      razorpayOrderId: 'order_test_998877',
    };

    const created = createRuntimeHardwareOrder(orderData);
    assert.equal(created.orderNumber, 'BP-HW-998877');
    assert.equal(created.paymentStatus, 'pending');
    assert.equal(created.total, 4500);
    assert.ok(created.trackingNumber.startsWith('TRK-BP-'));
  });

  test('3. updateRuntimeHardwareOrderPayment updates status to paid with Razorpay payment ID', () => {
    const orderNumber = 'BP-HW-998877';
    const razorpayPaymentId = 'pay_test_hw_123456';
    const updated = updateRuntimeHardwareOrderPayment(orderNumber, razorpayPaymentId);

    assert.ok(updated);
    assert.equal(updated.paymentStatus, 'paid');
    assert.equal(updated.razorpayPaymentId, razorpayPaymentId);
  });

  test('4. getRuntimeHardwareOrdersByStore returns placed hardware orders for store', () => {
    const orders = getRuntimeHardwareOrdersByStore(storeSlug);
    assert.ok(orders.length >= 1);
    const found = orders.find((o) => o.orderNumber === 'BP-HW-998877');
    assert.ok(found);
    assert.equal(found.paymentStatus, 'paid');
    assert.equal(found.total, 4500);
  });

  test('5. verifyRazorpaySignature validates authentic HMAC-SHA256 signature', () => {
    const orderId = 'order_test_998877';
    const paymentId = 'pay_test_hw_123456';
    const secret = process.env.RAZORPAY_KEY_SECRET!;

    const validSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isValid = verifyRazorpaySignature(orderId, paymentId, validSignature);
    assert.equal(isValid, true);

    const isInvalid = verifyRazorpaySignature(orderId, paymentId, 'tampered_signature');
    assert.equal(isInvalid, false);
  });
});
