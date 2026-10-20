import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import { Order } from '@/lib/models/Order';
import { requireStaff } from '@/lib/authService';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/orders
 * Roles: owner, manager, cashier
 * Returns live and historical orders scoped strictly to the staff member's store.
 * Filters out 'pending_payment' orders from live views per spec §4.1.
 */
export async function GET(request: Request) {
  try {
    const auth = await requireStaff(request, ['owner', 'manager', 'cashier']);
    if (!auth.authorized) {
      return auth.response;
    }

    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status');
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const tableIdParam = searchParams.get('tableId');
    const limit = Math.min(parseInt(searchParams.get('limit') || '100', 10), 300);

    const storeId = auth.storeSlug;

    // Build MongoDB query
    const query: any = { storeId };

    if (statusParam) {
      query.status = statusParam;
    } else {
      // Exclude abandoned or unverified pending_payment orders from the live admin boards
      query.status = { $ne: 'pending_payment' };
    }

    if (tableIdParam) {
      query.tableId = tableIdParam;
    }

    if (fromParam || toParam) {
      query.createdAt = {};
      if (fromParam) query.createdAt.$gte = new Date(fromParam);
      if (toParam) query.createdAt.$lte = new Date(toParam);
    }

    const conn = await connectMongoDB();
    let orders: any[] = [];

    if (conn) {
      try {
        orders = await Order.find(query)
          .sort({ createdAt: -1 })
          .limit(limit)
          .lean();
      } catch (err) {
        console.warn('[Admin Orders GET DB warning]:', err);
      }
    }

    // Fallback to in-memory runtime cache if database returned no results or is unavailable
    if (orders.length === 0) {
      const runtimeStoreOrders = global.runtimeOrders?.[storeId] || [];
      orders = runtimeStoreOrders.filter((o) => {
        if (statusParam && o.status !== statusParam) return false;
        if (!statusParam && o.status === 'pending_payment') return false;
        if (tableIdParam && o.tableId !== tableIdParam) return false;
        if (fromParam && new Date(o.createdAt) < new Date(fromParam)) return false;
        if (toParam && new Date(o.createdAt) > new Date(toParam)) return false;
        return true;
      });
      orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      orders = orders.slice(0, limit);
    }

    // Enrich with calculated elapsed time in minutes
    const now = Date.now();
    const enrichedOrders = orders.map((o) => {
      const createdTime = new Date(o.createdAt || now).getTime();
      const elapsedMinutes = Math.max(0, Math.floor((now - createdTime) / 60000));
      return {
        ...o,
        id: String(o._id || o.id),
        elapsedMinutes,
      };
    });

    return NextResponse.json({
      success: true,
      orders: enrichedOrders,
      count: enrichedOrders.length,
      storeId,
    });
  } catch (error: any) {
    console.error('[Admin Orders GET Error]:', error);
    return NextResponse.json(
      { error: { code: 'INTERNAL_ERROR', message: error.message || 'Failed to fetch orders' } },
      { status: 500 }
    );
  }
}
