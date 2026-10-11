'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Package,
  Plus,
  Search,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  SlidersHorizontal,
  Link2,
  Trash2,
  Utensils,
  ChevronRight,
  Layers,
  Check,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

interface Ingredient {
  id: string;
  name: string;
  stockQty: number;
  unit: string;
  lowStockAlert: number;
  mappedDishesCount?: number;
}

interface RecipeMap {
  dishName: string;
  ingredientId: string;
  deductPerServing: number;
  unit: string;
}

const DEFAULT_INGREDIENTS: Ingredient[] = [
  { id: 'ing-1', name: 'Fresh Whole Milk', stockQty: 24500, unit: 'ml', lowStockAlert: 5000, mappedDishesCount: 4 },
  { id: 'ing-2', name: 'Arabica Espresso Beans', stockQty: 11200, unit: 'g', lowStockAlert: 2000, mappedDishesCount: 5 },
  { id: 'ing-3', name: 'French Croissant Butter', stockQty: 1800, unit: 'g', lowStockAlert: 2500, mappedDishesCount: 2 }, // low stock
  { id: 'ing-4', name: 'Fresh Cottage Cheese (Paneer)', stockQty: 9500, unit: 'g', lowStockAlert: 2000, mappedDishesCount: 1 },
  { id: 'ing-5', name: 'CTC Assam Tea Leaves', stockQty: 4800, unit: 'g', lowStockAlert: 1000, mappedDishesCount: 2 },
  { id: 'ing-6', name: 'Refined White Sugar', stockQty: 14000, unit: 'g', lowStockAlert: 3000, mappedDishesCount: 3 },
];

export default function InventoryPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'stock' | 'recipe'>('stock');
  const [autoDeductEnabled, setAutoDeductEnabled] = useState(true);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  // Form states
  const [itemName, setItemName] = useState('');
  const [stockQty, setStockQty] = useState('1000');
  const [unit, setUnit] = useState('ml');
  const [lowStockAlert, setLowStockAlert] = useState('200');

  // Recipe mapping state
  const [selectedDish, setSelectedDish] = useState('Artisan Flat White');
  const [selectedIngredientId, setSelectedIngredientId] = useState('ing-1');
  const [deductQty, setDeductQty] = useState('200');

  // Search & filter
  const [searchQuery, setSearchQuery] = useState('');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);

  // Initialize
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`brewpluse::inventory_${storeSlug}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setIngredients(parsed);
            return;
          }
        }
      } catch (e) {}
      setIngredients(DEFAULT_INGREDIENTS);
      try {
        localStorage.setItem(`brewpluse::inventory_${storeSlug}`, JSON.stringify(DEFAULT_INGREDIENTS));
      } catch (e) {}
    }
  }, [storeSlug]);

  const saveInventory = (updated: Ingredient[]) => {
    setIngredients(updated);
    try {
      localStorage.setItem(`brewpluse::inventory_${storeSlug}`, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) {
      toast.error('Please enter an ingredient name.');
      return;
    }

    const newIng: Ingredient = {
      id: `ing-${Date.now()}`,
      name: itemName.trim(),
      stockQty: parseFloat(stockQty) || 0,
      unit: unit.trim() || 'pcs',
      lowStockAlert: parseFloat(lowStockAlert) || 0,
      mappedDishesCount: 0,
    };

    const updated = [newIng, ...ingredients];
    saveInventory(updated);
    setItemName('');
    setStockQty('1000');
    setLowStockAlert('200');
    toast.success(`Ingredient "${newIng.name}" added to inventory.`);
  };

  const handleDeleteIngredient = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from inventory?`)) {
      const updated = ingredients.filter((i) => i.id !== id);
      saveInventory(updated);
      toast.success(`${name} removed.`);
    }
  };

  const handleAdjustStock = (id: string, delta: number) => {
    const updated = ingredients.map((i) => {
      if (i.id === id) {
        return { ...i, stockQty: Math.max(0, i.stockQty + delta) };
      }
      return i;
    });
    saveInventory(updated);
  };

  const handleMapRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    const ing = ingredients.find((i) => i.id === selectedIngredientId);
    if (!ing) return;

    toast.success(
      `Linked ${deductQty}${ing.unit} of ${ing.name} to "${selectedDish}". Will auto-deduct on every order.`
    );
  };

  // Metrics
  const totalIngredients = ingredients.length;
  const lowStockItems = ingredients.filter((i) => i.stockQty <= i.lowStockAlert);
  const optimalItems = ingredients.filter((i) => i.stockQty > i.lowStockAlert);

  // Filtered ingredients
  const filteredIngredients = ingredients.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLowStock = showLowStockOnly ? item.stockQty <= item.lowStockAlert : true;
    return matchesSearch && matchesLowStock;
  });

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4 font-sans text-[#12201B] dark:text-zinc-200 pb-16 animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight">
                Recipe &amp; Ingredient Inventory
              </h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981]">
                AUTO-DEDUCT LIVE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Track raw ingredients, set threshold alerts, and link recipes to dish orders.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setAutoDeductEnabled(!autoDeductEnabled);
              toast.success(autoDeductEnabled ? 'Auto-Deduct paused.' : 'Auto-Deduct activated.');
            }}
            className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shadow-2xs ${
              autoDeductEnabled
                ? 'bg-[#E8F6EF] dark:bg-[#142E25] border-[#0B5C45] text-[#087A5B] dark:text-[#10B981]'
                : 'bg-white dark:bg-[#0E2018] border-[#E5ECE8] dark:border-[#1E382E] text-[#12201B] dark:text-white hover:bg-[#F8FAF8]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${autoDeductEnabled ? 'text-[#087A5B]' : ''}`} />
            <span>{autoDeductEnabled ? 'Auto-Deduct Active' : 'Enable Auto-Deduct'}</span>
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('stock')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'stock'
                ? 'bg-[#0B2B1A] text-white shadow-xs'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Stock Ledger ({ingredients.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('recipe')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'recipe'
                ? 'bg-[#0B2B1A] text-white shadow-xs'
                : 'text-neutral-500 hover:text-black dark:hover:text-white'
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Dish Recipe Mapping</span>
          </button>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">TOTAL INGREDIENTS</p>
              <p className="text-2xl font-bold text-[#12201B] dark:text-white mt-1">{totalIngredients}</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">
                Tracked in live kitchen inventory
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <Package className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">OPTIMAL STOCK</p>
              <p className="text-2xl font-bold text-[#087A5B] dark:text-[#10B981] mt-1">{optimalItems.length}</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">
                Safe margin above alert threshold
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] dark:text-[#F59E0B]">
                LOW STOCK ALERTS
              </p>
              <p className="text-2xl font-bold text-[#D97706] dark:text-[#F59E0B] mt-1">{lowStockItems.length}</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">
                Items needing immediate restock
              </p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* TAB 1: STOCK LEDGER */}
        {activeTab === 'stock' && (
          <div className="space-y-4">
            {/* Add Ingredient Form */}
            <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#12201B] dark:text-white">Add Raw Ingredient</h3>
                  <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                    Record a new pantry item and set its low-stock alert limit
                  </p>
                </div>
              </div>

              <form onSubmit={handleAddIngredient} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1">
                      INGREDIENT NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="e.g. Arabica Roast Beans"
                      className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white focus:outline-none focus:border-[#0B5C45]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1">
                      INITIAL STOCK
                    </label>
                    <input
                      type="number"
                      required
                      value={stockQty}
                      onChange={(e) => setStockQty(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white focus:outline-none focus:border-[#0B5C45]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1">
                      UNIT (ml, g, kg, pcs)
                    </label>
                    <input
                      type="text"
                      required
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      placeholder="ml or g"
                      className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white focus:outline-none focus:border-[#0B5C45]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1">
                      LOW STOCK ALERT LIMIT
                    </label>
                    <input
                      type="number"
                      required
                      value={lowStockAlert}
                      onChange={(e) => setLowStockAlert(e.target.value)}
                      className="w-full h-9 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white focus:outline-none focus:border-[#0B5C45]"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
                  >
                    Save to Ledger
                  </button>
                </div>
              </form>
            </div>

            {/* Active Ledger List */}
            <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold text-[#12201B] dark:text-white">Live Stock Inventory</h3>
                  <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                    Adjust levels or check auto-deduction metrics
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-[#8D9792] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search ingredient..."
                      className="h-8 pl-8 pr-3 rounded-lg bg-[#F8FAF8] dark:bg-[#132A20] border border-[#E5ECE8] dark:border-[#1E382E] text-xs"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowLowStockOnly(!showLowStockOnly)}
                    className={`h-8 px-2.5 rounded-lg border text-xs font-bold flex items-center gap-1 cursor-pointer ${
                      showLowStockOnly
                        ? 'bg-amber-500 text-black border-amber-600'
                        : 'bg-neutral-50 text-neutral-600 border-neutral-200'
                    }`}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    <span>Low Stock Only</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800 text-[10px] font-bold text-[#8D9792] uppercase tracking-wider">
                      <th className="py-2.5 px-3">Ingredient</th>
                      <th className="py-2.5 px-3">Current Stock</th>
                      <th className="py-2.5 px-3">Alert Limit</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3 text-right">Quick Restock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 font-medium">
                    {filteredIngredients.map((ing) => {
                      const isLow = ing.stockQty <= ing.lowStockAlert;
                      return (
                        <tr key={ing.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-900/40 transition-colors">
                          <td className="py-3 px-3 font-bold text-[#12201B] dark:text-white">
                            {ing.name}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold">
                            {ing.stockQty.toLocaleString()} {ing.unit}
                          </td>
                          <td className="py-3 px-3 font-mono text-neutral-500">
                            {ing.lowStockAlert.toLocaleString()} {ing.unit}
                          </td>
                          <td className="py-3 px-3">
                            {isLow ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 flex items-center gap-1 w-max">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Low Stock</span>
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 flex items-center gap-1 w-max">
                                <Check className="w-3 h-3" />
                                <span>Optimal</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right space-x-1">
                            <button
                              type="button"
                              onClick={() => handleAdjustStock(ing.id, 500)}
                              className="px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-[10px] font-bold cursor-pointer"
                            >
                              +500
                            </button>
                            <button
                              type="button"
                              onClick={() => handleAdjustStock(ing.id, -200)}
                              className="px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 text-[10px] font-bold cursor-pointer"
                            >
                              -200
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteIngredient(ing.id, ing.name)}
                              className="p-1 rounded text-neutral-400 hover:text-red-500 cursor-pointer ml-1 inline-block align-middle"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RECIPE MAPPING */}
        {activeTab === 'recipe' && (
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Map Recipe Ingredients to Menu Items
                </h3>
                <p className="text-xs text-neutral-500">
                  Example: 1 Cup Flat White = 200 ml Milk + 18 g Espresso Beans
                </p>
              </div>
            </div>

            <form onSubmit={handleMapRecipe} className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1">
                  SELECT MENU DISH
                </label>
                <select
                  value={selectedDish}
                  onChange={(e) => setSelectedDish(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-neutral-50 dark:bg-[#132A20] border border-neutral-200 dark:border-[#1E382E] text-xs font-semibold focus:outline-none"
                >
                  <option value="Artisan Flat White">Artisan Flat White</option>
                  <option value="Nitro Cold Brew">Nitro Cold Brew</option>
                  <option value="Butter Croissant">Butter Croissant</option>
                  <option value="Paneer Tikka Sandwich">Paneer Tikka Sandwich</option>
                  <option value="Kolkata Masala Chai">Kolkata Masala Chai</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1">
                  LINK RAW INGREDIENT
                </label>
                <select
                  value={selectedIngredientId}
                  onChange={(e) => setSelectedIngredientId(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-neutral-50 dark:bg-[#132A20] border border-neutral-200 dark:border-[#1E382E] text-xs font-semibold focus:outline-none"
                >
                  {ingredients.map((ing) => (
                    <option key={ing.id} value={ing.id}>
                      {ing.name} ({ing.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#8D9792] mb-1">
                  DEDUCT PER ORDER
                </label>
                <input
                  type="number"
                  value={deductQty}
                  onChange={(e) => setDeductQty(e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-neutral-50 dark:bg-[#132A20] border border-neutral-200 dark:border-[#1E382E] text-xs font-mono font-bold focus:outline-none"
                />
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full h-9 rounded-xl bg-[#0B2B1A] hover:bg-[#124229] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Assign to Dish</span>
                </button>
              </div>
            </form>

            {/* Configured Recipes Summary */}
            <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 space-y-2">
              <h4 className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                Current Active Recipe Configurations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                  <div>
                    <p className="font-bold">Artisan Flat White</p>
                    <p className="text-[11px] text-neutral-500 font-mono">Deducts: 200ml Milk + 18g Espresso</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex justify-between items-center">
                  <div>
                    <p className="font-bold">Paneer Tikka Sandwich</p>
                    <p className="text-[11px] text-neutral-500 font-mono">Deducts: 120g Paneer + 25g Butter</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
