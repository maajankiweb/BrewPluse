'use client';

import React from 'react';
import {
  Coffee,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Heart,
} from 'lucide-react';

export default function DemoAboutPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
          <Coffee className="w-6 h-6 text-emerald-600" />
          <span>About BrewPluse Operating System</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Executive cloud-native software built for modern coffee shops, artisan roasters, and quick-service cafes.
        </p>
      </div>

      {/* Main Hero Card */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-10 shadow-2xs space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0b2b1a] to-[#005c36] text-white flex items-center justify-center shadow-lg">
            <Coffee className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-[#141210] dark:text-white">
              BrewPluse Executive Suite
            </h2>
            <p className="text-xs text-emerald-600 font-mono font-bold">
              Release v2.4.0-cloud &bull; Build 2026.10
            </p>
          </div>
        </div>

        <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
          BrewPluse was engineered to solve the broken economic model of restaurant software. While traditional legacy POS vendors charge ₹3,000 to ₹10,000 per month upfront regardless of cafe sales, BrewPluse introduces the <strong>Pay-as-you-grow</strong> architecture — completely free to launch forever, charging only a nominal ₹1 per processed order.
        </p>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#ebe8e3] dark:border-[#222225]">
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
              <Zap className="w-4 h-4" />
              <span>Sub-Second Latency</span>
            </div>
            <p className="text-zinc-500">
              Instant KDS order dispatch and millisecond thermal receipt generation.
            </p>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-blue-600 font-bold">
              <Globe className="w-4 h-4" />
              <span>Edge PWA Sync</span>
            </div>
            <p className="text-zinc-500">
              Runs on any hardware: iPads, Android tablets, Sunmi handhelds, or laptops.
            </p>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 text-purple-600 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Bank-Grade UPI</span>
            </div>
            <p className="text-zinc-500">
              Direct merchant settlements without intermediary 3-day payout holds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
