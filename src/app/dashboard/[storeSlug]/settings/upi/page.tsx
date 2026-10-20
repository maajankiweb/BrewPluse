'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Link from 'next/link';
import {
  ArrowLeft,
  Landmark,
  Save,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function UpiSettingsPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [workflow, setWorkflow] = useState<'pay_first' | 'pay_later' | 'customer_choice'>('customer_choice');
  const [upiId, setUpiId] = useState('');
  const [upiName, setUpiName] = useState('');
  const [gstin, setGstin] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/admin/store-settings');
        if (res.ok) {
          const data = await res.json();
          if (data.store) {
            setUpiId(data.store.upiId || '');
            setUpiName(data.store.upiName || '');
            setGstin(data.store.gstin || '');
            setWorkflow(data.store.paymentPolicy || 'customer_choice');
          }
        }
      } catch (err) {
        console.error('Failed to load store settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, [storeSlug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/store-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          upiId: upiId.trim(),
          upiName: upiName.trim(),
          gstin: gstin.trim(),
          paymentPolicy: workflow,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        toast.error(data?.error?.message || 'Failed to save settings.');
        return;
      }

      toast.success('Direct UPI & Payment settings saved successfully!');
    } catch (err: any) {
      toast.error('Network error while saving settings.');
    } finally {
      setSaving(false);
    }
  };

  const basePath = `/dashboard/${storeSlug}`;

  return (
    <DashboardShell storeSlug={storeSlug}>
      <form onSubmit={handleSave} className="max-w-[1000px] mx-auto space-y-4 font-sans">
        {/* Back Link & Save */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`${basePath}/settings`}
            className="group inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white dark:bg-[#0E2018] hover:bg-[#F8FAF8] dark:hover:bg-[#142A21] text-[#12201B] dark:text-[#F2FAF6] border border-[#E7ECE9] dark:border-[#1E342B] text-xs font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#65736D] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Settings</span>
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-xs cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

        {/* Heading Card */}
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E7ECE9] dark:border-[#1E342B] shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] border border-[#10B981]/20 flex items-center justify-center shrink-0">
            <Landmark className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#12201B] dark:text-white tracking-tight">
              Direct UPI &amp; Payment Configuration
            </h1>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] font-normal mt-0.5">
              Setup your cafe&apos;s direct UPI ID. Customers pay straight to your bank account with zero payment gateway fees.
            </p>
          </div>
        </div>

        {/* Direct UPI Explanation Banner */}
        <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">
            <strong className="font-bold">Zero Gateway Commission:</strong> BrewPluse does not route customer orders through Razorpay. Customers scan your table QR code and pay directly to your UPI ID using Google Pay, PhonePe, Paytm, or BHIM. 100% of customer funds reach your bank account instantly.
          </div>
        </div>

        {/* UPI & PAYMENT CONFIGURATION */}
        <div className="rounded-xl border border-[#E7ECE9] dark:border-[#1E342B] bg-white dark:bg-[#0E2018] p-4 sm:p-5 shadow-[0_2px_12px_rgba(20,50,40,0.03)] space-y-4">
          <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-100 dark:border-[#1E342B] pb-2.5">
            <QrCode className="h-4.5 w-4.5 text-emerald-600" />
            <span>Cafe Direct UPI VPA</span>
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
                Cafe UPI ID (VPA) <span className="text-rose-500">*</span>
              </label>
              <input
                className="w-full rounded-xl px-3 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981]"
                placeholder="e.g. yourcafe@okhdfcbank or 9876543210@paytm"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                required
              />
              <p className="text-[11px] text-gray-500 mt-1">
                This UPI ID is encoded into customer table QR codes for instant payments.
              </p>
            </div>

            <div>
              <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
                Merchant / Business Name on UPI
              </label>
              <input
                className="w-full rounded-xl px-3 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981]"
                placeholder="e.g. Blue Bean Coffee Cafe"
                value={upiName}
                onChange={(e) => setUpiName(e.target.value)}
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Name displayed to customers inside GPay, PhonePe, and Paytm when paying.
              </p>
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
              Customer Payment Timing Policy
            </label>
            <select
              value={workflow}
              onChange={(e) => setWorkflow(e.target.value as any)}
              className="w-full bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-xs rounded-xl h-10 px-3 text-neutral-900 dark:text-white focus:outline-none focus:border-[#10B981]"
            >
              <option value="customer_choice">Customer Choice (Can pay now via UPI or pay at counter after eating)</option>
              <option value="pay_later">Pay Later Only (Dine-in tab settled at the end)</option>
              <option value="pay_first">Pay First (QSR Counter flow: Customer pays upfront before kitchen starts)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
              GSTIN Number (Optional)
            </label>
            <input
              className="w-full rounded-xl px-3 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981]"
              placeholder="e.g. 29AAAAA0000A1Z5"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
            />
          </div>
        </div>

        {/* Live Preview Box */}
        {upiId && (
          <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0E2018] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                UPI
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white">{upiName || 'Your Cafe'}</div>
                <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">{upiId}</div>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              Active for Table QRs
            </span>
          </div>
        )}
      </form>
    </DashboardShell>
  );
}
