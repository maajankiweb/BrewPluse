'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Sparkles, ArrowRight, X, Camera, Plus, UtensilsCrossed } from 'lucide-react';

export default function MenuPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [showBanner, setShowBanner] = useState(true);

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-3.5 sm:space-y-4 max-w-[1500px] pb-8 font-sans text-neutral-800 dark:text-zinc-200 animate-in fade-in duration-300">
        {/* Top Professional Setup Banner */}
        {showBanner && (
          <div className="relative flex items-center gap-3 rounded-xl border border-orange-500/30 bg-gradient-to-r from-orange-500/10 via-amber-500/8 to-orange-500/5 px-4 py-3 text-sm shadow-[0_10px_30px_rgba(249,115,22,0.04)] overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-orange-400 to-amber-500" />
            <div className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/15 border border-orange-500/20">
              <Sparkles className="h-4 w-4 text-orange-400 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-bold text-neutral-900 dark:text-white">
                Professional Setup Available —&nbsp;
              </span>
              <span className="text-neutral-600 dark:text-neutral-400">
                Let our team configure your menu, inventory, add-ons &amp; variety settings for you.
              </span>
            </div>
            <button
              type="button"
              className="hidden sm:flex shrink-0 items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-orange-600 active:scale-95 transition-all shadow-md shadow-orange-500/10 cursor-pointer"
            >
              Learn More
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              className="shrink-0 rounded-md p-1 text-neutral-500 hover:text-neutral-800 dark:hover:text-white transition-all cursor-pointer"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#12201B] dark:text-[#F2FAF6] tracking-tight">
                Menu
              </h1>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] font-normal leading-relaxed">
              Create, update, organize dishes, and link recipe inventory for your cafe.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:shrink-0">
            <button
              type="button"
              className="h-8 px-3 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer bg-white dark:bg-[#0E2018] text-[#12201B] dark:text-white border border-[#E7ECE9] dark:border-[#1E382E] hover:bg-[#F8FAF8] dark:hover:bg-[#142E25]"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#0B5C45] dark:text-[#10B981]" />
              <span>Digitize Menu with AI</span>
            </button>
          </div>
        </div>

        {/* Menu Choice Box */}
        <div className="border border-[#E7ECE9] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-8 sm:p-10 rounded-[28px] shadow-sm text-center max-w-4xl mx-auto">
          <div className="max-w-xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Get Started with Your Menu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
              How would you like to create your menu?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-zinc-400">
              Choose an option below to set up your cafe&apos;s dish catalog.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {/* Option 1: AI Menu Maker */}
            <div className="group relative rounded-[24px] border-2 border-amber-500/30 hover:border-amber-500 p-6 sm:p-8 bg-gradient-to-b from-amber-500/5 to-transparent transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-neutral-950">
                  100% Free AI
                </span>
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    AI Menu Maker
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Upload an image or photo of your physical menu. AI automatically extracts all dish
                    names, categories, descriptions, and prices in seconds.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-neutral-950 font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Open AI Digitizer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Option 2: Manually Add Menu Items */}
            <div className="group relative rounded-[24px] border border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-zinc-700 p-6 sm:p-8 bg-white dark:bg-[#12141c] transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300">
                  Step-by-Step
                </span>
                <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-neutral-700 dark:text-neutral-300">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Manually Add Menu Items
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-zinc-400 mt-1 leading-relaxed">
                    Build your menu manually from scratch. Create categories, input custom pricing,
                    attach ingredient deduction rules, and upload photos.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="w-full h-11 rounded-xl border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-zinc-800 active:scale-95 text-neutral-900 dark:text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Items Manually</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
