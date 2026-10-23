import React from 'react';

export default function CtaBanner() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#101512] via-[#0c100e] to-[#080b09] border border-[#223026] text-white overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:28px_28px]" />

        {/* Ambient emerald & gold glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Left Half: Typography & Action Buttons */}
        <div className="relative z-20 p-8 sm:p-12 lg:p-14 flex-1 flex flex-col justify-between text-left">
          <div>
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
          </div>

          <div>
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/5 border border-white/15 text-white text-sm font-semibold hover:bg-white/10 hover:border-white/30 transition-all backdrop-blur-sm"
              >
                <span className="material-symbols-outlined text-[18px] opacity-80">play_circle</span>
                <span>Experience Interactive POS</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-gray-400">
              <span className="inline-flex items-center gap-1.5 text-gray-300">
                <span className="material-symbols-outlined text-emerald-400 text-[15px]">bolt</span>
                <span>3-Minute Onboarding</span>
              </span>
              <span className="text-gray-600">•</span>
              <span className="inline-flex items-center gap-1.5 text-gray-300">
                <span className="material-symbols-outlined text-emerald-400 text-[15px]">verified_user</span>
                <span>No Hardware Lock-in</span>
              </span>
              <span className="text-gray-600">•</span>
              <span className="inline-flex items-center gap-1.5 text-gray-300">
                <span className="material-symbols-outlined text-emerald-400 text-[15px]">wifi_off</span>
                <span>Offline Resilient</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Half: High-Tech BrewPluse Smart Terminal Showcase (Original Vector / CSS Component) */}
        <div className="relative z-20 lg:w-[48%] p-6 sm:p-10 flex items-center justify-center bg-gradient-to-l from-black/40 to-transparent border-t lg:border-t-0 lg:border-l border-[#1e2a21]">
          <div className="w-full max-w-md bg-[#131a16] border border-[#27372c] rounded-2xl p-4 sm:p-5 shadow-2xl text-left relative">
            
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-[#202c23]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-gray-200">BrewPluse Cloud Bridge</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Live Sync: 6ms
              </span>
            </div>

            {/* Simulated Live Ticket */}
            <div className="mt-4 p-3.5 rounded-xl bg-[#0d120f] border border-[#1b261f]">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-emerald-400 font-bold">TABLE #06 • QR SESSION</span>
                <span className="text-gray-500 font-mono text-[10px]">14:22:08</span>
              </div>
              
              <div className="mt-3 space-y-2 border-t border-[#1a241e] pt-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>1x Double Shot Cortado (Oat Milk)</span>
                  <span className="font-mono font-semibold text-white">₹240</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>1x Truffle Mushroom Brioche</span>
                  <span className="font-mono font-semibold text-white">₹380</span>
                </div>
                <div className="flex justify-between text-gray-400 text-[11px]">
                  <span>GST (5%)</span>
                  <span className="font-mono">₹31</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#1a241e] flex justify-between items-center">
                <span className="text-xs text-gray-400 font-medium">Total Bill</span>
                <span className="text-base font-bold font-mono text-emerald-400">₹651.00</span>
              </div>
            </div>

            {/* Soundbox + KDS Indicator Cards */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded-lg bg-[#17221b] border border-[#233328] flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-400 text-[18px]">volume_up</span>
                <div className="text-[10px]">
                  <div className="text-white font-bold">Soundbox Alert</div>
                  <div className="text-emerald-400 font-mono">Paid via UPI</div>
                </div>
              </div>
              <div className="p-2.5 rounded-lg bg-[#17221b] border border-[#233328] flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-400 text-[18px]">receipt</span>
                <div className="text-[10px]">
                  <div className="text-white font-bold">Thermal KDS</div>
                  <div className="text-amber-400 font-mono">Ticket Sent</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
