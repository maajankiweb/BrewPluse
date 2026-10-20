'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Flame,
  Utensils,
  CreditCard,
  Banknote,
  QrCode,
  Volume2,
  VolumeX,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';

interface OrderItem {
  id?: string;
  name: string;
  qty?: number;
  quantity?: number;
  price?: number;
  variant?: { name: string };
  addons?: { name: string }[];
  note?: string;
  notes?: string;
}

interface LiveOrder {
  id: string;
  orderNumber: string;
  table: string;
  status: 'placed' | 'accepted' | 'preparing' | 'ready' | 'served' | 'completed' | 'cancelled';
  subtotal: number;
  total: number;
  paymentMode?: string;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  paymentIntent?: 'pay_now' | 'pay_later';
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  items: OrderItem[];
  createdAt: string;
  elapsedMinutes: number;
  tableSessionStatus?: 'open' | 'bill_requested' | 'paid' | 'closed';
}

interface TableSummary {
  id: string;
  number: string;
  status: 'vacant' | 'occupied' | 'bill_requested' | 'paid';
  dueAmount: number;
  activeSessionId?: string;
  isStale?: boolean;
  durationMinutes?: number;
}

export default function LiveOrdersBoardPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [viewTab, setViewTab] = useState<'board' | 'tables'>('board');
  const [orders, setOrders] = useState<LiveOrder[]>([]);
  const [tables, setTables] = useState<TableSummary[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [audioActive, setAudioActive] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<LiveOrder | null>(null);

  // Settlement Drawer state
  const [settlementTable, setSettlementTable] = useState<TableSummary | null>(null);
  const [sessionDetail, setSessionDetail] = useState<any | null>(null);
  const [loadingSession, setLoadingSession] = useState(false);
  const [settlingAction, setSettlingAction] = useState(false);
  const prevOrdersCountRef = useRef<number>(0);

  const openSettlement = async (table: TableSummary) => {
    if (!table.activeSessionId) return;
    setSettlementTable(table);
    setLoadingSession(true);
    try {
      const res = await fetch(`/api/admin/table-sessions/${table.activeSessionId}`);
      if (res.ok) {
        const data = await res.json();
        setSessionDetail(data.session);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingSession(false);
    }
  };

  const handleSettle = async (method: 'cash' | 'upi_manual' | 'card_pos') => {
    if (!settlementTable?.activeSessionId) return;
    setSettlingAction(true);
    try {
      const res = await fetch(`/api/admin/table-sessions/${settlementTable.activeSessionId}/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method }),
      });
      if (res.ok) {
        await fetchLiveState();
        const refRes = await fetch(`/api/admin/table-sessions/${settlementTable.activeSessionId}`);
        if (refRes.ok) {
          const data = await refRes.json();
          setSessionDetail(data.session);
        }
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to record payment');
      }
    } catch (e) {
      alert('Error recording payment');
    } finally {
      setSettlingAction(false);
    }
  };

  const handleClearTable = async () => {
    if (!settlementTable?.activeSessionId) return;
    if (!confirm(`Are you sure you want to clear Table ${settlementTable.number}?`)) return;
    setSettlingAction(true);
    try {
      const res = await fetch(`/api/admin/table-sessions/${settlementTable.activeSessionId}/clear`, {
        method: 'POST',
      });
      if (res.ok) {
        setSettlementTable(null);
        setSessionDetail(null);
        await fetchLiveState();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to clear table');
      }
    } catch (e) {
      alert('Error clearing table');
    } finally {
      setSettlingAction(false);
    }
  };

  // Play audio chime on new placed order or bill request
  const playAlertChime = () => {
    if (!audioActive || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(987.77, ctx.currentTime + 0.18); // B5
      gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.18);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.18);
      osc2.stop(ctx.currentTime + 0.8);
    } catch (e) {}
  };

  const fetchLiveState = async (showSpin = false) => {
    if (showSpin) setIsSyncing(true);
    try {
      const [resOrders, resTables] = await Promise.all([
        fetch('/api/admin/orders'),
        fetch('/api/admin/tables'),
      ]);

      if (resOrders.ok) {
        const dataOrders = await resOrders.json();
        const incomingOrders: LiveOrder[] = dataOrders.orders || [];

        // Check for new incoming orders
        const placedCount = incomingOrders.filter((o) => o.status === 'placed').length;
        if (prevOrdersCountRef.current > 0 && placedCount > prevOrdersCountRef.current) {
          playAlertChime();
        }
        prevOrdersCountRef.current = placedCount;

        setOrders(incomingOrders);
      }

      if (resTables.ok) {
        const dataTables = await resTables.json();
        const incomingTables = (dataTables.tables || []).map((t: any) => {
          let status: 'vacant' | 'occupied' | 'bill_requested' | 'paid' = 'vacant';
          let dueAmount = 0;
          let isStale = false;
          let durationMinutes = 0;

          if (t.activeSession) {
            if (t.activeSession.status === 'bill_requested') {
              status = 'bill_requested';
            } else if (t.activeSession.status === 'paid') {
              status = 'paid';
            } else if (t.activeSession.status === 'open') {
              status = 'occupied';
            }
            dueAmount = (t.activeSession.totals?.due || 0) / 100;

            if (t.activeSession.createdAt) {
              const createdMs = new Date(t.activeSession.createdAt).getTime();
              if (createdMs > 0) {
                durationMinutes = Math.floor((Date.now() - createdMs) / 60000);
                if (durationMinutes >= 180 && status !== 'vacant') {
                  isStale = true;
                }
              }
            }
          }

          return {
            id: t.id,
            number: t.number,
            status,
            dueAmount,
            activeSessionId: t.activeSession?.id,
            isStale,
            durationMinutes,
          };
        });
        setTables(incomingTables);
      }
    } catch (err) {
      console.error('[Admin live board sync error]:', err);
    } finally {
      if (showSpin) setTimeout(() => setIsSyncing(false), 400);
    }
  };

  useEffect(() => {
    fetchLiveState(false);
    const interval = setInterval(() => {
      fetchLiveState(false);
    }, 4000);
    return () => clearInterval(interval);
  }, [storeSlug]);

  // Update order status
  const handleUpdateStatus = async (orderId: string, nextStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: nextStatus as any } : o))
    );

    try {
      await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      fetchLiveState(false);
    } catch (err) {
      console.error('[Status PATCH error]:', err);
    }
  };

  // Group orders into the 4 standard Kanban columns per spec §8:
  // New (placed), Preparing (accepted/preparing), Ready, Served
  const colNew = orders.filter((o) => o.status === 'placed');
  const colCooking = orders.filter((o) => o.status === 'accepted' || o.status === 'preparing');
  const colReady = orders.filter((o) => o.status === 'ready');
  const colServed = orders.filter((o) => o.status === 'served');

  const filteredNew = colNew.filter((o) => matchesSearch(o, searchQuery));
  const filteredCooking = colCooking.filter((o) => matchesSearch(o, searchQuery));
  const filteredReady = colReady.filter((o) => matchesSearch(o, searchQuery));
  const filteredServed = colServed.filter((o) => matchesSearch(o, searchQuery));

  function matchesSearch(order: LiveOrder, query: string) {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      order.orderNumber.toLowerCase().includes(q) ||
      order.table.toLowerCase().includes(q) ||
      (order.customerName && order.customerName.toLowerCase().includes(q))
    );
  }

  // Payment badge helper per spec §8
  const renderPaymentBadge = (order: LiveOrder) => {
    if (order.paymentStatus === 'paid') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-2.5 h-2.5" />
          <span>Paid online</span>
        </span>
      );
    }

    if (order.tableSessionStatus === 'bill_requested') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-amber-500/25 text-amber-300 border border-amber-500/40 animate-pulse">
          <AlertCircle className="w-2.5 h-2.5" />
          <span>Bill requested</span>
        </span>
      );
    }

    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black bg-yellow-500/15 text-yellow-300 border border-yellow-500/20">
        <Clock className="w-2.5 h-2.5" />
        <span>Unpaid · pay later</span>
      </span>
    );
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-6 animate-in fade-in duration-300 select-none pb-12">
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#12141c] p-4 rounded-2xl border border-white/10 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-white tracking-tight">Live Orders & Tables</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  REALTIME
                </span>
              </div>
              <p className="text-xs text-neutral-400 font-medium">
                Live table orders, kitchen queue progression & payment settlements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setViewTab('board')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewTab === 'board'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Orders Board
              </button>
              <button
                onClick={() => setViewTab('tables')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewTab === 'tables'
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Tables Grid ({tables.length})
              </button>
            </div>

            {/* Standalone KDS Link */}
            <Link
              href="/kitchen"
              target="_blank"
              className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-bold text-neutral-200 flex items-center gap-1.5 transition-all"
            >
              <span>Kitchen Screen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Audio Toggle */}
            <button
              onClick={() => setAudioActive(!audioActive)}
              className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                audioActive
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-white/5 border-white/10 text-neutral-400'
              }`}
              title={audioActive ? 'Chime active' : 'Chime muted'}
            >
              {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Refresh Button */}
            <button
              onClick={() => fetchLiveState(true)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
              title="Refresh live orders"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
            </button>
          </div>
        </div>

        {viewTab === 'board' ? (
          /* 4-Column Live Kanban Board */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. New Orders Column */}
            <div className="bg-[#12141c] rounded-2xl border border-white/10 flex flex-col h-[750px] overflow-hidden">
              <div className="p-3.5 border-b border-white/10 bg-amber-500/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <h2 className="text-sm font-black text-white uppercase tracking-wider">New (Placed)</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300">
                  {filteredNew.length}
                </span>
              </div>

              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {filteredNew.length === 0 ? (
                  <p className="text-xs text-neutral-500 text-center py-10 font-medium">No new orders placed</p>
                ) : (
                  filteredNew.map((o) => (
                    <OrderCard
                      key={o.id}
                      order={o}
                      renderBadge={() => renderPaymentBadge(o)}
                      onAction={() => handleUpdateStatus(o.id, 'accepted')}
                      actionLabel="Accept Order"
                      actionColor="bg-amber-500 hover:bg-amber-600 text-black"
                    />
                  ))
                )}
              </div>
            </div>

            {/* 2. Cooking / Preparing Column */}
            <div className="bg-[#12141c] rounded-2xl border border-white/10 flex flex-col h-[750px] overflow-hidden">
              <div className="p-3.5 border-b border-white/10 bg-blue-500/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-blue-400" />
                  <h2 className="text-sm font-black text-white uppercase tracking-wider">Cooking</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-blue-500/20 text-blue-300">
                  {filteredCooking.length}
                </span>
              </div>

              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {filteredCooking.length === 0 ? (
                  <p className="text-xs text-neutral-500 text-center py-10 font-medium">Kitchen is clear</p>
                ) : (
                  filteredCooking.map((o) => (
                    <OrderCard
                      key={o.id}
                      order={o}
                      renderBadge={() => renderPaymentBadge(o)}
                      onAction={() => handleUpdateStatus(o.id, 'ready')}
                      actionLabel="Mark Ready"
                      actionColor="bg-blue-500 hover:bg-blue-600 text-white"
                    />
                  ))
                )}
              </div>
            </div>

            {/* 3. Ready for Service Column */}
            <div className="bg-[#12141c] rounded-2xl border border-white/10 flex flex-col h-[750px] overflow-hidden">
              <div className="p-3.5 border-b border-white/10 bg-emerald-500/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-black text-white uppercase tracking-wider">Ready to Serve</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300">
                  {filteredReady.length}
                </span>
              </div>

              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {filteredReady.length === 0 ? (
                  <p className="text-xs text-neutral-500 text-center py-10 font-medium">No ready tickets</p>
                ) : (
                  filteredReady.map((o) => (
                    <OrderCard
                      key={o.id}
                      order={o}
                      renderBadge={() => renderPaymentBadge(o)}
                      onAction={() => handleUpdateStatus(o.id, 'served')}
                      actionLabel="Serve to Table"
                      actionColor="bg-emerald-500 hover:bg-emerald-600 text-black"
                    />
                  ))
                )}
              </div>
            </div>

            {/* 4. Served Column */}
            <div className="bg-[#12141c] rounded-2xl border border-white/10 flex flex-col h-[750px] overflow-hidden">
              <div className="p-3.5 border-b border-white/10 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-neutral-400" />
                  <h2 className="text-sm font-black text-white uppercase tracking-wider">Served (Active)</h2>
                </div>
                <span className="px-2 py-0.5 rounded-full text-xs font-black bg-white/10 text-neutral-300">
                  {filteredServed.length}
                </span>
              </div>

              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {filteredServed.length === 0 ? (
                  <p className="text-xs text-neutral-500 text-center py-10 font-medium">No served orders</p>
                ) : (
                  filteredServed.map((o) => (
                    <OrderCard
                      key={o.id}
                      order={o}
                      renderBadge={() => renderPaymentBadge(o)}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Tables Grid Colour-Coded per spec §8:
             Vacant (grey), Occupied (blue), Bill requested (amber, pulsing), Paid (green) */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {tables.map((t) => {
              let styleClass = 'bg-[#12141c] border-white/10 text-neutral-400';
              let badgeText = 'Vacant';
              let badgeColor = 'bg-white/5 text-neutral-400 border-white/10';

              if (t.status === 'bill_requested') {
                styleClass = 'bg-amber-950/20 border-amber-500/60 shadow-amber-950/40 shadow-xl animate-pulse';
                badgeText = 'Bill Requested';
                badgeColor = 'bg-amber-500/30 text-amber-300 border-amber-500/40';
              } else if (t.status === 'occupied') {
                styleClass = 'bg-blue-950/20 border-blue-500/40 text-blue-300 shadow-lg';
                badgeText = 'Occupied';
                badgeColor = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
              } else if (t.status === 'paid') {
                styleClass = 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300 shadow-lg';
                badgeText = 'Paid';
                badgeColor = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';
              }

              return (
                <div
                  key={t.id}
                  className={`rounded-2xl border p-4 flex flex-col justify-between h-44 transition-all ${styleClass}`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xl font-black text-white">{t.number}</span>
                    <div className="flex items-center gap-1">
                      {t.isStale && (
                        <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                          Stale ({Math.floor((t.durationMinutes || 180) / 60)}h+)
                        </span>
                      )}
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${badgeColor}`}>
                        {badgeText}
                      </span>
                    </div>
                  </div>

                  <div>
                    {t.status !== 'vacant' ? (
                      <div className="space-y-1">
                        <p className="text-[11px] text-neutral-400 font-medium">Due Balance</p>
                        <p className="text-lg font-black text-white">₹{t.dueAmount.toFixed(2)}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-neutral-500 font-medium">Ready for guests</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 gap-2">
                    {t.status !== 'vacant' ? (
                      <button
                        onClick={() => openSettlement(t)}
                        className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Settle / Bill</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-neutral-500">Vacant</span>
                    )}

                    <Link
                      href={`/dashboard/${storeSlug}/tables`}
                      className="text-[11px] font-bold text-neutral-400 hover:text-white flex items-center"
                    >
                      <span>QR</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Settlement Modal */}
        {settlementTable && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#12141c] border border-white/20 rounded-2xl w-full max-w-lg p-6 space-y-6 shadow-2xl relative">
              <button
                onClick={() => {
                  setSettlementTable(null);
                  setSessionDetail(null);
                }}
                className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-black text-white">Table {settlementTable.number} Bill</h3>
                  <p className="text-xs text-neutral-400">Session ID: {settlementTable.activeSessionId?.slice(0, 10)}...</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-neutral-400 block font-medium">Balance Due</span>
                  <span className="text-2xl font-black text-amber-400">
                    ₹{sessionDetail ? (sessionDetail.totals?.due / 100).toFixed(2) : settlementTable.dueAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              {loadingSession ? (
                <div className="py-12 text-center text-sm text-neutral-400">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-amber-400" />
                  Loading session breakdown...
                </div>
              ) : sessionDetail ? (
                <div className="space-y-4">
                  {/* Order list */}
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {(sessionDetail.orders || []).map((o: any, idx: number) => (
                      <div key={idx} className="bg-white/5 rounded-xl p-3 text-xs flex justify-between items-center">
                        <div>
                          <span className="font-bold text-white mr-2">{o.orderNumber}</span>
                          <span className="text-neutral-400 text-[11px]">
                            {o.items?.map((it: any) => `${it.qty || it.quantity || 1}x ${it.name}`).join(', ')}
                          </span>
                        </div>
                        <span className="font-bold text-neutral-200">₹{(o.total || 0).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="bg-black/30 rounded-xl p-3 space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Subtotal</span>
                      <span>₹{(sessionDetail.totals?.subtotal / 100).toFixed(2)}</span>
                    </div>
                    {sessionDetail.totals?.tax > 0 && (
                      <div className="flex justify-between text-neutral-400">
                        <span>GST / Taxes</span>
                        <span>₹{(sessionDetail.totals?.tax / 100).toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-neutral-400">
                      <span>Already Paid</span>
                      <span className="text-emerald-400 font-bold">₹{(sessionDetail.totals?.paid / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-white/10">
                      <span>Total Due</span>
                      <span className="text-amber-400">₹{(sessionDetail.totals?.due / 100).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Settle Buttons */}
                  {sessionDetail.totals?.due > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-neutral-300 uppercase tracking-wider">Record Offline Payment</p>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          disabled={settlingAction}
                          onClick={() => handleSettle('cash')}
                          className="h-10 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <Banknote className="w-4 h-4" />
                          <span>Cash</span>
                        </button>
                        <button
                          disabled={settlingAction}
                          onClick={() => handleSettle('upi_manual')}
                          className="h-10 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>UPI</span>
                        </button>
                        <button
                          disabled={settlingAction}
                          onClick={() => handleSettle('card_pos')}
                          className="h-10 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Card POS</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                      <p className="text-xs font-bold text-emerald-400">Table Bill Fully Settled!</p>
                    </div>
                  )}

                  {/* Clear / Vacate Table button */}
                  <button
                    disabled={settlingAction}
                    onClick={handleClearTable}
                    className="w-full h-11 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <span>Clear & Vacate Table</span>
                  </button>
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-neutral-500">Failed to load session details</div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

function OrderCard({
  order,
  renderBadge,
  onAction,
  actionLabel,
  actionColor,
}: {
  order: LiveOrder;
  renderBadge: () => React.ReactNode;
  onAction?: () => void;
  actionLabel?: string;
  actionColor?: string;
}) {
  return (
    <div className="bg-[#181b26] border border-white/10 rounded-xl p-3.5 space-y-3 hover:border-white/20 transition-all shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-white">{order.orderNumber}</span>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
            {order.table}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-neutral-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{order.elapsedMinutes}m ago</span>
        </span>
      </div>

      <div className="flex items-center justify-between">
        {renderBadge()}
        <span className="text-xs font-black text-white">₹{order.total.toFixed(2)}</span>
      </div>

      <div className="space-y-1 pt-1 border-t border-white/5">
        {order.items.slice(0, 3).map((item, idx) => (
          <div key={idx} className="text-xs text-neutral-300 flex items-center justify-between">
            <span className="truncate">
              <span className="font-black text-amber-400 mr-1">{item.qty || item.quantity || 1}x</span>
              {item.name}
            </span>
          </div>
        ))}
        {order.items.length > 3 && (
          <p className="text-[10px] text-neutral-500 font-medium">
            +{order.items.length - 3} more items
          </p>
        )}
      </div>

      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className={`w-full h-9 rounded-lg text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer ${actionColor}`}
        >
          <span>{actionLabel}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
