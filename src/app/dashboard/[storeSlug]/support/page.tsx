'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  ExternalLink,
  MessageCircle,
  Bug,
  Lightbulb,
  Inbox,
  Send,
  CheckCircle2
} from 'lucide-react';

interface SupportTicket {
  id: string;
  type: 'bug' | 'feature';
  title: string;
  description: string;
  status: 'Open' | 'Under Review' | 'Resolved';
  date: string;
}

export default function SupportPage() {
  const params = useParams();
  const storeSlug = (params?.storeSlug as string) || 'brewpluse';

  const [activeTab, setActiveTab] = useState<'requests' | 'bug' | 'feature'>('requests');
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  // Form states
  const [ticketTitle, setTicketTitle] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');
  const [ticketCategory, setTicketCategory] = useState('POS & Billing');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketTitle || !ticketDesc) return;

    const newTicket: SupportTicket = {
      id: `TICK-${Math.floor(1000 + Math.random() * 9000)}`,
      type: activeTab === 'bug' ? 'bug' : 'feature',
      title: ticketTitle,
      description: ticketDesc,
      status: 'Open',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    setTickets([newTicket, ...tickets]);
    setTicketTitle('');
    setTicketDesc('');
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setActiveTab('requests');
    }, 1500);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="mx-auto max-w-2xl space-y-4 pb-12 font-sans text-neutral-800">
        {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-stone-900">Support</h1>
          <p className="text-xs text-stone-500 mt-0.5">
            Track your requests or submit a new bug report / feature request
          </p>
        </div>
        <a
          href="https://wa.me/919471273041"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-lg h-8 px-3 shadow-xs transition-all active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <MessageCircle className="h-3.5 w-3.5 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* System Status Banner */}
      <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="relative flex h-3 w-3 ml-0.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-xs sm:text-sm text-stone-900">BrewPluse System Status</h3>
              <span className="text-[9px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-500/30">
                All Systems Operational
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Live uptime, API gateway, database &amp; payment webhook monitoring
            </p>
          </div>
        </div>
        <Link
          href="/status"
          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white border border-emerald-500/30 text-emerald-700 hover:bg-emerald-50 transition-all shrink-0 self-start sm:self-auto shadow-xs"
        >
          <span>View Live Status</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>



      {/* Direct WhatsApp Box */}
      <div className="p-4 border border-stone-200 bg-white rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
        <div>
          <h3 className="font-bold text-xs sm:text-sm text-stone-900">Direct WhatsApp Support</h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Chat directly with our technical &amp; support team on WhatsApp for fast assistance and onboarding guidance.
          </p>
        </div>
        <a
          href="https://wa.me/919471273041"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-lg h-8 px-3 shadow-xs transition-all active:scale-95 shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <MessageCircle className="h-3.5 w-3.5 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Ticketing Tabs & Panel */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-xs space-y-4">
        <div className="flex border-b border-stone-100 pb-2 gap-2">
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'requests' ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>My Requests ({tickets.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('bug')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'bug' ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Bug className="w-3.5 h-3.5 text-red-500" />
            <span>Report a Bug</span>
          </button>
          <button
            onClick={() => setActiveTab('feature')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center gap-1.5 ${
              activeTab === 'feature' ? 'bg-stone-100 text-stone-900' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Request a Feature</span>
          </button>
        </div>

        {activeTab === 'requests' && (
          <div>
            {tickets.length === 0 ? (
              <div className="text-center py-8 px-4 rounded-xl bg-stone-50/60 border border-dashed border-stone-200">
                <p className="text-xs font-bold text-stone-700">No requests yet</p>
                <p className="text-[11px] text-stone-400 mt-1">
                  Submit a bug report or feature request using the tabs above.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {tickets.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-stone-500">{t.id}</span>
                        <span className="text-xs font-bold text-stone-900">{t.title}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1">{t.description}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {t.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {(activeTab === 'bug' || activeTab === 'feature') && (
          <form onSubmit={handleSubmit} className="space-y-3">
            {submitted ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Ticket submitted successfully! We will follow up via email/WhatsApp.</span>
              </div>
            ) : (
              <>
                <div>
                  <label className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                    {activeTab === 'bug' ? 'Issue Summary *' : 'Feature Title *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={ticketTitle}
                    onChange={(e) => setTicketTitle(e.target.value)}
                    placeholder={activeTab === 'bug' ? 'e.g. Printer disconnected during receipt print' : 'e.g. Add Zomato integration'}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                    Category
                  </label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium outline-none bg-white"
                  >
                    <option>POS &amp; Billing</option>
                    <option>QR Ordering &amp; Menus</option>
                    <option>Thermal Printers &amp; Hardware</option>
                    <option>KDS &amp; Kitchen Display</option>
                    <option>Staff &amp; Permissions</option>
                    <option>Other / Account</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-stone-600 uppercase tracking-wider block mb-1">
                    Detailed Explanation *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={ticketDesc}
                    onChange={(e) => setTicketDesc(e.target.value)}
                    placeholder="Provide details on what happened or what you would like to see..."
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-medium outline-none focus:border-stone-900 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider transition active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  </DashboardShell>
);
}
