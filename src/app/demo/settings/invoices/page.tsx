'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Receipt,
  ChevronLeft,
  Save,
  Printer,
  FileText,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoInvoicesSettingsPage() {
  const { notify } = useDemo();
  const [prefix, setPrefix] = useState('INV-BP-');
  const [headerText, setHeaderText] = useState('Welcome to BrewPluse Flagship Cafe');
  const [footerText, setFooterText] = useState('Thank you for brewing with us! Have a wonderful day.');
  const [paperSize, setPaperSize] = useState('80mm');
  const [showFssai, setShowFssai] = useState(true);
  const [showGstin, setShowGstin] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Thermal invoice and receipt template saved!');
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
          <Receipt className="w-6 h-6 text-amber-500" />
          <span>Invoice &amp; Thermal Receipt Layout</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Format thermal printer slips, KOT kitchen tickets, and tax invoice headers.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 shadow-2xs space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Invoice Serial Prefix
            </label>
            <input
              type="text"
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Thermal Paper Width
            </label>
            <select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-semibold focus:outline-none focus:border-amber-500"
            >
              <option value="80mm">80mm (Standard Desktop POS Roll)</option>
              <option value="58mm">58mm (Handheld Mobile POS Roll)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
            Receipt Header Greeting
          </label>
          <input
            type="text"
            value={headerText}
            onChange={(e) => setHeaderText(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
            Receipt Footer Note
          </label>
          <input
            type="text"
            value={footerText}
            onChange={(e) => setFooterText(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="space-y-3 pt-2 border-t border-[#ebe8e3] dark:border-[#222225]">
          <div className="flex items-center justify-between">
            <span className="font-bold text-[#141210] dark:text-white">Print FSSAI License Number</span>
            <input
              type="checkbox"
              checked={showFssai}
              onChange={(e) => setShowFssai(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="font-bold text-[#141210] dark:text-white">Print GSTIN Tax Identification</span>
            <input
              type="checkbox"
              checked={showGstin}
              onChange={(e) => setShowGstin(e.target.checked)}
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
            <span>Save Receipt Template</span>
          </button>
        </div>
      </form>
    </div>
  );
}
