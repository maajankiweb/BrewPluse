'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 w-[540px] z-50 animate-fade-in">
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
                          Fast counter billing &amp; print
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
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">skillet</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-blue-800 transition-colors">
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
                      href="/staff-ordering-system"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-800 flex items-center justify-center shrink-0 group-hover/item:bg-teal-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">devices</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-teal-800 transition-colors">
                          Waiter Staff Ordering
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Handheld table order taking
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/features#loyalty-stamps"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F8F7F4] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-800 flex items-center justify-center shrink-0 group-hover/item:bg-purple-600 group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">military_tech</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210] group-hover/item:text-purple-800 transition-colors">
                          Digital Loyalty Stamps
                        </div>
                        <div className="text-xs text-gray-500 leading-snug">
                          Gamified repeat rewards
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#EBE8E3] flex items-center justify-between px-2">
                    <Link
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition-colors"
                      href="/features"
                    >
                      <span>Explore All 18+ Features in Detail</span>
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
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 w-[460px] z-50 animate-fade-in">
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
                        Designed for coffee shops &amp; bakeries
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
                        Dining room tables, split checks &amp; KDS
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
                        Free Cafe Software
                      </div>
                      <div className="text-xs text-gray-500 leading-snug">
                        ₹0/month subscription model
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

          <button
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-[#1a1715] hover:bg-[#F5F4F0] focus:outline-none transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[26px]">menu</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-b border-[#EBE8E3] px-5 py-6 space-y-4 animate-fade-in shadow-xl max-h-[85vh] overflow-y-auto">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2.5 py-1">
              Modules &amp; Features
            </div>
            <Link
              href="/features"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-700">stars</span>
                <span>All Features</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/cafe-pos"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-700">point_of_sale</span>
                <span>Point of Sale (POS)</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/qr-ordering-system"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-amber-600">qr_code_2</span>
                <span>QR Table Ordering</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/kitchen-display-system"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600">skillet</span>
                <span>Kitchen Display (KDS)</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/digital-menu"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-rose-600">restaurant_menu</span>
                <span>Digital QR Menu</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/staff-ordering-system"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-teal-600">devices</span>
                <span>Staff Ordering App</span>
              </span>
              <span>→</span>
            </Link>

            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2.5 pt-3 pb-1">
              Solutions &amp; Pricing
            </div>
            <Link
              href="/cafe-management-software"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-amber-600">local_cafe</span>
                <span>Cafe Management</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/restaurant-management-software"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-orange-600">restaurant</span>
                <span>Restaurant Management</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/free-cafe-management-software"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">money_off</span>
                <span>Free Cafe Software</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-700">payments</span>
                <span>Pricing (₹1/Order)</span>
              </span>
              <span>→</span>
            </Link>

            <div className="text-xs font-bold uppercase tracking-wider text-gray-400 px-2.5 pt-3 pb-1">
              Guides &amp; Resources
            </div>
            <Link
              href="/how-to-use"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600">menu_book</span>
                <span>How to Use &amp; Setup</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-amber-600">article</span>
                <span>Blog &amp; Knowledge Base</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/download"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-emerald-600">download</span>
                <span>Download Android APK</span>
              </span>
              <span>→</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-medium text-gray-800 hover:bg-[#F8F7F4]"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-rose-600">support_agent</span>
                <span>Contact &amp; Support</span>
              </span>
              <span>→</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[#F5F4F0] text-gray-800 font-bold text-sm"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="w-full text-center py-2.5 rounded-full bg-[#0b2b1a] text-white font-bold text-sm"
            >
              Start Free →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
