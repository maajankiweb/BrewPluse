import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { connectMongoDB } from '@/lib/mongodb';
import { Table, getRuntimeTables } from '@/lib/models/Table';
import { Store } from '@/lib/models/Store';
import { requireStaff } from '@/lib/authService';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/admin/tables/[id]/qr
 * Generate QR code for a specific table.
 * Supports format=png for direct image binary or format=json for dataUrl payload.
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id: tableId } = await params;
    const { searchParams } = new URL(request.url);
    const storeParam = searchParams.get('storeSlug');
    const auth = requireStaff(request, ['owner', 'manager', 'cashier']);
    const storeId =
      auth.success && auth.session?.storeSlug
        ? auth.session.storeSlug
        : (storeParam || 'brewpluse');
    const format = searchParams.get('format') || 'json';

    const conn = await connectMongoDB();
    let table: any = null;

    if (conn) {
      try {
        table = await Table.findOne({ _id: tableId, storeId }).lean();
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

    let store: any = null;
    if (conn) {
      try {
        store = await Store.findOne({ slug: storeId }).lean();
      } catch (err) {}
    }

    const storeName = store?.name || auth.session?.storeName || storeId || 'BrewPluse Cafe';

    // Construct full target URL
    const host = request.headers.get('host') || 'brewpluse.com';
    const proto = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');
    const targetUrl = `${proto}://${host}/t/${table.token}`;

    if (format === 'png') {
      const pngBuffer = await QRCode.toBuffer(targetUrl, {
        width: 600,
        margin: 2,
        color: {
          dark: '#062F23',
          light: '#FFFFFF',
        },
      });

      return new NextResponse(new Uint8Array(pngBuffer), {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Content-Disposition': `inline; filename="qr-${table.number.toLowerCase().replace(/\s+/g, '-')}.png"`,
          'Cache-Control': 'no-store',
        },
      });
    }

    // Default: JSON with Data URL and metadata
    const qrDataUrl = await QRCode.toDataURL(targetUrl, {
      width: 400,
      margin: 2,
      color: {
        dark: '#062F23',
        light: '#FFFFFF',
      },
    });

    return NextResponse.json({
      success: true,
      table: {
        id: String(table._id || table.id),
        number: table.number,
        label: table.label || '',
        token: table.token,
      },
      storeName,
      targetUrl,
      qrDataUrl,
    });
  } catch (error: any) {
    console.error('[Admin Table QR Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to generate QR code' } },
      { status: 500 }
    );
  }
}
