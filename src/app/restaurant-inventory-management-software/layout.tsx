import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Inventory Management Software | Recipe Stock Tracking',
  description:
    'Track cafe ingredients and recipe consumption automatically upon billing. Low-stock alerts, waste reduction, and real-time food cost control.',
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-inventory-management-software',
  },
  openGraph: {
    title: 'Restaurant Inventory Management Software | Recipe Stock Tracking | BrewPluse',
    description:
      'Track cafe ingredients and recipe consumption automatically upon billing. Low-stock alerts, waste reduction, and real-time food cost control.',
    url: 'https://brewpluse.com/restaurant-inventory-management-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Inventory Management Software | Recipe Stock Tracking | BrewPluse',
    description:
      'Track cafe ingredients and recipe consumption automatically upon billing. Low-stock alerts, waste reduction, and real-time food cost control.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
