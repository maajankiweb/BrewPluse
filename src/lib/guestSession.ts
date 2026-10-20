import crypto from 'crypto';
import { NextResponse } from 'next/server';

function getGuestSecret(): string {
  const secret = process.env.GUEST_SESSION_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        'FATAL: GUEST_SESSION_SECRET environment variable is missing. Customer guest sessions cannot function safely in production.'
      );
    }
    return 'dev_guest_session_secret_32_characters_minimum_security!';
  }
  return secret;
}

export interface GuestSessionPayload {
  tableId: string;
  storeId: string;
  sessionId?: string;
  iat: number;
  exp: number;
}

export const GUEST_COOKIE_NAME = 'brewpluse_guest';
export const GUEST_SESSION_TTL_SECONDS = 12 * 60 * 60; // 12 hours

/**
 * Create a signed guest session token
 */
export function createGuestSessionToken(data: {
  tableId: string;
  storeId: string;
  sessionId?: string;
}): string {
  const secret = getGuestSecret();
  const now = Math.floor(Date.now() / 1000);
  const payload: GuestSessionPayload = {
    tableId: data.tableId,
    storeId: data.storeId,
    sessionId: data.sessionId,
    iat: now,
    exp: now + GUEST_SESSION_TTL_SECONDS,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', secret)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify and extract guest session payload
 */
export function verifyGuestSessionToken(token: string): GuestSessionPayload | null {
  try {
    if (!token || !token.includes('.')) return null;
    const secret = getGuestSecret();
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

    const payload: GuestSessionPayload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf8')
    );

    if (Math.floor(Date.now() / 1000) > payload.exp) {
      return null; // Expired
    }

    return payload;
  } catch {
    return null;
  }
}

/**
 * Set guest cookie on a NextResponse
 */
export function setGuestSessionCookie(response: NextResponse, token: string): void {
  const isProd = process.env.NODE_ENV === 'production';
  response.cookies.set({
    name: GUEST_COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: GUEST_SESSION_TTL_SECONDS,
  });
}

/**
 * Read and verify guest session from Request
 */
export function getGuestSessionFromRequest(req: Request): GuestSessionPayload | null {
  try {
    const cookieHeader = req.headers.get('cookie');
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(';').map((c) => c.trim());
    const target = cookies.find((c) => c.startsWith(`${GUEST_COOKIE_NAME}=`));
    if (!target) return null;

    const token = target.split('=')[1]?.trim();
    if (!token) return null;

    return verifyGuestSessionToken(token);
  } catch {
    return null;
  }
}
