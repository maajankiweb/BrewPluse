'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { MonitorPlay, Printer, Maximize, Coffee } from 'lucide-react';

export default function TvMenuShowcasePage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [density, setDensity] = useState<'4' | '6' | '8'>('6');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
      setCurrentDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }).toUpperCase()
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleLaunchTv = () => {
    const el = document.getElementById('tv-display-container');
    if (el) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.requestFullscreen().catch(() => {});
      }
    }
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-6 max-w-[1500px] mx-auto pb-12 font-sans select-none animate-in fade-in duration-300">
        {/* Top Control Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 print:hidden">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 text-amber-500">
                <MonitorPlay className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-2xl font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-2">
                  <span>Live Menu Showcase</span>
                  <span className="flex items-center gap-1.5 text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Live Display
                  </span>
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs font-medium mt-0.5">
                  Full-featured digital restaurant display board with automatic multi-page rotation, prominent photos, and live promo deals.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <div className="flex items-center gap-1 bg-white dark:bg-[#0E2018] border border-neutral-200 dark:border-[#1E382E] p-1 rounded-2xl text-xs">
              <span className="text-[11px] font-bold text-neutral-500 px-2 hidden sm:inline">
                Density:
              </span>
              <button
                onClick={() => setDensity('4')}
                className={`px-2.5 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  density === '4'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'
                }`}
              >
                4 / page
              </button>
              <button
                onClick={() => setDensity('6')}
                className={`px-2.5 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  density === '6'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'
                }`}
              >
                6 / page
              </button>
              <button
                onClick={() => setDensity('8')}
                className={`px-2.5 py-1.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
                  density === '8'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5'
                }`}
              >
                8 / page
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="h-10 px-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-[#0E2018] hover:bg-neutral-50 dark:hover:bg-[#142E25] text-neutral-800 dark:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4 text-zinc-500" />
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={handleLaunchTv}
              className="h-10 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-xs font-extrabold shadow-md shadow-amber-500/20 cursor-pointer inline-flex items-center gap-1.5"
            >
              <Maximize className="w-4 h-4" />
              <span>Launch TV Screen</span>
            </button>
          </div>
        </div>

        {/* Display Canvas Card */}
        <div
          id="tv-display-container"
          className="relative bg-white dark:bg-[#0B1A14] transition-all duration-300 flex flex-col justify-between rounded-[36px] border border-neutral-200 dark:border-[#1E382E] p-5 sm:p-8 lg:p-10 shadow-xl shadow-black/[0.02]"
        >
          {/* Header of TV screen */}
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-200 dark:border-white/10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
                  <Coffee className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-500 block">
                    Menu Catalog
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight">
                    BrewPluse
                  </h2>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl sm:text-2xl font-black font-mono text-neutral-900 dark:text-white tracking-tight leading-none">
                  {currentTime || '09:49:49 AM'}
                </p>
                <p className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 mt-1 uppercase tracking-wider">
                  {currentDate || 'SAT, OCT 10'}
                </p>
              </div>
            </div>
          </div>

          {/* Empty Showcase Body */}
          <div className="py-20 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 flex items-center justify-center text-neutral-400 mx-auto">
              <Coffee className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              No items in menu showcase
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
              Active items added to your menu will automatically appear here with photos and descriptions.
            </p>
          </div>

          {/* Footer of TV screen */}
          <div className="pt-6 border-t border-neutral-200 dark:border-white/10 flex items-center justify-between text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="font-bold">PAGE 1 OF 1</span>
              <span>•</span>
              <span>0 Total Items</span>
            </div>
            <p className="text-[11px] font-medium">
              Powered by <span className="font-bold text-neutral-900 dark:text-white">BrewPluse Digital Menu</span>
            </p>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
