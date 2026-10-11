'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Search,
  Plus,
  ShoppingBag,
  CreditCard,
  Clock,
  ArrowRight,
  Calculator,
  Utensils,
} from 'lucide-react';



export default function PosPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [payAt, setPayAt] = useState<'last' | 'first'>('last');
  const [channel, setChannel] = useState('Walk-in / Takeaway');
  const [search, setSearch] = useState('');

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight">
              Create Order
            </h1>
            <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8]">
              Build an order quickly and complete checkout.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] p-1 rounded-xl text-xs font-semibold">
              <span className="text-[#65736D] px-2">Pay At:</span>
              <button
                type="button"
                onClick={() => setPayAt('last')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  payAt === 'last'
                    ? 'bg-[#062F23] text-white shadow-xs'
                    : 'text-[#65736D] hover:text-[#12201B]'
                }`}
              >
                Last
              </button>
              <button
                type="button"
                onClick={() => setPayAt('first')}
                className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                  payAt === 'first'
                    ? 'bg-[#062F23] text-white shadow-xs'
                    : 'text-[#65736D] hover:text-[#12201B]'
                }`}
              >
                First
              </button>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-bold text-[#087A5B]">
              Usage: ₹0.00
            </div>
          </div>
        </div>

        {/* 3-Column POS Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Column 1: Menu catalog selection (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative">
              <Search className="w-4 h-4 text-[#8D9792] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, category, ingredients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs sm:text-sm focus:outline-none focus:border-[#10B981]"
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 rounded-lg bg-[#062F23] text-white text-xs font-bold"
              >
                All Items
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {/* Add Custom Item Card */}
              <div className="border-2 border-dashed border-emerald-400/40 rounded-2xl p-4 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all cursor-pointer flex flex-col justify-between h-44 group">
                <div className="w-full flex-1 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#12201B] dark:text-white">+ Add Custom Item</p>
                  <p className="text-[10px] text-[#65736D] dark:text-[#9AB2A8]">
                    Unlisted item & custom price
                  </p>
                </div>
              </div>
            </div>

            {/* Empty Menu State */}
            <div className="rounded-2xl border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto">
                <Calculator className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#12201B] dark:text-white">No active menu items</p>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-xs mx-auto">
                Configure your menu catalog in the Menu tab or use the custom item card above.
              </p>
            </div>
          </div>

          {/* Column 2: Current Order (4 cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#1E382E] pb-3">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#0B5C45] dark:text-[#10B981]" />
                <h3 className="text-sm font-bold text-[#12201B] dark:text-white">Current Order</h3>
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981]">
                0 items
              </span>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#65736D] dark:text-[#9AB2A8] block mb-1">
                Assign Table / Channel
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold focus:outline-none"
              >
                <option value="Walk-in / Takeaway">Walk-in / Takeaway</option>
                <option value="Table 1">Table 1</option>
                <option value="Table 2">Table 2</option>
                <option value="Table 3">Table 3</option>
                <option value="Table 4">Table 4</option>
              </select>
            </div>

            {/* Empty cart placeholder */}
            <div className="rounded-xl border border-dashed border-[#E5ECE8] dark:border-[#1E382E] p-10 text-center space-y-2 bg-[#FAFBF9] dark:bg-[#11241C]">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-[#8D9792] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-[#12201B] dark:text-white">Order is empty</p>
              <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                Tap items from the menu to add
              </p>
            </div>

            <div className="border-t border-[#E5ECE8] dark:border-[#1E382E] pt-3 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#65736D] dark:text-[#9AB2A8]">
                <span>Subtotal</span>
                <span>₹0.00</span>
              </div>
              <div className="flex justify-between font-bold text-sm text-[#12201B] dark:text-white pt-1">
                <span>Total Due</span>
                <span>₹0.00</span>
              </div>
            </div>
          </div>

          {/* Column 3: Checkout (3 cols) */}
          <div className="lg:col-span-3 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#1E382E] pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-[#0B5C45] dark:text-[#10B981]" />
                <h3 className="text-sm font-bold text-[#12201B] dark:text-white">Checkout</h3>
              </div>
              <span className="text-[10px] font-bold uppercase text-[#8D9792]">PAY LATER</span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E]">
              <span className="text-[10px] font-bold uppercase text-[#0B8F68] block">
                TOTAL PAYABLE
              </span>
              <p className="text-2xl font-black text-[#12201B] dark:text-white mt-0.5">₹0.00</p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-300">
                <Clock className="w-4 h-4" />
                <span>Pay at the end (Post-paid)</span>
              </div>
              <p className="text-[11px] leading-relaxed text-[#65736D] dark:text-[#C5D0CB]">
                Payment method is not required now. The order will be sent to the kitchen as Payment
                Pending and settled upon customer checkout.
              </p>
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-[#5E756C] hover:bg-[#062F23] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>Place Order (Pay Later)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
