'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  RefreshCw,
  Volume2,
  VolumeX,
  ChefHat,
  Search,
  LayoutList,
  BookOpen,
} from 'lucide-react';

export default function KdsPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [activeQueue, setActiveQueue] = useState('active');
  const [viewMode, setViewMode] = useState<'ticket' | 'recipe'>('ticket');
  const [audioActive, setAudioActive] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const queueTabs = [
    { id: 'active', label: 'Active Queue', count: 0 },
    { id: 'tomake', label: 'To Make', count: 0 },
    { id: 'prep', label: 'Preparing', count: 0 },
    { id: 'ready', label: 'Ready to Serve', count: 0 },
    { id: 'delivered', label: 'Delivered', count: 0 },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 600);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight">
                Kitchen Display System
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                LIVE SYNC
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Real-time preparation pipeline, timers, and waiter handoff.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={handleSync}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white flex items-center gap-1.5 hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#0B5C45]' : ''}`} />
              <span>Sync Now</span>
            </button>
            <button
              type="button"
              onClick={() => setAudioActive(!audioActive)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
                audioActive
                  ? 'bg-white dark:bg-[#0E2018] border-[#E5ECE8] dark:border-[#1E382E] text-[#12201B] dark:text-white hover:bg-[#F8FAF8] dark:hover:bg-[#132A20]'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500'
              }`}
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5 text-[#0B5C45]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{audioActive ? 'Audio Active' : 'Audio Muted'}</span>
            </button>
          </div>
        </div>

        {/* Status Strip Card */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <ChefHat className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">KITCHEN STATUS</p>
              <p className="text-xs font-bold text-[#12201B] dark:text-white flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                Operating Normally
              </p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-3 md:gap-8 border-t md:border-t-0 md:border-l border-[#E5ECE8] dark:border-[#1E382E] pt-3 md:pt-0 md:pl-8 text-center">
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#8D9792]">ACTIVE ORDERS</p>
              <p className="text-lg font-bold text-[#12201B] dark:text-white mt-0.5">0</p>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#8D9792]">TO MAKE</p>
              <p className="text-lg font-bold text-amber-600 mt-0.5">0</p>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#8D9792]">PREPARING</p>
              <p className="text-lg font-bold text-[#087A5B] dark:text-[#10B981] mt-0.5">0</p>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#8D9792]">READY</p>
              <p className="text-lg font-bold text-emerald-600 mt-0.5">0</p>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#8D9792]">DELAYED</p>
              <p className="text-lg font-bold text-[#12201B] dark:text-white mt-0.5">0</p>
            </div>
          </div>
        </div>

        {/* Queue Control Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {queueTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveQueue(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeQueue === tab.id
                    ? 'bg-[#062F23] text-white shadow-2xs'
                    : 'bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  activeQueue === tab.id ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-[#65736D] dark:text-[#9AB2A8]'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] p-0.5 rounded-lg text-xs font-semibold shadow-2xs">
              <button
                type="button"
                onClick={() => setViewMode('ticket')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'ticket'
                    ? 'bg-[#062F23] text-white shadow-2xs'
                    : 'text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] dark:hover:text-white'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" />
                <span>Ticket View</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('recipe')}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'recipe'
                    ? 'bg-[#062F23] text-white shadow-2xs'
                    : 'text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Recipe View</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8D9792] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search table, order, item..."
                className="h-8 pl-8 pr-3 rounded-lg bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white placeholder-[#8D9792] focus:outline-none focus:border-[#0B5C45] shadow-2xs w-48 sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* Empty Kitchen State */}
        <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-16 sm:p-20 text-center space-y-3.5 shadow-2xs">
          <div className="w-14 h-14 rounded-2xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto">
            <ChefHat className="w-7 h-7" />
          </div>
          <p className="text-base font-bold text-[#12201B] dark:text-white">Kitchen is clear</p>
          <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-sm mx-auto leading-relaxed">
            No orders waiting to be prepared. New orders will appear here automatically.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Live Sync Active
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
