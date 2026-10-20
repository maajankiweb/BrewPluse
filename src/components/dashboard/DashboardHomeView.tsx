'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Building2,
  Soup,
  QrCode,
  Play,
  ShoppingBag,
  TrendingUp,
  Table2,
  ChevronRight,
  Calculator,
  Package,
  Activity,
  Receipt,
  Clock,
  ArrowRight,
  Coffee,
  Check,
  ShieldCheck,
  Landmark,
} from 'lucide-react';
import PlatformBillingSettlementCard from '@/components/dashboard/PlatformBillingSettlementCard';

interface DashboardHomeViewProps {
  storeSlug?: string;
  isDemo?: boolean;
}

export default function DashboardHomeView({
  storeSlug = 'brewpluse',
  isDemo = false,
}: DashboardHomeViewProps) {
  const cafeDisplayName = storeSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const [userName, setUserName] = useState(isDemo ? 'Demo Cafe' : cafeDisplayName);
  const [timeFilter, setTimeFilter] = useState<'hourly' | '7days'>('hourly');
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const [checklist, setChecklist] = useState({
    profile: false,
    menu: false,
    tables: false,
    order: false,
  });

  const [realStats, setRealStats] = useState({
    ordersCount: 0,
    todayRevenue: 0,
    totalRevenue: 0,
    platformFeeDue: 0,
    platformFeeMode: 'cafe',
  });

  useEffect(() => {
    if (!isDemo) {
      try {
        const storeProfileRaw = localStorage.getItem('brewpluse::store_profile');
        if (storeProfileRaw) {
          const profile = JSON.parse(storeProfileRaw);
          if ((profile.slug === storeSlug || !profile.slug) && profile.name) {
            setUserName(profile.name);
          }
        } else {
          setUserName(cafeDisplayName);
        }

        // Check real progress on fresh store
        const hasProfile = Boolean(storeProfileRaw && JSON.parse(storeProfileRaw)?.name);
        const menuRaw = localStorage.getItem('brewpluse::menu_items');
        const hasMenu = Boolean(menuRaw && JSON.parse(menuRaw)?.length > 0);
        const tablesRaw = localStorage.getItem(`brewpluse::tables_${storeSlug}`) || localStorage.getItem('brewpluse::tables');
        const hasTables = Boolean(tablesRaw && JSON.parse(tablesRaw)?.length > 0);
        const ordersRaw = localStorage.getItem('brewpluse::orders');
        const localOrders = ordersRaw ? JSON.parse(ordersRaw) : [];
        const hasOrders = Boolean(localOrders?.length > 0);

        setChecklist({
          profile: hasProfile,
          menu: hasMenu,
          tables: hasTables,
          order: hasOrders,
        });

        // Compute local order metrics first
        if (localOrders.length > 0) {
          let sum = 0;
          localOrders.forEach((o: any) => {
            sum += Number(o.total) || 0;
          });
          setRealStats((prev) => ({
            ...prev,
            ordersCount: localOrders.length,
            todayRevenue: sum,
            totalRevenue: sum,
            platformFeeDue: localOrders.length,
          }));
        }
      } catch (e) {
        setUserName(cafeDisplayName);
      }

      // Fetch API orders to get complete server metrics
      fetch(`/api/orders?storeId=${storeSlug}&limit=100`)
        .then((r) => r.json())
        .then((data) => {
          if (data && Array.isArray(data.orders) && data.orders.length > 0) {
            let rev = 0;
            data.orders.forEach((o: any) => {
              rev += Number(o.total) || 0;
            });
            setRealStats((prev) => ({
              ...prev,
              ordersCount: data.orders.length,
              todayRevenue: rev,
              totalRevenue: rev,
            }));
            setChecklist((prev) => ({ ...prev, order: true }));
          }
        })
        .catch(() => {});

      // Fetch platform billing status for accurate ledger due & fee mode
      fetch('/api/admin/platform-billing/status')
        .then((r) => r.json())
        .then((data) => {
          if (data?.billing) {
            setRealStats((prev) => ({
              ...prev,
              platformFeeDue: data.billing.accumulatedDueRupees ?? 0,
              platformFeeMode: data.billing.platformFeeMode || 'cafe',
            }));
          }
        })
        .catch(() => {});
    }
  }, [isDemo, storeSlug, cafeDisplayName]);

  const completedSteps = isDemo
    ? 1
    : Object.values(checklist).filter(Boolean).length;
  const progressPercent = isDemo
    ? 25
    : Math.round((completedSteps / 4) * 100);

  const basePath = isDemo ? '/dashboard/demo' : `/dashboard/${storeSlug}`;

  // Hourly chart points from 9 AM to 7 PM
  const hourlyData = isDemo
    ? [
        { time: '9 AM', value: 850 },
        { time: '10 AM', value: 1420 },
        { time: '11 AM', value: 2100 },
        { time: '12 PM', value: 3650 },
        { time: '1 PM', value: 4200 },
        { time: '2 PM', value: 2800 },
        { time: '3 PM', value: 1950 },
        { time: '4 PM', value: 3200 },
        { time: '5 PM', value: 4100 },
        { time: '6 PM', value: 3800 },
        { time: '7 PM', value: 2400 },
      ]
    : [
        { time: '9 AM', value: 0 },
        { time: '10 AM', value: 0 },
        { time: '11 AM', value: 0 },
        { time: '12 PM', value: 0 },
        { time: '1 PM', value: 0 },
        { time: '2 PM', value: 0 },
        { time: '3 PM', value: 0 },
        { time: '4 PM', value: 0 },
        { time: '5 PM', value: 0 },
        { time: '6 PM', value: 0 },
        { time: '7 PM', value: 0 },
      ];

  return (
    <div className="space-y-4">
      {/* 1. TOP GREETING & STATUS BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight flex items-center gap-2">
            <span>Good morning, {userName}</span>
            <span className="text-amber-500">☀️</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8]">
            Here&apos;s what&apos;s happening at your cafe today.
          </p>
        </div>

        <div className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] shadow-[0_2px_12px_rgba(6,47,35,0.025)]">
          <div className="space-y-0.5">
            <p className="text-xs font-bold text-[#12201B] dark:text-white">
              Great food. Happier customers.
            </p>
            <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8]">
              BrewPluse keeps everything running smoothly.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] border border-[#10B981]/20 text-[10.5px] font-bold text-[#087A5B] dark:text-[#10B981] shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            Operating normally
          </div>
        </div>
      </div>

      {/* PLATFORM BILLING & ₹200 SETTLEMENT MONITOR */}
      {!isDemo && <PlatformBillingSettlementCard storeSlug={storeSlug} />}

      {/* 2. SETUP CHECKLIST */}
      <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-3.5 shadow-[0_2px_12px_rgba(6,47,35,0.02)] space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#0B5C45] dark:text-[#10B981]" />
            <h2 className="text-xs font-bold text-[#12201B] dark:text-white uppercase tracking-wider">
              Setup Checklist
            </h2>
          </div>
          <span className="text-[10.5px] font-bold text-[#0B5C45] dark:text-[#10B981] bg-[#E8F6EF] dark:bg-[#142E25] px-2 py-0.5 rounded-full border border-[#10B981]/20">
            {completedSteps} of 4 completed
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-[#F2FAF6] dark:bg-[#14261F] rounded-full overflow-hidden border border-[#E5ECE8] dark:border-[#1E382E]">
          <div
            className="h-full bg-[#10B981] rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 4 Checklist Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-0.5">
          {/* Step 1: Cafe Profile */}
          <Link
            href={`${basePath}/settings/business-profile`}
            className="bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] rounded-lg p-2.5 flex items-center justify-between hover:border-[#10B981]/40 hover:bg-white dark:hover:bg-[#152B21] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-5.5 h-5.5 rounded-md flex items-center justify-center shrink-0 ${
                (isDemo || checklist.profile)
                  ? 'bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981]'
                  : 'bg-white dark:bg-[#0A1A14] text-[#8D9792] border border-[#E5ECE8] dark:border-[#1E382E]'
              }`}>
                <Building2 className="w-3 h-3" />
              </div>
              <span className="text-xs font-semibold text-[#12201B] dark:text-[#E8F6EF] truncate">
                Cafe profile
              </span>
            </div>
            {(isDemo || checklist.profile) ? (
              <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
            ) : (
              <div className="w-2 h-2 rounded-full border-2 border-[#8D9792] shrink-0" />
            )}
          </Link>

          {/* Step 2: Menu */}
          <Link
            href={`${basePath}/menu`}
            className="bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] rounded-lg p-2.5 flex items-center justify-between hover:border-[#10B981]/40 hover:bg-white dark:hover:bg-[#152B21] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-5.5 h-5.5 rounded-md flex items-center justify-center shrink-0 ${
                checklist.menu
                  ? 'bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981]'
                  : 'bg-white dark:bg-[#0A1A14] text-[#8D9792] border border-[#E5ECE8] dark:border-[#1E382E]'
              }`}>
                <Soup className="w-3 h-3" />
              </div>
              <span className="text-xs font-semibold text-[#12201B] dark:text-[#E8F6EF] truncate">
                Menu
              </span>
            </div>
            {checklist.menu ? (
              <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
            ) : (
              <div className="w-2 h-2 rounded-full border-2 border-[#8D9792] shrink-0" />
            )}
          </Link>

          {/* Step 3: Tables & QR */}
          <Link
            href={`${basePath}/tables`}
            className="bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] rounded-lg p-2.5 flex items-center justify-between hover:border-[#10B981]/40 hover:bg-white dark:hover:bg-[#152B21] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-5.5 h-5.5 rounded-md flex items-center justify-center shrink-0 ${
                checklist.tables
                  ? 'bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981]'
                  : 'bg-white dark:bg-[#0A1A14] text-[#8D9792] border border-[#E5ECE8] dark:border-[#1E382E]'
              }`}>
                <QrCode className="w-3 h-3" />
              </div>
              <span className="text-xs font-semibold text-[#12201B] dark:text-[#E8F6EF] truncate">
                Tables & QR
              </span>
            </div>
            {checklist.tables ? (
              <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
            ) : (
              <div className="w-2 h-2 rounded-full border-2 border-[#8D9792] shrink-0" />
            )}
          </Link>

          {/* Step 4: First Order */}
          <Link
            href={`${basePath}/pos`}
            className="bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] rounded-lg p-2.5 flex items-center justify-between hover:border-[#10B981]/40 hover:bg-white dark:hover:bg-[#152B21] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className={`w-5.5 h-5.5 rounded-md flex items-center justify-center shrink-0 ${
                checklist.order
                  ? 'bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981]'
                  : 'bg-white dark:bg-[#0A1A14] text-[#8D9792] border border-[#E5ECE8] dark:border-[#1E382E]'
              }`}>
                <Play className="w-3 h-3" />
              </div>
              <span className="text-xs font-semibold text-[#12201B] dark:text-[#E8F6EF] truncate">
                Test your first order
              </span>
            </div>
            {checklist.order ? (
              <Check className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
            ) : (
              <div className="w-2 h-2 rounded-full border-2 border-[#8D9792] shrink-0" />
            )}
          </Link>
        </div>
      </div>

      {/* 3. FOUR TOP METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5">
        {/* Card 1: Today's Orders */}
        <Link
          href={`${basePath}/orders`}
          className="group bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(6,47,35,0.03)] hover:-translate-y-0.5 hover:border-[#10B981]/40 hover:shadow-[0_6px_20px_rgba(6,47,35,0.05)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#0B5C45] dark:text-[#10B981] transition-transform group-hover:scale-105">
                <ShoppingBag className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-[#65736D] dark:text-[#9AB2A8]">
                Today&apos;s Orders
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#8D9792] group-hover:text-[#0B5C45] dark:group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-2.5">
            <p className="text-2xl sm:text-[26px] font-bold text-[#12201B] dark:text-white tracking-tight leading-none">
              {isDemo ? '42' : realStats.ordersCount}
            </p>
            <p className="text-xs font-medium text-[#65736D] dark:text-[#9AB2A8] mt-1">
              {isDemo ? (
                <span className="flex items-center gap-1">
                  <span className="text-[#0B8F68] font-bold">↑</span> Active & Completed
                </span>
              ) : (
                `${realStats.ordersCount} orders tracked`
              )}
            </p>
          </div>
        </Link>

        {/* Card 2: Today's Revenue */}
        <Link
          href={`${basePath}/orders`}
          className="group bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(6,47,35,0.03)] hover:-translate-y-0.5 hover:border-[#10B981]/40 hover:shadow-[0_6px_20px_rgba(6,47,35,0.05)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#0B5C45] dark:text-[#10B981] font-bold text-xs transition-transform group-hover:scale-105">
                ₹
              </div>
              <span className="text-xs font-medium text-[#65736D] dark:text-[#9AB2A8]">
                Today&apos;s Revenue
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#8D9792] group-hover:text-[#0B5C45] dark:group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-2.5">
            <p className="text-2xl sm:text-[26px] font-bold text-[#0B8F68] tracking-tight leading-none">
              {isDemo ? '₹18,450.00' : `₹${realStats.todayRevenue.toLocaleString()}`}
            </p>
            <p className="text-xs font-medium text-[#65736D] dark:text-[#9AB2A8] mt-1">
              {isDemo ? (
                <span className="flex items-center gap-1">
                  <span className="text-[#0B8F68] font-bold">↑</span> Gross Sales
                </span>
              ) : (
                'Gross sales today'
              )}
            </p>
          </div>
        </Link>

        {/* Card 3: Total Revenue */}
        <Link
          href={`${basePath}/billing`}
          className="group bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(6,47,35,0.03)] hover:-translate-y-0.5 hover:border-[#10B981]/40 hover:shadow-[0_6px_20px_rgba(6,47,35,0.05)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#0B5C45] dark:text-[#10B981] transition-transform group-hover:scale-105">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-[#65736D] dark:text-[#9AB2A8]">
                Total Revenue
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#8D9792] group-hover:text-[#0B5C45] dark:group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-2.5">
            <p className="text-2xl sm:text-[26px] font-bold text-[#12201B] dark:text-white tracking-tight leading-none">
              {isDemo ? '₹1,42,800.00' : `₹${realStats.totalRevenue.toLocaleString()}`}
            </p>
            <p className="text-xs font-medium text-[#65736D] dark:text-[#9AB2A8] mt-1">
              {isDemo ? (
                <span className="flex items-center gap-1">
                  <span className="text-[#0B8F68] font-bold">↑</span> Lifetime Sales
                </span>
              ) : (
                'Lifetime sales recorded'
              )}
            </p>
          </div>
        </Link>

        {/* Card 4: BrewPluse Fee Due / Active Ledger */}
        <Link
          href={`${basePath}/billing`}
          className="group bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(6,47,35,0.03)] hover:-translate-y-0.5 hover:border-[#10B981]/40 hover:shadow-[0_6px_20px_rgba(6,47,35,0.05)] transition-all duration-200 cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-bold text-xs transition-transform group-hover:scale-105">
                ₹1
              </div>
              <span className="text-xs font-medium text-[#65736D] dark:text-[#9AB2A8]">
                BrewPluse Fee Due
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-[#8D9792] group-hover:text-[#0B5C45] dark:group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all" />
          </div>
          <div className="mt-2.5">
            <p className="text-2xl sm:text-[26px] font-bold text-amber-600 dark:text-amber-400 tracking-tight leading-none">
              {isDemo ? '₹42' : `₹${realStats.platformFeeDue}`}
            </p>
            <p className="text-xs font-medium text-[#65736D] dark:text-[#9AB2A8] mt-1 flex items-center gap-1.5">
              <span>₹1 / order • Limit ₹200</span>
            </p>
          </div>
        </Link>
      </div>

      {/* DIRECT BANK EARNING & BREWPLUSE FEE TRANSPARENCY BREAKDOWN */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] shadow-[0_2px_12px_rgba(6,47,35,0.03)] space-y-3.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#E5ECE8] dark:border-[#1E382E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4.5 h-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#12201B] dark:text-white">
                  Direct Cafe Bank Earnings &amp; BrewPluse Fee Breakdown
                </h3>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/70 dark:bg-emerald-950/60 dark:text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-300/60">
                  0% Gateway Fee
                </span>
              </div>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                100% of customer payments go directly into your Cafe UPI bank account. Zero payment gateway commission!
              </p>
            </div>
          </div>

          <Link
            href={`${basePath}/settings/upi`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-xs shrink-0 self-start sm:self-auto cursor-pointer"
          >
            <span>Change Fee Bearer</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4-Column Financial Transparency Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200/80 dark:border-[#1E342B]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Gross Cafe Sales</p>
            <p className="text-lg font-black text-[#0B8F68] mt-1">
              {isDemo ? '₹18,450' : `₹${realStats.totalRevenue.toLocaleString()}`}
            </p>
            <p className="text-[10.5px] text-gray-500 mt-0.5">Direct to your bank UPI</p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200/80 dark:border-[#1E342B]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Orders Processed</p>
            <p className="text-lg font-black text-gray-900 dark:text-white mt-1">
              {isDemo ? '42' : realStats.ordersCount}
            </p>
            <p className="text-[10.5px] text-gray-500 mt-0.5">Tracked table &amp; POS orders</p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200/80 dark:border-[#1E342B]">
            <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Send to BrewPluse (@ ₹1/order)
            </p>
            <p className="text-lg font-black text-amber-600 dark:text-amber-400 mt-1">
              {isDemo ? '₹42' : `₹${realStats.platformFeeDue}`}
            </p>
            <p className="text-[10.5px] text-gray-500 mt-0.5">
              Payable when limit reaches ₹200
            </p>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
              Fee Paid By
            </p>
            <p className="text-sm font-black text-[#062F23] dark:text-white mt-1 capitalize">
              {realStats.platformFeeMode === 'customer' ? 'Customer (+₹1 on bill)' : 'Cafe Absorbs (from profit)'}
            </p>
            <p className="text-[10.5px] text-emerald-700 dark:text-emerald-400 mt-0.5">
              {realStats.platformFeeMode === 'customer'
                ? '100% cafe margin retained'
                : 'Free customer experience'}
            </p>
          </div>
        </div>
      </div>

      {/* 4. MAIN TWO-COLUMN DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT COLUMN (8 COLS) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Revenue & Sales Trends Chart */}
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 sm:p-4.5 shadow-[0_2px_12px_rgba(6,47,35,0.03)] space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-[#E5ECE8] dark:border-[#1E382E] pb-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#0B5C45] dark:text-[#10B981] border border-[#10B981]/20">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#12201B] dark:text-white">
                    Revenue & Sales Trends
                  </h2>
                  <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                    Real-time revenue curve and transaction velocity.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5 bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] p-0.5 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setTimeFilter('hourly')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      timeFilter === 'hourly'
                        ? 'bg-[#062F23] text-white shadow-xs'
                        : 'text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B]'
                    }`}
                  >
                    Hourly
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeFilter('7days')}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                      timeFilter === '7days'
                        ? 'bg-[#062F23] text-white shadow-xs'
                        : 'text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B]'
                    }`}
                  >
                    Last 7 Days
                  </button>
                </div>
                <Link
                  href={`${basePath}/billing`}
                  className="px-2.5 py-1 rounded-lg border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#11241C] hover:bg-[#F8FAF8] dark:hover:bg-[#142E25] text-xs font-semibold text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] transition-colors cursor-pointer"
                >
                  Full Analytics
                </Link>
              </div>
            </div>

            {/* SVG Chart */}
            <div className="w-full">
              <div className="w-full h-[210px] sm:h-[230px] relative select-none">
                <svg viewBox="0 0 788 230" className="w-full h-full block">
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.16" />
                      <stop offset="60%" stopColor="#10B981" stopOpacity="0.03" />
                      <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal gridlines */}
                  {[195, 150, 105, 60, 15].map((y, idx) => (
                    <line
                      key={y}
                      x1="45"
                      y1={y}
                      x2="778"
                      y2={y}
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      className="text-[#E8EEEA] dark:text-[#1A3328]"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-Axis Labels */}
                  {['0', '1', '2', '3', '4'].map((val, idx) => {
                    const yPos = 195 - idx * 45;
                    return (
                      <text
                        key={val}
                        x="33"
                        y={yPos + 4}
                        textAnchor="end"
                        fontSize="11"
                        fontWeight="600"
                        className="fill-[#8D9792] dark:fill-[#6B8579]"
                      >
                        {val}
                      </text>
                    );
                  })}

                  {/* Area fill */}
                  <path
                    d="M45,195 L778,195 L778,195 L45,195 Z"
                    fill="url(#revenueGradient)"
                  />

                  {/* Green Trend Line */}
                  <line
                    x1="45"
                    y1="195"
                    x2="778"
                    y2="195"
                    stroke="#10B981"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* X-Axis Time Labels */}
                  {hourlyData.map((d, idx) => {
                    const xPos = 45 + (idx * (778 - 45)) / (hourlyData.length - 1);
                    return (
                      <text
                        key={d.time}
                        x={xPos}
                        y="218"
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="600"
                        className="fill-[#8D9792] dark:fill-[#6B8579]"
                      >
                        {d.time}
                      </text>
                    );
                  })}

                  {/* Interactive hourly data hover points & active indicator */}
                  {hourlyData.map((d, idx) => {
                    const xPos = 45 + (idx * (778 - 45)) / (hourlyData.length - 1);
                    return (
                      <circle
                        key={`hit-${d.time}`}
                        cx={xPos}
                        cy="195"
                        r="12"
                        className="opacity-0 hover:opacity-20 fill-[#10B981] cursor-pointer"
                        onMouseEnter={() => setActiveTooltip(idx)}
                        onMouseLeave={() => setActiveTooltip(null)}
                      />
                    );
                  })}

                  {activeTooltip !== null && hourlyData[activeTooltip] && (
                    <g pointerEvents="none">
                      <line
                        x1={45 + (activeTooltip * (778 - 45)) / (hourlyData.length - 1)}
                        y1="15"
                        x2={45 + (activeTooltip * (778 - 45)) / (hourlyData.length - 1)}
                        y2="195"
                        stroke="#10B981"
                        strokeDasharray="3 3"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx={45 + (activeTooltip * (778 - 45)) / (hourlyData.length - 1)}
                        cy="195"
                        r="4"
                        fill="#10B981"
                        stroke="#fff"
                        strokeWidth="2"
                      />
                    </g>
                  )}
                </svg>

                {/* Floating tooltip box shown ONLY when hovering an hour point */}
                {activeTooltip !== null && hourlyData[activeTooltip] && (
                  <div
                    className="absolute px-3 py-1.5 rounded-lg bg-white dark:bg-[#12241C] border border-[#E5ECE8] dark:border-[#1E382E] shadow-md pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-all"
                    style={{
                      left: `${((45 + (activeTooltip * (778 - 45)) / (hourlyData.length - 1)) / 788) * 100}%`,
                      top: '26%',
                    }}
                  >
                    <p className="text-[10px] font-bold text-[#65736D] dark:text-[#9AB2A8]">
                      {hourlyData[activeTooltip].time}
                    </p>
                    <p className="text-xs font-black text-[#12201B] dark:text-white">
                      ₹{hourlyData[activeTooltip].value.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI AGENT SUMMARY BANNER */}
          <div className="rounded-xl p-3.5 sm:p-4 bg-gradient-to-br from-[#F3FAF7] to-[#F7F6FC] dark:from-[#11241C] dark:to-[#162920] border border-[#E4E9E7] dark:border-[#1E342B] shadow-[0_2px_12px_rgba(6,47,35,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-3.5">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <div className="w-5.5 h-5.5 rounded-md bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#10B981]">
                  <Sparkles className="w-3 h-3" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#062F23] dark:text-[#10B981]">
                  AI Agent Summary
                </span>
              </div>
              <p className="text-xs text-[#12201B] dark:text-[#F2FAF6] leading-relaxed">
                {isDemo
                  ? 'All setup steps are verified. Your terminal is ready to receive orders. Launch POS or scan a table QR code to start.'
                  : completedSteps === 4
                  ? 'All setup steps are verified. Your terminal is ready to receive orders. Launch POS or scan a table QR code to start.'
                  : 'Welcome to your live cafe terminal. Complete your setup checklist to start taking orders and accepting digital payments.'}
              </p>
            </div>
            <Link
              href={`${basePath}/billing`}
              className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#101F19] border border-[#E5ECE8] dark:border-[#1E342B] hover:bg-[#F8FAF8] dark:hover:bg-[#162922] text-xs font-semibold text-[#12201B] dark:text-[#F2FAF6] transition-colors cursor-pointer shadow-2xs"
            >
              <span>View Full Analytics</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0B5C45] dark:text-[#10B981]" />
            </Link>
          </div>

          {/* OPERATIONAL ACTIONS */}
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(6,47,35,0.03)] space-y-3">
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#12201B] dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#0B5C45] dark:text-[#10B981]" />
                <span>Operational Actions</span>
              </h2>
              <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                Quick access to key operations and settings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
              {/* Action 1: Create Order */}
              <Link
                href={`${basePath}/pos`}
                className="group p-2.5 sm:p-3 rounded-lg border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#11241C] hover:bg-[#F2FAF6] dark:hover:bg-[#152B21] hover:border-[#10B981]/40 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#0B5C45] dark:text-[#10B981] group-hover:scale-105 transition-all">
                    <Calculator className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#12201B] dark:text-white group-hover:text-[#062F23]">
                      + Create Order
                    </p>
                    <p className="text-[9.5px] text-[#65736D] dark:text-[#9AB2A8]">
                      Start a new transaction
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8D9792] group-hover:text-[#0B8F68] group-hover:translate-x-0.5 transition-all" />
              </Link>

              {/* Action 2: View Orders */}
              <Link
                href={`${basePath}/orders`}
                className="group p-2.5 sm:p-3 rounded-lg border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#11241C] hover:bg-[#F2FAF6] dark:hover:bg-[#152B21] hover:border-[#10B981]/40 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#0B5C45] dark:text-[#10B981] group-hover:scale-105 transition-all">
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#12201B] dark:text-white group-hover:text-[#062F23]">
                      View Orders
                    </p>
                    <p className="text-[9.5px] text-[#65736D] dark:text-[#9AB2A8]">
                      Audit order queue
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8D9792] group-hover:text-[#0B8F68] group-hover:translate-x-0.5 transition-all" />
              </Link>

              {/* Action 3: Manage Inventory */}
              <Link
                href={`${basePath}/inventory`}
                className="group p-2.5 sm:p-3 rounded-lg border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#11241C] hover:bg-[#F2FAF6] dark:hover:bg-[#152B21] hover:border-[#10B981]/40 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#0B5C45] dark:text-[#10B981] group-hover:scale-105 transition-all">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#12201B] dark:text-white group-hover:text-[#062F23]">
                      Manage Inventory
                    </p>
                    <p className="text-[9.5px] text-[#65736D] dark:text-[#9AB2A8]">
                      Update stock parameters
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8D9792] group-hover:text-[#0B8F68] group-hover:translate-x-0.5 transition-all" />
              </Link>

              {/* Action 4: Table QR Codes */}
              <Link
                href={`${basePath}/tables`}
                className="group p-2.5 sm:p-3 rounded-lg border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#11241C] hover:bg-[#F2FAF6] dark:hover:bg-[#152B21] hover:border-[#10B981]/40 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#0B5C45] dark:text-[#10B981] group-hover:scale-105 transition-all">
                    <QrCode className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#12201B] dark:text-white group-hover:text-[#062F23]">
                      Table QR Codes
                    </p>
                    <p className="text-[9.5px] text-[#65736D] dark:text-[#9AB2A8]">
                      Generate routing endpoint
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8D9792] group-hover:text-[#0B8F68] group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (4 COLS) */}
        <div className="lg:col-span-4 space-y-4">
          {/* BrewPluse Usage Card */}
          <div className="rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(6,47,35,0.03)] hover:border-[#10B981]/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] flex items-center justify-center text-[#0B5C45] dark:text-[#10B981] border border-[#10B981]/20">
                  <Receipt className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#12201B] dark:text-white">
                    BrewPluse Usage
                  </span>
                  <p className="text-[9.5px] text-[#65736D] dark:text-[#9AB2A8] leading-none mt-0.5">
                    Live Account Balance
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider border bg-[#E8F6EF] text-[#087A5B] border-[#10B981]/25">
                Active
              </span>
            </div>

            {/* Inner box with coin jar */}
            <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F7FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E]">
              <div className="space-y-0.5">
                <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#65736D] dark:text-[#9AB2A8]">
                  Outstanding Usage
                </span>
                <div className="flex items-baseline gap-1.5">
                  <p className="text-2xl sm:text-[26px] font-black tracking-tight text-[#12201B] dark:text-white">
                    ₹0.00
                  </p>
                  <span className="text-xs font-semibold text-[#8D9792]">/ ₹200.00</span>
                </div>
                <p className="text-[10px] text-[#65736D] dark:text-[#9AB2A8] font-medium">
                  ₹1.00 per eligible order
                </p>
              </div>

              {/* Exact coin jar illustration SVG */}
              <div className="shrink-0 flex items-center justify-center p-1.5 rounded-xl bg-white dark:bg-[#0A1A14] border border-[#E5ECE8] dark:border-[#1E382E] shadow-2xs hover:scale-105 transition-transform">
                <svg viewBox="0 0 64 64" fill="none" className="w-9 h-9">
                  <ellipse cx="32" cy="59" rx="20" ry="3.5" fill="#062F23" fillOpacity="0.08" />
                  <path
                    d="M20 18 H44 C47 18 49 20 49 23 L51 49 C51 55 46 58 40 58 H24 C18 58 13 55 13 49 L15 23 C15 20 17 18 20 18 Z"
                    fill="url(#jarGlassGradient)"
                    stroke="#0B5C45"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 26 C16 26 24 25 32 25 C40 25 48 26 48 26 L49.5 48 C49.5 53 45.5 56 40 56 H24 C18.5 56 14.5 53 14.5 48 Z"
                    fill="#E8F6EF"
                    fillOpacity="0.65"
                  />
                  <ellipse cx="27" cy="51" rx="8" ry="3" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
                  <ellipse cx="37" cy="50" rx="8" ry="3" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
                  <ellipse cx="31" cy="46" rx="8.5" ry="3.2" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
                  <ellipse cx="33" cy="43" rx="8.5" ry="3.2" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
                  <ellipse cx="28" cy="39" rx="8" ry="3" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
                  <ellipse cx="35" cy="36" rx="8.5" ry="3.2" fill="#F59E0B" stroke="#D97706" strokeWidth="1.2" />
                  <text x="35" y="38" textAnchor="middle" fill="#78350F" fontSize="5" fontWeight="bold" fontFamily="sans-serif">
                    ₹
                  </text>
                  <ellipse cx="32" cy="19" rx="5.5" ry="2.2" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
                  <text x="32" y="20.5" textAnchor="middle" fill="#78350F" fontSize="3.8" fontWeight="bold" fontFamily="sans-serif">
                    ₹
                  </text>
                  <rect x="20" y="14" width="24" height="4" rx="1.5" fill="#E8F6EF" stroke="#0B5C45" strokeWidth="1.8" />
                  <path d="M22 14 L23 9 C23 7.5 24.5 7 26 7 H38 C39.5 7 41 7.5 41 9 L42 14 Z" fill="#C89666" stroke="#8C5E35" strokeWidth="1.5" />
                  <line x1="25" y1="10.5" x2="39" y2="10.5" stroke="#A77247" strokeWidth="1" />
                  <path d="M17 25 L16 48 C16 52 18 54 21 55" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.8" />
                  <path d="M47 25 L48 45" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
                  <path d="M48 14 L49.5 11 L51 14 L54 15.5 L51 17 L49.5 20 L48 17 L45 15.5 Z" fill="#10B981" />
                  <circle cx="12" cy="30" r="1.5" fill="#F59E0B" />
                  <defs>
                    <linearGradient id="jarGlassGradient" x1="13" y1="18" x2="51" y2="58" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FFFFFF" stopOpacity="0.85" />
                      <stop offset="0.5" stopColor="#E8F6EF" stopOpacity="0.4" />
                      <stop offset="1" stopColor="#D1FAE5" stopOpacity="0.7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            {/* Usage Progress */}
            <div className="space-y-1 pt-0.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#65736D] dark:text-[#9AB2A8] font-medium flex items-center gap-1.5 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  Usage Limit Progress
                </span>
                <span className="font-bold text-[#12201B] dark:text-white text-[11px]">0% Used</span>
              </div>
              <div className="h-2 w-full bg-[#E5ECE8] dark:bg-[#1E382E] rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-[#0B5C45] to-[#10B981]"
                  style={{ width: '2%' }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-[#8D9792] font-medium">
                <span>0 orders recorded</span>
                <span>₹200.00 left before pause</span>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2.5 border-t border-[#E5ECE8] dark:border-[#1E382E] flex items-center justify-between">
              <div className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8]">
                Zero monthly subscription
              </div>
              <Link
                href={`${basePath}/usage`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold shadow-2xs transition-all active:scale-95"
              >
                <span>View Usage</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(6,47,35,0.03)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#0B5C45] dark:text-[#10B981]" />
                <h3 className="text-xs sm:text-sm font-bold text-[#12201B] dark:text-white">
                  Recent Activity
                </h3>
              </div>
              <Link
                href={`${basePath}/orders`}
                className="text-[11px] font-semibold text-[#0B5C45] dark:text-[#10B981] hover:text-[#062F23] transition-colors"
              >
                View All
              </Link>
            </div>
            <div className="space-y-2 divide-y divide-[#E5ECE8]/60 dark:divide-[#1E382E]">
              <p className="text-xs text-[#8D9792] text-center py-4">
                No recent activity recorded yet.
              </p>
            </div>
          </div>

          {/* Bottom Dark Emerald Promo Card */}
          <div className="rounded-xl bg-gradient-to-br from-[#062F23] via-[#05291F] to-[#031C15] p-3.5 text-white border border-[#0B5C45]/30 relative overflow-hidden shadow-[0_2px_12px_rgba(6,47,35,0.04)]">
            <div className="relative z-10 space-y-1.5 max-w-[210px]">
              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                Better cafe. Happier people.
              </h4>
              <p className="text-[10px] text-[#9AB2A8] leading-relaxed">
                Tools, insights and automation to help your cafe grow.
              </p>
              <div className="pt-0.5">
                <Link
                  href={`${basePath}/more`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-white text-[10.5px] font-semibold border border-white/15 transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Coffee cup watermark badge */}
            <div className="absolute -bottom-2 -right-2 opacity-80 pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#10B981]/20 to-transparent flex items-center justify-center">
                <Coffee className="w-10 h-10 text-[#10B981]/30" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
