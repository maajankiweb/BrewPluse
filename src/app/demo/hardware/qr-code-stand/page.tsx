'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  QrCode,
  CheckCircle2,
  ChevronLeft,
  Truck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoQrStandPage() {
  const { notify } = useDemo();
  const [selectedPack, setSelectedPack] = useState(12);

  const handleOrder = () => {
    notify(`Order inquiry for ${selectedPack}x Acrylic QR Stands submitted. Team will confirm branding artwork!`);
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
        <div className="md:col-span-5 bg-gradient-to-b from-neutral-100 to-neutral-200 dark:from-zinc-800 dark:to-zinc-900 rounded-3xl p-6 text-center flex flex-col justify-between h-[320px] shadow-xl border border-zinc-300 dark:border-zinc-700 relative">
          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase">
            <span>PREMIUM ACRYLIC</span>
            <span>TEAKWOOD BASE</span>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-md w-36 h-36 mx-auto flex flex-col items-center justify-center border border-zinc-200">
            <QrCode className="w-24 h-24 text-[#0b2b1a]" />
            <span className="text-[9px] font-mono font-bold text-zinc-500 mt-0.5">TABLE 02</span>
          </div>

          <div className="bg-[#4a2e18] text-amber-200 text-[10px] font-bold py-1.5 rounded-lg font-mono">
            SOLID NATURAL WOOD BASE
          </div>
        </div>

        {/* Right Column Details */}
        <div className="md:col-span-7 space-y-5">
          <div className="space-y-1">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400">
              Cafe Tabletop Essential
            </span>
            <h1 className="text-2xl font-black text-[#141210] dark:text-white">
              Acrylic QR Code Stands
            </h1>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Elevate your dining space. Laser-cut crystal acrylic stands paired with weighted natural teakwood blocks. Unbreakable, washable, and anti-fade UV printed.
            </p>
          </div>

          {/* Pack Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
              Choose Stand Pack:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 5, price: '₹1,749' },
                { count: 12, price: '₹3,999' },
                { count: 25, price: '₹7,999' },
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
                  <p className="font-bold text-xs text-[#141210] dark:text-white">{pack.count} Stands</p>
                  <p className="font-mono text-xs font-black text-amber-600 dark:text-amber-400">{pack.price}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Free personalized cafe logo &amp; color customization</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Heavy solid wood base prevents wind tip-overs on patio tables</span>
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Waterproof, coffee spill-resistant wipe-clean acrylic</span>
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
