import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { syncOrderToFirestore } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

// In-memory runtime cache for seamless offline/local resilience
let runtimeOrdersCache: any[] = [
  {
    storeId: 'brewpluse',
    orderNumber: 'BP-1021',
    table: 'Table 2',
    orderType: 'dine_in',
    items: [
      { id: 'bp-flat-white', name: 'Flat White', qty: 2, price: 180 },
      { id: 'bp-butter-croissant', name: 'Butter Croissant', qty: 1, price: 140 },
    ],
    subtotal: 500,
    discount: 0,
    tax: 25,
    total: 525,
    status: 'preparing',
    paymentMode: 'UPI',
    paymentStatus: 'paid',
    customerName: 'Aarav Sharma',
    customerPhone: '+91 98765 43210',
    notes: 'Extra hot flat white',
    createdAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
  },
  {
    storeId: 'brewpluse',
    orderNumber: 'BP-1022',
    table: 'Table 4',
    orderType: 'dine_in',
    items: [
      { id: 'bp-cold-brew', name: 'Cold Brew', qty: 1, price: 210 },
      { id: 'bp-paneer-sandwich', name: 'Paneer Tikka Sandwich', qty: 1, price: 180 },
    ],
    subtotal: 390,
    discount: 0,
    tax: 19.5,
    total: 409.5,
    status: 'pending',
    paymentMode: 'Cash',
    paymentStatus: 'pending',
    customerName: 'Priya Verma',
    customerPhone: '+91 98111 22334',
    notes: 'Less spicy sandwich',
    createdAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeId = searchParams.get('storeId') || 'brewpluse';
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    const conn = await connectMongoDB();
    if (conn) {
      try {
        const dbOrders = await Order.find({ storeId })
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean();

        if (dbOrders && dbOrders.length > 0) {
          return NextResponse.json({ success: true, orders: dbOrders, source: 'database' });
        }
      } catch (err) {
        console.warn('MongoDB query failed, falling back to runtime cache:', err);
      }
    }

    // Filter in-memory cache by storeId (or return all if store matches or testing)
    const filtered = runtimeOrdersCache
      .filter((o) => !storeId || o.storeId === storeId || storeId === 'brewpluse' || storeId === 'demo')
      .slice(0, limit);

    return NextResponse.json({ success: true, orders: filtered, source: 'runtime_cache' });
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
      storeId = 'brewpluse',
      table = 'Counter',
      orderType = 'dine_in',
      items = [],
      subtotal = 0,
      discount = 0,
      tax = 0,
      total = 0,
      paymentMode = 'UPI',
      paymentStatus = 'paid',
      customerName = '',
      customerPhone = '',
      notes = '',
      status = 'pending',
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items in order' },
        { status: 400 }
      );
    }

    const orderNumber = body.orderNumber || `BP-${Math.floor(1000 + Math.random() * 9000)}`;

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
      status: status || 'pending',
      paymentMode,
      paymentStatus: paymentStatus || 'paid',
      customerName,
      customerPhone,
      notes,
      createdAt: new Date().toISOString(),
    };

    // Save to runtime cache immediately
    runtimeOrdersCache.unshift(newOrderData);
    if (runtimeOrdersCache.length > 200) {
      runtimeOrdersCache.pop();
    }

    // Attempt saving to MongoDB
    const conn = await connectMongoDB();
    if (conn) {
      try {
        const created = await Order.create({
          ...newOrderData,
          createdAt: new Date(),
        });
        syncOrderToFirestore(newOrderData).catch(() => {});
        return NextResponse.json({ success: true, order: created, source: 'database' }, { status: 201 });
      } catch (dbErr) {
        console.warn('MongoDB create failed, saved to runtime cache:', dbErr);
      }
    }

    // Dual-sync to Firestore even if MongoDB is offline
    syncOrderToFirestore(newOrderData).catch(() => {});
    return NextResponse.json({ success: true, order: newOrderData, source: 'runtime_cache' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderNumber, status, paymentStatus } = body;

    if (!orderNumber) {
      return NextResponse.json({ success: false, error: 'orderNumber is required' }, { status: 400 });
    }

    // Update in-memory cache
    const cachedOrder = runtimeOrdersCache.find((o) => o.orderNumber === orderNumber);
    if (cachedOrder) {
      if (status) cachedOrder.status = status;
      if (paymentStatus) cachedOrder.paymentStatus = paymentStatus;
    }

    // Update in MongoDB
    const conn = await connectMongoDB();
    if (conn) {
      try {
        const updateFields: any = {};
        if (status) updateFields.status = status;
        if (paymentStatus) updateFields.paymentStatus = paymentStatus;

        const updated = await Order.findOneAndUpdate(
          { orderNumber },
          { $set: updateFields },
          { new: true }
        );
        return NextResponse.json({ success: true, order: updated || cachedOrder, source: 'database' });
      } catch (dbErr) {
        console.warn('MongoDB update failed, returning cached update:', dbErr);
      }
    }

    return NextResponse.json({ success: true, order: cachedOrder, source: 'runtime_cache' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}
