import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Free Cafe Management Software & Free Cafe POS (CafePOS) | ₹0/Mo | BrewPluse",
  description: "Run your coffee shop with 100% free cafe management software and Free Cafe POS (CafePOS). High-speed POS billing, table QR ordering, kitchen display screens, and recipe inventory with ₹0/month software fees.",
  keywords: [
    'free cafe management software',
    'free cafe pos',
    'cafepos',
    'free cafe software',
    'free coffee shop pos',
    'cafe pos billing free',
    'free restaurant pos',
    'zero monthly pos',
  ],
};

export default function FreeCafeManagementSoftwarePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse Free Cafe Management Software & CafePOS',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Windows, macOS, Android, iOS',
        description: 'Free cloud cafe POS and operations software for coffee shops, cafes, and bakeries with zero monthly software subscription fees.',
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
          { '@type': 'ListItem', position: 3, name: 'Free Cafe Management Software', item: 'https://brewpluse.com/free-cafe-management-software' },
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
              <span className="text-emerald-800 font-bold">Free Cafe Software</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              ₹0 / Month Software Subscription Forever
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#141210] tracking-tight leading-[1.15] mb-5">
              100% Free Cafe Management Software &amp;{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2">
                Cloud Cafe POS (CafePOS)
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] max-w-3xl mx-auto leading-relaxed mb-8">
              Starting or scaling a coffee shop? Stop paying ₹2,000–₹4,000 every month in software retainers. BrewPluse gives you 2-tap <Link href="/cafe-pos" className="text-emerald-800 font-medium underline">Cafe POS counter billing</Link>, contactless <Link href="/qr-ordering-system" className="text-emerald-800 font-medium underline">table QR ordering</Link>, live <Link href="/kitchen-display-system" className="text-emerald-800 font-medium underline">kitchen display screens (KDS)</Link>, and recipe inventory with ₹0 monthly software fees.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-bold shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <span>Start Free Cafe Account</span>
                <span>→</span>
              </Link>
              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-[#F5F4F0] text-[#141210] text-sm font-semibold border border-[#DCD9D2] transition-all"
              >
                Launch Live Demo ↗
              </a>
            </div>

            {/* Quick Internal Sibling Links */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-500">
              <span>Related:</span>
              <Link href="/cafe-pos" className="text-emerald-800 hover:underline">
                Cafe POS (CafePOS)
              </Link>
              <span>•</span>
              <Link href="/free-restaurant-pos" className="text-emerald-800 hover:underline">
                Free Restaurant POS
              </Link>
              <span>•</span>
              <Link href="/pricing" className="text-emerald-800 hover:underline">
                Pricing (₹1/Order)
              </Link>
              <span>•</span>
              <Link href="/how-to-use" className="text-emerald-800 hover:underline">
                5-Min Setup Playbook
              </Link>
            </div>
          </div>
        </section>

        {/* Everything Included */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-3">
                Everything Included for Free
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                No hidden retainers, no credit card required at sign up, and no artificial feature crippleware.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-4 border border-emerald-200">
                  <span className="material-symbols-outlined text-[22px]">point_of_sale</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Cloud POS Counter Billing</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  2-tap order taking, milk and syrup modifier customization, offline cash resilience, and thermal printing on 58mm/80mm receipt printers in our <Link href="/cafe-pos" className="text-emerald-800 underline font-semibold">Cafe POS</Link>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
                  <span className="material-symbols-outlined text-[22px]">qr_code_2</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Contactless QR Dine-In Orders</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Print unlimited table QR codes. Guests browse digital menus, place orders, and pay instantly via UPI with zero app downloads using our <Link href="/qr-ordering-system" className="text-amber-800 underline font-semibold">QR Ordering System</Link>.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4 border border-blue-200">
                  <span className="material-symbols-outlined text-[22px]">skillet</span>
                </div>
                <h3 className="text-lg font-bold text-[#141210] mb-2">Live Kitchen Display (KDS)</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  Open the kitchen view on any tablet or monitor. Real-time audio alerts, color-coded prep timers, and 1-tap ticket clearing with <Link href="/kitchen-display-system" className="text-blue-800 underline font-semibold">BrewPluse KDS</Link>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Linking Mesh: Related Solutions */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E7E5E0]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-bold text-[#141210] mb-6 text-center sm:text-left">
              Related BrewPluse Cafe &amp; Restaurant Solutions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/cafe-pos"
              >
                <div className="text-xs font-mono font-bold text-emerald-800 uppercase mb-1">Billing</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-emerald-900 mb-1">
                  Cafe POS Software (CafePOS) →
                </h3>
                <p className="text-[11px] text-gray-500">2-tap billing and thermal KOT receipts.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/qr-ordering-system"
              >
                <div className="text-xs font-mono font-bold text-amber-800 uppercase mb-1">Self Ordering</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-amber-900 mb-1">
                  QR Ordering System →
                </h3>
                <p className="text-[11px] text-gray-500">Table QR code ordering with instant UPI.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/kitchen-display-system"
              >
                <div className="text-xs font-mono font-bold text-blue-800 uppercase mb-1">Kitchen Queue</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-blue-900 mb-1">
                  Kitchen Display (KDS) →
                </h3>
                <p className="text-[11px] text-gray-500">Paperless order routing for baristas and cooks.</p>
              </Link>
              <Link
                className="p-4 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] hover:border-emerald-500 hover:bg-emerald-50/30 transition-all group"
                href="/free-restaurant-pos"
              >
                <div className="text-xs font-mono font-bold text-purple-800 uppercase mb-1">Dining POS</div>
                <h3 className="text-sm font-bold text-[#141210] group-hover:text-purple-900 mb-1">
                  Free Restaurant POS →
                </h3>
                <p className="text-[11px] text-gray-500">Table floor plans, split checks &amp; KDS at ₹0/month.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#0b120e] text-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Start Your Cafe Free Forever
            </h2>
            <p className="text-sm text-gray-300 max-w-lg mx-auto mb-8">
              Create your account in 30 seconds. No credit card required.
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
