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
  Globe2,
  Receipt,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import GlobalSetupModal from '@/components/GlobalSetupModal';

export default function UpiSettingsPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [workflow, setWorkflow] = useState<'pay_first' | 'pay_later' | 'customer_choice'>('customer_choice');
  const [feeMode, setFeeMode] = useState<'customer' | 'cafe'>('cafe');
  const [upiId, setUpiId] = useState('');
  const [upiName, setUpiName] = useState('');
  const [gstin, setGstin] = useState('');
  const [taxRate, setTaxRate] = useState<number>(0);
  const [isGlobalModalOpen, setIsGlobalModalOpen] = useState(false);
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
            setFeeMode(data.store.platformFeeMode || 'cafe');
            setTaxRate(typeof data.store.taxRate === 'number' ? data.store.taxRate : 0);
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
          platformFeeMode: feeMode,
          taxRate: Number(taxRate) || 0,
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

          {/* Default Cafe GST / Tax Rate */}
          <div className="pt-2 border-t border-neutral-100 dark:border-[#1E342B] space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider block">
                Default Cafe GST / Tax Rate (Optional)
              </label>
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                {taxRate === 0 ? '✓ 0% GST (No tax added on customer bill)' : `+${taxRate}% tax added to bill`}
              </span>
            </div>
            <select
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              className="w-full bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-xs rounded-xl h-10 px-3 text-neutral-900 dark:text-white focus:outline-none focus:border-[#10B981] font-semibold"
            >
              <optgroup label="🇮🇳 Indian Government GST Slabs">
                <option value={0}>0% - Exempt / No GST (₹0 Tax on bill - Default)</option>
                <option value={5}>5% - Standard Cafe / Restaurant Food (No ITC)</option>
                <option value={12}>12% - Bakery / Confectionery / Packed Foods</option>
                <option value={18}>18% - Luxury / Air-conditioned Lounge / Catering</option>
              </optgroup>
              <optgroup label="🌍 International Country VAT / Tax Slabs">
                <option value={5}>5% - UAE / Middle East VAT</option>
                <option value={7}>7% - Singapore GST</option>
                <option value={10}>10% - Australia GST / Japan Consumption Tax</option>
                <option value={20}>20% - United Kingdom / EU Standard VAT</option>
              </optgroup>
            </select>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">
              Per-item GST rates set in Menu Management take priority over this store default. When set to <strong>0%</strong>, customers pay exact menu prices with no extra ₹6 GST line.
            </p>
          </div>
        </div>

        {/* PLATFORM USAGE FEE BEARER (₹1 / ORDER) */}
        <div className="rounded-xl border border-[#E7ECE9] dark:border-[#1E342B] bg-white dark:bg-[#0E2018] p-4 sm:p-5 shadow-[0_2px_12px_rgba(20,50,40,0.03)] space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Landmark className="h-4.5 w-4.5 text-emerald-600" />
                <span>Who Pays ₹1 BrewPluse Platform Fee?</span>
              </p>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200">
                Applied Per Order
              </span>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-1">
              Decide whether to pass the ₹1 platform fee to your customers or pay it from your cafe profits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            {/* Option 1: Customer Pays */}
            <div
              onClick={() => setFeeMode('customer')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                feeMode === 'customer'
                  ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                  : 'border-neutral-200 dark:border-[#1E342B] hover:border-neutral-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-[#062F23] dark:text-white flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full border border-emerald-600 flex items-center justify-center">
                      {feeMode === 'customer' && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                    </span>
                    Customer Pays (+₹1 Fee)
                  </span>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    Zero Cafe Cost
                  </span>
                </div>
                <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] leading-relaxed">
                  When customers scan your table QR, menu items show <span className="font-semibold text-emerald-700">+₹1 platform charge</span>. An explicit ₹1.00 fee is added to the checkout bill and sent directly into your cafe UPI. Your food profit margins remain 100% untouched.
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-emerald-200/50 dark:border-emerald-800/30 text-[10.5px] font-medium text-emerald-800 dark:text-emerald-300">
                ✓ 100% food revenue retained
              </div>
            </div>

            {/* Option 2: Cafe Owner Pays */}
            <div
              onClick={() => setFeeMode('cafe')}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                feeMode === 'cafe'
                  ? 'border-emerald-600 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                  : 'border-neutral-200 dark:border-[#1E342B] hover:border-neutral-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-[#062F23] dark:text-white flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full border border-emerald-600 flex items-center justify-center">
                      {feeMode === 'cafe' && <span className="w-2 h-2 rounded-full bg-emerald-600" />}
                    </span>
                    Cafe Owner Pays (Absorb ₹1)
                  </span>
                  <span className="text-[10px] font-bold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    Free for Customer
                  </span>
                </div>
                <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] leading-relaxed">
                  Customers only see standard menu prices with zero extra charges. The ₹1/order platform fee is absorbed from your cafe sales and settled to BrewPluse every 200 orders (₹200).
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-neutral-200/50 dark:border-[#1E342B] text-[10.5px] font-medium text-gray-600 dark:text-gray-400">
                ✓ Best friction-free customer experience
              </div>
            </div>
          </div>

          {/* Dynamic Customer Menu Preview */}
          <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] space-y-2">
            <div className="text-[11px] font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider">
              Customer Table QR Live Preview
            </div>
            <div className="p-3 rounded-xl bg-white dark:bg-[#0E2018] border border-neutral-200 dark:border-[#1E342B] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">Cold Coffee with Vanilla Cream</div>
                <div className="text-[11px] text-gray-500 mt-0.5">Classic brewed espresso over chilled milk</div>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs font-black text-gray-900 dark:text-white">₹120</span>
                  {feeMode === 'customer' ? (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300">
                      +₹1 platform charge
                    </span>
                  ) : (
                    <span className="text-[10px] text-gray-500 italic">No extra fee</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                  {feeMode === 'customer' ? 'Total: ₹121' : 'Total: ₹120'}
                </span>
              </div>
            </div>
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

        {/* GLOBAL / INTERNATIONAL MARKET LAUNCH GATE */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-[#0E2018] border border-blue-200/80 dark:border-blue-800/40 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Operating a Cafe Outside India? (Global Market Setup)
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-[10px] font-bold">
                  Assisted Onboarding
                </span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl leading-relaxed">
                Direct UPI QR codes are designed for Indian bank accounts (INR ₹). If you run a cafe in the <strong>USA, UAE, UK, Singapore, Australia, or Europe</strong>, contact our global engineering team for custom assisted setup with local currencies ($, €, £, AED) and international payment rails.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsGlobalModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm whitespace-nowrap shrink-0 transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Request Global Setup</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Global Setup Modal */}
        <GlobalSetupModal
          isOpen={isGlobalModalOpen}
          onClose={() => setIsGlobalModalOpen(false)}
          defaultStoreName={upiName}
        />
      </form>
    </DashboardShell>
  );
}
