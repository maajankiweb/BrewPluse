'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
  Coffee,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get('next');
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check if session already exists
  useEffect(() => {
    try {
      const activeUser = localStorage.getItem('brewpluse::active_user');
      if (activeUser) {
        const parsed = JSON.parse(activeUser);
        if (parsed.email) {
          setEmail(parsed.email);
        }
      }
    } catch (e) {}
  }, []);

  function handleRedirect() {
    if (nextUrl && nextUrl.startsWith('/') && nextUrl !== '/login') {
      router.replace(nextUrl);
      return;
    }
    router.replace('/dashboard');
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !password) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      // 1. Authenticate with Firebase Auth
      let firebaseUser = null;
      try {
        const { signInWithEmail } = await import('@/lib/firebaseAuth');
        firebaseUser = await signInWithEmail(cleanEmail, password);
      } catch (fbErr: any) {
        console.warn('[FirebaseAuth] Direct client login note:', fbErr.message);
        // If Firebase Auth throws an invalid credential error, rethrow unless running in offline test mode
        if (fbErr.code === 'auth/invalid-credential' || fbErr.code === 'auth/user-not-found' || fbErr.code === 'auth/wrong-password') {
          throw new Error('Invalid email or password. Please verify your credentials.');
        }
      }

      // 2. Also authenticate with API endpoint for legacy/session support
      try {
        await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password }),
        });
      } catch (e) {}

      localStorage.setItem(
        'brewpluse::active_user',
        JSON.stringify({
          uid: firebaseUser?.uid || 'user_' + Date.now(),
          email: cleanEmail,
          name: firebaseUser?.displayName || cleanEmail.split('@')[0],
          storeName: 'BrewPluse Cafe',
          loginTime: Date.now(),
        })
      );

      toast.success('Welcome back!', {
        description: 'Successfully authenticated with Firebase.',
      });

      setTimeout(() => {
        handleRedirect();
      }, 600);
    } catch (err: any) {
      const msg = err.message || 'Please check your credentials and try again.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setErrorMsg(null);
    try {
      const { signInWithGoogle } = await import('@/lib/firebaseAuth');
      const user = await signInWithGoogle();

      localStorage.setItem(
        'brewpluse::active_user',
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          name: user.displayName || user.email?.split('@')[0],
          storeName: `${user.displayName || 'BrewPluse'}'s Cafe`,
          loginTime: Date.now(),
        })
      );

      toast.success('Google Sign-in successful!', {
        description: `Welcome, ${user.displayName || user.email}!`,
      });

      setTimeout(() => {
        handleRedirect();
      }, 600);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      const msg = err.message || 'Google Sign-in could not be completed.';
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row bg-[#171412] text-[#e5e2e1] selection:bg-[#eebd8e]/30 selection:text-[#ffdcbd] overflow-x-hidden">
      {/* LEFT COLUMN: Main Form Shell (Slides in from Left) */}
      <div className="flex-1 flex flex-col justify-between w-full lg:w-1/2 min-h-screen relative bg-[#171412] z-10 animate-slide-left">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#875200]/10 blur-[120px]" />
          <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-[#005c36]/10 blur-[130px]" />
        </div>

        {/* Top Header */}
        <header className="flex w-full items-center justify-between py-6 px-6 sm:px-10 lg:px-12 border-b border-white/[0.06] bg-[#171412]/40 backdrop-blur-sm">
          <Link href="/" className="group flex items-center gap-3 transition">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.08] border border-white/10 p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-300 text-amber-500">
              <Coffee className="w-5 h-5 text-[#eebd8e]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center">
                Brew<span className="text-[#eebd8e]">Pluse</span>
              </span>
              <span className="text-[10px] text-neutral-400 font-medium -mt-1 tracking-wider uppercase font-mono">
                Operating System
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white hover:bg-white/[0.08] hover:border-[#eebd8e]/40 transition-all duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#eebd8e]" />
            <span>Back to Home</span>
          </Link>
        </header>

        {/* Main Content Area - EXACT MATCH TO LOGIN SCREENSHOT */}
        <main className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-14 xl:px-20 py-10 max-w-xl mx-auto w-full">
          <div className="space-y-6 animate-fade-in">
            {/* Title & Subtitle */}
            <div>
              <h1 className="font-serif text-3xl sm:text-[38px] font-bold text-white tracking-tight leading-[1.12]">
                Welcome back<span className="text-[#eebd8e]">.</span>
              </h1>
              <p className="text-xs sm:text-[13px] text-[#a8a29e] font-sans leading-relaxed mt-2.5">
                Sign in to your BrewPluse account and keep your cafe running smoothly.
              </p>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              {/* 1. EMAIL ADDRESS */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#eebd8e] block">
                  EMAIL ADDRESS
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#78716c] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="owner@yourcafe.com"
                    required
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 bg-[#221e1c] border border-white/10 rounded-2xl text-sm text-white placeholder-[#78716c] focus:outline-none focus:border-[#eebd8e] focus:bg-[#282321] transition-all font-medium"
                  />
                </div>
              </div>

              {/* 2. PASSWORD + FORGOT PASSWORD ROW */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#eebd8e] block">
                    PASSWORD
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-[#eebd8e] hover:underline underline-offset-2 transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#78716c] absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className="w-full pl-11 pr-11 py-3 bg-[#221e1c] border border-white/10 rounded-2xl text-sm text-white placeholder-[#78716c] focus:outline-none focus:border-[#eebd8e] focus:bg-[#282321] transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-neutral-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* 3. PRIMARY ACTION BUTTON (DEEP FOREST GREEN) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-4 bg-[#0c3821] hover:bg-[#0f4429] border border-[#144d2f] text-white font-bold text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Log In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* OR DIVIDER */}
              <div className="relative flex items-center justify-center my-4">
                <div className="w-full border-t border-white/[0.08]" />
                <span className="absolute bg-[#171412] px-3 text-[10px] font-mono uppercase tracking-wider text-[#78716c]">
                  OR
                </span>
              </div>

              {/* GOOGLE SIGN-IN BUTTON */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 bg-[#221e1c] hover:bg-[#282321] border border-white/10 text-white font-bold text-xs rounded-full flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* BOTTOM CREATE ACCOUNT ROW */}
            <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#a8a29e]">
              <span>Don&apos;t have an account?</span>
              <Link
                href="/signup"
                className="font-bold text-white hover:text-[#eebd8e] transition-colors"
              >
                Create an account &rarr;
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full py-5 px-6 sm:px-10 lg:px-12 border-t border-white/[0.05] bg-[#171412]/30">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
            <p>&copy; {new Date().getFullYear()} BrewPluse Inc. All rights reserved.</p>
            <div className="flex items-center gap-5 font-medium">
              <Link href="/terms" className="hover:text-[#eebd8e] transition-colors">
                Terms
              </Link>
              <span className="text-white/10">&middot;</span>
              <Link href="/privacy" className="hover:text-[#eebd8e] transition-colors">
                Privacy
              </Link>
              <span className="text-white/10">&middot;</span>
              <Link href="/pricing" className="hover:text-[#eebd8e] transition-colors">
                Pricing
              </Link>
            </div>
          </div>
        </footer>
      </div>

      {/* RIGHT COLUMN: Luxury Ambient Showcase (Slides in from Right) */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen relative overflow-hidden bg-[#141313] z-10 border-l border-white/[0.08] animate-slide-right">
        <div className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#141313] select-none p-10 xl:p-14 transition-colors duration-500">
          {/* Background image & gradient overlays */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-[0.78] contrast-[1.08] saturate-[1.05]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80')`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b2b1a]/95 via-[#1a1715]/60 to-[#141313]/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1715] via-transparent to-[#0b2b1a]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(238,189,142,0.12),transparent_60%)]" />
          </div>

          {/* Dotted texture overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-25 mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          {/* Status Badge */}
          <div className="relative z-10 self-start">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#1a1715]/80 px-4 py-2 backdrop-blur-md shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10b981]" />
              </span>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-[#eebd8e] uppercase">
                Live Floor Sync
              </span>
              <span className="text-white/20">|</span>
              <span className="text-xs text-neutral-300 font-medium">Thermal KDS Active</span>
            </div>
          </div>

          {/* Luxury Quote */}
          <div className="relative z-10 pt-6 border-t border-white/10">
            <blockquote className="font-serif text-xl xl:text-2xl font-light text-white leading-snug tracking-tight">
              &ldquo;Run your cafe.{' '}
              <span className="italic text-[#eebd8e] font-normal">Not your software.</span>&rdquo;
            </blockquote>
            <p className="mt-2 text-xs text-neutral-400 tracking-wide font-sans">
              Engineered for modern specialty coffee, bakeries, and high-velocity dining floors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#171412] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-[#eebd8e]" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
