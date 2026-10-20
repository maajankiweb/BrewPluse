import mongoose, { Schema, Document, Model } from 'mongoose';
import crypto from 'crypto';
import { connectMongoDB } from '@/lib/mongodb';

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

export const DEFAULT_10_TABLES = [
  { number: 'Table 1', label: 'Main Hall (2-Seater)' },
  { number: 'Table 2', label: 'Main Hall (4-Seater)' },
  { number: 'Table 3', label: 'Window View (2-Seater)' },
  { number: 'Table 4', label: 'Window View (4-Seater)' },
  { number: 'Table 5', label: 'Center Lounge (4-Seater)' },
  { number: 'Table 6', label: 'Family Dining (6-Seater)' },
  { number: 'Table 7', label: 'Outdoor Patio (4-Seater)' },
  { number: 'Table 8', label: 'Outdoor Garden (4-Seater)' },
  { number: 'Table 9', label: 'Balcony View (4-Seater)' },
  { number: 'Table 10', label: 'VIP Booth (8-Seater)' },
];

/**
 * Generate a random, unguessable URL-safe token (12+ chars)
 * Default 9 bytes base64url => 12 characters.
 */
export function generateTableToken(bytes = 9): string {
  const envBytes = parseInt(process.env.TABLE_TOKEN_BYTES || '9', 10);
  const size = Math.max(9, isNaN(envBytes) ? bytes : envBytes);
  return crypto.randomBytes(size).toString('base64url');
}

// Global runtime table registry for resilience across serverless & offline dev
declare global {
  // eslint-disable-next-line no-var
  var runtimeTables: Record<string, TablePlain[]> | undefined;
}

if (!global.runtimeTables) {
  global.runtimeTables = {};
}

function initializeRuntimeDefaults(storeId: string): TablePlain[] {
  const normalized = (storeId || 'brewpluse').toLowerCase().trim();
  if (!global.runtimeTables) global.runtimeTables = {};

  if (!global.runtimeTables[normalized] || global.runtimeTables[normalized].length === 0) {
    const now = new Date();
    global.runtimeTables[normalized] = DEFAULT_10_TABLES.map((def, idx) => ({
      id: `tbl_${normalized}_${idx + 1}`,
      storeId: normalized,
      number: def.number,
      label: def.label,
      token: `tok_${normalized}_tbl${idx + 1}_${crypto.randomBytes(4).toString('hex')}`,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    }));
  }
  return global.runtimeTables[normalized];
}

export function getRuntimeTables(storeId: string): TablePlain[] {
  const normalized = (storeId || 'brewpluse').toLowerCase().trim();
  const list = global.runtimeTables?.[normalized];
  if (!list || list.length === 0) {
    return initializeRuntimeDefaults(normalized);
  }
  return list;
}

export function saveRuntimeTable(table: TablePlain): void {
  const normalized = (table.storeId || 'brewpluse').toLowerCase().trim();
  if (!global.runtimeTables) global.runtimeTables = {};
  if (!global.runtimeTables[normalized]) {
    initializeRuntimeDefaults(normalized);
  }
  const list = global.runtimeTables[normalized];
  const idx = list.findIndex(
    (t) => t.id === table.id || t.number.toLowerCase() === table.number.toLowerCase()
  );
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...table, updatedAt: new Date() };
  } else {
    list.push({ ...table, createdAt: new Date(), updatedAt: new Date() });
  }
}

export function deleteRuntimeTable(storeId: string, tableId: string): void {
  const normalized = (storeId || 'brewpluse').toLowerCase().trim();
  if (!global.runtimeTables?.[normalized]) return;
  global.runtimeTables[normalized] = global.runtimeTables[normalized].filter(
    (t) => t.id !== tableId && t.number.toLowerCase() !== tableId.toLowerCase()
  );
}

export function findRuntimeTableByToken(token: string): TablePlain | null {
  if (!global.runtimeTables) return null;
  for (const storeId of Object.keys(global.runtimeTables)) {
    const found = global.runtimeTables[storeId].find(
      (t) => t.token === token && t.isActive !== false
    );
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

/**
 * Ensures at least the default 10 tables exist for this store both in MongoDB and in-memory runtime.
 * Persists Table 1 through Table 10 permanently.
 */
export async function ensureDefaultTables(storeId: string): Promise<TablePlain[]> {
  const normalized = (storeId || 'brewpluse').toLowerCase().trim();
  const runtimeList = getRuntimeTables(normalized);

  try {
    const conn = await connectMongoDB();
    if (conn) {
      let existingInDb = await Table.find({ storeId: normalized, isActive: true })
        .sort({ createdAt: 1 })
        .lean();

      const existingNumbers = new Set(
        existingInDb.map((t) => t.number.toLowerCase().trim())
      );

      // Seed any missing default tables (Table 1 through 10)
      for (const def of DEFAULT_10_TABLES) {
        if (!existingNumbers.has(def.number.toLowerCase().trim())) {
          // Check if runtime table exists to reuse token
          const matchingRuntime = runtimeList.find(
            (r) => r.number.toLowerCase().trim() === def.number.toLowerCase().trim()
          );
          const token = matchingRuntime?.token || generateTableToken();

          try {
            const created = await Table.create({
              storeId: normalized,
              number: def.number,
              label: def.label,
              token,
              isActive: true,
            });
            saveRuntimeTable({
              id: String(created._id),
              storeId: normalized,
              number: def.number,
              label: def.label,
              token,
              isActive: true,
            });
            existingNumbers.add(def.number.toLowerCase().trim());
          } catch (e: any) {
            console.warn('[Table create default] note:', e?.message);
          }
        }
      }

      // Re-fetch all active tables
      const allTables = await Table.find({ storeId: normalized, isActive: true })
        .sort({ createdAt: 1 })
        .lean();

      if (allTables && allTables.length > 0) {
        const mapped = allTables.map((t) => ({
          id: String(t._id),
          storeId: t.storeId,
          number: t.number,
          label: t.label || '',
          token: t.token,
          isActive: t.isActive,
          createdAt: t.createdAt,
          updatedAt: t.updatedAt,
        }));

        mapped.forEach((t) => saveRuntimeTable(t));
        return mapped;
      }
    }
  } catch (err: any) {
    console.warn('[ensureDefaultTables] Mongo connect note:', err?.message);
  }

  return getRuntimeTables(normalized);
}
