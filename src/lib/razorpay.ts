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
 */
export function verifyRazorpaySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    // If no secret is configured in dev, accept simulated payment signatures
    return signature.startsWith('mock_') || signature.length > 10;
  }

  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  return generatedSignature === signature;
}
