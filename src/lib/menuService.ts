export interface ItemVariant {
  id: string;
  name: string;
  price: number; // in ₹
  priceInPaise: number; // in paise
}

export interface ItemAddon {
  id: string;
  name: string;
  price: number; // in ₹
  priceInPaise: number; // in paise
}

export interface MenuItemDetailed {
  id: string;
  name: string;
  category: string;
  price: number; // in ₹
  priceInPaise: number; // in paise
  desc: string;
  image?: string;
  isVeg: boolean;
  isPopular?: boolean;
  isAvailable: boolean;
  taxPercent: number; // default 0% (Optional GST)
  variants?: ItemVariant[];
  addons?: ItemAddon[];
}

export const BASE_MENU_CATALOG: MenuItemDetailed[] = [
  {
    id: 'bp-flat-white',
    name: 'Artisan Flat White',
    category: 'coffee',
    price: 180,
    priceInPaise: 18000,
    desc: 'Double ristretto with micro-foamed velvety whole milk.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80',
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    taxPercent: 0,
    variants: [
      { id: 'var-regular', name: 'Whole Milk (Regular)', price: 180, priceInPaise: 18000 },
      { id: 'var-oat', name: 'Oat Milk (+₹40)', price: 220, priceInPaise: 22000 },
      { id: 'var-almond', name: 'Almond Milk (+₹50)', price: 230, priceInPaise: 23000 },
    ],
    addons: [
      { id: 'add-extra-shot', name: 'Extra Espresso Shot', price: 40, priceInPaise: 4000 },
      { id: 'add-vanilla', name: 'Vanilla Bean Syrup', price: 30, priceInPaise: 3000 },
    ],
  },
  {
    id: 'bp-cold-brew',
    name: 'Nitro 12-Hour Cold Brew',
    category: 'coffee',
    price: 210,
    priceInPaise: 21000,
    desc: 'Steeped for 12 hours, poured cascading cold over crystal ice.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80',
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    taxPercent: 0,
    addons: [
      { id: 'add-sweet-cream', name: 'Sweet Vanilla Cream Float', price: 35, priceInPaise: 3500 },
    ],
  },
  {
    id: 'bp-cappuccino',
    name: 'Classic Velvety Cappuccino',
    category: 'coffee',
    price: 140,
    priceInPaise: 14000,
    desc: 'Equal parts rich espresso, steamed milk, and dense foam with cocoa.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80',
    isVeg: true,
    isAvailable: true,
    taxPercent: 0,
    variants: [
      { id: 'var-single', name: 'Regular Cup', price: 140, priceInPaise: 14000 },
      { id: 'var-large', name: 'Large Mug (+₹40)', price: 180, priceInPaise: 18000 },
    ],
    addons: [
      { id: 'add-cinnamon', name: 'Ceylon Cinnamon Dusting', price: 15, priceInPaise: 1500 },
    ],
  },
  {
    id: 'bp-masala-chai',
    name: 'Kadak Ginger Masala Chai',
    category: 'tea',
    price: 120,
    priceInPaise: 12000,
    desc: 'Crushed ginger, green cardamom, clove, and slow-boiled milk tea.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80',
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    taxPercent: 0,
    addons: [
      { id: 'add-lemongrass', name: 'Fresh Lemongrass Infusion', price: 20, priceInPaise: 2000 },
    ],
  },
  {
    id: 'bp-butter-croissant',
    name: 'French Butter Croissant',
    category: 'bakes',
    price: 140,
    priceInPaise: 14000,
    desc: 'Golden flaky layers baked fresh each morning with pure French butter.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80',
    isVeg: true,
    isAvailable: true,
    taxPercent: 0,
    addons: [
      { id: 'add-berry-jam', name: 'Warm Berry Compote', price: 30, priceInPaise: 3000 },
    ],
  },
  {
    id: 'bp-paneer-sandwich',
    name: 'Grilled Spiced Paneer Sandwich',
    category: 'food',
    price: 180,
    priceInPaise: 18000,
    desc: 'Artisanal sourdough toast filled with marinated paneer, mint chutney, and molten cheese.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80',
    isVeg: true,
    isPopular: true,
    isAvailable: true,
    taxPercent: 0,
    addons: [
      { id: 'add-extra-cheese', name: 'Extra Cheddar Cheese Slice', price: 30, priceInPaise: 3000 },
      { id: 'add-crisps', name: 'Side Salted Crisps', price: 25, priceInPaise: 2500 },
    ],
  },
  {
    id: 'bp-blueberry-muffin',
    name: 'Wild Blueberry Crumb Muffin',
    category: 'bakes',
    price: 120,
    priceInPaise: 12000,
    desc: 'Moist golden muffin packed with whole wild blueberries and sugar crumble.',
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400&q=80',
    isVeg: true,
    isAvailable: true,
    taxPercent: 0,
  },
];

declare global {
  // eslint-disable-next-line no-var
  var storeMenuRegistry: Record<string, MenuItemDetailed[]> | undefined;
}

if (!global.storeMenuRegistry) {
  global.storeMenuRegistry = {};
}

/**
 * Get full store menu with live items and out-of-stock statuses
 */
export async function getStoreMenu(storeSlug: string): Promise<MenuItemDetailed[]> {
  if (global.storeMenuRegistry && global.storeMenuRegistry[storeSlug]) {
    return global.storeMenuRegistry[storeSlug];
  }
  return BASE_MENU_CATALOG;
}

/**
 * Find a specific menu item for a store
 */
export async function findMenuItem(
  storeSlug: string,
  itemId: string
): Promise<MenuItemDetailed | null> {
  const menu = await getStoreMenu(storeSlug);
  return menu.find((item) => item.id === itemId) || null;
}

/**
 * Update an item availability toggle (86 out-of-stock toggle)
 */
export async function setItemAvailability(
  storeSlug: string,
  itemId: string,
  isAvailable: boolean
): Promise<boolean> {
  if (!global.storeMenuRegistry) global.storeMenuRegistry = {};
  if (!global.storeMenuRegistry[storeSlug]) {
    global.storeMenuRegistry[storeSlug] = JSON.parse(JSON.stringify(BASE_MENU_CATALOG));
  }
  const item = global.storeMenuRegistry[storeSlug].find((i) => i.id === itemId);
  if (item) {
    item.isAvailable = isAvailable;
    return true;
  }
  return false;
}
