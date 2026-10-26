import React from 'react';
import { DemoProvider } from './demoContext';
import DemoSidebar from '@/components/demo/DemoSidebar';
import DemoHeader from '@/components/demo/DemoHeader';
import DemoMobileBar from '@/components/demo/DemoMobileBar';
import CommandPaletteModal from '@/components/demo/CommandPaletteModal';
import DemoNotificationToast from '@/components/demo/DemoNotificationToast';

export const metadata = {
  title: 'Interactive Live Cafe POS Demo',
  description: 'Interactive live demo of BrewPluse cafe POS, KDS, inventory, and management portal.',
  alternates: {
    canonical: 'https://brewpluse.com/demo',
  },
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DemoProvider>
      <div className="min-h-screen relative bg-[#faf9f8] dark:bg-[#070708] text-[#141210] dark:text-zinc-100 transition-colors duration-200">
        <DemoSidebar />
        <DemoHeader />
        
        <main className="lg:ml-[280px] pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 pb-24 lg:pb-12 w-full lg:w-[calc(100%-280px)] min-h-screen">
          {children}
        </main>

        <DemoMobileBar />
        <CommandPaletteModal />
        <DemoNotificationToast />
      </div>
    </DemoProvider>
  );
}
