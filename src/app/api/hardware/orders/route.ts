import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import {
  HardwareOrder,
  getRuntimeHardwareOrdersByStore,
} from '@/lib/models/HardwareOrder';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const storeSlug = searchParams.get('storeSlug') || 'brewpluse';

    let orders: any[] = [];

    try {
      const conn = await connectMongoDB();
      if (conn) {
        orders = await HardwareOrder.find({
          storeSlug: storeSlug.toLowerCase().trim(),
        })
          .sort({ createdAt: -1 })
          .lean();
      }
    } catch (e: any) {
      console.warn('[Hardware orders GET] Mongo fetch note:', e?.message);
    }

    if (!orders || orders.length === 0) {
      orders = getRuntimeHardwareOrdersByStore(storeSlug);
    }

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error: any) {
    console.error('[Hardware orders GET error]:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch hardware orders.' },
      { status: 500 }
    );
  }
}
