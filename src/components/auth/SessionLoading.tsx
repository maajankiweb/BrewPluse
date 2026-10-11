'use client';

import React, { useEffect, useState } from 'react';
import { FloatWrapper, BrewPluseIsometricShowcase } from './AuthVideoShowcase';

export default function SessionLoading({
  label = 'Setting up your cafe space...',
}: {
  label?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (animId) cancelAnimationFrame(animId);
      animId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        setCoords({
          x: ((e.clientX / innerWidth) - 0.5) * 30,
          y: ((e.clientY / innerHeight) - 0.5) * 30,
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animId) cancelAnimationFrame(animId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-white overflow-hidden animate-fade-in selection:bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1310] via-[#050505] to-[#000000]" />
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 py-8 flex flex-col lg:flex-row items-center justify-center lg:justify-between h-full">
        {/* Left BrewPluse Showcase */}
        <div
          className="flex-1 flex items-center justify-center w-full transition-transform duration-[1500ms] ease-out mb-8 lg:mb-0"
          style={{
            transform: `translate3d(${coords.x}px, ${coords.y}px, 0)`,
          }}
        >
          <FloatWrapper>
            <BrewPluseIsometricShowcase />
          </FloatWrapper>
        </div>

        {/* Right Status Panel */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full max-w-sm lg:max-w-md lg:pl-16 opacity-0 animate-[fade-in_1s_ease-out_0.5s_forwards]">
          <div className="mb-8 lg:mb-12 flex items-center gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-white">
              Brew<span className="text-emerald-400">Pluse</span>
            </span>
          </div>

          <div className="space-y-3 mb-10 w-full">
            <h4 className="text-xs lg:text-sm font-black uppercase tracking-[0.2em] text-neutral-300">
              {label}
            </h4>
            <div className="w-full max-w-[200px] lg:max-w-none mx-auto lg:mx-0 h-[2px] bg-white/10 overflow-hidden relative">
              <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#eebd8e] to-transparent animate-shimmer-sweep rounded-full" />
            </div>
          </div>

          <div className="space-y-6 w-full flex flex-col items-center lg:items-start">
            <div className="flex items-start gap-4">
              <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-[#eebd8e] shadow-[0_0_8px_rgba(238,189,142,0.8)]" />
              <div className="text-left">
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Lights are on
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  Getting things ready
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-60">
              <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-white/20" />
              <div className="text-left">
                <p className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Setting up systems
                </p>
                <p className="text-[11px] text-neutral-500 mt-0.5">
                  Almost there
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 opacity-30">
              <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-white/10" />
              <div className="text-left">
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  You're in
                </p>
                <p className="text-[11px] text-neutral-600 mt-0.5">
                  Just a moment more
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
