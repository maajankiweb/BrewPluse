'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Coffee,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  CreditCard,
  MapPin,
  Navigation,
  Upload,
  ArrowRight,
  Loader2,
  Sparkles,
  Store,
  Check,
  AlertCircle,
  Radio,
  Image as ImageIcon,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function SetupPage() {
  const router = useRouter();
  const toast = useToast();

  const [activeStep, setActiveStep] = useState<1 | 2>(1);
  const [currentUserEmail, setCurrentUserEmail] = useState<string>('');

  // STEP 1: ₹1 Payment Verification State
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [txnId, setTxnId] = useState<string>('');

  // STEP 2: Café Details State
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>(
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80'
  );
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [detectingGps, setDetectingGps] = useState(false);
  const [gpsRadius, setGpsRadius] = useState<number>(100);
  const [paperWidth, setPaperWidth] = useState<'58mm' | '80mm'>('80mm');
  const [savingSetup, setSavingSetup] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pre-configured cover presets
  const presetImages = [
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

  // Geofence radius options
  const radiusOptions = [
    { value: 50, label: '50m', desc: 'Single Counter / Kiosk' },
    { value: 100, label: '100m', desc: 'Standard Café (Recommended)' },
    { value: 200, label: '200m', desc: 'Patio & Outdoor Dining' },
    { value: 500, label: '500m', desc: 'Campus & Food Court' },
  ];

  useEffect(() => {
    try {
      const activeUser = localStorage.getItem('brewpluse::active_user');
      if (activeUser) {
        const parsed = JSON.parse(activeUser);
        if (parsed.email) {
          setCurrentUserEmail(parsed.email);
        }
      }
    } catch (e) {}

    // Generate random txn reference
    setTxnId(`BP-${Math.floor(100000 + Math.random() * 900000)}`);
  }, []);

  // Handle ₹1 payment simulation
  function handleConfirmPayment() {
    setPaymentProcessing(true);
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      toast.success('₹1 Token Verified!', {
        description: 'Payment settlement channel activated for your merchant account.',
      });
      // Automatically advance to Step 2 after 1 second
      setTimeout(() => {
        setActiveStep(2);
      }, 900);
    }, 1200);
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
          setSelectedImage(event.target.result as string);
          toast.success('Café cover image updated!');
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Detect GPS coordinates
  function handleDetectGps() {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser.');
      return;
    }

    setDetectingGps(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatitude(pos.coords.latitude);
        setLongitude(pos.coords.longitude);
        setDetectingGps(false);
        toast.success('GPS coordinates locked!', {
          description: `Lat: ${pos.coords.latitude.toFixed(4)}, Long: ${pos.coords.longitude.toFixed(4)}`,
        });
      },
      (err) => {
        setDetectingGps(false);
        console.warn('GPS detection failed:', err);
        // Fallback default coordinates (Bengaluru tech hub)
        setLatitude(12.9716);
        setLongitude(77.5946);
        toast.success('Default GPS coordinates applied (12.9716, 77.5946)');
      },
      { timeout: 8000 }
    );
  }

  // Submit complete setup to API & local storage
  async function handleFinishSetup(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);

    if (!businessName.trim()) {
      setFormError('Please enter your Business / Café name.');
      return;
    }

    setSavingSetup(true);
    try {
      const res = await fetch('/api/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: currentUserEmail,
          businessName: businessName.trim(),
          address: address.trim() || 'Main High Street, Store #1',
          imageUrl: selectedImage,
          latitude: latitude || 12.9716,
          longitude: longitude || 77.5946,
          gpsRadiusMeters: gpsRadius,
          paperSize: paperWidth,
          paymentVerified: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Setup failed.');
      }

      const cafeSlug =
        data.store?.slug ||
        businessName
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '') ||
        'my-cafe';

      // Persist store profile locally
      try {
        localStorage.setItem('brewpluse::store_slug', cafeSlug);
        localStorage.setItem(
          'brewpluse::store_profile',
          JSON.stringify({
            name: businessName.trim(),
            slug: cafeSlug,
            address: address.trim(),
            imageUrl: selectedImage,
            latitude: latitude || 12.9716,
            longitude: longitude || 77.5946,
            gpsRadius,
            paperWidth,
            setupCompleted: true,
          })
        );
      } catch (err) {}

      toast.success('Welcome to BrewPluse!', {
        description: `${businessName.trim()} is now live and ready to take orders.`,
      });

      setTimeout(() => {
        router.push(`/dashboard/${cafeSlug}`);
      }, 700);
    } catch (err: any) {
      const msg = err.message || 'Failed to save café setup.';
      setFormError(msg);
      toast.error(msg);
    } finally {
      setSavingSetup(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#141210] text-[#e5e2e1] selection:bg-[#eebd8e]/30 selection:text-[#ffdcbd] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#141210]/90 backdrop-blur-md border-b border-white/[0.08] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center text-[#eebd8e]">
              <Coffee className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white flex items-center">
              Brew<span className="text-[#eebd8e]">Pluse</span>
            </span>
          </Link>

          {/* Stepper Pill Indicator */}
          <div className="flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-3 py-1 text-xs">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold transition-all ${
                activeStep === 1
                  ? 'bg-amber-500/20 text-[#eebd8e] border border-amber-500/30'
                  : 'text-emerald-400'
              }`}
            >
              {paymentSuccess ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <span className="w-4 h-4 rounded-full bg-amber-500/30 flex items-center justify-center text-[10px]">
                  1
                </span>
              )}
              <span>₹1 Verification</span>
            </div>

            <div className="w-3 h-[1px] bg-white/20" />

            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold transition-all ${
                activeStep === 2
                  ? 'bg-amber-500/20 text-[#eebd8e] border border-amber-500/30'
                  : 'text-neutral-500'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Café Setup</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-5 pt-8 sm:pt-12">
        {/* STEP 1: ₹1 Token Verification */}
        {activeStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-2 text-center max-w-lg mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Instant Merchant Bank Verification</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Store Account Activation
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                A nominal ₹1 token payment activates your live merchant UPI settlements and cashier routing channel.
              </p>
            </div>

            {/* Payment Card Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#1c1917] border border-white/[0.08] shadow-2xl space-y-6 max-w-lg mx-auto">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-mono">
                    Token Amount
                  </p>
                  <p className="text-3xl font-black text-white font-mono">₹1.00</p>
                </div>
                <div className="text-right space-y-0.5">
                  <p className="text-[11px] font-mono text-neutral-500">REF: {txnId}</p>
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    PENDING APPROVAL
                  </span>
                </div>
              </div>

              {/* Dynamic Simulated UPI QR Code */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-[#141210] border border-white/[0.06] space-y-3">
                <div className="relative p-3 bg-white rounded-2xl shadow-md">
                  <div className="w-40 h-40 flex items-center justify-center border-4 border-[#0c4d2e] rounded-xl bg-white p-2">
                    <QrCode className="w-32 h-32 text-[#0c4d2e]" />
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0c4d2e] text-white flex items-center justify-center font-bold text-xs shadow-md">
                    ₹1
                  </div>
                </div>

                <div className="text-center space-y-1">
                  <p className="text-xs font-bold text-neutral-300">
                    Scan using any UPI App
                  </p>
                  <p className="text-[11px] text-neutral-500 font-mono">
                    Google Pay &bull; PhonePe &bull; Paytm &bull; BHIM
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  disabled={paymentProcessing || paymentSuccess}
                  onClick={handleConfirmPayment}
                  className="w-full py-4 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {paymentProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Verifying ₹1 Payment with Gateway...</span>
                    </>
                  ) : paymentSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-white" />
                      <span>Verified! Proceeding to Café Setup...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      <span>Simulate &amp; Confirm ₹1 Payment</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="w-full py-2.5 text-center text-xs font-semibold text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  Skip Token Verification for now &rarr;
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Café Details, Image, Location & GPS Radius */}
        {activeStep === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#eebd8e]/10 text-[#eebd8e] border border-[#eebd8e]/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Store Profile Setup</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Tell us about your café
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Configure your business name, cover imagery, store address, and geofencing radius.
              </p>
            </div>

            {formError && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFinishSetup} className="space-y-8">
              {/* 1. Café Name */}
              <div className="p-6 rounded-3xl bg-[#1c1917] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Store className="w-4 h-4 text-[#eebd8e]" />
                  <span>1. Business / Café Name</span>
                </div>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. BrewPluse Roasters &amp; Kitchen"
                  required
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-2xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#eebd8e] focus:bg-white/[0.07] transition-all font-semibold"
                />
              </div>

              {/* 2. Café Image Upload & Presets */}
              <div className="p-6 rounded-3xl bg-[#1c1917] border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <ImageIcon className="w-4 h-4 text-[#eebd8e]" />
                    <span>2. Café Cover Image</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-bold text-neutral-200 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#eebd8e]" />
                    <span>Upload Custom</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>

                {/* Selected Preview */}
                <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-white/10 group">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${selectedImage}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                      Current Cover Preview
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> High Resolution
                    </span>
                  </div>
                </div>

                {/* 4 Quick Preset Thumbnails */}
                <div className="space-y-1.5">
                  <p className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Or select an artisanal preset:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {presetImages.map((preset) => (
                      <button
                        key={preset.title}
                        type="button"
                        onClick={() => setSelectedImage(preset.url)}
                        className={`relative h-20 rounded-xl overflow-hidden border text-left transition-all cursor-pointer ${
                          selectedImage === preset.url
                            ? 'border-[#eebd8e] ring-2 ring-[#eebd8e]/50'
                            : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{ backgroundImage: `url('${preset.url}')` }}
                        />
                        <div className="absolute inset-0 bg-black/50" />
                        <span className="absolute bottom-1.5 left-2 right-2 text-[10px] font-bold text-white truncate">
                          {preset.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Location & Address */}
              <div className="p-6 rounded-3xl bg-[#1c1917] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <MapPin className="w-4 h-4 text-[#eebd8e]" />
                  <span>3. Café Address &amp; Location</span>
                </div>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 100ft Road, Indiranagar, Bengaluru, KA 560038"
                  className="w-full px-4 py-3 bg-white/[0.04] border border-white/10 rounded-2xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#eebd8e] focus:bg-white/[0.07] transition-all font-medium"
                />
              </div>

              {/* 4. GPS Coordinates & Geofencing Radius */}
              <div className="p-6 rounded-3xl bg-[#1c1917] border border-white/[0.08] space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-white">
                    <Navigation className="w-4 h-4 text-[#eebd8e]" />
                    <span>4. GPS Coordinates &amp; Geofencing Radius</span>
                  </div>
                  <button
                    type="button"
                    disabled={detectingGps}
                    onClick={handleDetectGps}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-[#eebd8e] border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer"
                  >
                    {detectingGps ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Radio className="w-3.5 h-3.5" />
                    )}
                    <span>{detectingGps ? 'Locating...' : 'Detect GPS Now'}</span>
                  </button>
                </div>

                {/* Coordinates Display */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      Latitude
                    </span>
                    <p className="font-mono font-bold text-sm text-white">
                      {latitude !== null ? latitude.toFixed(6) : '12.971598 (Auto)'}
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-0.5">
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">
                      Longitude
                    </span>
                    <p className="font-mono font-bold text-sm text-white">
                      {longitude !== null ? longitude.toFixed(6) : '77.594562 (Auto)'}
                    </p>
                  </div>
                </div>

                {/* Geofencing Radius Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-neutral-300 block">
                    Cashier Check-in Geofence Radius
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {radiusOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setGpsRadius(opt.value)}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          gpsRadius === opt.value
                            ? 'border-[#eebd8e] bg-[#eebd8e]/10 text-white shadow-md'
                            : 'border-white/10 text-neutral-400 hover:border-white/20'
                        }`}
                      >
                        <p className="text-sm font-extrabold font-mono text-[#eebd8e]">
                          {opt.label}
                        </p>
                        <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                          {opt.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Orders &amp; clock-ins outside this perimeter will require manager PIN override.
                  </p>
                </div>
              </div>

              {/* 5. Thermal Paper Size Default */}
              <div className="p-6 rounded-3xl bg-[#1c1917] border border-white/[0.08] flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Primary Thermal Printer Size</p>
                  <p className="text-xs text-neutral-400">Can be adjusted per-device anytime</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPaperWidth('58mm')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                      paperWidth === '58mm'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white/[0.05] text-neutral-400'
                    }`}
                  >
                    58mm Portable
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaperWidth('80mm')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                      paperWidth === '80mm'
                        ? 'bg-amber-500 text-white'
                        : 'bg-white/[0.05] text-neutral-400'
                    }`}
                  >
                    80mm Standard POS
                  </button>
                </div>
              </div>

              {/* Complete Setup CTA */}
              <button
                type="submit"
                disabled={savingSetup}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#eebd8e] to-[#d4995f] hover:from-[#f3ca9e] hover:to-[#dfa46a] text-[#1a1715] font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-[#875200]/20 flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {savingSetup ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#1a1715]" />
                    <span>Activating Café &amp; Generating Dashboard...</span>
                  </>
                ) : (
                  <>
                    <span>Launch Café &amp; Open Dashboard</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
