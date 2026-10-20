'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Coffee,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Calculator,
  ListOrdered,
  Receipt,
  Soup,
  Package,
  Settings,
  ShoppingBag,
  LayoutGrid,
  ChevronRight,
  ChevronDown,
  Search,
  Moon,
  Sun,
  Bell,
  X,
  LogOut,
  User,
  ExternalLink,
  Menu,
  KeyRound,
  Users,
  Shield,
  Check,
} from 'lucide-react';
import {
  ALL_DASHBOARD_TOOLS,
  getStoredPinnedIds,
  savePinnedIds,
  DEFAULT_PINNED_IDS,
} from '@/lib/dashboardTools';

interface DashboardShellProps {
  children: React.ReactNode;
  storeSlug?: string;
}

export default function DashboardShell({ children, storeSlug = 'brewpluse' }: DashboardShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const cafeHandle = (storeSlug || 'my-cafe').toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const defaultCafeEmail = `${cafeHandle}@gmail.com`;

  const [userEmail, setUserEmail] = useState(cafeHandle);
  const [userFullEmail, setUserFullEmail] = useState(defaultCafeEmail);
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedIds, setPinnedIds] = useState<string[]>(DEFAULT_PINNED_IDS);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Staff Quick PIN Switcher
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeOperator, setActiveOperator] = useState({
    id: 'owner',
    name: 'Cafe Owner',
    role: 'Owner',
    pin: '0000',
  });
  const [staffRoster, setStaffRoster] = useState([
    { id: 'owner', name: 'Cafe Owner', role: 'Owner', pin: '0000' },
    { id: 'staff-1', name: 'Rahul Sharma', role: 'Cashier', pin: '1024' },
    { id: 'staff-2', name: 'Priya Patel', role: 'Barista', pin: '2048' },
    { id: 'staff-3', name: 'Amit Verma', role: 'Waiter', pin: '3096' },
  ]);

  useEffect(() => {
    try {
      // 1. Check if store_profile has a business email or name
      const storeProfileRaw = localStorage.getItem('brewpluse::store_profile');
      let cafeProfileName = '';
      let cafeProfileEmail = '';

      if (storeProfileRaw) {
        try {
          const profile = JSON.parse(storeProfileRaw);
          if (profile.slug === storeSlug || !profile.slug) {
            if (profile.name) cafeProfileName = profile.name.toLowerCase().replace(/[^a-z0-9_-]/g, '');
            if (profile.email) cafeProfileEmail = profile.email;
          }
        } catch (e) {}
      }

      // 2. Check if a specific active user is stored for this cafe
      const stored = localStorage.getItem('brewpluse::active_user');
      let activeUserEmail = '';
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.storeSlug === storeSlug && parsed.email) {
            activeUserEmail = parsed.email;
          }
        } catch (e) {}
      }

      const resolvedUsername = activeUserEmail
        ? activeUserEmail.split('@')[0]
        : cafeProfileName || cafeHandle;

      const resolvedEmail = activeUserEmail || cafeProfileEmail || `${resolvedUsername}@gmail.com`;

      setUserEmail(resolvedUsername);
      setUserFullEmail(resolvedEmail);

      const savedTheme = localStorage.getItem('brewpluse::theme');
      if (savedTheme === 'dark') {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
      setPinnedIds(getStoredPinnedIds());

      const savedStaff = localStorage.getItem(`brewpluse::staff_${storeSlug}`);
      if (savedStaff) {
        try {
          const parsed = JSON.parse(savedStaff);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setStaffRoster([
              { id: 'owner', name: 'Cafe Owner', role: 'Owner', pin: '0000' },
              ...parsed,
            ]);
          }
        } catch (e) {}
      }

      const savedOp = localStorage.getItem(`brewpluse::active_operator_${storeSlug}`);
      if (savedOp) {
        try {
          setActiveOperator(JSON.parse(savedOp));
        } catch (e) {}
      }
    } catch (e) {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsProfileOpen(false);
        setMobileDrawerOpen(false);
      }
    };

    const handlePinnedChange = (e: Event) => {
      const custom = e as CustomEvent<string[]>;
      if (custom && custom.detail) {
        setPinnedIds(custom.detail);
      } else {
        setPinnedIds(getStoredPinnedIds());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('brewpluse::pinned_change', handlePinnedChange);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('brewpluse::pinned_change', handlePinnedChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('brewpluse::theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('brewpluse::theme', 'light');
      }
      return next;
    });
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('brewpluse::active_user');
    } catch (e) {}
    router.replace('/login');
  };

  const basePath = `/dashboard/${storeSlug}`;

  const navOperations = [
    { label: 'Dashboard', href: `${basePath}`, icon: LayoutDashboard },
    { label: 'Create Order', href: `${basePath}/pos`, icon: Calculator },
    { label: 'Orders', href: `${basePath}/orders`, icon: ListOrdered },
    { label: 'Bills', href: `${basePath}/billing`, icon: Receipt },
  ];

  const navPinned = pinnedIds
    .map((id) => ALL_DASHBOARD_TOOLS.find((tool) => tool.id === id))
    .filter((tool): tool is typeof ALL_DASHBOARD_TOOLS[0] => Boolean(tool))
    .map((tool) => ({
      id: tool.id,
      label: tool.shortLabel,
      href: tool.isExternal ? tool.path : `${basePath}${tool.path}`,
      icon: tool.icon,
      isExternal: tool.isExternal,
    }));

  const handleUnpinFromSidebar = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    const next = pinnedIds.filter((item) => item !== id);
    setPinnedIds(next);
    savePinnedIds(next);
  };

  const navMore = [
    { label: 'Settings', href: `${basePath}/settings`, icon: Settings },
    { label: 'Store', href: `${basePath}/hardware`, icon: ShoppingBag },
    { label: 'More', href: `${basePath}/more`, icon: LayoutGrid },
  ];

  const isCurrentActive = (href: string) => {
    if (href === basePath) {
      return pathname === basePath || pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  const sidebarWidthClass = sidebarCollapsed ? 'w-[72px]' : 'w-[232px]';
  const mainMarginClass = sidebarCollapsed ? 'lg:ml-[72px] lg:w-[calc(100%-72px)]' : 'lg:ml-[232px] lg:w-[calc(100%-232px)]';
  const headerWidthClass = sidebarCollapsed ? 'lg:w-[calc(100%-72px)]' : 'lg:w-[calc(100%-232px)]';

  return (
    <div className="min-h-screen bg-[#F8FAF8] dark:bg-[#0A1410] text-[#12201B] dark:text-[#F2FAF6] font-sans antialiased transition-colors duration-200">
      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 bottom-0 flex-col h-screen border-r border-[#0B3A2E] dark:border-[#0B2A20] z-50 overflow-hidden shadow-[4px_0_24px_rgba(6,47,35,0.06)] group/sidebar transition-[width] duration-200 ease-out ${sidebarWidthClass}`}
        style={{ background: 'rgb(6, 33, 22)' }}
      >
        <div className="relative flex flex-col h-full z-10">
          {/* Subtle Grid Pattern Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"
          />

          {/* Botanical leaf watermark SVG */}
          <div
            aria-hidden="true"
            className="pointer-events-none select-none absolute bottom-0 left-0 w-64 h-80 overflow-hidden z-0"
          >
            <svg
              viewBox="0 0 260 320"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-emerald-400 opacity-[0.08] transform -translate-x-6 translate-y-6"
            >
              <path
                d="M10 320 C35 270, 75 220, 120 160 C160 105, 195 55, 230 10"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M38 275 C10 250, 0 215, 15 190 C35 185, 65 205, 68 240 C69 248, 55 265, 38 275 Z"
                fill="currentColor"
              />
              <path
                d="M38 275 C30 245, 25 210, 15 190"
                stroke="rgba(6, 47, 35, 0.4)"
                strokeWidth="1.2"
              />
              <path
                d="M65 235 C95 215, 130 220, 145 250 C135 275, 100 285, 75 265 C68 255, 65 242, 65 235 Z"
                fill="currentColor"
              />
              <path
                d="M65 235 C95 245, 125 255, 145 250"
                stroke="rgba(6, 47, 35, 0.4)"
                strokeWidth="1.2"
              />
              <path
                d="M85 195 C55 170, 48 135, 68 110 C92 112, 118 135, 118 168 C118 178, 102 190, 85 195 Z"
                fill="currentColor"
              />
              <path
                d="M85 195 C75 165, 70 135, 68 110"
                stroke="rgba(6, 47, 35, 0.4)"
                strokeWidth="1.2"
              />
              <path
                d="M115 160 C150 140, 185 148, 198 178 C185 202, 150 210, 125 190 C118 180, 115 168, 115 160 Z"
                fill="currentColor"
              />
              <path
                d="M115 160 C145 168, 175 175, 198 178"
                stroke="rgba(6, 47, 35, 0.4)"
                strokeWidth="1.2"
              />
              <path
                d="M140 125 C120 95, 118 65, 140 42 C162 48, 182 72, 176 102 C172 112, 156 122, 140 125 Z"
                fill="currentColor"
              />
              <path
                d="M140 125 C136 98, 136 70, 140 42"
                stroke="rgba(6, 47, 35, 0.4)"
                strokeWidth="1.2"
              />
              <path
                d="M170 85 C200 68, 230 75, 240 102 C228 122, 198 130, 178 112 C172 104, 170 92, 170 85 Z"
                fill="currentColor"
              />
              <path
                d="M170 85 C198 92, 222 98, 240 102"
                stroke="rgba(6, 47, 35, 0.4)"
                strokeWidth="1.2"
              />
              <path
                d="M205 45 C215 25, 230 12, 242 8 C245 22, 238 38, 222 52 C214 55, 208 50, 205 45 Z"
                fill="currentColor"
              />
            </svg>
          </div>

          {/* Logo Bar */}
          <div className="pt-3.5 pb-3 shrink-0 relative z-10 border-b border-white/[0.08] px-4">
            <div className="flex items-center justify-between">
              <Link href={basePath} className="flex items-center group gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-400/25 flex items-center justify-center text-emerald-300 shadow-xs transition-transform duration-200 group-hover:scale-105 shrink-0">
                  <Coffee className="w-4 h-4 text-emerald-300" />
                </div>
                {!sidebarCollapsed && (
                  <div className="min-w-0 text-left">
                    <h1 className="font-bold text-sm text-white tracking-tight leading-tight flex items-center gap-1.5">
                      <span>BrewPluse</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                    </h1>
                    <p className="text-[9.5px] text-[#9AB2A8] leading-tight truncate mt-0.5 font-medium">
                      Brew Excellence. Automate Everything.
                    </p>
                  </div>
                )}
              </Link>
              {!sidebarCollapsed && (
                <button
                  type="button"
                  title="Collapse sidebar"
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-1 rounded-lg text-[#9AB2A8]/70 hover:text-white hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                >
                  <PanelLeftClose className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto no-scrollbar py-2.5 space-y-3.5 relative z-10 px-2.5">
            {/* OPERATIONS */}
            <div className="space-y-0.5">
              {!sidebarCollapsed && (
                <p className="px-2.5 mb-1.5 text-[9.5px] font-bold uppercase tracking-wider text-[#9AB2A8]/70 truncate">
                  OPERATIONS
                </p>
              )}
              {navOperations.map((item) => {
                const active = isCurrentActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    title={item.label}
                    className={`flex items-center rounded-lg text-xs sm:text-[13px] font-medium transition-all duration-200 group relative gap-2.5 px-2.5 py-1.5 sm:py-2 ${
                      active
                        ? 'bg-[rgba(16,185,129,0.14)] border border-[rgba(16,185,129,0.22)] text-white shadow-[0_4px_16px_rgba(16,185,129,0.06)] font-semibold'
                        : 'text-[#D1E3DA] hover:text-white hover:bg-white/[0.06] border border-transparent'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <Icon
                        className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                          active ? 'text-[#10B981]' : 'text-[#8FA99D]'
                        }`}
                      />
                    </div>
                    {!sidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>

            {/* PINNED */}
            <div className="space-y-0.5">
              {!sidebarCollapsed && (
                <p className="px-2.5 mb-1.5 text-[9.5px] font-bold uppercase tracking-wider text-[#8FA99D] truncate">
                  PINNED
                </p>
              )}
              {navPinned.length === 0 ? (
                !sidebarCollapsed && (
                  <p className="px-2.5 py-1 text-[10px] text-[#8FA99D]/60 italic truncate">
                    No pinned items
                  </p>
                )
              ) : (
                navPinned.map((item) => {
                  const active = isCurrentActive(item.href);
                  const Icon = item.icon;
                  return (
                    <div key={item.id} className="relative group/pin flex items-center">
                      <Link
                        href={item.href}
                        title={item.label}
                        className={`flex-1 flex items-center rounded-lg text-xs sm:text-[13px] font-medium transition-all duration-200 group relative gap-2.5 px-2.5 py-1.5 sm:py-2 ${
                          active
                            ? 'bg-[rgba(16,185,129,0.14)] border border-[rgba(16,185,129,0.22)] text-white shadow-[0_4px_16px_rgba(16,185,129,0.06)] font-semibold'
                            : 'text-[#D1E3DA] hover:text-white hover:bg-white/[0.06] border border-transparent'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                            active ? 'text-[#10B981]' : 'text-[#8FA99D]'
                          }`}
                        />
                        {!sidebarCollapsed && <span className="flex-1 truncate pr-5">{item.label}</span>}
                      </Link>
                      {!sidebarCollapsed && (
                        <button
                          type="button"
                          onClick={(e) => handleUnpinFromSidebar(e, item.id)}
                          className="absolute right-1.5 p-1 rounded text-[#8FA99D] hover:text-red-400 hover:bg-white/10 opacity-0 group-hover/pin:opacity-100 transition-opacity cursor-pointer"
                          title="Unpin from sidebar"
                          aria-label={`Unpin ${item.label}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* MORE */}
            <div className="space-y-0.5">
              {!sidebarCollapsed && (
                <p className="px-2.5 mb-1.5 text-[9.5px] font-bold uppercase tracking-wider text-[#8FA99D] truncate">
                  MORE
                </p>
              )}
              {navMore.map((item) => {
                const active = isCurrentActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    title={item.label}
                    className={`flex items-center rounded-lg text-xs sm:text-[13px] font-medium transition-all duration-200 group relative gap-2.5 px-2.5 py-1.5 sm:py-2 ${
                      active
                        ? 'bg-[rgba(16,185,129,0.14)] border border-[rgba(16,185,129,0.22)] text-white shadow-[0_4px_16px_rgba(16,185,129,0.06)] font-semibold'
                        : 'text-[#D1E3DA] hover:text-white hover:bg-white/[0.06] border border-transparent'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                        active ? 'text-[#10B981]' : 'text-[#8FA99D]'
                      }`}
                    />
                    {!sidebarCollapsed && <span className="flex-1 truncate">{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* BREWIE AI Pill Card */}
          <div className="shrink-0 relative z-10 border-t border-white/[0.08] bg-[#05291F]/50 p-2.5">
            <Link
              href={`${basePath}/brewie`}
              className="block relative rounded-[14px] transition-all duration-200 cursor-pointer group hover:-translate-y-[1px] p-2.5 bg-white/[0.055] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/30"
            >
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0 w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center overflow-hidden ring-2 ring-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                  <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: 26, height: 26 }}>
                    <svg viewBox="0 0 100 100" width="24" height="24">
                      <g fill="#d26010">
                        <path d="M82.7 44.71C88.58 76.36 88.51 76.46 57.32 82.26C26.12 88.06 26.02 87.99 20.14 56.34C14.26 24.69 14.32 24.59 45.52 18.79C76.72 13 76.82 13.06 82.7 44.71Z" />
                      </g>
                      <g fill="#170d08">
                        <circle cx="43" cy="48" r="4" />
                        <circle cx="63" cy="48" r="4" />
                      </g>
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-[#10B981] ring-2 ring-[#062F23]" />
                </div>
                {!sidebarCollapsed && (
                  <>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white tracking-wide">BREWIE</span>
                        <span className="text-[8.5px] px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 font-semibold">
                          AI
                        </span>
                      </div>
                      <p className="text-[10.5px] text-[#9AB2A8] truncate group-hover:text-emerald-200 transition-colors">
                        Your AI cafe assistant
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-[#86A59A] group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </>
                )}
              </div>
            </Link>
          </div>
        </div>
      </aside>

      {/* TOP HEADER */}
      <header
        className={`fixed top-0 right-0 w-full z-40 bg-white dark:bg-[#101F19]/95 dark:backdrop-blur-md border-b border-[#E8EEEA] dark:border-[#1E342B] h-[56px] flex items-center justify-between px-3 sm:px-5 lg:px-6 shadow-[0_1px_3px_rgba(0,0,0,0.015)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.25)] transition-[width] duration-200 ease-out ${headerWidthClass}`}
      >
        {/* Left: Sidebar toggle + Search Input */}
        <div className="flex items-center gap-2.5 flex-1 max-w-[520px]">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth < 1024) {
                setMobileDrawerOpen((prev) => !prev);
              } else {
                setSidebarCollapsed((prev) => !prev);
              }
            }}
            className="p-1.5 rounded-lg text-[#65736D] hover:text-[#12201B] hover:bg-[#F2FAF6] dark:text-[#9AB2A8] dark:hover:text-[#F2FAF6] dark:hover:bg-[#142A21] transition-colors items-center justify-center shrink-0 cursor-pointer"
            title="Toggle sidebar"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-4 h-4 lg:hidden" />
            <span className="hidden lg:inline-flex">
              {sidebarCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
            </span>
          </button>

          <div className="relative w-full cursor-pointer" onClick={() => setIsSearchModalOpen(true)}>
            <Search className="w-3.5 h-3.5 text-[#4B5563] dark:text-[#9AB2A8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              placeholder="Search orders, tables, menu items..."
              readOnly
              className="w-full h-9 pl-9 pr-12 rounded-full bg-[#F3F5F4] dark:bg-[#10221B] border border-[#D1D5DB] dark:border-[#1E382E] text-xs sm:text-sm text-[#111827] dark:text-[#F2FAF6] placeholder:text-[#6B7280] dark:placeholder:text-[#678074] focus:outline-none focus:border-[#10B981] dark:focus:border-[#10B981] cursor-pointer"
            />
            <kbd className="hidden sm:inline-flex items-center absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[9px] font-semibold text-[#6B7280] dark:text-[#9AB2A8] bg-[#E8EDEA] dark:bg-[#162E25] border border-[#D1D5DB] dark:border-[#224035] rounded-md shadow-2xs select-none">
              ⌘ K
            </kbd>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Staff 4-Digit Quick PIN Switcher Pill */}
          <button
            type="button"
            onClick={() => {
              setPinCode('');
              setPinError('');
              setIsPinModalOpen(true);
            }}
            title="Switch Active Staff via 4-Digit PIN"
            className="flex items-center gap-1.5 h-9 pl-2 pr-2.5 rounded-full border border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100/70 transition-all cursor-pointer shadow-2xs text-xs font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="truncate max-w-[95px] sm:max-w-none text-[11px]">
              {activeOperator.name}
            </span>
            <span className="text-[9.5px] font-mono uppercase bg-emerald-200/90 dark:bg-emerald-800 px-1.5 py-0.2 rounded font-black text-emerald-950 dark:text-white">
              {activeOperator.role}
            </span>
          </button>

          {/* Usage Pill */}
          <Link
            href={`${basePath}/usage`}
            title="View BrewPluse usage and billing"
            className="group flex items-center gap-2 h-9 pl-1 pr-3 rounded-full border transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.98] bg-white dark:bg-[#10221B] border-[#D1D5DB] dark:border-[#1E382E] hover:border-[#10B981]/40 hover:bg-[#F2FAF6] dark:hover:bg-[#142A21] text-[#111827] dark:text-[#F2FAF6]"
          >
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 bg-[#062F23] text-[#10B981] group-hover:bg-[#0B5C45] group-hover:text-white shadow-xs">
              <Receipt className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110" />
            </div>
            <div className="flex flex-col text-left leading-tight">
              <span className="text-[9px] font-semibold uppercase tracking-wider transition-colors text-[#6B7280] dark:text-[#9AB2A8] group-hover:text-[#062F23] dark:group-hover:text-[#10B981]">
                USAGE
              </span>
              <span className="text-xs font-bold tracking-tight text-[#111827] dark:text-[#F2FAF6]">
                ₹0.00
              </span>
            </div>
          </Link>

          {/* Dark Mode Moon Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Switch theme mode"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative w-9 h-9 rounded-full border border-[#D1D5DB] dark:border-[#1E382E] bg-white dark:bg-[#10221B] hover:bg-[#F7FAF8] dark:hover:bg-[#162E25] flex items-center justify-center text-[#4B5563] dark:text-[#9AB2A8] hover:text-[#111827] dark:hover:text-[#F2FAF6] transition-all duration-200 cursor-pointer shadow-2xs shrink-0 group active:scale-95"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-[#0B5C45] group-hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {/* Notifications Bell */}
          <button
            type="button"
            title="Notifications"
            className="relative w-9 h-9 rounded-full border border-[#D1D5DB] dark:border-[#1E382E] bg-white dark:bg-[#10221B] hover:bg-[#F7FAF8] dark:hover:bg-[#162E25] flex items-center justify-center text-[#6B7280] dark:text-[#9AB2A8] hover:text-[#111827] dark:hover:text-[#F2FAF6] transition-colors cursor-pointer shadow-2xs shrink-0"
            aria-label="Notifications"
          >
            <Bell className="w-3.5 h-3.5 text-[#4B5563] dark:text-[#9AB2A8]" />
          </button>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center gap-2 pl-1 pr-2.5 py-0.5 rounded-full border border-[#D1D5DB] dark:border-[#1E382E] bg-white dark:bg-[#10221B] hover:bg-[#F7FAF8] dark:hover:bg-[#162E25] transition-colors cursor-pointer shadow-2xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#062F23] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-[#111827] dark:text-[#F2FAF6] leading-tight truncate">
                  {userEmail}
                </p>
                <p className="text-[9.5px] text-[#6B7280] dark:text-[#9AB2A8] capitalize leading-tight truncate">
                  Owner
                </p>
              </div>
              <ChevronDown className="w-3 h-3 text-[#6B7280] dark:text-[#9AB2A8] hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#111814] border border-neutral-200/90 dark:border-neutral-800 shadow-[0_10px_35px_rgba(0,0,0,0.08)] p-2.5 z-50 animate-fade-in font-sans">
                  {/* User Info Header */}
                  <div className="px-2.5 pt-1.5 pb-2">
                    <p className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">
                      {userEmail}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-tight truncate font-normal">
                      {userFullEmail}
                    </p>
                  </div>

                  <div className="my-1.5 border-b border-neutral-100 dark:border-neutral-800/80" />

                  {/* Menu Items */}
                  <div className="space-y-0.5">
                    {/* Appearance Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        toggleDarkMode();
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Moon className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
                        <span className="font-semibold text-neutral-700 dark:text-neutral-200">Appearance</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/60">
                        {isDarkMode ? 'DARK' : 'LIGHT'}
                      </span>
                    </button>

                    {/* Account Settings */}
                    <Link
                      href={`${basePath}/settings`}
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
                    >
                      <Settings className="w-4 h-4 text-neutral-500 dark:text-neutral-400" />
                      <span>Account Settings</span>
                    </Link>

                    {/* Sign Out */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50/70 dark:hover:bg-red-950/30 transition-colors cursor-pointer text-left"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT WRAPPER */}
      <main
        className={`pt-[68px] px-3 sm:px-5 lg:px-6 pb-20 lg:pb-12 min-h-screen w-full bg-[#F7F9F7] dark:bg-[#07130E] text-[#111827] dark:text-[#F2FAF6] transition-[margin,width] duration-200 ease-out ${mainMarginClass}`}
      >
        <div className="space-y-4 pb-10 w-full max-w-[1600px] mx-auto text-[#12201B] dark:text-[#F2FAF6]">
          {children}
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white/95 dark:bg-[#101F19]/95 backdrop-blur-xl border-t border-[#E7ECE9] dark:border-[#1E342B] z-50 flex justify-around items-center px-2 lg:hidden shadow-[0_-4px_20px_rgba(20,50,40,0.04)]">
        {[
          { label: 'Home', href: basePath, icon: LayoutDashboard },
          { label: 'Create Order', href: `${basePath}/pos`, icon: Calculator },
          { label: 'Orders', href: `${basePath}/orders`, icon: ListOrdered },
          { label: 'KDS', href: `${basePath}/kds`, icon: Soup },
          { label: 'More', href: `${basePath}/more`, icon: LayoutGrid },
        ].map((item) => {
          const active = isCurrentActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 text-center transition-all duration-200 relative cursor-pointer ${
                active
                  ? 'text-[#0B5C45] dark:text-[#10B981] font-bold'
                  : 'text-[#8D9792] hover:text-[#0B5C45]'
              }`}
            >
              {active && <div className="absolute top-0 w-8 h-1 bg-[#10B981] rounded-full" />}
              <Icon className={`w-5 h-5 mb-1 transition-transform ${active ? 'scale-110' : ''}`} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* MOBILE / TABLET SLIDE-OVER DRAWER */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden transition-opacity"
          onClick={() => setMobileDrawerOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-[rgb(6,33,22)] border-r border-[#0B3A2E] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0B5C45] to-[#10B981] flex items-center justify-center text-white font-bold text-sm shadow-xs">
              BP
            </div>
            <div>
              <p className="font-black text-sm text-white tracking-tight">BrewPluse</p>
              <p className="text-[10px] text-[#8FA99D]">Store: {storeSlug}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(false)}
            className="p-1.5 rounded-lg text-[#8FA99D] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4 no-scrollbar">
          {/* OPERATIONS */}
          <div className="space-y-1">
            <p className="px-2.5 text-[9.5px] font-bold uppercase tracking-wider text-[#8FA99D]">
              OPERATIONS
            </p>
            {navOperations.map((item) => {
              const active = isCurrentActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[rgba(16,185,129,0.18)] border border-[rgba(16,185,129,0.25)] text-white shadow-xs'
                      : 'text-[#D1E3DA] hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#10B981]' : 'text-[#8FA99D]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* PINNED */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-2.5">
              <p className="text-[9.5px] font-bold uppercase tracking-wider text-[#8FA99D]">
                PINNED
              </p>
              <span className="text-[10px] font-mono text-[#8FA99D]/70">{navPinned.length}</span>
            </div>
            {navPinned.length === 0 ? (
              <p className="px-2.5 py-1 text-[11px] text-[#8FA99D]/60 italic">
                No pinned items yet. Pin from More.
              </p>
            ) : (
              navPinned.map((item) => {
                const active = isCurrentActive(item.href);
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-center justify-between group">
                    <Link
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        active
                          ? 'bg-[rgba(16,185,129,0.18)] border border-[rgba(16,185,129,0.25)] text-white shadow-xs'
                          : 'text-[#D1E3DA] hover:text-white hover:bg-white/[0.06]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-[#10B981]' : 'text-[#8FA99D]'}`} />
                      <span className="truncate">{item.label}</span>
                    </Link>
                    <button
                      type="button"
                      onClick={(e) => handleUnpinFromSidebar(e, item.id)}
                      className="p-1.5 text-[#8FA99D] hover:text-red-400 hover:bg-white/10 rounded-lg ml-1 cursor-pointer"
                      title="Unpin"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {/* MORE */}
          <div className="space-y-1">
            <p className="px-2.5 text-[9.5px] font-bold uppercase tracking-wider text-[#8FA99D]">
              MORE
            </p>
            {navMore.map((item) => {
              const active = isCurrentActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-[rgba(16,185,129,0.18)] border border-[rgba(16,185,129,0.25)] text-white shadow-xs'
                      : 'text-[#D1E3DA] hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#10B981]' : 'text-[#8FA99D]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-white/[0.08] space-y-2 bg-[#05291F]/60">
          <Link
            href={`${basePath}/brewie`}
            onClick={() => setMobileDrawerOpen(false)}
            className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-bold"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>BREWIE AI Assistant</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          </Link>
          <div className="flex items-center justify-between pt-1 text-[11px] text-[#8FA99D]">
            <span>{userEmail}</span>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 font-semibold cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* SEARCH COMMAND PALETTE MODAL (⌘ K) */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-3.5 border-b border-[#E5ECE8] dark:border-[#1E382E] flex items-center gap-3">
              <Search className="w-4 h-4 text-[#0B5C45]" />
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a command, search menu, table or order..."
                className="w-full bg-transparent text-sm focus:outline-none dark:text-white"
              />
              <button
                type="button"
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 space-y-1 text-xs">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8FA99D] px-2 py-1">
                Quick Shortcuts
              </p>
              <Link
                href={`${basePath}/pos`}
                onClick={() => setIsSearchModalOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F2FAF6] dark:hover:bg-[#142A21] cursor-pointer"
              >
                <span className="font-semibold text-[#12201B] dark:text-[#E8F6EF]">
                  Open POS Register / Create Order
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  POS
                </span>
              </Link>
              <Link
                href={`${basePath}/orders`}
                onClick={() => setIsSearchModalOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F2FAF6] dark:hover:bg-[#142A21] cursor-pointer"
              >
                <span className="font-semibold text-[#12201B] dark:text-[#E8F6EF]">
                  Live Orders Queue
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Orders
                </span>
              </Link>
              <Link
                href={`${basePath}/tables`}
                onClick={() => setIsSearchModalOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F2FAF6] dark:hover:bg-[#142A21] cursor-pointer"
              >
                <span className="font-semibold text-[#12201B] dark:text-[#E8F6EF]">
                  Visual Floor Planner & Tables
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  Tables
                </span>
              </Link>
              <Link
                href={`${basePath}/kds`}
                onClick={() => setIsSearchModalOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-[#F2FAF6] dark:hover:bg-[#142A21] cursor-pointer"
              >
                <span className="font-semibold text-[#12201B] dark:text-[#E8F6EF]">
                  Kitchen Display System (KDS)
                </span>
                <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  KDS
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Staff 4-Digit PIN Quick Switch Modal */}
      {isPinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#10221B] border border-neutral-200 dark:border-neutral-800 rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center">
                  <KeyRound className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-black text-neutral-900 dark:text-white">Quick Switch Operator</h3>
                  <p className="text-[10.5px] text-neutral-500 font-mono">Current: {activeOperator.name} ({activeOperator.role})</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPinModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Operator Selector Pills */}
            <div className="flex flex-wrap gap-1.5 justify-center">
              {staffRoster.map((staff) => (
                <button
                  key={staff.id}
                  type="button"
                  onClick={() => {
                    setActiveOperator(staff);
                    localStorage.setItem(`brewpluse::active_operator_${storeSlug}`, JSON.stringify(staff));
                    setIsPinModalOpen(false);
                    setPinCode('');
                    setPinError('');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
                    activeOperator.id === staff.id
                      ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                      : 'bg-neutral-50 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  <span>{staff.name}</span>
                  <span className="text-[9.5px] opacity-75 font-mono">({staff.role})</span>
                </button>
              ))}
            </div>

            {/* 4-digit PIN dots */}
            <div className="py-2">
              <p className="text-xs text-neutral-500 mb-2 font-medium">Or enter 4-digit PIN to authenticate:</p>
              <div className="flex items-center justify-center gap-3">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full border transition-all ${
                      pinCode.length > idx
                        ? 'bg-emerald-600 border-emerald-600 scale-110'
                        : 'border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800'
                    }`}
                  />
                ))}
              </div>
              {pinError && (
                <p className="text-[11px] text-red-500 font-medium mt-2">{pinError}</p>
              )}
            </div>

            {/* Numpad */}
            <div className="grid grid-cols-3 gap-2 max-w-[240px] mx-auto">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    const next = pinCode + n.toString();
                    if (next.length <= 4) {
                      setPinCode(next);
                      if (next.length === 4) {
                        const matched = staffRoster.find((s) => s.pin === next);
                        if (matched) {
                          setActiveOperator(matched);
                          localStorage.setItem(`brewpluse::active_operator_${storeSlug}`, JSON.stringify(matched));
                          setIsPinModalOpen(false);
                          setPinCode('');
                          setPinError('');
                        } else {
                          setPinError('Incorrect PIN. Try 1024, 2048, or 0000');
                          setPinCode('');
                        }
                      }
                    }
                  }}
                  className="h-11 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer transition-colors shadow-2xs"
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setPinCode('');
                  setPinError('');
                }}
                className="h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 text-xs font-bold text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
              >
                C
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = pinCode + '0';
                  if (next.length <= 4) {
                    setPinCode(next);
                    if (next.length === 4) {
                      const matched = staffRoster.find((s) => s.pin === next);
                      if (matched) {
                        setActiveOperator(matched);
                        localStorage.setItem(`brewpluse::active_operator_${storeSlug}`, JSON.stringify(matched));
                        setIsPinModalOpen(false);
                        setPinCode('');
                        setPinError('');
                      } else {
                        setPinError('Incorrect PIN. Try 1024, 2048, or 0000');
                        setPinCode('');
                      }
                    }
                  }
                }}
                className="h-11 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer transition-colors shadow-2xs"
              >
                0
              </button>
              <button
                type="button"
                onClick={() => setPinCode((prev) => prev.slice(0, -1))}
                className="h-11 rounded-xl bg-neutral-100 dark:bg-neutral-800/60 text-xs font-bold text-neutral-500 hover:text-black dark:hover:text-white cursor-pointer"
              >
                ⌫
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
