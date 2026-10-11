'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Star,
  ChevronLeft,
  Save,
  CheckCircle2,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoGoogleReviewsSettingsPage() {
  const { notify } = useDemo();
  const [googleUrl, setGoogleUrl] = useState('https://g.page/r/CbReW_PluseBrewCafe/review');
  const [autoPrompt, setAutoPrompt] = useState(true);
  const [smartFilter, setSmartFilter] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Google Reviews booster configured successfully!');
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
          <Star className="w-6 h-6 text-amber-500" />
          <span>Automated Google Reviews Booster</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Turn delighted dine-in customers into verified 5-star Google Maps reviews automatically.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 shadow-2xs space-y-6 text-xs">
        <div>
          <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
            Google Maps Business Review Direct URL
          </label>
          <div className="flex gap-2">
            <input
              type="url"
              required
              value={googleUrl}
              onChange={(e) => setGoogleUrl(e.target.value)}
              className="flex-1 bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono focus:outline-none focus:border-amber-500"
            />
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300"
              title="Test Google Link"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-[11px] text-zinc-400 mt-1">
            Obtain this link from your Google Business Profile &gt; &quot;Ask for reviews&quot;.
          </p>
        </div>

        <div className="space-y-4 pt-2 border-t border-[#ebe8e3] dark:border-[#222225]">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">
                Show Review Prompt on QR Bill Screen
              </p>
              <p className="text-zinc-500 text-[11px]">
                Displays after a guest completes UPI payment on their mobile screen.
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoPrompt}
              onChange={(e) => setAutoPrompt(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-[#141210] dark:text-white">
                Smart Sentiment Shield (5-Star Protection)
              </p>
              <p className="text-zinc-500 text-[11px]">
                Guests rating 5 stars are sent directly to Google Maps; guests with lower ratings get a private feedback box sent to store manager.
              </p>
            </div>
            <input
              type="checkbox"
              checked={smartFilter}
              onChange={(e) => setSmartFilter(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-[#ebe8e3] dark:border-[#222225] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Booster Config</span>
          </button>
        </div>
      </form>
    </div>
  );
}
