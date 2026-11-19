import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation & Setup Guide | BrewPluse Knowledge Base',
  description:
    'Comprehensive documentation and step-by-step guides for setting up BrewPluse POS, thermal printers, KDS screens, QR table stands, and inventory.',
  alternates: {
    canonical: 'https://brewpluse.com/documentation',
  },
  openGraph: {
    title: 'Documentation & Setup Guide | BrewPluse Knowledge Base | BrewPluse',
    description:
      'Comprehensive documentation and step-by-step guides for setting up BrewPluse POS, thermal printers, KDS screens, QR table stands, and inventory.',
    url: 'https://brewpluse.com/documentation',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Documentation & Setup Guide | BrewPluse Knowledge Base | BrewPluse',
    description:
      'Comprehensive documentation and step-by-step guides for setting up BrewPluse POS, thermal printers, KDS screens, QR table stands, and inventory.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
