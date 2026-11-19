import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kitchen Display System (KDS) | Real-Time Kitchen & Bar Screen',
  description:
    'Replace messy paper tickets with BrewPluse digital Kitchen Display System. Live color-coded ticket timers, audio alerts, and station routing for baristas & chefs.',
  alternates: {
    canonical: 'https://brewpluse.com/kitchen-display-system',
  },
  openGraph: {
    title: 'Kitchen Display System (KDS) | Real-Time Kitchen & Bar Screen | BrewPluse',
    description:
      'Replace messy paper tickets with BrewPluse digital Kitchen Display System. Live color-coded ticket timers, audio alerts, and station routing for baristas & chefs.',
    url: 'https://brewpluse.com/kitchen-display-system',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kitchen Display System (KDS) | Real-Time Kitchen & Bar Screen | BrewPluse',
    description:
      'Replace messy paper tickets with BrewPluse digital Kitchen Display System. Live color-coded ticket timers, audio alerts, and station routing for baristas & chefs.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
