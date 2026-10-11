'use client';

import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Link from 'next/link';
import {
  Building2,
  Landmark,
  Printer,
  KeyRound,
  ShieldAlert,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  LogOut,
  Search,
  Lock,
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';



export default function SettingsHubPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem('brewpluse::active_user');
    } catch (e) {}
    router.replace('/login');
  };

  const basePath = `/dashboard/${storeSlug}`;

  const settingsItems = [
    {
      category: 'BUSINESS',
      items: [
        {
          title: 'Business Profile',
          desc: 'Cafe identity, branding & store address',
          icon: Building2,
          href: `${basePath}/settings/business-profile`,
        },
      ],
    },
    {
      category: 'PAYMENTS & FINANCE',
      items: [
        {
          title: 'UPI & GST',
          desc: 'Merchant UPI VPA, payment workflow, GSTIN & tax configuration',
          icon: Landmark,
          href: `${basePath}/settings/upi`,
        },
      ],
    },
    {
      category: 'OPERATIONS & SECURITY',
      items: [
        {
          title: 'Printers & Hardware',
          desc: 'Thermal receipt printers, A4 office & print routing',
          icon: Printer,
          href: `${basePath}/settings/printers`,
        },
        {
          title: 'Password & Sign-in',
          desc: 'Set or change your email & password login credentials',
          icon: KeyRound,
          href: `${basePath}/settings/password`,
        },
        {
          title: 'Customer Security',
          desc: 'Customer proximity & ordering restrictions',
          icon: Lock,
          href: `${basePath}/settings/security`,
        },
        {
          title: 'Blocked Users',
          desc: 'Security & customer restrictions',
          icon: ShieldAlert,
          href: `${basePath}/blocked-users`,
        },
      ],
    },
  ];

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-5 max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight">
              Settings
            </h1>
            <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8]">
              Configure your cafe profile, payment gateways, receipts, and system preferences.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={`${basePath}/settings/business-profile`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white shadow-2xs hover:bg-[#F8FAF8]"
            >
              <Coffee className="w-3.5 h-3.5 text-[#0B5C45] dark:text-[#10B981]" />
              <span>Café</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/40 bg-white dark:bg-[#0E2018] hover:bg-red-50 dark:hover:bg-red-950/20 text-xs font-semibold text-red-600 transition-colors shadow-2xs cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Search settings input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#8D9792] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search settings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs sm:text-sm focus:outline-none focus:border-[#10B981]"
          />
        </div>

        {/* Categorized Settings List */}
        <div className="space-y-6">
          {settingsItems.map((group) => {
            const filteredItems = group.items.filter(
              (i) =>
                i.title.toLowerCase().includes(search.toLowerCase()) ||
                i.desc.toLowerCase().includes(search.toLowerCase())
            );
            if (filteredItems.length === 0) return null;

            return (
              <div key={group.category} className="space-y-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#65736D] dark:text-[#9AB2A8] px-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>{group.category}</span>
                </p>

                <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl overflow-hidden divide-y divide-[#E5ECE8] dark:divide-[#1E382E] shadow-2xs">
                  {filteredItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="p-4 flex items-center justify-between hover:bg-[#F8FAF8] dark:hover:bg-[#142A21] transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Icon className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h3 className="text-xs sm:text-sm font-bold text-[#12201B] dark:text-white group-hover:text-[#0B5C45] dark:group-hover:text-[#10B981] transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#8D9792] group-hover:text-[#0B5C45] dark:group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
