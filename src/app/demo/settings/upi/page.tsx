'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  ChevronLeft,
  QrCode,
  Save,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoUpiSettingsPage() {
  const { notify } = useDemo();
  const [upiId, setUpiId] = useState('brewpluse@icici');
  const [merchantName, setMerchantName] = useState('BrewPluse Flagship Cafe');
  const [enableDynamicQr, setEnableDynamicQr] = useState(true);
  const [autoVerifyPayment, setAutoVerifyPayment] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('UPI Payment Gateway settings saved!');
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
          <CreditCard className="w-6 h-6 text-amber-500" />
          <span>UPI Payment Gateway Configuration</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Direct merchant UPI integration for 0% MDR instant bank settlement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Form */}
        <div className="md:col-span-8 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 shadow-2xs space-y-5 text-xs">
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Merchant UPI VPA ID
              </label>
              <input
                type="text"
                required
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="e.g. yourcafe@hdfcbank"
                className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono font-bold focus:outline-none focus:border-amber-500"
              />
              <p className="text-[10px] text-zinc-400 mt-1">
                Funds from Google Pay, PhonePe, and Paytm will be routed directly to this VPA.
              </p>
            </div>

            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Registered Merchant Display Name
              </label>
              <input
                type="text"
                required
                value={merchantName}
                onChange={(e) => setMerchantName(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-2 border-t border-[#ebe8e3] dark:border-[#222225]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#141210] dark:text-white">
                    Dynamic Bill Amount QR Codes
                  </p>
                  <p className="text-zinc-500 text-[11px]">
                    Encodes the exact bill amount into the QR so guests don&apos;t type amounts manually.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={enableDynamicQr}
                  onChange={(e) => setEnableDynamicQr(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-[#141210] dark:text-white">
                    Instant Bank Webhook Settlement
                  </p>
                  <p className="text-zinc-500 text-[11px]">
                    Auto-marks table order as &quot;Paid&quot; the second funds hit your account.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={autoVerifyPayment}
                  onChange={(e) => setAutoVerifyPayment(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#ebe8e3] dark:border-[#222225] flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Gateway Config</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right QR Preview */}
        <div className="md:col-span-4 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 shadow-2xs text-center space-y-4">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
            Live UPI QR Preview
          </span>

          <div className="p-4 bg-neutral-50 dark:bg-zinc-800 rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-700 space-y-2">
            <QrCode className="w-28 h-28 mx-auto text-[#0b2b1a] dark:text-white" />
            <p className="font-mono font-bold text-xs text-[#141210] dark:text-white">{upiId}</p>
            <p className="text-[10px] text-zinc-400 font-mono">BHIM &bull; PhonePe &bull; GPay</p>
          </div>

          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4" />
            <span>0% MDR &bull; Direct Bank Transfer</span>
          </div>
        </div>
      </div>
    </div>
  );
}
