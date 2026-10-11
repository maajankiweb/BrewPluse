import React from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardHomeView from '@/components/dashboard/DashboardHomeView';

interface PageProps {
  params: Promise<{ storeSlug: string }>;
}

export default async function StoreDashboardPage({ params }: PageProps) {
  const { storeSlug } = await params;
  return (
    <DashboardShell storeSlug={storeSlug || 'brewpluse'}>
      <DashboardHomeView storeSlug={storeSlug || 'brewpluse'} />
    </DashboardShell>
  );
}
