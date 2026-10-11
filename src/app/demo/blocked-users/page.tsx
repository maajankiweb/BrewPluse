'use client';

import React, { useState } from 'react';
import {
  ShieldAlert,
  Plus,
  Trash2,
  X,
  Phone,
} from 'lucide-react';
import { useDemo } from '../demoContext';

interface BlockedRecord {
  id: string;
  phone: string;
  reason: string;
  date: string;
}

const INITIAL_BLOCKED: BlockedRecord[] = [
  { id: 'b-1', phone: '+91 99888 11223', reason: 'Repeated prank table QR orders', date: '04 Oct 2026' },
  { id: 'b-2', phone: '+91 91234 98765', reason: 'Unsettled dine-in walkout', date: '28 Sep 2026' },
];

export default function DemoBlockedUsersPage() {
  const { notify } = useDemo();
  const [blocked, setBlocked] = useState<BlockedRecord[]>(INITIAL_BLOCKED);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [reason, setReason] = useState('');

  const handleUnblock = (id: string, ph: string) => {
    setBlocked((prev) => prev.filter((b) => b.id !== id));
    notify(`Unblocked customer ${ph}`);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    const newEntry: BlockedRecord = {
      id: `b-${Date.now()}`,
      phone,
      reason: reason || 'Suspicious order activity',
      date: 'Today',
    };
    setBlocked((prev) => [newEntry, ...prev]);
    notify(`Added ${phone} to security blacklist`);
    setPhone('');
    setReason('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <ShieldAlert className="w-6 h-6 text-rose-500" />
            <span>Blocked Customers &amp; Spam Shield</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Prevent fraudulent table QR ordering and blacklist non-paying phone numbers.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Blacklist Number</span>
        </button>
      </div>

      {/* Blocked List Table */}
      <div className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-[22px] p-6 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-[#141210] dark:text-white">Active Blacklist</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#ebe8e3] dark:border-[#222225] text-zinc-400 font-mono uppercase">
                <th className="py-2.5 px-3">Mobile Number</th>
                <th className="py-2.5 px-3">Blacklist Reason</th>
                <th className="py-2.5 px-3">Blocked Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ebe8e3]/60 dark:divide-[#222225]">
              {blocked.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-zinc-400">
                    No customers currently blocked.
                  </td>
                </tr>
              ) : (
                blocked.map((b) => (
                  <tr key={b.id} className="hover:bg-neutral-50 dark:hover:bg-zinc-800/40">
                    <td className="py-3 px-3 font-mono font-bold text-rose-600 dark:text-rose-400">
                      {b.phone}
                    </td>
                    <td className="py-3 px-3 text-zinc-600 dark:text-zinc-300">{b.reason}</td>
                    <td className="py-3 px-3 text-zinc-400 font-mono">{b.date}</td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleUnblock(b.id, b.phone)}
                        className="px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold text-[11px]"
                      >
                        Unblock
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Block Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b dark:border-zinc-700">
              <h3 className="font-extrabold text-sm text-[#141210] dark:text-white">
                Blacklist Mobile Number
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-rose-500 font-mono font-bold"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Reason for Blacklisting
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fake order spamming"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-rose-500"
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
                  className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-md"
                >
                  Block Number
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
