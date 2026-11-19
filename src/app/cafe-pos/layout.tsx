import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Cafe POS Software | Modern Point of Sale for Coffee Shops',
  description:
    'Cloud-based Cafe POS built specifically for coffee shops and bakeries. Contactless QR table ordering, barista KDS display, fast counter billing, and inventory.',
  alternates: {
    canonical: 'https://brewpluse.com/cafe-pos',
  },
  openGraph: {
    title: 'Free Cafe POS Software | Modern Point of Sale for Coffee Shops | BrewPluse',
    description:
      'Cloud-based Cafe POS built specifically for coffee shops and bakeries. Contactless QR table ordering, barista KDS display, fast counter billing, and inventory.',
    url: 'https://brewpluse.com/cafe-pos',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Cafe POS Software | Modern Point of Sale for Coffee Shops | BrewPluse',
    description:
      'Cloud-based Cafe POS built specifically for coffee shops and bakeries. Contactless QR table ordering, barista KDS display, fast counter billing, and inventory.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
