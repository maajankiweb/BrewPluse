'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ShieldCheck, ArrowLeft, RefreshCw } from 'lucide-react';

export default function StatusPage() {
  const [activeNav, setActiveNav] = useState<'status' | 'maintenance' | 'incidents'>('status');

  const days = Array.from({ length: 60 });

  return (
    <div className="min-h-screen bg-[#F8FAF9] text-[#12201B] font-sans antialiased">
      {/* Top Navbar */}
      <header className="border-b border-[#E7ECE9] bg-white sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-black text-lg tracking-tight text-[#12201B] flex items-center gap-2 hover:opacity-80 transition"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0B5C45] to-[#10B981] flex items-center justify-center text-white text-sm font-black shadow-xs">
                BP
              </div>
              <span>BrewPluse Status</span>
            </Link>
          </div>

          <div className="flex items-center gap-6 text-xs font-semibold text-[#65736D]">
            <button
              onClick={() => setActiveNav('status')}
              className={`hover:text-[#12201B] transition pb-1 border-b-2 ${
                activeNav === 'status' ? 'border-[#0B5C45] text-[#12201B]' : 'border-transparent'
              }`}
            >
              Status
            </button>
            <button
              onClick={() => setActiveNav('maintenance')}
              className={`hover:text-[#12201B] transition pb-1 border-b-2 ${
                activeNav === 'maintenance' ? 'border-[#0B5C45] text-[#12201B]' : 'border-transparent'
              }`}
            >
              Maintenance
            </button>
            <button
              onClick={() => setActiveNav('incidents')}
              className={`hover:text-[#12201B] transition pb-1 border-b-2 ${
                activeNav === 'incidents' ? 'border-[#0B5C45] text-[#12201B]' : 'border-transparent'
              }`}
            >
              Previous incidents
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        {/* Giant Status Banner */}
        <div className="rounded-2xl bg-[#0B5C45] text-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <CheckCircle2 className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">All services are online</h1>
              <p className="text-xs text-emerald-200 mt-1 font-medium">
                Last updated on Oct 10, 2026 at 3:07pm GMT+5:30
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto bg-white/10 px-3 py-1.5 rounded-full border border-white/15 text-xs font-bold text-emerald-200">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Operational</span>
          </div>
        </div>

        {/* Current status by service */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#65736D]">
              Current status by service
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-[#65736D] font-medium">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Checked every 60s</span>
            </div>
          </div>

          {/* Service 1: Software / App */}
          <div className="bg-white rounded-2xl border border-[#E7ECE9] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#12201B]">app.brewpluse.fun (Software)</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">99.965% uptime (last 90 days)</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Operational
              </span>
            </div>

            {/* 60-day visualizer bar */}
            <div>
              <div className="flex items-center gap-[3px] h-8 py-1">
                {days.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full rounded-[2px] bg-emerald-500 hover:bg-emerald-600 transition cursor-pointer"
                    title={`Day ${i + 1}: 100% Uptime • No Incidents`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#8D9792] font-semibold mt-1">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>

          {/* Service 2: Website */}
          <div className="bg-white rounded-2xl border border-[#E7ECE9] p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-[#12201B]">brewpluse.fun (website)</h3>
                <p className="text-xs text-emerald-600 font-semibold mt-0.5">99.986% uptime (last 90 days)</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Operational
              </span>
            </div>

            {/* 60-day visualizer bar */}
            <div>
              <div className="flex items-center gap-[3px] h-8 py-1">
                {days.map((_, i) => (
                  <div
                    key={i}
                    className="flex-1 h-full rounded-[2px] bg-emerald-500 hover:bg-emerald-600 transition cursor-pointer"
                    title={`Day ${i + 1}: 100% Uptime • No Incidents`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between text-[11px] text-[#8D9792] font-semibold mt-1">
                <span>90 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Reliability Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white rounded-2xl border border-[#E7ECE9] p-4 text-center">
            <p className="text-xs text-[#65736D] font-semibold">Average Response Time</p>
            <p className="text-xl font-black text-[#12201B] mt-1 font-mono">142 ms</p>
            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Global edge routed</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E7ECE9] p-4 text-center">
            <p className="text-xs text-[#65736D] font-semibold">Database Latency</p>
            <p className="text-xl font-black text-[#12201B] mt-1 font-mono">18 ms</p>
            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Multi-region read replica</p>
          </div>
          <div className="bg-white rounded-2xl border border-[#E7ECE9] p-4 text-center">
            <p className="text-xs text-[#65736D] font-semibold">Payment Webhook Success</p>
            <p className="text-xl font-black text-[#12201B] mt-1 font-mono">100.0%</p>
            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Razorpay &amp; UPI verified</p>
          </div>
        </div>

        {/* Back Link and Footer */}
        <div className="pt-6 border-t border-[#E7ECE9] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#65736D]">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 font-bold text-[#0B5C45] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </Link>
          <p className="text-[11px]">
            Powered by <span className="font-bold text-[#12201B]">BrewPluse Monitor</span> • Status Engine v2.0
          </p>
        </div>
      </main>
    </div>
  );
}
