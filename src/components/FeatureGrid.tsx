import React from 'react';
import Link from 'next/link';

export default function FeatureGrid() {
  const features = [
    {
      icon: 'point_of_sale',
      title: 'Cafe POS (CafePOS)',
      desc: 'Rapid 2-tap counter billing, modifier customization, offline cash resiliency, and thermal receipts.',
      link: '/cafe-pos',
      linkText: 'Explore Cafe POS →',
      color: 'bg-emerald-50 text-emerald-800',
    },
    {
      icon: 'table_restaurant',
      title: 'Restaurant POS System',
      desc: 'Interactive dining floor plans, seat transfers, split billing, and multi-station kitchen routing.',
      link: '/restaurant-pos',
      linkText: 'Explore Restaurant POS →',
      color: 'bg-blue-50 text-blue-800',
    },
    {
      icon: 'qr_code_scanner',
      title: 'QR Table Ordering System',
      desc: 'Contactless self-ordering via table QR codes. Instant UPI checkout with zero app downloads.',
      link: '/qr-ordering-system',
      linkText: 'View QR Ordering →',
      color: 'bg-amber-50 text-amber-800',
    },
    {
      icon: 'skillet',
      title: 'Kitchen Display (KDS)',
      desc: 'Paperless kitchen order screens with color-coded timers, barista routing, and audio alerts.',
      link: '/kitchen-display-system',
      linkText: 'View Kitchen KDS →',
      color: 'bg-purple-50 text-purple-800',
    },
    {
      icon: 'restaurant_menu',
      title: 'Digital QR Menu',
      desc: 'High-res food photography, live 86 out-of-stock toggles, and instant price updates.',
      link: '/digital-menu',
      linkText: 'View Digital Menu →',
      color: 'bg-rose-50 text-rose-800',
    },
    {
      icon: 'devices',
      title: 'Staff Waiter Handheld POS',
      desc: 'Take table orders on standard smartphones or tablets with instant kitchen ticket firing.',
      link: '/staff-ordering-system',
      linkText: 'View Waiter POS →',
      color: 'bg-teal-50 text-teal-800',
    },
    {
      icon: 'inventory_2',
      title: 'Cafe Management Software',
      desc: 'Ingredient-level stock tracking, automated recipe deductions, and shift performance reports.',
      link: '/cafe-management-software',
      linkText: 'View Cafe Management →',
      color: 'bg-indigo-50 text-indigo-800',
    },
    {
      icon: 'savings',
      title: 'Free Cafe & Restaurant POS',
      desc: 'Zero monthly software subscription fees. Pay only ₹1 per billed order with no locked hardware.',
      link: '/free-cafe-management-software',
      linkText: 'Learn About Free POS →',
      color: 'bg-orange-50 text-orange-800',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 mb-2 block">
          COMPLETE POS &amp; OPERATIONS PLATFORM
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141210] tracking-tight mb-4">
          Everything You Need to Run Your Cafe &amp; Restaurant.
        </h2>
        <p className="text-sm sm:text-base text-[#5a554f] max-w-xl mx-auto leading-relaxed">
          From fast front-counter POS billing and contactless QR tables to paperless kitchen screens and automated recipe inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left mb-10">
        {features.map((item, idx) => (
          <Link
            key={idx}
            href={item.link}
            className="group p-6 rounded-2xl bg-white border border-[#E7E5E0] hover:border-emerald-500/60 shadow-2xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${item.color}`}
              >
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              </div>
              <h3 className="text-base font-bold text-[#141210] group-hover:text-emerald-800 transition-colors mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#5a554f] leading-relaxed mb-4">{item.desc}</p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center text-xs font-semibold text-emerald-700 group-hover:text-emerald-900 group-hover:translate-x-0.5 transition-all">
              <span>{item.linkText}</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/features"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5F4F0] hover:bg-emerald-50 text-emerald-900 hover:text-emerald-950 font-semibold text-sm border border-[#E7E5E0] transition-colors"
        >
          <span>Explore All 18+ POS Features &amp; Capabilities</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
