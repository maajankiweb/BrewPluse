'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Copy,
  ExternalLink,
  Save,
  CreditCard,
  Smartphone,
  Check,
  Plus,
  Trash2,
  Phone,
  MessageCircle,
  MapPin,
  Globe,
  Sparkles,
  Instagram,
  ArrowUpRight
} from 'lucide-react';

interface SocialLink {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

export default function SocialNfcPage() {
  const params = useParams();
  const storeSlug = (params?.storeSlug as string) || 'brewpluse';
  const cafeName = storeSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const [activeTabMobile, setActiveTabMobile] = useState<'editor' | 'preview'>('editor');
  const [displayName, setDisplayName] = useState(cafeName);
  const [logoUrl, setLogoUrl] = useState('');
  const [bio, setBio] = useState('Welcome to our cafe! Tap any link below to connect with us.');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');

  // Primary buttons toggles
  const [showCall, setShowCall] = useState(true);
  const [showWhatsApp, setShowWhatsApp] = useState(true);
  const [showDirections, setShowDirections] = useState(false);
  const [showWebsiteBtn, setShowWebsiteBtn] = useState(false);

  // Google AI review toggle
  const [aiReviewEnabled, setAiReviewEnabled] = useState(true);

  // Social Links
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLinkTitle, setNewLinkTitle] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const publicUrl = typeof window !== 'undefined' ? `${window.location.origin}/${storeSlug}/social-nfc` : `https://brewpluse.fun/${storeSlug}/social-nfc`;

  const handleCopy = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle || !newLinkUrl) return;
    setLinks([...links, { id: Date.now().toString(), title: newLinkTitle, url: newLinkUrl }]);
    setNewLinkTitle('');
    setNewLinkUrl('');
    setIsAddModalOpen(false);
  };

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter((l) => l.id !== id));
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-6 pb-24 font-sans text-stone-900">
        {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-stone-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-stone-900 tracking-tight">Social NFC</h1>
            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Public &amp; Live
            </span>
          </div>
          <p className="text-xs text-stone-500 font-medium mt-0.5">
            Manage what customers see when they tap your NFC card or click your link-in-bio.
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition active:scale-95 cursor-pointer"
            title="Copy public link to share on Instagram bio, WhatsApp, or QR codes"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Link!' : 'Copy Link'}</span>
          </button>
          <a
            href={`/dashboard/${storeSlug}/social-nfc`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition active:scale-95 cursor-pointer"
          >
            <span>View Live</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#D35400] hover:bg-[#B84500] text-white text-xs font-black uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 transition disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saved ? 'Saved!' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Physical NFC Card Promotion */}
      <div className="bg-gradient-to-r from-stone-900 to-stone-800 text-white rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-stone-800 shadow-sm">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-[#E67E22] shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xs font-black uppercase tracking-wider text-white">Physical NFC Business Card</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-stone-300">
                Optional Hardware
              </span>
            </div>
            <p className="text-xs text-stone-300 mt-0.5">
              Your digital profile is fully active! Want a physical card for tables or counter? Order custom tap cards anytime.
            </p>
          </div>
        </div>
        <Link
          href={`/dashboard/${storeSlug}/hardware`}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D35400] hover:bg-[#B84500] text-white text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95 shrink-0"
        >
          <span>Get Physical Card</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="flex lg:hidden rounded-2xl bg-stone-200/60 p-1 border border-stone-200">
        <button
          onClick={() => setActiveTabMobile('editor')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
            activeTabMobile === 'editor' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
          }`}
        >
          Editor
        </button>
        <button
          onClick={() => setActiveTabMobile('preview')}
          className={`flex-1 py-2 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTabMobile === 'preview' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Live Preview</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Form & Settings */}
        <div className={`lg:col-span-7 space-y-6 ${activeTabMobile === 'editor' ? 'block' : 'hidden lg:block'}`}>
          {/* Cafe Profile & Info */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h2 className="text-sm font-black uppercase tracking-wider text-stone-900">Cafe Profile &amp; Info</h2>
              <span className="text-[11px] text-stone-400 font-medium">Prefilled from Store</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-stone-700">Cafe Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  placeholder="e.g. BrewPluse Specialty Coffee"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-stone-700">Logo Image URL</label>
                <input
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  placeholder="https://example.com/logo.png"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-stone-700">Short Bio / Tagline</label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none resize-none"
                  placeholder="Welcome to our cafe! Tap any link below to connect with us."
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  placeholder="+91 9876543210"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Website</label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  placeholder="https://brewpluse.fun"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-stone-700">Physical Address / City</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                  placeholder="123 Coffee Lane, Central District"
                />
              </div>
            </div>

            {/* Quick Contact Buttons Toggle */}
            <div className="pt-3 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-700 block mb-2.5">Primary Contact Buttons</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setShowCall(!showCall)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border ${
                    showCall
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-stone-50 text-stone-400 border-stone-200'
                  }`}
                >
                  {showCall ? '✓' : '✕'} Call Button
                </button>
                <button
                  type="button"
                  onClick={() => setShowWhatsApp(!showWhatsApp)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border ${
                    showWhatsApp
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-stone-50 text-stone-400 border-stone-200'
                  }`}
                >
                  {showWhatsApp ? '✓' : '✕'} WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setShowDirections(!showDirections)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border ${
                    showDirections
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-stone-50 text-stone-400 border-stone-200'
                  }`}
                >
                  {showDirections ? '✓' : '✕'} Directions
                </button>
                <button
                  type="button"
                  onClick={() => setShowWebsiteBtn(!showWebsiteBtn)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition border ${
                    showWebsiteBtn
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-stone-50 text-stone-400 border-stone-200'
                  }`}
                >
                  {showWebsiteBtn ? '✓' : '✕'} Website
                </button>
              </div>
            </div>
          </div>

          {/* Google AI Review Integration */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h2 className="text-sm font-black uppercase tracking-wider text-stone-900">
                  Google AI Review Integration
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setAiReviewEnabled(!aiReviewEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                  aiReviewEnabled ? 'bg-[#D35400]' : 'bg-stone-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    aiReviewEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-stone-500 font-medium">
              Automatically uses your cafe&apos;s Google AI Review setup from QR ordering. When enabled, visitors tapping
              your NFC card will see an interactive &quot;Leave a Google Review&quot; button powered by BrewPluse&apos;s
              built-in AI review assistant.
            </p>
          </div>

          {/* Social & Action Links */}
          <div className="bg-white border border-stone-200/80 rounded-3xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div>
                <h2 className="text-sm font-black uppercase tracking-wider text-stone-900">
                  Social &amp; Action Links ({links.length})
                </h2>
                <p className="text-[11px] text-stone-400 font-medium mt-0.5">
                  Add unlimited links: Instagram, Facebook, UPI payment, Website, Menu, etc.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold cursor-pointer transition active:scale-95"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Link</span>
              </button>
            </div>

            {links.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-2xl bg-stone-50/60 border border-dashed border-stone-200">
                <p className="text-xs font-bold text-stone-700">No links added yet</p>
                <p className="text-[11px] text-stone-400 mt-1 max-w-sm mx-auto">
                  Click &quot;+ Add Link&quot; to add your Instagram, Google Reviews, UPI payment, website, or digital menu.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between p-3 rounded-2xl bg-stone-50 border border-stone-200 text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-stone-900 truncate">{link.title}</p>
                      <p className="text-stone-400 font-mono text-[11px] truncate">{link.url}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveLink(link.id)}
                      className="text-stone-400 hover:text-red-600 p-1.5 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Mobile Preview */}
        <div className={`lg:col-span-5 ${activeTabMobile === 'preview' ? 'block' : 'hidden lg:block'} sticky top-6`}>
          <div className="bg-stone-950 text-white rounded-[38px] p-5 shadow-2xl border-4 border-stone-800 max-w-[340px] mx-auto min-h-[580px] flex flex-col justify-between">
            <div>
              {/* Dynamic NFC Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-[10px] font-black tracking-widest text-[#E67E22] uppercase">
                  BrewPluse NFC Card
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>

              {/* Cafe Profile Section */}
              <div className="text-center pt-6 pb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 mx-auto flex items-center justify-center text-white text-xl font-black shadow-md border-2 border-white/20">
                  {displayName.charAt(0) || 'B'}
                </div>
                <h3 className="text-base font-black mt-3 text-white tracking-tight">{displayName}</h3>
                <p className="text-[11px] text-stone-400 mt-1 px-4 leading-relaxed">{bio}</p>
              </div>

              {/* Primary Contact Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-2 px-1">
                {showCall && (
                  <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Call</span>
                  </button>
                )}
                {showWhatsApp && (
                  <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 text-xs font-bold transition border border-emerald-500/30">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                )}
                {showDirections && (
                  <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition col-span-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Directions</span>
                  </button>
                )}
                {showWebsiteBtn && (
                  <button className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition col-span-2">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Website</span>
                  </button>
                )}
              </div>

              {/* Google AI Review Banner */}
              {aiReviewEnabled && (
                <div className="mt-3 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-center">
                  <div className="flex items-center justify-center gap-1.5 text-amber-300 text-xs font-black">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Leave a Google Review</span>
                  </div>
                  <p className="text-[10px] text-stone-300 mt-0.5">Powered by BrewPluse AI Assistant</p>
                </div>
              )}

              {/* Links List */}
              <div className="mt-3 space-y-2">
                {links.length === 0 ? (
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center text-[11px] text-stone-500">
                    No additional links added yet
                    <p className="text-[9px] text-stone-600 mt-0.5">
                      The owner can add Instagram, Menu, WhatsApp, or payment links anytime.
                    </p>
                  </div>
                ) : (
                  links.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition border border-white/5"
                    >
                      <span className="truncate">{link.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    </a>
                  ))
                )}
              </div>
            </div>

            {/* Preview Footer */}
            <div className="pt-4 border-t border-white/10 text-center">
              <p className="text-[9px] text-stone-500 font-semibold uppercase tracking-wider">
                Powered by <span className="text-white font-bold">BrewPluse</span> • Social NFC
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Link Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-stone-200">
            <h3 className="text-base font-black text-stone-900 tracking-tight">Add New Link</h3>
            <p className="text-xs text-stone-500 mt-1">
              Add any custom destination (social profile, online menu, payment link, or review portal).
            </p>

            <form onSubmit={handleAddLink} className="space-y-4 mt-4">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Link Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Follow on Instagram or View Full Menu"
                  value={newLinkTitle}
                  onChange={(e) => setNewLinkTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">Destination URL</label>
                <input
                  type="url"
                  required
                  placeholder="https://instagram.com/mycafe"
                  value={newLinkUrl}
                  onChange={(e) => setNewLinkUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-xs font-medium focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#D35400] hover:bg-[#B84500] text-white text-xs font-black uppercase tracking-wider shadow-sm transition active:scale-95 cursor-pointer"
                >
                  Add Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </div>
    </DashboardShell>
  );
}
