'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  RefreshCw,
  Volume2,
  VolumeX,
  ChefHat,
  Search,
  LayoutList,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Printer,
  ArrowRight,
  Flame,
  Bell,
  Utensils,
  Check,
} from 'lucide-react';
import { thermalPrinter } from '@/lib/thermalPrinter';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price?: number;
  notes?: string;
  done?: boolean;
}

interface KdsOrder {
  storeId: string;
  orderNumber: string;
  table: string;
  orderType: string;
  items: OrderItem[];
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  notes?: string;
  customerName?: string;
  createdAt: string;
  total?: number;
}

export default function KdsPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [orders, setOrders] = useState<KdsOrder[]>([]);
  const [activeQueue, setActiveQueue] = useState<string>('active');
  const [viewMode, setViewMode] = useState<'ticket' | 'recipe'>('ticket');
  const [audioActive, setAudioActive] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const lastOrderCountRef = useRef<number>(0);

  // Synthesized chime using Web Audio API (zero audio file dependencies, works offline!)
  const playNewOrderChime = () => {
    if (!audioActive || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // First chime tone
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      gain1.gain.setValueAtTime(0.3, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.6);

      // Second higher tone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.2); // A5
      gain2.gain.setValueAtTime(0.35, ctx.currentTime + 0.2);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.2);
      osc2.stop(ctx.currentTime + 0.9);
    } catch (e) {
      console.warn('Audio chime failed:', e);
    }
  };

  // Fetch orders from API and sync with local storage
  const fetchOrders = async (showSpin = false) => {
    if (showSpin) setIsSyncing(true);
    try {
      const res = await fetch(`/api/orders?storeId=${storeSlug}&limit=50`);
      const data = await res.json();
      let fetched: KdsOrder[] = data.orders || [];

      // Merge any local orders placed on same device
      try {
        const local = JSON.parse(localStorage.getItem('brewpluse::orders') || '[]');
        if (Array.isArray(local) && local.length > 0) {
          const map = new Map<string, KdsOrder>();
          fetched.forEach((o) => map.set(o.orderNumber, o));
          local.forEach((o: KdsOrder) => {
            if (!map.has(o.orderNumber)) {
              map.set(o.orderNumber, o);
            }
          });
          fetched = Array.from(map.values());
        }
      } catch (e) {}

      // Sort newest first
      fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      // Check if new incoming pending order arrived
      const pendingCount = fetched.filter((o) => o.status === 'pending').length;
      if (lastOrderCountRef.current > 0 && pendingCount > lastOrderCountRef.current) {
        playNewOrderChime();
      }
      lastOrderCountRef.current = pendingCount;

      setOrders(fetched);
    } catch (e) {
      console.error('KDS sync error:', e);
    } finally {
      if (showSpin) setTimeout(() => setIsSyncing(false), 500);
    }
  };

  // Initial fetch and auto-polling every 4 seconds
  useEffect(() => {
    fetchOrders(false);
    const interval = setInterval(() => {
      fetchOrders(false);
    }, 4000);
    return () => clearInterval(interval);
  }, [storeSlug]);

  // Update order status
  const updateStatus = async (orderNumber: string, newStatus: KdsOrder['status']) => {
    // Optimistic UI update
    setOrders((prev) =>
      prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status: newStatus } : o))
    );

    // Update in local storage
    try {
      const local = JSON.parse(localStorage.getItem('brewpluse::orders') || '[]');
      const updatedLocal = local.map((o: any) =>
        o.orderNumber === orderNumber ? { ...o, status: newStatus } : o
      );
      localStorage.setItem('brewpluse::orders', JSON.stringify(updatedLocal));
    } catch (e) {}

    // Call API
    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, status: newStatus }),
      });
    } catch (e) {
      console.error('Failed to patch order status:', e);
    }
  };

  // Toggle item checkmark
  const toggleItemDone = (orderNumber: string, itemIdx: number) => {
    const key = `${orderNumber}-${itemIdx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Print KOT
  const handlePrintKOT = (order: KdsOrder) => {
    thermalPrinter.printKOT({
      orderNumber: order.orderNumber,
      table: order.table,
      timestamp: new Date(order.createdAt).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: order.items.map((i) => ({
        name: i.name,
        qty: i.qty,
        notes: i.notes,
      })),
      notes: order.notes,
      paperWidth: '80mm',
    });
  };

  // Elapsed time calculation
  const getElapsedMinutes = (dateString: string) => {
    const diffMs = Date.now() - new Date(dateString).getTime();
    return Math.floor(diffMs / 60000);
  };

  // Counts for tabs
  const counts = useMemo(() => {
    const active = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length;
    const tomake = orders.filter((o) => o.status === 'pending').length;
    const prep = orders.filter((o) => o.status === 'preparing').length;
    const ready = orders.filter((o) => o.status === 'ready').length;
    const delivered = orders.filter((o) => o.status === 'completed').length;
    return { active, tomake, prep, ready, delivered };
  }, [orders]);

  // Filtered orders for current queue & search
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Tab filter
      let matchesTab = false;
      if (activeQueue === 'active') {
        matchesTab = order.status !== 'completed' && order.status !== 'cancelled';
      } else if (activeQueue === 'tomake') {
        matchesTab = order.status === 'pending';
      } else if (activeQueue === 'prep') {
        matchesTab = order.status === 'preparing';
      } else if (activeQueue === 'ready') {
        matchesTab = order.status === 'ready';
      } else if (activeQueue === 'delivered') {
        matchesTab = order.status === 'completed';
      }

      // Search query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        order.orderNumber.toLowerCase().includes(query) ||
        order.table.toLowerCase().includes(query) ||
        order.items.some((i) => i.name.toLowerCase().includes(query));

      return matchesTab && matchesSearch;
    });
  }, [orders, activeQueue, searchQuery]);

  const queueTabs = [
    { id: 'active', label: 'Active Queue', count: counts.active },
    { id: 'tomake', label: 'To Make (New)', count: counts.tomake },
    { id: 'prep', label: 'Preparing', count: counts.prep },
    { id: 'ready', label: 'Ready to Serve', count: counts.ready },
    { id: 'delivered', label: 'Completed', count: counts.delivered },
  ];

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0E2018] p-3.5 sm:p-4 rounded-2xl border border-[#E5ECE8] dark:border-[#1E382E] shadow-2xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#12201B] dark:text-white tracking-tight">
                Kitchen Display System (KDS)
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                AUTO-POLLING LIVE
              </span>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Live preparation pipeline with instant sound alerts, timers, and waiter handoff.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => fetchOrders(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white flex items-center gap-1.5 hover:bg-[#EAEFEA] transition-colors cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#0B5C45]' : ''}`} />
              <span>Sync</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setAudioActive(!audioActive);
                if (!audioActive) playNewOrderChime();
              }}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
                audioActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500'
              }`}
            >
              {audioActive ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{audioActive ? 'Chime Active' : 'Chime Muted'}</span>
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
                {counts.tomake > 3 ? 'High Rush — Kitchen Loaded' : 'Operating Normally'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 md:gap-8 border-t md:border-t-0 md:border-l border-[#E5ECE8] dark:border-[#1E382E] pt-3 md:pt-0 md:pl-8 text-center">
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#8D9792]">ACTIVE</p>
              <p className="text-lg font-black text-[#12201B] dark:text-white mt-0.5">{counts.active}</p>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-amber-600">TO MAKE</p>
              <p className="text-lg font-black text-amber-600 mt-0.5">{counts.tomake}</p>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#087A5B] dark:text-[#10B981]">PREPARING</p>
              <p className="text-lg font-black text-[#087A5B] dark:text-[#10B981] mt-0.5">{counts.prep}</p>
            </div>
            <div>
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-emerald-600">READY</p>
              <p className="text-lg font-black text-emerald-600 mt-0.5">{counts.ready}</p>
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
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeQueue === tab.id
                    ? 'bg-[#062F23] text-white shadow-2xs'
                    : 'bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    activeQueue === tab.id ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10 text-[#65736D] dark:text-[#9AB2A8]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
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
                <span>Ticket Grid</span>
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
                <span>Recipe Reference</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8D9792] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search table, ticket #..."
                className="h-8 pl-8 pr-3 rounded-lg bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white placeholder-[#8D9792] focus:outline-none focus:border-[#0B5C45] shadow-2xs w-48 sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* Content View: Ticket Grid or Recipe Reference */}
        {viewMode === 'recipe' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] space-y-2">
              <h3 className="font-bold text-sm text-[#12201B] dark:text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#0B5C45]" />
                Flat White Standard
              </h3>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] leading-relaxed">
                • 18g finely ground espresso double shot (extraction time: 27s).<br />
                • 150ml whole milk steamed to 62°C with silky micro-foam.<br />
                • Pour with thin foam head, consistent latte art.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] space-y-2">
              <h3 className="font-bold text-sm text-[#12201B] dark:text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#0B5C45]" />
                Paneer Tikka Sandwich
              </h3>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] leading-relaxed">
                • 2 slices rustic artisanal sourdough.<br />
                • 80g marinated spiced cottage cheese cubes + mint chutney spread.<br />
                • Grill in sandwich press at 200°C for 3.5 minutes until golden brown.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] space-y-2">
              <h3 className="font-bold text-sm text-[#12201B] dark:text-white flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#0B5C45]" />
                Artisan Masala Chai
              </h3>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] leading-relaxed">
                • 120ml water + 80ml rich toned milk.<br />
                • 1 crushed green cardamom, 5g freshly grated ginger, 1 pinch cinnamon.<br />
                • Double boil, strain hot into pre-warmed ceramic mug.
              </p>
            </div>
          </div>
        ) : filteredOrders.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-16 sm:p-20 text-center space-y-3.5 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto">
              <ChefHat className="w-7 h-7" />
            </div>
            <p className="text-base font-bold text-[#12201B] dark:text-white">Kitchen queue is clear</p>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-sm mx-auto leading-relaxed">
              No orders waiting in this category. Place an order via POS counter or scan table QR code to test instant ticket arrival!
            </p>
          </div>
        ) : (
          /* Ticket Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
            {filteredOrders.map((order) => {
              const elapsed = getElapsedMinutes(order.createdAt);
              const isUrgent = elapsed >= 12;
              const isWarning = elapsed >= 7 && elapsed < 12;

              return (
                <div
                  key={order.orderNumber}
                  className={`rounded-2xl border bg-white dark:bg-[#0E2018] overflow-hidden shadow-2xs transition-all ${
                    order.status === 'ready'
                      ? 'border-emerald-400 dark:border-emerald-600'
                      : isUrgent
                      ? 'border-red-400 dark:border-red-600 ring-2 ring-red-400/20'
                      : 'border-[#E5ECE8] dark:border-[#1E382E]'
                  }`}
                >
                  {/* Ticket Header */}
                  <div
                    className={`p-3.5 flex items-center justify-between border-b ${
                      order.status === 'ready'
                        ? 'bg-emerald-500/10 border-emerald-200 dark:border-emerald-900'
                        : order.status === 'preparing'
                        ? 'bg-[#E8F6EF] dark:bg-[#142E25] border-emerald-200 dark:border-[#1E382E]'
                        : 'bg-[#F8FAF8] dark:bg-[#11241C] border-[#E5ECE8] dark:border-[#1E382E]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-[#12201B] dark:text-white">
                          #{order.orderNumber}
                        </span>
                        <span className="text-xs font-black px-2 py-0.5 rounded-md bg-[#062F23] text-white">
                          {order.table}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#65736D] dark:text-[#9AB2A8] mt-0.5 font-semibold">
                        {order.customerName ? `${order.customerName} • ` : ''}
                        {order.orderType?.toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div
                        className={`flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg ${
                          isUrgent
                            ? 'bg-red-500 text-white animate-pulse'
                            : isWarning
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        }`}
                      >
                        <Clock className="w-3 h-3" />
                        <span>{elapsed}m ago</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePrintKOT(order)}
                        title="Print KOT ticket"
                        className="p-1.5 rounded-lg bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-zinc-600 dark:text-zinc-300 hover:text-[#0B5C45] cursor-pointer"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="p-4 space-y-2.5">
                    {order.items.map((item, idx) => {
                      const itemKey = `${order.orderNumber}-${idx}`;
                      const isDone = checkedItems[itemKey];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleItemDone(order.orderNumber, idx)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isDone
                              ? 'bg-zinc-100/70 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 opacity-50 line-through'
                              : 'bg-[#F8FAF8] dark:bg-[#11241C] border-[#E5ECE8] dark:border-[#1E382E]'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div
                              className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                                isDone
                                  ? 'bg-[#0B5C45] border-[#0B5C45] text-white'
                                  : 'bg-white dark:bg-[#0E2018] border-zinc-300 dark:border-zinc-700'
                              }`}
                            >
                              {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#12201B] dark:text-white">
                                <span className="text-[#0B5C45] dark:text-[#10B981] font-black text-sm mr-1">
                                  {item.qty}x
                                </span>
                                {item.name}
                              </p>
                              {item.notes && (
                                <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold mt-0.5">
                                  ↳ Note: {item.notes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {order.notes && (
                      <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 text-xs font-semibold">
                        ⚠️ Chef Instruction: {order.notes}
                      </div>
                    )}
                  </div>

                  {/* Action Transition Buttons */}
                  <div className="p-3 bg-[#FAFBF9] dark:bg-[#0B1A13] border-t border-[#E5ECE8] dark:border-[#1E382E] flex items-center gap-2">
                    {order.status === 'pending' && (
                      <button
                        type="button"
                        onClick={() => updateStatus(order.orderNumber, 'preparing')}
                        className="flex-1 py-2.5 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        <span>Start Preparing</span>
                      </button>
                    )}

                    {order.status === 'preparing' && (
                      <button
                        type="button"
                        onClick={() => updateStatus(order.orderNumber, 'ready')}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Order Ready</span>
                      </button>
                    )}

                    {order.status === 'ready' && (
                      <button
                        type="button"
                        onClick={() => updateStatus(order.orderNumber, 'completed')}
                        className="flex-1 py-2.5 rounded-xl bg-[#0B5C45] hover:bg-[#062F23] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Hand Over to Waiter (Done)</span>
                      </button>
                    )}

                    {order.status === 'completed' && (
                      <div className="w-full py-2 text-center text-xs font-bold text-emerald-600 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Delivered to Guest</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
