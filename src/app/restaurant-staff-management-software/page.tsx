import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Restaurant Staff & Waiter Management Software | Role-Based Access & Shift Logs",
  description: "Manage cafe and restaurant waitstaff, cashiers, and kitchen team members. Granular PIN-based security, shift sales reconciliation, and digital waiter ordering.",
  keywords: [
    'restaurant staff management software',
    'cafe staff management',
    'waiter app restaurant',
    'waiter management pos',
    'cashier shift reconciliation pos',
    'role based permissions restaurant',
    'staff attendance cafe',
    'free restaurant staff software',
  ],
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-staff-management-software',
  },
  openGraph: {
    title: "Restaurant Staff & Waiter Management Software | BrewPluse",
    description: "Manage waitstaff, cashiers, and kitchen team members. Granular PIN-based security, shift sales reconciliation, and digital waiter ordering.",
    url: 'https://brewpluse.com/restaurant-staff-management-software',
    type: 'website',
  },
};

export default function RestaurantStaffManagementPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'BrewPluse Restaurant Staff & Waiter Management',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Android, iOS',
        description: 'Complete role-based access control, shift register reconciliation, and handheld table-taking app for hospitality teams.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        author: {
          '@type': 'Organization',
          name: 'BrewPluse',
          url: 'https://brewpluse.com',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can waitstaff take orders on their own personal Android or iOS phones?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. BrewPluse operates as a responsive web app and progressive web application (PWA). Staff members can sign in with their assigned 4-digit PIN on any mobile browser without installing proprietary hardware.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I prevent cashiers and waitstaff from deleting or modifying settled bills?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. BrewPluse features granular role-based permissions (RBAC). Only the Owner or Store Manager PIN can authorise bill cancellations, discount overrides, or voided KOT items.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does BrewPluse support end-of-day register drawer reconciliation?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. When closing a shift, the cashier enters the counted physical cash in the drawer. The system automatically computes expected vs actual cash, total UPI collections, card transactions, and discrepancies.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#FAF9F5] min-h-screen text-[#141210]">
        {/* Hero Section */}
        <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white to-[#FAF9F5] border-b border-[#EBE8E3]">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-xs font-semibold mb-6">
              <span className="material-symbols-outlined text-[16px]">badge</span>
              <span>Team &amp; Waiter Management</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#141210] mb-6 leading-tight">
              Empower Your Floor Staff.{' '}
              <span className="text-emerald-700">Protect Your Profits.</span>
            </h1>

            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
              Equip waitstaff with rapid mobile table ordering while locking down cashier permissions with PIN authorization. Run smoother service, reduce billing pilferage, and balance cash drawers with automated shift reconciliation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#0b2b1a] text-white font-semibold text-sm hover:bg-black transition-all shadow-sm"
              >
                Register Your Team — ₹0/Month
              </Link>
              <Link
                href="/demo"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white border border-[#E7E5E0] text-gray-800 font-semibold text-sm hover:bg-[#F5F4F0] transition-all"
              >
                Explore Live Demo ↗
              </Link>
            </div>
          </div>
        </section>

        {/* 3 Core Roles Architecture */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#141210] mb-4">
              Granular Role-Based Permissions (RBAC)
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Give every team member the exact tools they need to perform their duties without exposing sensitive business financials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[28px]">devices</span>
              </div>
              <h3 className="text-lg font-bold text-[#141210] mb-3">Waitstaff &amp; Captains</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                Mobile order taking at tables, KOT firing to bar/kitchen, table status monitoring, and guest check printing. Zero access to profit margins or sales reports.
              </p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                  <span>Any phone or tablet browser</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                  <span>Instant KOT modification notes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                  <span>4-digit staff quick-switch PIN</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[28px]">point_of_sale</span>
              </div>
              <h3 className="text-lg font-bold text-[#141210] mb-3">Cashiers &amp; Front Desk</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                Fast counter billing, split bills, UPI payment verification, and thermal receipt printing. Protected from modifying settled historic invoices.
              </p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                  <span>Shift open &amp; close drawer tally</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                  <span>Discount &amp; comp override protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                  <span>High-speed thermal ESC/POS printing</span>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-[#E7E5E0] shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-800 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-[28px]">skillet</span>
              </div>
              <h3 className="text-lg font-bold text-[#141210] mb-3">Kitchen &amp; Baristas</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6">
                Dedicated KDS screen showing live incoming orders sorted by prep time, order age color coding, and one-tap order ready customer SMS alerts.
              </p>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                  <span>Multi-station KDS routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                  <span>Real-time prep time tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-700 text-sm">check_circle</span>
                  <span>Paperless bump bar interface</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Shift Cash Reconciliation */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#EBE8E3]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-700 mb-2 block">
                AUDIT TRAIL &amp; FRAUD PREVENTION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] mb-4">
                Automated Cash Drawer Reconciliation
              </h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                Eliminate register shortages and unaccounted discounts. At the end of every morning or evening shift, cashiers input their physical cash counts into the system. BrewPluse immediately flags differences between system collections and actual cash.
              </p>
              <div className="space-y-3 text-xs sm:text-sm text-gray-700">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 mt-0.5">verified</span>
                  <span><strong>Owner Audit Log:</strong> Every bill edit, item cancellation, or discount override requires manager PIN and is permanently logged with timestamps.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 mt-0.5">verified</span>
                  <span><strong>Multi-Cashier Handoffs:</strong> Seamlessly pass register balances from morning shift to evening shift with zero billing interruptions.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-700 mt-0.5">verified</span>
                  <span><strong>Instant WhatsApp/Email Shift Report:</strong> Store owners receive total revenue, payment breakdown, and cashier variance reports upon shift close.</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#E7E5E0] shadow-sm font-mono text-xs text-gray-800 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                <span className="font-bold text-gray-900">Shift #104 Summary</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">SETTLED</span>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Cashier:</span>
                  <span className="font-bold text-gray-900">Rohan K. (PIN 4912)</span>
                </div>
                <div className="flex justify-between">
                  <span>Shift Window:</span>
                  <span>10:00 AM – 04:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Gross Sales:</span>
                  <span className="font-bold text-gray-900">₹18,450.00</span>
                </div>
                <div className="flex justify-between">
                  <span>UPI Collections (Dynamic QR):</span>
                  <span>₹12,800.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Card / POS Machine:</span>
                  <span>₹3,400.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Expected Physical Cash:</span>
                  <span>₹2,250.00</span>
                </div>
                <div className="flex justify-between font-bold text-emerald-700 pt-2 border-t border-gray-100">
                  <span>Cash Counted &amp; Verified:</span>
                  <span>₹2,250.00 (Variance: ₹0.00)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#EBE8E3]">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#141210] text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E0]">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Can waitstaff take orders on their own personal Android or iOS phones?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Yes. BrewPluse operates as a responsive web app and progressive web application (PWA). Staff members can sign in with their assigned 4-digit PIN on any mobile browser without installing proprietary hardware.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E0]">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Can I prevent cashiers and waitstaff from deleting or modifying settled bills?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Yes. BrewPluse features granular role-based permissions (RBAC). Only the Owner or Store Manager PIN can authorise bill cancellations, discount overrides, or voided KOT items.
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl border border-[#E7E5E0]">
              <h3 className="text-sm font-bold text-gray-900 mb-2">
                Does BrewPluse support end-of-day register drawer reconciliation?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Yes. When closing a shift, the cashier enters the counted physical cash in the drawer. The system automatically computes expected vs actual cash, total UPI collections, card transactions, and discrepancies.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0b2b1a] text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
              Equip Your Floor Staff Today
            </h2>
            <p className="text-emerald-200/90 text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Join forward-thinking restaurants and cafes that use BrewPluse to speed up service and streamline staff operations without expensive hardware.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-[#0b2b1a] font-bold text-sm hover:bg-emerald-50 transition-all shadow-sm"
              >
                Start Free with BrewPluse →
              </Link>
              <Link
                href="/staff-ordering-system"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-900/60 border border-emerald-700/60 text-white font-medium text-sm hover:bg-emerald-900 transition-all"
              >
                Learn About Waiter POS
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
