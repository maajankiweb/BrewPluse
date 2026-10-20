import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Setup test env
process.env.NODE_ENV = 'test';
process.env.AUTH_SECRET = 'test_secret_must_be_32_characters_long_minimum!';
process.env.GUEST_SESSION_SECRET = 'test_guest_secret_32_chars_long_minimum!';

import { generateTableToken } from '../src/lib/models/Table';
import {
  createSessionToken,
  verifySessionToken,
  requireStaff,
} from '../src/lib/authService';
import {
  createGuestSessionToken,
  verifyGuestSessionToken,
} from '../src/lib/guestSession';

describe('Phase 1: Tables & QR Ordering', () => {
  describe('1. Table Token Generation', () => {
    it('should generate unguessable, URL-safe tokens of at least 12 characters', () => {
      const token1 = generateTableToken(9);
      const token2 = generateTableToken(9);

      assert.ok(token1.length >= 12, 'Token should be at least 12 characters');
      assert.ok(token2.length >= 12, 'Token should be at least 12 characters');
      assert.notEqual(token1, token2, 'Two tokens must be unique');

      // Check URL-safe characters (base64url: a-z, A-Z, 0-9, -, _)
      assert.match(token1, /^[a-zA-Z0-9_-]+$/, 'Token must only contain URL-safe characters');
    });
  });

  describe('2. Staff Authorization (requireStaff)', () => {
    it('should reject unauthenticated requests with 401', () => {
      const req = new Request('http://localhost:3000/api/admin/tables');
      const auth = requireStaff(req, ['owner', 'manager']);

      assert.equal(auth.success, false);
      assert.equal(auth.response?.status, 401);
    });

    it('should reject unauthorized role with 403', () => {
      const token = createSessionToken({
        uid: 'user-barista',
        email: 'barista@test.com',
        role: 'barista',
        storeSlug: 'test-cafe',
      });

      const req = new Request('http://localhost:3000/api/admin/tables', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const auth = requireStaff(req, ['owner', 'manager']);

      assert.equal(auth.success, false);
      assert.equal(auth.response?.status, 403);
    });

    it('should allow authorized manager or owner with 200 context', () => {
      const token = createSessionToken({
        uid: 'user-owner',
        email: 'owner@test.com',
        role: 'owner',
        storeSlug: 'demo-cafe',
      });

      const req = new Request('http://localhost:3000/api/admin/tables', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const auth = requireStaff(req, ['owner', 'manager']);

      assert.equal(auth.success, true);
      assert.equal(auth.session?.storeSlug, 'demo-cafe');
      assert.equal(auth.session?.role, 'owner');
    });
  });

  describe('3. Guest Session Token (HMAC-SHA256)', () => {
    it('should create and verify signed guest session token', () => {
      const guestToken = createGuestSessionToken({
        tableId: 'tbl_123',
        storeId: 'demo-cafe',
      });

      assert.ok(guestToken.includes('.'), 'Guest token must be payload.signature format');

      const verified = verifyGuestSessionToken(guestToken);
      assert.ok(verified, 'Verification must succeed on untampered token');
      assert.equal(verified?.tableId, 'tbl_123');
      assert.equal(verified?.storeId, 'demo-cafe');
    });

    it('should reject tampered guest session token', () => {
      const guestToken = createGuestSessionToken({
        tableId: 'tbl_123',
        storeId: 'demo-cafe',
      });

      const [payload, sig] = guestToken.split('.');
      const tampered = `${payload}X.${sig}`;

      const verified = verifyGuestSessionToken(tampered);
      assert.equal(verified, null, 'Tampered token must be rejected');
    });
  });
});
