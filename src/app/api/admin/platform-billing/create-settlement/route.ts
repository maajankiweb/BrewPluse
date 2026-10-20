import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/authService';
import { createRazorpayOrder } from '@/lib/razorpay';
import { connectMongoDB } from '@/lib/mongodb';
import { Store, getRuntimeStore } from '@/lib/models/Store';

export const dynamic = 'force-dynamic';

/**
 * POST /api/admin/platform-billing/create-settlement
 * Roles: owner, manager
 * Initiates Razorpay payment order for ₹200 platform settlement to BrewPluse owner.
 */
export async function POST(request: Request) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager']);
    if (!auth.authorized) {
      return auth.response;
    }

    const storeSlug = auth.storeSlug;
    const conn = await connectMongoDB();
    let store: any = null;

    if (conn) {
      try {
        store = await Store.findOne({ slug: storeSlug });
      } catch (err) {}
    }

    if (!store) {
      store = getRuntimeStore(storeSlug);
    }

    const billing = store?.platformBilling || { accumulatedDuePaise: 20000 };
    // Amount is either the exact accumulated balance or ₹200 (20,000 paise)
    const amountPaise = Math.max(100, billing.accumulatedDuePaise || 20000);

    const receipt = `settle_${storeSlug}_${Date.now()}`;
    const rpOrder = await createRazorpayOrder({
      amount: amountPaise,
      currency: 'INR',
      receipt,
      notes: {
        type: 'platform_fee_settlement',
        storeSlug,
        beneficiary: 'BrewPluse Owner',
        amountDuePaise: String(amountPaise),
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: rpOrder.id,
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        keyId:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
          process.env.RAZORPAY_KEY_ID ||
          'rzp_test_brewpluse2026',
        storeSlug,
        receipt,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: { code: 'SETTLEMENT_ORDER_FAILED', message: error?.message || 'Failed to create settlement order' } },
      { status: 500 }
    );
  }
}
