import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Best Free POS Software for Small Restaurants & Cafes in India (2026) | BrewPluse',
  description:
    'Discover the best free POS software for small restaurants and cafes in India. Dynamic UPI QR billing, 5% GST tax invoices, thermal KOT printing, and ₹0/month software fees.',
  alternates: {
    canonical: 'https://brewpluse.com/best-free-pos-software-india',
  },
  openGraph: {
    title: 'Best Free POS Software for Small Restaurants in India (2026) | BrewPluse',
    description:
      'India-specific restaurant billing software with dynamic UPI QR generation, 5% GST calculation, ESC/POS thermal printing, and zero monthly subscriptions.',
    url: 'https://brewpluse.com/best-free-pos-software-india',
    type: 'website',
  },
};

export default function BestFreePosSoftwareIndiaPage() {
  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient radial glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>INDIA HOSPITALITY BENCHMARK • 2026 EDITION</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Best Free POS Software for <span className="text-emerald-400">Restaurants in India.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Engineered specifically for the fast-paced Indian food and beverage industry: dynamic UPI QR billing, 5% restaurant GST compliance, ESC/POS thermal receipt printing, and zero monthly software retainers.
          </p>
        </div>

        {/* Core Pillars for Indian Restaurants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-7 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3">
            <span className="text-3xl">🇮🇳</span>
            <h3 className="text-lg font-bold text-white">Dynamic UPI QR Billing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Generate dynamic UPI QR codes per order directly on customer bill slips and table screens. Diners scan via GPay, PhonePe, Paytm, or BHIM for instant reconciliation.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3">
            <span className="text-3xl">🧾</span>
            <h3 className="text-lg font-bold text-white">GST 5% &amp; 18% Compliance</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Auto-split CGST and SGST on itemized bills, configure HSN codes, and export GST-ready Excel reports for your chartered accountant in one click.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3">
            <span className="text-3xl">🖨️</span>
            <h3 className="text-lg font-bold text-white">58mm &amp; 80mm ESC/POS Printing</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Connect wirelessly to Bluetooth or USB thermal receipt printers (TVS, Rongta, Everycom) without installing clunky Windows printer spoolers.
            </p>
          </div>
        </div>

        {/* Comparison Table vs Traditional Indian Billing Softwares */}
        <div className="p-8 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl mb-16 space-y-6">
          <h3 className="text-2xl font-bold text-white">
            BrewPluse vs. Traditional Indian Billing Software
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-mono">
              <thead>
                <tr className="border-b border-[#1E362B] text-gray-400 uppercase text-[11px]">
                  <th className="pb-3">Capability</th>
                  <th className="pb-3 text-emerald-400 font-bold">BrewPluse OS</th>
                  <th className="pb-3">Legacy Desktop Billing</th>
                  <th className="pb-3">Traditional SaaS (Petpooja)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E362B] text-gray-300 text-xs">
                <tr>
                  <td className="py-3.5 font-bold text-white">Software License Fee</td>
                  <td className="py-3.5 text-emerald-400 font-bold">₹0 / month forever</td>
                  <td className="py-3.5">₹15,000 one-time</td>
                  <td className="py-3.5">₹12,000 – ₹20,000 / year</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">Annual Maintenance (AMC)</td>
                  <td className="py-3.5 text-emerald-400 font-bold">₹0 (Zero AMC)</td>
                  <td className="py-3.5">₹3,000 – ₹5,000/yr</td>
                  <td className="py-3.5">₹3,000 – ₹6,000/yr</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">QR Table Ordering</td>
                  <td className="py-3.5 text-emerald-400 font-bold">Included Free</td>
                  <td className="py-3.5 text-rose-400">✕ None</td>
                  <td className="py-3.5">Paid Add-on (₹5k+)</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">Paperless KDS</td>
                  <td className="py-3.5 text-emerald-400 font-bold">Included Free</td>
                  <td className="py-3.5 text-rose-400">✕ None</td>
                  <td className="py-3.5">Paid Add-on (₹5k+)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA Section */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Start Your Cafe in India with Zero Software Retainers
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Test the live sandbox demo right now or sign up in 60 seconds.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/demo"
              className="py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
            >
              Test Live Interactive Demo →
            </Link>
            <Link
              href="/signup"
              className="py-3.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Launch Store Free
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
