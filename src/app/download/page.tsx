import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Download Android APK & Desktop POS Software | BrewPluse",
  description: "Download the official BrewPluse Android application for instant thermal printing, offline billing, table management, and real-time mobile order alerts.",
};

export default function DownloadPage() {
  const apkFileName = "BrewPluse-Android.apk";
  const apkDownloadUrl = `/${apkFileName}`;
  const sha256Hash = "F4141B013643760E01BA5F16D53F6A1195C7E2640C60C3A5DD0B428D2583E675";

  return (
    <div className="w-full">
      <div className="w-full bg-[#FBFBFA]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "BrewPluse POS for Android",
              operatingSystem: "Android 8.0+",
              applicationCategory: "BusinessApplication",
              softwareVersion: "1.0.0",
              downloadUrl: apkDownloadUrl,
              fileSize: "5.9MB",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "INR",
              },
              publisher: {
                "@type": "Organization",
                name: "BrewPluse",
                url: "/",
              },
            }),
          }}
        />

        {/* Hero Section */}
        <section className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#EBE8E3]">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] text-xs font-mono font-bold uppercase tracking-wider text-[#005c36] mb-5 shadow-xs">
              <span className="material-symbols-outlined text-emerald-700 text-[16px]">phone_android</span>
              <span>OFFICIAL ANDROID APP & POS BRIDGE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141210] mb-4">
              Manage your cafe <span className="text-[#005c36]">from anywhere.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#5a554f] max-w-2xl mx-auto leading-relaxed">
              Download the official BrewPluse Android APK for native Bluetooth/Wi-Fi thermal printing, offline cash billing, table ordering, and live kitchen alerts.
            </p>
          </div>
        </section>

        {/* Main Download Card & Mockup Section */}
        <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Download Card */}
            <div className="lg:col-span-7">
              <div className="p-7 sm:p-9 rounded-3xl bg-white border border-[#E7E5E0] shadow-md">
                <div className="flex items-center gap-4 pb-6 border-b border-[#E7E5E0] mb-6">
                  <div className="w-16 h-16 rounded-2xl shadow-xs border border-emerald-900/30 bg-[#0b2b1a] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-emerald-400 text-[32px]">local_cafe</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-[#141210]">BrewPluse POS for Android</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-mono text-[#7a756f]">v1.0.0 • Production Build</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-mono font-bold border border-emerald-200">
                        ✓ Verified Clean & Safe
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
                  <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0]">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8a857f]">Package Size</div>
                    <div className="text-sm font-bold text-[#141210] mt-1">5.8 MB</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0]">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8a857f]">OS Support</div>
                    <div className="text-sm font-bold text-[#141210] mt-1">Android 8.0+</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0]">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8a857f]">Security</div>
                    <div className="text-sm font-bold text-emerald-700 mt-1">SHA-256 Sign</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0]">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8a857f]">License</div>
                    <div className="text-sm font-bold text-[#141210] mt-1">Free / ₹0</div>
                  </div>
                </div>

                {/* Primary Download Button */}
                <a
                  href={apkDownloadUrl}
                  download={apkFileName}
                  className="w-full inline-flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#0b2b1a] text-white text-base font-bold hover:bg-black shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all mb-4 group"
                >
                  <span className="material-symbols-outlined text-[22px] group-hover:scale-110 transition-transform">download</span>
                  <span>Download Android APK (Direct - 5.8 MB)</span>
                </a>

                {/* Mirror Link */}
                <div className="text-center mb-5">
                  <span className="text-xs text-[#7a756f]">
                    Alternative Mirror:{" "}
                    <a href="/downloads/BrewPluse-Android.apk" download={apkFileName} className="text-[#005c36] font-bold hover:underline">
                      Server Mirror 2
                    </a>
                  </span>
                </div>

                {/* Checksum Box */}
                <div className="p-3 rounded-xl bg-[#FBFBFA] border border-[#E7E5E0] mb-4">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#8a857f] mb-1">
                    <span>SHA-256 CHECKSUM</span>
                    <span className="text-emerald-700 font-bold">VERIFIED</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#5a554f] break-all select-all bg-white p-2 rounded border border-[#EBE8E3]">
                    {sha256Hash}
                  </div>
                </div>

                <p className="text-xs text-center text-[#7a756f]">
                  Using iOS, Mac or Windows? Access the responsive web portal at{" "}
                  <Link href="/login" className="text-[#005c36] font-bold hover:underline">
                    BrewPluse Web Portal →
                  </Link>
                </p>
              </div>

              {/* Badges row */}
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-[#66615b]">
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> Direct APK download
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> No Google Play sign-in required
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">✔</span> Thermal ESC/POS ready
                </span>
              </div>
            </div>

            {/* Right Column: Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-[300px] h-[600px] border-[12px] border-[#161a18] rounded-[44px] bg-[#161a18] shadow-2xl overflow-hidden ring-1 ring-black/10">
                {/* Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[22px] bg-[#161a18] rounded-b-2xl z-20"></div>
                
                {/* Screen Content */}
                <div className="relative w-full h-full flex flex-col bg-[#FBFBFA] text-[#1a1715] overflow-hidden">
                  {/* Mockup Header */}
                  <div className="bg-[#0b2b1a] text-white px-4 pt-9 pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[13px]">local_cafe</span>
                        </span>
                        <span className="text-xs font-bold">BrewPluse POS</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                        ONLINE
                      </span>
                    </div>
                    <div className="text-[10px] text-gray-300">Live Cafe Register ☕</div>
                  </div>

                  {/* Mockup Body */}
                  <div className="p-3.5 flex-1 flex flex-col gap-2.5 overflow-hidden">
                    {/* KPI Widget */}
                    <div className="p-3 rounded-xl bg-white border border-[#EBE8E3]">
                      <div className="text-[9px] font-mono text-[#8a857f] uppercase">Today's Sales</div>
                      <div className="text-lg font-black text-[#141210] font-mono">₹18,420</div>
                      <div className="text-[8px] font-mono text-emerald-600 font-semibold">▲ 14.8% vs yesterday</div>
                    </div>

                    {/* Stats Widget */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-white border border-[#EBE8E3]">
                        <div className="text-[8px] font-mono text-[#8a857f]">Active Orders</div>
                        <div className="text-sm font-black text-[#141210]">12</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-[#EBE8E3]">
                        <div className="text-[8px] font-mono text-[#8a857f]">Kitchen Queue</div>
                        <div className="text-sm font-black text-amber-600">3 Tickets</div>
                      </div>
                    </div>

                    {/* Live Order Card */}
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#005c36]">
                        <span>Table 4 • Dine-In</span>
                        <span>₹340</span>
                      </div>
                      <div className="text-[9px] text-[#5a554f] mt-0.5">2x Cappuccino, 1x Croissant</div>
                      <div className="text-[8px] font-mono text-emerald-700 mt-1">Paid via UPI • Printed</div>
                    </div>

                    {/* Offline Register Card */}
                    <div className="p-2.5 rounded-xl bg-white border border-[#EBE8E3]">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#141210]">
                        <span>Cold Brew Reserve</span>
                        <span className="font-mono">₹180</span>
                      </div>
                      <div className="text-[8px] text-[#8a857f]">ESC/POS 58mm Thermal Printer Ready</div>
                    </div>

                    {/* Bottom CTA in Mockup */}
                    <div className="mt-auto w-full py-2.5 rounded-full bg-[#0b2b1a] text-white text-[11px] font-bold text-center shadow-sm">
                      Open Cashier Register →
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Step-by-Step Installation Instructions */}
        <section className="py-14 sm:py-20 bg-white border-t border-[#EBE8E3] px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#005c36] mb-2 block">
                QUICK INSTALL GUIDE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] tracking-tight">
                How to Install BrewPluse APK on Android
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4 items-start p-5 rounded-2xl bg-[#FBFBFA] border border-[#E7E5E0]">
                <div className="w-8 h-8 rounded-full bg-[#005c36] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#141210] mb-1">Download APK File</h3>
                  <p className="text-xs text-[#5a554f]">
                    Tap the <strong>Download Android APK</strong> button above to save{" "}
                    <code className="bg-[#EBE8E3] px-1.5 py-0.5 rounded text-[11px] font-mono">
                      BrewPluse-Android.apk
                    </code>{" "}
                    (3.5 MB) directly to your device.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-5 rounded-2xl bg-[#FBFBFA] border border-[#E7E5E0]">
                <div className="w-8 h-8 rounded-full bg-[#005c36] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#141210] mb-1">Allow Installation from Browser</h3>
                  <p className="text-xs text-[#5a554f]">
                    When prompted by Android (Chrome/Brave/Edge), tap <strong>Settings</strong> and turn on{" "}
                    <em>"Allow from this source"</em> to install downloaded APKs.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start p-5 rounded-2xl bg-[#FBFBFA] border border-[#E7E5E0]">
                <div className="w-8 h-8 rounded-full bg-[#005c36] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#141210] mb-1">Open & Start Billing</h3>
                  <p className="text-xs text-[#5a554f]">
                    Open BrewPluse from your home screen, log in to your cafe store or use the offline POS register to punch orders immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
