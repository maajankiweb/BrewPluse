'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ArrowLeft,
  ShoppingBag,
  Sparkles,
  Zap,
  Heart,
  TrendingUp,
  Minus,
  Plus,
  ShieldCheck,
  QrCode,
  Coffee,
  CircleCheck,
  Package,
  Truck,
  RotateCcw,
} from 'lucide-react';



export default function QrCodeStandDetailPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [quantity, setQuantity] = useState(10);
  const [cartAdded, setCartAdded] = useState(false);

  const unitPrice = 300;
  const subtotal = quantity * unitPrice;

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 500) setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
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
              QR Standee
            </span>
          </div>

          <Link
            href={`/dashboard/${storeSlug}/hardware/cart`}
            className="relative h-9 px-3.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-800 dark:text-neutral-200 font-semibold text-xs flex items-center gap-2 transition-colors shadow-2xs cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-500" />
            <span className="text-xs">Cart</span>
          </Link>
        </div>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-3">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full rounded-2xl overflow-hidden border border-neutral-200/80 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-900 shadow-2xs group">
              <Image
                src="/hardware-images/QR-img.png"
                alt="QR Standee"
                fill
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-3.5 left-3.5 pointer-events-none">
                <span className="bg-black/60 backdrop-blur-md text-amber-400 border border-white/15 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                  QR Table Stand
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 no-scrollbar">
              <button
                type="button"
                className="relative w-16 h-16 rounded-xl overflow-hidden border-2 bg-neutral-100 dark:bg-zinc-800 shrink-0 transition-all cursor-pointer border-amber-500 ring-2 ring-amber-500/20 shadow-2xs scale-[1.02]"
              >
                <Image
                  src="/hardware-images/QR-img.png"
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
                  src="/hardware-images/QR-img.png"
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
                QR Standee
              </h1>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
                  ₹300.00
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                  per table stand
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed pt-1">
                Stylish and durable QR standee for easy contactless table ordering.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <Zap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">Contactless table ordering</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <Heart className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">Pre-linked to floor tables</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">Accelerate order turnaround</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium">Crystal clear durable acrylic</span>
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
                    max={500}
                    className="w-12 text-center text-xs font-bold text-neutral-900 dark:text-white bg-transparent focus:outline-none"
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.max(1, Math.min(500, val)));
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
              The BrewPluse QR Table Stand enables seamless contactless dining at every table. Guests scan with
              their phone camera to browse your live menu and place orders instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 border-t border-neutral-100 dark:border-zinc-800">
            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
                <QrCode className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Scan to Order</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Instant camera scanning with no app download required.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
                <Coffee className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Live Table Sync</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Pre-configured for each dining table in your cafe.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-300 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Boost Order Speed</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Eliminates ordering bottlenecks during peak hours.
              </p>
            </div>
          </div>
        </div>

        {/* Why BrewPluse? */}
        <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5 space-y-2">
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Why BrewPluse?</h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Our official QR hardware syncs directly with BrewPluse table management, KDS, and billing for zero lag
              in high volume service.
            </p>
          </div>
          <div className="md:col-span-7 space-y-2.5">
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Easy setup — pre-linked to your dining tables</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Works with standard smartphone cameras</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Direct integration with BrewPluse POS &amp; KDS</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Live updates to digital menu anytime</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
              <CircleCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="font-medium">Sturdy, wipe-clean heavy acrylic base</span>
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
                  Cast crystal clear acrylic
                </span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Size</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">
                  105 × 148 mm (A6 upright L-stand)
                </span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Technology</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">
                  High-contrast QR matrix
                </span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Durability</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">
                  Wipe-clean waterproof acrylic
                </span>
              </div>
              <div className="py-3 flex justify-between items-center gap-4">
                <span className="text-neutral-500 dark:text-neutral-400 font-medium">Printing</span>
                <span className="font-bold text-neutral-900 dark:text-white text-right">
                  High-resolution UV printed
                </span>
              </div>
            </div>
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[220px] aspect-square rounded-2xl overflow-hidden border border-neutral-100 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-800/40 p-4 flex items-center justify-center relative">
                <Image
                  src="/hardware-images/QR-img.png"
                  alt="QR Standee"
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
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Scan</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Customer scans table QR code with their camera.
              </p>
            </div>
            <div className="space-y-2.5 relative">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center border border-neutral-200/80 dark:border-zinc-700">
                2
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Explore</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                They view your live digital menu with table assigned.
              </p>
            </div>
            <div className="space-y-2.5 relative">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center border border-neutral-200/80 dark:border-zinc-700">
                3
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Order</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Orders sent directly to kitchen and cashier POS.
              </p>
            </div>
            <div className="space-y-2.5 relative">
              <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-bold text-xs flex items-center justify-center border border-neutral-200/80 dark:border-zinc-700">
                4
              </div>
              <h3 className="text-xs font-bold text-neutral-900 dark:text-white">Grow</h3>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Faster table turnover and higher order volume.
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
