'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import Link from 'next/link';
import {
  ArrowLeft,
  Building2,
  Sparkles,
  Link as LinkIcon,
  Upload,
  MapPin,
  Save,
  Coins,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

export default function BusinessProfilePage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const cafeDefaultName = storeSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const [cafeName, setCafeName] = useState(cafeDefaultName);
  const [logoMode, setLogoMode] = useState<'url' | 'upload'>('url');
  const [logoUrl, setLogoUrl] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeCurrency, setStoreCurrency] = useState('INR');
  const [storeCountry, setStoreCountry] = useState('India');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [phoneCountryCode, setPhoneCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [storeEmail, setStoreEmail] = useState('');
  const [tagline, setTagline] = useState('');
  const toast = useToast();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('brewpluse::store_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) setCafeName(parsed.name);
        if (parsed.address) setStoreAddress(parsed.address);
        if (parsed.logo) setLogoUrl(parsed.logo);
        if (parsed.currency) setStoreCurrency(parsed.currency);
        if (parsed.country) setStoreCountry(parsed.country);
        if (parsed.timezone) setTimezone(parsed.timezone);
        if (parsed.phoneCountryCode) setPhoneCountryCode(parsed.phoneCountryCode);
        if (parsed.phone) setPhoneNumber(parsed.phone);
        if (parsed.email) setStoreEmail(parsed.email);
        if (parsed.tagline) setTagline(parsed.tagline);
      }
    } catch (e) {}
  }, [storeSlug]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setLogoUrl(reader.result);
          toast.success('Logo uploaded successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const profileData = {
        slug: storeSlug,
        name: cafeName.trim() || cafeDefaultName,
        address: storeAddress.trim(),
        logo: logoUrl.trim(),
        currency: storeCurrency,
        country: storeCountry,
        timezone,
        phoneCountryCode,
        phone: phoneNumber.trim(),
        email: storeEmail.trim(),
        tagline: tagline.trim(),
      };
      localStorage.setItem('brewpluse::store_profile', JSON.stringify(profileData));

      // Trigger active user sync
      window.dispatchEvent(new CustomEvent('brewpluse::profile_change', { detail: profileData }));
    } catch (e) {}
    toast.success('Business profile updated successfully!');
  };

  const basePath = `/dashboard/${storeSlug}`;

  return (
    <DashboardShell storeSlug={storeSlug}>
      <form onSubmit={handleSave} className="max-w-[1200px] mx-auto space-y-4 font-sans pb-10">
        {/* Back Link & Action Bar */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href={`${basePath}/settings`}
            className="group inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white dark:bg-[#0E2018] hover:bg-[#F8FAF8] dark:hover:bg-[#142A21] text-[#12201B] dark:text-[#F2FAF6] border border-[#E7ECE9] dark:border-[#1E342B] text-xs font-semibold shadow-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#65736D] group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Settings</span>
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 h-8 px-4 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Profile</span>
          </button>
        </div>

        {/* Heading Card */}
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#0E2018] border border-[#E7ECE9] dark:border-[#1E342B] shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] border border-[#10B981]/20 flex items-center justify-center shrink-0">
            <Building2 className="w-4.5 h-4.5" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-[#12201B] dark:text-white tracking-tight">
              Business Profile
            </h1>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] font-normal mt-0.5">
              Manage and customize your cafe identity, branding, contacts, and store configuration.
            </p>
          </div>
        </div>

        {/* 1. BUSINESS IDENTITY */}
        <div className="rounded-xl border border-[#E7ECE9] dark:border-[#1E342B] bg-white dark:bg-[#0E2018] p-4 sm:p-5 shadow-[0_2px_12px_rgba(20,50,40,0.03)] space-y-4">
          <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-100 dark:border-[#1E342B] pb-2.5">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span>Business Identity</span>
          </p>

          {/* Cafe Name */}
          <div>
            <label className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">
              Cafe Name
            </label>
            <input
              type="text"
              value={cafeName}
              onChange={(e) => setCafeName(e.target.value)}
              placeholder="Enter your cafe name"
              className="w-full rounded-xl px-3.5 h-10 text-xs font-semibold outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all"
            />
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1.5">
              Routing identifier:{' '}
              <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">/dashboard/{storeSlug}</span>
            </p>
          </div>

          {/* Cafe Tagline */}
          <div>
            <label className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">
              Tagline / Subtitle
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Artisanal Brews & Fresh Bakes"
              className="w-full rounded-xl px-3.5 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all"
            />
          </div>

          {/* Cafe Logo */}
          <div>
            <label className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-2 block">
              Cafe Logo
            </label>
            <div className="flex gap-1 mb-3 p-1 bg-neutral-100 dark:bg-[#11241C] border border-neutral-200/80 dark:border-[#1E342B] rounded-full w-fit">
              <button
                type="button"
                onClick={() => setLogoMode('url')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  logoMode === 'url'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" /> URL
              </button>
              <button
                type="button"
                onClick={() => setLogoMode('upload')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  logoMode === 'upload'
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-2xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                }`}
              >
                <Upload className="h-3.5 w-3.5" /> Upload File
              </button>
            </div>

            {logoMode === 'url' ? (
              <input
                className="w-full rounded-xl px-3.5 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all"
                placeholder="https://example.com/logo.png"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
              />
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-200 dark:border-[#1E342B] rounded-xl p-4 cursor-pointer hover:border-[#10B981] hover:bg-neutral-50 dark:hover:bg-[#142D23] transition-all">
                <Upload className="w-5 h-5 text-neutral-400 mb-1" />
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">Click to upload logo image</span>
                <span className="text-[10px] text-neutral-400 mt-0.5">PNG, JPG, SVG or WEBP up to 5MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            )}

            {logoUrl && (
              <div className="mt-3 flex items-center gap-3 p-2 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] w-fit">
                <img
                  src={logoUrl}
                  alt="Logo preview"
                  className="w-10 h-10 rounded-lg object-contain bg-white dark:bg-[#0A1A14] border border-neutral-200 dark:border-white/10"
                />
                <div className="pr-3">
                  <p className="text-xs font-semibold text-neutral-900 dark:text-white">Active Logo Preview</p>
                  <button
                    type="button"
                    onClick={() => setLogoUrl('')}
                    className="text-[10px] text-red-500 hover:underline cursor-pointer font-medium"
                  >
                    Remove logo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. STORE REGIONAL & CURRENCY SETTINGS */}
        <div className="rounded-xl border border-[#E7ECE9] dark:border-[#1E342B] bg-white dark:bg-[#0E2018] p-4 sm:p-5 shadow-[0_2px_12px_rgba(20,50,40,0.03)] space-y-4">
          <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-100 dark:border-[#1E342B] pb-2.5">
            <Coins className="h-4 w-4 text-emerald-500" />
            <span>Store Regional &amp; Currency</span>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Store Currency */}
            <div>
              <label className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">
                Store Currency
              </label>
              <select
                value={storeCurrency}
                onChange={(e) => setStoreCurrency(e.target.value)}
                className="w-full rounded-xl border text-xs px-3 h-10 bg-neutral-50/70 dark:bg-[#11241C] border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all cursor-pointer font-medium"
              >
                <option value="INR">₹ India - Rupee (INR)</option>
                <option value="USD">$ United States - Dollar (USD)</option>
                <option value="EUR">€ Europe - Euro (EUR)</option>
                <option value="GBP">£ United Kingdom - Pound (GBP)</option>
                <option value="AED">د.إ UAE - Dirham (AED)</option>
                <option value="CAD">C$ Canada - Dollar (CAD)</option>
                <option value="AUD">A$ Australia - Dollar (AUD)</option>
                <option value="SGD">S$ Singapore - Dollar (SGD)</option>
              </select>
              <p className="text-[10px] text-neutral-400 mt-1.5">
                Applied to bills, POS register, thermal prints, and menu items.
              </p>
            </div>

            {/* Store Country */}
            <div>
              <label className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">
                Store Country
              </label>
              <select
                value={storeCountry}
                onChange={(e) => setStoreCountry(e.target.value)}
                className="w-full rounded-xl border text-xs px-3 h-10 bg-neutral-50/70 dark:bg-[#11241C] border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all cursor-pointer font-medium"
              >
                <option value="India">🇮🇳 India</option>
                <option value="United States">🇺🇸 United States</option>
                <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                <option value="United Kingdom">🇬🇧 United Kingdom</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="Australia">🇦🇺 Australia</option>
                <option value="Singapore">🇸🇬 Singapore</option>
                <option value="Germany">🇩🇪 Germany</option>
              </select>
              <p className="text-[10px] text-neutral-400 mt-1.5">
                Defines localization standards, default phone prefixes, and tax structures.
              </p>
            </div>
          </div>

          {/* Business Timezone */}
          <div>
            <label className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">
              Business Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-xl border text-xs px-3 h-10 bg-neutral-50/70 dark:bg-[#11241C] border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all cursor-pointer font-medium"
            >
              <option value="Asia/Kolkata">India Standard Time (Asia/Kolkata, IST +05:30)</option>
              <option value="Asia/Dubai">Gulf Standard Time (Asia/Dubai, GST +04:00)</option>
              <option value="Asia/Singapore">Singapore Time (Asia/Singapore, SGT +08:00)</option>
              <option value="Europe/London">British Time (Europe/London, GMT/BST)</option>
              <option value="America/New_York">Eastern Time (America/New_York, EST/EDT)</option>
              <option value="UTC">Coordinated Universal Time (UTC)</option>
            </select>
            <p className="text-[10px] text-neutral-400 mt-1.5">
              Controls order timestamps, receipts, kitchen tickets, and end-of-day reports.
            </p>
          </div>
        </div>

        {/* 3. CONTACT & STORE ADDRESS */}
        <div className="rounded-xl border border-[#E7ECE9] dark:border-[#1E342B] bg-white dark:bg-[#0E2018] p-4 sm:p-5 shadow-[0_2px_12px_rgba(20,50,40,0.03)] space-y-4">
          <p className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider flex items-center gap-2 border-b border-neutral-100 dark:border-[#1E342B] pb-2.5">
            <MapPin className="h-4 w-4 text-rose-500" />
            <span>Contact &amp; Store Location</span>
          </p>

          {/* Store Address */}
          <div>
            <label className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">
              Store Physical Address
            </label>
            <input
              type="text"
              className="w-full rounded-xl px-3.5 h-10 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all"
              placeholder="e.g. Shop #4, Ground Floor, Indiranagar 100ft Road, Bangalore - 560038"
              value={storeAddress}
              onChange={(e) => setStoreAddress(e.target.value)}
            />
            <p className="text-[10px] text-neutral-400 mt-1.5">
              Printed on thermal receipts and customer invoice headers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Store Phone Number */}
            <div>
              <label className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">
                Store Mobile / Phone Number
              </label>
              <div className="flex gap-2 w-full">
                <div className="w-[85px] shrink-0">
                  <input
                    type="text"
                    className="w-full rounded-xl h-10 text-center text-xs font-semibold bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all"
                    value={phoneCountryCode}
                    onChange={(e) => setPhoneCountryCode(e.target.value)}
                    placeholder="+91"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="tel"
                    className="w-full rounded-xl h-10 px-3.5 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <p className="text-[10px] text-neutral-400 mt-1.5">
                Customer support contact number shown on checkout &amp; invoices.
              </p>
            </div>

            {/* Store Contact Email */}
            <div>
              <label className="text-[10.5px] font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1.5 block">
                Store Contact Email
              </label>
              <input
                type="email"
                className="w-full rounded-xl h-10 px-3.5 text-xs outline-none bg-neutral-50/70 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E342B] text-neutral-900 dark:text-white focus:border-[#10B981] focus:bg-white dark:focus:bg-[#142D23] transition-all"
                placeholder="cafe@example.com"
                value={storeEmail}
                onChange={(e) => setStoreEmail(e.target.value)}
              />
              <p className="text-[10px] text-neutral-400 mt-1.5">
                Official store email for receipts, GSTR reports, and notifications.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Save Button Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Link
            href={`${basePath}/settings`}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-[#11241C] transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-2 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </DashboardShell>
  );
}
