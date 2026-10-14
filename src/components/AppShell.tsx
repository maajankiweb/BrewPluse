'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';

import { ToastProvider } from '@/components/Toast';
import ScrollToTop, { ScrollProgressBar } from '@/components/ScrollToTop';
import PrivacyChoices from '@/components/PrivacyChoices';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  React.useEffect(() => {
    function onUnhandledRejection(e: PromiseRejectionEvent) {
      const err = e.reason;
      const msg = err?.message || String(err || '');
      const name = err?.name;
      if (
        name === 'AbortError' ||
        msg.includes('signal is aborted without reason') ||
        msg.includes('The user aborted a request') ||
        msg.includes('aborted without reason')
      ) {
        e.preventDefault();
        e.stopImmediatePropagation?.();
      }
    }
    window.addEventListener('unhandledrejection', onUnhandledRejection);
    return () => window.removeEventListener('unhandledrejection', onUnhandledRejection);
  }, []);

  const isStandalone =
    pathname?.startsWith('/demo') ||
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/setup') ||
    pathname?.startsWith('/login') ||
    pathname?.startsWith('/signup') ||
    pathname?.startsWith('/forgot-password') ||
    pathname?.startsWith('/m/');

  return (
    <ToastProvider>
      {isStandalone ? (
        <main className="w-full min-h-screen">{children}</main>
      ) : (
        <>
          <ScrollProgressBar />
          <Preloader />
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ScrollToTop />
          <PrivacyChoices />
        </>
      )}
    </ToastProvider>
  );
}
