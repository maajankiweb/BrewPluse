'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ExternalLink,
  ShoppingBag,
} from 'lucide-react';

interface HardwareOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeSlug: string;
}

export default function HardwareOrdersModal({
  isOpen,
  onClose,
  storeSlug,
}: HardwareOrdersModalProps) {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch(`/api/hardware/orders?storeSlug=${encodeURIComponent(storeSlug)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        }
      })
      .catch((err) => console.error('Failed to load hardware orders:', err))
      .finally(() => setLoading(false));
  }, [isOpen, storeSlug]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-100 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                Hardware Order History
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Track your NFC cards and QR table stand deliveries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {loading ? (
            <div className="py-12 text-center space-y-2">
              <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-neutral-500">Loading order records...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-neutral-100 dark:bg-zinc-800 text-neutral-400 flex items-center justify-center mx-auto">
                <Package className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">
                  No hardware orders yet
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                  When you order NFC cards or QR stands, your orders and dispatch tracking will appear here.
                </p>
              </div>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.orderNumber}
                className="p-4 sm:p-5 rounded-2xl border border-neutral-200/90 dark:border-zinc-800 bg-neutral-50/50 dark:bg-zinc-800/40 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-200/60 dark:border-zinc-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-neutral-900 dark:text-white">
                        {order.orderNumber}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {order.paymentStatus === 'paid' ? `Paid (${order.paymentMode || 'Direct UPI'})` : 'Pending'}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-sm sm:text-base font-extrabold text-neutral-900 dark:text-white">
                      ₹{Number(order.total || 0).toLocaleString('en-IN')}.00
                    </span>
                    <p className="text-[10px] text-neutral-500">Free Pan-India Delivery</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.items?.map((it: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-neutral-100 dark:bg-zinc-800 shrink-0 border border-neutral-200 dark:border-zinc-700">
                          <Image
                            src={it.image || (it.id === 'nfc-card' ? '/hardware-images/NFC-img.png' : '/hardware-images/QR-img.png')}
                            alt={it.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-900 dark:text-white">
                            {it.title}
                          </p>
                          <p className="text-[11px] text-neutral-500">
                            Qty: {it.quantity} &times; ₹{Number(it.price || 1500).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                      <span className="font-bold text-neutral-900 dark:text-white shrink-0">
                        ₹{(Number(it.quantity || 1) * Number(it.price || 1500)).toLocaleString('en-IN')}.00
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery & Tracking details */}
                <div className="pt-2 border-t border-neutral-200/60 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-neutral-600 dark:text-neutral-300">
                  <div className="flex items-start gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 block">
                        Estimated Delivery: {order.estimatedDelivery || '3-5 Business Days'}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        Tracking: {order.trackingNumber || 'Assigned upon dispatch'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div className="truncate">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 block truncate">
                        {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pincode}
                      </span>
                      <span className="text-[10px] text-neutral-500 block truncate">
                        {order.contactPerson} ({order.phone})
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-100 dark:border-zinc-800 bg-neutral-50 dark:bg-zinc-800/60 flex items-center justify-between text-xs">
          <span className="text-neutral-500 dark:text-neutral-400 text-[11px]">
            Need support? Email support@brewpluse.com
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-neutral-900 hover:bg-black dark:bg-white dark:hover:bg-neutral-200 text-white dark:text-neutral-950 font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
