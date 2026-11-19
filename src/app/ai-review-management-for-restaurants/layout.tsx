import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Review Management for Restaurants | Google Reviews & Feedback',
  description:
    'Turn happy diners into 5-star Google reviews with BrewPluse smart NFC cards and QR feedback redirects. Protect your reputation and boost local SEO.',
  alternates: {
    canonical: 'https://brewpluse.com/ai-review-management-for-restaurants',
  },
  openGraph: {
    title: 'AI Review Management for Restaurants | Google Reviews & Feedback | BrewPluse',
    description:
      'Turn happy diners into 5-star Google reviews with BrewPluse smart NFC cards and QR feedback redirects. Protect your reputation and boost local SEO.',
    url: 'https://brewpluse.com/ai-review-management-for-restaurants',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Review Management for Restaurants | Google Reviews & Feedback | BrewPluse',
    description:
      'Turn happy diners into 5-star Google reviews with BrewPluse smart NFC cards and QR feedback redirects. Protect your reputation and boost local SEO.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
