'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  BadgeInfo,
  ExternalLink,
  TriangleAlert,
  Trash2
} from 'lucide-react';

export default function AboutPage() {
  const params = useParams();
  const router = useRouter();
  const storeSlug = (params?.storeSlug as string) || 'brewpluse';
  const cafeName = storeSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const [confirmInput, setConfirmInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const canDelete = confirmInput.trim().toLowerCase() === storeSlug.toLowerCase();

  const handleDelete = () => {
    if (!canDelete) return;
    if (confirm(`Are you absolutely sure you want to permanently delete "${cafeName}"? This action CANNOT be undone.`)) {
      setIsDeleting(true);
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('brewpluse::store_slug');
          localStorage.removeItem('brewpluse::business_name');
        }
        router.push('/setup');
      }, 1000);
    }
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-6 font-sans text-neutral-800 pb-16">
        {/* Top Header Card */}
      <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-600 mt-1 shrink-0">
            <BadgeInfo className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">{cafeName}</h1>
            <p className="text-xs text-stone-500 mt-1 font-medium max-w-xl leading-relaxed">
              Learn more about this cafe organization configuration, application version metrics, release logs, or perform system deletions.
            </p>
          </div>
        </div>
      </div>

      {/* Grid: Diagnostics vs Danger Zone */}
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* System Diagnostics */}
        <div className="bg-white border border-stone-200/80 p-6 rounded-3xl shadow-xs space-y-5">
          <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">System Diagnostics</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-stone-100 bg-[#fcf9f0]/40 px-4.5 py-3 text-xs font-semibold">
              <span className="text-stone-500">App version</span>
              <span className="font-bold text-stone-900 font-mono">v2.0.0</span>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-stone-100 bg-[#fcf9f0]/40 px-4.5 py-3 text-xs font-semibold">
              <span className="text-stone-500">Build date</span>
              <span className="font-bold text-stone-900 font-mono">10-10-2026</span>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-stone-100 bg-[#fcf9f0]/40 px-4.5 py-3 text-xs font-semibold">
              <span className="text-stone-500">Environment</span>
              <span className="font-bold text-stone-900 font-mono">production</span>
            </div>

            <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] px-4.5 py-3 text-xs font-semibold">
              <span className="text-stone-600 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Service Status
              </span>
              <Link
                href="/status"
                className="font-bold text-emerald-600 hover:underline flex items-center gap-1"
              >
                <span>Operational (status.brewpluse.fun)</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-stone-100">
            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">What&apos;s New</span>
            <ul className="space-y-2 text-xs font-semibold text-stone-600">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>Version 2.0 updated with high-performance real-time POS &amp; KDS</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>Enhanced multi-store slug isolation and zero-data onboard flow</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/[0.02] border border-red-200 p-6 rounded-3xl shadow-xs space-y-5">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-red-500/10 p-3 text-red-600 shrink-0">
              <TriangleAlert className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-red-700 uppercase tracking-wider">Danger Zone</p>
              <p className="mt-1 text-xs text-red-600/80 font-semibold leading-relaxed">
                Deleting this cafe organization wipes all staff profiles, layout allocations, catalogs, transactions, and KOT history permanently. This process is irreversible.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-3 border-t border-red-200/50">
            <p className="text-[11px] text-red-700 font-bold uppercase tracking-wider">
              Type <span className="font-mono font-black">{storeSlug}</span> to confirm deletion:
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <input
                type="text"
                value={confirmInput}
                onChange={(e) => setConfirmInput(e.target.value)}
                placeholder={storeSlug}
                className="w-full px-4 py-2 text-xs rounded-full border border-red-200 bg-white text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500/20 font-mono"
              />
              <button
                type="button"
                disabled={!canDelete || isDeleting}
                onClick={handleDelete}
                className="inline-flex items-center justify-center gap-2 font-bold transition rounded-full px-5 py-2 text-xs uppercase tracking-wider bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 disabled:opacity-50 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Deleting...' : 'Delete Cafe'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DashboardShell>
);
}
