import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transparent ₹0/Month Pricing | Free Cafe POS & Restaurant Software',
  description:
    'BrewPluse is 100% free with ₹0/month SaaS fees. Unlimited orders, billing counters, KDS screens, and QR table ordering. See our completely honest pricing model.',
  alternates: {
    canonical: 'https://brewpluse.com/pricing',
  },
  openGraph: {
    title: 'Transparent ₹0/Month Pricing | Free Cafe POS & Restaurant Software | BrewPluse',
    description:
      'BrewPluse is 100% free with ₹0/month SaaS fees. Unlimited orders, billing counters, KDS screens, and QR table ordering. See our completely honest pricing model.',
    url: 'https://brewpluse.com/pricing',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transparent ₹0/Month Pricing | Free Cafe POS & Restaurant Software | BrewPluse',
    description:
      'BrewPluse is 100% free with ₹0/month SaaS fees. Unlimited orders, billing counters, KDS screens, and QR table ordering. See our completely honest pricing model.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
