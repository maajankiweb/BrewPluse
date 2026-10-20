import crypto from 'crypto';

function getAuthSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error(
      'FATAL: AUTH_SECRET environment variable is missing. Authentication cannot function without a secure secret configured.'
    );
  }
  return secret;
}

export interface UserSession {
  uid: string;
  email: string;
  role: 'owner' | 'manager' | 'cashier' | 'barista';
  storeName: string;
  storeSlug: string;
  iat: number;
  exp: number;
}

/**
 * Hash password with PBKDF2 (100,000 iterations, SHA-512, 16-byte random salt)
 */
export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    .toString('hex');
  return { hash, salt };
}

/**
 * Timing-safe password verification against stored salt & hash
 */
export function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  try {
    const computedHash = crypto
      .pbkdf2Sync(password, storedSalt, 100000, 64, 'sha512')
      .toString('hex');

    const bufComputed = Buffer.from(computedHash, 'hex');
    const bufStored = Buffer.from(storedHash, 'hex');

    if (bufComputed.length !== bufStored.length) {
      return false;
    }

    return crypto.timingSafeEqual(bufComputed, bufStored);
  } catch {
    return false;
  }
}

/**
 * Create a tamper-proof HMAC-SHA256 signed session token
 */
export function createSessionToken(user: {
  uid: string;
  email: string;
  role?: string;
  storeName?: string;
  storeSlug?: string;
}): string {
  const secret = getAuthSecret();
  const storeName = user.storeName || 'BrewPluse Cafe';
  const storeSlug =
    user.storeSlug ||
    storeName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') ||
    'my-cafe';

  const payload: UserSession = {
    uid: user.uid,
    email: user.email,
    role: (user.role as any) || 'owner',
    storeName,
    storeSlug,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify and parse HMAC-SHA256 signed session token
 */
export function verifySessionToken(token: string): UserSession | null {
  try {
    if (!token || !token.includes('.')) return null;
    const secret = getAuthSecret();
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payloadB64)
      .digest('base64url');

    const sigBuf = Buffer.from(signature);
    const expBuf = Buffer.from(expectedSignature);

    if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
      return null;
    }

    const payload: UserSession = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
    if (Date.now() / 1000 > payload.exp) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Extract and verify session from Request cookies or Authorization Bearer header
 */
export function getSessionFromRequest(req: Request): UserSession | null {
  try {
    // 1. Try Authorization header
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      const session = verifySessionToken(token);
      if (session) return session;
    }

    // 2. Try Cookie header
    const cookieHeader = req.headers.get('cookie');
    if (cookieHeader) {
      const cookies = cookieHeader.split(';').map((c) => c.trim());
      const sessionCookie = cookies.find((c) => c.startsWith('brewpluse_session='));
      if (sessionCookie) {
        const token = sessionCookie.split('=')[1]?.trim();
        if (token) {
          const session = verifySessionToken(token);
          if (session) return session;
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

import { NextResponse } from 'next/server';

export interface StaffAuthResult {
  authorized: boolean;
  success: boolean;
  session?: UserSession;
  user?: UserSession;
  storeSlug?: string;
  response?: NextResponse;
}

/**
 * Standardized staff authorization guard.
 * Extracts session from request, checks role authorization, and ensures storeSlug is strictly bound.
 */
export function requireStaff(
  req: Request,
  allowedRoles?: Array<'owner' | 'manager' | 'cashier' | 'barista' | 'chef' | string>
): StaffAuthResult {
  const session = getSessionFromRequest(req);
  if (!session) {
    return {
      authorized: false,
      success: false,
      response: NextResponse.json(
        { error: { code: 'UNAUTHORIZED', message: 'Authentication required. Please sign in.' } },
        { status: 401 }
      ),
    };
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
    return {
      authorized: false,
      success: false,
      response: NextResponse.json(
        { error: { code: 'FORBIDDEN', message: 'You do not have permission to access this resource.' } },
        { status: 403 }
      ),
    };
  }

  return {
    authorized: true,
    success: true,
    session,
    user: session,
    storeSlug: session.storeSlug,
  };
}
