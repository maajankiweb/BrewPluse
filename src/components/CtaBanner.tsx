import React from 'react';
import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto reveal-on-scroll">
      <div className="relative w-full rounded-[28px] md:rounded-[36px] bg-[#001F19] border border-[#002D23] text-white overflow-hidden shadow-2xl flex flex-col lg:block">
        {/* Radial gold dot pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#B99A5B_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Ambient deep green and gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[420px] h-[420px] bg-[#002D23]/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#B99A5B]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Right half: BrewPluse Storefront image with subtle edge fade masks */}
        <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[50%] xl:w-[52%] w-full h-80 sm:h-96 lg:h-full flex items-center justify-end overflow-hidden z-10 order-2 lg:order-none">
          <img
            src="/brewpluse-storefront.jpg"
            alt="BrewPluse Cafe Storefront"
            title="BrewPluse Modern Artisan Cafe Storefront"
            className="w-full h-full object-cover object-center select-none"
          />
          <div className="hidden lg:block absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#001F19] via-[#001F19]/70 to-transparent pointer-events-none" />
          <div className="lg:hidden absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#001F19] to-transparent pointer-events-none" />
        </div>

        {/* Left half: Copy and CTAs */}
        <div className="relative z-20 p-8 sm:p-12 lg:p-14 lg:py-16 max-w-2xl text-left order-1 lg:order-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#002D23] border border-[#B99A5B]/30 text-[#B99A5B] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B99A5B]" />
            <span>BUILT FOR MODERN CAFES &amp; RESTAURANTS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Run your cafe with the operating system it deserves.
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed mb-8 max-w-lg">
            Manage orders, menus, kitchen operations, and customer experiences with BrewPluse — ₹0/month forever for cafe owners. Zero per-order fee for cafes.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[10px] bg-[#002D23] hover:bg-[#001712] text-[#FFFEFA] border border-[#B99A5B]/30 text-sm font-bold shadow-lg transition-all"
            >
              <span>Start Your Free Cafe</span>
              <span className="text-[#B99A5B]">→</span>
            </Link>
            <a
              href="/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-white/10 border border-white/20 text-[#FFFEFA] text-sm font-semibold hover:bg-white/15 transition-all backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-[18px] opacity-80">play_circle</span>
              <span>Explore Live Demo</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-gray-300">
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#B99A5B] text-[15px]">verified_user</span>
              <span>₹0/month for cafe owners</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#B99A5B] text-[15px]">check_circle</span>
              <span>Customer pays ₹1 fee</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#B99A5B] text-[15px]">bolt</span>
              <span>Setup in &lt; 5 mins</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#B99A5B] text-[15px]">credit_card_off</span>
              <span>No credit card required</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
