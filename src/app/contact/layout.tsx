import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact BrewPluse | 24/7 Cafe & Restaurant POS Support',
  description:
    'Get in touch with the BrewPluse team. Dedicated onboarding assistance, 24/7 technical support, and hardware inquiries via WhatsApp and email.',
  alternates: {
    canonical: 'https://brewpluse.com/contact',
  },
  openGraph: {
    title: 'Contact BrewPluse | 24/7 Cafe & Restaurant POS Support | BrewPluse',
    description:
      'Get in touch with the BrewPluse team. Dedicated onboarding assistance, 24/7 technical support, and hardware inquiries via WhatsApp and email.',
    url: 'https://brewpluse.com/contact',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact BrewPluse | 24/7 Cafe & Restaurant POS Support | BrewPluse',
    description:
      'Get in touch with the BrewPluse team. Dedicated onboarding assistance, 24/7 technical support, and hardware inquiries via WhatsApp and email.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
