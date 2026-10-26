import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'System Health & Service Status',
  description: 'Real-time API uptime, database latency & sync cluster metrics for BrewPluse Cloud POS, QR table ordering, and KDS infrastructure.',
  alternates: {
    canonical: 'https://brewpluse.com/status',
  },
  openGraph: {
    title: 'System Health & Service Status | BrewPluse',
    description: 'Check real-time uptime, regional latency, and operational telemetry for BrewPluse.',
    url: 'https://brewpluse.com/status',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
};

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
