'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ShippingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-[#F7F5EC] text-[#0B1714]">
      
      <div className="w-full bg-[#F7F5EC]"><section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 bg-[#FFFEFA] border-b border-[#DDE3DD]"><div className="max-w-7xl mx-auto"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F5EC] border border-[#DDE3DD] text-xs font-mono font-bold uppercase tracking-widest text-[#64736D] mb-4">Legal Documents</div><h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1714] mb-3">Shipping &amp; Service Delivery Policy</h1><p className="text-xs font-mono text-[#64736D]">Legal Entity: <strong className="text-[#0B1714]">Shiv Akbari</strong>  ·  Trade Name: <strong className="text-[#0B1714]">BrewPluse</strong>  ·  Support: <a href="mailto:support@brewpluse.com" className="text-[#002D23] hover:underline">support@brewpluse.com</a>  ·  Last Updated: <strong className="text-[#0B1714]">August 31, 2026</strong></p></div></section><section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6"><article className="p-6 sm:p-7 rounded-[16px] bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm"><h2 className="text-lg font-extrabold text-[#0B1714] mb-3">1. Digital Service Delivery</h2><p className="text-sm text-[#64736D] leading-relaxed">BrewPluse is a Software-as-a-Service (SaaS) cloud application. All services, account activations, POS features, table QR generation, and software downloads are delivered electronically and instantly upon signup.</p></article><article className="p-6 sm:p-7 rounded-[16px] bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm"><h2 className="text-lg font-extrabold text-[#0B1714] mb-3">2. Physical Goods Shipping</h2><p className="text-sm text-[#64736D] leading-relaxed">BrewPluse does not directly manufacture or ship physical goods by default. Hardware (e.g. thermal printers, tablets) should be sourced from third-party manufacturers. If BrewPluse provides custom QR stands or printed collateral as part of a promotional package, dispatch tracking is provided via registered email.</p></article></section></div>
    </div>
  );
}
