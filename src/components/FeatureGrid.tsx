import React from 'react';

export default function FeatureGrid() {
  const features = [
    {
      icon: 'qr_code_scanner',
      title: 'Digital Orders',
      desc: 'QR menu, dine-in, takeaway & delivery orders in one place.',
      color: 'bg-emerald-50 text-emerald-800',
    },
    {
      icon: 'point_of_sale',
      title: 'Smart Billing',
      desc: 'Fast billing with taxes, discounts, and split payments.',
      color: 'bg-amber-50 text-amber-800',
    },
    {
      icon: 'restaurant_menu',
      title: 'Menu Management',
      desc: 'Update items, prices, variants & availability instantly.',
      color: 'bg-rose-50 text-rose-800',
    },
    {
      icon: 'inventory_2',
      title: 'Inventory Tracking',
      desc: 'Real-time stock tracking & low stock alerts.',
      color: 'bg-blue-50 text-blue-800',
    },
    {
      icon: 'badge',
      title: 'Staff Management',
      desc: 'Manage staff roles, permissions & track performance.',
      color: 'bg-teal-50 text-teal-800',
    },
    {
      icon: 'analytics',
      title: 'Reports & Insights',
      desc: 'Real-time reports to track sales, orders & customer behavior.',
      color: 'bg-purple-50 text-purple-800',
    },
    {
      icon: 'loyalty',
      title: 'Customer Loyalty',
      desc: 'Build customer loyalty with points, offers & exciting promotions.',
      color: 'bg-orange-50 text-orange-800',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
        <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-emerald-800 mb-2 block">
          MADE FOR EVERYONE
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#141210] tracking-tight mb-4">
          Everything you need to run your cafe operations.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white border border-[#E7E5E0] hover:border-emerald-500/50 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
              >
                <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
              </div>
              <h3 className="text-base font-bold text-[#141210] mb-2">{item.title}</h3>
              <p className="text-xs text-[#5a554f] leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
