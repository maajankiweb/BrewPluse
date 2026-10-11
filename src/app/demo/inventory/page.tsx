'use client';

import React, { useState } from 'react';
import {
  Package,
  Search,
  AlertTriangle,
  CheckCircle2,
  Plus,
  RefreshCw,
  X,
} from 'lucide-react';
import { useDemo, InventoryItem } from '../demoContext';

export default function DemoInventoryPage() {
  const { inventory, updateInventoryStock } = useDemo();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [stockInput, setStockInput] = useState<number>(0);

  const categories = ['All', 'Coffee', 'Dairy', 'Dairy Alternatives', 'Syrups', 'Packaging', 'Cutlery', 'Ingredients'];

  const filtered = inventory.filter((item) => {
    const matchesCat = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const lowStockCount = inventory.filter((i) => i.currentStock <= i.minThreshold).length;

  const handleOpenEdit = (item: InventoryItem) => {
    setEditingItem(item);
    setStockInput(item.currentStock);
  };

  const handleSaveStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    updateInventoryStock(editingItem.id, stockInput);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <Package className="w-6 h-6 text-amber-500" />
            <span>Raw Inventory &amp; Stock</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Track ingredients, beans, milk consumption, and packaging units in real time.
          </p>
        </div>

        {lowStockCount > 0 && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 text-xs font-bold">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>{lowStockCount} items below threshold</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                  : 'bg-neutral-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search ingredient or item..."
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-xl text-xs text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#ebe8e3] dark:border-[#222225] text-zinc-400 uppercase font-mono tracking-wider">
                <th className="py-3 px-3">Item Name</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Current Stock</th>
                <th className="py-3 px-3">Min. Threshold</th>
                <th className="py-3 px-3">Stock Status</th>
                <th className="py-3 px-3">Last Restocked</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebe8e3]/60 dark:divide-[#222225]">
              {filtered.map((item) => {
                const isLow = item.currentStock <= item.minThreshold;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-neutral-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-3 font-bold text-[#141210] dark:text-white">
                      {item.name}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-500">{item.category}</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-sm text-[#141210] dark:text-white">
                      {item.currentStock} <span className="text-xs font-normal text-zinc-400">{item.unit}</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-zinc-500">
                      {item.minThreshold} {item.unit}
                    </td>
                    <td className="py-3.5 px-3">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Low Stock</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Optimal</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-3 text-zinc-500">{item.lastRestocked}</td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="px-3 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 inline-flex items-center gap-1 font-semibold text-[11px]"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Update</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Stock Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b dark:border-zinc-700">
              <h3 className="font-extrabold text-sm text-[#141210] dark:text-white">
                Update Stock Quantity
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-[#141210] dark:text-white">
                {editingItem.name}
              </p>
              <p className="text-[10px] text-zinc-400 font-mono">
                Category: {editingItem.category} &bull; Unit: {editingItem.unit}
              </p>
            </div>

            <form onSubmit={handleSaveStock} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase text-zinc-500 block mb-1">
                  New Current Quantity ({editingItem.unit})
                </label>
                <input
                  type="number"
                  step="any"
                  autoFocus
                  value={stockInput}
                  onChange={(e) => setStockInput(parseFloat(e.target.value) || 0)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-sm font-mono font-bold text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-bold text-xs hover:bg-neutral-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Save Stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
