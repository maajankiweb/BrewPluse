import { NextResponse } from 'next/server';
import { syncMenuToFirestore } from '@/lib/firebaseAdmin';
import { getSessionFromRequest } from '@/lib/authService';

export const dynamic = 'force-dynamic';

const DEFAULT_CATALOG = [
  { id: 'bp-flat-white', name: 'Flat White', cat: 'coffee', price: 180, desc: 'Double shot, steamed milk', color: '#BA7E52', mod: 'Oat milk', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-cold-brew', name: 'Cold Brew', cat: 'coffee', price: 210, desc: '12-hour steep, over ice', color: '#442E25', mod: 'Sweet cream', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-masala-chai', name: 'Masala Chai', cat: 'tea', price: 120, desc: 'Ginger, cardamom, milk tea', color: '#D39E3A', mod: 'Cardamom', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-butter-croissant', name: 'Butter Croissant', cat: 'bakes', price: 140, desc: 'Baked fresh each morning', color: '#E0AB75', mod: 'Warmed', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-espresso', name: 'Espresso Single', cat: 'coffee', price: 90, desc: 'Rich crema, intense extraction', color: '#2C1810', mod: 'Single shot', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-cappuccino', name: 'Cappuccino Foam', cat: 'coffee', price: 140, desc: 'Velvety foam, cocoa dusting', color: '#A06E4A', mod: 'Whole milk', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-caramel-macchiato', name: 'Caramel Macchiato', cat: 'coffee', price: 190, desc: 'Vanilla syrup, caramel drizzle', color: '#C78440', mod: 'Extra caramel', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-blueberry-muffin', name: 'Blueberry Muffin', cat: 'bakes', price: 120, desc: 'Wild blueberries, crumble crust', color: '#795548', mod: 'Warmed', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-paneer-sandwich', name: 'Paneer Tikka Sandwich', cat: 'bakes', price: 180, desc: 'Grilled sourdough, spiced paneer', color: '#B35422', mod: 'Toasted', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-green-tea', name: 'Green Tea Pot', cat: 'tea', price: 100, desc: 'Whole leaf organic blend', color: '#5B8A5A', mod: 'Honey', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&q=80' }
];

import { connectMongoDB } from '@/lib/mongodb';

// Per-store in-memory menu caches
declare global {
  // eslint-disable-next-line no-var
  var storeMenuCaches: Record<string, any[]> | undefined;
}

if (!global.storeMenuCaches) {
  global.storeMenuCaches = {};
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const storeSlug = (searchParams.get('storeSlug') || searchParams.get('storeId') || 'brewpluse').toLowerCase().trim();

    // 1. Check in-memory cache first for max speed
    if (global.storeMenuCaches?.[storeSlug] && global.storeMenuCaches[storeSlug].length > 0) {
      return NextResponse.json({
        success: true,
        items: global.storeMenuCaches[storeSlug],
        count: global.storeMenuCaches[storeSlug].length,
      });
    }

    // 2. Check MongoDB for persistent store menu
    try {
      const conn = await connectMongoDB();
      if (conn) {
        const db = conn.connection.db;
        const menuDoc = await db.collection('store_menus').findOne({ storeSlug });
        if (menuDoc && Array.isArray(menuDoc.items) && menuDoc.items.length > 0) {
          global.storeMenuCaches[storeSlug] = menuDoc.items;
          return NextResponse.json({
            success: true,
            items: menuDoc.items,
            count: menuDoc.items.length,
          });
        }
      }
    } catch (dbErr) {
      console.warn('[Menu API GET DB error]:', dbErr);
    }

    // 3. Fallback to default catalog
    const items = DEFAULT_CATALOG.map((i) => ({ ...i, category: i.cat }));
    global.storeMenuCaches[storeSlug] = items;
    return NextResponse.json({
      success: true,
      items,
      count: items.length,
      isDefaultFallback: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, items: DEFAULT_CATALOG, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const session = getSessionFromRequest(request);
    const body = await request.json().catch(() => ({}));

    const storeSlug = (
      session?.storeSlug ||
      body.storeSlug ||
      searchParams.get('storeSlug') ||
      'brewpluse'
    ).toLowerCase().trim();

    if (!global.storeMenuCaches) {
      global.storeMenuCaches = {};
    }

    if (!global.storeMenuCaches[storeSlug]) {
      global.storeMenuCaches[storeSlug] = [...DEFAULT_CATALOG];
    }

    let updatedItems: any[] = [];

    if (Array.isArray(body.items)) {
      updatedItems = body.items.map((item: any) => ({
        id: item.id || 'bp-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
        name: String(item.name || 'Untitled Dish').trim(),
        cat: item.cat || item.category || 'coffee',
        category: item.category || item.cat || 'coffee',
        price: Number(item.price) || 100,
        desc: String(item.desc || '').trim(),
        color: item.color || '#BA7E52',
        mod: String(item.mod || '').trim(),
        image: String(item.image || '').trim(),
        isVeg: item.isVeg !== false,
        isPopular: Boolean(item.isPopular),
        available: item.available !== false,
        isAvailable: item.isAvailable !== false,
        taxPercent: typeof item.taxPercent === 'number' ? item.taxPercent : 0,
      }));
    } else if (body.item && body.item.name) {
      const newItem = {
        id: body.item.id || 'bp-' + Date.now(),
        name: String(body.item.name).slice(0, 100),
        cat: body.item.cat || body.item.category || 'coffee',
        category: body.item.category || body.item.cat || 'coffee',
        price: Number(body.item.price) || 100,
        desc: String(body.item.desc || '').slice(0, 300),
        color: body.item.color || '#BA7E52',
        mod: String(body.item.mod || 'Fresh').slice(0, 50),
        image: String(body.item.image || '').slice(0, 500),
        isVeg: body.item.isVeg !== false,
        isPopular: Boolean(body.item.isPopular),
        available: body.item.available !== false,
        isAvailable: body.item.isAvailable !== false,
        taxPercent: typeof body.item.taxPercent === 'number' ? body.item.taxPercent : 0,
      };

      const existingIdx = global.storeMenuCaches[storeSlug].findIndex((i) => i.id === newItem.id);
      if (existingIdx !== -1) {
        global.storeMenuCaches[storeSlug][existingIdx] = newItem;
      } else {
        global.storeMenuCaches[storeSlug].unshift(newItem);
      }
      updatedItems = global.storeMenuCaches[storeSlug];
    } else {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }

    // 1. Update in-memory global caches
    global.storeMenuCaches[storeSlug] = updatedItems;
    if (global.storeMenuRegistry) {
      global.storeMenuRegistry[storeSlug] = updatedItems.map((it: any) => ({
        id: it.id,
        name: it.name,
        category: it.category || it.cat,
        price: it.price,
        priceInPaise: (it.price || 0) * 100,
        desc: it.desc || '',
        image: it.image || '',
        isVeg: it.isVeg !== false,
        isPopular: it.isPopular,
        isAvailable: it.isAvailable !== false,
        taxPercent: it.taxPercent || 0,
      }));
    }

    // 2. Persist to MongoDB
    try {
      const conn = await connectMongoDB();
      if (conn) {
        const db = conn.connection.db;
        await db.collection('store_menus').updateOne(
          { storeSlug },
          {
            $set: {
              storeSlug,
              items: updatedItems,
              updatedAt: new Date(),
            },
          },
          { upsert: true }
        );
      }
    } catch (dbErr) {
      console.warn('[Menu API POST DB error]:', dbErr);
    }

    // 3. Sync to Firestore (non-blocking)
    syncMenuToFirestore(storeSlug, updatedItems).catch(() => {});

    return NextResponse.json({
      success: true,
      count: updatedItems.length,
      items: updatedItems,
      storeSlug,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
