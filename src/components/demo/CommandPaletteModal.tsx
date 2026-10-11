'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  X,
  LayoutDashboard,
  Calculator,
  ListOrdered,
  Receipt,
  Soup,
  Package,
  UtensilsCrossed,
  Tv,
  QrCode,
  Users,
  HeartHandshake,
  Tag,
  HelpCircle,
  Activity,
  ShoppingBag,
  CreditCard,
  Percent,
  Printer,
  ShieldCheck,
  Lock,
  Star,
  Settings,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

interface SearchItem {
  title: string;
  category: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  { title: 'Dashboard Overview', category: 'Operations', url: '/demo', icon: LayoutDashboard },
  { title: 'POS Billing Terminal', category: 'Operations', url: '/demo/pos', icon: Calculator, badge: 'Popular' },
  { title: 'Live Kitchen & Bar Orders', category: 'Operations', url: '/demo/orders', icon: ListOrdered },
  { title: 'Bills, Invoices & Tax Audit', category: 'Operations', url: '/demo/billing', icon: Receipt },
  { title: 'Kitchen Display System (KDS)', category: 'Kitchen', url: '/demo/kds', icon: Soup },
  { title: 'Inventory Stock & Raw Materials', category: 'Inventory', url: '/demo/inventory', icon: Package },
  { title: 'Menu Items & Pricing Catalog', category: 'Menu', url: '/demo/menu', icon: UtensilsCrossed },
  { title: 'Digital TV Menu Showcase', category: 'Menu', url: '/demo/tv-menu', icon: Tv },
  { title: 'Floor Layout & QR Stands', category: 'Tables', url: '/demo/tables', icon: QrCode },
  { title: 'Staff, Roles & Cashier PINs', category: 'Team', url: '/demo/staff', icon: Users },
  { title: 'Customer CRM & Loyalty Points', category: 'CRM', url: '/demo/customers', icon: HeartHandshake },
  { title: 'Coupons & Discount Codes', category: 'Promos', url: '/demo/coupons', icon: Tag },
  { title: 'Hardware Store (POS, Printers, NFC)', category: 'Hardware', url: '/demo/hardware', icon: ShoppingBag },
  { title: 'Smart NFC Table Cards', category: 'Hardware', url: '/demo/hardware/nfc-card', icon: ShoppingBag },
  { title: 'Acrylic QR Code Stands', category: 'Hardware', url: '/demo/hardware/qr-code-stand', icon: ShoppingBag },
  { title: 'Usage Billing (₹1 / order)', category: 'Billing', url: '/demo/usage', icon: Receipt },
  { title: 'Store Settings Hub', category: 'Settings', url: '/demo/settings', icon: Settings },
  { title: 'Business Profile & Timings', category: 'Settings', url: '/demo/settings/business-profile', icon: Settings },
  { title: 'UPI Payment Gateway & QR', category: 'Settings', url: '/demo/settings/upi', icon: CreditCard },
  { title: 'GST & Service Taxes', category: 'Settings', url: '/demo/settings/taxes', icon: Percent },
  { title: 'Invoice & KOT Customization', category: 'Settings', url: '/demo/settings/invoices', icon: Receipt },
  { title: 'Thermal Printers Setup', category: 'Settings', url: '/demo/settings/printers', icon: Printer },
  { title: 'Security & 2-Factor Auth', category: 'Settings', url: '/demo/settings/security', icon: ShieldCheck },
  { title: 'Manager Password & PIN', category: 'Settings', url: '/demo/settings/password', icon: Lock },
  { title: 'Automated Google Reviews', category: 'Settings', url: '/demo/settings/google-reviews', icon: Star },
  { title: 'App Sound & Preferences', category: 'Settings', url: '/demo/settings/preferences', icon: Settings },
  { title: 'Blocked Users & Blacklist', category: 'Security', url: '/demo/blocked-users', icon: ShieldCheck },
  { title: 'Live Cloud Status Uptime', category: 'Support', url: '/demo/status', icon: Activity },
  { title: 'Help Center & WhatsApp Support', category: 'Support', url: '/demo/support', icon: HelpCircle },
  { title: 'About BrewPluse Executive Portal', category: 'About', url: '/demo/about', icon: HelpCircle },
];

export default function CommandPaletteModal() {
  const { isCommandOpen, setIsCommandOpen } = useDemo();
  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!isCommandOpen) {
      setQuery('');
    }
  }, [isCommandOpen]);

  if (!isCommandOpen) return null;

  const filtered = SEARCH_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (url: string) => {
    setIsCommandOpen(false);
    router.push(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-xl bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#2a2a2e] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#ebe8e3] dark:border-[#222225] gap-3">
          <Search className="w-5 h-5 text-zinc-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search demo tools, settings, hardware, or pages..."
            className="flex-1 bg-transparent text-sm text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-zinc-400">
              No matching pages found for &quot;{query}&quot;
            </div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.url}
                  onClick={() => handleSelect(item.url)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-neutral-100 dark:hover:bg-zinc-800/70 text-left transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#141210] dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        {item.category} • {item.url}
                      </p>
                    </div>
                  </div>

                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-neutral-50 dark:bg-[#0c0c0d] border-t border-[#ebe8e3] dark:border-[#222225] flex items-center justify-between text-[11px] text-zinc-400 font-mono">
          <span>Tip: Press ESC to exit</span>
          <span>{filtered.length} accessible pages</span>
        </div>
      </div>
    </div>
  );
}
