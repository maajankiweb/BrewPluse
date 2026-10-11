'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Link from 'next/link';
import {
  ArrowLeft,
  KeyRound,
  Lock,
  Check,
  Save,
  ShieldCheck,
} from 'lucide-react';
import { useToast } from '@/components/Toast';



export default function PasswordSettingsPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();

  const basePath = `/dashboard/${storeSlug}`;

  const criteria = [
    { label: 'At least 8 characters long', valid: newPassword.length >= 8 },
    { label: 'Contains a number (0-9)', valid: /\d/.test(newPassword) },
    { label: 'Contains a lowercase letter', valid: /[a-z]/.test(newPassword) },
    { label: 'Contains an uppercase or special character', valid: /[A-Z!@#$%^&*]/.test(newPassword) },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.');
      return;
    }
    toast.success('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <form onSubmit={handleSave} className="max-w-[800px] mx-auto space-y-4 font-sans pb-12">
        {/* Back Link */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`${basePath}/settings`}
            className="group inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white dark:bg-[#0E2018] hover:bg-[#F8FAF8] dark:hover:bg-[#142A21] text-[#12201B] dark:text-[#F2FAF6] border border-[#E7ECE9] dark:border-[#1E342B] text-xs font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#65736D] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Settings</span>
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Update Password</span>
          </button>
        </div>

        {/* Heading Card */}
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E7ECE9] dark:border-[#1E342B] shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] border border-[#10B981]/20 flex items-center justify-center shrink-0">
            <KeyRound className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#12201B] dark:text-white tracking-tight">
              Password &amp; Sign-in
            </h1>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] font-normal mt-0.5">
              Set or change your email &amp; password login credentials.
            </p>
          </div>
        </div>

        {/* Password Form Card */}
        <div className="rounded-xl border border-[#E7ECE9] dark:border-[#1E342B] bg-white dark:bg-[#0E2018] p-5 sm:p-6 shadow-[0_2px_12px_rgba(20,50,40,0.03)] space-y-4">
          <div>
            <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full rounded-xl px-3.5 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full rounded-xl px-3.5 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981]"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-1.5 block">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full rounded-xl px-3.5 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981]"
            />
          </div>

          {/* Checklist */}
          <div className="pt-2 border-t border-neutral-100 dark:border-[#1E342B] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#65736D] dark:text-[#9AB2A8] block">
              Password Requirements
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {criteria.map((c, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 ${
                    c.valid ? 'text-emerald-600 dark:text-emerald-400 font-semibold' : 'text-neutral-400'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      c.valid
                        ? 'bg-emerald-500/15 text-emerald-600'
                        : 'border border-neutral-300 dark:border-neutral-700'
                    }`}
                  >
                    {c.valid && <Check className="w-2.5 h-2.5" />}
                  </div>
                  <span>{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </DashboardShell>
  );
}
