import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Free Restaurant POS Software & Billing System | Cloud POS for Restaurants (Resturant POS) | BrewPluse",
  description: "Get full-featured free restaurant POS software (Resturant POS). Table floor plans, split checks, thermal KOT printing, kitchen display screens, and inventory with ₹0/month software fees.",
  keywords: [
    'free restaurant pos',
    'resturant pos',
    'restaurant pos',
    'free restaurant pos software',
    'free cafe pos',
    'cloud restaurant billing',
    'zero monthly pos',
  ],
};

export default function FreeRestaurantPosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse Free Restaurant POS',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Windows, macOS, Android, iOS',
        description: 'Free cloud restaurant POS billing software for dining rooms, bars, and QSRs with zero monthly software fees.',
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
          { '@type': 'ListItem', position: 3, name: 'Free Restaurant POS', item: 'https://brewpluse.com/free-restaurant-pos' },
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
              <span className="text-emerald-800 font-bold">Free Restaurant POS</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              ₹0 / Month Software Subscription
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#141210] tracking-tight leading-[1.15] mb-5">
              100% Free Restaurant POS Software &amp;{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Billing System
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] max-w-3xl mx-auto leading-relaxed mb-8">
              Complete cloud restaurant POS system: visual table management, split checks, thermal KOT printing, and paperless <Link href="/kitchen-display-system" className="text-emerald-800 font-medium underline">kitchen display screens</Link> with ₹0/month software subscription.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Start Free Restaurant POS</span>
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

            {/* Quick Sibling Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-500">
              <span>Related Solutions:</span>
              <Link href="/restaurant-pos" className="text-emerald-800 hover:underline">
                Full Restaurant POS
              </Link>
              <span>•</span>
              <Link href="/free-cafe-management-software" className="text-emerald-800 hover:underline">
                Free Cafe Software
              </Link>
              <span>•</span>
              <Link href="/cafe-pos" className="text-emerald-800 hover:underline">
                Cafe POS (CafePOS)
              </Link>
              <span>•</span>
              <Link href="/pricing" className="text-emerald-800 hover:underline">
                Pricing Details
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Capabilities */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-3">
                Full Restaurant Capability with Zero Software Cost
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4 border border-blue-200">
                  <span className="material-symbols-outlined text-[22px]">table_bar</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Table Floor Management</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Live color-coded floor map showing occupied, vacant, and billed tables with seat transfers and split checks on your <Link href="/restaurant-pos" className="text-blue-800 underline font-semibold">Restaurant POS</Link>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
                  <span className="material-symbols-outlined text-[22px]">print</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Thermal KOT Printing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Route appetizer and main dish tickets directly to kitchen printers over LAN, USB, or Bluetooth without expensive terminal lock-in.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <span className="material-symbols-outlined text-[22px]">skillet</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Kitchen Display (KDS)</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Paperless kitchen ticket display with color-coded preparation timers and audio alerts for chefs on <Link href="/kitchen-display-system" className="text-emerald-800 underline font-semibold">BrewPluse KDS</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Mesh: Related Solutions */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-[#141210] mb-6 text-center sm:text-left">
              Related BrewPluse Restaurant Solutions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/restaurant-pos"
              >
                <div className="text-xs font-mono font-bold text-blue-800 uppercase mb-1">POS Billing</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-blue-900 mb-1">
                  Restaurant POS System →
                </h3>
                <p className="text-[11px] text-gray-500">Floor layout, split checks, and inventory.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/staff-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1">Handheld Tablets</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-amber-900 mb-1">
                  Staff Waiter Ordering →
                </h3>
                <p className="text-[11px] text-gray-500">Take table orders on handheld smartphones.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/kitchen-display-system"
              >
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">Kitchen Queue</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-emerald-900 mb-1">
                  Kitchen Display (KDS) →
                </h3>
                <p className="text-[11px] text-gray-500">Live order queue with color-coded timers.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/qr-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-purple-800 uppercase mb-1">Self Ordering</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-purple-900 mb-1">
                  QR Ordering System →
                </h3>
                <p className="text-[11px] text-gray-500">Table QR code ordering with instant UPI.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b120e] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Start Your Restaurant Free Today
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8">
              No credit card required. No upfront hardware lock-in.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0b2b1a] text-sm font-bold shadow-xl transition-all hover:scale-[1.02]"
              >
                Start Free Account →
              </Link>
              <Link
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-all"
                href="/pricing"
              >
                Pricing Details
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
