'use client';

import React, { useState } from 'react';

export function FloatWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full aspect-square max-w-[500px] lg:max-w-[620px] flex items-center justify-center animate-float-soft">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-gradient-to-tr from-[#875200]/20 via-emerald-500/15 to-[#c6842e]/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export function BrewPluseIsometricShowcase() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 16, y: -y * 16 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[480px] aspect-square flex items-center justify-center transition-transform duration-300 ease-out cursor-default select-none group"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      {/* Ambient background glow halo */}
      <div className="absolute inset-4 rounded-3xl bg-amber-500/10 blur-2xl group-hover:bg-amber-500/15 transition-all duration-500 pointer-events-none" />

      {/* 3D Isometric Cafe Building Image Frame */}
      <div className="relative w-full h-full rounded-[32px] overflow-hidden border border-white/10 shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(245,158,11,0.15)] bg-[#080706]">
        {/* Currently using 3D Image; uncomment the video line below after converting this image to video */}
        <img
          src="/logos/brewpluse-auth-building.jpg"
          alt="BrewPluse 3D Artisan Cafe"
          className="w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* <video src="/logos/brewpluse-auth-building.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover object-center select-none pointer-events-none" /> */}

        {/* Soft edge vignette to blend seamlessly into the dark card */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0807]/90 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[32px] pointer-events-none" />

        {/* Floating live status chip */}
        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-black/75 backdrop-blur-md border border-white/10 shadow-xl pointer-events-none">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono font-bold text-white tracking-wide">
              Brew<span className="text-emerald-400">Pluse</span> Live POS Network
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
            ₹0/mo Forever
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AuthVideoShowcase() {
  return (
    <div className="hidden lg:flex lg:col-span-6 bg-[#0a0807] p-8 sm:p-12 text-[#1e1b14] flex-col justify-center relative overflow-hidden items-center select-none">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a1310] via-[#050505] to-[#000000]" />
      
      {/* Ambient glowing atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen">
        <div className="absolute top-1/4 -right-24 h-80 w-80 rounded-full bg-[#875200]/15 blur-3xl" />
        <div className="absolute bottom-1/4 -left-24 h-80 w-80 rounded-full bg-[#c6842e]/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]" />
      </div>

      {/* Floating 3D BrewPluse Isometric Cafe Showcase */}
      <div className="relative z-10 w-full max-w-[500px] flex items-center justify-center my-auto scale-105">
        <FloatWrapper>
          <BrewPluseIsometricShowcase />
        </FloatWrapper>
      </div>
    </div>
  );
}
