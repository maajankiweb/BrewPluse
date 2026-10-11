'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Percent,
  ChevronLeft,
  Save,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoTaxesSettingsPage() {
  const { notify } = useDemo();
  const [cgst, setCgst] = useState('2.5');
  const [sgst, setSgst] = useState('2.5');
  const [isTaxInclusive, setIsTaxInclusive] = useState(false);
  const [serviceCharge, setServiceCharge] = useState('0');
  const [roundOff, setRoundOff] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Tax & Service configuration saved!');
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
          <Percent className="w-6 h-6 text-amber-500" />
          <span>GST &amp; Tax Structure</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Set up statutory restaurant GST slabs, tax-inclusive display, and optional service fees.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 shadow-2xs space-y-6 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Central GST (CGST %)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={cgst}
              onChange={(e) => setCgst(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono font-bold focus:outline-none focus:border-amber-500"
            />
            <span className="text-[10px] text-zinc-400 mt-1 block">Default for standalone cafes: 2.5%</span>
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              State GST (SGST %)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={sgst}
              onChange={(e) => setSgst(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono font-bold focus:outline-none focus:border-amber-500"
            />
            <span className="text-[10px] text-zinc-400 mt-1 block">Default for standalone cafes: 2.5%</span>
          </div>
        </div>

        <div className="space-y-4 pt-2 border-t border-[#ebe8e3] dark:border-[#222225]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">
                Tax-Inclusive Menu Pricing
              </p>
              <p className="text-zinc-500 text-[11px]">
                When enabled, listed menu prices (e.g. ₹160) already include GST.
              </p>
            </div>
            <input
              type="checkbox"
              checked={isTaxInclusive}
              onChange={(e) => setIsTaxInclusive(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">
                Round-off Bill Total
              </p>
              <p className="text-zinc-500 text-[11px]">
                Automatically rounds ₹483.25 to nearest ₹483.00 for smoother cash settlement.
              </p>
            </div>
            <input
              type="checkbox"
              checked={roundOff}
              onChange={(e) => setRoundOff(e.target.checked)}
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
            <span>Save Tax Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
