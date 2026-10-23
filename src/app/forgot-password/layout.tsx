import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password | BrewPluse',
  description: 'Reset your BrewPluse cafe POS account password.',
  alternates: {
    canonical: 'https://brewpluse.com/forgot-password',
  },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
