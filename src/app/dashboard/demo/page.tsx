import React from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardHomeView from '@/components/dashboard/DashboardHomeView';

export default function DashboardDemoPage() {
  return (
    <DashboardShell storeSlug="demo">
      <DashboardHomeView storeSlug="demo" isDemo={true} />
    </DashboardShell>
  );
}
