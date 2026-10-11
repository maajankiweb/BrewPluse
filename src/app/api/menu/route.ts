import { NextResponse } from 'next/server';

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

// In-memory runtime cache for serverless instance
let serverMenuCache: any[] = [...DEFAULT_CATALOG];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      items: serverMenuCache,
      count: serverMenuCache.length
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
    const body = await request.json();
    if (Array.isArray(body.items)) {
      serverMenuCache = body.items;
      return NextResponse.json({ success: true, count: serverMenuCache.length, items: serverMenuCache });
    } else if (body.item && body.item.name) {
      const newItem = {
        id: body.item.id || 'bp-' + Date.now(),
        name: body.item.name,
        cat: body.item.cat || 'coffee',
        price: Number(body.item.price) || 100,
        desc: body.item.desc || '',
        color: body.item.color || '#BA7E52',
        mod: body.item.mod || 'Fresh',
        image: body.item.image || ''
      };
      const existingIdx = serverMenuCache.findIndex(i => i.id === newItem.id);
      if (existingIdx !== -1) {
        serverMenuCache[existingIdx] = newItem;
      } else {
        serverMenuCache.unshift(newItem);
      }
      return NextResponse.json({ success: true, item: newItem, items: serverMenuCache });
    }

    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
