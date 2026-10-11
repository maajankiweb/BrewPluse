'use client';

import React from 'react';
import { useDemo } from '@/app/demo/demoContext';
import { CheckCircle2 } from 'lucide-react';

export default function DemoNotificationToast() {
  const { notification } = useDemo();

  if (!notification) return null;

  return (
    <div className="fixed bottom-20 lg:bottom-6 right-6 z-50 animate-bounce">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#0b2b1a] text-white shadow-xl border border-emerald-500/30 text-xs font-semibold">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{notification}</span>
      </div>
    </div>
  );
}
