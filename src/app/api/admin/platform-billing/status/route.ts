import { NextResponse } from 'next/server';
import { requireStaff } from '@/lib/authService';
import { connectMongoDB } from '@/lib/mongodb';
import { Store, getRuntimeStore } from '@/lib/models/Store';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/platform-billing/status
 * Roles: owner, manager, cashier
 * Returns the current platform fee balance (₹1/order), threshold status, and cooldown.
 */
export async function GET(request: Request) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager', 'cashier']);
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
      store = getRuntimeStore(storeSlug) || {
        slug: storeSlug,
        platformBilling: {
          accumulatedDuePaise: 0,
          totalOrdersBilled: 0,
          isLockedDueToBalance: false,
        },
      };
    }

    const billing = store.platformBilling || {
      accumulatedDuePaise: 0,
      totalOrdersBilled: 0,
      isLockedDueToBalance: false,
    };

    const now = new Date();
    const inCooldown = billing.cooldownEndsAt ? new Date(billing.cooldownEndsAt) > now : false;
    const cooldownRemainingSeconds = inCooldown
      ? Math.max(1, Math.ceil((new Date(billing.cooldownEndsAt).getTime() - now.getTime()) / 1000))
      : 0;

    const thresholdPaise = 20000; // ₹200.00 = 200 orders
    const accumulatedDuePaise = billing.accumulatedDuePaise || 0;
    const isLocked = inCooldown || billing.isLockedDueToBalance || accumulatedDuePaise >= thresholdPaise;
    const ordersUntilThreshold = Math.max(0, 200 - Math.floor(accumulatedDuePaise / 100));

    return NextResponse.json({
      success: true,
      storeSlug,
      billing: {
        accumulatedDuePaise,
        accumulatedDueRupees: accumulatedDuePaise / 100,
        thresholdPaise,
        thresholdRupees: thresholdPaise / 100,
        totalOrdersBilled: billing.totalOrdersBilled || 0,
        ordersUntilThreshold,
        isLocked,
        inCooldown,
        cooldownRemainingSeconds,
        cooldownEndsAt: billing.cooldownEndsAt || null,
        lastSettledAt: billing.lastSettledAt || null,
        platformFeeMode: store.platformFeeMode || 'cafe',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: error?.message || 'Failed to fetch billing status' } },
      { status: 500 }
    );
  }
}
