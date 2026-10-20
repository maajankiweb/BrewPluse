import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISessionTotals {
  subtotal: number; // in paise
  tax: number; // in paise
  serviceCharge: number; // in paise
  platformFee: number; // in paise
  discount: number; // in paise
  roundOff: number; // in paise
  grandTotal: number; // in paise
  paid: number; // in paise
  due: number; // in paise
}

export interface ITableSession extends Document {
  storeId: string;
  tableId: string;
  status: 'open' | 'bill_requested' | 'paid' | 'closed';
  billRequestedAt?: Date;
  billRequestMethod?: 'online' | 'counter';
  closedAt?: Date;
  customer?: {
    name?: string;
    phone?: string;
  };
  currency: string;
  totals: ISessionTotals;
  createdAt: Date;
  updatedAt: Date;
}

export interface TableSessionPlain {
  id: string;
  storeId: string;
  tableId: string;
  status: 'open' | 'bill_requested' | 'paid' | 'closed';
  billRequestedAt?: Date;
  billRequestMethod?: 'online' | 'counter';
  closedAt?: Date;
  customer?: { name?: string; phone?: string };
  currency: string;
  totals: ISessionTotals;
  createdAt: Date;
  updatedAt: Date;
}

// Global runtime table session cache for offline resilience
declare global {
  // eslint-disable-next-line no-var
  var runtimeTableSessions: Record<string, TableSessionPlain[]> | undefined;
}

if (!global.runtimeTableSessions) {
  global.runtimeTableSessions = {};
}

export function getRuntimeSessions(storeId: string): TableSessionPlain[] {
  return global.runtimeTableSessions?.[storeId] || [];
}

export function saveRuntimeSession(session: TableSessionPlain): void {
  if (!global.runtimeTableSessions) global.runtimeTableSessions = {};
  if (!global.runtimeTableSessions[session.storeId]) {
    global.runtimeTableSessions[session.storeId] = [];
  }
  const list = global.runtimeTableSessions[session.storeId];
  const idx = list.findIndex((s) => s.id === session.id);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...session, updatedAt: new Date() };
  } else {
    list.push({ ...session, createdAt: new Date(), updatedAt: new Date() });
  }
}

export function findRuntimeActiveSession(storeId: string, tableId: string): TableSessionPlain | null {
  const list = getRuntimeSessions(storeId);
  return list.find((s) => s.tableId === tableId && (s.status === 'open' || s.status === 'bill_requested')) || null;
}

export function findRuntimeSessionById(id: string): TableSessionPlain | null {
  if (!global.runtimeTableSessions) return null;
  for (const storeId of Object.keys(global.runtimeTableSessions)) {
    const found = global.runtimeTableSessions[storeId].find((s) => s.id === id);
    if (found) return found;
  }
  return null;
}

const SessionTotalsSchema = new Schema<ISessionTotals>(
  {
    subtotal: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    serviceCharge: { type: Number, required: true, default: 0 },
    platformFee: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    roundOff: { type: Number, required: true, default: 0 },
    grandTotal: { type: Number, required: true, default: 0 },
    paid: { type: Number, required: true, default: 0 },
    due: { type: Number, required: true, default: 0 },
  },
  { _id: false }
);

const TableSessionSchema = new Schema<ITableSession>(
  {
    storeId: { type: String, required: true, index: true },
    tableId: { type: String, required: true, index: true },
    status: {
      type: String,
      enum: ['open', 'bill_requested', 'paid', 'closed'],
      default: 'open',
      index: true,
    },
    billRequestedAt: { type: Date },
    billRequestMethod: { type: String, enum: ['online', 'counter'] },
    closedAt: { type: Date },
    customer: {
      name: { type: String, trim: true, maxlength: 80 },
      phone: { type: String, trim: true, maxlength: 20 },
    },
    currency: { type: String, default: 'INR' },
    totals: { type: SessionTotalsSchema, required: true, default: () => ({}) },
  },
  { timestamps: true }
);

// Compound index for querying table sessions
TableSessionSchema.index({ storeId: 1, tableId: 1, status: 1 });

export const TableSession: Model<ITableSession> =
  mongoose.models.TableSession || mongoose.model<ITableSession>('TableSession', TableSessionSchema);
