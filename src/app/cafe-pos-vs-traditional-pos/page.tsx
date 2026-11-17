import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cafe POS vs Traditional POS: What Modern Coffee Shops Need to Know | BrewPluse',
  description:
    'Compare modern cloud-native cafe platforms against legacy on-premise desktop terminals across speed, table technology, hardware freedom, and total operating cost.',
  alternates: {
    canonical: 'https://brewpluse.com/cafe-pos-vs-traditional-pos',
  },
  openGraph: {
    title: 'Cafe POS vs Traditional POS: Architectural & Cost Comparison',
    description:
      'Cloud POS vs Traditional POS comparison for cafes and restaurants. Discover how cloud architecture cuts hardware expenses, automates backups, and boosts table turnover.',
    url: 'https://brewpluse.com/cafe-pos-vs-traditional-pos',
    type: 'website',
  },
};

export default function CafePosVsTraditionalPosPage() {
  return (
    <div className="bg-[#F7F5EC] text-[#0B1714] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'Cafe POS vs Traditional POS: What Modern Coffee Shops Need to Know',
            description:
              'A complete comparison between cloud cafe POS platforms and traditional on-premise cash registers across hardware, licensing, KDS, and table tech.',
            publisher: {
              '@type': 'Organization',
              name: 'BrewPluse',
              url: 'https://brewpluse.com',
            },
          }),
        }}
      />

      {/* Section 1: Header / Decision Intro */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#DDE3DD]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D23]/10 text-[#002D23] text-xs font-semibold mb-6">
          <span className="material-symbols-outlined text-[16px]">compare_arrows</span>
          <span>Architectural Comparison &amp; Decision Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#002D23] mb-6 leading-tight">
          Cafe POS vs Traditional POS: What Modern Coffee Shops Need to Know
        </h1>
        <p className="text-lg sm:text-xl text-[#4A5550] leading-relaxed mb-8">
          The restaurant technology landscape has fundamentally shifted. Compare how modern cloud-native cafe platforms stack up against legacy on-premise desktop terminals across speed, table technology, hardware freedom, and total operating cost.
        </p>
        <div className="bg-[#FFFEFA] border-l-4 border-[#002D23] p-6 rounded-r-2xl shadow-sm">
          <p className="text-base text-[#0B1714] leading-relaxed">
            <strong>Key Finding:</strong> While traditional desktop POS systems excel at simple offline cash registry functions, they struggle with omnichannel workflows (QR menus, mobile waiter tablets, live kitchen screens). Cloud cafe systems like BrewPluse offer unified real-time data sync across all customer and kitchen touchpoints with zero subscription overhead.
          </p>
        </div>
      </section>

      {/* Section 2: Side-by-side Table & 3-Year TCO Breakdown */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002D23] mb-6">1. Side-by-Side Architectural Breakdown</h2>
          <div className="overflow-x-auto border border-[#DDE3DD] rounded-2xl bg-[#FFFEFA]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#002D23] text-[#F7F5EC] uppercase font-mono text-xs">
                <tr>
                  <th className="p-4">Dimension</th>
                  <th className="p-4">Modern Cloud Cafe POS (BrewPluse)</th>
                  <th className="p-4">Traditional On-Premise POS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDE3DD] text-[#4A5550]">
                <tr>
                  <td className="p-4 font-bold text-[#0B1714]">Deployment Model</td>
                  <td className="p-4 text-[#002D23] font-bold">Cloud-native; browser-accessible anywhere</td>
                  <td className="p-4">Local desktop executable on fixed PC</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#0B1714]">Hardware Requirements</td>
                  <td className="p-4 text-emerald-700 font-bold">Any laptop, iPad, Android tablet, smartphone</td>
                  <td className="p-4 text-red-600">Bulky proprietary POS touch terminals</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#0B1714]">QR Table Ordering</td>
                  <td className="p-4 text-emerald-700 font-bold">Built-in; live sync with KDS &amp; POS</td>
                  <td className="p-4 text-red-600">Requires third-party integration or unsupported</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#0B1714]">Kitchen Display System</td>
                  <td className="p-4 text-emerald-700 font-bold">Paperless KDS on any wall-mounted tablet</td>
                  <td className="p-4 text-red-600">Noisy physical impact paper printers</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#0B1714]">Remote Analytics</td>
                  <td className="p-4 text-emerald-700 font-bold">Real-time telemetry on owner&apos;s phone</td>
                  <td className="p-4 text-red-600">Must be physically at the shop to pull reports</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-[#0B1714]">Software Subscription</td>
                  <td className="p-4 text-emerald-700 font-bold">₹0 / month software subscription forever</td>
                  <td className="p-4 text-red-600">₹1,500 – ₹5,000 / month ongoing license</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3-Year Projection */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002D23] mb-6">2. The True Cost of Ownership: 3-Year Projection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-700 mb-3 flex items-center gap-2">
                <span>Traditional POS (3 Years)</span>
              </h3>
              <ul className="space-y-2 text-sm text-[#4A5550]">
                <li>• Proprietary Touch Terminal: ₹45,000</li>
                <li>• Software Licenses (₹2,500/mo x 36): ₹90,000</li>
                <li>• Annual Support &amp; Maintenance: ₹15,000</li>
                <li>• KDS Add-on License: ₹25,000</li>
                <li className="pt-2 border-t font-bold text-[#0B1714]">Total 3-Year Cost: ~₹1,75,000+</li>
              </ul>
            </div>

            <div className="bg-[#FFFEFA] border-2 border-[#002D23] rounded-xl p-6 relative">
              <span className="absolute top-3 right-3 bg-[#002D23] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                BrewPluse
              </span>
              <h3 className="text-lg font-bold text-[#002D23] mb-3 flex items-center gap-2">
                <span>BrewPluse Cloud POS (3 Years)</span>
              </h3>
              <ul className="space-y-2 text-sm text-[#4A5550]">
                <li>• Hardware: Use existing laptop/tablet (₹0)</li>
                <li>• Software Subscription: ₹0 / month forever</li>
                <li>• KDS &amp; QR Table Ordering: Included Free (₹0)</li>
                <li>• Order-Level Micro Fees: Pay-as-you-grow</li>
                <li className="pt-2 border-t font-bold text-[#002D23]">Total Fixed Software Cost: ₹0</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#002D23] text-[#F7F5EC] rounded-2xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Switch to Modern Cafe Technology Without Capital Risk</h2>
          <p className="text-sm sm:text-base text-[#DDE3DD] leading-relaxed mb-6">
            Migrating from a legacy system to BrewPluse takes under 5 minutes. Import your menu, connect your receipt printer, and start taking orders with zero upfront commitments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#B99A5B] text-[#002D23] font-bold hover:bg-[#d3b677] transition-all"
            >
              Start Free Cafe Account →
            </Link>
            <Link
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
              href="/pricing"
            >
              Learn More About Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
