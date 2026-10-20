import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPayment extends Document {
  storeId: string;
  sessionId: string;
  orderId?: string;
  mode: 'online' | 'cash' | 'upi_manual' | 'card_pos';
  amount: number; // in paise
  currency: string;
  status: 'created' | 'captured' | 'failed' | 'refunded';
  razorpay?: {
    orderId?: string;
    paymentId?: string;
    signature?: string;
  };
  receivedBy?: string; // staff UID who confirmed offline payment
  reference?: string; // UPI txn reference or card receipt ID
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentPlain {
  id: string;
  storeId: string;
  sessionId: string;
  orderId?: string;
  mode: 'online' | 'cash' | 'upi_manual' | 'card_pos';
  amount: number;
  currency: string;
  status: 'created' | 'captured' | 'failed' | 'refunded';
  razorpay?: {
    orderId?: string;
    paymentId?: string;
    signature?: string;
  };
  receivedBy?: string;
  reference?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Global runtime payments cache for offline resilience
declare global {
  // eslint-disable-next-line no-var
  var runtimePayments: Record<string, PaymentPlain[]> | undefined;
}

if (!global.runtimePayments) {
  global.runtimePayments = {};
}

export function getRuntimePayments(sessionId: string): PaymentPlain[] {
  return global.runtimePayments?.[sessionId] || [];
}

export function saveRuntimePayment(payment: PaymentPlain): void {
  if (!global.runtimePayments) global.runtimePayments = {};
  if (!global.runtimePayments[payment.sessionId]) {
    global.runtimePayments[payment.sessionId] = [];
  }
  const list = global.runtimePayments[payment.sessionId];
  const idx = list.findIndex(
    (p) =>
      p.id === payment.id ||
      (payment.razorpay?.paymentId && p.razorpay?.paymentId === payment.razorpay.paymentId)
  );
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...payment, updatedAt: new Date() };
  } else {
    list.push({ ...payment, createdAt: new Date(), updatedAt: new Date() });
  }
}

export function findRuntimePaymentByRazorpayId(paymentId: string): PaymentPlain | null {
  if (!global.runtimePayments) return null;
  for (const sessId of Object.keys(global.runtimePayments)) {
    const found = global.runtimePayments[sessId].find((p) => p.razorpay?.paymentId === paymentId);
    if (found) return found;
  }
  return null;
}

export function findRuntimePaymentById(id: string): PaymentPlain | null {
  if (!global.runtimePayments) return null;
  for (const sessId of Object.keys(global.runtimePayments)) {
    const found = global.runtimePayments[sessId].find((p) => p.id === id);
    if (found) return found;
  }
  return null;
}

const PaymentSchema = new Schema<IPayment>(
  {
    storeId: { type: String, required: true, index: true },
    sessionId: { type: String, required: true, index: true },
    orderId: { type: String, index: true },
    mode: {
      type: String,
      enum: ['online', 'cash', 'upi_manual', 'card_pos'],
      required: true,
    },
    amount: { type: Number, required: true, min: 0 },
    currency: { type: String, default: 'INR' },
    status: {
      type: String,
      enum: ['created', 'captured', 'failed', 'refunded'],
      default: 'created',
      index: true,
    },
    razorpay: {
      orderId: { type: String },
      paymentId: { type: String },
      signature: { type: String },
    },
    receivedBy: { type: String },
    reference: { type: String, trim: true, maxlength: 100 },
  },
  { timestamps: true }
);

// Idempotency: unique sparse index on razorpay.paymentId
PaymentSchema.index({ 'razorpay.paymentId': 1 }, { unique: true, sparse: true });
PaymentSchema.index({ storeId: 1, sessionId: 1 });

export const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
