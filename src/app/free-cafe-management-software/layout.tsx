import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Cafe Management Software | ₹0/Month POS & Table Ordering',
  description:
    'All-in-one free cafe management software for modern coffee shops. Handle billing, QR ordering, KDS, inventory, and customer loyalty with zero monthly subscriptions.',
  alternates: {
    canonical: 'https://brewpluse.com/free-cafe-management-software',
  },
  openGraph: {
    title: 'Free Cafe Management Software | ₹0/Month POS & Table Ordering | BrewPluse',
    description:
      'All-in-one free cafe management software for modern coffee shops. Handle billing, QR ordering, KDS, inventory, and customer loyalty with zero monthly subscriptions.',
    url: 'https://brewpluse.com/free-cafe-management-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cafe Management Software | ₹0/Month POS & Table Ordering | BrewPluse',
    description:
      'All-in-one free cafe management software for modern coffee shops. Handle billing, QR ordering, KDS, inventory, and customer loyalty with zero monthly subscriptions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
