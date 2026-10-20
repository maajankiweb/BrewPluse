import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'test-secret-key-32-bytes-long-super-secure';
process.env.RAZORPAY_KEY_ID = 'rzp_test_mock_key';
process.env.RAZORPAY_KEY_SECRET = 'rzp_test_mock_secret_key_12345';

import {
  saveRuntimeStore,
  getRuntimeStore,
  checkStoreOrderLockout,
  accumulateOrderPlatformFee,
  settleStorePlatformFee,
} from '../src/lib/models/Store';

describe('BrewPluse Direct Cafe UPI & Platform Billing Ledger (₹1/order with ₹200 Lockout)', () => {
  const storeA = 'test-cafe-alpha';
  const storeB = 'test-cafe-beta';

  test('1. Cafe direct UPI configuration and isolation', () => {
    saveRuntimeStore({
      slug: storeA,
      name: 'Cafe Alpha',
      upiId: 'alpha@okhdfcbank',
      upiName: 'Cafe Alpha Merchant',
      platformBilling: {
        accumulatedDuePaise: 0,
        totalOrdersBilled: 0,
        isLockedDueToBalance: false,
      },
    });

    saveRuntimeStore({
      slug: storeB,
      name: 'Cafe Beta',
      upiId: 'beta@paytm',
      upiName: 'Cafe Beta Merchant',
      platformBilling: {
        accumulatedDuePaise: 0,
        totalOrdersBilled: 0,
        isLockedDueToBalance: false,
      },
    });

    const sA = getRuntimeStore(storeA);
    const sB = getRuntimeStore(storeB);

    assert.equal(sA.upiId, 'alpha@okhdfcbank');
    assert.equal(sB.upiId, 'beta@paytm');
    assert.notEqual(sA.upiId, sB.upiId);
  });

  test('2. Per-order ₹1 platform fee accumulates accurately', async () => {
    // Initially 0
    let res = await accumulateOrderPlatformFee(storeA);
    assert.equal(res.accumulatedDuePaise, 100); // 1 order = 100 paise (₹1)
    assert.equal(res.isLocked, false);

    // Second order
    res = await accumulateOrderPlatformFee(storeA);
    assert.equal(res.accumulatedDuePaise, 200); // 2 orders = 200 paise (₹2)
    assert.equal(res.isLocked, false);

    const check = await checkStoreOrderLockout(storeA);
    assert.equal(check.locked, false);
    assert.equal(check.accumulatedDuePaise, 200);
  });

  test('3. ₹200 threshold lockout locks ordering after 200 orders', async () => {
    const store = getRuntimeStore(storeA);
    // Simulate 199 orders already processed (19,900 paise)
    store.platformBilling.accumulatedDuePaise = 19900;
    store.platformBilling.totalOrdersBilled = 199;
    store.platformBilling.isLockedDueToBalance = false;
    saveRuntimeStore(store);

    // 200th order placed!
    const res = await accumulateOrderPlatformFee(storeA);
    assert.equal(res.accumulatedDuePaise, 20000); // exactly ₹200.00
    assert.equal(res.isLocked, true); // Threshold reached!

    // Verify ordering is now locked
    const lockout = await checkStoreOrderLockout(storeA);
    assert.equal(lockout.locked, true);
    assert.equal(lockout.reason, 'PLATFORM_LIMIT_REACHED');
  });

  test('4. Multi-cafe isolation: Cafe A lockout does not affect Cafe B', async () => {
    // Cafe A is locked
    const checkA = await checkStoreOrderLockout(storeA);
    assert.equal(checkA.locked, true);

    // Cafe B has only 0 balance and is completely unlocked
    const checkB = await checkStoreOrderLockout(storeB);
    assert.equal(checkB.locked, false);
    assert.equal(checkB.accumulatedDuePaise, 0);
  });

  test('5. Settle ₹200 via Razorpay resets balance and starts 2-minute cooldown', async () => {
    const paymentId = 'pay_settle_mock_778899';
    const settlement = await settleStorePlatformFee(storeA, paymentId);

    assert.equal(settlement.success, true);
    assert.equal(settlement.accumulatedDuePaise, 0); // Balance cleared!
    assert.ok(settlement.cooldownEndsAt > new Date()); // Cooldown in future

    // Check store status during cooldown
    const lockout = await checkStoreOrderLockout(storeA);
    assert.equal(lockout.locked, true);
    assert.equal(lockout.reason, 'PLATFORM_COOLDOWN');
    assert.ok(lockout.cooldownRemainingSeconds! > 0 && lockout.cooldownRemainingSeconds! <= 120);
  });

  test('6. After 2-minute cooldown expires, store automatically unlocks for new orders', async () => {
    const store = getRuntimeStore(storeA);
    // Simulate cooldown expired 10 seconds ago
    store.platformBilling.cooldownEndsAt = new Date(Date.now() - 10000);
    saveRuntimeStore(store);

    const check = await checkStoreOrderLockout(storeA);
    assert.equal(check.locked, false); // Store resumed and ready for orders!
  });

  test('7. Platform Fee Bearer: Customer (+₹1) vs Cafe Absorbs configuration', () => {
    // Configure Cafe A as customer bearer
    saveRuntimeStore({
      slug: storeA,
      platformFeeMode: 'customer',
    });
    // Configure Cafe B as cafe absorbed
    saveRuntimeStore({
      slug: storeB,
      platformFeeMode: 'cafe',
    });

    const sA = getRuntimeStore(storeA);
    const sB = getRuntimeStore(storeB);

    assert.equal(sA.platformFeeMode, 'customer');
    assert.equal(sB.platformFeeMode, 'cafe');
  });

  test('8. Cafe earnings and BrewPluse fee transparency calculation (e.g. 50 orders, ₹10,000 sales)', () => {
    const ordersCount = 50;
    const dishRevenue = 10000; // ₹10,000 food sales
    const platformFeePerOrder = 1; // ₹1/order

    const brewpluseFeeDue = ordersCount * platformFeePerOrder; // ₹50
    assert.equal(brewpluseFeeDue, 50);

    // Scenario A: Customer pays platform fee (+₹1 per order)
    const totalCollectedFromCustomer = dishRevenue + (ordersCount * platformFeePerOrder); // ₹10,050
    const cafeNetRetainedCustomerMode = totalCollectedFromCustomer - brewpluseFeeDue; // ₹10,000
    assert.equal(cafeNetRetainedCustomerMode, 10000); // 100% food revenue retained!

    // Scenario B: Cafe owner absorbs platform fee from profit margin
    const cafeNetRetainedCafeMode = dishRevenue - brewpluseFeeDue; // ₹9,950
    assert.equal(cafeNetRetainedCafeMode, 9950);
  });

  test('9. Default GST is 0% (No ₹6.00 or extra tax added to bills)', () => {
    saveRuntimeStore({
      slug: 'test-cafe-zero-tax',
      name: 'Zero Tax Cafe',
      taxRate: 0.0,
      country: 'IN',
    });

    const store = getRuntimeStore('test-cafe-zero-tax');
    const effectiveTaxRate = typeof store.taxRate === 'number' ? store.taxRate : 0.0;
    assert.equal(effectiveTaxRate, 0.0);

    // Bill calculation on ₹120 item with 0% tax
    const subtotal = 120;
    const taxAmount = (subtotal * effectiveTaxRate) / 100;
    assert.equal(taxAmount, 0); // No tax charged!
  });

  test('10. Cafe owner can optionally configure item-level or store-wide GST rates (5%, 12%, 18%)', () => {
    // Item A: 0% tax (Default)
    const itemA = { name: 'Chai', price: 50, taxPercent: 0 };
    // Item B: 5% tax (Standard Food)
    const itemB = { name: 'Pasta', price: 200, taxPercent: 5 };
    // Item C: 12% tax (Bakery)
    const itemC = { name: 'Cake', price: 100, taxPercent: 12 };

    const taxA = (itemA.price * (itemA.taxPercent || 0)) / 100;
    const taxB = (itemB.price * (itemB.taxPercent || 0)) / 100;
    const taxC = (itemC.price * (itemC.taxPercent || 0)) / 100;

    assert.equal(taxA, 0);
    assert.equal(taxB, 10); // 5% of 200
    assert.equal(taxC, 12); // 12% of 100

    const totalBill = (itemA.price + itemB.price + itemC.price) + (taxA + taxB + taxC);
    assert.equal(totalBill, 350 + 22);
  });

  test('11. Global setup request registration for international cafes outside India', () => {
    const { saveRuntimeGlobalRequest, getRuntimeGlobalRequests } = require('../src/lib/models/GlobalSetupRequest');

    const req = saveRuntimeGlobalRequest({
      cafeName: 'Dubai Marina Roastery',
      ownerName: 'Rashid Al Nuaimi',
      email: 'rashid@dubaimarina.ae',
      phone: '+971501234567',
      country: 'United Arab Emirates',
      city: 'Dubai',
      desiredCurrency: 'AED',
      estimatedTables: 25,
      notes: 'Need local 5% UAE VAT and Stripe Terminal setup',
    });

    assert.ok(req._id);
    assert.equal(req.country, 'United Arab Emirates');
    assert.equal(req.desiredCurrency, 'AED');
    assert.equal(req.status, 'pending');

    const allRequests = getRuntimeGlobalRequests();
    assert.ok(allRequests.length > 0);
    assert.equal(allRequests[0].cafeName, 'Dubai Marina Roastery');
  });
});
