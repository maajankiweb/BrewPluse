import { NextResponse } from 'next/server';
import QRCode from 'qrcode';
import { connectMongoDB } from '@/lib/mongodb';
import { Table, getRuntimeTables, ensureDefaultTables } from '@/lib/models/Table';
import { Store } from '@/lib/models/Store';
import { requireStaff } from '@/lib/authService';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/tables/qr-sheet
 * Generates an A4 print-ready QR sheet (4 tables per A4 page)
 * formatted with store branding, table number, and instructions.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeParam = searchParams.get('storeSlug');
    const auth = requireStaff(request, ['owner', 'manager']);
    const storeId =
      auth.success && auth.session?.storeSlug
        ? auth.session.storeSlug
        : (storeParam || 'brewpluse');

    const tables = await ensureDefaultTables(storeId);

    if (!tables || tables.length === 0) {
      return new NextResponse(
        `<html><body style="font-family: sans-serif; text-align: center; padding: 50px;">
          <h2>No active tables found for this store.</h2>
          <p>Please create tables in the admin dashboard first.</p>
        </body></html>`,
        { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }

    let store: any = null;
    try {
      const conn = await connectMongoDB();
      if (conn) {
        store = await Store.findOne({ slug: storeId });
      }
    } catch (err) {}
    const storeName = store?.name || (auth.success ? auth.session?.storeName : null) || 'BrewPluse Cafe';

    const host = request.headers.get('host') || 'brewpluse.com';
    const proto = request.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https');

    // Generate QR data URLs for each table
    const tableCards = await Promise.all(
      tables.map(async (table) => {
        const targetUrl = `${proto}://${host}/t/${table.token}`;
        const qrDataUrl = await QRCode.toDataURL(targetUrl, {
          width: 500,
          margin: 1,
          color: {
            dark: '#062F23',
            light: '#FFFFFF',
          },
        });
        return {
          number: table.number,
          label: table.label || '',
          targetUrl,
          qrDataUrl,
        };
      })
    );

    // Build print-optimized HTML (4 cards per A4 page)
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${storeName} — Table QR Sheet</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      background: #f4f5f4;
      color: #1a1a1a;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .no-print-bar {
      position: sticky;
      top: 0;
      background: #062F23;
      color: #fff;
      padding: 12px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      z-index: 1000;
    }
    .print-btn {
      background: #10B981;
      color: #fff;
      border: none;
      padding: 10px 22px;
      font-size: 14px;
      font-weight: 700;
      border-radius: 9999px;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
    }
    .print-btn:hover {
      background: #059669;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12mm;
      padding: 10mm;
      max-width: 210mm;
      margin: 0 auto;
    }
    .card {
      border: 2px dashed #0B5C45;
      background: #fff;
      border-radius: 16px;
      padding: 16px 20px 20px;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 125mm;
      page-break-inside: avoid;
      box-shadow: 0 4px 15px rgba(0,0,0,0.04);
    }
    .header {
      width: 100%;
      border-bottom: 2px solid #E8F6EF;
      padding-bottom: 8px;
      margin-bottom: 10px;
    }
    .store-name {
      font-size: 15px;
      font-weight: 800;
      color: #062F23;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .tagline {
      font-size: 10px;
      color: #65736D;
      margin-top: 2px;
    }
    .table-badge {
      background: #062F23;
      color: #fff;
      padding: 6px 18px;
      border-radius: 9999px;
      font-size: 20px;
      font-weight: 900;
      letter-spacing: 0.5px;
      margin: 8px 0;
      display: inline-block;
    }
    .table-label {
      font-size: 11px;
      color: #059669;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .qr-img {
      width: 58mm;
      height: 58mm;
      object-fit: contain;
      border-radius: 12px;
      border: 1px solid #E7ECE9;
      padding: 6px;
      background: #fff;
    }
    .instructions {
      margin-top: 10px;
      font-size: 11px;
      color: #12201B;
      font-weight: 700;
    }
    .sub-instructions {
      font-size: 9px;
      color: #8D9792;
      margin-top: 3px;
    }
    .powered-by {
      font-size: 8px;
      color: #A0AEC0;
      margin-top: 6px;
      font-family: monospace;
    }
    @media print {
      body {
        background: #fff;
      }
      .no-print-bar {
        display: none !important;
      }
      .grid {
        padding: 0;
        gap: 8mm;
      }
      .card {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <div>
      <strong>${storeName}</strong> — ${tableCards.length} Tables Ready to Print (4 per A4 page)
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ Print QR Sheet</button>
  </div>

  <div class="grid">
    ${tableCards
      .map(
        (card) => `
      <div class="card">
        <div class="header">
          <div class="store-name">${escapeHtml(storeName)}</div>
          <div class="tagline">Brew Excellence • Scan to Order & Pay</div>
        </div>
        
        <div>
          <div class="table-badge">${escapeHtml(card.number)}</div>
          ${card.label ? `<div class="table-label">${escapeHtml(card.label)}</div>` : ''}
        </div>

        <img class="qr-img" src="${card.qrDataUrl}" alt="QR code for ${escapeHtml(card.number)}" />

        <div>
          <div class="instructions">📷 Scan with Phone Camera</div>
          <div class="sub-instructions">Browse Live Menu • Pay Now or Later</div>
          <div class="powered-by">Powered by BrewPluse Cafe OS</div>
        </div>
      </div>
    `
      )
      .join('')}
  </div>
</body>
</html>`;

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error: any) {
    console.error('[Admin QR Sheet Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to generate QR sheet' } },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
