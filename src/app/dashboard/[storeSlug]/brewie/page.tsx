'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  TrendingUp,
  Table2,
  Soup,
  Users,
  RotateCcw,
  ExternalLink,
  Zap,
  Sparkles,
  Bot,
  Send,
  Clock,
  CheckCircle2,
  Package,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Calendar,
} from 'lucide-react';

interface BrewieCard {
  type: 'metric' | 'analytics' | 'table' | 'menu' | 'staff' | 'confirmation' | 'navigation';
  title: string;
  subtitle?: string;
  data?: Record<string, any>;
  actions?: Array<{
    label: string;
    actionType: 'link' | 'navigate' | 'undo' | 'custom';
    variant?: 'primary' | 'outline' | 'secondary';
    payload?: any;
  }>;
}

interface Message {
  id: string;
  role: 'user' | 'brewie';
  content: string;
  timestamp: number;
  card?: BrewieCard;
}

export default function BrewieAiPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const cafeDisplayName = storeSlug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const [cafeName, setCafeName] = useState(cafeDisplayName);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const basePath = `/dashboard/${storeSlug}`;

  // Load cafe profile and session chat
  useEffect(() => {
    try {
      const storedProfile = localStorage.getItem('brewpluse::store_profile');
      if (storedProfile) {
        const parsed = JSON.parse(storedProfile);
        if (parsed.name) setCafeName(parsed.name);
      }
    } catch (e) {}

    try {
      const savedChat = sessionStorage.getItem(`brewpluse_brewie_chat_${storeSlug}`);
      if (savedChat) {
        const parsed = JSON.parse(savedChat);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {}

    // Initial greeting
    setMessages([
      {
        id: 'welcome-1',
        role: 'brewie',
        content: `Hello! I'm **BREWIE**, your AI cafe co-pilot ☕\n\nI can analyze your sales figures, audit inventory thresholds, suggest beverage pairings, guide you through POS or QR settings, and help optimize operations for **${cafeDisplayName}**.\n\nWhat would you like to explore today?`,
        timestamp: Date.now(),
      },
    ]);
  }, [storeSlug, cafeDisplayName]);

  // Persist messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(`brewpluse_brewie_chat_${storeSlug}`, JSON.stringify(messages));
      } catch (e) {}
    }
  }, [messages, storeSlug]);

  const chatLogsRef = useRef<HTMLDivElement>(null);

  // Scroll messages container to bottom on updates
  useEffect(() => {
    if (chatLogsRef.current) {
      chatLogsRef.current.scrollTo({
        top: chatLogsRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages, isThinking]);

  const quickSuggestions = [
    {
      title: "Today's Sales & Revenue",
      query: 'How much did I sell today and how many orders are completed?',
      icon: TrendingUp,
      color: 'bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981]',
    },
    {
      title: '360° Full Analytics',
      query: 'Give me full analytics',
      icon: Layers,
      color: 'bg-[#FFF4DD] dark:bg-[#2C210E] text-[#B45309] dark:text-[#FBBF24]',
    },
    {
      title: 'Best Waiter Today',
      query: 'Who was my best waiter today?',
      icon: Users,
      color: 'bg-[#F2FAF6] dark:bg-[#14261F] text-[#0B5C45] dark:text-[#10B981]',
    },
    {
      title: 'Create 10 Tables',
      query: 'Create 10 tables',
      icon: Table2,
      color: 'bg-[#F5FAF7] dark:bg-[#142E25] text-[#087A5B] dark:text-[#10B981]',
    },
    {
      title: 'Low Stock Inventory',
      query: 'What is running low in inventory?',
      icon: Package,
      color: 'bg-[#FFF4DD] dark:bg-[#2C210E] text-[#B45309] dark:text-[#FBBF24]',
    },
    {
      title: 'Diagnose Sales Drop',
      query: 'Why did sales drop yesterday?',
      icon: TrendingUp,
      color: 'bg-[#F2FAF6] dark:bg-[#14261F] text-[#0B5C45] dark:text-[#10B981]',
    },
  ];

  const handleResetChat = () => {
    try {
      sessionStorage.removeItem(`brewpluse_brewie_chat_${storeSlug}`);
    } catch (e) {}
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'brewie',
        content: `Conversation refreshed! How can I assist you with **${cafeName}** today?`,
        timestamp: Date.now(),
      },
    ]);
  };

  const generateBrewieResponse = (query: string): { reply: string; card?: BrewieCard } => {
    const q = query.toLowerCase();

    if (q.includes('sales') || q.includes('revenue') || q.includes('sell today') || q.includes('how much')) {
      return {
        reply: `Here is the current financial pulse for **${cafeName}** today:\n\n• **Gross Revenue:** ₹0.00\n• **Completed Orders:** 0\n• **Average Order Value (AOV):** ₹0.00\n• **Top Channel:** Direct Walk-in (Dine-in QR)\n\nYour live register is online and operating smoothly. Ready to record orders whenever you launch POS.`,
        card: {
          type: 'metric',
          title: "Today's Performance Overview",
          subtitle: 'Live register metrics for ' + cafeName,
          data: {
            'Gross Sales': '₹0.00',
            'Orders Served': '0',
            'Avg Prep Time': '0m',
            'Active Tabs': '0',
          },
          actions: [
            {
              label: 'View Detailed Register',
              actionType: 'link',
              payload: { href: `${basePath}/billing` },
            },
          ],
        },
      };
    }

    if (q.includes('analytics') || q.includes('360')) {
      return {
        reply: `**360° Comprehensive Business Analytics for ${cafeName}:**\n\n• **Customer Lifetime Value:** ₹0.00 per registered user\n• **Repeat Visit Rate:** 0% (New Store Base)\n• **UPI vs Cash Split:** 0% UPI / 0% Cash\n• **Hourly Peak Velocity:** Anticipated at 4:30 PM - 7:00 PM\n\nOpen your full analytics register to monitor sales distribution and export monthly GST reports:`,
        card: {
          type: 'analytics',
          title: '360° Business Analytics Register',
          subtitle: 'Real-time multi-dimensional performance',
          data: {
            'Gross Volume': '₹0.00',
            'Tax (GST 5%)': '₹0.00',
            'Net Disbursal': '₹0.00',
            'Platform Fee': '₹0.00',
          },
          actions: [
            {
              label: 'Open Analytics Hub',
              actionType: 'link',
              payload: { href: `${basePath}/billing` },
            },
          ],
        },
      };
    }

    if (q.includes('waiter') || q.includes('staff')) {
      return {
        reply: `**Staff Activity & Leaderboard:**\n\nCurrently, 0 staff shifts are recorded for today. Once team members sign into their waiter codes or POS PINs, BREWIE will measure ticket speeds, customer ratings, and tip attribution.`,
        card: {
          type: 'staff',
          title: 'Staff Service Leaderboard',
          subtitle: 'Active shifts & speed rankings',
          data: {
            staff: [
              { name: 'Shift Lead', role: 'Manager', ordersServed: 0 },
              { name: 'Floor Waiter', role: 'Server', ordersServed: 0 },
            ],
          },
          actions: [
            {
              label: 'Manage Team & Roles',
              actionType: 'link',
              payload: { href: `${basePath}/staff` },
            },
          ],
        },
      };
    }

    if (q.includes('table') || q.includes('create 10')) {
      return {
        reply: `I can help you provision dining layout tables instantly. You can add tables with custom seat counts and download QR codes for contactless dining.`,
        card: {
          type: 'table',
          title: 'Dining Floor Map',
          subtitle: '10 Smart QR tables ready to route',
          data: {
            tables: [
              { name: 'Table 1', capacity: 2 },
              { name: 'Table 2', capacity: 4 },
              { name: 'Table 3', capacity: 4 },
              { name: 'Table 4', capacity: 6 },
              { name: 'Table 5', capacity: 2 },
              { name: 'Table 6', capacity: 4 },
              { name: 'Table 7', capacity: 2 },
              { name: 'Table 8', capacity: 8 },
            ],
          },
          actions: [
            {
              label: 'Open Visual Floor Planner',
              actionType: 'link',
              payload: { href: `${basePath}/tables` },
            },
          ],
        },
      };
    }

    if (q.includes('inventory') || q.includes('low stock') || q.includes('stock')) {
      return {
        reply: `**Inventory & Recipe Audit:**\n\nAll stock levels are clear with 0 critical threshold warnings recorded. You can add raw ingredients (Coffee beans, A2 Milk, Vanilla Syrups, To-Go Cups) to enable automated recipe decrement upon checkout.`,
        card: {
          type: 'metric',
          title: 'Stock Health Audit',
          subtitle: 'Threshold monitoring and auto-deductions',
          data: {
            'Total Items': '0',
            'Low Stock Alerts': '0',
            'Out of Stock': '0',
            'Wastage Rate': '0.0%',
          },
          actions: [
            {
              label: 'Configure Inventory',
              actionType: 'link',
              payload: { href: `${basePath}/inventory` },
            },
          ],
        },
      };
    }

    if (q.includes('diagnose') || q.includes('drop') || q.includes('why')) {
      return {
        reply: `**Diagnostic Report:**\n\nAnalyzing historical order patterns for **${cafeName}**:\n\n1. **Weather Impact:** Clear skies observed.\n2. **Menu Availability:** 100% item uptime.\n3. **Footfall Variation:** Weekday afternoons naturally see lower dine-in volume.\n\n💡 **Recommended Action:** Launch a 15% Happy Hour promo code (3:00 PM – 5:30 PM) on your digital menu or send a WhatsApp reminder to loyal regulars.`,
        card: {
          type: 'navigation',
          title: 'Launch Mid-Day Promotion',
          subtitle: 'Boost footfall with limited-time coupons',
          data: {
            Route: `${basePath}/coupons`,
          },
          actions: [
            {
              label: 'Create Promo Code',
              actionType: 'link',
              payload: { href: `${basePath}/coupons` },
            },
          ],
        },
      };
    }

    // Default intelligent assistant fallback
    return {
      reply: `I understand you're inquiring about "${query}".\n\nAs your BrewPluse AI co-pilot, I can assist you with:\n• **Billing & POS workflows**\n• **Dishes & digital menu pricing**\n• **Table QR ordering & visual layout**\n• **Customer rewards & coupon campaigns**\n\nWould you like me to guide you to a specific dashboard tool or run a diagnostic?`,
      card: {
        type: 'navigation',
        title: 'Quick Tools Directory',
        subtitle: '18 operations tools available',
        data: {
          Route: `${basePath}/more`,
        },
        actions: [
          {
            label: 'Explore All Tools',
            actionType: 'link',
            payload: { href: `${basePath}/more` },
          },
        ],
      },
    };
  };

  const handleSend = async (queryToSend?: string) => {
    const text = (queryToSend || input).trim();
    if (!text || isThinking) return;

    setErrorMessage(null);
    setInput('');

    const userMessage: Message = {
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsThinking(true);

    setTimeout(() => {
      const { reply, card } = generateBrewieResponse(text);
      const aiMessage: Message = {
        id: `brewie-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        role: 'brewie',
        content: reply,
        timestamp: Date.now(),
        card,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsThinking(false);
    }, 600);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-3.5 sm:space-y-4 max-w-[1500px] mx-auto text-[#12201B] pb-8 font-sans">
        {/* Top Header Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#12201B] dark:text-[#F2FAF6] tracking-tight">
                BREWIE AI Assistant
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F6EF] dark:bg-[#142E25] border border-[#10B981]/25 text-[#087A5B] dark:text-[#10B981] font-bold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                Active &amp; Ready
              </span>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] font-normal leading-relaxed">
              Your always-on conversational cafe intelligence partner.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:shrink-0">
            <button
              type="button"
              onClick={handleResetChat}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#10221B] border border-[#E5ECE8] dark:border-[#1E382E] hover:bg-[#F8FAF8] dark:hover:bg-[#142E25] text-xs font-semibold text-[#65736D] hover:text-[#12201B] dark:text-[#9AB2A8] dark:hover:text-white shadow-2xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#8D9792]" />
              <span>Reset Chat</span>
            </button>
          </div>
        </div>

        {/* 12-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-4 items-start">
          {/* LEFT CHAT CONTAINER (8 COLS) */}
          <div className="lg:col-span-8 flex flex-col bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl shadow-xs overflow-hidden h-[calc(100vh-140px)] min-h-[480px] max-h-[760px]">
            {/* Chat Bar Header */}
            <div className="px-3.5 py-2.5 sm:px-4.5 border-b border-[#E5ECE8] dark:border-[#1E382E] bg-gradient-to-r from-[#F2FAF6] via-white to-[#FFF9F1] dark:from-[#0E241B] dark:via-[#0E2018] dark:to-[#17261B] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center ring-2 ring-emerald-500/20 shadow-xs">
                  <Bot className="w-4.5 h-4.5 text-[#10B981]" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#10B981] ring-2 ring-white dark:ring-[#0E2018]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-xs sm:text-sm text-[#12201B] dark:text-[#F2FAF6]">
                      BREWIE
                    </h3>
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#E8F6EF] dark:bg-[#123326] text-[#0B5C45] dark:text-[#34D399] font-bold border border-[#10B981]/20">
                      Copilot
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                    Trained on BrewPluse operations &amp; hospitality workflows
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#8D9792] dark:text-[#678074]">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-[11px]">Real-time response</span>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div ref={chatLogsRef} className="flex-1 overflow-y-auto p-3.5 sm:p-4 space-y-3">
              {messages.map((m) => {
                const isUser = m.role === 'user';
                return (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                  >
                    {!isUser && (
                      <div className="shrink-0 w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center overflow-hidden shadow-2xs mt-0.5 text-[#10B981]">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div
                      className={`rounded-xl px-3.5 py-2 sm:px-4 sm:py-2.5 shadow-2xs space-y-1 text-xs sm:text-[13px] ${
                        isUser
                          ? 'bg-[#062F23] text-white rounded-br-xs'
                          : 'bg-[#F8FAF8] dark:bg-white/[0.03] border border-[#E5ECE8] dark:border-[#1E382E] text-[#12201B] dark:text-[#F2FAF6] rounded-bl-xs'
                      }`}
                    >
                      <div className={`text-[11px] font-semibold ${isUser ? 'text-emerald-200' : 'text-[#0B5C45] dark:text-[#34D399]'}`}>
                        {isUser ? 'You' : 'BREWIE'}
                      </div>
                      <div className="leading-relaxed">
                        {m.content.split('\n').map((line, lIdx) => {
                          const trimmed = line.trim();
                          if (!trimmed) return <div key={lIdx} className="h-1.5" />;

                          const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
                          return (
                            <p key={lIdx} className="leading-relaxed text-[13px]">
                              {parts.map((p, pIdx) => {
                                if (p.startsWith('**') && p.endsWith('**')) {
                                  return (
                                    <strong key={pIdx} className={isUser ? 'font-bold text-white' : 'font-bold text-[#12201B] dark:text-white'}>
                                      {p.slice(2, -2)}
                                    </strong>
                                  );
                                }
                                return p;
                              })}
                            </p>
                          );
                        })}

                        {/* Interactive Card */}
                        {!isUser && m.card && (
                          <div className="mt-3 overflow-hidden rounded-xl border border-stone-200/80 dark:border-stone-800 bg-white dark:bg-[#0D1F18] shadow-2xs transition-all">
                            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-white/[0.02] px-3.5 py-2">
                              <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-white dark:bg-stone-800 shadow-2xs">
                                  {m.card.type === 'metric' || m.card.type === 'analytics' ? (
                                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                  ) : m.card.type === 'table' ? (
                                    <Table2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                  ) : m.card.type === 'staff' ? (
                                    <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                  ) : (
                                    <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                  )}
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold tracking-tight text-stone-900 dark:text-stone-100">
                                    {m.card.title}
                                  </h4>
                                  {m.card.subtitle && (
                                    <p className="text-[10px] text-stone-500 dark:text-stone-400">
                                      {m.card.subtitle}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="p-3.5 space-y-2.5">
                              {/* Data grid for metrics */}
                              {(m.card.type === 'metric' || m.card.type === 'analytics') && m.card.data && (
                                <div className="grid grid-cols-2 gap-2">
                                  {Object.entries(m.card.data).map(([key, val]) => (
                                    <div
                                      key={key}
                                      className="rounded-xl border border-stone-100 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-800/20 p-2.5"
                                    >
                                      <span className="block text-[10px] font-medium uppercase tracking-wider text-stone-400 dark:text-stone-500">
                                        {key}
                                      </span>
                                      <span className="mt-0.5 block text-xs font-bold text-stone-800 dark:text-stone-200">
                                        {String(val)}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Table grid */}
                              {m.card.type === 'table' && Array.isArray(m.card.data?.tables) && (
                                <div className="grid grid-cols-2 gap-1.5 max-h-44 overflow-y-auto pr-1">
                                  {m.card.data.tables.map((tbl: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className="rounded-lg border border-stone-100 dark:border-stone-800/80 px-2.5 py-1.5 text-xs flex justify-between items-center"
                                    >
                                      <span className="font-semibold text-stone-800 dark:text-stone-200">
                                        {tbl.name}
                                      </span>
                                      <span className="text-[10px] text-stone-400">
                                        {tbl.capacity} seats
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Staff list */}
                              {m.card.type === 'staff' && Array.isArray(m.card.data?.staff) && (
                                <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                                  {m.card.data.staff.map((st: any, idx: number) => (
                                    <div
                                      key={idx}
                                      className="flex items-center justify-between rounded-lg border border-stone-100 dark:border-stone-800/80 px-2.5 py-1.5 text-xs"
                                    >
                                      <div className="flex items-center gap-1.5">
                                        <span className="font-semibold text-stone-800 dark:text-stone-200">
                                          {st.name}
                                        </span>
                                        <span className="rounded bg-stone-100 dark:bg-stone-800 px-1 py-0.2 text-[9px] text-stone-500 uppercase">
                                          {st.role}
                                        </span>
                                      </div>
                                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                        {st.ordersServed} served
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Navigation route */}
                              {m.card.type === 'navigation' && m.card.data?.Route && (
                                <div className="flex items-center justify-between gap-2.5 rounded-lg bg-stone-50 dark:bg-white/[0.03] border border-stone-100 dark:border-white/[0.06] p-2.5 text-xs">
                                  <span className="font-mono text-[11px] text-[#65736D] dark:text-[#9AB2A8] truncate">
                                    {m.card.data.Route}
                                  </span>
                                  <Link
                                    href={m.card.data.Route}
                                    className="inline-flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-md bg-[#062F23] hover:bg-[#0B5C45] text-white text-[11px] font-semibold transition-colors"
                                  >
                                    <span>Open</span>
                                    <ExternalLink className="w-3 h-3 text-emerald-300" />
                                  </Link>
                                </div>
                              )}
                            </div>

                            {/* Actions bar */}
                            {m.card.actions && m.card.actions.length > 0 && (
                              <div className="flex flex-wrap items-center gap-2 border-t border-stone-100 dark:border-stone-800/80 bg-stone-50/40 dark:bg-white/[0.01] px-3.5 py-2">
                                {m.card.actions.map((act, aIdx) => (
                                  <Link
                                    key={aIdx}
                                    href={act.payload?.href || '#'}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition-colors"
                                  >
                                    <span>{act.label}</span>
                                    <ExternalLink className="w-3 h-3 text-emerald-300" />
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Thinking bubble */}
              {isThinking && (
                <div className="flex gap-2.5 mr-auto max-w-[85%] items-center">
                  <div className="shrink-0 w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center overflow-hidden text-[#10B981]">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="rounded-xl rounded-bl-xs px-3.5 py-2 bg-[#F8FAF8] dark:bg-white/[0.03] border border-[#E5ECE8] dark:border-[#1E382E] flex items-center gap-2 text-xs text-[#65736D] dark:text-[#9AB2A8]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-bounce [animation-delay:0.4s]" />
                    <span className="ml-1 text-[11px]">BREWIE is thinking...</span>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-xs">
                  {errorMessage}
                </div>
              )}
            </div>

            {/* Suggestions Quick Bar */}
            <div className="px-3.5 py-2 bg-[#FCFDFC] dark:bg-[#0A1A14] border-t border-[#E5ECE8] dark:border-[#1E382E] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#8D9792] dark:text-[#678074] shrink-0">
                Suggestions:
              </span>
              {quickSuggestions.map((s, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  onClick={() => handleSend(s.query)}
                  className="shrink-0 text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-[#10221B] border border-[#E5ECE8] dark:border-[#1E382E] hover:border-[#10B981]/40 hover:bg-[#F2FAF6] dark:hover:bg-[#142E25] text-[#12201B] dark:text-[#F2FAF6] transition-colors cursor-pointer"
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Chat Input Form */}
            <div className="p-3 sm:p-3.5 border-t border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] shrink-0">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask BREWIE anything about your cafe..."
                  disabled={isThinking}
                  className="flex-1 h-9 px-3.5 rounded-lg bg-[#F5F7F6] dark:bg-[#10221B] border border-[#E5ECE8] dark:border-[#1E382E] text-xs sm:text-sm text-[#12201B] dark:text-[#F2FAF6] placeholder:text-[#8D9792] dark:placeholder:text-[#678074] focus:outline-none focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/15 transition-all duration-200 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="h-9 px-3.5 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] disabled:opacity-40 disabled:hover:bg-[#062F23] text-white flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer shrink-0 text-xs font-semibold gap-1.5"
                  aria-label="Send message"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5 text-emerald-300" />
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT SIDEBAR (4 COLS) */}
          <div className="lg:col-span-4 space-y-3.5">
            {/* Specialized Domains */}
            <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-3.5 sm:p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#E8F6EF] dark:bg-[#123326] flex items-center justify-center text-[#0B5C45] dark:text-[#34D399]">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-[#12201B] dark:text-[#F2FAF6]">
                    Specialized Domains
                  </h3>
                  <p className="text-[10px] text-[#65736D] dark:text-[#9AB2A8]">
                    What your assistant excels at
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#F8FAF8] dark:bg-white/[0.02] border border-[#E5ECE8] dark:border-[#1E382E] flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#12201B] dark:text-[#F2FAF6]">
                      Sales Trends &amp; Revenue
                    </p>
                    <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                      Analyze hourly order velocity, gross sales, and average bill amounts.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8FAF8] dark:bg-white/[0.02] border border-[#E5ECE8] dark:border-[#1E382E] flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#12201B] dark:text-[#F2FAF6]">
                      Inventory Depletion
                    </p>
                    <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                      Forecast milk, bean, and syrup restocking before peak hours.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8FAF8] dark:bg-white/[0.02] border border-[#E5ECE8] dark:border-[#1E382E] flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-[#12201B] dark:text-[#F2FAF6]">
                      Table &amp; QR Workflows
                    </p>
                    <p className="text-[10.5px] text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                      Generate QR configurations and manage table assignments smoothly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Prompts */}
            <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-xl p-3.5 sm:p-4 shadow-xs space-y-2.5">
              <h3 className="font-bold text-xs sm:text-sm text-[#12201B] dark:text-[#F2FAF6] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#0B5C45] dark:text-[#34D399]" />
                <span>Quick Prompts</span>
              </h3>
              <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8]">
                Click any query to execute immediately:
              </p>
              <div className="space-y-1.5">
                {quickSuggestions.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(item.query)}
                      className="w-full text-left p-2.5 rounded-lg border border-[#E5ECE8] dark:border-[#1E382E] bg-white dark:bg-[#10221B] hover:bg-[#F2FAF6] dark:hover:bg-[#142E25] hover:border-[#10B981]/40 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${item.color}`}>
                          <IconComp className="w-3 h-3" />
                        </div>
                        <span className="text-xs font-medium text-[#12201B] dark:text-[#F2FAF6] truncate">
                          {item.title}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-[#8D9792] group-hover:text-[#0B5C45] dark:group-hover:text-[#10B981] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Context Card */}
            <div className="rounded-xl bg-[#FFF9F1] dark:bg-[#1A1813] border border-[#F2E3CA] dark:border-[#2C2417] p-3 sm:p-3.5 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Soup className="w-3.5 h-3.5 text-[#F59E0B]" />
                <h4 className="text-xs font-bold text-[#12201B] dark:text-[#F2FAF6]">
                  Active Context
                </h4>
              </div>
              <p className="text-[11px] text-[#65736D] dark:text-[#9AB2A8] leading-relaxed">
                BREWIE has live visibility into <strong>{cafeName}</strong> (INR). Operational parameters are referenced dynamically for all suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
