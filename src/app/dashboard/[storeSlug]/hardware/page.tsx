'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { ShoppingBag, ChevronRight, Check } from 'lucide-react';
import {
  addToHardwareCart,
  getHardwareCartCount,
} from '@/lib/hardwareCart';
import HardwareOrdersModal from '@/components/hardware/HardwareOrdersModal';

export default function HardwarePage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [filter, setFilter] = useState<'all' | 'nfc' | 'qr'>('all');
  const [cartCount, setCartCount] = useState(0);
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);

  useEffect(() => {
    setCartCount(getHardwareCartCount(storeSlug));
    const handleUpdate = () => {
      setCartCount(getHardwareCartCount(storeSlug));
    };
    window.addEventListener('brewpluse-hardware-cart-update', handleUpdate);
    return () => window.removeEventListener('brewpluse-hardware-cart-update', handleUpdate);
  }, [storeSlug]);

  const handleAddToCart = (e: React.MouseEvent, productId: 'nfc-card' | 'qr-code-stand') => {
    e.preventDefault();
    e.stopPropagation();
    addToHardwareCart({ id: productId, quantity: 1 }, storeSlug);
    setAddedItem(productId);
    setTimeout(() => {
      setAddedItem(null);
    }, 2000);
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="pb-8 max-w-6xl mx-auto space-y-3.5 sm:space-y-4 font-sans animate-in fade-in duration-300">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-1">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold text-[#12201B] dark:text-[#F2FAF6] tracking-tight">
                Hardware &amp; Store
              </h1>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] font-normal leading-relaxed">
              Official BrewPluse smart NFC cards, QR table stands, and hardware accessories.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap sm:shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setIsOrdersModalOpen(true)}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#E7ECE9] dark:border-[#1E382E] bg-white dark:bg-[#0E2018] hover:bg-[#F8FAF8] dark:hover:bg-[#142E25] text-[#12201B] dark:text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#0B5C45] dark:text-[#10B981]" />
                <span>View Orders</span>
              </button>
              <Link
                href={`/dashboard/${storeSlug}/hardware/cart`}
                className="relative h-8 px-3 rounded-lg bg-[#062F23] hover:bg-[#0B5C45] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#10B981]" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#10B981] text-[10px] font-bold text-white animate-in zoom-in duration-200">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="space-y-3.5 sm:space-y-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#062F23] text-white shadow-xs'
                  : 'bg-white dark:bg-[#0E2018] text-[#65736D] dark:text-[#9AB2A8] border border-[#E7ECE9] dark:border-[#1E382E] hover:bg-[#F8FAF8] hover:text-[#12201B]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('nfc')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                filter === 'nfc'
                  ? 'bg-[#062F23] text-white shadow-xs'
                  : 'bg-white dark:bg-[#0E2018] text-[#65736D] dark:text-[#9AB2A8] border border-[#E7ECE9] dark:border-[#1E382E] hover:bg-[#F8FAF8] hover:text-[#12201B]'
              }`}
            >
              NFC Cards
            </button>
            <button
              onClick={() => setFilter('qr')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                filter === 'qr'
                  ? 'bg-[#062F23] text-white shadow-xs'
                  : 'bg-white dark:bg-[#0E2018] text-[#65736D] dark:text-[#9AB2A8] border border-[#E7ECE9] dark:border-[#1E382E] hover:bg-[#F8FAF8] hover:text-[#12201B]'
              }`}
            >
              QR Codes
            </button>
          </div>

          {/* Product Items */}
          <div className="space-y-4">
            {(filter === 'all' || filter === 'nfc') && (
              <Link
                href={`/dashboard/${storeSlug}/hardware/nfc-card`}
                className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 transition-all duration-200 hover:shadow-md hover:border-neutral-300 dark:hover:border-zinc-700 cursor-pointer group text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  <div className="w-full sm:w-[130px] md:w-[140px] h-[130px] md:h-[140px] rounded-xl overflow-hidden bg-neutral-50 dark:bg-zinc-800/80 shrink-0 border border-neutral-100 dark:border-zinc-800 relative">
                    <Image
                      src="/hardware-images/NFC-img.png"
                      alt="NFC Card"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        NFC Card
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                        Tap, connect, explore. Share your menu, reviews, and social profiles with just a tap.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-zinc-700">
                        NFC
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-zinc-700">
                        Contactless
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-zinc-800">
                  <div className="text-left sm:text-right">
                    <span className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                      ₹1,500.00
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, 'nfc-card')}
                      className={`h-9 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer ${
                        addedItem === 'nfc-card'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#F6C358] hover:bg-[#EAA827] active:scale-[0.98] text-neutral-950'
                      }`}
                    >
                      {addedItem === 'nfc-card' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Added ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-neutral-900" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                    <div className="text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {(filter === 'all' || filter === 'qr') && (
              <Link
                href={`/dashboard/${storeSlug}/hardware/qr-code-stand`}
                className="bg-white dark:bg-zinc-900 border border-neutral-200/80 dark:border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 sm:gap-6 transition-all duration-200 hover:shadow-md hover:border-neutral-300 dark:hover:border-zinc-700 cursor-pointer group text-left"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 flex-1 min-w-0">
                  <div className="w-full sm:w-[130px] md:w-[140px] h-[130px] md:h-[140px] rounded-xl overflow-hidden bg-neutral-50 dark:bg-zinc-800/80 shrink-0 border border-neutral-100 dark:border-zinc-800 relative">
                    <Image
                      src="/hardware-images/QR-img.png"
                      alt="QR Standee"
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        QR Standee
                      </h2>
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                        Stylish and durable QR standee for easy contactless table ordering.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-zinc-700">
                        QR Code
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-neutral-100 dark:bg-zinc-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-zinc-700">
                        Table Ordering
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-100 dark:border-zinc-800">
                  <div className="text-left sm:text-right">
                    <span className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
                      ₹1,500.00
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => handleAddToCart(e, 'qr-code-stand')}
                      className={`h-9 px-4 rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer ${
                        addedItem === 'qr-code-stand'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#F6C358] hover:bg-[#EAA827] active:scale-[0.98] text-neutral-950'
                      }`}
                    >
                      {addedItem === 'qr-code-stand' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>Added ✓</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-neutral-900" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                    <div className="text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 group-hover:translate-x-0.5 transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Hardware Orders Modal */}
      <HardwareOrdersModal
        isOpen={isOrdersModalOpen}
        onClose={() => setIsOrdersModalOpen(false)}
        storeSlug={storeSlug}
      />
    </DashboardShell>
  );
}
