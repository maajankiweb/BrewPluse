import React from 'react';

export default function SystemComparison() {
  return (
    <section id="solutions" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2 block">
          SYSTEM SIMPLIFICATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141210] tracking-tight mb-4">
          Your cafe shouldn&apos;t need 5 separate tools.
        </h2>
        <p className="text-sm sm:text-base text-[#5a554f] max-w-xl mx-auto leading-relaxed">
          Independent cafes lose thousands in lost orders, wasted days, and customer miscommunication when stitching together disconnected apps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
        
        {/* Left Card: The Traditional Way */}
        <div className="rounded-3xl p-6 sm:p-8 border border-red-200/80 bg-gradient-to-b from-red-50/50 to-white flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-normal text-red-700">
                The Traditional Way
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#141210] mb-3">
              5 apps, 0 communication.
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              A messy legacy POS misses an order. A PDF menu on Google Drive isn&apos;t updating. You manual Excel sheet. It all adds up to chaos.
            </p>

            <ul className="space-y-3.5 text-xs text-gray-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 text-sm">✕</span>
                <div>
                  <strong className="text-red-900 font-bold">Lost Counter Tickets:</strong> Kitchen miss tickets (20-30 cups lost/day)
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 text-sm">✕</span>
                <div>
                  <strong className="text-red-900 font-bold">Delay &amp; Manual Re-Entry:</strong> Bills, KDS, and stock extra time.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 text-sm">✕</span>
                <div>
                  <strong className="text-red-900 font-bold">No Real-time Updates:</strong> Team members operate in isolation with no inventory sync.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-red-100 text-xs font-mono text-red-700 font-semibold">
            Result: Lost sales, angry wait-times, unhappy regulars
          </div>
        </div>

        {/* Right Card: The BrewPluse Way */}
        <div className="rounded-3xl p-6 sm:p-8 border border-emerald-300 bg-gradient-to-b from-emerald-50/50 to-white flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-normal text-emerald-800">
                The BrewPluse Way
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#141210] mb-3">
              One synchronized heartbeat.
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              When an order is placed on Table 7, it arrives on the kitchen screen. Stock is updated. Loyalty is earned. Your team stays on the same page, instantly. One system. One flow. Zero manual re-entry.
            </p>

            <ul className="space-y-3.5 text-xs text-gray-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 text-sm">✔</span>
                <div>
                  <strong className="text-emerald-950 font-bold">Instant Sync:</strong> Orders, KDS, payments &amp; inventory in real-time.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 text-sm">✔</span>
                <div>
                  <strong className="text-emerald-950 font-bold">Regulars Made Happy:</strong> 1-tap checkout and loyalty builds lasting relationships.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 text-sm">✔</span>
                <div>
                  <strong className="text-emerald-950 font-bold">Zero Disruptions:</strong> Everything connected in one system saves time, fuel, and happy POS.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-emerald-100 text-xs font-mono text-emerald-800 font-semibold">
            Result: More time to focus on food. More smiles at the till.
          </div>
        </div>

      </div>
    </section>
  );
}
