'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RefundPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#F7F5EC] text-[#0B1714]">
      
      <div className="w-full bg-[#F7F5EC]"><section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 bg-[#FFFEFA] border-b border-[#DDE3DD]"><div className="max-w-7xl mx-auto"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F5EC] border border-[#DDE3DD] text-xs font-mono font-bold uppercase tracking-widest text-[#64736D] mb-4">Legal Documents</div><h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1714] mb-3">Refund &amp; Cancellation Policy</h1><p className="text-xs font-mono text-[#64736D]">Legal Entity: <strong className="text-[#0B1714]">Shiv Akbari</strong>  ·  Trade Name: <strong className="text-[#0B1714]">BrewPluse</strong>  ·  Support: <a href="mailto:support@brewpluse.com" className="text-[#002D23] hover:underline">support@brewpluse.com</a>  ·  Last Updated: <strong className="text-[#0B1714]">August 31, 2026</strong></p></div></section><section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6"><article className="p-6 sm:p-7 rounded-[16px] bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm"><h2 className="text-lg font-extrabold text-[#0B1714] mb-3">1. Software Subscription Policy</h2><p className="text-sm text-[#64736D] leading-relaxed">BrewPluse does not charge recurring monthly software subscription retainers. As such, there are no recurring monthly subscription cancellation penalties.</p></article><article className="p-6 sm:p-7 rounded-[16px] bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm"><h2 className="text-lg font-extrabold text-[#0B1714] mb-3">2. Coin Recharge &amp; Unused Credits</h2><p className="text-sm text-[#64736D] leading-relaxed mb-3">Coin recharges are credited instantly to your store wallet upon successful payment completion. If a payment was deducted but coins were not credited due to network timeouts, our automated reconciler updates your wallet or initiates a full refund within 5–7 business days.</p><p className="text-sm text-[#64736D] leading-relaxed">For disputed transactions or billing queries, contact <a href="mailto:support@brewpluse.com" className="text-[#002D23] font-bold underline">support@brewpluse.com</a> with your Payment ID.</p></article><article className="p-6 sm:p-7 rounded-[16px] bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm"><h2 className="text-lg font-extrabold text-[#0B1714] mb-3">3. Customer Order Cancellations</h2><p className="text-sm text-[#64736D] leading-relaxed">Orders placed by end-customers at a cafe are subject to the individual cafe&#x27;s preparation and food cancellation policies. Cafe owners have full discretion to issue refunds for canceled table orders directly via their dashboard.</p></article></section></div>
    </div>
  );
}
