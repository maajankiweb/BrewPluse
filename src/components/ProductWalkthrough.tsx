'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProductWalkthrough() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'menu',
      number: '01',
      title: 'Create or Manage Menu',
      badge: 'Instant 86 & Modifiers',
      summary: 'Build dishes, categories, pricing, and variants.',
      description:
        'Configure your entire food and beverage catalog with photos, item variants (sizes, milk options, crusts), and add-on toppings. Toggle out-of-stock items in real time so customers and staff never order unavailable items.',
      bullets: [
        'Real-time item 86 availability toggle across all QR and counter menus',
        'Customization modifiers (dairy alternatives, spice levels, add-on toppings)',
        'Instant price and description updates without reprinting paper menus',
      ],
      imageSrc: '/features/customization_variants.png',
      imageAlt: 'BrewPluse Menu Customization and Variant Management Interface',
      linkHref: '/digital-menu',
      linkLabel: 'Explore Digital Menu & Modifier Features →',
    },
    {
      id: 'orders',
      number: '02',
      title: 'Receive Orders Live',
      badge: 'Contactless QR & Waiter POS',
      summary: 'Orders stream in from tables, counter, and takeaway.',
      description:
        'Guests scan table QR codes to browse and place contactless orders from their mobile browsers with zero app downloads. Waitstaff can also punch table-side orders via handheld mobile screens or the counter cashier.',
      bullets: [
        'Zero customer app download required — instant browser ordering',
        'Table-specific QR routing with live occupancy status',
        'Supports counter takeaway, dine-in tables, and scheduled pickup',
      ],
      imageSrc: '/features/table_management.png',
      imageAlt: 'BrewPluse Table Management and Live Order Routing Interface',
      linkHref: '/qr-ordering-system',
      linkLabel: 'Explore QR Ordering System & Geofencing →',
    },
    {
      id: 'kitchen',
      number: '03',
      title: 'Run Kitchen & Barista KDS',
      badge: 'Paperless Display System',
      summary: 'Tickets organize automatically by station with timers.',
      description:
        'Kitchen Display System (KDS) eliminates paper ticket misplacements and illegible handwriting. Orders route by preparation station with clear stage indicators (Received → Preparing → Ready → Delivered).',
      bullets: [
        'Paperless digital tickets organized by prep station and urgency',
        'Visual timers track order wait times to identify rush bottlenecks',
        'Instant notification when items are ready for table delivery',
      ],
      imageSrc: '/features/kds.png',
      imageAlt: 'BrewPluse Kitchen Display System (KDS) Screen',
      linkHref: '/kitchen-display-system',
      linkLabel: 'Explore Kitchen Display System (KDS) Specs →',
    },
    {
      id: 'billing',
      number: '04',
      title: 'Complete Order & Bill',
      badge: 'Fast POS Settlement',
      summary: 'Settle checks swiftly with UPI, cards, cash, or loyalty.',
      description:
        'Finalize payments quickly at the counter or tables. Connect seamlessly to standard 58mm or 80mm thermal receipt printers, apply discounts, redeem loyalty points, and automatically update daily sales reports.',
      bullets: [
        'High-speed settlement with split checks, discounts, and tips',
        'Direct printing to standard Bluetooth, USB, and LAN thermal receipt printers',
        'Automated real-time inventory deductions and daily revenue summaries',
      ],
      imageSrc: '/features/pos_billing.png',
      imageAlt: 'BrewPluse Point of Sale POS Billing and Settlement Screen',
      linkHref: '/restaurant-pos',
      linkLabel: 'Explore Cloud POS & Restaurant Billing →',
    },
  ];

  const current = steps[activeStep];

  return (
    <section id="walkthrough" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24 reveal-on-scroll">
      <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#002D23]/10 border border-[#002D23]/20 text-[#002D23] font-mono text-[11px] font-bold tracking-wider uppercase mb-3">
          <span className="w-2 h-2 rounded-full bg-[#002D23] animate-pulse" />
          <span>PRODUCT WALKTHROUGH</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B1714] tracking-tight leading-tight mb-4">
          From menu setup to paid bill in 4 simple steps.
        </h2>
        <p className="text-sm sm:text-base text-[#64736D] leading-relaxed">
          See how BrewPluse coordinates your entire cafe workflow. Visual demonstration with genuine product interfaces.
        </p>
      </div>

      {/* 4 Step Selector Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 mb-8">
        {steps.map((s, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 sm:p-4 rounded-[16px] text-left border transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#002D23] text-[#FFFEFA] border-[#002D23] shadow-md'
                  : 'bg-[#FFFEFA] text-[#0B1714] border-[#DDE3DD] hover:bg-[#F7F5EC] hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-[#B99A5B]' : 'text-[#64736D]'}`}>
                  STEP {s.number}
                </span>
                <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#B99A5B]' : 'bg-transparent'}`} />
              </div>
              <div className="text-xs sm:text-sm font-bold truncate">{s.title}</div>
              <div className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-gray-300' : 'text-[#64736D]'}`}>
                {s.summary}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Step Showcase Card */}
      <div className="rounded-3xl bg-[#FFFEFA] border border-[#DDE3DD] shadow-sm p-5 sm:p-8 lg:p-10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-5 text-left flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002D23]/10 border border-[#002D23]/20 text-[#002D23] text-[11px] font-mono font-bold uppercase tracking-wider mb-4">
                <span>{current.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B1714] tracking-tight mb-3">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#64736D] leading-relaxed mb-6 font-normal">
                {current.description}
              </p>
              <ul className="space-y-3 mb-8">
                {current.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#0B1714]">
                    <span className="w-4 h-4 rounded-full bg-[#002D23]/10 text-[#002D23] flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                      ✓
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mb-6">
                <Link
                  href={current.linkHref}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#002D23] hover:text-[#B99A5B] transition-colors underline underline-offset-4"
                >
                  <span>{current.linkLabel}</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DDE3DD] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#002D23] text-white text-xs sm:text-sm font-semibold hover:bg-[#001F19] shadow-sm transition-all"
              >
                <span>Explore BrewPluse</span>
                <span className="text-[#B99A5B]">→</span>
              </Link>
              <a
                href="/demo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-[10px] bg-[#F7F5EC] text-[#0B1714] text-xs sm:text-sm font-medium hover:bg-stone-200 border border-[#DDE3DD] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-[#002D23]">play_circle</span>
                <span>Try Interactive Demo</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-[16px] overflow-hidden border border-[#DDE3DD] bg-[#FFFEFA] shadow-md group">
              <img
                src={current.imageSrc}
                alt={current.imageAlt}
                title={current.imageAlt}
                className="w-full h-auto object-cover max-h-[480px] rounded-xl transition-all duration-300"
              />
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/75 backdrop-blur-sm text-white text-[10px] font-mono">
                Genuine BrewPluse Interface
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
