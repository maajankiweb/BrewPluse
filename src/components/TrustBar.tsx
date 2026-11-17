import React from 'react';

export default function TrustBar() {
  return (
    <section className="py-5 bg-[#FFFEFA] border-y border-[#DDE3DD] px-4 sm:px-6 lg:px-8 reveal-on-scroll">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 sm:gap-6 text-xs sm:text-[13px] font-medium text-[#0B1714]">
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[#002D23] text-[18px]">verified</span>
          <span>₹0/Month Forever for Cafe Owners</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[#002D23] text-[18px]">bolt</span>
          <span>Setup in &lt; 5 Minutes</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[#002D23] text-[18px]">qr_code_2</span>
          <span>Contactless QR Ordering</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[#002D23] text-[18px]">soup_kitchen</span>
          <span>Live Barista KDS Display</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[#002D23] text-[18px]">point_of_sale</span>
          <span>Speed Counter POS &amp; Thermal Print</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-[#002D23] text-[18px]">devices</span>
          <span>Zero Hardware Lock-In</span>
        </span>
      </div>
    </section>
  );
}
