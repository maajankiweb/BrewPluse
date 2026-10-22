import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { connectMongoDB } from '@/lib/mongodb';
import { TableSession } from '@/lib/models/TableSession';
import { Table, findRuntimeTableById } from '@/lib/models/Table';
import { Store } from '@/lib/models/Store';

export const dynamic = 'force-dynamic';

interface RouteParams {
  params: Promise<{ sessionId: string }>;
}

/**
 * GET /api/public/upi-qr/:sessionId
 * Generates an NPCI-compliant UPI deep link and renders a QR code Data URL for counter settlement.
 * Deep link: upi://pay?pa=<upiId>&pn=<name>&am=<due>&cu=INR&tn=<Table-X-Order>
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { sessionId } = await params;
    if (!sessionId) {
      return NextResponse.json(
        { error: { code: 'INVALID_ID', message: 'Session ID is required.' } },
        { status: 400 }
      );
    }

    const conn = await connectMongoDB();
    let session: any = null;

    if (conn) {
      try {
        session = await TableSession.findById(sessionId);
      } catch (err) {}
    }

    if (!session) {
      const allSessions = Object.values(global.runtimeTableSessions || {}).flat();
      session = allSessions.find((s) => s.id === sessionId);
    }

    if (!session) {
      return NextResponse.json(
        { error: { code: 'SESSION_NOT_FOUND', message: 'Dining session not found.' } },
        { status: 404 }
      );
    }

    const storeSlug = session.storeId;
    let store: any = null;
    if (conn) {
      try {
        store = await Store.findOne({ slug: storeSlug });
      } catch (e) {}
    }

    const storeName = store?.name || 'BrewPluse Cafe';
    const upiId = store?.upiId || process.env.DEFAULT_UPI_ID || 'billing@brewpluse';

    let tableNumber = 'Table';
    if (conn) {
      try {
        const tbl = await Table.findById(session.tableId);
        if (tbl) tableNumber = tbl.number;
      } catch (e) {}
    }
    if (tableNumber === 'Table') {
      const rtTbl = findRuntimeTableById(session.tableId);
      if (rtTbl) tableNumber = rtTbl.number;
    }

    const duePaise = session.totals?.due ?? 0;
    const dueRupees = (duePaise / 100).toFixed(2);
    const transactionNote = `${tableNumber} Bill`.replace(/\s+/g, '-');

    // Standard NPCI UPI URI
    const upiUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
      storeName
    )}&am=${dueRupees}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

    // Generate high-resolution Data URL QR
    const qrDataUrl = await QRCode.toDataURL(upiUri, {
      width: 400,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });

    return NextResponse.json({
      success: true,
      upiUri,
      qrDataUrl,
      dueAmount: Number(dueRupees),
      tableNumber,
      storeName,
      upiId,
      status: session.status,
      note: 'Show this QR code at the counter for cashier verification and payment confirmation.',
    });
  } catch (error: any) {
    console.error('[UPI QR Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to generate UPI QR' } },
      { status: 500 }
    );
  }
}
