import { NextResponse } from 'next/server';
import { z } from 'zod';
import { requireStaff } from '@/lib/authService';
import { connectMongoDB } from '@/lib/mongodb';
import { Store, getRuntimeStore, saveRuntimeStore } from '@/lib/models/Store';

export const dynamic = 'force-dynamic';

const UpdateStoreSettingsSchema = z.object({
  upiId: z.string().trim().max(100).optional(),
  upiName: z.string().trim().max(100).optional(),
  gstin: z.string().trim().max(30).optional(),
  paymentPolicy: z.enum(['pay_first', 'pay_later', 'customer_choice']).optional(),
  serviceChargePercent: z.number().min(0).max(30).optional(),
  platformFeeMode: z.enum(['customer', 'cafe']).optional(),
  acceptingOrders: z.boolean().optional(),
});

/**
 * GET /api/admin/store-settings
 * Roles: owner, manager
 * Returns the current cafe store configuration including UPI ID and platform billing.
 */
export async function GET(request: Request) {
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
      store = getRuntimeStore(storeSlug) || {
        name: 'BrewPluse Cafe',
        slug: storeSlug,
        upiId: '',
        upiName: '',
        gstin: '',
        paymentPolicy: 'customer_choice',
        platformFeeMode: 'cafe',
        acceptingOrders: true,
      };
    }

    return NextResponse.json({
      success: true,
      store: {
        name: store.name,
        slug: store.slug,
        upiId: store.upiId || '',
        upiName: store.upiName || store.name,
        gstin: store.gstin || '',
        paymentPolicy: store.paymentPolicy || 'customer_choice',
        platformFeeMode: store.platformFeeMode || 'cafe',
        serviceChargePercent: store.serviceChargePercent || 0,
        acceptingOrders: store.acceptingOrders !== false,
        platformBilling: store.platformBilling || {
          accumulatedDuePaise: 0,
          totalOrdersBilled: 0,
          isLockedDueToBalance: false,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: error?.message || 'Failed to fetch settings' } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/store-settings
 * Roles: owner, manager
 * Updates the cafe's direct merchant UPI ID and payment workflow settings.
 */
export async function POST(request: Request) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager']);
    if (!auth.authorized) {
      return auth.response;
    }

    const body = await request.json().catch(() => null);
    const parsed = UpdateStoreSettingsSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid settings payload',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const storeSlug = auth.storeSlug;
    const conn = await connectMongoDB();
    let store: any = null;

    if (conn) {
      try {
        store = await Store.findOne({ slug: storeSlug });
      } catch (err) {}
    }

    if (store) {
      if (parsed.data.upiId !== undefined) store.upiId = parsed.data.upiId;
      if (parsed.data.upiName !== undefined) store.upiName = parsed.data.upiName;
      if (parsed.data.gstin !== undefined) store.gstin = parsed.data.gstin;
      if (parsed.data.paymentPolicy !== undefined) store.paymentPolicy = parsed.data.paymentPolicy;
      if (parsed.data.platformFeeMode !== undefined) store.platformFeeMode = parsed.data.platformFeeMode;
      if (parsed.data.serviceChargePercent !== undefined)
        store.serviceChargePercent = parsed.data.serviceChargePercent;
      if (parsed.data.acceptingOrders !== undefined)
        store.acceptingOrders = parsed.data.acceptingOrders;

      await store.save();
      saveRuntimeStore(store.toObject ? store.toObject() : store);
    } else {
      const current = getRuntimeStore(storeSlug) || { slug: storeSlug };
      const updated = {
        ...current,
        ...parsed.data,
      };
      saveRuntimeStore(updated);
      store = updated;
    }

    return NextResponse.json({
      success: true,
      message: 'Cafe payment and UPI settings successfully saved!',
      store: {
        upiId: store.upiId,
        upiName: store.upiName,
        paymentPolicy: store.paymentPolicy,
        platformFeeMode: store.platformFeeMode || 'cafe',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: { code: 'SERVER_ERROR', message: error?.message || 'Failed to save settings' } },
      { status: 500 }
    );
  }
}
