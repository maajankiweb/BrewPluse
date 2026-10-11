'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ALL_DASHBOARD_TOOLS,
  DashboardTool,
  getStoredPinnedIds,
  savePinnedIds,
  DEFAULT_PINNED_IDS,
} from '@/lib/dashboardTools';
import {
  ChevronRight,
  Search,
  Pin,
  X,
  SlidersHorizontal,
  LayoutGrid,
  Users,
  TrendingUp,
  Globe,
  ArrowUpRight,
} from 'lucide-react';

export default function MorePage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const basePath = `/dashboard/${storeSlug}`;

  const [activeTab, setActiveTab] = useState<'all' | 'operations' | 'management' | 'growth' | 'support'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedIds, setPinnedIds] = useState<string[]>(DEFAULT_PINNED_IDS);

  useEffect(() => {
    setPinnedIds(getStoredPinnedIds());

    const handlePinnedChange = (e: Event) => {
      const custom = e as CustomEvent<string[]>;
      if (custom && custom.detail) {
        setPinnedIds(custom.detail);
      } else {
        setPinnedIds(getStoredPinnedIds());
      }
    };

    window.addEventListener('brewpluse::pinned_change', handlePinnedChange);
    return () => {
      window.removeEventListener('brewpluse::pinned_change', handlePinnedChange);
    };
  }, []);

  const allTools = ALL_DASHBOARD_TOOLS.map((tool) => ({
    ...tool,
    href: tool.isExternal ? tool.path : `${basePath}${tool.path}`,
  }));

  const counts = {
    all: allTools.length,
    operations: allTools.filter((t) => t.category === 'operations').length,
    management: allTools.filter((t) => t.category === 'management').length,
    growth: allTools.filter((t) => t.category === 'growth').length,
    support: allTools.filter((t) => t.category === 'support').length,
  };

  const filteredTools = allTools.filter((tool) => {
    const matchesCategory = activeTab === 'all' || tool.category === activeTab;
    const matchesQuery =
      tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categories = [
    { key: 'operations', name: 'OPERATIONS', count: counts.operations, icon: LayoutGrid },
    { key: 'management', name: 'MANAGEMENT', count: counts.management, icon: Users },
    { key: 'growth', name: 'GROWTH', count: counts.growth, icon: TrendingUp },
    { key: 'support', name: 'SUPPORT', count: counts.support, icon: Globe },
  ] as const;

  const togglePin = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIds = pinnedIds.includes(id)
      ? pinnedIds.filter((item) => item !== id)
      : [...pinnedIds, id];
    setPinnedIds(nextIds);
    savePinnedIds(nextIds);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4 pb-16 max-w-[1550px] mx-auto font-sans">
        {/* Top Header with title and count badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-[#14251F] dark:text-white tracking-tight">
              More Operations
            </h1>
            <p className="text-xs sm:text-sm text-[#64756E] dark:text-zinc-400 mt-0.5 font-medium">
              Explore BrewPluse tools, management, and business growth.
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E7F6EF] dark:bg-emerald-950/50 text-[#075C45] dark:text-emerald-300 border border-[#0B8F69]/20 shadow-2xs self-start sm:self-auto shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
            <span>18 tools available</span>
          </span>
        </div>

        {/* Full-width Search Bar */}
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#64756E]/60 dark:text-zinc-400 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools, settings, security, analytics..."
            className="w-full px-3.5 py-2 pl-9.5 pr-8 text-xs sm:text-sm rounded-xl bg-white dark:bg-[#121c16] border border-[#E1E9E4] dark:border-white/10 text-[#14251F] dark:text-white placeholder:text-[#64756E]/60 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#0B8F69]/20 focus:border-[#0B8F69] transition-all"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 p-1 rounded-md text-[#64756E]/60 hover:text-[#14251F] dark:hover:text-white transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold text-[#64756E]/70 dark:text-zinc-400 bg-[#F2F5F3] dark:bg-zinc-800 border border-[#E1E9E4] dark:border-white/10 rounded-md absolute right-3">
              /
            </kbd>
          )}
        </div>

        {/* Rounded Pill Categories matching 1:1 Live Site */}
        <div
          role="tablist"
          aria-label="Operation categories"
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5"
        >
          {(
            [
              { key: 'all', label: 'All Tools', count: counts.all },
              { key: 'operations', label: 'Operations', count: counts.operations },
              { key: 'management', label: 'Management', count: counts.management },
              { key: 'growth', label: 'Growth', count: counts.growth },
              { key: 'support', label: 'Support', count: counts.support },
            ] as const
          ).map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.key)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap cursor-pointer shrink-0 transition-all ${
                  isActive
                    ? 'bg-[#062F23] dark:bg-[#0B4A37] text-white border border-[#062F23] shadow-xs'
                    : 'bg-white dark:bg-[#121c16] text-[#14251F] dark:text-zinc-200 border border-[#E1E9E4] dark:border-white/10 hover:text-[#075C45] dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-zinc-800/40'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold tabular-nums ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F2F5F3] dark:bg-white/10 text-[#64756E] dark:text-zinc-400'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Categorized Tool Cards Grid */}
        {activeTab === 'all' && !searchQuery ? (
          <div className="space-y-6 pt-1">
            {categories.map((cat) => {
              const catTools = allTools.filter((t) => t.category === cat.key);
              const CatIcon = cat.icon;
              return (
                <div key={cat.key} className="space-y-3">
                  {/* Category Header with Icon and Subtle Horizontal Divider */}
                  <div className="flex items-center gap-2 pb-1.5 border-b border-[#E1E9E4] dark:border-white/10">
                    <CatIcon className="w-3.5 h-3.5 text-[#075C45] dark:text-emerald-400" />
                    <h2 className="text-xs font-black uppercase tracking-wider text-[#14251F] dark:text-zinc-200">
                      {cat.name} ({cat.count})
                    </h2>
                  </div>

                  {/* 4-Column Responsive Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {catTools.map((tool) => (
                      <ToolCard
                        key={tool.id}
                        tool={tool}
                        isPinned={pinnedIds.includes(tool.id)}
                        onTogglePin={(e) => togglePin(e, tool.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {filteredTools.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-white dark:bg-[#121c16] rounded-2xl border border-[#E1E9E4] dark:border-white/10 shadow-2xs">
                  <SlidersHorizontal className="w-8 h-8 text-[#64756E] dark:text-zinc-500 mx-auto mb-2" />
                  <p className="text-sm font-bold text-[#14251F] dark:text-white">No tools found</p>
                  <p className="text-xs text-[#64756E] dark:text-zinc-400 mt-1">
                    Try searching for another keyword or switch category tabs.
                  </p>
                </div>
              ) : (
                filteredTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    isPinned={pinnedIds.includes(tool.id)}
                    onTogglePin={(e) => togglePin(e, tool.id)}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

function ToolCard({
  tool,
  isPinned,
  onTogglePin,
}: {
  tool: DashboardTool & { href: string };
  isPinned: boolean;
  onTogglePin: (e: React.MouseEvent) => void;
}) {
  const Icon = tool.icon;

  const content = (
    <div className="group relative flex flex-col justify-between p-3 sm:p-3.5 rounded-xl bg-white dark:bg-[#121c16] border border-[#E1E9E4] dark:border-white/10 hover:border-[#0B8F69]/40 hover:shadow-[0_4px_16px_rgba(7,92,69,0.06)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] transition-all duration-150 cursor-pointer min-h-[92px] sm:h-[100px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B8F69] focus-visible:ring-offset-2">
      <div>
        <div className="flex items-start justify-between gap-2">
          {/* Left: Pastel Squircle Icon + Title */}
          <div className="flex items-center gap-2 min-w-0">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${tool.iconClasses}`}
            >
              <Icon className="w-3.5 h-3.5" />
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-[13px] font-bold text-[#14251F] dark:text-white group-hover:text-[#075C45] dark:group-hover:text-emerald-400 transition-colors truncate">
                  {tool.title}
                </h3>
                {tool.badge === 'NEW' && (
                  <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-[#DDF5EA] dark:bg-emerald-950/60 text-[#075C45] dark:text-emerald-300 border border-[#0B8F69]/20 shrink-0">
                    NEW
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Pin Toggle Button & Chevron/External link */}
          <div className="flex items-center gap-1 shrink-0 -mr-1 -mt-0.5">
            <button
              type="button"
              onClick={onTogglePin}
              className={`p-1 rounded-md transition-colors cursor-pointer ${
                isPinned
                  ? 'text-[#075C45] dark:text-emerald-300 bg-[#DDF5EA] dark:bg-emerald-950/60 hover:bg-[#C8EEDD]'
                  : 'text-[#64756E]/60 dark:text-zinc-500 hover:text-[#075C45] dark:hover:text-emerald-400 hover:bg-[#F8FAF8] dark:hover:bg-zinc-800 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity'
              }`}
              title={isPinned ? 'Unpin from sidebar' : 'Pin to sidebar'}
              aria-label={isPinned ? 'Unpin from sidebar' : 'Pin to sidebar'}
            >
              <Pin className={`w-3 h-3 ${isPinned ? 'fill-current' : ''}`} />
            </button>

            {tool.isExternal ? (
              <div className="p-0.5 text-[#64756E]/40 group-hover:text-[#0B8F69] dark:group-hover:text-emerald-400 transition-all">
                <ArrowUpRight className="w-3 h-3" />
              </div>
            ) : (
              <div className="p-0.5 text-[#64756E]/40 group-hover:text-[#0B8F69] dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all">
                <ChevronRight className="w-3 h-3" />
              </div>
            )}
          </div>
        </div>

        <p className="text-[11px] text-[#64756E] dark:text-zinc-400 leading-relaxed line-clamp-2 mt-1.5 font-normal">
          {tool.desc}
        </p>
      </div>
    </div>
  );

  if (tool.isExternal) {
    return (
      <a href={tool.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={tool.href}>{content}</Link>;
}
