'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Check,
  ArrowRight,
  Loader2,
  AlertCircle,
  Coffee,
  Sparkles,
  Handshake,
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { isValidEmail, normalizeEmail } from '@/lib/validation';

function SignupFormContent() {
  const router = useRouter();
  const toast = useToast();

  const [step, setStep] = useState<'credentials' | 'otp' | 'referral'>('credentials');
  const [partnerCode, setPartnerCode] = useState('');
  const [partnerLoading, setPartnerLoading] = useState(false);
  const [partnerError, setPartnerError] = useState<string | null>(null);

  // Form credentials state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Loading & error states
  const [step1Loading, setStep1Loading] = useState(false);
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // OTP state
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [step2Loading, setStep2Loading] = useState(false);
  const [step2Resending, setStep2Resending] = useState(false);
  const [step2Error, setStep2Error] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(45);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Password validation checks
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  // Focus first OTP input when reaching step 2
  useEffect(() => {
    if (step === 'otp') {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }
  }, [step]);

  // Countdown timer for OTP
  useEffect(() => {
    if (step !== 'otp' || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [step, countdown]);

  // Handle OTP digit input
  const handleOtpChange = (index: number, value: string) => {
    if (step2Error) setStep2Error(null);
    const cleanVal = value.replace(/\D/g, '');

    // Support paste of entire 6-digit code
    if (cleanVal.length >= 6) {
      const newDigits = cleanVal.slice(0, 6).split('');
      setOtpDigits(newDigits);
      otpInputRefs.current[5]?.focus();
      triggerOtpVerify(cleanVal.slice(0, 6));
      return;
    }

    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal.slice(-1);
    setOtpDigits(newDigits);

    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    const fullCode = newDigits.join('');
    if (fullCode.length === 6) {
      triggerOtpVerify(fullCode);
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // STEP 1: Submit Credentials
  async function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep1Error(null);

    const cleanEmail = normalizeEmail(email);
    if (!isValidEmail(cleanEmail)) {
      setStep1Error('Please enter a valid email address (e.g., owner@yourcafe.com).');
      return;
    }

    if (password.length < 8) {
      setStep1Error('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setStep1Error('Passwords do not match. Please re-check your password.');
      return;
    }

    if (!agreeTerms) {
      setStep1Error('Please agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }

    setStep1Loading(true);
    try {
      // 1. Strict Duplicate Check: Ensure one account per email ID
      try {
        const checkRes = await fetch(
          `/api/auth/check-email?email=${encodeURIComponent(cleanEmail)}`
        );
        const checkData = await checkRes.json();
        if (checkData?.exists) {
          const existMsg =
            'An account is already registered with this email address. Please log in instead.';
          setStep1Error(existMsg);
          toast.error('Email Already Registered', {
            description: 'You already have an account with this email. Please click Login below.',
          });
          setStep1Loading(false);
          return;
        }
      } catch (checkErr) {
        console.warn('[Signup] Check email availability note:', checkErr);
      }

      // 2. Dispatch OTP to verify ownership
      const res = await fetch('/api/onboarding/send-otp-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 409 || data?.error?.includes('already registered')) {
          const existMsg =
            'An account is already registered with this email address. Please log in instead.';
          setStep1Error(existMsg);
          toast.error('Email Already Registered', {
            description: 'Please log in with your existing account password.',
          });
          return;
        }
        throw new Error(data?.error || 'Failed to send verification code. Please try again.');
      }

      toast.success('Verification code sent!', {
        description: `Check your inbox at ${cleanEmail}`,
      });
      setStep('otp');
      setCountdown(45);
      setOtpDigits(['', '', '', '', '', '']);
    } catch (err: any) {
      let msg = err.message || 'Failed to proceed. Please try again.';
      if (err.code === 'auth/email-already-in-use' || msg.includes('already registered')) {
        msg = 'This email is already registered. Please login instead.';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Password should be at least 8 characters.';
      } else if (err.code === 'auth/invalid-email') {
        msg = 'Please enter a valid email address.';
      }
      setStep1Error(msg);
      toast.error(msg);
    } finally {
      setStep1Loading(false);
    }
  }

  // Google Sign-Up
  async function handleGoogleSignUp() {
    setStep1Loading(true);
    setStep1Error(null);
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

      toast.success('Account created with Google!', {
        description: `Welcome, ${user.displayName || user.email}!`,
      });

      setTimeout(() => {
        setStep('referral');
      }, 400);
    } catch (err: any) {
      console.error('Google Sign-up error:', err);
      const msg = err.message || 'Google sign-up could not be completed.';
      setStep1Error(msg);
      toast.error(msg);
    } finally {
      setStep1Loading(false);
    }
  }

  // STEP 2: Trigger OTP verification
  async function triggerOtpVerify(code: string) {
    if (code.length !== 6 || step2Loading) return;
    setStep2Error(null);
    setStep2Loading(true);

    try {
      const cleanEmail = normalizeEmail(email);
      const res = await fetch('/api/onboarding/verify-otp-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          otp: code,
          email: cleanEmail,
          password,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        if (res.status === 409 || data?.error?.includes('already registered')) {
          const existMsg = 'An account with this email address already exists. Please log in instead.';
          setStep2Error(existMsg);
          toast.error('Email Already Registered', {
            description: existMsg,
          });
          return;
        }
        throw new Error(data?.error || 'Verification failed. Please check the 6-digit code.');
      }

      // Sync user to Firebase Auth if direct
      let fbUser = null;
      try {
        const { signUpWithEmail } = await import('@/lib/firebaseAuth');
        fbUser = await signUpWithEmail(cleanEmail, password, cleanEmail.split('@')[0]);
      } catch (fbErr: any) {
        if (fbErr.code === 'auth/email-already-in-use') {
          console.warn('[FirebaseAuth] Account already in Auth, skipping direct create');
        }
      }

      localStorage.setItem(
        'brewpluse::active_user',
        JSON.stringify({
          uid: fbUser?.uid || data?.user?.id || 'usr_' + Date.now(),
          email: cleanEmail,
          verified: true,
          loginTime: Date.now(),
        })
      );

      toast.success('Email verified & account created!', {
        description: 'Just one final touch...',
      });

      setTimeout(() => {
        setStep('referral');
      }, 400);
    } catch (err: any) {
      const msg = err.message || 'Verification failed. Please check the code.';
      setStep2Error(msg);
      toast.error(msg);
    } finally {
      setStep2Loading(false);
    }
  }

  // Resend OTP
  async function handleResendOtp() {
    if (countdown > 0 || step2Resending) return;
    setStep2Resending(true);
    setStep2Error(null);

    try {
      const cleanEmail = normalizeEmail(email);
      const res = await fetch('/api/onboarding/send-otp-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      if (!res.ok) {
        throw new Error('Failed to resend code. Please try again.');
      }

      toast.success('New code sent!', {
        description: `Check your inbox at ${cleanEmail}`,
      });
      setCountdown(45);
      setOtpDigits(['', '', '', '', '', '']);
    } catch (err: any) {
      const msg = err.message || 'Failed to resend OTP.';
      setStep2Error(msg);
      toast.error(msg);
    } finally {
      setStep2Resending(false);
    }
  }

  // STEP 3: Handle Partner Referral
  async function handlePartnerSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const cleanCode = partnerCode.trim().toUpperCase();
    if (!cleanCode) {
      handleSkipPartner();
      return;
    }

    setPartnerLoading(true);
    setPartnerError(null);
    try {
      try {
        const stored = localStorage.getItem('brewpluse::active_user');
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.referredBy = cleanCode;
          localStorage.setItem('brewpluse::active_user', JSON.stringify(parsed));

          if (parsed.uid) {
            const { doc, setDoc } = await import('firebase/firestore');
            const { getFirebaseDb } = await import('@/lib/firebaseClient');
            const dbInstance = getFirebaseDb();
            if (dbInstance) {
              await setDoc(
                doc(dbInstance, 'users', parsed.uid),
                {
                  referredBy: cleanCode,
                  referralAppliedAt: new Date().toISOString(),
                },
                { merge: true }
              );
            }
          }
        }
      } catch (syncErr) {
        console.warn('[Signup] Referral sync note:', syncErr);
      }

      toast.success('Partner referral code applied!', {
        description: `Code ${cleanCode} registered successfully!`,
      });

      setTimeout(() => {
        router.push('/setup');
      }, 500);
    } catch (err: any) {
      setPartnerError(err.message || 'Failed to apply partner code.');
      toast.error('Failed to apply partner code.');
    } finally {
      setPartnerLoading(false);
    }
  }

  function handleSkipPartner() {
    toast.success('Welcome to BrewPluse!', {
      description: 'Redirecting to cafe setup...',
    });
    router.push('/setup');
  }

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#13110f] text-[#f5f2eb] antialiased selection:bg-amber-500/25 selection:text-amber-200">
      {/* ========================================================= */}
      {/* LEFT COLUMN: Atmospheric Dark Espresso Showcase          */}
      {/* ========================================================= */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen relative overflow-hidden bg-[#100e0d] z-10 border-r border-[#241f1b]">
        <div className="relative w-full h-full min-h-screen flex flex-col justify-between overflow-hidden select-none p-10 xl:p-14">
          {/* Background image & gradient overlays matching reference */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center filter brightness-[0.72] contrast-[1.12] saturate-[1.05]"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1600&q=85')`,
              }}
            />
            {/* Atmospheric dark coffee vignette overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-[#100e0d]/40 to-[#100e0d]/75" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#100e0d]/60 via-transparent to-[#13110f]" />
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

      {/* ========================================================= */}
      {/* RIGHT COLUMN: Clean Espresso Signup Form                  */}
      {/* ========================================================= */}
      <div className="flex-1 flex flex-col justify-between w-full lg:w-1/2 min-h-screen relative bg-[#13110f] z-10 px-6 sm:px-12 md:px-16 lg:px-12 xl:px-20 py-8 lg:py-10">
        {/* Subtle Ambient Backlight */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-amber-600/5 blur-[120px]" />
          <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full bg-emerald-600/5 blur-[130px]" />
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
        <main className="relative z-10 my-auto py-8 max-w-[420px] w-full mx-auto">
          {/* STEP 1: CREDENTIALS CREATION */}
          {step === 'credentials' && (
            <div className="animate-fade-in">
              {/* Stepper Dashes: 3 steps */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-1 bg-amber-500 rounded-full transition-all" />
                <div className="w-3.5 h-1 bg-[#2b2521] rounded-full transition-all" />
                <div className="w-3.5 h-1 bg-[#2b2521] rounded-full transition-all" />
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h1 className="font-serif text-3xl sm:text-[36px] font-bold text-white tracking-tight leading-[1.15]">
                  Create your BrewPluse account<span className="text-amber-500">.</span>
                </h1>
                <p className="text-xs sm:text-[13px] text-[#9c938a] leading-relaxed mt-2.5">
                  Set up your cafe operations, contactless ordering, and real-time counter billing.
                </p>
              </div>

              {step1Error && (
                <div className="mb-4 flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{step1Error}</span>
                </div>
              )}

              <form onSubmit={handleCredentialsSubmit} className="space-y-3.5" noValidate>
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
                  <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#9c938a] block">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#6e665e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      required
                      autoComplete="new-password"
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

                  {/* Password Requirements 2x2 Grid */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1 pt-1 text-[11px] font-medium text-[#736a61]">
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${hasMinLength ? 'bg-emerald-400' : 'bg-[#3d342c]'}`} />
                      <span className={hasMinLength ? 'text-neutral-300' : 'text-[#736a61]'}>8+ characters</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${hasUppercase ? 'bg-emerald-400' : 'bg-[#3d342c]'}`} />
                      <span className={hasUppercase ? 'text-neutral-300' : 'text-[#736a61]'}>One uppercase</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${hasNumber ? 'bg-emerald-400' : 'bg-[#3d342c]'}`} />
                      <span className={hasNumber ? 'text-neutral-300' : 'text-[#736a61]'}>One number</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-1.5 w-1.5 rounded-full ${hasSpecial ? 'bg-emerald-400' : 'bg-[#3d342c]'}`} />
                      <span className={hasSpecial ? 'text-neutral-300' : 'text-[#736a61]'}>Special symbol</span>
                    </div>
                  </div>
                </div>

                {/* 3. CONFIRM PASSWORD */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#9c938a] block">
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#6e665e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter your password"
                      required
                      autoComplete="new-password"
                      className="w-full pl-10 pr-10 py-2.5 bg-[#1b1715] border border-[#2b2521] rounded-xl text-sm text-white placeholder-[#5a524a] focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6e665e] hover:text-neutral-300 transition-colors cursor-pointer"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#9c938a] select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded border-[#3a322b] bg-[#1b1715] text-emerald-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="leading-snug">
                      I agree to the{' '}
                      <Link href="/terms" target="_blank" className="text-amber-500 hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" target="_blank" className="text-amber-500 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </span>
                  </label>
                </div>

                {/* Nominal Refundable Verification Card */}
                <div className="rounded-xl border border-[#382b20] bg-[#191512] p-3 text-xs">
                  <div className="flex items-center gap-2 text-white font-medium mb-1">
                    <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Nominal Refundable Verification</span>
                  </div>
                  <p className="text-[11px] text-[#9c938a] leading-relaxed">
                    To prevent spam bots and ensure operational integrity, a nominal deposit (₹1.00) is authorized during onboarding and is{' '}
                    <span className="text-emerald-400 font-medium">100% automatically refunded immediately</span>.
                  </p>
                </div>

                {/* CREATE ACCOUNT BUTTON (EMERALD) */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={step1Loading}
                    className="w-full py-3 px-4 bg-[#0c3821] hover:bg-[#10482b] border border-[#144f2e] text-white font-medium text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
                  >
                    {step1Loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Creating account...</span>
                      </>
                    ) : (
                      <>
                        <span>Create account</span>
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      </>
                    )}
                  </button>
                </div>

                {/* OR DIVIDER */}
                <div className="relative flex items-center justify-center my-3.5">
                  <div className="w-full border-t border-[#26211d]" />
                  <span className="absolute bg-[#13110f] px-3 text-[10px] font-mono uppercase tracking-wider text-[#736a61]">
                    OR
                  </span>
                </div>

                {/* GOOGLE SIGN-UP BUTTON */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  disabled={step1Loading}
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

              {/* Bottom Switcher */}
              <div className="mt-5 pt-4 border-t border-[#241f1b] flex items-center justify-between text-xs text-[#9c938a]">
                <span>Already have an account?</span>
                <Link
                  href="/login"
                  className="font-medium text-white hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Login</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          )}

          {/* STEP 2: 6-DIGIT EMAIL OTP VERIFICATION */}
          {step === 'otp' && (
            <div className="animate-fade-in">
              {/* Stepper Dashes */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-4 h-1 bg-emerald-500 rounded-full" />
                <div className="w-8 h-1 bg-amber-500 rounded-full transition-all" />
                <div className="w-3.5 h-1 bg-[#2b2521] rounded-full transition-all" />
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h1 className="font-serif text-3xl sm:text-[36px] font-bold text-white tracking-tight leading-[1.15]">
                  Verify your email<span className="text-amber-500">.</span>
                </h1>
                <p className="text-xs sm:text-[13px] text-[#9c938a] leading-relaxed mt-2.5">
                  We sent a 6-digit confirmation code to{' '}
                  <span className="text-white font-medium">{email}</span>.
                </p>
              </div>

              {step2Error && (
                <div className="mb-4 flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{step2Error}</span>
                </div>
              )}

              {/* 6 Digit Input Row */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-12 h-14 text-center text-xl font-mono font-bold bg-[#1b1715] border border-[#2b2521] rounded-xl text-white focus:outline-none focus:border-amber-500/70 focus:ring-1 focus:ring-amber-500/30 transition-all"
                    />
                  ))}
                </div>

                {/* Resend Row */}
                <div className="flex items-center justify-between text-xs text-[#9c938a] pt-1">
                  <span>Didn&apos;t get the code?</span>
                  {countdown > 0 ? (
                    <span className="text-[#736a61] font-mono">Resend in {countdown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={step2Resending}
                      className="text-amber-500 hover:underline font-medium cursor-pointer"
                    >
                      {step2Resending ? 'Resending...' : 'Resend code'}
                    </button>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  type="button"
                  onClick={() => triggerOtpVerify(otpDigits.join(''))}
                  disabled={otpDigits.join('').length !== 6 || step2Loading}
                  className="w-full py-3 px-4 bg-[#0c3821] hover:bg-[#10482b] border border-[#144f2e] text-white font-medium text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] mt-3"
                >
                  {step2Loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Verify &amp; Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Back to credentials */}
                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="w-full text-center text-xs text-[#736a61] hover:text-white transition-colors pt-2 cursor-pointer"
                >
                  &larr; Change email address
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PARTNER REFERRAL (OPTIONAL) */}
          {step === 'referral' && (
            <div className="animate-fade-in">
              {/* Stepper Dashes */}
              <div className="flex items-center gap-2 mb-5">
                <div className="w-4 h-1 bg-emerald-500 rounded-full" />
                <div className="w-4 h-1 bg-emerald-500 rounded-full" />
                <div className="w-8 h-1 bg-amber-500 rounded-full transition-all" />
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h1 className="font-serif text-3xl sm:text-[36px] font-bold text-white tracking-tight leading-[1.15]">
                  Partner referral code<span className="text-amber-500">.</span>
                </h1>
                <p className="text-xs sm:text-[13px] text-[#9c938a] leading-relaxed mt-2.5">
                  Referred by an authorized BrewPluse cafe partner? Enter their code below for complimentary onboarding perks.
                </p>
              </div>

              {partnerError && (
                <div className="mb-4 flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium animate-fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{partnerError}</span>
                </div>
              )}

              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#9c938a] block">
                    REFERRAL CODE (OPTIONAL)
                  </label>
                  <div className="relative">
                    <Handshake className="w-4 h-4 text-[#6e665e] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={partnerCode}
                      onChange={(e) => setPartnerCode(e.target.value.toUpperCase())}
                      placeholder="e.g. CAFE-PARTNER-2026"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#1b1715] border border-[#2b2521] rounded-xl text-sm text-white uppercase placeholder-[#5a524a] focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/30 transition-all font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    disabled={partnerLoading}
                    className="w-full py-3 px-4 bg-[#0c3821] hover:bg-[#10482b] border border-[#144f2e] text-white font-medium text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                  >
                    {partnerLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Applying...</span>
                      </>
                    ) : (
                      <>
                        <span>Apply &amp; Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSkipPartner}
                    className="w-full py-2.5 text-xs text-[#9c938a] hover:text-white transition-colors cursor-pointer"
                  >
                    Skip this step &rarr;
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#13110f] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
        </div>
      }
    >
      <SignupFormContent />
    </Suspense>
  );
}
