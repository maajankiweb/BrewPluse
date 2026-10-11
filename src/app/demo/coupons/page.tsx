'use client';

import React, { useState } from 'react';
import {
  Tag,
  Plus,
  Percent,
  CheckCircle2,
  Copy,
  X,
} from 'lucide-react';
import { useDemo, Coupon } from '../demoContext';

export default function DemoCouponsPage() {
  const { coupons, addCoupon, notify } = useDemo();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<Coupon['discountType']>('flat');
  const [value, setValue] = useState('');
  const [minOrder, setMinOrder] = useState('');

  const handleCopy = (couponCode: string) => {
    navigator.clipboard?.writeText(couponCode);
    notify(`Copied coupon code ${couponCode} to clipboard`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !value) return;
    addCoupon({
      code: code.toUpperCase().trim(),
      discountType,
      value: parseFloat(value) || 0,
      minOrder: parseFloat(minOrder) || 0,
      status: 'Active',
    });
    setCode('');
    setValue('');
    setMinOrder('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <Tag className="w-6 h-6 text-amber-500" />
            <span>Coupons &amp; Discount Codes</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Create flat or percentage discount promotions applicable at the POS counter or QR table checkout.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon</span>
        </button>
      </div>

      {/* Coupons Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 shadow-2xs space-y-4 hover:border-amber-400 transition-colors relative overflow-hidden"
          >
            {/* Stamp Ribbon */}
            <div className="flex items-start justify-between">
              <div className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-400 font-mono font-black text-sm tracking-wider flex items-center gap-1.5">
                <span>{coupon.code}</span>
                <button
                  onClick={() => handleCopy(coupon.code)}
                  title="Copy code"
                  className="hover:text-amber-600 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
                {coupon.status}
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xl font-extrabold text-[#141210] dark:text-white">
                {coupon.discountType === 'percentage' ? `${coupon.value}% OFF` : `₹${coupon.value} FLAT OFF`}
              </p>
              <p className="text-xs text-zinc-500">
                Applicable on orders above <strong>₹{coupon.minOrder}</strong>
              </p>
            </div>

            <div className="pt-3 border-t border-[#ebe8e3]/70 dark:border-[#222225] flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Channel: POS &amp; QR</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b dark:border-zinc-700">
              <h3 className="font-extrabold text-sm text-[#141210] dark:text-white">
                Create New Coupon
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE20"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-mono uppercase font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Discount Type
                  </label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as Coupon['discountType'])}
                    className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-semibold"
                  >
                    <option value="flat">Flat ₹ (Off)</option>
                    <option value="percentage">Percentage %</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="50"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Minimum Order (₹)
                </label>
                <input
                  type="number"
                  placeholder="200"
                  value={minOrder}
                  onChange={(e) => setMinOrder(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-mono"
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
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
