export interface HardwareCartItem {
  id: 'nfc-card' | 'qr-code-stand' | string;
  name: string;
  title: string;
  price: number; // in INR (1500)
  image: string;
  quantity: number;
  badge?: string;
  description?: string;
}

export const HARDWARE_CATALOG: Record<string, Omit<HardwareCartItem, 'quantity'>> = {
  'nfc-card': {
    id: 'nfc-card',
    name: 'NFC Card',
    title: 'Smart NFC Table Card',
    price: 1500,
    image: '/hardware-images/NFC-img.png',
    badge: 'NFC Contactless',
    description: 'Tap, connect, explore. Share your digital menu, Google reviews, and social profiles with just a tap.',
  },
  'qr-code-stand': {
    id: 'qr-code-stand',
    name: 'QR Standee',
    title: 'Acrylic QR Code Stand',
    price: 1500,
    image: '/hardware-images/QR-img.png',
    badge: 'Table Ordering',
    description: 'Stylish, scratch-resistant acrylic QR standee pre-linked for seamless contactless table ordering.',
  },
};

const getStorageKey = (storeSlug?: string) =>
  `brewpluse_hardware_cart_${storeSlug ? storeSlug.toLowerCase().trim() : 'default'}`;

export function dispatchCartUpdate() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('brewpluse-hardware-cart-update'));
  }
}

export function getHardwareCart(storeSlug?: string): HardwareCartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(getStorageKey(storeSlug));
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((item) => ({
      ...item,
      // Ensure prices are consistently updated to ₹1500
      price: 1500,
    }));
  } catch (e) {
    console.error('[hardwareCart] Failed to load cart:', e);
    return [];
  }
}

export function saveHardwareCart(items: HardwareCartItem[], storeSlug?: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(storeSlug), JSON.stringify(items));
    dispatchCartUpdate();
  } catch (e) {
    console.error('[hardwareCart] Failed to save cart:', e);
  }
}

export function addToHardwareCart(
  item: { id: string; quantity?: number; name?: string; image?: string; price?: number },
  storeSlug?: string
): HardwareCartItem[] {
  const current = getHardwareCart(storeSlug);
  const qtyToAdd = Math.max(1, item.quantity || 1);
  const catalogItem = HARDWARE_CATALOG[item.id];

  const existingIndex = current.findIndex((i) => i.id === item.id);
  let updated: HardwareCartItem[];

  if (existingIndex > -1) {
    updated = current.map((i, idx) =>
      idx === existingIndex ? { ...i, quantity: i.quantity + qtyToAdd, price: 1500 } : i
    );
  } else {
    const newItem: HardwareCartItem = {
      id: item.id,
      name: item.name || catalogItem?.name || item.id,
      title: catalogItem?.title || item.name || item.id,
      price: 1500,
      image: item.image || catalogItem?.image || '/hardware-images/NFC-img.png',
      quantity: qtyToAdd,
      badge: catalogItem?.badge || 'Official Hardware',
      description: catalogItem?.description || '',
    };
    updated = [...current, newItem];
  }

  saveHardwareCart(updated, storeSlug);
  return updated;
}

export function updateHardwareCartQuantity(
  id: string,
  quantity: number,
  storeSlug?: string
): HardwareCartItem[] {
  const current = getHardwareCart(storeSlug);
  if (quantity <= 0) {
    return removeFromHardwareCart(id, storeSlug);
  }
  const updated = current.map((item) =>
    item.id === id ? { ...item, quantity: Math.min(100, quantity), price: 1500 } : item
  );
  saveHardwareCart(updated, storeSlug);
  return updated;
}

export function removeFromHardwareCart(id: string, storeSlug?: string): HardwareCartItem[] {
  const current = getHardwareCart(storeSlug);
  const updated = current.filter((item) => item.id !== id);
  saveHardwareCart(updated, storeSlug);
  return updated;
}

export function clearHardwareCart(storeSlug?: string): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(getStorageKey(storeSlug));
    dispatchCartUpdate();
  } catch (e) {
    console.error('[hardwareCart] Failed to clear cart:', e);
  }
}

export function getHardwareCartCount(storeSlug?: string): number {
  const items = getHardwareCart(storeSlug);
  return items.reduce((acc, item) => acc + (item.quantity || 0), 0);
}

export function getHardwareCartTotals(storeSlug?: string) {
  const items = getHardwareCart(storeSlug);
  const itemCount = items.reduce((acc, item) => acc + (item.quantity || 0), 0);
  const subtotal = items.reduce((acc, item) => acc + item.quantity * 1500, 0);
  const shipping = 0; // Free pan-India delivery
  const tax = itemCount > 0 ? 270 : 0; // Flat ₹270 GST per order regardless of quantity
  const total = subtotal + shipping + tax;

  return {
    items,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
  };
}
