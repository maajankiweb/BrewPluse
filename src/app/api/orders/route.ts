import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { syncOrderToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('storeId') || 'my-cafe';
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    const conn = await connectMongoDB();
    if (!conn) {
      return NextResponse.json({ success: true, orders: [], source: 'offline' });
    }

    const orders = await Order.find({ storeId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ success: true, orders, source: 'database' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      storeId = 'my-cafe',
      table = 'Counter',
      orderType = 'dine_in',
      items = [],
      subtotal = 0,
      discount = 0,
      tax = 0,
      total = 0,
      paymentMode = 'UPI',
      customerName = '',
      customerPhone = '',
      notes = '',
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items in order' },
        { status: 400 }
      );
    }

    const orderNumber = `BP-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrderData = {
      storeId,
      orderNumber,
      table,
      orderType,
      items,
      subtotal: Number(subtotal) || 0,
      discount: Number(discount) || 0,
      tax: Number(tax) || 0,
      total: Number(total) || 0,
      status: 'pending',
      paymentMode,
      paymentStatus: 'paid',
      customerName,
      customerPhone,
      notes,
      createdAt: new Date(),
    };

    const conn = await connectMongoDB();
    if (conn) {
      const created = await Order.create(newOrderData);
      // Dual-sync to Firestore (Unified Web + Mobile Sync)
      syncOrderToFirestore(newOrderData).catch(() => {});
      return NextResponse.json({ success: true, order: created, source: 'database' }, { status: 201 });
    }

    // Dual-sync to Firestore even if MongoDB is bypassed
    syncOrderToFirestore(newOrderData).catch(() => {});
    return NextResponse.json({ success: true, order: newOrderData, source: 'local' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}
