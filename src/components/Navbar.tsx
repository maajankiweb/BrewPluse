'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [modulesOpen, setModulesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#FFFEFA]/95 backdrop-blur-md border-b border-[#DDE3DD] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2.5 focus:outline-none group">
            <div className="w-9 h-9 rounded-xl bg-[#002D23] text-white flex items-center justify-center border border-[#B99A5B]/30 shadow-xs group-hover:scale-105 transition-transform duration-200 overflow-hidden p-0.5">
              <img src="/logos/brewpluse-icon.svg" alt="BrewPluse" title="BrewPluse Cafe Operating System Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex items-center gap-0.5">
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#0B1714]">
                Brew<span className="text-[#002D23]">Pluse</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Items */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[14px] font-medium text-[#64736D]">

          {/* Features badge link */}
          <Link
            href="/features"
            className="px-3.5 py-2 rounded-[10px] hover:text-[#0B1714] hover:bg-[#F7F5EC] transition-colors font-semibold text-[#002D23] flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px] text-[#B99A5B]">stars</span>
            <span>Features</span>
          </Link>

          {/* Product Architecture Link */}
          <Link
            href="/product"
            className="px-3.5 py-2 rounded-[10px] hover:text-[#0B1714] hover:bg-[#F7F5EC] transition-colors"
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
              className="flex items-center gap-1 px-3.5 py-2 rounded-[10px] hover:text-[#0B1714] hover:bg-[#F7F5EC] transition-all duration-150 focus:outline-none cursor-pointer group-hover:bg-[#F7F5EC] group-hover:text-[#0B1714]"
            >
              <span>Modules</span>
              <span className="material-symbols-outlined text-[18px] opacity-60 group-hover:rotate-180 group-hover:opacity-100 transition-transform duration-300">
                expand_more
              </span>
            </button>

            {modulesOpen && (
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 w-[600px] z-50 animate-fade-in">
                <div className="bg-[#FFFEFA] rounded-2xl p-4 shadow-2xl border border-[#DDE3DD] ring-1 ring-black/5">
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/cafe-pos"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                          Point of Sale (POS)
                        </div>
                        <div className="text-xs text-[#64736D] leading-snug">
                          Fast counter billing &amp; KOT print
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/qr-ordering-system"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                          QR Table Ordering
                        </div>
                        <div className="text-xs text-[#64736D] leading-snug">
                          Contactless dine-in ordering
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/kitchen-display-system"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">skillet</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                          Kitchen Display (KDS)
                        </div>
                        <div className="text-xs text-[#64736D] leading-snug">
                          Paperless kitchen &amp; barista
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/digital-menu"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                          Digital QR Menu
                        </div>
                        <div className="text-xs text-[#64736D] leading-snug">
                          Visual photos &amp; live 86 toggle
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/restaurant-order-management-system"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">receipt_long</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                          Order Management System
                        </div>
                        <div className="text-xs text-[#64736D] leading-snug">
                          Centralized kitchen order flow
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/restaurant-staff-management-software"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">badge</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                          Staff &amp; Waiter App
                        </div>
                        <div className="text-xs text-[#64736D] leading-snug">
                          Handheld table order taking
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/cafe-loyalty-program-software"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">military_tech</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                          Cafe Loyalty Software
                        </div>
                        <div className="text-xs text-[#64736D] leading-snug">
                          Digital stamp cards &amp; rewards
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/ai-review-management-for-restaurants"
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                    >
                      <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined text-[20px]">reviews</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                          AI Review Management
                        </div>
                        <div className="text-xs text-[#64736D] leading-snug">
                          Google review booster &amp; rep
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className="mt-3 pt-3 border-t border-[#DDE3DD] flex items-center justify-between px-2">
                    <Link
                      className="text-xs font-bold text-[#002D23] hover:underline flex items-center gap-1 transition-colors"
                      href="/features"
                    >
                      <span>Explore All 18+ Features in Detail →</span>
                    </Link>
                    <Link
                      className="text-xs font-semibold text-[#64736D] hover:text-[#0B1714] flex items-center gap-1 transition-colors"
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
              className="flex items-center gap-1 px-3.5 py-2 rounded-[10px] hover:text-[#0B1714] hover:bg-[#F7F5EC] transition-all duration-150 focus:outline-none cursor-pointer group-hover:bg-[#F7F5EC] group-hover:text-[#0B1714]"
            >
              <span>Solutions</span>
              <span className="material-symbols-outlined text-[18px] opacity-60 group-hover:rotate-180 group-hover:opacity-100 transition-transform duration-300">
                expand_more
              </span>
            </button>

            {solutionsOpen && (
              <div className="nav-dropdown-menu absolute top-full left-0 pt-2 w-[520px] z-50 animate-fade-in">
                <div className="bg-[#FFFEFA] rounded-2xl p-4 shadow-2xl border border-[#DDE3DD] ring-1 ring-black/5 space-y-1">
                  <Link
                    href="/cafe-management-software"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">local_cafe</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        Cafe Management
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        Coffee shops &amp; bakeries
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/restaurant-management-software"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">restaurant</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        Restaurant Management
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        Floor plans, KOT &amp; KDS
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/free-restaurant-pos"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">money_off</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        Free Restaurant POS
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        ₹0/mo software subscription
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/best-free-pos-software-india"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        Free POS India Edition
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        UPI QR &amp; GST compliance
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/qr-table-ordering"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">table_bar</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        QR Table Ordering
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        Scan to order &amp; pay
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/free-cafe-management-software"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">coffee</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        Free Cafe Software
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        Zero upfront fees forever
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            className="px-3.5 py-2 rounded-[10px] hover:text-[#0B1714] hover:bg-[#F7F5EC] transition-colors"
            href="/pricing"
          >
            Pricing
          </Link>

          <Link
            className="px-3.5 py-2 rounded-[10px] hover:text-[#0B1714] hover:bg-[#F7F5EC] transition-colors font-medium flex items-center gap-1 text-[#002D23]"
            href="/compare"
          >
            <span>Compare</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#002D23]/10 text-[#002D23] font-bold">VS</span>
          </Link>

          {/* Resources Dropdown */}
          <div
            className="nav-dropdown relative group py-2"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 px-3.5 py-2 rounded-[10px] hover:text-[#0B1714] hover:bg-[#F7F5EC] transition-all duration-150 focus:outline-none cursor-pointer group-hover:bg-[#F7F5EC] group-hover:text-[#0B1714]"
            >
              <span>Resources</span>
              <span className="material-symbols-outlined text-[18px] opacity-60 group-hover:rotate-180 group-hover:opacity-100 transition-transform duration-300">
                expand_more
              </span>
            </button>

            {resourcesOpen && (
              <div className="nav-dropdown-menu absolute top-full right-0 pt-2 w-[420px] z-50 animate-fade-in">
                <div className="bg-[#FFFEFA] rounded-2xl p-4 shadow-2xl border border-[#DDE3DD] ring-1 ring-black/5 space-y-1">
                  <Link
                    href="/documentation"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">description</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        Documentation &amp; Tech Manual
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        System architecture &amp; setup guides
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/how-pricing-works"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        How Pricing Works
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        Transparent ₹0/mo economics breakdown
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/how-to-use"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">menu_book</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        How to Use &amp; Setup Guide
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        5-minute step-by-step tutorial
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/blog"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">article</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        Blog &amp; Knowledge Base
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        Guides on cafe profit &amp; POS setup
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/faq"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">quiz</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        FAQ &amp; Honest Answers
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        Pricing, hardware &amp; safety details
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/download"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        Download Software
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
                        Android APK &amp; desktop apps
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/contact"
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#F7F5EC] transition-colors group/item"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 group-hover/item:bg-[#002D23] group-hover/item:text-white transition-colors duration-200">
                      <span className="material-symbols-outlined text-[20px]">support_agent</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#0B1714] group-hover/item:text-[#002D23] transition-colors">
                        Contact &amp; Support
                      </div>
                      <div className="text-xs text-[#64736D] leading-snug">
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
            className="hidden sm:inline-block text-[14px] font-medium text-[#64736D] hover:text-[#0B1714] transition-colors px-3 py-2 rounded-[10px] hover:bg-[#F7F5EC]"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-[10px] bg-[#002D23] text-[#FFFEFA] text-[13px] font-semibold hover:bg-[#001F19] hover:shadow-md transition-all duration-200"
          >
            <span>Start Your Free Cafe</span>
            <span className="text-[#B99A5B]">→</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#0B1714] hover:bg-[#F7F5EC] focus:outline-none transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay & Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-20 bottom-0 bg-[#FFFEFA] z-50 overflow-y-auto px-6 py-6 border-t border-[#DDE3DD] animate-fade-in">
          <div className="space-y-6">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#002D23] mb-3">
                Core Modules
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <Link
                  href="/product"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#002D23] font-semibold"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#002D23]">widgets</span>
                  <span>Product Architecture</span>
                </Link>
                <Link
                  href="/cafe-pos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#002D23]">point_of_sale</span>
                  <span>Point of Sale (POS)</span>
                </Link>
                <Link
                  href="/qr-ordering-system"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#002D23]">qr_code_2</span>
                  <span>QR Table Ordering</span>
                </Link>
                <Link
                  href="/kitchen-display-system"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#002D23]">skillet</span>
                  <span>Kitchen Display (KDS)</span>
                </Link>
                <Link
                  href="/digital-menu"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#002D23]">restaurant_menu</span>
                  <span>Digital QR Menu</span>
                </Link>
                <Link
                  href="/restaurant-order-management-system"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#002D23]">receipt_long</span>
                  <span>Order Management</span>
                </Link>
                <Link
                  href="/restaurant-staff-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#002D23]">badge</span>
                  <span>Staff &amp; Waiter App</span>
                </Link>
                <Link
                  href="/cafe-loyalty-program-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#002D23]">military_tech</span>
                  <span>Cafe Loyalty Software</span>
                </Link>
                <Link
                  href="/ai-review-management-for-restaurants"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#002D23]">reviews</span>
                  <span>AI Review Booster</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#002D23] mb-3">
                Solutions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <Link
                  href="/cafe-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Cafe Management</span>
                </Link>
                <Link
                  href="/restaurant-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Restaurant Management</span>
                </Link>
                <Link
                  href="/free-restaurant-pos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Free Restaurant POS</span>
                </Link>
                <Link
                  href="/best-free-pos-software-india"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Free POS India Edition</span>
                </Link>
                <Link
                  href="/qr-table-ordering"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>QR Table Ordering</span>
                </Link>
                <Link
                  href="/free-cafe-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Free Cafe Software</span>
                </Link>
              </div>
            </div>

            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#002D23] mb-3">
                Resources &amp; Pricing
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714] font-semibold"
                >
                  <span>Pricing (₹0/Mo)</span>
                </Link>
                <Link
                  href="/compare"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#002D23] font-semibold"
                >
                  <span>Compare vs Competitors</span>
                </Link>
                <Link
                  href="/documentation"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Documentation &amp; Manuals</span>
                </Link>
                <Link
                  href="/how-pricing-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>How Pricing Works</span>
                </Link>
                <Link
                  href="/how-to-use"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>How to Use &amp; Setup</span>
                </Link>
                <Link
                  href="/cafe-pos-vs-traditional-pos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Cloud vs Traditional POS</span>
                </Link>
                <Link
                  href="/how-to-choose-restaurant-management-software"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Software Buyer&apos;s Guide</span>
                </Link>
                <Link
                  href="/how-to-manage-a-small-cafe"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Manage a Small Cafe</span>
                </Link>
                <Link
                  href="/faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>FAQ &amp; Honest Answers</span>
                </Link>
                <Link
                  href="/download"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Download APK &amp; Apps</span>
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F7F5EC] text-[#0B1714]"
                >
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DDE3DD] flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl border border-[#DDE3DD] text-center font-semibold text-sm text-[#0B1714] hover:bg-[#F7F5EC]"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-[#002D23] text-center font-semibold text-sm text-white shadow-sm hover:bg-[#001F19]"
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
