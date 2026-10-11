'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Link from 'next/link';
import {
  ArrowLeft,
  Landmark,
  Percent,
  Check,
  Save,
} from 'lucide-react';
import { useToast } from '@/components/Toast';



export default function UpiSettingsPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [workflow, setWorkflow] = useState<'pay_first' | 'pay_last'>('pay_last');
  const [upiId, setUpiId] = useState('');
  const [gstin, setGstin] = useState('');
  const [serviceCharge, setServiceCharge] = useState(false);
  const [feePayer, setFeePayer] = useState<'customer' | 'cafe'>('customer');
  const toast = useToast();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('UPI & GST settings saved successfully!');
  };

  const basePath = `/dashboard/${storeSlug}`;

  return (
    <DashboardShell storeSlug={storeSlug}>
      <form onSubmit={handleSave} className="max-w-[1200px] mx-auto space-y-4 font-sans">
        {/* Back Link */}
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
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>

        {/* Heading Card */}
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E7ECE9] dark:border-[#1E342B] shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] border border-[#10B981]/20 flex items-center justify-center shrink-0">
            <Landmark className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#12201B] dark:text-white tracking-tight">
              UPI &amp; GST
            </h1>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] font-normal mt-0.5">
              Merchant UPI VPA, payment workflow, GSTIN and tax configuration
            </p>
          </div>
        </div>

        {/* UPI & PAYMENT CONFIGURATION */}
        <div className="rounded-xl border border-[#E7ECE9] dark:border-[#1E342B] bg-white dark:bg-[#0E2018] p-4 sm:p-5 shadow-[0_2px_12px_rgba(20,50,40,0.03)] space-y-4">
          <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-100 dark:border-[#1E342B] pb-2.5">
            <Landmark className="h-4.5 w-4.5 text-amber-500" />
            <span>UPI &amp; Payment Configuration</span>
          </p>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
              Primary Payment Workflow
            </label>
            <select
              value={workflow}
              onChange={(e) => setWorkflow(e.target.value as any)}
              className="w-full bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-xs rounded-xl h-10 px-3 text-neutral-900 dark:text-white focus:outline-none focus:border-[#10B981]"
            >
              <option value="pay_first">Pay First (Customer pays before order is prepared)</option>
              <option value="pay_last">Pay at the end (Customer pays after order is served)</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
              Merchant UPI ID (GPay / PhonePe / Paytm)
            </label>
            <input
              className="w-full rounded-xl px-3 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981]"
              placeholder="merchant@okaxis"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        </div>

        {/* GST & TAX CONFIGURATION */}
        <div className="rounded-xl border border-[#E7ECE9] dark:border-[#1E342B] bg-white dark:bg-[#0E2018] p-4 sm:p-5 shadow-[0_2px_12px_rgba(20,50,40,0.03)] space-y-4">
          <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-100 dark:border-[#1E342B] pb-2.5">
            <Percent className="h-4.5 w-4.5 text-amber-500" />
            <span>GST &amp; Tax Configuration</span>
          </p>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
              GSTIN Number
            </label>
            <input
              className="w-full rounded-xl px-3 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981]"
              placeholder="e.g. 27AAAAA0000A1Z5"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] rounded-xl">
            <div>
              <label className="text-xs font-bold text-neutral-900 dark:text-white">
                Enable Service Charge / Tax
              </label>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                Add fixed or % charge on total bill
              </p>
            </div>
            <input
              type="checkbox"
              checked={serviceCharge}
              onChange={(e) => setServiceCharge(e.target.checked)}
              className="h-4 w-4 rounded accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="pt-4 border-t border-neutral-100 dark:border-[#1E342B] space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                  BrewPluse Fee
                </h4>
                <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
                  ₹1.00 / order
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                Who covers the BrewPluse per-order digital ordering fee?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Customer pays */}
              <div
                onClick={() => setFeePayer('customer')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  feePayer === 'customer'
                    ? 'bg-emerald-500/[0.04] dark:bg-emerald-500/[0.07] border-emerald-500/40 shadow-xs ring-1 ring-emerald-500/20'
                    : 'bg-neutral-50/70 dark:bg-[#11241C] border-neutral-200 dark:border-[#1E342B]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        Customer pays
                      </span>
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Recommended
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Add ₹1.00 BrewPluse Digital Ordering Fee to each eligible order. Zero software
                      cost to cafe.
                    </p>
                  </div>
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                      feePayer === 'customer'
                        ? 'border-emerald-600 bg-emerald-600'
                        : 'border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    {feePayer === 'customer' && (
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>

              {/* Cafe pays */}
              <div
                onClick={() => setFeePayer('cafe')}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                  feePayer === 'cafe'
                    ? 'bg-emerald-500/[0.04] dark:bg-emerald-500/[0.07] border-emerald-500/40 shadow-xs ring-1 ring-emerald-500/20'
                    : 'bg-neutral-50/70 dark:bg-[#11241C] border-neutral-200 dark:border-[#1E342B]'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-neutral-900 dark:text-white">
                        Cafe pays (Self-funded)
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                      Customers pay normal bill. ₹1.00/order is added to your BrewPluse Usage.
                    </p>
                  </div>
                  <div
                    className={`h-4 w-4 rounded-full border flex items-center justify-center mt-0.5 shrink-0 ${
                      feePayer === 'cafe'
                        ? 'border-emerald-600 bg-emerald-600'
                        : 'border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    {feePayer === 'cafe' && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </DashboardShell>
  );
}
