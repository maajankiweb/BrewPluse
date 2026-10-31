import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Restaurant POS Software & Billing System",
  description: "Cloud restaurant POS system with visual table plans, split billing, multi-station KOT routing & kitchen display screens. 100% free with ₹0/month fees.",
  keywords: [
    'restaurant pos',
    'resturant pos',
    'restaurant pos software',
    'restaurant pos system',
    'free restaurant pos',
    'restaurant billing software',
    'cafe pos',
    'cloud restaurant pos',
    'kot routing',
  ],
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-pos',
  },
  openGraph: {
    title: "Restaurant POS Software & Billing System | BrewPluse",
    description: "Cloud restaurant POS system with visual table plans, split billing, multi-station KOT routing & kitchen display screens. 100% free with ₹0/month fees.",
    url: 'https://brewpluse.com/restaurant-pos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Restaurant POS Software & Billing System | BrewPluse",
    description: "Cloud restaurant POS system with visual table plans, split billing, multi-station KOT routing & kitchen display screens. 100% free with ₹0/month fees.",
  },
};

export default function RestaurantPosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse Restaurant POS System',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Windows, macOS, Android, iOS',
        description: 'Enterprise-grade restaurant POS software with floor plan table management, KOT printing, kitchen display system, and multi-tender billing.',
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
          { '@type': 'ListItem', position: 3, name: 'Restaurant POS', item: 'https://brewpluse.com/restaurant-pos' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can BrewPluse route KOTs to different kitchen stations?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. BrewPluse supports multi-station kitchen routing. Beverages route to the bar/barista printer or screen, while hot appetizers and main courses route to the main kitchen line.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does BrewPluse handle table splitting and check merging?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Waitstaff and cashiers can easily split checks by item, divide bills equally among guests, or merge separate tables when large parties join together.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there a monthly fee for the Restaurant POS?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. BrewPluse operates on a ₹0/month software subscription model, eliminating expensive recurring retainers for dining rooms and bars.',
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
              <span className="text-emerald-800 font-bold">Restaurant POS</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              Complete Dining &amp; Bar Operations
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#141210] tracking-tight leading-[1.15] mb-5">
              Cloud Restaurant POS &amp;{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Order Management System
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] max-w-3xl mx-auto leading-relaxed mb-8">
              Power your dining room, bar, and kitchen from one synchronized platform. Visual floor layout, multi-station KOT routing to your <Link href="/kitchen-display-system" className="text-emerald-800 font-medium underline">Kitchen Display System</Link>, staff permissions, and seamless table billing with ₹0/month software fees.
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
              <Link href="/free-restaurant-pos" className="text-emerald-800 hover:underline">
                Free Restaurant POS Tier
              </Link>
              <span>•</span>
              <Link href="/restaurant-management-software" className="text-emerald-800 hover:underline">
                Restaurant Management Software
              </Link>
              <span>•</span>
              <Link href="/cafe-pos" className="text-emerald-800 hover:underline">
                Cafe POS System
              </Link>
              <span>•</span>
              <Link href="/staff-ordering-system" className="text-emerald-800 hover:underline">
                Staff Waiter Handhelds
              </Link>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-3">
                Everything Your Restaurant Needs on One Screen
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Designed to eliminate miscommunication between front-of-house waitstaff and back-of-house culinary teams.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4 border border-blue-200">
                  <span className="material-symbols-outlined text-[22px]">table_restaurant</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Interactive Floor Plans</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Organize multiple dining zones (Main Hall, Patio, Rooftop, Bar). View live table occupancy, order durations, and bill statuses at a glance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <span className="material-symbols-outlined text-[22px]">payments</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Fast Counter Billing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Streamlined cashier checkout with 2-tap billing, dynamic UPI QR codes, cash tender, and instant thermal receipts.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
                  <span className="material-symbols-outlined text-[22px]">skillet</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Multi-Station KOT Routing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Fire orders automatically to specialized kitchen displays: bar tickets to the cocktail bar, grill items to the chef line, and desserts to pastry.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-4 border border-purple-200">
                  <span className="material-symbols-outlined text-[22px]">badge</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Staff Access &amp; PIN Controls</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Set role-based permissions for managers, cashiers, and servers. Prevent unauthorized discounts or order cancellations with manager PIN overrides.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center mb-4 border border-rose-200">
                  <span className="material-symbols-outlined text-[22px]">inventory</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Recipe-Level Food Costing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Link raw ingredients to menu dishes. Automatically deduct meats, dairy, produce, and sauces per order in your <Link href="/restaurant-management-software" className="text-emerald-800 underline font-semibold">Restaurant Management Software</Link>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4 border border-teal-200">
                  <span className="material-symbols-outlined text-[22px]">monitoring</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Real-Time Daily Sales Reports</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Track top-selling dishes, waiter sales performance, peak order hours, discount totals, and tax breakdowns across all devices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Mesh: Connected Modules */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-[#141210] mb-6 text-center sm:text-left">
              Connected Restaurant Modules in the BrewPluse Suite
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/staff-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1">Handheld POS</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-amber-900 mb-1">
                  Staff Waiter Ordering →
                </h3>
                <p className="text-[11px] text-gray-500">
                  Enable servers to punch orders table-side on smartphones and tablets.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/kitchen-display-system"
              >
                <div className="text-xs font-mono font-bold text-blue-800 uppercase mb-1">Kitchen Queue</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-blue-900 mb-1">
                  Kitchen Display (KDS) →
                </h3>
                <p className="text-[11px] text-gray-500">
                  Live order queue with color-coded preparation timers.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/qr-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">Contactless</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-emerald-900 mb-1">
                  QR Ordering System →
                </h3>
                <p className="text-[11px] text-gray-500">
                  Let guests order and pay via table QR codes directly.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/restaurant-management-software"
              >
                <div className="text-xs font-mono font-bold text-purple-800 uppercase mb-1">Full Operations</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-purple-900 mb-1">
                  Restaurant Management →
                </h3>
                <p className="text-[11px] text-gray-500">
                  End-to-end dining room, kitchen, inventory, and shift software.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b120e] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Upgrade Your Restaurant POS System Today
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8">
              Fast setup on your existing hardware. No expensive proprietary terminals or monthly software fees.
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
                View Setup Tutorial
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
