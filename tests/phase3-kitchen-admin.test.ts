import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

process.env.AUTH_SECRET = process.env.AUTH_SECRET || 'test-secret-key-32-bytes-long-super-secure';

import { isValidOrderTransition, getNextLogicalStatus } from '../src/lib/orderStateMachine';
import { createSessionToken, verifySessionToken } from '../src/lib/authService';

describe('Phase 3: Admin Dashboard, Kitchen & State Machine', () => {
  describe('1. Order State Machine Transition Matrix', () => {
    test('should allow forward standard kitchen progression', () => {
      assert.equal(isValidOrderTransition('placed', 'accepted').valid, true);
      assert.equal(isValidOrderTransition('accepted', 'preparing').valid, true);
      assert.equal(isValidOrderTransition('preparing', 'ready').valid, true);
      assert.equal(isValidOrderTransition('ready', 'served').valid, true);
    });

    test('should allow permitted kitchen shortcuts', () => {
      assert.equal(isValidOrderTransition('placed', 'preparing').valid, true);
      assert.equal(isValidOrderTransition('placed', 'ready').valid, true);
      assert.equal(isValidOrderTransition('preparing', 'served').valid, true);
    });

    test('should reject backward transitions', () => {
      const readyToPrep = isValidOrderTransition('ready', 'preparing');
      assert.equal(readyToPrep.valid, false);
      assert.match(readyToPrep.reason || '', /cannot move order from 'ready' to 'preparing'/);

      const servedToReady = isValidOrderTransition('served', 'ready');
      assert.equal(servedToReady.valid, false);

      const servedToPlaced = isValidOrderTransition('served', 'placed');
      assert.equal(servedToPlaced.valid, false);
    });

    test('should reject invalid jumps to completed or from cancelled', () => {
      assert.equal(isValidOrderTransition('placed', 'completed').valid, false);
      assert.equal(isValidOrderTransition('cancelled', 'placed').valid, false);
      assert.equal(isValidOrderTransition('completed', 'preparing').valid, false);
    });

    test('should compute next logical status correctly', () => {
      assert.equal(getNextLogicalStatus('placed'), 'accepted');
      assert.equal(getNextLogicalStatus('accepted'), 'preparing');
      assert.equal(getNextLogicalStatus('preparing'), 'ready');
      assert.equal(getNextLogicalStatus('ready'), 'served');
      assert.equal(getNextLogicalStatus('served'), null);
    });
  });

  describe('2. Staff Role Tokens & Scoping', () => {
    test('should generate and sign tokens for chef, cashier, and manager roles', () => {
      const chefToken = createSessionToken({
        uid: 'chef_01',
        email: 'chef@cafe.com',
        role: 'chef',
        storeSlug: 'demo-cafe',
      });
      assert.ok(chefToken && chefToken.split('.').length === 2);
      const parsedChef = verifySessionToken(chefToken);
      assert.equal(parsedChef?.role, 'chef');
      assert.equal(parsedChef?.storeSlug, 'demo-cafe');

      const cashierToken = createSessionToken({
        uid: 'cash_01',
        email: 'cashier@cafe.com',
        role: 'cashier',
        storeSlug: 'demo-cafe',
      });
      assert.ok(cashierToken);
      const parsedCashier = verifySessionToken(cashierToken);
      assert.equal(parsedCashier?.role, 'cashier');
    });
  });

  describe('3. Kitchen Ticket Privacy Rule (§8)', () => {
    test('kitchen ticket payload must strip all pricing and payment fields', () => {
      const rawOrder = {
        _id: 'ord_123',
        orderNumber: 'BP-1001',
        table: 'Table 4',
        status: 'placed',
        subtotal: 550,
        discount: 0,
        tax: 27.5,
        total: 577.5,
        paymentStatus: 'pending',
        paymentIntent: 'pay_later',
        paymentMode: 'Cash',
        notes: 'Extra hot',
        items: [
          {
            name: 'Cappuccino',
            quantity: 2,
            price: 250,
            unitPrice: 25000,
            lineTotal: 50000,
            variant: { name: 'Large', price: 25000 },
            addons: [{ name: 'Oat Milk', price: 5000 }],
            notes: 'Extra foam',
          },
        ],
        createdAt: new Date(Date.now() - 6 * 60 * 1000), // 6 minutes ago
      };

      // Sanitize as /api/kitchen/orders does
      const now = Date.now();
      const createdTime = new Date(rawOrder.createdAt).getTime();
      const elapsedMinutes = Math.floor((now - createdTime) / 60000);

      const ticket = {
        id: rawOrder._id,
        orderNumber: rawOrder.orderNumber,
        table: rawOrder.table,
        status: rawOrder.status,
        notes: rawOrder.notes,
        items: rawOrder.items.map((i) => ({
          name: i.name,
          qty: i.quantity,
          variant: i.variant?.name,
          addons: i.addons?.map((a) => a.name),
          note: i.notes,
        })),
        createdAt: rawOrder.createdAt,
        elapsedMinutes,
      };

      // Strict privacy assertions
      assert.equal((ticket as any).price, undefined);
      assert.equal((ticket as any).subtotal, undefined);
      assert.equal((ticket as any).total, undefined);
      assert.equal((ticket as any).paymentStatus, undefined);
      assert.equal((ticket as any).paymentMode, undefined);
      assert.equal((ticket as any).paymentIntent, undefined);
      assert.equal((ticket.items[0] as any).price, undefined);
      assert.equal((ticket.items[0] as any).unitPrice, undefined);
      assert.equal((ticket.items[0] as any).lineTotal, undefined);

      // Operational info must be preserved
      assert.equal(ticket.orderNumber, 'BP-1001');
      assert.equal(ticket.table, 'Table 4');
      assert.equal(ticket.items[0].name, 'Cappuccino');
      assert.equal(ticket.items[0].variant, 'Large');
      assert.deepEqual(ticket.items[0].addons, ['Oat Milk']);
      assert.equal(ticket.elapsedMinutes, 6);
    });
  });
});
