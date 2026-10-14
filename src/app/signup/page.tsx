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
} from 'lucide-react';
import { useToast } from '@/components/Toast';

function SignupFormContent() {
  const router = useRouter();
  const toast = useToast();

  const [step, setStep] = useState<'credentials' | 'otp'>('credentials');
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

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setStep1Error('Please enter a valid email address.');
      return;
    }

    if (password.length < 8) {
      setStep1Error('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setStep1Error('Passwords do not match. Please verify your confirm password.');
      return;
    }

    if (!agreeTerms) {
      setStep1Error('Please review and check the box to accept the Terms of Service and Privacy Policy.');
      return;
    }

    setStep1Loading(true);
    try {
      const res = await fetch('/api/onboarding/send-otp-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send verification code.');
      }

      toast.success('Verification code sent!', {
        description: `Check your inbox at ${cleanEmail}`,
      });
      setStep('otp');
      setCountdown(45);
      setOtpDigits(['', '', '', '', '', '']);
    } catch (err: any) {
      const msg = err.message || 'Failed to proceed. Please try again.';
      setStep1Error(msg);
      toast.error(msg);
    } finally {
      setStep1Loading(false);
    }
  }

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
        router.replace('/setup');
      }, 700);
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
      const res = await fetch('/api/onboarding/verify-otp-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          otp: code,
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Verification failed. Please check the code.');
      }

      const cleanEmail = email.trim().toLowerCase();
      let fbUser = null;
      try {
        const { signUpWithEmail } = await import('@/lib/firebaseAuth');
        fbUser = await signUpWithEmail(cleanEmail, password, cleanEmail.split('@')[0]);
      } catch (fbErr: any) {
        console.warn('[FirebaseAuth] Direct sign-up note:', fbErr.message);
      }

      try {
        localStorage.setItem(
          'brewpluse::active_user',
          JSON.stringify({
            uid: fbUser?.uid || data.user?.uid || 'user_' + Date.now(),
            email: cleanEmail,
            verified: true,
            loginTime: Date.now(),
          })
        );
      } catch (err) {}

      toast.success('Email verified & account created!', {
        description: 'Proceeding to café setup and account activation...',
      });

      setTimeout(() => {
        router.push('/setup');
      }, 700);
    } catch (err: any) {
      const msg = err.message || 'Verification failed. Please check the code.';
      setStep2Error(msg);
      toast.error(msg);
    } finally {
      setStep2Loading(false);
    }
  }

  function handleOtpFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullCode = otpDigits.join('');
    if (fullCode.length !== 6) {
      setStep2Error('Please enter the complete 6-digit verification code.');
      return;
    }
    triggerOtpVerify(fullCode);
  }

  // Resend OTP
  async function handleResendOtp() {
    if (countdown > 0 || step2Resending) return;
    setStep2Resending(true);
    setStep2Error(null);
    try {
      const res = await fetch('/api/onboarding/send-otp-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to resend code.');
      }
      toast.success('New code sent!', {
        description: 'Check your email inbox for the latest verification code.',
      });
      setCountdown(45);
      setOtpDigits(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    } catch (err: any) {
      const msg = err.message || 'Failed to resend code.';
      setStep2Error(msg);
      toast.error(msg);
    } finally {
      setStep2Resending(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full flex flex-col lg:flex-row bg-[#171412] text-[#e5e2e1] selection:bg-[#eebd8e]/30 selection:text-[#ffdcbd] overflow-x-hidden">
      {/* LEFT COLUMN: Luxury Ambient Showcase (Slides in from Left) */}
      <div className="hidden lg:flex lg:w-1/2 min-h-screen relative overflow-hidden bg-[#141313] z-10 border-r border-white/[0.08] animate-slide-left">
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

      {/* RIGHT COLUMN: Form Container (Slides in from Right) */}
      <div className="flex-1 flex flex-col justify-between w-full lg:w-1/2 min-h-screen relative bg-[#171412] z-10 animate-slide-right">
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

        {/* Main Form Content */}
        <main className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-14 xl:px-20 py-10 max-w-xl mx-auto w-full">
          {step === 'credentials' ? (
            /* STEP 1: Account Creation Form - EXACT MATCH TO SCREENSHOT */
            <div className="space-y-5 animate-fade-in">
              {/* Stepper Dash & Dots */}
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-1 rounded-full bg-[#eebd8e]" />
                <div className="w-1.5 h-1 rounded-full bg-white/20" />
                <div className="w-1.5 h-1 rounded-full bg-white/20" />
              </div>

              {/* Title & Subtitle */}
              <div>
                <h1 className="font-serif text-3xl sm:text-[38px] font-bold text-white tracking-tight leading-[1.12]">
                  Create your BrewPluse<br />
                  account<span className="text-[#eebd8e]">.</span>
                </h1>
                <p className="text-xs sm:text-[13px] text-[#a8a29e] font-sans leading-relaxed mt-2.5">
                  Set up your cafe operations, contactless ordering, and real-time counter billing.
                </p>
              </div>

              {step1Error && (
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{step1Error}</span>
                </div>
              )}

              <form onSubmit={handleCredentialsSubmit} className="space-y-4" noValidate>
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
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (step1Error) setStep1Error(null);
                      }}
                      placeholder="owner@yourcafe.com"
                      required
                      autoComplete="email"
                      className="w-full pl-11 pr-4 py-3 bg-[#221e1c] border border-white/10 rounded-2xl text-sm text-white placeholder-[#78716c] focus:outline-none focus:border-[#eebd8e] focus:bg-[#282321] transition-all font-medium"
                    />
                  </div>
                </div>

                {/* 2. PASSWORD */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#eebd8e] block">
                    PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#78716c] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (step1Error) setStep1Error(null);
                      }}
                      placeholder="At least 8 characters"
                      required
                      autoComplete="new-password"
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

                  {/* 4-point Checklist matching screenshot */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 pt-1.5 text-[11px]">
                    <span
                      className={`flex items-center gap-1.5 ${
                        password.length >= 8 ? 'text-emerald-400 font-medium' : 'text-[#8f8983]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          password.length >= 8 ? 'bg-emerald-400' : 'bg-[#57534e]'
                        }`}
                      />
                      8+ characters
                    </span>
                    <span
                      className={`flex items-center gap-1.5 ${
                        /[A-Z]/.test(password) ? 'text-emerald-400 font-medium' : 'text-[#8f8983]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          /[A-Z]/.test(password) ? 'bg-emerald-400' : 'bg-[#57534e]'
                        }`}
                      />
                      One uppercase
                    </span>
                    <span
                      className={`flex items-center gap-1.5 ${
                        /[0-9]/.test(password) ? 'text-emerald-400 font-medium' : 'text-[#8f8983]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          /[0-9]/.test(password) ? 'bg-emerald-400' : 'bg-[#57534e]'
                        }`}
                      />
                      One number
                    </span>
                    <span
                      className={`flex items-center gap-1.5 ${
                        /[^A-Za-z0-9]/.test(password) ? 'text-emerald-400 font-medium' : 'text-[#8f8983]'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          /[^A-Za-z0-9]/.test(password) ? 'bg-emerald-400' : 'bg-[#57534e]'
                        }`}
                      />
                      Special symbol
                    </span>
                  </div>
                </div>

                {/* 3. CONFIRM PASSWORD */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#eebd8e] block">
                    CONFIRM PASSWORD
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#78716c] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (step1Error) setStep1Error(null);
                      }}
                      placeholder="Re-enter your password"
                      required
                      autoComplete="new-password"
                      className={`w-full pl-11 pr-11 py-3 bg-[#221e1c] border rounded-2xl text-sm text-white placeholder-[#78716c] focus:outline-none focus:bg-[#282321] transition-all font-medium ${
                        confirmPassword && confirmPassword !== password
                          ? 'border-amber-400/60 focus:border-amber-400'
                          : 'border-white/10 focus:border-[#eebd8e]'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-neutral-300 transition-colors cursor-pointer"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {confirmPassword.length > 0 && (
                    <p
                      className={`flex items-center gap-1.5 text-[11px] font-medium pt-1 ${
                        confirmPassword === password ? 'text-[#10b981]' : 'text-amber-400'
                      }`}
                    >
                      {confirmPassword === password ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Passwords match</span>
                        </>
                      ) : (
                        <span>Passwords must match</span>
                      )}
                    </p>
                  )}
                </div>

                {/* 4. Terms & Privacy Checkbox */}
                <label className="flex items-start gap-2.5 pt-1 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (step1Error) setStep1Error(null);
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#221e1c] text-[#005c36] focus:ring-0 focus:ring-offset-0 cursor-pointer accent-[#eebd8e]"
                  />
                  <span className="text-xs text-[#a8a29e] leading-relaxed">
                    I agree to the{' '}
                    <Link
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#eebd8e] font-semibold hover:underline underline-offset-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#eebd8e] font-semibold hover:underline underline-offset-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {/* 5. Nominal Refundable Verification Card */}
                <div className="rounded-2xl border border-white/[0.08] bg-[#221e1c]/90 p-4 space-y-1.5 shadow-inner">
                  <div className="flex items-center gap-2 font-bold text-xs text-[#eebd8e]">
                    <ShieldCheck className="w-4 h-4 text-[#eebd8e]" />
                    <span>Nominal Refundable Verification</span>
                  </div>
                  <p className="text-[11px] text-[#a8a29e] leading-relaxed">
                    To prevent spam bots and ensure operational integrity, a nominal deposit (₹1.00) is verified during onboarding and is{' '}
                    <span className="text-[#10b981] font-semibold">100% automatically refunded</span> immediately.
                  </p>
                </div>

                {/* 6. Primary Action Button (Deep Forest Green with Sparkle) */}
                <button
                  type="submit"
                  disabled={step1Loading}
                  className="w-full py-3.5 px-4 bg-[#0c3821] hover:bg-[#0f4429] border border-[#144d2f] text-white font-bold text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step1Loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <span>Create account</span>
                      <span className="text-[#eebd8e] text-base">✦</span>
                    </>
                  )}
                </button>

                {/* OR Divider */}
                <div className="relative flex items-center justify-center my-4">
                  <div className="w-full border-t border-white/[0.08]" />
                  <span className="absolute bg-[#171412] px-3 text-[10px] font-mono uppercase tracking-wider text-[#78716c]">
                    OR
                  </span>
                </div>

                {/* Google Sign-in Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
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

              {/* Bottom Login Link */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#a8a29e]">
                <span>Already have an account?</span>
                <Link
                  href="/login"
                  className="font-bold text-white hover:text-[#eebd8e] transition-colors"
                >
                  Log in &rarr;
                </Link>
              </div>
            </div>
          ) : (
            /* STEP 2: Email OTP Verification */
            <div className="space-y-6 animate-fade-in">
              <div>
                <h1 className="font-serif text-3xl sm:text-[38px] font-bold text-white tracking-tight leading-[1.12]">
                  Verify your email<span className="text-[#eebd8e]">.</span>
                </h1>
                <p className="text-xs sm:text-[13px] text-[#a8a29e] font-sans leading-relaxed mt-2.5">
                  Enter the 6-digit code sent to{' '}
                  <strong className="text-white font-mono">{email}</strong>.
                </p>
              </div>

              {step2Error && (
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{step2Error}</span>
                </div>
              )}

              <form onSubmit={handleOtpFormSubmit} className="space-y-6" noValidate>
                {/* 6 Segmented Digit Boxes */}
                <div className="flex justify-center gap-2.5 sm:gap-3 py-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => {
                        otpInputRefs.current[idx] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className={`w-11 sm:w-13 h-14 sm:h-16 text-center text-2xl font-mono font-bold rounded-2xl border transition-all focus:outline-none ${
                        digit
                          ? 'border-[#eebd8e] bg-white/[0.08] text-white shadow-sm'
                          : 'border-white/10 bg-[#221e1c] text-neutral-300 focus:border-[#eebd8e] focus:bg-[#282321]'
                      }`}
                    />
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={otpDigits.join('').length < 6 || step2Loading}
                    className="w-full py-3.5 px-4 bg-[#0c3821] hover:bg-[#0f4429] border border-[#144d2f] text-white font-bold text-sm rounded-full shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {step2Loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Bottom Resend and Change Email Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/[0.06] text-xs">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={countdown > 0 || step2Resending}
                  className="text-neutral-300 hover:text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {step2Resending ? (
                    'Sending new code...'
                  ) : countdown > 0 ? (
                    <span>
                      Didn&apos;t receive it?{' '}
                      <span className="text-[#eebd8e] font-mono">Resend in {countdown}s</span>
                    </span>
                  ) : (
                    <span className="text-[#eebd8e] underline underline-offset-2">
                      Resend code
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep('credentials')}
                  className="text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
                >
                  &larr; Change email
                </button>
              </div>
            </div>
          )}
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
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#171412] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-[#eebd8e]" />
        </div>
      }
    >
      <SignupFormContent />
    </Suspense>
  );
}
