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
 * Verify Razorpay Client HMAC-SHA256 Signature (orderId|paymentId).
 * Fails closed if secret is missing outside explicit NODE_ENV === 'test'.
 * Uses timing-safe buffer comparison.
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  if (!orderId || !paymentId || !signature) {
    return false;
  }

  const isTest = process.env.NODE_ENV === 'test';
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    if (isTest) {
      return signature === 'test_valid_mock_signature';
    }
    console.error(
      '[Razorpay Security Alert] RAZORPAY_KEY_SECRET is missing. Failing closed.'
    );
    return false;
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

/**
 * Verify Razorpay Webhook Signature (raw payload against X-Razorpay-Signature).
 * Fails closed if secret is missing outside explicit NODE_ENV === 'test'.
 * Uses timing-safe buffer comparison.
 */
export function verifyRazorpayWebhookSignature(
  rawBody: string | Buffer,
  signature: string
): boolean {
  if (!rawBody || !signature) {
    return false;
  }

  const isTest = process.env.NODE_ENV === 'test';
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    if (isTest) {
      return signature === 'test_valid_webhook_signature';
    }
    console.error(
      '[Razorpay Webhook Alert] RAZORPAY_WEBHOOK_SECRET is missing. Rejecting webhook.'
    );
    return false;
  }

  try {
    const bodyStr = typeof rawBody === 'string' ? rawBody : rawBody.toString('utf8');
    const generatedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(bodyStr)
      .digest('hex');

    const genBuf = Buffer.from(generatedSignature, 'utf8');
    const sigBuf = Buffer.from(signature, 'utf8');

    if (genBuf.length !== sigBuf.length) {
      return false;
    }

    return crypto.timingSafeEqual(genBuf, sigBuf);
  } catch (err) {
    console.error('[Razorpay Webhook Error]:', err);
    return false;
  }
}
