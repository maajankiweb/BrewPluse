'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  ChevronLeft,
  Save,
  Clock,
  MapPin,
  Phone,
  Mail,
  Shield,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';

export default function DemoBusinessProfilePage() {
  const { notify } = useDemo();
  const [storeName, setStoreName] = useState('BrewPluse Flagship Cafe & Roastery');
  const [tagline, setTagline] = useState('Artisanal Specialty Coffee & Daily Bakes');
  const [address, setAddress] = useState('Plot 42, 100ft Road, Indiranagar, Bengaluru, KA 560038');
  const [phone, setPhone] = useState('+91 90165 03434');
  const [email, setEmail] = useState('contact@brewpluse.com');
  const [gstin, setGstin] = useState('29AABCB1234F1Z0');
  const [fssai, setFssai] = useState('11523034000129');
  const [hours, setHours] = useState('Mon - Sun: 07:00 AM - 11:00 PM');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    notify('Business profile updated successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 animate-fade-in">
      <Link
        href="/demo/settings"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-amber-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Settings</span>
      </Link>

      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
          <Building2 className="w-6 h-6 text-amber-500" />
          <span>Business Profile &amp; Store Details</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Your cafe branding, legal registration numbers, and contact details printed on customer invoices.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[24px] p-6 sm:p-8 shadow-2xs space-y-5 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Store / Cafe Name
            </label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-semibold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Tagline / Brand Bio
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
            Physical Outlet Address
          </label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Contact Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Contact Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              GSTIN (Goods &amp; Services Tax Number)
            </label>
            <input
              type="text"
              value={gstin}
              onChange={(e) => setGstin(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono uppercase font-bold focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              FSSAI Food License Number
            </label>
            <input
              type="text"
              value={fssai}
              onChange={(e) => setFssai(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white font-mono focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
            Operating Store Hours
          </label>
          <input
            type="text"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="pt-3 border-t border-[#ebe8e3] dark:border-[#222225] flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
}
