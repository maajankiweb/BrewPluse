'use client';

import React from 'react';
import Link from 'next/link';
import {
  Coffee,
  Check,
  Building2,
  Soup,
  QrCode,
  Play,
  Receipt,
  ArrowUpRight,
  CircleDollarSign,
  TrendingUp,
  ShoppingBag,
  Clock,
  ChevronRight,
  ListOrdered,
  Calculator,
  UtensilsCrossed,
  Package,
} from 'lucide-react';
import { useDemo } from './demoContext';

export default function DemoDashboardPage() {
  const { orders, tables, menuItems } = useDemo();

  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.total, 0);

  const activeOrdersCount = orders.filter((o) => o.status === 'preparing' || o.status === 'ready').length;
  const occupiedTablesCount = tables.filter((t) => t.status === 'occupied').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12 animate-fade-in">
      {/* 1. Welcome Card */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 sm:p-8 lg:p-10 relative overflow-hidden flex items-center shadow-xs">
        <div className="z-10 relative space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive Demo Mode</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#141210] dark:text-white tracking-tight flex items-center gap-2.5">
            Welcome to BrewPluse <span className="animate-bounce inline-block">☕</span>
          </h1>
          <p className="text-[#686259] dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
            Your high-speed cafe operating system. Experience zero monthly software fees, lightning-fast POS billing, integrated KDS, and table QR ordering.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/demo/pos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <Calculator className="w-4 h-4" />
              <span>Launch POS Billing</span>
            </Link>
            <Link
              href="/demo/orders"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-100 dark:bg-zinc-800 hover:bg-neutral-200 dark:hover:bg-zinc-700 text-[#141210] dark:text-white text-xs font-bold transition-all"
            >
              <ListOrdered className="w-4 h-4 text-amber-500" />
              <span>View Active Orders ({activeOrdersCount})</span>
            </Link>
          </div>
        </div>

        {/* Ambient watermark illustration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-neutral-50/80 dark:from-zinc-900/40 to-transparent pointer-events-none hidden sm:flex items-center justify-end pr-8 lg:pr-14">
          <Coffee className="w-32 h-32 lg:w-48 lg:h-48 text-[#141210]/5 dark:text-white/5" />
        </div>
      </div>

      {/* 2. Setup Progress Tracker (4 Steps) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#141210] dark:text-white">Store Setup Progress</h2>
          <span className="text-xs font-semibold text-[#686259] dark:text-zinc-400">
            3 of 4 completed (75%)
          </span>
        </div>

        <div className="w-full h-1.5 bg-[#ebe8e3] dark:bg-[#222225] rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: '75%' }}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
          {/* Step 1 */}
          <Link
            href="/demo/settings/business-profile"
            className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-4 flex flex-col gap-3 shadow-2xs hover:border-emerald-500 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Building2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="font-bold text-[#141210] dark:text-white text-xs mb-1 group-hover:text-emerald-600 transition-colors">
                Cafe Profile
              </h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <Check className="w-3 h-3" />
                <span>Configured</span>
              </div>
            </div>
          </Link>

          {/* Step 2 */}
          <Link
            href="/demo/menu"
            className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-4 flex flex-col gap-3 shadow-2xs hover:border-emerald-500 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <Soup className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="font-bold text-[#141210] dark:text-white text-xs mb-1 group-hover:text-emerald-600 transition-colors">
                Menu ({menuItems.length} items)
              </h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <Check className="w-3 h-3" />
                <span>Live Catalog</span>
              </div>
            </div>
          </Link>

          {/* Step 3 */}
          <Link
            href="/demo/tables"
            className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-4 flex flex-col gap-3 shadow-2xs hover:border-emerald-500 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <QrCode className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="font-bold text-[#141210] dark:text-white text-xs mb-1 group-hover:text-emerald-600 transition-colors">
                Tables &amp; QR
              </h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <Check className="w-3 h-3" />
                <span>Ready to Scan</span>
              </div>
            </div>
          </Link>

          {/* Step 4 */}
          <Link
            href="/demo/pos"
            className="bg-white dark:bg-[#121214] border border-amber-300 dark:border-amber-700/50 rounded-2xl p-4 flex flex-col gap-3 shadow-2xs hover:border-amber-500 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Play className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="font-bold text-[#141210] dark:text-white text-xs mb-1 group-hover:text-amber-600 transition-colors">
                Test First Order
              </h3>
              <div className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <span>Try Demo POS</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 3. BrewPluse Transparent Usage Meter Banner */}
      <div className="bg-gradient-to-br from-amber-500/5 via-amber-500/10 to-transparent border border-amber-500/20 rounded-[22px] p-6 shadow-2xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <Receipt className="w-5 h-5 text-amber-500 shrink-0" />
            <h2 className="text-base font-bold text-[#141210] dark:text-white">BrewPluse Usage Account</h2>
            <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Active Tier
            </span>
            <span className="text-[10px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
              ₹1.00 / order
            </span>
          </div>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Pay-as-you-grow cafe software. No monthly software subscriptions, no locked features. Only ₹1 applies per processed order.
          </p>
        </div>

        <div className="flex items-center gap-6 w-full lg:w-auto justify-between lg:justify-end flex-wrap">
          <div>
            <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono">Outstanding Usage</span>
            <div className="flex items-baseline gap-1.5">
              <p className="text-2xl font-black leading-tight text-amber-600 dark:text-amber-400">₹0.00</p>
              <span className="text-xs font-bold text-neutral-400">/ ₹200.00</span>
            </div>
            <div className="w-28 h-1.5 bg-neutral-200 dark:bg-white/10 rounded-full mt-1.5 overflow-hidden">
              <div className="h-full rounded-full bg-emerald-500" style={{ width: '0%' }} />
            </div>
          </div>

          <div className="hidden sm:block">
            <span className="text-[10px] uppercase font-bold text-neutral-400 font-mono">Eligible Orders</span>
            <p className="text-xl font-black text-[#141210] dark:text-white leading-tight">{orders.length}</p>
            <span className="text-[10px] text-neutral-400">Across POS &amp; QR</span>
          </div>

          <Link
            href="/demo/usage"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-2xs bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90"
          >
            <span>View Usage Details</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4. Operational Metrics (Sales, Active Orders, Occupancy, Items) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#686259] dark:text-zinc-400">Today&apos;s Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#141210] dark:text-white">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% vs yesterday</span>
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#686259] dark:text-zinc-400">Active Kitchen Orders</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#141210] dark:text-white">{activeOrdersCount}</p>
            <p className="text-[11px] text-[#686259] dark:text-zinc-400 font-semibold mt-1">
              Average ticket: 6.2 mins
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#686259] dark:text-zinc-400">Table Occupancy</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#141210] dark:text-white">
              {occupiedTablesCount} <span className="text-sm font-normal text-zinc-400">/ {tables.length}</span>
            </p>
            <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
              {Math.round((occupiedTablesCount / tables.length) * 100)}% live dine-in capacity
            </p>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#686259] dark:text-zinc-400">Catalog Menu Items</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#141210] dark:text-white">{menuItems.length}</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
              All items in-stock &amp; sync&apos;d
            </p>
          </div>
        </div>
      </div>

      {/* 5. Live Orders & Quick Actions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Orders */}
        <div className="lg:col-span-8 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#ebe8e3] dark:border-[#222225] mb-4">
            <div>
              <h2 className="text-base font-bold text-[#141210] dark:text-white">Live Operations Feed</h2>
              <p className="text-xs text-[#686259] dark:text-zinc-400">Most recent dining &amp; takeaway tickets</p>
            </div>
            <Link
              href="/demo/orders"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#ebe8e3] dark:border-[#222225] hover:bg-neutral-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs font-mono ${
                      order.status === 'preparing'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                        : order.status === 'ready'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                    }`}
                  >
                    {order.orderNumber.replace('BP-', '#')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#141210] dark:text-white">
                        {order.table}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-zinc-800 text-zinc-500">
                        {order.paymentMode}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#686259] dark:text-zinc-400 truncate max-w-xs">
                      {order.items.map((i) => `${i.quantity}x ${i.item.name}`).join(', ')}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-xs font-bold text-[#141210] dark:text-white">
                    ₹{order.total.toFixed(2)}
                  </p>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'preparing'
                        ? 'text-amber-600'
                        : order.status === 'ready'
                        ? 'text-blue-600'
                        : 'text-emerald-600'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quick Shortcuts */}
        <div className="lg:col-span-4 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-[#141210] dark:text-white">Quick Tools</h2>

          <div className="space-y-2.5">
            <Link
              href="/demo/pos"
              className="flex items-center justify-between p-3 rounded-xl border border-[#ebe8e3] dark:border-[#222225] hover:border-amber-400 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Calculator className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-[#141210] dark:text-white group-hover:text-amber-600">
                  New POS Order
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/demo/kds"
              className="flex items-center justify-between p-3 rounded-xl border border-[#ebe8e3] dark:border-[#222225] hover:border-amber-400 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Soup className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-[#141210] dark:text-white group-hover:text-amber-600">
                  Kitchen Display (KDS)
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/demo/tv-menu"
              className="flex items-center justify-between p-3 rounded-xl border border-[#ebe8e3] dark:border-[#222225] hover:border-amber-400 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <UtensilsCrossed className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-bold text-[#141210] dark:text-white group-hover:text-amber-600">
                  Digital TV Menu Board
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/demo/inventory"
              className="flex items-center justify-between p-3 rounded-xl border border-[#ebe8e3] dark:border-[#222225] hover:border-amber-400 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-[#141210] dark:text-white group-hover:text-amber-600">
                  Raw Inventory Stock
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              href="/demo/hardware"
              className="flex items-center justify-between p-3 rounded-xl border border-[#ebe8e3] dark:border-[#222225] hover:border-amber-400 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold text-[#141210] dark:text-white group-hover:text-amber-600">
                  Hardware &amp; QR Stands
                </span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
