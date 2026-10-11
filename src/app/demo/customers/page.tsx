'use client';

import React, { useState } from 'react';
import {
  HeartHandshake,
  Search,
  Plus,
  Send,
  Award,
  Sparkles,
  X,
  Phone,
} from 'lucide-react';
import { useDemo } from '../demoContext';

export default function DemoCustomersPage() {
  const { customers, addCustomer, notify } = useDemo();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const handleSendWhatsapp = (cName: string) => {
    notify(`Sent 15% discount WhatsApp voucher to ${cName}`);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    addCustomer({ name, phone });
    setName('');
    setPhone('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <HeartHandshake className="w-6 h-6 text-amber-500" />
            <span>Customer Loyalty CRM</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Guest directory, automated points accrual, and WhatsApp marketing campaigns.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Register Guest</span>
        </button>
      </div>

      {/* 3 Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-bold text-zinc-500">Registered Cafe Guests</span>
          <p className="text-2xl font-black text-[#141210] dark:text-white mt-1">1,482</p>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">+14 new this week</p>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-bold text-zinc-500">Repeat Retention Rate</span>
          <p className="text-2xl font-black text-[#141210] dark:text-white mt-1">68.4%</p>
          <p className="text-[11px] text-zinc-400 mt-1">Visit 2+ times per month</p>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 shadow-2xs">
          <span className="text-xs font-bold text-zinc-500">Loyalty Points Balance</span>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">18,420 pts</p>
          <p className="text-[11px] text-zinc-400 mt-1">Worth ₹1,842 in store credit</p>
        </div>
      </div>

      {/* Directory Table */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#141210] dark:text-white">Guest Directory</h2>
          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or mobile..."
              className="w-full pl-9 pr-3 py-1.5 bg-neutral-50 dark:bg-zinc-800 border border-transparent focus:border-amber-500 rounded-xl text-xs text-[#141210] dark:text-white placeholder-zinc-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#ebe8e3] dark:border-[#222225] text-zinc-400 font-mono uppercase">
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Total Visits</th>
                <th className="py-2.5 px-3">Lifetime Spend</th>
                <th className="py-2.5 px-3">Loyalty Points</th>
                <th className="py-2.5 px-3">Last Visit</th>
                <th className="py-2.5 px-3 text-right">Marketing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebe8e3]/60 dark:divide-[#222225]">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-neutral-50 dark:hover:bg-zinc-800/40">
                  <td className="py-3 px-3 font-bold text-[#141210] dark:text-white">{c.name}</td>
                  <td className="py-3 px-3 font-mono text-zinc-500">{c.phone}</td>
                  <td className="py-3 px-3 font-mono">{c.visits} visits</td>
                  <td className="py-3 px-3 font-mono font-bold text-[#141210] dark:text-white">
                    ₹{c.totalSpent.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-300 dark:border-amber-800">
                      <Award className="w-3 h-3" />
                      <span>{c.loyaltyPoints} pts</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-zinc-500">{c.lastVisit}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleSendWhatsapp(c.name)}
                      className="px-2.5 py-1 rounded-lg border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 inline-flex items-center gap-1 font-semibold text-[11px]"
                    >
                      <Send className="w-3 h-3" />
                      <span>WhatsApp Offer</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Customer Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b dark:border-zinc-700">
              <h3 className="font-extrabold text-sm text-[#141210] dark:text-white">
                Register Customer
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Customer Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvi Shah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  WhatsApp Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-bold hover:bg-neutral-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md"
                >
                  Save Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
