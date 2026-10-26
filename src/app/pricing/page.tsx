import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Pricing – Free Cafe POS & Restaurant POS Software (₹0/Mo) | BrewPluse",
  description: "Transparent Cafe POS & Restaurant POS pricing: ₹0/month software fees forever. Full access to POS billing, QR table ordering, live KDS & recipe inventory.",
  keywords: [
    'cafe pos pricing',
    'free cafe pos',
    'restaurant pos pricing',
    'free restaurant pos',
    'zero monthly pos',
    'cafe billing software price',
    'cafepos',
  ],
  alternates: {
    canonical: 'https://brewpluse.com/pricing',
  },
  openGraph: {
    title: "Pricing – Free Cafe POS & Restaurant POS Software (₹0/Mo) | BrewPluse",
    description: "Transparent Cafe POS & Restaurant POS pricing: ₹0/month software fees forever. Full access to POS billing, QR table ordering, live KDS & recipe inventory.",
    url: 'https://brewpluse.com/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pricing – Free Cafe POS & Restaurant POS Software (₹0/Mo) | BrewPluse",
    description: "Transparent Cafe POS & Restaurant POS pricing: ₹0/month software fees forever. Full access to POS billing, QR table ordering, live KDS & recipe inventory.",
  },
};

export default function PricingPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse POS & Cafe Management System',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Android, iOS, Windows, macOS',
        description: 'Free cloud POS billing, QR table ordering, and kitchen management software for cafes and restaurants.',
        offers: [
          {
            '@type': 'Offer',
            name: 'Single Transparent Model',
            price: '1',
            priceCurrency: 'INR',
            description: 'Only ₹1 per billed order. ₹0/month recurring software subscription forever with all features included.',
          },
        ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://brewpluse.com' },
          { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://brewpluse.com/pricing' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does BrewPluse pricing work?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'BrewPluse has one simple model: only ₹1 per billed order. There are zero monthly software subscription fees (₹0/month forever), zero setup fees, and zero feature gates.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are there any hidden setup fees or long-term contracts?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. There are zero upfront setup fees, zero credit card requirements to start, and no locking multi-year contracts.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I use my existing laptops, iPads, or thermal printers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. BrewPluse runs directly in modern web browsers and Android apps, connecting seamlessly to standard 58mm/80mm USB, Bluetooth, and LAN thermal receipt printers.',
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="w-full bg-[#0b120e] text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Hero Section */}
        <section className="relative pt-16 sm:pt-24 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-emerald-950/60 text-center">
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:32px_32px]"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Breadcrumb Navigation */}
            <nav className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 mb-6 bg-white/5 px-3.5 py-1.5 rounded-full border border-white/10 shadow-2xs">
              <Link className="hover:text-emerald-400 transition-colors" href="/">
                Home
              </Link>
              <span>/</span>
              <span className="text-emerald-400 font-bold">Pricing</span>
            </nav>

            <div className="block">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold tracking-wider uppercase mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                TRANSPARENT PRICING FOR CAFES &amp; RESTAURANTS
              </div>
            </div>

            <p className="text-xs sm:text-sm font-mono uppercase tracking-widest text-gray-400 mb-2">
              Most cafe software starts with an expensive recurring bill.
            </p>

            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-mono text-gray-500 mb-6 flex-wrap">
              <span className="line-through decoration-red-500/70 decoration-2">₹1,499/month</span>
              <span>•</span>
              <span className="line-through decoration-red-500/70 decoration-2">₹2,999/month</span>
              <span>•</span>
              <span className="line-through decoration-red-500/70 decoration-2">Annual Lock-in</span>
              <span>•</span>
              <span className="line-through decoration-red-500/70 decoration-2">₹10,000 Setup</span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-emerald-400 font-mono mb-3">
              BrewPluse starts with:
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
              Only{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-200">
                ₹1 / order.
              </span>
              <br />
              ₹0 / month forever.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed mb-8">
              Zero subscription fee. Zero setup cost. You only pay ₹1 when an order is billed. Full access to <Link href="/cafe-pos" className="text-emerald-400 underline">Cafe POS</Link>, <Link href="/restaurant-pos" className="text-emerald-400 underline">Restaurant POS</Link>, <Link href="/qr-ordering-system" className="text-emerald-400 underline">QR tables</Link>, <Link href="/kitchen-display-system" className="text-emerald-400 underline">KDS</Link>, and recipe inventory included.
            </p>

            <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 max-w-2xl mx-auto text-xs sm:text-sm text-gray-300 leading-relaxed text-left">
              <span className="text-white font-semibold">Our Philosophy:</span> We believe independent cafes and emerging restaurateurs shouldn't be burdened with rigid recurring SaaS fees before turning a profit. BrewPluse delivers an uncompromised operations stack for ₹0/month.
            </div>
          </div>
        </section>

        {/* Pricing Card */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                ONE SIMPLE MODEL
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Only ₹1 / Order. That's It.
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-lg mx-auto">
                No monthly subscriptions, no coin conversions, and no hidden charges. Every feature is unlocked from day one.
              </p>
            </div>

            <div className="relative rounded-3xl bg-gradient-to-b from-[#14231b] to-[#0e1713] border-2 border-emerald-500/40 p-8 sm:p-12 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 bg-emerald-500 text-[#071d12] text-[11px] font-mono font-black uppercase px-4 py-1.5 rounded-bl-2xl tracking-wider shadow-sm">
                Single Model • All Features Unlocked
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-6 space-y-4">
                  <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                    Pay Only When You Sell
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">₹1</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-400">/ order</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    <strong className="text-white">₹0 / month software subscription.</strong> You only pay ₹1 per billed order. If you take 0 orders on a day off, you pay ₹0.
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-gray-300">
                      ₹0 Setup Fee
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-gray-300">
                      ₹0 Monthly Lock-in
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/10 text-gray-300">
                      Pay As You Grow
                    </span>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3">
                    <Link
                      href="/signup"
                      className="text-center px-8 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#071d12] text-sm font-bold transition-all shadow-lg hover:shadow-emerald-500/20"
                    >
                      Start for Free →
                    </Link>
                    <a
                      href="/demo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-all"
                    >
                      Explore Live Demo
                    </a>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-black/30 rounded-2xl p-6 border border-white/10">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4">
                    Everything Included for ₹1/Order:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> <Link href="/cafe-pos" className="hover:text-emerald-300 underline">Cafe POS Billing</Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> <Link href="/restaurant-pos" className="hover:text-emerald-300 underline">Restaurant POS Floors</Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> <Link href="/qr-ordering-system" className="hover:text-emerald-300 underline">Unlimited QR Tables</Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> <Link href="/kitchen-display-system" className="hover:text-emerald-300 underline">Real-Time KDS Screen</Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> <Link href="/cafe-management-software" className="hover:text-emerald-300 underline">Recipe &amp; Stock Sync</Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> Offline-Ready Cash Mode
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> Thermal Printing (58/80mm)
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> Instant UPI Payments
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> <Link href="/staff-ordering-system" className="hover:text-emerald-300 underline">Multi-Staff Accounts</Link>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">✔</span> GST &amp; Daily Sales Reports
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Internal Cross-Linking Sibling Banner */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-black/20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6 text-center sm:text-left">
              Explore Free POS Tiers &amp; Operations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <Link
                href="/free-cafe-management-software"
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/40 transition-all group"
              >
                <div className="text-xs font-mono font-bold text-emerald-400 uppercase mb-1">Free Software</div>
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 mb-1">Free Cafe POS →</h3>
                <p className="text-[11px] text-gray-400">₹0/month software fees for coffee shops &amp; bakeries.</p>
              </Link>
              <Link
                href="/free-restaurant-pos"
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/40 transition-all group"
              >
                <div className="text-xs font-mono font-bold text-blue-400 uppercase mb-1">Dining POS</div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-300 mb-1">Free Restaurant POS →</h3>
                <p className="text-[11px] text-gray-400">Table floor plans, split checks &amp; KDS at ₹0/month.</p>
              </Link>
              <Link
                href="/cafe-pos"
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/40 transition-all group"
              >
                <div className="text-xs font-mono font-bold text-amber-400 uppercase mb-1">Counter POS</div>
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 mb-1">Cafe POS (CafePOS) →</h3>
                <p className="text-[11px] text-gray-400">2-tap counter checkout and thermal KOT receipts.</p>
              </Link>
              <Link
                href="/features"
                className="p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/40 transition-all group"
              >
                <div className="text-xs font-mono font-bold text-purple-400 uppercase mb-1">Features</div>
                <h3 className="text-sm font-bold text-white group-hover:text-purple-300 mb-1">All 18+ Features →</h3>
                <p className="text-[11px] text-gray-400">Full breakdown of POS, KDS, and CRM modules.</p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              Start Your Cafe or Restaurant with ₹0 Software Fees
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto mb-8">
              Create your account in 30 seconds. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/signup"
                className="px-8 py-4 rounded-full bg-[#006838] hover:bg-[#007f45] text-white text-sm font-bold shadow-xl transition-all hover:scale-[1.02]"
              >
                Start Free Today →
              </Link>
              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-all"
              >
                Explore Live Demo
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
