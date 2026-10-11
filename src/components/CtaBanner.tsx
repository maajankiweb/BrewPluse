import React from 'react';

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative w-full rounded-3xl bg-[#111713] border border-[#223026] text-white overflow-hidden shadow-2xl flex flex-col lg:block">
        {/* Dot pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(#f59e0b_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Ambient warm lighting halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[420px] h-[420px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Right Half: BrewPluse Storefront Image with exact positioning and edge masks */}
        <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[50%] xl:w-[54%] w-full h-80 sm:h-96 lg:h-full flex items-center justify-end overflow-hidden z-10 order-2 lg:order-none">
          <img
            src="/storefront.png"
            alt="BrewPluse 3D Artisan Storefront"
            className="w-full h-full object-cover object-top select-none pointer-events-none"
          />

          {/* Desktop Left-to-Right edge mask */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#111713] via-[#111713]/70 to-transparent pointer-events-none" />
          {/* Mobile Top-to-Bottom edge mask */}
          <div className="lg:hidden absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#111713] to-transparent pointer-events-none" />
        </div>

        {/* Left Half: Typography & Action Buttons */}
        <div className="relative z-20 p-8 sm:p-12 lg:p-14 lg:py-16 max-w-2xl text-left order-1 lg:order-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16271c] border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>BUILT FOR CAFES, LOVED BY CUSTOMERS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.15] mb-4">
            Your cafe is already crafted with love.<br className="hidden sm:inline" />
            Now give it the operating system it deserves.
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed mb-8 max-w-lg">
            Join thousands of cafe owners who run smoother operations, happier customers, and more sales — with BrewPluse.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-semibold shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span>Start Free</span>
              <span className="text-emerald-400">→</span>
            </a>
            <a
              href="/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/40 border border-white/20 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-[18px] opacity-80">play_circle</span>
              <span>Explore Live Demo</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-gray-300">
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-400 text-[15px]">confirmation_number</span>
              <span>Free to start</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[15px]">verified_user</span>
              <span>No credit card</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-amber-300 text-[15px]">bolt</span>
              <span>Setup in minutes</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[15px]">support_agent</span>
              <span>24/7 Support</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
