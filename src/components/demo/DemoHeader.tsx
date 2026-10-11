'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Receipt,
  Sun,
  Moon,
  HelpCircle,
  Coffee,
  Plus,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoHeader() {
  const { isDark, toggleTheme, setIsCommandOpen } = useDemo();
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/demo') return 'Overview';
    if (pathname?.startsWith('/demo/pos')) return 'POS Terminal';
    if (pathname?.startsWith('/demo/orders')) return 'Orders Management';
    if (pathname?.startsWith('/demo/billing')) return 'Bills & Invoices';
    if (pathname?.startsWith('/demo/kds')) return 'Kitchen Display';
    if (pathname?.startsWith('/demo/inventory')) return 'Inventory Stock';
    if (pathname?.startsWith('/demo/menu')) return 'Menu Catalog';
    if (pathname?.startsWith('/demo/tables')) return 'Floor & Tables';
    if (pathname?.startsWith('/demo/staff')) return 'Staff & Access';
    if (pathname?.startsWith('/demo/customers')) return 'Customer CRM';
    if (pathname?.startsWith('/demo/coupons')) return 'Coupons & Promos';
    if (pathname?.startsWith('/demo/usage')) return 'Usage Billing';
    if (pathname?.startsWith('/demo/hardware')) return 'Hardware Store';
    if (pathname?.startsWith('/demo/settings')) return 'Settings';
    if (pathname?.startsWith('/demo/tv-menu')) return 'TV Digital Board';
    if (pathname?.startsWith('/demo/status')) return 'System Status';
    if (pathname?.startsWith('/demo/support')) return 'Help & Support';
    return 'Demo Store';
  };

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-280px)] z-40 bg-[#ffffff]/90 dark:bg-[#0c0c0d]/90 backdrop-blur-xl border-b border-[#ebe8e3] dark:border-[#222225] h-18 lg:h-20 flex justify-between items-center px-4 lg:px-8 transition-colors">
      {/* Left: Mobile Title + Desktop Breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0b2b1a] text-white flex items-center justify-center">
            <Coffee className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#141210] dark:text-white leading-tight">
              BrewPluse
            </h2>
            <p className="text-[10px] text-[#797369] dark:text-zinc-400">
              {getPageTitle()}
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2.5">
          <div className="flex items-center gap-2 text-sm text-[#797369] dark:text-zinc-400 font-medium">
            <span className="font-semibold text-[#141210] dark:text-white">Flagship Cafe</span>
            <span>/</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">{getPageTitle()}</span>
          </div>

          <Link
            href="/demo/about"
            title="View Executive System Guide"
            className="flex items-center justify-center w-7 h-7 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-zinc-300 hover:text-neutral-900 dark:hover:text-white transition-all text-xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Right: Quick Search + Usage + Theme Toggle */}
      <div className="flex items-center gap-3 lg:gap-5">
        {/* Search trigger */}
        <button
          onClick={() => setIsCommandOpen(true)}
          type="button"
          className="relative hidden sm:flex items-center gap-2 px-3.5 py-1.5 bg-[#f4f2ee] dark:bg-zinc-800/60 hover:bg-[#eae7e0] dark:hover:bg-zinc-800 border border-transparent dark:border-zinc-700/60 rounded-full text-xs text-[#797369] dark:text-zinc-400 w-52 lg:w-72 transition-all cursor-pointer text-left"
        >
          <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="flex-1 truncate">Quick search &amp; tools...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded bg-white dark:bg-zinc-700 px-1.5 py-0.5 text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-300 shadow-2xs border border-zinc-200 dark:border-zinc-600">
            ⌘K
          </kbd>
        </button>

        {/* Usage pill */}
        <Link
          href="/demo/usage"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold hover:scale-105 transition-all shadow-2xs"
          title="BrewPluse Pay-as-you-grow Usage Fee"
        >
          <Receipt className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Usage: <strong className="font-mono">₹0.00</strong></span>
        </Link>

        {/* Theme switch */}
        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Toggle theme"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-[#f4f2ee] dark:bg-zinc-800 text-[#141210] dark:text-white hover:bg-[#eae7e0] dark:hover:bg-zinc-700 transition-colors"
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-600" />
          )}
        </button>

        {/* Quick New Sale button */}
        <Link
          href="/demo/pos"
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Sale</span>
        </Link>
      </div>
    </header>
  );
}
