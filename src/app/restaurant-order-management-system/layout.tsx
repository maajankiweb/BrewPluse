import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Order Management System | Unified Dine-in & Takeaway',
  description:
    'Manage dine-in, takeaway, and online orders on one central screen. Track preparation status, reduce order errors, and streamline fulfillment seamlessly.',
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-order-management-system',
  },
  openGraph: {
    title: 'Restaurant Order Management System | Unified Dine-in & Takeaway | BrewPluse',
    description:
      'Manage dine-in, takeaway, and online orders on one central screen. Track preparation status, reduce order errors, and streamline fulfillment seamlessly.',
    url: 'https://brewpluse.com/restaurant-order-management-system',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Order Management System | Unified Dine-in & Takeaway | BrewPluse',
    description:
      'Manage dine-in, takeaway, and online orders on one central screen. Track preparation status, reduce order errors, and streamline fulfillment seamlessly.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
