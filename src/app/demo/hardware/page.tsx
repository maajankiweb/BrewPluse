'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Printer,
  Tablet,
  QrCode,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export default function DemoHardwarePage() {
  const hardware = [
    {
      title: 'Smart NFC Table Cards',
      tagline: 'Tap-to-Order for iPhone & Android',
      price: '₹1,500 / piece',
      desc: 'Matte waterproof PVC cards embedded with high-frequency NTAG213 chips. Customers tap their phone to instantly open your digital menu.',
      url: '/demo/hardware/nfc-card',
      icon: CreditCard,
      badge: 'Bestseller',
    },
    {
      title: 'Acrylic QR Code Stands',
      tagline: 'Matte Wooden & Acrylic Counter Stands',
      price: '₹1,500 / stand',
      desc: 'Laser-engraved acrylic stands with scratch-resistant QR prints and wooden teakwood bases. Spill-proof and washable.',
      url: '/demo/hardware/qr-code-stand',
      icon: QrCode,
      badge: 'Popular',
    },
    {
      title: 'BrewPluse 80mm Bluetooth Thermal Printer',
      tagline: 'Auto-Cutter High Speed KOT & Receipt',
      price: '₹4,499',
      desc: 'Heavy-duty 260mm/s thermal printer with auto-cutter. Connects over Bluetooth, USB, and LAN Ethernet for instant kitchen printing.',
      url: '/demo/settings/printers',
      icon: Printer,
      badge: 'Plug & Play',
    },
    {
      title: 'Sunmi D2s Cloud POS Terminal',
      tagline: 'All-In-One Dual Display Android Register',
      price: '₹18,999',
      desc: '15.6" Full HD capacitive touchscreen with integrated Seiko 80mm thermal receipt printer. Preloaded with BrewPluse OS.',
      url: '/demo/support',
      icon: Tablet,
      badge: 'Commercial Grade',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
              <ShoppingBag className="w-6 h-6 text-amber-500" />
              <span>BrewPluse Hardware Store</span>
            </h1>
            <p className="text-xs text-[#686259] dark:text-zinc-400">
              Certified smart accessories, thermal receipt printers, and table QR merchandise for your cafe.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4" /> Free Pan-India Delivery
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> 1 Year Hardware Warranty
            </span>
          </div>
        </div>
      </div>

      {/* Hardware Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hardware.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-[#141210] dark:text-white group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ebe8e3]/70 dark:border-[#222225] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-400 font-mono block">Pricing</span>
                  <span className="font-mono font-black text-base text-[#141210] dark:text-white">
                    {item.price}
                  </span>
                </div>

                <Link
                  href={item.url}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
