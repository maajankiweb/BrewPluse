'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Truck,
  ChevronLeft,
  Save,
  CheckCircle2,
  Globe,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoDeliverySettingsPage() {
  const { notify } = useDemo();
  const [radius, setRadius] = useState('6');
  const [minOrder, setMinOrder] = useState('300');
  const [fee, setFee] = useState('35');
  const [zomatoSync, setZomatoSync] = useState(true);
  const [swiggySync, setSwiggySync] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Delivery parameters and aggregator sync updated!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 animate-fade-in">
      <Link
        href="/demo/settings"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-amber-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Settings</span>
      </Link>

      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
          <Truck className="w-6 h-6 text-amber-500" />
          <span>Direct Delivery &amp; Aggregator Sync</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Manage your own zero-commission cafe delivery radius and link Zomato / Swiggy menu catalogs.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 shadow-2xs space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Direct Delivery Radius (km)
            </label>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Min. Order for Free Delivery (₹)
            </label>
            <input
              type="number"
              value={minOrder}
              onChange={(e) => setMinOrder(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Standard Delivery Charge (₹)
            </label>
            <input
              type="number"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono font-bold focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        {/* Aggregators */}
        <div className="space-y-4 pt-4 border-t border-[#ebe8e3] dark:border-[#222225]">
          <h3 className="font-bold text-sm text-[#141210] dark:text-white">
            Aggregator Menu &amp; Order Webhooks
          </h3>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#ebe8e3] dark:border-[#222225]">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">Zomato Restaurant Partner Sync</p>
              <p className="text-zinc-500 text-[11px]">Auto-accept Zomato online orders directly into Kitchen KDS queue.</p>
            </div>
            <input
              type="checkbox"
              checked={zomatoSync}
              onChange={(e) => setZomatoSync(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#ebe8e3] dark:border-[#222225]">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">Swiggy Merchant API Sync</p>
              <p className="text-zinc-500 text-[11px]">Single menu catalog update reflects automatically on Swiggy.</p>
            </div>
            <input
              type="checkbox"
              checked={swiggySync}
              onChange={(e) => setSwiggySync(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-[#ebe8e3] dark:border-[#222225] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Delivery Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
