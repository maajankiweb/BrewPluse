'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Users,
  RefreshCw,
  TrendingUp,
  Shield,
  Activity,
  Trophy,
  Zap,
  Star,
  Flame,
  UserPlus,
  Mail,
  Phone,
  KeyRound,
  Trash2,
  CheckCircle2,
  X,
  Send,
  BadgeCheck,
  Clock,
} from 'lucide-react';
import { useToast } from '@/components/Toast';

interface StaffMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'Waiter' | 'Cashier' | 'Kitchen Chef' | 'Store Manager';
  pin: string;
  status: 'Active' | 'Invited';
  dateAdded: string;
}

const DEFAULT_STAFF: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Rahul Sharma',
    email: 'rahul.pos@brewpluse.com',
    phone: '+91 98765 43210',
    role: 'Cashier',
    pin: '1024',
    status: 'Active',
    dateAdded: 'Oct 01, 2026',
  },
  {
    id: 'staff-2',
    name: 'Priya Patel',
    email: 'priya.barista@brewpluse.com',
    phone: '+91 98123 45678',
    role: 'Kitchen Chef',
    pin: '2048',
    status: 'Active',
    dateAdded: 'Oct 04, 2026',
  },
  {
    id: 'staff-3',
    name: 'Amit Verma',
    email: 'amit.waiter@brewpluse.com',
    phone: '+91 97001 22334',
    role: 'Waiter',
    pin: '3096',
    status: 'Active',
    dateAdded: 'Oct 08, 2026',
  },
];

export default function StaffManagementPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const toast = useToast();

  const [activeTab, setActiveTab] = useState<'team' | 'performance'>('team');
  const [timeWindow, setTimeWindow] = useState('Today');
  const [staffList, setStaffList] = useState<StaffMember[]>([]);

  // Invite Modal State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePhone, setInvitePhone] = useState('');
  const [inviteRole, setInviteRole] = useState<'Waiter' | 'Cashier' | 'Kitchen Chef' | 'Store Manager'>('Waiter');
  const [invitePin, setInvitePin] = useState('');
  const [sendingInvite, setSendingInvite] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(`brewpluse::staff_${storeSlug}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setStaffList(parsed);
            return;
          }
        }
      } catch (e) {}
      setStaffList(DEFAULT_STAFF);
      try {
        localStorage.setItem(`brewpluse::staff_${storeSlug}`, JSON.stringify(DEFAULT_STAFF));
      } catch (e) {}
    }
  }, [storeSlug]);

  const saveStaff = (updated: StaffMember[]) => {
    setStaffList(updated);
    try {
      localStorage.setItem(`brewpluse::staff_${storeSlug}`, JSON.stringify(updated));
    } catch (e) {}
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) {
      toast.error('Please enter staff name and email address');
      return;
    }

    setSendingInvite(true);
    setTimeout(() => {
      const newMember: StaffMember = {
        id: `staff-${Date.now()}`,
        name: inviteName.trim(),
        email: inviteEmail.trim(),
        phone: invitePhone.trim() || undefined,
        role: inviteRole,
        pin: invitePin.trim() || String(Math.floor(1000 + Math.random() * 9000)),
        status: 'Invited',
        dateAdded: 'Today',
      };

      const updated = [newMember, ...staffList];
      saveStaff(updated);
      setSendingInvite(false);
      setIsInviteModalOpen(false);
      setInviteName('');
      setInviteEmail('');
      setInvitePhone('');
      setInvitePin('');

      toast.success(`Invitation sent to ${newMember.email}! Link active for 7 days.`);
    }, 600);
  };

  const handleDeleteStaff = (id: string, name: string) => {
    if (confirm(`Remove staff member ${name}? They will lose access immediately.`)) {
      const updated = staffList.filter((s) => s.id !== id);
      saveStaff(updated);
      toast.success(`${name} removed successfully.`);
    }
  };

  const timeOptions = [
    'Today',
    'Yesterday',
    'Last 7 Days',
    'This Week',
    'Last Week',
    'This Month',
    'Last 30 Days',
  ];

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4 font-sans text-[#111827] dark:text-zinc-200 pb-12 animate-in fade-in duration-300">
        {/* Top Header Card */}
        <div className="bg-[#0B2B1A] border border-[#071C12] p-4 rounded-2xl shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-[#071C12] border border-white/10 p-2.5 text-[#10B981] mt-0.5 shrink-0 shadow-inner">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Staff Management &amp; Access Controls
                </h1>
                <p className="text-xs text-[#C7D9D0] mt-0.5 font-medium">
                  Invite floor waitstaff, cashiers, chefs, and managers with role-based permissions and PIN codes.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold rounded-xl h-9 px-4 text-xs inline-flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <UserPlus className="h-4 w-4" />
                <span>Invite Staff</span>
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('team')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'team'
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'text-[#C7D9D0] hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <Shield className="h-3.5 w-3.5" />
              <span>Team Roster &amp; Roles ({staffList.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('performance')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'performance'
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'text-[#C7D9D0] hover:bg-white/[0.06] hover:text-white'
              }`}
            >
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Performance Analytics</span>
            </button>
          </div>
        </div>

        {/* TAB 1: TEAM & ROLES */}
        {activeTab === 'team' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-neutral-900 dark:text-white">Active Team Members</h2>
                <p className="text-xs text-neutral-500">
                  Staff can log into the POS app with their email invite or quick 4-digit PIN.
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                {staffList.filter((s) => s.status === 'Active').length} Active Accounts
              </span>
            </div>

            {/* Staff Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {staffList.map((staff) => (
                <div
                  key={staff.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] shadow-2xs space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center font-bold text-sm">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900 dark:text-white">{staff.name}</h4>
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                            staff.role === 'Store Manager'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : staff.role === 'Cashier'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : staff.role === 'Kitchen Chef'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {staff.role}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteStaff(staff.id, staff.name)}
                      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer"
                      title="Remove Staff"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-400 pt-1 border-t border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{staff.email}</span>
                    </div>
                    {staff.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                        <span>{staff.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-1.5 text-neutral-500 font-mono text-[11px]">
                        <KeyRound className="w-3.5 h-3.5" />
                        <span>PIN: •••• ({staff.pin})</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          staff.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        ● {staff.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PERFORMANCE */}
        {activeTab === 'performance' && (
          <div className="space-y-4">
            {/* Time Window Bar */}
            <div className="flex items-center justify-between gap-3 flex-wrap bg-[#0B2B1A] border border-[#071C12] p-2.5 sm:p-3 rounded-xl">
              <span className="text-[11px] font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5 text-[#10B981]" />
                <span>Time Window:</span>
              </span>
              <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                {timeOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setTimeWindow(opt)}
                    className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      timeWindow === opt
                        ? 'bg-[#F59E0B] text-[#111827] shadow-xs'
                        : 'text-[#C7D9D0] hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Performance Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Most Orders</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">Rahul (42 orders)</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Leader today</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Fastest Kitchen Prep</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">Priya (3m 12s avg)</p>
                  <p className="text-[10px] text-neutral-400">Barista queue</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                  <Star className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Top Rated Server</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">Amit (4.9 ★)</p>
                  <p className="text-[10px] text-neutral-400">18 customer reviews</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-neutral-200 dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shadow-xs flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-neutral-400 uppercase">Best Shift Streak</p>
                  <p className="text-sm font-bold text-neutral-900 dark:text-white">6 Days Perfect</p>
                  <p className="text-[10px] text-neutral-400">Zero late punches</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invite Staff Modal */}
        {isInviteModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#0E2018] rounded-3xl max-w-md w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 dark:text-white">Invite Team Member</h3>
                    <p className="text-xs text-neutral-500">Send an invitation link &amp; setup permissions</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-black dark:hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSendInvite} className="p-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Joshi"
                    value={inviteName}
                    onChange={(e) => setInviteName(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E382E] text-xs font-medium focus:outline-none focus:border-[#0B2B1A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                    Email Address * (for invite link)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="vikram@cafe.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E382E] text-xs font-medium focus:outline-none focus:border-[#0B2B1A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 00000"
                      value={invitePhone}
                      onChange={(e) => setInvitePhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E382E] text-xs font-medium focus:outline-none focus:border-[#0B2B1A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1">
                      POS PIN (4-Digits)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="e.g. 4021"
                      value={invitePin}
                      onChange={(e) => setInvitePin(e.target.value.replace(/\D/g, ''))}
                      className="w-full h-10 px-3 rounded-xl bg-neutral-50 dark:bg-[#11241C] border border-neutral-200 dark:border-[#1E382E] text-xs font-mono tracking-widest text-center focus:outline-none focus:border-[#0B2B1A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Assign Role &amp; Access Level *
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(['Waiter', 'Cashier', 'Kitchen Chef', 'Store Manager'] as const).map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setInviteRole(role)}
                        className={`p-2.5 rounded-xl border text-left font-bold transition-all cursor-pointer ${
                          inviteRole === role
                            ? 'border-[#0B2B1A] bg-[#0B2B1A] text-white shadow-xs'
                            : 'border-neutral-200 dark:border-[#1E382E] bg-neutral-50 dark:bg-[#11241C] text-neutral-700 dark:text-neutral-300'
                        }`}
                      >
                        <p>{role}</p>
                        <p
                          className={`text-[9.5px] font-normal ${
                            inviteRole === role ? 'text-emerald-200' : 'text-neutral-500'
                          }`}
                        >
                          {role === 'Waiter'
                            ? 'Table mobile orders'
                            : role === 'Cashier'
                            ? 'Counter & thermal bill'
                            : role === 'Kitchen Chef'
                            ? 'KDS screen & timers'
                            : 'Full admin rights'}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={sendingInvite}
                    className="w-full py-3 rounded-xl bg-[#0B2B1A] hover:bg-[#124229] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sendingInvite ? 'Sending Invitation...' : 'Send Invite Link via Email'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
