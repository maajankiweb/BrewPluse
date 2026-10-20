import Razorpay from 'razorpay';
import crypto from 'crypto';

let razorpayInstance: Razorpay | null = null;

export function getRazorpay(): Razorpay | null {
  if (razorpayInstance) return razorpayInstance;

  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (keyId && keySecret) {
    try {
      razorpayInstance = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });
      return razorpayInstance;
    } catch (e: any) {
      console.warn('[Razorpay] Init note:', e?.message);
    }
  }

  return null;
}

/**
 * Verify Razorpay HMAC-SHA256 Signature
 * Strictly disallows mock mode in production and uses timing-safe buffer comparison.
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!orderId || !paymentId || !signature) {
    return false;
  }

  const isProduction = process.env.NODE_ENV === 'production';
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    if (isProduction) {
      console.error(
        '[Razorpay Security Alert] RAZORPAY_KEY_SECRET is not configured in production. Rejecting verification.'
      );
      return false;
    }
    // In local non-production development ONLY, allow explicit mock signatures
    return signature.startsWith('mock_');
  }

  try {
    const generatedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const genBuf = Buffer.from(generatedSignature, 'utf8');
    const sigBuf = Buffer.from(signature, 'utf8');

    if (genBuf.length !== sigBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(genBuf, sigBuf);
  } catch (err) {
    console.error('[Razorpay Signature Error]:', err);
    return false;
  }
}

