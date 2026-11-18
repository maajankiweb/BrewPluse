'use client';

import React from 'react';
import Link from 'next/link';

export default function PricingCalculator() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#001F19] text-[#F7F5EC] relative overflow-hidden border-y border-[#002D23] reveal-on-scroll">
      {/* Background radial dots and ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#B99A5B_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#002D23]/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#B99A5B]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002D23] border border-[#B99A5B]/30 text-[#B99A5B] font-mono text-[11px] font-bold tracking-wider uppercase mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#B99A5B] animate-pulse" />
            <span>TRANSPARENT PRICING ARCHITECTURE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F7F5EC] tracking-tight leading-[1.1] mb-4">
            Free for cafe owners.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F7F5EC] via-[#FFFEFA] to-[#B99A5B]">
              Clear for customers.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#64736D] max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
            Manage your cafe with BrewPluse without paying a monthly subscription or per-order software fee as a cafe owner.
          </p>
          <div className="p-4 rounded-2xl bg-[#002D23]/40 border border-[#002D23] max-w-2xl mx-auto text-xs sm:text-sm text-[#F7F5EC] leading-relaxed font-normal">
            <strong className="text-[#B99A5B]">Core Pricing Rule:</strong> Cafe owners pay{' '}
            <strong className="text-white">₹0 to use BrewPluse</strong>. The{' '}
            <strong className="text-[#B99A5B]">₹1 per-order BrewPluse fee</strong> is paid by the customer, not deducted from the cafe owner&apos;s pocket.
          </div>
        </div>

        {/* 2 Main Cards */}
        <div className="max-w-5xl mx-auto mb-12 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: For Cafe Owners */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#002D23] border-2 border-[#B99A5B]/30 shadow-2xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#B99A5B]/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001F19] border border-[#B99A5B]/30 text-[#B99A5B] font-mono text-[10px] font-bold uppercase tracking-wider mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5B]" />
                  <span>FOR CAFE OWNERS</span>
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#64736D] mb-1 font-semibold">
                  YOUR CAFE PAYS
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl sm:text-7xl font-black text-white font-mono tracking-tighter">₹0</span>
                  <span className="text-lg font-mono text-[#B99A5B] font-bold uppercase tracking-wider">/ month</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#001F19] border border-[#B99A5B]/20 text-[#B99A5B] text-xs sm:text-sm font-bold mb-6 font-mono">
                  Your cafe doesn&apos;t pay BrewPluse per order.
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-gray-200 font-mono mb-8">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#B99A5B] text-[18px]">check_circle</span>
                    <span><strong>Monthly software subscription:</strong> ₹0 forever</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#B99A5B] text-[18px]">check_circle</span>
                    <span><strong>Per-order fee charged to cafe:</strong> ₹0</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#B99A5B] text-[18px]">check_circle</span>
                    <span><strong>Setup or onboarding fees:</strong> ₹0</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#B99A5B] text-[18px]">check_circle</span>
                    <span><strong>No paid trial:</strong> Free for life with full feature access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#B99A5B] text-[18px]">check_circle</span>
                    <span><strong>Food revenue:</strong> Cafe keeps 100% of all food &amp; drinks billed</span>
                  </div>
                </div>
              </div>
              <div>
                <Link
                  href="/signup"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-[#B99A5B] hover:bg-[#A8894A] text-[#001F19] text-sm font-bold shadow-lg transition-all hover:scale-[1.01]"
                >
                  <span>Start Your Free Cafe</span>
                  <span>→</span>
                </Link>
                <div className="text-center text-[10px] font-mono text-[#64736D] mt-2">
                  No credit card required • Setup in &lt; 5 minutes
                </div>
              </div>
            </div>

            {/* Card 2: For Customers */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#001F19] border border-[#002D23] shadow-2xl flex flex-col justify-between font-mono">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D23] border border-[#B99A5B]/30 text-[#B99A5B] font-mono text-[10px] font-bold uppercase tracking-wider mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B99A5B]" />
                  <span>FOR CUSTOMERS</span>
                </div>
                <div className="text-xs uppercase tracking-wider text-[#64736D] mb-1 font-semibold">
                  CUSTOMER TRANSACTION FEE
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-[#B99A5B] font-mono tracking-tight">₹1</span>
                  <span className="text-xs font-mono text-[#64736D] font-semibold">/ order</span>
                </div>
                <div className="p-3.5 rounded-xl bg-[#002D23]/60 border border-[#002D23] text-[#F7F5EC] text-xs sm:text-sm font-bold mb-6 font-mono">
                  The ₹1 BrewPluse fee is paid by the customer, not the cafe owner.
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-[#F7F5EC]/80 font-mono mb-6">
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#B99A5B] font-bold">•</span>
                    <span>A ₹1 per-order BrewPluse fee applies to the customer under the current India pricing model.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#B99A5B] font-bold">•</span>
                    <span>The fee must be disclosed before the customer confirms an order.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#B99A5B] font-bold">•</span>
                    <span>This is a platform digital convenience fee — not a tax and not a payment-processing charge.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-[#B99A5B] font-bold">•</span>
                    <span>Zero deduction from the cafe owner&apos;s earnings on any transaction.</span>
                  </div>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-[#001712] border border-[#002D23] text-[11px] text-[#F7F5EC]/80 space-y-1">
                <div className="text-[#B99A5B] font-bold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px]">verified</span>
                  <span>100% Payout Protection for Cafes</span>
                </div>
                <div className="text-[#64736D] text-[10px]">
                  BrewPluse does not take a percentage cut of your food sales or deduct software fees from your menu payouts.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How an Order Works in Practice */}
        <div className="max-w-4xl mx-auto mb-16 text-left reveal-on-scroll">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#001F19] border border-[#002D23] shadow-xl">
            <div className="flex items-center gap-2.5 text-base font-bold text-[#F7F5EC] mb-2">
              <span className="material-symbols-outlined text-[#B99A5B] text-[20px]">calculate</span>
              <h3 className="text-lg font-bold text-[#F7F5EC]">How an Order Works in Practice</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#64736D] leading-relaxed mb-6 font-normal">
              If a customer places an order, the customer pays the applicable order amount plus the ₹1 BrewPluse fee. The cafe owner does not pay that ₹1 fee to BrewPluse.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-2xl bg-[#002D23]/50 border border-[#002D23] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-[#64736D] uppercase tracking-wider mb-2 font-bold">1. Customer Checkout</div>
                  <div className="space-y-1.5 text-gray-300 mb-3">
                    <div className="flex justify-between">
                      <span>Cappuccino (Menu Price)</span>
                      <span className="font-bold text-white">₹120</span>
                    </div>
                    <div className="flex justify-between text-[#B99A5B] font-semibold">
                      <span>BrewPluse customer fee</span>
                      <span>+₹1</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#002D23] flex justify-between font-bold text-white">
                  <span>Customer pays total:</span>
                  <span className="text-[#B99A5B]">₹121</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#002D23] border border-[#B99A5B]/30 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-[#B99A5B] uppercase tracking-wider mb-2 font-bold">2. Cafe Owner Receives</div>
                  <div className="space-y-1.5 text-gray-300 mb-3">
                    <div className="flex justify-between">
                      <span>Food &amp; Beverage Payout</span>
                      <span className="font-bold text-[#B99A5B]">₹120</span>
                    </div>
                    <div className="text-[10px] text-gray-400 leading-relaxed">
                      100% of your food ticket is yours. No percentage cut taken by BrewPluse.
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#001F19] flex justify-between font-bold text-[#F7F5EC]">
                  <span>Cafe revenue:</span>
                  <span>₹120 (100%)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#001712] border border-[#002D23] flex flex-col justify-between">
                <div>
                  <div className="text-[10px] text-[#64736D] uppercase tracking-wider mb-2 font-bold">3. Cafe Owner Cost</div>
                  <div className="space-y-1.5 text-gray-300 mb-3">
                    <div className="flex justify-between">
                      <span>Monthly software bill:</span>
                      <span className="font-bold text-white">₹0</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order fee paid by cafe:</span>
                      <span className="font-bold text-white">₹0</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-[#002D23] flex justify-between font-bold text-[#B99A5B]">
                  <span>Total cost to cafe:</span>
                  <span>₹0</span>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Bottom Conversion Banner */}
        <div className="max-w-2xl mx-auto text-center reveal-on-scroll">
          <div className="inline-block text-xs font-mono font-bold tracking-widest text-[#B99A5B] uppercase mb-3">
            CLEAR • HONEST • TRANSPARENT
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#F7F5EC] tracking-tight leading-tight mb-3">
            Free for cafe owners.<br />
            Built to grow with your business.
          </div>
          <p className="text-base font-semibold text-[#B99A5B] font-mono mb-1">
            ₹0/month software subscription. ₹0 software fee per order for cafes.
          </p>
          <p className="text-xs text-[#64736D] font-mono mb-6">
            The ₹1 fee is paid by the customer, not deducted from the cafe owner.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[10px] bg-[#002D23] hover:bg-[#001712] text-[#FFFEFA] text-sm font-bold shadow-xl border border-[#B99A5B]/30 transition-all hover:scale-[1.02]"
            >
              <span>Start Your Free Cafe</span>
              <span>→</span>
            </Link>
            <a
              href="/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-[10px] bg-white/10 hover:bg-white/15 text-white text-sm font-semibold border border-white/15 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">play_circle</span>
              <span>Explore Live Demo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
