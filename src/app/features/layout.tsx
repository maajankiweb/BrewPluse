import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Complete Feature Suite | Free Cafe & Restaurant POS Operating System',
  description:
    'Explore BrewPluse features: fast counter billing, barista KDS, contactless QR ordering, recipe inventory tracking, table management, and real-time cafe analytics.',
  alternates: {
    canonical: 'https://brewpluse.com/features',
  },
  openGraph: {
    title: 'Complete Feature Suite | Free Cafe & Restaurant POS Operating System | BrewPluse',
    description:
      'Explore BrewPluse features: fast counter billing, barista KDS, contactless QR ordering, recipe inventory tracking, table management, and real-time cafe analytics.',
    url: 'https://brewpluse.com/features',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Complete Feature Suite | Free Cafe & Restaurant POS Operating System | BrewPluse',
    description:
      'Explore BrewPluse features: fast counter billing, barista KDS, contactless QR ordering, recipe inventory tracking, table management, and real-time cafe analytics.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
