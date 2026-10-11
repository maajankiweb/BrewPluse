'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  MessageCircle,
  Mail,
  Send,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { useDemo } from '../demoContext';

export default function DemoSupportPage() {
  const { notify } = useDemo();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !message) return;
    notify('Support ticket raised. Priority team will reach out via WhatsApp/email within 15 minutes.');
    setSubject('');
    setMessage('');
  };

  const faqs = [
    {
      q: 'How do I connect my 80mm Bluetooth thermal printer?',
      a: 'Go to Settings > Thermal Printers. Turn on Bluetooth on your POS tablet, search for your printer model (e.g. Everycom / Sunmi / EPSON), and click "Pair & Test Print".',
    },
    {
      q: 'How is the ₹1/order fee billed?',
      a: 'BrewPluse software has zero monthly recurring costs. We only meter successful processed orders at ₹1.00 each. Billing statements auto-settle upon reaching ₹200.00 or monthly on the 1st.',
    },
    {
      q: 'Can customers order and pay directly through the Table QR code?',
      a: 'Yes! Customers scan the QR code using their camera, view the live digital menu, customize options, and can pay via UPI or select "Pay at Counter". Orders flow directly to POS and KDS.',
    },
    {
      q: 'Does BrewPluse POS function during internet disruptions?',
      a: 'Yes. Our Progressive Web App architecture caches orders and table states locally in browser IndexedDB, automatically synchronizing as soon as connectivity resumes.',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
          <HelpCircle className="w-6 h-6 text-amber-500" />
          <span>Help &amp; Merchant Support Center</span>
        </h1>
        <p className="text-xs text-[#686259] dark:text-zinc-400">
          Dedicated 24/7 technical assistance for cafe operators, baristas, and floor managers.
        </p>
      </div>

      {/* 3 Contact Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href="https://wa.me/919016503434"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-[#121214] border border-emerald-300 dark:border-emerald-800 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#141210] dark:text-white group-hover:text-emerald-600">
            WhatsApp Live Desk
          </h3>
          <p className="text-xs text-zinc-500">
            Immediate replies from onboarding engineers.
          </p>
          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 block pt-1">
            +91 90165 03434 &rarr;
          </span>
        </a>

        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#141210] dark:text-white">Email Helpdesk</h3>
          <p className="text-xs text-zinc-500">For invoice disputes, GST queries &amp; reports.</p>
          <span className="text-[11px] font-mono font-bold text-indigo-600 dark:text-indigo-400 block pt-1">
            support@brewpluse.com
          </span>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 shadow-2xs space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <PhoneCall className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-[#141210] dark:text-white">Emergency Hotline</h3>
          <p className="text-xs text-zinc-500">Live operational assistance during peak rush hours.</p>
          <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 block pt-1">
            1800-BREW-PULSE
          </span>
        </div>
      </div>

      {/* Ticket Submission Form */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#141210] dark:text-white">
          Submit Support Ticket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Issue Subject
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Bluetooth printer disconnection on Table 4"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
              Description &amp; Hardware Details
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe what occurred, any error code, or tablet device model..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Priority Ticket</span>
          </button>
        </form>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 sm:p-8 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#141210] dark:text-white">
          Frequently Answered Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-[#ebe8e3] dark:border-[#222225] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-4 text-left font-bold text-xs text-[#141210] dark:text-white flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform ${
                    openFaq === idx ? 'rotate-180 text-amber-500' : ''
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-xs text-zinc-500 dark:text-zinc-400 border-t border-[#ebe8e3]/60 dark:border-[#222225] leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
