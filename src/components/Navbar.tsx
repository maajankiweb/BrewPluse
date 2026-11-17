'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [modulesOpen, setModulesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-medium text-[#4a4642]">

          {/* Features badge link */}
          <Link
            href="/features"
            className="px-3.5 py-2 rounded-full hover:bg-[#F5F4F0] transition-colors font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px] text-emerald-700">stars</span>
            <span>Features</span>
          </Link>

          {/* Product Architecture Link */}
          <Link
            href="/product"
            className="px-3.5 py-2 rounded-full hover:bg-[#F5F4F0] hover:text-black transition-colors"
          >
            Product
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
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 w-[600px] z-50 animate-fade-in">
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
                          Point of Sale (POS)
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Fast counter billing &amp; KOT print
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
                          Contactless dine-in ordering
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
                          Paperless kitchen &amp; barista
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
                          Visual photos &amp; live 86 toggle
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/restaurant-order-management-system"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-blue-800 transition-colors">
                          Order Management System (OMS)
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Centralized kitchen order flow
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/restaurant-staff-management-software"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 group-hover/item:bg-teal-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-teal-800 transition-colors">
                          Staff &amp; Waiter App
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Handheld table order taking
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/cafe-loyalty-program-software"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">military_tech</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-amber-800 transition-colors">
                          Cafe Loyalty Software
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Digital stamp cards &amp; rewards
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/ai-review-management-for-restaurants"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-800 flex items-center justify-center shrink-0 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">reviews</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-indigo-800 transition-colors">
                          AI Review Management
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Google review booster &amp; rep
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#EBE8E3] flex items-center justify-between px-2">
                    <Link
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition-colors"
                      href="/features"
                    >
                      <span>Explore All 18+ Features in Detail →</span>
                    </Link>
                    <Link
                      className="text-xs font-semibold text-gray-600 hover:text-black flex items-center gap-1 transition-colors"
                      href="/demo"
                      target="_blank"
                    >
                      <span>Live Demo ↗</span>
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
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 w-[520px] z-50 animate-fade-in">
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-[#E7E5E0] ring-1 ring-black/5 space-y-1">
                  <Link
                    href="/cafe-management-software"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">local_cafe</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-amber-800 transition-colors">
                        Cafe Management
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Coffee shops, bakeries &amp; tea cafes
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
                        Restaurant Management
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Floor plans, multi-station KOT &amp; KDS
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/free-restaurant-pos"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">money_off</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-emerald-800 transition-colors">
                        Free Restaurant POS
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        ₹0/mo software subscription forever
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/best-free-pos-software-india"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-blue-800 transition-colors">
                        Free POS India Edition
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        UPI QR &amp; 5% / 18% GST compliance
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/qr-table-ordering"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">table_bar</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-purple-800 transition-colors">
                        QR Table Ordering
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Scan to order &amp; pay with geofencing
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/free-cafe-management-software"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 group-hover/item:bg-teal-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">coffee</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-teal-800 transition-colors">
                        Free Cafe Software
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Zero upfront fees forever for cafe owners
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

          <Link
            className="px-3.5 py-2 rounded-full hover:bg-[#F5F4F0] hover:text-black transition-colors font-medium flex items-center gap-1 text-emerald-800"
            href="/compare"
          >
            <span>Compare</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">VS</span>
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
              <div className="nav-dropdown-menu absolute top-full right-0 pt-2 w-[400px] z-50 animate-fade-in">
                <div className="bg-white rounded-2xl p-4 shadow-2xl border border-[#E7E5E0] ring-1 ring-black/5 space-y-1">
                  <Link
                    href="/documentation"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">description</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-blue-800 transition-colors">
                        Documentation &amp; Tech Manual
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        System architecture &amp; setup guides
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/how-pricing-works"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-emerald-800 transition-colors">
                        How Pricing Works
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Transparent ₹0/mo economics breakdown
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/how-to-use"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">menu_book</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-amber-800 transition-colors">
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
                    <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">article</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-purple-800 transition-colors">
                        Blog &amp; Knowledge Base
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Guides on cafe profit &amp; POS setup
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/faq"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 group-hover/item:bg-teal-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">quiz</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-teal-800 transition-colors">
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
                    <div className="w-9 h-9 rounded-lg bg-cyan-50 text-cyan-800 flex items-center justify-center shrink-0 group-hover/item:bg-cyan-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-cyan-800 transition-colors">
                        Download Software
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Android APK &amp; desktop apps
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/cafe-pos-vs-traditional-pos"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 group-hover/item:bg-emerald-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">sync_alt</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-emerald-800 transition-colors">
                        Cloud vs Traditional POS
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Hardware &amp; TCO cost comparison
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/how-to-choose-restaurant-management-software"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center shrink-0 group-hover/item:bg-amber-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">checklist</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-amber-800 transition-colors">
                        Software Buyer&apos;s Guide
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        7 evaluation criteria &amp; red flags
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/how-to-manage-a-small-cafe"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-800 flex items-center justify-center shrink-0 group-hover/item:bg-orange-600 group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">storefront</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#141210] group-hover/item:text-orange-800 transition-colors">
                        How to Manage a Small Cafe
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        Operational guide &amp; lean workflows
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

        {/* Action Buttons & Mobile Hamburger */}
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

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-white z-50 overflow-y-auto px-6 py-6 border-t border-[#EBE8E3] animate-fade-in">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-3">
                Core Modules
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <Link
                  href="/product"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-emerald-800 font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-700">hub</span>
                  <span>Product Architecture</span>
                </Link>
                <Link
                  href="/cafe-pos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-emerald-700">point_of_sale</span>
                  <span>Point of Sale (POS)</span>
                </Link>
                <Link
                  href="/qr-ordering-system"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-amber-700">qr_code_2</span>
                  <span>QR Table Ordering</span>
                </Link>
                <Link
                  href="/kitchen-display-system"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-purple-700">skillet</span>
                  <span>Kitchen Display (KDS)</span>
                </Link>
                <Link
                  href="/digital-menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-rose-700">restaurant_menu</span>
                  <span>Digital QR Menu</span>
                </Link>
                <Link
                  href="/restaurant-order-management-system"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-blue-700">receipt_long</span>
                  <span>Order Management (OMS)</span>
                </Link>
                <Link
                  href="/restaurant-staff-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-teal-700">badge</span>
                  <span>Staff &amp; Waiter App</span>
                </Link>
                <Link
                  href="/cafe-loyalty-program-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-amber-700">military_tech</span>
                  <span>Cafe Loyalty Software</span>
                </Link>
                <Link
                  href="/ai-review-management-for-restaurants"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span className="material-symbols-outlined text-[18px] text-indigo-700">reviews</span>
                  <span>AI Review Booster</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-3">
                Solutions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <Link
                  href="/cafe-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Cafe Management</span>
                </Link>
                <Link
                  href="/restaurant-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Restaurant Management</span>
                </Link>
                <Link
                  href="/free-restaurant-pos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Free Restaurant POS</span>
                </Link>
                <Link
                  href="/best-free-pos-software-india"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Free POS India Edition</span>
                </Link>
                <Link
                  href="/qr-table-ordering"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>QR Table Ordering</span>
                </Link>
                <Link
                  href="/free-cafe-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Free Cafe Software</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-3">
                Resources &amp; Pricing
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800 font-semibold"
                >
                  <span>Pricing (₹0/Mo)</span>
                </Link>
                <Link
                  href="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-emerald-800 font-semibold"
                >
                  <span>Compare vs Competitors</span>
                </Link>
                <Link
                  href="/documentation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Documentation &amp; Manuals</span>
                </Link>
                <Link
                  href="/how-pricing-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>How Pricing Works</span>
                </Link>
                <Link
                  href="/how-to-use"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>How to Use &amp; Setup</span>
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>FAQ &amp; Honest Answers</span>
                </Link>
                <Link
                  href="/download"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Download APK &amp; Apps</span>
                </Link>
                <Link
                  href="/cafe-pos-vs-traditional-pos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Cloud vs Traditional POS</span>
                </Link>
                <Link
                  href="/how-to-choose-restaurant-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Software Buyer&apos;s Guide</span>
                </Link>
                <Link
                  href="/how-to-manage-a-small-cafe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Manage a Small Cafe</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-gray-800"
                >
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl border border-gray-200 text-center font-semibold text-sm text-gray-800"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#0b2b1a] text-center font-semibold text-sm text-white shadow-sm"
              >
                Start Free with BrewPluse →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
