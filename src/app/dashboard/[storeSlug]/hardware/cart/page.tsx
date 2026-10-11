'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export default function HardwareCartPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="font-sans text-neutral-800 dark:text-zinc-200 pb-20 max-w-6xl mx-auto space-y-6 animate-in fade-in duration-300">
        {/* Top Breadcrumb & Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <Link
              href={`/dashboard/${storeSlug}/hardware`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </Link>
            <span className="text-neutral-300 dark:text-zinc-700">/</span>
            <span className="font-medium text-neutral-700 dark:text-neutral-300">Hardware Store</span>
          </div>

          <Link
            href={`/dashboard/${storeSlug}/hardware`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-neutral-800 dark:text-neutral-200 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-300" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Heading */}
        <div className="space-y-1 pt-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 font-normal">
            Review your BrewPluse hardware before checkout.
          </p>
        </div>

        {/* Empty State Box */}
        <div className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-white/10 rounded-2xl p-16 text-center space-y-4 shadow-2xs max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-400 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
              Your cart is empty
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Add BrewPluse hardware to get started.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={`/dashboard/${storeSlug}/hardware`}
              className="inline-flex items-center justify-center gap-2 rounded-xl text-xs font-bold h-10 px-5 bg-[#F6C358] hover:bg-[#EAA827] text-neutral-950 shadow-2xs transition-all active:scale-95 cursor-pointer"
            >
              Browse Hardware
            </Link>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
