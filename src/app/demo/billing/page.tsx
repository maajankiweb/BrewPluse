'use client';

import React, { useState } from 'react';
import {
  Receipt,
  Search,
  Download,
  Printer,
  CircleDollarSign,
  CreditCard,
  Banknote,
  TrendingUp,
  X,
  FileText,
} from 'lucide-react';
import { useDemo, Order } from '../demoContext';

export default function DemoBillingPage() {
  const { orders } = useDemo();
  const [filterMode, setFilterMode] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeInvoice, setActiveInvoice] = useState<Order | null>(null);

  const completedOrders = orders.filter((o) => o.status === 'completed' || o.status === 'ready' || o.status === 'preparing');

  const filtered = completedOrders.filter((o) => {
    const matchesMode = filterMode === 'All' || o.paymentMode === filterMode;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.table.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMode && matchesSearch;
  });

  const totalRevenue = completedOrders.reduce((sum, o) => sum + o.total, 0);
  const upiTotal = completedOrders
    .filter((o) => o.paymentMode === 'UPI')
    .reduce((sum, o) => sum + o.total, 0);
  const cashTotal = completedOrders
    .filter((o) => o.paymentMode === 'Cash')
    .reduce((sum, o) => sum + o.total, 0);
  const cardTotal = completedOrders
    .filter((o) => o.paymentMode === 'Card')
    .reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <Receipt className="w-6 h-6 text-amber-500" />
            <span>Billing &amp; Revenue Center</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Real-time tax invoices, settlement audit, and GST records.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 dark:border-zinc-700 bg-white dark:bg-[#121214] text-xs font-bold hover:bg-neutral-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <Download className="w-4 h-4 text-zinc-500" />
          <span>Export GST Report (Excel/CSV)</span>
        </button>
      </div>

      {/* Top 4 Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500">Gross Sales</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#141210] dark:text-white">
              ₹{totalRevenue.toLocaleString()}
            </p>
            <p className="text-[11px] text-emerald-600 flex items-center gap-1 font-semibold mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>100% Tax Compliant</span>
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500">UPI Payments</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#141210] dark:text-white">
              ₹{upiTotal.toLocaleString()}
            </p>
            <p className="text-[11px] text-zinc-400 font-mono mt-1">
              {Math.round((upiTotal / (totalRevenue || 1)) * 100)}% of total volume
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500">Cash Drawer</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#141210] dark:text-white">
              ₹{cashTotal.toLocaleString()}
            </p>
            <p className="text-[11px] text-zinc-400 font-mono mt-1">Manual till count</p>
          </div>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-zinc-500">Cards &amp; POS Machine</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-[#141210] dark:text-white">
              ₹{cardTotal.toLocaleString()}
            </p>
            <p className="text-[11px] text-zinc-400 font-mono mt-1">EDC Swipe settlement</p>
          </div>
        </div>
      </div>

      {/* Filter and Invoices Table */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="flex gap-2">
            {['All', 'UPI', 'Cash', 'Card'].map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterMode === mode
                    ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900'
                    : 'bg-neutral-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invoice # or table..."
              className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 dark:bg-zinc-800/60 border border-transparent focus:border-amber-500 rounded-xl text-xs text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#ebe8e3] dark:border-[#222225] text-zinc-400 uppercase font-mono tracking-wider">
                <th className="py-3 px-3">Invoice #</th>
                <th className="py-3 px-3">Date &amp; Time</th>
                <th className="py-3 px-3">Table / Channel</th>
                <th className="py-3 px-3">Payment</th>
                <th className="py-3 px-3">Subtotal</th>
                <th className="py-3 px-3">GST (5%)</th>
                <th className="py-3 px-3">Grand Total</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebe8e3]/60 dark:divide-[#222225]">
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-neutral-50/80 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="py-3.5 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                    INV-{order.orderNumber.replace('BP-', '2026-')}
                  </td>
                  <td className="py-3.5 px-3 text-zinc-500">{order.createdAt}</td>
                  <td className="py-3.5 px-3 font-semibold text-[#141210] dark:text-white">
                    {order.table}
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-neutral-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {order.paymentMode}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-zinc-500">₹{order.subtotal.toFixed(2)}</td>
                  <td className="py-3.5 px-3 font-mono text-zinc-500">₹{order.tax.toFixed(2)}</td>
                  <td className="py-3.5 px-3 font-mono font-bold text-[#141210] dark:text-white">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => setActiveInvoice(order)}
                      className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 inline-flex items-center gap-1 font-semibold text-[11px]"
                    >
                      <FileText className="w-3 h-3" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b dark:border-zinc-700">
              <div>
                <h3 className="font-extrabold text-base text-[#141210] dark:text-white">
                  Tax Invoice
                </h3>
                <p className="text-xs font-mono text-amber-600">
                  INV-{activeInvoice.orderNumber.replace('BP-', '2026-')}
                </p>
              </div>
              <button
                onClick={() => setActiveInvoice(null)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-1 text-zinc-500 border-b pb-3 dark:border-zinc-700">
              <p><strong>Merchant:</strong> BrewPluse Flagship Cafe</p>
              <p><strong>GSTIN:</strong> 27AABCB1234F1Z0 | <strong>FSSAI:</strong> 11523034000129</p>
              <p><strong>Reference:</strong> {activeInvoice.table} &bull; Date: {activeInvoice.createdAt}</p>
            </div>

            <div className="space-y-2 py-2 text-xs font-mono">
              <div className="flex justify-between font-bold text-zinc-400 border-b pb-1 dark:border-zinc-700">
                <span>Item</span>
                <span>Qty</span>
                <span>Amount</span>
              </div>
              {activeInvoice.items.map((ci) => (
                <div key={ci.item.id} className="flex justify-between">
                  <span className="truncate max-w-[200px]">{ci.item.name}</span>
                  <span>{ci.quantity}</span>
                  <span>₹{(ci.item.price * ci.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 space-y-1.5 text-xs font-mono dark:border-zinc-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{activeInvoice.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>CGST (2.5%):</span>
                <span>₹{(activeInvoice.tax / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>SGST (2.5%):</span>
                <span>₹{(activeInvoice.tax / 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-sm pt-2 border-t text-[#141210] dark:text-white dark:border-zinc-700">
                <span>Grand Total:</span>
                <span className="text-emerald-600">₹{activeInvoice.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-3 pt-3">
              <button
                onClick={() => window.print()}
                className="flex-1 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-bold text-xs hover:bg-neutral-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={() => setActiveInvoice(null)}
                className="flex-1 py-2.5 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
