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
      // 1. Authenticate with Firebase Auth (client sync if available)
      let firebaseUser = null;
      try {
        const { signInWithEmail } = await import('@/lib/firebaseAuth');
        firebaseUser = await signInWithEmail(cleanEmail, password);
      } catch (fbErr: any) {
        console.warn('[FirebaseAuth] Client login bypassed, verifying with backend API:', fbErr.message);
      }

      // 2. Authoritative backend API login
      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      if (!loginRes.ok) {
        const errData = await loginRes.json().catch(() => ({}));
        throw new Error(errData?.error || 'Invalid email or password. Please verify your credentials.');
      }

      const loginData = await loginRes.json();
      if (loginData?.firebaseCustomToken) {
        try {
          const { getFirebaseAuth } = await import('@/lib/firebaseClient');
          const { signInWithCustomToken } = await import('firebase/auth');
          const authInst = getFirebaseAuth();
          if (authInst) {
            await signInWithCustomToken(authInst, loginData.firebaseCustomToken);
          }
        } catch (tokenErr) {
          console.warn('[FirebaseAuth] signInWithCustomToken note:', tokenErr);
        }
      }

      localStorage.setItem(
        'brewpluse::active_user',
        JSON.stringify({
          uid: loginData?.user?.uid || firebaseUser?.uid || 'user_' + Date.now(),
          email: cleanEmail,
          name: loginData?.user?.storeName || firebaseUser?.displayName || cleanEmail.split('@')[0],
          storeName: loginData?.user?.storeName || 'BrewPluse Cafe',
          storeSlug: loginData?.user?.storeSlug || 'brewpluse',
          loginTime: Date.now(),
        })
      );

      toast.success('Welcome back!', {
        description: 'Successfully authenticated with BrewPluse.',
      });

      setTimeout(() => {
        handleRedirect();
      }, 500);
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
      }, 500);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      let msg = err.message || 'Google Sign-in could not be completed.';
      if (err.code === 'auth/unauthorized-domain' || String(err).includes('unauthorized-domain')) {
        msg = 'Domain (brewpluse.com) is not authorized in Firebase Console. Please add brewpluse.com to Firebase Console > Authentication > Settings > Authorized domains.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        msg = 'Sign-in popup was closed before completing.';
      } else if (err.code === 'auth/popup-blocked') {
        msg = 'Sign-in popup was blocked by your browser. Please allow popups for this site.';
      }
      setErrorMsg(msg);
      toast.error('Google Sign-in Note', { description: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#13110f] text-[#f5f2eb] antialiased selection:bg-amber-500/25 selection:text-amber-200">
      {/* ========================================================= */}
      {/* LEFT COLUMN: Clean Espresso Auth Form                      */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col justify-between w-full lg:w-1/2 min-h-screen relative bg-[#13110f] z-10 px-6 sm:px-12 md:px-16 lg:px-12 xl:px-20 py-8 lg:py-10">
        {/* Subtle Ambient Backlight */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-amber-600/5 blur-[120px]" />
          <div className="absolute bottom-10 right-0 h-80 w-80 rounded-full bg-emerald-600/5 blur-[130px]" />
        </div>

        {/* Top Header Bar */}
        <header className="relative z-10 flex w-full items-center justify-between">
          <Link href="/" className="group flex items-center gap-2.5 transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1c1815] border border-[#2b2420] text-amber-500 group-hover:border-amber-500/40 transition-colors shadow-sm">
              <Coffee className="w-4 h-4 text-amber-500" />
            </div>
            <span className="font-semibold text-base tracking-tight text-white">
              BrewPluse
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#2c2521] bg-[#1a1715]/90 px-3.5 py-1.5 text-xs font-medium text-neutral-300 hover:text-white hover:border-amber-500/40 hover:bg-[#221e1a] transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white" />
            <span>Back to Home</span>
          </Link>
        </header>

        {/* Form Center Wrapper */}
        <main className="relative z-10 my-auto py-10 max-w-[400px] w-full mx-auto">
          {/* Header Texts */}
          <div className="mb-7">
            <h1 className="font-serif text-3xl sm:text-[38px] font-bold text-white tracking-tight leading-[1.15]">
              Welcome back<span className="text-amber-500">.</span>
            </h1>
            <p className="text-xs sm:text-[13px] text-[#9c938a] leading-relaxed mt-2.5">
              Sign in to your BrewPluse account and keep your cafe running smoothly.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium animate-fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* QUICK DEMO CAFE ACCOUNT AUTOFILL */}
          <div className="mb-4 p-3.5 rounded-2xl bg-[#1c1815] border border-amber-500/30 text-xs flex items-center justify-between gap-3 shadow-lg">
            <div>
              <span className="font-bold text-amber-400 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <span>⚡ Demo Cafe Setup Account</span>
              </span>
              <p className="text-[11px] text-[#9c938a] mt-0.5 font-mono">
                demo@brewpluse.com &bull; BrewPluse@2026
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('demo@brewpluse.com');
                setPassword('BrewPluse@2026');
                toast.success('Demo Cafe Credentials Loaded!', {
                  description: 'Click "Log in" to access your dashboard.',
                });
              }}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 transition-colors cursor-pointer shrink-0"
            >
              Fill Demo
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            {/* 1. EMAIL ADDRESS */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#9c938a] block">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#6e665e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@yourcafe.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#1b1715] border border-[#2b2521] rounded-xl text-sm text-white placeholder-[#5a524a] focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium"
                />
              </div>
            </div>

            {/* 2. PASSWORD */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#9c938a] block">
                  PASSWORD
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs text-amber-500 hover:text-amber-400 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#6e665e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#1b1715] border border-[#2b2521] rounded-xl text-sm text-white placeholder-[#5a524a] focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6e665e] hover:text-neutral-300 transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 3. LOG IN BUTTON (EMERALD) */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#0c3821] hover:bg-[#10482b] border border-[#144f2e] text-white font-medium text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Log in</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* OR DIVIDER */}
            <div className="relative flex items-center justify-center my-4">
              <div className="w-full border-t border-[#26211d]" />
              <span className="absolute bg-[#13110f] px-3 text-[10px] font-mono uppercase tracking-wider text-[#736a61]">
                OR
              </span>
            </div>

            {/* GOOGLE SIGN-IN BUTTON */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-[#1b1715] hover:bg-[#231e1a] border border-[#2b2521] text-neutral-200 text-xs font-medium rounded-full flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-[0.99]"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
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

          {/* Switcher: Create an account */}
          <div className="mt-6 pt-4 border-t border-[#241f1b] flex items-center justify-between text-xs text-[#9c938a]">
            <span>Don&apos;t have an account?</span>
            <Link
              href="/signup"
              className="font-medium text-white hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Create an account</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </main>
      </div>

      {/* ========================================================= */}
      {/* RIGHT COLUMN: Atmospheric Dark Espresso Showcase         */}
      {/* ========================================================= */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen relative overflow-hidden bg-[#100e0d] z-10 border-l border-[#241f1b]">
        <div className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden select-none p-10 xl:p-14">
          {/* Background image & gradient overlays matching the reference */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-[0.72] contrast-[1.12] saturate-[1.05]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85')`,
              }}
            />
            {/* Atmospheric dark coffee vignette overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-[#100e0d]/40 to-[#100e0d]/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#13110f] via-transparent to-[#100e0d]/60" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,158,11,0.08),transparent_60%)]" />
          </div>

          {/* Top-Left Status Badge */}
          <div className="relative z-10 self-start">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-black/60 px-3.5 py-1.5 backdrop-blur-md shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                LIVE FLOOR SYNC
              </span>
              <span className="text-white/20">|</span>
              <span className="text-xs text-neutral-300 font-medium">Thermal KDS Active</span>
            </div>
          </div>

          {/* Bottom Luxury Quote */}
          <div className="relative z-10 pt-6">
            <blockquote className="font-serif text-2xl xl:text-[28px] font-normal text-white leading-snug tracking-tight">
              &ldquo;Brew excellence.{' '}
              <span className="italic text-amber-500 font-normal">Automate everything.</span>&rdquo;
            </blockquote>
            <p className="mt-2 text-xs text-[#a8a29e] tracking-wide font-sans max-w-lg">
              Intelligent operating system engineered for specialty coffee, bakeries, and high-velocity dining floors.
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
        <div className="min-h-screen bg-[#13110f] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
