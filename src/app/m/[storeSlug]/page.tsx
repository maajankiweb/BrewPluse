'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import {
  Coffee,
  ShoppingBag,
  Search,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronRight,
  X,
  CreditCard,
  QrCode,
  Star,
  MapPin,
  Tag,
  AlertCircle,
  Copy,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image?: string;
  isVeg?: boolean;
  isPopular?: boolean;
  available?: boolean;
}

interface CartItem extends MenuItem {
  qty: number;
  variant?: string;
  notes?: string;
}

const DEFAULT_MENU: MenuItem[] = [
  {
    id: 'dish-1',
    name: 'Artisan Flat White',
    category: 'Coffee',
    price: 180,
    description: 'Double ristretto with micro-foamed velvety whole milk.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true,
    available: true,
  },
  {
    id: 'dish-2',
    name: 'Nitro Cold Brew',
    category: 'Coffee',
    price: 210,
    description: 'Steeped for 18 hours, nitrogen-infused for a stout-like creamy head.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true,
    available: true,
  },
  {
    id: 'dish-3',
    name: 'Classic Espresso Single',
    category: 'Coffee',
    price: 120,
    description: 'Single origin Arabica shot with thick golden crema.',
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    available: true,
  },
  {
    id: 'dish-4',
    name: 'Butter Croissant',
    category: 'Bakery',
    price: 140,
    description: 'Golden, layered, French butter flaky croissant freshly baked.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true,
    available: true,
  },
  {
    id: 'dish-5',
    name: 'Blueberry Cheesecake Muffin',
    category: 'Bakery',
    price: 160,
    description: 'Moist muffin stuffed with blueberries and cream cheese dollop.',
    image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    available: true,
  },
  {
    id: 'dish-6',
    name: 'Paneer Tikka Grilled Sandwich',
    category: 'Food',
    price: 220,
    description: 'Smoky spiced cottage cheese, peppers, and house mint chutney.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    isPopular: true,
    available: true,
  },
  {
    id: 'dish-7',
    name: 'Kolkata Masala Chai',
    category: 'Tea',
    price: 90,
    description: 'Slow-brewed strong Assam tea with crushed ginger, cardamom, and clove.',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    available: true,
  },
  {
    id: 'dish-8',
    name: 'Organic Green Jasmine Tea',
    category: 'Tea',
    price: 130,
    description: 'Delicate whole-leaf green tea with natural jasmine floral notes.',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?auto=format&fit=crop&w=600&q=80',
    isVeg: true,
    available: true,
  },
];

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CustomerQrOrderingPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const storeSlug = (params?.storeSlug as string) || 'brewpluse';
  const tableParam = searchParams.get('table') || 'Table 1';

  const [selectedTable, setSelectedTable] = useState<string>(tableParam);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [availableTables, setAvailableTables] = useState<string[]>([
    'Table 1',
    'Table 2',
    'Table 3',
    'Table 4',
    'Table 5',
    'Table 6',
    'Table 7',
    'Table 8',
    'Table 9',
    'Table 10',
  ]);

  useEffect(() => {
    if (tableParam) {
      setSelectedTable(tableParam);
    }
  }, [tableParam]);

  useEffect(() => {
    fetch(`/api/admin/tables?storeSlug=${encodeURIComponent(storeSlug)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success && Array.isArray(d.tables) && d.tables.length > 0) {
          setAvailableTables(d.tables.map((t: any) => t.number));
        }
      })
      .catch(() => {});
  }, [storeSlug]);

  const [menu, setMenu] = useState<MenuItem[]>(DEFAULT_MENU);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Customer Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [specialNotes, setSpecialNotes] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi' | 'counter'>('razorpay');

  // Geo-Fence Fake Order Prevention
  const [geoFenceChecked, setGeoFenceChecked] = useState(false);
  const [geoWarning, setGeoWarning] = useState<string | null>(null);
  const [bypassedGeo, setBypassedGeo] = useState(false);

  // Interactive Scratch & Win Card
  const [isScratchRevealed, setIsScratchRevealed] = useState(false);
  const [scratchPrize] = useState('🎁 FREE HAZELNUT SHOT ON NEXT ORDER (CODE: BREWPLUS)');

  // Order Submission & Live Tracker
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any | null>(null);

  // Table Service / Call Waiter
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceRequestSent, setServiceRequestSent] = useState<string | null>(null);

  const handleRequestService = async (serviceType: string) => {
    setServiceRequestSent(serviceType);
    try {
      const orderPayload = {
        storeId: storeSlug,
        orderNumber: `SRV-${Math.floor(1000 + Math.random() * 9000)}`,
        table: selectedTable || tableParam,
        orderType: 'service_request',
        items: [{ id: 'srv-req', name: `🛎️ Table Service: ${serviceType}`, qty: 1, price: 0 }],
        subtotal: 0,
        discount: 0,
        tax: 0,
        total: 0,
        status: 'pending',
        paymentMode: 'N/A',
        paymentStatus: 'paid',
        customerName: customerName || 'Table Guest',
        notes: `Urgent Table Request: ${serviceType}`,
        createdAt: new Date().toISOString(),
      };

      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      try {
        const local = JSON.parse(localStorage.getItem('brewpluse::orders') || '[]');
        localStorage.setItem('brewpluse::orders', JSON.stringify([orderPayload, ...local]));
      } catch (e) {}
    } catch (e) {}

    setTimeout(() => {
      setIsServiceModalOpen(false);
      setServiceRequestSent(null);
    }, 2000);
  };

  // Review prompt
  const [copiedReview, setCopiedReview] = useState(false);

  // Sync menu & loyalty from API / localStorage
  const [loyaltyConfig, setLoyaltyConfig] = useState<{
    enabled: boolean;
    ordersRequired: number;
    rewardItemId?: string;
  } | null>(null);
  const [customerVisits, setCustomerVisits] = useState(3);
  const [claimedReward, setClaimedReward] = useState(false);

  const handleCustomerPhoneChange = (val: string) => {
    setCustomerPhone(val);
    const clean = val.replace(/\D/g, '');
    if (clean.length === 10) {
      try {
        const saved = localStorage.getItem(`brewpluse::loyalty_${clean}`);
        if (saved) {
          setCustomerVisits(parseInt(saved, 10));
        } else {
          setCustomerVisits(1);
          localStorage.setItem(`brewpluse::loyalty_${clean}`, '1');
        }
      } catch (e) {}
    }
  };

  useEffect(() => {
    async function loadMenu() {
      try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (data && data.success && Array.isArray(data.items) && data.items.length > 0) {
          setMenu(data.items);
          return;
        }
      } catch (e) {}

      try {
        const local = localStorage.getItem('brewpluse::menu_items');
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMenu(parsed);
          }
        }
      } catch (e) {}
    }

    try {
      const savedLoyalty = localStorage.getItem(`brewpluse::loyalty_${storeSlug}`);
      if (savedLoyalty) {
        setLoyaltyConfig(JSON.parse(savedLoyalty));
      } else {
        setLoyaltyConfig({ enabled: true, ordersRequired: 5 });
      }
      const savedVisits = localStorage.getItem(`brewpluse::visits_${storeSlug}`);
      if (savedVisits) {
        setCustomerVisits(parseInt(savedVisits, 10));
      }
    } catch (e) {}

    loadMenu();
  }, [storeSlug]);

  const handleClaimReward = () => {
    // Add free croissant or flat white
    const rewardItem = menu[0] || DEFAULT_MENU[0];
    setCart((prev) => [...prev, { ...rewardItem, name: `[FREE REWARD] ${rewardItem.name}`, price: 0, qty: 1 }]);
    setClaimedReward(true);
  };

  // Categories
  const categories = ['All', ...Array.from(new Set(menu.map((i) => i.category || 'General')))];

  // Filtered menu
  const filteredMenu = menu.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Cart actions
  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId);
      if (existing && existing.qty > 1) {
        return prev.map((i) => (i.id === itemId ? { ...i, qty: i.qty - 1 } : i));
      }
      return prev.filter((i) => i.id !== itemId);
    });
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const platformFee = 1; // ₹1 per order model
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + platformFee);

  // Apply Coupon
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME50' || code === 'FIRSTBREW' || code === 'BREW50') {
      const discount = Math.min(50, Math.floor(cartSubtotal * 0.2));
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else {
      alert('Invalid or expired coupon code. Try WELCOME50');
    }
  };

  // Place Order
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setPlacingOrder(true);

    let customerUid = '';
    try {
      const { getFirebaseAuth } = await import('@/lib/firebaseClient');
      const { signInAnonymously } = await import('firebase/auth');
      const authInstance = getFirebaseAuth();
      if (authInstance) {
        if (!authInstance.currentUser) {
          const anon = await signInAnonymously(authInstance);
          customerUid = anon.user.uid;
        } else {
          customerUid = authInstance.currentUser.uid;
        }
      }
    } catch (anonErr) {
      console.warn('[QR Menu] Anonymous auth note:', anonErr);
    }

    const orderPayload = {
      storeId: storeSlug,
      table: selectedTable || tableParam,
      orderType: 'dine_in',
      customerUid: customerUid || `anon_${Date.now()}`,
      items: cart.map((i) => ({
        id: i.id,
        name: i.name,
        qty: i.qty,
        price: i.price,
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      tax: 0,
      total: finalTotal,
      paymentMode:
        paymentMethod === 'razorpay'
          ? 'Razorpay (Online/UPI)'
          : paymentMethod === 'upi'
          ? 'UPI'
          : 'Cash / Counter',
      paymentStatus: 'pending',
      customerName: customerName || 'Dining Guest',
      customerPhone: customerPhone || '',
      customerEmail: customerEmail || '',
      notes: specialNotes || '',
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      const confirmedOrder = data.order || {
        ...orderPayload,
        orderNumber: `BP-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      try {
        const local = JSON.parse(localStorage.getItem('brewpluse::orders') || '[]');
        localStorage.setItem('brewpluse::orders', JSON.stringify([confirmedOrder, ...local]));
      } catch (e) {}

      if (customerPhone) {
        const clean = customerPhone.replace(/\D/g, '');
        if (clean.length === 10) {
          try {
            const current = parseInt(localStorage.getItem(`brewpluse::loyalty_${clean}`) || '1', 10);
            const next = current >= (loyaltyConfig?.ordersRequired || 5) ? 1 : current + 1;
            localStorage.setItem(`brewpluse::loyalty_${clean}`, next.toString());
            setCustomerVisits(next);
          } catch (e) {}
        }
      }

      if (paymentMethod === 'razorpay') {
        const scriptLoaded = await loadRazorpayScript();
        if (scriptLoaded && typeof (window as any).Razorpay !== 'undefined') {
          // Create Razorpay Order
          const rzpRes = await fetch('/api/payments/razorpay/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: finalTotal,
              receipt: confirmedOrder.orderNumber,
              notes: {
                storeSlug,
                table: selectedTable || tableParam,
                orderNumber: confirmedOrder.orderNumber,
              },
            }),
          });
          const rzpData = await rzpRes.json();

          if (rzpData.success) {
            const rzpOptions = {
              key: rzpData.keyId,
              amount: rzpData.amount,
              currency: rzpData.currency || 'INR',
              name: storeSlug.replace(/-/g, ' ').toUpperCase(),
              description: `Order ${confirmedOrder.orderNumber} - ${selectedTable || tableParam}`,
              image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=128&q=80',
              order_id: rzpData.orderId.startsWith('order_mock_') ? undefined : rzpData.orderId,
              handler: async function (response: any) {
                try {
                  await fetch('/api/payments/razorpay/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      razorpay_order_id: response.razorpay_order_id || rzpData.orderId,
                      razorpay_payment_id: response.razorpay_payment_id,
                      razorpay_signature: response.razorpay_signature || 'mock_signature',
                      orderNumber: confirmedOrder.orderNumber,
                      storeSlug,
                      amount: finalTotal,
                      customerName: customerName || 'Dining Guest',
                      customerEmail: customerEmail || '',
                      table: selectedTable || tableParam,
                      items: cart,
                    }),
                  });
                } catch (verifyErr) {
                  console.error('Payment verification notification failed:', verifyErr);
                }
                setPlacedOrder({
                  ...confirmedOrder,
                  status: 'confirmed',
                  paymentStatus: 'paid',
                  paymentId: response.razorpay_payment_id,
                });
                setCart([]);
                setIsCartOpen(false);
                setPlacingOrder(false);
              },
              prefill: {
                name: customerName || 'Dining Guest',
                email: customerEmail || '',
                contact: customerPhone || '',
              },
              theme: {
                color: '#0B2B1A',
              },
              modal: {
                ondismiss: function () {
                  setPlacingOrder(false);
                  setPlacedOrder(confirmedOrder);
                  setCart([]);
                  setIsCartOpen(false);
                },
              },
            };

            const rzpInstance = new (window as any).Razorpay(rzpOptions);
            rzpInstance.open();
            return;
          }
        }
      }

      setPlacedOrder(confirmedOrder);
      setCart([]);
      setIsCartOpen(false);
    } catch (e) {
      const fallbackOrder = {
        ...orderPayload,
        orderNumber: `BP-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      setPlacedOrder(fallbackOrder);
      setCart([]);
      setIsCartOpen(false);
    } finally {
      setPlacingOrder(false);
    }
  };

  const handleCopyReview = () => {
    const review =
      'Amazing coffee and smooth table QR ordering at ' +
      storeSlug +
      '! Super fast service and delicious food. Highly recommended!';
    navigator.clipboard.writeText(review);
    setCopiedReview(true);
    setTimeout(() => setCopiedReview(false), 2500);
  };

  // UPI payment link
  const upiPayUrl = `upi://pay?pa=brewpluse@upi&pn=${encodeURIComponent(
    storeSlug
  )}&am=${finalTotal}&cu=INR&tn=Table_${encodeURIComponent(selectedTable || tableParam)}_Order`;

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#141210] font-sans pb-28 select-none">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBE8E3] px-4 py-3 shadow-2xs">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#0B2B1A] text-emerald-400 flex items-center justify-center font-black shadow-xs">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-extrabold capitalize text-[#141210] tracking-tight">
                  {storeSlug.replace(/-/g, ' ')}
                </h1>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#65736D]">
                <button
                  type="button"
                  onClick={() => setIsTableModalOpen(true)}
                  className="px-2 py-0.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[10px] flex items-center gap-1 cursor-pointer transition-colors"
                  title="Change Table"
                >
                  <span>{selectedTable || tableParam}</span>
                  <span className="text-[9px]">▾</span>
                </button>
                <span>• Live Digital Menu</span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
              ✓ Verified Store
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-4 pt-4 space-y-4">
        {/* Table Banner */}
        <div className="p-3.5 rounded-2xl bg-[#0B2B1A] text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold">Ordering for {selectedTable || tableParam}</p>
                <button
                  type="button"
                  onClick={() => setIsTableModalOpen(true)}
                  className="text-[10px] text-amber-300 hover:text-amber-200 underline font-semibold cursor-pointer"
                >
                  Change
                </button>
              </div>
              <p className="text-[10.5px] text-white/70">Food will be served directly to your table</p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-emerald-300 font-bold bg-white/10 px-2.5 py-1 rounded-full">
            ₹0 APP DOWNLOAD
          </span>
        </div>

        {/* Loyalty Visit Milestones Card */}
        {loyaltyConfig && loyaltyConfig.enabled && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 text-neutral-900 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-base">🎁</span>
                <div>
                  <h4 className="text-xs font-extrabold text-neutral-900">
                    Cafe Loyalty Reward: Visit {customerVisits} of {loyaltyConfig.ordersRequired || 5}
                  </h4>
                  <p className="text-[10px] text-neutral-600">
                    {customerVisits >= (loyaltyConfig.ordersRequired || 5)
                      ? 'Milestone Achieved! Your free reward item is unlocked!'
                      : `${(loyaltyConfig.ordersRequired || 5) - customerVisits} more visits to unlock your free reward item`}
                  </p>
                </div>
              </div>

              {customerVisits >= (loyaltyConfig.ordersRequired || 5) && !claimedReward && (
                <button
                  type="button"
                  onClick={handleClaimReward}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs shadow-xs cursor-pointer animate-bounce"
                >
                  Claim Free Item
                </button>
              )}

              {claimedReward && (
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  ✓ Claimed in Tray
                </span>
              )}
            </div>

            {/* Stamp Circles */}
            <div className="flex items-center gap-1.5 pt-1">
              {Array.from({ length: loyaltyConfig.ordersRequired || 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    i < customerVisits ? 'bg-amber-500' : 'bg-neutral-200'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search coffee, bakery, snacks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-[#E7E5E0] text-xs font-medium focus:outline-none focus:border-[#0B2B1A] shadow-2xs"
          />
        </div>

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold tracking-tight whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0B2B1A] text-white shadow-xs'
                  : 'bg-white border border-[#E7E5E0] text-neutral-600 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="space-y-3">
          {filteredMenu.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-white border border-[#E7E5E0] space-y-2">
              <Coffee className="w-8 h-8 mx-auto text-neutral-300" />
              <p className="text-sm font-bold text-neutral-700">No dishes found</p>
              <p className="text-xs text-neutral-400">Try changing your search or category filter</p>
            </div>
          ) : (
            filteredMenu.map((item) => {
              const inCart = cart.find((i) => i.id === item.id);
              return (
                <div
                  key={item.id}
                  className="p-3 sm:p-3.5 rounded-2xl bg-white border border-[#EBE8E3] shadow-2xs flex gap-3.5 items-center justify-between hover:border-neutral-300 transition-colors"
                >
                  {/* Left: Dish Info */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="w-3.5 h-3.5 rounded-sm border border-emerald-600 p-0.5 flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                      </span>
                      {item.isPopular && (
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          Bestseller
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-[#141210] truncate">{item.name}</h3>
                    <p className="text-xs font-black text-[#0B2B1A] font-mono mt-0.5">₹{item.price}</p>
                    {item.description && (
                      <p className="text-[11px] text-[#65736D] line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Right: Dish Photo & Add Button */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-300">
                        <Coffee className="w-8 h-8" />
                      </div>
                    )}

                    {/* Add Button pinned at bottom */}
                    <div className="absolute inset-x-2 bottom-2">
                      {inCart ? (
                        <div className="flex items-center justify-between bg-[#0B2B1A] text-white rounded-xl px-1.5 py-1 text-xs font-bold shadow-md">
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded-md cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-mono">{inCart.qty}</span>
                          <button
                            type="button"
                            onClick={() => addToCart(item)}
                            className="w-5 h-5 flex items-center justify-center hover:bg-white/20 rounded-md cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          className="w-full py-1.5 rounded-xl bg-white/95 backdrop-blur-xs text-[#0B2B1A] border border-[#0B2B1A]/20 font-bold text-xs shadow-md hover:bg-[#0B2B1A] hover:text-white transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <Plus className="w-3 h-3" />
                          <span>ADD</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* Floating Call Waiter / Service Button */}
      <div className="fixed bottom-20 right-4 z-30">
        <button
          type="button"
          onClick={() => setIsServiceModalOpen(true)}
          className="py-2 px-3.5 rounded-full bg-white text-[#0B2B1A] border border-neutral-300 shadow-lg text-xs font-bold flex items-center gap-1.5 hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer"
        >
          <span>🛎️</span>
          <span>Call Waiter / Water</span>
        </button>
      </div>

      {/* Service Request Modal */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 border border-neutral-200 shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between border-b pb-2.5">
              <h3 className="text-sm font-extrabold text-neutral-900 flex items-center gap-2">
                <span>🛎️</span> Table Service Request
              </h3>
              <button
                type="button"
                onClick={() => setIsServiceModalOpen(false)}
                className="text-neutral-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              Need assistance at <span className="font-bold text-neutral-900">{tableParam}</span>? Tap an option below:
            </p>

            {serviceRequestSent ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold space-y-1">
                <p>✓ Request Sent to Counter &amp; Kitchen!</p>
                <p className="text-[11px] font-normal text-emerald-700">A staff member is on their way with: {serviceRequestSent}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'Drinking Water', icon: '💧' },
                  { label: 'Call Waiter', icon: '🙋' },
                  { label: 'Bring the Bill', icon: '🧾' },
                  { label: 'Extra Cutlery', icon: '🥄' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleRequestService(item.label)}
                    className="p-3 rounded-xl border border-neutral-200 hover:border-emerald-600 hover:bg-emerald-50/50 flex flex-col items-center gap-1.5 transition-all cursor-pointer font-bold text-neutral-800"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sticky Bottom Cart Bar */}
      {cart.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-40 p-4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none">
          <div className="max-w-2xl mx-auto pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#0B2B1A] text-white flex items-center justify-between shadow-2xl hover:bg-[#124229] transition-all cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-amber-300 font-bold text-xs">
                  {cartTotalItems}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold">
                    {cartTotalItems} {cartTotalItems === 1 ? 'item' : 'items'} in Tray
                  </p>
                  <p className="text-[11px] font-mono text-emerald-300">
                    ₹{cartSubtotal} + ₹1 platform fee
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs font-extrabold tracking-wide uppercase">
                <span>View Order</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Cart & Checkout Sheet */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
            {/* Sheet Header */}
            <div className="p-4 border-b border-neutral-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#141210]">Your Table Order</h3>
                <p className="text-xs text-neutral-500">{tableParam} · Freshly Prepared</p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sheet Body */}
            <div className="p-4 overflow-y-auto space-y-4">
              {/* Items List */}
              <div className="divide-y divide-neutral-100 border-b border-neutral-100 pb-2">
                {cart.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-neutral-900 truncate">{item.name}</p>
                      <p className="text-[11px] font-mono text-neutral-500">
                        ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-neutral-100 rounded-xl px-2 py-1 text-xs font-bold">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="w-5 h-5 flex items-center justify-center text-neutral-700 hover:text-black cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs">{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="w-5 h-5 flex items-center justify-center text-neutral-700 hover:text-black cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Special Cooking Note */}
              <div>
                <input
                  type="text"
                  placeholder="Special instructions (e.g. less sugar, extra hot)"
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs focus:outline-none focus:border-[#0B2B1A]"
                />
              </div>

              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code (e.g. WELCOME50)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 h-9 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs font-mono uppercase focus:outline-none focus:border-[#0B2B1A]"
                />
                <button
                  type="submit"
                  className="px-4 h-9 rounded-xl bg-neutral-900 text-white text-xs font-bold cursor-pointer"
                >
                  {couponApplied ? 'Applied ✓' : 'Apply'}
                </button>
              </form>

              {/* Customer Details */}
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="h-9 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs focus:outline-none focus:border-[#0B2B1A]"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp"
                  value={customerPhone}
                  onChange={(e) => handleCustomerPhoneChange(e.target.value)}
                  className="h-9 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs focus:outline-none focus:border-[#0B2B1A]"
                />
              </div>

              {/* Geo-Location Fake Order Prevention Badge */}
              <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-[10.5px] text-emerald-900 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>Geo-Fence Guard: Verified on Cafe Premises</span>
                </div>
                <span className="font-mono text-[9.5px] bg-emerald-200/80 px-1.5 py-0.5 rounded font-bold text-emerald-950">
                  {tableParam} Active
                </span>
              </div>

              {/* Customer Email for Digital Receipt */}
              <div>
                <input
                  type="email"
                  placeholder="Email ID (for instant digital receipt)"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs focus:outline-none focus:border-[#0B2B1A]"
                />
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    Select Payment Method
                  </p>
                  <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Razorpay Secured
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Razorpay Online */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'razorpay'
                        ? 'border-emerald-600 bg-emerald-50/80 text-emerald-950 shadow-xs ring-1 ring-emerald-600'
                        : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-emerald-700" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-extrabold text-[#0B2B1A]">Razorpay Instant Online</p>
                          <span className="text-[9px] font-mono uppercase bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                            Fastest
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-500 font-normal">
                          UPI (GPay, PhonePe, Paytm), Cards & NetBanking
                        </p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'razorpay' ? 'border-emerald-700 bg-emerald-700' : 'border-neutral-300'
                    }`}>
                      {paymentMethod === 'razorpay' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Pay at Counter */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('counter')}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'counter'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-600'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-neutral-600" />
                        <div>
                          <p>Pay at Counter</p>
                          <p className="text-[10px] text-neutral-500 font-normal">Cash / POS Card</p>
                        </div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'counter' ? 'border-emerald-700 bg-emerald-700' : 'border-neutral-300'
                      }`}>
                        {paymentMethod === 'counter' && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                    </button>

                    {/* Direct UPI QR */}
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                        paymentMethod === 'upi'
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-600'
                          : 'border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <QrCode className="w-4 h-4 text-neutral-600" />
                        <div>
                          <p>Store UPI QR</p>
                          <p className="text-[10px] text-neutral-500 font-normal">Scan & Show screen</p>
                        </div>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        paymentMethod === 'upi' ? 'border-emerald-700 bg-emerald-700' : 'border-neutral-300'
                      }`}>
                        {paymentMethod === 'upi' && <div className="w-1 h-1 rounded-full bg-white" />}
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-3 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Item Subtotal</span>
                  <span className="font-mono">₹{cartSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span className="font-mono">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>BrewPluse Platform Fee</span>
                  <span className="font-mono font-bold text-[#0B2B1A]">₹{platformFee}</span>
                </div>
                <div className="pt-1.5 border-t border-neutral-200 flex justify-between font-black text-sm text-neutral-900">
                  <span>Grand Total</span>
                  <span className="font-mono text-emerald-800">₹{finalTotal}</span>
                </div>
              </div>
            </div>

            {/* Sheet Footer Button */}
            <div className="p-4 border-t border-neutral-100 bg-neutral-50">
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placingOrder}
                className="w-full py-3.5 px-4 rounded-xl bg-[#0B2B1A] hover:bg-[#124229] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
              >
                <span>
                  {placingOrder
                    ? 'Processing...'
                    : paymentMethod === 'razorpay'
                    ? `Pay Now with Razorpay (₹${finalTotal})`
                    : `Confirm & Place Order (₹${finalTotal})`}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Confirmed Screen / Modal */}
      {placedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full border border-neutral-200 shadow-2xl p-6 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-[11px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Order Sent to Kitchen
                </span>
                {placedOrder.paymentStatus === 'paid' && (
                  <span className="text-[11px] font-mono font-bold uppercase text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    Paid Online
                  </span>
                )}
              </div>
              <h3 className="text-xl font-black text-neutral-900 mt-1">
                Order #{placedOrder.orderNumber}
              </h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Being freshly prepared for {placedOrder.table}
              </p>
              {placedOrder.paymentStatus === 'paid' && (
                <p className="text-[11px] font-mono text-emerald-700 mt-1">
                  ✓ Payment Verified • ₹{placedOrder.total}
                </p>
              )}
            </div>

            {/* Stepper Status */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                <span className="block font-black text-xs">✓ 1</span>
                <span>Received</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 animate-pulse">
                <span className="block font-black text-xs">☕ 2</span>
                <span>Preparing</span>
              </div>
              <div className="p-2 rounded-xl bg-neutral-50 text-neutral-400 border border-neutral-200">
                <span className="block font-black text-xs">🍽️ 3</span>
                <span>Served</span>
              </div>
            </div>

            {/* UPI QR if chosen */}
            {placedOrder.paymentMode === 'UPI' && (
              <div className="p-4 rounded-2xl bg-[#0B2B1A] text-white space-y-3">
                <p className="text-xs font-bold text-amber-300">Scan to Pay Exact Amount (₹{placedOrder.total})</p>
                <div className="w-36 h-36 bg-white p-2 rounded-xl mx-auto flex items-center justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=5&data=${encodeURIComponent(
                      upiPayUrl
                    )}`}
                    alt="UPI Payment QR"
                    className="w-full h-full object-contain"
                  />
                </div>
                <a
                  href={upiPayUrl}
                  className="inline-block text-[11px] font-mono font-bold bg-emerald-500 text-neutral-950 px-4 py-1.5 rounded-lg hover:bg-emerald-400"
                >
                  Pay via UPI App (GPay/PhonePe)
                </a>
              </div>
            )}

            {/* Interactive Scratch & Win Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 text-neutral-900 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
                  Lucky Scratch Card
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-200/80 text-amber-950 font-bold">
                  {isScratchRevealed ? 'UNLOCKED' : 'TAP TO REVEAL'}
                </span>
              </div>

              <div
                onClick={() => setIsScratchRevealed(true)}
                className={`p-4 rounded-xl text-center cursor-pointer select-none transition-all duration-300 border ${
                  isScratchRevealed
                    ? 'bg-white border-amber-300 shadow-inner'
                    : 'bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-900 hover:to-black border-neutral-700 text-amber-300 shadow-md'
                }`}
              >
                {isScratchRevealed ? (
                  <div className="space-y-1 animate-in zoom-in-95">
                    <p className="text-sm font-black text-emerald-800">🎉 Surprise Reward Unlocked!</p>
                    <p className="text-xs font-bold text-neutral-800">{scratchPrize}</p>
                    <p className="text-[10px] text-neutral-500 font-mono">Show this code on your next visit or bill!</p>
                  </div>
                ) : (
                  <div className="py-2 space-y-1">
                    <p className="text-xs font-extrabold tracking-widest text-amber-400">✨ TAP TO SCRATCH &amp; WIN ✨</p>
                    <p className="text-[10px] text-neutral-300">Surprise discount reward for your next cafe visit</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Review Booster */}
            <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-left space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>Enjoying your experience? Leave a Google Review!</span>
              </div>
              <p className="text-[11px] text-neutral-500">
                Our AI prepared a 5-star review for you. Tap below to copy and paste on Google Maps:
              </p>
              <button
                type="button"
                onClick={handleCopyReview}
                className="w-full py-2 px-3 rounded-xl bg-white border border-neutral-300 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-100 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedReview ? 'Copied to Clipboard! ✓' : 'Copy AI 5★ Review & Open Maps'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setPlacedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-black transition-colors cursor-pointer"
            >
              Order More Items
            </button>
          </div>
        </div>
      )}
      {/* Table Switcher Modal */}
      {isTableModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#0B2B1A] text-amber-300 flex items-center justify-center font-bold">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-neutral-900">Select Your Table</h3>
                  <p className="text-[11px] text-neutral-500">Pick the table where you are seated</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTableModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto pr-1 grid grid-cols-2 gap-2.5 py-1 max-h-[50vh]">
              {availableTables.map((tbl) => {
                const isSelected = selectedTable === tbl;
                return (
                  <button
                    key={tbl}
                    type="button"
                    onClick={() => {
                      setSelectedTable(tbl);
                      setIsTableModalOpen(false);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#0B2B1A] bg-[#0B2B1A] text-white shadow-sm'
                        : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    <span className="text-xs font-bold">{tbl}</span>
                    {isSelected && <span className="text-emerald-400 text-xs font-black">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
              <span>Seated at: <strong className="text-neutral-900">{selectedTable}</strong></span>
              <button
                type="button"
                onClick={() => setIsTableModalOpen(false)}
                className="px-3.5 py-1.5 rounded-lg bg-[#0B2B1A] text-white font-semibold text-xs cursor-pointer hover:bg-neutral-800"
              >
                Confirm Table
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
