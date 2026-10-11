'use client';

import React from 'react';
import {
  Receipt,
  CheckCircle2,
  HelpCircle,
  Download,
  CreditCard,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useDemo } from '../demoContext';

export default function DemoUsagePage() {
  const { orders } = useDemo();

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
          <Receipt className="w-6 h-6 text-amber-500" />
          <span>BrewPluse Usage &amp; Settlement</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Transparent, pay-as-you-grow cafe software. Zero monthly recurring fee lock-in.
        </p>
      </div>

      {/* Main Meter Card */}
      <div className="bg-gradient-to-br from-white via-neutral-50 to-amber-50/20 dark:from-[#121214] dark:to-[#1a1815] border border-amber-500/20 rounded-[24px] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                Active Cycle
              </span>
              <span className="text-xs text-zinc-500 font-mono">Cycle: 01 Oct – 31 Oct</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#141210] dark:text-white">
              Current Outstanding Balance
            </h2>
          </div>

          <div className="text-right">
            <span className="text-xs text-zinc-500 font-medium">Accumulated Fee:</span>
            <p className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
              ₹0.00
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono text-zinc-500">
            <span>Used: ₹0.00</span>
            <span>Billing Credit Threshold: ₹200.00</span>
          </div>
          <div className="w-full h-3 bg-neutral-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '0%' }} />
          </div>
          <p className="text-[11px] text-zinc-400">
            Auto-settlement is triggered only when your balance reaches ₹200.00 or on the 1st of every month.
          </p>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#ebe8e3] dark:border-[#222225]">
          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-[#ebe8e3] dark:border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Standard Rate</span>
            <p className="text-lg font-black text-[#141210] dark:text-white mt-1">₹1.00 / order</p>
            <span className="text-[10px] text-zinc-500">Fixed rate, no % cuts</span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-[#ebe8e3] dark:border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Eligible Orders</span>
            <p className="text-lg font-black text-[#141210] dark:text-white mt-1">{orders.length}</p>
            <span className="text-[10px] text-zinc-500">This billing period</span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-zinc-900 border border-[#ebe8e3] dark:border-zinc-800">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">Monthly Savings</span>
            <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-1">~₹2,400+</p>
            <span className="text-[10px] text-zinc-500">vs legacy ₹2,999/mo apps</span>
          </div>
        </div>
      </div>

      {/* Explainer FAQ / Transparency */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 sm:p-8 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-[#141210] dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Why does BrewPluse charge ₹1 per order?</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed pt-2">
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-zinc-800/40 border border-[#ebe8e3] dark:border-zinc-800 space-y-1.5">
            <h4 className="font-bold text-[#141210] dark:text-white flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>You only pay when you make sales</span>
            </h4>
            <p className="text-zinc-500">
              During slow rainy days or off-season periods, your software bill drops automatically. You never pay a heavy fixed ₹3,000 monthly fee for empty tables.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-zinc-800/40 border border-[#ebe8e3] dark:border-zinc-800 space-y-1.5">
            <h4 className="font-bold text-[#141210] dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>All features unlocked forever</span>
            </h4>
            <p className="text-zinc-500">
              Kitchen Display (KDS), QR Ordering, Inventory alerts, Staff logins, and Digital TV Menu are 100% unlocked from day one without tier upgrades.
            </p>
          </div>
        </div>
      </div>

      {/* Past Settled Statements Table */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-[#141210] dark:text-white">Past Usage Invoices</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#ebe8e3] dark:border-[#222225] text-zinc-400 font-mono uppercase">
                <th className="py-2.5 px-3">Statement #</th>
                <th className="py-2.5 px-3">Billing Period</th>
                <th className="py-2.5 px-3">Orders</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">PDF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebe8e3]/60 dark:divide-[#222225]">
              <tr className="hover:bg-neutral-50 dark:hover:bg-zinc-800/40">
                <td className="py-3 px-3 font-mono font-bold text-amber-600">STMT-2026-09</td>
                <td className="py-3 px-3 text-zinc-500">01 Sep – 30 Sep 2026</td>
                <td className="py-3 px-3 font-mono">184 orders</td>
                <td className="py-3 px-3 font-mono font-bold text-[#141210] dark:text-white">₹184.00</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Auto-Settled</span>
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  <button
                    onClick={() => window.print()}
                    className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-500"
                    title="Download Statement"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
