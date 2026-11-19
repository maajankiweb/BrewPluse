import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Billing Software | Fast Thermal Bills & Split Payments',
  description:
    'Lightning-fast restaurant billing software with ESC/POS thermal printing, custom discounts, split billing, GST calculation, and WhatsApp e-invoices.',
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-billing-software',
  },
  openGraph: {
    title: 'Restaurant Billing Software | Fast Thermal Bills & Split Payments | BrewPluse',
    description:
      'Lightning-fast restaurant billing software with ESC/POS thermal printing, custom discounts, split billing, GST calculation, and WhatsApp e-invoices.',
    url: 'https://brewpluse.com/restaurant-billing-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Billing Software | Fast Thermal Bills & Split Payments | BrewPluse',
    description:
      'Lightning-fast restaurant billing software with ESC/POS thermal printing, custom discounts, split billing, GST calculation, and WhatsApp e-invoices.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
