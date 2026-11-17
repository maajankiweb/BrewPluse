'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cafeName: '',
    city: '',
    outlets: '1 Outlet',
    interests: ['Cloud POS & Billing'],
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const interestOptions = [
    'Cloud POS & Billing',
    'QR Table Ordering',
    'Kitchen Display (KDS)',
    'Thermal Printers & Hardware',
    'Inventory & Recipes',
    'Enterprise Multi-Outlet Setup',
  ];

  const handleInterestToggle = (option: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(option);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((i) => i !== option)
          : [...prev.interests, option],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        setErrorMsg(data.errors?.[0] || data.message || 'Failed to submit form. Please try again.');
      }
    } catch (err: any) {
      setErrorMsg('Network error. Please message us directly on WhatsApp or Email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#080E0B] text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      {/* Background ambient radial gradients */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-4 shadow-sm">
            <span>DIRECT SUPPORT &amp; ONBOARDING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            We&apos;re here to help your cafe <span className="text-emerald-400">thrive.</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions about 5-minute onboarding, thermal printer hardware, or custom menu digitalization? Reach out and our team will assist you promptly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Channels & Legal Identity */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* WhatsApp Card */}
            <div className="p-6 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
                  💬
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">WhatsApp &amp; Phone Desk</h3>
                  <p className="text-xs text-gray-400">Fastest response for active cafe floor inquiries.</p>
                </div>
              </div>
              <a
                href="https://wa.me/919471273041?text=Hi%20BrewPluse%20team,%20I%20would%20like%20to%20know%20more%20about%20setting%20up%20my%20cafe."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs transition-colors shadow-lg"
              >
                <span>Chat on WhatsApp (+91 9471273041) →</span>
              </a>
            </div>

            {/* Email Support Card */}
            <div className="p-6 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xl">
                  ✉️
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Email Operations Desk</h3>
                  <p className="text-xs text-gray-400">Account questions, hardware specs &amp; partnerships.</p>
                </div>
              </div>
              <a
                href="mailto:support@brewpluse.com"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-white/10 transition-colors"
              >
                <span>support@brewpluse.com →</span>
              </a>
            </div>

            {/* Live System Status Card */}
            <div className="p-6 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-xl hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <h4 className="text-sm font-bold text-white">System Operations Status</h4>
                    <p className="text-xs text-gray-400 font-mono">All Cloud POS &amp; KDS Systems 100% Operational</p>
                  </div>
                </div>
                <Link
                  href="/status"
                  className="text-xs font-mono text-emerald-400 underline hover:text-emerald-300"
                >
                  Live Health ↗
                </Link>
              </div>
            </div>

            {/* Legal Entity Card */}
            <div className="p-6 rounded-3xl bg-[#0D1612]/70 border border-white/5 text-xs text-gray-400 space-y-2 font-mono">
              <div className="text-sm font-bold text-gray-300 font-sans mb-2">Registered Entity Details</div>
              <div><strong className="text-gray-300">Legal Entity:</strong> BrewPluse Technologies (Ashish Kumar)</div>
              <div><strong className="text-gray-300">Trade Name:</strong> BrewPluse Cafe OS</div>
              <div><strong className="text-gray-300">HQ Operating Hub:</strong> Bangalore &amp; Bihar, India</div>
              <div><strong className="text-gray-300">Official Email:</strong> support@brewpluse.com</div>
              <div><strong className="text-gray-300">Direct Contact:</strong> +91 9471273041</div>
            </div>

          </div>

          {/* Right Column: Structured Lead Qualification Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#0D1612] border border-[#1E362B] shadow-2xl relative">
            
            {success ? (
              <div className="py-12 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-3xl border border-emerald-500/30">
                  ✓
                </div>
                <h3 className="text-2xl font-extrabold text-white">Thank You for Connecting!</h3>
                <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                  We have received your cafe details. A BrewPluse onboarding specialist will reach out to you via WhatsApp and phone within 2 hours.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <Link
                    href="/demo"
                    className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-xs transition"
                  >
                    Test Live Sandbox Demo Now →
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setSuccess(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        cafeName: '',
                        city: '',
                        outlets: '1 Outlet',
                        interests: ['Cloud POS & Billing'],
                        message: '',
                      });
                    }}
                    className="py-3 px-6 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/10 transition"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    GET FREE ASSISTED SETUP
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    Tell Us About Your Cafe
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    Fill out the form below and we will help you configure your digital menu and thermal printers.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
                    ⚠️ {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#080E0B] border border-[#1E362B] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#080E0B] border border-[#1E362B] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@cafe.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#080E0B] border border-[#1E362B] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      CAFE / BUSINESS NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Roasters Coffee Co."
                      value={formData.cafeName}
                      onChange={(e) => setFormData({ ...formData, cafeName: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#080E0B] border border-[#1E362B] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      CITY / LOCATION *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bangalore, Mumbai, Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#080E0B] border border-[#1E362B] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-300 mb-1.5">
                      NUMBER OF OUTLETS
                    </label>
                    <select
                      value={formData.outlets}
                      onChange={(e) => setFormData({ ...formData, outlets: e.target.value })}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#080E0B] border border-[#1E362B] text-white text-xs focus:outline-none focus:border-emerald-500"
                    >
                      <option value="1 Outlet">Single Cafe (1 Outlet)</option>
                      <option value="2-5 Outlets">Growing Brand (2–5 Outlets)</option>
                      <option value="6+ Outlets">Franchise / Chain (6+ Outlets)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-2">
                    FEATURES YOU REQUIRE (SELECT ALL THAT APPLY)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {interestOptions.map((opt) => {
                      const isSelected = formData.interests.includes(opt);
                      return (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => handleInterestToggle(opt)}
                          className={`p-2.5 rounded-xl text-[11px] font-medium text-left border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                              : 'bg-[#080E0B] border-[#1E362B] text-gray-400 hover:border-gray-600'
                          }`}
                        >
                          <span className="mr-1">{isSelected ? '✓' : '+'}</span> {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-1.5">
                    SPECIFIC QUESTIONS OR REQUIREMENTS (OPTIONAL)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your current POS setup, printer models, or any questions you have..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3.5 rounded-xl bg-[#080E0B] border border-[#1E362B] text-white text-xs placeholder-gray-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-black font-extrabold text-sm transition-all shadow-xl shadow-emerald-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? 'Submitting Inquiry...' : 'Submit Inquiry & Request Callback →'}
                </button>

                <p className="text-[11px] font-mono text-gray-400 text-center">
                  🔒 Zero spam guarantee. We will never share your cafe details with aggregators.
                </p>
              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
