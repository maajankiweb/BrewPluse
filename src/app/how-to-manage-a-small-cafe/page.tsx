import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Manage a Small Cafe Efficiently: Operations, Technology & Cost Control | BrewPluse',
  description:
    'Managing a small cafe is a delicate balancing act of beverage quality, customer hospitality, labor efficiency, and tight inventory margins. Discover the lean playbook.',
  alternates: {
    canonical: 'https://brewpluse.com/how-to-manage-a-small-cafe',
  },
  openGraph: {
    title: 'How to Manage a Small Cafe Efficiently | BrewPluse',
    description:
      'The 4 golden rules of small cafe management and the minimalist tech stack to eliminate overhead while boosting table turnover.',
    url: 'https://brewpluse.com/how-to-manage-a-small-cafe',
    type: 'website',
  },
};

export default function HowToManageASmallCafePage() {
  return (
    <div className="bg-[#F7F5EC] text-[#0B1714] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Manage a Small Cafe Efficiently: Operations, Technology & Cost Control',
            description:
              'The operational blueprint for independent coffee shops. The 4 golden rules of small cafe management and the minimalist cloud tech stack.',
            publisher: {
              '@type': 'Organization',
              name: 'BrewPluse',
              url: 'https://brewpluse.com',
            },
          }),
        }}
      />

      {/* Section 1: Hero & Strategic Insight */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#DDE3DD]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D23]/10 text-[#002D23] text-xs font-semibold mb-6">
          <span className="material-symbols-outlined text-[16px]">coffee</span>
          <span>Small Business Operations Blueprint</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#002D23] mb-6 leading-tight">
          How to Manage a Small Cafe Efficiently: Operations, Technology &amp; Cost Control
        </h1>
        <p className="text-lg sm:text-xl text-[#4A5550] leading-relaxed mb-8">
          Managing a small cafe is a delicate balancing act of beverage quality, customer hospitality, labor efficiency, and tight inventory margins. Discover how modern coffee shops maximize profitability without bloated software overhead.
        </p>
        <div className="bg-[#FFFEFA] border-l-4 border-[#002D23] p-6 rounded-r-2xl shadow-sm">
          <p className="text-base text-[#0B1714] leading-relaxed">
            <strong>Key Insight:</strong> Small cafes succeed by keeping fixed overhead minimal. By replacing expensive proprietary POS hardware and monthly subscriptions with modern cloud-based systems like BrewPluse (running on standard tablets), independent operators save thousands while offering guests seamless QR table ordering and digital loyalty.
          </p>
        </div>
      </section>

      {/* Section 2: 4 Golden Rules & Minimalist Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002D23] mb-6">1. The 4 Golden Rules of Small Cafe Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="font-bold text-[#002D23] text-lg mb-2">Rule 1: Eliminate Fixed Software Costs</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                Never lock your small business into ₹2,000–₹5,000 monthly software subscriptions. Use zero-subscription platforms like BrewPluse where you only pay as you grow.
              </p>
            </div>

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="font-bold text-[#002D23] text-lg mb-2">Rule 2: Accelerate Table-Side Ordering</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                During busy shifts, one barista cannot take counter orders, prepare lattes, and deliver checks. QR table ordering lets seated customers order directly to the espresso station.
              </p>
            </div>

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="font-bold text-[#002D23] text-lg mb-2">Rule 3: Track Ingredient Grams, Not Just Cups</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                Coffee beans and dairy represent your largest ongoing expense. Automated recipe inventory tracking prevents over-portioning and catches ingredient waste early.
              </p>
            </div>

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="font-bold text-[#002D23] text-lg mb-2">Rule 4: Turn First-Time Visitors into Regulars</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                Paper loyalty cards get lost. Digital stamp cards and checkout scratch-card rewards keep your coffee shop top-of-mind and encourage weekly repeat visits.
              </p>
            </div>

          </div>
        </div>

        {/* Minimalist Tech Stack */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002D23] mb-6">2. The Minimalist Tech Stack for a Small Cafe</h2>
          <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-2xl p-6 space-y-4 text-sm text-[#4A5550]">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] text-[#002D23] shrink-0">tablet</span>
              <div>
                <strong className="text-[#0B1714]">Cashier Counter:</strong> Any iPad, Android tablet, or laptop running BrewPluse POS via browser.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] text-[#002D23] shrink-0">print</span>
              <div>
                <strong className="text-[#0B1714]">Receipt Printer:</strong> Affordable 58mm or 80mm Bluetooth/USB thermal printer for receipts and token numbers.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] text-[#002D23] shrink-0">qr_code_2</span>
              <div>
                <strong className="text-[#0B1714]">Table Stands:</strong> Printed laminated QR code stands for dine-in tables, powered by BrewPluse.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[20px] text-[#002D23] shrink-0">monitor</span>
              <div>
                <strong className="text-[#0B1714]">Barista Station:</strong> An inexpensive wall-mounted Android tablet acting as the Kitchen Display System (KDS).
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#002D23] text-[#F7F5EC] rounded-2xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Start Managing Your Small Cafe with Zero Fixed Overhead</h2>
          <p className="text-sm sm:text-base text-[#DDE3DD] leading-relaxed mb-6">
            Setup your entire cafe menu, table QR codes, and cashier POS in under 5 minutes with BrewPluse&apos;s <strong>₹0/month software subscription</strong>.
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
              href="/product"
            >
              Read Product Architecture
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
