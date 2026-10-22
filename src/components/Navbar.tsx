'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [modulesOpen, setModulesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EBE8E3] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5 focus:outline-none group">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0b2b1a] text-white flex items-center justify-center border border-[#E7E5E0] shadow-2xs group-hover:scale-105 transition-transform duration-200">
              <span className="material-symbols-outlined text-[20px] text-emerald-400">local_cafe</span>
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#141210]">
                Brew<span className="text-emerald-700">Pluse</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-medium text-[#4a4642]">

          {/* Features badge link */}
          <Link
            href="/features"
            className="px-3.5 py-2 rounded-full hover:bg-[#F5F4F0] transition-colors font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px] text-emerald-700">stars</span>
            <span>Features</span>
          </Link>

          {/* Modules Dropdown */}
          <div
            className="nav-dropdown relative group py-2"
            onMouseEnter={() => setModulesOpen(true)}
            onMouseLeave={() => setModulesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-3.5 py-2 rounded-full hover:bg-[#F5F4F0] hover:text-black transition-all duration-150 focus:outline-none cursor-pointer group-hover:bg-[#F5F4F0] group-hover:text-black"
            >
              <span>Modules</span>
              <span className="material-symbols-outlined text-[18px] opacity-60 group-hover:rotate-180 group-hover:opacity-100 transition-transform duration-300">
                expand_more
              </span>
            </button>

            {modulesOpen && (
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 w-[580px] z-50 animate-fade-in">
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-[#E7E5E0] ring-1 ring-black/5">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/cafe-pos"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-emerald-800 transition-colors">
                          Cafe POS (CafePOS)
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Rapid 2-tap counter billing &amp; KOT
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/restaurant-pos"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">table_bar</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-blue-800 transition-colors">
                          Restaurant POS System
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Dining floor layout &amp; split checks
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/qr-ordering-system"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-amber-800 transition-colors">
                          QR Table Ordering
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Contactless self-ordering &amp; UPI
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/kitchen-display-system"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">skillet</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-purple-800 transition-colors">
                          Kitchen Display (KDS)
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Paperless kitchen &amp; barista screen
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/digital-menu"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-800 flex items-center justify-center shrink-0 group-hover/item:bg-rose-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-rose-800 transition-colors">
                          Digital QR Menu
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Visual food photos &amp; live 86 toggle
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/staff-ordering-system"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 group-hover/item:bg-teal-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">devices</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-teal-800 transition-colors">
                          Staff Waiter Ordering
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Handheld mobile order taking
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#EBE8E3] flex items-center justify-between px-2">
                    <Link
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition-colors"
                      href="/features"
                    >
                      <span>Explore All 18+ Features &amp; POS Modules</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            className="nav-dropdown relative group py-2"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-3.5 py-2 rounded-full hover:bg-[#F5F4F0] hover:text-black transition-all duration-150 focus:outline-none cursor-pointer group-hover:bg-[#F5F4F0] group-hover:text-black"
            >
              <span>Solutions</span>
              <span className="material-symbols-outlined text-[18px] opacity-60 group-hover:rotate-180 group-hover:opacity-100 transition-transform duration-300">
                expand_more
              </span>
            </button>

            {solutionsOpen && (
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 w-[500px] z-50 animate-fade-in">
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-[#E7E5E0] ring-1 ring-black/5 space-y-1.5">
                  <Link
                    href="/cafe-management-software"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">local_cafe</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-amber-800 transition-colors">
                        Cafe Management Software
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Built for coffee shops, bakeries &amp; tea cafes
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/restaurant-management-software"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-800 flex items-center justify-center shrink-0 group-hover/item:bg-orange-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">restaurant</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-orange-800 transition-colors">
                        Restaurant Management Software
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Full-service dining rooms, multi-station KOTs &amp; bar
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/free-cafe-management-software"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">money_off</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-emerald-800 transition-colors">
                        Free Cafe POS &amp; Software
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        ₹0/month subscription model for modern cafes
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/free-restaurant-pos"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">savings</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-blue-800 transition-colors">
                        Free Restaurant POS System
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Table floor plans, split checks &amp; KDS at ₹0/month
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            className="px-3.5 py-2 rounded-full hover:bg-[#F5F4F0] hover:text-black transition-colors"
            href="/pricing"
          >
            Pricing
          </Link>

          {/* Resources Dropdown */}
          <div
            className="nav-dropdown relative group py-2"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-3.5 py-2 rounded-full hover:bg-[#F5F4F0] hover:text-black transition-all duration-150 focus:outline-none cursor-pointer group-hover:bg-[#F5F4F0] group-hover:text-black"
            >
              <span>Resources</span>
              <span className="material-symbols-outlined text-[18px] opacity-60 group-hover:rotate-180 group-hover:opacity-100 transition-transform duration-300">
                expand_more
              </span>
            </button>

            {resourcesOpen && (
              <div className="nav-dropdown-menu absolute top-full right-0 pt-2 w-[380px] z-50 animate-fade-in">
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-[#E7E5E0] ring-1 ring-black/5 space-y-1.5">
                  <Link
                    href="/how-to-use"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">menu_book</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-blue-800 transition-colors">
                        How to Use &amp; Setup Guide
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        5-minute step-by-step tutorial
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/blog"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">article</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-amber-800 transition-colors">
                        Blog &amp; Knowledge Base
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Guides on cafe profit &amp; POS setup
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/#faq"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">quiz</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-purple-800 transition-colors">
                        FAQ &amp; Honest Answers
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Pricing, hardware &amp; safety details
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/download"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-emerald-800 transition-colors">
                        Download Software
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        POS Bridge &amp; mobile apps
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-800 flex items-center justify-center shrink-0 group-hover/item:bg-rose-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">support_agent</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-rose-800 transition-colors">
                        Contact &amp; Support
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Get in touch with our team
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline-block text-[14px] font-medium text-[#4a4642] hover:text-black transition-colors px-3 py-2 rounded-full hover:bg-[#F5F4F0]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-[#0b2b1a] text-white text-[13px] font-semibold hover:bg-black hover:shadow-md transition-all duration-200"
          >
            <span>Start Free</span>
            <span>→</span>
          </Link>

        </div>
      </div>
    </header>
  );
}
