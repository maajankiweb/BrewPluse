'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PrivacyChoices() {
  const [mounted, setMounted] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analytics, setAnalytics] = useState(true);
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
        setBannerVisible(false);
      } else {
        setBannerVisible(true);
      }
    } catch (e) {
      setBannerVisible(true);
    }

    const handleOpenModal = () => setModalOpen(true);
    window.addEventListener('open-privacy-modal', handleOpenModal);
    return () => window.removeEventListener('open-privacy-modal', handleOpenModal);
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
      setBannerVisible(false);
      setModalOpen(false);
    }
  }

  if (!mounted) return null;

  return (
    <>
      {/* 1. First-time bottom banner (shown if not yet configured) */}
      {bannerVisible && !modalOpen && (
        <div
          role="region"
          aria-label="Privacy & Cookie Preferences"
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xl z-50 p-5 sm:p-6 rounded-3xl bg-[#0e1612]/95 border border-emerald-950/80 shadow-2xl backdrop-blur-xl text-gray-300 font-sans animate-fade-in duration-300"
        >
          <div className="flex items-start gap-3.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[20px]">cookie</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                <span>Privacy &amp; Cookie Choices</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase">
                  DPDP Ready
                </span>
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                BrewPluse uses strictly necessary technologies to deliver cloud POS, secure logins, and dining orders. With your consent, we use optional analytics to measure site usage and optimize features.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs">
              <Link
                href="/contact"
                className="text-emerald-400 hover:text-emerald-300 underline font-medium"
              >
                Privacy Notice
              </Link>
              <span className="text-gray-600">·</span>
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="text-gray-400 hover:text-white underline font-medium cursor-pointer"
              >
                Customize
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSave(false, false, 'COOKIE_BANNER')}
                disabled={saving}
                className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
              >
                Decline Optional
              </button>
              <button
                type="button"
                onClick={() => handleSave(true, true, 'COOKIE_BANNER')}
                disabled={saving}
                className="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Preferences Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in duration-200">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="privacy-modal-title"
            className="w-full max-w-lg rounded-3xl bg-[#0f1713] border border-emerald-900/60 shadow-2xl p-6 sm:p-7 text-gray-300 font-sans max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
                <h3 id="privacy-modal-title" className="text-base font-bold text-white">
                  Privacy Preferences
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed mb-5">
              Under India's Digital Personal Data Protection Act, 2023 (DPDP), you have the right to choose which optional data processing activities you consent to. You may change or withdraw these choices at any time.
            </p>

            {/* Consent Options */}
            <div className="space-y-4 mb-6">
              {/* Option 1: Strictly Necessary */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">Strictly Necessary</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Essential for secure authentication, session management, CSRF defense, and cafe POS operation. Cannot be disabled.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  className="mt-1 h-4 w-4 rounded accent-emerald-600 cursor-not-allowed opacity-70"
                />
              </div>

              {/* Option 2: Analytics & Performance */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">Analytics &amp; Performance</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Google Analytics (GA4) with IP anonymization enabled. Helps us understand aggregated visitor flows to improve POS features.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="consent-analytics"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded accent-emerald-500 cursor-pointer"
                />
              </div>

              {/* Option 3: Marketing & Promotions */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white">Marketing &amp; Promotions</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase">
                      Optional
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Promotional hardware deals, cafe growth guides, and relevant POS product announcements.
                  </p>
                </div>
                <input
                  type="checkbox"
                  id="consent-marketing"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <Link
                href="/contact"
                onClick={() => setModalOpen(false)}
                className="text-xs text-emerald-400 hover:text-emerald-300 underline"
              >
                Data Rights Portal &amp; History
              </Link>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleSave(false, false, 'PREFERENCE_CENTER')}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold border border-white/10 transition-colors cursor-pointer"
                >
                  Reject All Optional
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(analytics, marketing, 'PREFERENCE_CENTER')}
                  disabled={saving}
                  className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm cursor-pointer"
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
