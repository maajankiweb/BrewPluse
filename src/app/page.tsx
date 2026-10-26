import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import HeroPosMockup from '@/components/HeroPosMockup';
import TrustBar from '@/components/TrustBar';
import Testimonials from '@/components/Testimonials';
import SystemComparison from '@/components/SystemComparison';
import PricingCalculator from '@/components/PricingCalculator';
import FeatureGrid from '@/components/FeatureGrid';
import WhyAndFaqSection from '@/components/WhyAndFaqSection';
import CtaBanner from '@/components/CtaBanner';

export const metadata: Metadata = {
  title: 'BrewPluse – Free AI Cafe POS & Restaurant POS',
  description:
    'Free AI-powered Cafe POS & Restaurant POS with contactless QR table ordering, live KDS, thermal billing & recipe inventory. ₹0/month fees for modern cafes.',
  alternates: {
    canonical: 'https://brewpluse.com/',
  },
  openGraph: {
    title: 'BrewPluse – Free AI Cafe POS & Restaurant POS',
    description:
      'Free AI Cafe POS & Restaurant POS with contactless QR table ordering, live KDS, and recipe inventory. Zero monthly software fees for modern coffee shops.',
    url: 'https://brewpluse.com/',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/storefront.png',
        width: 1200,
        height: 630,
        alt: 'BrewPluse – Cloud Point of Sale and Cafe Operating System',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrewPluse – Cloud POS & Cafe Management Software',
    description:
      'Manage cafe billing, table QR ordering, live KDS screens, and inventory with BrewPluse. Zero monthly fees for modern cafes, coffee shops & restaurants.',
    images: ['/storefront.png'],
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E7E5E0] shadow-2xs text-xs font-mono font-semibold text-[#141210] mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>Smart Cafe POS &amp; Restaurant POS Software</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#141210] leading-[1.1] mb-5">
              Modern Cafe POS &amp;<br />
              <span className="text-[#005c36]">Restaurant POS System.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] leading-relaxed mb-6 max-w-md">
              AI-powered menus, contactless QR table ordering, live KDS kitchen display, and rapid counter billing for modern coffee shops and restaurants — unified with ₹0/month software fees.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0b2b1a] text-white text-sm font-semibold hover:bg-black shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span>Start Free Forever</span>
                <span className="text-emerald-400">→</span>
              </Link>

              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white border border-[#E7E5E0] text-[#141210] text-sm font-semibold hover:bg-[#F3F2EE] transition-all"
              >
                <span className="material-symbols-outlined text-emerald-700 text-[18px]">play_circle</span>
                <span>Explore Live Demo</span>
              </a>
            </div>

            {/* Reassurance Checks */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#5a554f] mb-6">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✔</span> ₹0/month software subscription
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✔</span> Runs on any iPad, PC or phone
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✔</span> 5-minute setup
              </span>
            </div>

            {/* Quick Keyword In-Page Cross-Links */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs text-gray-500 pt-3 border-t border-gray-200 w-full">
              <span className="font-mono text-gray-400 font-semibold mr-1">Quick Links:</span>
              <Link href="/cafe-pos" className="text-emerald-800 hover:text-emerald-950 font-medium underline">Cafe POS</Link>
              <span>•</span>
              <Link href="/restaurant-pos" className="text-emerald-800 hover:text-emerald-950 font-medium underline">Restaurant POS</Link>
              <span>•</span>
              <Link href="/qr-ordering-system" className="text-emerald-800 hover:text-emerald-950 font-medium underline">QR Table Ordering</Link>
              <span>•</span>
              <Link href="/kitchen-display-system" className="text-emerald-800 hover:text-emerald-950 font-medium underline">Kitchen KDS</Link>
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

      {/* Section 3: Verified Cafe Testimonials */}
      <Testimonials />

      {/* Section 4: System Simplification (5 Apps vs 1 Heartbeat) */}
      <SystemComparison />

      {/* Section 5: Transparent Pricing Architecture & Video Walkthrough */}
      <PricingCalculator />

      {/* Section 6: Features Grid */}
      <FeatureGrid />

      {/* Section 6.5: Solutions Directory & Cross-Linking Hub for Cafes & Restaurants */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#F4F3EF] border-y border-[#E7E5E0]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2 block">
              OPERATING SYSTEMS BUILT FOR YOUR VENUE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141210] tracking-tight mb-3">
              Purpose-Built for Cafes, Coffee Shops &amp; Restaurants
            </h2>
            <p className="text-sm sm:text-base text-[#5a554f]">
              Whether you are running an artisanal espresso counter or a busy full-service dining restaurant, BrewPluse adapts to your exact service rhythm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {/* Card 1: Cafe POS */}
            <div className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold mb-4 border border-emerald-200">
                  Coffee Shops &amp; Bakeries
                </div>
                <h3 className="text-xl font-bold text-[#141210] mb-2">Cafe POS (CafePOS)</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  2-tap speed counter billing, milk and syrup modifier customization, offline cash resilience, and thermal KOT printing for rush-hour baristas.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link href="/cafe-pos" className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1">
                  <span>Explore Cafe POS</span>
                  <span>→</span>
                </Link>
                <Link href="/free-cafe-management-software" className="text-xs text-gray-500 hover:text-emerald-700">
                  Free Tier Details
                </Link>
              </div>
            </div>

            {/* Card 2: Restaurant POS */}
            <div className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-800 font-mono text-[11px] font-bold mb-4 border border-blue-200">
                  Dining Rooms &amp; Bars
                </div>
                <h3 className="text-xl font-bold text-[#141210] mb-2">Restaurant POS System</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  Visual table floor map, split billing, multi-station KOT routing (Bar vs. Kitchen), manager PIN access controls, and table turnover tracking.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link href="/restaurant-pos" className="text-xs font-bold text-blue-800 hover:text-blue-950 flex items-center gap-1">
                  <span>Explore Restaurant POS</span>
                  <span>→</span>
                </Link>
                <Link href="/free-restaurant-pos" className="text-xs text-gray-500 hover:text-blue-700">
                  Free Tier Details
                </Link>
              </div>
            </div>

            {/* Card 3: QR Table Ordering */}
            <div className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-amber-50 text-amber-800 font-mono text-[11px] font-bold mb-4 border border-amber-200">
                  Contactless Ordering
                </div>
                <h3 className="text-xl font-bold text-[#141210] mb-2">QR Ordering System</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  Turn every dining table into an instant ordering station. Diners scan QR codes to customize dishes, settle bills via UPI, and cut wait times by 35%.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link href="/qr-ordering-system" className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1">
                  <span>View QR Ordering</span>
                  <span>→</span>
                </Link>
                <Link href="/digital-menu" className="text-xs text-gray-500 hover:text-amber-700">
                  Digital Menu
                </Link>
              </div>
            </div>

            {/* Card 4: Kitchen Display System */}
            <div className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-purple-50 text-purple-800 font-mono text-[11px] font-bold mb-4 border border-purple-200">
                  Kitchen Automation
                </div>
                <h3 className="text-xl font-bold text-[#141210] mb-2">Kitchen Display (KDS)</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  Paperless kitchen order screens with color-coded preparation timers, station bump bars, and real-time alerts for chefs and baristas.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link href="/kitchen-display-system" className="text-xs font-bold text-purple-800 hover:text-purple-950 flex items-center gap-1">
                  <span>View Kitchen KDS</span>
                  <span>→</span>
                </Link>
                <Link href="/staff-ordering-system" className="text-xs text-gray-500 hover:text-purple-700">
                  Waiter App
                </Link>
              </div>
            </div>

            {/* Card 5: Cafe Management Software */}
            <div className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-800 font-mono text-[11px] font-bold mb-4 border border-teal-200">
                  Full Back-Office Suite
                </div>
                <h3 className="text-xl font-bold text-[#141210] mb-2">Cafe Management Software</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  Raw material recipe stock deductions, automated daily telemetry, multi-outlet reporting, and digital loyalty stamp cards.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link href="/cafe-management-software" className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1">
                  <span>View Cafe Software</span>
                  <span>→</span>
                </Link>
                <Link href="/blog" className="text-xs text-gray-500 hover:text-teal-700">
                  Read Guides
                </Link>
              </div>
            </div>

            {/* Card 6: Restaurant Management Software */}
            <div className="p-7 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col justify-between">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-rose-50 text-rose-800 font-mono text-[11px] font-bold mb-4 border border-rose-200">
                  Operations &amp; Cost Control
                </div>
                <h3 className="text-xl font-bold text-[#141210] mb-2">Restaurant Management</h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                  Complete dining operations architecture: tableside ordering, recipe food costing, GST tax ledgers, and zero monthly SaaS retainers.
                </p>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link href="/restaurant-management-software" className="text-xs font-bold text-rose-800 hover:text-rose-950 flex items-center gap-1">
                  <span>View Restaurant System</span>
                  <span>→</span>
                </Link>
                <Link href="/how-to-use" className="text-xs text-gray-500 hover:text-rose-700">
                  Setup Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Why BrewPluse Table + Honest Answers FAQ Accordion */}
      <WhyAndFaqSection />

      {/* Section 8: Bottom CTA Banner */}
      <CtaBanner />
    </div>
  );
}
