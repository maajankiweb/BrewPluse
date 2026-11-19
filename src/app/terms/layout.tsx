import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | BrewPluse Cafe Technologies',
  description:
    'Read the Terms of Service for using the BrewPluse cloud POS platform, hardware products, merchant services, and customer ordering applications.',
  alternates: {
    canonical: 'https://brewpluse.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | BrewPluse Cafe Technologies | BrewPluse',
    description:
      'Read the Terms of Service for using the BrewPluse cloud POS platform, hardware products, merchant services, and customer ordering applications.',
    url: 'https://brewpluse.com/terms',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service | BrewPluse Cafe Technologies | BrewPluse',
    description:
      'Read the Terms of Service for using the BrewPluse cloud POS platform, hardware products, merchant services, and customer ordering applications.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
