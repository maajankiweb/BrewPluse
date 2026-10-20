'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* Custom SVG Icons based directly on uploaded user inspiration images        */
/* -------------------------------------------------------------------------- */

/**
 * 1. Home Icon:
 * Outline house with rounded gable roof and curved door cutout
 * Matches uploaded inspiration: media_1792477527025.png
 */
function HomeIcon({ className = 'w-6 h-6', active = false }: { className?: string; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? '2.4' : '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3.5 10.8L12 3.5l8.5 7.3V20a1.5 1.5 0 0 1-1.5 1.5h-4a1 1 0 0 1-1-1v-4.5a2 2 0 0 0-4 0V20.5a1 1 0 0 1-1 1h-4A1.5 1.5 0 0 1 3.5 20v-9.2z" />
    </svg>
  );
}

/**
 * 2. Modules Icon:
 * Open hand holding a 3-node connected module architecture
 * Matches uploaded inspiration: media_1792477593319.png
 */
function ModulesIcon({ className = 'w-6 h-6', active = false }: { className?: string; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? '2.2' : '1.9'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Top Node */}
      <rect x="8.5" y="2" width="7" height="4.5" rx="1" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? '0.2' : '0'} />
      <line x1="10" y1="3.5" x2="14" y2="3.5" />
      <line x1="10" y1="5" x2="12.5" y2="5" />

      {/* Central Connector Trunk & Node Hub */}
      <line x1="12" y1="6.5" x2="12" y2="9" />
      <circle cx="12" cy="9.5" r="1.2" fill="currentColor" />
      <line x1="6" y1="9.5" x2="18" y2="9.5" />

      {/* Left Node */}
      <rect x="2.5" y="7.5" width="5.5" height="4.5" rx="1" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? '0.2' : '0'} />
      <line x1="4" y1="9" x2="6.5" y2="9" />
      <line x1="4" y1="10.5" x2="5.5" y2="10.5" />

      {/* Right Node */}
      <rect x="16" y="7.5" width="5.5" height="4.5" rx="1" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? '0.2' : '0'} />
      <line x1="17.5" y1="9" x2="20" y2="9" />
      <line x1="17.5" y1="10.5" x2="19" y2="10.5" />

      {/* Supporting Hand underneath */}
      <path d="M2 17.5l3.5-3.5a2.5 2.5 0 0 1 3.5 0l1.2 1.2c.6.6 1.4.9 2.2.9h5.6a2.5 2.5 0 0 1 2.2 3.7L18.5 22H6.5L2 17.5z" />
      <line x1="2" y1="17.5" x2="5.5" y2="21" />
    </svg>
  );
}

/**
 * 3. Login / Account Icon:
 * Solid user circle silhouette
 * Matches uploaded inspiration: media_1792476890000.png
 */
function LoginUserIcon({ className = 'w-6 h-6', active = false }: { className?: string; active?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={active ? '0' : '2'} className={className}>
      {active ? (
        <path
          fillRule="evenodd"
          d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 4.5a3.25 3.25 0 1 1 0 6.5 3.25 3.25 0 0 1 0-6.5zm-5.75 11.2a7.5 7.5 0 0 1 11.5 0A7.46 7.46 0 0 1 12 19.5a7.46 7.46 0 0 1-5.75-1.8z"
          clipRule="evenodd"
        />
      ) : (
        <>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="9.5" r="3.25" />
          <path d="M6.25 17.7a7.5 7.5 0 0 1 11.5 0" />
        </>
      )}
    </svg>
  );
}

/**
 * 4. Solutions Icon:
 * Lightbulb with gear cog inside and radiating light rays
 * Matches uploaded inspiration: media_1792476935269.png
 */
function SolutionsGearIcon({ className = 'w-6 h-6', active = false }: { className?: string; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={active ? '2.1' : '1.9'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Lightbulb Bulb Outline */}
      <path d="M9 18h6m-5 3h4m-6-6.5a6.5 6.5 0 1 1 8 0c-.8.8-1.5 1.5-1.5 2.5H9.5c0-1-.7-1.7-1.5-2.5z" />

      {/* Internal Gear Cog */}
      <circle cx="12" cy="10" r="2" fill={active ? 'currentColor' : 'none'} fillOpacity={active ? '0.3' : '0'} />
      <path d="M12 7.2v1.1m0 3.4v1.1m2.8-3.4l-.8.5m-3.2 2l-.8.5m0-3l.8.5m3.2 2l.8.5" />

      {/* Outer Radiating Light Rays */}
      <line x1="12" y1="1" x2="12" y2="2.5" />
      <line x1="4.2" y1="4.2" x2="5.5" y2="5.5" />
      <line x1="19.8" y1="4.2" x2="18.5" y2="5.5" />
      <line x1="1.5" y1="10" x2="3" y2="10" />
      <line x1="22.5" y1="10" x2="21" y2="10" />
      <line x1="4.5" y1="15.5" x2="5.7" y2="14.5" />
      <line x1="19.5" y1="15.5" x2="18.3" y2="14.5" />
    </svg>
  );
}

/**
 * 5. Features Icon:
 * Multifaceted stars / sparkles symbol
 */
function FeaturesStarIcon({ className = 'w-6 h-6', active = false }: { className?: string; active?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? '0' : '2'}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2l2.6 6.4L21 11l-5.4 4.3 1.7 6.7-5.3-3.6-5.3 3.6 1.7-6.7L3 11l6.4-2.6L12 2z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Main Mobile Bottom Navigation Component                                    */
/* -------------------------------------------------------------------------- */

export default function MobileBottomNav() {
  const pathname = usePathname();
  const [activeSheet, setActiveSheet] = useState<'solutions' | 'modules' | null>(null);

  // Close sheet on route change
  useEffect(() => {
    setActiveSheet(null);
  }, [pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (activeSheet) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeSheet]);

  const isHome = pathname === '/';
  const isFeatures = pathname === '/features';
  const isLogin = pathname === '/login' || pathname === '/signup';
  const isSolutionsActive =
    activeSheet === 'solutions' ||
    pathname?.includes('management-software') ||
    pathname?.includes('restaurant-pos');
  const isModulesActive =
    activeSheet === 'modules' ||
    pathname?.includes('pos') ||
    pathname?.includes('qr-ordering') ||
    pathname?.includes('kitchen-display') ||
    pathname?.includes('digital-menu') ||
    pathname?.includes('staff-ordering');

  return (
    <>
      {/* ==================================================================== */}
      {/* 1. Backdrop Overlay for Drawer Sheets                                 */}
      {/* ==================================================================== */}
      {activeSheet && (
        <div
          onClick={() => setActiveSheet(null)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in lg:hidden"
        />
      )}

      {/* ==================================================================== */}
      {/* 2. Interactive Bottom Drawer Sheet for Modules                       */}
      {/* ==================================================================== */}
      <div
        className={`fixed left-0 right-0 z-50 bg-white rounded-t-3xl border-t border-[#EBE8E3] shadow-2xl transition-transform duration-300 ease-out transform lg:hidden ${
          activeSheet === 'modules' ? 'translate-y-0 bottom-[68px]' : 'translate-y-full bottom-0 pointer-events-none'
        } max-h-[75vh] flex flex-col`}
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#FBFBFA] rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ModulesIcon className="w-5 h-5 text-emerald-800" active />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#141210]">BrewPluse Modules</h3>
              <p className="text-[11px] text-gray-500">Core operating components</p>
            </div>
          </div>
          <button
            onClick={() => setActiveSheet(null)}
            className="w-8 h-8 rounded-full bg-gray-200/60 hover:bg-gray-200 flex items-center justify-center text-gray-700"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-3.5 space-y-2">
          <Link
            href="/cafe-pos"
            onClick={() => setActiveSheet(null)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F4] hover:bg-emerald-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-sm font-black">
                POS
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900">Point of Sale (POS)</p>
                <p className="text-[11px] text-gray-500">Quick counter billing &amp; thermal prints</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/qr-ordering-system"
            onClick={() => setActiveSheet(null)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F4] hover:bg-amber-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center text-sm font-black">
                QR
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900">QR Table Ordering</p>
                <p className="text-[11px] text-gray-500">Dine-in Pay-Now &amp; Pay-Later tab</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/kitchen-display-system"
            onClick={() => setActiveSheet(null)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F4] hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center text-sm font-black">
                KDS
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900">Kitchen Display System</p>
                <p className="text-[11px] text-gray-500">Paperless live tickets &amp; chimes</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/digital-menu"
            onClick={() => setActiveSheet(null)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F4] hover:bg-rose-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center text-sm font-black">
                Menu
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900">Digital QR Menu</p>
                <p className="text-[11px] text-gray-500">Item photos, variants &amp; 86 out-of-stock</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/staff-ordering-system"
            onClick={() => setActiveSheet(null)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F4] hover:bg-teal-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center text-sm font-black">
                Staff
              </span>
              <div>
                <p className="text-xs font-bold text-gray-900">Waiter Handheld Ordering</p>
                <p className="text-[11px] text-gray-500">Mobile captain order dispatch</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/features"
            onClick={() => setActiveSheet(null)}
            className="w-full py-2.5 px-4 bg-[#0b2b1a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Explore All 18+ Modules</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 3. Interactive Bottom Drawer Sheet for Solutions                     */}
      {/* ==================================================================== */}
      <div
        className={`fixed left-0 right-0 z-50 bg-white rounded-t-3xl border-t border-[#EBE8E3] shadow-2xl transition-transform duration-300 ease-out transform lg:hidden ${
          activeSheet === 'solutions' ? 'translate-y-0 bottom-[68px]' : 'translate-y-full bottom-0 pointer-events-none'
        } max-h-[75vh] flex flex-col`}
      >
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#FBFBFA] rounded-t-3xl">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <SolutionsGearIcon className="w-5 h-5 text-amber-800" active />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#141210]">Tailored Solutions</h3>
              <p className="text-[11px] text-gray-500">Customized for every food business</p>
            </div>
          </div>
          <button
            onClick={() => setActiveSheet(null)}
            className="w-8 h-8 rounded-full bg-gray-200/60 hover:bg-gray-200 flex items-center justify-center text-gray-700"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-y-auto p-3.5 space-y-2">
          <Link
            href="/cafe-management-software"
            onClick={() => setActiveSheet(null)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F4] hover:bg-amber-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">☕</span>
              <div>
                <p className="text-xs font-bold text-gray-900">Cafes &amp; Coffee Shops</p>
                <p className="text-[11px] text-gray-500">Espresso bar, barista KDS &amp; loyalty</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/restaurant-management-software"
            onClick={() => setActiveSheet(null)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F4] hover:bg-orange-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🍽️</span>
              <div>
                <p className="text-xs font-bold text-gray-900">Full Dine-In Restaurants</p>
                <p className="text-[11px] text-gray-500">Table management, KOT &amp; billing</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/free-cafe-management-software"
            onClick={() => setActiveSheet(null)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F4] hover:bg-emerald-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">✨</span>
              <div>
                <p className="text-xs font-bold text-gray-900">Free Startup Cafe Tier</p>
                <p className="text-[11px] text-gray-500">₹0/month lifetime subscription</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/free-restaurant-pos"
            onClick={() => setActiveSheet(null)}
            className="flex items-center justify-between p-3 rounded-2xl bg-[#F8F7F4] hover:bg-purple-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">🧁</span>
              <div>
                <p className="text-xs font-bold text-gray-900">Bakeries &amp; Fast Food QSR</p>
                <p className="text-[11px] text-gray-500">High-speed counter checkout</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </Link>

          <Link
            href="/pricing"
            onClick={() => setActiveSheet(null)}
            className="w-full py-2.5 px-4 bg-[#0b2b1a] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Compare Plans &amp; Pricing (₹1/Order)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 4. Fixed Bottom Navigation Bar (Matching user sketch)                */}
      {/* 5 items: Home | Features | Login | Solutions | Modules               */}
      {/* ==================================================================== */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#EBE8E3] shadow-[0_-4px_25px_rgba(0,0,0,0.06)] lg:hidden"
        style={{ paddingBottom: 'max(0.4rem, env(safe-area-inset-bottom))' }}
      >
        <div className="grid grid-cols-5 h-[62px] items-center px-1">
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              isHome && !activeSheet
                ? 'text-emerald-800 font-extrabold'
                : 'text-gray-500 hover:text-gray-900 font-semibold'
            }`}
          >
            <div className="relative">
              <HomeIcon className="w-5 h-5 transition-transform active:scale-90" active={isHome && !activeSheet} />
              {isHome && !activeSheet && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Home</span>
          </Link>

          {/* 2. Features */}
          <Link
            href="/features"
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              isFeatures && !activeSheet
                ? 'text-emerald-800 font-extrabold'
                : 'text-gray-500 hover:text-gray-900 font-semibold'
            }`}
          >
            <div className="relative">
              <FeaturesStarIcon className="w-5 h-5 transition-transform active:scale-90" active={isFeatures && !activeSheet} />
              {isFeatures && !activeSheet && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Features</span>
          </Link>

          {/* 3. Login (Center highlight or standard) */}
          <Link
            href="/login"
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
              isLogin && !activeSheet
                ? 'text-emerald-800 font-extrabold'
                : 'text-gray-500 hover:text-gray-900 font-semibold'
            }`}
          >
            <div className="relative">
              <LoginUserIcon className="w-5 h-5 transition-transform active:scale-90" active={isLogin && !activeSheet} />
              {isLogin && !activeSheet && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Login</span>
          </Link>

          {/* 4. Solutions */}
          <button
            type="button"
            onClick={() => setActiveSheet(activeSheet === 'solutions' ? null : 'solutions')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeSheet === 'solutions' || (isSolutionsActive && !activeSheet)
                ? 'text-emerald-800 font-extrabold'
                : 'text-gray-500 hover:text-gray-900 font-semibold'
            }`}
          >
            <div className="relative">
              <SolutionsGearIcon className="w-5 h-5 transition-transform active:scale-90" active={activeSheet === 'solutions' || (isSolutionsActive && !activeSheet)} />
              {(activeSheet === 'solutions' || (isSolutionsActive && !activeSheet)) && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Solutions</span>
          </button>

          {/* 5. Modules */}
          <button
            type="button"
            onClick={() => setActiveSheet(activeSheet === 'modules' ? null : 'modules')}
            className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all cursor-pointer ${
              activeSheet === 'modules' || (isModulesActive && !activeSheet)
                ? 'text-emerald-800 font-extrabold'
                : 'text-gray-500 hover:text-gray-900 font-semibold'
            }`}
          >
            <div className="relative">
              <ModulesIcon className="w-5 h-5 transition-transform active:scale-90" active={activeSheet === 'modules' || (isModulesActive && !activeSheet)} />
              {(activeSheet === 'modules' || (isModulesActive && !activeSheet)) && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-0.5">Modules</span>
          </button>
        </div>
      </nav>
    </>
  );
}
