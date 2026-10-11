import React from 'react';
import HeroPosMockup from '@/components/HeroPosMockup';
import TrustBar from '@/components/TrustBar';
import Testimonials from '@/components/Testimonials';
import SystemComparison from '@/components/SystemComparison';
import PricingCalculator from '@/components/PricingCalculator';
import FeatureGrid from '@/components/FeatureGrid';
import WhyAndFaqSection from '@/components/WhyAndFaqSection';
import CtaBanner from '@/components/CtaBanner';

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
              <span>Built for modern cafes &amp; restaurants</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-[#141210] leading-[1.1] mb-5">
              Run your cafe.<br />
              <span className="text-[#005c36]">Not your software.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5a554f] leading-relaxed mb-8 max-w-md">
              Menus, QR ordering, payments, loyalty, delivery and your digital storefront — all connected in one simple system.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
              <a
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0b2b1a] text-white text-sm font-semibold hover:bg-black shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span>Start Free Forever</span>
                <span className="text-emerald-400">→</span>
              </a>

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
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-[#5a554f]">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✔</span> Free to start
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✔</span> You choose who covers the fee
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-bold">✔</span> Setup in &lt; 5 minutes
              </span>
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

      {/* Section 7: Why BrewPluse Table + Honest Answers FAQ Accordion */}
      <WhyAndFaqSection />

      {/* Section 8: Bottom CTA Banner */}
      <CtaBanner />
    </div>
  );
}
