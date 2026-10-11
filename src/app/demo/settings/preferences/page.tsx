'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sliders,
  ChevronLeft,
  Volume2,
  Moon,
  Sun,
  Save,
  Printer,
  Sparkles,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoPreferencesSettingsPage() {
  const { isDark, toggleTheme, notify } = useDemo();
  const [kitchenSound, setKitchenSound] = useState(true);
  const [posBeep, setPosBeep] = useState(true);
  const [autoPrintKot, setAutoPrintKot] = useState(true);
  const [currencySymbol, setCurrencySymbol] = useState('₹ (INR)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('App system preferences updated!');
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
          <Sliders className="w-6 h-6 text-amber-500" />
          <span>Application &amp; Sound Preferences</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Customize audio chimes, interface theme, and operational automation defaults.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 shadow-2xs space-y-6 text-xs">
        {/* Audio Alerts */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-[#141210] dark:text-white flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-emerald-500" />
            <span>Audio &amp; Notification Chimes</span>
          </h2>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#ebe8e3] dark:border-[#222225]">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">Kitchen Display Order Chime</p>
              <p className="text-zinc-500 text-[11px]">Plays audio ding when a new table order arrives at KDS.</p>
            </div>
            <input
              type="checkbox"
              checked={kitchenSound}
              onChange={(e) => setKitchenSound(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#ebe8e3] dark:border-[#222225]">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">POS Item Tap Haptic Sound</p>
              <p className="text-zinc-500 text-[11px]">Audio feedback when cashier taps products on POS tablet.</p>
            </div>
            <input
              type="checkbox"
              checked={posBeep}
              onChange={(e) => setPosBeep(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>
        </div>

        {/* Automation Defaults */}
        <div className="space-y-4 pt-4 border-t border-[#ebe8e3] dark:border-[#222225]">
          <h2 className="text-sm font-bold text-[#141210] dark:text-white flex items-center gap-2">
            <Printer className="w-4 h-4 text-blue-500" />
            <span>Hardware Automation</span>
          </h2>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#ebe8e3] dark:border-[#222225]">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">Auto-Print Kitchen KOT on Order Placement</p>
              <p className="text-zinc-500 text-[11px]">Sends ticket directly to kitchen thermal printer without cashier prompt.</p>
            </div>
            <input
              type="checkbox"
              checked={autoPrintKot}
              onChange={(e) => setAutoPrintKot(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>
        </div>

        {/* Appearance & Currency */}
        <div className="space-y-4 pt-4 border-t border-[#ebe8e3] dark:border-[#222225]">
          <h2 className="text-sm font-bold text-[#141210] dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Theme &amp; Locale</span>
          </h2>

          <div className="flex items-center justify-between p-3.5 rounded-xl border border-[#ebe8e3] dark:border-[#222225]">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">Visual Mode (Dark / Light)</p>
              <p className="text-zinc-500 text-[11px]">Currently active: {isDark ? 'Dark Mode' : 'Light Mode'}</p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-800 font-bold text-[11px] flex items-center gap-1.5"
            >
              {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-zinc-600" />}
              <span>Toggle Mode</span>
            </button>
          </div>
        </div>

        <div className="pt-3 border-t border-[#ebe8e3] dark:border-[#222225] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
}
