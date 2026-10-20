import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { syncOrderToFirestore } from '@/lib/firebaseAdmin';
import { getSessionFromRequest } from '@/lib/authService';

export const dynamic = 'force-dynamic';

// Clean in-memory runtime cache (no hardcoded fake/demo orders)
let runtimeOrdersCache: any[] = [];

/**
 * GET /api/orders
 * Strictly authenticated: Only staff/owner of the store can view cafe orders
 */
export async function GET(request: Request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please sign in to view orders.' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const requestedStoreId = searchParams.get('storeId');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 200);

    // Multi-tenant isolation: enforce storeId from session
    const storeId = session.storeSlug;

    if (requestedStoreId && requestedStoreId !== storeId && session.role !== 'owner') {
      return NextResponse.json(
        { success: false, error: 'Forbidden. You do not have access to this store.' },
        { status: 403 }
      );
    }

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
        console.warn('[Orders GET] MongoDB query failed, checking runtime cache:', err);
      }
    }

    // Filter in-memory cache strictly by storeId
    const filtered = runtimeOrdersCache
      .filter((o) => o.storeId === storeId)
      .slice(0, limit);

    return NextResponse.json({ success: true, orders: filtered, source: 'runtime_cache' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/orders
 * Creates an order either from authenticated POS or guest table QR menu
 */
export async function POST(request: Request) {
  try {
    const session = getSessionFromRequest(request);
    const body = await request.json();
    const {
      storeId: rawStoreId,
      table = 'Counter',
      orderType = 'dine_in',
      items = [],
      subtotal = 0,
      discount = 0,
      tax = 0,
      total = 0,
      paymentMode = 'UPI',
      paymentStatus = 'pending',
      customerName = '',
      customerPhone = '',
      notes = '',
      status = 'pending',
    } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items in order' },
        { status: 400 }
      );
    }

    // Multi-tenant isolation:
    // If authenticated (e.g. POS), use session storeSlug.
    // If unauthenticated (customer QR), validate storeId string.
    let targetStoreId: string;
    let safePaymentStatus = paymentStatus;
    let safeStatus = status;

    if (session) {
      targetStoreId = session.storeSlug;
    } else {
      // Guest order from Table QR: sanitize storeId
      if (!rawStoreId || typeof rawStoreId !== 'string') {
        return NextResponse.json(
          { success: false, error: 'Valid storeId is required for table orders.' },
          { status: 400 }
        );
      }
      targetStoreId = rawStoreId
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '');

      // Guest cannot arbitrarily mark orders as paid without gateway verification
      safePaymentStatus = 'pending';
      safeStatus = 'pending';
    }

    const orderNumber = body.orderNumber || `BP-${Math.floor(1000 + Math.random() * 9000)}`;
    const customerUid = String(body.customerUid || (session ? session.uid : '')).slice(0, 128);

    // Recompute total server-side
    const computedSubtotal = items.reduce((sum: number, item: any) => {
      const price = Math.max(0, Number(item.price) || 0);
      const qty = Math.max(1, parseInt(item.qty || '1', 10));
      return sum + price * qty;
    }, 0);
    const safeDiscount = Math.max(0, Math.min(Number(discount) || 0, computedSubtotal));
    const safeTax = Math.max(0, Number(tax) || 0);
    const computedTotal = Math.min(100000, Math.max(0, computedSubtotal - safeDiscount + safeTax));

    const nowIso = new Date().toISOString();

    const newOrderData = {
      storeId: targetStoreId,
      orderNumber,
      table: String(table).slice(0, 50),
      orderType: orderType === 'takeaway' || orderType === 'delivery' ? orderType : 'dine_in',
      customerUid,
      items: items.slice(0, 50),
      subtotal: computedSubtotal,
      discount: safeDiscount,
      tax: safeTax,
      total: computedTotal,
      status: safeStatus || 'pending',
      paymentMode: String(paymentMode).slice(0, 50),
      paymentStatus: safePaymentStatus || 'pending',
      customerName: String(customerName || '').slice(0, 80),
      customerPhone: String(customerPhone || '').slice(0, 20),
      notes: String(notes || '').slice(0, 300),
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    // Save to runtime cache
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
        console.warn('[Orders POST] MongoDB save warning, cached locally:', dbErr);
      }
    }

    syncOrderToFirestore(newOrderData).catch(() => {});
    return NextResponse.json({ success: true, order: newOrderData, source: 'runtime_cache' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create order' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/orders
 * Strictly authenticated: Only staff of the owning store can update order status
 */
export async function PATCH(request: Request) {
  try {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Sign in required to update order status.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { orderNumber, status, paymentStatus } = body;

    if (!orderNumber) {
      return NextResponse.json({ success: false, error: 'orderNumber is required' }, { status: 400 });
    }

    const storeId = session.storeSlug;

    // Update in runtime cache with storeId ownership check
    const cachedOrder = runtimeOrdersCache.find(
      (o) => o.orderNumber === orderNumber && o.storeId === storeId
    );
    if (cachedOrder) {
      if (status) cachedOrder.status = status;
      if (paymentStatus) cachedOrder.paymentStatus = paymentStatus;
    }

    // Update in MongoDB scoped to storeId
    const conn = await connectMongoDB();
    if (conn) {
      try {
        const updateFields: any = {};
        if (status) updateFields.status = status;
        if (paymentStatus) updateFields.paymentStatus = paymentStatus;

        const updated = await Order.findOneAndUpdate(
          { orderNumber, storeId },
          { $set: updateFields },
          { new: true }
        );

        if (!updated && !cachedOrder) {
          return NextResponse.json(
            { success: false, error: 'Order not found in this cafe.' },
            { status: 404 }
          );
        }

        syncOrderToFirestore({ orderNumber, storeId, ...updateFields, updatedAt: new Date().toISOString() }).catch(() => {});
        return NextResponse.json({ success: true, order: updated || cachedOrder, source: 'database' });
      } catch (dbErr) {
        console.warn('[Orders PATCH] MongoDB update warning:', dbErr);
      }
    }

    syncOrderToFirestore({ orderNumber, storeId, status, paymentStatus, updatedAt: new Date().toISOString() }).catch(() => {});
    return NextResponse.json({ success: true, order: cachedOrder, source: 'runtime_cache' });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}
