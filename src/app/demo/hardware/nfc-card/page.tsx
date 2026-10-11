'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  CheckCircle2,
  ChevronLeft,
  Truck,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoNfcCardPage() {
  const { notify } = useDemo();
  const [selectedPack, setSelectedPack] = useState(25);

  const handleOrder = () => {
    notify(`Order inquiry for ${selectedPack}x Smart NFC Cards submitted. Dispatch within 48h!`);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 animate-fade-in">
      {/* Back Button */}
      <Link
        href="/demo/hardware"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-amber-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Hardware Store</span>
      </Link>

      {/* Main Product Showcase */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[28px] p-6 sm:p-10 shadow-2xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left Column Graphic Mockup */}
        <div className="md:col-span-5 bg-gradient-to-br from-[#0b2b1a] via-[#054326] to-[#012213] rounded-3xl p-6 text-white text-center flex flex-col justify-between h-[300px] shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-emerald-300">
            <span>BREWPULSE NFC</span>
            <span>NTAG213 CHIP</span>
          </div>

          <div className="space-y-2 py-4">
            <CreditCard className="w-14 h-14 text-emerald-400 mx-auto" />
            <h3 className="font-extrabold text-base tracking-wide">
              Tap Phone to Order
            </h3>
            <p className="text-[11px] text-emerald-200/80">
              iPhone &bull; Android &bull; Zero Apps
            </p>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-emerald-300">
            <span>TABLE 04</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Right Column Details */}
        <div className="md:col-span-7 space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
              Instant Contactless Tech
            </span>
            <h1 className="text-2xl font-black text-[#141210] dark:text-white">
              Smart NFC Table Cards
            </h1>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Eliminate friction. Guests simply tap their iPhone or Android phone against the card on the table to instantly open your digital menu in Safari or Chrome.
            </p>
          </div>

          {/* Pack Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
              Choose Card Pack:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 10, price: '₹1,490' },
                { count: 25, price: '₹3,490' },
                { count: 50, price: '₹6,490' },
              ].map((pack) => (
                <button
                  key={pack.count}
                  type="button"
                  onClick={() => setSelectedPack(pack.count)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    selectedPack === pack.count
                      ? 'border-amber-500 bg-amber-50/20 dark:bg-amber-950/20'
                      : 'border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  <p className="font-bold text-xs text-[#141210] dark:text-white">{pack.count} Cards</p>
                  <p className="font-mono text-xs font-black text-amber-600 dark:text-amber-400">{pack.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Pre-programmed to your cafe&apos;s specific table numbers</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Matte, waterproof, spill-resistant 300-micron PVC card</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Free 3M adhesive base pads included</span>
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={handleOrder}
              className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg transition-all active:scale-[0.98]"
            >
              Order {selectedPack} Pack Now &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
