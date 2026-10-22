import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "QR Ordering System for Cafes & Restaurants | Contactless Table Orders | BrewPluse",
  description: "Empower guests with contactless QR code table ordering for cafes and restaurants. Instant digital menu, zero app downloads, UPI payments, and direct kitchen KDS sync with BrewPluse CafePOS.",
  keywords: [
    'qr ordering system',
    'qr table ordering',
    'contactless cafe ordering',
    'restaurant qr ordering',
    'cafe pos qr code',
    'digital menu qr',
    'upi table payments',
    'cloud cafe pos',
  ],
};

export default function QrOrderingSystemPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse QR Ordering System',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        description: 'Contactless QR table ordering software for cafes, bars, and restaurants with instant digital menu browsing, modifier selections, and real-time KDS integration.',
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
          { '@type': 'ListItem', position: 3, name: 'QR Ordering System', item: 'https://brewpluse.com/qr-ordering-system' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Do customers need to download an app to place QR orders?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. BrewPluse QR table ordering runs instantly inside any mobile browser (Safari, Chrome, etc.) without requiring any app download or forced login.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do QR orders reach the kitchen or barista station?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'When a guest submits their order from their table QR code, it instantly transmits to the BrewPluse Kitchen Display System (KDS) and prints directly on connected thermal KOT printers.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can we accept UPI and card payments directly through table QR codes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Customers can pay instantly via dynamic UPI (Google Pay, PhonePe, Paytm) at their table or choose "Pay at Counter" upon departure.',
            },
          },
          {
            '@type': 'Question',
            name: 'How does BrewPluse prevent fake or prank QR orders from outside the cafe?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BrewPluse includes built-in Geo-Fencing GPS verification and table verification tokens to ensure that orders can only be placed by customers physically present inside your dining area.',
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
              <span className="text-emerald-800 font-bold">QR Ordering</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Contactless Table Technology
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#141210] tracking-tight leading-[1.15] mb-5">
              Smart QR Ordering System for{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Cafes &amp; Restaurants
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] max-w-3xl mx-auto leading-relaxed mb-8">
              Turn every dining table into an instant ordering kiosk. Customers scan a table QR code, browse rich visual <Link href="/digital-menu" className="text-emerald-800 font-medium underline">digital menus</Link>, customize items, and pay via UPI in seconds — seamlessly syncing with your <Link href="/cafe-pos" className="text-emerald-800 font-medium underline">Cafe POS</Link> and <Link href="/kitchen-display-system" className="text-emerald-800 font-medium underline">Kitchen Display (KDS)</Link>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Setup Free QR Tables</span>
                <span>→</span>
              </Link>
              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#F5F4F0] text-[#141210] text-sm font-semibold border border-[#DCD9D2] transition-all"
              >
                Try Live Table Demo ↗
              </a>
            </div>

            {/* Quick Sibling Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-500">
              <span>Explore:</span>
              <Link href="/digital-menu" className="text-emerald-800 hover:underline">
                Digital QR Menu
              </Link>
              <span>•</span>
              <Link href="/cafe-pos" className="text-emerald-800 hover:underline">
                Cafe POS (CafePOS)
              </Link>
              <span>•</span>
              <Link href="/restaurant-pos" className="text-emerald-800 hover:underline">
                Restaurant POS System
              </Link>
              <span>•</span>
              <Link href="/kitchen-display-system" className="text-emerald-800 hover:underline">
                Kitchen Display (KDS)
              </Link>
            </div>
          </div>
        </section>

        {/* 4 Simple Steps */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-3">
                How BrewPluse QR Ordering Works in 4 Simple Steps
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Designed for extreme speed and hospitality ergonomics: zero app installs, frictionless checkout, and instant barista alerts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-amber-200">
                    01
                  </div>
                  <h3 className="text-lg font-bold text-[#141210] mb-2">Scan Table QR</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Guests scan the table sticker with their smartphone camera. The menu opens in 500ms without downloading any mobile app.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-emerald-200">
                    02
                  </div>
                  <h3 className="text-lg font-bold text-[#141210] mb-2">Customize &amp; Add</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Diners browse dishes, select milk choices, sweetness levels, or extra espresso shots with visual modifiers and allergen tags.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-blue-200">
                    03
                  </div>
                  <h3 className="text-lg font-bold text-[#141210] mb-2">Instant UPI / Pay</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    One-tap checkout with Google Pay, PhonePe, Paytm, credit cards, or choose “Pay at Counter” upon departure.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center font-mono font-bold text-sm mb-4 border border-purple-200">
                    04
                  </div>
                  <h3 className="text-lg font-bold text-[#141210] mb-2">Kitchen Dispatched</h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    Ticket instantly arrives on the <Link href="/kitchen-display-system" className="text-purple-800 font-semibold underline">Kitchen Display Screen (KDS)</Link> and prints on thermal KOT printers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Advantages */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold uppercase mb-4">
                  Operational Advantages
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#141210] tracking-tight mb-4">
                  Eliminate Waiter Bottlenecks &amp; Increase Average Order Value
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                  During busy rush hours, customers often wait 10+ minutes just to catch a waiter's attention for a physical menu or bill. With BrewPluse QR ordering, your guests place drink re-orders and dessert additions the second they want them.
                </p>
                <ul className="space-y-3 text-sm text-[#4a4642]">
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">✔</span>
                    <span>
                      <strong>35% Faster Table Turnover:</strong> Diners order immediately upon seating and pay whenever ready without waiting for paper bills.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">✔</span>
                    <span>
                      <strong>22% Higher Average Order Value (AOV):</strong> High-resolution item photos, combo upsells, and modifier suggestions encourage bigger orders.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">✔</span>
                    <span>
                      <strong>Zero Misheard Order Mistakes:</strong> Customers specify their exact dietary notes and modifier options directly into the system.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-emerald-700 font-bold">✔</span>
                    <span>
                      <strong>Geo-Fenced Security:</strong> Built-in GPS protection ensures guests must be inside your physical premises to place orders.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-[#0b2b1a] text-white border border-emerald-950/40 shadow-xl">
                <h3 className="text-xl font-bold mb-4 text-emerald-300">Traditional Menus vs. BrewPluse QR Ordering</h3>
                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-red-400 font-bold mb-1">Traditional Physical Menus:</div>
                    <p className="text-gray-300">
                      Expensive to reprint when coffee prices change. Get stained and worn. Require dedicated waitstaff to take every single drink re-order.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-500/30">
                    <div className="text-emerald-400 font-bold mb-1">BrewPluse Digital QR Menu:</div>
                    <p className="text-gray-200">
                      Update prices and out-of-stock items in 1 second. Unlimited tables, automatic UPI payments, live KDS kitchen routing, and ₹0/month subscription.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight">
                Frequently Asked Questions About QR Ordering
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0]">
                <h3 className="text-base font-bold text-[#141210] mb-2">
                  Do customers need to download an app to place QR orders?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  No. BrewPluse QR table ordering runs instantly inside any mobile browser (Safari, Chrome, etc.) without requiring any app download or forced login.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0]">
                <h3 className="text-base font-bold text-[#141210] mb-2">
                  Can we still take manual orders on our POS counter or waiter handhelds?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Yes! BrewPluse is a unified hybrid system. Customers can use table QR codes while your cashier takes counter orders on the <Link className="text-emerald-800 font-semibold underline" href="/cafe-pos">Cafe POS</Link> and waitstaff take orders on <Link className="text-emerald-800 font-semibold underline" href="/staff-ordering-system">Waiter Tablets</Link>. All orders sync to the same kitchen display.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0]">
                <h3 className="text-base font-bold text-[#141210] mb-2">
                  How do we print table QR codes for our cafe?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  BrewPluse generates beautifully formatted, printable table QR code templates directly from your dashboard. You can download them as high-res PDFs and print table tents, acrylic stands, or stickers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Mesh: Connected Modules */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-[#141210] mb-6 text-center sm:text-left">
              Explore Related BrewPluse Modules &amp; Systems
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/digital-menu"
              >
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">Interactive Menu</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-emerald-900 mb-1">
                  Digital Menu System →
                </h3>
                <p className="text-[11px] text-gray-500">
                  Live item availability, photos, allergens, and instant price updates.
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
                  Paperless order routing with color-coded timers for chefs &amp; baristas.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/cafe-pos"
              >
                <div className="text-xs font-mono font-bold text-purple-800 uppercase mb-1">Counter Billing</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-purple-900 mb-1">
                  Cafe POS Software (CafePOS) →
                </h3>
                <p className="text-[11px] text-gray-500">
                  High-speed 2-tap billing, thermal printing, and offline cash mode.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/restaurant-pos"
              >
                <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1">Dining POS</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-amber-900 mb-1">
                  Restaurant POS System →
                </h3>
                <p className="text-[11px] text-gray-500">
                  Floor plans, seat transfers, split checks &amp; KDS routing.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b120e] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Ready to Launch QR Table Ordering in Your Cafe?
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8">
              Create your digital menu and download printable table QR codes in under 5 minutes. No setup fees, no monthly software retainers.
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
                Read Setup Guide
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
