import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Terms of Service &amp; Platform Merchant Agreement | BrewPluse",
  description: "Review the Terms of Service and user agreement governing your use of BrewPluse&#x27;s cafe point of sale billing, QR table ordering, and cloud management platform.",
};

export default function TermsPage() {
  return (
    <div className="w-full">
      <div className="w-full bg-[#FBFBFA]"><section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#EBE8E3]"><div className="max-w-7xl mx-auto"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] text-xs font-mono font-bold uppercase tracking-widest text-[#7a756f] mb-4">Legal Documents</div><h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#141210] mb-3">Terms of Service</h1><p className="text-xs font-mono text-[#7a756f]">Legal Entity: <strong className="text-[#141210]">Shiv Akbari</strong>  ·  Trade Name:{/*   */} <strong className="text-[#141210]">BrewPluse</strong>  ·  Support:{/*   */} <a href="mailto:support@brewpluse.com" className="text-[#005c36] hover:underline">support@brewpluse.com</a> {/*   */} ·  Last Updated: <strong className="text-[#141210]">August 31, 2026</strong></p></div></section><section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6"><article className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7E5E0] shadow-sm"><h2 className="text-lg font-extrabold text-[#141210] mb-3">1. Agreement to Terms</h2><p className="text-sm text-[#5a554f] leading-relaxed">By creating an account, accessing, or using BrewPluse, you agree to be bound by these Terms of Service. If you do not agree, do not use the platform.</p></article><article className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7E5E0] shadow-sm"><h2 className="text-lg font-extrabold text-[#141210] mb-3">2. Service Usage &amp; Responsibilities</h2><p className="text-sm text-[#5a554f] leading-relaxed mb-3">BrewPluse grants you a revocable, non-exclusive, non-transferable license to utilize the POS, QR ordering, KDS, and management dashboard.</p><p className="text-sm text-[#5a554f] leading-relaxed">You are solely responsible for ensuring the accuracy of menu prices, tax configurations, food hygiene compliance, and fulfilling customer orders at your physical store.</p></article><article className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E7E5E0] shadow-sm"><h2 className="text-lg font-extrabold text-[#141210] mb-3">3. Coins and Usage Credits</h2><p className="text-sm text-[#5a554f] leading-relaxed">BrewPluse Coins represent prepaid digital operational credits. Coins have no cash surrender value and are intended strictly for powering order workflows within the BrewPluse ecosystem.</p></article></section></div>{/* $ */}{/* /$ */}
    </div>
  );
}
