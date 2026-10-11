'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calculator,
  ListOrdered,
  Menu,
  Settings,
} from 'lucide-react';

export default function DemoMobileBar() {
  const pathname = usePathname();

  const isNavActive = (path: string) => {
    if (path === '/demo') return pathname === '/demo';
    return pathname?.startsWith(path);
  };

  const navItemClass = (path: string) => {
    const active = isNavActive(path);
    return `flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all duration-200 relative cursor-pointer ${
      active
        ? 'text-amber-600 dark:text-amber-400 font-bold'
        : 'text-[#797369] dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400'
    }`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#ffffff]/95 dark:bg-[#0c0c0d]/95 backdrop-blur-xl border-t border-[#ebe8e3] dark:border-[#222225] z-50 flex justify-around items-center px-2 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
      <Link href="/demo" className={navItemClass('/demo')}>
        {isNavActive('/demo') && (
          <div className="absolute top-0 w-8 h-1 bg-amber-600 dark:bg-amber-400 rounded-full" />
        )}
        <LayoutDashboard className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Home</span>
      </Link>

      <Link href="/demo/pos" className={navItemClass('/demo/pos')}>
        {isNavActive('/demo/pos') && (
          <div className="absolute top-0 w-8 h-1 bg-amber-600 dark:bg-amber-400 rounded-full" />
        )}
        <Calculator className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">POS</span>
      </Link>

      <Link href="/demo/orders" className={navItemClass('/demo/orders')}>
        {isNavActive('/demo/orders') && (
          <div className="absolute top-0 w-8 h-1 bg-amber-600 dark:bg-amber-400 rounded-full" />
        )}
        <ListOrdered className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Orders</span>
      </Link>

      <Link href="/demo/more" className={navItemClass('/demo/more')}>
        {isNavActive('/demo/more') && (
          <div className="absolute top-0 w-8 h-1 bg-amber-600 dark:bg-amber-400 rounded-full" />
        )}
        <Menu className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">More</span>
      </Link>

      <Link href="/demo/settings" className={navItemClass('/demo/settings')}>
        {isNavActive('/demo/settings') && (
          <div className="absolute top-0 w-8 h-1 bg-amber-600 dark:bg-amber-400 rounded-full" />
        )}
        <Settings className="w-5 h-5 mb-0.5" />
        <span className="text-[10px] tracking-tight">Settings</span>
      </Link>
    </div>
  );
}
