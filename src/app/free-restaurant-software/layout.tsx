import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Restaurant Software | Billing, Orders, KDS & Inventory',
  description:
    'Complete free restaurant management software. Digitize your dine-in, takeaway, and delivery operations with unified POS, KDS screens, and QR ordering.',
  alternates: {
    canonical: 'https://brewpluse.com/free-restaurant-software',
  },
  openGraph: {
    title: 'Free Restaurant Software | Billing, Orders, KDS & Inventory | BrewPluse',
    description:
      'Complete free restaurant management software. Digitize your dine-in, takeaway, and delivery operations with unified POS, KDS screens, and QR ordering.',
    url: 'https://brewpluse.com/free-restaurant-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Restaurant Software | Billing, Orders, KDS & Inventory | BrewPluse',
    description:
      'Complete free restaurant management software. Digitize your dine-in, takeaway, and delivery operations with unified POS, KDS screens, and QR ordering.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
