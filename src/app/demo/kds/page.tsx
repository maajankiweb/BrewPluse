'use client';

import React, { useState } from 'react';
import {
  Soup,
  Clock,
  CheckCircle2,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Check,
  Coffee,
} from 'lucide-react';
import { useDemo } from '../demoContext';

export default function DemoKdsPage() {
  const { orders, updateOrderStatus } = useDemo();
  const [stationFilter, setStationFilter] = useState<'all' | 'barista' | 'kitchen'>('all');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({});

  const activeTickets = orders.filter(
    (o) => o.status === 'preparing' || o.status === 'ready'
  );

  const toggleItemDone = (key: string) => {
    setCompletedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* KDS Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <Soup className="w-6 h-6 text-emerald-500" />
            <span>Kitchen Display System (KDS)</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Real-time prep station monitor with item bumping and kitchen timer.
          </p>
        </div>

        {/* Station Filters & Controls */}
        <div className="flex items-center gap-3">
          <div className="flex p-1 bg-neutral-100 dark:bg-zinc-800 rounded-xl text-xs font-bold">
            {(['all', 'barista', 'kitchen'] as const).map((station) => (
              <button
                key={station}
                onClick={() => setStationFilter(station)}
                className={`px-3 py-1.5 rounded-lg uppercase tracking-wider transition-all ${
                  stationFilter === station
                    ? 'bg-white dark:bg-[#121214] text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-900'
                }`}
              >
                {station}
              </button>
            ))}
          </div>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#121214] text-zinc-600 dark:text-zinc-300 hover:bg-neutral-50"
            title={soundEnabled ? 'Mute Kitchen Chimes' : 'Unmute Kitchen Chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-zinc-400" />}
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#121214] text-zinc-600 dark:text-zinc-300 hover:bg-neutral-50"
            title="Toggle Kitchen Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Live Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {activeTickets.length === 0 ? (
          <div className="col-span-full py-24 text-center space-y-3 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="text-base font-bold text-[#141210] dark:text-white">All Clear, Chef!</h3>
            <p className="text-xs text-zinc-400">No pending orders in the kitchen queue right now.</p>
          </div>
        ) : (
          activeTickets.map((ticket, idx) => (
            <div
              key={ticket.id}
              className={`bg-white dark:bg-[#121214] border-2 rounded-2xl p-5 flex flex-col justify-between shadow-xs transition-all ${
                ticket.status === 'ready'
                  ? 'border-blue-500 bg-blue-50/20 dark:bg-blue-950/10'
                  : idx === 0
                  ? 'border-amber-500'
                  : 'border-[#ebe8e3] dark:border-[#222225]'
              }`}
            >
              {/* Ticket Top bar */}
              <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3] dark:border-[#222225]">
                <div>
                  <span className="font-mono font-black text-lg text-[#141210] dark:text-white">
                    #{ticket.orderNumber}
                  </span>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    {ticket.table}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 text-xs font-mono font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{ticket.createdAt}</span>
                </div>
              </div>

              {/* Items with checkable prep state */}
              <div className="py-4 space-y-2.5 flex-1">
                {ticket.items.map((ci, itemIdx) => {
                  const itemKey = `${ticket.id}-${itemIdx}`;
                  const isDone = !!completedItems[itemKey];

                  return (
                    <div
                      key={itemIdx}
                      onClick={() => toggleItemDone(itemKey)}
                      className={`flex items-start gap-2.5 p-2 rounded-xl cursor-pointer select-none transition-colors ${
                        isDone
                          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 text-zinc-400 line-through'
                          : 'hover:bg-neutral-100 dark:hover:bg-zinc-800 text-[#141210] dark:text-white'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border mt-0.5 ${
                          isDone
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-zinc-300 dark:border-zinc-600'
                        }`}
                      >
                        {isDone && <Check className="w-3.5 h-3.5" />}
                      </div>

                      <div className="flex-1 text-xs">
                        <span className="font-mono font-black mr-1.5 text-amber-600 dark:text-amber-400">
                          {ci.quantity}x
                        </span>
                        <span className="font-bold">{ci.item.name}</span>
                        {ci.item.category && (
                          <span className="text-[10px] text-zinc-400 block font-normal">
                            {ci.item.category}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bump Ticket button */}
              <div className="pt-3 border-t border-[#ebe8e3] dark:border-[#222225]">
                {ticket.status === 'preparing' ? (
                  <button
                    onClick={() => updateOrderStatus(ticket.id, 'ready')}
                    className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <Check className="w-4 h-4" />
                    <span>Bump Ticket (Ready)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => updateOrderStatus(ticket.id, 'completed')}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Fulfilled &amp; Clear</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
