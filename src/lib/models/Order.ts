import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrderItem {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
  notes?: string;
  isCompleted?: boolean;
}

export interface IOrder extends Document {
  storeId: string;
  orderNumber: string;
  table: string;
  orderType: 'dine_in' | 'takeaway' | 'delivery';
  items: IOrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentMode: 'UPI' | 'Cash' | 'Card';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 },
    notes: { type: String },
    isCompleted: { type: Boolean, default: false },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    storeId: { type: String, required: true, index: true },
    orderNumber: { type: String, required: true },
    table: { type: String, required: true },
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
      enum: ['pending', 'preparing', 'ready', 'completed', 'cancelled'],
      default: 'preparing',
      index: true,
    },
    paymentMode: {
      type: String,
      enum: ['UPI', 'Cash', 'Card'],
      default: 'UPI',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'refunded'],
      default: 'paid',
    },
    customerName: { type: String },
    customerPhone: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
