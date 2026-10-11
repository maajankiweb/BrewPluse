'use client';

import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Search,
  Plus,
  Coffee,
  Check,
  X,
  Edit2,
} from 'lucide-react';
import { useDemo, MenuItem } from '../demoContext';

export default function DemoMenuPage() {
  const { menuItems, toggleItemStock, addMenuItem } = useDemo();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Coffee');
  const [price, setPrice] = useState('');
  const [isVeg, setIsVeg] = useState(true);
  const [description, setDescription] = useState('');

  const categories = ['All', 'Coffee', 'Cold Brew', 'Beverages', 'Bakery', 'Desserts', 'Snacks'];

  const filtered = menuItems.filter((item) => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;
    addMenuItem({
      name,
      category,
      price: parseFloat(price) || 0,
      isVeg,
      inStock: true,
      description: description || 'Specialty handcrafted cafe preparation.',
    });
    setName('');
    setPrice('');
    setDescription('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <UtensilsCrossed className="w-6 h-6 text-amber-500" />
            <span>Menu &amp; Catalog Management</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Live catalog synced across POS billing, QR table ordering, and TV menu display.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Menu Item</span>
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white dark:bg-[#121214] text-zinc-600 dark:text-zinc-400 border border-[#ebe8e3] dark:border-[#222225] hover:bg-neutral-100 dark:hover:bg-zinc-800'
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
            placeholder="Search catalog items..."
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-xl text-xs text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>
      </div>

      {/* Items Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className={`bg-white dark:bg-[#121214] border rounded-2xl p-4 flex flex-col justify-between shadow-2xs transition-all ${
              item.inStock
                ? 'border-[#ebe8e3] dark:border-[#222225] hover:border-amber-400'
                : 'border-zinc-300 dark:border-zinc-800 opacity-60 bg-neutral-50/60 dark:bg-zinc-900/60'
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                  <Coffee className="w-5 h-5" />
                </div>

                {/* Stock Toggle Switch */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                    {item.inStock ? 'In Stock' : '86ed'}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleItemStock(item.id)}
                    aria-label="Toggle item stock"
                    className={`w-8 h-4.5 rounded-full p-0.5 transition-colors relative flex items-center ${
                      item.inStock ? 'bg-emerald-500' : 'bg-zinc-300 dark:bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                        item.inStock ? 'translate-x-3.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`}
                  />
                  <h3 className="font-bold text-sm text-[#141210] dark:text-white line-clamp-1">
                    {item.name}
                  </h3>
                </div>
                <p className="text-[10px] font-mono text-zinc-400">{item.category}</p>
                <p className="text-xs text-zinc-500 line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#ebe8e3]/60 dark:border-[#222225] flex items-center justify-between">
              <span className="font-mono font-black text-sm text-[#141210] dark:text-white">
                ₹{item.price.toFixed(2)}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Sync&apos;d Everywhere
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Item Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b dark:border-zinc-700">
              <h3 className="font-extrabold text-base text-[#141210] dark:text-white">
                Add New Menu Item
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Item Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vanilla Bean Frappe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="180"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Food Preference
                </label>
                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-emerald-600">
                    <input
                      type="radio"
                      checked={isVeg}
                      onChange={() => setIsVeg(true)}
                    />
                    <span>Vegetarian</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-semibold text-rose-600">
                    <input
                      type="radio"
                      checked={!isVeg}
                      onChange={() => setIsVeg(false)}
                    />
                    <span>Non-Vegetarian</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Ingredients and flavour profile notes..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-2.5 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-bold hover:bg-neutral-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
