import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Zap, Heart, Award, Users, Coffee, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About BrewPluse – Modern Cafe Operating System & Intelligent POS',
  description:
    'Learn about BrewPluse: our mission to eliminate monthly SaaS fees for cafes and restaurants with cloud POS, QR table ordering & live kitchen technology.',
  alternates: {
    canonical: 'https://brewpluse.com/about',
  },
  openGraph: {
    title: 'About BrewPluse – Modern Cafe Operating System & Intelligent POS',
    description:
      'Learn about BrewPluse: our mission to eliminate monthly SaaS fees for cafes and restaurants with cloud POS, QR table ordering & live kitchen technology.',
    url: 'https://brewpluse.com/about',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About BrewPluse – Modern Cafe Operating System & Intelligent POS',
    description:
      'Learn about BrewPluse: our mission to eliminate monthly SaaS fees for cafes and restaurants with cloud POS, QR table ordering & live kitchen technology.',
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: 'savings',
      title: 'Zero Monthly SaaS Fees',
      desc: 'We believe cafe owners should not pay ₹3,000–₹10,000 every month just to print bills and accept orders. Our transparent ₹0/month subscription model preserves your margins.',
    },
    {
      icon: 'bolt',
      title: 'Built for High-Speed Service',
      desc: 'During morning rushes and weekend peak hours, every millisecond counts. BrewPluse operates with sub-50ms latency across POS, KDS, and QR table ordering.',
    },
    {
      icon: 'devices',
      title: 'Hardware Agnostic Freedom',
      desc: 'Run on existing Android tablets, iPads, Windows touchscreens, and standard 58mm/80mm ESC/POS thermal printers via USB, LAN Ethernet, or Bluetooth. No expensive proprietary terminals.',
    },
    {
      icon: 'psychology',
      title: 'AI-Native Cafe Intelligence',
      desc: 'With BREWIE, cafe operators receive automated low-stock warnings, prep-time forecasts, and smart table turnover analytics directly inside the merchant dashboard.',
    },
  ];

  return (
    <div className="w-full bg-[#FBFBFA]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About BrewPluse',
            url: 'https://brewpluse.com/about',
            description:
              'BrewPluse is a modern cloud-based Point of Sale and cafe operating system powering independent coffee shops and restaurants.',
            mainEntity: {
              '@type': 'Organization',
              name: 'BrewPluse',
              url: 'https://brewpluse.com',
              founder: {
                '@type': 'Person',
                name: 'Ashish Kumar',
              },
              foundingDate: '2024',
              areaServed: 'Worldwide',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+91-9471273041',
                contactType: 'customer support',
                email: 'support@brewpluse.com',
              },
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#EBE8E3] text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] text-xs font-mono font-bold uppercase tracking-wider text-[#005c36] mb-4 shadow-xs">
            <span className="material-symbols-outlined text-[16px] text-emerald-700">info</span>
            <span>OUR MISSION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141210] mb-5">
            Brewing excellence. Automating hospitality.
          </h1>
          <p className="text-base sm:text-lg text-[#5a554f] max-w-2xl mx-auto leading-relaxed">
            BrewPluse was born out of frustration with legacy, bloated POS software that locks cafes into expensive monthly contracts. We built a fast, clean, and modern operating system designed specifically for the unique rhythm of coffee shops, bakeries, and restaurants.
          </p>
        </div>
      </section>

      {/* Story & Philosophy */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700">THE STORY</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight">
              Why independent hospitality needed a revolution
            </h2>
            <p className="text-sm sm:text-base text-[#5a554f] leading-relaxed">
              Traditional restaurant POS systems were created decades ago for bulky desktop computers. They charge recurring subscription fees, mandate proprietary printers, take 20% fees on online ordering, and freeze during busy rushes.
            </p>
            <p className="text-sm sm:text-base text-[#5a554f] leading-relaxed">
              BrewPluse changes the equation: <strong>zero monthly software fees</strong>, cloud synchronization with offline survivability, contactless QR table ordering, and real-time Kitchen Display screens (KDS) that connect baristas and chefs seamlessly.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E7E5E0] shadow-sm space-y-4">
            <div className="text-sm font-bold uppercase tracking-wider text-emerald-800">AT A GLANCE</div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E7ECE9]">
                <div className="text-2xl font-black text-[#141210] font-mono">₹0</div>
                <div className="text-xs text-[#65736D] font-medium mt-1">Monthly Subscription</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E7ECE9]">
                <div className="text-2xl font-black text-[#141210] font-mono">&lt; 50ms</div>
                <div className="text-xs text-[#65736D] font-medium mt-1">Order Sync Latency</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E7ECE9]">
                <div className="text-2xl font-black text-[#141210] font-mono">18+</div>
                <div className="text-xs text-[#65736D] font-medium mt-1">Integrated Modules</div>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F7F4] border border-[#E7ECE9]">
                <div className="text-2xl font-black text-[#141210] font-mono">100%</div>
                <div className="text-xs text-[#65736D] font-medium mt-1">Cloud + Offline Resilient</div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight">
              Our Core Principles
            </h2>
            <p className="text-xs sm:text-sm text-[#7a756f] mt-2">
              How we architect software to put cafe and restaurant operators first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs space-y-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">{v.icon}</span>
                </div>
                <h3 className="text-base font-bold text-[#141210]">{v.title}</h3>
                <p className="text-xs sm:text-sm text-[#65736D] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Organization / Founder Details */}
        <div className="bg-white p-8 rounded-3xl border border-[#E7E5E0] shadow-xs space-y-3 text-xs text-[#5a554f]">
          <h3 className="text-sm font-bold text-[#141210] uppercase tracking-wider mb-2">Corporate Identity &amp; Support</h3>
          <div><strong>Operating / Brand Name:</strong> BrewPluse</div>
          <div><strong>Legal Entity:</strong> BrewPluse Technologies (Founder: Ashish Kumar)</div>
          <div><strong>Support Desk:</strong> support@brewpluse.com | +91 9471273041</div>
          <div><strong>Principal Operations:</strong> Bihar &amp; Karnataka, India</div>
          <div><strong>System Architecture:</strong> Distributed Edge Cloud on Node.js 22, Next.js 15, and MongoDB Replica Cluster</div>
        </div>

        {/* CTA Banner */}
        <div className="mt-14 p-8 sm:p-10 rounded-3xl bg-[#062F23] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-black">Ready to modernize your cafe operations?</h3>
            <p className="text-xs sm:text-sm text-emerald-200 mt-1 max-w-xl">
              Get started in under 5 minutes with zero setup costs and full access to POS, KDS, and table QR codes.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/signup"
              className="px-5 py-3 rounded-full bg-white text-[#062F23] text-xs font-bold hover:bg-emerald-100 transition-colors shadow-xs"
            >
              Start Free Today
            </Link>
            <Link
              href="/demo"
              className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-colors"
            >
              Explore Live Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
