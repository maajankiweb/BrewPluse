'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  SquareCheckBig,
  ExternalLink,
  MapPin,
  Globe,
  Minus,
  Plus,
  ShieldCheck,
  Smartphone,
  Share2,
  CircleCheck,
  Package,
  Truck,
  RotateCcw,
  Heart,
} from 'lucide-react';
import {
  addToHardwareCart,
  getHardwareCartCount,
} from '@/lib/hardwareCart';

export default function NfcCardDetailPage() {
  const routeParams = useParams();
  const router = useRouter();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [quantity, setQuantity] = useState(1);
  const [cartAdded, setCartAdded] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const unitPrice = 1500;
  const subtotal = quantity * unitPrice;

  useEffect(() => {
    setCartCount(getHardwareCartCount(storeSlug));
    const handleUpdate = () => {
      setCartCount(getHardwareCartCount(storeSlug));
    };
    window.addEventListener('brewpluse-hardware-cart-update', handleUpdate);
    return () => window.removeEventListener('brewpluse-hardware-cart-update', handleUpdate);
  }, [storeSlug]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 50) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToHardwareCart({ id: 'nfc-card', quantity }, storeSlug);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToHardwareCart({ id: 'nfc-card', quantity }, storeSlug);
    router.push(`/dashboard/${storeSlug}/hardware/cart`);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="font-sans text-neutral-800 dark:text-zinc-200 pb-20 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
        {/* Top Breadcrumb & Cart Header */}
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
              className="hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              Store
            </Link>
            <span className="text-neutral-300 dark:text-zinc-700">/</span>
            <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[180px] sm:max-w-none">
              NFC Card
            </span>
          </div>

          <Link
            href={`/dashboard/${storeSlug}/hardware/cart`}
            className="relative h-9 px-3.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-500" />
            <span className="text-xs">Cart</span>
            {cartCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#10B981] text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-900 shadow-2xs group">
              <Image
                src="/hardware-images/NFC-img.png"
                alt="NFC Card"
                fill
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3.5 left-3.5 pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-amber-400 border border-white/15 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                  NFC Card
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                className="relative w-16 h-16 rounded-xl overflow-hidden border-2 bg-neutral-100 dark:bg-zinc-800 shrink-0 transition-all cursor-pointer border-amber-500 ring-2 ring-amber-500/20 shadow-2xs scale-[1.02]"
              >
                <Image
                  src="/hardware-images/NFC-img.png"
                  alt="Product Photo"
                  fill
                  className="w-full h-full object-cover"
                />
              </button>
              <button
                type="button"
                className="relative w-16 h-16 rounded-xl overflow-hidden border-2 bg-neutral-100 dark:bg-zinc-800 shrink-0 transition-all cursor-pointer border-neutral-200 dark:border-zinc-700 opacity-70 hover:opacity-100 hover:border-neutral-400"
              >
                <Image
                  src="/hardware-images/NFC-img.png"
                  alt="Video Demo"
                  fill
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-amber-500 text-neutral-950 flex items-center justify-center">
                    <span className="text-[10px] font-bold leading-none">▶</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Details & Purchase Box */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                In Stock
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Official Hardware
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight">
                NFC Card
              </h1>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                  ₹1,500.00
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  per custom card
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
                Tap, connect, explore. Share your menu, reviews, and social profiles with just a tap.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <SquareCheckBig className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">Custom BrewPluse Business Profile</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">One-tap Instagram &amp; WhatsApp</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">Google Maps &amp; Reviews</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">Update links anytime</span>
              </div>
            </div>

            {/* Stepper & Buy Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 shadow-2xs space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  Quantity to order:
                </span>
                <div className="flex items-center border border-neutral-200 dark:border-zinc-700 rounded-xl bg-neutral-50 dark:bg-zinc-800/60 px-2 py-1 shadow-2xs">
                  <button
                    type="button"
                    onClick={handleDecrease}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    min={1}
                    max={50}
                    className="w-12 text-center text-xs font-bold text-neutral-900 dark:text-white bg-transparent focus:outline-none"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.max(1, Math.min(50, val)));
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleIncrease}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-neutral-100 dark:border-zinc-800 text-xs">
                <span className="text-neutral-500 font-medium">Order Subtotal:</span>
                <span className="font-bold text-neutral-900 dark:text-white text-base">
                  ₹{subtotal.toLocaleString('en-IN')}.00
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="h-11 px-4 rounded-xl bg-[#F6C358] hover:bg-[#EAA827] active:scale-[0.98] text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-neutral-900" />
                  <span>{cartAdded ? 'Added to Cart ✓' : 'Add to Cart'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="h-11 px-4 rounded-xl border border-neutral-200/90 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 active:scale-[0.98] text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center shadow-2xs transition-all cursor-pointer"
                >
                  <span>Buy Now • ₹{subtotal.toLocaleString('en-IN')}.00</span>
                </button>
              </div>

              <div className="pt-2 border-t border-neutral-100 dark:border-zinc-800 flex items-start gap-2.5 text-[11px] text-neutral-500 dark:text-neutral-400">
                <ShieldCheck className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-700 dark:text-neutral-300 block">
                    Secure &amp; Trusted
                  </span>
                  <span>Your payment is securely processed. Your order details are protected.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Overview */}
        <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Product Overview</h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-3xl leading-relaxed">
              The BrewPluse NFC Business Card helps your customers instantly discover your cafe, view your menu,
              follow your social media, and leave Google reviews — all with a simple tap.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-neutral-100 dark:border-zinc-800">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Tap to Connect</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Just tap with any NFC-enabled iPhone or Android phone.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
                <Share2 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Social Media Links</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Share Instagram, WhatsApp, Facebook &amp; more.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Google Reviews</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Help your business grow with fast 5-star customer reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Why BrewPluse? */}
        <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5 space-y-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Why BrewPluse?</h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Our official NFC hardware is custom engineered to pair seamlessly with your BrewPluse digital profile.
              Setup takes seconds with no technical complexity.
            </p>
          </div>
          <div className="md:col-span-7 space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Easy setup — no technical knowledge required</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Works with all NFC-enabled smartphones</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Custom profile with your cafe branding</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Live updates to your links and content</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Durable, waterproof and long-lasting</span>
            </div>
          </div>
        </div>

        {/* Hardware Specifications */}
        <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-neutral-500" />
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Hardware Specifications</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 divide-y divide-neutral-100 dark:divide-zinc-800 text-xs">
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Material</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">
                  High quality matte PVC
                </span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Size</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">
                  85 × 54 mm (credit card size)
                </span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Technology</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">
                  NFC (13.56 MHz, NTAG chip)
                </span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Durability</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">
                  Waterproof &amp; scratch resistant
                </span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Printing</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">
                  Full color, UV printed
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[220px] aspect-square rounded-2xl overflow-hidden border border-neutral-100 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-800/40 p-4 flex items-center justify-center relative">
                <Image
                  src="/hardware-images/NFC-img.png"
                  alt="NFC Card"
                  fill
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-lg font-bold text-neutral-900 dark:text-white">How It Works</h2>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Setup takes just a few minutes. No apps, no hassle.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            <div className="space-y-2.5 relative">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center border border-neutral-200/80 dark:border-zinc-700">
                1
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Tap</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Customer taps their phone on your NFC card.
              </p>
            </div>
            <div className="space-y-2.5 relative">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center border border-neutral-200/80 dark:border-zinc-700">
                2
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Explore</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                They instantly open your configured BrewPluse profile.
              </p>
            </div>
            <div className="space-y-2.5 relative">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center border border-neutral-200/80 dark:border-zinc-700">
                3
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Connect</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Access menu, social links, maps, and reviews.
              </p>
            </div>
            <div className="space-y-2.5 relative">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center border border-neutral-200/80 dark:border-zinc-700">
                4
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Grow</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                More visibility, more reviews, and higher customer loyalty.
              </p>
            </div>
          </div>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Fast Delivery</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Shipped directly to your cafe address.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Secure Payments</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              100% secure encrypted via Razorpay.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Ready to Use</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Pre-configured for instant cafe operation.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
              <Heart className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold text-neutral-900 dark:text-white">BrewPluse Support</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Dedicated hardware assistance &amp; support.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
