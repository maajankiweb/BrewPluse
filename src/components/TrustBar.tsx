import React from 'react';

export default function TrustBar() {
  return (
    <section className="py-5 bg-white border-y border-[#EBE8E3] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 sm:gap-6 text-xs sm:text-[13px] font-medium text-[#4a4642]">
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-700 text-[18px]">verified</span>
          <span>Trusted by modern cafes</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-700 text-[18px]">bolt</span>
          <span>Simple Setup</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-700 text-[18px]">qr_code_2</span>
          <span>QR Ordering</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-700 text-[18px]">lock</span>
          <span>Secure Payments</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-700 text-[18px]">delivery_dining</span>
          <span>Delivery Ready</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="material-symbols-outlined text-emerald-700 text-[18px]">support_agent</span>
          <span>24/7 Support</span>
        </span>
      </div>
    </section>
  );
}
