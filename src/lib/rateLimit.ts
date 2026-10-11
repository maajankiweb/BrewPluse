/**
 * High-performance sliding-window in-memory Rate Limiter
 * Protects auth and OTP endpoints against brute-force & flooding attacks.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const store: Record<string, RateLimitRecord> = {};

// Cleanup stale entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  const keys = Object.keys(store);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    store[key].timestamps = store[key].timestamps.filter((ts) => now - ts < 60 * 60 * 1000);
    if (store[key].timestamps.length === 0) {
      delete store[key];
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  resetSeconds: number;
}

export function rateLimit(
  key: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): RateLimitResult {
  const now = Date.now();
  if (!store[key]) {
    store[key] = { timestamps: [] };
  }
  const record = store[key];

  // Retain timestamps within the sliding window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (record.timestamps.length >= limit) {
    const oldest = record.timestamps[0];
    const resetSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    return {
      success: false,
      limit,
      remaining: 0,
      resetSeconds: Math.max(resetSeconds, 1),
    };
  }

  record.timestamps.push(now);

  const resetSeconds = Math.ceil(windowMs / 1000);
  return {
    success: true,
    limit,
    remaining: limit - record.timestamps.length,
    resetSeconds,
  };
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}
