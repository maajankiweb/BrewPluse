import React from 'react';
import Link from 'next/link';
import { Coffee, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0b120e] text-gray-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-emerald-950/80 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-14 text-left">

          {/* Brand Info & Legal box */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-2 focus:outline-none group">
              <div className="w-8 h-8 rounded-xl bg-emerald-900 border border-emerald-500/20 shadow-xs flex items-center justify-center group-hover:scale-105 transition-transform">
                <Coffee className="w-4 h-4 text-emerald-400" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Brew<span className="text-emerald-400">Pluse</span>
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
              The complete operating system for modern cafes and restaurants. POS billing, contactless QR table ordering, live kitchen display (KDS), waiter ordering, and recipe inventory with ₹0/month software fees.
            </p>

            <div className="space-y-2 text-xs font-mono text-gray-400 bg-white/[0.02] border border-white/5 p-4 rounded-2xl">
              <div>
                <span className="text-gray-300 font-bold">Legal Name:</span> Ashish Kumar
              </div>
              <div>
                <span className="text-gray-300 font-bold">Trade Name:</span> BrewPluse
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-gray-300 font-bold">Support Email:</span>
                <a
                  href="mailto:support@brewpluse.com"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors underline"
                >
                  support@brewpluse.com
                </a>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-gray-300 font-bold">Support Phone:</span>
                <a
                  href="tel:+919471273041"
                  className="text-emerald-400 hover:text-emerald-300 transition-colors underline"
                >
                  +91 9471273041
                </a>
              </div>
            </div>
          </div>

          {/* Solutions Column */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>SOLUTIONS</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/qr-ordering-system">
                  QR Table Ordering System
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/digital-menu">
                  Digital Menu for Cafes
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/cafe-pos">
                  Cafe POS &amp; Billing
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/restaurant-pos">
                  Restaurant POS System
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/kitchen-display-system">
                  Kitchen Display System (KDS)
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/staff-ordering-system">
                  Staff &amp; Waiter Ordering
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/cafe-management-software">
                  Cafe Management Software
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/restaurant-management-software">
                  Restaurant Management Software
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Free Tools */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>RESOURCES &amp; FREE TOOLS</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <a
                  className="hover:text-emerald-300 hover:translate-x-0.5 transition-all inline-flex items-center gap-1 text-emerald-400 font-semibold"
                  href="/demo"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Explore Live Demo</span>
                  <span className="text-[10px]">↗</span>
                </a>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/features">
                  All 18+ Features
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/pricing">
                  Pricing (₹1/Order)
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/free-cafe-management-software">
                  Free Cafe Software
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/free-restaurant-pos">
                  Free Restaurant POS
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/how-to-use">
                  How to Use &amp; Setup Guide
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/download">
                  Download Android &amp; Desktop App
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/blog">
                  Knowledge Base &amp; Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Legal */}
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>HELP &amp; LEGAL</span>
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/contact">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/privacy">
                  Privacy Notice
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('open-privacy-modal'));
                    }
                  }}
                  className="hover:text-white hover:translate-x-0.5 transition-all inline-block cursor-pointer text-left text-xs text-gray-400"
                >
                  Manage Privacy Choices
                </button>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/privacy/data-rights">
                  Data Rights (DPDP)
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/terms">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/refund">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-white hover:translate-x-0.5 transition-all inline-block" href="/shipping">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold hover:translate-x-0.5 transition-all inline-flex items-center gap-1"
                >
                  <span>Register Free Cafe</span>
                  <span>→</span>
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Keyword Clusters & Internal Linking Directory */}
        <div className="pt-10 pb-8 border-t border-white/10 text-left">
          <div className="mb-4">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              POPULAR CAFE &amp; RESTAURANT POS KEYWORDS &amp; SOLUTIONS
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] text-gray-400">
            <Link href="/cafe-pos" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Cafe POS Software
            </Link>
            <Link href="/cafe-pos" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              CafePOS
            </Link>
            <Link href="/restaurant-pos" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Restaurant POS System
            </Link>
            <Link href="/restaurant-pos" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Resturant POS
            </Link>
            <Link href="/free-cafe-management-software" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Free Cafe POS Software
            </Link>
            <Link href="/free-restaurant-pos" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Free Restaurant POS
            </Link>
            <Link href="/cafe-management-software" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Cafe Management Software
            </Link>
            <Link href="/restaurant-management-software" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Restaurant Management Software
            </Link>
            <Link href="/qr-ordering-system" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              QR Ordering System for Cafes
            </Link>
            <Link href="/kitchen-display-system" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Kitchen Display System (KDS)
            </Link>
            <Link href="/digital-menu" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Digital QR Menu for Cafes
            </Link>
            <Link href="/staff-ordering-system" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Staff Waiter Handheld POS
            </Link>
            <Link href="/pricing" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              ₹0/Mo POS Pricing
            </Link>
            <Link href="/blog/free-pos-systems-for-coffee-shops" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Coffee Shop POS Comparison
            </Link>
            <Link href="/blog/cafe-pos-software-india-guide" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Cafe POS Software India
            </Link>
            <Link href="/blog/best-cafe-management-software" className="px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-emerald-950/60 hover:text-emerald-300 border border-white/5 hover:border-emerald-500/40 transition-all">
              Best Cafe Software 2026
            </Link>
          </div>
        </div>

        {/* Bottom copyright & operational status */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400">
          <div>
            © 2026 BrewPluse. Operated by{' '}
            <a
              href="https://maajankiwebtech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 text-white font-medium transition-colors"
            >
              Maajanki Web Tech
            </a>
            . All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Fast, Zero-Subscription POS &amp; Table Tech</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
