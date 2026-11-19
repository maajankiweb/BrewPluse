import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Management Software | POS, KDS & Table Ordering',
  description:
    'Modern restaurant management software designed for speed and reliability. Coordinate front-of-house service, bar, and kitchen in real time.',
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-management-software',
  },
  openGraph: {
    title: 'Restaurant Management Software | POS, KDS & Table Ordering | BrewPluse',
    description:
      'Modern restaurant management software designed for speed and reliability. Coordinate front-of-house service, bar, and kitchen in real time.',
    url: 'https://brewpluse.com/restaurant-management-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Management Software | POS, KDS & Table Ordering | BrewPluse',
    description:
      'Modern restaurant management software designed for speed and reliability. Coordinate front-of-house service, bar, and kitchen in real time.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
