import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Cafe Management Software & POS System | All-in-One Cafe Operating System | BrewPluse",
  description: "The complete all-in-one cafe management software (CafePOS). Cloud POS, QR table ordering, kitchen KDS, recipe inventory tracking, customer loyalty, and ₹0/month subscription.",
  keywords: [
    'cafe management software',
    'cafe pos',
    'cafepos',
    'free cafe management software',
    'coffee shop pos software',
    'cafe billing system',
    'cafe inventory management',
    'restaurant management software',
  ],
  alternates: {
    canonical: 'https://brewpluse.com/cafe-management-software',
  },
};

export default function CafeManagementSoftwarePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse Cafe Management Software',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Windows, macOS, Android, iOS',
        description: 'Complete all-in-one operating platform for cafes and coffee shops combining POS billing, QR dine-in ordering, live KDS, recipe inventory, and sales analytics.',
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
          { '@type': 'ListItem', position: 3, name: 'Cafe Management Software', item: 'https://brewpluse.com/cafe-management-software' },
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
              <span className="text-emerald-800 font-bold">Cafe Management</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Complete Cafe Operating System
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#141210] tracking-tight leading-[1.15] mb-5">
              All-in-One Cafe Management Software &amp;{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                POS System (CafePOS)
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] max-w-3xl mx-auto leading-relaxed mb-8">
              Run your entire coffee shop, bakery, or tea room from one intuitive platform: high-speed <Link href="/cafe-pos" className="text-emerald-800 font-medium underline">Cafe POS billing</Link>, contactless <Link href="/qr-ordering-system" className="text-emerald-800 font-medium underline">table QR codes</Link>, paperless <Link href="/kitchen-display-system" className="text-emerald-800 font-medium underline">kitchen displays (KDS)</Link>, and automated recipe inventory with ₹0/month software fees.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Start Free Cafe Software</span>
                <span>→</span>
              </Link>
              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#F5F4F0] text-[#141210] text-sm font-semibold border border-[#DCD9D2] transition-all"
              >
                Explore Live Demo ↗
              </a>
            </div>

            {/* Quick Internal Sibling Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-500">
              <span>Explore:</span>
              <Link href="/free-cafe-management-software" className="text-emerald-800 hover:underline">
                Free Cafe Tier
              </Link>
              <span>•</span>
              <Link href="/cafe-pos" className="text-emerald-800 hover:underline">
                Cafe POS (CafePOS)
              </Link>
              <span>•</span>
              <Link href="/restaurant-management-software" className="text-emerald-800 hover:underline">
                Restaurant Management Software
              </Link>
              <span>•</span>
              <Link href="/pricing" className="text-emerald-800 hover:underline">
                Transparent Pricing
              </Link>
            </div>
          </div>
        </section>

        {/* 6 Pillars */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-3">
                The 6 Pillars of BrewPluse Management Architecture
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Stop juggling 5 different subscription tools. Unify your front-of-house, kitchen, and back-office operations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <span className="material-symbols-outlined text-[22px]">point_of_sale</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">1. Cloud POS Billing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  2-tap rapid ordering, milk &amp; syrup customization, thermal KOT printing, and offline cash resiliency on our <Link href="/cafe-pos" className="text-emerald-800 underline font-semibold">Cafe POS</Link>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
                  <span className="material-symbols-outlined text-[22px]">qr_code_2</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">2. QR Table Ordering</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Instant visual menus, contactless guest ordering, and UPI payments directly from table stickers via our <Link href="/qr-ordering-system" className="text-amber-800 underline font-semibold">QR Ordering System</Link>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4 border border-blue-200">
                  <span className="material-symbols-outlined text-[22px]">skillet</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">3. Kitchen Display (KDS)</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Paperless kitchen and barista order queue with color-coded preparation timers and audio alerts on any tablet screen with <Link href="/kitchen-display-system" className="text-blue-800 underline font-semibold">BrewPluse KDS</Link>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-4 border border-purple-200">
                  <span className="material-symbols-outlined text-[22px]">inventory_2</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">4. Recipe Stock Tracking</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Automatic ingredient-level deductions for coffee beans, dairy, syrups, and packaging per sale to stop food waste and shrinkage.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center mb-4 border border-rose-200">
                  <span className="material-symbols-outlined text-[22px]">military_tech</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">5. Loyalty &amp; AI Reviews</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Digital customer stamp cards and automated 1-tap Google Review booster to attract local foot traffic.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4 border border-teal-200">
                  <span className="material-symbols-outlined text-[22px]">insights</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">6. Daily Telemetry &amp; Reports</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Comprehensive analytics on peak hours, item profit margins, staff shifts, and revenue trends across your outlets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Mesh */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-[#141210] mb-6 text-center sm:text-left">
              Explore Dedicated Cafe &amp; Restaurant Solutions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/cafe-pos"
              >
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">Counter Billing</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-emerald-900 mb-1">
                  Cafe POS Software (CafePOS) →
                </h3>
                <p className="text-[11px] text-gray-500">Fast 2-tap billing and thermal KOT receipts.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/qr-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1">Self Ordering</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-amber-900 mb-1">
                  QR Ordering System →
                </h3>
                <p className="text-[11px] text-gray-500">Contactless table QR code dining.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/kitchen-display-system"
              >
                <div className="text-xs font-mono font-bold text-blue-800 uppercase mb-1">Kitchen Queue</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-blue-900 mb-1">
                  Kitchen Display (KDS) →
                </h3>
                <p className="text-[11px] text-gray-500">Paperless order routing for cooks and baristas.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/digital-menu"
              >
                <div className="text-xs font-mono font-bold text-purple-800 uppercase mb-1">Interactive Menu</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-purple-900 mb-1">
                  Digital Menu System →
                </h3>
                <p className="text-[11px] text-gray-500">Live item availability, photos, and allergen tags.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b120e] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Transform Your Cafe Operations Today
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8">
              Create your free cafe profile in 30 seconds. No setup fees, no monthly software retainers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0b2b1a] text-sm font-bold shadow-xl transition-all hover:scale-[1.02]"
              >
                Get Started Free →
              </Link>
              <Link
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-all"
                href="/pricing"
              >
                View Transparent Pricing
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
