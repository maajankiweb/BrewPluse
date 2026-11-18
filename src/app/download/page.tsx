'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function DownloadContent() {
  const searchParams = useSearchParams();
  const storeParam = searchParams.get('store') || '';
  const tableParam = searchParams.get('table') || '';

  const [cafeName, setCafeName] = useState(
    storeParam
      ? storeParam.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : ''
  );
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    if (storeParam) {
      try {
        localStorage.setItem('brewpluse::customer_active_store', storeParam);
        const stored = localStorage.getItem(`brewpluse::smart_links_${storeParam.toLowerCase()}`);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.cafeName) setCafeName(parsed.cafeName);
          if (parsed.logoUrl) setLogoUrl(parsed.logoUrl);
        }
      } catch (e) {}
    }
  }, [storeParam]);

  const menuUrl = storeParam
    ? `/m/${storeParam}${tableParam ? `?table=${encodeURIComponent(tableParam)}` : ''}`
    : '/demo/menu';

  return (
    <div className="w-full bg-[#F7F5EC] text-[#0B1714]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            '{"@context":"https://schema.org","@type":"SoftwareApplication","name":"BrewPluse for Android","operatingSystem":"Android 8.0+","applicationCategory":"BusinessApplication","softwareVersion":"1.2.0","downloadUrl":"https://brewpluse.com/downloads/brewpluse-app.apk","offers":{"@type":"Offer","price":"0","priceCurrency":"INR"},"publisher":{"@type":"Organization","name":"BrewPluse","url":"https://brewpluse.com"}}',
        }}
      />

      {/* DYNAMIC CAFE WELCOME BANNER (WHEN ACCESSED VIA CAFE QR / LINK) */}
      {storeParam && (
        <section className="bg-[#002D23] text-white py-4 px-4 sm:px-6 border-b border-[#B99A5B]/30 shadow-md">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#B99A5B]/40 flex items-center justify-center font-bold text-lg text-[#B99A5B] overflow-hidden shrink-0">
                {logoUrl ? (
                  <img src={logoUrl} alt={cafeName} className="w-full h-full object-cover" />
                ) : (
                  cafeName.charAt(0) || '☕'
                )}
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="text-sm font-extrabold text-white tracking-wide">
                    {cafeName}
                  </span>
                  {tableParam && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Table {tableParam}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[#DDE3DD]">
                  Pre-configured app download for this cafe. You can also view the digital menu online!
                </p>
              </div>
            </div>

            <Link
              href={menuUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#B99A5B] hover:bg-[#a88a4e] text-[#002D23] font-bold text-xs shadow-sm transition-all shrink-0"
            >
              <span>Open {cafeName} Menu Online →</span>
            </Link>
          </div>
        </section>
      )}

      {/* HERO SECTION */}
      <section className="pt-14 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-[#FFFEFA] border-b border-[#DDE3DD]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F7F5EC] border border-[#DDE3DD] text-xs font-mono font-bold uppercase tracking-wider text-[#002D23] mb-5 shadow-xs">
            <span className="material-symbols-outlined text-[#002D23] text-[16px]">phone_android</span>
            <span>{storeParam ? `${cafeName.toUpperCase()} APP` : 'MOBILE POS & DINING APP'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1714] mb-4">
            {storeParam ? (
              <>
                Order from <span className="text-[#002D23]">{cafeName}</span> with 1 tap.
              </>
            ) : (
              <>
                Manage your cafe <span className="text-[#002D23]">from anywhere.</span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-lg text-[#64736D] max-w-2xl mx-auto leading-relaxed">
            {storeParam
              ? `Download the official customer app to order directly from your table, customize food & coffee, and earn instant rewards at ${cafeName}.`
              : 'Download the official BrewPluse Android application for native hardware printing, offline cash sales, and real-time mobile order alerts.'}
          </p>
        </div>
      </section>

      {/* DOWNLOAD CARD & PHONE SHOWCASE */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-9 rounded-[16px] bg-[#FFFEFA] border border-[#DDE3DD] shadow-md">
              <div className="flex items-center gap-4 pb-6 border-b border-[#DDE3DD] mb-6">
                <img
                  src="/logos/brewpluse-icon.svg"
                  alt="BrewPluse Icon"
                  className="object-contain select-none shrink-0 rounded-2xl shadow-xs border border-[#DDE3DD]"
                  style={{ width: '64px', height: '64px' }}
                />
                <div>
                  <h2 className="text-2xl font-extrabold text-[#0B1714]">
                    {storeParam ? `${cafeName} • BrewPluse App` : 'BrewPluse for Android'}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-mono text-[#64736D]">v1.2.0 • Production Build</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#002D23]/10 text-[#002D23] text-[10px] font-mono font-bold border border-[#002D23]/20">
                      Verified Clean
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                <div className="p-3.5 rounded-xl bg-[#F7F5EC] border border-[#DDE3DD]">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8a857f]">Package Size</div>
                  <div className="text-sm font-bold text-[#0B1714] mt-1">~8.5 MB</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F5EC] border border-[#DDE3DD]">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8a857f]">OS Support</div>
                  <div className="text-sm font-bold text-[#0B1714] mt-1">Android 8.0+</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F5EC] border border-[#DDE3DD]">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8a857f]">Security</div>
                  <div className="text-sm font-bold text-[#002D23] mt-1">SHA-256 Sign</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#F7F5EC] border border-[#DDE3DD]">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8a857f]">License</div>
                  <div className="text-sm font-bold text-[#0B1714] mt-1">Free / ₹0</div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-y-3 mb-4">
                <a
                  href="/downloads/brewpluse-app.apk"
                  download=""
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#002D23] text-white text-sm font-bold hover:bg-black shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  <span>Download Android APK (Direct)</span>
                </a>

                {storeParam && (
                  <Link
                    href={menuUrl}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#F7F5EC] border border-[#002D23] text-[#002D23] text-sm font-bold hover:bg-[#002D23] hover:text-white transition-all"
                  >
                    <span>Browse {cafeName} Menu in Browser (No Install) →</span>
                  </Link>
                )}
              </div>

              <p className="text-xs text-center text-[#64736D]">
                Using iOS, Mac or Windows? Access the responsive web app at{' '}
                <a
                  href={storeParam ? menuUrl : 'https://app.brewpluse.com'}
                  className="text-[#002D23] font-bold hover:underline"
                >
                  {storeParam ? `${cafeName} Web Menu` : 'app.brewpluse.com'}
                </a>
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-[#64736D]">
              <span className="flex items-center gap-1.5">
                <span className="text-[#002D23] font-bold">✔</span> Direct APK download
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#002D23] font-bold">✔</span> No Play Store sign-in needed
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-[#002D23] font-bold">✔</span> Zero battery drain daemon
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-[280px] h-[560px] border-[12px] border-[#161a18] rounded-[42px] bg-[#161a18] shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[20px] bg-[#161a18] rounded-b-2xl z-20"></div>
              <div className="relative w-full h-full flex flex-col bg-[#F7F5EC] text-[#0B1714] overflow-hidden">
                <div className="bg-[#161a18] text-white px-4 pt-8 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-5 h-5 rounded bg-[#B99A5B]/20 text-[#B99A5B] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[13px]">local_cafe</span>
                    </span>
                    <span className="text-xs font-bold">BrewPluse Dining &amp; POS</span>
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {storeParam ? `${cafeName} ☀️` : "Shiv's Coffee Lounge ☀️"}
                  </div>
                </div>

                <div className="p-3.5 flex-1 flex flex-col gap-2.5">
                  <div className="p-3 rounded-[12px] bg-[#FFFEFA] border border-[#DDE3DD]">
                    <div className="text-[9px] font-mono text-[#8a857f] uppercase">Quick Order Ready</div>
                    <div className="text-base font-black text-[#0B1714]">
                      {storeParam ? cafeName : 'Artisan Espresso Bar'}
                    </div>
                    <div className="text-[8px] font-mono text-[#002D23] font-semibold">
                      ▲ Scan &bull; Order &bull; Pay UPI
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F7F5EC] border border-[#DDE3DD]">
                    <div className="flex items-center justify-between text-[10px] font-bold text-[#002D23]">
                      <span>{tableParam ? `Table ${tableParam}` : 'Table 4 • Dine-In'}</span>
                      <span>₹340</span>
                    </div>
                    <div className="text-[9px] text-[#64736D] mt-0.5">2x Cappuccino, 1x Croissant</div>
                  </div>

                  <div className="mt-auto w-full py-2.5 rounded-full bg-[#002D23] text-white text-[11px] font-bold text-center">
                    {storeParam ? `Open ${cafeName} Menu →` : 'Open Cashier Register →'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INSTALLATION STEPS */}
      <section className="py-14 sm:py-20 bg-white border-t border-[#DDE3DD] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#002D23] mb-2 block">
              QUICK INSTALL
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1714] tracking-tight">
              How to Install BrewPluse on Android
            </h2>
          </div>
          <div className="space-y-4">
            <div className="flex gap-4 items-start p-5 rounded-2xl bg-[#F7F5EC] border border-[#DDE3DD]">
              <div className="w-8 h-8 rounded-full bg-[#002D23] text-white flex items-center justify-center font-bold text-xs shrink-0">
                1
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B1714] mb-1">Download APK File</h3>
                <p className="text-xs text-[#64736D]">
                  Tap the download button above to download{' '}
                  <code className="bg-[#DDE3DD] px-1.5 py-0.5 rounded text-[11px]">brewpluse-app.apk</code> to your device.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-5 rounded-2xl bg-[#F7F5EC] border border-[#DDE3DD]">
              <div className="w-8 h-8 rounded-full bg-[#002D23] text-white flex items-center justify-center font-bold text-xs shrink-0">
                2
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B1714] mb-1">Allow Installation from Browser</h3>
                <p className="text-xs text-[#64736D]">
                  When prompted by Android, enable &quot;Allow from this source&quot; in Settings so your browser can install APK files.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-5 rounded-2xl bg-[#F7F5EC] border border-[#DDE3DD]">
              <div className="w-8 h-8 rounded-full bg-[#002D23] text-white flex items-center justify-center font-bold text-xs shrink-0">
                3
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0B1714] mb-1">Start Ordering</h3>
                <p className="text-xs text-[#64736D]">
                  Open BrewPluse, select your favorite dishes, and experience effortless table ordering.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F7F5EC] flex items-center justify-center">Loading...</div>}>
      <DownloadContent />
    </Suspense>
  );
}
