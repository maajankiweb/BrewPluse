import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Download BrewPluse Android App | Cafe Ordering & Digital Menu',
  description:
    'Download the official BrewPluse Android app for fast ordering, live menu browsing, and exclusive offers. Available directly via APK and Google Play Store.',
  alternates: {
    canonical: 'https://brewpluse.com/download',
  },
  openGraph: {
    title: 'Download BrewPluse Android App | Cafe Ordering & Digital Menu | BrewPluse',
    description:
      'Download the official BrewPluse Android app for fast ordering, live menu browsing, and exclusive offers. Available directly via APK and Google Play Store.',
    url: 'https://brewpluse.com/download',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download BrewPluse Android App | Cafe Ordering & Digital Menu | BrewPluse',
    description:
      'Download the official BrewPluse Android app for fast ordering, live menu browsing, and exclusive offers. Available directly via APK and Google Play Store.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
