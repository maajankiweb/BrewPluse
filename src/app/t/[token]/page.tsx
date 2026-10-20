'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Coffee,
  QrCode,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Store as StoreIcon,
  UtensilsCrossed,
} from 'lucide-react';

interface TableData {
  id: string;
  number: string;
  label?: string;
  token: string;
}

interface StoreData {
  id: string;
  slug: string;
  name: string;
  logo: string;
  currency: string;
  acceptingOrders: boolean;
  paymentPolicy: string;
  platformFeeMode: string;
}

export default function TableLandingPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [store, setStore] = useState<StoreData | null>(null);
  const [table, setTable] = useState<TableData | null>(null);

  async function resolveTable() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/public/table/${token}`);
      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(
          data?.error?.message ||
            'This table QR is no longer valid or has expired. Please ask the cafe staff for assistance.'
        );
        return;
      }

      setStore(data.store);
      setTable(data.table);
    } catch (err: any) {
      setError('Unable to connect to the cafe. Please check your internet connection.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      resolveTable();
    }
  }, [token]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAF8] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 animate-pulse mb-4">
          <Coffee className="w-8 h-8 animate-bounce" />
        </div>
        <h2 className="text-xl font-extrabold text-[#062F23]">Connecting to Table...</h2>
        <p className="text-xs text-gray-500 mt-2 max-w-xs">
          Resolving cafe menu and active table session securely.
        </p>
      </div>
    );
  }

  // Error State: Invalid or Expired Token
  if (error || !table || !store) {
    return (
      <div className="min-h-screen bg-[#F8FAF8] flex flex-col items-center justify-center p-6 text-center font-sans">
        <div className="w-full max-w-sm bg-white rounded-3xl border border-red-100 shadow-xl p-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Invalid or Expired QR</h2>
          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            {error || 'This table QR code is no longer recognized. It may have been updated or regenerated.'}
          </p>
          <div className="w-full space-y-3">
            <button
              onClick={resolveTable}
              className="w-full py-3 px-4 rounded-xl bg-gray-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
            <div className="text-[11px] text-gray-400">
              Need help? Please request assistance from your cafe server or cashier.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success State: Table Verified
  return (
    <div className="min-h-screen bg-[#F8FAF8] flex flex-col justify-between font-sans text-gray-900">
      {/* Top Banner */}
      <div className="bg-[#062F23] text-white px-5 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
            <Coffee className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-sm font-extrabold tracking-wide uppercase">{store.name}</h1>
            <p className="text-[11px] text-emerald-300 font-medium">Digital Table Ordering</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{table.number}</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-md mx-auto w-full">
        <div className="w-full bg-white rounded-3xl border border-gray-100 shadow-xl p-8 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Table Verified &amp; Connected</span>
          </div>

          <h2 className="text-2xl font-black text-[#062F23] tracking-tight mb-2">
            Welcome to {table.number}
          </h2>
          {table.label && (
            <p className="text-xs font-medium text-emerald-700 mb-3 bg-emerald-50/60 inline-block px-3 py-0.5 rounded-full">
              {table.label}
            </p>
          )}

          <p className="text-xs text-gray-600 leading-relaxed mb-6">
            Browse our fresh food &amp; beverages, customize your order, and choose to{' '}
            <strong className="text-gray-900 font-semibold">Pay Now online</strong> or{' '}
            <strong className="text-gray-900 font-semibold">Pay Later at the counter</strong>.
          </p>

          {!store.acceptingOrders ? (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs text-left mb-6">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Orders Paused</span>
              </div>
              <div>The kitchen is not accepting new orders right now. You can still explore the menu.</div>
            </div>
          ) : null}

          {/* Action button */}
          <button
            onClick={() => {
              // Navigates to the interactive menu for this table
              router.push(`/t/${token}/menu`);
            }}
            className="w-full py-4 px-6 rounded-2xl bg-[#062F23] hover:bg-[#0B5C45] text-white font-bold text-sm transition-all shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 cursor-pointer group active:scale-[0.98]"
          >
            <UtensilsCrossed className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span>Browse Full Menu &amp; Order</span>
            <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Security / Quality guarantee badge */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          <span>Zero App Download • Contactless Dine-In</span>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center border-t border-gray-100 text-[11px] text-gray-400">
        Powered by <strong className="text-gray-600">BrewPluse</strong> Cafe OS
      </div>
    </div>
  );
}
