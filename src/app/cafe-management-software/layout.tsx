import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cafe Management Software | Cloud Operating System for Cafes',
  description:
    'Simplify cafe operations with BrewPluse cafe management software. Manage orders, baristas, recipes, tables, and customer loyalty from one seamless platform.',
  alternates: {
    canonical: 'https://brewpluse.com/cafe-management-software',
  },
  openGraph: {
    title: 'Cafe Management Software | Cloud Operating System for Cafes | BrewPluse',
    description:
      'Simplify cafe operations with BrewPluse cafe management software. Manage orders, baristas, recipes, tables, and customer loyalty from one seamless platform.',
    url: 'https://brewpluse.com/cafe-management-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cafe Management Software | Cloud Operating System for Cafes | BrewPluse',
    description:
      'Simplify cafe operations with BrewPluse cafe management software. Manage orders, baristas, recipes, tables, and customer loyalty from one seamless platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
