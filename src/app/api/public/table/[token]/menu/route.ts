import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Table, findRuntimeTableByToken } from '@/lib/models/Table';
import { Store, getRuntimeStore } from '@/lib/models/Store';
import { getStoreMenu } from '@/lib/menuService';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ token: string }>;
}

/**
 * GET /api/public/table/:token/menu
 * Returns categorized live menu items for the table with variants, addons, and availability.
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { token } = await params;
    if (!token || typeof token !== 'string' || token.trim().length < 8) {
      return NextResponse.json(
        { error: { code: 'INVALID_TOKEN', message: 'Valid table QR token is required.' } },
        { status: 400 }
      );
    }

    const cleanToken = token.trim();
    let table: any = null;

    const conn = await connectMongoDB();
    if (conn) {
      try {
        table = await Table.findOne({ token: cleanToken, isActive: true }).lean();
      } catch (err) {}
    }
    if (!table) {
      table = findRuntimeTableByToken(cleanToken);
    }

    if (!table && cleanToken.toLowerCase().startsWith('demo')) {
      const demoNum = cleanToken.replace(/[^0-9]/g, '') || '1';
      table = {
        _id: `tbl_demo_${demoNum}`,
        id: `tbl_demo_${demoNum}`,
        storeId: 'demo',
        number: `Table ${demoNum}`,
        label: 'Demo Dining Area',
        token: cleanToken,
        isActive: true,
      };
    }

    if (!table) {
      return NextResponse.json(
        { error: { code: 'TABLE_NOT_FOUND', message: 'Table not found or QR code expired.' } },
        { status: 404 }
      );
    }

    const storeSlug = table.storeId;
    let store: any = null;
    if (conn) {
      try {
        store = await Store.findOne({ slug: storeSlug }).lean();
      } catch (err) {}
    }
    if (!store) {
      store = getRuntimeStore(storeSlug);
    }

    const items = await getStoreMenu(storeSlug);

    // Extract unique categories
    const categories = ['all', ...Array.from(new Set(items.map((i) => i.category)))];

    return NextResponse.json(
      {
        success: true,
        store: {
          slug: storeSlug,
          name: store?.name || storeSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
          currency: store?.currency || 'INR',
          taxInclusive: store?.taxInclusive || false,
          taxRate: typeof store?.taxRate === 'number' ? store.taxRate : 0.0,
          serviceChargePercent: store?.serviceChargePercent || 0,
          platformFeeMode: store?.platformFeeMode || 'cafe',
          paymentPolicy: store?.paymentPolicy || 'customer_choice',
          acceptingOrders: store?.acceptingOrders !== false,
        },
        table: {
          id: String(table._id || table.id),
          number: table.number,
          label: table.label || '',
        },
        categories,
        items,
        count: items.length,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
        },
      }
    );
  } catch (error: any) {
    console.error('[Public Menu API Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to fetch menu' } },
      { status: 500 }
    );
  }
}
