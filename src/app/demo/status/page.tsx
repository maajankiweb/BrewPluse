'use client';

import React from 'react';
import {
  Activity,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Server,
  Wifi,
  Smartphone,
  CreditCard,
} from 'lucide-react';

export default function DemoStatusPage() {
  const services = [
    { name: 'BrewPluse POS Cloud API', status: 'Operational', uptime: '99.99%', latency: '24ms', icon: Server },
    { name: 'Kitchen Display WebSockets (KDS Engine)', status: 'Operational', uptime: '99.98%', latency: '18ms', icon: Wifi },
    { name: 'UPI Dynamic QR Payment Gateway', status: 'Operational', uptime: '99.95%', latency: '42ms', icon: CreditCard },
    { name: 'Table QR Ordering Web App (Edge Cache)', status: 'Operational', uptime: '100.0%', latency: '12ms', icon: Smartphone },
    { name: 'WhatsApp & SMS Merchant Alert Router', status: 'Operational', uptime: '99.92%', latency: '65ms', icon: Activity },
    { name: 'Continuous Cloud DB Sync & Backups', status: 'Operational', uptime: '100.0%', latency: '21ms', icon: ShieldCheck },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
              <Activity className="w-6 h-6 text-emerald-500" />
              <span>Live System Status &amp; Uptime</span>
            </h1>
            <p className="text-xs text-[#686259] dark:text-zinc-400">
              Real-time operational latency across global cloud clusters and payment routes.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-bold font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Systems Operational (99.98%)</span>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#141210] dark:text-white">
          Current Service Health
        </h2>

        <div className="divide-y divide-[#ebe8e3]/60 dark:divide-[#222225]">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.name}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#141210] dark:text-white">{svc.name}</h3>
                    <p className="text-[10px] text-zinc-400 font-mono">
                      Latency: {svc.latency} &bull; Uptime: {svc.uptime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 font-bold text-[10px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{svc.status}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 90 Days Uptime Visual Bars */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#141210] dark:text-white">
            Historical Uptime (Past 90 Days)
          </span>
          <span className="text-emerald-600 font-bold font-mono">99.98% Available</span>
        </div>

        {/* 60 green tick bars */}
        <div className="flex gap-1 h-8 items-end overflow-hidden pt-2">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 transition-colors rounded-xs h-full"
              title={`Day ${50 - i} ago: 100% uptime`}
            />
          ))}
        </div>

        <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
          <span>90 days ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
