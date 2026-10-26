import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "How to Set Up & Run Cafe POS in 5 Minutes | BrewPluse Playbook",
  description: "Step-by-step setup guide for Cafe POS & Restaurant POS. Import digital menus, print table QR codes, connect kitchen KDS & start billing in under 5 mins.",
  keywords: [
    "how to setup cafe pos",
    "cafe pos guide",
    "CafePOS setup",
    "restaurant pos onboarding",
    "Resturant POS",
    "free cafe pos tutorial",
    "table qr ordering setup",
    "kitchen display system setup"
  ],
  alternates: {
    canonical: "https://brewpluse.com/how-to-use",
  },
  openGraph: {
    title: "How to Set Up & Run Cafe POS in 5 Minutes | BrewPluse Playbook",
    description: "Step-by-step setup guide for Cafe POS & Restaurant POS. Import digital menus, print table QR codes, connect kitchen KDS & start billing in under 5 mins.",
    url: 'https://brewpluse.com/how-to-use',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "How to Set Up & Run Cafe POS in 5 Minutes | BrewPluse Playbook",
    description: "Step-by-step setup guide for Cafe POS & Restaurant POS. Import digital menus, print table QR codes, connect kitchen KDS & start billing in under 5 mins.",
  },
};

export default function HowToUsePage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://brewpluse.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "How to Use Cafe POS",
        "item": "https://brewpluse.com/how-to-use"
      }
    ]
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Set Up & Run BrewPluse Cafe POS and Restaurant POS",
    "description": "Step-by-step guide to setting up your cafe POS, adding digital menus, generating QR codes, connecting kitchen screens, and ringing up sales on BrewPluse.",
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Create Your Free Cafe POS Account",
        "text": "Visit brewpluse.com/signup, enter your cafe name, choose your outlet currency, and set your store URL handle.",
        "url": "https://brewpluse.com/how-to-use#step-1"
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Build Your Digital QR Menu",
        "text": "Add food categories and item options with customizable modifiers (Milk choice, Extra shots, Sugar level).",
        "url": "https://brewpluse.com/how-to-use#step-2"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Print Dynamic Table QR Codes",
        "text": "Generate formatted table QR stickers directly from your dashboard. Print them and place them on your dining tables.",
        "url": "https://brewpluse.com/how-to-use#step-3"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Connect Kitchen Display (KDS) & Printers",
        "text": "Open the Kitchen Display (KDS) on any tablet or iPad. Connect any 58mm/80mm thermal receipt printer via USB, LAN, or Bluetooth.",
        "url": "https://brewpluse.com/how-to-use#step-4"
      }
    ]
  };

  return (
    <div className="w-full bg-[#FBFBFA]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <section className="pt-16 sm:pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#EBE8E3] text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FBFBFA] border border-[#E7E5E0] text-xs font-mono font-bold uppercase tracking-wider text-[#005c36] mb-4 shadow-xs">
            <span className="material-symbols-outlined text-blue-700 text-[16px]">menu_book</span>
            <span>STEP-BY-STEP CAFE PLAYBOOK</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#141210] mb-4">
            How to Set Up & Run BrewPluse Cafe POS (CafePOS)
          </h1>
          <p className="text-base sm:text-lg text-[#5a554f] max-w-2xl mx-auto leading-relaxed">
            From zero to taking your first table QR order and printing thermal bills in under 5 minutes with our complete <Link href="/cafe-pos" className="text-[#005c36] font-semibold underline hover:text-black">Cafe POS</Link> and <Link href="/restaurant-pos" className="text-[#005c36] font-semibold underline hover:text-black">Restaurant POS system</Link>.
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
        <div id="step-1" className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-black text-lg shrink-0 border border-emerald-200">
            01
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#141210]">Create Your Free Cafe POS Account</h2>
            <p className="text-xs sm:text-sm text-[#5a554f] leading-relaxed">
              Visit <Link href="/signup" className="text-[#005c36] font-bold underline">brewpluse.com/signup</Link>. Enter your coffee shop or cafe name, select your currency, and choose your store URL handle. You get instant access to the <Link href="/free-cafe-management-software" className="text-[#005c36] font-semibold underline">free cafe management software</Link> suite.
            </p>
          </div>
        </div>

        <div id="step-2" className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center font-black text-lg shrink-0 border border-amber-200">
            02
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#141210]">Build Your Interactive Digital Menu</h2>
            <p className="text-xs sm:text-sm text-[#5a554f] leading-relaxed">
              Add food categories (Espresso, Cold Brews, Bakery, Breakfast) and item options with modifiers. Configure real-time availability in your <Link href="/digital-menu" className="text-[#005c36] font-semibold underline">digital menu</Link> to eliminate 86'd order confusion.
            </p>
          </div>
        </div>

        <div id="step-3" className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center font-black text-lg shrink-0 border border-blue-200">
            03
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#141210]">Print Dynamic Table QR Codes</h2>
            <p className="text-xs sm:text-sm text-[#5a554f] leading-relaxed">
              Generate formatted table QR stickers directly from your dashboard. Print and place them on your tables for self-ordering via our contactless <Link href="/qr-ordering-system" className="text-[#005c36] font-semibold underline">QR ordering system</Link>, protected by GPS geofencing.
            </p>
          </div>
        </div>

        <div id="step-4" className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E5E0] shadow-xs flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-800 flex items-center justify-center font-black text-lg shrink-0 border border-purple-200">
            04
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-[#141210]">Connect Kitchen Display (KDS) & Printers</h2>
            <p className="text-xs sm:text-sm text-[#5a554f] leading-relaxed">
              Open our paperless <Link href="/kitchen-display-system" className="text-[#005c36] font-semibold underline">Kitchen Display System (KDS)</Link> on any tablet or iPad. Connect any 58mm/80mm thermal receipt printer via USB, LAN, or Bluetooth for instant KOT and customer billing.
            </p>
          </div>
        </div>
      </section>

      {/* Internal linking directory hub */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#E7E5E0]">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 mb-4 text-center">
          EXPLORE BREWPLUSE CAFE & RESTAURANT POS MODULES
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <Link href="/cafe-pos" className="p-3 rounded-xl bg-white border border-[#E7E5E0] text-center hover:border-emerald-600 transition-colors font-medium text-gray-800">
            ☕ Cafe POS (CafePOS)
          </Link>
          <Link href="/restaurant-pos" className="p-3 rounded-xl bg-white border border-[#E7E5E0] text-center hover:border-emerald-600 transition-colors font-medium text-gray-800">
            🍽️ Restaurant POS
          </Link>
          <Link href="/qr-ordering-system" className="p-3 rounded-xl bg-white border border-[#E7E5E0] text-center hover:border-emerald-600 transition-colors font-medium text-gray-800">
            📱 QR Table Ordering
          </Link>
          <Link href="/kitchen-display-system" className="p-3 rounded-xl bg-white border border-[#E7E5E0] text-center hover:border-emerald-600 transition-colors font-medium text-gray-800">
            🍳 Kitchen Display (KDS)
          </Link>
          <Link href="/digital-menu" className="p-3 rounded-xl bg-white border border-[#E7E5E0] text-center hover:border-emerald-600 transition-colors font-medium text-gray-800">
            📖 Digital QR Menu
          </Link>
          <Link href="/staff-ordering-system" className="p-3 rounded-xl bg-white border border-[#E7E5E0] text-center hover:border-emerald-600 transition-colors font-medium text-gray-800">
            🧑‍🍳 Staff Waiter Ordering
          </Link>
          <Link href="/free-cafe-management-software" className="p-3 rounded-xl bg-white border border-[#E7E5E0] text-center hover:border-emerald-600 transition-colors font-medium text-gray-800">
            🎁 Free Cafe Software
          </Link>
          <Link href="/pricing" className="p-3 rounded-xl bg-white border border-[#E7E5E0] text-center hover:border-emerald-600 transition-colors font-medium text-gray-800">
            💳 POS Pricing Plans
          </Link>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-[#EBE8E3] text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] mb-3">
            Ready to Setup Your Cafe in 5 Minutes?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mb-6">
            Join cafes and restaurants operating smoothly on BrewPluse CafePOS.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0b2b1a] hover:bg-black text-white text-sm font-bold shadow-md transition-all"
          >
            <span>Start Free Cafe Account</span>
            <span>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
