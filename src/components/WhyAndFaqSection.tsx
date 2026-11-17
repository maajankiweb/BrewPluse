'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function WhyAndFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const comparisonRows = [
    {
      feature: 'Monthly Software Fee',
      brew: '₹0 / month for life',
      trad: '₹1,500–₹5,000/mo',
      multi: 'Multiple SaaS Bills',
    },
    {
      feature: 'Upfront Setup Fee',
      brew: '₹0',
      trad: 'Mandatory',
      multi: 'Setup Costs',
    },
    {
      feature: 'Proprietary Hardware',
      brew: 'Not required',
      trad: 'Locked Terminals',
      multi: 'Varies',
    },
    {
      feature: 'Cafe Owner Order Fee',
      brew: '₹0 (Never charged to cafe)',
      trad: 'Fixed Regardless',
      multi: 'Fixed Monthly',
    },
    {
      feature: 'Customer Per-Order Fee',
      brew: '₹1 (Paid by customer)',
      trad: 'None (Cafe pays SaaS)',
      multi: 'None (Cafe pays SaaS)',
    },
    {
      feature: 'Voided / Cancelled Orders',
      brew: '₹0 fee',
      trad: 'N/A',
      multi: 'N/A',
    },
    {
      feature: 'Works on Standard Devices',
      brew: '✓ (Phones, tablets, PCs)',
      trad: '✕',
      multi: 'Differs',
    },
    {
      feature: 'Real-Time KDS & QR Sync',
      brew: '✓',
      trad: 'Extra addon fee',
      multi: 'Scattered Data',
    },
  ];

  const faqs = [
    {
      q: 'Is BrewPluse really free for cafe owners?',
      a: 'Yes. Cafe owners pay ₹0 per month to use BrewPluse, with no BrewPluse software fee charged to the cafe owner per order.',
    },
    {
      q: 'Why is there a ₹1 per-order fee?',
      a: "Under BrewPluse's current India pricing model, the ₹1 BrewPluse fee is charged to the customer rather than the cafe owner. The applicable fee is clearly displayed before the customer confirms the order.",
    },
    {
      q: "Will BrewPluse deduct ₹1 from my cafe's earnings for every order?",
      a: 'No. The ₹1 BrewPluse customer fee is not a per-order software fee charged to the cafe owner. Your cafe keeps 100% of the food and beverage order revenue.',
    },
    {
      q: 'Are there any other charges?',
      a: 'Any applicable taxes, payment-processing charges, or other charges depend on the relevant transaction and payment method. Review the applicable terms and payment details before completing a transaction.',
    },
    {
      q: 'What features are included?',
      a: 'Every core operational capability is included: fast counter POS billing, contactless table QR ordering, digital menu management with instant stock toggles, real-time Kitchen Display System (KDS), waiter mobile ordering, table layout management, customer loyalty rewards, discount coupons, and daily sales performance reports.',
    },
    {
      q: 'Can my staff use BrewPluse?',
      a: 'Yes. You can add your managers, waitstaff, cashiers, and kitchen team with role-based permissions (Owner, Admin, Manager, Staff) without per-user license penalties or seat fees.',
    },
    {
      q: 'Does BrewPluse work on phones and tablets?',
      a: 'Yes. BrewPluse is completely web-based and responsive. It operates smoothly across iPads, Android tablets, iPhones, Android smartphones, Windows laptops, and Macs. It also connects to standard 58mm/80mm USB, Bluetooth, and LAN thermal receipt printers.',
    },
    {
      q: 'How do I get started?',
      a: "Getting started takes less than 5 minutes. Click 'Start Your Free Cafe', enter your cafe details, configure your menu categories, and start punching orders immediately without credit cards or long-term contracts.",
    },
  ];

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F7F5EC] border-t border-[#DDE3DD] px-4 sm:px-6 lg:px-8 reveal-on-scroll">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Comparison Table */}
          <div className="lg:col-span-6 text-left">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#002D23] mb-2 block">
              WHY BREWPLUSE?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1714] tracking-tight mb-6">
              Everything connected. Everything under control.
            </h2>
            <div className="w-full overflow-x-auto rounded-[16px] border border-[#DDE3DD] bg-[#FFFEFA] shadow-2xs">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead>
                  <tr className="border-b border-[#DDE3DD] bg-[#F7F5EC]">
                    <th className="py-3 px-3.5 font-bold text-gray-700">Features</th>
                    <th className="py-3 px-3 font-bold text-[#002D23] bg-[#002D23]/5">BrewPluse</th>
                    <th className="py-3 px-3 font-bold text-gray-500">Traditional POS</th>
                    <th className="py-3 px-3 font-bold text-gray-500">Multiple Apps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {comparisonRows.map((r, i) => (
                    <tr key={i}>
                      <td className="py-2.5 px-3.5 font-semibold text-gray-800">{r.feature}</td>
                      <td className="py-2.5 px-3 font-bold text-[#002D23] bg-[#002D23]/5">{r.brew}</td>
                      <td className={`py-2.5 px-3 ${r.trad.includes('₹') || r.trad.includes('Mandatory') || r.trad.includes('Locked') || r.trad === '✕' ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                        {r.trad}
                      </td>
                      <td className={`py-2.5 px-3 ${r.multi.includes('Multiple') || r.multi.includes('Setup') || r.multi.includes('Fixed') ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                        {r.multi}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div id="faq" className="lg:col-span-6 text-left">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#002D23] mb-2 block">
              QUESTIONS &amp; ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1714] tracking-tight mb-6">
              Clear Answers for Cafe Operators
            </h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-[16px] border border-[#DDE3DD] bg-[#FFFEFA] overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-[13px] text-[#0B1714] hover:bg-[#F7F5EC] transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <span className="text-[#B99A5B] text-lg font-bold shrink-0 transition-transform duration-200">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs sm:text-[13px] text-[#64736D] leading-relaxed border-t border-[#DDE3DD]/40 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
