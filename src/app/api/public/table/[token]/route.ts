import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Table, findRuntimeTableByToken } from '@/lib/models/Table';
import { Store } from '@/lib/models/Store';
import { createGuestSessionToken, setGuestSessionCookie } from '@/lib/guestSession';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ token: string }>;
}

/**
 * GET /api/public/table/:token
 * Public endpoint to resolve a table by its unguessable QR token.
 * Sets a signed guest-session cookie bound to { tableId, storeId }.
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { token } = await params;
    if (!token || typeof token !== 'string' || token.trim().length < 8) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_TOKEN',
            message: 'Invalid table QR token provided.',
          },
        },
        { status: 400 }
      );
    }

    const cleanToken = token.trim();
    let table: any = null;

    const conn = await connectMongoDB();
    if (conn) {
      try {
        table = await Table.findOne({ token: cleanToken, isActive: true }).lean();
      } catch (err) {
        console.warn('[Public Table] Mongoose query error, trying runtime fallback:', err);
      }
    }

    if (!table) {
      table = findRuntimeTableByToken(cleanToken);
    }

    if (!table) {
      return NextResponse.json(
        {
          error: {
            code: 'TABLE_NOT_FOUND',
            message: 'This QR code is no longer valid or table not found. Please ask cafe staff for assistance.',
          },
        },
        { status: 404 }
      );
    }

    const tableId = String(table._id || table.id);
    const storeSlug = table.storeId;

    let store: any = null;
    if (conn) {
      try {
        store = await Store.findOne({ slug: storeSlug }).lean();
      } catch (err) {
        console.warn('[Public Table] Store query note:', err);
      }
    }

    if (!store) {
      store = {
        _id: `store-${storeSlug}`,
        slug: storeSlug,
        name: storeSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()),
        currency: 'INR',
        isActive: true,
        acceptingOrders: true,
        paymentPolicy: 'customer_choice',
        platformFeeMode: 'cafe',
        taxInclusive: false,
        taxRate: 0.0,
      };
    }

    if (!store.isActive) {
      return NextResponse.json(
        {
          error: {
            code: 'STORE_INACTIVE',
            message: 'This cafe is currently not taking orders. Please ask staff.',
          },
        },
        { status: 404 }
      );
    }

    // Create signed guest session token
    const guestToken = createGuestSessionToken({
      tableId,
      storeId: store.slug,
    });

    const response = NextResponse.json({
      success: true,
      store: {
        id: String(store._id || store.slug),
        slug: store.slug,
        name: store.name,
        logo: store.imageUrl || '',
        currency: store.currency || 'INR',
        acceptingOrders: store.acceptingOrders !== false,
        paymentPolicy: store.paymentPolicy || 'customer_choice',
        platformFeeMode: store.platformFeeMode || 'cafe',
        taxInclusive: store.taxInclusive || false,
        taxRate: typeof store.taxRate === 'number' ? store.taxRate : 0.0,
      },
      table: {
        id: tableId,
        number: table.number,
        label: table.label || '',
        token: table.token,
      },
    });

    // Set signed guest session cookie
    setGuestSessionCookie(response, guestToken);

    return response;
  } catch (error: any) {
    console.error('[Public Table Resolve Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to resolve table' } },
      { status: 500 }
    );
  }
}
