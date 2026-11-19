import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | BrewPluse POS Hardware',
  description:
    'Shipping timelines, delivery coverage, and tracking details for BrewPluse acrylic QR stands and NFC smart review cards delivered across India.',
  alternates: {
    canonical: 'https://brewpluse.com/shipping',
  },
  openGraph: {
    title: 'Shipping & Delivery Policy | BrewPluse POS Hardware | BrewPluse',
    description:
      'Shipping timelines, delivery coverage, and tracking details for BrewPluse acrylic QR stands and NFC smart review cards delivered across India.',
    url: 'https://brewpluse.com/shipping',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shipping & Delivery Policy | BrewPluse POS Hardware | BrewPluse',
    description:
      'Shipping timelines, delivery coverage, and tracking details for BrewPluse acrylic QR stands and NFC smart review cards delivered across India.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
