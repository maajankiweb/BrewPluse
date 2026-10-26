import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Interactive Digital Menu for Cafes",
  description: "Create interactive digital QR menus for cafes & restaurants. Live item stock toggles, photo menus, dietary badges & 1-second price updates with BrewPluse.",
  keywords: [
    'digital menu',
    'digital menu for cafes',
    'digital menu for restaurants',
    'qr digital menu',
    'cafe pos menu',
    'photo menu for cafes',
    'touchless menu',
    'cloud cafe pos',
  ],
  alternates: {
    canonical: 'https://brewpluse.com/digital-menu',
  },
  openGraph: {
    title: "Interactive Digital Menu for Cafes | BrewPluse",
    description: "Create interactive digital QR menus for cafes & restaurants. Live item stock toggles, photo menus, dietary badges & 1-second price updates with BrewPluse.",
    url: 'https://brewpluse.com/digital-menu',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Interactive Digital Menu for Cafes | BrewPluse",
    description: "Create interactive digital QR menus for cafes & restaurants. Live item stock toggles, photo menus, dietary badges & 1-second price updates with BrewPluse.",
  },
};

export default function DigitalMenuPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse Digital Menu System',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, iOS, Android',
        description: 'Cloud digital menu software for restaurants and cafes with real-time price updates, 86/out-of-stock toggles, dietary badges, and instant QR generation.',
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
          { '@type': 'ListItem', position: 3, name: 'Digital Menu', item: 'https://brewpluse.com/digital-menu' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I update menu items and prices in real-time without reprinting QR codes?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. BrewPluse digital QR menus are dynamic. Any change to item pricing, descriptions, or 86 out-of-stock toggles updates immediately across all dining table QR codes without needing to reprint anything.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I add food photos, dietary tags, and customization modifiers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. You can upload high-resolution food images, label items as Vegan, Gluten-Free, or Chef Special, and configure modifiers like Milk Substitutes, Spice Levels, and Add-ons.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use this for counter TV menu displays?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. BrewPluse includes a dedicated full-screen TV menu URL mode that automatically formats your categories and pricing for overhead widescreen monitors.',
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
              <span className="text-emerald-800 font-bold">Digital Menu</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Visual Dine-In Experience
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#141210] tracking-tight leading-[1.15] mb-5">
              Interactive Digital Menu for{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Modern Cafes &amp; Restaurants
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] max-w-3xl mx-auto leading-relaxed mb-8">
              Ditch expensive paper reprints. Showcase mouth-watering food photography, customize drink options, flag sold-out items with one click, and boost guest spending with BrewPluse's digital menu engine — connected with our <Link href="/cafe-pos" className="text-emerald-800 font-medium underline">Cafe POS</Link> and <Link href="/qr-ordering-system" className="text-emerald-800 font-medium underline">QR Table Ordering System</Link>.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Create Free Digital Menu</span>
                <span>→</span>
              </Link>
              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#F5F4F0] text-[#141210] text-sm font-semibold border border-[#DCD9D2] transition-all"
              >
                View Live Interactive Menu ↗
              </a>
            </div>

            {/* Quick Sibling Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-500">
              <span>Related Solutions:</span>
              <Link href="/qr-ordering-system" className="text-emerald-800 hover:underline">
                QR Table Ordering
              </Link>
              <span>•</span>
              <Link href="/cafe-pos" className="text-emerald-800 hover:underline">
                Cafe POS (CafePOS)
              </Link>
              <span>•</span>
              <Link href="/kitchen-display-system" className="text-emerald-800 hover:underline">
                Kitchen Display (KDS)
              </Link>
              <span>•</span>
              <Link href="/restaurant-pos" className="text-emerald-800 hover:underline">
                Restaurant POS System
              </Link>
            </div>
          </div>
        </section>

        {/* 6 Capabilities */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-3">
                Why BrewPluse Digital Menus Outperform Physical Menus
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Transform your static menu list into an active sales driver with rich media, smart upselling, and instant cloud control.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
                  <span className="material-symbols-outlined text-[22px]">restaurant_menu</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">High-Res Visual Dish Displays</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Visual menus increase dessert and signature drink sales by over 30%. Diners see exactly how your dishes and latte art look before ordering.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <span className="material-symbols-outlined text-[22px]">tune</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Granular Modifier Groups</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Allow customers to easily customize milk types (Oat, Almond, Soy), espresso roast choices, sugar levels, and extra toppings with transparent pricing.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4 border border-blue-200">
                  <span className="material-symbols-outlined text-[22px]">bolt</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">1-Second 86 / Sold Out Toggle</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Ran out of sourdough bread or matcha? Flip the toggle in your dashboard to instantly grey out the item on all customer phones and prevent awkward refunds.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center mb-4 border border-rose-200">
                  <span className="material-symbols-outlined text-[22px]">eco</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Dietary &amp; Allergen Tags</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Clearly label Gluten-Free, Vegan, Jain, Nut-Free, and Chef Recommended specialties to build trust with health-conscious diners.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-4 border border-purple-200">
                  <span className="material-symbols-outlined text-[22px]">tv</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Digital TV Menu Board Mode</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Broadcast your live digital menu directly onto counter TV screens or overhead monitors in full 4K layout with automatic real-time sync.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center mb-4 border border-teal-200">
                  <span className="material-symbols-outlined text-[22px]">qr_code</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Free Printable QR Generator</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Download ready-to-print acrylic stand templates and table stickers branded with your cafe logo and designated table identifiers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Mode View */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-[11px] font-bold uppercase mb-4">
              Unified Ecosystem
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141210] tracking-tight mb-4">
              Combine Digital Menus with Contactless Self-Ordering
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-8">
              You can use BrewPluse purely as a view-only digital menu for browsing, or enable our <Link className="text-emerald-800 font-semibold underline" href="/qr-ordering-system">QR Ordering System</Link> to let guests send orders straight to your kitchen and pay via UPI.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="p-6 rounded-2xl bg-[#FBFBFA] border border-[#E7E5E0]">
                <h3 className="text-lg font-bold text-[#141210] mb-2">Mode 1: View-Only Digital Menu</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Customers scan the table QR code to browse high-res photos and prices. Waitstaff take the order manually on mobile tablets or at the <Link href="/cafe-pos" className="text-emerald-800 font-semibold underline">POS counter</Link>.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-[#0b2b1a] text-white border border-emerald-950/40">
                <h3 className="text-lg font-bold text-emerald-300 mb-2">Mode 2: Full Self-Ordering &amp; Pay</h3>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  Customers scan, customize, submit their order directly to the <Link href="/kitchen-display-system" className="text-emerald-400 font-semibold underline">kitchen display (KDS)</Link>, and pay instantly via UPI with zero cashier intervention.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight">
                Frequently Asked Questions About Digital Menus
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0]">
                <h3 className="text-base font-bold text-[#141210] mb-2">
                  Can I update menu items and prices in real-time without reprinting QR codes?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Yes. BrewPluse digital QR menus are dynamic. Any change to item pricing, descriptions, or 86 out-of-stock toggles updates immediately across all dining table QR codes without needing to reprint anything.
                </p>
              </div>
              <div className="p-5 rounded-2xl bg-white border border-[#E7E5E0]">
                <h3 className="text-base font-bold text-[#141210] mb-2">
                  Can I add food photos, dietary tags, and customization modifiers?
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Yes. You can upload high-resolution food images, label items as Vegan, Gluten-Free, or Chef Special, and configure modifiers like Milk Substitutes, Spice Levels, and Add-ons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Connected Modules */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-[#141210] mb-6 text-center sm:text-left">
              Connected BrewPluse Modules &amp; Systems
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/qr-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1">Self Ordering</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-amber-900 mb-1">
                  QR Ordering System →
                </h3>
                <p className="text-[11px] text-gray-500">
                  Enable guest self-checkout, instant UPI payments, and auto KDS sync.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/cafe-pos"
              >
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">Cashier Desk</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-emerald-900 mb-1">
                  Cafe POS Software (CafePOS) →
                </h3>
                <p className="text-[11px] text-gray-500">
                  2-tap rapid billing, split tenders, and thermal receipt printing.
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
                  Real-time paperless kitchen &amp; barista ticket display.
                </p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/cafe-management-software"
              >
                <div className="text-xs font-mono font-bold text-purple-800 uppercase mb-1">Full Suite</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-purple-900 mb-1">
                  Cafe Management Software →
                </h3>
                <p className="text-[11px] text-gray-500">
                  All-in-one inventory, staff roles, reports, and table operations.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b120e] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Build Your Digital Menu in Under 5 Minutes
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8">
              Import your food and beverage catalog, generate beautiful table QR codes, and start delighting diners today.
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
