'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Coffee,
  LayoutDashboard,
  Calculator,
  ListOrdered,
  Receipt,
  Soup,
  Package,
  UtensilsCrossed,
  QrCode,
  Menu as MenuIcon,
  Settings,
  ShoppingBag,
  LogOut,
  ChevronRight,
} from 'lucide-react';

export default function DemoSidebar() {
  const pathname = usePathname();

  const isNavActive = (path: string) => {
    if (path === '/demo') {
      return pathname === '/demo';
    }
    return pathname?.startsWith(path);
  };

  const navItemClass = (path: string) => {
    const active = isNavActive(path);
    return `flex items-center transition-all duration-200 group text-sm font-medium relative rounded-xl gap-3 px-3 py-2.5 mx-2 ${
      active
        ? 'text-amber-600 dark:text-amber-400 font-bold bg-gradient-to-r from-amber-500/10 to-transparent dark:from-amber-500/20 shadow-[inset_3px_0_0_0_rgba(245,158,11,1)]'
        : 'text-[#615c54] dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-[#1a1715] dark:hover:text-white'
    }`;
  };

  return (
    <aside
      style={{ width: '280px' }}
      className="hidden lg:flex fixed left-0 top-0 bg-[#ffffff] dark:bg-[#0c0c0d] flex-col h-screen border-r border-[#ebe8e3] dark:border-[#222225] z-50 overflow-hidden group/sidebar px-6 py-6 transition-colors"
    >
      {/* Brand Header */}
      <Link href="/demo" className="mb-6 flex items-center shrink-0 gap-3 group">
        <div className="w-10 h-10 bg-gradient-to-br from-[#0b2b1a] to-[#005c36] text-white flex items-center justify-center rounded-xl shadow-sm shrink-0 group-hover:scale-105 transition-transform">
          <Coffee className="w-5 h-5 text-emerald-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h1 className="font-bold text-lg text-[#141210] dark:text-white leading-tight truncate flex items-center gap-1.5">
            BrewPluse
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Live
            </span>
          </h1>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#797369] dark:text-zinc-500 truncate">
            Executive Cafe Portal
          </p>
        </div>
      </Link>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto no-scrollbar pr-1 flex flex-col gap-5 pt-1">
        {/* OPERATIONS */}
        <div className="space-y-1">
          <p className="text-[10px] text-[#8e877c] dark:text-zinc-500 px-3 mb-2 opacity-80 truncate font-mono uppercase tracking-widest font-bold">
            OPERATIONS
          </p>

          <Link href="/demo" className={navItemClass('/demo')}>
            <LayoutDashboard className="w-4 h-4 shrink-0 transition-colors" />
            <span className="flex-1 truncate">Dashboard</span>
            {isNavActive('/demo') && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
          </Link>

          <Link href="/demo/pos" className={navItemClass('/demo/pos')}>
            <Calculator className="w-4 h-4 shrink-0 transition-colors" />
            <span className="flex-1 truncate">POS Terminal</span>
            {isNavActive('/demo/pos') && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
          </Link>

          <Link href="/demo/orders" className={navItemClass('/demo/orders')}>
            <ListOrdered className="w-4 h-4 shrink-0 transition-colors" />
            <span className="flex-1 truncate">Orders</span>
            {isNavActive('/demo/orders') && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
          </Link>

          <Link href="/demo/billing" className={navItemClass('/demo/billing')}>
            <Receipt className="w-4 h-4 shrink-0 transition-colors" />
            <span className="flex-1 truncate">Bills &amp; Revenue</span>
            {isNavActive('/demo/billing') && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
          </Link>
        </div>

        {/* PINNED WORKFLOWS */}
        <div className="space-y-1">
          <div className="flex items-center px-3 mb-2">
            <p className="text-[10px] text-[#8e877c] dark:text-zinc-500 opacity-80 truncate font-mono uppercase tracking-widest font-bold">
              PINNED
            </p>
            <div className="h-px bg-[#ebe8e3] dark:bg-[#222225] flex-1 ml-3 opacity-60" />
          </div>

          <Link href="/demo/kds" className={navItemClass('/demo/kds')}>
            <Soup className="w-4 h-4 shrink-0 transition-colors" />
            <span className="flex-1 truncate">Kitchen (KDS)</span>
          </Link>

          <Link href="/demo/inventory" className={navItemClass('/demo/inventory')}>
            <Package className="w-4 h-4 shrink-0 transition-colors" />
            <span className="flex-1 truncate">Inventory</span>
          </Link>

          <Link href="/demo/menu" className={navItemClass('/demo/menu')}>
            <UtensilsCrossed className="w-4 h-4 shrink-0 transition-colors" />
            <span className="flex-1 truncate">Menu Catalog</span>
          </Link>

          <Link href="/demo/tables" className={navItemClass('/demo/tables')}>
            <QrCode className="w-4 h-4 shrink-0 transition-colors" />
            <span className="flex-1 truncate">Tables &amp; QR</span>
          </Link>
        </div>
      </nav>

      {/* BOTTOM TOOLS */}
      <div className="mt-auto pt-4 space-y-1 shrink-0 bg-inherit border-t border-[#ebe8e3] dark:border-[#222225]">
        <div className="flex items-center px-3 mb-1.5">
          <p className="text-[10px] text-[#8e877c] dark:text-zinc-500 opacity-80 truncate font-mono uppercase tracking-widest font-bold">
            MORE
          </p>
          <div className="h-px bg-[#ebe8e3] dark:bg-[#222225] flex-1 ml-3 opacity-60" />
        </div>

        <Link href="/demo/more" className={navItemClass('/demo/more')}>
          <MenuIcon className="w-4 h-4 shrink-0 transition-colors" />
          <span className="flex-1 truncate">More Features</span>
        </Link>

        <Link href="/demo/settings" className={navItemClass('/demo/settings')}>
          <Settings className="w-4 h-4 shrink-0 transition-colors" />
          <span className="flex-1 truncate">Settings</span>
        </Link>

        <Link href="/demo/hardware" className={navItemClass('/demo/hardware')}>
          <ShoppingBag className="w-4 h-4 shrink-0 transition-colors" />
          <span className="flex-1 truncate">Hardware Store</span>
        </Link>

        <Link
          href="/"
          className="flex items-center text-[#615c54] dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200 w-full text-sm font-medium rounded-xl gap-3 px-3 py-2.5 mx-2"
        >
          <LogOut className="w-4 h-4 shrink-0 transition-colors" />
          <span>Exit Demo</span>
        </Link>
      </div>
    </aside>
  );
}
