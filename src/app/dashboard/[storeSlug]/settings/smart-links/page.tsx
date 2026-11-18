'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Link from 'next/link';
import {
  ArrowLeft,
  Sparkles,
  Link2,
  Copy,
  Check,
  ExternalLink,
  Save,
  Smartphone,
  MessageCircle,
  Star,
  Download,
  Share2,
  Plus,
  Trash2,
  QrCode,
  Globe,
  Instagram,
  Coffee,
  CheckCircle2,
  MapPin,
  HelpCircle,
  Eye,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export interface CustomBioLink {
  id: string;
  title: string;
  url: string;
  subtitle?: string;
  icon?: string;
}

export interface SmartLinksConfig {
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

export default function SmartLinksSettingsPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const toast = useToast();

  const defaultCafeName = storeSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  // Form State
  const [cafeName, setCafeName] = useState(defaultCafeName);
  const [tagline, setTagline] = useState('Specialty Coffee, Fresh Artisan Bakes & Cozy Vibes ☕');
  const [logoUrl, setLogoUrl] = useState('');
  const [address, setAddress] = useState('Indiranagar 100ft Road, Bangalore');
  const [appDownloadUrl, setAppDownloadUrl] = useState('');
  const [googleReviewUrl, setGoogleReviewUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [menuUrl, setMenuUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [customLinks, setCustomLinks] = useState<CustomBioLink[]>([]);

  // UI state
  const [copiedLink, setCopiedLink] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'editor' | 'preview'>('editor');

  // Custom link modal
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [isAddLinkModalOpen, setIsAddLinkModalOpen] = useState(false);

  // Storage key
  const storageKey = `brewpluse::smart_links_${storeSlug.toLowerCase()}`;

  useEffect(() => {
    // 1. Try loading dedicated smart links config
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const parsed: SmartLinksConfig = JSON.parse(stored);
        if (parsed.cafeName) setCafeName(parsed.cafeName);
        if (parsed.tagline) setTagline(parsed.tagline);
        if (parsed.logoUrl) setLogoUrl(parsed.logoUrl);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.appDownloadUrl) setAppDownloadUrl(parsed.appDownloadUrl);
        if (parsed.googleReviewUrl) setGoogleReviewUrl(parsed.googleReviewUrl);
        if (parsed.whatsappNumber) setWhatsappNumber(parsed.whatsappNumber);
        if (parsed.menuUrl) setMenuUrl(parsed.menuUrl);
        if (parsed.instagramUrl) setInstagramUrl(parsed.instagramUrl);
        if (Array.isArray(parsed.customLinks)) setCustomLinks(parsed.customLinks);
        return;
      }
    } catch (e) {}

    // 2. Fallback to general store profile if available
    try {
      const generalProfile = localStorage.getItem('brewpluse::store_profile');
      if (generalProfile) {
        const parsed = JSON.parse(generalProfile);
        if (parsed.name) setCafeName(parsed.name);
        if (parsed.logo) setLogoUrl(parsed.logo);
        if (parsed.tagline) setTagline(parsed.tagline);
        if (parsed.address) setAddress(parsed.address);
        if (parsed.phone) {
          const code = parsed.phoneCountryCode || '+91';
          setWhatsappNumber(`${code}${parsed.phone}`.replace(/\s+/g, ''));
        }
      }
    } catch (e) {}

    // Defaults
    if (!appDownloadUrl) setAppDownloadUrl(`https://brewpluse.com/download?store=${storeSlug}`);
    if (!menuUrl) setMenuUrl(`https://brewpluse.com/m/${storeSlug}`);
  }, [storeSlug, storageKey]);

  // Public Hub link
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://brewpluse.com';
  const publicHubUrl = `${origin}/hub/${storeSlug}`;
  const effectiveAppDownloadUrl = appDownloadUrl || `${origin}/download?store=${storeSlug}`;
  const effectiveMenuUrl = menuUrl || `${origin}/m/${storeSlug}`;
  const cleanWhatsappNumber = whatsappNumber.replace(/[^0-9+]/g, '');

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);

    const config: SmartLinksConfig = {
      cafeName: cafeName.trim() || defaultCafeName,
      tagline: tagline.trim(),
      logoUrl: logoUrl.trim(),
      address: address.trim(),
      appDownloadUrl: effectiveAppDownloadUrl.trim(),
      googleReviewUrl: googleReviewUrl.trim(),
      whatsappNumber: cleanWhatsappNumber,
      menuUrl: effectiveMenuUrl.trim(),
      instagramUrl: instagramUrl.trim(),
      customLinks,
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(config));
      // Also update general profile for consistency
      const existing = localStorage.getItem('brewpluse::store_profile');
      const baseObj = existing ? JSON.parse(existing) : {};
      baseObj.name = config.cafeName;
      baseObj.tagline = config.tagline;
      baseObj.logo = config.logoUrl;
      baseObj.address = config.address;
      baseObj.phone = config.whatsappNumber;
      localStorage.setItem('brewpluse::store_profile', JSON.stringify(baseObj));

      // Trigger cross-page sync
      window.dispatchEvent(new CustomEvent('brewpluse::smart_links_change', { detail: config }));
      toast.success('Smart Links & Bio Hub saved successfully!');
    } catch (err) {
      toast.error('Failed to save settings to browser.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopyBioLink = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(publicHubUrl);
      setCopiedLink(true);
      toast.success('Bio Link copied to clipboard!');
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleAddCustomLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newUrl.trim()) return;

    let finalUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(finalUrl)) {
      finalUrl = 'https://' + finalUrl;
    }

    const newItem: CustomBioLink = {
      id: 'link-' + Date.now(),
      title: newTitle.trim(),
      url: finalUrl,
      subtitle: newSubtitle.trim() || undefined,
    };

    setCustomLinks([...customLinks, newItem]);
    setNewTitle('');
    setNewUrl('');
    setNewSubtitle('');
    setIsAddLinkModalOpen(false);
    toast.success('Custom link added!');
  };

  const handleRemoveCustomLink = (id: string) => {
    setCustomLinks(customLinks.filter((l) => l.id !== id));
    toast.info('Link removed.');
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-6 max-w-6xl mx-auto pb-24 font-sans text-neutral-800 dark:text-zinc-200">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#121c16] p-5 sm:p-6 rounded-3xl border border-[#E7ECE9] dark:border-white/10 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                href={`/dashboard/${storeSlug}/settings`}
                className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center text-neutral-600 dark:text-zinc-300 hover:bg-neutral-200 transition-colors"
                title="Back to Settings"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <h1 className="text-xl sm:text-2xl font-black text-[#14251F] dark:text-white tracking-tight flex items-center gap-2">
                <span>Smart Bio-Link &amp; SuperProfile</span>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Instagram &amp; QR Hub
                </span>
              </h1>
            </div>
            <p className="text-xs text-[#64756E] dark:text-zinc-400 pl-10">
              Configure your cafe's all-in-one SuperProfile: App Download, Google Reviews, WhatsApp, Digital Menu, and custom links in one branded page.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap self-start sm:self-auto pl-10 sm:pl-0">
            <button
              type="button"
              onClick={handleCopyBioLink}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-bold text-neutral-800 dark:text-white transition cursor-pointer"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedLink ? 'Copied Bio Link!' : 'Copy Bio Link'}</span>
            </button>

            <a
              href={`/hub/${storeSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#002D23] hover:bg-[#001f19] text-xs font-bold text-white transition shadow-sm cursor-pointer"
            >
              <span>View Live Hub</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 hover:bg-neutral-50 dark:hover:bg-zinc-800 text-xs font-bold text-neutral-700 dark:text-zinc-300 transition cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-neutral-600 dark:text-zinc-400" />
              <span>Stand QR</span>
            </button>
          </div>
        </div>

        {/* Mobile Toggle between Editor & Live Preview */}
        <div className="flex lg:hidden bg-white dark:bg-[#121c16] border border-[#E7ECE9] dark:border-white/10 p-1 rounded-2xl gap-1">
          <button
            type="button"
            onClick={() => setActivePreviewTab('editor')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activePreviewTab === 'editor'
                ? 'bg-[#002D23] text-white shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Setup Links</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePreviewTab('preview')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
              activePreviewTab === 'preview'
                ? 'bg-[#002D23] text-white shadow-xs'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live Phone Preview</span>
          </button>
        </div>

        {/* Main 2-Column Split: Setup Form on Left, Live Phone Mockup on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT: FORM (7 COLS) */}
          <div
            className={`lg:col-span-7 space-y-6 ${
              activePreviewTab === 'preview' ? 'hidden lg:block' : 'block'
            }`}
          >
            <form onSubmit={handleSave} className="space-y-6">
              {/* SECTION 1: CAFE BRANDING */}
              <div className="bg-white dark:bg-[#121c16] border border-[#E7ECE9] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 dark:border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <Coffee className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#14251F] dark:text-white uppercase tracking-wider">
                      1. Cafe Identity &amp; Header
                    </h2>
                    <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                      Shown at the top of your Instagram Bio link and Table QR landing page.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold text-[#64756E] dark:text-zinc-400 uppercase">
                      Cafe Name *
                    </label>
                    <input
                      type="text"
                      value={cafeName}
                      onChange={(e) => setCafeName(e.target.value)}
                      placeholder="e.g. Blue Tokai Coffee Roasters"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                      required
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold text-[#64756E] dark:text-zinc-400 uppercase">
                      Bio / Tagline
                    </label>
                    <input
                      type="text"
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="e.g. Specialty Coffee, Artisan Bakes & Cozy Vibes ☕"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#64756E] dark:text-zinc-400 uppercase">
                      Logo URL
                    </label>
                    <input
                      type="text"
                      value={logoUrl}
                      onChange={(e) => setLogoUrl(e.target.value)}
                      placeholder="https://... (or leave blank for initial letter icon)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#64756E] dark:text-zinc-400 uppercase">
                      Physical Location / Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. Indiranagar, Bangalore"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50/50 dark:bg-zinc-800/50 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 2: CORE SMART ACTION BUTTONS */}
              <div className="bg-white dark:bg-[#121c16] border border-[#E7ECE9] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-neutral-100 dark:border-white/5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-[#14251F] dark:text-white uppercase tracking-wider">
                      2. Essential 1-Tap Action Links
                    </h2>
                    <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                      These prominent buttons drive customer app installs, orders, reviews, and WhatsApp inquiries.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* APP DOWNLOAD LINK */}
                  <div className="p-3.5 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Download className="w-4 h-4 text-amber-600" />
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          Customer App Download Link
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                        Primary CTA
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-relaxed">
                      Pre-linked to this cafe. When users download, the app automatically opens your store's menu!
                    </p>
                    <input
                      type="text"
                      value={appDownloadUrl}
                      onChange={(e) => setAppDownloadUrl(e.target.value)}
                      placeholder={`https://brewpluse.com/download?store=${storeSlug}`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                    />
                  </div>

                  {/* WHATSAPP CONTACT & BROADCAST NUMBER */}
                  <div className="p-3.5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          Cafe WhatsApp Number *
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                        Used for Offers &amp; Chat
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-relaxed">
                      Customers can chat on WhatsApp with 1 tap. Also used as your official contact when broadcasting promotional coupon offers!
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                      />
                    </div>
                  </div>

                  {/* GOOGLE PROFILE & REVIEWS LINK */}
                  <div className="p-3.5 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          Google Profile / 5-Star Reviews Link
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300">
                        Reputation Booster
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-relaxed">
                      Direct link to your Google Maps listing or review shortlink (e.g. <code>https://g.page/r/.../review</code>).
                    </p>
                    <input
                      type="text"
                      value={googleReviewUrl}
                      onChange={(e) => setGoogleReviewUrl(e.target.value)}
                      placeholder="https://g.page/r/your-google-review-link"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                    />
                  </div>

                  {/* DIGITAL MENU LINK */}
                  <div className="p-3.5 rounded-2xl bg-neutral-500/5 border border-neutral-200 dark:border-zinc-700 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Coffee className="w-4 h-4 text-[#002D23] dark:text-emerald-400" />
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          Digital Menu Ordering Page
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-neutral-200 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300">
                        Live Menu
                      </span>
                    </div>
                    <input
                      type="text"
                      value={menuUrl}
                      onChange={(e) => setMenuUrl(e.target.value)}
                      placeholder={`https://brewpluse.com/m/${storeSlug}`}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                    />
                  </div>

                  {/* INSTAGRAM LINK */}
                  <div className="p-3.5 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Instagram className="w-4 h-4 text-purple-600" />
                        <span className="text-xs font-bold text-neutral-900 dark:text-white">
                          Instagram Profile Link
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300">
                        Social Following
                      </span>
                    </div>
                    <input
                      type="text"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="https://instagram.com/yourcafename"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs font-mono font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: CUSTOM LINKS (SUPERPROFILE STYLE) */}
              <div className="bg-white dark:bg-[#121c16] border border-[#E7ECE9] dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-[#14251F] dark:text-white uppercase tracking-wider">
                        3. Custom Bio &amp; Promotional Links
                      </h2>
                      <p className="text-[11px] text-neutral-500 dark:text-zinc-400">
                        Add weekend events, Wi-Fi info, party bookings, or catering links.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAddLinkModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-bold transition cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Link</span>
                  </button>
                </div>

                {customLinks.length === 0 ? (
                  <div className="text-center py-6 border-2 border-dashed border-neutral-200 dark:border-zinc-800 rounded-2xl">
                    <p className="text-xs text-neutral-500 dark:text-zinc-400 font-medium">
                      No custom links added yet. Tap <strong>Add Link</strong> to create one!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {customLinks.map((item) => (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl border border-neutral-200 dark:border-zinc-800 bg-neutral-50/50 dark:bg-zinc-800/40 flex items-center justify-between gap-3"
                      >
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-neutral-900 dark:text-white">{item.title}</p>
                          {item.subtitle && (
                            <p className="text-[10px] text-neutral-500 dark:text-zinc-400">{item.subtitle}</p>
                          )}
                          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 truncate max-w-xs font-mono">
                            {item.url}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCustomLink(item.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 transition cursor-pointer"
                          title="Delete link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SAVE BUTTON */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-3.5 rounded-2xl bg-[#002D23] hover:bg-[#001f19] active:scale-[0.98] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>{isSaving ? 'Saving Changes...' : 'Save Smart Links & Hub'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: LIVE SMARTPHONE PREVIEW (5 COLS) */}
          <div
            className={`lg:col-span-5 sticky top-24 ${
              activePreviewTab === 'editor' ? 'hidden lg:block' : 'block'
            }`}
          >
            <div className="bg-white dark:bg-[#121c16] border border-[#E7ECE9] dark:border-white/10 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-white/5">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-800 dark:text-white">
                    Live SuperProfile Preview
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Real-time
                </span>
              </div>

              {/* Phone Frame Mockup */}
              <div className="w-full max-w-[320px] mx-auto rounded-[36px] border-[8px] border-[#161a18] bg-[#F7F5EC] text-[#0B1714] p-4 shadow-xl min-h-[580px] flex flex-col justify-between relative overflow-hidden font-sans">
                {/* Top Notch */}
                <div className="w-24 h-4 bg-[#161a18] rounded-b-xl mx-auto -mt-4 mb-4"></div>

                <div className="space-y-4">
                  {/* Cafe Header */}
                  <div className="text-center space-y-1.5">
                    <div className="w-16 h-16 rounded-full bg-[#002D23] text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-md border-2 border-[#B99A5B] overflow-hidden">
                      {logoUrl ? (
                        <img src={logoUrl} alt={cafeName} className="w-full h-full object-cover" />
                      ) : (
                        cafeName.charAt(0) || 'B'
                      )}
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <h3 className="text-sm font-extrabold text-[#0B1714] tracking-tight">{cafeName}</h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                    </div>
                    <p className="text-[10px] text-[#64736D] leading-tight px-3">{tagline}</p>
                    {address && (
                      <p className="text-[9px] text-[#002D23] font-medium flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3 text-[#B99A5B]" />
                        <span>{address}</span>
                      </p>
                    )}
                  </div>

                  {/* Mock Action Buttons */}
                  <div className="space-y-2 pt-2">
                    {/* 1. App Download Button */}
                    <div className="p-3 rounded-2xl bg-[#002D23] text-white text-center shadow-xs space-y-0.5">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                        <Download className="w-3.5 h-3.5 text-[#B99A5B]" />
                        <span>Download Our Customer App</span>
                      </div>
                      <p className="text-[9px] text-[#DDE3DD]">Fast table reorders &amp; exclusive perks</p>
                    </div>

                    {/* 2. Digital Menu */}
                    <div className="p-3 rounded-2xl bg-white border border-[#DDE3DD] text-[#0B1714] text-center shadow-2xs space-y-0.5">
                      <div className="flex items-center justify-center gap-1.5 text-xs font-bold">
                        <Coffee className="w-3.5 h-3.5 text-[#002D23]" />
                        <span>Browse Live Menu &amp; Order</span>
                      </div>
                      <p className="text-[9px] text-gray-500">Dine-in, takeaway &amp; counter</p>
                    </div>

                    {/* 3. Google Reviews */}
                    {googleReviewUrl && (
                      <div className="p-2.5 rounded-2xl bg-white border border-[#DDE3DD] text-[#0B1714] text-center shadow-2xs flex items-center justify-center gap-1.5 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>Leave a 5-Star Google Review</span>
                      </div>
                    )}

                    {/* 4. WhatsApp Chat */}
                    {cleanWhatsappNumber && (
                      <div className="p-2.5 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#075E54] text-center shadow-2xs flex items-center justify-center gap-1.5 text-xs font-bold">
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                        <span>Chat on WhatsApp</span>
                      </div>
                    )}

                    {/* 5. Instagram */}
                    {instagramUrl && (
                      <div className="p-2.5 rounded-2xl bg-white border border-[#DDE3DD] text-[#0B1714] text-center shadow-2xs flex items-center justify-center gap-1.5 text-xs font-bold">
                        <Instagram className="w-3.5 h-3.5 text-purple-600" />
                        <span>Follow on Instagram</span>
                      </div>
                    )}

                    {/* Custom Links Preview */}
                    {customLinks.map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-2xl bg-white border border-[#DDE3DD] text-[#0B1714] text-center shadow-2xs text-xs font-bold"
                      >
                        {item.title}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Watermark */}
                <div className="pt-4 text-center text-[9px] text-[#64736D] border-t border-[#DDE3DD]/60">
                  Powered by <strong>BrewPluse</strong> Cafe OS
                </div>
              </div>

              {/* Quick Link Info */}
              <div className="p-3 rounded-2xl bg-neutral-50 dark:bg-zinc-800/40 border border-neutral-200 dark:border-zinc-700/60 text-[11px] text-neutral-600 dark:text-zinc-400 space-y-1">
                <span className="font-bold text-neutral-900 dark:text-white block">
                  Your Instagram Bio Link:
                </span>
                <code className="text-emerald-700 dark:text-emerald-400 font-mono text-[10px] break-all select-all">
                  {publicHubUrl}
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL: ADD CUSTOM LINK */}
        {isAddLinkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-zinc-800">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-500" />
                  <span>Add Custom Bio Link</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddLinkModalOpen(false)}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleAddCustomLink} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-600 dark:text-zinc-400 uppercase">
                    Link Title *
                  </label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Free Cafe Wi-Fi Login, Weekend Jazz Night"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50 dark:bg-zinc-800 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-600 dark:text-zinc-400 uppercase">
                    Target URL *
                  </label>
                  <input
                    type="text"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50 dark:bg-zinc-800 text-xs font-mono font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-neutral-600 dark:text-zinc-400 uppercase">
                    Subtitle (Optional)
                  </label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    placeholder="e.g. Live music every Saturday 7 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 bg-neutral-50 dark:bg-zinc-800 text-xs font-semibold text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#002D23]"
                  />
                </div>

                <div className="flex items-center justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddLinkModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 text-xs font-bold text-neutral-700 dark:text-zinc-300 hover:bg-neutral-50 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#002D23] hover:bg-[#001f19] text-xs font-bold text-white transition shadow-sm cursor-pointer"
                  >
                    Add to Hub
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: QR CODE FOR STAND / COUNTER */}
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 w-full max-w-sm shadow-2xl text-center space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-zinc-800">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Table &amp; Counter QR Stand
                </span>
                <button
                  type="button"
                  onClick={() => setShowQrModal(false)}
                  className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white cursor-pointer"
                >
                  &times;
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-white border-2 border-neutral-200 shadow-inner inline-block">
                {/* QR preview linking to publicHubUrl */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                    publicHubUrl
                  )}`}
                  alt="QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>

              <div className="space-y-1">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{cafeName}</h4>
                <p className="text-[11px] text-neutral-500 dark:text-zinc-400 leading-tight">
                  Customers scan this to open your SuperProfile, download the app, browse the menu, and review your cafe.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyBioLink}
                  className="flex-1 py-2.5 rounded-xl border border-neutral-200 dark:border-zinc-700 text-xs font-bold text-neutral-800 dark:text-white hover:bg-neutral-50 transition cursor-pointer"
                >
                  Copy URL
                </button>
                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(
                    publicHubUrl
                  )}`}
                  target="_blank"
                  download={`BrewPluse-QR-${storeSlug}.png`}
                  className="flex-1 py-2.5 rounded-xl bg-[#002D23] hover:bg-[#001f19] text-xs font-bold text-white transition shadow-sm cursor-pointer"
                >
                  Download HD QR
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
