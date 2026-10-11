'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Users,
  RefreshCw,
  TrendingUp,
  Shield,
  Activity,
  Trophy,
  Zap,
  Star,
  Flame,
} from 'lucide-react';

export default function StaffManagementPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [activeTab, setActiveTab] = useState<'performance' | 'team'>('performance');
  const [timeWindow, setTimeWindow] = useState('Today');

  const timeOptions = [
    'Today',
    'Yesterday',
    'Last 7 Days',
    'This Week',
    'Last Week',
    'This Month',
    'Last 30 Days',
  ];

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-3.5 sm:space-y-4 font-sans text-[#111827] dark:text-zinc-200 pb-8 animate-in fade-in duration-300">
        {/* Top Header Card */}
        <div className="bg-[#0B2B1A] border border-[#071C12] p-3.5 sm:p-4 rounded-xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-[#071C12] border border-white/10 p-2 text-[#10B981] mt-0.5 shrink-0 shadow-inner">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Staff Management &amp; Performance
                </h1>
                <p className="text-xs text-[#C7D9D0] mt-0.5 font-medium">
                  Track team activity, service speeds, growth leaderboards, and role assignments.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                className="bg-white/[0.06] border border-white/15 text-white hover:bg-white/10 rounded-lg h-8 px-3 text-xs font-semibold gap-1.5 inline-flex items-center transition-all cursor-pointer"
              >
                <RefreshCw className="h-3 w-3" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-3.5 pt-3 border-t border-white/10">
            <button
              onClick={() => setActiveTab('performance')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'performance'
                  ? 'bg-[#F59E0B] text-[#111827] shadow-xs'
                  : 'text-[#C7D9D0] hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <TrendingUp className="h-3 w-3" />
              <span>Performance &amp; Analytics</span>
            </button>
            <button
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-[#F59E0B] text-[#111827] shadow-xs'
                  : 'text-[#C7D9D0] hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <Shield className="h-3 w-3" />
              <span>Team &amp; Roles (0)</span>
            </button>
          </div>
        </div>

        {/* Time Window Bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap bg-[#0B2B1A] border border-[#071C12] p-2.5 sm:p-3 rounded-xl">
          <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-[#10B981]" />
            <span>Time Window:</span>
          </span>
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {timeOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setTimeWindow(opt)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  timeWindow === opt
                    ? 'bg-[#F59E0B] text-[#111827] shadow-xs'
                    : 'text-[#C7D9D0] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* 5 Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-3">
          <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs space-y-1">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
              Total Staff
            </span>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">0</p>
            <p className="text-[10px] text-neutral-500 font-medium">Assigned members</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs space-y-1">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
              Online Right Now
            </span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <p className="text-xl sm:text-2xl font-bold text-[#059669]">0</p>
            </div>
            <p className="text-[10px] text-neutral-500 font-medium">Active on dashboard</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs space-y-1">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
              Orders Today
            </span>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">0</p>
            <p className="text-[10px] text-neutral-500 font-medium">Cafe total orders</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs space-y-1">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
              Avg Service Speed
            </span>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">0s</p>
            <p className="text-[10px] text-neutral-500 font-medium">Team preparation time</p>
          </div>
          <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs space-y-1">
            <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
              Active Shift Time
            </span>
            <p className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">0h</p>
            <p className="text-[10px] text-neutral-500 font-medium">Total logged hours</p>
          </div>
        </div>

        {/* Team Performance Leaders */}
        <div className="space-y-2">
          <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-wider">
            Team Performance Leaders
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase">Most Orders</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">No data yet</p>
                <p className="text-[10px] text-neutral-400">Awaiting orders</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase">Fastest Service</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">No data yet</p>
                <p className="text-[10px] text-neutral-400">min 3 orders needed</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase">Top Rated</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">No reviews yet</p>
                <p className="text-[10px] text-neutral-400">Attributed ratings</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-neutral-400 uppercase">Best Streak</p>
                <p className="text-sm font-bold text-neutral-900 dark:text-white">No data yet</p>
                <p className="text-[10px] text-neutral-400">Active days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Members List Empty State */}
        <div className="rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] p-8 text-center space-y-2 shadow-xs">
          <p className="text-sm font-bold text-neutral-900 dark:text-white">
            No staff members matched your filter criteria.
          </p>
          <p className="text-xs text-neutral-500">
            Try searching a different name or clearing filters.
          </p>
        </div>
      </div>
    </DashboardShell>
  );
}
