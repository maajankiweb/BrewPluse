import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Restaurant Order Management System (OMS) | Centralized Kitchen Orders | BrewPluse',
  description:
    'Unify counter orders, QR table tickets, and delivery queues in one centralized real-time Order Management System with zero monthly software fees.',
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-order-management-system',
  },
  openGraph: {
    title: 'Restaurant Order Management System (OMS) | BrewPluse',
    description:
      'Centralized omnichannel order management for high-velocity restaurants and cafes. Real-time kitchen ticket routing, status tracking, and thermal printing.',
    url: 'https://brewpluse.com/restaurant-order-management-system',
    type: 'website',
  },
};

export default function OrderManagementSystemPage() {
  const steps = [
    {
      num: '01',
      title: 'Omnichannel Order Ingestion',
      desc: 'Capture dine-in table QR orders, takeaway counter billing, and phone orders in one unified live queue without manual re-entry.',
    },
    {
      num: '02',
      title: 'Automated Kitchen Routing',
      desc: 'Beverages dispatch instantly to the barista station while hot food routes to the main kitchen display with color-coded preparation timers.',
    },
    {
      num: '03',
      title: 'Table-Side & Counter Dispatch',
      desc: 'Floor captains receive instant alerts when orders are ready for pickup, slashing customer wait times by up to 40%.',
    },
  ];

  const faqs = [
    {
      q: 'How does BrewPluse unify dine-in and takeaway orders?',
      a: 'All orders—whether punched by a cashier, ordered by a diner via table QR, or entered by a waiter on a handheld device—flow into a single real-time operational database. There is zero risk of double entry or lost tickets.',
    },
    {
      q: 'Can the Order Management System route items to different kitchen stations?',
      a: 'Yes. BrewPluse supports multi-station ticket splitting. Coffee and bakery items route directly to the barista KDS screen, while cooked meals route to the chef kitchen display screen.',
    },
    {
      q: 'Does BrewPluse charge extra for multi-station order routing?',
      a: 'No. Multi-station order management is included free in BrewPluse with ₹0/month software fees.',
    },
  ];

  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>CENTRALIZED OMNICHANNEL FLOW</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Restaurant Order Management System for <span className="text-emerald-400">High-Velocity Kitchens.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate yelled kitchen orders and lost paper slips. Synchronize counter billing, table QR ordering, and kitchen display lines in one synchronized heartbeat.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
            <Link
              href="/signup"
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg"
            >
              Start Free Forever →
            </Link>
            <Link
              href="/demo"
              className="py-3.5 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Explore Live OMS Demo
            </Link>
          </div>
        </div>

        {/* Section 1: Flawless Kitchen Execution */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Flawless Kitchen Execution from Order Punch to Table Delivery
            </h2>
            <p className="text-xs text-gray-400">
              Built for high-pressure service hours when every second counts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, idx) => (
              <div key={idx} className="p-7 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3 relative group hover:border-emerald-500/40 transition-all">
                <span className="text-3xl font-extrabold font-mono text-emerald-400/40 group-hover:text-emerald-400 transition-colors">
                  {s.num}
                </span>
                <h3 className="text-lg font-bold text-white">{s.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Order State Telemetry Mockup */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#122018] to-[#0A120D] border border-emerald-500/30 shadow-2xl mb-20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                REAL-TIME DISPATCH TELEMETRY
              </span>
              <h3 className="text-xl font-bold text-white mt-1">Live Order State Progression</h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
              WebSocket Sync Active (Sub-300ms)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-amber-400 font-bold">1. Placed (Pending)</span>
              <div className="text-white font-bold">Order #BP-4901</div>
              <div className="text-gray-400 text-[11px]">Table 4 • 2 items</div>
              <div className="text-gray-500 text-[10px]">Just now</div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-2">
              <span className="text-blue-400 font-bold">2. In Preparation</span>
              <div className="text-white font-bold">Order #BP-4899</div>
              <div className="text-gray-400 text-[11px]">Table 2 • 4 items</div>
              <div className="text-emerald-400 text-[10px]">Elapsed: 3m 42s</div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/50 space-y-2">
              <span className="text-emerald-400 font-bold">3. Ready for Pickup</span>
              <div className="text-white font-bold">Order #BP-4898</div>
              <div className="text-gray-400 text-[11px]">Counter (Takeaway)</div>
              <div className="text-emerald-300 text-[10px]">Ready: 45s ago</div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
              <span className="text-gray-400 font-bold">4. Fulfilled</span>
              <div className="text-white font-bold">Order #BP-4895</div>
              <div className="text-gray-400 text-[11px]">Table 8 • Settled</div>
              <div className="text-gray-500 text-[10px]">Completed</div>
            </div>
          </div>
        </div>

        {/* Section 3: FAQs */}
        <div className="mb-20 space-y-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              Frequently Asked Questions About Restaurant Order Management
            </h2>
            <p className="text-xs text-gray-400">Clear answers for operators handling high ticket volumes.</p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0D1612] border border-[#1E362B]">
                <h3 className="text-sm font-bold text-white mb-2">{f.q}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Connected Modules */}
        <div className="p-8 rounded-3xl bg-[#0D1612] border border-[#1E362B] mb-16">
          <h3 className="text-lg font-bold text-white mb-4">Connected BrewPluse Modules</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <Link href="/cafe-pos" className="p-3 rounded-xl bg-[#080E0B] border border-white/5 hover:border-emerald-500/40 text-gray-300 hover:text-white transition">
              • Cloud POS Billing →
            </Link>
            <Link href="/kitchen-display-system" className="p-3 rounded-xl bg-[#080E0B] border border-white/5 hover:border-emerald-500/40 text-gray-300 hover:text-white transition">
              • Kitchen KDS Screens →
            </Link>
            <Link href="/qr-ordering-system" className="p-3 rounded-xl bg-[#080E0B] border border-white/5 hover:border-emerald-500/40 text-gray-300 hover:text-white transition">
              • QR Table Ordering →
            </Link>
            <Link href="/pricing" className="p-3 rounded-xl bg-[#080E0B] border border-white/5 hover:border-emerald-500/40 text-gray-300 hover:text-white transition">
              • Transparent ₹0/mo Fees →
            </Link>
          </div>
        </div>

        {/* Section 5: Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Streamline Your Kitchen Order Flow Today
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Run BrewPluse on your existing tablets and computers with zero software subscription fees.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/signup"
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
            >
              Get Started Free →
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
