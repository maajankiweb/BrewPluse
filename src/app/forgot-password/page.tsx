'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Send, Loader2, CheckCircle2, Coffee } from 'lucide-react';
import AuthVideoShowcase from '@/components/auth/AuthVideoShowcase';
import { useToast } from '@/components/Toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const toast = useToast();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
    toast.success('Password reset link sent!', {
      description: `Check your inbox at ${email}`,
    });
  }

  return (
    <main className="font-sans text-[#1e1b14] overflow-x-hidden selection:bg-[#875200]/20 selection:text-[#875200] min-h-screen relative bg-[#fff8f0] flex flex-col justify-between">
      {/* Background Glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-[#875200]/10 blur-[150px]" />
        <div className="absolute top-1/2 -right-32 h-[450px] w-[450px] rounded-full bg-[#c6842e]/10 blur-[150px]" />
        <div className="absolute -bottom-32 left-1/3 h-[400px] w-[400px] rounded-full bg-[#875200]/08 blur-[160px]" />
      </div>

      {/* Header */}
      <header className="relative z-20 hidden lg:flex items-center justify-between px-6 md:px-12 py-6 max-w-[1400px] mx-auto w-full">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl border border-emerald-900/30 bg-[#0b2b1a] shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
            <Coffee className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-2xl font-black tracking-tight text-[#141210]">
            Brew<span className="text-emerald-700">Pluse</span>
          </span>
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-full border border-[#d6c3b1] bg-white/80 px-5 py-2 text-xs font-bold text-[#524437] hover:text-[#875200] hover:bg-white transition-all backdrop-blur-md shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </header>

      {/* Center Card */}
      <div className="relative z-10 w-full max-w-[1150px] mx-auto px-3 sm:px-6 py-4 sm:py-6 my-auto">
        <div className="w-full rounded-3xl sm:rounded-[36px] overflow-hidden border border-[#d6c3b1]/60 bg-[#fff8f0] shadow-[0_30px_90px_rgba(135,82,0,0.12)] grid grid-cols-1 lg:grid-cols-12 relative">
          
          <div className="lg:col-span-6 bg-[#1a1715] p-6 sm:p-12 text-white flex flex-col justify-between relative z-10">
            <svg
              className="absolute top-0 -right-12 h-full w-12 text-[#1a1715] fill-current hidden lg:block pointer-events-none z-20"
              viewBox="0 0 50 100"
              preserveAspectRatio="none"
            >
              <path d="M 0 0 C 45 35, 5 65, 0 100 L 0 0 Z" />
            </svg>

            <div>
              <div className="mb-8 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group" title="BrewPluse Home">
                  <div className="w-10 h-10 rounded-2xl border border-white/15 bg-white/10 group-hover:scale-105 transition-transform flex items-center justify-center">
                    <Coffee className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-2xl font-black tracking-tight text-white">
                    Brew<span className="text-emerald-400">Pluse</span>
                  </span>
                </Link>
                <Link
                  href="/login"
                  className="lg:hidden inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#262220] px-3.5 py-1.5 text-xs font-semibold text-[#eebd8e] hover:text-white transition-all"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Login
                </Link>
              </div>

              <div className="mb-6 text-left">
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-tight">
                  Reset <em className="text-[#eebd8e] font-normal italic font-serif">Password</em>
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-neutral-400 font-medium">
                  Enter your email address to receive password reset instructions.
                </p>
              </div>

              {sent ? (
                <div className="space-y-4 max-w-md animate-fade-in text-left">
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-emerald-200">Reset instructions sent!</div>
                      <div className="text-[11px] text-emerald-300/90 mt-1">
                        We sent a link to <span className="font-bold text-white">{email}</span>. Please check your inbox and spam folder.
                      </div>
                    </div>
                  </div>
                  <Link
                    href="/login"
                    className="mt-4 flex w-full h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#875200] via-[#a06200] to-[#875200] text-white font-bold text-sm uppercase tracking-wider shadow-lg hover:brightness-110 transition"
                  >
                    Return to Login
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-md text-left">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#eebd8e]/90">
                      Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 h-4 w-4 text-neutral-500 pointer-events-none" />
                      <input
                        type="email"
                        placeholder="owner@brewpluse.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-12 w-full border border-white/10 bg-[#262220] pl-11 pr-4 text-white placeholder:text-neutral-500 focus:ring-2 focus:ring-[#875200]/40 focus:border-[#eebd8e] rounded-2xl transition text-sm shadow-inner outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-2 flex w-full h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#875200] via-[#a06200] to-[#875200] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#875200]/30 hover:brightness-110 active:scale-[0.98] transition cursor-pointer disabled:opacity-75"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Sending Instructions...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reset Link</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
              <span>Remember your password?</span>
              <Link
                href="/login"
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-xs transition cursor-pointer"
              >
                Sign In
              </Link>
            </div>
          </div>

          <AuthVideoShowcase />
        </div>
      </div>

      <footer className="relative z-10 hidden lg:block py-6 text-center text-xs text-[#847465] border-t border-[#d6c3b1]/40 bg-[#fff8f0]/80 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} BrewPluse Inc. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
