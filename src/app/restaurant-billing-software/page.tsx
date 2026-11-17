import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Restaurant Billing Software: Fast, Touch-Optimized & ₹0/mo | BrewPluse',
  description:
    'High-velocity restaurant billing software with dynamic UPI QR generation, instant 58mm/80mm ESC/POS thermal printing, and zero monthly software retainers.',
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-billing-software',
  },
  openGraph: {
    title: 'Restaurant Billing Software: Fast & Zero Subscription | BrewPluse',
    description:
      'Fast, touch-optimized restaurant and cafe billing machine software. Direct Bluetooth printing, split checks, and ₹0/month lifetime subscription.',
    url: 'https://brewpluse.com/restaurant-billing-software',
    type: 'website',
  },
};

export default function RestaurantBillingSoftwarePage() {
  const metrics = [
    { value: '< 2.5s', label: 'Average Bill Punch Time', desc: 'Touch and hotkey shortcuts engineered for rush-hour baristas.' },
    { value: '100%', label: 'BYOD Compatibility', desc: 'Runs in Chrome on iPads, Android tablets, laptops, and Macs.' },
    { value: '₹0 / mo', label: 'Software Retainer', desc: 'Full billing suite unlocked forever with zero monthly licensing fees.' },
  ];

  const faqs = [
    {
      q: 'Can this billing software split bills across cash, UPI, and cards?',
      a: 'Yes. BrewPluse supports split tenders on any order. Customers can split payments by item, by custom amounts, or combine cash and digital UPI QR codes seamlessly.',
    },
    {
      q: 'Does BrewPluse work with thermal receipt printers without installing drivers?',
      a: 'Yes. With native Web Bluetooth and WebUSB protocols, BrewPluse prints directly to standard 58mm and 80mm ESC/POS printers directly from Google Chrome.',
    },
    {
      q: 'Are bills compliant with Indian GST rules?',
      a: 'Yes. All generated customer receipts include compliant CGST/SGST itemized breakdowns, your registered GSTIN, and customizable invoice prefixes.',
    },
  ];

  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>TOUCH-OPTIMIZED COUNTER BILLING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Restaurant Billing Software: Fast, Touch-Optimized, and <span className="text-emerald-400">Zero-Subscription.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ring up complex orders in under 3 seconds. Print wireless receipts, accept dynamic UPI settlements, and eliminate expensive monthly POS retainers forever.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
            <Link
              href="/signup"
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg"
            >
              Start Billing Free →
            </Link>
            <Link
              href="/demo"
              className="py-3.5 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Test Live Billing POS Demo
            </Link>
          </div>
        </div>

        {/* Section 1: Core Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-7 rounded-3xl bg-[#0D1612] border border-[#1E362B] text-center space-y-2">
              <div className="text-4xl font-extrabold text-emerald-400 font-mono">{m.value}</div>
              <div className="text-sm font-bold text-white">{m.label}</div>
              <p className="text-xs text-gray-400">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* Section 2: Universal Printer & Hardware */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl mb-20 space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              ZERO PROPRIETARY LOCK-IN
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Universal Printer &amp; Hardware Compatibility</h2>
            <p className="text-xs text-gray-400 mt-1">
              Connect to any off-the-shelf hardware via wireless Bluetooth or direct USB.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-[#080E0B] border border-white/5 space-y-2">
              <span className="text-emerald-400 font-bold">58mm Thermal Printers</span>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Ideal for compact coffee counters and food trucks. Fast raw printing without ink cartridges.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080E0B] border border-white/5 space-y-2">
              <span className="text-emerald-400 font-bold">80mm Auto-Cutter Terminals</span>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Itemized GST tax invoices, table summaries, and promotional QR codes for dining restaurants.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#080E0B] border border-white/5 space-y-2">
              <span className="text-emerald-400 font-bold">Web Bluetooth Drivers</span>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Pair directly from Google Chrome on iPads and Android tablets with zero external print software.
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: FAQs */}
        <div className="mb-20 space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#0D1612] border border-[#1E362B]">
              <h3 className="text-sm font-bold text-white mb-2">{f.q}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Section 4: Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Upgrade Your Counter Billing in 5 Minutes
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Join hundreds of smart cafes running on BrewPluse with ₹0/month software fees.
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
