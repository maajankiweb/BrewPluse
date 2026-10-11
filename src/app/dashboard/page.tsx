'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import DashboardHomeView from '@/components/dashboard/DashboardHomeView';

export default function DashboardRootPage() {
  const router = useRouter();
  const [storeSlug, setStoreSlug] = useState<string | null>(null);

  useEffect(() => {
    let resolvedSlug = 'my-cafe';
    try {
      const savedSlug = localStorage.getItem('brewpluse::store_slug');
      if (savedSlug && savedSlug.trim()) {
        resolvedSlug = savedSlug.trim();
      } else {
        const storeProfile = localStorage.getItem('brewpluse::store_profile');
        if (storeProfile) {
          const parsed = JSON.parse(storeProfile);
          if (parsed.slug) {
            resolvedSlug = parsed.slug;
          } else if (parsed.name) {
            resolvedSlug = parsed.name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/^-|-$/g, '');
          }
        } else {
          const activeUser = localStorage.getItem('brewpluse::active_user');
          if (activeUser) {
            const parsed = JSON.parse(activeUser);
            if (parsed.storeName) {
              resolvedSlug = parsed.storeName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '');
            }
          }
        }
      }
    } catch (e) {}

    setStoreSlug(resolvedSlug);
    router.replace(`/dashboard/${resolvedSlug}`);
  }, [router]);

  return (
    <DashboardShell storeSlug={storeSlug || 'my-cafe'}>
      <DashboardHomeView storeSlug={storeSlug || 'my-cafe'} />
    </DashboardShell>
  );
}
