import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import {
  Table,
  generateTableToken,
  getRuntimeTables,
  saveRuntimeTable,
} from '@/lib/models/Table';
import { requireStaff } from '@/lib/authService';

export const dynamic = 'force-dynamic';

const CreateSingleTableSchema = z.object({
  number: z.string().min(1, 'Table number is required').max(30),
  label: z.string().max(80).optional(),
});

const CreateBatchTablesSchema = z.object({
  tables: z.array(CreateSingleTableSchema).min(1).max(100),
});

const PostBodySchema = z.union([CreateBatchTablesSchema, CreateSingleTableSchema]);

/**
 * GET /api/admin/tables
 * List all tables for authenticated staff's store
 */
export async function GET(request: Request) {
  try {
    const auth = requireStaff(request, ['owner', 'manager', 'cashier']);
    if (!auth.success || !auth.session) return auth.response!;

    const storeId = auth.session.storeSlug;

    const conn = await connectMongoDB();
    let tables: any[] = [];
    if (conn) {
      try {
        tables = await Table.find({ storeId })
          .sort({ createdAt: 1 })
          .lean();
      } catch (err) {
        console.warn('[Admin Tables GET] DB query note:', err);
      }
    }

    if (!tables || tables.length === 0) {
      tables = getRuntimeTables(storeId);
    }

    return NextResponse.json({
      success: true,
      tables: tables.map((t) => ({
        id: String(t._id || t.id),
        storeId: t.storeId,
        number: t.number,
        label: t.label || '',
        token: t.token,
        isActive: t.isActive,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      })),
      count: tables.length,
    });
  } catch (error: any) {
    console.error('[Admin Tables GET Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to fetch tables' } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/tables
 * Create one or multiple tables for the authenticated store
 */
export async function POST(request: Request) {
  try {
    const auth = requireStaff(request, ['owner', 'manager']);
    if (!auth.success || !auth.session) return auth.response!;

    const storeId = auth.session.storeSlug;

    const body = await request.json().catch(() => null);
    const parsed = PostBodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request body',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    const conn = await connectMongoDB();
    const data = parsed.data;

    // Handle batch creation
    if ('tables' in data) {
      const createdTables = [];
      for (const item of data.tables) {
        const cleanNumber = item.number.trim();
        const cleanLabel = (item.label || '').trim();
        let existing: any = null;

        if (conn) {
          try {
            existing = await Table.findOne({ storeId, number: cleanNumber });
          } catch (err) {}
        }
        if (!existing) {
          existing = getRuntimeTables(storeId).find((t) => t.number.toLowerCase() === cleanNumber.toLowerCase());
        }

        if (existing) {
          if (!existing.isActive) {
            existing.isActive = true;
            if (cleanLabel) existing.label = cleanLabel;
            if (conn && typeof existing.save === 'function') await existing.save();
          }
          saveRuntimeTable({
            id: String(existing._id || existing.id),
            storeId,
            number: cleanNumber,
            label: cleanLabel || existing.label || '',
            token: existing.token,
            isActive: true,
          });
          createdTables.push(existing);
        } else {
          const token = generateTableToken();
          let newTable: any = null;
          if (conn) {
            try {
              newTable = await Table.create({
                storeId,
                number: cleanNumber,
                label: cleanLabel,
                token,
                isActive: true,
              });
            } catch (err) {}
          }
          const plainTable = {
            id: newTable ? String(newTable._id) : `tbl_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            storeId,
            number: cleanNumber,
            label: cleanLabel,
            token,
            isActive: true,
          };
          saveRuntimeTable(plainTable);
          createdTables.push(newTable || plainTable);
        }
      }

      return NextResponse.json({
        success: true,
        tables: createdTables.map((t) => ({
          id: String(t._id || t.id),
          storeId: t.storeId,
          number: t.number,
          label: t.label || '',
          token: t.token,
          isActive: t.isActive,
        })),
        count: createdTables.length,
      });
    }

    // Handle single table creation
    const cleanNumber = data.number.trim();
    const cleanLabel = (data.label || '').trim();
    let existing: any = null;

    if (conn) {
      try {
        existing = await Table.findOne({ storeId, number: cleanNumber });
      } catch (err) {}
    }
    if (!existing) {
      existing = getRuntimeTables(storeId).find((t) => t.number.toLowerCase() === cleanNumber.toLowerCase());
    }

    if (existing) {
      return NextResponse.json(
        {
          error: {
            code: 'TABLE_ALREADY_EXISTS',
            message: `Table "${cleanNumber}" already exists in this store.`,
          },
        },
        { status: 409 }
      );
    }

    const token = generateTableToken();
    let newTable: any = null;
    if (conn) {
      try {
        newTable = await Table.create({
          storeId,
          number: cleanNumber,
          label: cleanLabel,
          token,
          isActive: true,
        });
      } catch (err) {}
    }

    const plainTable = {
      id: newTable ? String(newTable._id) : `tbl_${Date.now()}`,
      storeId,
      number: cleanNumber,
      label: cleanLabel,
      token,
      isActive: true,
    };
    saveRuntimeTable(plainTable);

    return NextResponse.json(
      {
        success: true,
        table: {
          id: plainTable.id,
          storeId: plainTable.storeId,
          number: plainTable.number,
          label: plainTable.label,
          token: plainTable.token,
          isActive: plainTable.isActive,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('[Admin Tables POST Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to create table' } },
      { status: 500 }
    );
  }
}
