import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Free POS Software in India for Cafes & Restaurants',
  description:
    'India\'s premier free POS software with instant UPI QR payments, GST-compliant thermal receipts, QR table ordering, and real-time cloud analytics.',
  alternates: {
    canonical: 'https://brewpluse.com/best-free-pos-software-india',
  },
  openGraph: {
    title: 'Best Free POS Software in India for Cafes & Restaurants | BrewPluse',
    description:
      'India\'s premier free POS software with instant UPI QR payments, GST-compliant thermal receipts, QR table ordering, and real-time cloud analytics.',
    url: 'https://brewpluse.com/best-free-pos-software-india',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Free POS Software in India for Cafes & Restaurants | BrewPluse',
    description:
      'India\'s premier free POS software with instant UPI QR payments, GST-compliant thermal receipts, QR table ordering, and real-time cloud analytics.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
