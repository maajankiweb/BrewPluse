'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CreditCard,
  Clock,
  ArrowRight,
  Printer,
  QrCode,
  Check,
  Utensils,
  RefreshCw,
  Share2,
  Receipt,
  User,
  Phone,
  CheckCircle,
  FileText,
  X,
  Percent,
  Banknote,
  DollarSign,
  Coffee,
  Calendar,
} from 'lucide-react';
import { thermalPrinter } from '@/lib/thermalPrinter';

interface MenuItem {
  id: string;
  name: string;
  cat?: string;
  category?: string;
  price: number;
  desc?: string;
  color?: string;
  mod?: string;
  image?: string;
  isVeg?: boolean;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  notes?: string;
}

const DEFAULT_MENU_CATALOG: MenuItem[] = [
  { id: 'bp-flat-white', name: 'Flat White', cat: 'coffee', price: 180, desc: 'Double shot, steamed silky milk', color: '#BA7E52', image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-cold-brew', name: 'Nitro Cold Brew', cat: 'coffee', price: 210, desc: '18-hour steep, velvety texture', color: '#442E25', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-masala-chai', name: 'Artisan Masala Chai', cat: 'tea', price: 120, desc: 'Fresh ginger, whole spices, saffron', color: '#D39E3A', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-butter-croissant', name: 'Butter Croissant', cat: 'bakes', price: 140, desc: 'Golden layered, freshly baked', color: '#E0AB75', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-espresso', name: 'Espresso Single', cat: 'coffee', price: 90, desc: 'Rich crema Arabica shot', color: '#2C1810', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-cappuccino', name: 'Cappuccino Foam', cat: 'coffee', price: 140, desc: 'Velvety foam, cocoa dusting', color: '#A06E4A', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-caramel-macchiato', name: 'Caramel Macchiato', cat: 'coffee', price: 190, desc: 'Vanilla syrup, rich caramel drizzle', color: '#C78440', image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-blueberry-muffin', name: 'Blueberry Muffin', cat: 'bakes', price: 120, desc: 'Wild blueberries, crumble crust', color: '#795548', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-paneer-sandwich', name: 'Paneer Tikka Sandwich', cat: 'bakes', price: 180, desc: 'Grilled sourdough, spiced cottage cheese', color: '#B35422', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=400&q=80' },
  { id: 'bp-green-tea', name: 'Organic Green Tea', cat: 'tea', price: 100, desc: 'Whole leaf Himalayan blend', color: '#5B8A5A', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=400&q=80' },
];

export default function PosPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const scoped =
          localStorage.getItem(`brewpluse::menu_items_${storeSlug}`) ||
          localStorage.getItem('brewpluse::menu_items');
        if (scoped) {
          const parsed = JSON.parse(scoped);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {}
    }
    return DEFAULT_MENU_CATALOG;
  });
  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [channel, setChannel] = useState('Dine-in (Table 1)');
  const [availableTables, setAvailableTables] = useState<string[]>(['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'VIP Lounge']);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Customer info for receipts & WhatsApp
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Tax and discounts
  const [applyGst, setApplyGst] = useState(true); // 5% GST standard
  const [discountPercent, setDiscountPercent] = useState<number>(0);

  // Payment workflow
  const [payAt, setPayAt] = useState<'pay_now' | 'pay_later'>('pay_now');
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [paymentMode, setPaymentMode] = useState<'Cash' | 'UPI' | 'Card'>('UPI');
  const [cashTendered, setCashTendered] = useState<string>('');

  const selectWorkflow = (mode: 'pay_now' | 'pay_later') => {
    setPayAt(mode);
    try {
      localStorage.setItem('brewpluse::pos_payment_workflow', mode);
      sessionStorage.setItem('brewpluse::pos_workflow_modal_shown', 'true');
    } catch (e) {}
    setIsWorkflowModalOpen(false);
  };

  // Modals & UI states
  const [isCustomItemModal, setIsCustomItemModal] = useState(false);
  const [customItemName, setCustomItemName] = useState('');
  const [customItemPrice, setCustomItemPrice] = useState('');

  const [isOrderCompleteModal, setIsOrderCompleteModal] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Day-End Summary modal
  const [isDayEndModal, setIsDayEndModal] = useState(false);
  const [dayEndStats, setDayEndStats] = useState({ totalSales: 0, ordersCount: 0, cash: 0, upi: 0, card: 0 });

  // Store profile & UPI ID
  const [storeName, setStoreName] = useState(
    storeSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  );
  const [storeUpiId, setStoreUpiId] = useState('brewpluse@okaxis');
  const [storeAddress, setStoreAddress] = useState('Ground Floor, Cafe Boulevard');
  const [storePhone, setStorePhone] = useState('+91 98765 43210');

  // Load menu, tables & settings from localStorage and API
  useEffect(() => {
    try {
      // Load store profile
      const savedProfile = localStorage.getItem('brewpluse::store_profile');
      if (savedProfile) {
        const p = JSON.parse(savedProfile);
        if (p.name) setStoreName(p.name);
        if (p.address) setStoreAddress(p.address);
        if (p.phone) setStorePhone(p.phone);
      }

      // Load UPI settings
      const savedUpi = localStorage.getItem(`brewpluse::upi_settings_${storeSlug}`);
      if (savedUpi) {
        const u = JSON.parse(savedUpi);
        if (u.upiId) setStoreUpiId(u.upiId);
      }

      // Load tables
      const savedTables = localStorage.getItem(`brewpluse::tables_${storeSlug}`);
      if (savedTables) {
        const t = JSON.parse(savedTables);
        if (Array.isArray(t) && t.length > 0) {
          setAvailableTables(t);
          setChannel(`Dine-in (${t[0]})`);
        }
      }

      // Load menu for this store
      const savedMenu =
        localStorage.getItem(`brewpluse::menu_items_${storeSlug}`) ||
        localStorage.getItem('brewpluse::menu_items');
      if (savedMenu) {
        const parsed = JSON.parse(savedMenu);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMenuItems(parsed);
        }
      }

      // Load payment workflow configuration
      const savedWorkflow = localStorage.getItem('brewpluse::pos_payment_workflow') as 'pay_now' | 'pay_later' | null;
      if (savedWorkflow) {
        setPayAt(savedWorkflow);
      }
      const hasSeenPromptInSession = sessionStorage.getItem('brewpluse::pos_workflow_modal_shown') === 'true';
      if (!hasSeenPromptInSession) {
        setIsWorkflowModalOpen(true);
      }
    } catch (e) {}

    // Fetch live menu for this specific store from database
    const syncMenu = () => {
      fetch(`/api/menu?storeSlug=${encodeURIComponent(storeSlug)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.items && data.items.length > 0) {
            // If API returned default fallback, do NOT overwrite user's saved dishes!
            const localRaw =
              localStorage.getItem(`brewpluse::menu_items_${storeSlug}`) ||
              localStorage.getItem('brewpluse::menu_items');
            if (data.isDefaultFallback && localRaw) {
              try {
                const parsed = JSON.parse(localRaw);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  setMenuItems(parsed);
                  return;
                }
              } catch (e) {}
            }
            setMenuItems(data.items);
            try {
              localStorage.setItem(`brewpluse::menu_items_${storeSlug}`, JSON.stringify(data.items));
            } catch (e) {}
          }
        })
        .catch(() => {});
    };

    syncMenu();

    const handleSync = () => {
      syncMenu();
      try {
        const saved = localStorage.getItem(`brewpluse::menu_items_${storeSlug}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) setMenuItems(parsed);
        }
      } catch (e) {}
    };

    window.addEventListener('menu_updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('menu_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, [storeSlug]);

  // Unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    menuItems.forEach((i) => {
      const c = i.cat || i.category;
      if (c) set.add(c.toLowerCase());
    });
    return ['all', ...Array.from(set)];
  }, [menuItems]);

  // Filtered menu catalog
  const filteredCatalog = useMemo(() => {
    return menuItems.filter((item) => {
      const itemCat = (item.cat || item.category || '').toLowerCase();
      const matchCat = selectedCat === 'all' || itemCat === selectedCat;
      const matchSearch =
        !search ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.desc && item.desc.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [menuItems, selectedCat, search]);

  // Cart operations
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((i) => {
          if (i.id === id) {
            const newQty = i.qty + delta;
            return newQty > 0 ? { ...i, qty: newQty } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setOrderNotes('');
    setCashTendered('');
    setDiscountPercent(0);
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemName.trim() || !customItemPrice) return;
    const priceNum = parseFloat(customItemPrice);
    if (isNaN(priceNum) || priceNum <= 0) return;

    const newItem: CartItem = {
      id: `custom-${Date.now()}`,
      name: customItemName.trim(),
      price: priceNum,
      qty: 1,
    };

    setCart((prev) => [...prev, newItem]);
    setCustomItemName('');
    setCustomItemPrice('');
    setIsCustomItemModal(false);
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((subtotal * discountPercent) / 100);
  }, [subtotal, discountPercent]);

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const gstAmount = applyGst ? Math.round(taxableAmount * 0.05 * 100) / 100 : 0;
  const totalDue = Math.round(taxableAmount + gstAmount);

  // Cash change calculation
  const cashGiven = parseFloat(cashTendered) || 0;
  const changeDue = Math.max(0, cashGiven - totalDue);

  // Dynamic UPI URL for counter payment
  const dynamicUpiUrl = useMemo(() => {
    return `upi://pay?pa=${storeUpiId}&pn=${encodeURIComponent(storeName)}&am=${totalDue}&cu=INR&tn=${encodeURIComponent('Counter Order')}`;
  }, [storeUpiId, storeName, totalDue]);

  const upiQrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(dynamicUpiUrl)}`;

  // Submit Order
  const handlePlaceOrder = async (isKitchenOnly = false) => {
    if (cart.length === 0) return;
    setIsSubmitting(true);

    const orderNumber = `BP-${Math.floor(1000 + Math.random() * 9000)}`;
    const effectivePaymentMode = payAt === 'pay_later' ? 'Pay Later (Dine-in)' : paymentMode;
    const effectivePaymentStatus = payAt === 'pay_later' ? 'pending' : 'paid';

    const orderPayload = {
      storeId: storeSlug,
      orderNumber,
      table: channel,
      orderType: channel.toLowerCase().includes('takeaway') ? 'takeaway' : 'dine_in',
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        qty: i.qty,
        price: i.price,
        notes: i.notes || '',
      })),
      subtotal,
      discount: discountAmount,
      tax: gstAmount,
      total: totalDue,
      status: 'pending',
      paymentMode: effectivePaymentMode,
      paymentStatus: effectivePaymentStatus,
      customerName: customerName || 'Walk-in Guest',
      customerPhone: customerPhone || '',
      notes: orderNotes,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      const placed = data.order || orderPayload;

      // Update local storage orders for multi-tab resilience
      try {
        const existingLocal = JSON.parse(localStorage.getItem('brewpluse::orders') || '[]');
        localStorage.setItem('brewpluse::orders', JSON.stringify([placed, ...existingLocal]));
      } catch (e) {}

      setLastPlacedOrder(placed);
      setIsOrderCompleteModal(true);

      // Print KOT or receipt automatically
      if (isKitchenOnly) {
        printKOT(placed);
      } else if (payAt === 'pay_now') {
        printReceipt(placed);
      }
    } catch (err) {
      console.error('Order creation failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Printing functions
  const printReceipt = (orderData: any) => {
    const cgst = (orderData.tax || 0) / 2;
    const sgst = (orderData.tax || 0) / 2;

    thermalPrinter.printReceipt({
      storeName,
      storeAddress,
      storePhone,
      orderNumber: orderData.orderNumber,
      tableNumber: orderData.table,
      orderType: orderData.orderType || 'Dine-in',
      timestamp: new Date(orderData.createdAt || Date.now()).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      items: orderData.items,
      subtotal: orderData.subtotal,
      cgst,
      sgst,
      total: orderData.total,
      paymentMode: orderData.paymentMode,
      footerMessage: 'Thank you for visiting! Have a wonderful day.',
      paperWidth: '80mm',
    });
  };

  const printKOT = (orderData: any) => {
    thermalPrinter.printKOT({
      orderNumber: orderData.orderNumber,
      table: orderData.table,
      timestamp: new Date(orderData.createdAt || Date.now()).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: orderData.items.map((i: any) => ({
        name: i.name,
        qty: i.qty,
        notes: i.notes,
      })),
      notes: orderData.notes,
      paperWidth: '80mm',
    });
  };

  // WhatsApp Bill Sender
  const getWhatsAppShareUrl = (order: any) => {
    const cleanPhone = (order.customerPhone || '').replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const itemsText = order.items
      .map((i: any) => `• ${i.qty}x ${i.name} - ₹${i.price * i.qty}`)
      .join('\n');

    const message = `*☕ ${storeName} - Bill Receipt*\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `*Order:* #${order.orderNumber}\n` +
      `*Table:* ${order.table}\n` +
      `*Date:* ${new Date(order.createdAt).toLocaleDateString()}\n\n` +
      `*Items:*\n${itemsText}\n\n` +
      `*Subtotal:* ₹${order.subtotal}\n` +
      (order.discount ? `*Discount:* -₹${order.discount}\n` : '') +
      `*GST (5%):* ₹${order.tax}\n` +
      `*Total Paid:* ₹${order.total} (${order.paymentMode})\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `Thank you for dining with us! ❤️`;

    return `https://api.whatsapp.com/send?phone=${phoneWithCountry}&text=${encodeURIComponent(message)}`;
  };

  // Open Day End Z-Report
  const openDayEndReport = async () => {
    try {
      const res = await fetch(`/api/orders?storeId=${storeSlug}&limit=100`);
      const data = await res.json();
      const orders = data.orders || [];

      let totalSales = 0;
      let cash = 0;
      let upi = 0;
      let card = 0;

      orders.forEach((o: any) => {
        const amt = Number(o.total) || 0;
        totalSales += amt;
        const mode = (o.paymentMode || '').toUpperCase();
        if (mode.includes('CASH')) cash += amt;
        else if (mode.includes('CARD')) card += amt;
        else upi += amt;
      });

      setDayEndStats({
        totalSales,
        ordersCount: orders.length,
        cash,
        upi,
        card,
      });
      setIsDayEndModal(true);
    } catch (e) {
      alert('Failed to load day end report');
    }
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Top Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0E2018] p-3.5 sm:p-4 rounded-2xl border border-[#E5ECE8] dark:border-[#1E382E] shadow-2xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#12201B] dark:text-white tracking-tight">
                POS Counter Billing
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981]">
                Live Register
              </span>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8]">
              Instant billing, dynamic UPI QR checkout, KOT &amp; 58mm/80mm thermal receipts.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={openDayEndReport}
              className="px-3 py-1.5 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-bold text-[#12201B] dark:text-white hover:bg-[#EAEFEA] transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#0B5C45]" />
              <span>Day-End Summary (Z-Report)</span>
            </button>

            {/* Pay Workflow Mode */}
            <div className="flex items-center bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] p-1 rounded-xl text-xs font-semibold">
              <span className="text-[#65736D] px-2 text-[11px]">Workflow:</span>
              <button
                type="button"
                onClick={() => selectWorkflow('pay_now')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  payAt === 'pay_now'
                    ? 'bg-[#062F23] text-white shadow-xs'
                    : 'text-[#65736D] hover:text-[#12201B] dark:hover:text-white'
                }`}
              >
                Pay First
              </button>
              <button
                type="button"
                onClick={() => selectWorkflow('pay_later')}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  payAt === 'pay_later'
                    ? 'bg-[#062F23] text-white shadow-xs'
                    : 'text-[#65736D] hover:text-[#12201B] dark:hover:text-white'
                }`}
              >
                Pay at end
              </button>
              <button
                type="button"
                onClick={() => setIsWorkflowModalOpen(true)}
                title="Configure workflow"
                className="px-2 py-1 text-[11px] font-bold text-[#0B5C45] dark:text-[#10B981] hover:underline cursor-pointer ml-0.5"
              >
                (Change)
              </button>
            </div>
          </div>
        </div>

        {/* 3-Column POS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Column 1: Menu catalog selection (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {/* Search and Category pills */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#8D9792] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search coffee, shakes, meals, ingredients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs sm:text-sm focus:outline-none focus:border-[#10B981] shadow-2xs"
              />
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCat === cat
                      ? 'bg-[#062F23] text-white shadow-xs'
                      : 'bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] dark:hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Items' : cat}
                </button>
              ))}
            </div>

            {/* Grid of Dishes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-[640px] overflow-y-auto pr-1">
              {/* Add Custom Unlisted Item Card */}
              <div
                onClick={() => setIsCustomItemModal(true)}
                className="border-2 border-dashed border-emerald-400/40 rounded-xl p-3 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all cursor-pointer flex flex-col justify-between min-h-[130px] group text-center"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto group-hover:scale-110 transition-transform mt-2">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#12201B] dark:text-white">+ Custom Item</p>
                  <p className="text-[10px] text-[#65736D] dark:text-[#9AB2A8]">Unlisted / manual price</p>
                </div>
              </div>

              {filteredCatalog.map((item) => {
                const inCart = cart.find((c) => c.id === item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => addToCart(item)}
                    className="relative rounded-xl border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] hover:border-[#10B981] p-2.5 transition-all cursor-pointer shadow-2xs hover:shadow-xs flex flex-col justify-between min-h-[130px] group"
                  >
                    {inCart && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-[#0B5C45] text-white text-[10px] font-black shadow-xs">
                        {inCart.qty}
                      </span>
                    )}
                    <div>
                      <p className="text-xs font-bold text-[#12201B] dark:text-white group-hover:text-[#0B5C45] transition-colors line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#65736D] dark:text-[#9AB2A8] line-clamp-2 mt-0.5 leading-relaxed">
                        {item.desc || 'Freshly prepared'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F0F4F2] dark:border-[#1B3026] mt-2">
                      <span className="text-xs font-black text-[#12201B] dark:text-white">
                        ₹{item.price}
                      </span>
                      <div className="w-6 h-6 rounded-md bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] flex items-center justify-center group-hover:bg-[#0B5C45] group-hover:text-white transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Current Order & Cart (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] p-4 space-y-3.5 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#1E382E] pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#0B5C45] dark:text-[#10B981]" />
                <h3 className="text-sm font-bold text-[#12201B] dark:text-white">Current Order</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981]">
                  {cart.reduce((s, i) => s + i.qty, 0)} items
                </span>
                {cart.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-[11px] text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Table / Channel Selector */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#65736D] dark:text-[#9AB2A8] block mb-1">
                Table / Order Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-bold text-[#12201B] dark:text-white focus:outline-none"
              >
                <option value="Takeaway / Counter">Takeaway / Counter</option>
                <option value="Delivery Parcel">Delivery Parcel</option>
                {availableTables.map((t) => (
                  <option key={t} value={`Dine-in (${t})`}>
                    Dine-in ({t})
                  </option>
                ))}
              </select>
            </div>

            {/* Customer Details for WhatsApp / Loyalty */}
            <div className="grid grid-cols-2 gap-2">
              <div>
                <input
                  type="text"
                  placeholder="Customer Name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs focus:outline-none"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="WhatsApp Mobile"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full h-8 px-2.5 rounded-lg bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="max-h-[260px] overflow-y-auto space-y-2 pr-1">
              {cart.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#E5ECE8] dark:border-[#1E382E] p-8 text-center space-y-2 bg-[#FAFBF9] dark:bg-[#11241C]">
                  <ShoppingBag className="w-6 h-6 text-[#8D9792] mx-auto opacity-60" />
                  <p className="text-xs font-bold text-[#12201B] dark:text-white">Cart is empty</p>
                  <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                    Click any menu item to start building this order.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] flex items-center justify-between gap-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#12201B] dark:text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#65736D] dark:text-[#9AB2A8]">
                        ₹{item.price} each
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] flex items-center justify-center text-xs font-bold hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-[#12201B] dark:text-white">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] flex items-center justify-center text-xs font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right min-w-[50px]">
                      <span className="text-xs font-black text-[#12201B] dark:text-white">
                        ₹{item.price * item.qty}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Calculations & Discounts */}
            <div className="border-t border-[#E5ECE8] dark:border-[#1E382E] pt-3 space-y-2 text-xs">
              <div className="flex justify-between text-[#65736D] dark:text-[#9AB2A8]">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>

              {/* Discount Selector */}
              <div className="flex items-center justify-between text-[#65736D] dark:text-[#9AB2A8]">
                <div className="flex items-center gap-1">
                  <span>Discount</span>
                  <div className="flex items-center gap-1 ml-2">
                    {[0, 5, 10, 15].map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDiscountPercent(d)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                          discountPercent === d
                            ? 'bg-[#062F23] text-white'
                            : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {d}%
                      </button>
                    ))}
                  </div>
                </div>
                <span className="font-semibold text-emerald-600">
                  {discountAmount > 0 ? `-₹${discountAmount}` : '₹0.00'}
                </span>
              </div>

              {/* GST Toggle */}
              <div className="flex items-center justify-between text-[#65736D] dark:text-[#9AB2A8]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyGst}
                    onChange={(e) => setApplyGst(e.target.checked)}
                    className="accent-[#0B5C45] rounded"
                  />
                  <span>Restaurant GST (5%)</span>
                </label>
                <span className="font-semibold">₹{gstAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-black text-base text-[#12201B] dark:text-white pt-2 border-t border-[#E5ECE8] dark:border-[#1E382E]">
                <span>Total Due</span>
                <span className="text-[#087A5B] dark:text-[#10B981]">₹{totalDue}</span>
              </div>
            </div>
          </div>

          {/* Column 3: Payment & Dispatch (3 cols) */}
          <div className="lg:col-span-3 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] p-4 space-y-4 shadow-2xs">
            <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#1E382E] pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0B5C45] dark:text-[#10B981]" />
                <h3 className="text-sm font-bold text-[#12201B] dark:text-white">Checkout</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#087A5B] dark:text-[#10B981]">
                {payAt === 'pay_later' ? 'POST-PAID' : 'PRE-PAID'}
              </span>
            </div>

            {/* Total Payable Display */}
            <div className="p-3.5 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E]">
              <span className="text-[10px] font-bold uppercase text-[#0B8F68] block">
                TOTAL PAYABLE
              </span>
              <p className="text-2xl font-black text-[#12201B] dark:text-white mt-0.5">₹{totalDue}</p>
            </div>

            {payAt === 'pay_now' ? (
              <div className="space-y-3">
                {/* Payment Mode Selector */}
                <div className="grid grid-cols-3 gap-1.5">
                  {(['UPI', 'Cash', 'Card'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPaymentMode(mode)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition-all cursor-pointer border ${
                        paymentMode === mode
                          ? 'bg-[#062F23] text-white border-[#062F23] shadow-xs'
                          : 'bg-white dark:bg-[#0E2018] border-[#E5ECE8] dark:border-[#1E382E] text-[#65736D] hover:text-[#12201B]'
                      }`}
                    >
                      {mode === 'UPI' && '📲 UPI QR'}
                      {mode === 'Cash' && '💵 Cash'}
                      {mode === 'Card' && '💳 Card'}
                    </button>
                  ))}
                </div>

                {/* Instant Dynamic UPI QR */}
                {paymentMode === 'UPI' && (
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-2">
                    <p className="text-[11px] font-bold text-[#0B5C45] dark:text-[#10B981]">
                      Scan with GPay / PhonePe / Paytm
                    </p>
                    <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-emerald-200 shadow-2xs flex items-center justify-center">
                      {totalDue > 0 ? (
                        <img
                          src={upiQrImageUrl}
                          alt="Dynamic UPI QR"
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <QrCode className="w-16 h-16 text-zinc-300" />
                      )}
                    </div>
                    <p className="text-[10px] text-[#65736D] dark:text-[#9AB2A8]">
                      VPA: <span className="font-mono font-semibold">{storeUpiId}</span>
                    </p>
                  </div>
                )}

                {/* Cash Tendered Input & Change */}
                {paymentMode === 'Cash' && (
                  <div className="p-3 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#65736D] block">
                      Cash Received from Customer
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder={`${totalDue}`}
                        value={cashTendered}
                        onChange={(e) => setCashTendered(e.target.value)}
                        className="w-full h-9 pl-7 pr-3 rounded-lg bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-bold text-[#12201B] dark:text-white focus:outline-none"
                      />
                    </div>
                    {/* Quick Cash Buttons */}
                    <div className="flex gap-1.5">
                      {[totalDue, 500, 1000].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setCashTendered(String(amt))}
                          className="px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] font-bold text-zinc-700 dark:text-zinc-300"
                        >
                          ₹{amt}
                        </button>
                      ))}
                    </div>
                    {cashGiven >= totalDue && totalDue > 0 && (
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex justify-between text-xs font-bold">
                        <span>Change to Return:</span>
                        <span>₹{changeDue}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Card payment note */}
                {paymentMode === 'Card' && (
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-blue-300 text-xs">
                    <p className="font-bold flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4" />
                      Swipe or Tap on Card POS
                    </p>
                    <p className="text-[10px] text-blue-700 dark:text-blue-200 mt-1">
                      Collect ₹{totalDue} on external card EDC machine, then tap Complete.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                  <Clock className="w-4 h-4" />
                  <span>Dine-in Open Tab (Post-paid)</span>
                </div>
                <p className="text-[11px] leading-relaxed text-[#65736D] dark:text-[#C5D0CB]">
                  Order will be queued in Kitchen KDS immediately. Payment will be collected when the guest asks for the bill.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={cart.length === 0 || isSubmitting}
                onClick={() => handlePlaceOrder(false)}
                className={`w-full py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer ${
                  cart.length === 0 || isSubmitting
                    ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                    : 'bg-[#062F23] hover:bg-[#0B5C45] text-white shadow-emerald-900/10'
                }`}
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Printer className="w-4 h-4" />
                    <span>{payAt === 'pay_later' ? 'Place Order & Send KOT' : 'Complete & Print Bill'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                disabled={cart.length === 0 || isSubmitting}
                onClick={() => handlePlaceOrder(true)}
                className="w-full py-2.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-bold text-[#12201B] dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Utensils className="w-3.5 h-3.5 text-[#0B5C45]" />
                <span>Send KOT Only (Kitchen Ticket)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Item Modal */}
      {isCustomItemModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E2018] rounded-2xl max-w-sm w-full p-5 border border-[#E5ECE8] dark:border-[#1E382E] space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#1E382E] pb-3">
              <h3 className="text-sm font-bold text-[#12201B] dark:text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#0B5C45]" />
                Add Custom / Open Item
              </h3>
              <button
                type="button"
                onClick={() => setIsCustomItemModal(false)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCustomItem} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase text-[#65736D] block mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Hazelnut Shake"
                  value={customItemName}
                  onChange={(e) => setCustomItemName(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-[#65736D] block mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  step="any"
                  required
                  placeholder="150"
                  value={customItemPrice}
                  onChange={(e) => setCustomItemPrice(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCustomItemModal(false)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-[#65736D] hover:bg-zinc-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#062F23] text-white text-xs font-bold"
                >
                  Add to Cart
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order Complete Success Modal */}
      {isOrderCompleteModal && lastPlacedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E2018] rounded-2xl max-w-md w-full p-6 border border-[#E5ECE8] dark:border-[#1E382E] space-y-4 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-lg font-black text-[#12201B] dark:text-white">
                Order #{lastPlacedOrder.orderNumber} Created!
              </h3>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                {lastPlacedOrder.table} • Total: ₹{lastPlacedOrder.total} ({lastPlacedOrder.paymentMode})
              </p>
            </div>

            <div className="bg-[#F8FAF8] dark:bg-[#11241C] p-3.5 rounded-xl border border-[#E5ECE8] dark:border-[#1E382E] text-left text-xs space-y-1.5 max-h-40 overflow-y-auto">
              {lastPlacedOrder.items.map((i: any, idx: number) => (
                <div key={idx} className="flex justify-between">
                  <span>{i.qty}x {i.name}</span>
                  <span className="font-semibold">₹{i.price * i.qty}</span>
                </div>
              ))}
            </div>

            {/* Quick Post Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => printReceipt(lastPlacedOrder)}
                className="py-2.5 px-3 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Bill</span>
              </button>

              <button
                type="button"
                onClick={() => printKOT(lastPlacedOrder)}
                className="py-2.5 px-3 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-bold text-[#12201B] dark:text-white hover:bg-zinc-50 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Utensils className="w-3.5 h-3.5 text-[#0B5C45]" />
                <span>Print KOT</span>
              </button>
            </div>

            {/* WhatsApp Receipt Share */}
            {lastPlacedOrder.customerPhone && (
              <a
                href={getWhatsAppShareUrl(lastPlacedOrder)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Send Bill via WhatsApp</span>
              </a>
            )}

            <button
              type="button"
              onClick={() => {
                setIsOrderCompleteModal(false);
                clearCart();
              }}
              className="w-full py-2 text-xs font-bold text-[#65736D] hover:text-[#12201B] cursor-pointer"
            >
              Start Next Order →
            </button>
          </div>
        </div>
      )}

      {/* Day-End Summary (Z-Report) Modal */}
      {isDayEndModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E2018] rounded-2xl max-w-md w-full p-6 border border-[#E5ECE8] dark:border-[#1E382E] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#1E382E] pb-3">
              <div>
                <h3 className="text-base font-black text-[#12201B] dark:text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#0B5C45]" />
                  End-of-Day Sales Summary (Z-Report)
                </h3>
                <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                  {storeName} • {new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDayEndModal(false)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] border border-emerald-500/20">
                <span className="text-[10px] font-bold uppercase text-[#0B5C45] dark:text-[#10B981]">
                  Total Revenue
                </span>
                <p className="text-xl font-black text-[#12201B] dark:text-white mt-0.5">
                  ₹{dayEndStats.totalSales.toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E]">
                <span className="text-[10px] font-bold uppercase text-[#65736D]">
                  Total Orders
                </span>
                <p className="text-xl font-black text-[#12201B] dark:text-white mt-0.5">
                  {dayEndStats.ordersCount}
                </p>
              </div>
            </div>

            {/* Payment Channel Breakdown */}
            <div className="p-3 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] space-y-2 text-xs">
              <p className="font-bold text-[#12201B] dark:text-white text-[11px] uppercase tracking-wider">
                Payment Collection Breakdown
              </p>
              <div className="flex justify-between text-[#65736D] dark:text-[#9AB2A8]">
                <span>📲 UPI / Online:</span>
                <span className="font-bold text-[#12201B] dark:text-white">₹{dayEndStats.upi}</span>
              </div>
              <div className="flex justify-between text-[#65736D] dark:text-[#9AB2A8]">
                <span>💵 Cash Drawer:</span>
                <span className="font-bold text-[#12201B] dark:text-white">₹{dayEndStats.cash}</span>
              </div>
              <div className="flex justify-between text-[#65736D] dark:text-[#9AB2A8]">
                <span>💳 Card EDC:</span>
                <span className="font-bold text-[#12201B] dark:text-white">₹{dayEndStats.card}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="w-full py-2.5 rounded-xl bg-[#062F23] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Daily Z-Report Roll</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Workflow Setup Modal */}
      {isWorkflowModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="relative w-full max-w-[480px] rounded-[32px] bg-white p-7 sm:p-10 shadow-2xl border border-neutral-100 text-left space-y-6">
            {/* Top Amber Card Icon Badge */}
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-[#FFF7ED] border border-[#FFEDD5] flex items-center justify-center shadow-inner">
                <svg
                  className="w-8 h-8 text-[#D97706]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="5" width="20" height="14" rx="2.5" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-[26px] font-black text-[#111827] tracking-tight leading-snug">
                How does your cafe usually take payment?
              </h2>
              <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed max-w-sm mx-auto">
                Please select your primary payment workflow. This configures the POS &amp; Orders experience.
              </p>
            </div>

            {/* Option Cards */}
            <div className="space-y-3.5 pt-1">
              {/* Option 1: Pay First */}
              <button
                type="button"
                onClick={() => selectWorkflow('pay_now')}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all cursor-pointer group bg-white shadow-2xs hover:shadow-md ${
                  payAt === 'pay_now'
                    ? 'border-[#D97706] bg-[#FFFBEB]/40 ring-1 ring-[#D97706]/30'
                    : 'border-[#E5E7EB] hover:border-[#D97706] hover:bg-[#FFFBEB]/30'
                }`}
              >
                <p className="font-extrabold text-base text-[#111827] group-hover:text-[#B45309] transition-colors">
                  Option 1: Pay First
                </p>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-medium">
                  Customer pays before the order is prepared.
                </p>
              </button>

              {/* Option 2: Pay at the end */}
              <button
                type="button"
                onClick={() => selectWorkflow('pay_later')}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all cursor-pointer group bg-white shadow-2xs hover:shadow-md ${
                  payAt === 'pay_later'
                    ? 'border-[#D97706] bg-[#FFFBEB]/40 ring-1 ring-[#D97706]/30'
                    : 'border-[#E5E7EB] hover:border-[#D97706] hover:bg-[#FFFBEB]/30'
                }`}
              >
                <p className="font-extrabold text-base text-[#111827] group-hover:text-[#B45309] transition-colors">
                  Option 2: Pay at the end
                </p>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1 font-medium">
                  Customer pays after the order is served.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
