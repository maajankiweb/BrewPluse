import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Digital Menu for Cafes & Restaurants | Interactive QR Menu',
  description:
    'Create a beautiful, responsive digital QR menu in seconds. Real-time item availability toggles, rich photography, dietary tags, and 1-tap ordering.',
  alternates: {
    canonical: 'https://brewpluse.com/digital-menu',
  },
  openGraph: {
    title: 'Digital Menu for Cafes & Restaurants | Interactive QR Menu | BrewPluse',
    description:
      'Create a beautiful, responsive digital QR menu in seconds. Real-time item availability toggles, rich photography, dietary tags, and 1-tap ordering.',
    url: 'https://brewpluse.com/digital-menu',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Menu for Cafes & Restaurants | Interactive QR Menu | BrewPluse',
    description:
      'Create a beautiful, responsive digital QR menu in seconds. Real-time item availability toggles, rich photography, dietary tags, and 1-tap ordering.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
