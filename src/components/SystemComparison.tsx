import React from 'react';

export default function SystemComparison() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center reveal-on-scroll">
      <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#002D23] mb-2 block">
        SYSTEM SIMPLIFICATION
      </span>
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1714] tracking-tight mb-4">
        Your cafe shouldn&apos;t need 5 separate tools.
      </h2>
      <p className="text-sm sm:text-base text-[#64736D] max-w-2xl mx-auto mb-12">
        Independent cafes lose revenue and customer goodwill when stitching together disconnected apps that don&apos;t communicate.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left items-stretch">
        {/* The Traditional Way */}
        <div className="p-7 sm:p-9 rounded-[16px] bg-[#F7F5EC] border border-[#DDE3DD] flex flex-col justify-between shadow-xs">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0B1714]/5 text-[#64736D] border border-[#DDE3DD] font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
              <span>•</span> THE TRADITIONAL WAY
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1714] mb-2.5">
              5 apps, 0 communication.
            </h3>
            <p className="text-xs sm:text-sm text-[#64736D] leading-relaxed mb-6">
              A legacy POS misses orders. Static PDF menus on Google Drive go stale. Staff juggle manual slips. Chaos ensues during peak rush hours.
            </p>
            <div className="space-y-3 text-xs sm:text-[13px] text-[#0B1714] mb-8">
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold text-sm shrink-0">✕</span>
                <span>
                  <strong>Lost Counter Tickets:</strong> Handwritten slips get lost between baristas and kitchen lines.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold text-sm shrink-0">✕</span>
                <span>
                  <strong>Heavy Monthly Software SaaS:</strong> Paying ₹2,000–₹5,000 every single month even during slow seasons.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold text-sm shrink-0">✕</span>
                <span>
                  <strong>Proprietary Hardware Lock-In:</strong> Forced to buy expensive vendor-locked terminals and printers.
                </span>
              </div>
            </div>
          </div>
          <div className="p-3.5 rounded-[10px] bg-[#0B1714]/5 border border-[#DDE3DD] text-[#64736D] font-mono text-xs font-semibold">
            Result: Unhappy rush lines, lost ticket revenue, wasted operational hours
          </div>
        </div>

        {/* The BrewPluse Way */}
        <div className="p-7 sm:p-9 rounded-[16px] bg-[#FFFEFA] border-2 border-[#002D23]/30 shadow-md flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#002D23]/10 text-[#002D23] border border-[#002D23]/20 font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
              <span>•</span> THE BREWPLUSE WAY
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B1714] mb-2.5">
              One synchronized heartbeat.
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5550] leading-relaxed mb-6">
              When an order is placed on Table 4, it routes immediately to the kitchen screen. Stock updates. Loyalty points accrue. Your entire team operates in unison.
            </p>
            <div className="space-y-3 text-xs sm:text-[13px] text-[#0B1714] mb-8">
              <div className="flex items-start gap-2.5">
                <span className="text-[#002D23] font-bold text-sm shrink-0">✓</span>
                <span>
                  <strong>Instant Multi-Station Sync:</strong> Table QR scans, counter billing, and kitchen KDS in one unified stream.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#002D23] font-bold text-sm shrink-0">✓</span>
                <span>
                  <strong>₹0/Month Forever for Cafe Owners:</strong> Zero monthly subscription and zero per-order software fees charged to the cafe. The ₹1 per-order fee is paid by the customer.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="text-[#002D23] font-bold text-sm shrink-0">✓</span>
                <span>
                  <strong>Works on Any Existing Device:</strong> Use standard iPads, Android tablets, laptops, phones, and thermal receipt printers.
                </span>
              </div>
            </div>
          </div>
          <div className="p-3.5 rounded-[10px] bg-[#002D23]/10 border border-[#002D23]/20 text-[#002D23] font-mono text-xs font-semibold">
            Result: Smooth kitchen flow, faster table turnarounds, happier customers
          </div>
        </div>
      </div>
    </section>
  );
}
