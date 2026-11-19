import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to Use BrewPluse | Quick-Start Cafe Operations Guide',
  description:
    'Step-by-step guide to setting up your cafe with BrewPluse in under 5 minutes. Learn how to add menu items, generate table QRs, and start counter billing.',
  alternates: {
    canonical: 'https://brewpluse.com/how-to-use',
  },
  openGraph: {
    title: 'How to Use BrewPluse | Quick-Start Cafe Operations Guide | BrewPluse',
    description:
      'Step-by-step guide to setting up your cafe with BrewPluse in under 5 minutes. Learn how to add menu items, generate table QRs, and start counter billing.',
    url: 'https://brewpluse.com/how-to-use',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Use BrewPluse | Quick-Start Cafe Operations Guide | BrewPluse',
    description:
      'Step-by-step guide to setting up your cafe with BrewPluse in under 5 minutes. Learn how to add menu items, generate table QRs, and start counter billing.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
