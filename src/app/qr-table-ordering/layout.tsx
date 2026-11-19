import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'QR Table Ordering System | Instant Customer Ordering & Payments',
  description:
    'Cut table turnaround time by 30% with self-ordering QR codes. Real-time menu updates, instant order dispatch to KDS, and integrated UPI payments.',
  alternates: {
    canonical: 'https://brewpluse.com/qr-table-ordering',
  },
  openGraph: {
    title: 'QR Table Ordering System | Instant Customer Ordering & Payments | BrewPluse',
    description:
      'Cut table turnaround time by 30% with self-ordering QR codes. Real-time menu updates, instant order dispatch to KDS, and integrated UPI payments.',
    url: 'https://brewpluse.com/qr-table-ordering',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'QR Table Ordering System | Instant Customer Ordering & Payments | BrewPluse',
    description:
      'Cut table turnaround time by 30% with self-ordering QR codes. Real-time menu updates, instant order dispatch to KDS, and integrated UPI payments.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
