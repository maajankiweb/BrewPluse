'use client';

import React, { useState } from 'react';
import {
  Users,
  Plus,
  Shield,
  KeyRound,
  Phone,
  CheckCircle2,
  X,
  UserCheck,
} from 'lucide-react';
import { useDemo, StaffMember } from '../demoContext';

export default function DemoStaffPage() {
  const { staff, addStaff } = useDemo();
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [name, setName] = useState('');
  const [role, setRole] = useState<StaffMember['role']>('Cashier');
  const [pin, setPin] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !pin) return;
    addStaff({
      name,
      role,
      pin,
      phone: phone || '+91 98765 00000',
      status: 'Active',
    });
    setName('');
    setPin('');
    setPhone('');
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <Users className="w-6 h-6 text-amber-500" />
            <span>Staff &amp; POS Access Control</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            4-digit PINs, cashier logins, and manager discount authorization codes.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {staff.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 shadow-2xs space-y-4 hover:border-amber-400 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-[#141210] dark:text-white">
                {member.name.slice(0, 2).toUpperCase()}
              </div>

              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  member.status === 'Active'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
                }`}
              >
                {member.status}
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-[#141210] dark:text-white">
                {member.name}
              </h3>
              <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1 mt-0.5">
                <Shield className="w-3.5 h-3.5" />
                <span>{member.role}</span>
              </p>
            </div>

            <div className="pt-3 border-t border-[#ebe8e3]/70 dark:border-[#222225] space-y-1 text-xs text-zinc-500 font-mono">
              <div className="flex justify-between">
                <span>POS PIN:</span>
                <span className="font-bold text-[#141210] dark:text-white">•••• ({member.pin})</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span>{member.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Staff Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b dark:border-zinc-700">
              <h3 className="font-extrabold text-sm text-[#141210] dark:text-white">
                Add Team Member
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as StaffMember['role'])}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-semibold"
                >
                  <option value="Store Manager">Store Manager (All Access)</option>
                  <option value="Head Barista">Head Barista (KDS + Prep)</option>
                  <option value="Cashier">Cashier (POS Billing)</option>
                  <option value="Steward">Steward (Tables)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  4-Digit POS Login PIN
                </label>
                <input
                  type="password"
                  maxLength={4}
                  required
                  placeholder="••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500 font-mono font-bold tracking-widest text-center"
                />
              </div>

              <div>
                <label className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl h-10 px-3 text-[#141210] dark:text-white focus:outline-none focus:border-amber-500"
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
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
