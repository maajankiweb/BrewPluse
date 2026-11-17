import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cafe Loyalty Program Software for Customer Retention | Digital Stamp Cards | BrewPluse',
  description:
    'Turn first-time coffee drinkers into lifetime regulars with phone-based digital stamp cards, customer store wallets, and instant post-order rewards with ₹0/month software fees.',
  alternates: {
    canonical: 'https://brewpluse.com/cafe-loyalty-program-software',
  },
  openGraph: {
    title: 'Cafe Loyalty Program Software | Digital Stamp Cards | BrewPluse',
    description:
      'Phone number based digital stamp cards and customer loyalty software built directly into BrewPluse POS with zero monthly subscriptions.',
    url: 'https://brewpluse.com/cafe-loyalty-program-software',
    type: 'website',
  },
};

export default function CafeLoyaltyProgramSoftwarePage() {
  const loyaltyFeatures = [
    {
      icon: '📱',
      title: 'Phone-Number Based Stamps',
      desc: 'No apps for guests to download. Customers simply enter their phone number at checkout or QR ordering to earn stamps (e.g. 5th coffee free).',
    },
    {
      icon: '💳',
      title: 'Customer Store Credit Wallet',
      desc: 'Let frequent guests preload credit into their cafe wallet for instant checkouts, boosting upfront cash flow float for your coffee shop.',
    },
    {
      icon: '🎁',
      title: 'Surprise Scratch Rewards',
      desc: 'Delight customers with interactive digital scratch cards on their mobile screen after paying via table QR code.',
    },
  ];

  const faqs = [
    {
      q: 'Do customers need to download a separate loyalty app?',
      a: 'No. The entire loyalty engine operates natively through their mobile web browser when they scan table QR codes or punch their phone number at the counter POS.',
    },
    {
      q: 'Can I customize the stamp card rules (e.g. Buy 6 get 1 free)?',
      a: 'Yes. You can configure stamp rules, qualifying items, reward expiration dates, and discount voucher values directly from your BrewPluse business settings.',
    },
    {
      q: 'Does BrewPluse charge extra fees for loyalty members or SMS?',
      a: 'BrewPluse includes full customer CRM and loyalty logic with ₹0/month software subscription fees.',
    },
  ];

  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient glow */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>CUSTOMER RETENTION ENGINE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Cafe Loyalty Program Software for <span className="text-emerald-400">Customer Retention.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Replace easily lost paper punch cards with seamless digital stamps, prepaid store wallets, and automated rewards built directly into your Point of Sale.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
            <Link
              href="/signup"
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg"
            >
              Start Free Retention Engine →
            </Link>
            <Link
              href="/demo"
              className="py-3.5 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Explore Live Sandbox
            </Link>
          </div>
        </div>

        {/* Section 1: Comparison - Paper vs Digital */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl mb-20">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
              RETENTION ARCHITECTURE
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Why Paper Punch Cards Fail (And Digital Loyalty Wins)</h2>
            <p className="text-xs text-gray-400 mt-1">
              Traditional paper stamp cards get lost in wallets, forgotten at home, or exploited with counterfeit stamp ink.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loyaltyFeatures.map((f, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#080E0B] border border-white/5 space-y-3">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="text-base font-bold text-white">{f.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: FAQs */}
        <div className="mb-20 space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-6">Frequently Asked Questions</h2>
          {faqs.map((f, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#0D1612] border border-[#1E362B]">
              <h3 className="text-sm font-bold text-white mb-2">{f.q}</h3>
              <p className="text-xs text-gray-300 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        {/* Section 3: Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Build Long-Term Customer Loyalty Today
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Turn your coffee shop visitors into brand ambassadors with BrewPluse.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/signup"
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
            >
              Start Free Today →
            </Link>
            <Link
              href="/demo"
              className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Test Live Sandbox
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
