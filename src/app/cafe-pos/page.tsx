import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Cafe POS (CafePOS) Software & Billing System | Free Coffee Shop Point of Sale | BrewPluse",
  description: "Fast cloud cafe POS software (CafePOS) for coffee shops & bakeries. 2-tap billing, thermal KOT printing, offline mode & ₹0/month fees. Free setup today!",
  keywords: [
    'cafe pos',
    'cafepos',
    'cafe point of sale',
    'coffee shop pos',
    'cafe billing software',
    'free cafe pos',
    'restaurant pos',
    'kot printing pos',
  ],
  alternates: {
    canonical: 'https://brewpluse.com/cafe-pos',
  },
  openGraph: {
    title: "Cafe POS Software & Coffee Shop Billing System | BrewPluse",
    description: "Fast cloud cafe POS software (CafePOS) for coffee shops & bakeries. 2-tap billing, thermal KOT printing, offline mode & ₹0/month fees. Free setup today!",
    url: 'https://brewpluse.com/cafe-pos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cafe POS Software & Coffee Shop Billing System | BrewPluse",
    description: "Fast cloud cafe POS software (CafePOS) for coffee shops & bakeries. 2-tap billing, thermal KOT printing, offline mode & ₹0/month fees. Free setup today!",
  },
};

export default function CafePosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse Cafe POS (CafePOS) Software',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Windows, macOS, Android, iOS',
        description: 'High-speed point of sale billing software tailored for coffee shops, cafes, and bakeries with thermal receipt printing, recipe stock deductions, and table management.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        author: {
          '@type': 'Organization',
          name: 'BrewPluse',
          url: 'https://brewpluse.com',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://brewpluse.com' },
          { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://brewpluse.com/features' },
          { '@type': 'ListItem', position: 3, name: 'Cafe POS', item: 'https://brewpluse.com/cafe-pos' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What hardware does BrewPluse Cafe POS require?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BrewPluse runs on any device with a modern browser or Android app: Windows laptops, MacBooks, iPads, Android tablets, or all-in-one touch POS terminals. It connects seamlessly to standard 58mm/80mm USB, LAN, and Bluetooth thermal printers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does BrewPluse CafePOS work if the internet goes down?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. BrewPluse includes offline cash billing resiliency. Cashiers can continue to take orders and print receipts even during temporary Wi-Fi drops, with automatic cloud sync when connectivity restores.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there a monthly subscription fee for the Cafe POS?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. BrewPluse operates on a free tier model with ₹0/month software subscription fees, giving independent cafes enterprise-grade billing capabilities without recurring lock-in.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="w-full bg-[#FBFBFA] text-[#1a1715]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section */}
        <section className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#F6F5F2] border-b border-[#E7E5E0]">
          <div className="max-w-5xl mx-auto text-center">
            {/* Breadcrumb Navigation */}
            <nav className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 mb-6 bg-white px-3.5 py-1.5 rounded-full border border-[#E7E5E0] shadow-2xs">
              <Link className="hover:text-emerald-800 transition-colors" href="/">
                Home
              </Link>
              <span>/</span>
              <Link className="hover:text-emerald-800 transition-colors" href="/features">
                Features
              </Link>
              <span>/</span>
              <span className="text-emerald-800 font-bold">Cafe POS (CafePOS)</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-900 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              Rush-Hour Speed Counter Billing
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#141210] tracking-tight leading-[1.15] mb-5">
              Modern Cafe POS Software &amp;{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Billing System (CafePOS)
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] max-w-3xl mx-auto leading-relaxed mb-8">
              Engineered specifically for coffee shops, specialty roasters, bakeries, and QSR cafes. Ring up complex coffee modifiers in 2 taps, print instant thermal KOT receipts, connect to your <Link href="/kitchen-display-system" className="text-emerald-800 font-medium underline">Kitchen Display System</Link>, and manage tables with ₹0/month subscription fees.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Start Free Cafe POS Account</span>
                <span>→</span>
              </Link>
              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#F5F4F0] text-[#141210] text-sm font-semibold border border-[#DCD9D2] transition-all"
              >
                Launch Live POS Demo ↗
              </a>
            </div>

            {/* Quick Internal Sibling Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-500">
              <span>Related Solutions:</span>
              <Link href="/free-cafe-management-software" className="text-emerald-800 hover:underline">
                Free Cafe Software
              </Link>
              <span>•</span>
              <Link href="/restaurant-pos" className="text-emerald-800 hover:underline">
                Restaurant POS System
              </Link>
              <span>•</span>
              <Link href="/qr-ordering-system" className="text-emerald-800 hover:underline">
                QR Table Ordering
              </Link>
              <span>•</span>
              <Link href="/pricing" className="text-emerald-800 hover:underline">
                ₹0/Month Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-3">
                Built for Barista Ergonomics &amp; 3-Second Counter Throughput
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Generic retail POS software slows down coffee rush hours. BrewPluse CafePOS is purpose-built for fast-paced food and beverage service.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <span className="material-symbols-outlined text-[22px]">point_of_sale</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">2-Tap Rapid Billing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Add milk substitutions (Oat, Soy, Almond), syrup pumps, extra shots, and ice levels with one tap. Zero nested dropdown headaches during morning rush.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
                  <span className="material-symbols-outlined text-[22px]">print</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Instant Thermal KOT Printing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Connect ESC/POS 58mm and 80mm thermal receipt printers via USB, LAN, or Bluetooth. Route food items to the kitchen printer and espresso drinks to the barista station.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4 border border-blue-200">
                  <span className="material-symbols-outlined text-[22px]">wifi_off</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Offline Cash Resiliency</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Internet drops will never halt your cashier line. Ring up cash orders offline with automatic cloud synchronization as soon as connection is restored.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-4 border border-purple-200">
                  <span className="material-symbols-outlined text-[22px]">table_restaurant</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Visual Table Management</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Live color-coded floor plan showing vacant, occupied, running KOT, and billed tables. Seamlessly transition customers between counter and table seating.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center mb-4 border border-rose-200">
                  <span className="material-symbols-outlined text-[22px]">inventory_2</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Automated Recipe Inventory</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Every espresso shot, syrup pump, and pastry sold automatically deducts from your raw material stock via our <Link href="/cafe-management-software" className="text-emerald-800 font-semibold underline">Cafe Management Software</Link>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4 border border-teal-200">
                  <span className="material-symbols-outlined text-[22px]">qr_code_2</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Hybrid Counter + QR Sync</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Counter POS orders, waiter handheld orders, and <Link href="/qr-ordering-system" className="text-emerald-800 font-semibold underline">QR table orders</Link> all flow into one centralized stream and sync to the <Link href="/kitchen-display-system" className="text-emerald-800 font-semibold underline">Kitchen Display System</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight">
                Why Cafe Owners Choose BrewPluse Over Legacy POS
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white rounded-2xl shadow-xs border border-[#E7E5E0]">
                <thead>
                  <tr className="border-b border-[#E7E5E0] bg-[#FBFBFA] text-[11px] font-mono uppercase tracking-wider text-gray-500">
                    <th className="py-4 px-5">Feature / Metric</th>
                    <th className="py-4 px-5 text-emerald-800 font-bold bg-emerald-50/50">BrewPluse Cafe POS</th>
                    <th className="py-4 px-5">Legacy POS Systems</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE8E3] text-[#4a4642]">
                  <tr>
                    <td className="py-4 px-5 font-bold text-[#141210]">Monthly Software Fee</td>
                    <td className="py-4 px-5 text-emerald-800 font-black bg-emerald-50/50">₹0 / month forever</td>
                    <td className="py-4 px-5 text-red-600">₹1,500 – ₹3,500 / month</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-5 font-bold text-[#141210]">Hardware Lock-in</td>
                    <td className="py-4 px-5 text-emerald-800 font-bold bg-emerald-50/50">Runs on ANY Laptop, iPad, Phone</td>
                    <td className="py-4 px-5 text-gray-600">Expensive Proprietary Terminals</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-5 font-bold text-[#141210]">Integrated QR Table Orders</td>
                    <td className="py-4 px-5 text-emerald-800 font-bold bg-emerald-50/50">Included Free</td>
                    <td className="py-4 px-5 text-gray-600">Paid Add-on (₹500+/mo)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-5 font-bold text-[#141210]">Kitchen Display (KDS)</td>
                    <td className="py-4 px-5 text-emerald-800 font-bold bg-emerald-50/50">Included &amp; Real-time</td>
                    <td className="py-4 px-5 text-gray-600">Expensive Extra License</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-5 font-bold text-[#141210]">Recipe Inventory Deductions</td>
                    <td className="py-4 px-5 text-emerald-800 font-bold bg-emerald-50/50">Automatic per drink/dish</td>
                    <td className="py-4 px-5 text-gray-600">Enterprise Tiers Only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight">
                Frequently Asked Questions About Cafe POS
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0]">
                <h3 className="text-base font-bold text-[#141210] mb-2">
                  What hardware does BrewPluse Cafe POS require?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  BrewPluse runs on any device with a modern browser or Android app: Windows laptops, MacBooks, iPads, Android tablets, or all-in-one touch POS terminals. It connects seamlessly to standard 58mm/80mm USB, LAN, and Bluetooth thermal printers.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0]">
                <h3 className="text-base font-bold text-[#141210] mb-2">
                  Does BrewPluse POS work if the internet goes down?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Yes. BrewPluse includes offline cash billing resiliency. Cashiers can continue to take orders and print receipts even during temporary Wi-Fi drops, with automatic cloud sync when connectivity restores.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0]">
                <h3 className="text-base font-bold text-[#141210] mb-2">
                  Can I split bills or handle multiple payment modes?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Yes. You can split bills evenly or by item across cash, UPI, credit cards, or digital customer wallet balance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Mesh: Connected Systems */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-[#141210] mb-6 text-center sm:text-left">
              Connected Systems in the BrewPluse Hospitality Ecosystem
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/kitchen-display-system"
              >
                <div className="text-xs font-mono font-bold text-blue-800 uppercase mb-1">Kitchen Queue</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-blue-900 mb-1">
                  Kitchen Display (KDS) →
                </h3>
                <p className="text-[11px] text-gray-500">
                  Paperless order routing with color-coded timers for chefs &amp; baristas.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/qr-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1">Self Ordering</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-amber-900 mb-1">
                  QR Ordering System →
                </h3>
                <p className="text-[11px] text-gray-500">
                  Allow table customers to self-order and pay via UPI instantly.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/restaurant-pos"
              >
                <div className="text-xs font-mono font-bold text-purple-800 uppercase mb-1">Dining Management</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-purple-900 mb-1">
                  Restaurant POS System →
                </h3>
                <p className="text-[11px] text-gray-500">
                  Full dining room floor management, seat transfers &amp; split billing.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/cafe-management-software"
              >
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">Full Operations</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-emerald-900 mb-1">
                  Cafe Management Software →
                </h3>
                <p className="text-[11px] text-gray-500">
                  End-to-end recipe stock, shift reports, and multi-channel telemetry.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b120e] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Start Billing on BrewPluse Cafe POS Today
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8">
              Join hundreds of independent cafes and coffee shops. Set up your menu and start printing KOT receipts in 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0b2b1a] text-sm font-bold shadow-xl transition-all hover:scale-[1.02]"
              >
                Create Free Account →
              </Link>
              <Link
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-all"
                href="/how-to-use"
              >
                Read Setup Guide
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
