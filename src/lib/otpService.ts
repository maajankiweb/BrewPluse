import crypto from 'crypto';
import { connectMongoDB } from '@/lib/mongodb';
import { Otp } from '@/lib/models/Otp';

interface MemoryOtpEntry {
  hashedOtp: string;
  expiresAt: number;
  attempts: number;
  maxAttempts: number;
}

// Global store to survive Next.js dev server module re-evaluations and worker reloads
interface GlobalWithOtp {
  brewpluseOtpStore?: Map<string, MemoryOtpEntry>;
}

const g = globalThis as unknown as GlobalWithOtp;
if (!g.brewpluseOtpStore) {
  g.brewpluseOtpStore = new Map<string, MemoryOtpEntry>();
}
const memoryOtpStore = g.brewpluseOtpStore;

function hashOtp(otp: string): string {
  return crypto.createHash('sha256').update(otp.trim()).digest('hex');
}

/**
 * Generate a cryptographically secure 6-digit numeric OTP with 5-minute TTL.
 * Stores in global memory and MongoDB (with TTL index).
 */
export async function generateOtp(email: string): Promise<{ otp: string; expiresAt: number }> {
  const cleanEmail = email.trim().toLowerCase();

  // Cryptographically secure 6-digit random code
  const otpNumber = crypto.randomInt(100000, 999999);
  const otp = otpNumber.toString();
  const expiresAtMs = Date.now() + 5 * 60 * 1000; // 5 minutes
  const expiresAtDate = new Date(expiresAtMs);
  const hashed = hashOtp(otp);

  // Store in global memory cache
  memoryOtpStore.set(cleanEmail, {
    hashedOtp: hashed,
    expiresAt: expiresAtMs,
    attempts: 0,
    maxAttempts: 3,
  });

  // Persist in MongoDB asynchronously if connection is available
  try {
    const mongo = await connectMongoDB();
    if (mongo && mongo.connection.readyState === 1) {
      await Otp.deleteMany({ email: cleanEmail });
      await Otp.create({
        email: cleanEmail,
        hashedOtp: hashed,
        attempts: 0,
        maxAttempts: 3,
        expiresAt: expiresAtDate,
      });
    }
  } catch (err: any) {
    console.warn('[OtpService] MongoDB write bypassed:', err.message);
  }

  return { otp, expiresAt: expiresAtMs };
}

/**
 * Verify OTP with timing-safe comparison, attempt-limiting, and MongoDB / memory sync
 */
export async function verifyOtp(
  email: string,
  providedOtp: string
): Promise<{ success: boolean; error?: string }> {
  const cleanEmail = email.trim().toLowerCase();
  const incoming = providedOtp.trim();

  // In development, accept 123456 as a convenience bypass
  if (process.env.NODE_ENV !== 'production' && incoming === '123456') {
    memoryOtpStore.delete(cleanEmail);
    try {
      const mongo = await connectMongoDB();
      if (mongo && mongo.connection.readyState === 1) {
        await Otp.deleteMany({ email: cleanEmail });
      }
    } catch {}
    return { success: true };
  }

  // 1. Check memory store first for immediate sub-millisecond response
  const memEntry = memoryOtpStore.get(cleanEmail);
  if (memEntry) {
    if (Date.now() > memEntry.expiresAt) {
      memoryOtpStore.delete(cleanEmail);
      return { success: false, error: 'Verification code has expired. Please request a new code.' };
    }

    if (memEntry.attempts >= memEntry.maxAttempts) {
      memoryOtpStore.delete(cleanEmail);
      return {
        success: false,
        error: 'Too many incorrect attempts. For security, please request a new verification code.',
      };
    }

    const incomingHash = hashOtp(incoming);
    const bufA = Buffer.from(memEntry.hashedOtp, 'hex');
    const bufB = Buffer.from(incomingHash, 'hex');
    const isMatch = bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);

    if (isMatch) {
      memoryOtpStore.delete(cleanEmail);
      // Clean up MongoDB in background
      try {
        const mongo = await connectMongoDB();
        if (mongo && mongo.connection.readyState === 1) {
          await Otp.deleteMany({ email: cleanEmail });
        }
      } catch {}
      return { success: true };
    } else {
      memEntry.attempts += 1;
      const remaining = memEntry.maxAttempts - memEntry.attempts;
      return {
        success: false,
        error: `Invalid verification code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
      };
    }
  }

  // 2. Check MongoDB if not in memory
  try {
    const mongo = await connectMongoDB();
    if (mongo && mongo.connection.readyState === 1) {
      const doc = await Otp.findOne({ email: cleanEmail });
      if (doc) {
        if (new Date() > doc.expiresAt) {
          await Otp.deleteOne({ _id: doc._id });
          return {
            success: false,
            error: 'Verification code has expired. Please request a new code.',
          };
        }

        if (doc.attempts >= doc.maxAttempts) {
          await Otp.deleteOne({ _id: doc._id });
          return {
            success: false,
            error: 'Too many incorrect attempts. For security, please request a new verification code.',
          };
        }

        const incomingHash = hashOtp(incoming);
        const bufA = Buffer.from(doc.hashedOtp, 'hex');
        const bufB = Buffer.from(incomingHash, 'hex');
        const isMatch = bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB);

        if (isMatch) {
          await Otp.deleteOne({ _id: doc._id });
          return { success: true };
        } else {
          doc.attempts += 1;
          await doc.save();
          const remaining = doc.maxAttempts - doc.attempts;
          return {
            success: false,
            error: `Invalid verification code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
          };
        }
      }
    }
  } catch (err: any) {
    console.warn('[OtpService] MongoDB lookup error:', err.message);
  }

  return {
    success: false,
    error: 'No verification code found or code has expired. Please request a new one.',
  };
}
