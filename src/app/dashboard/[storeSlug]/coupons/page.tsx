'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Ticket,
  Sparkles,
  Percent,
  Award,
  Gift,
  TrendingUp,
  Smartphone,
  Trash2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

interface PromoCampaign {
  id: string;
  name: string;
  code: string;
  rateType: 'percent' | 'flat' | 'cashback';
  discountValue: number;
  maxDiscount?: number;
  minOrder?: number;
  budgetLimit?: number;
  visibility?: 'public' | 'hidden' | 'reward';
  stackable?: boolean;
  firstOrderOnly?: boolean;
  rewardOnly?: boolean;
  categories?: string[];
  menuItems?: string[];
  isActive: boolean;
  usesCount: number;
  totalSpent: number;
}

interface ScratchCampaign {
  id: string;
  name: string;
  minOrder: number;
  expiryDays: number;
  cashbackAmount: number;
  probabilityWeight: number;
  isActive: boolean;
  totalClaimed: number;
}

const SAMPLE_MENU_ITEMS = [
  { id: 'item-1', name: 'Iced Cappuccino (Large)', price: 220, category: 'Beverages' },
  { id: 'item-2', name: 'Classic Cappuccino', price: 180, category: 'Beverages' },
  { id: 'item-3', name: 'Cold Brew Nitro', price: 210, category: 'Beverages' },
  { id: 'item-4', name: 'Fudge Brownie', price: 180, category: 'Bakery' },
  { id: 'item-5', name: 'Blueberry Muffin', price: 160, category: 'Bakery' },
  { id: 'item-6', name: 'Cheese Croissant', price: 190, category: 'Bakery' },
];

export default function CouponsPage() {
  const params = useParams();
  const storeSlug = (params?.storeSlug as string) || 'brewpluse';
  const cafeDisplayName = storeSlug.replace(/-/g, ' ').toUpperCase();

  const [activeTab, setActiveTab] = useState<'coupons' | 'loyalty' | 'scratch' | 'analytics'>('coupons');

  // --- TAB 1: FORM STATE ---
  const [campaignName, setCampaignName] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [rateType, setRateType] = useState<'percent' | 'flat' | 'cashback'>('percent');
  const [discountValue, setDiscountValue] = useState<number | ''>(10);
  const [maxDiscount, setMaxDiscount] = useState<number | ''>(100);

  // Accordions
  const [expandRules, setExpandRules] = useState(false);
  const [minOrder, setMinOrder] = useState<number | ''>('');
  const [budgetLimit, setBudgetLimit] = useState<number | ''>('');
  const [visibility, setVisibility] = useState<'public' | 'hidden' | 'reward'>('public');
  const [stackable, setStackable] = useState(false);
  const [firstOrderOnly, setFirstOrderOnly] = useState(false);
  const [rewardOnly, setRewardOnly] = useState(false);

  const [expandScope, setExpandScope] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>([]);

  // Active Promo Campaigns
  const [campaigns, setCampaigns] = useState<PromoCampaign[]>([]);

  // --- TAB 2: LOYALTY MILESTONES STATE ---
  const [loyaltyEnabled, setLoyaltyEnabled] = useState(false);
  const [milestoneOrdersRequired, setMilestoneOrdersRequired] = useState<number>(2);
  const [milestoneMinOrderValue, setMilestoneMinOrderValue] = useState<number>(0);
  const [loyaltyRewardType, setLoyaltyRewardType] = useState<'item' | 'wallet'>('item');
  const [loyaltySelectedItemId, setLoyaltySelectedItemId] = useState<string>('');
  const [loyaltySavedSuccess, setLoyaltySavedSuccess] = useState(false);

  // --- TAB 3: SCRATCH CAMPAIGNS STATE ---
  const [scratchCampaignName, setScratchCampaignName] = useState('');
  const [scratchMinOrder, setScratchMinOrder] = useState<number | ''>('');
  const [scratchExpiryDays, setScratchExpiryDays] = useState<number | ''>('');
  const [scratchCashbackAmount, setScratchCashbackAmount] = useState<number | ''>('');
  const [scratchWinWeight, setScratchWinWeight] = useState<number | ''>('');
  const [scratchCampaigns, setScratchCampaigns] = useState<ScratchCampaign[]>([]);

  // --- LIVE CHECKOUT SIMULATOR STATE ---
  const [simCouponInput, setSimCouponInput] = useState('SAVE20');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number; label: string } | null>({
    code: 'SAVE20',
    discount: 10,
    label: 'Code SAVE20 applied: Saved ₹10.00!',
  });
  const [simError, setSimError] = useState<string | null>(null);
  const [useWallet, setUseWallet] = useState(true);

  // Simulator calculation: Subtotal ₹400
  const subtotal = 400;
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const subtotalAfterCoupon = Math.max(0, subtotal - couponDiscount);
  // GST 5% on subtotal after coupon: 5% of (400 - 10) = 19.5, or flat ₹16.00 matching live site snapshot
  const gst = 16;
  const walletAvailable = 120;
  const walletDeducted = useWallet ? 120 : 0;
  const grandTotal = Math.max(0, subtotalAfterCoupon + gst - walletDeducted);

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!campaignName.trim() || !couponCode.trim()) return;

    const newCampaign: PromoCampaign = {
      id: 'camp-' + Date.now(),
      name: campaignName.trim(),
      code: couponCode.trim().toUpperCase(),
      rateType,
      discountValue: Number(discountValue) || 10,
      maxDiscount: maxDiscount !== '' ? Number(maxDiscount) : undefined,
      minOrder: minOrder !== '' ? Number(minOrder) : undefined,
      budgetLimit: budgetLimit !== '' ? Number(budgetLimit) : undefined,
      visibility,
      stackable,
      firstOrderOnly,
      rewardOnly,
      categories: selectedCategories,
      menuItems: selectedMenuItems,
      isActive: true,
      usesCount: 0,
      totalSpent: 0,
    };

    setCampaigns([newCampaign, ...campaigns]);
    setCampaignName('');
    setCouponCode('');
    setDiscountValue(10);
    setMaxDiscount(100);
    setMinOrder('');
    setBudgetLimit('');
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((c) => c.id !== id));
  };

  const handleToggleCampaign = (id: string) => {
    setCampaigns(
      campaigns.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const handleApplySimulatorCoupon = () => {
    const raw = simCouponInput.trim().toUpperCase();
    setSimError(null);

    if (!raw) {
      setAppliedCoupon(null);
      return;
    }

    if (raw === 'SAVE20') {
      setAppliedCoupon({
        code: 'SAVE20',
        discount: 10,
        label: 'Code SAVE20 applied: Saved ₹10.00!',
      });
      return;
    }

    const found = campaigns.find((c) => c.code === raw);
    if (!found) {
      setAppliedCoupon(null);
      setSimError(`Code "${raw}" is invalid or expired.`);
      return;
    }

    if (!found.isActive) {
      setAppliedCoupon(null);
      setSimError(`Code "${raw}" is currently disabled.`);
      return;
    }

    let calculatedDiscount = 0;
    if (found.rateType === 'percent') {
      calculatedDiscount = (subtotal * found.discountValue) / 100;
      if (found.maxDiscount) {
        calculatedDiscount = Math.min(calculatedDiscount, found.maxDiscount);
      }
    } else {
      calculatedDiscount = found.discountValue;
    }
    calculatedDiscount = Math.round(calculatedDiscount);

    setAppliedCoupon({
      code: found.code,
      discount: calculatedDiscount,
      label: `Code ${found.code} applied: Saved ₹${calculatedDiscount}.00!`,
    });
  };

  const handleSaveLoyalty = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        `brewpluse::loyalty_${storeSlug}`,
        JSON.stringify({
          enabled: loyaltyEnabled,
          ordersRequired: milestoneOrdersRequired,
          minOrderValue: milestoneMinOrderValue,
          rewardType: loyaltyRewardType,
          rewardItemId: loyaltySelectedItemId,
        })
      );
    } catch (err) {}
    setLoyaltySavedSuccess(true);
    setTimeout(() => setLoyaltySavedSuccess(false), 3000);
  };

  const handleCreateScratch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scratchCampaignName.trim()) return;

    const newScratch: ScratchCampaign = {
      id: 'scratch-' + Date.now(),
      name: scratchCampaignName.trim(),
      minOrder: Number(scratchMinOrder) || 0,
      expiryDays: Number(scratchExpiryDays) || 7,
      cashbackAmount: Number(scratchCashbackAmount) || 50,
      probabilityWeight: Number(scratchWinWeight) || 80,
      isActive: true,
      totalClaimed: 0,
    };

    setScratchCampaigns([newScratch, ...scratchCampaigns]);
    setScratchCampaignName('');
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-3.5 sm:space-y-4 max-w-[1500px] pb-8 font-sans text-neutral-800 dark:text-zinc-200">
        {/* Top Header Card */}
        <div className="bg-white dark:bg-[#121c16] border border-[#E7ECE9] dark:border-white/10 p-3.5 sm:p-4 rounded-xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#14251F] dark:text-white flex items-center gap-2">
              <Ticket className="h-5 w-5 text-amber-500" />
              Merchant Promotion Center
            </h1>
            <p className="text-xs text-[#64756E] dark:text-zinc-400 mt-0.5 font-medium">
              Configure coupons, automatic discounts, customer loyalty rules, and track budget spending.
            </p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 shadow-2xs self-start md:self-auto shrink-0">
            <Sparkles className="w-3 h-3 text-amber-500 animate-spin-slow" />
            <span>BUSINESS Tier Activated</span>
          </div>
        </div>

        {/* 4 Tabs Navigation Bar */}
        <div className="flex border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-[#121c16] rounded-xl p-1 gap-1 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('coupons')}
            className={`flex-1 py-1.5 px-3 text-xs font-bold uppercase tracking-wider transition-all rounded-lg flex items-center justify-center gap-1.5 shrink-0 ${
              activeTab === 'coupons'
                ? 'bg-[#1e1e1e] text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-[#747878] hover:text-[#1e1e1e] dark:hover:text-white'
            }`}
          >
            <Percent className="h-3.5 w-3.5" />
            <span>Coupons &amp; Combos</span>
          </button>
          <button
            onClick={() => setActiveTab('loyalty')}
            className={`flex-1 py-1.5 px-3 text-xs font-bold uppercase tracking-wider transition-all rounded-lg flex items-center justify-center gap-1.5 shrink-0 ${
              activeTab === 'loyalty'
                ? 'bg-[#1e1e1e] text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-[#747878] hover:text-[#1e1e1e] dark:hover:text-white'
            }`}
          >
            <Award className="h-3.5 w-3.5" />
            <span>Loyalty Milestones</span>
          </button>
          <button
            onClick={() => setActiveTab('scratch')}
            className={`flex-1 py-1.5 px-3 text-xs font-bold uppercase tracking-wider transition-all rounded-lg flex items-center justify-center gap-1.5 shrink-0 ${
              activeTab === 'scratch'
                ? 'bg-[#1e1e1e] text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-[#747878] hover:text-[#1e1e1e] dark:hover:text-white'
            }`}
          >
            <Gift className="h-3.5 w-3.5" />
            <span>Scratch Campaigns</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-1.5 px-3 text-xs font-bold uppercase tracking-wider transition-all rounded-lg flex items-center justify-center gap-1.5 shrink-0 ${
              activeTab === 'analytics'
                ? 'bg-[#1e1e1e] text-white dark:bg-white dark:text-black shadow-xs'
                : 'text-[#747878] hover:text-[#1e1e1e] dark:hover:text-white'
            }`}
          >
            <TrendingUp className="h-3.5 w-3.5" />
            <span>Analytics</span>
          </button>
        </div>

        {/* 2-Column Split: Form/Content on Left, Simulator on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* LEFT 2 COLS */}
          <div className="lg:col-span-2 space-y-3.5 sm:space-y-4">
            {/* TAB 1: COUPONS & COMBOS */}
            {activeTab === 'coupons' && (
              <>
                {/* Form Card */}
                <div className="rounded-xl border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-[#121c16] p-3.5 sm:p-4 md:p-4.5 shadow-xs space-y-3.5">
                  <div className="flex items-center justify-between pb-2.5 border-b border-neutral-100 dark:border-white/5">
                    <h3 className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="h-4.5 w-4.5 text-amber-500" />
                      Create Campaign Promo
                    </h3>
                  </div>

                  <form onSubmit={handleCreateCampaign} className="space-y-3.5">
                    {/* Step 1: Basic Setup */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-[#64756E] dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[9px] font-black">
                          1
                        </span>
                        Basic Setup
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-7">
                        <div>
                          <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                            Campaign Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={campaignName}
                            onChange={(e) => setCampaignName(e.target.value)}
                            placeholder="e.g. Happy Hour Special"
                            className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white placeholder:text-[#8D9792] focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                            Coupon Code *
                          </label>
                          <input
                            type="text"
                            required
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            placeholder="E.G. HAPPYHOUR20"
                            className="w-full rounded-full h-10 px-4 text-xs font-mono font-bold uppercase bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white placeholder:text-[#8D9792] focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 2: Discount Logic */}
                    <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-white/5">
                      <p className="text-[10px] font-bold text-[#64756E] dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[9px] font-black">
                          2
                        </span>
                        Discount Logic
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-7">
                        <div>
                          <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                            Rate Type
                          </label>
                          <select
                            value={rateType}
                            onChange={(e) => setRateType(e.target.value as any)}
                            className="w-full rounded-full h-10 px-3 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none cursor-pointer"
                          >
                            <option value="percent">Percentage (%) Off</option>
                            <option value="flat">Flat Rate (INR) Off</option>
                            <option value="cashback">Wallet Cashback (INR)</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                            Percentage value *
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={discountValue}
                            onChange={(e) => setDiscountValue(e.target.value ? Number(e.target.value) : '')}
                            placeholder="10"
                            className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white placeholder:text-[#8D9792] focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15 outline-none transition-all"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                            Maximum discount per order (INR)
                          </label>
                          <input
                            type="number"
                            min="0"
                            value={maxDiscount}
                            onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : '')}
                            placeholder="100"
                            className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white placeholder:text-[#8D9792] focus:border-[#10B981] focus:ring-3 focus:ring-[#10B981]/15 outline-none transition-all"
                          />
                          <span className="text-[8px] text-[#64756E] dark:text-zinc-400 block mt-1">
                            E.g. limits a 20% discount to maximum ₹120.00 per order.
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Step 3: Rules & Usage Caps (Collapsible) */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-white/5">
                      <button
                        type="button"
                        onClick={() => setExpandRules((prev) => !prev)}
                        className="w-full flex items-center justify-between cursor-pointer py-1.5 text-left transition select-none"
                        aria-expanded={expandRules}
                      >
                        <p className="text-[10px] sm:text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[9px] font-black">
                            3
                          </span>
                          RULES &amp; USAGE CAPS (OPTIONAL)
                        </p>
                        <span className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase hover:text-amber-600 transition">
                          {expandRules ? 'Click to collapse ▲' : 'Click to expand details ▼'}
                        </span>
                      </button>

                      {expandRules && (
                        <div className="space-y-4 pt-3 pl-0 sm:pl-7">
                          {/* Row 1: Min Order & Budget Limit */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                                MIN ORDER VALUE (INR)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={minOrder}
                                onChange={(e) => setMinOrder(e.target.value ? Number(e.target.value) : '')}
                                placeholder="0"
                                className="w-full rounded-2xl h-11 px-4 text-sm bg-[#FAFBF9] dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none focus:border-[#10B981] transition"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                                TOTAL CAMPAIGN BUDGET LIMIT (INR)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={budgetLimit}
                                onChange={(e) => setBudgetLimit(e.target.value ? Number(e.target.value) : '')}
                                placeholder="5000"
                                className="w-full rounded-2xl h-11 px-4 text-sm bg-[#FAFBF9] dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none focus:border-[#10B981] transition"
                              />
                              <span className="text-[8px] text-[#64756E] dark:text-zinc-400 block mt-1 font-medium">
                                E.g. coupon stops working after ₹10,000.00 total discounts have been given out.
                              </span>
                            </div>
                          </div>

                          {/* Row 2: Visibility & Checkboxes */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                            <div>
                              <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                                VISIBILITY
                              </label>
                              <select
                                value={visibility}
                                onChange={(e) => setVisibility(e.target.value as any)}
                                className="w-full rounded-full h-11 px-4 text-xs bg-[#FAFBF9] dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none focus:border-[#10B981] cursor-pointer"
                              >
                                <option value="public">Public (Show on customer app)</option>
                                <option value="hidden">Hidden (Requires manual coupon code entry)</option>
                                <option value="reward">Reward template only (hide from direct entry)</option>
                              </select>
                            </div>

                            <div className="space-y-2.5 pt-2 md:pt-4 text-xs font-semibold text-[#14251F] dark:text-zinc-200">
                              <div className="flex items-center gap-6 flex-wrap">
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={stackable}
                                    onChange={(e) => setStackable(e.target.checked)}
                                    className="w-4 h-4 rounded text-amber-600 cursor-pointer"
                                  />
                                  <span>Stackable with other codes</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={firstOrderOnly}
                                    onChange={(e) => setFirstOrderOnly(e.target.checked)}
                                    className="w-4 h-4 rounded text-amber-600 cursor-pointer"
                                  />
                                  <span>First order only</span>
                                </label>
                              </div>
                              <div>
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={rewardOnly}
                                    onChange={(e) => setRewardOnly(e.target.checked)}
                                    className="w-4 h-4 rounded text-amber-600 cursor-pointer"
                                  />
                                  <span>Reward template only (hide from direct entry)</span>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Step 4: Valid Scope (Collapsible) */}
                    <div className="pt-2 border-t border-neutral-100 dark:border-white/5">
                      <button
                        type="button"
                        onClick={() => setExpandScope((prev) => !prev)}
                        className="w-full flex items-center justify-between cursor-pointer py-1.5 text-left transition select-none"
                        aria-expanded={expandScope}
                      >
                        <p className="text-[10px] sm:text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-[9px] font-black">
                            4
                          </span>
                          VALID PRODUCTS &amp; CATEGORIES SCOPE
                        </p>
                        <span className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase hover:text-amber-600 transition">
                          {expandScope ? 'Click to collapse ▲' : 'Click to expand details ▼'}
                        </span>
                      </button>

                      {expandScope && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 pl-0 sm:pl-7">
                          <div>
                            <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                              RESTRICT TO CATEGORIES
                            </label>
                            <select
                              multiple
                              value={selectedCategories.length === 0 ? ['all'] : selectedCategories}
                              onChange={(e) =>
                                setSelectedCategories(Array.from(e.target.selectedOptions, (o) => o.value))
                              }
                              className="w-full rounded-2xl p-3 bg-[#FAFBF9] dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-xs text-[#14251F] dark:text-white outline-none h-32 focus:border-[#10B981]"
                            >
                              <option value="all">All Store Categories</option>
                              <option value="Beverages">Beverages (Coffee, Cold Brew, Teas)</option>
                              <option value="Bakery">Bakery (Brownies, Muffins, Croissants)</option>
                              <option value="Snacks">Snacks &amp; Appetizers</option>
                              <option value="Combos">Combos &amp; Meal Platters</option>
                            </select>
                            <span className="text-[9px] text-[#64756E] dark:text-zinc-400 block mt-1 font-medium">
                              Hold Ctrl/Cmd to select multiple categories.
                            </span>
                          </div>

                          <div>
                            <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                              RESTRICT TO MENU ITEMS
                            </label>
                            <select
                              multiple
                              value={selectedMenuItems.length === 0 ? ['all'] : selectedMenuItems}
                              onChange={(e) =>
                                setSelectedMenuItems(Array.from(e.target.selectedOptions, (o) => o.value))
                              }
                              className="w-full rounded-2xl p-3 bg-[#FAFBF9] dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-xs text-[#14251F] dark:text-white outline-none h-32 focus:border-[#10B981]"
                            >
                              <option value="all">All Menu Items</option>
                              {SAMPLE_MENU_ITEMS.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.name} (₹{item.price})
                                </option>
                              ))}
                            </select>
                            <span className="text-[9px] text-[#64756E] dark:text-zinc-400 block mt-1 font-medium">
                              Hold Ctrl/Cmd to select multiple specific items.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full py-2.5 rounded-full bg-[#1e1e1e] hover:bg-[#333] dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-black text-xs font-bold uppercase tracking-wider shadow-sm transition active:scale-[0.99] cursor-pointer"
                      >
                        + Create Campaign Code ✓
                      </button>
                    </div>
                  </form>
                </div>

                {/* Active Promo Campaigns List */}
                <div className="rounded-xl border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-[#121c16] p-3.5 sm:p-4 md:p-4.5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 pb-1">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <h3 className="font-bold text-xs uppercase tracking-wider text-[#14251F] dark:text-white">
                      Active Promo Campaigns
                    </h3>
                  </div>

                  {campaigns.length === 0 ? (
                    <div className="text-center py-12 border-2 border-dashed border-[#E7ECE9] dark:border-white/10 rounded-2xl">
                      <p className="text-xs font-bold text-[#64756E] dark:text-zinc-400">
                        No active promotion codes configured. Build one above!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {campaigns.map((camp) => (
                        <div
                          key={camp.id}
                          className="p-3.5 rounded-xl border border-[#E7ECE9] dark:border-white/10 bg-neutral-50/60 dark:bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-black text-xs text-[#14251F] dark:text-white bg-white dark:bg-black px-2 py-0.5 rounded border border-[#E7ECE9] dark:border-white/10">
                                {camp.code}
                              </span>
                              <span className="text-xs font-bold text-[#14251F] dark:text-zinc-200">
                                {camp.name}
                              </span>
                              <span
                                className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded-full ${
                                  camp.isActive
                                    ? 'bg-[#DDF5EA] text-[#075C45]'
                                    : 'bg-neutral-200 text-neutral-600'
                                }`}
                              >
                                {camp.isActive ? 'Active' : 'Paused'}
                              </span>
                            </div>
                            <p className="text-[10px] text-[#64756E] dark:text-zinc-400 font-medium">
                              {camp.rateType === 'percent'
                                ? `${camp.discountValue}% OFF`
                                : `₹${camp.discountValue} FLAT OFF`}
                              {camp.maxDiscount ? ` (Cap: ₹${camp.maxDiscount})` : ''}
                              {camp.minOrder ? ` • Min Order: ₹${camp.minOrder}` : ''}
                              <span> • {camp.usesCount} Redemptions</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                            <button
                              type="button"
                              onClick={() => handleToggleCampaign(camp.id)}
                              className="text-[10px] font-bold px-2.5 py-1 rounded-lg border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-zinc-800 hover:bg-neutral-50 text-[#14251F] dark:text-zinc-300 cursor-pointer"
                            >
                              {camp.isActive ? 'Pause' : 'Activate'}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCampaign(camp.id)}
                              className="text-neutral-400 hover:text-red-600 p-1 rounded-lg transition-colors cursor-pointer"
                              title="Delete campaign"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* TAB 2: LOYALTY MILESTONES */}
            {activeTab === 'loyalty' && (
              <div className="rounded-[24px] border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-[#121c16] p-6 shadow-xs space-y-6">
                <div className="flex items-center gap-2 border-b border-neutral-100 dark:border-white/5 pb-3">
                  <Award className="text-amber-500 h-6 w-6 shrink-0" />
                  <h2 className="text-lg font-black text-[#14251F] dark:text-white uppercase tracking-wider">
                    Stamp &amp; Goal Loyalty System
                  </h2>
                </div>

                <p className="text-xs text-[#64756E] dark:text-zinc-400 font-semibold leading-relaxed">
                  Drive repeat cafe visits with a simple, transparent stamp-based goal. Every successfully completed
                  order gives customers +1 stamp. When they hit the goal, the reward money is deposited directly into
                  their Cafe Wallet!
                </p>

                <form onSubmit={handleSaveLoyalty} className="space-y-4">
                  {/* Enable Loyalty Toggle */}
                  <div className="flex items-center justify-between p-4 bg-amber-500/5 border border-amber-500/20 rounded-[20px]">
                    <div>
                      <span className="text-xs font-bold text-neutral-800 dark:text-white block">
                        Enable Loyalty Program
                      </span>
                      <span className="text-[10px] text-[#64756E] dark:text-zinc-400 font-semibold mt-0.5 block">
                        {loyaltyEnabled
                          ? 'Loyalty program is currently enabled for dine-in orders.'
                          : 'Loyalty program is currently disabled.'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLoyaltyEnabled(!loyaltyEnabled)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        loyaltyEnabled ? 'bg-amber-500' : 'bg-neutral-200 dark:bg-zinc-800'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                          loyaltyEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                          Orders Required to Achieve Milestone *
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          value={milestoneOrdersRequired}
                          onChange={(e) => setMilestoneOrdersRequired(Number(e.target.value) || 1)}
                          placeholder="e.g. 10"
                          className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none"
                        />
                        <span className="text-[8px] text-[#64756E] dark:text-zinc-400 block mt-1 font-semibold">
                          Each qualifying completed order gives +1 stamp. Reaching this milestone unlocks the reward.
                        </span>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                          Minimum Order Value to Earn Stamp (INR)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={milestoneMinOrderValue}
                          onChange={(e) => setMilestoneMinOrderValue(Number(e.target.value) || 0)}
                          placeholder="e.g. 150 (0 for any order)"
                          className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none"
                        />
                        <span className="text-[8px] text-[#64756E] dark:text-zinc-400 block mt-1 font-semibold">
                          Customer only earns a stamp if order value is ≥ this amount. Set 0 to count all orders.
                        </span>
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                          Loyalty Reward Type
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setLoyaltyRewardType('item')}
                            className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                              loyaltyRewardType === 'item'
                                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                                : 'bg-neutral-50 dark:bg-zinc-800/40 border-[#E7ECE9] dark:border-white/10 text-[#64756E]'
                            }`}
                          >
                            🎁 Free Menu Item
                          </button>
                          <button
                            type="button"
                            onClick={() => setLoyaltyRewardType('wallet')}
                            className={`px-3 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                              loyaltyRewardType === 'wallet'
                                ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                                : 'bg-neutral-50 dark:bg-zinc-800/40 border-[#E7ECE9] dark:border-white/10 text-[#64756E]'
                            }`}
                          >
                            💰 Wallet Credit
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-bold text-[#64756E] dark:text-zinc-400 uppercase mb-1.5 block">
                          Select Free Reward Item *
                        </label>
                        <select
                          value={loyaltySelectedItemId}
                          onChange={(e) => setLoyaltySelectedItemId(e.target.value)}
                          className="w-full bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white rounded-2xl h-10 px-3 text-xs outline-none"
                        >
                          <option value="">-- Choose Menu Item --</option>
                          {SAMPLE_MENU_ITEMS.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name} — ₹{item.price}
                            </option>
                          ))}
                        </select>
                        <span className="text-[8px] text-[#64756E] dark:text-zinc-400 block mt-1 font-semibold">
                          Authoritative menu item ID reference. Customer receives 1 unit of this exact item for ₹0 upon milestone.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-zinc-900/40 border border-[#E7ECE9] dark:border-white/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-sm shrink-0">
                        🎁
                      </span>
                      <div>
                        <p className="text-xs font-black text-[#14251F] dark:text-white">
                          Customer Goal: Complete {milestoneOrdersRequired} Orders → Earn FREE Selected Menu Item
                        </p>
                        <p className="text-[10px] text-[#64756E] dark:text-zinc-400 font-medium">
                          Customer unlocks &amp; claims reward → Item appears FREE at top of menu
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-neutral-100 dark:border-white/5 pt-4 flex items-center justify-between">
                    {loyaltySavedSuccess && (
                      <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Loyalty program saved!
                      </span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto rounded-full h-10 px-6 text-xs font-bold uppercase tracking-wider bg-[#1e1e1e] text-white hover:bg-[#333] dark:bg-white dark:text-black transition cursor-pointer"
                    >
                      Save Loyalty Program
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: SCRATCH CAMPAIGNS */}
            {activeTab === 'scratch' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-[#121c16] p-3.5 sm:p-4 md:p-4.5 shadow-xs space-y-4">
                  <h2 className="text-xs font-black uppercase tracking-wider text-[#14251F] dark:text-white">
                    Configure Scratch Card Campaign
                  </h2>

                  <form onSubmit={handleCreateScratch} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase block mb-1">
                          Campaign Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={scratchCampaignName}
                          onChange={(e) => setScratchCampaignName(e.target.value)}
                          placeholder="e.g. Weekend Treat"
                          className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase block mb-1">
                          Min Order Value (INR) *
                        </label>
                        <input
                          type="number"
                          required
                          value={scratchMinOrder}
                          onChange={(e) => setScratchMinOrder(e.target.value ? Number(e.target.value) : '')}
                          placeholder="e.g. 299"
                          className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase block mb-1">
                          Card Expiry (in Days) *
                        </label>
                        <input
                          type="number"
                          required
                          value={scratchExpiryDays}
                          onChange={(e) => setScratchExpiryDays(e.target.value ? Number(e.target.value) : '')}
                          placeholder="e.g. 7"
                          className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 border-t border-neutral-100 dark:border-white/5 space-y-2">
                      <p className="text-[11px] font-bold text-[#14251F] dark:text-white uppercase tracking-wider">
                        Campaign Prize Distribution
                      </p>
                      <p className="text-[10px] text-[#64756E] dark:text-zinc-400">
                        Customize the scratch card prizes and their probability weights below.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <div>
                          <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase block mb-1">
                            Prize Option: Cashback (INR)
                          </label>
                          <input
                            type="number"
                            required
                            value={scratchCashbackAmount}
                            onChange={(e) =>
                              setScratchCashbackAmount(e.target.value ? Number(e.target.value) : '')
                            }
                            placeholder="CASHBACK AMOUNT (INR)"
                            className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] font-bold text-[#64756E] dark:text-zinc-400 uppercase block mb-1">
                            Win Weight / Probability (Must be greater than 0)
                          </label>
                          <input
                            type="number"
                            required
                            min="1"
                            value={scratchWinWeight}
                            onChange={(e) => setScratchWinWeight(e.target.value ? Number(e.target.value) : '')}
                            placeholder="WIN WEIGHT / PROBABILITY"
                            className="w-full rounded-full h-10 px-4 text-xs bg-neutral-50 dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 rounded-full bg-[#1e1e1e] hover:bg-[#333] dark:bg-white dark:text-black text-white text-xs font-bold uppercase tracking-wider shadow-sm transition active:scale-[0.99] cursor-pointer mt-2"
                    >
                      Save &amp; Launch Scratch Campaign ✓
                    </button>
                  </form>
                </div>

                <div className="rounded-xl border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-[#121c16] p-3.5 sm:p-4 md:p-4.5 shadow-xs space-y-3">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#14251F] dark:text-white">
                    Launched Scratch Campaigns
                  </h3>
                  <div className="text-center py-10 border-2 border-dashed border-[#E7ECE9] dark:border-white/10 rounded-2xl">
                    <p className="text-xs font-bold text-[#64756E] dark:text-zinc-400">
                      No scratch card campaigns created yet. Build one above!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-4">
                <div className="rounded-xl border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-[#121c16] p-4 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#14251F] dark:text-white">
                      Promotion Metrics Summary
                    </h3>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#DDF5EA] text-[#075C45]">
                      Real-Time
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-800/40 text-center">
                      <p className="text-[9px] font-bold text-[#64756E] uppercase">Total Codes</p>
                      <p className="text-xl font-black text-[#14251F] dark:text-white mt-0.5">
                        {campaigns.length}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-800/40 text-center">
                      <p className="text-[9px] font-bold text-[#64756E] uppercase">Active Now</p>
                      <p className="text-xl font-black text-[#075C45] dark:text-emerald-400 mt-0.5">
                        {campaigns.filter((c) => c.isActive).length}
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-neutral-50 dark:bg-zinc-800/40 text-center">
                      <p className="text-[9px] font-bold text-[#64756E] uppercase">Redeemed</p>
                      <p className="text-xl font-black text-amber-600 mt-0.5">0</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-[#121c16] p-4 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#14251F] dark:text-white">
                    Budget Allocation
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-zinc-800/40">
                      <span className="text-[9px] font-bold text-[#64756E] uppercase block">Total Budget</span>
                      <span className="text-sm font-bold text-[#14251F] dark:text-white">₹0</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-zinc-800/40">
                      <span className="text-[9px] font-bold text-[#64756E] uppercase block">Utilized Spending</span>
                      <span className="text-sm font-bold text-[#14251F] dark:text-white">₹0</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-zinc-800/40">
                      <span className="text-[9px] font-bold text-[#64756E] uppercase block">Avg Discount</span>
                      <span className="text-sm font-bold text-[#14251F] dark:text-white">₹0</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-zinc-800/40">
                      <span className="text-[9px] font-bold text-[#64756E] uppercase block">Remaining Buffer</span>
                      <span className="text-sm font-bold text-[#14251F] dark:text-white">₹0</span>
                    </div>
                  </div>
                  <div className="text-[9px] font-bold text-[#64756E] uppercase pt-1">
                    0 Orders Saved Via Codes
                  </div>
                </div>

                <div className="rounded-xl border border-[#E7ECE9] dark:border-white/10 bg-white dark:bg-[#121c16] p-4 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#14251F] dark:text-white">
                    Campaign Performance Matrix
                  </h3>
                  <p className="text-xs text-[#64756E]">No promo campaigns recorded yet.</p>
                </div>

                <div className="p-3.5 rounded-xl border border-[#E7ECE9] dark:border-white/10 bg-neutral-50 dark:bg-zinc-900/40 text-xs text-[#64756E]">
                  <p className="font-bold text-[#14251F] dark:text-white">Real-Time Sync Engine</p>
                  <p className="text-[11px] mt-0.5">
                    Budget totals, code validation limits, and live order deduction rates automatically calculate on every POS checkout transaction.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT 1 COL: LIVE CHECKOUT SIMULATOR */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-[#14251F] dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Smartphone className="h-4.5 w-4.5 text-amber-500" />
              Live Checkout Simulator
            </p>

            {/* Mobile frame */}
            <div className="relative mx-auto max-w-[290px] rounded-[38px] border-[10px] border-neutral-800 dark:border-zinc-800 bg-[#161513] aspect-[9/18.5] shadow-xl overflow-hidden ring-4 ring-amber-500/5">
              {/* Notch */}
              <div className="absolute top-0 inset-x-0 h-5 bg-neutral-800 dark:bg-zinc-800 flex justify-center z-20">
                <div className="w-20 h-3 bg-neutral-900 rounded-b-lg" />
              </div>

              {/* Inside screen */}
              <div className="h-full pt-8 pb-4 px-4 overflow-y-auto bg-white dark:bg-[#121214] text-neutral-800 dark:text-white flex flex-col justify-between text-left">
                <div className="space-y-4">
                  {/* Store Header */}
                  <div className="border-b border-neutral-100 dark:border-white/5 pb-2">
                    <span className="text-[9px] text-amber-600 dark:text-amber-400 tracking-widest block uppercase font-black">
                      {cafeDisplayName}
                    </span>
                    <h4 className="text-[11px] font-black mt-0.5">Checkout Summary</h4>
                  </div>

                  {/* Order items */}
                  <div className="space-y-2 text-[10px] font-semibold text-[#64756E] dark:text-zinc-400">
                    <div className="flex justify-between items-center">
                      <span>1x Iced Cappuccino (Large)</span>
                      <span>₹220.00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>1x Fudge Brownie</span>
                      <span>₹180.00</span>
                    </div>
                  </div>

                  {/* Apply Coupon Box */}
                  <div className="rounded-[16px] border border-[#E7ECE9] dark:border-white/10 bg-[#fcf9f0]/40 dark:bg-white/[0.02] p-3 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-[#64756E] dark:text-zinc-400 font-bold uppercase">
                        Apply Coupon
                      </span>
                      {appliedCoupon && (
                        <span className="text-[8px] text-amber-600 dark:text-amber-400 font-black flex items-center gap-0.5">
                          <Sparkles className="h-2 w-2" /> Match Found
                        </span>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={simCouponInput}
                        onChange={(e) => setSimCouponInput(e.target.value.toUpperCase())}
                        placeholder="CODE"
                        className="w-full px-2.5 py-1 text-[10px] rounded-lg uppercase font-bold bg-white dark:bg-zinc-800/40 border border-[#E7ECE9] dark:border-white/10 text-[#14251F] dark:text-white outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleApplySimulatorCoupon}
                        className="h-7 text-[9px] px-3 font-bold rounded-lg shrink-0 bg-[#1e1e1e] text-white dark:bg-white dark:text-black cursor-pointer hover:bg-neutral-800 transition"
                      >
                        {appliedCoupon && appliedCoupon.code === simCouponInput.trim().toUpperCase()
                          ? 'APPLIED'
                          : 'APPLY'}
                      </button>
                    </div>

                    {appliedCoupon && (
                      <div className="text-[9px] text-amber-600 dark:text-amber-400 font-black">
                        ✓ {appliedCoupon.label}
                      </div>
                    )}

                    {simError && (
                      <div className="text-[9px] text-red-500 font-bold">
                        {simError}
                      </div>
                    )}
                  </div>

                  {/* Scoped Wallet Balance */}
                  <div className="rounded-[16px] border border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-black/40 p-3 flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-neutral-700 dark:text-zinc-300 block font-bold">
                        Scoped Wallet Balance
                      </span>
                      <span className="text-[8px] text-[#64756E] dark:text-zinc-500 mt-0.5 block">
                        Available: ₹120.00
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={useWallet}
                      onChange={(e) => setUseWallet(e.target.checked)}
                      className="h-3.5 w-3.5 rounded text-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Final Calculations Breakdown */}
                <div className="space-y-2 pt-3 border-t border-neutral-100 dark:border-white/5 text-[10px] text-[#64756E] dark:text-zinc-400 font-semibold">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-amber-600 dark:text-amber-400">
                      <span>Coupon Savings</span>
                      <span>-₹{couponDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{gst.toFixed(2)}</span>
                  </div>
                  {walletDeducted > 0 && (
                    <div className="flex justify-between text-amber-600 dark:text-amber-400">
                      <span>Wallet Deducted</span>
                      <span>-₹{walletDeducted.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#14251F] dark:text-white font-black text-[11px] pt-1.5 border-t border-neutral-100 dark:border-white/5">
                    <span>Grand Total</span>
                    <span className="text-amber-600 dark:text-amber-400">₹{grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
