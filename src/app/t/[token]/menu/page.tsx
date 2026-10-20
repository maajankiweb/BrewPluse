'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  Tag,
  AlertCircle,
  Receipt,
  UtensilsCrossed,
  Flame,
  ChefHat,
  ChevronDown,
} from 'lucide-react';

interface Variant {
  id: string;
  name: string;
  price: number;
}

interface Addon {
  id: string;
  name: string;
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  desc: string;
  image?: string;
  isVeg: boolean;
  isPopular?: boolean;
  isAvailable: boolean;
  variants?: Variant[];
  addons?: Addon[];
}

interface CartItem {
  cartId: string;
  menuItemId: string;
  name: string;
  basePrice: number;
  selectedVariant?: Variant;
  selectedAddons: Addon[];
  qty: number;
  note?: string;
  unitPrice: number;
  lineTotal: number;
}

interface ActiveSessionData {
  id: string;
  status: string;
  totals: {
    subtotal: number;
    tax: number;
    grandTotal: number;
    paid: number;
    due: number;
  };
}

interface PlacedOrderData {
  id: string;
  orderNumber: string;
  status: string;
  paymentStatus: string;
  total: number;
  items: any[];
  createdAt: string;
}

export default function CustomerMenuPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  // Store & Table Meta
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState<any>(null);
  const [table, setTable] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (persisted in sessionStorage)
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [paymentChoice, setPaymentChoice] = useState<'pay_later' | 'pay_now'>('pay_later');
  const [orderNotes, setOrderNotes] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Customization Modal State
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [modalVariant, setModalVariant] = useState<Variant | undefined>(undefined);
  const [modalAddons, setModalAddons] = useState<Addon[]>([]);
  const [modalQty, setModalQty] = useState(1);
  const [modalNote, setModalNote] = useState('');

  // Active Tab / Placed Orders State
  const [activeTabOpen, setActiveTabOpen] = useState(false);
  const [activeSession, setActiveSession] = useState<ActiveSessionData | null>(null);
  const [placedOrders, setPlacedOrders] = useState<PlacedOrderData[]>([]);

  // 1. Fetch Menu & Table on load
  async function loadMenuData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/public/table/${token}/menu`);
      const data = await res.json();
      if (res.ok && data.success) {
        setStore(data.store);
        setTable(data.table);
        setMenuItems(data.items || []);
        setCategories(data.categories || ['all']);

        // Default payment choice to store policy if locked
        if (data.store?.paymentPolicy === 'pay_first') {
          setPaymentChoice('pay_now');
        } else {
          setPaymentChoice('pay_later');
        }
      }
    } catch (e) {
      console.error('Failed to load menu:', e);
    } finally {
      setLoading(false);
    }
  }

  // Restore cart from sessionStorage
  useEffect(() => {
    if (token) {
      loadMenuData();
      try {
        const saved = sessionStorage.getItem(`cart_${token}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setCart(parsed);
        }
        const savedName = sessionStorage.getItem(`cust_name_${token}`);
        if (savedName) setCustomerName(savedName);
      } catch (e) {}
    }
  }, [token]);

  // Save cart to sessionStorage
  useEffect(() => {
    if (token && typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(`cart_${token}`, JSON.stringify(cart));
      } catch (e) {}
    }
  }, [cart, token]);

  // Filter items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCat = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [menuItems, activeCategory, searchQuery]);

  // Cart Totals
  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
    const taxRate = store?.taxRate || 5;
    const tax = store?.taxInclusive
      ? Math.round(subtotal - subtotal / (1 + taxRate / 100))
      : Math.round(subtotal * (taxRate / 100));
    const serviceCharge = Math.round(subtotal * ((store?.serviceChargePercent || 0) / 100));
    const grandTotal = (store?.taxInclusive ? subtotal : subtotal + tax) + serviceCharge;
    return { subtotal, tax, serviceCharge, grandTotal };
  }, [cart, store]);

  // Open customize modal for item
  function openItemModal(item: MenuItem) {
    setSelectedItem(item);
    setModalVariant(item.variants && item.variants.length > 0 ? item.variants[0] : undefined);
    setModalAddons([]);
    setModalQty(1);
    setModalNote('');
  }

  // Add customized item to cart
  function confirmAddToCart() {
    if (!selectedItem) return;

    const unitPrice = (modalVariant ? modalVariant.price : selectedItem.price) + modalAddons.reduce((s, a) => s + a.price, 0);
    const lineTotal = unitPrice * modalQty;
    const cartId = `${selectedItem.id}-${modalVariant?.id || 'base'}-${modalAddons.map((a) => a.id).sort().join(',')}-${Date.now()}`;

    const newCartItem: CartItem = {
      cartId,
      menuItemId: selectedItem.id,
      name: selectedItem.name,
      basePrice: selectedItem.price,
      selectedVariant: modalVariant,
      selectedAddons: modalAddons,
      qty: modalQty,
      note: modalNote.trim() || undefined,
      unitPrice,
      lineTotal,
    };

    setCart((prev) => [...prev, newCartItem]);
    setSelectedItem(null);
  }

  // Cart Qty Adjustments
  function updateCartQty(cartId: string, delta: number) {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartId === cartId) {
            const newQty = item.qty + delta;
            return newQty > 0 ? { ...item, qty: newQty, lineTotal: item.unitPrice * newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  }

  // Place Order handler (POST /api/public/orders)
  async function handlePlaceOrder() {
    if (cart.length === 0) return;

    setPlacingOrder(true);
    setOrderError(null);

    // Save name to sessionStorage
    if (customerName.trim()) {
      try {
        sessionStorage.setItem(`cust_name_${token}`, customerName.trim());
      } catch (e) {}
    }

    // Generate unique idempotency key
    const idempotencyKey = `ord-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    try {
      const payload = {
        tableToken: token,
        idempotencyKey,
        items: cart.map((item) => ({
          menuItemId: item.menuItemId,
          qty: item.qty,
          variantId: item.selectedVariant?.id,
          addonIds: item.selectedAddons.map((a) => a.id),
          note: item.note,
        })),
        customer: {
          name: customerName.trim() || undefined,
          phone: customerPhone.trim() || undefined,
        },
        paymentIntent: paymentChoice,
        notes: orderNotes.trim() || undefined,
      };

      const res = await fetch('/api/public/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setOrderError(data?.error?.message || 'Failed to place order. Please check item availability.');
        return;
      }

      // Order successfully placed!
      setCart([]);
      setIsCartOpen(false);
      sessionStorage.removeItem(`cart_${token}`);

      // Update active session & placed orders
      if (data.session) setActiveSession(data.session);
      if (data.order) {
        setPlacedOrders((prev) => [data.order, ...prev]);
        setActiveTabOpen(true);
      }
    } catch (err: any) {
      setOrderError('Network error while placing order. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAF8] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 animate-pulse mb-4">
          <Coffee className="w-8 h-8 animate-bounce" />
        </div>
        <h2 className="text-xl font-black text-[#062F23]">Loading Cafe Menu...</h2>
        <p className="text-xs text-gray-500 mt-2">Connecting to table {table?.number || ''}...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-gray-900 font-sans pb-32">
      {/* 1. Header Bar */}
      <header className="sticky top-0 z-30 bg-[#062F23] text-white shadow-md">
        <div className="max-w-md mx-auto px-4 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Coffee className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-tight truncate max-w-[170px] uppercase">
                {store?.name || 'BrewPluse Cafe'}
              </h1>
              <p className="text-[11px] text-emerald-300 font-medium flex items-center gap-1">
                <span>{table?.number || 'Table'}</span>
                {table?.label && <span className="opacity-80">· {table.label}</span>}
              </p>
            </div>
          </div>

          {/* Active Tab / Bill Button */}
          {placedOrders.length > 0 && (
            <button
              onClick={() => setActiveTabOpen(true)}
              className="px-3 py-1.5 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer animate-pulse"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>My Tab ({placedOrders.length})</span>
            </button>
          )}
        </div>

        {/* 2. Category Tabs */}
        <div className="max-w-md mx-auto px-4 pb-3 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white/10 text-emerald-100 hover:bg-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* 3. Search Bar */}
      <div className="max-w-md mx-auto px-4 pt-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search coffee, tea, croissants, toast..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
          />
        </div>
      </div>

      {/* 4. Menu Items Grid */}
      <main className="max-w-md mx-auto px-4 pt-5 space-y-3.5">
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <UtensilsCrossed className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-gray-800">No matching dishes</h3>
            <p className="text-xs text-gray-500 mt-1">Try another category or search term.</p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const hasCustomizations = (item.variants && item.variants.length > 0) || (item.addons && item.addons.length > 0);
            return (
              <div
                key={item.id}
                className={`p-4 rounded-3xl bg-white border border-gray-100 shadow-sm flex items-start justify-between gap-3 transition-all ${
                  !item.isAvailable ? 'opacity-50 grayscale' : 'hover:border-emerald-200'
                }`}
              >
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    {/* Veg dot */}
                    <span className="w-3.5 h-3.5 rounded border border-emerald-600 flex items-center justify-center p-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    </span>
                    {item.isPopular && (
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[9px] font-extrabold flex items-center gap-0.5 uppercase tracking-wider">
                        <Flame className="w-2.5 h-2.5 text-amber-600" />
                        <span>Best Seller</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-extrabold text-[#062F23] leading-snug">{item.name}</h3>
                  <p className="text-[11px] text-gray-500 leading-relaxed mt-1 line-clamp-2">{item.desc}</p>
                  <div className="text-sm font-black text-gray-900 mt-2">₹{item.price}</div>
                </div>

                {/* Right side: Image + Add Button */}
                <div className="flex flex-col items-center shrink-0 w-24">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-20 rounded-2xl object-cover shadow-inner bg-gray-100 mb-2"
                    />
                  )}

                  {item.isAvailable ? (
                    <button
                      onClick={() => openItemModal(item)}
                      className="w-full py-1.5 px-3 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-600/30 text-emerald-800 text-xs font-black transition-all flex items-center justify-center gap-1 cursor-pointer active:scale-95 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{hasCustomizations ? 'Add +' : 'Add'}</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-gray-400 py-1 uppercase">Sold Out</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* 5. Customization Sheet Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedItem(null);
          }}
        >
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto animate-slide-up">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-black text-[#062F23]">{selectedItem.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{selectedItem.desc}</p>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Variants (Radio) */}
            {selectedItem.variants && selectedItem.variants.length > 0 && (
              <div className="mt-4 pb-4 border-b border-gray-100">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">
                  Select Size / Milk
                </h4>
                <div className="space-y-2">
                  {selectedItem.variants.map((v) => (
                    <label
                      key={v.id}
                      onClick={() => setModalVariant(v)}
                      className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-medium cursor-pointer transition-all ${
                        modalVariant?.id === v.id
                          ? 'border-emerald-600 bg-emerald-50/50 text-[#062F23]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span>{v.name}</span>
                      <span className="font-bold">₹{v.price}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Addons (Checkbox) */}
            {selectedItem.addons && selectedItem.addons.length > 0 && (
              <div className="mt-4 pb-4 border-b border-gray-100">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2.5">Add-ons</h4>
                <div className="space-y-2">
                  {selectedItem.addons.map((a) => {
                    const isSelected = modalAddons.some((addon) => addon.id === a.id);
                    return (
                      <label
                        key={a.id}
                        onClick={() => {
                          if (isSelected) {
                            setModalAddons((prev) => prev.filter((item) => item.id !== a.id));
                          } else {
                            setModalAddons((prev) => [...prev, a]);
                          }
                        }}
                        className={`p-3 rounded-2xl border flex items-center justify-between text-xs font-medium cursor-pointer transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/50 text-[#062F23]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span>{a.name}</span>
                        <span className="font-bold">+₹{a.price}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Note input */}
            <div className="mt-4">
              <label className="text-xs font-bold text-gray-900 uppercase tracking-wider block mb-1.5">
                Note for Barista / Chef
              </label>
              <input
                type="text"
                placeholder="e.g. Less sugar, extra hot, no cinnamon..."
                value={modalNote}
                onChange={(e) => setModalNote(e.target.value)}
                maxLength={100}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Quantity Stepper & Add Button */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center gap-3 px-3 py-2 rounded-2xl border border-gray-200 bg-gray-50">
                <button
                  type="button"
                  onClick={() => setModalQty(Math.max(1, modalQty - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-extrabold w-4 text-center">{modalQty}</span>
                <button
                  type="button"
                  onClick={() => setModalQty(Math.min(20, modalQty + 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-gray-200 flex items-center justify-center font-bold text-gray-700 hover:bg-gray-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={confirmAddToCart}
                className="flex-1 py-3.5 px-4 rounded-2xl bg-[#062F23] hover:bg-[#0B5C45] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add to Order</span>
                <span>•</span>
                <span>
                  ₹
                  {((modalVariant ? modalVariant.price : selectedItem.price) +
                    modalAddons.reduce((s, a) => s + a.price, 0)) *
                    modalQty}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Floating Cart Pill Bar */}
      {cart.length > 0 && !isCartOpen && (
        <div className="fixed bottom-5 left-4 right-4 z-40 max-w-md mx-auto">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3.5 px-5 rounded-2xl bg-[#062F23] text-white shadow-2xl flex items-center justify-between border border-emerald-500/30 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center">
                {cart.reduce((s, i) => s + i.qty, 0)}
              </span>
              <span className="text-xs font-bold">View Cart ({cart.length} items)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black">₹{cartTotals.grandTotal}</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </div>
          </button>
        </div>
      )}

      {/* 7. Full Cart Drawer */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCartOpen(false);
          }}
        >
          <div className="w-full max-w-md bg-white rounded-t-3xl p-5 shadow-2xl max-h-[92vh] overflow-y-auto animate-slide-up flex flex-col justify-between">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-emerald-700" />
                  <h3 className="text-base font-black text-[#062F23]">Table Cart</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                    {table?.number}
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Error Notice */}
              {orderError && (
                <div className="mt-3 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{orderError}</span>
                </div>
              )}

              {/* Cart Items List */}
              <div className="divide-y divide-gray-100 my-3">
                {cart.map((item) => (
                  <div key={item.cartId} className="py-3 flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                      {item.selectedVariant && (
                        <p className="text-[10px] text-emerald-700 font-medium">Size: {item.selectedVariant.name}</p>
                      )}
                      {item.selectedAddons.length > 0 && (
                        <p className="text-[10px] text-gray-500">
                          Addons: {item.selectedAddons.map((a) => a.name).join(', ')}
                        </p>
                      )}
                      {item.note && <p className="text-[10px] text-amber-700 italic">"{item.note}"</p>}
                      <div className="text-xs font-extrabold text-gray-900 mt-1">₹{item.lineTotal}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQty(item.cartId, -1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateCartQty(item.cartId, 1)}
                        className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Customer Inputs */}
              <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 mb-4">
                <input
                  type="text"
                  placeholder="Your Name (optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone number for bill / receipt (optional)"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              {/* Payment Intent Choice (Spec Section 7) */}
              <div className="mb-4">
                <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider block mb-2">
                  When would you like to pay?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentChoice('pay_later')}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      paymentChoice === 'pay_later'
                        ? 'border-emerald-600 bg-emerald-50 text-[#062F23] ring-1 ring-emerald-600'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="font-extrabold text-xs">Pay Later</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">At counter / after eating</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentChoice('pay_now')}
                    disabled={store?.paymentPolicy === 'pay_later'}
                    className={`p-3 rounded-2xl border text-left cursor-pointer transition-all ${
                      paymentChoice === 'pay_now'
                        ? 'border-emerald-600 bg-emerald-50 text-[#062F23] ring-1 ring-emerald-600'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    } ${store?.paymentPolicy === 'pay_later' ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    <div className="font-extrabold text-xs">Pay Now</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">Online UPI / Card</div>
                  </button>
                </div>
              </div>

              {/* Bill Breakdown */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-xs space-y-1.5 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotals.subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST ({store?.taxRate || 5}%)</span>
                  <span>₹{cartTotals.tax}</span>
                </div>
                {cartTotals.serviceCharge > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Service Charge ({store?.serviceChargePercent}%)</span>
                    <span>₹{cartTotals.serviceCharge}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-[#062F23] pt-1.5 border-t border-emerald-200">
                  <span>Total Amount</span>
                  <span>₹{cartTotals.grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              onClick={handlePlaceOrder}
              disabled={placingOrder || cart.length === 0}
              className="w-full py-4 px-6 rounded-2xl bg-[#062F23] hover:bg-[#0B5C45] text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
            >
              {placingOrder ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting Order to Kitchen...</span>
                </div>
              ) : (
                <>
                  <span>Place Order • ₹{cartTotals.grandTotal}</span>
                  <ArrowRight className="w-4 h-4 text-emerald-400" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* 8. My Tab / Live Order Tracker Modal */}
      {activeTabOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveTabOpen(false);
          }}
        >
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-700" />
                <h3 className="text-lg font-black text-[#062F23]">Live Table Tab</h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {table?.number}
                </span>
              </div>
              <button
                onClick={() => setActiveTabOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-800 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Placed Orders List */}
            <div className="space-y-4 my-4">
              {placedOrders.map((ord, idx) => (
                <div key={ord.id || idx} className="p-4 rounded-2xl bg-[#F8FAF8] border border-gray-200">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200/60">
                    <div>
                      <span className="text-xs font-mono font-black text-gray-900">{ord.orderNumber}</span>
                      <span className="text-[10px] text-gray-400 block font-sans">
                        {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>

                    <div className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-[10px] font-bold flex items-center gap-1.5 uppercase">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{ord.status || 'Placed'}</span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-2">
                    {ord.items?.map((it: any, i: number) => (
                      <div key={i} className="flex justify-between text-xs text-gray-700">
                        <span>
                          {it.quantity || it.qty}x {it.name}
                        </span>
                        <span className="font-semibold">₹{it.price || it.unitPrice / 100}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between text-xs font-black text-gray-900 pt-2 border-t border-gray-200">
                    <span>Order Total</span>
                    <span>₹{ord.total}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Session Tab Summary */}
            {activeSession && (
              <div className="p-4 rounded-2xl bg-[#062F23] text-white space-y-2 mb-4 shadow-lg">
                <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">Tab Summary</div>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Grand Total</span>
                  <span>₹{activeSession.totals.grandTotal}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-300">
                  <span>Paid so far</span>
                  <span>₹{activeSession.totals.paid}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-white/20">
                  <span>Amount Due</span>
                  <span className="text-emerald-400">₹{activeSession.totals.due}</span>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={() => setActiveTabOpen(false)}
                className="w-full py-3.5 px-4 rounded-2xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Order More Items to this Table</span>
              </button>

              <div className="text-center text-[11px] text-gray-400 pt-2">
                Pay at counter when done, or cashier will bring the bill.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
