import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHardwareOrderItem {
  id: string;
  title: string;
  price: number; // in INR
  quantity: number;
  total: number;
  image?: string;
}

export interface IHardwareShippingAddress {
  street: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export interface IHardwareOrder extends Document {
  orderNumber: string;
  storeSlug: string;
  cafeName: string;
  contactPerson: string;
  phone: string;
  email: string;
  shippingAddress: IHardwareShippingAddress;
  gstin?: string;
  items: IHardwareOrderItem[];
  subtotal: number;
  shippingFee: number;
  tax: number;
  total: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMode: 'Direct UPI' | 'Razorpay' | string;
  upiReference?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: Date;
  updatedAt: Date;
}

const HardwareOrderItemSchema = new Schema<IHardwareOrderItem>(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    image: { type: String },
  },
  { _id: false }
);

const HardwareShippingAddressSchema = new Schema<IHardwareShippingAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    landmark: { type: String },
  },
  { _id: false }
);

const HardwareOrderSchema = new Schema<IHardwareOrder>(
  {
    orderNumber: { type: String, required: true, unique: true, index: true },
    storeSlug: { type: String, required: true, index: true },
    cafeName: { type: String, required: true },
    contactPerson: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    shippingAddress: { type: HardwareShippingAddressSchema, required: true },
    gstin: { type: String },
    items: { type: [HardwareOrderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    paymentMode: { type: String, default: 'Razorpay' },
    upiReference: { type: String, index: true },
    razorpayOrderId: { type: String, index: true },
    razorpayPaymentId: { type: String },
    status: {
      type: String,
      enum: ['confirmed', 'processing', 'shipped', 'delivered'],
      default: 'confirmed',
    },
    trackingNumber: { type: String },
    estimatedDelivery: { type: String },
  },
  {
    timestamps: true,
  }
);

export const HardwareOrder: Model<IHardwareOrder> =
  mongoose.models.HardwareOrder ||
  mongoose.model<IHardwareOrder>('HardwareOrder', HardwareOrderSchema);

// Global in-memory runtime store for serverless & Next.js hot module reloads
declare global {
  var runtimeHardwareOrders: Map<string, any> | undefined;
}

if (!global.runtimeHardwareOrders) {
  global.runtimeHardwareOrders = new Map();
}

export const runtimeHardwareOrders: Map<string, any> = global.runtimeHardwareOrders;

export function createRuntimeHardwareOrder(data: any) {
  const orderNumber = data.orderNumber || `BP-HW-${Date.now().toString().slice(-6)}`;
  const now = new Date();
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);

  const newOrder = {
    ...data,
    orderNumber,
    status: data.status || 'confirmed',
    paymentStatus: data.paymentStatus || 'pending',
    trackingNumber: data.trackingNumber || `TRK-BP-${Math.floor(100000 + Math.random() * 900000)}`,
    estimatedDelivery: data.estimatedDelivery || deliveryDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    createdAt: data.createdAt || now.toISOString(),
    updatedAt: now.toISOString(),
  };

  runtimeHardwareOrders.set(orderNumber, newOrder);
  return newOrder;
}

export function updateRuntimeHardwareOrderPayment(
  orderNumber: string,
  paymentRef: string,
  razorpayOrderId?: string,
  paymentMode: string = 'Razorpay'
) {
  const existing = runtimeHardwareOrders.get(orderNumber);
  if (!existing) return null;

  const updated = {
    ...existing,
    paymentStatus: 'paid',
    paymentMode,
    upiReference: paymentRef,
    razorpayPaymentId: paymentRef,
    razorpayOrderId: razorpayOrderId || existing.razorpayOrderId,
    updatedAt: new Date().toISOString(),
  };

  runtimeHardwareOrders.set(orderNumber, updated);
  return updated;
}

export function getRuntimeHardwareOrdersByStore(storeSlug: string) {
  const list: any[] = [];
  const normalized = storeSlug.toLowerCase().trim();
  runtimeHardwareOrders.forEach((order) => {
    if (order.storeSlug && order.storeSlug.toLowerCase().trim() === normalized) {
      list.push(order);
    }
  });
  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

