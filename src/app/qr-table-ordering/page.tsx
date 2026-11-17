import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free QR Table Ordering Software for Restaurants | Contactless Dine-In | BrewPluse',
  description:
    'Free QR code table ordering software for restaurants and cafes. Enable contactless ordering, live modifiers, UPI payments, and geofence fraud prevention with ₹0/month software fees.',
  alternates: {
    canonical: 'https://brewpluse.com/qr-table-ordering',
  },
  openGraph: {
    title: 'Free QR Table Ordering Software for Restaurants | BrewPluse',
    description:
      'Turn dining tables into self-checkout terminals. Instant camera scan, high-res photos, UPI payments, and zero monthly software retainers.',
    url: 'https://brewpluse.com/qr-table-ordering',
    type: 'website',
  },
};

export default function QrTableOrderingPage() {
  const benefits = [
    {
      title: 'Higher Average Order Value (+22%)',
      desc: 'Visual food photos, item recommendations, and easy modifier customization encourage diners to add sides, desserts, and premium beverages.',
    },
    {
      title: 'Faster Table Turnarounds',
      desc: 'Guests order the moment they are seated and pay immediately without waiting for busy waiters to bring paper menus or bill folders.',
    },
    {
      title: 'GPS Geofence Fraud Guard',
      desc: 'Built-in geolocation verification blocks fake orders placed by users outside your cafe perimeter, keeping kitchen queues clean.',
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
            <span>CONTACTLESS TABLE COMMERCE</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Free QR Table Ordering Software for <span className="text-emerald-400">Restaurants &amp; Cafes.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Turn dining tables into instant self-ordering hubs. No app download required for guests—just scan, customize, and pay via UPI with ₹0/month software fees.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3.5">
            <Link
              href="/signup"
              className="py-3.5 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg"
            >
              Deploy QR Ordering Free →
            </Link>
            <Link
              href="/demo"
              className="py-3.5 px-8 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Test Mobile QR Demo
            </Link>
          </div>
        </div>

        {/* Section 1: Benefits */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl mb-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">
              Why Table QR Codes Outperform Traditional Waiter Ordering
            </h2>
            <p className="text-xs text-gray-400">
              Deliver faster hospitality while keeping front-of-house labor lean.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((b, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#080E0B] border border-white/5 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  ✓
                </div>
                <h3 className="text-base font-bold text-white">{b.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Deploy QR Table Ordering in 5 Minutes
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Generate printable high-resolution table QR stands and launch today.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/signup"
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
            >
              Start Free Now →
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
