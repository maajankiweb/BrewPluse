'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Users, RefreshCw, UserCheck, Wallet, Coins, User } from 'lucide-react';

export default function CustomersPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-3.5 sm:space-y-4 max-w-[1500px] pb-8 font-sans text-neutral-800 dark:text-zinc-200 animate-in fade-in duration-300">
        {/* Header Card */}
        <div className="bg-white dark:bg-[#0E2018] border border-neutral-200 dark:border-[#1E382E] p-3.5 sm:p-4 rounded-xl shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-amber-500" />
                <span>Customer Relationship Hub</span>
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Track customer engagement metrics, monitor outstanding wallet liabilities, adjust ledger balances, and audit reward campaign coupon usage.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                className="h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-200 dark:border-white/10 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/10"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Sync Data</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid gap-3 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-3.5 sm:p-4 shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2.5 opacity-5 group-hover:scale-110 transition-transform duration-300 text-amber-500">
              <Users className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Total Customers
            </p>
            <p className="mt-1 text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">0</p>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500 font-semibold">
              <UserCheck className="h-3 w-3 text-emerald-500" />
              <span>Registered in cafe system</span>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-3.5 sm:p-4 shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2.5 opacity-5 group-hover:scale-110 transition-transform duration-300 text-amber-500">
              <Wallet className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Wallet Liabilities
            </p>
            <p className="mt-1 text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              ₹0.00
            </p>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500 font-semibold">
              <Coins className="h-3 w-3 text-emerald-500" />
              <span>Outstanding customer cashbacks</span>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-3.5 sm:p-4 shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2.5 opacity-5 group-hover:scale-110 transition-transform duration-300 text-amber-500">
              <Coins className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Avg. LTV Per Cust.
            </p>
            <p className="mt-1 text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              ₹0.00
            </p>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500 font-semibold">
              <User className="h-3 w-3 text-emerald-500" />
              <span>Average revenue per visitor</span>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-3.5 sm:p-4 shadow-xs relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2.5 opacity-5 group-hover:scale-110 transition-transform duration-300 text-amber-500">
              <UserCheck className="h-12 w-12" />
            </div>
            <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">
              Loyal Customers
            </p>
            <p className="mt-1 text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">0</p>
            <div className="mt-1 flex items-center gap-1 text-[10px] text-neutral-500 font-semibold">
              <UserCheck className="h-3 w-3 text-emerald-500" />
              <span>Placed more than 5 orders</span>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
          <span>SORT BY:</span>
          <button className="px-3 py-1 rounded-lg bg-neutral-100 dark:bg-zinc-800 text-neutral-900 dark:text-white font-bold cursor-pointer">
            Last Visited
          </button>
          <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 cursor-pointer">
            Wallet Balance
          </button>
          <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 cursor-pointer">
            Total Orders
          </button>
          <button className="px-3 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 cursor-pointer">
            Total Spent
          </button>
        </div>

        {/* Empty list */}
        <div className="rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-12 text-center space-y-2 shadow-xs">
          <p className="text-sm font-bold text-neutral-900 dark:text-white">
            No customer visits recorded yet.
          </p>
          <p className="text-xs text-neutral-500">
            Customers will appear here automatically when they place an order via QR or counter POS.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
