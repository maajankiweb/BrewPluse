'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Link from 'next/link';
import {
  ArrowLeft,
  Printer,
  Plus,
  SlidersVertical,
  ChevronDown,
} from 'lucide-react';
import { useToast } from '@/components/Toast';



export default function PrintersSettingsPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [billMode, setBillMode] = useState<'print' | 'email'>('print');
  const [billCopies, setBillCopies] = useState(1);
  const [kotCopies, setKotCopies] = useState(1);
  const [autoPrintBill, setAutoPrintBill] = useState(true);
  const [autoPrintKot, setAutoPrintKot] = useState(true);
  const toast = useToast();

  const basePath = `/dashboard/${storeSlug}`;

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-6 font-sans text-neutral-800 dark:text-zinc-200 max-w-5xl mx-auto pb-12">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <Link
            href={`${basePath}/settings`}
            className="inline-flex items-center gap-2 h-9 px-3.5 rounded-full bg-white dark:bg-[#0E2018] hover:bg-neutral-100 dark:hover:bg-[#142A21] text-neutral-700 dark:text-neutral-200 border border-neutral-200/80 dark:border-[#1E342B] text-xs font-semibold transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-400" />
            <span>Back to Settings</span>
          </Link>

          <button
            type="button"
            onClick={() => toast.info('Printer auto-detect scanning local USB/Bluetooth...')}
            className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl text-xs font-bold bg-[#062F23] hover:bg-[#0B5C45] text-white shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Printer</span>
          </button>
        </div>

        {/* Hero Card */}
        <div className="p-6 rounded-[24px] bg-white dark:bg-[#0E2018] border border-neutral-200/80 dark:border-[#1E342B] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
              <Printer className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black text-neutral-900 dark:text-white tracking-tight">
                Printers
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 max-w-xl">
                Connect your receipt and kitchen printers. BrewPluse automatically prints bills and
                kitchen tickets based on your setup.
              </p>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center gap-2 text-xs font-bold shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Automatic Printing Ready</span>
          </div>
        </div>

        {/* Connected Printers (0) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-neutral-900 dark:text-white uppercase tracking-wider">
              Connected Printers (0)
            </h2>
          </div>

          <div className="p-10 rounded-[24px] bg-white dark:bg-[#0E2018] border border-dashed border-neutral-300 dark:border-[#1E342B] text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-[#11241C] mx-auto flex items-center justify-center text-neutral-400">
              <Printer className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                No Printers Connected
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mt-1">
                Add your thermal receipt printer or office printer to enable automatic bill &amp; kitchen
                printing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => toast.info('Scanning USB / Bluetooth / Network ESC/POS printers...')}
              className="h-9 px-5 rounded-xl text-xs font-bold bg-[#062F23] hover:bg-[#0B5C45] text-white cursor-pointer shadow-xs inline-flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Connect Printer</span>
            </button>
          </div>
        </section>

        {/* Customer Bills */}
        <section className="space-y-6">
          <div className="p-6 rounded-[24px] bg-white dark:bg-[#0E2018] border border-neutral-200/80 dark:border-[#1E342B] shadow-xs space-y-5">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-amber-600 dark:text-amber-400 block mb-1">
                Customer Receipts
              </span>
              <h2 className="text-lg font-black text-neutral-900 dark:text-white">Customer Bills</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                How should BrewPluse send customer bills when an order is marked as paid?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBillMode('print')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  billMode === 'print'
                    ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/40'
                    : 'bg-neutral-50 dark:bg-[#11241C] border-neutral-200/80 dark:border-[#1E342B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">🖨️</span>
                    {billMode === 'print' && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                        Selected
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Print Bill</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Automatically print the receipt after payment.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setBillMode('email')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                  billMode === 'email'
                    ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/40'
                    : 'bg-neutral-50 dark:bg-[#11241C] border-neutral-200/80 dark:border-[#1E342B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">✉️</span>
                    {billMode === 'email' && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                        Selected
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">Email Bill</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Automatically email the receipt to the customer after payment.
                  </p>
                </div>
              </button>
            </div>

            <div className="pt-4 border-t border-neutral-100 dark:border-[#1E342B] grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-extrabold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Receipt Printer
                </label>
                <select className="w-full h-10 px-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-xs font-bold outline-none text-neutral-900 dark:text-white">
                  <option value="">Select a printer...</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Copies
                </label>
                <input
                  min={1}
                  max={5}
                  value={billCopies}
                  onChange={(e) => setBillCopies(Number(e.target.value))}
                  type="number"
                  className="w-24 h-10 px-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-xs font-bold text-neutral-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <input
                    type="checkbox"
                    checked={autoPrintBill}
                    onChange={(e) => setAutoPrintBill(e.target.checked)}
                    className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <span>Automatically print bill after payment</span>
                </label>
              </div>
            </div>
          </div>

          {/* Kitchen Orders (KOT) */}
          <div className="p-6 rounded-[24px] bg-white dark:bg-[#0E2018] border border-neutral-200/80 dark:border-[#1E342B] shadow-xs space-y-5">
            <div>
              <span className="text-[10px] font-black tracking-widest uppercase text-amber-600 dark:text-amber-400 block mb-1">
                Kitchen Preparation
              </span>
              <h2 className="text-lg font-black text-neutral-900 dark:text-white">
                Kitchen Orders (KOT)
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Send preparation tickets directly to your kitchen or bar printer.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-extrabold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Kitchen Printer
                </label>
                <select className="w-full h-10 px-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-xs font-bold outline-none text-neutral-900 dark:text-white">
                  <option value="">None (KOT printing off)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-extrabold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Copies
                </label>
                <input
                  min={1}
                  max={5}
                  value={kotCopies}
                  onChange={(e) => setKotCopies(Number(e.target.value))}
                  type="number"
                  className="w-24 h-10 px-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-xs font-bold text-neutral-900 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                  <input
                    type="checkbox"
                    checked={autoPrintKot}
                    onChange={(e) => setAutoPrintKot(e.target.checked)}
                    className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                  />
                  <span>Automatically print KOT when order is confirmed</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Accordion */}
        <section className="pt-2">
          <div className="p-5 rounded-[24px] bg-white dark:bg-[#0E2018] border border-neutral-200/80 dark:border-[#1E342B]">
            <button
              type="button"
              className="w-full flex items-center justify-between text-left cursor-pointer select-none"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-[#11241C] flex items-center justify-center text-neutral-500">
                  <SlidersVertical className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white">
                    Advanced Printing Rules &amp; History
                  </h3>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    Fine-tune bar printer routing or view recent print job status logs.
                  </p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </button>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
