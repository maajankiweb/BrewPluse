'use client';

import React, { useState } from 'react';

export default function WhyAndFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const comparisonRows = [
    { name: 'Free to Start', brew: '✔', trad: '✕', multi: '✕' },
    { name: 'Customer-Faced Pricing', brew: '✔ (Choose payer)', trad: '✕', multi: '✕' },
    { name: 'Cafe-Faced Option', brew: '✔ (Absorb if desired)', trad: '✕', multi: '✕' },
    { name: 'Per-Order Usage Model', brew: '✔ (Pay as you grow)', trad: 'Heavy Upfront', multi: 'Recurring SaaS' },
    { name: 'Transparent Checkout Fee', brew: '✔ (Clear breakdown)', trad: '✕', multi: '✕' },
    { name: 'No Forced Subscription', brew: '✔', trad: 'Annual Contracts', multi: 'Fixed Monthly Bills' },
    { name: 'Configurable Order Threshold', brew: '✔ (Auto-transition)', trad: '✕', multi: '✕' },
    { name: 'Works on Any Device', brew: '✔', trad: '✕', multi: 'Differs' },
    { name: 'Real-time Analytics & Sync', brew: '✔', trad: 'Basic Reports', multi: 'Scattered Data' },
  ];

  const faqs = [
    {
      q: 'What is Customer-Faced pricing?',
      a: 'Under Customer-Faced pricing, your cafe pays ₹0/month software subscription. A micro-convenience fee of ₹1 is added to the guest’s digital bill. Your cafe software cost is 100% free.',
    },
    {
      q: 'What is Cafe-Faced pricing?',
      a: 'In Cafe-Faced pricing, your cafe absorbs the ₹1 per order fee. There are still zero monthly subscription fees, zero upfront hardware charges, and no annual locked-in contracts.',
    },
    {
      q: 'Can I choose who pays the BrewPluse fee?',
      a: 'Yes, absolutely. You can toggle between Customer-Faced and Cafe-Faced modes at any time with a single switch in your cafe settings.',
    },
    {
      q: 'What happens after the customer-paid order limit?',
      a: 'There are no artificial order cutoffs. You can process unlimited dine-in, takeaway, and delivery orders. You only pay for successful orders with zero monthly commitments.',
    },
    {
      q: 'Will customers see the BrewPluse fee?',
      a: 'If you enable Customer-Faced mode, a transparent ₹1 line item appears on the checkout summary as a digital service fee. In Cafe-Faced mode, the customer sees ₹0 extra fee.',
    },
    {
      q: 'Can I manage multiple cafe locations from a single dashboard?',
      a: 'Yes. You can switch between outlets, compare sales trajectories, sync master menus, and manage staff permissions across all locations from one unified account.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBFA] border-t border-[#EBE8E3] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section A: Comparison Table */}
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 mb-2 block">
            WHY BREWPLUSE?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#141210] tracking-tight mb-4">
            Everything connected. Everything under control.
          </h2>
          <p className="text-sm sm:text-base text-[#5a554f] max-w-xl mx-auto leading-relaxed mb-8">
            Compare BrewPluse against outdated traditional POS machines and fragmented multi-app setups.
          </p>

          <div className="w-full overflow-x-auto rounded-2xl border border-[#E7E5E0] bg-white shadow-2xs text-left">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-[#EBE8E3] bg-[#F8F7F4]">
                  <th className="py-3.5 px-4 font-bold text-gray-700">Features</th>
                  <th className="py-3.5 px-4 font-bold text-emerald-800 bg-emerald-50/70">BrewPluse</th>
                  <th className="py-3.5 px-4 font-bold text-gray-500">Traditional POS</th>
                  <th className="py-3.5 px-4 font-bold text-gray-500">Multiple Apps</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {comparisonRows.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-gray-800">{r.name}</td>
                    <td className="py-3 px-4 font-bold text-emerald-700 bg-emerald-50/40">
                      {r.brew}
                    </td>
                    <td className="py-3 px-4 text-gray-400 font-normal">
                      {r.trad}
                    </td>
                    <td className="py-3 px-4 text-gray-400 font-normal">
                      {r.multi}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section B: FAQ Accordion */}
        <div id="faq" className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 mb-2 block">
            YOUR QUESTIONS
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight mb-4">
            Honest Answers for Cafe Operators
          </h2>
          <p className="text-sm sm:text-base text-[#5a554f] max-w-lg mx-auto leading-relaxed mb-8">
            Clear, transparent answers about our ₹0 software fees, billing modes, and device compatibility.
          </p>

          <div className="space-y-3 text-left">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-[#E7E5E0] bg-white overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#141210] hover:bg-[#F8F7F4] transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="text-amber-600 text-lg font-bold shrink-0 transition-transform duration-200">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-[#5a554f] leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
