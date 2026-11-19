import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | BrewPluse Hardware & Services',
  description:
    'Clear refund, return, and cancellation policies for BrewPluse NFC cards, acrylic QR table standees, and merchant subscription services.',
  alternates: {
    canonical: 'https://brewpluse.com/refund',
  },
  openGraph: {
    title: 'Refund & Cancellation Policy | BrewPluse Hardware & Services | BrewPluse',
    description:
      'Clear refund, return, and cancellation policies for BrewPluse NFC cards, acrylic QR table standees, and merchant subscription services.',
    url: 'https://brewpluse.com/refund',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Refund & Cancellation Policy | BrewPluse Hardware & Services | BrewPluse',
    description:
      'Clear refund, return, and cancellation policies for BrewPluse NFC cards, acrylic QR table standees, and merchant subscription services.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
