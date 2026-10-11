import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Shipping &amp; Digital Cloud Delivery Policy | BrewPluse",
  description: "Read the official service delivery and cloud fulfillment policy for BrewPluse&#x27;s instant software account activation, POS app downloads, and support services.",
};

export default function ShippingPage() {
  return (
    <div className="w-full">
      <div className="w-full bg-[#FBFBFA]"><section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#EBE8E3]"><div className="max-w-7xl mx-auto"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] text-xs font-mono font-bold uppercase tracking-widest text-[#7a756f] mb-4">Legal Documents</div><h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141210] mb-3">Shipping &amp; Service Delivery Policy</h1><p className="text-xs font-mono text-[#7a756f]">Legal Entity: <strong className="text-[#141210]">Shiv Akbari</strong>  ·  Trade Name:{/*   */} <strong className="text-[#141210]">BrewPluse</strong>  ·  Support:{/*   */} <a href="mailto:support@brewpluse.com" className="text-[#005c36] hover:underline">support@brewpluse.com</a> {/*   */} ·  Last Updated: <strong className="text-[#141210]">August 31, 2026</strong></p></div></section><section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6"><article className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7E5E0] shadow-sm"><h2 className="text-lg font-extrabold text-[#141210] mb-3">1. Digital Service Delivery</h2><p className="text-sm text-[#5a554f] leading-relaxed">BrewPluse is a Software-as-a-Service (SaaS) cloud application. All services, account activations, POS features, table QR generation, and software downloads are delivered electronically and instantly upon signup.</p></article><article className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7E5E0] shadow-sm"><h2 className="text-lg font-extrabold text-[#141210] mb-3">2. Physical Goods Shipping</h2><p className="text-sm text-[#5a554f] leading-relaxed">BrewPluse does not directly manufacture or ship physical goods by default. Hardware (e.g. thermal printers, tablets) should be sourced from third-party manufacturers. If BrewPluse provides custom QR stands or printed collateral as part of a promotional package, dispatch tracking is provided via registered email.</p></article></section></div>{/* $ */}{/* /$ */}
    </div>
  );
}
