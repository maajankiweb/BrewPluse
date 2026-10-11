'use client';

import React from 'react';
import Link from 'next/link';
import {
  Settings,
  Building2,
  CreditCard,
  Percent,
  Receipt,
  Truck,
  Printer,
  Lock,
  ShieldCheck,
  Star,
  Sliders,
  ChevronRight,
} from 'lucide-react';

const SETTING_SECTIONS = [
  {
    title: 'Business Profile',
    desc: 'Store name, address, GSTIN, FSSAI license, and opening hours.',
    url: '/demo/settings/business-profile',
    icon: Building2,
  },
  {
    title: 'UPI Payment Gateway',
    desc: 'Configure UPI VPA ID, dynamic QR codes, and zero-fee settlement.',
    url: '/demo/settings/upi',
    icon: CreditCard,
  },
  {
    title: 'GST & Taxes',
    desc: 'Configure CGST (2.5%), SGST (2.5%), VAT, and service charges.',
    url: '/demo/settings/taxes',
    icon: Percent,
  },
  {
    title: 'Invoices & Receipts',
    desc: 'Customize receipt header, footer notes, logo toggle, and numbering.',
    url: '/demo/settings/invoices',
    icon: Receipt,
  },
  {
    title: 'Thermal Printers',
    desc: 'Pair Bluetooth and LAN Ethernet 80mm / 58mm thermal printers.',
    url: '/demo/settings/printers',
    icon: Printer,
  },
  {
    title: 'Delivery & Integrations',
    desc: 'Configure direct takeaway delivery radius, delivery fee, and partner webhooks.',
    url: '/demo/settings/delivery',
    icon: Truck,
  },
  {
    title: 'Google Reviews Booster',
    desc: 'Automate Google 5-star review prompts after successful QR bill payments.',
    url: '/demo/settings/google-reviews',
    icon: Star,
  },
  {
    title: 'Password & Master PIN',
    desc: 'Update store manager password and 4-digit cashier authorization PIN.',
    url: '/demo/settings/password',
    icon: Lock,
  },
  {
    title: 'Security & 2FA',
    desc: 'Two-factor authentication, active login sessions, and remote logout.',
    url: '/demo/settings/security',
    icon: ShieldCheck,
  },
  {
    title: 'App Preferences',
    desc: 'Kitchen audio chimes, auto-print KOT on order, currency, and dark theme.',
    url: '/demo/settings/preferences',
    icon: Sliders,
  },
];

export default function DemoSettingsPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
          <Settings className="w-6 h-6 text-amber-500" />
          <span>Store Settings &amp; Configuration</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Manage business parameters, payment routing, hardware peripherals, and security policies.
        </p>
      </div>

      {/* Grid of Settings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SETTING_SECTIONS.map((sec) => {
          const Icon = sec.icon;
          return (
            <Link
              key={sec.url}
              href={sec.url}
              className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#141210] dark:text-white group-hover:text-amber-600 transition-colors">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#ebe8e3]/60 dark:border-[#222225] flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-amber-600">
                <span>Configure</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
