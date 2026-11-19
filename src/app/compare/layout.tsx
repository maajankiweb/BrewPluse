import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare BrewPluse vs Traditional Restaurant POS Systems',
  description:
    'Compare BrewPluse against traditional legacy POS vendors like Petpooja and Posist. Zero monthly subscriptions, modern QR ordering, and instant setup.',
  alternates: {
    canonical: 'https://brewpluse.com/compare',
  },
  openGraph: {
    title: 'Compare BrewPluse vs Traditional Restaurant POS Systems | BrewPluse',
    description:
      'Compare BrewPluse against traditional legacy POS vendors like Petpooja and Posist. Zero monthly subscriptions, modern QR ordering, and instant setup.',
    url: 'https://brewpluse.com/compare',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare BrewPluse vs Traditional Restaurant POS Systems | BrewPluse',
    description:
      'Compare BrewPluse against traditional legacy POS vendors like Petpooja and Posist. Zero monthly subscriptions, modern QR ordering, and instant setup.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
