'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Receipt,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Filter,
  FileSpreadsheet,
  FileCode,
  Printer,
  ChevronLeft,
  ChevronRight,
  Plus,
} from 'lucide-react';

export default function BillingPage() {
  const routeParams = useParams();
  const router = useRouter();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [currentDateStr, setCurrentDateStr] = useState('Today · Sat, Oct 10, 2026');
  const [showAllBills, setShowAllBills] = useState(false);

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight">
              Bills
            </h1>
            <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Review transactions, payments and revenue.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">TODAY&apos;S ORDERS</p>
              <p className="text-2xl font-bold text-[#12201B] dark:text-white mt-1">0</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Paid & completed orders</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">TODAY&apos;S CAFE SALES</p>
              <p className="text-2xl font-bold text-[#0B8F68] dark:text-[#10B981] mt-1">₹0.00</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Gross cafe sales</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] dark:text-[#F59E0B]">BREWPLUSE COLLECTED</p>
              <p className="text-2xl font-bold text-[#D97706] dark:text-[#F59E0B] mt-1">₹0.00</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Platform fee collected</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#0B5C45] dark:text-[#10B981]">TODAY&apos;S CAFE SALES</p>
              <p className="text-2xl font-bold text-[#0B5C45] dark:text-[#10B981] mt-1">₹0.00</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Live today&apos;s gross sales</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Filter Navigation Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            {/* Date Navigator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white shadow-2xs">
              <button type="button" className="text-[#8D9792] hover:text-[#12201B] dark:hover:text-white cursor-pointer">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="flex items-center gap-1.5 px-1">
                <Calendar className="w-3.5 h-3.5 text-[#0B5C45]" />
                {currentDateStr}
              </span>
              <button type="button" className="text-[#8D9792] hover:text-[#12201B] dark:hover:text-white cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowAllBills(!showAllBills)}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors cursor-pointer shadow-2xs"
            >
              Show All Bills
            </button>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Daily CSV (2026-10-10)</span>
            </button>
          </div>

          {/* Month Range & Monthly CSV */}
          <div className="flex items-center gap-2 self-start lg:self-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white shadow-2xs">
              <span className="text-[10px] font-bold uppercase text-[#8D9792]">MONTH</span>
              <span>October , 2026</span>
              <Calendar className="w-3.5 h-3.5 text-[#8D9792]" />
            </div>

            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Monthly CSV</span>
            </button>
          </div>
        </div>

        {/* Empty Bills state */}
        <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-16 sm:p-20 text-center space-y-4 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto">
            <Receipt className="w-7 h-7" />
          </div>
          <div>
            <p className="text-base font-bold text-[#12201B] dark:text-white">No bills yet</p>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-sm mx-auto mt-1 leading-relaxed">
              Completed transactions will appear here.
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push(`/dashboard/${storeSlug}/pos`)}
            className="px-4 py-2 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Order</span>
          </button>
        </div>
      </div>
    </DashboardShell>
  );
}
