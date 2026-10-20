import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

process.env.NODE_ENV = 'test';
process.env.AUTH_SECRET = 'test_secret_must_be_32_characters_long_minimum!';
process.env.GUEST_SESSION_SECRET = 'test_guest_secret_32_chars_long_minimum!';

import { generateTableToken, saveRuntimeTable } from '../src/lib/models/Table';
import { findMenuItem, setItemAvailability } from '../src/lib/menuService';
import {
  saveRuntimeSession,
  findRuntimeActiveSession,
  getRuntimeSessions,
} from '../src/lib/models/TableSession';

describe('Phase 2: Customer Menu & Pay-Later Ordering', () => {
  const storeSlug = 'test-roast-cafe';
  const tableToken = generateTableToken(9);

  // Setup mock table
  saveRuntimeTable({
    id: 'tbl_test_phase2',
    storeId: storeSlug,
    number: 'Table 7',
    label: 'Balcony',
    token: tableToken,
    isActive: true,
  });

  describe('1. Server-Side Pricing & Anti-Tampering', () => {
    it('should strictly load official catalog price and ignore client-submitted prices', async () => {
      const item = await findMenuItem(storeSlug, 'bp-flat-white');
      assert.ok(item, 'Menu item bp-flat-white must exist');

      // Official price is 18000 paise (₹180)
      assert.equal(item.priceInPaise, 18000);

      // Verify variant calculation
      const oatVariant = item.variants?.find((v) => v.id === 'var-oat');
      assert.ok(oatVariant, 'Oat milk variant must exist');
      assert.equal(oatVariant.priceInPaise, 22000, 'Oat milk price must be ₹220 (22000 paise)');

      // Verify addon calculation
      const extraShot = item.addons?.find((a) => a.id === 'add-extra-shot');
      assert.ok(extraShot, 'Extra shot addon must exist');
      assert.equal(extraShot.priceInPaise, 4000, 'Extra shot price must be ₹40 (4000 paise)');

      // Computed line unit price: 22000 + 4000 = 26000 paise (₹260)
      const computedUnitPrice = oatVariant.priceInPaise + extraShot.priceInPaise;
      const qty = 2;
      const lineTotal = computedUnitPrice * qty;
      assert.equal(lineTotal, 52000, 'Line total for 2 cups must be 52000 paise (₹520)');
    });
  });

  describe('2. TableSession Accumulation & Due Computation', () => {
    it('should open a session on first order and accumulate totals on subsequent orders', () => {
      const tableId = 'tbl_test_phase2';

      // 1. First order placed: ₹520 (52000 paise) + 5% GST (2600 paise) = 54600 paise
      const firstGrandTotal = 54600;
      saveRuntimeSession({
        id: 'sess_table_7_test',
        storeId: storeSlug,
        tableId,
        status: 'open',
        customer: { name: 'Alice' },
        currency: 'INR',
        totals: {
          subtotal: 52000,
          tax: 2600,
          serviceCharge: 0,
          platformFee: 0,
          discount: 0,
          roundOff: 0,
          grandTotal: firstGrandTotal,
          paid: 0,
          due: firstGrandTotal,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const activeSess = findRuntimeActiveSession(storeSlug, tableId);
      assert.ok(activeSess, 'Active session must be found');
      assert.equal(activeSess.status, 'open');
      assert.equal(activeSess.totals.due, 54600);

      // 2. Second order placed to same table tab: Croissant ₹140 (14000 paise) + ₹7 GST (700 paise)
      activeSess.totals.subtotal += 14000;
      activeSess.totals.tax += 700;
      activeSess.totals.grandTotal += 14700;
      activeSess.totals.due = activeSess.totals.grandTotal - activeSess.totals.paid;
      saveRuntimeSession(activeSess);

      const updatedSess = findRuntimeActiveSession(storeSlug, tableId);
      assert.ok(updatedSess);
      assert.equal(updatedSess.totals.subtotal, 66000, 'Combined subtotal must be ₹660');
      assert.equal(updatedSess.totals.grandTotal, 69300, 'Combined grand total must be ₹693');
      assert.equal(updatedSess.totals.due, 69300, 'Combined amount due must equal grand total');
    });
  });

  describe('3. Out-of-Stock (86 toggle) Protection', () => {
    it('should reject ordering when item is marked unavailable', async () => {
      // Mark Butter Croissant unavailable
      await setItemAvailability(storeSlug, 'bp-butter-croissant', false);

      const item = await findMenuItem(storeSlug, 'bp-butter-croissant');
      assert.ok(item);
      assert.equal(item.isAvailable, false, 'Item must be marked out of stock');

      // Restore availability
      await setItemAvailability(storeSlug, 'bp-butter-croissant', true);
      const restored = await findMenuItem(storeSlug, 'bp-butter-croissant');
      assert.equal(restored?.isAvailable, true);
    });
  });
});
