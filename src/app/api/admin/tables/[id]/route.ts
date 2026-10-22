import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectMongoDB } from '@/lib/mongodb';
import { Table, deleteRuntimeTable } from '@/lib/models/Table';
import { requireStaff } from '@/lib/authService';

export const dynamic = 'force-dynamic';

const UpdateTableSchema = z.object({
  number: z.string().min(1).max(30).optional(),
  label: z.string().max(80).optional(),
  isActive: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * PATCH /api/admin/tables/[id]
 * Update table details (number, label, active status)
 */
export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id: tableId } = await params;
    const { searchParams } = new URL(request.url);
    const storeParam = searchParams.get('storeSlug');
    const auth = requireStaff(request, ['owner', 'manager']);
    const storeId =
      auth.success && auth.session?.storeSlug
        ? auth.session.storeSlug
        : (storeParam || 'brewpluse');

    const body = await request.json().catch(() => null);
    const parsed = UpdateTableSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid request data',
            details: parsed.error.issues,
          },
        },
        { status: 400 }
      );
    }

    await connectMongoDB();

    const table = await Table.findOne({ _id: tableId, storeId });
    if (!table) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Table not found' } },
        { status: 404 }
      );
    }

    const { number, label, isActive } = parsed.data;

    // Check if new number collides with another table in same store
    if (number && number.trim() !== table.number) {
      const conflict = await Table.findOne({
        storeId,
        number: number.trim(),
        _id: { $ne: table._id },
      });
      if (conflict) {
        return NextResponse.json(
          {
            error: {
              code: 'TABLE_NUMBER_EXISTS',
              message: `Another table with number "${number.trim()}" already exists.`,
            },
          },
          { status: 409 }
        );
      }
      table.number = number.trim();
    }

    if (label !== undefined) table.label = label.trim();
    if (isActive !== undefined) table.isActive = isActive;

    await table.save();

    return NextResponse.json({
      success: true,
      table: {
        id: String(table._id),
        storeId: table.storeId,
        number: table.number,
        label: table.label || '',
        token: table.token,
        isActive: table.isActive,
      },
    });
  } catch (error: any) {
    console.error('[Admin Table PATCH Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to update table' } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/tables/[id]
 * Delete or soft-disable a table
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id: tableId } = await params;
    const { searchParams } = new URL(request.url);
    const storeParam = searchParams.get('storeSlug');
    const auth = requireStaff(request, ['owner', 'manager']);
    const storeId =
      auth.success && auth.session?.storeSlug
        ? auth.session.storeSlug
        : (storeParam || 'brewpluse');

    await connectMongoDB();

    let table = await Table.findOne({ _id: tableId, storeId });
    if (!table) {
      table = await Table.findOne({ number: tableId, storeId });
    }

    if (table) {
      await Table.deleteOne({ _id: table._id, storeId });
    }

    deleteRuntimeTable(storeId, tableId);

    return NextResponse.json({
      success: true,
      message: `Table removed successfully.`,
    });
  } catch (error: any) {
    console.error('[Admin Table DELETE Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to delete table' } },
      { status: 500 }
    );
  }
}
