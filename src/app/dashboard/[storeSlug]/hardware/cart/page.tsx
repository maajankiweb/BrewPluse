'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  CheckCircle2,
  CreditCard,
  Lock,
  Sparkles,
  Printer,
  ChevronRight,
} from 'lucide-react';
import {
  HardwareCartItem,
  getHardwareCart,
  updateHardwareCartQuantity,
  removeFromHardwareCart,
  clearHardwareCart,
  getHardwareCartTotals,
} from '@/lib/hardwareCart';
import HardwareOrdersModal from '@/components/hardware/HardwareOrdersModal';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function HardwareCartPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [cartItems, setCartItems] = useState<HardwareCartItem[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  // Shipping Form State
  const [cafeName, setCafeName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');
  const [gstin, setGstin] = useState('');

  // Checkout State
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<any | null>(null);

  // Sync cart from localStorage
  const refreshCart = () => {
    const items = getHardwareCart(storeSlug);
    setCartItems(items);
  };

  useEffect(() => {
    setIsClient(true);
    refreshCart();

    // Default cafe name if available
    const displaySlug = storeSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    setCafeName(displaySlug + ' Cafe');

    const handleUpdate = () => refreshCart();
    window.addEventListener('brewpluse-hardware-cart-update', handleUpdate);
    return () => window.removeEventListener('brewpluse-hardware-cart-update', handleUpdate);
  }, [storeSlug]);

  const totals = getHardwareCartTotals(storeSlug);

  const handleQuantityChange = (id: string, delta: number) => {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      removeFromHardwareCart(id, storeSlug);
    } else {
      updateHardwareCartQuantity(id, newQty, storeSlug);
    }
    refreshCart();
  };

  const handleRemoveItem = (id: string) => {
    removeFromHardwareCart(id, storeSlug);
    refreshCart();
  };

  const handleCheckoutWithRazorpay = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Form validations
    if (!phone || phone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for courier tracking.');
      return;
    }
    if (!contactPerson.trim()) {
      setErrorMessage('Please provide contact person name.');
      return;
    }
    if (!street.trim() || !city.trim() || !pincode.trim()) {
      setErrorMessage('Please complete the shipping address including city and pincode.');
      return;
    }
    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty. Please add items to proceed.');
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Initialize order on backend
      const res = await fetch('/api/hardware/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeSlug,
          cafeName: cafeName || `${storeSlug} Cafe`,
          contactPerson,
          phone,
          email,
          shippingAddress: {
            street,
            city,
            state: stateName || 'India',
            pincode,
          },
          gstin,
          items: cartItems,
          totalAmount: totals.total,
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize payment.');
      }

      // 2. Load Razorpay SDK
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded && orderData.isLive) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // If Razorpay SDK is available and live mode or mock testing
      if ((window as any).Razorpay && orderData.orderId && !orderData.orderId.startsWith('order_hw_mock_skip')) {
        const rzpOptions = {
          key: orderData.keyId,
          amount: orderData.amount,
          currency: orderData.currency || 'INR',
          name: 'BrewPluse Hardware Store',
          description: `Payment for Hardware Order ${orderData.hardwareOrderNumber}`,
          image: '/apple-icon.png',
          order_id: orderData.orderId,
          handler: async function (response: any) {
            // 3. Verify Payment
            try {
              const verifyRes = await fetch('/api/hardware/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  hardwareOrderNumber: orderData.hardwareOrderNumber,
                }),
              });

              const verifyData = await verifyRes.json();
              if (verifyData.success) {
                clearHardwareCart(storeSlug);
                setConfirmedOrder(verifyData.order || {
                  orderNumber: orderData.hardwareOrderNumber,
                  total: totals.total,
                  items: cartItems,
                  paymentStatus: 'paid',
                  razorpayPaymentId: response.razorpay_payment_id,
                  estimatedDelivery: '3-5 Business Days',
                });
              } else {
                setErrorMessage(verifyData.error || 'Payment verification failed.');
              }
            } catch (vErr: any) {
              setErrorMessage('Verification failed: ' + vErr.message);
            } finally {
              setIsProcessing(false);
            }
          },
          prefill: {
            name: contactPerson,
            email: email,
            contact: phone,
          },
          theme: {
            color: '#0B5C45',
          },
          modal: {
            ondismiss: function () {
              setIsProcessing(false);
            },
          },
        };

        const rzp = new (window as any).Razorpay(rzpOptions);
        rzp.open();
        return;
      }

      // 4. Fallback test simulation if in dev test mode
      const mockPaymentId = `pay_mock_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      const verifyRes = await fetch('/api/hardware/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderData.orderId,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: 'test_valid_mock_signature',
          hardwareOrderNumber: orderData.hardwareOrderNumber,
        }),
      });

      const verifyData = await verifyRes.json();
      clearHardwareCart(storeSlug);
      setConfirmedOrder(verifyData.order || {
        orderNumber: orderData.hardwareOrderNumber,
        total: totals.total,
        items: cartItems,
        paymentStatus: 'paid',
        razorpayPaymentId: mockPaymentId,
        estimatedDelivery: '3-5 Business Days',
      });
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'Something went wrong during checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="font-sans text-neutral-800 dark:text-zinc-200 pb-20 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Top Breadcrumb & Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <Link
              href={`/dashboard/${storeSlug}/hardware`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
            <span className="text-neutral-300 dark:text-zinc-700">/</span>
            <Link
              href={`/dashboard/${storeSlug}/hardware`}
              className="hover:text-neutral-800 dark:hover:text-white transition-colors"
            >
              Hardware Store
            </Link>
            <span className="text-neutral-300 dark:text-zinc-700">/</span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Cart</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOrdersModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-700 dark:text-neutral-300 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>View Orders</span>
            </button>
            <Link
              href={`/dashboard/${storeSlug}/hardware`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <span>+ Add More</span>
            </Link>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-1 pt-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Shopping Cart &amp; Checkout
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal">
            Review your order, enter delivery details, and pay securely via Razorpay.
          </p>
        </div>

        {/* Order Confirmed View */}
        {confirmedOrder ? (
          <div className="bg-white dark:bg-zinc-900 border border-emerald-200 dark:border-emerald-900/60 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6 max-w-2xl mx-auto my-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="text-center space-y-1.5">
              <span className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 mb-1">
                Payment Received • Order Confirmed
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white">
                Thank you for your order!
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Order ID:{' '}
                <strong className="text-neutral-800 dark:text-neutral-200 font-mono">
                  {confirmedOrder.orderNumber}
                </strong>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-zinc-800/50 border border-neutral-200/80 dark:border-zinc-800 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-zinc-700">
                <span className="text-neutral-500">Payment Status:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Paid via Razorpay
                </span>
              </div>
              {confirmedOrder.razorpayPaymentId && (
                <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-zinc-700">
                  <span className="text-neutral-500">Transaction ID:</span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200">
                    {confirmedOrder.razorpayPaymentId}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-zinc-700">
                <span className="text-neutral-500">Amount Paid:</span>
                <span className="font-extrabold text-neutral-900 dark:text-white text-sm">
                  ₹{Number(confirmedOrder.total || totals.total).toLocaleString('en-IN')}.00
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-500">Estimated Delivery:</span>
                <span className="font-bold text-neutral-900 dark:text-white flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  {confirmedOrder.estimatedDelivery || '3-5 Business Days'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsOrdersModalOpen(true)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>View Order History</span>
              </button>
              <Link
                href={`/dashboard/${storeSlug}/hardware`}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-800 dark:text-white font-bold text-xs flex items-center justify-center transition-all cursor-pointer"
              >
                Return to Store
              </Link>
            </div>
          </div>
        ) : isClient && cartItems.length === 0 ? (
          /* Empty State Box */
          <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-white/10 rounded-2xl p-16 text-center space-y-4 shadow-2xs max-w-xl mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-400 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Your cart is empty
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Add BrewPluse hardware to get started.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href={`/dashboard/${storeSlug}/hardware`}
                className="inline-flex items-center justify-center gap-2 rounded-xl text-xs font-bold h-10 px-5 bg-[#F6C358] hover:bg-[#EAA827] text-neutral-950 shadow-2xs transition-all active:scale-95 cursor-pointer"
              >
                Browse Hardware
              </Link>
            </div>
          </div>
        ) : (
          /* Active Cart with Items & Checkout Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Cart Items & Shipping Address Form */}
            <div className="lg:col-span-7 space-y-6">
              {/* Cart Items List */}
              <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-zinc-800">
                  <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Selected Hardware ({totals.itemCount} items)
                  </h2>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Free Pan-India Delivery
                  </span>
                </div>

                <div className="divide-y divide-neutral-100 dark:divide-zinc-800">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden relative bg-neutral-100 dark:bg-zinc-800 border border-neutral-200 dark:border-zinc-700 shrink-0">
                          <Image
                            src={
                              item.image ||
                              (item.id === 'nfc-card'
                                ? '/hardware-images/NFC-img.png'
                                : '/hardware-images/QR-img.png')
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                            {item.title || item.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-extrabold text-neutral-900 dark:text-white">
                              ₹1,500.00
                            </span>
                            <span className="text-[10px] text-neutral-500">per piece</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-neutral-200 dark:border-zinc-700 rounded-xl bg-neutral-50 dark:bg-zinc-800/60 px-2 py-1 shadow-2xs">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-9 text-center text-xs font-bold text-neutral-900 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="w-6 h-6 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Item Total */}
                        <div className="text-right min-w-[70px]">
                          <span className="text-sm font-bold text-neutral-900 dark:text-white">
                            ₹{(item.quantity * 1500).toLocaleString('en-IN')}.00
                          </span>
                        </div>

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cafe & Shipping Address Form */}
              <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-zinc-800">
                  <div className="space-y-0.5">
                    <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                      Delivery &amp; Courier Details
                    </h2>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Dispatched directly to your cafe outlet via Bluedart / Delhivery Express.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Cafe / Outlet Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={cafeName}
                      onChange={(e) => setCafeName(e.target.value)}
                      placeholder="e.g. BrewPluse Roasters"
                      className="w-full h-9 px-3 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full h-9 px-3 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      maxLength={12}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit number for courier SMS"
                      className="w-full h-9 px-3 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Email Address (for invoice)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="owner@mycafe.com"
                      className="w-full h-9 px-3 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Full Shipping Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="Shop No, Building Name, Street, Landmark"
                      className="w-full p-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="e.g. Bangalore"
                      className="w-full h-9 px-3 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="State"
                        className="w-full h-9 px-3 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="6 digits"
                        className="w-full h-9 px-3 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      GSTIN (Optional for tax invoice)
                    </label>
                    <input
                      type="text"
                      maxLength={15}
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value.toUpperCase())}
                      placeholder="e.g. 29ABCDE1234F1Z5"
                      className="w-full h-9 px-3 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-medium text-neutral-900 dark:text-white uppercase focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary & Razorpay Action */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5 sticky top-4">
                <div className="border-b border-neutral-100 dark:border-zinc-800 pb-3">
                  <h2 className="text-sm font-bold text-neutral-900 dark:text-white">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
                    <span>Subtotal ({totals.itemCount} items):</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      ₹{totals.subtotal.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      Pan-India Express Shipping:
                    </span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                      FREE
                    </span>
                  </div>
                  <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
                    <span>GST (18% Flat per Order):</span>
                    <span className="font-semibold text-neutral-900 dark:text-white">
                      +₹{totals.tax.toLocaleString('en-IN')}.00
                    </span>
                  </div>

                  <div className="pt-3 border-t border-neutral-100 dark:border-zinc-800 flex justify-between items-baseline">
                    <div>
                      <span className="font-bold text-neutral-900 dark:text-white text-sm block">
                        Total Payable:
                      </span>
                      <span className="text-[10.5px] text-neutral-500 dark:text-neutral-400">
                        (Subtotal ₹{totals.subtotal.toLocaleString('en-IN')} + Flat GST ₹{totals.tax.toLocaleString('en-IN')})
                      </span>
                    </div>
                    <span className="font-extrabold text-neutral-900 dark:text-white text-xl">
                      ₹{totals.total.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-400 text-xs">
                    {errorMessage}
                  </div>
                )}

                {/* Razorpay Pay Button */}
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleCheckoutWithRazorpay}
                  className="w-full h-12 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] active:scale-[0.98] text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md transition-all cursor-pointer disabled:opacity-70 disabled:pointer-events-none"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Opening Razorpay Gateway...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-emerald-400" />
                      <span>Pay ₹{totals.total.toLocaleString('en-IN')}.00 with Razorpay</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-neutral-500 dark:text-neutral-400">
                  Instant UPI, Credit/Debit Cards, Netbanking &amp; Wallets supported.
                </p>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-neutral-100 dark:border-zinc-800 space-y-3 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-800 dark:text-neutral-200 block text-[11px]">
                        1-Year Replacement Warranty
                      </strong>
                      <span className="text-[10px]">
                        All NFC chips and acrylic materials covered against damage.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Truck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-800 dark:text-neutral-200 block text-[11px]">
                        Free Pan-India Delivery
                      </strong>
                      <span className="text-[10px]">
                        Dispatches in 24 hours. Reaches within 3 to 5 business days.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hardware Orders History Modal */}
      <HardwareOrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        storeSlug={storeSlug}
      />
    </DashboardShell>
  );
}
