import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroPosMockup from '@/components/HeroPosMockup';
import TrustBar from '@/components/TrustBar';
import ProductWalkthrough from '@/components/ProductWalkthrough';
import SystemComparison from '@/components/SystemComparison';
import PricingCalculator from '@/components/PricingCalculator';
import WhyAndFaqSection from '@/components/WhyAndFaqSection';
import CtaBanner from '@/components/CtaBanner';

export const metadata: Metadata = {
  title: 'BrewPluse – Honest Cafe Operating System | ₹0/Month POS for Cafes',
  description:
    'The ₹0/month operating system for modern cafes and restaurants. Contactless QR table ordering, barista KDS, rapid counter billing, and loyalty — unified into one platform.',
  alternates: {
    canonical: 'https://brewpluse.com/',
  },
  openGraph: {
    title: 'BrewPluse – Honest Cafe Operating System | ₹0/Month POS for Cafes',
    description:
      'The ₹0/month operating system for modern cafes and restaurants. Contactless QR table ordering, barista KDS, rapid counter billing, and loyalty.',
    url: 'https://brewpluse.com/',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/brewpluse-storefront.jpg',
        width: 1200,
        height: 630,
        alt: 'BrewPluse – Cloud POS and Cafe Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrewPluse – Honest Cafe Operating System | ₹0/Month POS for Cafes',
    description:
      'The ₹0/month operating system for modern cafes. QR table ordering, barista KDS, rapid counter billing, and customer loyalty — unified into one platform.',
    images: ['/brewpluse-storefront.jpg'],
    creator: '@brewpluse',
  },
};

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Section 1: Overview / Hero */}
      <section
        id="overview"
        className="relative pt-10 sm:pt-14 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column Content */}
          <div className="lg:col-span-5 flex flex-col items-start text-left animate-fadeIn">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#002D23]/10 border border-[#002D23]/20 text-[#002D23] font-mono text-[11px] font-bold tracking-wider uppercase mb-5">
              <span className="w-2 h-2 rounded-full bg-[#002D23] animate-pulse" />
              <span>HONEST CAFE OPERATING SYSTEM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#0B1714] leading-[1.1] mb-5">
              Run your cafe.<br />
              <span className="text-[#002D23]">Not your software.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#64736D] leading-relaxed mb-6 max-w-md font-normal">
              The ₹0/month operating system for modern cafes. QR table ordering, barista KDS, speed billing, and customer relationships — built into one synchronized platform.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] bg-[#002D23] text-white text-sm font-semibold hover:bg-[#001F19] shadow-sm transition-all"
              >
                <span>Open Your Free Account</span>
                <span className="text-[#B99A5B]">→</span>
              </Link>

              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-[#FFFEFA] border border-[#DDE3DD] text-[#0B1714] text-sm font-medium hover:bg-[#F7F5EC] transition-all"
              >
                <span className="material-symbols-outlined text-[#002D23] text-[18px]">play_circle</span>
                <span>Explore Live Demo</span>
              </a>
            </div>

            {/* Reassurance Checks */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#64736D] mb-6">
              <span className="flex items-center gap-1.5">
                <span className="text-[#002D23] font-bold">✔</span> ₹0/month software fees
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#002D23] font-bold">✔</span> Runs on any phone, tablet, or PC
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#002D23] font-bold">✔</span> Live in 15 minutes
              </span>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#64736D] pt-3 border-t border-[#DDE3DD] w-full">
              <span className="font-mono text-[#64736D] font-semibold mr-1">Quick Links:</span>
              <Link href="/cafe-pos" className="text-[#002D23] hover:text-[#B99A5B] font-medium underline">
                Cafe POS
              </Link>
              <span>•</span>
              <Link href="/restaurant-pos" className="text-[#002D23] hover:text-[#B99A5B] font-medium underline">
                Restaurant POS
              </Link>
              <span>•</span>
              <Link href="/qr-ordering-system" className="text-[#002D23] hover:text-[#B99A5B] font-medium underline">
                QR Table Ordering
              </Link>
              <span>•</span>
              <Link href="/kitchen-display-system" className="text-[#002D23] hover:text-[#B99A5B] font-medium underline">
                Kitchen KDS
              </Link>
            </div>
          </div>

          {/* Right Column Tablet Mockup */}
          <div className="lg:col-span-7 relative animate-fadeIn" style={{ animationDelay: '150ms' }}>
            <HeroPosMockup />
          </div>

        </div>
      </section>

      {/* Section 2: Trust bar */}
      <TrustBar />

      {/* Section 3: Three Pillars */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002D23]/10 border border-[#002D23]/20 text-[#002D23] font-mono text-[11px] font-bold tracking-wider uppercase mb-3">
            <span className="w-2 h-2 rounded-full bg-[#002D23]" />
            <span>CORE VALUE PROPOSITION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1714] tracking-tight leading-tight mb-4">
            Three pillars. One synchronized system.
          </h2>
          <p className="text-sm sm:text-base text-[#64736D] leading-relaxed">
            Everything your cafe needs to take orders, fulfill tickets, and retain guests — ₹0/month forever for cafe owners.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch text-left">
          {/* Pillar 1 */}
          <div className="rounded-3xl bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DDE3DD]/60">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#002D23] uppercase">
                  COUNTER &amp; TABLE ORDERING
                </span>
                <span className="text-xs font-mono font-bold text-[#64736D]">PILLAR 01</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1714] tracking-tight mb-1.5">
                Manage Orders
              </h3>
              <p className="text-xs sm:text-[13px] font-semibold text-[#002D23] mb-3">
                Create and manage cafe orders from any station.
              </p>
              <p className="text-xs text-[#64736D] leading-relaxed mb-5">
                Lightning-fast counter POS billing, contactless table QR ordering, and waiter handheld inputs — all combined into a single live order stream without proprietary hardware.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-xs text-[#0B1714]">
                  <span className="text-[#002D23] font-bold">✔</span>
                  <span>Contactless QR table ordering with zero app downloads</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-[#0B1714]">
                  <span className="text-[#002D23] font-bold">✔</span>
                  <span>High-speed counter checkout with UPI, card &amp; cash settlement</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-[#0B1714]">
                  <span className="text-[#002D23] font-bold">✔</span>
                  <span>Connects to standard USB, Bluetooth &amp; LAN thermal receipt printers</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden border border-[#DDE3DD] bg-[#F7F5EC] shadow-xs">
                <img
                  src="/features/pos_billing.png"
                  alt="BrewPluse POS Counter Billing and Order Management"
                  className="w-full h-44 sm:h-48 object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-3xl bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DDE3DD]/60">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#002D23] uppercase">
                  KITCHEN DISPLAY SYSTEM
                </span>
                <span className="text-xs font-mono font-bold text-[#64736D]">PILLAR 02</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1714] tracking-tight mb-1.5">
                Run Your Kitchen
              </h3>
              <p className="text-xs sm:text-[13px] font-semibold text-[#002D23] mb-3">
                Coordinate kitchen operations and live order status.
              </p>
              <p className="text-xs text-[#64736D] leading-relaxed mb-5">
                Replace lost paper slips with a real-time digital Kitchen Display System (KDS). Coordinate baristas and chefs with automatic station routing, timers, and live prep status.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-xs text-[#0B1714]">
                  <span className="text-[#002D23] font-bold">✔</span>
                  <span>Clear visual stages: Received → Preparing → Ready → Delivered</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-[#0B1714]">
                  <span className="text-[#002D23] font-bold">✔</span>
                  <span>Station-specific views for espresso bar, hot kitchen, and pantry</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-[#0B1714]">
                  <span className="text-[#002D23] font-bold">✔</span>
                  <span>Eliminates misread handwriting, missing tickets, and rush chaos</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden border border-[#DDE3DD] bg-[#F7F5EC] shadow-xs">
                <img
                  src="/features/kds.png"
                  alt="BrewPluse Real-Time Kitchen Display System (KDS)"
                  className="w-full h-44 sm:h-48 object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-3xl bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm hover:shadow-md transition-all p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#DDE3DD]/60">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[#002D23] uppercase">
                  CUSTOMER LOYALTY &amp; REVIEWS
                </span>
                <span className="text-xs font-mono font-bold text-[#64736D]">PILLAR 03</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B1714] tracking-tight mb-1.5">
                Grow Customer Relationships
              </h3>
              <p className="text-xs sm:text-[13px] font-semibold text-[#002D23] mb-3">
                Turn first-time guests into lifelong regulars.
              </p>
              <p className="text-xs text-[#64736D] leading-relaxed mb-5">
                Deliver modern customer experiences with visual digital menus, live out-of-stock toggles, automated visit rewards, discount coupons, and 1-tap Google Review booster prompts.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2 text-xs text-[#0B1714]">
                  <span className="text-[#002D23] font-bold">✔</span>
                  <span>Live 86 toggle updates QR menus and TV boards instantly</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-[#0B1714]">
                  <span className="text-[#002D23] font-bold">✔</span>
                  <span>Automated customer loyalty points and repeat visit rewards</span>
                </li>
                <li className="flex items-start gap-2 text-xs text-[#0B1714]">
                  <span className="text-[#002D23] font-bold">✔</span>
                  <span>Integrated Google Review workflow boosts your local ranking</span>
                </li>
              </ul>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden border border-[#DDE3DD] bg-[#F7F5EC] shadow-xs">
                <img
                  src="/features/qr_ordering.png"
                  alt="BrewPluse Contactless Customer QR Ordering and Digital Menu"
                  className="w-full h-44 sm:h-48 object-cover object-top hover:scale-[1.02] transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] bg-[#002D23] text-white text-sm font-semibold hover:bg-[#001F19] shadow-sm transition-all"
          >
            <span>Start Your Free Cafe</span>
            <span className="text-[#B99A5B]">→</span>
          </Link>
          <a
            href="#walkthrough"
            className="inline-flex items-center justify-center gap-1.5 px-6 py-3.5 rounded-[10px] bg-[#FFFEFA] border border-[#DDE3DD] text-[#0B1714] text-sm font-medium hover:bg-[#F7F5EC] transition-all"
          >
            <span>See Product Walkthrough</span>
            <span>↓</span>
          </a>
        </div>
      </section>

      {/* Section 4: 4 Simple Steps Walkthrough */}
      <ProductWalkthrough />

      {/* Section 5: Honesty & Control */}
      <section className="py-16 sm:py-20 bg-[#F7F5EC] px-4 sm:px-6 lg:px-8 reveal-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm p-6 sm:p-10 lg:p-12">
            <div className="max-w-3xl mb-12 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D23]/10 border border-[#002D23]/20 text-[#002D23] text-[11px] font-mono font-bold uppercase tracking-wider mb-3">
                <span className="w-2 h-2 rounded-full bg-[#002D23]" />
                <span>ETHICAL PERSUASION &amp; TRUST</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1714] tracking-tight leading-snug mb-3">
                Built for cafe operators who value honesty and control.
              </h2>
              <p className="text-xs sm:text-sm text-[#64736D] leading-relaxed">
                We believe restaurant software should empower independent cafes — not trap them in expensive multi-year contracts, locked proprietary hardware, or unexpected price hikes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
              {/* Card 1 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-[10px] bg-[#002D23]/10 text-[#002D23] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">money_off</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#64736D]">SOFTWARE ACCESS</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B1714] mb-2">
                    ₹0 Monthly Software Subscription
                  </h3>
                  <p className="text-xs text-[#64736D] leading-relaxed mb-4">
                    No recurring monthly software bills, no 14-day trial cutoffs, and no feature lockouts. Access full cloud POS billing, table QR ordering, KDS, and inventory tracking without fixed software retainers.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DDE3DD] text-[11px] font-semibold text-[#002D23] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#002D23]">check_circle</span>
                  <span>Zero software subscription for life across all core modules.</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-[10px] bg-[#002D23]/10 text-[#002D23] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">receipt_long</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#64736D]">CUSTOMER-PAID FEE</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B1714] mb-2">
                    Customer-Paid ₹1 Order Fee
                  </h3>
                  <p className="text-xs text-[#64736D] leading-relaxed mb-4">
                    The ₹1 per-order BrewPluse fee is charged to the customer at order confirmation, never deducted from your cafe&apos;s earnings. Cafe owners pay ₹0 per order.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DDE3DD] text-[11px] font-semibold text-[#002D23] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#002D23]">check_circle</span>
                  <span>Your cafe doesn&apos;t pay BrewPluse per order.</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-[10px] bg-[#002D23]/10 text-[#002D23] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">devices</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#64736D]">HARDWARE FREEDOM</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B1714] mb-2">
                    Zero Proprietary Hardware Lock-In
                  </h3>
                  <p className="text-xs text-[#64736D] leading-relaxed mb-4">
                    BrewPluse operates in modern web browsers on iPads, Android tablets, laptops, and smartphones. It connects to standard 58mm and 80mm USB, Bluetooth, and LAN thermal receipt printers.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DDE3DD] text-[11px] font-semibold text-[#002D23] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#002D23]">check_circle</span>
                  <span>No expensive proprietary POS terminals or specialized hardware contracts.</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] hover:shadow-md transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-[10px] bg-[#002D23]/10 text-[#002D23] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">verified_user</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-[#64736D]">DATA SOVEREIGNTY</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0B1714] mb-2">
                    Your Data Is Always 100% Yours
                  </h3>
                  <p className="text-xs text-[#64736D] leading-relaxed mb-4">
                    You retain full ownership of your menu items, customer lists, order histories, and sales reports. Export your store records anytime in standard formats without restriction.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DDE3DD] text-[11px] font-semibold text-[#002D23] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#002D23]">check_circle</span>
                  <span>We never hold your cafe data hostage or restrict menu exports.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: System Simplification (5 Apps vs 1 Heartbeat) */}
      <SystemComparison />

      {/* Section 7: Transparent Pricing Architecture & Video Walkthrough */}
      <PricingCalculator />

      {/* Section 8: Feature Comparison Table & FAQ Accordion */}
      <WhyAndFaqSection />

      {/* Section 9: Final Conversion CTA Banner */}
      <CtaBanner />
    </div>
  );
}
