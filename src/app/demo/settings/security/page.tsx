'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ChevronLeft,
  Smartphone,
  Laptop,
  Tv,
  LogOut,
  Save,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoSecuritySettingsPage() {
  const { notify } = useDemo();
  const [twoFactor, setTwoFactor] = useState(false);
  const [sessions, setSessions] = useState([
    { id: 's1', device: 'Main Billing iPad Pro (12.9")', location: 'Bengaluru, India', ip: '192.168.1.10', current: true, icon: Smartphone },
    { id: 's2', device: 'Kitchen Station Sony Android TV', location: 'Bengaluru, India', ip: '192.168.1.45', current: false, icon: Tv },
    { id: 's3', device: 'Store Owner MacBook Air (Safari)', location: 'Bengaluru, India', ip: '49.207.210.88', current: false, icon: Laptop },
  ]);

  const handleTerminateOthers = () => {
    setSessions((prev) => prev.filter((s) => s.current));
    notify('Terminated all remote tablet & laptop sessions.');
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
          <ShieldCheck className="w-6 h-6 text-amber-500" />
          <span>Security &amp; Device Access</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Two-factor authentication, active POS hardware sessions, and remote device termination.
        </p>
      </div>

      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 shadow-2xs space-y-6 text-xs">
        {/* 2FA Toggle */}
        <div className="flex items-center justify-between pb-4 border-b border-[#ebe8e3] dark:border-[#222225]">
          <div>
            <h3 className="font-bold text-sm text-[#141210] dark:text-white">
              Two-Factor Authentication (2FA)
            </h3>
            <p className="text-zinc-500 text-[11px] mt-0.5">
              Require an OTP on the owner&apos;s mobile number when signing in from an unrecognized browser or device.
            </p>
          </div>
          <input
            type="checkbox"
            checked={twoFactor}
            onChange={(e) => {
              setTwoFactor(e.target.checked);
              notify(`Two-factor authentication ${e.target.checked ? 'activated' : 'deactivated'}`);
            }}
            className="w-4 h-4 text-emerald-600 rounded"
          />
        </div>

        {/* Active Sessions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#141210] dark:text-white">
              Active Hardware Sessions ({sessions.length})
            </h3>
            {sessions.length > 1 && (
              <button
                type="button"
                onClick={handleTerminateOthers}
                className="text-rose-600 hover:text-rose-700 font-bold text-[11px] flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out other devices</span>
              </button>
            )}
          </div>

          <div className="divide-y divide-[#ebe8e3]/60 dark:divide-[#222225]">
            {sessions.map((ses) => {
              const Icon = ses.icon;
              return (
                <div key={ses.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-[#141210] dark:text-white flex items-center gap-2">
                        <span>{ses.device}</span>
                        {ses.current && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
                            This Device
                          </span>
                        )}
                      </p>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        {ses.location} &bull; IP: {ses.ip}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
