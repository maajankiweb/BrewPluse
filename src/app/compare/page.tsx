import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BrewPluse vs Petpooja, Posist & SlickPOS (2026 Comparison)',
  description:
    'Factual, objective comparison of restaurant POS software: BrewPluse vs Petpooja, Posist (Restroworks), SlickPOS, and traditional desktop billing. Compare features, true TCO, and zero subscription pricing.',
  alternates: {
    canonical: 'https://brewpluse.com/compare',
  },
  openGraph: {
    title: 'BrewPluse vs Petpooja, Posist & SlickPOS (2026 Comparison) | BrewPluse',
    description:
      'Compare modern cafe POS platforms: BrewPluse vs Petpooja, Posist, and SlickPOS. Discover feature matrices, true TCO, and zero subscription pricing.',
    url: 'https://brewpluse.com/compare',
    type: 'website',
  },
};

export default function ComparePage() {
  const comparisonData = [
    {
      feature: 'Monthly Software Subscription',
      brewpluse: '₹0 / month forever',
      petpooja: '₹12,000 – ₹20,000 / year',
      posist: '₹25,000 – ₹60,000 / year',
      slickpos: '₹1,500 – ₹2,500 / month',
      traditional: '₹15,000 one-time + AMC',
    },
    {
      feature: 'Per-Order Micro-Fee',
      brewpluse: '₹1 (Payer choice: Diner or Cafe)',
      petpooja: '₹0 per order (High annual fee)',
      posist: '₹0 per order (High annual fee)',
      slickpos: '₹0 per order (High monthly fee)',
      traditional: '₹0 per order',
    },
    {
      feature: 'Contactless QR Table Ordering',
      brewpluse: '✓ Included Free (With GPS Geofence)',
      petpooja: '₹5,000 – ₹8,000/yr Add-on',
      posist: '₹10,000+/yr Add-on',
      slickpos: 'Paid Add-on',
      traditional: '✕ Not Available',
    },
    {
      feature: 'Paperless Kitchen Display (KDS)',
      brewpluse: '✓ Included Free (Unlimited Screens)',
      petpooja: '₹5,000/yr Add-on',
      posist: '₹12,000/yr Add-on',
      slickpos: 'Paid Add-on',
      traditional: '✕ Paper KOT Only',
    },
    {
      feature: 'Hardware Requirement',
      brewpluse: '100% BYOD (Runs on any iPad, Phone, PC)',
      petpooja: 'Windows PC or Android Terminal',
      posist: 'Enterprise Terminals Recommended',
      slickpos: 'Android or Windows',
      traditional: 'Proprietary Billing Machine',
    },
    {
      feature: 'Thermal Receipt Printing',
      brewpluse: '✓ Direct Web Bluetooth & USB (58/80mm)',
      petpooja: '✓ USB / LAN Windows Drivers',
      posist: '✓ Network Spooler Required',
      slickpos: '✓ Bluetooth & USB',
      traditional: '✓ Built-in Matrix / Thermal',
    },
    {
      feature: 'Interactive Live Sandbox Demo',
      brewpluse: '✓ Full Live Simulation (/demo)',
      petpooja: '✕ Sales Rep Demo Required',
      posist: '✕ Enterprise Demo Required',
      slickpos: '✕ 14-day Signup Required',
      traditional: '✕ No Online Demo',
    },
    {
      feature: 'Annual Maintenance Contract (AMC)',
      brewpluse: '₹0 (Zero AMC)',
      petpooja: '₹3,000 – ₹6,000 / year',
      posist: '₹5,000 – ₹10,000 / year',
      slickpos: 'Included in monthly fee',
      traditional: '₹2,500 – ₹5,000 / year',
    },
    {
      feature: 'Contract Lock-In',
      brewpluse: '0 Months (Export data & leave anytime)',
      petpooja: '12 Months upfront',
      posist: '12–36 Months upfront',
      slickpos: '1–12 Months',
      traditional: 'Hardware depreciation',
    },
  ];

  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient radial glow */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>OBJECTIVE PLATFORM BENCHMARK</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            BrewPluse vs. Leading <span className="text-emerald-400">Restaurant POS Systems.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            An honest, transparent evaluation of restaurant billing software, feature matrices, and total cost of ownership across India&apos;s leading hospitality platforms.
          </p>
        </div>

        {/* 3-Year TCO Summary Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0D1612] via-[#122319] to-[#0D1612] border border-emerald-500/30 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              3-YEAR TOTAL COST OF OWNERSHIP (TCO)
            </span>
            <h3 className="text-2xl font-bold text-white">
              Save up to ₹72,000 over 3 years with BrewPluse
            </h3>
            <p className="text-xs text-gray-300 max-w-xl">
              Traditional POS vendors charge upfront licenses, mandatory annual maintenance contracts (AMCs), and paid add-on modules for KDS and QR menus.
            </p>
          </div>
          <Link
            href="/demo"
            className="py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shrink-0"
          >
            Try Live Interactive Demo →
          </Link>
        </div>

        {/* Comprehensive Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-[#1E362B] bg-[#0D1612] shadow-2xl mb-16">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#1E362B] bg-[#13201A] text-gray-300 font-mono text-xs uppercase">
                <th className="p-4 sm:p-5">Capability / Metric</th>
                <th className="p-4 sm:p-5 text-emerald-400 font-bold bg-emerald-950/20">BrewPluse OS</th>
                <th className="p-4 sm:p-5">Petpooja</th>
                <th className="p-4 sm:p-5">Posist (Restroworks)</th>
                <th className="p-4 sm:p-5">SlickPOS</th>
                <th className="p-4 sm:p-5">Desktop POS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E362B] text-gray-300">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4 sm:p-5 font-semibold text-white whitespace-nowrap">
                    {row.feature}
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-300 font-bold bg-emerald-950/20 whitespace-nowrap">
                    {row.brewpluse}
                  </td>
                  <td className="p-4 sm:p-5 text-gray-400 whitespace-nowrap">{row.petpooja}</td>
                  <td className="p-4 sm:p-5 text-gray-400 whitespace-nowrap">{row.posist}</td>
                  <td className="p-4 sm:p-5 text-gray-400 whitespace-nowrap">{row.slickpos}</td>
                  <td className="p-4 sm:p-5 text-gray-400 whitespace-nowrap">{row.traditional}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detailed Breakdown Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              1
            </div>
            <h4 className="text-lg font-bold text-white">Why Independent Cafes Pick BrewPluse</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              BrewPluse requires zero capital upfront. You run on hardware you already own (iPads, Android tablets, laptops), ring up bills with 2 taps, and dispatch orders to the kitchen instantly.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              2
            </div>
            <h4 className="text-lg font-bold text-white">When Petpooja / Posist Make Sense</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Massive 50+ outlet international enterprise chains requiring proprietary legacy ERP connectors and custom SAP integrations may find enterprise platforms tailored to their IT staff.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              3
            </div>
            <h4 className="text-lg font-bold text-white">The ₹0/Month Advantage</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              You never pay a software subscription fee. The ₹1 order fee can be absorbed by the cafe or passed to customers as a small convenience fee, keeping your fixed monthly expenses at zero.
            </p>
          </div>
        </div>

        {/* Final CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-3xl font-extrabold text-white">
            Experience the Modern Operating System Today
          </h3>
          <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
            Test our live sandbox demo with full interactive POS billing, KDS tickets, and table QR ordering—no signup or credit card required.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/demo"
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg"
            >
              Launch Live Sandbox Demo →
            </Link>
            <Link
              href="/signup"
              className="py-3.5 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Start Free in 5 Minutes
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
