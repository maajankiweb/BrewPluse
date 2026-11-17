import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BrewPluse Documentation – Setup Guides & Hardware Specs',
  description:
    'Complete operational manual and technical documentation for BrewPluse: 5-minute cafe setup, ESC/POS thermal printer pairing, KDS kitchen routing, QR table ordering, and GST billing.',
  alternates: {
    canonical: 'https://brewpluse.com/documentation',
  },
  openGraph: {
    title: 'BrewPluse Documentation – Setup Guides & Hardware Specs | BrewPluse',
    description:
      'Learn how to set up and configure BrewPluse Cafe OS: thermal receipt printing, table QR menus, paperless kitchen screens, and GST invoicing.',
    url: 'https://brewpluse.com/documentation',
    type: 'website',
  },
};

export default function DocumentationPage() {
  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient radial glow */}
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>TECHNICAL MANUAL &amp; GUIDES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            BrewPluse <span className="text-emerald-400">Documentation.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Everything you need to launch, configure, and scale your cafe or restaurant on BrewPluse—from hardware pairing to kitchen queue optimization.
          </p>
        </div>

        {/* Documentation Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          
          {/* Module 1: 5-Minute Fast-Start */}
          <div className="p-8 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                🚀
              </span>
              <h2 className="text-xl font-bold text-white">1. Fast-Start Cafe Setup</h2>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Launch your cafe in under 5 minutes without technical assistance or software installations:
            </p>
            <ol className="space-y-2.5 text-xs text-gray-400 font-mono list-decimal list-inside">
              <li>Create your free account at <Link href="/signup" className="text-emerald-400 underline">brewpluse.com/signup</Link>.</li>
              <li>Enter your cafe trade name, address, and select your currency (INR default with 5% GST).</li>
              <li>Input or import your menu categories, dishes, variants, and dietary flags (Veg, Non-Veg, Vegan).</li>
              <li>Generate and print dynamic QR codes for your tables in the Floor Management panel.</li>
            </ol>
          </div>

          {/* Module 2: Thermal Printer Setup */}
          <div className="p-8 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-lg">
                🖨️
              </span>
              <h2 className="text-xl font-bold text-white">2. ESC/POS Thermal Printing</h2>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              BrewPluse connects directly to standard 58mm and 80mm ESC/POS thermal printers:
            </p>
            <ul className="space-y-2 text-xs text-gray-400 font-mono">
              <li>• <strong>Web Bluetooth Direct:</strong> Pair Bluetooth printers inside Chrome browser with zero drivers.</li>
              <li>• <strong>USB &amp; System Spooler:</strong> Plug via USB and print via browser native printing.</li>
              <li>• <strong>Paper Widths:</strong> 58mm (compact counter) and 80mm (full itemized tax receipts).</li>
              <li>• <strong>Supported Brands:</strong> Sunmi, Rongta, Epson, TVS, Everycom, and generic ESC/POS.</li>
            </ul>
          </div>

          {/* Module 3: QR Table Ordering & Geofencing */}
          <div className="p-8 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-lg">
                📍
              </span>
              <h2 className="text-xl font-bold text-white">3. QR Ordering &amp; Geofencing</h2>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Enable guests to scan and self-order with built-in fraud prevention:
            </p>
            <ul className="space-y-2 text-xs text-gray-400 font-mono">
              <li>• <strong>Zero App Download:</strong> Guests scan using standard mobile camera.</li>
              <li>• <strong>GPS Geofence:</strong> Haversine mathematical distance calculation blocks orders placed outside cafe boundaries.</li>
              <li>• <strong>Payer Choice:</strong> Choose whether the ₹1 micro-fee is absorbed by cafe or paid by diner.</li>
              <li>• <strong>Dietary Badges:</strong> Auto-filter by Vegetarian, Non-Vegetarian, or Vegan.</li>
            </ul>
          </div>

          {/* Module 4: Paperless Kitchen Display (KDS) */}
          <div className="p-8 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-lg">
                🍳
              </span>
              <h2 className="text-xl font-bold text-white">4. Kitchen Display (KDS) Routing</h2>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Replace messy paper KOT tickets with live digital kitchen screens:
            </p>
            <ul className="space-y-2 text-xs text-gray-400 font-mono">
              <li>• <strong>Real-Time Updates:</strong> Orders placed at tables appear on KDS within 300ms.</li>
              <li>• <strong>Color Countdown Timers:</strong> Green (fresh), Amber (&gt;8 min), Red (&gt;15 min overdue).</li>
              <li>• <strong>Multi-Station Routing:</strong> Separate Barista queue from Main Hot Kitchen queue.</li>
              <li>• <strong>One-Tap Bump Bar:</strong> Mark tickets as Preparing, Ready, or Served.</li>
            </ul>
          </div>

        </div>

        {/* Hardware Recommendations Table */}
        <div className="p-8 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl mb-16 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                TESTED HARDWARE ECOSYSTEM
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">Recommended Devices &amp; Printers</h3>
            </div>
            <Link
              href="/download"
              className="text-xs font-mono text-emerald-400 underline hover:text-emerald-300"
            >
              Download Mobile Apps ↗
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse font-mono">
              <thead>
                <tr className="border-b border-[#1E362B] text-gray-400 uppercase text-[11px]">
                  <th className="pb-3">Hardware Type</th>
                  <th className="pb-3">Recommended Models</th>
                  <th className="pb-3">Connection Mode</th>
                  <th className="pb-3">Approx Cost (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E362B] text-gray-300 text-xs">
                <tr>
                  <td className="py-3.5 font-bold text-white">Counter POS Terminal</td>
                  <td className="py-3.5">Any iPad, Android Tablet (Samsung/Lenovo), or Laptop</td>
                  <td className="py-3.5 text-emerald-400">Browser / Wi-Fi</td>
                  <td className="py-3.5">Existing Device (₹0)</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">58mm Bluetooth Printer</td>
                  <td className="py-3.5">Rongta RPP02N, Everycom POS-58, Sunmi Handheld</td>
                  <td className="py-3.5 text-emerald-400">Web Bluetooth / USB</td>
                  <td className="py-3.5">₹2,499 – ₹3,999</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">80mm Heavy-Duty Printer</td>
                  <td className="py-3.5">Epson TM-T82, TVS RP 3200, Rongta RP80</td>
                  <td className="py-3.5 text-emerald-400">USB / Ethernet LAN</td>
                  <td className="py-3.5">₹5,999 – ₹8,999</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-white">Kitchen Display Screen</td>
                  <td className="py-3.5">10-inch Android Tablet or 15-inch Budget Touch Monitor</td>
                  <td className="py-3.5 text-emerald-400">Wi-Fi / Browser</td>
                  <td className="py-3.5">₹7,999 – ₹12,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Need Assisted Setup CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#14231C] to-[#0D1612] border border-emerald-500/40 text-center max-w-2xl mx-auto space-y-4">
          <h3 className="text-2xl font-bold text-white">Need Personal Setup Assistance?</h3>
          <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
            Our onboarding engineers can remotely digitize your menu, configure your tax slabs, and test your Bluetooth printer free of charge.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/contact"
              className="py-3 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-md"
            >
              Request Free Setup Call →
            </Link>
            <Link
              href="/demo"
              className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 transition-all"
            >
              Test Live Sandbox
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
