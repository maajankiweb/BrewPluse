'use client';

import React from 'react';

export default function PricingCalculator() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#0b120e] text-white relative overflow-hidden">
      {/* Background ambient radial gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section 5 Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-block text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3">
            TRANSPARENT PRICING ARCHITECTURE
          </div>
          <div className="text-xs sm:text-sm font-mono text-gray-400 mb-2">
            Most cafe software starts with a bill. <br className="sm:hidden" />
            <span className="text-gray-300">₹999/month</span> • <span className="text-gray-300">₹1,999/month</span> • Annual plans • Setup fees
          </div>
          <div className="text-sm font-mono text-gray-400 mb-4">
            BrewPluse starts with:
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-3">
            Run BrewPluse for <br />
            <span className="text-emerald-400">₹0 / month. Forever.</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto">
            No subscription. No setup fee. No upfront software payment.
          </p>
          <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 max-w-xl mx-auto text-xs text-gray-300 leading-relaxed font-mono">
            <span className="text-emerald-400 font-bold">How BrewPluse works:</span> We don&apos;t charge your cafe a monthly software subscription. For eligible orders, a small <span className="text-white font-bold">₹1 BrewPluse fee</span> is applied through the order payment flow.
          </div>
        </div>

        {/* 2 Side-by-side Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 text-left">
          
          {/* Card 1: Subscription */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#141e17] to-[#0e1610] border border-emerald-900/60 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    1. CAFE SOFTWARE SUBSCRIPTION
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    YOUR CAFE PAYS
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">
                    ₹0
                  </div>
                  <div className="text-[10px] font-mono text-gray-400">/ month FOREVER</div>
                </div>
              </div>

              <ul className="space-y-3.5 text-xs text-gray-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span><strong>Software subscription:</strong> ₹0 / month</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span><strong>Setup fee:</strong> ₹0</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span><strong>Upfront software payment:</strong> ₹0</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span><strong>Full feature access:</strong> POS, QR, KDS &amp; Inventory</span>
                </li>
              </ul>

              <p className="text-xs text-gray-400 leading-relaxed mb-6">
                You use the entire platform without a software bill. No monthly retainers, no contract lock-in.
              </p>
            </div>

            <div className="space-y-2">
              <a
                href="/signup"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg"
              >
                <span>Start Your Cafe — Free</span>
                <span>→</span>
              </a>
              <div className="text-center text-[10px] font-mono text-gray-500">
                No credit card required
              </div>
            </div>
          </div>

          {/* Card 2: Order-level fee */}
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#141e17] to-[#0e1610] border border-emerald-900/60 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    2. ORDER-LEVEL BREWPLUSE FEE
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    APPLIED PER TRANSACTION
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono">
                    ₹1
                  </div>
                  <div className="text-xs font-mono text-gray-400">/ eligible order</div>
                </div>
              </div>

              {/* Order summary preview */}
              <div className="rounded-2xl p-4 bg-black/40 border border-white/5 space-y-2 text-xs font-mono mb-6">
                <div className="flex justify-between text-gray-400 text-xs pb-2 border-b border-white/10">
                  <span>BREWPLUSE ORDER SUMMARY</span>
                  <span>Order #BP1024 • Table 4</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Cappuccino</span>
                  <span>₹120</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Cheese Sandwich</span>
                  <span>₹99</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Brownie</span>
                  <span>₹120</span>
                </div>
                <div className="flex justify-between text-gray-400 pt-1 border-t border-white/10">
                  <span>Food &amp; beverage total</span>
                  <span>₹339</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-bold">
                  <span>BrewPluse order fee</span>
                  <span>₹1</span>
                </div>
                <div className="flex justify-between text-white font-extrabold text-sm pt-1 border-t border-white/10">
                  <span>Order total</span>
                  <span className="text-emerald-300">₹339 + ₹1</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 font-mono mb-4">
                <span className="material-symbols-outlined text-[18px] text-emerald-400">verified</span>
                <span>Your BrewPluse software subscription: <strong>₹0 /month</strong></span>
              </div>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              The ₹1 fee is an order-level platform fee — never a software subscription charge.
            </p>
          </div>

        </div>

        {/* Who pays the ₹1? Block */}
        <div className="rounded-3xl p-6 sm:p-10 bg-[#121914] border border-emerald-900/40 shadow-xl mb-16 text-left">
          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-2">
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span>Who pays the ₹1?</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
            The ₹1 BrewPluse fee is handled as part of the eligible order&apos;s payment flow. BrewPluse provides complete flexibility depending on your cafe&apos;s preferred setup:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-white/10">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[18px]">person</span>
                <span>Customer-Faced Model</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                On eligible orders, the ₹1 BrewPluse fee is added to the customer&apos;s order total and shown clearly before payment.
              </p>
              <div className="text-xs text-gray-300 font-mono space-y-1 pt-1">
                <div>• Cafe keeps 100% of food revenue</div>
                <div>• Cafe pays <strong>₹0 software fee &amp; ₹0 order fee</strong></div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs sm:text-sm">
                <span className="material-symbols-outlined text-[18px]">store</span>
                <span>Cafe-Faced Model</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                The ₹1 BrewPluse fee is covered by the cafe according to applicable order terms, keeping the customer&apos;s bill completely fee-free.
              </p>
              <div className="text-xs text-gray-300 font-mono space-y-1 pt-1">
                <div>• Frictionless customer checkout</div>
                <div>• Software subscription remains <strong>₹0 /month</strong></div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-gray-400">
            <span>You can switch between fee models anytime in your BrewPluse dashboard.</span>
            <span className="text-emerald-400 font-bold">Both options = ₹0 monthly software bill</span>
          </div>
        </div>

        {/* Video Walkthrough Section (Temporarily hidden until custom BrewPluse video is published) */}
        {/*
        <div className="rounded-3xl p-6 sm:p-10 bg-[#121914] border border-emerald-900/40 shadow-xl mb-16 text-left">
          <div className="max-w-3xl mb-6">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
              VIDEO WALKTHROUGH • HOW TO USE BREWPLUSE
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              See How to Run Your Cafe on BrewPluse
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Watch our complete step-by-step video guide on configuring your menu, table QR ordering, cashier billing, and thermal receipt printing.
            </p>
          </div>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/10 shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/pt-x6OqOvIA?si=brewpluse"
              title="BrewPluse Cafe POS &amp; Operations Setup Guide"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          <div className="mt-4 flex items-center justify-between flex-wrap gap-3 text-xs font-mono text-gray-400 px-2">
            <a
              href="https://youtu.be/pt-x6OqOvIA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold"
            >
              <span className="material-symbols-outlined text-[16px] text-red-500">play_circle</span>
              <span>Watch directly on YouTube (https://youtu.be/pt-x6OqOvIA)</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
            <a href="/#faq" className="text-gray-300 hover:text-white underline">
              Read step-by-step setup documentation →
            </a>
          </div>
        </div>
        */}

        {/* Bottom Banner of Section 5 */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-block text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase mb-3">
            CLEAR • HONEST • TRANSPARENT
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
            Free to run.<br />
            Simple to understand.<br />
            Built to grow with your cafe.
          </div>
          <p className="text-base font-semibold text-emerald-400 font-mono mb-1">
            ₹0/month software subscription.
          </p>
          <p className="text-xs text-gray-400 font-mono mb-6">
            Order-level fees apply where applicable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="/signup"
              className="px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-lg"
            >
              Start Your Cafe — Free →
            </a>
            <a
              href="/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-emerald-400">play_circle</span>
              <span>Explore Live Demo</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
