import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Staff Ordering System | Waiter POS & Mobile Table Ordering',
  description:
    'Empower your waitstaff with mobile table ordering on any phone or tablet. Take orders tableside, add special notes, and punch tickets directly to kitchen.',
  alternates: {
    canonical: 'https://brewpluse.com/staff-ordering-system',
  },
  openGraph: {
    title: 'Staff Ordering System | Waiter POS & Mobile Table Ordering | BrewPluse',
    description:
      'Empower your waitstaff with mobile table ordering on any phone or tablet. Take orders tableside, add special notes, and punch tickets directly to kitchen.',
    url: 'https://brewpluse.com/staff-ordering-system',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Staff Ordering System | Waiter POS & Mobile Table Ordering | BrewPluse',
    description:
      'Empower your waitstaff with mobile table ordering on any phone or tablet. Take orders tableside, add special notes, and punch tickets directly to kitchen.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
