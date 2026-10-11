'use client';

import React, { useEffect, useState } from 'react';

export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 25 : 100));
    }, 100);

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setMounted(false), 500);
    }, 600);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Top emerald progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-transparent z-50 pointer-events-none">
        <div
          className="h-full bg-emerald-600 transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Preloader splash */}
      <div
        className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FBFBFA] transition-all duration-500 ease-out ${
          visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative flex flex-col items-center gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 animate-ping opacity-50" />
            <div className="absolute inset-0 rounded-2xl border-2 border-emerald-600/30 border-t-emerald-600 animate-spin" />
            <div className="w-9 h-9 rounded-xl bg-[#0b2b1a] text-white flex items-center justify-center relative z-10 drop-shadow-xs">
              <span className="material-symbols-outlined text-[20px] text-emerald-400">local_cafe</span>
            </div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-sm font-extrabold tracking-tight text-[#141210] flex items-center justify-center gap-1">
              <span>Brew</span>
              <span className="text-emerald-700">Pluse</span>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8a857f] animate-pulse">
              AI-Driven Operations
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
