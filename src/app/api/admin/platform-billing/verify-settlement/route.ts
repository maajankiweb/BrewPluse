import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireStaff } from '@/lib/authService';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { settleStorePlatformFee } from '@/lib/models/Store';
import { logPaymentAudit } from '@/lib/auditLog';

export const dynamic = 'force-dynamic';

const VerifySettlementSchema = z.object({
  razorpay_order_id: z.string().min(1, 'Order ID is required'),
  razorpay_payment_id: z.string().min(1, 'Payment ID is required'),
  razorpay_signature: z.string().min(1, 'Signature is required'),
});

/**
 * POST /api/admin/platform-billing/verify-settlement
 * Roles: owner, manager
 * Cryptographically verifies Razorpay settlement of ₹200 to BrewPluse owner.
 * Deducts balance and sets a 2-minute cooldown timer before unlocking orders.
 */
export async function POST(request: Request) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager']);
    if (!auth.authorized) {
      return auth.response;
    }

    const body = await request.json().catch(() => null);
    const parsed = VerifySettlementSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid settlement verification payload',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;
    const storeSlug = auth.storeSlug;

    // Verify HMAC-SHA256 signature
    const isValid = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_SIGNATURE',
            message: 'Cryptographic settlement verification failed. Signature mismatch.',
          },
        },
        { status: 400 }
      );
    }

    // Apply settlement and start 2-minute cooldown
    const settlement = await settleStorePlatformFee(storeSlug, razorpay_payment_id);

    // Audit log
    await logPaymentAudit({
      sessionId: `platform_settle_${Date.now()}`,
      storeId: storeSlug,
      amountPaise: 20000,
      method: 'razorpay',
      receivedBy: {
        staffId: auth.user?.uid || 'platform_admin',
        email: auth.user?.email || 'admin@brewpluse.com',
        role: auth.user?.role || 'owner',
      },
      action: 'payment_received',
      notes: `Platform fee settlement of ₹200. Razorpay ID: ${razorpay_payment_id}`,
    });

    return NextResponse.json({
      success: true,
      message:
        '₹200 Platform fee settlement successfully verified! Ordering will resume automatically after a 2-minute buffer.',
      cooldownEndsAt: settlement.cooldownEndsAt,
      cooldownSeconds: 120,
      remainingBalancePaise: settlement.accumulatedDuePaise,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: error?.message || 'Settlement verification failed' } },
      { status: 500 }
    );
  }
}
