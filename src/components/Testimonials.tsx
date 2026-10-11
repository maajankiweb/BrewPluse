import React from 'react';

export default function Testimonials() {
  const reviews = [
    {
      badge: 'Peak Rush',
      quote:
        '“Weekend rush used to cause major billing bottlenecks. Since switching to BrewPluse, table turn time improved noticeably and counter staff handles double the order volume with zero confusion.”',
      initials: 'RM',
      name: 'Rohan Mehta',
      outlet: 'The Daily Roast • Mumbai',
      color: 'bg-amber-100 text-amber-900 border-amber-200/80',
    },
    {
      badge: 'Offline First',
      quote:
        '“Our biggest worry was internet drops interrupting billing during evening peak hours. BrewPluse keeps running smoothly offline and syncs automatically. Closing registers takes 5 minutes now.”',
      initials: 'SI',
      name: 'Sneha Iyer',
      outlet: 'Cafe Botanica • Bangalore',
      color: 'bg-emerald-100 text-emerald-900 border-emerald-200/80',
    },
    {
      badge: 'Zero Mistakes',
      quote:
        '“The Kitchen Display System completely eliminated lost paper tickets between baristas and kitchen. Order errors dropped to near zero, and our customers love the clean QR menu.”',
      initials: 'AM',
      name: 'Arjun Malhotra',
      outlet: 'Coffee Culture • Delhi',
      color: 'bg-blue-100 text-blue-900 border-blue-200/80',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FBFBFA] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl bg-white border border-[#E7E5E0] shadow-xs p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
            
            {/* Left Header Column */}
            <div className="lg:w-1/4 shrink-0 text-left">
              <span className="text-[11px] font-mono font-bold tracking-widest text-[#8a857f] uppercase mb-2 block">
                LOVE FROM CAFES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight leading-snug mb-3">
                Cafes love<br />
                working with<br />
                <span className="text-emerald-700 inline-flex items-center gap-1.5">
                  BrewPluse{' '}
                  <span className="material-symbols-outlined text-amber-500 text-[24px]">
                    favorite
                  </span>
                </span>
              </h2>

              <div className="flex items-center gap-1.5 text-xs text-[#524d47] mt-4">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold text-[#141210]">4.9/5</span>
                <span className="text-[#8a857f]">• Verified cafes</span>
              </div>
            </div>

            {/* Right Testimonial Cards */}
            <div className="lg:w-3/4 w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 text-left">
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-[#FBFBFA] border border-[#E7E5E0] flex flex-col justify-between hover:shadow-md transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(5)].map((_, starIdx) => (
                          <svg key={starIdx} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-[#8a857f]">{r.badge}</span>
                    </div>

                    <p className="text-xs sm:text-[13px] text-[#2e2a27] leading-relaxed mb-6 font-normal">
                      {r.quote}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#EAE8E3]">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full ${r.color} font-mono font-bold text-xs flex items-center justify-center shrink-0 border`}
                      >
                        {r.initials}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#141210]">{r.name}</div>
                        <div className="text-[10px] text-[#7a756f]">{r.outlet}</div>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-mono font-bold shrink-0">
                      <svg className="w-2.5 h-2.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
