import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Workspace Setup | BrewPluse',
  description: 'Setup your cafe profile, verify account, and configure POS printers.',
};

export default function SetupLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
