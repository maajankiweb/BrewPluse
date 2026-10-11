'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ShieldAlert,
  RefreshCw,
  Ban,
  Mail,
  Globe,
  User,
  PlusCircle,
  Search,
} from 'lucide-react';
import { useToast } from '@/components/Toast';



export default function BlockedUsersPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [blockType, setBlockType] = useState<'email' | 'ip' | 'uid'>('email');
  const [target, setTarget] = useState('');
  const [reason, setReason] = useState('');
  const [rules, setRules] = useState<Array<{ type: string; target: string; reason: string }>>([]);
  const toast = useToast();

  const handleDeploy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target.trim()) return;
    setRules((prev) => [
      ...prev,
      { type: blockType.toUpperCase(), target: target.trim(), reason: reason.trim() },
    ]);
    setTarget('');
    setReason('');
    toast.success('Restriction rule deployed successfully!');
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-6 font-sans text-neutral-800 dark:text-zinc-200 max-w-6xl mx-auto pb-16">
        {/* Header Card */}
        <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] p-6 rounded-[24px] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="h-6 w-6 text-amber-500" />
              <span>Abuse Control &amp; Security</span>
            </h1>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">
              Prevent fake mass orders and platform abuse. Restrict customer access by email, IP
              addresses, or User IDs.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={() => toast.info('Security blocklist rules refreshed.')}
              className="rounded-full h-10 px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 bg-[#062F23] hover:bg-[#0B5C45] text-white cursor-pointer shadow-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Refresh Rules</span>
            </button>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[24px] border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-5 shadow-xs relative overflow-hidden">
            <p className="text-[10px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase tracking-wider">
              Total Active Rules
            </p>
            <p className="mt-2 text-2xl font-black text-neutral-800 dark:text-white">{rules.length}</p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#65736D] dark:text-[#9AB2A8] font-semibold uppercase tracking-wider">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
              <span>Active restrictions</span>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-5 shadow-xs relative overflow-hidden">
            <p className="text-[10px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase tracking-wider">
              Email Bans
            </p>
            <p className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
              {rules.filter((r) => r.type === 'EMAIL').length}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#65736D] dark:text-[#9AB2A8] font-semibold uppercase tracking-wider">
              <Mail className="h-3.5 w-3.5 text-amber-500" />
              <span>Restricted emails</span>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-5 shadow-xs relative overflow-hidden">
            <p className="text-[10px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase tracking-wider">
              IP Address Blocks
            </p>
            <p className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
              {rules.filter((r) => r.type === 'IP').length}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#65736D] dark:text-[#9AB2A8] font-semibold uppercase tracking-wider">
              <Globe className="h-3.5 w-3.5 text-amber-500" />
              <span>Restricted IPs</span>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-5 shadow-xs relative overflow-hidden">
            <p className="text-[10px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase tracking-wider">
              User ID Blocks
            </p>
            <p className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
              {rules.filter((r) => r.type === 'UID').length}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#65736D] dark:text-[#9AB2A8] font-semibold uppercase tracking-wider">
              <User className="h-3.5 w-3.5 text-amber-500" />
              <span>Restricted profiles</span>
            </div>
          </div>
        </div>

        {/* 2-Column Rules Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Form */}
          <div className="rounded-[24px] border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-6 shadow-xs h-fit space-y-4 lg:col-span-1">
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <PlusCircle className="h-4.5 w-4.5 text-amber-500" />
              <span>Establish Manual Block</span>
            </h2>
            <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] leading-relaxed">
              Create an immediate ban policy for a customer profile, email address, or device IP to
              restrict ordering access.
            </p>

            <form onSubmit={handleDeploy} className="space-y-4 pt-1">
              <div>
                <label className="text-[10px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase mb-2 block tracking-wider">
                  Block Parameter Type
                </label>
                <div className="flex p-1 bg-neutral-100 dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] rounded-full w-full">
                  {(['email', 'ip', 'uid'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setBlockType(t)}
                      className={`flex-1 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all cursor-pointer ${
                        blockType === t
                          ? 'bg-[#062F23] text-white shadow-xs'
                          : 'text-[#65736D] hover:text-[#12201B] dark:hover:text-white'
                      }`}
                    >
                      {t.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase mb-1.5 block tracking-wider">
                  Block Target ({blockType.toUpperCase()})
                </label>
                <input
                  type="text"
                  required
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder={
                    blockType === 'email'
                      ? 'e.g. badactor@spam.com'
                      : blockType === 'ip'
                      ? 'e.g. 192.168.1.1'
                      : 'e.g. usr_179161...'
                  }
                  className="w-full rounded-full h-10 px-3.5 text-xs bg-neutral-50 dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-neutral-900 dark:text-white focus:outline-none focus:border-[#10B981]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase mb-1.5 block tracking-wider">
                  Reason / Justification
                </label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="e.g. Abusive checkout behavior"
                  className="w-full rounded-full h-10 px-3.5 text-xs bg-neutral-50 dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-neutral-900 dark:text-white focus:outline-none focus:border-[#10B981]"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full h-10 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 bg-[#062F23] hover:bg-[#0B5C45] text-white cursor-pointer shadow-xs transition-colors"
              >
                <ShieldAlert className="h-4 w-4 text-amber-500" />
                <span>Deploy Restriction</span>
              </button>
            </form>
          </div>

          {/* List or Empty State */}
          <div className="rounded-[24px] border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-6 shadow-xs space-y-4 lg:col-span-2">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-3 border-b border-[#E5ECE8] dark:border-[#1E382E]">
              <h2 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Ban className="h-4.5 w-4.5 text-amber-500" />
                <span>Active restriction Rules ({rules.length})</span>
              </h2>
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8D9792]" />
                <input
                  type="text"
                  placeholder="Search active blocklists..."
                  className="w-full rounded-full h-8 pl-9 pr-3 text-xs bg-neutral-50 dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] focus:outline-none"
                />
              </div>
            </div>

            {rules.length === 0 ? (
              <div className="text-center py-20 rounded-[20px] border border-dashed border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#8D9792]">
                Outstanding security is green! No active blocks in place.
              </div>
            ) : (
              <div className="space-y-2">
                {rules.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-[#E5ECE8] dark:border-[#1E382E] flex items-center justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700">
                        {r.type}
                      </span>
                      <p className="text-xs font-bold text-neutral-900 dark:text-white mt-1">
                        {r.target}
                      </p>
                      <p className="text-[11px] text-neutral-500">{r.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
