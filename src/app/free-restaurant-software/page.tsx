import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Why BrewPluse Is Free for Restaurants — Transparent Pricing Model Explained | BrewPluse',
  description:
    'Learn why BrewPluse charges ₹0/month software fees forever. Discover our modern cloud architecture, transparent ₹1 micro-fee model, and how we keep operations sustainable.',
  alternates: {
    canonical: 'https://brewpluse.com/free-restaurant-software',
  },
  openGraph: {
    title: 'Why BrewPluse Is Free for Restaurants & Cafes | BrewPluse',
    description:
      'The honest economic breakdown behind BrewPluse ₹0/month cafe software: serverless cloud efficiency, zero legacy overhead, and transparent micro-fees.',
    url: 'https://brewpluse.com/free-restaurant-software',
    type: 'website',
  },
};

export default function WhyFreeRestaurantSoftwarePage() {
  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>RADICAL ECONOMIC TRANSPARENCY</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Why BrewPluse Is Free for <span className="text-emerald-400">Restaurants &amp; Cafes.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Every business tool starts with a price tag. Discover how modern cloud architecture, zero bloated sales teams, and a transparent ₹1 micro-fee make ₹0/month software sustainable forever.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
            <Link
              href="/pricing"
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg"
            >
              See Pricing Details →
            </Link>
            <Link
              href="/compare"
              className="py-3.5 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Compare Total Cost of Ownership
            </Link>
          </div>
        </div>

        {/* Section 1 & 2: Architectural Breakdown */}
        <div className="space-y-8 mb-20">
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-4">
            <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
              THE OLD LEGACY MODEL
            </span>
            <h2 className="text-2xl font-bold text-white">1. Why Traditional POS Software Is So Expensive</h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Legacy POS vendors like Petpooja, Posist, and Toast spend massive amounts on field sales agents, local branch offices, manual hardware technicians, and aggressive advertising. To cover these immense operational overheads, they lock cafe owners into ₹15,000–₹35,000 annual licensing contracts plus mandatory maintenance contracts (AMCs).
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-4">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              THE BREWPLUSE CLOUD MODEL
            </span>
            <h2 className="text-2xl font-bold text-white">2. How Modern Architecture Makes ₹0/Month Sustainable</h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              BrewPluse was engineered from day one as a cloud-native platform running on modern edge infrastructure. We have zero commissioned on-field sales reps pushing proprietary hardware. Our self-serve onboarding allows cafe owners to launch in 5 minutes using their existing iPads, tablets, or phones. Because our server cost per cafe is pennies, we pass those savings directly to you.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-4">
            <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
              FAIR USAGE ECONOMICS
            </span>
            <h2 className="text-2xl font-bold text-white">3. The Transparent Micro-Order Fee</h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Instead of forcing a struggling new coffee shop to pay thousands before serving its first cup, BrewPluse only monetizes when you succeed. A tiny ₹1 micro-fee applies to completed orders—and cafe owners can choose whether they absorb this fee or pass it transparently to the diner as a convenience fee. When passed to diners, your cafe pays literally <strong>₹0 net software costs</strong> forever.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Join the Modern Cafe Movement
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Zero contracts. Zero proprietary terminal lock-in. 100% data ownership.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/signup"
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
            >
              Start Your Free Cafe →
            </Link>
            <Link
              href="/demo"
              className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Explore Live Demo
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
