import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merchant & Staff Login',
  description: 'Log in to your BrewPluse cafe POS dashboard, live kitchen display, and table management console.',
  alternates: {
    canonical: 'https://brewpluse.com/login',
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
