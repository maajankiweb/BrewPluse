'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ListOrdered,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  XCircle,
  Plus,
  Coffee,
  Check,
} from 'lucide-react';
import { useDemo, Order } from '../demoContext';

export default function DemoOrdersPage() {
  const { orders, updateOrderStatus } = useDemo();
  const [activeFilter, setActiveFilter] = useState<'all' | Order['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<Order | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((i) => i.item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const getStatusCount = (status: 'all' | Order['status']) => {
    if (status === 'all') return orders.length;
    return orders.filter((o) => o.status === status).length;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Top Header & New Order button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <ListOrdered className="w-6 h-6 text-amber-500" />
            <span>Orders Management</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Real-time dine-in, takeaway, and digital QR table orders tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/demo/kds"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-[#121214] text-xs font-bold hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors"
          >
            <span>Kitchen Display Mode</span>
          </Link>
          <Link
            href="/demo/pos"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Order</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex gap-1.5 p-1 bg-neutral-100 dark:bg-zinc-800/60 rounded-xl overflow-x-auto no-scrollbar">
          {(['all', 'preparing', 'ready', 'completed', 'cancelled'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                activeFilter === tab
                  ? 'bg-white dark:bg-[#121214] text-[#141210] dark:text-white shadow-xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {tab} ({getStatusCount(tab)})
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order #, table, item..."
            className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-xl text-xs text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none focus:border-amber-500 font-medium"
          />
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredOrders.length === 0 ? (
          <div className="col-span-full py-16 text-center space-y-2 bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl">
            <Coffee className="w-8 h-8 text-zinc-400 mx-auto" />
            <p className="text-sm font-bold text-zinc-600 dark:text-zinc-300">
              No orders found matching the filter
            </p>
            <p className="text-xs text-zinc-400">
              Tap &quot;New Order&quot; to post a ticket from the POS register.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs hover:border-amber-400 transition-all space-y-4"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between pb-3 border-b border-[#ebe8e3]/70 dark:border-[#222225]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-[#141210] dark:text-white">
                      #{order.orderNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-zinc-800 text-[10px] font-bold text-[#141210] dark:text-zinc-300">
                      {order.table}
                    </span>
                  </div>
                  <p className="text-[10px] text-zinc-400 flex items-center gap-1 mt-1 font-mono">
                    <Clock className="w-3 h-3" />
                    <span>{order.createdAt}</span>
                    <span>&bull;</span>
                    <span>{order.paymentMode}</span>
                  </p>
                </div>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    order.status === 'preparing'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-300 dark:border-amber-800'
                      : order.status === 'ready'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-300 dark:border-blue-800'
                      : order.status === 'completed'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-400'
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-1.5 flex-1 text-xs">
                {order.items.map((ci) => (
                  <div key={ci.item.id} className="flex justify-between items-center text-zinc-600 dark:text-zinc-300">
                    <span className="font-medium truncate max-w-[200px]">
                      {ci.quantity}x {ci.item.name}
                    </span>
                    <span className="font-mono text-zinc-400 text-[11px]">
                      ₹{(ci.item.price * ci.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                {order.customerName && (
                  <div className="pt-2 text-[11px] text-zinc-400 border-t border-dashed dark:border-zinc-800">
                    Guest: <strong>{order.customerName}</strong>
                    {order.customerPhone && ` (${order.customerPhone})`}
                  </div>
                )}
              </div>

              {/* Order Footer & Status Transition Actions */}
              <div className="pt-3 border-t border-[#ebe8e3]/70 dark:border-[#222225] space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-500 font-semibold">Total Amount:</span>
                  <span className="font-mono font-black text-sm text-[#141210] dark:text-white">
                    ₹{order.total.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {order.status === 'preparing' && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'ready')}
                        className="flex-1 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Mark Ready</span>
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-rose-500"
                        title="Cancel Order"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {order.status === 'ready' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'completed')}
                      className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Settle &amp; Complete</span>
                    </button>
                  )}

                  {order.status === 'completed' && (
                    <div className="flex-1 text-center py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Order Fulfilled</span>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedReceipt(order)}
                    className="p-2 rounded-xl border border-[#ebe8e3] dark:border-zinc-700 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                    title="Print Receipt"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bill Receipt Preview Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 shadow-2xl space-y-4 font-mono text-xs">
            <div className="text-center pb-3 border-b dark:border-zinc-700">
              <h3 className="font-bold text-sm text-[#141210] dark:text-white">
                BrewPluse Flagship Cafe
              </h3>
              <p className="text-[10px] text-zinc-400">Order #{selectedReceipt.orderNumber}</p>
              <p className="text-[10px] text-zinc-400">{selectedReceipt.table} &bull; {selectedReceipt.createdAt}</p>
            </div>

            <div className="space-y-1.5 py-2">
              {selectedReceipt.items.map((ci) => (
                <div key={ci.item.id} className="flex justify-between">
                  <span>{ci.quantity}x {ci.item.name}</span>
                  <span>₹{(ci.item.price * ci.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-2 space-y-1 dark:border-zinc-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{selectedReceipt.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%):</span>
                <span>₹{selectedReceipt.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-sm pt-1 border-t dark:border-zinc-700">
                <span>Grand Total:</span>
                <span className="text-emerald-600">₹{selectedReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => window.print()}
                className="py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-bold text-xs hover:bg-neutral-100 dark:hover:bg-zinc-800"
              >
                Print KOT
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
