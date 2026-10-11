'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Lock,
  ChevronLeft,
  KeyRound,
  Save,
  ShieldCheck,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoPasswordSettingsPage() {
  const { notify } = useDemo();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [managerPin, setManagerPin] = useState('9999');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Store password and Master Manager PIN updated!');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 animate-fade-in">
      <Link
        href="/demo/settings"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-amber-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Settings</span>
      </Link>

      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
          <Lock className="w-6 h-6 text-amber-500" />
          <span>Password &amp; Master Manager PIN</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Manage executive credentials and 4-digit override PIN for bill voids and refunds.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 shadow-2xs space-y-6 text-xs">
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#141210] dark:text-white">
            Change Portal Login Password
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[#ebe8e3] dark:border-[#222225] space-y-4">
          <h2 className="text-sm font-bold text-[#141210] dark:text-white">
            Master Manager Authorization PIN
          </h2>
          <p className="text-zinc-500 text-[11px]">
            Required by cashiers to perform bill cancellations, cash till adjustments, and discounts above 20%.
          </p>

          <div className="max-w-xs">
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              4-Digit PIN Code
            </label>
            <input
              type="password"
              maxLength={4}
              value={managerPin}
              onChange={(e) => setManagerPin(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-center font-mono font-black text-sm tracking-widest text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-[#ebe8e3] dark:border-[#222225] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Update Credentials</span>
          </button>
        </div>
      </form>
    </div>
  );
}
