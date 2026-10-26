import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Kitchen Display System (KDS) Screen",
  description: "Real-time Kitchen Display System (KDS) for cafes & restaurants. Paperless order routing, color-coded prep timers, station filters & ₹0/month software fees.",
  keywords: [
    'kitchen display system',
    'kds',
    'kitchen display system for cafes',
    'restaurant kds',
    'paperless kitchen',
    'cafe pos kds',
    'restaurant pos kds',
    'kitchen order display',
  ],
  alternates: {
    canonical: 'https://brewpluse.com/kitchen-display-system',
  },
  openGraph: {
    title: "Kitchen Display System (KDS) Screen | BrewPluse",
    description: "Real-time Kitchen Display System (KDS) for cafes & restaurants. Paperless order routing, color-coded prep timers, station filters & ₹0/month software fees.",
    url: 'https://brewpluse.com/kitchen-display-system',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Kitchen Display System (KDS) Screen | BrewPluse",
    description: "Real-time Kitchen Display System (KDS) for cafes & restaurants. Paperless order routing, color-coded prep timers, station filters & ₹0/month software fees.",
  },
};

export default function KitchenDisplaySystemPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse Kitchen Display System (KDS)',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android, Windows, macOS',
        description: 'Real-time kitchen order display system for chefs, line cooks, and baristas with color-coded preparation timers, audio alerts, and station filtering.',
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
          { '@type': 'ListItem', position: 3, name: 'Kitchen Display System', item: 'https://brewpluse.com/kitchen-display-system' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What devices can I use as a Kitchen Display Screen (KDS)?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BrewPluse KDS runs on any device with a screen and web browser: iPads, Android tablets, wall-mounted smart TVs, touch monitors, or laptops.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does the KDS notify cooks and baristas when a new order arrives?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Whenever a new order is placed from the POS counter, waiter tablet, or table QR code, the KDS plays an audible chime and highlights the new ticket in real time.',
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
              <span className="text-emerald-800 font-bold">Kitchen Display</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Paperless Kitchen Workflow
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#141210] tracking-tight leading-[1.15] mb-5">
              Real-Time Kitchen Display System (KDS) for{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Chefs &amp; Baristas
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] max-w-3xl mx-auto leading-relaxed mb-8">
              Replace dropped paper tickets and kitchen confusion with a synchronized digital screen. Live color-coded prep timers, audio alerts, and 1-tap ticket clearing with our integrated <Link href="/cafe-pos" className="text-emerald-800 font-medium underline">Cafe POS</Link> and <Link href="/restaurant-pos" className="text-emerald-800 font-medium underline">Restaurant POS</Link> platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Launch Free KDS Screen</span>
                <span>→</span>
              </Link>
              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#F5F4F0] text-[#141210] text-sm font-semibold border border-[#DCD9D2] transition-all"
              >
                View Live Kitchen Demo ↗
              </a>
            </div>

            {/* Quick Sibling Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-500">
              <span>Related Systems:</span>
              <Link href="/cafe-pos" className="text-emerald-800 hover:underline">
                Cafe POS (CafePOS)
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
              <Link href="/staff-ordering-system" className="text-emerald-800 hover:underline">
                Staff Waiter App
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Pillars */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-3">
                Why Kitchen Display Systems Boost Kitchen Speed by 30%
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Transform chaotic kitchen counters into a calm, prioritized assembly line.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4 border border-blue-200">
                  <span className="material-symbols-outlined text-[22px]">timer</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Color-Coded Prep Timers</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Tickets visually transition from Green (New) to Amber (Warning) and Red (Delayed) based on target prep thresholds, ensuring no table waits too long.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <span className="material-symbols-outlined text-[22px]">volume_up</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Instant Audio Notifications</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Audible chimes alert cooks and baristas the second an order is fired from the <Link className="text-emerald-800 underline font-semibold" href="/cafe-pos">POS counter</Link>, <Link className="text-emerald-800 underline font-semibold" href="/staff-ordering-system">waiter app</Link>, or <Link className="text-emerald-800 underline font-semibold" href="/qr-ordering-system">table QR code</Link>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-4 border border-purple-200">
                  <span className="material-symbols-outlined text-[22px]">done_all</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">1-Tap Ticket Bump Bar</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Chefs can mark entire orders or individual items as “Ready for Pickup” with one touch, notifying service staff instantly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Connected Modules */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-[#141210] mb-6 text-center sm:text-left">
              Connected BrewPluse Modules in the Kitchen Ecosystem
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
                <p className="text-[11px] text-gray-500">2-tap billing and thermal KOT printing.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/qr-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1">Self Ordering</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-amber-900 mb-1">
                  QR Ordering System →
                </h3>
                <p className="text-[11px] text-gray-500">Table QR code ordering with instant UPI payments.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/staff-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-purple-800 uppercase mb-1">Mobile Waiters</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-purple-900 mb-1">
                  Staff Waiter Ordering →
                </h3>
                <p className="text-[11px] text-gray-500">Take table orders on handheld tablets and phones.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/restaurant-pos"
              >
                <div className="text-xs font-mono font-bold text-blue-800 uppercase mb-1">Full Operations</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-blue-900 mb-1">
                  Restaurant POS System →
                </h3>
                <p className="text-[11px] text-gray-500">Floor layout, split billing, and inventory management.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b120e] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Mount Your Digital Kitchen Display in Minutes
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8">
              Open the KDS on any tablet or browser screen. Zero subscription fees and instant cloud synchronization.
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
                Read Setup Tutorial
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
