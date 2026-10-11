'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  RefreshCw,
  CheckCircle2,
  Receipt,
  Check,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Clock,
} from 'lucide-react';

export default function UsagePage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [feePayerMode, setFeePayerMode] = useState<'customer' | 'cafe'>('customer');
  const [activeTab, setActiveTab] = useState<'ledger' | 'settlement'>('ledger');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight">
                BrewPluse Usage & Billing
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] text-[11px] font-bold tracking-wide">
                ₹1.00 / ORDER · {feePayerMode === 'customer' ? 'CUSTOMER-FUNDED' : 'CAFE-FUNDED'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Pay-as-you-grow café pricing. ₹1 per successful customer order. Zero monthly fixed fees.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white flex items-center gap-1.5 hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors self-start sm:self-auto cursor-pointer shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Fee Payer Model Card */}
        <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5ECE8]/80 dark:border-[#1E382E] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#12201B] dark:text-white">
                  Fee Payer Model
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] text-[10px] font-bold">
                  ₹1.00 / ORDER
                </span>
              </div>
              <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                Current Mode: <span className="font-semibold text-[#12201B] dark:text-white">{feePayerMode === 'customer' ? 'Customer-funded' : 'Self / Cafe-funded'}</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* Customer Pays Card */}
            <div
              onClick={() => setFeePayerMode('customer')}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                feePayerMode === 'customer'
                  ? 'border-[#0B5C45] bg-[#F4FAF6] dark:bg-[#132A20] dark:border-[#10B981] ring-1 ring-[#0B5C45]/20'
                  : 'border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] hover:border-[#CCD8D2]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#12201B] dark:text-white">Customer Pays</h4>
                    <span className="text-[10px] font-bold text-[#0B5C45] dark:text-[#10B981]">(Recommended)</span>
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] text-[10px] font-semibold">
                    +₹1.00 added to customer bill
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    feePayerMode === 'customer'
                      ? 'bg-[#0B5C45] text-white dark:bg-[#10B981] dark:text-[#062F23]'
                      : 'border-2 border-[#CCD8D2] dark:border-[#2C4A3E]'
                  }`}
                >
                  {feePayerMode === 'customer' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
              <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] mt-2.5 leading-relaxed">
                Customers cover the ₹1.00 digital ordering fee directly on their bill during checkout. Zero operational fee cost to your cafe.
              </p>
            </div>

            {/* Self / Cafe Pays Card */}
            <div
              onClick={() => setFeePayerMode('cafe')}
              className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                feePayerMode === 'cafe'
                  ? 'border-[#0B5C45] bg-[#F4FAF6] dark:bg-[#132A20] dark:border-[#10B981] ring-1 ring-[#0B5C45]/20'
                  : 'border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] hover:border-[#CCD8D2]'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-[#12201B] dark:text-white">Self / Cafe Pays</h4>
                    <span className="text-[10px] font-medium text-[#65736D] dark:text-[#9AB2A8]">(Clean Guest Bill)</span>
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#F3F4F6] dark:bg-[#1E2824] text-[#65736D] dark:text-[#9AB2A8] text-[10px] font-semibold">
                    ₹0.00 fee on guest bill · ₹1.00 on usage
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    feePayerMode === 'cafe'
                      ? 'bg-[#0B5C45] text-white dark:bg-[#10B981] dark:text-[#062F23]'
                      : 'border-2 border-[#CCD8D2] dark:border-[#2C4A3E]'
                  }`}
                >
                  {feePayerMode === 'cafe' && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </div>
              <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] mt-2.5 leading-relaxed">
                Customers pay standard menu prices with no extra fee. The ₹1.00 fee is absorbed by your cafe and accumulated in your BrewPluse usage balance to settle anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Outstanding Usage Card - Warm Tone Container */}
        <div className="bg-[#FFFDF9] dark:bg-[#181612] border border-[#F2E5D3] dark:border-[#2D261A] rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10.5px] font-bold tracking-wider uppercase text-[#8B7355] dark:text-[#C5B39A]">
              OUTSTANDING BREWPLUSE USAGE
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] text-[10.5px] font-bold">
              ALL CLEAR
            </span>
          </div>

          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#12201B] dark:text-white tracking-tight">
                ₹0.00
              </span>
              <span className="text-sm font-semibold text-[#8B7355] dark:text-[#9E8B75]">
                / ₹200.00
              </span>
            </div>
            <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] mt-1">
              0 eligible orders · ₹1.00 per order
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="h-2 w-full bg-[#EFE5D5] dark:bg-[#2A2318] rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full w-0" />
            </div>
            <p className="text-[10.5px] font-medium text-[#8B7355] dark:text-[#C5B39A]">
              0% of ₹200.00 limit
            </p>
          </div>

          {/* Bottom settled notice */}
          <div className="pt-3 border-t border-[#F2E5D3] dark:border-[#2D261A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs font-semibold text-[#12201B] dark:text-white">
              You&apos;re all settled! No payment is required.
            </p>
            <button
              type="button"
              disabled
              className="px-4 py-2 rounded-xl bg-[#EBECEB] dark:bg-[#242A27] text-[#8D9792] dark:text-[#65736D] text-xs font-bold cursor-not-allowed self-start sm:self-auto"
            >
              All Settled (₹0.00)
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">ELIGIBLE ORDERS</p>
            <p className="text-2xl font-bold text-[#12201B] dark:text-white mt-1">0</p>
            <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Across POS & QR</p>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">RATE PER ORDER</p>
            <p className="text-2xl font-bold text-[#12201B] dark:text-white mt-1">₹1.00</p>
            <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">
              {feePayerMode === 'customer' ? 'Paid by customer' : 'Absorbed by cafe'}
            </p>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">CURRENT OUTSTANDING</p>
            <p className="text-2xl font-bold text-[#12201B] dark:text-white mt-1">₹0.00</p>
            <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Unsettled fee pool</p>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">USAGE CEILING</p>
            <p className="text-2xl font-bold text-[#12201B] dark:text-white mt-1">₹200.00</p>
            <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Pause threshold</p>
          </div>
        </div>

        {/* Ledger & History Tabs */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 border-b border-[#E5ECE8] dark:border-[#1E382E] pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('ledger')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'ledger'
                  ? 'bg-[#062F23] text-white shadow-2xs'
                  : 'text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] dark:hover:text-white'
              }`}
            >
              Usage Ledger (0)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('settlement')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'settlement'
                  ? 'bg-[#062F23] text-white shadow-2xs'
                  : 'text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] dark:hover:text-white'
              }`}
            >
              Settlement History (0)
            </button>
          </div>

          {/* Empty Ledger State */}
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-16 text-center space-y-3 shadow-2xs">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto">
              <Receipt className="w-6 h-6" />
            </div>
            <p className="text-base font-bold text-[#12201B] dark:text-white">
              {activeTab === 'ledger' ? 'No usage entries yet' : 'No settlement records yet'}
            </p>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-sm mx-auto leading-relaxed">
              {activeTab === 'ledger'
                ? 'New eligible orders will appear here with an immutable +₹1.00 usage record.'
                : 'Settled invoices and transaction receipts will appear here once cleared.'}
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
