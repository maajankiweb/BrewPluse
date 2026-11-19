import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cafe Loyalty Program Software | Rewards, Points & Retention',
  description:
    'Boost cafe repeat visits with automated loyalty points, customer reward tiers, and targeted WhatsApp coupon campaigns tailored for food lovers.',
  alternates: {
    canonical: 'https://brewpluse.com/cafe-loyalty-program-software',
  },
  openGraph: {
    title: 'Cafe Loyalty Program Software | Rewards, Points & Retention | BrewPluse',
    description:
      'Boost cafe repeat visits with automated loyalty points, customer reward tiers, and targeted WhatsApp coupon campaigns tailored for food lovers.',
    url: 'https://brewpluse.com/cafe-loyalty-program-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cafe Loyalty Program Software | Rewards, Points & Retention | BrewPluse',
    description:
      'Boost cafe repeat visits with automated loyalty points, customer reward tiers, and targeted WhatsApp coupon campaigns tailored for food lovers.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
