'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Receipt,
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  Filter,
  FileSpreadsheet,
  FileCode,
  Printer,
  ChevronLeft,
  ChevronRight,
  Plus,
  RefreshCw,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
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
  status: string;
  paymentMode: string;
  paymentStatus: string;
  customerName?: string;
  customerPhone?: string;
  createdAt: string;
}

export default function BillingPage() {
  const routeParams = useParams();
  const router = useRouter();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAllBills, setShowAllBills] = useState(false);
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    const today = new Date();
    setCurrentDateStr(
      `Today · ${today.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`
    );

    const loadOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders?storeId=${storeSlug}&limit=100`);
        const data = await res.json();
        let list: OrderRecord[] = data.orders || [];

        try {
          const local = JSON.parse(localStorage.getItem('brewpluse::orders') || '[]');
          if (Array.isArray(local) && local.length > 0) {
            const map = new Map<string, OrderRecord>();
            list.forEach((o) => map.set(o.orderNumber, o));
            local.forEach((o: OrderRecord) => {
              if (!map.has(o.orderNumber)) map.set(o.orderNumber, o);
            });
            list = Array.from(map.values());
          }
        } catch (e) {}

        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(list);
      } catch (e) {
        console.error('Failed to load billing ledger:', e);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [storeSlug]);

  const metrics = useMemo(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    let todayOrdersCount = 0;
    let todaySales = 0;
    let totalSales = 0;
    let platformFee = 0;

    orders.forEach((o) => {
      const orderDate = new Date(o.createdAt);
      const val = Number(o.total) || 0;
      totalSales += val;
      platformFee += 1; // ₹1/order

      if (orderDate >= todayStart) {
        todayOrdersCount++;
        todaySales += val;
      }
    });

    return {
      todayOrdersCount,
      todaySales,
      totalSales,
      platformFee,
    };
  }, [orders]);

  const exportGstCsv = (filterType: 'all' | 'today' | 'month' = 'all') => {
    if (orders.length === 0) return;

    let targetOrders = orders;
    const now = new Date();
    if (filterType === 'today') {
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      targetOrders = orders.filter((o) => new Date(o.createdAt) >= startOfDay);
    } else if (filterType === 'month') {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      targetOrders = orders.filter((o) => new Date(o.createdAt) >= startOfMonth);
    }

    if (targetOrders.length === 0) {
      targetOrders = orders;
    }

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
    ];

    const rows = targetOrders.map((o) => {
      const d = new Date(o.createdAt);
      const itemsSummary = (o.items || []).map((i) => `${i.qty}x ${i.name}`).join('; ');
      const subtotal = Number(o.subtotal) || Number(o.total) || 0;
      const discount = Number(o.discount) || 0;
      const taxable = Math.max(0, subtotal - discount);
      const tax = Number(o.tax) || (taxable * 0.05);
      const cgst = (tax / 2).toFixed(2);
      const sgst = (tax / 2).toFixed(2);
      const grandTotal = Number(o.total) || (taxable + tax);

      return [
        `"${o.orderNumber}"`,
        `"${d.toLocaleDateString('en-IN')}"`,
        `"${d.toLocaleTimeString('en-IN')}"`,
        `"${o.table || o.orderType || 'Dine-In'}"`,
        `"${(o.customerName || 'Walk-in Customer').replace(/"/g, '""')}"`,
        `"${o.customerPhone || ''}"`,
        `"${itemsSummary.replace(/"/g, '""')}"`,
        subtotal.toFixed(2),
        discount.toFixed(2),
        taxable.toFixed(2),
        cgst,
        sgst,
        (Number(cgst) + Number(sgst)).toFixed(2),
        grandTotal.toFixed(2),
        `"${o.paymentMode || 'Cash'}"`,
        `"${o.paymentStatus || 'paid'}"`,
      ].join(',');
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `BrewPluse_GST_Bills_Ledger_${storeSlug}_${filterType}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(orders, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `BrewPluse_Bills_Ledger_${storeSlug}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#12201B] dark:text-white tracking-tight">
              Bills &amp; Tax Ledger
            </h1>
            <p className="text-xs sm:text-sm text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Review transactions, CGST/SGST tax audit breakdown, and revenue exports.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => exportGstCsv('all')}
              className="px-3 py-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>GST CSV</span>
            </button>
            <button
              type="button"
              onClick={exportJson}
              className="px-3 py-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>JSON</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Ledger</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">TODAY&apos;S ORDERS</p>
              <p className="text-2xl font-bold text-[#12201B] dark:text-white mt-1">{metrics.todayOrdersCount}</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Paid &amp; completed orders</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8D9792]">TODAY&apos;S CAFE SALES</p>
              <p className="text-2xl font-bold text-[#0B8F68] dark:text-[#10B981] mt-1">₹{metrics.todaySales.toLocaleString()}</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Gross today&apos;s revenue</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] dark:text-[#F59E0B]">BREWPLUSE COLLECTED</p>
              <p className="text-2xl font-bold text-[#D97706] dark:text-[#F59E0B] mt-1">₹{metrics.platformFee.toLocaleString()}</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">₹1 per order fee accrued</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Receipt className="w-4 h-4" />
            </div>
          </div>

          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-4 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#0B5C45] dark:text-[#10B981]">TOTAL STORE SALES</p>
              <p className="text-2xl font-bold text-[#0B5C45] dark:text-[#10B981] mt-1">₹{metrics.totalSales.toLocaleString()}</p>
              <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-1 font-medium">Cumulative billed gross</p>
            </div>
            <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Filter Navigation Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white shadow-2xs">
              <Calendar className="w-3.5 h-3.5 text-[#0B5C45]" />
              <span>{currentDateStr}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowAllBills(!showAllBills)}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors cursor-pointer shadow-2xs"
            >
              {showAllBills ? 'Show Today Only' : 'Show All Bills'}
            </button>

            <button
              type="button"
              onClick={() => exportGstCsv('today')}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white hover:bg-[#F8FAF8] dark:hover:bg-[#132A20] transition-colors cursor-pointer shadow-2xs flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>Today&apos;s GST CSV</span>
            </button>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => exportGstCsv('month')}
              className="px-3.5 py-1.5 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
              <span>Monthly GST CSV Export</span>
            </button>
          </div>
        </div>

        {/* Bills Ledger Table */}
        {orders.length === 0 ? (
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-16 sm:p-20 text-center space-y-4 shadow-2xs">
            <div className="w-14 h-14 rounded-2xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center mx-auto">
              <Receipt className="w-7 h-7" />
            </div>
            <div>
              <p className="text-base font-bold text-[#12201B] dark:text-white">No bills recorded yet</p>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-sm mx-auto mt-1 leading-relaxed">
                Transactions generated at the POS counter or table QR will appear here in the audit ledger.
              </p>
            </div>
            <button
              type="button"
              onClick={() => router.push(`/dashboard/${storeSlug}/pos`)}
              className="px-4 py-2 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-2xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create First Bill</span>
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F8FAF8] dark:bg-[#11241C] border-b border-[#E5ECE8] dark:border-[#1E382E] text-[10px] font-bold uppercase tracking-wider text-[#65736D] dark:text-[#9AB2A8]">
                  <tr>
                    <th className="py-3 px-4">Invoice / Bill #</th>
                    <th className="py-3 px-4">Timestamp</th>
                    <th className="py-3 px-4">Customer &amp; Table</th>
                    <th className="py-3 px-4">Taxable Base</th>
                    <th className="py-3 px-4">GST (2.5%+2.5%)</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5ECE8] dark:divide-[#1E382E]">
                  {orders.slice(0, showAllBills ? undefined : 20).map((order) => {
                    const subtotal = Number(order.subtotal) || Number(order.total) || 0;
                    const discount = Number(order.discount) || 0;
                    const taxable = Math.max(0, subtotal - discount);
                    const tax = Number(order.tax) || (taxable * 0.05);

                    return (
                      <tr key={order.orderNumber} className="hover:bg-neutral-50 dark:hover:bg-[#132A20] transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[#12201B] dark:text-white">
                          #{order.orderNumber}
                        </td>
                        <td className="py-3 px-4 text-neutral-500 font-mono text-[11px]">
                          {new Date(order.createdAt).toLocaleDateString('en-IN')}{' '}
                          {new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="py-3 px-4">
                          <p className="font-semibold text-neutral-900 dark:text-white truncate max-w-[150px]">
                            {order.customerName || 'Dining Guest'}
                          </p>
                          <p className="text-[10px] text-neutral-400 font-mono">
                            {order.table} • {order.customerPhone || 'Walk-in'}
                          </p>
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-700 dark:text-neutral-300">
                          ₹{taxable.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 font-mono text-neutral-500 text-[11px]">
                          CGST: ₹{(tax / 2).toFixed(2)} | SGST: ₹{(tax / 2).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                          ₹{Number(order.total).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            {order.paymentMode || 'Paid'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => router.push(`/dashboard/${storeSlug}/orders`)}
                            className="p-1.5 rounded-lg text-neutral-500 hover:text-emerald-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                            title="View Full Invoice"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
