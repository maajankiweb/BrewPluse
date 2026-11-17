import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Restaurant & Cafe Inventory Management Software | BrewPluse',
  description:
    'Real-time restaurant recipe inventory management: automatic raw material decrementing per dish, coffee bean and milk wastage tracking, low stock alerts, and ₹0/month software fees.',
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-inventory-management-software',
  },
  openGraph: {
    title: 'Restaurant & Cafe Inventory Management Software | BrewPluse',
    description:
      'Track coffee beans, dairy, packaging, and raw ingredient consumption automatically with BrewPluse Cafe POS inventory tracking.',
    url: 'https://brewpluse.com/restaurant-inventory-management-software',
    type: 'website',
  },
};

export default function RestaurantInventoryPage() {
  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient radial glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>RAW MATERIAL &amp; RECIPE CONTROL</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Cafe &amp; Restaurant <span className="text-emerald-400">Inventory Management.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Stop shrinkage, track milk wastage, and automate ingredient deductions on every coffee cup and dish served—without paying thousands for complex standalone inventory ERPs.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-7 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3">
            <span className="text-3xl">☕</span>
            <h3 className="text-lg font-bold text-white">Recipe-Level Deductions</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Link menu items to ingredient bills of materials (e.g. 18g specialty coffee beans + 180ml whole milk per Flat White). Raw stock decrements automatically when the order is fulfilled.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3">
            <span className="text-3xl">⚠️</span>
            <h3 className="text-lg font-bold text-white">Low Stock Safety Alerts</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Set minimum reorder thresholds for high-velocity supplies like dairy, syrups, beans, and takeaway cups. Get instant dashboard warnings before you run out during rush hours.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-[#0D1612] border border-[#1E362B] space-y-3">
            <span className="text-3xl">📊</span>
            <h3 className="text-lg font-bold text-white">Wastage &amp; Variance Audits</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Compare theoretical ingredient consumption against actual physical inventory counts. Identify barista spillage, prep errors, and internal shrinkage immediately.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Take Control of Your Kitchen Margins Today
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            All inventory tracking tools are included in BrewPluse with ₹0/month software fees.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/demo"
              className="py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
            >
              Test Live Sandbox Demo →
            </Link>
            <Link
              href="/signup"
              className="py-3.5 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Start Free Today
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
