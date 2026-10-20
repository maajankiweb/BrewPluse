'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ShoppingBag,
  Clock,
  Utensils,
  CheckCircle2,
  Calendar,
  Filter,
  Download,
  ChevronDown,
  Search,
  Printer,
  Share2,
  Eye,
  X,
  CreditCard,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { thermalPrinter } from '@/lib/thermalPrinter';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  notes?: string;
}

interface OrderRecord {
  storeId: string;
  orderNumber: string;
  table: string;
  orderType: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  paymentMode: string;
  paymentStatus: 'paid' | 'pending';
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  createdAt: string;
}

export default function OrdersPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);

  const [storeName, setStoreName] = useState(
    storeSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  );

  // Fetch orders
  const fetchOrders = async (showSpin = false) => {
    if (showSpin) setIsSyncing(true);
    try {
      const res = await fetch(`/api/orders?storeId=${storeSlug}&limit=100`);
      const data = await res.json();
      let fetched: OrderRecord[] = data.orders || [];

      // Merge local storage orders
      try {
        const local = JSON.parse(localStorage.getItem('brewpluse::orders') || '[]');
        if (Array.isArray(local) && local.length > 0) {
          const map = new Map<string, OrderRecord>();
          fetched.forEach((o) => map.set(o.orderNumber, o));
          local.forEach((o: OrderRecord) => {
            if (!map.has(o.orderNumber)) map.set(o.orderNumber, o);
          });
          fetched = Array.from(map.values());
        }
      } catch (e) {}

      fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setOrders(fetched);
    } catch (e) {
      console.error('Failed to fetch orders:', e);
    } finally {
      if (showSpin) setTimeout(() => setIsSyncing(false), 500);
    }
  };

  useEffect(() => {
    try {
      const profileRaw = localStorage.getItem('brewpluse::store_profile');
      if (profileRaw) {
        const p = JSON.parse(profileRaw);
        if (p.name) setStoreName(p.name);
      }
    } catch (e) {}

    fetchOrders(false);
    const interval = setInterval(() => fetchOrders(false), 5000);
    return () => clearInterval(interval);
  }, [storeSlug]);

  // Update order status
  const handleUpdateStatus = async (orderNumber: string, status?: string, paymentStatus?: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderNumber === orderNumber) {
          return {
            ...o,
            status: (status as any) || o.status,
            paymentStatus: (paymentStatus as any) || o.paymentStatus,
          };
        }
        return o;
      })
    );

    if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
      setSelectedOrder((prev) =>
        prev
          ? {
              ...prev,
              status: (status as any) || prev.status,
              paymentStatus: (paymentStatus as any) || prev.paymentStatus,
            }
          : null
      );
    }

    try {
      await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, status, paymentStatus }),
      });
    } catch (e) {
      console.error('Update status failed:', e);
    }
  };

  // Summary Metrics
  const metrics = useMemo(() => {
    let totalSales = 0;
    let pending = 0;
    let kitchen = 0;
    let ready = 0;
    let completed = 0;
    let cancelled = 0;

    orders.forEach((o) => {
      totalSales += Number(o.total) || 0;
      if (o.status === 'pending') pending++;
      else if (o.status === 'preparing') kitchen++;
      else if (o.status === 'ready') ready++;
      else if (o.status === 'completed') completed++;
      else if (o.status === 'cancelled') cancelled++;
    });

    return {
      totalOrders: orders.length,
      totalSales,
      pending,
      kitchen,
      ready,
      completed,
      cancelled,
    };
  }, [orders]);

  const tabs = [
    { id: 'all', label: 'All Orders', count: metrics.totalOrders },
    { id: 'pending', label: 'Pending', count: metrics.pending },
    { id: 'preparing', label: 'In Kitchen', count: metrics.kitchen },
    { id: 'ready', label: 'Ready', count: metrics.ready },
    { id: 'completed', label: 'Completed', count: metrics.completed },
    { id: 'cancelled', label: 'Cancelled', count: metrics.cancelled },
  ];

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchTab = activeTab === 'all' || o.status === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        o.orderNumber.toLowerCase().includes(q) ||
        o.table.toLowerCase().includes(q) ||
        (o.customerName && o.customerName.toLowerCase().includes(q)) ||
        (o.customerPhone && o.customerPhone.includes(q));
      return matchTab && matchSearch;
    });
  }, [orders, activeTab, searchQuery]);

  // Printing
  const printReceipt = (order: OrderRecord) => {
    thermalPrinter.printReceipt({
      storeName,
      orderNumber: order.orderNumber,
      tableNumber: order.table,
      orderType: order.orderType,
      timestamp: new Date(order.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      items: order.items,
      subtotal: order.subtotal,
      cgst: order.tax / 2,
      sgst: order.tax / 2,
      total: order.total,
      paymentMode: order.paymentMode,
      paperWidth: '80mm',
    });
  };

  const getWhatsAppShareUrl = (order: OrderRecord) => {
    const cleanPhone = (order.customerPhone || '').replace(/\D/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const itemsText = order.items
      .map((i) => `• ${i.qty}x ${i.name} - ₹${i.price * i.qty}`)
      .join('\n');

    const message = `*☕ ${storeName} - Bill Receipt*\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `*Order:* #${order.orderNumber}\n` +
      `*Table:* ${order.table}\n` +
      `*Date:* ${new Date(order.createdAt).toLocaleDateString()}\n\n` +
      `*Items:*\n${itemsText}\n\n` +
      `*Subtotal:* ₹${order.subtotal}\n` +
      (order.discount ? `*Discount:* -₹${order.discount}\n` : '') +
      `*GST:* ₹${order.tax}\n` +
      `*Total Paid:* ₹${order.total} (${order.paymentMode})\n` +
      `━━━━━━━━━━━━━━━━━━━\n` +
      `Thank you for visiting!`;

    return `https://api.whatsapp.com/send?phone=${phoneWithCountry}&text=${encodeURIComponent(message)}`;
  };

  const handleExportGstCsv = () => {
    if (orders.length === 0) return;
    const headers = [
      'Invoice Number',
      'Date',
      'Time',
      'Table/Type',
      'Customer Name',
      'Customer Phone',
      'Items Summary',
      'Subtotal (INR)',
      'Discount (INR)',
      'Taxable Amount (INR)',
      'CGST 2.5% (INR)',
      'SGST 2.5% (INR)',
      'Total GST 5% (INR)',
      'Grand Total (INR)',
      'Payment Mode',
      'Payment Status',
      'Fulfillment Status',
    ];

    const rows = orders.map((o) => {
      const d = new Date(o.createdAt);
      const dateStr = d.toLocaleDateString('en-IN');
      const timeStr = d.toLocaleTimeString('en-IN');
      const itemsSummary = (o.items || [])
        .map((i) => `${i.qty}x ${i.name.replace(/"/g, '""')}`)
        .join('; ');

      const subtotal = Number(o.subtotal) || Number(o.total) || 0;
      const discount = Number(o.discount) || 0;
      const taxable = Math.max(0, subtotal - discount);
      const tax = Number(o.tax) || (taxable * 0.05);
      const cgst = (tax / 2).toFixed(2);
      const sgst = (tax / 2).toFixed(2);
      const grandTotal = Number(o.total) || (taxable + tax);

      return [
        `"${o.orderNumber}"`,
        `"${dateStr}"`,
        `"${timeStr}"`,
        `"${o.table || o.orderType || 'Dine-In'}"`,
        `"${(o.customerName || 'Walk-in Customer').replace(/"/g, '""')}"`,
        `"${o.customerPhone || ''}"`,
        `"${itemsSummary}"`,
        subtotal.toFixed(2),
        discount.toFixed(2),
        taxable.toFixed(2),
        cgst,
        sgst,
        (Number(cgst) + Number(sgst)).toFixed(2),
        grandTotal.toFixed(2),
        `"${o.paymentMode || 'Cash'}"`,
        `"${o.paymentStatus || 'paid'}"`,
        `"${o.status}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BrewPluse_GST_Bills_Ledger_${storeSlug}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#0E2018] p-3.5 sm:p-4 rounded-2xl border border-[#E5ECE8] dark:border-[#1E382E] shadow-2xs">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#12201B] dark:text-white tracking-tight">
                Order History &amp; Records
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981]">
                {orders.length} Total Records
              </span>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Review invoices, reprint thermal bills, send WhatsApp receipts, and track fulfillment.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportGstCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 transition-colors cursor-pointer shadow-2xs"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export GST CSV</span>
            </button>
            <button
              type="button"
              onClick={() => fetchOrders(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white hover:bg-[#EAEFEA] transition-colors cursor-pointer shadow-2xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#0B5C45]' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">TOTAL REVENUE</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-black text-[#12201B] dark:text-white">
                  ₹{metrics.totalSales.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-amber-600">PENDING QUEUE</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-black text-amber-600">
                  {metrics.pending}
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600">IN KITCHEN</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-black text-purple-600">
                  {metrics.kitchen}
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">COMPLETED</p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl sm:text-2xl font-black text-emerald-600">
                  {metrics.completed}
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Toolbar & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#062F23] text-white shadow-2xs'
                    : 'bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-[#65736D] dark:text-[#9AB2A8] hover:text-[#12201B] dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-black ${
                    activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-black/5 dark:bg-white/10'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8D9792] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search order #, table, customer..."
              className="h-8 pl-8 pr-3 rounded-lg bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs text-[#12201B] dark:text-white placeholder-[#8D9792] focus:outline-none focus:border-[#0B5C45] shadow-2xs w-full sm:w-64"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl overflow-hidden shadow-2xs">
          {filteredOrders.length === 0 ? (
            <div className="p-16 text-center space-y-2">
              <ShoppingBag className="w-8 h-8 text-zinc-300 mx-auto" />
              <p className="text-sm font-bold text-[#12201B] dark:text-white">No orders found</p>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8]">
                Orders placed via POS counter or table QR codes will appear here in real time.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAFBF9] dark:bg-[#11241C] border-b border-[#E5ECE8] dark:border-[#1E382E] text-[10px] uppercase font-bold text-[#65736D] dark:text-[#9AB2A8]">
                  <tr>
                    <th className="py-3 px-4">Order #</th>
                    <th className="py-3 px-4">Date / Time</th>
                    <th className="py-3 px-4">Table / Destination</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items Summary</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5ECE8] dark:divide-[#1E382E]">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.orderNumber}
                      className="hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors"
                    >
                      <td className="py-3.5 px-4 font-black text-[#12201B] dark:text-white">
                        #{order.orderNumber}
                      </td>
                      <td className="py-3.5 px-4 text-[#65736D] dark:text-[#9AB2A8] whitespace-nowrap">
                        {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#12201B] dark:text-white">
                        {order.table}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-[#12201B] dark:text-white">
                          {order.customerName || 'Walk-in'}
                        </p>
                        {order.customerPhone && (
                          <p className="text-[10px] text-[#65736D]">{order.customerPhone}</p>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-[#65736D] dark:text-[#9AB2A8] max-w-xs truncate">
                        {order.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}
                      </td>
                      <td className="py-3.5 px-4 font-black text-sm text-[#12201B] dark:text-white">
                        ₹{order.total}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            order.paymentStatus === 'paid'
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
                              : 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {order.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'} • {order.paymentMode}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                            order.status === 'completed'
                              ? 'bg-[#E8F6EF] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981]'
                              : order.status === 'ready'
                              ? 'bg-emerald-500 text-white'
                              : order.status === 'preparing'
                              ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                              : order.status === 'cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            title="View Details"
                            className="p-1.5 rounded-lg bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] hover:text-[#0B5C45] transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => printReceipt(order)}
                            title="Print Thermal Receipt"
                            className="p-1.5 rounded-lg bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] hover:text-[#0B5C45] transition-colors cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0E2018] rounded-2xl max-w-lg w-full p-6 border border-[#E5ECE8] dark:border-[#1E382E] space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#E5ECE8] dark:border-[#1E382E] pb-3">
              <div>
                <h3 className="text-base font-black text-[#12201B] dark:text-white flex items-center gap-2">
                  Order #{selectedOrder.orderNumber}
                </h3>
                <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                  {selectedOrder.table} • {new Date(selectedOrder.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Status Bar */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-[#F8FAF8] dark:bg-[#11241C] p-3 rounded-xl border border-[#E5ECE8] dark:border-[#1E382E]">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#65736D] block">Customer</span>
                <p className="font-bold text-[#12201B] dark:text-white mt-0.5">
                  {selectedOrder.customerName || 'Walk-in Guest'}
                </p>
                {selectedOrder.customerPhone && (
                  <p className="text-[11px] text-[#65736D]">{selectedOrder.customerPhone}</p>
                )}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-[#65736D] block">Payment</span>
                <p className="font-bold text-[#12201B] dark:text-white mt-0.5">
                  {selectedOrder.paymentMode} ({selectedOrder.paymentStatus.toUpperCase()})
                </p>
              </div>
            </div>

            {/* Items Table */}
            <div className="border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-[#FAFBF9] dark:bg-[#11241C] text-[10px] uppercase font-bold text-[#65736D]">
                  <tr>
                    <th className="py-2 px-3 text-left">Item</th>
                    <th className="py-2 px-3 text-center">Qty</th>
                    <th className="py-2 px-3 text-right">Price</th>
                    <th className="py-2 px-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5ECE8] dark:divide-[#1E382E]">
                  {selectedOrder.items.map((i, idx) => (
                    <tr key={idx}>
                      <td className="py-2 px-3 font-medium">{i.name}</td>
                      <td className="py-2 px-3 text-center font-bold">{i.qty}</td>
                      <td className="py-2 px-3 text-right">₹{i.price}</td>
                      <td className="py-2 px-3 text-right font-bold">₹{i.price * i.qty}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="space-y-1 text-xs pt-1">
              <div className="flex justify-between text-[#65736D]">
                <span>Subtotal:</span>
                <span>₹{selectedOrder.subtotal}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount:</span>
                  <span>-₹{selectedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-[#65736D]">
                <span>GST (5%):</span>
                <span>₹{selectedOrder.tax}</span>
              </div>
              <div className="flex justify-between text-base font-black text-[#12201B] dark:text-white pt-2 border-t">
                <span>Total Amount:</span>
                <span className="text-[#087A5B] dark:text-[#10B981]">₹{selectedOrder.total}</span>
              </div>
            </div>

            {/* Quick Status Modifiers */}
            <div className="flex gap-2 pt-2 border-t border-[#E5ECE8] dark:border-[#1E382E]">
              {selectedOrder.paymentStatus !== 'paid' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedOrder.orderNumber, undefined, 'paid')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold cursor-pointer"
                >
                  Mark Paid
                </button>
              )}
              {selectedOrder.status !== 'completed' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedOrder.orderNumber, 'completed', undefined)}
                  className="px-3 py-1.5 rounded-lg bg-[#062F23] text-white text-xs font-bold cursor-pointer"
                >
                  Mark Completed
                </button>
              )}
              {selectedOrder.status !== 'cancelled' && (
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedOrder.orderNumber, 'cancelled', undefined)}
                  className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-bold cursor-pointer"
                >
                  Cancel Order
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => printReceipt(selectedOrder)}
                className="py-2.5 px-3 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Reprint Receipt</span>
              </button>

              {selectedOrder.customerPhone ? (
                <a
                  href={getWhatsAppShareUrl(selectedOrder)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const phone = prompt('Enter WhatsApp Number:');
                    if (phone) {
                      const updated = { ...selectedOrder, customerPhone: phone };
                      window.open(getWhatsAppShareUrl(updated), '_blank');
                    }
                  }}
                  className="py-2.5 px-3 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-bold text-[#12201B] dark:text-white flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Share WhatsApp</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
