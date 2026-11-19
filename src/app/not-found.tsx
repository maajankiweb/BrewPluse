import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Coffee,
  ArrowLeft,
  Home,
  Sparkles,
  Receipt,
  QrCode,
  ChefHat,
  Coins,
  HelpCircle,
  Compass,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Page Not Found | BrewPluse',
  description: 'The page or resource you are looking for does not exist on BrewPluse.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Cafe & Restaurant POS',
      description: '2-tap counter billing, thermal receipts & UPI payments.',
      href: '/cafe-pos',
      icon: Receipt,
      tag: 'BILLING',
    },
    {
      title: 'QR Table Ordering',
      description: 'Contactless self-ordering with instant menu updates.',
      href: '/qr-ordering-system',
      icon: QrCode,
      tag: 'SELF-ORDER',
    },
    {
      title: 'Kitchen Display (KDS)',
      description: 'Paperless ticket screen for baristas and head chefs.',
      href: '/kitchen-display-system',
      icon: ChefHat,
      tag: 'KITCHEN',
    },
    {
      title: 'Honest ₹0/Month Pricing',
      description: 'Transparent zero-retainer software model.',
      href: '/pricing',
      icon: Coins,
      tag: 'FREE POS',
    },
  ];

  return (
    <div className="min-h-[82vh] bg-[#F7F5EC] text-[#0B1714] flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle Background Radial Pattern & Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#B99A5B_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#002D23]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#B99A5B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-3xl text-center space-y-8">
        {/* Main 404 Hero Card */}
        <div className="bg-[#FFFEFA] border border-[#DDE3DD] rounded-[28px] sm:rounded-[36px] p-8 sm:p-12 shadow-sm">
          {/* 404 Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002D23]/10 border border-[#002D23]/20 text-[#002D23] font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-[#B99A5B] animate-pulse" />
            <span>ERROR 404 • ORDER TICKET NOT FOUND</span>
          </div>

          {/* Icon Emblem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-[#002D23]/5 animate-ping opacity-25" />
            <div className="relative w-full h-full rounded-full bg-[#002D23] text-[#B99A5B] border-4 border-[#FFFEFA] shadow-lg flex items-center justify-center">
              <Coffee className="w-12 h-12 sm:w-14 sm:h-14 stroke-[1.75]" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#B99A5B] text-[#002D23] flex items-center justify-center shadow-md font-mono text-xs font-black">
              404
            </div>
          </div>

          {/* Heading and Narrative */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B1714] tracking-tight leading-tight mb-4">
            Looks like this brew is <span className="text-[#002D23]">off-menu</span>.
          </h1>
          <p className="text-sm sm:text-base text-[#64736D] max-w-xl mx-auto leading-relaxed mb-8">
            The page or ticket you requested doesn&apos;t exist, was moved to a different counter,
            or the barista cleared it from the board. Let&apos;s get you back on track!
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[12px] bg-[#002D23] hover:bg-[#001F19] text-[#FFFEFA] text-sm font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </Link>
            <Link
              href="/demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-[#FFFEFA] hover:bg-[#F7F5EC] text-[#0B1714] text-sm font-bold border border-[#DDE3DD] shadow-2xs transition-all hover:border-[#002D23]"
            >
              <Sparkles className="w-4 h-4 text-[#B99A5B]" />
              <span>Try Live POS Demo</span>
            </Link>
          </div>

          {/* Popular Destinations Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DDE3DD]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase font-mono">
              <span className="bg-[#FFFEFA] px-4 text-[#64736D] font-bold tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-[#002D23]" />
                <span>Popular Stations</span>
              </span>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {quickLinks.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group p-4 rounded-2xl bg-[#F7F5EC] hover:bg-white border border-[#DDE3DD] hover:border-[#002D23] hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#002D23]/10 text-[#002D23]">
                      {item.tag}
                    </span>
                    <IconComponent className="w-4 h-4 text-[#64736D] group-hover:text-[#002D23] group-hover:scale-110 transition-all" />
                  </div>
                  <h3 className="text-sm font-bold text-[#0B1714] group-hover:text-[#002D23] transition-colors">
                    {item.title} &rarr;
                  </h3>
                  <p className="text-xs text-[#64736D] mt-1 leading-snug">
                    {item.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer Support Notice */}
        <div className="text-xs font-mono text-[#64736D] flex flex-wrap items-center justify-center gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-[#002D23]" />
          <span>Need immediate assistance?</span>
          <Link
            href="/documentation"
            className="text-[#002D23] font-bold underline hover:text-[#B99A5B] transition-colors"
          >
            Documentation
          </Link>
          <span>•</span>
          <Link
            href="/contact"
            className="text-[#002D23] font-bold underline hover:text-[#B99A5B] transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
