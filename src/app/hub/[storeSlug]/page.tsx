'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Coffee,
  Download,
  Star,
  MessageCircle,
  Instagram,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  QrCode,
  ArrowRight,
  Share2,
  Copy,
  Check,
  UtensilsCrossed,
} from 'lucide-react';

interface CustomBioLink {
  id: string;
  title: string;
  url: string;
  subtitle?: string;
}

interface SmartLinksConfig {
  cafeName: string;
  tagline: string;
  logoUrl: string;
  address: string;
  appDownloadUrl: string;
  googleReviewUrl: string;
  whatsappNumber: string;
  menuUrl: string;
  instagramUrl: string;
  customLinks: CustomBioLink[];
}

export default function PublicCafeHubPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const storeSlug = (params?.storeSlug as string) || 'brewpluse';
  const tableParam = searchParams.get('table') || '';

  const defaultCafeName = storeSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const [config, setConfig] = useState<SmartLinksConfig>({
    cafeName: defaultCafeName,
    tagline: 'Specialty Coffee, Fresh Artisan Bakes & Cozy Vibes ☕',
    logoUrl: '',
    address: 'Indiranagar 100ft Road, Bangalore',
    appDownloadUrl: `/download?store=${storeSlug}`,
    googleReviewUrl: '',
    whatsappNumber: '',
    menuUrl: `/m/${storeSlug}`,
    instagramUrl: '',
    customLinks: [],
  });

  const [tableNumber, setTableNumber] = useState(tableParam);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    // 1. Try reading saved configuration from browser storage
    try {
      const stored = localStorage.getItem(`brewpluse::smart_links_${storeSlug.toLowerCase()}`);
      if (stored) {
        const parsed: SmartLinksConfig = JSON.parse(stored);
        setConfig((prev) => ({
          ...prev,
          ...parsed,
          appDownloadUrl: parsed.appDownloadUrl || `/download?store=${storeSlug}`,
          menuUrl: parsed.menuUrl || `/m/${storeSlug}`,
        }));
        return;
      }
    } catch (e) {}

    // 2. Fallback to general store profile
    try {
      const general = localStorage.getItem('brewpluse::store_profile');
      if (general) {
        const parsed = JSON.parse(general);
        setConfig((prev) => ({
          ...prev,
          cafeName: parsed.name || defaultCafeName,
          tagline: parsed.tagline || prev.tagline,
          logoUrl: parsed.logo || prev.logoUrl,
          address: parsed.address || prev.address,
          whatsappNumber: parsed.phone ? `${parsed.phoneCountryCode || '+91'}${parsed.phone}` : '',
        }));
      }
    } catch (e) {}
  }, [storeSlug, defaultCafeName]);

  // Handle table quick jump
  const handleStartTableOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTable = tableNumber.trim();
    if (finalTable) {
      router.push(`/m/${storeSlug}?table=${encodeURIComponent(finalTable)}`);
    } else {
      router.push(`/m/${storeSlug}`);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined') {
      const url = window.location.href;
      if (navigator.share) {
        navigator.share({
          title: config.cafeName,
          text: `Check out ${config.cafeName} menu and app!`,
          url,
        }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2000);
      }
    }
  };

  const cleanPhone = config.whatsappNumber.replace(/[^0-9]/g, '');
  const waLink = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=Hi%20${encodeURIComponent(
        config.cafeName
      )},%20I%20would%20like%20to%20place%20an%20order%20or%20reserve%20a%20table!`
    : '';

  const effectiveDownloadUrl = config.appDownloadUrl.includes('?')
    ? `${config.appDownloadUrl}&table=${encodeURIComponent(tableNumber)}`
    : `${config.appDownloadUrl}?table=${encodeURIComponent(tableNumber)}`;

  const effectiveMenuUrl = tableNumber
    ? `${config.menuUrl}${config.menuUrl.includes('?') ? '&' : '?'}table=${encodeURIComponent(tableNumber)}`
    : config.menuUrl;

  return (
    <div className="min-h-screen bg-[#F7F5EC] text-[#0B1714] font-sans flex flex-col justify-between antialiased selection:bg-[#002D23] selection:text-white">
      {/* Top Navbar */}
      <header className="w-full max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#002D23] text-[#B99A5B] flex items-center justify-center shadow-xs">
            <Coffee className="w-4 h-4" />
          </div>
          <span className="text-xs font-mono font-bold text-[#002D23] uppercase tracking-wider">
            BrewPluse Hub
          </span>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="w-8 h-8 rounded-full bg-white/80 border border-[#DDE3DD] flex items-center justify-center text-[#0B1714] hover:bg-white transition-all shadow-xs cursor-pointer"
          title="Share Hub Link"
        >
          {copiedShare ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
        </button>
      </header>

      {/* Main Hub Body */}
      <main className="w-full max-w-md mx-auto px-4 py-2 flex-1 space-y-6">
        {/* Cafe Header Card */}
        <section className="text-center space-y-3">
          <div className="relative inline-block">
            <div className="w-22 h-22 rounded-full bg-[#002D23] text-white font-extrabold text-3xl flex items-center justify-center mx-auto shadow-lg border-3 border-[#B99A5B] overflow-hidden">
              {config.logoUrl ? (
                <img src={config.logoUrl} alt={config.cafeName} className="w-full h-full object-cover" />
              ) : (
                config.cafeName.charAt(0) || 'B'
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-2xl font-black tracking-tight text-[#0B1714]">
                {config.cafeName}
              </h1>
            </div>
            <p className="text-xs text-[#64736D] max-w-xs mx-auto leading-relaxed font-normal">
              {config.tagline}
            </p>
          </div>

          {config.address && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#DDE3DD] text-[11px] font-medium text-[#002D23] shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-[#B99A5B] shrink-0" />
              <span className="truncate max-w-[260px]">{config.address}</span>
            </div>
          )}
        </section>

        {/* Table Seating Quick Bar */}
        <section className="bg-white border border-[#DDE3DD] rounded-2xl p-3 shadow-xs">
          <form onSubmit={handleStartTableOrder} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="Sitting at table? (e.g. 4)"
                className="w-full bg-transparent text-xs font-semibold placeholder:text-[#64736D] outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-[#002D23] text-white text-[11px] font-bold shrink-0 hover:bg-black transition-all cursor-pointer"
            >
              Order for Table →
            </button>
          </form>
        </section>

        {/* Action Link Stack */}
        <section className="space-y-2.5">
          {/* 1. APP DOWNLOAD BUTTON (HERO CTA) */}
          <a
            href={effectiveDownloadUrl}
            className="group block p-4 rounded-2xl bg-[#002D23] text-white hover:bg-[#001f19] active:scale-[0.98] transition-all shadow-md shadow-[#002D23]/10 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/10 border border-[#B99A5B]/30 flex items-center justify-center text-[#B99A5B] shrink-0 group-hover:scale-105 transition-transform">
                  <Download className="w-5 h-5 animate-pulse" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tracking-tight text-white">
                      Download Customer App
                    </span>
                    <span className="text-[9px] font-extrabold px-2 py-0.2 rounded-full bg-[#B99A5B] text-[#002D23] uppercase">
                      1-Tap
                    </span>
                  </div>
                  <p className="text-[11px] text-[#DDE3DD] mt-0.5">
                    Fast table orders, zero wait time &amp; secret rewards
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#B99A5B] group-hover:translate-x-1 transition-transform shrink-0" />
            </div>
          </a>

          {/* 2. DIGITAL MENU BROWSER */}
          <Link
            href={effectiveMenuUrl}
            className="group block p-4 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] text-[#0B1714] hover:border-[#002D23] active:scale-[0.98] transition-all shadow-xs"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#F7F5EC] border border-[#DDE3DD] flex items-center justify-center text-[#002D23] shrink-0 group-hover:scale-105 transition-transform">
                  <Coffee className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <span className="text-sm font-bold tracking-tight text-[#0B1714] group-hover:text-[#002D23] transition-colors">
                    Browse Live Menu &amp; Order
                  </span>
                  <p className="text-[11px] text-[#64736D] mt-0.5">
                    Full beverage &amp; bakery catalog with photos &amp; prices
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-[#64736D] group-hover:translate-x-1 group-hover:text-[#002D23] transition-all shrink-0" />
            </div>
          </Link>

          {/* 3. GOOGLE 5-STAR REVIEWS */}
          {config.googleReviewUrl && (
            <a
              href={config.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3.5 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] text-[#0B1714] hover:border-amber-400 active:scale-[0.98] transition-all shadow-xs"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Star className="w-5 h-5 fill-amber-500" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#0B1714]">
                      Leave a 5-Star Google Review
                    </span>
                    <p className="text-[10px] text-[#64736D]">Loved your coffee? Support our team!</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#64736D] group-hover:text-amber-600 transition-colors shrink-0" />
              </div>
            </a>
          )}

          {/* 4. WHATSAPP CHAT */}
          {waLink && (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3.5 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] text-[#0B1714] hover:border-emerald-500 active:scale-[0.98] transition-all shadow-xs"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#0B1714]">
                      Chat on WhatsApp / Table Booking
                    </span>
                    <p className="text-[10px] text-[#64736D]">Direct chat with our counter staff</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#64736D] group-hover:translate-x-1 group-hover:text-emerald-600 transition-all shrink-0" />
              </div>
            </a>
          )}

          {/* 5. INSTAGRAM PROFILE */}
          {config.instagramUrl && (
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3.5 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] text-[#0B1714] hover:border-purple-400 active:scale-[0.98] transition-all shadow-xs"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 shrink-0">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#0B1714]">Follow us on Instagram</span>
                    <p className="text-[10px] text-[#64736D]">Daily roasts, latte art &amp; events</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#64736D] group-hover:text-purple-600 transition-colors shrink-0" />
              </div>
            </a>
          )}

          {/* CUSTOM BIO LINKS */}
          {config.customLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3.5 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] text-[#0B1714] hover:border-[#002D23] active:scale-[0.98] transition-all shadow-xs text-center"
            >
              <div className="flex items-center justify-between gap-2 px-1">
                <div className="text-left">
                  <span className="text-xs font-bold text-[#0B1714]">{item.title}</span>
                  {item.subtitle && <p className="text-[10px] text-[#64736D]">{item.subtitle}</p>}
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-[#64736D] shrink-0" />
              </div>
            </a>
          ))}
        </section>
      </main>

      {/* Footer Branding */}
      <footer className="w-full max-w-md mx-auto px-4 py-6 text-center text-xs text-[#64736D] space-y-2">
        <div className="flex items-center justify-center gap-1.5 text-[11px]">
          <span>Powered by</span>
          <a
            href="https://brewpluse.com"
            className="font-bold text-[#002D23] hover:underline flex items-center gap-1"
          >
            <span>BrewPluse</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </a>
        </div>
        <p className="text-[10px] text-[#8A9590]">
          Zero-Fee Cloud Cafe Operating System • Free Table QR &amp; KDS
        </p>
      </footer>
    </div>
  );
}
