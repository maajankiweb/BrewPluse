import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { requireStaff } from '@/lib/authService';

export const dynamic = 'force-dynamic';

/**
 * GET /api/kitchen/orders
 * Roles: chef, barista, manager, owner, cashier
 * Returns active kitchen tickets sorted oldest-first.
 * 
 * SECURITY MANDATE (TABLE_QR_ORDERING_SPEC.md §8):
 * "Shows table number, notes (bold), variants/add-ons. Never shows prices or payment info."
 */
export async function GET(request: Request) {
  try {
    const auth = await requireStaff(request, ['chef', 'barista', 'manager', 'owner', 'cashier']);
    if (!auth.authorized) {
      return auth.response;
    }

    const storeId = auth.storeSlug;
    const activeKitchenStatuses = ['placed', 'accepted', 'preparing', 'ready'];

    const conn = await connectMongoDB();
    let orders: any[] = [];

    if (conn) {
      try {
        orders = await Order.find({
          storeId,
          status: { $in: activeKitchenStatuses },
        })
          .sort({ createdAt: 1 }) // Oldest first
          .lean();
      } catch (err) {
        console.warn('[Kitchen Orders DB query]:', err);
      }
    }

    if (orders.length === 0) {
      const runtimeStoreOrders = global.runtimeOrders?.[storeId] || [];
      orders = runtimeStoreOrders.filter((o) => activeKitchenStatuses.includes(o.status));
      orders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }

    const now = Date.now();

    // Map to kitchen tickets with strictly stripped financial data
    const tickets = orders.map((o) => {
      const createdTime = new Date(o.createdAt || now).getTime();
      const elapsedMinutes = Math.max(0, Math.floor((now - createdTime) / 60000));

      const sanitizedItems = (o.items || []).map((item: any, idx: number) => ({
        id: item.itemId || item.id || `item_${idx}`,
        name: item.name,
        qty: item.quantity || item.qty || 1,
        variant: item.variant?.name || undefined,
        addons: Array.isArray(item.addons)
          ? item.addons.map((a: any) => (typeof a === 'string' ? a : a.name))
          : [],
        note: item.notes || item.note || '',
        status: item.status || 'queued',
      }));

      return {
        id: String(o._id || o.id),
        orderNumber: o.orderNumber,
        table: o.table,
        status: o.status,
        notes: o.notes || '',
        customerName: o.customerName || undefined,
        items: sanitizedItems,
        createdAt: o.createdAt,
        elapsedMinutes,
      };
    });

    return NextResponse.json({
      success: true,
      tickets,
      count: tickets.length,
      storeId,
    });
  } catch (error: any) {
    console.error('[Kitchen Orders GET Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to fetch kitchen tickets' } },
      { status: 500 }
    );
  }
}
