import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'QR Ordering Software for Restaurants & Cafes: Frictionless, Fast, and Free | BrewPluse',
  description:
    'Eliminate customer wait times and staff bottlenecks during peak hours. BrewPluse lets guests scan, browse, customize, and order directly from their table with ₹0/month software fees.',
  alternates: {
    canonical: 'https://brewpluse.com/qr-ordering-software',
  },
  openGraph: {
    title: 'QR Ordering Software for Restaurants & Cafes: Frictionless, Fast, and Free',
    description:
      'Interactive QR ordering for dine-in tables. Instant KDS dispatch, allergen tags, modifier upgrades, and zero app installs.',
    url: 'https://brewpluse.com/qr-ordering-software',
    type: 'website',
  },
};

export default function QrOrderingSoftwarePage() {
  return (
    <div className="bg-[#F7F5EC] text-[#0B1714] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'BrewPluse QR Ordering Software',
            operatingSystem: 'iOS, Android, Mobile Web',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'INR',
              description: '₹0/month software subscription forever. Transparent per-order micro-fees apply.',
            },
          }),
        }}
      />

      {/* Section 1: Hero & Intro */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#DDE3DD]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D23]/10 text-[#002D23] text-xs font-semibold mb-6">
          <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
          <span>Contactless Dining Technology</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#002D23] mb-6 leading-tight">
          QR Ordering Software for Restaurants &amp; Cafes: Frictionless, Fast, and Free
        </h1>
        <p className="text-lg sm:text-xl text-[#4A5550] leading-relaxed mb-8">
          Eliminate customer wait times and staff bottlenecks during peak hours. BrewPluse lets guests scan, browse, customize, and order directly from their table with <strong>₹0/month software subscription fees</strong>.
        </p>
        <div className="bg-[#FFFEFA] border-l-4 border-[#002D23] p-6 rounded-r-2xl shadow-sm">
          <p className="text-base text-[#0B1714] leading-relaxed">
            <strong>Operational Edge:</strong> Unlike clunky static PDF menus, BrewPluse provides interactive web ordering with modifier choices, instant KDS routing, and geolocation fraud protection—all with zero customer app downloads.
          </p>
        </div>
      </section>

      {/* Section 2: Content Breakdown & Conversion CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002D23] mb-6">1. Why Static PDF QR Menus Are Dead</h2>
          <p className="text-base text-[#4A5550] leading-relaxed mb-4">
            During 2020, many venues slapped generic PDF menus on tables. Customers hated pinching and zooming across outdated documents, and staff still had to walk over to take handwritten orders.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-5 hover:shadow-sm transition-all">
              <h3 className="font-bold text-[#002D23] mb-2">Zero App Installs</h3>
              <p className="text-sm text-[#4A5550]">
                Guests simply point their iPhone or Android camera at the QR code. The digital menu opens in under a second in their native mobile browser.
              </p>
            </div>
            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-5 hover:shadow-sm transition-all">
              <h3 className="font-bold text-[#002D23] mb-2">Geolocation Safety</h3>
              <p className="text-sm text-[#4A5550]">
                Built-in GPS verification verifies the customer is physically inside your venue before allowing order dispatch, stopping prank orders.
              </p>
            </div>
            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-5 hover:shadow-sm transition-all">
              <h3 className="font-bold text-[#002D23] mb-2">Direct KDS Sync</h3>
              <p className="text-sm text-[#4A5550]">
                Orders fire directly to the barista or kitchen display screen. No manual counter re-entry required.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#002D23] text-[#F7F5EC] rounded-2xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Transform Your Table Turnover with Free QR Ordering</h2>
          <p className="text-sm sm:text-base text-[#DDE3DD] leading-relaxed mb-6">
            Generate and print table QR codes in seconds. Fully integrated with POS billing and kitchen displays for <strong>₹0/month software fees</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#B99A5B] text-[#002D23] font-bold hover:bg-[#d3b677] transition-all"
            >
              Start Free Cafe Account →
            </Link>
            <Link
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
              href="/kitchen-display-system"
            >
              See Kitchen Display System
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
