import mongoose, { Schema, Document, Model } from 'mongoose';
import crypto from 'crypto';

export interface ITable extends Document {
  storeId: string;
  number: string;
  label?: string;
  token: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TablePlain {
  id: string;
  storeId: string;
  number: string;
  label?: string;
  token: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Global runtime table registry for resilience across serverless & offline dev
declare global {
  // eslint-disable-next-line no-var
  var runtimeTables: Record<string, TablePlain[]> | undefined;
}

if (!global.runtimeTables) {
  global.runtimeTables = {};
}

export function getRuntimeTables(storeId: string): TablePlain[] {
  return global.runtimeTables?.[storeId] || [];
}

export function saveRuntimeTable(table: TablePlain): void {
  if (!global.runtimeTables) global.runtimeTables = {};
  if (!global.runtimeTables[table.storeId]) {
    global.runtimeTables[table.storeId] = [];
  }
  const list = global.runtimeTables[table.storeId];
  const idx = list.findIndex((t) => t.id === table.id || t.number.toLowerCase() === table.number.toLowerCase());
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...table, updatedAt: new Date() };
  } else {
    list.push({ ...table, createdAt: new Date(), updatedAt: new Date() });
  }
}

export function deleteRuntimeTable(storeId: string, tableId: string): void {
  if (!global.runtimeTables?.[storeId]) return;
  global.runtimeTables[storeId] = global.runtimeTables[storeId].filter((t) => t.id !== tableId);
}

export function findRuntimeTableByToken(token: string): TablePlain | null {
  if (!global.runtimeTables) return null;
  for (const storeId of Object.keys(global.runtimeTables)) {
    const found = global.runtimeTables[storeId].find((t) => t.token === token && t.isActive !== false);
    if (found) return found;
  }
  return null;
}

export function findRuntimeTableById(id: string): TablePlain | null {
  if (!global.runtimeTables) return null;
  for (const storeId of Object.keys(global.runtimeTables)) {
    const found = global.runtimeTables[storeId].find((t) => t.id === id);
    if (found) return found;
  }
  return null;
}

/**
 * Generate a random, unguessable URL-safe token (12+ chars)
 * Default 9 bytes base64url => 12 characters.
 */
export function generateTableToken(bytes = 9): string {
  const envBytes = parseInt(process.env.TABLE_TOKEN_BYTES || '9', 10);
  const size = Math.max(9, isNaN(envBytes) ? bytes : envBytes);
  return crypto.randomBytes(size).toString('base64url');
}

const TableSchema = new Schema<ITable>(
  {
    storeId: { type: String, required: true, index: true },
    number: { type: String, required: true, trim: true },
    label: { type: String, trim: true, default: '' },
    token: {
      type: String,
      required: true,
      unique: true,
      index: true,
      default: () => generateTableToken(),
    },
    isActive: { type: Boolean, default: true, index: true },
  },
  { timestamps: true }
);

// Unique compound index: at most one table with a given number per store
TableSchema.index({ storeId: 1, number: 1 }, { unique: true });

export const Table: Model<ITable> =
  mongoose.models.Table || mongoose.model<ITable>('Table', TableSchema);
