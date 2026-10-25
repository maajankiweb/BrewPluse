import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import {
  Table,
  generateTableToken,
  getRuntimeTables,
  saveRuntimeTable,
} from '@/lib/models/Table';
import { requireStaff } from '@/lib/authService';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/admin/tables/[id]/regenerate-token
 * Regenerates the unguessable table token, immediately invalidating the old QR.
 */
export async function POST(request: Request, { params }: RouteParams) {
  try {
    const { id: tableId } = await params;
    const { searchParams } = new URL(request.url);
    const storeParam = searchParams.get('storeSlug');
    const auth = requireStaff(request, ['owner', 'manager']);
    const storeId =
      auth.success && auth.session?.storeSlug
        ? auth.session.storeSlug
        : (storeParam || 'brewpluse');

    const conn = await connectMongoDB();
    let table: any = null;

    if (conn) {
      try {
        table = await Table.findOne({ _id: tableId, storeId });
      } catch (err) {}
    }

    if (!table) {
      const runtimeList = getRuntimeTables(storeId);
      table = runtimeList.find(
        (t) => t.id === tableId || t.number.toLowerCase() === tableId.toLowerCase()
      );
    }

    if (!table) {
      return NextResponse.json(
        { error: { code: 'NOT_FOUND', message: 'Table not found' } },
        { status: 404 }
      );
    }

    const oldToken = table.token;
    const newToken = generateTableToken();
    table.token = newToken;

    if (conn && typeof table.save === 'function') {
      await table.save();
    }

    saveRuntimeTable({
      id: String(table._id || table.id),
      storeId,
      number: table.number,
      label: table.label || '',
      token: newToken,
      isActive: table.isActive !== false,
    });

    return NextResponse.json({
      success: true,
      message: `Token for table ${table.number} has been regenerated. Old QR is now invalid.`,
      table: {
        id: String(table._id || table.id),
        storeId,
        number: table.number,
        label: table.label || '',
        token: newToken,
        previousTokenInvalidated: oldToken,
      },
    });
  } catch (error: any) {
    console.error('[Admin Regenerate Token Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to regenerate token' } },
      { status: 500 }
    );
  }
}
