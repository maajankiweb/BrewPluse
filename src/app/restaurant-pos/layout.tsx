import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Restaurant POS Software | Cloud Billing & Kitchen System',
  description:
    'Streamline your restaurant with BrewPluse free cloud POS. Table management, fast thermal billing, live kitchen display (KDS), and contactless QR ordering.',
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-pos',
  },
  openGraph: {
    title: 'Free Restaurant POS Software | Cloud Billing & Kitchen System | BrewPluse',
    description:
      'Streamline your restaurant with BrewPluse free cloud POS. Table management, fast thermal billing, live kitchen display (KDS), and contactless QR ordering.',
    url: 'https://brewpluse.com/restaurant-pos',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Restaurant POS Software | Cloud Billing & Kitchen System | BrewPluse',
    description:
      'Streamline your restaurant with BrewPluse free cloud POS. Table management, fast thermal billing, live kitchen display (KDS), and contactless QR ordering.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
