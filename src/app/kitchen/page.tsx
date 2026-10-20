'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ChefHat,
  Clock,
  CheckCircle2,
  Volume2,
  VolumeX,
  RotateCcw,
  Flame,
  Utensils,
  RefreshCw,
  Search,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface KitchenItem {
  id: string;
  name: string;
  qty: number;
  variant?: string;
  addons?: string[];
  note?: string;
  done?: boolean;
}

interface KitchenTicket {
  id: string;
  orderNumber: string;
  table: string;
  status: 'placed' | 'accepted' | 'preparing' | 'ready' | 'served';
  notes?: string;
  customerName?: string;
  items: KitchenItem[];
  createdAt: string;
  elapsedMinutes: number;
}

export default function StandaloneKitchenPage() {
  const [tickets, setTickets] = useState<KitchenTicket[]>([]);
  const [filter, setFilter] = useState<'all' | 'placed' | 'preparing' | 'ready'>('all');
  const [audioActive, setAudioActive] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [lastBumpedTicket, setLastBumpedTicket] = useState<{ id: string; prevStatus: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const lastTicketCountRef = useRef<number>(0);

  // Synthesized Kitchen Chime using Web Audio API (works offline, zero audio asset downloads)
  const playKitchenChime = () => {
    if (!audioActive || typeof window === 'undefined') return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      // Tone 1: High crisp alert (C6 - 1046 Hz)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1046.5, ctx.currentTime);
      gain1.gain.setValueAtTime(0.3, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.4);

      // Tone 2: Harmonic resolution (G5 - 784 Hz)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(783.99, ctx.currentTime + 0.15);
      gain2.gain.setValueAtTime(0.35, ctx.currentTime + 0.15);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(ctx.currentTime + 0.15);
      osc2.stop(ctx.currentTime + 0.7);
    } catch (e) {
      console.warn('[KDS Audio Chime]:', e);
    }
  };

  const fetchTickets = async (showSpin = false) => {
    if (showSpin) setIsSyncing(true);
    try {
      const res = await fetch('/api/kitchen/orders');
      if (res.ok) {
        const data = await res.json();
        const incoming: KitchenTicket[] = data.tickets || [];

        // Check if new incoming ticket arrived
        const placedCount = incoming.filter((t) => t.status === 'placed').length;
        if (lastTicketCountRef.current > 0 && placedCount > lastTicketCountRef.current) {
          playKitchenChime();
        }
        lastTicketCountRef.current = placedCount;

        setTickets(incoming);
      }
    } catch (err) {
      console.error('[KDS fetch error]:', err);
    } finally {
      if (showSpin) setTimeout(() => setIsSyncing(false), 400);
    }
  };

  // Poll tickets every 4 seconds
  useEffect(() => {
    fetchTickets(false);
    const interval = setInterval(() => {
      fetchTickets(false);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Update ticket status
  const updateStatus = async (ticketId: string, currentStatus: string, nextStatus: string) => {
    // Record for recall
    setLastBumpedTicket({ id: ticketId, prevStatus: currentStatus });

    // Optimistic UI update
    setTickets((prev) =>
      prev
        .map((t) => (t.id === ticketId ? { ...t, status: nextStatus as any } : t))
        .filter((t) => (nextStatus === 'served' ? false : true))
    );

    try {
      await fetch(`/api/admin/orders/${ticketId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
    } catch (err) {
      console.error('[KDS status update error]:', err);
      fetchTickets(false);
    }
  };

  // Recall last bumped ticket
  const handleRecall = async () => {
    if (!lastBumpedTicket) return;
    const { id, prevStatus } = lastBumpedTicket;
    setLastBumpedTicket(null);

    try {
      await fetch(`/api/admin/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: prevStatus }),
      });
      fetchTickets(true);
    } catch (err) {
      console.error('[KDS recall error]:', err);
    }
  };

  const toggleItemDone = (ticketId: string, idx: number) => {
    const key = `${ticketId}-${idx}`;
    setCheckedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredTickets = tickets.filter((t) => {
    if (filter === 'placed' && t.status !== 'placed') return false;
    if (filter === 'preparing' && t.status !== 'preparing' && t.status !== 'accepted') return false;
    if (filter === 'ready' && t.status !== 'ready') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchOrder = t.orderNumber.toLowerCase().includes(q);
      const matchTable = t.table.toLowerCase().includes(q);
      const matchItem = t.items.some((i) => i.name.toLowerCase().includes(q));
      if (!matchOrder && !matchTable && !matchItem) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#0b0c10] text-white flex flex-col font-sans select-none">
      {/* KDS Header Bar */}
      <header className="h-16 bg-[#12141c] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
            <ChefHat className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight text-white uppercase">Kitchen Display (KDS)</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                LIVE
              </span>
            </div>
            <p className="text-xs text-neutral-400 font-medium">Oldest-first preparation tickets</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="hidden md:flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'all'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Active ({tickets.length})
          </button>
          <button
            onClick={() => setFilter('placed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'placed'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            New ({tickets.filter((t) => t.status === 'placed').length})
          </button>
          <button
            onClick={() => setFilter('preparing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'preparing'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Cooking ({tickets.filter((t) => t.status === 'preparing' || t.status === 'accepted').length})
          </button>
          <button
            onClick={() => setFilter('ready')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filter === 'ready'
                ? 'bg-amber-500 text-black shadow-md'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Ready ({tickets.filter((t) => t.status === 'ready').length})
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {lastBumpedTicket && (
            <button
              onClick={handleRecall}
              className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recall Last</span>
            </button>
          )}

          <button
            onClick={() => setAudioActive(!audioActive)}
            className={`p-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              audioActive
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-white/5 border-white/10 text-neutral-400'
            }`}
            title={audioActive ? 'Audio chime enabled' : 'Audio chime muted'}
          >
            {audioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            onClick={() => fetchTickets(true)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
            title="Refresh tickets"
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin text-amber-400' : ''}`} />
          </button>
        </div>
      </header>

      {/* Ticket Grid */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        {filteredTickets.length === 0 ? (
          <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 text-neutral-500 flex items-center justify-center mb-4">
              <Utensils className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Kitchen Queue is Clear!</h2>
            <p className="text-sm text-neutral-400 max-w-sm">
              All guest table orders have been prepared and served. New QR orders will appear here instantly with an audio chime.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTickets.map((ticket) => {
              // Color-coded ticket age per spec §8:
              // < 5 min: Green
              // 5-10 min: Amber
              // > 10 min: Red
              const age = ticket.elapsedMinutes;
              let ageColor = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
              let cardBorder = 'border-white/15';

              if (age >= 10) {
                ageColor = 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse';
                cardBorder = 'border-rose-500/50 shadow-rose-950/30 shadow-lg';
              } else if (age >= 5) {
                ageColor = 'bg-amber-500/20 text-amber-400 border-amber-500/40';
                cardBorder = 'border-amber-500/40';
              }

              return (
                <div
                  key={ticket.id}
                  className={`bg-[#141620] rounded-2xl border ${cardBorder} flex flex-col overflow-hidden transition-all shadow-xl`}
                >
                  {/* Ticket Header */}
                  <div className="p-3.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-white tracking-wide">
                          {ticket.orderNumber}
                        </span>
                        <span className="text-sm font-extrabold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20">
                          {ticket.table}
                        </span>
                      </div>
                      {ticket.customerName && (
                        <p className="text-[11px] text-neutral-400 font-medium truncate mt-0.5">
                          {ticket.customerName}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-black border ${ageColor}`}>
                        <Clock className="w-3 h-3" />
                        <span>{ticket.elapsedMinutes}m</span>
                      </span>
                    </div>
                  </div>

                  {/* Special Cooking Notes (Bold per spec) */}
                  {ticket.notes && (
                    <div className="px-3.5 py-2 bg-amber-500/10 border-b border-amber-500/20">
                      <p className="text-xs font-black text-amber-300">
                        NOTE: {ticket.notes}
                      </p>
                    </div>
                  )}

                  {/* Item List */}
                  <div className="p-3.5 space-y-2.5 flex-1 overflow-y-auto">
                    {ticket.items.map((item, idx) => {
                      const itemKey = `${ticket.id}-${idx}`;
                      const isDone = !!checkedItems[itemKey];

                      return (
                        <div
                          key={idx}
                          onClick={() => toggleItemDone(ticket.id, idx)}
                          className={`p-2 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                            isDone
                              ? 'bg-black/20 border-white/5 opacity-50'
                              : 'bg-white/5 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isDone
                                ? 'bg-emerald-500 border-emerald-500 text-black'
                                : 'border-white/20 bg-black/40 text-transparent'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-1">
                              <span
                                className={`text-sm font-bold tracking-tight ${
                                  isDone ? 'line-through text-neutral-500' : 'text-white'
                                }`}
                              >
                                <span className="text-amber-400 font-black mr-1.5">{item.qty}x</span>
                                {item.name}
                              </span>
                            </div>

                            {item.variant && (
                              <p className="text-[11px] font-semibold text-neutral-400">
                                Size: {item.variant}
                              </p>
                            )}

                            {item.addons && item.addons.length > 0 && (
                              <p className="text-[11px] font-semibold text-amber-300/80">
                                + {item.addons.join(', ')}
                              </p>
                            )}

                            {item.note && (
                              <p className="text-[11px] font-black text-yellow-300 italic">
                                &quot;{item.note}&quot;
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Kitchen Action Button */}
                  <div className="p-3 bg-black/40 border-t border-white/10">
                    {ticket.status === 'placed' && (
                      <button
                        onClick={() => updateStatus(ticket.id, ticket.status, 'accepted')}
                        className="w-full h-11 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
                      >
                        <span>Accept Ticket</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {ticket.status === 'accepted' && (
                      <button
                        onClick={() => updateStatus(ticket.id, ticket.status, 'preparing')}
                        className="w-full h-11 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
                      >
                        <Flame className="w-4 h-4" />
                        <span>Start Cooking</span>
                      </button>
                    )}

                    {ticket.status === 'preparing' && (
                      <button
                        onClick={() => updateStatus(ticket.id, ticket.status, 'ready')}
                        className="w-full h-11 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Mark Ready</span>
                      </button>
                    )}

                    {ticket.status === 'ready' && (
                      <button
                        onClick={() => updateStatus(ticket.id, ticket.status, 'served')}
                        className="w-full h-11 rounded-xl bg-neutral-200 hover:bg-white active:scale-95 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
                      >
                        <span>Bump to Served</span>
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
