import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReceiptLog extends Document {
  storeId: string;
  orderNumber: string;
  tableNumber: string;
  grandTotal: number;
  paymentMode: string;
  printerType: 'Bluetooth' | 'LAN' | 'Browser';
  printerModel?: string;
  receiptPayloadText: string;
  printedAt: Date;
}

const ReceiptLogSchema = new Schema<IReceiptLog>(
  {
    storeId: { type: String, required: true, index: true },
    orderNumber: { type: String, required: true },
    tableNumber: { type: String, required: true },
    grandTotal: { type: Number, required: true },
    paymentMode: { type: String, default: 'UPI' },
    printerType: {
      type: String,
      enum: ['Bluetooth', 'LAN', 'Browser'],
      default: 'Bluetooth',
    },
    printerModel: { type: String },
    receiptPayloadText: { type: String, required: true },
    printedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const ReceiptLog: Model<IReceiptLog> =
  mongoose.models.ReceiptLog || mongoose.model<IReceiptLog>('ReceiptLog', ReceiptLogSchema);
