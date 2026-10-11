'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  saveOrderToIndexedDB,
  getOrdersFromIndexedDB,
  saveCartToIndexedDB,
  getCartFromIndexedDB,
  queueOfflineOrder,
} from '@/lib/indexedDb';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  isVeg: boolean;
  inStock: boolean;
  description: string;
}

export interface CartItem {
  id?: string;
  item: MenuItem;
  quantity: number;
  modifiers?: string[];
  modifierPrice?: number;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  table: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMode: 'UPI' | 'Cash' | 'Card';
  payTiming: 'first' | 'last';
  customerName?: string;
  customerPhone?: string;
}

export interface TableInfo {
  id: string;
  name: string;
  capacity: number;
  status: 'vacant' | 'occupied' | 'reserved';
  activeOrderNumber?: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  lastRestocked: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Store Manager' | 'Head Barista' | 'Cashier' | 'Steward';
  pin: string;
  phone: string;
  status: 'Active' | 'Off Shift';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  visits: number;
  totalSpent: number;
  loyaltyPoints: number;
  lastVisit: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'flat';
  value: number;
  minOrder: number;
  status: 'Active' | 'Expired';
}

interface DemoContextType {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Search / Command Palette
  isCommandOpen: boolean;
  setIsCommandOpen: (open: boolean) => void;

  // Menu
  menuItems: MenuItem[];
  toggleItemStock: (id: string) => void;
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;

  // Offline & Connectivity Status
  isOfflineMode: boolean;

  // POS Cart
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  addToCartWithModifiers: (
    item: MenuItem,
    modifiers: string[],
    extraPrice: number,
    notes?: string
  ) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQty: (itemId: string, delta: number) => void;
  clearCart: () => void;
  selectedTable: string;
  setSelectedTable: (table: string) => void;
  payTiming: 'first' | 'last';
  setPayTiming: (timing: 'first' | 'last') => void;
  customerPhone: string;
  setCustomerPhone: (phone: string) => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;

  // Orders
  orders: Order[];
  createOrder: (paymentMode?: 'UPI' | 'Cash' | 'Card') => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Tables
  tables: TableInfo[];
  updateTableStatus: (tableId: string, status: TableInfo['status']) => void;

  // Inventory
  inventory: InventoryItem[];
  updateInventoryStock: (id: string, newStock: number) => void;

  // Staff
  staff: StaffMember[];
  addStaff: (member: Omit<StaffMember, 'id'>) => void;

  // Customers
  customers: Customer[];
  addCustomer: (c: Omit<Customer, 'id' | 'visits' | 'totalSpent' | 'loyaltyPoints' | 'lastVisit'>) => void;

  // Coupons
  coupons: Coupon[];
  addCoupon: (coupon: Omit<Coupon, 'id'>) => void;

  // Notifications
  notification: string | null;
  notify: (msg: string) => void;
}

const DemoContext = createContext<DemoContextType | null>(null);

const INITIAL_MENU: MenuItem[] = [
  { id: 'm1', name: 'Signature Espresso', category: 'Coffee', price: 120, isVeg: true, inStock: true, description: 'Double shot 100% Arabica extraction with rich crema.' },
  { id: 'm2', name: 'Velvet Cappuccino', category: 'Coffee', price: 160, isVeg: true, inStock: true, description: 'Equal parts espresso, steamed milk, and dense microfoam.' },
  { id: 'm3', name: 'Artisan Cafe Latte', category: 'Coffee', price: 180, isVeg: true, inStock: true, description: 'Smooth espresso with velvety steamed whole milk.' },
  { id: 'm4', name: 'Spanish Sweet Latte', category: 'Coffee', price: 210, isVeg: true, inStock: true, description: 'Espresso infused with sweetened condensed milk and cinnamon.' },
  { id: 'm5', name: 'Cold Brew Reserve', category: 'Cold Brew', price: 220, isVeg: true, inStock: true, description: '18-hour cold steeped single-origin beans over crystal ice.' },
  { id: 'm6', name: 'Caramel Hazelnut Frappe', category: 'Cold Brew', price: 240, isVeg: true, inStock: true, description: 'Blended espresso frappe topped with caramel drizzle and roasted hazelnuts.' },
  { id: 'm7', name: 'Authentic Masala Chai Pot', category: 'Beverages', price: 110, isVeg: true, inStock: true, description: 'Traditional Assam CTC brewed with ginger, cardamom, and clove.' },
  { id: 'm8', name: 'Kyoto Matcha Green Latte', category: 'Beverages', price: 230, isVeg: true, inStock: true, description: 'Ceremonial grade Uji matcha whisked with warm oat milk.' },
  { id: 'm9', name: 'French Butter Croissant', category: 'Bakery', price: 140, isVeg: true, inStock: true, description: 'Flaky, 27-layer laminated all-butter artisan croissant.' },
  { id: 'm10', name: 'Dark Chocolate Pain au Chocolat', category: 'Bakery', price: 170, isVeg: true, inStock: true, description: 'Crisp pastry roll stuffed with 64% Belgian dark chocolate batons.' },
  { id: 'm11', name: 'New York Blueberry Cheesecake', category: 'Desserts', price: 260, isVeg: true, inStock: true, description: 'Dense baked cream cheese cake with wild blueberry compote.' },
  { id: 'm12', name: 'Truffled Herb Potato Fries', category: 'Snacks', price: 190, isVeg: true, inStock: true, description: 'Crispy skin-on potato wedges tossed in aromatic truffle oil & herbs.' },
  { id: 'm13', name: 'Pesto Paneer Grilled Panini', category: 'Snacks', price: 220, isVeg: true, inStock: true, description: 'Marinated cottage cheese, basil pesto, and fresh mozzarella on sourdough.' },
  { id: 'm14', name: 'Smoked Chicken & Cheddar Sub', category: 'Snacks', price: 260, isVeg: false, inStock: true, description: 'Hickory smoked chicken breast, aged English cheddar, honey mustard.' },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: 'BP-1042',
    table: 'Table 3',
    items: [
      { item: INITIAL_MENU[1], quantity: 2 },
      { item: INITIAL_MENU[8], quantity: 1 },
    ],
    subtotal: 460,
    tax: 23,
    total: 483,
    status: 'preparing',
    createdAt: '4 mins ago',
    paymentMode: 'UPI',
    payTiming: 'last',
    customerName: 'Siddharth M.',
    customerPhone: '+91 98765 43210',
  },
  {
    id: 'ord-1041',
    orderNumber: 'BP-1041',
    table: 'Takeaway',
    items: [
      { item: INITIAL_MENU[4], quantity: 1 },
      { item: INITIAL_MENU[11], quantity: 1 },
    ],
    subtotal: 410,
    tax: 20.5,
    total: 430.5,
    status: 'ready',
    createdAt: '9 mins ago',
    paymentMode: 'Card',
    payTiming: 'first',
    customerName: 'Aanya K.',
  },
  {
    id: 'ord-1040',
    orderNumber: 'BP-1040',
    table: 'Table 7',
    items: [
      { item: INITIAL_MENU[12], quantity: 2 },
      { item: INITIAL_MENU[3], quantity: 2 },
    ],
    subtotal: 860,
    tax: 43,
    total: 903,
    status: 'completed',
    createdAt: '25 mins ago',
    paymentMode: 'UPI',
    payTiming: 'last',
    customerName: 'Vikrant R.',
  },
  {
    id: 'ord-1039',
    orderNumber: 'BP-1039',
    table: 'Table 1',
    items: [
      { item: INITIAL_MENU[10], quantity: 1 },
      { item: INITIAL_MENU[0], quantity: 1 },
    ],
    subtotal: 380,
    tax: 19,
    total: 399,
    status: 'completed',
    createdAt: '40 mins ago',
    paymentMode: 'Cash',
    payTiming: 'first',
  },
  {
    id: 'ord-1038',
    orderNumber: 'BP-1038',
    table: 'Table 5',
    items: [
      { item: INITIAL_MENU[13], quantity: 1 },
      { item: INITIAL_MENU[6], quantity: 1 },
    ],
    subtotal: 370,
    tax: 18.5,
    total: 388.5,
    status: 'preparing',
    createdAt: '12 mins ago',
    paymentMode: 'UPI',
    payTiming: 'last',
    customerName: 'Meera S.',
  },
];

const INITIAL_TABLES: TableInfo[] = [
  { id: 't-1', name: 'Table 1', capacity: 2, status: 'vacant' },
  { id: 't-2', name: 'Table 2', capacity: 4, status: 'vacant' },
  { id: 't-3', name: 'Table 3', capacity: 4, status: 'occupied', activeOrderNumber: 'BP-1042' },
  { id: 't-4', name: 'Table 4', capacity: 2, status: 'vacant' },
  { id: 't-5', name: 'Table 5', capacity: 6, status: 'occupied', activeOrderNumber: 'BP-1038' },
  { id: 't-6', name: 'Table 6', capacity: 4, status: 'reserved' },
  { id: 't-7', name: 'Table 7', capacity: 2, status: 'vacant' },
  { id: 't-8', name: 'Table 8', capacity: 4, status: 'vacant' },
  { id: 't-9', name: 'Outdoor 1', capacity: 4, status: 'vacant' },
  { id: 't-10', name: 'Outdoor 2', capacity: 2, status: 'vacant' },
  { id: 't-11', name: 'Balcony 1', capacity: 4, status: 'vacant' },
  { id: 't-12', name: 'Balcony 2', capacity: 6, status: 'vacant' },
];

const INITIAL_INVENTORY: InventoryItem[] = [
  { id: 'inv-1', name: '100% Arabica Medium Roast Beans', category: 'Coffee', currentStock: 18.5, unit: 'kg', minThreshold: 5.0, lastRestocked: 'Yesterday' },
  { id: 'inv-2', name: 'Organic Whole Farm Milk', category: 'Dairy', currentStock: 42.0, unit: 'Liters', minThreshold: 15.0, lastRestocked: 'Today 06:00 AM' },
  { id: 'inv-3', name: 'Barista Edition Oat Milk', category: 'Dairy Alternatives', currentStock: 6.0, unit: 'Liters', minThreshold: 10.0, lastRestocked: '3 days ago' },
  { id: 'inv-4', name: 'Artisan Salted Caramel Sauce', category: 'Syrups', currentStock: 4.5, unit: 'Liters', minThreshold: 2.0, lastRestocked: '4 days ago' },
  { id: 'inv-5', name: 'Eco Kraft Takeaway Hot Cups (350ml)', category: 'Packaging', currentStock: 340, unit: 'pcs', minThreshold: 100, lastRestocked: '1 week ago' },
  { id: 'inv-6', name: 'Birchwood Biodegradable Stirrers', category: 'Cutlery', currentStock: 850, unit: 'pcs', minThreshold: 200, lastRestocked: '2 weeks ago' },
  { id: 'inv-7', name: 'Callebaut Belgian Cocoa Powder', category: 'Ingredients', currentStock: 1.5, unit: 'kg', minThreshold: 2.0, lastRestocked: '5 days ago' },
  { id: 'inv-8', name: 'Cold Cup Biodegradable Lids', category: 'Packaging', currentStock: 280, unit: 'pcs', minThreshold: 80, lastRestocked: '1 week ago' },
];

const INITIAL_STAFF: StaffMember[] = [
  { id: 'st-1', name: 'Aarav Sharma', role: 'Store Manager', pin: '1101', phone: '+91 98765 01234', status: 'Active' },
  { id: 'st-2', name: 'Priya Patel', role: 'Head Barista', pin: '2202', phone: '+91 98765 05678', status: 'Active' },
  { id: 'st-3', name: 'Rohan Verma', role: 'Cashier', pin: '3303', phone: '+91 98765 09012', status: 'Active' },
  { id: 'st-4', name: 'Ananya Singh', role: 'Steward', pin: '4404', phone: '+91 98765 03456', status: 'Off Shift' },
];

const INITIAL_CUSTOMERS: Customer[] = [
  { id: 'c-1', name: 'Siddharth Mehta', phone: '+91 98765 43210', visits: 14, totalSpent: 5420, loyaltyPoints: 240, lastVisit: 'Today' },
  { id: 'c-2', name: 'Neha Kapoor', phone: '+91 98111 22334', visits: 9, totalSpent: 3180, loyaltyPoints: 150, lastVisit: 'Yesterday' },
  { id: 'c-3', name: 'Vikrant Reddy', phone: '+91 97234 56789', visits: 22, totalSpent: 8950, loyaltyPoints: 420, lastVisit: 'Today' },
  { id: 'c-4', name: 'Aanya K.', phone: '+91 99887 76655', visits: 5, totalSpent: 1650, loyaltyPoints: 80, lastVisit: '2 days ago' },
];

const INITIAL_COUPONS: Coupon[] = [
  { id: 'cp-1', code: 'WELCOME50', discountType: 'flat', value: 50, minOrder: 200, status: 'Active' },
  { id: 'cp-2', code: 'BREW15', discountType: 'percentage', value: 15, minOrder: 300, status: 'Active' },
  { id: 'cp-3', code: 'FLAT100', discountType: 'flat', value: 100, minOrder: 600, status: 'Active' },
  { id: 'cp-4', code: 'EARLYBIRD', discountType: 'percentage', value: 10, minOrder: 150, status: 'Active' },
];

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('Table 1');
  const [payTiming, setPayTiming] = useState<'first' | 'last'>('last');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [tables, setTables] = useState<TableInfo[]>(INITIAL_TABLES);
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [notification, setNotification] = useState<string | null>(null);

  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);

  // Monitor network connectivity for true offline-first cashier workflow
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsOfflineMode(!navigator.onLine);

    const handleOnline = () => {
      setIsOfflineMode(false);
      notify('🟢 Back Online: Cloud synchronization restored');
    };
    const handleOffline = () => {
      setIsOfflineMode(true);
      notify('🟡 Offline Mode Active: Orders persisting to local IndexedDB');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Hydrate POS cart, active orders, and table from IndexedDB & localStorage on load
  useEffect(() => {
    async function hydrateStorage() {
      try {
        // 1. Try IndexedDB first for modern browsers
        const idbCart = await getCartFromIndexedDB();
        if (idbCart && idbCart.length > 0) {
          setCart(idbCart);
        } else {
          const savedCart = localStorage.getItem('brewpluse_pos_cart');
          if (savedCart) setCart(JSON.parse(savedCart));
        }

        const idbOrders = await getOrdersFromIndexedDB();
        if (idbOrders && idbOrders.length > 0) {
          // Merge with initial orders avoiding duplicates
          setOrders((prev) => {
            const ids = new Set(idbOrders.map((o) => o.id));
            const filteredPrev = prev.filter((o) => !ids.has(o.id));
            return [...idbOrders as any, ...filteredPrev];
          });
        } else {
          const savedOrders = localStorage.getItem('brewpluse_pos_orders');
          if (savedOrders) setOrders(JSON.parse(savedOrders));
        }

        const savedTable = localStorage.getItem('brewpluse_pos_table');
        if (savedTable) setSelectedTable(savedTable);
      } catch (err) {
        console.warn('[Storage] Hydration fallback:', err);
      }
    }
    hydrateStorage();
  }, []);

  // Auto-sync POS cart to IndexedDB and localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brewpluse_pos_cart', JSON.stringify(cart));
      saveCartToIndexedDB(cart);
    } catch {}
  }, [cart]);

  // Auto-sync active orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brewpluse_pos_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  // Auto-sync selected table to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('brewpluse_pos_table', selectedTable);
    } catch {}
  }, [selectedTable]);

  useEffect(() => {
    // Keyboard shortcut for Command Palette ⌘K or Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsCommandOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const toggleItemStock = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inStock: !item.inStock } : item))
    );
    notify('Item inventory availability updated');
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { ...item, id: `m-${Date.now()}` };
    setMenuItems((prev) => [newItem, ...prev]);
    notify(`Added "${item.name}" to menu`);
  };

  const addToCart = (item: MenuItem) => {
    if (!item.inStock) {
      notify(`"${item.name}" is currently marked out of stock`);
      return;
    }
    setCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    notify(`Added 1x ${item.name} to order`);
  };

  const addToCartWithModifiers = (
    item: MenuItem,
    modifiers: string[] = [],
    extraPrice: number = 0,
    notes?: string
  ) => {
    setCart((prev) => [
      ...prev,
      {
        id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        item,
        quantity: 1,
        modifiers,
        modifierPrice: extraPrice,
        notes,
      },
    ]);
    notify(`Added ${item.name} with custom modifiers`);
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => (ci.id ? ci.id !== itemId : ci.item.id !== itemId)));
  };

  const updateCartQty = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          const match = ci.id ? ci.id === itemId : ci.item.id === itemId;
          if (match) {
            const nextQty = ci.quantity + delta;
            return nextQty > 0 ? { ...ci, quantity: nextQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string): boolean => {
    const found = coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.status === 'Active'
    );
    if (!found) {
      notify('Invalid or expired coupon code');
      return false;
    }
    const rawSubtotal = cart.reduce(
      (sum, ci) => sum + (ci.item.price + (ci.modifierPrice || 0)) * ci.quantity,
      0
    );
    if (rawSubtotal < found.minOrder) {
      notify(`Minimum order amount of ₹${found.minOrder} required for ${found.code}`);
      return false;
    }
    setAppliedCoupon(found);
    notify(`Coupon ${found.code} applied successfully!`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    notify('Coupon removed');
  };

  const createOrder = (paymentMode: 'UPI' | 'Cash' | 'Card' = 'UPI'): Order => {
    const rawSubtotal = cart.reduce(
      (sum, ci) => sum + (ci.item.price + (ci.modifierPrice || 0)) * ci.quantity,
      0
    );
    let discount = 0;
    if (appliedCoupon) {
      if (appliedCoupon.discountType === 'percentage') {
        discount = (rawSubtotal * appliedCoupon.value) / 100;
      } else {
        discount = appliedCoupon.value;
      }
    }
    const subtotal = Math.max(0, rawSubtotal - discount);
    const tax = Math.round(subtotal * 0.05 * 100) / 100; // 5% GST
    const total = subtotal + tax;

    const newOrderNumber = `BP-${1043 + orders.length}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: newOrderNumber,
      table: selectedTable || 'Takeaway',
      items: [...cart],
      subtotal,
      tax,
      total,
      status: 'preparing',
      createdAt: 'Just now',
      paymentMode,
      payTiming,
      customerName: customerName || undefined,
      customerPhone: customerPhone || undefined,
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Save to IndexedDB (keeps offline resilience permanent)
    saveOrderToIndexedDB(newOrder).catch((err) =>
      console.warn('IndexedDB save order error:', err)
    );
    if (isOfflineMode) {
      queueOfflineOrder(newOrder).catch((err) =>
        console.warn('Queue offline order error:', err)
      );
    }

    // Update table occupancy if seated
    if (selectedTable && selectedTable !== 'Takeaway') {
      setTables((prev) =>
        prev.map((t) =>
          t.name === selectedTable
            ? { ...t, status: 'occupied', activeOrderNumber: newOrderNumber }
            : t
        )
      );
    }

    clearCart();
    setCustomerName('');
    setCustomerPhone('');
    notify(`Order #${newOrderNumber} posted successfully!`);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    notify(`Order status updated to ${status}`);
  };

  const updateTableStatus = (tableId: string, status: TableInfo['status']) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId
          ? {
              ...t,
              status,
              activeOrderNumber: status === 'vacant' ? undefined : t.activeOrderNumber,
            }
          : t
      )
    );
    notify('Table layout updated');
  };

  const updateInventoryStock = (id: string, newStock: number) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, currentStock: newStock } : item))
    );
    notify('Inventory stock updated');
  };

  const addStaff = (member: Omit<StaffMember, 'id'>) => {
    const newMember: StaffMember = { ...member, id: `st-${Date.now()}` };
    setStaff((prev) => [...prev, newMember]);
    notify(`Added team member "${member.name}"`);
  };

  const addCustomer = (c: Omit<Customer, 'id' | 'visits' | 'totalSpent' | 'loyaltyPoints' | 'lastVisit'>) => {
    const newCustomer: Customer = {
      ...c,
      id: `c-${Date.now()}`,
      visits: 1,
      totalSpent: 0,
      loyaltyPoints: 10,
      lastVisit: 'Just now',
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    notify(`Customer ${c.name} registered`);
  };

  const addCoupon = (coupon: Omit<Coupon, 'id'>) => {
    const newCoupon: Coupon = { ...coupon, id: `cp-${Date.now()}` };
    setCoupons((prev) => [...prev, newCoupon]);
    notify(`Coupon ${coupon.code} created`);
  };

  return (
    <DemoContext.Provider
      value={{
        isDark,
        toggleTheme,
        isCommandOpen,
        setIsCommandOpen,
        menuItems,
        toggleItemStock,
        addMenuItem,
        isOfflineMode,
        cart,
        addToCart,
        addToCartWithModifiers,
        removeFromCart,
        updateCartQty,
        clearCart,
        selectedTable,
        setSelectedTable,
        payTiming,
        setPayTiming,
        customerPhone,
        setCustomerPhone,
        customerName,
        setCustomerName,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        createOrder,
        updateOrderStatus,
        tables,
        updateTableStatus,
        inventory,
        updateInventoryStock,
        staff,
        addStaff,
        customers,
        addCustomer,
        coupons,
        addCoupon,
        notification,
        notify,
      }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return ctx;
}
