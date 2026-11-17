import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'The BrewPluse Product Suite: Everything Connected | BrewPluse',
  description:
    'BrewPluse replaces disparate restaurant software tools with a unified cloud operating system. Cloud POS billing, QR table ordering, paperless KDS, recipe inventory, and staff apps with ₹0/month software fees.',
  alternates: {
    canonical: 'https://brewpluse.com/product',
  },
  openGraph: {
    title: 'The BrewPluse Product Suite: Everything Connected',
    description:
      'Explore the unified BrewPluse cloud restaurant platform. POS, QR ordering, KDS, and recipe inventory connected with sub-second synchronization.',
    url: 'https://brewpluse.com/product',
    type: 'website',
  },
};

export default function ProductPage() {
  return (
    <div className="bg-[#F7F5EC] text-[#0B1714] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Product',
                name: 'BrewPluse Cafe & Restaurant Operating System',
                category: 'SoftwareApplication',
                description:
                  'All-in-one software suite uniting cloud POS billing, QR table ordering, kitchen display systems, recipe inventory, and customer loyalty with ₹0/month software fees.',
                url: 'https://brewpluse.com/product',
                brand: {
                  '@type': 'Brand',
                  name: 'BrewPluse',
                },
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'INR',
                  description: '₹0/month software subscription forever. Transparent per-order micro-fees apply.',
                },
              },
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Home',
                    item: 'https://brewpluse.com',
                  },
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: 'Product',
                    item: 'https://brewpluse.com/product',
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Section 1: Hero & Architecture Intro */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#DDE3DD]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D23]/10 text-[#002D23] text-xs font-semibold mb-6">
          <span className="material-symbols-outlined text-[16px]">widgets</span>
          <span>Comprehensive Product Suite</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#002D23] mb-6 leading-tight">
          The BrewPluse Product Suite: Everything Connected
        </h1>
        <p className="text-lg sm:text-xl text-[#4A5550] leading-relaxed mb-8">
          BrewPluse replaces disparate software tools with a unified cloud operating system. From the first scan of a table QR code to the final kitchen bump-bar chime and inventory reconciliation, every module works in perfect harmony.
        </p>
        <div className="bg-[#FFFEFA] border-l-4 border-[#002D23] p-6 rounded-r-2xl shadow-sm">
          <p className="text-base text-[#0B1714] leading-relaxed">
            <strong>System Architecture:</strong> Built on high-speed WebSockets with instant data synchronization. Supports any standard PC, Mac, iPad, Android tablet, or smartphone. Completely hardware-agnostic with <strong>₹0/month software subscriptions forever</strong>.
          </p>
        </div>
      </section>

      {/* Section 2: 6 Interconnected Modules & Platform CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Module 1: Cloud POS */}
          <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#002D23] mb-3">point_of_sale</span>
              <h2 className="text-xl font-bold text-[#002D23] mb-2">Cloud POS &amp; Counter Billing</h2>
              <p className="text-sm text-[#4A5550] leading-relaxed mb-4">
                Sub-second order ringing, modifier trees, split checks (Cash, UPI, Cards, Wallets), and ESC/POS thermal printing (58mm/80mm).
              </p>
            </div>
            <Link
              className="text-[#002D23] font-bold text-sm hover:underline inline-flex items-center gap-1 group"
              href="/cafe-pos"
            >
              <span>Explore POS Module</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Module 2: QR Table Ordering */}
          <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#002D23] mb-3">qr_code_2</span>
              <h2 className="text-xl font-bold text-[#002D23] mb-2">Contactless QR Table Ordering</h2>
              <p className="text-sm text-[#4A5550] leading-relaxed mb-4">
                Interactive digital menus with allergen tags, high-res photos, and geolocation fraud prevention ensuring only guests seated inside the cafe can place orders.
              </p>
            </div>
            <Link
              className="text-[#002D23] font-bold text-sm hover:underline inline-flex items-center gap-1 group"
              href="/qr-ordering-system"
            >
              <span>Explore QR Ordering</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Module 3: Kitchen Display System */}
          <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#002D23] mb-3">tv</span>
              <h2 className="text-xl font-bold text-[#002D23] mb-2">Kitchen Display System (KDS)</h2>
              <p className="text-sm text-[#4A5550] leading-relaxed mb-4">
                Paperless kitchen screens with preparation timers, color-coded urgency alerts, bump bar order completion, and station ticket routing.
              </p>
            </div>
            <Link
              className="text-[#002D23] font-bold text-sm hover:underline inline-flex items-center gap-1 group"
              href="/kitchen-display-system"
            >
              <span>Explore KDS Module</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Module 4: Recipe Inventory */}
          <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#002D23] mb-3">inventory_2</span>
              <h2 className="text-xl font-bold text-[#002D23] mb-2">Recipe-Level Inventory</h2>
              <p className="text-sm text-[#4A5550] leading-relaxed mb-4">
                Real-time stock decrementing per menu item sold, portion control, automated low-stock warnings, and ingredient consumption reports.
              </p>
            </div>
            <Link
              className="text-[#002D23] font-bold text-sm hover:underline inline-flex items-center gap-1 group"
              href="/restaurant-inventory-management-software"
            >
              <span>Explore Inventory Module</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Module 5: Staff & Waiter App */}
          <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#002D23] mb-3">person</span>
              <h2 className="text-xl font-bold text-[#002D23] mb-2">Staff &amp; Waiter Ordering App</h2>
              <p className="text-sm text-[#4A5550] leading-relaxed mb-4">
                Mobile-first ordering tool enabling waitstaff to punch orders table-side from their smartphones and dispatch tickets directly to the kitchen.
              </p>
            </div>
            <Link
              className="text-[#002D23] font-bold text-sm hover:underline inline-flex items-center gap-1 group"
              href="/staff-ordering-system"
            >
              <span>Explore Staff App</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Module 6: Customer Loyalty */}
          <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:shadow-md transition-all">
            <div>
              <span className="material-symbols-outlined text-[36px] text-[#002D23] mb-3">loyalty</span>
              <h2 className="text-xl font-bold text-[#002D23] mb-2">Customer Loyalty &amp; Retention</h2>
              <p className="text-sm text-[#4A5550] leading-relaxed mb-4">
                Digital punch stamp cards, checkout scratch card rewards, customer cafe wallets, and automated prompts driving 5-star Google reviews.
              </p>
            </div>
            <Link
              className="text-[#002D23] font-bold text-sm hover:underline inline-flex items-center gap-1 group"
              href="/cafe-loyalty-program-software"
            >
              <span>Explore Loyalty Features</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-[#002D23] text-[#F7F5EC] rounded-2xl p-8 sm:p-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Experience the Entire Platform for ₹0/Month</h2>
          <p className="text-sm sm:text-base text-[#DDE3DD] leading-relaxed mb-6 max-w-xl mx-auto">
            All 18+ capabilities are included from day one. No locked features, no tier upgrades, and no forced hardware.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl bg-[#B99A5B] text-[#002D23] font-bold hover:bg-[#d3b677] transition-all shadow-md"
            >
              Start Your Free Cafe →
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-all"
            >
              Explore Live Sandbox ↗
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
