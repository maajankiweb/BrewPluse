import React from 'react';
import Link from 'next/link';

export default function SystemComparison() {
  return (
    <section id="solutions" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2 block">
          OPERATIONAL VELOCITY
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141210] tracking-tight mb-4">
          Stop juggling disconnected tablets and loose thermal slips.
        </h2>
        <p className="text-sm sm:text-base text-[#5a554f] max-w-xl mx-auto leading-relaxed">
          High-volume coffee bars and bistros lose time and revenue when billing, table ordering, kitchen displays, and payments run on separate silos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-left">
        
        {/* Left Card: The Fragmented Stack */}
        <div className="rounded-3xl p-6 sm:p-8 border border-red-200/80 bg-gradient-to-b from-red-50/40 to-white flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-normal text-red-700">
                The Disjointed Stack
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#141210] mb-3">
              Friction at every counter touchpoint.
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              Cashiers shout coffee mods across the bar, payment screens require manual checking, and paper tickets pile up by the espresso grinder.
            </p>

            <ul className="space-y-3.5 text-xs text-gray-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 text-sm">✕</span>
                <div>
                  <strong className="text-red-900 font-bold">Manual UPI Verification Bottleneck:</strong> Cashiers must pause billing to inspect guest phone screens for screenshot fraud during peak morning queues.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 text-sm">✕</span>
                <div>
                  <strong className="text-red-900 font-bold">Kitchen &amp; Barista Mismatches:</strong> Special customization notes (oat milk, less sugar, single-origin switch) get lost between handwritten receipts and the prep counter.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 text-sm">✕</span>
                <div>
                  <strong className="text-red-900 font-bold">Hefty Monthly SaaS Rent:</strong> Legacy systems charge ₹3,000 to ₹6,000 every month even during off-seasons and monsoon lulls.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-red-100 text-xs font-mono text-red-700 font-semibold">
            Result: Bottlenecks at the till, delayed table turns, and barista burnout
          </div>
        </div>

        {/* Right Card: The BrewPluse Way */}
        <div className="rounded-3xl p-6 sm:p-8 border border-emerald-300 bg-gradient-to-b from-emerald-50/40 to-white flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-normal text-emerald-800">
                The BrewPluse Velocity Stack
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#141210] mb-3">
              Instant synchronization across every station.
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
              When a guest scans a table QR or orders at the register, tickets route directly to the barista KDS with real-time soundbox confirmation and automated inventory deduction.
            </p>

            <ul className="space-y-3.5 text-xs text-gray-700 font-medium">
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 text-sm">✔</span>
                <div>
                  <strong className="text-emerald-950 font-bold">Instant Soundbox Audio Dispatch:</strong> Real-time audio alerts for UPI payments so cashiers keep brewing without inspecting customer phones.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 text-sm">✔</span>
                <div>
                  <strong className="text-emerald-950 font-bold">Dynamic Table QR &amp; Self-Pay:</strong> Guests view live photo menus, customize roast profiles, and split tabs directly from their mobile browser without downloading apps.
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-emerald-600 font-bold shrink-0 text-sm">✔</span>
                <div>
                  <strong className="text-emerald-950 font-bold">Offline Write-Ahead Resilience:</strong> Keep punching orders and printing receipts through local network cache if broadband drops.
                </div>
              </li>
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-emerald-100 text-xs font-mono text-emerald-800 font-semibold">
            Result: 3x faster counter turns, accurate espresso tickets, and higher guest spend
          </div>
        </div>

      </div>
    </section>
  );
}
