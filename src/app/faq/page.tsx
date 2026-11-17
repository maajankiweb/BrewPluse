import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) – Honest Answers | BrewPluse',
  description:
    'Clear, transparent answers about BrewPluse: ₹0/month software fees, ₹1 micro-fee mechanics, thermal printer compatibility, QR table ordering, and kitchen display systems.',
  alternates: {
    canonical: 'https://brewpluse.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) – Honest Answers | BrewPluse',
    description:
      'Answers to common questions about BrewPluse Cafe OS: pricing, thermal printer pairing, geofenced QR ordering, KDS, and data ownership.',
    url: 'https://brewpluse.com/faq',
    type: 'website',
  },
};

export default function FaqPage() {
  const faqCategories = [
    {
      category: '1. Pricing & Business Model',
      items: [
        {
          q: 'Is BrewPluse genuinely free forever? What is the catch?',
          a: 'There is no catch. BrewPluse charges ₹0/month for software subscriptions forever. All core modules—cloud POS billing, QR table ordering, paperless KDS screens, and inventory tracking—are 100% unlocked on day one. We monetize through a nominal ₹1 micro-fee per completed order and optional pre-configured hardware sales.',
        },
        {
          q: 'Who pays the ₹1 per-order fee?',
          a: 'The cafe owner has complete billing freedom. You can choose the Guest Convenience Model (where the ₹1 fee is added transparently to the customer checkout slip) or the Merchant Absorbed Model (where your cafe absorbs the fee so guests see clean bills). Both options keep your monthly software subscription at ₹0.',
        },
        {
          q: 'Are there any hidden setup fees, cancellation retainers, or AMCs?',
          a: 'Zero. No setup fees, zero cancellation fees, zero annual maintenance contracts (AMCs), and zero contract lock-ins. You can export your full customer and sales data at any time.',
        },
      ],
    },
    {
      category: '2. Hardware & Thermal Printers',
      items: [
        {
          q: 'Do I need to buy expensive proprietary POS hardware?',
          a: 'No. BrewPluse is 100% browser-native and runs on any device you already own—including iPads, Android tablets (Samsung, Lenovo), Windows laptops, MacBooks, and Android smartphones.',
        },
        {
          q: 'Which thermal receipt printers are supported?',
          a: 'BrewPluse supports standard 58mm and 80mm ESC/POS thermal printers via Web Bluetooth, USB, and LAN Ethernet. Tested brands include Rongta, Sunmi, Epson, TVS, Everycom, and generic ESC/POS printers.',
        },
        {
          q: 'Can I print kitchen order tickets (KOT) as well as customer receipts?',
          a: 'Yes. You can route orders to print physical paper KOT slips in the kitchen or use our paperless Kitchen Display System (KDS) on an inexpensive Android tablet or phone.',
        },
      ],
    },
    {
      category: '3. QR Table Ordering & Geofencing',
      items: [
        {
          q: 'Do customers need to download an app to scan table QR codes?',
          a: 'Never. Customers scan using their normal smartphone camera, and the interactive digital menu opens instantly in mobile Chrome or Safari with high-resolution food photos and dietary filters.',
        },
        {
          q: 'How does GPS Geofencing stop prank orders from outside the cafe?',
          a: 'BrewPluse uses mathematical Haversine distance verification via the browser Geolocation API. If a customer is not physically located within your cafe perimeter, ordering is blocked to ensure only seated guests can send orders to your kitchen.',
        },
      ],
    },
    {
      category: '4. Operations, Kitchen & Security',
      items: [
        {
          q: 'What happens if my cafe’s internet connection drops?',
          a: 'BrewPluse incorporates local caching resilience. Your cashier can continue taking manual orders and printing receipts locally; all data automatically synchronizes with the cloud once connectivity resumes.',
        },
        {
          q: 'How do UPI payments reach my bank account?',
          a: 'Digital payments made via QR codes settle directly into your linked bank account via integrated RBI-compliant payment gateway partners (Razorpay / Cashfree) with standard T+1 settlements.',
        },
        {
          q: 'Does BrewPluse sell my customer data to third-party food aggregators?',
          a: 'Never. Your customer phone numbers, orders, and sales histories belong 100% to your cafe. We never sell, rent, or monetize your customer database.',
        },
      ],
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.a,
        },
      }))
    ),
  };

  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Schema.org FAQPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Background ambient radial glow */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>KNOWLEDGE BASE &amp; ANSWERS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Clear Answers for <span className="text-emerald-400">Cafe Operators.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about BrewPluse pricing, hardware compatibility, order synchronization, and data privacy.
          </p>
        </div>

        {/* Categorized FAQ Blocks */}
        <div className="space-y-12 mb-16">
          {faqCategories.map((cat, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-lg font-mono font-bold uppercase tracking-wider text-emerald-400 pb-2 border-b border-[#1E362B]">
                {cat.category}
              </h2>
              <div className="space-y-4">
                {cat.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="p-6 rounded-2xl bg-[#0D1612] border border-[#1E362B] shadow-lg hover:border-emerald-500/30 transition-all"
                  >
                    <h3 className="text-base font-bold text-white mb-2 flex items-start gap-2.5">
                      <span className="text-emerald-400 font-mono text-sm shrink-0 mt-0.5">Q:</span>
                      <span>{item.q}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-6 border-l border-emerald-500/20">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-white">Have a specific question not listed here?</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Message our support team on WhatsApp or test our live interactive demo without logging in.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/contact"
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
            >
              Contact Support →
            </Link>
            <Link
              href="/demo"
              className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Launch Live Demo
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
