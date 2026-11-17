import type { Metadata } from 'next';
import Link from 'next/link';
import PricingCalculator from '@/components/PricingCalculator';

export const metadata: Metadata = {
  title: "How BrewPluse Pricing Works | The Transparent ₹0/Month Model Explained",
  description: "Learn how BrewPluse provides enterprise cafe & restaurant software with zero monthly subscription fees. Understand the ₹1 micro-fee, merchant savings, and hardware freedom.",
  keywords: [
    'how brewpluse pricing works',
    'free restaurant pos pricing',
    'cafe pos micro fee model',
    'zero subscription cafe software',
    'restaurant software cost breakdown',
    'pos software pricing transparency',
  ],
  alternates: {
    canonical: 'https://brewpluse.com/how-pricing-works',
  },
  openGraph: {
    title: "How BrewPluse Pricing Works | The Transparent ₹0/Month Model Explained",
    description: "Understand the math behind BrewPluse. Why you never pay ₹25,000 upfront for restaurant POS software ever again.",
    url: 'https://brewpluse.com/how-pricing-works',
    type: 'website',
  },
};

export default function HowPricingWorksPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: 'How BrewPluse Pricing Works: The Honest Economics Behind Free Restaurant Software',
        description: 'A deep-dive technical and financial breakdown of how BrewPluse delivers production-grade cafe software without monthly subscription lock-in.',
        author: {
          '@type': 'Organization',
          name: 'BrewPluse',
          url: 'https://brewpluse.com',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why does BrewPluse offer ₹0/month software instead of charging an annual license?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Legacy POS providers charge ₹15,000 to ₹35,000 upfront each year regardless of whether your cafe does 5 orders or 500 orders a day. BrewPluse aligns with cafe operators: we charge zero upfront fees and sustain operations through an optional transparent ₹1 per settled order fee or optional premium modules.',
            },
          },
          {
            '@type': 'Question',
            name: 'Who pays the ₹1 fee per order?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You have total control. The cafe owner can choose to absorb the ₹1 fee as a standard business operating cost (which is a fraction of legacy POS subscription costs), or pass it transparently to the diner as a platform convenience fee during online QR ordering.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is there a minimum monthly billing or hidden lock-in contract?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'None. There are no minimum monthly spend commitments, no termination penalties, and no proprietary hardware contracts. If your cafe is closed for renovations or low season, your bill is ₹0.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#FAF9F5] min-h-screen text-[#141210]">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white to-[#FAF9F5] border-b border-[#EBE8E3]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-6">
              <span className="material-symbols-outlined text-[16px]">account_balance_wallet</span>
              <span>Transparent Hospitality Economics</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141210] mb-6 leading-tight">
              Honest Software Pricing.{' '}
              <span className="text-emerald-700">Zero Fine Print.</span>
            </h1>

            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Most restaurant POS companies lock you into ₹25,000+ yearly contracts before you serve your first latte. Here is the exact breakdown of how BrewPluse eliminates fixed subscription overhead.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0b2b1a] text-white font-semibold text-sm hover:bg-black transition-all shadow-sm"
              >
                Get Started at ₹0/Month
              </Link>
              <Link
                href="/pricing"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-[#E7E5E0] text-gray-800 font-semibold text-sm hover:bg-[#F5F4F0] transition-all"
              >
                View Plans &amp; Features
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Pillars of BrewPluse Pricing */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141210] mb-4">
              The 3 Rules We Built Our Model On
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Hospitality is a business of tight margins. Your tech partner should share your risk, not extract heavy fixed overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[28px]">savings</span>
              </div>
              <h3 className="text-lg font-bold text-[#141210] mb-3">1. Zero Upfront License Fee</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                You never pay for software activation, onboarding fees, annual software renewal keys, or per-device terminal licenses. Access all core features freely on day one.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[28px]">toll</span>
              </div>
              <h3 className="text-lg font-bold text-[#141210] mb-3">2. Pay-As-You-Serve (₹1/Order)</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                A tiny, transparent micro-fee of ₹1 per settled order sustains cloud server operations. On slow days or seasonal closures, your monthly software expense is ₹0.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[28px]">devices</span>
              </div>
              <h3 className="text-lg font-bold text-[#141210] mb-3">3. Use Your Own Hardware</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Zero proprietary hardware lock-in. Run BrewPluse on standard Android tablets, iPads, PCs, or smartphones. Connect standard 2-inch or 3-inch ESC/POS thermal printers via Web Bluetooth or USB.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Calculator Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-[#EBE8E3]">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] mb-3">
              Calculate Your Direct Cost Savings
            </h2>
            <p className="text-sm text-gray-600">
              Compare your exact monthly expenditure on BrewPluse versus legacy ₹25,000/year subscriptions.
            </p>
          </div>
          <PricingCalculator />
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#EBE8E3]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] text-center mb-10">
            Frequently Asked Questions on Pricing
          </h2>
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E0]">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Why does BrewPluse offer ₹0/month software instead of charging an annual license?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Legacy POS providers charge ₹15,000 to ₹35,000 upfront each year regardless of whether your cafe does 5 orders or 500 orders a day. BrewPluse aligns with cafe operators: we charge zero upfront fees and sustain operations through an optional transparent ₹1 per settled order fee or optional premium modules.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E0]">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Who pays the ₹1 fee per order?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                You have total control. The cafe owner can choose to absorb the ₹1 fee as a standard business operating cost (which is a fraction of legacy POS subscription costs), or pass it transparently to the diner as a platform convenience fee during online QR ordering.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E0]">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Is there a minimum monthly billing or hidden lock-in contract?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                None. There are no minimum monthly spend commitments, no termination penalties, and no proprietary hardware contracts. If your cafe is closed for renovations or low season, your bill is ₹0.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b2b1a] text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Stop Paying High Annual POS Subscriptions
            </h2>
            <p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Start running modern table QR ordering, counter billing, and KDS on any hardware at zero fixed cost.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-[#0b2b1a] font-bold text-sm hover:bg-emerald-50 transition-all shadow-sm"
              >
                Register Your Cafe Free →
              </Link>
              <Link
                href="/compare"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-900/60 border border-emerald-700/60 text-white font-medium text-sm hover:bg-emerald-900 transition-all"
              >
                Compare vs Petpooja &amp; Posist
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
