/**
 * BrewPluse Firestore Security Rules (v2.1) Unit Test Suite
 * Tests multi-tenant isolation, customer payment protection, staff immutability, and menu write protection.
 */

import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const PROJECT_ID = 'demo-brewpluse-rules-test';
const RULES_PATH = resolve(process.cwd(), 'firestore.rules');

async function runTests() {
  console.log('--- [BrewPluse] Initializing Firestore Rules Test Environment ---');
  
  const rules = readFileSync(RULES_PATH, 'utf8');
  let testEnv;

  try {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        rules,
        host: process.env.FIRESTORE_EMULATOR_HOST?.split(':')[0] || '127.0.0.1',
        port: parseInt(process.env.FIRESTORE_EMULATOR_HOST?.split(':')[1] || '8080', 10),
      },
    });

    console.log('✓ Connected to Firestore Test Environment');

    // -------------------------------------------------------------
    // Initial Seed: Seed existing documents with security rules bypassed
    // -------------------------------------------------------------
    await testEnv.withSecurityRulesDisabled(async (context) => {
      const adminDb = context.firestore();

      // Seed a store
      await adminDb.collection('stores').doc('cafe-alpha').set({
        name: 'Cafe Alpha',
        ownerUid: 'owner_alpha',
      });

      // Seed an order belonging to cafe-alpha
      await adminDb.collection('orders').doc('order_alpha_101').set({
        storeId: 'cafe-alpha',
        orderNumber: 'BP-101',
        table: 'Table 1',
        orderType: 'dine_in',
        items: [{ id: 'latte', name: 'Latte', qty: 2, price: 150 }],
        subtotal: 300,
        discount: 0,
        tax: 15,
        total: 315,
        status: 'pending',
        paymentMode: 'Cash',
        paymentStatus: 'pending',
        customerName: 'Aarav',
        customerPhone: '+919876543210',
        customerUid: 'cust_anon_1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      // Seed a menu for cafe-alpha
      await adminDb.collection('menus').doc('cafe-alpha').set({
        storeSlug: 'cafe-alpha',
        items: [{ id: 'latte', name: 'Latte', price: 150 }],
      });
    });

    console.log('✓ Seeded baseline test data into emulator');

    // Create user contexts
    const cafeBetaStaff = testEnv.authenticatedContext('staff_beta_1', {
      storeSlug: 'cafe-beta',
      role: 'staff',
    });

    const cafeAlphaStaff = testEnv.authenticatedContext('staff_alpha_1', {
      storeSlug: 'cafe-alpha',
      role: 'staff',
    });

    const cafeAlphaManager = testEnv.authenticatedContext('mgr_alpha_1', {
      storeSlug: 'cafe-alpha',
      role: 'manager',
    });

    const anonCustomer = testEnv.authenticatedContext('cust_anon_2');

    let passedCount = 0;

    // -------------------------------------------------------------
    // Test 1: Kisi doosre store ka order padhna fail ho
    // -------------------------------------------------------------
    console.log('\n[TEST 1] Verifying cross-store isolation: Cafe Beta staff cannot read Cafe Alpha order...');
    const betaDb = cafeBetaStaff.firestore();
    const orderRefBeta = betaDb.collection('orders').doc('order_alpha_101');
    await assertFails(orderRefBeta.get());
    console.log('  -> PASS: Cafe Beta staff was REJECTED from reading Cafe Alpha order.');

    // Counter check: Cafe Alpha staff CAN read Cafe Alpha order
    const alphaDb = cafeAlphaStaff.firestore();
    await assertSucceeds(alphaDb.collection('orders').doc('order_alpha_101').get());
    console.log('  -> PASS: Cafe Alpha staff was SUCCEEDED in reading Cafe Alpha order.');
    passedCount++;

    // -------------------------------------------------------------
    // Test 2: Customer ka paid order create fail ho
    // -------------------------------------------------------------
    console.log('\n[TEST 2] Verifying customer cannot self-assign paymentStatus: "paid" on order creation...');
    const custDb = anonCustomer.firestore();
    const forgedPaidOrder = custDb.collection('orders').doc('order_forged_paid');
    await assertFails(
      forgedPaidOrder.set({
        storeId: 'cafe-alpha',
        orderNumber: 'BP-FORGED',
        table: 'Table 4',
        orderType: 'dine_in',
        items: [{ id: 'latte', name: 'Latte', qty: 1, price: 150 }],
        subtotal: 150,
        discount: 0,
        tax: 0,
        total: 150,
        status: 'pending',
        paymentMode: 'Razorpay',
        paymentStatus: 'paid', // <-- MALICIOUS INJECTION
        customerName: 'Hacker',
        customerPhone: '+919999999999',
        customerUid: 'cust_anon_2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
    console.log('  -> PASS: Customer cannot forge paymentStatus: "paid" (REJECTED as expected).');

    // Counter check: Customer creating order with paymentStatus: "pending" succeeds
    const legitimateOrder = custDb.collection('orders').doc('order_legit_pending');
    await assertSucceeds(
      legitimateOrder.set({
        storeId: 'cafe-alpha',
        orderNumber: 'BP-LEGIT',
        table: 'Table 4',
        orderType: 'dine_in',
        items: [{ id: 'latte', name: 'Latte', qty: 1, price: 150 }],
        subtotal: 150,
        discount: 0,
        tax: 0,
        total: 150,
        status: 'pending',
        paymentMode: 'Cash',
        paymentStatus: 'pending', // <-- LEGITIMATE
        customerName: 'Honest Guest',
        customerPhone: '+919999999999',
        customerUid: 'cust_anon_2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
    );
    console.log('  -> PASS: Customer legitimate pending order creation SUCCEEDED.');
    passedCount++;

    // -------------------------------------------------------------
    // Test 3: Staff ka total / items badalna fail ho
    // -------------------------------------------------------------
    console.log('\n[TEST 3] Verifying staff cannot alter order total or items during status updates...');
    const alphaOrderRef = alphaDb.collection('orders').doc('order_alpha_101');
    await assertFails(
      alphaOrderRef.update({
        total: 99999, // <-- FORBIDDEN MODIFICATION
        updatedAt: new Date().toISOString(),
      })
    );
    console.log('  -> PASS: Staff altering order total was REJECTED.');

    // Counter check: Staff CAN update status, paymentStatus, and updatedAt
    await assertSucceeds(
      alphaOrderRef.update({
        status: 'preparing',
        paymentStatus: 'paid',
        paymentMode: 'Cash',
        updatedAt: new Date().toISOString(),
      })
    );
    console.log('  -> PASS: Staff updating kitchen status and cash payment SUCCEEDED.');
    passedCount++;

    // -------------------------------------------------------------
    // Test 4: Anonymous user ka menu likhna fail ho
    // -------------------------------------------------------------
    console.log('\n[TEST 4] Verifying anonymous user cannot write or tamper with menus...');
    const menuRefAnon = custDb.collection('menus').doc('cafe-alpha');
    await assertFails(
      menuRefAnon.set({
        storeSlug: 'cafe-alpha',
        items: [{ id: 'cheap-coffee', name: 'Free Coffee', price: 0 }],
      })
    );
    console.log('  -> PASS: Anonymous user writing to menu was REJECTED.');

    // Counter check: Cafe Alpha Manager CAN update Cafe Alpha menu
    const mgrDb = cafeAlphaManager.firestore();
    await assertSucceeds(
      mgrDb.collection('menus').doc('cafe-alpha').update({
        storeSlug: 'cafe-alpha',
        items: [{ id: 'latte', name: 'Artisan Latte', price: 180 }],
      })
    );
    console.log('  -> PASS: Store Manager updating menu SUCCEEDED.');
    passedCount++;

    console.log(`\n======================================================`);
    console.log(`🎉 ALL ${passedCount}/4 FIRESTORE SECURITY RULES TESTS PASSED!`);
    console.log(`======================================================\n`);
  } finally {
    if (testEnv) {
      await testEnv.cleanup();
    }
  }
}

runTests().catch((err) => {
  console.error('\n❌ Test execution failed:', err);
  process.exit(1);
});
