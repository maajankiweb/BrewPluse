import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | BrewPluse Data Protection & Security',
  description:
    'Learn how BrewPluse protects your business and customer data with industry-standard encryption, strict access controls, and transparent privacy practices.',
  alternates: {
    canonical: 'https://brewpluse.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | BrewPluse Data Protection & Security | BrewPluse',
    description:
      'Learn how BrewPluse protects your business and customer data with industry-standard encryption, strict access controls, and transparent privacy practices.',
    url: 'https://brewpluse.com/privacy',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy | BrewPluse Data Protection & Security | BrewPluse',
    description:
      'Learn how BrewPluse protects your business and customer data with industry-standard encryption, strict access controls, and transparent privacy practices.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
