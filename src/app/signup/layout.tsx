import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Free Cafe POS Account',
  description:
    'Create your free BrewPluse account. Get started with cloud POS, QR ordering, KDS, inventory management, and instant billing for your cafe or restaurant.',
  alternates: {
    canonical: 'https://brewpluse.com/signup',
  },
  openGraph: {
    title: 'Create Free Cafe POS Account | BrewPluse',
    description:
      'Create your free BrewPluse account. Cloud POS, QR menu, and KDS with zero setup fees.',
    url: 'https://brewpluse.com/signup',
  },
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
