'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PrivacyChoices() {
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('brewpluse_consent');
      if (stored) {
        const parsed = JSON.parse(stored);
        setAnalytics(!!parsed.analytics);
        setMarketing(!!parsed.marketing);
      }
    } catch (e) {
      // ignore
    }

    const handleOpenModal = () => setModalOpen(true);
    window.addEventListener('open-privacy-modal', handleOpenModal);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-privacy-modal', handleOpenModal);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  async function handleSave(analyticsVal: boolean, marketingVal: boolean, source = 'PREFERENCE_CENTER') {
    setSaving(true);
    try {
      const payload = {
        analytics: analyticsVal,
        marketing: marketingVal,
        timestamp: Date.now(),
        source,
      };

      try {
        localStorage.setItem('brewpluse_consent', JSON.stringify(payload));
        document.cookie = `brewpluse_consent=${encodeURIComponent(
          JSON.stringify(payload)
        )}; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax${
          location.protocol === 'https:' ? '; Secure' : ''
        }`;
        window.dispatchEvent(new CustomEvent('brewpluse-consent-updated', { detail: payload }));
      } catch (err) {}

      await fetch('/api/privacy/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch (e) {
      console.warn('Failed to save consent preference:', e);
    } finally {
      setSaving(false);
      setModalOpen(false);
    }
  }

  if (!mounted) return null;

  return (
    <>
      {/* 1. Floating Bottom-Left "Privacy Choices" Button (Always visible on bottom-left corner) */}
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        aria-label="Open Privacy Choices"
        className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1c1e1d] hover:bg-[#252b27] border border-[#2e3731] hover:border-emerald-500/50 shadow-xl shadow-black/50 text-[#e2e8f0] hover:text-white transition-all duration-200 cursor-pointer group active:scale-95"
      >
        {/* Quartered Shield Icon matching exact reference */}
        <svg
          className="w-5 h-5 shrink-0 transition-transform duration-200 group-hover:scale-105"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Shield outline */}
          <path
            d="M12 2L4 5.5V11.5C4 16.5 7.4 21.1 12 22.3C16.6 21.1 20 16.5 20 11.5V5.5L12 2Z"
            fill="#121815"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Top-Right Quadrant (Emerald) */}
          <path
            d="M12 3.8V11.5H18.2C18.1 8.8 16.5 6.4 14.2 5.2L12 3.8Z"
            fill="#10b981"
          />
          {/* Bottom-Left Quadrant (Emerald) */}
          <path
            d="M12 11.5H5.8C6.1 15.2 8.5 18.4 12 19.8V11.5Z"
            fill="#10b981"
          />
        </svg>

        {/* Text */}
        <span className="text-[13px] sm:text-sm font-medium tracking-tight font-sans">
          Privacy Choices
        </span>
      </button>

      {/* 2. Privacy Preferences Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
            className="w-full max-w-[500px] rounded-2xl bg-[#0d1410] border border-[#1b2720] shadow-2xl shadow-black/90 p-5 sm:p-6 text-gray-300 font-sans max-h-[92vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2.5">
                {/* Green Sliders Box */}
                <div className="w-8 h-8 rounded-lg bg-[#14261c] border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <circle cx="8" cy="6" r="2.5" fill="#14261c" stroke="currentColor" strokeWidth="2" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <circle cx="16" cy="12" r="2.5" fill="#14261c" stroke="currentColor" strokeWidth="2" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                    <circle cx="8" cy="18" r="2.5" fill="#14261c" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h2 id="privacy-modal-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Privacy Preferences
                </h2>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Intro Description */}
            <p className="text-xs text-gray-400 leading-relaxed mt-2 mb-4">
              Under India's Digital Personal Data Protection Act, 2023 (DPDP), you have the right to choose which optional data processing activities you consent to. You may change or withdraw these choices at any time.
            </p>

            {/* Category Cards Stack */}
            <div className="space-y-3 mb-5">
              {/* Card 1: Strictly Necessary */}
              <div className="p-4 rounded-xl bg-[#131b16] border border-[#1e2821] flex items-start justify-between gap-3">
                <div className="pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-bold text-white">Strictly Necessary</span>
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#132c20] text-[#10b981] border border-emerald-900/60 uppercase">
                      ALWAYS ACTIVE
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Essential for secure Google OAuth authentication, session management, CSRF defense, and cafe POS operation. Cannot be disabled.
                  </p>
                </div>
                <div className="mt-1 w-4 h-4 rounded bg-[#4b5563] flex items-center justify-center shrink-0 cursor-not-allowed">
                  <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              {/* Card 2: Analytics & Performance */}
              <div
                onClick={() => setAnalytics(!analytics)}
                className="p-4 rounded-xl bg-[#131b16] border border-[#1e2821] hover:border-emerald-900/60 transition-colors flex items-start justify-between gap-3 cursor-pointer select-none"
              >
                <div className="pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-bold text-white">Analytics &amp; Performance</span>
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#382b12] text-[#f59e0b] border border-amber-900/60 uppercase">
                      OPTIONAL
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Google Analytics (GA4) with IP anonymization enabled. Helps us understand aggregated visitor flows to improve POS features.
                  </p>
                </div>
                <div
                  role="checkbox"
                  aria-checked={analytics}
                  className={`mt-1 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                    analytics ? 'bg-emerald-600 border border-emerald-500' : 'bg-[#18201a] border border-gray-600 hover:border-gray-400'
                  }`}
                >
                  {analytics && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Card 3: Marketing & Promotions */}
              <div
                onClick={() => setMarketing(!marketing)}
                className="p-4 rounded-xl bg-[#131b16] border border-[#1e2821] hover:border-emerald-900/60 transition-colors flex items-start justify-between gap-3 cursor-pointer select-none"
              >
                <div className="pr-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs sm:text-sm font-bold text-white">Marketing &amp; Promotions</span>
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#382b12] text-[#f59e0b] border border-amber-900/60 uppercase">
                      OPTIONAL
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Promotional hardware deals, cafe growth guides, and relevant POS product announcements.
                  </p>
                </div>
                <div
                  role="checkbox"
                  aria-checked={marketing}
                  className={`mt-1 w-4 h-4 rounded flex items-center justify-center shrink-0 transition-colors ${
                    marketing ? 'bg-emerald-600 border border-emerald-500' : 'bg-[#18201a] border border-gray-600 hover:border-gray-400'
                  }`}
                >
                  {marketing && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
              <Link
                href="/privacy/data-rights"
                onClick={() => setModalOpen(false)}
                className="text-xs font-medium text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/50 hover:decoration-emerald-400 transition-colors self-start sm:self-center"
              >
                Data Rights Portal &amp; History
              </Link>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleSave(false, false, 'REJECT_ALL')}
                  disabled={saving}
                  className="px-4 py-2 rounded-full bg-[#1b231d] hover:bg-[#253128] text-gray-200 text-xs font-semibold border border-neutral-700/80 transition-all cursor-pointer disabled:opacity-50"
                >
                  Reject All Optional
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(analytics, marketing, 'SAVE_CHOICES')}
                  disabled={saving}
                  className="px-5 py-2 rounded-full bg-[#009966] hover:bg-[#00b075] text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/60 cursor-pointer disabled:opacity-50"
                >
                  Save Choices
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
