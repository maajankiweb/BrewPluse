import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Staff & Waiter Handheld Mobile POS",
  description: "Equip waitstaff with handheld table ordering on any smartphone or tablet. Fire instant KOTs to kitchen KDS screens and accelerate cafe table turns.",
  keywords: [
    'staff ordering system',
    'waiter ordering system',
    'handheld table ordering app',
    'mobile waiter pos',
    'restaurant pos waiter',
    'cafe waiter app',
    'table-side ordering',
    'cloud restaurant pos',
  ],
  alternates: {
    canonical: 'https://brewpluse.com/staff-ordering-system',
  },
  openGraph: {
    title: "Staff & Waiter Handheld Mobile POS | BrewPluse",
    description: "Equip waitstaff with handheld table ordering on any smartphone or tablet. Fire instant KOTs to kitchen KDS screens and accelerate cafe table turns.",
    url: 'https://brewpluse.com/staff-ordering-system',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Staff & Waiter Handheld Mobile POS | BrewPluse",
    description: "Equip waitstaff with handheld table ordering on any smartphone or tablet. Fire instant KOTs to kitchen KDS screens and accelerate cafe table turns.",
  },
};

export default function StaffOrderingSystemPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse Staff & Waiter Ordering System',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Android, iOS, Web',
        description: 'Mobile handheld order taking app for restaurant and cafe waitstaff with table status tracking, course sequencing, and instant KOT firing.',
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
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '128',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://brewpluse.com' },
          { '@type': 'ListItem', position: 2, name: 'Features', item: 'https://brewpluse.com/features' },
          { '@type': 'ListItem', position: 3, name: 'Staff Ordering System', item: 'https://brewpluse.com/staff-ordering-system' },
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
              <span className="text-emerald-800 font-bold">Staff Ordering</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Table-Side Mobility
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#141210] tracking-tight leading-[1.15] mb-5">
              Staff &amp; Waiter Ordering System for{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Faster Service
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] max-w-3xl mx-auto leading-relaxed mb-8">
              Empower your servers to take orders on any Android phone, iPad, or tablet directly at the customer's table. Orders fire instantly to the <Link href="/kitchen-display-system" className="text-emerald-800 font-medium underline">Kitchen Display System (KDS)</Link> and sync seamlessly to the <Link href="/restaurant-pos" className="text-emerald-800 font-medium underline">Restaurant POS</Link> counter, cutting dining turnaround times by 40%.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Enable Staff Ordering Free</span>
                <span>→</span>
              </Link>
              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#F5F4F0] text-[#141210] text-sm font-semibold border border-[#DCD9D2] transition-all"
              >
                View Live Demo ↗
              </a>
            </div>

            {/* Quick Sibling Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-500">
              <span>Related Solutions:</span>
              <Link href="/restaurant-pos" className="text-emerald-800 hover:underline">
                Restaurant POS System
              </Link>
              <span>•</span>
              <Link href="/kitchen-display-system" className="text-emerald-800 hover:underline">
                Kitchen Display (KDS)
              </Link>
              <span>•</span>
              <Link href="/qr-ordering-system" className="text-emerald-800 hover:underline">
                QR Table Ordering
              </Link>
              <span>•</span>
              <Link href="/cafe-pos" className="text-emerald-800 hover:underline">
                Cafe POS (CafePOS)
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Advantages */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-3">
                Why Handheld Waiter Ordering Beats Pen &amp; Paper KOTs
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Eliminate handwritten illegible notes and running back and forth to the cashier terminal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
                  <span className="material-symbols-outlined text-[22px]">touch_app</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Punch Orders Table-Side</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Servers select the table number, tap menu categories, add customer-specific notes, and punch orders directly standing next to the guest.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <span className="material-symbols-outlined text-[22px]">send</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Instant Kitchen KOT Firing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  The moment the server taps “Send to Kitchen”, the order appears on the <Link className="text-emerald-800 underline font-semibold" href="/kitchen-display-system">Kitchen Display System</Link> and prints on the station thermal printer.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4 border border-blue-200">
                  <span className="material-symbols-outlined text-[22px]">device_hub</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Runs on Any Smartphone</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  No need to purchase expensive proprietary handheld terminals. Waitstaff can use standard Android smartphones or inexpensive 8-inch tablets with role-based PIN access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Connected Modules */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-[#141210] mb-6 text-center sm:text-left">
              Related Modules in the BrewPluse Operations Suite
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/kitchen-display-system"
              >
                <div className="text-xs font-mono font-bold text-blue-800 uppercase mb-1">Kitchen Display</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-blue-900 mb-1">
                  Kitchen Display (KDS) →
                </h3>
                <p className="text-[11px] text-gray-500">Live ticket queue for cooks and baristas.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/restaurant-pos"
              >
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">Dining Management</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-emerald-900 mb-1">
                  Restaurant POS System →
                </h3>
                <p className="text-[11px] text-gray-500">Table floors, split billing, and inventory.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/qr-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1">Contactless</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-amber-900 mb-1">
                  QR Ordering System →
                </h3>
                <p className="text-[11px] text-gray-500">Enable guest self-ordering directly on table QR codes.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/cafe-pos"
              >
                <div className="text-xs font-mono font-bold text-purple-800 uppercase mb-1">Cashier Desk</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-purple-900 mb-1">
                  Cafe POS Software (CafePOS) →
                </h3>
                <p className="text-[11px] text-gray-500">Counter billing and thermal printing.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b120e] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Equip Your Waitstaff with BrewPluse
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8">
              Create server profiles and start taking mobile table orders today with zero monthly fees.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0b2b1a] text-sm font-bold shadow-xl transition-all hover:scale-[1.02]"
              >
                Start Free Today →
              </Link>
              <Link
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-all"
                href="/how-to-use"
              >
                Setup Guide
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
