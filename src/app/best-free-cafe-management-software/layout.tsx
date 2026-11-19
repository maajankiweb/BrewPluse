import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Best Free Cafe Management Software 2026 | BrewPluse POS',
  description:
    'Rated the best free cafe management software. Complete coffee shop operating system with QR table menus, barista KDS, inventory tracking, and rapid billing.',
  alternates: {
    canonical: 'https://brewpluse.com/best-free-cafe-management-software',
  },
  openGraph: {
    title: 'Best Free Cafe Management Software 2026 | BrewPluse POS | BrewPluse',
    description:
      'Rated the best free cafe management software. Complete coffee shop operating system with QR table menus, barista KDS, inventory tracking, and rapid billing.',
    url: 'https://brewpluse.com/best-free-cafe-management-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best Free Cafe Management Software 2026 | BrewPluse POS | BrewPluse',
    description:
      'Rated the best free cafe management software. Complete coffee shop operating system with QR table menus, barista KDS, inventory tracking, and rapid billing.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
