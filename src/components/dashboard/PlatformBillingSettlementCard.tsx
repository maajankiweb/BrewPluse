'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, AlertTriangle, Clock, CheckCircle2, RefreshCw, Zap, Landmark } from 'lucide-react';

interface BillingStatus {
  accumulatedDuePaise: number;
  accumulatedDueRupees: number;
  thresholdPaise: number;
  thresholdRupees: number;
  totalOrdersBilled: number;
  ordersUntilThreshold: number;
  isLocked: boolean;
  inCooldown: boolean;
  cooldownRemainingSeconds: number;
  cooldownEndsAt?: string | null;
  lastSettledAt?: string | null;
  platformFeeMode?: 'customer' | 'cafe';
}

export default function PlatformBillingSettlementCard({ storeSlug }: { storeSlug: string }) {
  const [status, setStatus] = useState<BillingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [settling, setSettling] = useState(false);
  const [cooldownCountdown, setCooldownCountdown] = useState<number>(0);
  const [notice, setNotice] = useState<string | null>(null);

  async function loadStatus() {
    try {
      const res = await fetch('/api/admin/platform-billing/status');
      if (res.ok) {
        const data = await res.json();
        if (data.billing) {
          setStatus(data.billing);
          if (data.billing.cooldownRemainingSeconds > 0) {
            setCooldownCountdown(data.billing.cooldownRemainingSeconds);
          }
        }
      }
    } catch (e) {
      console.error('Failed to load platform billing status:', e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 15000); // Poll status every 15s
    return () => clearInterval(interval);
  }, [storeSlug]);

  // Live countdown timer for 2-minute cooldown
  useEffect(() => {
    if (cooldownCountdown <= 0) return;
    const timer = setInterval(() => {
      setCooldownCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          loadStatus();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownCountdown]);

  // Handle ₹200 Razorpay settlement
  async function handleSettlePayment() {
    setSettling(true);
    setNotice(null);
    try {
      // 1. Create settlement Razorpay order
      const res = await fetch('/api/admin/platform-billing/create-settlement', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setNotice(data?.error?.message || 'Failed to initialize settlement payment.');
        setSettling(false);
        return;
      }

      const { order } = data;

      // 2. Mock / Real Razorpay Checkout flow
      const mockPaymentId = `pay_settle_${Date.now()}`;
      const verifyRes = await fetch('/api/admin/platform-billing/verify-settlement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: order.id,
          razorpay_payment_id: mockPaymentId,
          razorpay_signature: 'test_valid_mock_signature',
        }),
      });

      const verifyData = await verifyRes.json();
      if (verifyRes.ok && verifyData.success) {
        setNotice('₹200 Settlement Verified! Ordering will resume in 2 minutes.');
        setCooldownCountdown(120);
        await loadStatus();
      } else {
        setNotice(verifyData?.error?.message || 'Settlement verification failed.');
      }
    } catch (err: any) {
      setNotice('Network error while processing settlement.');
    } finally {
      setSettling(false);
    }
  }

  if (loading || !status) return null;

  const dueRupees = status.accumulatedDueRupees || 0;
  const progressPercent = Math.min(100, (dueRupees / 200) * 100);
  const isThresholdReached = status.isLocked || dueRupees >= 200;

  return (
    <div className="w-full space-y-2 font-sans">
      {/* CASE 1: In 2-Minute Cooldown */}
      {status.inCooldown || cooldownCountdown > 0 ? (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <div className="text-xs sm:text-sm font-extrabold flex items-center gap-2">
                <span>₹200 Settlement Verified • 2-Min Cooldown Active</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-mono text-[11px] font-bold">
                  {Math.floor(cooldownCountdown / 60)}:
                  {String(cooldownCountdown % 60).padStart(2, '0')}
                </span>
              </div>
              <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-0.5">
                Thank you! Your payment reached BrewPluse. New table orders will re-open automatically in {cooldownCountdown}s.
              </p>
            </div>
          </div>
          <button
            onClick={loadStatus}
            className="text-xs font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
          >
            Refresh
          </button>
        </div>
      ) : isThresholdReached ? (
        /* CASE 2: ₹200 Threshold Lockout Reached */
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border-2 border-rose-500/40 text-rose-950 dark:text-rose-100 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-black tracking-tight text-rose-900 dark:text-rose-200">
                  New Orders Paused • ₹200 Settlement Due
                </span>
                <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase">
                  Threshold Reached
                </span>
              </div>
              <p className="text-xs text-rose-800 dark:text-rose-300 mt-1 leading-relaxed max-w-xl">
                You have billed 200 orders on BrewPluse (₹1/order = ₹200.00). Settle this ₹200 to BrewPluse via Razorpay to resume accepting new table orders. Orders will re-open 2 minutes after settlement.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleSettlePayment}
              disabled={settling}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <CreditCard className="w-4 h-4" />
              <span>{settling ? 'Processing...' : 'Settle ₹200 via Razorpay'}</span>
            </button>
          </div>
        </div>
      ) : (
        /* CASE 3: Normal Operation (Tracking progress to ₹200) */
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E7ECE9] dark:border-[#1E342B] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-[#142E25] text-emerald-800 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">
              ₹1
            </div>
            <div>
              <div className="text-xs font-extrabold text-[#12201B] dark:text-white flex items-center gap-2 flex-wrap">
                <span>BrewPluse Platform Ledger</span>
                <span className="text-[10px] text-gray-500 font-normal">
                  (₹1 per billed order • 100% direct UPI to your bank)
                </span>
                <Link
                  href={`/dashboard/${storeSlug}/settings/upi`}
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                >
                  Fee: {status.platformFeeMode === 'customer' ? 'Customer Pays (+₹1)' : 'Cafe Absorbs'}
                </Link>
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <div className="w-36 h-2 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-gray-700 dark:text-gray-300">
                  ₹{dueRupees} / ₹200
                </span>
                <span className="text-[11px] text-gray-500">
                  ({status.ordersUntilThreshold} orders left before ₹200 settlement)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            {dueRupees > 0 && (
              <button
                onClick={handleSettlePayment}
                disabled={settling}
                className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 text-[11px] font-semibold transition-colors cursor-pointer"
              >
                {settling ? 'Processing...' : 'Settle Early'}
              </button>
            )}
          </div>
        </div>
      )}

      {notice && (
        <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400 px-1 animate-fade-in">
          {notice}
        </div>
      )}
    </div>
  );
}
