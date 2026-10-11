'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  UserCheck,
  Radar,
  Clock,
  Smartphone,
  MapPin,
  Crosshair,
  Compass,
  Radio,
  Navigation,
  Lock,
  PenLine,
  Info,
  Timer,
  Shield,
  ShieldAlert,
  KeyRound,
  ChevronRight,
} from 'lucide-react';
import { useToast } from '@/components/Toast';



export default function SecuritySettingsPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [requireIdentity, setRequireIdentity] = useState(false);
  const [enableGeofence, setEnableGeofence] = useState(false);
  const [radius, setRadius] = useState(500);
  const [lat, setLat] = useState('12.9716');
  const [lng, setLng] = useState('77.5946');
  const [sessionLimit, setSessionLimit] = useState('4 Hours');
  const [idlePurge, setIdlePurge] = useState('2 Hours');
  const toast = useToast();

  const basePath = `/dashboard/${storeSlug}`;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Security policies updated successfully!');
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <form onSubmit={handleSave} className="max-w-[1200px] mx-auto space-y-6 pb-24 font-sans">
        {/* Top Header */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-4">
            <Link
              href={`${basePath}/settings`}
              className="group inline-flex items-center gap-2 h-9 px-3.5 rounded-xl bg-white dark:bg-[#101F19] hover:bg-[#F8FAF8] dark:hover:bg-[#162A22] text-[#12201B] dark:text-[#F2FAF6] border border-[#E7ECE9] dark:border-[#1E342B] text-xs font-semibold shadow-xs transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#65736D] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Settings</span>
            </Link>

            <button
              type="submit"
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#12201B] dark:text-[#F2FAF6] tracking-tight">
                Customer &amp; Store Security
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700">
                <span className="w-2 h-2 rounded-full animate-pulse bg-neutral-400" />
                <span>Basic Protection (20%)</span>
              </div>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] font-normal leading-relaxed">
              Configure ordering boundaries, customer identity verification, and table session lifecycle rules.
            </p>
          </div>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4.5 rounded-2xl bg-white dark:bg-[#101F19] border border-[#E7ECE9] dark:border-[#1E342B] shadow-[0_4px_20px_rgba(20,50,40,0.02)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase tracking-wider">
                Patron Identity
              </span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-base font-bold text-[#12201B] dark:text-[#F2FAF6]">
                Guest Fast-Checkout
              </div>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                Customers can order anonymously
              </p>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-[#101F19] border border-[#E7ECE9] dark:border-[#1E342B] shadow-[0_4px_20px_rgba(20,50,40,0.02)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase tracking-wider">
                Geofence Radar
              </span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                <Radar className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-base font-bold text-[#12201B] dark:text-[#F2FAF6]">
                {enableGeofence ? `Enforced (${radius}m)` : 'Disabled (Open Anywhere)'}
              </div>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                {enableGeofence ? 'Strict GPS perimeter active' : 'No geographic perimeter enforcement'}
              </p>
            </div>
          </div>

          <div className="p-4.5 rounded-2xl bg-white dark:bg-[#101F19] border border-[#E7ECE9] dark:border-[#1E342B] shadow-[0_4px_20px_rgba(20,50,40,0.02)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#65736D] dark:text-[#9AB2A8] uppercase tracking-wider">
                Session Expiry
              </span>
              <div className="w-7 h-7 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-base font-bold text-[#12201B] dark:text-[#F2FAF6]">
                {sessionLimit} / {idlePurge} Inactive
              </div>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                Stale table tabs are automatically reclaimed
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Customer Identity card */}
            <div className="rounded-[22px] bg-white dark:bg-[#101F19] border border-[#E7ECE9] dark:border-[#1E342B] p-6 shadow-[0_4px_20px_rgba(20,50,40,0.03)] space-y-5">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E7ECE9] dark:border-[#1E342B]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#12201B] dark:text-[#F2FAF6]">
                      Customer Identity &amp; Verification
                    </h2>
                    <p className="text-xs text-[#65736D] dark:text-[#9AB2A8]">
                      Require contact credentials before order dispatch
                    </p>
                  </div>
                </div>

                {/* Switch toggle */}
                <button
                  type="button"
                  onClick={() => setRequireIdentity((prev) => !prev)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    requireIdentity ? 'bg-emerald-600' : 'bg-neutral-200 dark:bg-neutral-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      requireIdentity ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-neutral-50/70 dark:bg-[#0A1410] border border-neutral-200/80 dark:border-[#1A2E24] flex items-start gap-3">
                  <Smartphone className="w-4 h-4 text-[#0B5C45] dark:text-[#10B981] mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-[#12201B] dark:text-[#F2FAF6]">
                      Mandatory Name &amp; Mobile Phone Number
                    </p>
                    <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] leading-relaxed">
                      When enabled, patrons cannot place an order until they input a valid name and mobile
                      number. This eliminates prank orders, ensures payment traceability, and enables
                      real-time order status notifications.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Location Geofence card */}
            <div className="rounded-[22px] bg-white dark:bg-[#101F19] border border-[#E7ECE9] dark:border-[#1E342B] p-6 shadow-[0_4px_20px_rgba(20,50,40,0.03)] space-y-5">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#E7ECE9] dark:border-[#1E342B]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-[#12201B] dark:text-[#F2FAF6]">
                      Customer Location Geofence
                    </h2>
                    <p className="text-xs text-[#65736D] dark:text-[#9AB2A8]">
                      Require physical proximity to place dine-in orders
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setEnableGeofence((prev) => !prev)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                    enableGeofence ? 'bg-emerald-600' : 'bg-neutral-200 dark:bg-neutral-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      enableGeofence ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-bold text-[#12201B] dark:text-[#F2FAF6]">
                    Allowed Ordering Radius
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0B5C45] dark:text-[#10B981] bg-emerald-500/10 px-2.5 py-0.5 rounded-full">
                    {radius} meters ({radius}m)
                  </span>
                </div>

                {/* Radius pills */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { val: 50, label: '50m', sub: 'Dine-In Tables Only' },
                    { val: 100, label: '100m', sub: 'Indoor & Patio' },
                    { val: 250, label: '250m', sub: 'Premises & Parking' },
                    { val: 500, label: '500m', sub: 'Standard Perimeter' },
                    { val: 1000, label: '1,000m', sub: 'Campus / Foodcourt' },
                  ].map((r) => (
                    <button
                      key={r.val}
                      type="button"
                      onClick={() => setRadius(r.val)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        radius === r.val
                          ? 'bg-[#E8F6EF] dark:bg-[#132A20] border-[#10B981] text-[#0B5C45] dark:text-[#10B981] ring-1 ring-[#10B981]'
                          : 'bg-white dark:bg-[#0D1914] border-[#E7ECE9] dark:border-[#1E342B] text-[#65736D] dark:text-[#9AB2A8]'
                      }`}
                    >
                      <span className="text-xs font-bold block">{r.label}</span>
                      <span className="text-[10px] opacity-80 line-clamp-1 mt-0.5">{r.sub}</span>
                    </button>
                  ))}
                </div>

                {/* Slider */}
                <input
                  type="range"
                  min="20"
                  max="2000"
                  step="10"
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="w-full h-2 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#0B5C45] dark:accent-[#10B981]"
                />

                {/* GPS Coordinates Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div>
                    <span className="text-[10px] font-semibold text-[#65736D] dark:text-[#9AB2A8] uppercase">
                      Latitude
                    </span>
                    <input
                      type="number"
                      step="any"
                      value={lat}
                      onChange={(e) => setLat(e.target.value)}
                      className="w-full rounded-xl px-3 h-10 text-xs font-mono bg-neutral-50/70 dark:bg-[#0A1410] border border-neutral-200 dark:border-[#1E342B] outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-[#65736D] dark:text-[#9AB2A8] uppercase">
                      Longitude
                    </span>
                    <input
                      type="number"
                      step="any"
                      value={lng}
                      onChange={(e) => setLng(e.target.value)}
                      className="w-full rounded-xl px-3 h-10 text-xs font-mono bg-neutral-50/70 dark:bg-[#0A1410] border border-neutral-200 dark:border-[#1E342B] outline-none"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-[#65736D] dark:text-[#9AB2A8] uppercase">
                      Radius (meters)
                    </span>
                    <input
                      type="number"
                      value={radius}
                      onChange={(e) => setRadius(Number(e.target.value))}
                      className="w-full rounded-xl px-3 h-10 text-xs font-mono bg-neutral-50/70 dark:bg-[#0A1410] border border-neutral-200 dark:border-[#1E342B] outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-xl bg-neutral-50 dark:bg-[#0A1410] border border-neutral-200 dark:border-[#1A2E24] text-xs text-[#65736D] dark:text-[#9AB2A8]">
                  <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Patrons attempting to scan QR or order outside this {radius}m perimeter will receive
                    a gentle prompt requesting them to verify their presence at the cafe.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Table Session Lifecycle */}
            <div className="rounded-[22px] bg-white dark:bg-[#101F19] border border-[#E7ECE9] dark:border-[#1E342B] p-6 shadow-[0_4px_20px_rgba(20,50,40,0.03)] space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#E7ECE9] dark:border-[#1E342B]">
                <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex items-center justify-center shrink-0">
                  <Timer className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#12201B] dark:text-[#F2FAF6]">
                    Table Session Lifecycle
                  </h3>
                  <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                    Prevent ghost tabs and table hijacking
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#12201B] dark:text-[#F2FAF6]">
                    Active Session Limit
                  </label>
                  <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                    {sessionLimit}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {['1 Hour', '2 Hours', '4 Hours', '8 Hours', '24 Hours'].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setSessionLimit(dur)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                        sessionLimit === dur
                          ? 'bg-[#E8F6EF] dark:bg-[#132A20] border-[#10B981] text-[#0B5C45] dark:text-[#10B981]'
                          : 'bg-neutral-50/70 dark:bg-[#0A1410] border-neutral-200 dark:border-[#1E342B] text-[#65736D] dark:text-[#9AB2A8]'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-[#1E342B]">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#12201B] dark:text-[#F2FAF6]">
                    Idle Cart Auto-Purge
                  </label>
                  <span className="text-xs font-mono font-bold text-teal-600 dark:text-teal-400">
                    {idlePurge}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  {['30 Mins', '1 Hour', '2 Hours', '4 Hours'].map((dur) => (
                    <button
                      key={dur}
                      type="button"
                      onClick={() => setIdlePurge(dur)}
                      className={`py-2 px-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                        idlePurge === dur
                          ? 'bg-[#E8F6EF] dark:bg-[#132A20] border-[#10B981] text-[#0B5C45] dark:text-[#10B981]'
                          : 'bg-neutral-50/70 dark:bg-[#0A1410] border-neutral-200 dark:border-[#1E342B] text-[#65736D] dark:text-[#9AB2A8]'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Related Security Centers */}
            <div className="rounded-[22px] bg-white dark:bg-[#101F19] border border-[#E7ECE9] dark:border-[#1E342B] p-6 shadow-[0_4px_20px_rgba(20,50,40,0.03)] space-y-3.5">
              <h3 className="text-sm font-bold text-[#12201B] dark:text-[#F2FAF6] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#0B5C45] dark:text-[#10B981]" />
                <span>Related Security Centers</span>
              </h3>

              <Link
                href={`${basePath}/blocked-users`}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-neutral-50/80 dark:bg-[#0A1410] hover:bg-[#E8F6EF] dark:hover:bg-[#142A20] border border-neutral-200/80 dark:border-[#1E342B] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#12201B] dark:text-[#F2FAF6] group-hover:text-[#0B5C45] dark:group-hover:text-[#10B981]">
                      Blocked Users Hub
                    </h4>
                    <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                      Manage blacklisted patrons &amp; spam phones
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#65736D] group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href={`${basePath}/settings/password`}
                className="group flex items-center justify-between p-3.5 rounded-xl bg-neutral-50/80 dark:bg-[#0A1410] hover:bg-[#E8F6EF] dark:hover:bg-[#142A20] border border-neutral-200/80 dark:border-[#1E342B] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#12201B] dark:text-[#F2FAF6] group-hover:text-[#0B5C45] dark:group-hover:text-[#10B981]">
                      Password &amp; Sign-in
                    </h4>
                    <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                      Owner account credentials &amp; 2FA
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#65736D] group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </form>
    </DashboardShell>
  );
}
