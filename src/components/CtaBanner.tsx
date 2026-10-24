import React from 'react';

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative w-full rounded-3xl bg-[#101512] border border-[#223026] text-white overflow-hidden shadow-2xl flex flex-col lg:block">
        {/* Subtle grid dot pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#10b981_1.5px,transparent_1.5px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_70%_at_50%_50%,#000_60%,transparent_100%)]" />

        {/* Ambient warm lighting halo */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/4 -translate-y-1/2 w-[420px] h-[420px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Right Half: BrewPluse Storefront Image with edge masks */}
        <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[50%] xl:w-[52%] w-full h-80 sm:h-96 lg:h-full flex items-center justify-end overflow-hidden z-10 order-2 lg:order-none">
          <img
            src="/brewpluse-storefront.png"
            alt="BrewPluse Cafe Storefront"
            className="w-full h-full object-cover object-center select-none pointer-events-none"
          />

          {/* Desktop Left-to-Right edge mask */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#101512] via-[#101512]/80 to-transparent pointer-events-none" />
          {/* Mobile Top-to-Bottom edge mask */}
          <div className="lg:hidden absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#101512] to-transparent pointer-events-none" />
        </div>

        {/* Left Half: Typography & Action Buttons */}
        <div className="relative z-20 p-8 sm:p-12 lg:p-14 lg:py-16 max-w-2xl text-left order-1 lg:order-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#16271c] border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold tracking-wider uppercase mb-5 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>THE SPECIALTY CAFE OPERATING SYSTEM</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-white tracking-tight leading-[1.2] mb-4">
            Engineered for velocity.<br className="hidden sm:inline" />
            Built for high-volume coffee bars.
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-normal leading-relaxed mb-8 max-w-lg">
            Run lightning-fast counter billing, contactless table QR ordering, synchronized kitchen displays, and instant UPI soundbox verification in one unified stack.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#07130c] text-sm font-bold shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span>Launch Your Cafe</span>
              <span>→</span>
            </a>
            <a
              href="/demo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/50 border border-white/20 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-sm"
            >
              <span className="material-symbols-outlined text-[18px] opacity-80">play_circle</span>
              <span>Experience Interactive POS</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-gray-300">
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[15px]">bolt</span>
              <span>3-Minute Onboarding</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[15px]">verified_user</span>
              <span>No Hardware Lock-in</span>
            </span>
            <span className="text-gray-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="material-symbols-outlined text-emerald-400 text-[15px]">wifi_off</span>
              <span>Offline Resilient</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
