import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Best Free Restaurant Software for Small Businesses (2026 Guide) | BrewPluse',
  description:
    'Discover the best free restaurant management software for small eateries, diners, and bistros. POS billing, QR table ordering, KDS, and inventory with ₹0/month software fees.',
  alternates: {
    canonical: 'https://brewpluse.com/best-free-restaurant-software',
  },
  openGraph: {
    title: 'Best Free Restaurant Software for Small Businesses (2026) | BrewPluse',
    description:
      'Compare free restaurant management software options. Discover how BrewPluse provides enterprise-grade POS, KDS, and table QR ordering for ₹0/month.',
    url: 'https://brewpluse.com/best-free-restaurant-software',
    type: 'website',
  },
};

export default function BestFreeRestaurantSoftwarePage() {
  const capabilities = [
    { title: '1. Rapid Counter & Table POS', desc: 'Touchscreen billing, keyboard hotkeys, and split payment modes.' },
    { title: '2. Contactless QR Table Ordering', desc: 'App-free self-ordering with live menu modifiers and UPI checkout.' },
    { title: '3. Paperless Kitchen Display (KDS)', desc: 'Real-time kitchen tickets with color countdown timers and bump bar.' },
    { title: '4. Recipe & Raw Stock Control', desc: 'Automated ingredient deductions per dish sold to stop kitchen shrinkage.' },
    { title: '5. Wireless Thermal Printing', desc: 'Direct Web Bluetooth and USB printing to standard 58mm/80mm ESC/POS printers.' },
    { title: '6. Zero Monthly Software Retainer', desc: 'All features 100% unlocked forever with transparent usage-based micro-fees.' },
  ];

  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>BUYER&apos;S EVALUATION GUIDE • 2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Best Free Restaurant Software for <span className="text-emerald-400">Small Businesses (2026).</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Independent restaurants, bistros, and cloud kitchens no longer need to pay ₹25,000 annual software retainers. Discover how modern cloud architecture delivers enterprise operations at ₹0/month.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
            <Link
              href="/signup"
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg"
            >
              Start Free Restaurant OS →
            </Link>
            <Link
              href="/compare"
              className="py-3.5 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Compare vs Petpooja &amp; Posist
            </Link>
          </div>
        </div>

        {/* Section 1: 6 Capabilities */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              EVALUATION CHECKLIST
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              6 Critical Capabilities Small Restaurants Need in 2026
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {capabilities.map((c, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#080E0B] border border-white/5 space-y-2">
                <h3 className="text-sm font-bold text-emerald-400">{c.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Run Your Restaurant on BrewPluse for ₹0/Month
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Zero setup fees. Zero contract lock-ins. Works on devices you already own.
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
