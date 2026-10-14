'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Coffee,
  ShieldCheck,
  CreditCard,
  MapPin,
  Navigation,
  Upload,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Check,
  AlertCircle,
  RefreshCw,
  LogOut,
  Sparkles,
  Printer,
  ChevronRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useToast } from '@/components/Toast';
import { onAuthChange, logoutUser } from '@/lib/firebaseAuth';

type SetupStepId = 'payment' | 'business' | 'location' | 'preferences';
type InternalState =
  | 'PAYMENT'
  | 'CAFE_NAME'
  | 'OWNER_NAME'
  | 'CAFE_LOGO'
  | 'MAP_LOCATION'
  | 'GEOFENCING'
  | 'REVIEW'
  | 'COMPLETED';

interface StepDef {
  id: SetupStepId;
  label: string;
  states: InternalState[];
}

const STEPS: StepDef[] = [
  { id: 'payment', label: 'Payment', states: ['PAYMENT'] },
  { id: 'business', label: 'Business', states: ['CAFE_NAME', 'OWNER_NAME', 'CAFE_LOGO'] },
  { id: 'location', label: 'Location', states: ['MAP_LOCATION'] },
  { id: 'preferences', label: 'Preferences', states: ['GEOFENCING'] },
];

function loadRazorpayCheckoutScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).Razorpay) return resolve(true);
    const existing = document.getElementById('razorpay-checkout-js');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-checkout-js';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function SetupPage() {
  const router = useRouter();
  const toast = useToast();

  const [currentState, setCurrentState] = useState<InternalState>('PAYMENT');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  // Payment states
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  // Form Data
  const [cafeName, setCafeName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [cafeLogo, setCafeLogo] = useState(
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80'
  );
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [detectingGps, setDetectingGps] = useState(false);
  const [geofenceRadius, setGeofenceRadius] = useState<number>(500);
  const [gpsEnabled, setGpsEnabled] = useState(true);
  const [paperWidth, setPaperWidth] = useState<'58mm' | '80mm'>('80mm');
  const [referralCode, setReferralCode] = useState<string>('');
  const [launching, setLaunching] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Cover presets
  const presetLogos = [
    {
      title: 'Artisanal Roastery',
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Scandinavian Minimalist',
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Espresso Bar',
      url: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Garden Patio',
      url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    },
  ];

  // Load user details & strictly verify payment with server
  useEffect(() => {
    let email = '';
    let uid = '';

    try {
      const activeUser = localStorage.getItem('brewpluse::active_user');
      if (activeUser) {
        const parsed = JSON.parse(activeUser);
        if (parsed.email) {
          email = parsed.email;
          setUserEmail(parsed.email);
        }
        if (parsed.displayName) setOwnerName(parsed.displayName);
        if (parsed.uid) {
          uid = parsed.uid;
          setUserId(parsed.uid);
        }
      }
      const ref = localStorage.getItem('brewpluse_signup_referral_code');
      if (ref) setReferralCode(ref.toUpperCase());
    } catch (e) {}

    // Strictly verify against backend - never trust unverified localStorage alone
    if (email || uid) {
      fetch(
        `/api/payments/razorpay/verify-setup?email=${encodeURIComponent(email)}&uid=${encodeURIComponent(uid)}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.verified === true) {
            setPaymentVerified(true);
            localStorage.setItem('brewpluse::payment_verified', 'true');
          } else {
            setPaymentVerified(false);
            localStorage.removeItem('brewpluse::payment_verified');
            setCurrentState('PAYMENT');
          }
        })
        .catch(() => {
          setPaymentVerified(false);
          localStorage.removeItem('brewpluse::payment_verified');
          setCurrentState('PAYMENT');
        });
    } else {
      setPaymentVerified(false);
      localStorage.removeItem('brewpluse::payment_verified');
      setCurrentState('PAYMENT');
    }

    const unsubscribe = onAuthChange((user) => {
      if (user) {
        if (user.email) setUserEmail(user.email);
        if (user.displayName && !ownerName) setOwnerName(user.displayName);
        if (user.uid) setUserId(user.uid);
      }
    });

    // Preload Razorpay Checkout SDK
    loadRazorpayCheckoutScript();

    return () => unsubscribe();
  }, []);

  // Strict Security Gate: Bina verified payment ke business setup page access nahi ho sakta
  useEffect(() => {
    if (!paymentVerified && currentState !== 'PAYMENT') {
      setCurrentState('PAYMENT');
    }
  }, [currentState, paymentVerified]);

  // Compute active sidebar step index (0 to 3)
  const currentStepIndex = STEPS.findIndex((s) => s.states.includes(currentState));
  const activeStepIdx = currentStepIndex >= 0 ? currentStepIndex : 0;
  const isReviewOrCompleted = currentState === 'REVIEW' || currentState === 'COMPLETED';

  // Handle ₹1 Verification Payment via real Razorpay
  async function handleVerifyPayment() {
    setPaymentProcessing(true);
    setVerificationError(null);

    const scriptLoaded = await loadRazorpayCheckoutScript();
    if (!scriptLoaded) {
      setPaymentProcessing(false);
      setVerificationError('Razorpay Checkout failed to load. Check your internet connection.');
      toast.error('Razorpay SDK Error', {
        description: 'Failed to load Razorpay checkout script.',
      });
      return;
    }

    try {
      const res = await fetch('/api/payments/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 1,
          currency: 'INR',
          receipt: `bp_setup_${Date.now()}`,
          notes: { email: userEmail, purpose: 'Mobile Account Verification' },
        }),
      });

      const orderData = await res.json();
      if (!res.ok || !orderData.orderId) {
        setPaymentProcessing(false);
        const errMsg = orderData.error || 'Failed to create Razorpay verification order.';
        setVerificationError(errMsg);
        toast.error('Order Error', { description: errMsg });
        return;
      }

      // Check if real keys are configured
      if (orderData.keyId === 'rzp_test_placeholder' || !orderData.keyId) {
        setPaymentProcessing(false);
        const keyMsg =
          'Razorpay API key (RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET) is not configured in .env.local. Please add your Razorpay keys to process live ₹1.00 verification.';
        setVerificationError(keyMsg);
        toast.error('Razorpay Gateway Not Configured', {
          description: 'Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local to enable real payments.',
        });
        return;
      }

      if (typeof window === 'undefined' || !(window as any).Razorpay) {
        setPaymentProcessing(false);
        setVerificationError('Razorpay runtime not ready. Please try again.');
        return;
      }

      const rzp = new (window as any).Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'BrewPluse Account Verification',
        description: 'Account verification (₹1.00)',
        image: '/icon.png',
        order_id: orderData.orderId,
        prefill: {
          email: userEmail || '',
          contact: '',
        },
        theme: { color: '#875200' },
        handler: async function (response: any) {
          try {
            // Verify payment signature on the server
            const verifyRes = await fetch('/api/payments/razorpay/verify-setup', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                email: userEmail,
                uid: userId,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.verified) {
              setPaymentProcessing(false);
              setPaymentVerified(true);
              localStorage.setItem('brewpluse::payment_verified', 'true');
              toast.success('Account verified successfully!', {
                description: 'Verification payment of ₹1.00 confirmed and recorded.',
              });
              setTimeout(() => {
                setCurrentState('CAFE_NAME');
              }, 600);
            } else {
              setPaymentProcessing(false);
              setVerificationError(verifyData.error || 'Payment signature verification failed.');
              toast.error('Verification Failed', {
                description: verifyData.error || 'Server rejected payment signature.',
              });
            }
          } catch (vErr: any) {
            setPaymentProcessing(false);
            setVerificationError(vErr.message);
            toast.error('Verification Error', { description: vErr.message });
          }
        },
        modal: {
          ondismiss: function () {
            setPaymentProcessing(false);
            toast.info('Verification Cancelled', {
              description: 'Payment was not completed. You must verify with ₹1.00 to continue setup.',
            });
          },
        },
      });

      rzp.on('payment.failed', function (resp: any) {
        setPaymentProcessing(false);
        const failDesc = resp.error?.description || 'Transaction declined.';
        setVerificationError(failDesc);
        toast.error('Payment Failed', { description: failDesc });
      });

      rzp.open();
    } catch (err: any) {
      setPaymentProcessing(false);
      setVerificationError(err.message || 'Payment initiation failed.');
      toast.error('Payment Error', { description: err.message });
    }
  }

  // Handle "Already completed payment? Check status" strictly via server check
  async function handleCheckStatus() {
    setCheckingStatus(true);
    setVerificationError(null);

    const email = userEmail || '';
    const uid = userId || '';

    if (!email && !uid) {
      setCheckingStatus(false);
      toast.error('Account Not Found', {
        description: 'Please login or enter your account details first.',
      });
      return;
    }

    try {
      const res = await fetch(
        `/api/payments/razorpay/verify-setup?email=${encodeURIComponent(email)}&uid=${encodeURIComponent(uid)}`
      );
      const data = await res.json();

      if (res.ok && data.verified === true) {
        setPaymentVerified(true);
        localStorage.setItem('brewpluse::payment_verified', 'true');
        toast.success('Account verification confirmed!', {
          description: `Payment ID: ${data.paymentId || 'verified'}`,
        });
        setTimeout(() => {
          setCurrentState('CAFE_NAME');
        }, 500);
      } else {
        // Strict denial: No fake pass!
        setPaymentVerified(false);
        localStorage.removeItem('brewpluse::payment_verified');
        setVerificationError(
          data.message || 'No completed ₹1.00 verification payment found for this account.'
        );
        toast.error('Payment Not Verified', {
          description:
            data.message || 'No payment record found. Please click "Verify with ₹1.00" to complete payment.',
        });
        setCurrentState('PAYMENT');
      }
    } catch (err: any) {
      setPaymentVerified(false);
      localStorage.removeItem('brewpluse::payment_verified');
      setVerificationError('Could not verify status. Please check your network connection.');
      toast.error('Status Check Failed', {
        description: 'Unable to connect to verification server.',
      });
      setCurrentState('PAYMENT');
    } finally {
      setCheckingStatus(false);
    }
  }

  // Clear dummy data and reset setup state
  async function handleClearDummyData() {
    try {
      localStorage.removeItem('brewpluse::payment_verified');
      const email = userEmail || '';
      const uid = userId || '';
      if (email || uid) {
        await fetch(
          `/api/payments/razorpay/verify-setup?email=${encodeURIComponent(email)}&uid=${encodeURIComponent(uid)}`,
          { method: 'DELETE' }
        );
      }
      setPaymentVerified(false);
      setCurrentState('PAYMENT');
      setVerificationError(null);
      toast.success('Test verification data cleared!', {
        description: 'All local and database payment flags for this account have been reset.',
      });
    } catch (e: any) {
      localStorage.removeItem('brewpluse::payment_verified');
      setPaymentVerified(false);
      setCurrentState('PAYMENT');
      toast.success('Local cache cleared.');
    }
  }

  // Handle GPS detection
  function handleDetectGps() {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(Number(pos.coords.latitude.toFixed(6)));
        setLongitude(Number(pos.coords.longitude.toFixed(6)));
        setDetectingGps(false);
        toast.success('GPS coordinates locked!', {
          description: `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`,
        });
      },
      (err) => {
        setDetectingGps(false);
        console.warn('GPS fallback:', err);
        setLatitude(12.9716);
        setLongitude(77.5946);
        toast.success('Default location coordinates applied (12.9716, 77.5946)');
      },
      { timeout: 7000 }
    );
  }

  // Handle custom image upload
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be under 5MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setCafeLogo(event.target.result as string);
          toast.success('Store logo updated!');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Final Launch Cafe
  async function handleLaunchCafe() {
    setLaunching(true);
    const storeTitle = cafeName.trim() || 'My BrewPluse Café';
    const cleanSlug =
      storeTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') || 'my-cafe';

    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail || 'owner@brewpluse.com',
          businessName: storeTitle,
          address: address.trim() || '100ft Main Road, Floor 1',
          imageUrl: cafeLogo,
          latitude: latitude || 12.9716,
          longitude: longitude || 77.5946,
          gpsRadiusMeters: gpsEnabled ? geofenceRadius : 500,
          paperSize: paperWidth,
          paymentVerified: true,
          referralCode: referralCode || undefined,
        }),
      });

      const data = await res.json();
      const finalSlug = data.store?.slug || cleanSlug;

      try {
        localStorage.setItem('brewpluse::store_slug', finalSlug);
        localStorage.setItem(
          'brewpluse::store_profile',
          JSON.stringify({
            name: storeTitle,
            slug: finalSlug,
            ownerName,
            address: address.trim(),
            imageUrl: cafeLogo,
            latitude: latitude || 12.9716,
            longitude: longitude || 77.5946,
            gpsRadius: geofenceRadius,
            paperWidth,
            setupCompleted: true,
          })
        );
      } catch (err) {}

      setCurrentState('COMPLETED');
      toast.success('Welcome to BrewPluse!', {
        description: `${storeTitle} is now live and ready to take orders.`,
      });

      setTimeout(() => {
        router.push(`/dashboard/${finalSlug}`);
      }, 800);
    } catch (err: any) {
      toast.error(err.message || 'Failed to activate workspace.');
      setLaunching(false);
    }
  }

  // Logout handler
  async function handleLogout() {
    try {
      await logoutUser();
      toast.success('Logged out successfully.');
      router.push('/login');
    } catch (err) {
      router.push('/login');
    }
  }

  return (
    <main className="font-sans text-[#1e1b14] overflow-hidden selection:bg-[#875200]/20 selection:text-[#eebd8e] min-h-screen relative bg-[#141313] flex flex-col justify-between">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-[#875200]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen w-full">
        {/* LEFT SIDEBAR: Matches CafeFlow & User Screenshot Exactly */}
        <div className="lg:w-[35%] xl:w-[30%] bg-[#1a1715] border-r border-white/5 p-8 lg:p-12 flex flex-col justify-between relative z-20 min-h-[30vh] lg:min-h-screen">
          <div>
            {/* Logo and Wordmark */}
            <Link
              href="/"
              className="flex items-center gap-3 mb-12 lg:mb-16 group w-fit"
              title="BrewPluse Home"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#1e1b14] border border-white/5 flex items-center justify-center text-[#eebd8e] shadow-sm group-hover:scale-105 transition-transform">
                <Coffee className="h-5 w-5 text-[#eebd8e]" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-white mb-0.5">
                  BrewPluse
                </span>
                <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                  Workspace Setup
                </span>
              </div>
            </Link>

            {/* Desktop Stepper */}
            {!isReviewOrCompleted && (
              <div className="hidden lg:block space-y-8">
                <h3 className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mb-6">
                  Setup Progress
                </h3>
                <div className="flex flex-col gap-6 relative">
                  {/* Vertical connecting line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />

                  {STEPS.map((step, idx) => {
                    const isCompleted =
                      (step.id === 'payment' && paymentVerified) ||
                      (step.id === 'business' && Boolean(cafeName.trim()) && idx < activeStepIdx) ||
                      idx < activeStepIdx;
                    const isCurrent = idx === activeStepIdx;
                    const isLocked = step.id !== 'payment' && !paymentVerified;

                    return (
                      <button
                        key={step.id}
                        type="button"
                        disabled={isLocked}
                        onClick={() => {
                          if (step.id === 'payment') {
                            setCurrentState('PAYMENT');
                          } else if (!paymentVerified) {
                            toast.error('Payment Verification Required', {
                              description: 'Pehle ₹1.00 verification payment complete karein.',
                            });
                          } else {
                            if (step.id === 'business') setCurrentState('CAFE_NAME');
                            else if (step.id === 'location') setCurrentState('MAP_LOCATION');
                            else if (step.id === 'preferences') setCurrentState('GEOFENCING');
                          }
                        }}
                        className={`flex items-center gap-4 relative z-10 text-left focus:outline-none transition-all w-full ${
                          isLocked
                            ? 'opacity-40 cursor-not-allowed'
                            : 'cursor-pointer group'
                        }`}
                      >
                        <div
                          className={`w-[15px] h-[15px] rounded-full flex items-center justify-center border-2 transition-colors shrink-0 ${
                            isCompleted
                              ? 'bg-[#875200] border-[#875200]'
                              : isCurrent
                              ? 'bg-[#1a1715] border-[#eebd8e]'
                              : 'bg-[#1a1715] border-white/10 group-hover:border-white/30'
                          }`}
                        >
                          {isCompleted ? (
                            <span className="text-[9px] text-white font-bold leading-none">✓</span>
                          ) : isCurrent ? (
                            <div className="w-1.5 h-1.5 rounded-full bg-[#eebd8e]" />
                          ) : null}
                        </div>
                        <span
                          className={`text-sm font-bold tracking-wide transition-colors flex items-center justify-between flex-1 ${
                            isCompleted
                              ? 'text-neutral-300'
                              : isCurrent
                              ? 'text-white'
                              : 'text-neutral-600 group-hover:text-neutral-400'
                          }`}
                        >
                          <span>{step.label}</span>
                          {isLocked && <Lock className="w-3 h-3 text-neutral-500" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Mobile Stepper Pill */}
            {!isReviewOrCompleted && (
              <div className="lg:hidden flex items-center justify-between w-full">
                <span className="text-[10px] font-bold text-[#eebd8e] uppercase tracking-widest">
                  Step {Math.max(1, activeStepIdx + 1)} of {STEPS.length} —{' '}
                  {STEPS[activeStepIdx]?.label}
                </span>
                <div className="flex items-center gap-1">
                  {STEPS.map((step, idx) => (
                    <div
                      key={step.id}
                      className={`h-1 rounded-full transition-all ${
                        idx < activeStepIdx
                          ? 'bg-[#875200] w-2'
                          : idx === activeStepIdx
                          ? 'bg-[#eebd8e] w-4'
                          : 'bg-white/10 w-2'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Left Footer */}
          <div className="hidden lg:block text-xs font-medium text-neutral-600">
            BrewPluse Executive Portal &copy; {new Date().getFullYear()}
          </div>
        </div>

        {/* RIGHT CONTENT AREA: Exact Match */}
        <div className="lg:w-[65%] xl:w-[70%] flex flex-col p-8 lg:p-16 xl:p-24 justify-center relative z-10">
          {/* STEP 1: PAYMENT (Exact match with user screenshot) */}
          {currentState === 'PAYMENT' && (
            <div className="flex flex-col w-full h-full justify-center max-w-lg animate-fade-in">
              <div className="mb-6 text-neutral-400 text-sm font-medium whitespace-pre-wrap max-w-lg space-y-1">
                <p>
                  Welcome to BrewPluse! <span className="inline-block">👋</span>
                </p>
                <p>
                  I see you&apos;re logged in as{' '}
                  <strong className="text-white font-mono font-bold">
                    {userEmail || 'ashish.maajankiweb@gmail.com'}
                  </strong>
                  .
                </p>
                <p>Let&apos;s set up your cafe.</p>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-6">
                Verify Your Account
              </h2>

              <div className="space-y-4 w-full">
                <div className="rounded-2xl border border-[#875200]/30 bg-[#1e1b14] p-5 text-xs text-neutral-300 space-y-3.5 shadow-inner">
                  <div className="flex items-center gap-2.5 text-white font-bold text-sm">
                    <ShieldCheck className="w-5 h-5 text-[#eebd8e]" />
                    <span>Account Verification Required</span>
                  </div>

                  <p className="text-neutral-300 text-xs leading-relaxed">
                    To prevent spam, fake registrations, and automated bot accounts, BrewPluse
                    requires a nominal one-time mobile verification payment before launching your
                    cafe.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-neutral-300">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">🛡️</span>
                      <span>
                        <strong className="text-white">Anti-Abuse Protection</strong>
                        <br />
                        <span className="text-neutral-400">
                          Restricts fake &amp; unauthorized accounts.
                        </span>
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2">
                      <span className="text-amber-400 font-bold">💸</span>
                      <span>
                        <strong className="text-white">100% Auto-Refunded</strong>
                        <br />
                        <span className="text-neutral-400">
                          Instantly credited back to your account.
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Account Email:</span>
                      <span className="font-bold text-white">
                        {userEmail || 'ashish.maajankiweb@gmail.com'}
                      </span>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                      <span>Verification Charge:</span>
                      <span className="font-bold text-[#eebd8e]">
                        ₹1.00 (Refunded Automatically)
                      </span>
                    </div>
                  </div>
                </div>

                {verificationError && (
                  <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs font-semibold text-red-300 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                    <span>{verificationError}</span>
                  </div>
                )}

                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={handleVerifyPayment}
                    disabled={paymentProcessing}
                    className="flex w-full h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#875200] via-[#a06200] to-[#875200] text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-[#875200]/30 hover:brightness-110 active:scale-[0.98] transition cursor-pointer disabled:opacity-60"
                  >
                    {paymentProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Verifying Payment...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-4 w-4" />
                        <span>Verify with ₹1.00</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCheckStatus}
                    disabled={checkingStatus}
                    className="w-full text-center py-2 text-xs text-neutral-400 hover:text-white transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className={`h-3 w-3 ${checkingStatus ? 'animate-spin' : ''}`} />
                    <span>Already completed payment? Check status</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearDummyData}
                    className="w-full text-center py-1.5 text-[11px] text-neutral-500 hover:text-red-400 transition cursor-pointer"
                  >
                    Clear cached test data &amp; reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2A: CAFE NAME */}
          {currentState === 'CAFE_NAME' && (
            <div className="flex flex-col w-full h-full justify-center max-w-lg animate-fade-in space-y-6">
              <div className="space-y-1">
                <p className="text-neutral-400 text-sm font-medium">
                  Welcome to BrewPluse! <span className="inline-block">👋</span>
                  <br />
                  Let&apos;s set up your new cafe workspace in just a couple of minutes.
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight pt-2">
                  What should we call your cafe?
                </h2>
              </div>

              <div className="space-y-4">
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    value={cafeName}
                    autoFocus
                    onChange={(e) => setCafeName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && cafeName.trim()) {
                        setCurrentState('OWNER_NAME');
                      }
                    }}
                    placeholder="Enter your cafe name..."
                    className="w-full h-14 bg-[#1e1b14] border border-white/10 rounded-2xl px-6 pr-14 text-base sm:text-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#eebd8e] transition-all shadow-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (cafeName.trim()) setCurrentState('OWNER_NAME');
                    }}
                    disabled={!cafeName.trim()}
                    className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-xl bg-[#875200] text-white hover:bg-[#a06200] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 px-2">
                  <span>Press Enter ↵</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCafeName('My BrewPluse Café');
                      setCurrentState('OWNER_NAME');
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Skip for now &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2B: OWNER NAME */}
          {currentState === 'OWNER_NAME' && (
            <div className="flex flex-col w-full h-full justify-center max-w-lg animate-fade-in space-y-6">
              <div className="space-y-1">
                <p className="text-neutral-400 text-sm font-medium">
                  Nice choice ☕
                  <br />
                  I&apos;ll use <strong className="text-white">{cafeName}</strong> as your cafe name.
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight pt-2">
                  And what is the owner&apos;s full name?
                </h2>
              </div>

              <div className="space-y-4">
                <div className="relative flex items-center w-full">
                  <input
                    type="text"
                    value={ownerName}
                    autoFocus
                    onChange={(e) => setOwnerName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setCurrentState('CAFE_LOGO');
                    }}
                    placeholder="Enter owner full name..."
                    className="w-full h-14 bg-[#1e1b14] border border-white/10 rounded-2xl px-6 pr-14 text-base sm:text-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#eebd8e] transition-all shadow-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setCurrentState('CAFE_LOGO')}
                    className="absolute right-2 w-10 h-10 flex items-center justify-center rounded-xl bg-[#875200] text-white hover:bg-[#a06200] transition-all cursor-pointer"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-500 px-2">
                  <button
                    type="button"
                    onClick={() => setCurrentState('CAFE_NAME')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    &larr; Back to Cafe Name
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentState('CAFE_LOGO')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Skip for now &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2C: CAFE LOGO */}
          {currentState === 'CAFE_LOGO' && (
            <div className="flex flex-col w-full h-full justify-center max-w-lg animate-fade-in space-y-6">
              <div className="space-y-1">
                <p className="text-neutral-400 text-sm font-medium">
                  Nice to meet you, <strong className="text-white">{ownerName || 'Partner'}</strong>.
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Do you have a cover photo or logo for {cafeName}?
                </h2>
              </div>

              <div className="space-y-4">
                {/* Selected Preview Banner */}
                <div className="relative h-36 w-full rounded-2xl overflow-hidden border border-white/10">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${cafeLogo}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-mono font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                    Storefront Header Preview
                  </span>
                </div>

                {/* 4 Presets */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {presetLogos.map((p) => (
                    <button
                      key={p.title}
                      type="button"
                      onClick={() => setCafeLogo(p.url)}
                      className={`relative h-16 rounded-xl overflow-hidden border text-left transition-all cursor-pointer ${
                        cafeLogo === p.url
                          ? 'border-[#eebd8e] ring-2 ring-[#eebd8e]/40'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${p.url}')` }}
                      />
                      <div className="absolute inset-0 bg-black/50" />
                      <span className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-bold text-white truncate block">
                        {p.title}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-xs font-bold text-[#eebd8e] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Custom Photo</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setCurrentState('OWNER_NAME')}
                    className="h-12 px-6 rounded-full border border-white/10 hover:border-white/30 text-white font-semibold text-xs transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentState('MAP_LOCATION')}
                    className="flex-1 h-12 rounded-full bg-[#875200] hover:bg-[#a06200] text-white font-bold text-xs uppercase tracking-wider transition active:scale-[0.98] shadow-lg shadow-[#875200]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Confirm &amp; Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: MAP LOCATION */}
          {currentState === 'MAP_LOCATION' && (
            <div className="flex flex-col w-full h-full justify-center max-w-lg animate-fade-in space-y-6">
              <div className="space-y-1">
                <p className="text-neutral-400 text-sm font-medium">
                  Let&apos;s pinpoint your cafe on the map using your device GPS.
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Where is {cafeName || 'your cafe'} located?
                </h2>
              </div>

              <div className="space-y-4">
                <div className="w-full rounded-2xl border border-[#875200]/30 bg-[#1e1b14] p-5 text-center space-y-3 shadow-inner">
                  <div className="w-12 h-12 rounded-2xl bg-[#875200]/10 border border-[#875200]/30 flex items-center justify-center text-[#eebd8e] mx-auto shadow-sm">
                    <Navigation className="h-6 w-6 text-[#eebd8e]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      STORE LOCATION &amp; GPS PIN
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                      Pinpoint your cafe location with one click using your device GPS.
                    </p>
                  </div>

                  {latitude !== null && (
                    <div className="text-xs font-mono text-[#eebd8e] font-bold p-2 rounded-lg bg-black/40 border border-white/5">
                      GPS Locked: {latitude}, {longitude}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleDetectGps}
                    disabled={detectingGps}
                    className="w-full flex items-center justify-center gap-2.5 h-12 rounded-full bg-gradient-to-r from-[#875200] via-[#a06200] to-[#875200] text-white font-bold text-xs uppercase tracking-wider transition active:scale-[0.98] shadow-lg shadow-[#875200]/30 hover:brightness-110 disabled:opacity-60 cursor-pointer"
                  >
                    {detectingGps ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Pinpointing Location...</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="h-4 w-4 text-white" />
                        <span>USE MY CURRENT LOCATION</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Optional manual address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-mono">
                    Street Address (Optional)
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 100ft Road, Indiranagar, Bengaluru, KA"
                    className="w-full h-12 bg-[#1e1b14] border border-white/10 rounded-xl px-4 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#eebd8e] transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentState('CAFE_LOGO')}
                    className="h-12 px-6 rounded-full border border-white/10 hover:border-white/30 text-white font-semibold text-xs transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentState('GEOFENCING')}
                    className="flex-1 h-12 rounded-full bg-[#875200] hover:bg-[#a06200] text-white font-bold text-xs uppercase tracking-wider transition active:scale-[0.98] shadow-lg shadow-[#875200]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Confirm Location &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: GEOFENCING & PREFERENCES */}
          {currentState === 'GEOFENCING' && (
            <div className="flex flex-col w-full h-full justify-center max-w-lg animate-fade-in space-y-6">
              <div className="space-y-1">
                <p className="text-neutral-400 text-sm font-medium">
                  One last setting.
                  <br />
                  Your cafe location will use a{' '}
                  <strong className="text-white">{geofenceRadius}-meter</strong> GPS radius.
                  Customers outside this area won&apos;t be able to place table orders.
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight pt-2">
                  Ordering &amp; Hardware Preferences
                </h2>
              </div>

              <div className="space-y-5">
                {/* Geofence verification box */}
                <div className="w-full rounded-2xl border border-white/10 bg-[#1e1b14] p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-sm">GPS Dine-In Verification</span>
                    <button
                      type="button"
                      onClick={() => setGpsEnabled(!gpsEnabled)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                        gpsEnabled
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {gpsEnabled ? 'ACTIVE' : 'DISABLED'}
                    </button>
                  </div>

                  {gpsEnabled && (
                    <div className="space-y-2">
                      <span className="text-xs text-neutral-400 font-mono">Radius</span>
                      <div className="flex flex-wrap gap-2">
                        {[100, 250, 500, 1000, 2000].map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setGeofenceRadius(r)}
                            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              geofenceRadius === r
                                ? 'bg-[#875200] text-white shadow-md'
                                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {r >= 1000 ? `${r / 1000} km` : `${r} m`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Thermal Printer Size */}
                <div className="w-full rounded-2xl border border-white/10 bg-[#1e1b14] p-5 space-y-3">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Printer className="w-4 h-4 text-[#eebd8e]" />
                    <span>Thermal Printer Size</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaperWidth('58mm')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paperWidth === '58mm'
                          ? 'border-[#eebd8e] bg-[#eebd8e]/10 text-white'
                          : 'border-white/5 bg-white/5 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <p className="text-xs font-bold text-white">58mm Portable</p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">Compact Bluetooth</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaperWidth('80mm')}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        paperWidth === '80mm'
                          ? 'border-[#eebd8e] bg-[#eebd8e]/10 text-white'
                          : 'border-white/5 bg-white/5 text-neutral-400 hover:border-white/20'
                      }`}
                    >
                      <p className="text-xs font-bold text-white">80mm Standard POS</p>
                      <p className="text-[10px] text-neutral-500 mt-0.5">High-speed counter</p>
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentState('MAP_LOCATION')}
                    className="h-12 px-6 rounded-full border border-white/10 hover:border-white/30 text-white font-semibold text-xs transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentState('REVIEW')}
                    className="flex-1 h-12 rounded-full bg-[#875200] hover:bg-[#a06200] text-white font-bold text-xs uppercase tracking-wider transition active:scale-[0.98] shadow-lg shadow-[#875200]/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Review &amp; Launch &rarr;</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW SUMMARY (Exact match with CafeFlow) */}
          {currentState === 'REVIEW' && (
            <div className="flex flex-col w-full h-full justify-center max-w-lg animate-fade-in space-y-6">
              <div className="space-y-1">
                <p className="text-neutral-400 text-sm font-medium">
                  Almost done! 🎉
                  <br />
                  Here&apos;s what I&apos;ve set up for you.
                </p>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  Ready to launch?
                </h2>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-[#1e1b14] border border-white/5 w-full">
                  <h3 className="text-xs uppercase tracking-wider font-bold text-[#eebd8e] mb-4">
                    Workspace Summary
                  </h3>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500 font-medium">Account Status</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500 font-medium">Cafe Name</span>
                      <span className="text-white font-bold">{cafeName || 'My Cafe'}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500 font-medium">Owner</span>
                      <span className="text-white font-bold">{ownerName || 'Partner'}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500 font-medium">Location</span>
                      <span className="text-white font-bold">
                        {address || (latitude ? `GPS (${latitude}, ${longitude})` : 'India')}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-2">
                      <span className="text-neutral-500 font-medium">Printer Size</span>
                      <span className="text-white font-bold">{paperWidth}</span>
                    </div>
                    {referralCode && (
                      <div className="flex justify-between pb-1">
                        <span className="text-neutral-500 font-medium">Partner Referral</span>
                        <span className="text-emerald-400 font-mono font-bold">{referralCode}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentState('GEOFENCING')}
                    className="h-12 px-6 rounded-full border border-white/10 hover:border-white/30 text-white font-semibold text-xs transition cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={launching}
                    onClick={handleLaunchCafe}
                    className="flex-1 h-12 rounded-full bg-[#875200] hover:bg-[#a06200] text-white font-bold text-sm uppercase tracking-wider transition active:scale-[0.98] shadow-lg shadow-[#875200]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {launching ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                        <span>Opening your workspace...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        <span>Launch Workspace</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* COMPLETED: REDIRECTING */}
          {currentState === 'COMPLETED' && (
            <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto my-auto py-20 animate-fade-in text-center">
              <Loader2 className="h-8 w-8 text-[#eebd8e] animate-spin mb-4" />
              <p className="text-white text-base font-semibold">Opening your workspace...</p>
              <p className="text-neutral-500 text-xs mt-1">Redirecting to dashboard</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom-Right Sign Out Button (Exact match with CafeFlow) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#1a1715] border border-white/5 text-neutral-500 hover:text-white hover:border-white/20 transition-all shadow-sm cursor-pointer"
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </main>
  );
}
