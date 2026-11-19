import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Workspace Setup | BrewPluse',
  description: 'Setup your cafe profile, verify account, and configure POS printers.',
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: 'https://brewpluse.com/setup',
  },
};

export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
