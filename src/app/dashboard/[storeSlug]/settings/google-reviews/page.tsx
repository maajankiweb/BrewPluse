'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { ArrowLeft, Star, Info, ExternalLink, Save, Check } from 'lucide-react';

export default function GoogleReviewsSettingsPage() {
  const params = useParams();
  const storeSlug = (params?.storeSlug as string) || 'brewpluse';

  const [mapsUrl, setMapsUrl] = useState('');
  const [placeId, setPlaceId] = useState('');
  const [customReviewUrl, setCustomReviewUrl] = useState('');
  const [saved, setSaved] = useState(false);

  // Computed destination
  const activeDestination =
    customReviewUrl.trim() ||
    (placeId.trim() ? `https://search.google.com/local/writereview?placeid=${placeId.trim()}` : '') ||
    mapsUrl.trim() ||
    '';

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="max-w-[1200px] mx-auto space-y-4 pb-12 font-sans text-neutral-800">
        {/* Back button */}
      <div className="flex items-center justify-between gap-4">
        <Link
          href={`/dashboard/${storeSlug}/settings`}
          className="group inline-flex items-center gap-1.5 h-8 px-3 rounded-lg bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 text-xs font-semibold shadow-xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-stone-500 group-hover:text-stone-900 transition-transform duration-150 group-hover:-translate-x-0.5" />
          <span>Back to Settings</span>
        </Link>
      </div>

      {/* Title Card */}
      <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
          <Star className="w-5 h-5 fill-emerald-600/20" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-stone-900 tracking-tight">Google Reviews</h1>
          <p className="text-xs text-stone-500 font-normal mt-0.5">
            Customer review and Google Maps configuration
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Info Alert */}
        {!activeDestination ? (
          <div className="p-4 rounded-2xl bg-stone-100 border border-stone-200 flex items-start gap-3">
            <Info className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
            <div className="space-y-0.5 min-w-0">
              <p className="text-xs font-bold text-stone-800">No Google Review or Maps link configured</p>
              <p className="text-[11px] text-stone-500">
                Add your Google Place ID or Google Maps profile link below to start collecting AI-assisted reviews.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5 min-w-0">
              <p className="text-xs font-bold text-emerald-800">Google Review Link Configured</p>
              <p className="text-[11px] text-emerald-600 truncate">Destination: {activeDestination}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <form onSubmit={handleSave} className="p-5 lg:p-6 rounded-2xl bg-white border border-stone-200 space-y-5 shadow-xs">
          <p className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2 border-b border-stone-100 pb-3">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            Google Review &amp; Maps Integration
          </p>

          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5 block">
              Google Maps URL
            </label>
            <input
              type="url"
              value={mapsUrl}
              onChange={(e) => setMapsUrl(e.target.value)}
              placeholder="https://maps.app.goo.gl/FXDdfYX9qFxzd8Va7"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/70 text-stone-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              Your cafe&apos;s standard Google Maps profile or short link. Used for navigation, directions, and as a review fallback.
            </p>
          </div>

          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5 block">
              Google Place ID (Recommended)
            </label>
            <input
              type="text"
              value={placeId}
              onChange={(e) => setPlaceId(e.target.value)}
              placeholder="e.g. ChIJN1t_tDeuEmsRUsoyG83frY4"
              className="w-full px-3 py-2 text-xs font-mono rounded-xl border border-stone-200 bg-stone-50/70 text-stone-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              When provided, BrewPluse automatically generates:{' '}
              <code className="text-[10px] bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-700">
                https://search.google.com/local/writereview?placeid=...
              </code>
            </p>
          </div>

          <div>
            <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1.5 block">
              Google Review URL (Custom / Official &ldquo;Get More Reviews&rdquo; Link)
            </label>
            <input
              type="url"
              value={customReviewUrl}
              onChange={(e) => setCustomReviewUrl(e.target.value)}
              placeholder="https://g.page/r/.../review"
              className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 bg-stone-50/70 text-stone-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition"
            />
            <p className="text-[11px] text-stone-400 mt-1">
              Optional override. If left empty and Place ID is provided, BrewPluse automatically creates the direct review link for you.
            </p>
          </div>

          {/* Active destination review box */}
          <div className="pt-3 border-t border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                Active Customer Review Destination
              </p>
              <p className="text-xs font-medium text-stone-700 mt-0.5 truncate max-w-md">
                {activeDestination || '(None configured)'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {activeDestination ? (
                <a
                  href={activeDestination}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold transition cursor-pointer"
                >
                  <span>Test Review Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 text-stone-400 text-xs font-bold cursor-not-allowed opacity-60"
                >
                  <span>Test Review Link</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saved ? 'Saved!' : 'Save Configuration'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </DashboardShell>
);
}
