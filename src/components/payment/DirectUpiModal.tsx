'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  QrCode,
  Smartphone,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import {
  getPlatformUpiConfig,
  buildUpiUri,
  generateUpiQrDataUrl,
  isValidUtr,
} from '@/lib/platformUpi';

export interface DirectUpiModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  description?: string;
  amount: number; // in ₹
  transactionNote?: string;
  note?: string;
  referenceId?: string;
  onVerified?: (utr: string) => Promise<{ success: boolean; message?: string }>;
  onConfirmUtr?: (utr: string) => Promise<any>;
  customUpiId?: string;
  customPayeeName?: string;
}

export default function DirectUpiModal({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  amount,
  transactionNote,
  note,
  referenceId,
  onVerified,
  onConfirmUtr,
  customUpiId,
  customPayeeName,
}: DirectUpiModalProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [upiUri, setUpiUri] = useState<string>('');
  const [activeUpiId, setActiveUpiId] = useState<string>('');
  const [activePayeeName, setActivePayeeName] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [utrNumber, setUtrNumber] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const effectiveSubtitle = subtitle || description;
  const effectiveNote = transactionNote || note || 'BrewPluse Payment';
  const effectiveRef = referenceId || `BP-${Date.now()}`;

  useEffect(() => {
    if (!isOpen) {
      setUtrNumber('');
      setErrorMsg('');
      setIsVerifying(false);
      setIsSuccess(false);
      return;
    }

    const config = getPlatformUpiConfig();
    const upiId = customUpiId || config.upiId;
    const payeeName = customPayeeName || config.payeeName;
    setActiveUpiId(upiId);
    setActivePayeeName(payeeName);

    const uri = buildUpiUri({
      upiId,
      payeeName,
      amount,
      transactionNote: effectiveNote,
      transactionRef: effectiveRef,
    });
    setUpiUri(uri);

    generateUpiQrDataUrl(uri).then((data) => {
      setQrDataUrl(data);
    });
  }, [
    isOpen,
    amount,
    effectiveNote,
    effectiveRef,
    customUpiId,
    customPayeeName,
  ]);

  if (!isOpen) return null;

  const handleCopyUpi = () => {
    if (!activeUpiId) return;
    navigator.clipboard.writeText(activeUpiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanUtr = utrNumber.trim();
    if (!cleanUtr) {
      setErrorMsg('Please enter the 12-digit UPI Reference / UTR Number.');
      return;
    }

    if (!isValidUtr(cleanUtr)) {
      setErrorMsg(
        'Please enter a valid 12-digit UPI Reference Number (UTR / RRN).'
      );
      return;
    }

    setIsVerifying(true);
    try {
      if (onConfirmUtr) {
        await onConfirmUtr(cleanUtr);
        setIsSuccess(true);
      } else if (onVerified) {
        const result = await onVerified(cleanUtr);
        if (result.success) {
          setIsSuccess(true);
        } else {
          setErrorMsg(result.message || 'Payment verification could not be completed.');
        }
      } else {
        setIsSuccess(true);
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Verification failed. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-fade-in text-left">
      <div className="relative w-full max-w-md bg-[#131715] border border-[#2b3930] rounded-3xl p-6 sm:p-7 text-white shadow-2xl overflow-hidden my-8">
        
        {/* Top subtle emerald lighting */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

        {/* Header & Close */}
        <div className="flex items-start justify-between pb-3.5 border-b border-[#222e26]">
          <div>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DIRECT UPI PAYMENT</span>
            </div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            {effectiveSubtitle && (
              <p className="text-xs text-gray-400 mt-0.5">{effectiveSubtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isVerifying}
            className="w-8 h-8 rounded-full bg-[#1b241e] hover:bg-[#25322a] border border-[#2e3e33] flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-white">Payment Recorded!</h4>
              <p className="text-xs text-gray-300 mt-1">
                Your transaction has been verified. Ref ID: <strong className="font-mono text-emerald-400">{utrNumber}</strong>
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#09150d] font-bold text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Continue
            </button>
          </div>
        ) : (
          <div className="mt-4 space-y-4">
            
            {/* Amount Banner */}
            <div className="p-3.5 rounded-2xl bg-[#0f1411] border border-[#222e26] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400">
                  Payable Amount
                </span>
                <div className="text-2xl font-black text-emerald-400 font-mono tracking-tight">
                  ₹{amount.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-gray-400 block">Ref / Order</span>
                <span className="text-xs font-mono font-bold text-gray-300">{referenceId}</span>
              </div>
            </div>

            {/* Dynamic QR Display */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white border border-gray-200 shadow-inner">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt="Dynamic UPI QR Code"
                  className="w-44 h-44 object-contain rounded-lg"
                />
              ) : (
                <div className="w-44 h-44 flex items-center justify-center text-gray-400">
                  <Loader2 className="w-8 h-8 animate-spin text-emerald-600" />
                </div>
              )}
              <div className="mt-2 text-center">
                <span className="text-[11px] font-bold text-gray-900 block">
                  Scan with any UPI App
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  GPay • PhonePe • Paytm • BHIM • Cred
                </span>
              </div>
            </div>

            {/* 1-Tap Mobile UPI Intent Button */}
            {upiUri && (
              <a
                href={upiUri}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#09150d] text-xs font-bold uppercase tracking-wider shadow-lg transition active:scale-[0.98]"
              >
                <Smartphone className="w-4 h-4" />
                <span>Pay via UPI App (Mobile)</span>
              </a>
            )}

            {/* Copyable UPI ID Box */}
            <div className="p-2.5 rounded-xl bg-[#0e1310] border border-[#1f2a22] flex items-center justify-between text-xs">
              <div className="truncate mr-2">
                <span className="text-[10px] text-gray-500 font-mono block">Pay to VPA:</span>
                <span className="font-mono font-semibold text-gray-200 truncate">{activeUpiId}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyUpi}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#1a231d] hover:bg-[#253229] border border-[#2b3a30] text-[11px] text-gray-300 transition shrink-0 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* UTR Submission Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-gray-300 block mb-1">
                  Step 2: Enter 12-Digit UPI Reference (UTR)
                </label>
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value.replace(/\s+/g, ''))}
                  placeholder="e.g. 429182910482"
                  maxLength={24}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1310] border border-[#2b3930] text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <span className="text-[10px] text-gray-500 mt-1 block">
                  Found in your GPay / PhonePe / Paytm transaction receipt as 'UPI Ref No.' or 'UTR'.
                </span>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || !utrNumber.trim()}
                className="w-full py-3 rounded-xl bg-[#1b251f] hover:bg-[#233128] border border-emerald-500/40 text-emerald-400 hover:text-emerald-300 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>Verifying Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Submit &amp; Confirm Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

          </div>
        )}

      </div>
    </div>
  );
}
