'use client';

import React, { useState } from 'react';
import {
  Globe2,
  X,
  CheckCircle2,
  Phone,
  Mail,
  Send,
  Building2,
  CreditCard,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface GlobalSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStoreName?: string;
}

export default function GlobalSetupModal({
  isOpen,
  onClose,
  defaultStoreName = '',
}: GlobalSetupModalProps) {
  const [cafeName, setCafeName] = useState(defaultStoreName);
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [tables, setTables] = useState('12');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/public/global-setup-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cafeName: cafeName.trim(),
          ownerName: ownerName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          country: country.trim(),
          city: city.trim(),
          desiredCurrency: currency,
          estimatedTables: Number(tables) || 10,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data?.error?.message || 'Failed to submit request.');
        setLoading(false);
        return;
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg('Network error. Please try again or contact us via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const whatsappConciergeUrl = `https://wa.me/919999999999?text=${encodeURIComponent(
    `Hello BrewPluse Global Team! I want custom international onboarding for my cafe "${cafeName || 'My Cafe'}" in ${city || 'my city'}, ${country}. Currency: ${currency}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
      <div className="bg-white dark:bg-[#0E2018] rounded-2xl sm:rounded-3xl max-w-2xl w-full border border-[#EAE8E4] dark:border-[#1E382E] p-5 sm:p-7 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#EAE8E4] dark:border-[#1E382E]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wider mb-0.5">
                <span>International Expansion Gate</span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#191716] dark:text-white tracking-tight">
                Global / International Cafe Onboarding
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-[#1E382E] text-gray-400 hover:text-black dark:hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Success Screen */
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-black text-[#191716] dark:text-white">
                Global Setup Request Received!
              </h3>
              <p className="text-xs text-[#706C66] dark:text-[#9AB2A8] mt-1.5 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{ownerName || 'Cafe Owner'}</strong>. Our Global Operations team has received your details for <strong>{cafeName}</strong> ({country}). We will reach out within 24 hours to provision your custom multi-currency POS and local VAT settings.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-[#142A21] border border-[#EAE8E4] dark:border-[#1E382E] max-w-md mx-auto text-left space-y-2.5">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                Need Instant Setup? Contact Founders Directly:
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <a
                  href={whatsappConciergeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>
                <a
                  href={`mailto:global@brewpluse.com?subject=Global%20Setup%20Request%20-%20${encodeURIComponent(cafeName)}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 text-gray-800 dark:text-gray-200 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>global@brewpluse.com</span>
                </a>
              </div>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#153326] text-white text-xs font-bold hover:bg-[#0E2219] cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          /* Form Screen */
          <div className="mt-4 space-y-4">
            
            {/* Notice Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 leading-relaxed">
              <strong className="font-bold">🇮🇳 Launch Status:</strong> BrewPluse self-serve ordering is currently launched for the <strong>Indian Market</strong> (Direct NPCI UPI QR &amp; INR ₹ with zero transaction gateway fee).
              <div className="mt-1">
                For international cafes operating in <strong>North America, UK, Europe, UAE, Singapore, or Australia</strong>, our team provides <strong>assisted custom onboarding</strong> to configure your local currency, international VAT/tax slabs, and Stripe/Square payment rails.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold border border-rose-200">
                  {errorMsg}
                </div>
              )}

              {/* Grid 1: Cafe Name & Owner Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Cafe / Restaurant Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. The Melbourne Roastery"
                    value={cafeName}
                    onChange={(e) => setCafeName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-semibold outline-none focus:border-blue-600 bg-white dark:bg-[#12241C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Owner / Manager Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Johnson"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-semibold outline-none focus:border-blue-600 bg-white dark:bg-[#12241C]"
                  />
                </div>
              </div>

              {/* Grid 2: Country, City & Currency */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Country *
                  </label>
                  <select
                    value={country}
                    onChange={(e) => {
                      const c = e.target.value;
                      setCountry(c);
                      if (c === 'United States') setCurrency('USD');
                      else if (c === 'United Kingdom') setCurrency('GBP');
                      else if (c === 'United Arab Emirates') setCurrency('AED');
                      else if (c === 'Singapore') setCurrency('SGD');
                      else if (c === 'Australia') setCurrency('AUD');
                      else if (c === 'Canada') setCurrency('CAD');
                      else if (c === 'European Union') setCurrency('EUR');
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-semibold outline-none focus:border-blue-600 bg-white dark:bg-[#12241C]"
                  >
                    <option value="United States">🇺🇸 United States</option>
                    <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
                    <option value="United Kingdom">🇬🇧 United Kingdom</option>
                    <option value="Canada">🇨🇦 Canada</option>
                    <option value="Singapore">🇸🇬 Singapore</option>
                    <option value="Australia">🇦🇺 Australia</option>
                    <option value="European Union">🇪🇺 European Union (Euro)</option>
                    <option value="Saudi Arabia">🇸🇦 Saudi Arabia</option>
                    <option value="Other">🌍 Other Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    City / State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dubai, London, New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-semibold outline-none focus:border-blue-600 bg-white dark:bg-[#12241C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Menu Currency *
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-mono font-bold outline-none focus:border-blue-600 bg-white dark:bg-[#12241C]"
                  >
                    <option value="USD">$ USD (US Dollar)</option>
                    <option value="AED">AED د.إ (UAE Dirham)</option>
                    <option value="GBP">£ GBP (British Pound)</option>
                    <option value="EUR">€ EUR (Euro)</option>
                    <option value="SGD">S$ SGD (Singapore Dollar)</option>
                    <option value="AUD">A$ AUD (Australian Dollar)</option>
                    <option value="CAD">C$ CAD (Canadian Dollar)</option>
                    <option value="SAR">SAR ﷼ (Saudi Riyal)</option>
                  </select>
                </div>
              </div>

              {/* Grid 3: Email & Phone/WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="manager@yourcafe.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-semibold outline-none focus:border-blue-600 bg-white dark:bg-[#12241C]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                    Phone / WhatsApp with Country Code *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +1 555-0199 or +971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs font-semibold outline-none focus:border-blue-600 bg-white dark:bg-[#12241C]"
                  />
                </div>
              </div>

              {/* Optional Notes */}
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Custom Requirements / Payment Gateway Preference (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. We need Stripe Terminal integration, 5% VAT receipt formatting, 25 dine-in tables..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#EAE8E4] dark:border-[#1E382E] text-xs outline-none focus:border-blue-600 bg-white dark:bg-[#12241C]"
                />
              </div>

              {/* Bottom Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#EAE8E4] dark:border-[#1E382E]">
                <a
                  href={whatsappConciergeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Chat directly on WhatsApp with Global Support</span>
                </a>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#EAE8E4] text-xs font-bold text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer disabled:opacity-50 inline-flex items-center justify-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{loading ? 'Submitting...' : 'Request Global Setup'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
