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
});
