import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IItemVariant {
  id: string;
  name: string;
  price: number; // in paise
}

export interface IItemAddon {
  id: string;
  name: string;
  price: number; // in paise
}

export interface IOrderItem {
  itemId: string;
  menuItemId?: string;
  name: string;
  quantity: number;
  qty?: number;
  price: number;
  unitPrice?: number; // in paise
  variant?: IItemVariant;
  addons?: IItemAddon[];
  notes?: string;
  note?: string;
  taxPercent?: number;
  lineTotal?: number; // in paise
  isCompleted?: boolean;
  status?: 'queued' | 'preparing' | 'ready' | 'served' | 'cancelled';
}

export interface IOrderTimestamps {
  placedAt?: Date;
  acceptedAt?: Date;
  readyAt?: Date;
  servedAt?: Date;
}

export interface IOrder extends Document {
  storeId: string;
  tableId?: string;
  sessionId?: string;
  orderNumber: string;
  table: string;
  source: 'qr_table' | 'pos' | 'waiter';
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status:
    | 'pending_payment'
    | 'placed'
    | 'accepted'
    | 'preparing'
    | 'ready'
    | 'served'
    | 'completed'
    | 'cancelled'
    | 'pending';
  paymentIntent?: 'pay_now' | 'pay_later';
  paymentMode: 'UPI' | 'Cash' | 'Card' | string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  customerUid?: string;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  idempotencyKey?: string;
  timestamps?: IOrderTimestamps;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    itemId: { type: String, required: true },
    menuItemId: { type: String },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    qty: { type: Number },
    price: { type: Number, required: true, min: 0 },
    unitPrice: { type: Number },
    variant: {
      id: { type: String },
      name: { type: String },
      price: { type: Number },
    },
    addons: [
      {
        id: { type: String },
        name: { type: String },
        price: { type: Number },
        _id: false,
      },
    ],
    notes: { type: String },
    note: { type: String },
    taxPercent: { type: Number, default: 5 },
    lineTotal: { type: Number },
    isCompleted: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['queued', 'preparing', 'ready', 'served', 'cancelled'],
      default: 'queued',
    },
  },
  { _id: false }
);

const OrderTimestampsSchema = new Schema<IOrderTimestamps>(
  {
    placedAt: { type: Date },
    acceptedAt: { type: Date },
    readyAt: { type: Date },
    servedAt: { type: Date },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    storeId: { type: String, required: true, index: true },
    tableId: { type: String, index: true },
    sessionId: { type: String, index: true },
    orderNumber: { type: String, required: true },
    table: { type: String, required: true },
    source: {
      type: String,
      enum: ['qr_table', 'pos', 'waiter'],
      default: 'pos',
      index: true,
    },
    orderType: {
      type: String,
      enum: ['dine_in', 'takeaway', 'delivery'],
      default: 'dine_in',
    },
    items: [OrderItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0 },
    tax: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: [
        'pending_payment',
        'placed',
        'accepted',
        'preparing',
        'ready',
        'served',
        'completed',
        'cancelled',
        'pending',
      ],
      default: 'placed',
      index: true,
    },
    paymentIntent: {
      type: String,
      enum: ['pay_now', 'pay_later'],
    },
    paymentMode: {
      type: String,
      default: 'UPI',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'pending',
      index: true,
    },
    customerUid: { type: String },
    customerName: { type: String, maxlength: 80 },
    customerPhone: { type: String, maxlength: 20 },
    notes: { type: String, maxlength: 300 },
    idempotencyKey: { type: String, index: true },
    timestamps: { type: OrderTimestampsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

OrderSchema.index({ storeId: 1, sessionId: 1, createdAt: -1 });
OrderSchema.index({ storeId: 1, idempotencyKey: 1 });

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

// Global runtime order cache for offline resilience and fast idempotency
declare global {
  // eslint-disable-next-line no-var
  var runtimeOrders: Record<string, any[]> | undefined;
}

if (!global.runtimeOrders) {
  global.runtimeOrders = {};
}

export function saveRuntimeOrder(order: any): void {
  if (!global.runtimeOrders) global.runtimeOrders = {};
  const storeId = order.storeId || 'default';
  if (!global.runtimeOrders[storeId]) {
    global.runtimeOrders[storeId] = [];
  }
  const list = global.runtimeOrders[storeId];
  const orderId = String(order._id || order.id);
  const idx = list.findIndex((o) => String(o._id || o.id) === orderId);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...order, updatedAt: new Date() };
  } else {
    list.push({ ...order, createdAt: new Date(), updatedAt: new Date() });
  }
}

export function findRuntimeOrderByIdempotencyKey(storeId: string, idempotencyKey: string): any | null {
  const list = global.runtimeOrders?.[storeId] || [];
  return list.find((o) => o.idempotencyKey === idempotencyKey) || null;
}

export function findRuntimeOrdersBySessionId(storeId: string, sessionId: string): any[] {
  const list = global.runtimeOrders?.[storeId] || [];
  return list.filter((o) => o.sessionId === sessionId);
}
