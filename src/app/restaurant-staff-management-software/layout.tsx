import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Restaurant Staff Management Software | Role-Based Access & Shifts',
  description:
    'Manage restaurant staff permissions, cashier roles, waiter logins, and shift accountability. Complete audit trails and role-based security controls.',
  alternates: {
    canonical: 'https://brewpluse.com/restaurant-staff-management-software',
  },
  openGraph: {
    title: 'Restaurant Staff Management Software | Role-Based Access & Shifts | BrewPluse',
    description:
      'Manage restaurant staff permissions, cashier roles, waiter logins, and shift accountability. Complete audit trails and role-based security controls.',
    url: 'https://brewpluse.com/restaurant-staff-management-software',
    siteName: 'BrewPluse',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Restaurant Staff Management Software | Role-Based Access & Shifts | BrewPluse',
    description:
      'Manage restaurant staff permissions, cashier roles, waiter logins, and shift accountability. Complete audit trails and role-based security controls.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
