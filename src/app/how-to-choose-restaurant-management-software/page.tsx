import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How to Choose Restaurant Management Software: The Complete Evaluation Guide | BrewPluse',
  description:
    'Choosing the wrong restaurant or cafe software locks you into expensive contracts and kitchen delays. Use our 6-step evaluation checklist to pick the best cloud platform.',
  alternates: {
    canonical: 'https://brewpluse.com/how-to-choose-restaurant-management-software',
  },
  openGraph: {
    title: 'How to Choose Restaurant Management Software: Buyer’s Guide',
    description:
      'The 6-step evaluation framework for selecting restaurant and cafe management software. Hardware freedom, real-time KDS, QR ordering, and zero subscription costs.',
    url: 'https://brewpluse.com/how-to-choose-restaurant-management-software',
    type: 'website',
  },
};

export default function HowToChooseRestaurantManagementSoftwarePage() {
  return (
    <div className="bg-[#F7F5EC] text-[#0B1714] min-h-screen">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: 'How to Choose Restaurant Management Software: The Complete Evaluation Guide',
            description:
              'A complete operational evaluation framework for independent restaurant and cafe owners selecting modern management platforms.',
            publisher: {
              '@type': 'Organization',
              name: 'BrewPluse',
              url: 'https://brewpluse.com',
            },
          }),
        }}
      />

      {/* Section 1: Intro / Checklist Header */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#DDE3DD]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D23]/10 text-[#002D23] text-xs font-semibold mb-6">
          <span className="material-symbols-outlined text-[16px]">checklist</span>
          <span>Buyer&apos;s Decision Checklist (2026)</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#002D23] mb-6 leading-tight">
          How to Choose Restaurant Management Software: The Complete Evaluation Guide
        </h1>
        <p className="text-lg sm:text-xl text-[#4A5550] leading-relaxed mb-8">
          Choosing the wrong restaurant or cafe management software locks you into expensive contracts, slows down your front counter, and causes kitchen delays. Here is the operational checklist every operator should follow before committing.
        </p>
      </section>

      {/* Section 2: 6-Step Framework & Conversion CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-16">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#002D23] mb-8">The 6-Step Evaluation Framework</h2>
          <div className="space-y-6">

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="text-lg font-bold text-[#002D23] mb-2">1. Check True Hardware Agnosticism</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                Can the software run on your existing laptops, tablets, and smartphones, or does the vendor require buying expensive proprietary hardware? Choose platforms like BrewPluse that work in any web browser with standard ESC/POS thermal printers.
              </p>
            </div>

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="text-lg font-bold text-[#002D23] mb-2">2. Demand Real-Time Kitchen Display (KDS) Integration</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                Paper kitchen tickets get lost, grease-stained, and ignored. Ensure the software provides a live touchscreen KDS with preparation timers and station routing to prevent kitchen bottlenecks.
              </p>
            </div>

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="text-lg font-bold text-[#002D23] mb-2">3. Verify Built-in QR Table Ordering</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                Don&apos;t settle for static PDF menus. The software should provide interactive QR ordering with geolocation fraud prevention, letting guests order and pay directly from their table without waiting for staff.
              </p>
            </div>

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="text-lg font-bold text-[#002D23] mb-2">4. Inspect Recipe-Level Inventory Capabilities</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                Does the system track raw ingredients (coffee beans, milk, flour, butter) automatically as menu items are sold, or does it only track static retail finished goods?
              </p>
            </div>

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="text-lg font-bold text-[#002D23] mb-2">5. Scrutinize the Total Cost of Ownership</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                Look past marketing headlines. Calculate annual subscription fees, user seat license fees, payment processing markups, and termination penalties. Prioritize zero-subscription platforms with transparent per-order pricing.
              </p>
            </div>

            <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-xl p-6 hover:shadow-sm transition-all">
              <h3 className="text-lg font-bold text-[#002D23] mb-2">6. Test Setup Speed and Usability</h3>
              <p className="text-sm text-[#4A5550] leading-relaxed">
                Can your cashiers and floor staff learn the interface in 5 minutes? Complex legacy ERPs cause high training costs and frequent cashier errors during shift changes.
              </p>
            </div>

          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-[#002D23] text-[#F7F5EC] rounded-2xl p-8 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">See How BrewPluse Checks Every Box</h2>
          <p className="text-sm sm:text-base text-[#DDE3DD] leading-relaxed mb-6">
            BrewPluse delivers cloud POS billing, QR table ordering, kitchen displays, and recipe inventory with <strong>₹0/month software fees</strong>. Test it on your own devices in less than 5 minutes.
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
              href="/features"
            >
              Explore All 18+ Features
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
