import crypto from 'crypto';

const AUTH_SECRET = process.env.AUTH_SECRET || 'brewpluse_enterprise_secret_key_2026_super_secure';

export interface UserSession {
  uid: string;
  email: string;
  role: 'owner' | 'manager' | 'cashier' | 'barista';
  storeName: string;
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
export function createSessionToken(user: { uid: string; email: string; role?: string; storeName?: string }): string {
  const payload: UserSession = {
    uid: user.uid,
    email: user.email,
    role: (user.role as any) || 'owner',
    storeName: user.storeName || 'BrewPluse Artisan Coffee',
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 7 days
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
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
    const [payloadB64, signature] = token.split('.');

    const expectedSignature = crypto
      .createHmac('sha256', AUTH_SECRET)
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
