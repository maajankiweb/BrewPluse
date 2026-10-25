import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireStaff } from '@/lib/authService';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { settleStorePlatformFee } from '@/lib/models/Store';
import { logPaymentAudit } from '@/lib/auditLog';
import { isValidUtr } from '@/lib/platformUpi';

export const dynamic = 'force-dynamic';

const VerifySettlementSchema = z.object({
  utr: z.string().optional(),
  razorpay_order_id: z.string().optional(),
  razorpay_payment_id: z.string().optional(),
  razorpay_signature: z.string().optional(),
});

/**
 * POST /api/admin/platform-billing/verify-settlement
 * Roles: owner, manager
 * Verifies Direct UPI (12-digit UTR) or legacy Razorpay settlement of ₹200 to BrewPluse platform.
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

    const { utr, razorpay_order_id, razorpay_payment_id, razorpay_signature } = parsed.data;
    const storeSlug = auth.storeSlug;

    let paymentReference = '';
    let method = 'direct_upi';

    if (utr) {
      const cleanUtr = utr.trim();
      if (!isValidUtr(cleanUtr)) {
        return NextResponse.json(
          {
            error: {
              code: 'INVALID_UTR',
              message: 'Please provide a valid 12-digit UPI Reference Number (UTR).',
            },
          },
          { status: 400 }
        );
      }
      paymentReference = `UPI-${cleanUtr}`;
      method = 'direct_upi';
    } else if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
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
      paymentReference = razorpay_payment_id;
      method = 'razorpay';
    } else {
      return NextResponse.json(
        {
          error: {
            code: 'MISSING_DATA',
            message: 'Please provide either a 12-digit UPI Reference Number (UTR) or payment credentials.',
          },
        },
        { status: 400 }
      );
    }

    // Apply settlement and start 2-minute cooldown
    const settlement = await settleStorePlatformFee(storeSlug, paymentReference);

    // Audit log
    await logPaymentAudit({
      sessionId: `platform_settle_${Date.now()}`,
      storeId: storeSlug,
      amountPaise: 20000,
      method,
      receivedBy: {
        staffId: auth.user?.uid || 'platform_admin',
        email: auth.user?.email || 'admin@brewpluse.com',
        role: auth.user?.role || 'owner',
      },
      action: 'payment_received',
      notes: `Platform fee settlement of ₹200. Reference: ${paymentReference} (${method})`,
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
