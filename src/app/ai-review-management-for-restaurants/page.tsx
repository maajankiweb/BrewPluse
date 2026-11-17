import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI Review Management for Restaurants & Cafes | Google Review QR | BrewPluse',
  description:
    'Grow your 5-star Google Maps reviews automatically after every meal. Direct diners to Google Place reviews seamlessly upon payment with BrewPluse.',
  alternates: {
    canonical: 'https://brewpluse.com/ai-review-management-for-restaurants',
  },
  openGraph: {
    title: 'AI Review Management for Restaurants | BrewPluse',
    description:
      'Boost your restaurant 5-star Google reviews with automated post-meal prompts and QR table review integration.',
    url: 'https://brewpluse.com/ai-review-management-for-restaurants',
    type: 'website',
  },
};

export default function AiReviewManagementPage() {
  const steps = [
    {
      num: '01',
      title: 'Customer Scans & Settles Bill',
      desc: 'Guest places order and pays via contactless table QR code or settles with cashier at counter.',
    },
    {
      num: '02',
      title: 'Post-Payment Experience Prompt',
      desc: 'A friendly, non-intrusive prompt appears on their smartphone: "How was your dining experience today?"',
    },
    {
      num: '03',
      title: '5-Star Google Redirect',
      desc: 'Happy diners are routed directly to your official Google Maps business review form in 1 tap.',
    },
    {
      num: '04',
      title: 'Private Feedback Resolution',
      desc: 'Guests with concerns submit private feedback directly to the cafe owner before posting publicly.',
    },
  ];

  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute top-10 right-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>REPUTATION &amp; LOCAL SEO ACCELERATOR</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            AI Review Management for <span className="text-emerald-400">Restaurants &amp; Cafes.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Convert happy diners into authentic 5-star Google Maps reviews automatically. Increase foot traffic and outrank nearby competitors without expensive third-party reputation software.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
            <Link
              href="/signup"
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg"
            >
              Boost Your Reviews Free →
            </Link>
            <Link
              href="/demo"
              className="py-3.5 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Explore Live Demo
            </Link>
          </div>
        </div>

        {/* Section 1: The 4-Step Acceleration Engine */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              The 4-Step Google Review Acceleration Engine
            </h2>
            <p className="text-xs text-gray-400">
              Collect genuine reviews at the moment of highest guest satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3 relative group hover:border-emerald-500/40 transition-all">
                <span className="text-2xl font-extrabold font-mono text-emerald-400/40 group-hover:text-emerald-400 transition-colors">
                  {s.num}
                </span>
                <h3 className="text-sm font-bold text-white">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Boost Your Google Reputation Today
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            All Google Review acceleration features are built directly into BrewPluse with ₹0/month software fees.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/signup"
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
            >
              Start Free Today →
            </Link>
            <Link
              href="/demo"
              className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Test Live Sandbox
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
