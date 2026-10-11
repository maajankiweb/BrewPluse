'use client';

import React, { useState } from 'react';
import {
  Tv,
  Maximize2,
  Minimize2,
  Coffee,
  Sparkles,
} from 'lucide-react';
import { useDemo } from '../demoContext';

export default function DemoTvMenuPage() {
  const { menuItems } = useDemo();
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const coffees = menuItems.filter((i) => i.category === 'Coffee');
  const coldBrews = menuItems.filter((i) => i.category === 'Cold Brew' || i.category === 'Beverages');
  const bakery = menuItems.filter((i) => i.category === 'Bakery' || i.category === 'Desserts');
  const snacks = menuItems.filter((i) => i.category === 'Snacks');

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Top TV Controls Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <Tv className="w-6 h-6 text-purple-500" />
            <span>Digital TV Menu Board</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Plug any smart TV, Firestick, or Android tablet into this display URL for live menu rotation.
          </p>
        </div>

        <button
          onClick={toggleFullscreen}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold shadow-md hover:opacity-90 transition-all cursor-pointer"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          <span>{isFullscreen ? 'Exit Fullscreen' : 'Launch TV Fullscreen'}</span>
        </button>
      </div>

      {/* The Digital TV Board Canvas */}
      <div className="bg-[#0b100d] text-[#f4efe8] rounded-[28px] p-6 sm:p-10 border border-emerald-950/80 shadow-2xl overflow-hidden relative">
        {/* Subtle glow header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-white/10 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-800 text-white flex items-center justify-center shadow-lg">
              <Coffee className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                BrewPluse Artisanal Roasters
                <Sparkles className="w-5 h-5 text-amber-400" />
              </h2>
              <p className="text-xs text-emerald-400 font-mono tracking-widest uppercase">
                Single Origin &bull; Fresh Daily Bakes &bull; 100% Arabica
              </p>
            </div>
          </div>

          <div className="text-right font-mono text-xs text-zinc-400 hidden sm:block">
            <p className="text-white font-bold text-sm">Today&apos;s Reserve Brew</p>
            <p className="text-amber-400">Ethiopian Yirgacheffe G1</p>
          </div>
        </div>

        {/* 4 Menu Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          {/* Col 1: Hot Espresso */}
          <div className="space-y-4">
            <div className="border-b border-amber-500/40 pb-2">
              <h3 className="text-sm font-black uppercase tracking-widest text-amber-400 font-mono">
                01. Hot Espresso
              </h3>
            </div>
            <div className="space-y-4">
              {coffees.map((item) => (
                <div key={item.id} className="space-y-0.5 group">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </span>
                    <span className="font-mono font-black text-amber-400 text-sm">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Cold Brews & Beverages */}
          <div className="space-y-4">
            <div className="border-b border-amber-500/40 pb-2">
              <h3 className="text-sm font-black uppercase tracking-widest text-amber-400 font-mono">
                02. Cold Brews
              </h3>
            </div>
            <div className="space-y-4">
              {coldBrews.map((item) => (
                <div key={item.id} className="space-y-0.5 group">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </span>
                    <span className="font-mono font-black text-amber-400 text-sm">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Artisanal Bakery */}
          <div className="space-y-4">
            <div className="border-b border-amber-500/40 pb-2">
              <h3 className="text-sm font-black uppercase tracking-widest text-amber-400 font-mono">
                03. Bakes &amp; Treats
              </h3>
            </div>
            <div className="space-y-4">
              {bakery.map((item) => (
                <div key={item.id} className="space-y-0.5 group">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </span>
                    <span className="font-mono font-black text-amber-400 text-sm">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Gourmet Paninis & Snacks */}
          <div className="space-y-4">
            <div className="border-b border-amber-500/40 pb-2">
              <h3 className="text-sm font-black uppercase tracking-widest text-amber-400 font-mono">
                04. Savory Bites
              </h3>
            </div>
            <div className="space-y-4">
              {snacks.map((item) => (
                <div key={item.id} className="space-y-0.5 group">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-white group-hover:text-amber-400 transition-colors">
                      {item.name}
                    </span>
                    <span className="font-mono font-black text-amber-400 text-sm">
                      ₹{item.price}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 line-clamp-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ticker Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Scan QR on any table to order directly from your smartphone</span>
          </div>
          <span className="hidden sm:inline">BrewPluse Digital Screen Engine v2.4</span>
        </div>
      </div>
    </div>
  );
}
