'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ShoppingBag,
  Clock,
  Utensils,
  CheckCircle2,
  Calendar,
  Filter,
  Download,
  ChevronDown,
} from 'lucide-react';

export default function OrdersPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Orders', count: 0 },
    { id: 'pending', label: 'Pending', count: 0 },
    { id: 'kitchen', label: 'In Kitchen', count: 0 },
    { id: 'ready', label: 'Ready to Serve', count: 0 },
    { id: 'completed', label: 'Completed', count: 0 },
    { id: 'cancelled', label: 'Cancelled', count: 0 },
  ];

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight">
              Orders
            </h1>
            <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Track, manage and serve your customers with ease.
            </p>
          </div>
          <button
            type="button"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white self-start sm:self-auto shadow-2xs hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#0B5C45]" />
            <span>Oct 10, 2026</span>
            <ChevronDown className="w-3 h-3 text-[#8D9792]" />
          </button>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">TOTAL ORDERS</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-[#12201B] dark:text-white">0</span>
                <span className="text-[10.5px] font-semibold text-emerald-600 flex items-center gap-0.5">
                  ↑ 12% vs. yesterday
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">PENDING</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-[#12201B] dark:text-white">0</span>
                <span className="text-[10.5px] font-semibold text-amber-600 flex items-center gap-0.5">
                  ↑ 1% vs. yesterday
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">IN KITCHEN</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-[#12201B] dark:text-white">0</span>
                <span className="text-[10.5px] font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-0.5">
                  ↑ 3% vs. yesterday
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">COMPLETED</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-bold text-[#12201B] dark:text-white">0</span>
                <span className="text-[10.5px] font-semibold text-emerald-600 flex items-center gap-0.5">
                  ↑ 8% vs. yesterday
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tab Filters and Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#062F23] text-white shadow-2xs'
                    : 'bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-[#65736D] dark:text-[#9AB2A8]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white flex items-center gap-1.5 hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors cursor-pointer shadow-2xs"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
            <button
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white flex items-center gap-1.5 hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Empty orders state */}
        <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-16 sm:p-20 text-center space-y-3 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <p className="text-base font-bold text-[#12201B] dark:text-white">No orders yet</p>
          <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-sm mx-auto leading-relaxed">
            Your orders will appear here once customers place them.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
