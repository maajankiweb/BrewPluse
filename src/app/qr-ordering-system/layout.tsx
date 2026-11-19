import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Ordering System for Restaurants & Cafes | Contactless Menu',
  description:
    'Enable contactless QR code ordering at every table. Customers browse digital menus, customize items, and place orders directly to the kitchen display.',
  alternates: {
    canonical: 'https://brewpluse.com/qr-ordering-system',
  },
  openGraph: {
    title: 'QR Ordering System for Restaurants & Cafes | Contactless Menu | BrewPluse',
    description:
      'Enable contactless QR code ordering at every table. Customers browse digital menus, customize items, and place orders directly to the kitchen display.',
    url: 'https://brewpluse.com/qr-ordering-system',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Ordering System for Restaurants & Cafes | Contactless Menu | BrewPluse',
    description:
      'Enable contactless QR code ordering at every table. Customers browse digital menus, customize items, and place orders directly to the kitchen display.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
