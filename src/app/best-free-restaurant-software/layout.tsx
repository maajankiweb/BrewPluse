import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Free Restaurant Software | Cloud POS, KDS & QR Menu',
  description:
    'Discover why Indian restaurants switch to BrewPluse: unified POS billing, real-time kitchen display system, dynamic QR ordering, and zero software fees.',
  alternates: {
    canonical: 'https://brewpluse.com/best-free-restaurant-software',
  },
  openGraph: {
    title: 'Best Free Restaurant Software | Cloud POS, KDS & QR Menu | BrewPluse',
    description:
      'Discover why Indian restaurants switch to BrewPluse: unified POS billing, real-time kitchen display system, dynamic QR ordering, and zero software fees.',
    url: 'https://brewpluse.com/best-free-restaurant-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Free Restaurant Software | Cloud POS, KDS & QR Menu | BrewPluse',
    description:
      'Discover why Indian restaurants switch to BrewPluse: unified POS billing, real-time kitchen display system, dynamic QR ordering, and zero software fees.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
