'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Receipt,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Clock,
  ArrowRight,
  CheckCircle2,
  Printer,
  X,
  Tag,
  Coffee,
  SlidersHorizontal,
  Wifi,
  WifiOff,
  Database,
  UtensilsCrossed,
  Sparkles,
  Mail,
} from 'lucide-react';
import { useDemo, MenuItem } from '../demoContext';
import { thermalPrinter } from '@/lib/thermalPrinter';

export default function DemoPosPage() {
  const {
    menuItems,
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
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    createOrder,
    tables,
    notify,
    isOfflineMode,
  } = useDemo();

  const [activeCategory, setActiveCategory] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [completedOrder, setCompletedOrder] = useState<ReturnType<typeof createOrder> | null>(null);
  const [billEmail, setBillEmail] = useState('');
  const [isSendingBillEmail, setIsSendingBillEmail] = useState(false);
  const [billEmailSent, setBillEmailSent] = useState(false);

  // Modifiers Modal State
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<{ name: string; price: number }>({
    name: 'Regular',
    price: 0,
  });
  const [selectedMilk, setSelectedMilk] = useState<{ name: string; price: number }>({
    name: 'Whole Milk',
    price: 0,
  });
  const [selectedSweetness, setSelectedSweetness] = useState<string>('100% Standard');
  const [selectedAddons, setSelectedAddons] = useState<{ name: string; price: number }[]>([]);
  const [customNotes, setCustomNotes] = useState<string>('');

  // Thermal Printer Paper Width State
  const [printerPaperWidth, setPrinterPaperWidth] = useState<'58mm' | '80mm'>('80mm');

  const categories = [
    'All Items',
    'Coffee',
    'Cold Brew',
    'Beverages',
    'Bakery',
    'Desserts',
    'Snacks',
  ];

  const sizeOptions = [
    { name: 'Regular (250ml)', price: 0 },
    { name: 'Large (350ml)', price: 40 },
    { name: 'Venti / Grande (450ml)', price: 70 },
  ];

  const milkOptions = [
    { name: 'Whole Milk', price: 0 },
    { name: 'Oat Milk', price: 35 },
    { name: 'Almond Milk', price: 40 },
    { name: 'Soy Milk', price: 25 },
    { name: 'No Milk (Black)', price: 0 },
  ];

  const sweetnessOptions = [
    '0% Unsweetened',
    '50% Less Sweet',
    '100% Standard',
    'Extra Sweet (125%)',
  ];

  const addonOptions = [
    { name: 'Extra Espresso Shot', price: 45 },
    { name: 'Vanilla Syrup (1 Pump)', price: 25 },
    { name: 'Caramel Drizzle', price: 20 },
    { name: 'Whipped Cream', price: 30 },
    { name: 'Cinnamon Dusting', price: 10 },
  ];

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'All Items' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const rawSubtotal = cart.reduce(
    (sum, ci) => sum + (ci.item.price + (ci.modifierPrice || 0)) * ci.quantity,
    0
  );
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (rawSubtotal * appliedCoupon.value) / 100;
    } else {
      discountAmount = appliedCoupon.value;
    }
  }
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount);
  const taxAmount = Math.round(subtotalAfterDiscount * 0.05 * 100) / 100;
  const grandTotal = subtotalAfterDiscount + taxAmount;
  const totalCartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);

  const handleOpenCustomize = (item: MenuItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCustomizingItem(item);
    setSelectedSize({ name: 'Regular (250ml)', price: 0 });
    setSelectedMilk({ name: 'Whole Milk', price: 0 });
    setSelectedSweetness('100% Standard');
    setSelectedAddons([]);
    setCustomNotes('');
  };

  const handleAddCustomizedToCart = () => {
    if (!customizingItem) return;
    const modifierList: string[] = [];
    if (selectedSize.name !== 'Regular (250ml)') modifierList.push(selectedSize.name);
    if (selectedMilk.name !== 'Whole Milk') modifierList.push(selectedMilk.name);
    if (selectedSweetness !== '100% Standard') modifierList.push(selectedSweetness);
    selectedAddons.forEach((addon) => modifierList.push(addon.name));

    const totalModifierPrice =
      selectedSize.price +
      selectedMilk.price +
      selectedAddons.reduce((sum, a) => sum + a.price, 0);

    addToCartWithModifiers(
      customizingItem,
      modifierList,
      totalModifierPrice,
      customNotes.trim() || undefined
    );
    setCustomizingItem(null);
  };

  const toggleAddon = (addon: { name: string; price: number }) => {
    if (selectedAddons.some((a) => a.name === addon.name)) {
      setSelectedAddons(selectedAddons.filter((a) => a.name !== addon.name));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const success = applyCoupon(couponInput);
    if (success) setCouponInput('');
  };

  const handlePostOrder = () => {
    if (cart.length === 0) return;
    const ord = createOrder('UPI');
    setCompletedOrder(ord);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Filter and Search Bar */}
      <div className="sticky top-20 z-30 bg-[#faf9f8]/90 dark:bg-[#070708]/90 backdrop-blur-md pt-2 pb-4 border-b border-[#ebe8e3] dark:border-[#222225] space-y-4">
        {/* Network & Local Persistence Banner */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            {isOfflineMode ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                <WifiOff className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                <span>Offline Mode &bull; IndexedDB Local Persistence Active</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                <span>Cloud Synced &bull; Sub-1.2s Dispatch Speed</span>
              </span>
            )}
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
              <Database className="w-3 h-3 text-zinc-400" /> IndexedDB v1
            </span>
          </div>

          <div className="text-[11px] text-zinc-400 font-mono">
            ESC/POS Ready: <span className="font-bold text-amber-600 dark:text-amber-400">58mm & 80mm</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products & details... (e.g. Latte, Croissant)"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-full text-xs text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500 font-semibold transition-all"
            />
          </div>

          {/* Pay At: Last / First Switch */}
          <div
            className="flex items-center gap-2 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-full h-10 px-3.5 shadow-2xs shrink-0 select-none"
            title="Toggle payment workflow for all orders"
          >
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500">
              Pay At:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPayTiming('last')}
                className={`text-xs font-bold transition-all cursor-pointer ${
                  payTiming === 'last'
                    ? 'text-amber-600 dark:text-amber-400 font-black scale-105'
                    : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                Last
              </button>
              <button
                type="button"
                onClick={() => setPayTiming(payTiming === 'last' ? 'first' : 'last')}
                aria-label="Toggle payment flow"
                className="w-8 h-4.5 rounded-full p-0.5 transition-colors relative cursor-pointer flex items-center bg-zinc-300 dark:bg-zinc-700"
              >
                <div
                  className={`w-3.5 h-3.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
                    payTiming === 'first' ? 'translate-x-3.5 bg-amber-500' : 'translate-x-0'
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => setPayTiming('first')}
                className={`text-xs font-bold transition-all cursor-pointer ${
                  payTiming === 'first'
                    ? 'text-amber-600 dark:text-amber-400 font-black scale-105'
                    : 'text-zinc-400 hover:text-zinc-600'
                }`}
              >
                First
              </button>
            </div>
          </div>

          {/* Usage Pill */}
          <Link
            href="/demo/usage"
            className="hidden xl:flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-amber-500/30 bg-white dark:bg-[#121214] text-xs font-bold shrink-0 shadow-2xs text-[#141210] dark:text-white"
          >
            <Receipt className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-zinc-500">Usage:</span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">₹0.00</span>
            <span className="text-[10px] text-zinc-400">/ ₹200.00</span>
          </Link>
        </div>

        {/* Category Pill Buttons */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-white dark:bg-[#121214] text-zinc-600 dark:text-zinc-400 border border-[#ebe8e3] dark:border-[#222225] hover:bg-neutral-100 dark:hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Products Left + Cart Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Product Cards Grid */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const inCartItem = cart.find((ci) => ci.item.id === item.id);
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-4 flex flex-col justify-between shadow-2xs hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all group relative overflow-hidden"
                >
                  {/* Cart count badge */}
                  {inCartItem && (
                    <div className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-amber-500 text-white text-[11px] font-mono font-bold flex items-center justify-center shadow-md animate-scale">
                      {inCartItem.quantity}
                    </div>
                  )}

                  {/* Icon illustration & Quick Customize trigger */}
                  <div
                    onClick={() => handleOpenCustomize(item)}
                    className="cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                      <Coffee className="w-6 h-6" />
                    </div>

                    {/* Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}
                          title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                        />
                        <h3 className="font-bold text-xs text-[#141210] dark:text-white line-clamp-1 group-hover:text-amber-600 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action Buttons */}
                  <div className="mt-4 pt-2 border-t border-[#ebe8e3]/60 dark:border-[#222225] flex items-center justify-between gap-1">
                    <span className="font-mono font-black text-sm text-[#141210] dark:text-white">
                      ₹{item.price}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleOpenCustomize(item, e)}
                        title="Customize Size, Milk & Modifiers"
                        className="px-2 py-1 rounded-lg bg-neutral-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-600 dark:text-zinc-300 hover:bg-amber-100 dark:hover:bg-amber-950/50 hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <SlidersHorizontal className="w-3 h-3" />
                        <span>Mod</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        title="Quick Add 1x"
                        className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-700 active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Checkout Panel */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl shadow-sm overflow-hidden sticky top-38">
          {/* Panel Header */}
          <div className="p-4 sm:p-5 border-b border-[#ebe8e3] dark:border-[#222225] flex items-center justify-between bg-neutral-50/50 dark:bg-black/20">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="font-bold text-base text-[#141210] dark:text-white uppercase tracking-wider">
                Current Ticket
              </h2>
            </div>
            <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full font-mono font-bold uppercase tracking-wider border border-amber-500/20">
              {totalCartCount} Items
            </span>
          </div>

          {/* Cart Items List */}
          <div className="p-4 sm:p-5 space-y-3 max-h-[320px] overflow-y-auto no-scrollbar">
            {cart.length === 0 ? (
              <div className="py-14 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-zinc-800 text-zinc-400 mx-auto flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Basket is Empty
                  </p>
                  <p className="text-[11px] text-zinc-400">
                    Tap menu items from the left to start billing
                  </p>
                </div>
              </div>
            ) : (
              cart.map((ci, idx) => {
                const itemUnitPrice = ci.item.price + (ci.modifierPrice || 0);
                const itemKey = ci.id || `${ci.item.id}-${idx}`;
                return (
                  <div
                    key={itemKey}
                    className="p-2.5 rounded-xl bg-[#faf9f8] dark:bg-zinc-800/40 border border-[#ebe8e3] dark:border-[#222225] space-y-1"
                  >
                    <div className="flex items-start justify-between">
                      <div className="min-w-0 flex-1 pr-2">
                        <p className="text-xs font-bold text-[#141210] dark:text-white truncate">
                          {ci.item.name}
                        </p>
                        {ci.modifiers && ci.modifiers.length > 0 && (
                          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                            + {ci.modifiers.join(', ')}
                          </p>
                        )}
                        {ci.notes && (
                          <p className="text-[9px] text-zinc-400 italic">
                            &ldquo;{ci.notes}&rdquo;
                          </p>
                        )}
                        <p className="text-[10px] font-mono text-zinc-400">
                          ₹{itemUnitPrice} × {ci.quantity} = ₹{itemUnitPrice * ci.quantity}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="flex items-center border border-[#ebe8e3] dark:border-[#2a2a2e] rounded-lg bg-white dark:bg-[#121214]">
                          <button
                            onClick={() => updateCartQty(ci.id || ci.item.id, -1)}
                            className="p-1 hover:text-amber-500 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 text-xs font-mono font-bold">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQty(ci.id || ci.item.id, 1)}
                            className="p-1 hover:text-amber-500 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(ci.id || ci.item.id)}
                          className="p-1 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Form: Table selection & Customer details */}
          <div className="p-4 sm:p-5 border-t border-[#ebe8e3] dark:border-[#222225] space-y-3.5 bg-neutral-50/30 dark:bg-transparent">
            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 block mb-1">
                Assign Table / Dine-In
              </label>
              <select
                value={selectedTable}
                onChange={(e) => setSelectedTable(e.target.value)}
                className="w-full bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-xl h-9.5 px-3 text-xs text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-semibold"
              >
                <option value="Takeaway">Takeaway Counter</option>
                {tables.map((tbl) => (
                  <option key={tbl.id} value={tbl.name}>
                    {tbl.name} ({tbl.status})
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Customer Name & Phone */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Cust Name (opt)"
                className="w-full bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-xl px-3 py-2 text-xs text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500 font-medium"
              />
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Phone (opt)"
                className="w-full bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-xl px-3 py-2 text-xs text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500 font-medium font-mono"
              />
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Promo code (e.g. BREW10)"
                  className="w-full pl-8.5 pr-2 py-2 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-xl text-xs uppercase tracking-wider font-mono placeholder:normal-case placeholder:tracking-normal text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-neutral-200 dark:bg-zinc-800 hover:bg-neutral-300 dark:hover:bg-zinc-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Active Coupon Badge */}
            {appliedCoupon && (
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                <span>
                  {appliedCoupon.code} applied (
                  {appliedCoupon.discountType === 'percentage'
                    ? `${appliedCoupon.value}% OFF`
                    : `₹${appliedCoupon.value} OFF`}
                  )
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="p-1 hover:text-rose-500 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Bill Summary */}
            <div className="space-y-1.5 pt-2 border-t border-[#ebe8e3] dark:border-[#222225] font-mono text-xs">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span>₹{rawSubtotal.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Discount</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-zinc-500">
                <span>GST (5%)</span>
                <span>₹{taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#141210] dark:text-white pt-2 border-t border-[#ebe8e3] dark:border-[#222225]">
                <span>Grand Total</span>
                <span className="text-amber-600 dark:text-amber-400">
                  ₹{grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={cart.length === 0}
                onClick={handlePostOrder}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Dispatch to Kitchen &bull; ₹{grandTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full py-1 text-center text-[11px] text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customizable Order Modifiers Modal */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto no-scrollbar">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b pb-4 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Customize Modifiers
                </span>
                <h3 className="text-lg font-extrabold text-[#141210] dark:text-white">
                  {customizingItem.name}
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Base Price: ₹{customizingItem.price}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setCustomizingItem(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 1. Cup Size */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                1. Cup Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizeOptions.map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedSize(opt)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedSize.name === opt.name
                        ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                        : 'border-[#ebe8e3] dark:border-[#2a2a2e] text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <p className="text-xs">{opt.name.split(' ')[0]}</p>
                    <p className="text-[10px] font-mono opacity-80">
                      {opt.price > 0 ? `+₹${opt.price}` : 'Default'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Milk Choice */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                2. Milk Choice
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {milkOptions.map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedMilk(opt)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedMilk.name === opt.name
                        ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                        : 'border-[#ebe8e3] dark:border-[#2a2a2e] text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <p className="text-xs">{opt.name}</p>
                    <p className="text-[10px] font-mono opacity-80">
                      {opt.price > 0 ? `+₹${opt.price}` : '₹0'}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Sweetness Level */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                3. Sweetness
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {sweetnessOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSelectedSweetness(opt)}
                    className={`p-2 rounded-xl border text-center transition-all cursor-pointer text-xs ${
                      selectedSweetness === opt
                        ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                        : 'border-[#ebe8e3] dark:border-[#2a2a2e] text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Extra Add-ons */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                4. Barista Add-ons (Multi-select)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {addonOptions.map((addon) => {
                  const isChecked = selectedAddons.some((a) => a.name === addon.name);
                  return (
                    <button
                      key={addon.name}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold'
                          : 'border-[#ebe8e3] dark:border-[#2a2a2e] text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <span className="text-xs">{addon.name}</span>
                      <span className="text-xs font-mono">+₹{addon.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Barista Instructions */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-zinc-500">
                Special Barista Instructions
              </label>
              <input
                type="text"
                value={customNotes}
                onChange={(e) => setCustomNotes(e.target.value)}
                placeholder="e.g. Extra hot, double cup, less foam..."
                className="w-full bg-neutral-50 dark:bg-zinc-800 border border-[#ebe8e3] dark:border-[#2a2a2e] rounded-xl px-3 py-2 text-xs text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Footer with Price and Add to Order button */}
            <div className="border-t pt-4 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-zinc-400 uppercase font-mono">Customized Total</p>
                <p className="text-base font-black font-mono text-amber-600 dark:text-amber-400">
                  ₹
                  {customizingItem.price +
                    selectedSize.price +
                    selectedMilk.price +
                    selectedAddons.reduce((sum, a) => sum + a.price, 0)}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCustomizingItem(null)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCustomizedToCart}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Add to Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Order Success Receipt Dialog & Thermal Printer Integration */}
      {completedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-extrabold text-[#141210] dark:text-white">
                Order #{completedOrder.orderNumber} Dispatched!
              </h3>
              <p className="text-xs text-zinc-500">
                Routed to Kitchen Display (KDS) &bull; Table: {completedOrder.table} &bull; Sub-1.2s Dispatch
              </p>
            </div>

            {/* Thermal Printer Paper Width Selector (58mm vs 80mm) */}
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                  Thermal ESC/POS Paper Width:
                </span>
              </div>
              <div className="flex items-center gap-1 bg-white dark:bg-zinc-800 p-0.5 rounded-lg border border-amber-300 dark:border-zinc-700">
                <button
                  type="button"
                  onClick={() => setPrinterPaperWidth('58mm')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    printerPaperWidth === '58mm'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  58mm
                </button>
                <button
                  type="button"
                  onClick={() => setPrinterPaperWidth('80mm')}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${
                    printerPaperWidth === '80mm'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  80mm
                </button>
              </div>
            </div>

            {/* Receipt Summary Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-zinc-800/40 border border-[#ebe8e3] dark:border-[#222225] space-y-2 font-mono text-xs">
              <div className="flex justify-between border-b pb-2 dark:border-zinc-700">
                <span className="font-bold">BrewPluse Flagship Cafe</span>
                <span>GST: 27AABCB1234F1Z0</span>
              </div>
              <div className="space-y-1.5 py-1">
                {completedOrder.items.map((ci, idx) => {
                  const itemUnitPrice = ci.item.price + (ci.modifierPrice || 0);
                  return (
                    <div key={ci.id || `${ci.item.id}-${idx}`} className="space-y-0.5">
                      <div className="flex justify-between">
                        <span>
                          {ci.quantity}x {ci.item.name}
                        </span>
                        <span>₹{(itemUnitPrice * ci.quantity).toFixed(2)}</span>
                      </div>
                      {ci.modifiers && ci.modifiers.length > 0 && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 pl-4">
                          └ {ci.modifiers.join(', ')}
                        </p>
                      )}
                      {ci.notes && (
                        <p className="text-[9px] text-zinc-400 pl-4 italic">
                          └ Note: {ci.notes}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between border-t pt-2 font-bold dark:border-zinc-700">
                <span>Grand Total:</span>
                <span className="text-emerald-600">₹{completedOrder.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Printing Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                onClick={async () => {
                  notify(`Printing ${printerPaperWidth} Kitchen Order Ticket (KOT)...`);
                  await thermalPrinter.printKot(
                    {
                      orderNumber: completedOrder.orderNumber,
                      table: completedOrder.table,
                      timestamp: new Date().toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      }),
                      items: completedOrder.items.map((ci) => ({
                        name: ci.item.name,
                        qty: ci.quantity,
                        modifiers: ci.modifiers,
                        notes: ci.notes,
                      })),
                    },
                    printerPaperWidth
                  );
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs font-bold hover:bg-amber-500/20 transition-colors cursor-pointer"
              >
                <UtensilsCrossed className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Print Kitchen KOT ({printerPaperWidth})</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  notify(`Printing ${printerPaperWidth} Customer Thermal Receipt...`);
                  await thermalPrinter.printReceipt({
                    storeName: 'BrewPluse Cafe & Roasters',
                    storeAddress: 'Indiranagar 100ft Rd, Bengaluru',
                    storePhone: '+91 9173807471',
                    gstin: '27AABCB1234F1Z0',
                    orderNumber: completedOrder.orderNumber,
                    tableNumber: completedOrder.table,
                    orderType: completedOrder.table === 'Takeaway' ? 'Takeaway' : 'Dine-In',
                    paperWidth: printerPaperWidth,
                    timestamp: new Date().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    }),
                    items: completedOrder.items.map((ci) => ({
                      name: ci.item.name,
                      qty: ci.quantity,
                      price: ci.item.price + (ci.modifierPrice || 0),
                    })),
                    subtotal: completedOrder.subtotal,
                    cgst: completedOrder.tax / 2,
                    sgst: completedOrder.tax / 2,
                    total: completedOrder.total,
                    paymentMode: completedOrder.paymentMode,
                    footerMessage: 'Thank you for choosing BrewPluse! Visit again.',
                  });
                }}
                className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#ebe8e3] dark:border-[#2a2a2e] text-xs font-bold hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4 text-emerald-600" />
                <span>Print Receipt ({printerPaperWidth})</span>
              </button>
            </div>

            {/* Email Invoice Section (CafeFlow Feature) */}
            <div className="p-3 rounded-xl bg-[#062F23]/5 dark:bg-[#062F23]/20 border border-[#062F23]/10 dark:border-emerald-500/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#12201B] dark:text-white flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-600" />
                  Email Bill to Customer
                </span>
                {billEmailSent && (
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Sent!
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="customer@gmail.com"
                  value={billEmail}
                  onChange={(e) => setBillEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  disabled={!billEmail || isSendingBillEmail}
                  onClick={async () => {
                    if (!billEmail) return;
                    setIsSendingBillEmail(true);
                    try {
                      const res = await fetch('/api/send-bill', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          to: billEmail,
                          customerName: customerName || 'Valued Guest',
                          orderNumber: completedOrder.orderNumber,
                          storeName: 'BrewPluse Cafe & Roasters',
                          table: completedOrder.table,
                          items: completedOrder.items.map((ci) => ({
                            name: ci.item.name,
                            qty: ci.quantity,
                            price: ci.item.price + (ci.modifierPrice || 0),
                          })),
                          subtotal: completedOrder.subtotal,
                          tax: completedOrder.tax,
                          total: completedOrder.total,
                          paymentMode: completedOrder.paymentMode,
                        }),
                      });
                      const data = await res.json();
                      if (res.ok && data.success) {
                        setBillEmailSent(true);
                        notify(data.preview ? 'Simulated digital invoice sent to email!' : `Bill sent to ${billEmail}`);
                      } else {
                        notify('Failed to send invoice email');
                      }
                    } catch (e) {
                      notify('Error connecting to email service');
                    } finally {
                      setIsSendingBillEmail(false);
                    }
                  }}
                  className="px-3 py-2 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSendingBillEmail ? 'Sending...' : 'Send Bill'}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setCompletedOrder(null);
                setBillEmailSent(false);
                setBillEmail('');
              }}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              Start Next Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
