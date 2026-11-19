import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | BrewPluse Free Cafe Operating System',
  description:
    'Find answers to common questions about BrewPluse pricing, hardware compatibility, offline mode, QR ordering, UPI payments, and data privacy.',
  alternates: {
    canonical: 'https://brewpluse.com/faq',
  },
  openGraph: {
    title: 'Frequently Asked Questions | BrewPluse Free Cafe Operating System | BrewPluse',
    description:
      'Find answers to common questions about BrewPluse pricing, hardware compatibility, offline mode, QR ordering, UPI payments, and data privacy.',
    url: 'https://brewpluse.com/faq',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | BrewPluse Free Cafe Operating System | BrewPluse',
    description:
      'Find answers to common questions about BrewPluse pricing, hardware compatibility, offline mode, QR ordering, UPI payments, and data privacy.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
