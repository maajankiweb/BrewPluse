import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Restaurant POS Software India | Zero Monthly Software Fees',
  description:
    'Powerful free restaurant POS with thermal printer support, multi-table management, live KDS, and WhatsApp bill sharing. No credit card or monthly fee required.',
  alternates: {
    canonical: 'https://brewpluse.com/free-restaurant-pos',
  },
  openGraph: {
    title: 'Free Restaurant POS Software India | Zero Monthly Software Fees | BrewPluse',
    description:
      'Powerful free restaurant POS with thermal printer support, multi-table management, live KDS, and WhatsApp bill sharing. No credit card or monthly fee required.',
    url: 'https://brewpluse.com/free-restaurant-pos',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Restaurant POS Software India | Zero Monthly Software Fees | BrewPluse',
    description:
      'Powerful free restaurant POS with thermal printer support, multi-table management, live KDS, and WhatsApp bill sharing. No credit card or monthly fee required.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
