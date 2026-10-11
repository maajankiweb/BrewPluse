'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  SlidersHorizontal,
} from 'lucide-react';

export default function InventoryPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [autoDeductEnabled, setAutoDeductEnabled] = useState(false);
  const [itemId, setItemId] = useState('');
  const [itemName, setItemName] = useState('');
  const [stockQty, setStockQty] = useState('0');
  const [unit, setUnit] = useState('pcs');
  const [lowStockAlert, setLowStockAlert] = useState('5');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight">
              Inventory
            </h1>
            <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Track ingredient stock levels, low-stock thresholds, and automatic deduction.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setAutoDeductEnabled(!autoDeductEnabled)}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs ${
              autoDeductEnabled
                ? 'bg-[#E8F6EF] dark:bg-[#142E25] border-[#0B5C45] text-[#087A5B] dark:text-[#10B981]'
                : 'bg-white dark:bg-[#0E2018] border-[#E5ECE8] dark:border-[#1E382E] text-[#12201B] dark:text-white hover:bg-[#F8FAF8] dark:hover:bg-[#132A20]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoDeductEnabled ? 'text-[#087A5B]' : ''}`} />
            <span>{autoDeductEnabled ? 'Auto-Deduct Active' : 'Enable Auto-Deduct'}</span>
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">TOTAL INGREDIENTS</p>
              <p className="text-2xl font-bold text-[#12201B] dark:text-white mt-1">0</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Tracked in live recipe ledger</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <Package className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">OPTIMAL STOCK</p>
              <p className="text-2xl font-bold text-[#087A5B] dark:text-[#10B981] mt-1">0</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Safe margin above threshold</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] dark:text-[#F59E0B]">LOW STOCK ALERTS</p>
              <p className="text-2xl font-bold text-[#D97706] dark:text-[#F59E0B] mt-1">0</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Items needing replenishment</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Add Ingredient / Stock Item Form */}
        <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#12201B] dark:text-white">Add Ingredient / Stock Item</h3>
              <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">Define new stock items for kitchen recipe auto-deduction</p>
            </div>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1.5">
                  ID (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={itemId}
                  onChange={(e) => setItemId(e.target.value)}
                  placeholder="e.g. whole-milk"
                  className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white placeholder-[#8D9792] focus:outline-none focus:border-[#0B5C45]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1.5">
                  NAME *
                </label>
                <input
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="e.g. Whole Milk"
                  className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white placeholder-[#8D9792] focus:outline-none focus:border-[#0B5C45]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1.5">
                  STOCK QTY
                </label>
                <input
                  type="number"
                  value={stockQty}
                  onChange={(e) => setStockQty(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white focus:outline-none focus:border-[#0B5C45]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1.5">
                  UNIT
                </label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  placeholder="pcs"
                  className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white focus:outline-none focus:border-[#0B5C45]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1.5">
                  LOW STOCK ALERT
                </label>
                <input
                  type="number"
                  value={lowStockAlert}
                  onChange={(e) => setLowStockAlert(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white focus:outline-none focus:border-[#0B5C45]"
                />
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="px-5 py-2 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
              >
                Add Stock Item
              </button>
            </div>
          </form>
        </div>

        {/* Active Ingredients Ledger Card */}
        <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#12201B] dark:text-white">Active Ingredients Ledger</h3>
              <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] mt-0.5">Real-time inventory levels</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F3F4F6] dark:bg-[#1E2824] text-[#65736D] dark:text-[#9AB2A8] text-[10.5px] font-semibold">
              0 of 0 Items
            </span>
          </div>

          {/* Search bar & filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-[#8D9792] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredient by name..."
                className="w-full h-9 pl-9 pr-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white placeholder-[#8D9792] focus:outline-none focus:border-[#0B5C45]"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}
              className={`h-9 px-3 rounded-xl border flex items-center justify-center transition-colors cursor-pointer ${
                showLowStockOnly
                  ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 text-amber-600'
                  : 'bg-white dark:bg-[#0E2018] border-[#E5ECE8] dark:border-[#1E382E] text-[#8D9792] hover:text-[#12201B]'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </button>
          </div>

          {/* Empty Ledger State */}
          <div className="py-16 text-center space-y-2.5">
            <div className="w-12 h-12 rounded-2xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-[#12201B] dark:text-white">No inventory items recorded yet.</p>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-sm mx-auto">
              Create an ingredient above to start tracking stock.
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
