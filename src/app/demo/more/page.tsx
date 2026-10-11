'use client';

import React from 'react';
import Link from 'next/link';
import {
  Menu as MenuIcon,
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
  ShoppingBag,
  Settings,
  Activity,
  HelpCircle,
  ShieldCheck,
  ChevronRight,
  Info,
} from 'lucide-react';

interface ToolItem {
  title: string;
  desc: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

const TOOLS: { section: string; items: ToolItem[] }[] = [
  {
    section: 'OPERATIONS & CUSTOMER EXPERIENCE',
    items: [
      {
        title: 'POS Billing Terminal',
        desc: 'Rapid counter ordering, table assignment, and multi-mode payment settlement.',
        url: '/demo/pos',
        icon: Calculator,
        tag: 'Core',
      },
      {
        title: 'Live Orders Management',
        desc: 'Track dine-in, takeaway, and digital QR orders in real time.',
        url: '/demo/orders',
        icon: ListOrdered,
        tag: 'Live',
      },
      {
        title: 'Kitchen Display System (KDS)',
        desc: 'Paperless prep tickets with bump bar audio chimes and timers.',
        url: '/demo/kds',
        icon: Soup,
        tag: 'Kitchen',
      },
      {
        title: 'Digital TV Menu Showcase',
        desc: 'Turn any smart TV into an ultra-sleek, rotating cafe menu board.',
        url: '/demo/tv-menu',
        icon: Tv,
        tag: 'Display',
      },
      {
        title: 'Tables & QR Stands',
        desc: 'Floor plan seating layout with automated QR ordering stands.',
        url: '/demo/tables',
        icon: QrCode,
      },
      {
        title: 'Bills & Revenue Audit',
        desc: 'Comprehensive GST invoice archive, cash drawer logs, and settlements.',
        url: '/demo/billing',
        icon: Receipt,
      },
    ],
  },
  {
    section: 'CATALOG & TEAM MANAGEMENT',
    items: [
      {
        title: 'Menu Catalog Manager',
        desc: 'Add items, custom modifiers, prices, and mark in-stock availability.',
        url: '/demo/menu',
        icon: UtensilsCrossed,
      },
      {
        title: 'Raw Inventory Stock',
        desc: 'Track milk, coffee beans, syrups, and packaging with low-stock alerts.',
        url: '/demo/inventory',
        icon: Package,
      },
      {
        title: 'Staff, Roles & Cashier PINs',
        desc: 'Manage barista shifts, manager override codes, and access permissions.',
        url: '/demo/staff',
        icon: Users,
      },
      {
        title: 'Customer Loyalty CRM',
        desc: 'Customer directory, lifetime spend records, and loyalty rewards.',
        url: '/demo/customers',
        icon: HeartHandshake,
      },
      {
        title: 'Coupons & Promo Codes',
        desc: 'Launch percentage or flat discounts with minimum order thresholds.',
        url: '/demo/coupons',
        icon: Tag,
      },
      {
        title: 'Blocked Guests Blacklist',
        desc: 'Prevent fake table orders and spam customer accounts.',
        url: '/demo/blocked-users',
        icon: ShieldCheck,
      },
    ],
  },
  {
    section: 'ECOSYSTEM & CONFIGURATION',
    items: [
      {
        title: 'BrewPluse Hardware Store',
        desc: 'Order certified thermal printers, NFC cards, and acrylic QR stands.',
        url: '/demo/hardware',
        icon: ShoppingBag,
        tag: 'Hardware',
      },
      {
        title: 'Usage Billing (₹1/order)',
        desc: 'Inspect your pay-as-you-grow operational fee balance and invoices.',
        url: '/demo/usage',
        icon: Receipt,
      },
      {
        title: 'Store Settings Hub',
        desc: 'Configure GST, UPI QR codes, thermal printers, delivery, and security.',
        url: '/demo/settings',
        icon: Settings,
      },
      {
        title: 'Cloud Status & Uptime',
        desc: 'Live 99.98% service uptime across POS, KDS, and payment webhooks.',
        url: '/demo/status',
        icon: Activity,
      },
      {
        title: 'Help & 24/7 Support',
        desc: 'Direct WhatsApp merchant helpline, FAQs, and executive ticketing.',
        url: '/demo/support',
        icon: HelpCircle,
      },
      {
        title: 'About BrewPluse Portal',
        desc: 'System architecture, version release notes, and developer insights.',
        url: '/demo/about',
        icon: Info,
      },
    ],
  },
];

export default function DemoMorePage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
          <MenuIcon className="w-6 h-6 text-amber-500" />
          <span>All Features &amp; Modules</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Executive directory of all BrewPluse applications, operational tools, and integrations.
        </p>
      </div>

      {/* Grouped Modules */}
      <div className="space-y-8">
        {TOOLS.map((group) => (
          <div key={group.section} className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-500">
              {group.section}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.url}
                    href={tool.url}
                    className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        {tool.tag && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                            {tool.tag}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-[#141210] dark:text-white group-hover:text-amber-600 transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {tool.desc}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#ebe8e3]/60 dark:border-[#222225] flex items-center justify-between text-xs font-bold text-zinc-500 group-hover:text-amber-600">
                      <span>Open Tool</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
