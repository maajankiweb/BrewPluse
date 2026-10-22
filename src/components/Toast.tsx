'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: ToastItem[];
  show: (type: ToastType, title: string, options?: { description?: string; duration?: number }) => void;
  success: (title: string, options?: { description?: string; duration?: number }) => void;
  error: (title: string, options?: { description?: string; duration?: number }) => void;
  warning: (title: string, options?: { description?: string; duration?: number }) => void;
  info: (title: string, options?: { description?: string; duration?: number }) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

let globalToast: ToastContextType | null = null;

export const toast = {
  success: (title: string, options?: { description?: string; duration?: number }) =>
    globalToast?.success(title, options),
  error: (title: string, options?: { description?: string; duration?: number }) =>
    globalToast?.error(title, options),
  warning: (title: string, options?: { description?: string; duration?: number }) =>
    globalToast?.warning(title, options),
  info: (title: string, options?: { description?: string; duration?: number }) =>
    globalToast?.info(title, options),
  show: (type: ToastType, title: string, options?: { description?: string; duration?: number }) =>
    globalToast?.show(type, title, options),
  dismiss: (id: string) => globalToast?.dismiss(id),
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (type: ToastType, title: string, options?: { description?: string; duration?: number }) => {
      const id = Math.random().toString(36).substring(2, 9);
      const duration = options?.duration ?? (type === 'error' ? 5500 : 3500);
      const newItem: ToastItem = {
        id,
        type,
        title,
        description: options?.description,
        duration,
      };

      setToasts((prev) => [...prev.slice(-4), newItem]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }
    },
    [dismiss]
  );

  const success = useCallback(
    (title: string, options?: { description?: string; duration?: number }) =>
      show('success', title, options),
    [show]
  );

  const error = useCallback(
    (title: string, options?: { description?: string; duration?: number }) =>
      show('error', title, options),
    [show]
  );

  const warning = useCallback(
    (title: string, options?: { description?: string; duration?: number }) =>
      show('warning', title, options),
    [show]
  );

  const info = useCallback(
    (title: string, options?: { description?: string; duration?: number }) =>
      show('info', title, options),
    [show]
  );

  const contextValue: ToastContextType = {
    toasts,
    show,
    success,
    error,
    warning,
    info,
    dismiss,
  };

  useEffect(() => {
    globalToast = contextValue;
  }, [contextValue]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {/* Toast container */}
      <div className="fixed top-5 right-5 z-[99999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((item) => (
          <div
            key={item.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border shadow-xl backdrop-blur-xl animate-fade-in transition-all ${
              item.type === 'success'
                ? 'bg-[#181614]/95 border-[#875200]/40 text-white shadow-[#875200]/10'
                : item.type === 'error'
                ? 'bg-[#181614]/95 border-red-500/40 text-white shadow-red-500/10'
                : item.type === 'warning'
                ? 'bg-[#181614]/95 border-amber-500/40 text-white shadow-amber-500/10'
                : 'bg-[#181614]/95 border-white/20 text-white'
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {item.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {item.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
              {item.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
              {item.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm font-bold text-white">{item.title}</div>
              {item.description && (
                <div className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
                  {item.description}
                </div>
              )}
            </div>
            <button
              onClick={() => dismiss(item.id)}
              className="text-neutral-500 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return toast;
  }
  return ctx;
}

export default useToast;
