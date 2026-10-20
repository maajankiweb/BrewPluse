import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPlatformBilling {
  accumulatedDuePaise: number; // accumulated platform fee in paise (100 paise = ₹1/order)
  totalOrdersBilled: number; // total lifetime orders processed
  isLockedDueToBalance: boolean; // locked when accumulatedDuePaise >= 20000 (₹200 threshold)
  lockedAt?: Date;
  cooldownEndsAt?: Date; // 2 minutes cooldown after ₹200 settlement before resuming orders
  lastSettledAt?: Date;
  lastSettlementPaymentId?: string;
}

export interface IStore extends Document {
  name: string;
  slug: string;
  email: string;
  phone?: string;
  address?: string;
  gstin?: string;
  fssaiLicense?: string;
  upiVpa?: string;
  country?: string;
  currency: string;
  taxRate: number;
  // Spec Section 3: Extended Table QR & Payment policy settings
  paymentPolicy: 'pay_first' | 'pay_later' | 'customer_choice';
  upiId?: string;
  upiName?: string;
  taxInclusive: boolean;
  serviceChargePercent: number;
  platformFeeMode: 'customer' | 'cafe';
  acceptingOrders: boolean;
  platformBilling: IPlatformBilling;
  printSettings: {
    paperSize: '58mm' | '80mm';
    autoCut: boolean;
    headerGreeting?: string;
    footerMessage?: string;
  };
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  gpsRadiusMeters?: number;
  paymentTokenVerified?: boolean;
  setupCompleted?: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const StoreSchema = new Schema<IStore>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String },
    address: { type: String },
    gstin: { type: String },
    fssaiLicense: { type: String },
    upiVpa: { type: String },
    country: { type: String, default: 'IN' },
    currency: { type: String, default: 'INR' },
    taxRate: { type: Number, default: 0.0 }, // Optional GST (0% by default)
    paymentPolicy: {
      type: String,
      enum: ['pay_first', 'pay_later', 'customer_choice'],
      default: 'customer_choice',
    },
    upiId: { type: String, trim: true, default: '' },
    upiName: { type: String, trim: true, default: '' },
    taxInclusive: { type: Boolean, default: false },
    serviceChargePercent: { type: Number, default: 0, min: 0, max: 30 },
    platformFeeMode: {
      type: String,
      enum: ['customer', 'cafe'],
      default: 'cafe',
    },
    acceptingOrders: { type: Boolean, default: true },
    platformBilling: {
      accumulatedDuePaise: { type: Number, default: 0 },
      totalOrdersBilled: { type: Number, default: 0 },
      isLockedDueToBalance: { type: Boolean, default: false },
      lockedAt: { type: Date },
      cooldownEndsAt: { type: Date },
      lastSettledAt: { type: Date },
      lastSettlementPaymentId: { type: String },
    },
    printSettings: {
      paperSize: { type: String, enum: ['58mm', '80mm'], default: '80mm' },
      autoCut: { type: Boolean, default: true },
      headerGreeting: { type: String, default: 'Welcome to BrewPluse Cafe' },
      footerMessage: { type: String, default: 'Thank you for your visit! Visit again.' },
    },
    imageUrl: { type: String, default: '' },
    latitude: { type: Number },
    longitude: { type: Number },
    gpsRadiusMeters: { type: Number, default: 100 },
    paymentTokenVerified: { type: Boolean, default: false },
    setupCompleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Store: Model<IStore> =
  mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema);

/* -------------------------------------------------------------------------- */
/* Runtime in-memory cache helpers for development, tests, and hybrid storage  */
/* -------------------------------------------------------------------------- */

declare global {
  // eslint-disable-next-line no-var
  var runtimeStores: Record<string, any> | undefined;
}

if (!global.runtimeStores) {
  global.runtimeStores = {};
}

export function saveRuntimeStore(store: any): any {
  if (!global.runtimeStores) global.runtimeStores = {};
  const slug = store.slug;
  if (!global.runtimeStores[slug]) {
    global.runtimeStores[slug] = {
      ...store,
      platformBilling: {
        accumulatedDuePaise: store.platformBilling?.accumulatedDuePaise || 0,
        totalOrdersBilled: store.platformBilling?.totalOrdersBilled || 0,
        isLockedDueToBalance: store.platformBilling?.isLockedDueToBalance || false,
        cooldownEndsAt: store.platformBilling?.cooldownEndsAt || undefined,
        lockedAt: store.platformBilling?.lockedAt || undefined,
        lastSettledAt: store.platformBilling?.lastSettledAt || undefined,
        lastSettlementPaymentId: store.platformBilling?.lastSettlementPaymentId || undefined,
      },
    };
  } else {
    global.runtimeStores[slug] = {
      ...global.runtimeStores[slug],
      ...store,
      platformBilling: {
        ...global.runtimeStores[slug].platformBilling,
        ...(store.platformBilling || {}),
      },
    };
  }
  return global.runtimeStores[slug];
}

export function getRuntimeStore(slug: string): any {
  return global.runtimeStores?.[slug] || null;
}

/**
 * Checks whether store can accept orders or is blocked due to ₹200 threshold or 2-minute cooldown.
 */
export async function checkStoreOrderLockout(slug: string): Promise<{
  locked: boolean;
  reason?: 'PLATFORM_LIMIT_REACHED' | 'PLATFORM_COOLDOWN' | 'STORE_CLOSED';
  message?: string;
  cooldownRemainingSeconds?: number;
  accumulatedDuePaise?: number;
}> {
  let store: any = null;
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      store = await Store.findOne({ slug });
    } catch (e) {}
  }

  if (!store) {
    store = getRuntimeStore(slug);
  }

  if (!store) {
    return { locked: false };
  }

  // 1. Manual store closure check
  if (store.acceptingOrders === false) {
    return {
      locked: true,
      reason: 'STORE_CLOSED',
      message: 'This cafe is currently not accepting new orders.',
    };
  }

  const billing = store.platformBilling || {
    accumulatedDuePaise: 0,
    isLockedDueToBalance: false,
  };

  const now = new Date();

  // 2. Cooldown check (2 minutes buffer after ₹200 settlement)
  if (billing.cooldownEndsAt && new Date(billing.cooldownEndsAt) > now) {
    const remainingSeconds = Math.max(
      1,
      Math.ceil((new Date(billing.cooldownEndsAt).getTime() - now.getTime()) / 1000)
    );
    return {
      locked: true,
      reason: 'PLATFORM_COOLDOWN',
      message: `Cafe ordering is resuming shortly after platform settlement. Ready in ${remainingSeconds}s.`,
      cooldownRemainingSeconds: remainingSeconds,
      accumulatedDuePaise: billing.accumulatedDuePaise,
    };
  }

  // 3. Balance threshold check (>= ₹200.00 / 200 orders = 20,000 paise)
  if (billing.isLockedDueToBalance || billing.accumulatedDuePaise >= 20000) {
    return {
      locked: true,
      reason: 'PLATFORM_LIMIT_REACHED',
      message:
        'This cafe has reached the ₹200 platform settlement limit. Please contact cafe desk to place order.',
      accumulatedDuePaise: billing.accumulatedDuePaise,
    };
  }

  return { locked: false, accumulatedDuePaise: billing.accumulatedDuePaise };
}

/**
 * Accumulates ₹1 platform fee (100 paise) upon placing an order.
 * If balance reaches >= ₹200 (20000 paise), sets isLockedDueToBalance = true.
 */
export async function accumulateOrderPlatformFee(slug: string): Promise<{
  accumulatedDuePaise: number;
  isLocked: boolean;
}> {
  let store: any = null;
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      store = await Store.findOne({ slug });
    } catch (e) {}
  }

  if (store) {
    if (!store.platformBilling) {
      store.platformBilling = {
        accumulatedDuePaise: 0,
        totalOrdersBilled: 0,
        isLockedDueToBalance: false,
      };
    }
    store.platformBilling.accumulatedDuePaise = (store.platformBilling.accumulatedDuePaise || 0) + 100;
    store.platformBilling.totalOrdersBilled = (store.platformBilling.totalOrdersBilled || 0) + 1;

    if (store.platformBilling.accumulatedDuePaise >= 20000) {
      store.platformBilling.isLockedDueToBalance = true;
      store.platformBilling.lockedAt = new Date();
    }
    await store.save();
    saveRuntimeStore(store.toObject ? store.toObject() : store);
    return {
      accumulatedDuePaise: store.platformBilling.accumulatedDuePaise,
      isLocked: store.platformBilling.isLockedDueToBalance,
    };
  }

  // Fallback to runtime store
  const rStore = getRuntimeStore(slug) || { slug, platformBilling: {} };
  if (!rStore.platformBilling) {
    rStore.platformBilling = {
      accumulatedDuePaise: 0,
      totalOrdersBilled: 0,
      isLockedDueToBalance: false,
    };
  }
  rStore.platformBilling.accumulatedDuePaise = (rStore.platformBilling.accumulatedDuePaise || 0) + 100;
  rStore.platformBilling.totalOrdersBilled = (rStore.platformBilling.totalOrdersBilled || 0) + 1;

  if (rStore.platformBilling.accumulatedDuePaise >= 20000) {
    rStore.platformBilling.isLockedDueToBalance = true;
    rStore.platformBilling.lockedAt = new Date();
  }
  saveRuntimeStore(rStore);

  return {
    accumulatedDuePaise: rStore.platformBilling.accumulatedDuePaise,
    isLocked: rStore.platformBilling.isLockedDueToBalance,
  };
}

/**
 * Records a ₹200 settlement from Cafe Owner to BrewPluse Owner via Razorpay.
 * Resets/deducts accumulated balance and initiates 2-minute cooldown before unlocking.
 */
export async function settleStorePlatformFee(
  slug: string,
  paymentId: string
): Promise<{
  success: boolean;
  cooldownEndsAt: Date;
  accumulatedDuePaise: number;
}> {
  const cooldownEndsAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes cooldown
  let store: any = null;
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      store = await Store.findOne({ slug });
    } catch (e) {}
  }

  if (store) {
    if (!store.platformBilling) {
      store.platformBilling = {
        accumulatedDuePaise: 0,
        totalOrdersBilled: 0,
        isLockedDueToBalance: false,
      };
    }
    // Deduct 20,000 paise (₹200) or reset
    store.platformBilling.accumulatedDuePaise = Math.max(
      0,
      (store.platformBilling.accumulatedDuePaise || 0) - 20000
    );
    store.platformBilling.isLockedDueToBalance = false;
    store.platformBilling.cooldownEndsAt = cooldownEndsAt;
    store.platformBilling.lastSettledAt = new Date();
    store.platformBilling.lastSettlementPaymentId = paymentId;
    await store.save();
    saveRuntimeStore(store.toObject ? store.toObject() : store);
    return {
      success: true,
      cooldownEndsAt,
      accumulatedDuePaise: store.platformBilling.accumulatedDuePaise,
    };
  }

  // Runtime fallback
  const rStore = getRuntimeStore(slug) || { slug, platformBilling: {} };
  rStore.platformBilling = {
    ...rStore.platformBilling,
    accumulatedDuePaise: Math.max(0, (rStore.platformBilling?.accumulatedDuePaise || 0) - 20000),
    isLockedDueToBalance: false,
    cooldownEndsAt,
    lastSettledAt: new Date(),
    lastSettlementPaymentId: paymentId,
  };
  saveRuntimeStore(rStore);

  return {
    success: true,
    cooldownEndsAt,
    accumulatedDuePaise: rStore.platformBilling.accumulatedDuePaise,
  };
}
