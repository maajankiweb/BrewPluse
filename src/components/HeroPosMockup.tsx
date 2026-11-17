'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HeroPosMockup() {
  const [filter, setFilter] = useState<'all' | 'qr' | 'pos'>('all');

  const orders = [
    {
      id: '#BP1289',
      source: 'Table 4 (2 Items)',
      type: 'QR Dine-in',
      amount: '₹420',
      status: 'Paid',
      statusBg: 'bg-[#002D23]/10 text-[#002D23]',
      time: 'Just now',
      tag: 'qr',
    },
    {
      id: '#BP1288',
      source: 'Counter Takeaway',
      type: 'POS Billing',
      amount: '₹260',
      status: 'Preparing',
      statusBg: 'bg-[#B99A5B]/20 text-[#B99A5B]',
      time: '3m ago',
      tag: 'pos',
    },
    {
      id: '#BP1287',
      source: 'Table 7 (4 Items)',
      type: 'Waiter POS',
      amount: '₹890',
      status: 'Delivered',
      statusBg: 'bg-[#002D23]/10 text-[#002D23]',
      time: '6m ago',
      tag: 'pos',
    },
  ];

  const filteredOrders = filter === 'all' ? orders : orders.filter(o => o.tag === filter);

  return (
    <div className="relative w-full rounded-2xl md:rounded-3xl p-3 sm:p-4 bg-[#FFFEFA]/90 border border-[#DDE3DD] shadow-xl backdrop-blur-md overflow-hidden">
      {/* Tablet Shell */}
      <div className="w-full rounded-xl border border-[#DDE3DD] bg-[#FFFEFA] overflow-hidden flex flex-col md:flex-row shadow-xs">
        
        {/* Dark mini-sidebar */}
        <aside className="w-40 bg-[#001F19] text-white p-3 hidden md:flex flex-col justify-between shrink-0 text-left">
          <div>
            <div className="flex items-center gap-2 px-1 py-1.5 mb-3">
              <div className="w-5 h-5 rounded bg-[#002D23] border border-[#B99A5B]/30 flex items-center justify-center p-0.5">
                <span className="text-[10px] font-bold text-[#B99A5B]">BP</span>
              </div>
              <span className="text-xs font-bold text-white tracking-tight">
                Brew<span className="text-[#B99A5B]">Pluse</span>
              </span>
            </div>

            <nav className="space-y-0.5 text-[11px] font-medium text-gray-300">
              <div className="flex items-center gap-2 px-2 py-1 rounded-[6px] bg-[#002D23] border border-[#B99A5B]/30 text-white font-semibold cursor-default">
                <span className="material-symbols-outlined text-[14px] text-[#B99A5B]">dashboard</span>
                <span>Dashboard</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default text-gray-400">
                <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                <span>Orders</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default text-gray-400">
                <span className="material-symbols-outlined text-[14px]">restaurant_menu</span>
                <span>Menu</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default text-gray-400">
                <span className="material-symbols-outlined text-[14px]">qr_code_2</span>
                <span>QR Menu</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default text-gray-400">
                <span className="material-symbols-outlined text-[14px]">skillet</span>
                <span>KDS Kitchen</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default text-gray-400">
                <span className="material-symbols-outlined text-[14px]">group</span>
                <span>Customers</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default text-gray-400">
                <span className="material-symbols-outlined text-[14px]">bar_chart</span>
                <span>Analytics</span>
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default text-gray-400">
                <span className="material-symbols-outlined text-[14px]">settings</span>
                <span>Settings</span>
              </div>
            </nav>
          </div>

          <div className="pt-2 border-t border-white/10 text-[9px] text-gray-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Sync
            </span>
            <span className="font-mono text-gray-400">₹0/mo</span>
          </div>
        </aside>

        {/* Dashboard Workspace */}
        <div className="flex-1 p-3.5 sm:p-4 bg-[#F7F5EC] flex flex-col justify-between overflow-hidden">
          
          {/* Top greeting bar */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#DDE3DD]">
            <div className="text-left">
              <div className="text-xs font-bold text-[#0B1714] flex items-center gap-1">
                Good morning, Operator
              </div>
              <div className="text-[10px] text-[#64736D]">
                Live operational stream across orders &amp; kitchen
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-[#FFFEFA] border border-[#DDE3DD] text-[10px] font-mono font-medium text-[#002D23]">
                ₹0/mo Active
              </span>
              <div className="w-5 h-5 rounded-full bg-[#002D23] text-white flex items-center justify-center text-[9px] font-bold">
                BP
              </div>
            </div>
          </div>

          {/* 4 Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2.5 text-left">
            <div className="p-2 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD]">
              <div className="text-[9px] font-mono text-[#64736D]">Total Orders</div>
              <div className="text-sm font-bold text-[#0B1714]">128</div>
              <div className="text-[8px] font-mono text-[#002D23] font-semibold">▲ Today</div>
            </div>
            <div className="p-2 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD]">
              <div className="text-[9px] font-mono text-[#64736D]">Net Revenue</div>
              <div className="text-sm font-bold text-[#0B1714]">₹24,860</div>
              <div className="text-[8px] font-mono text-[#002D23] font-semibold">100% yours</div>
            </div>
            <div className="p-2 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD]">
              <div className="text-[9px] font-mono text-[#64736D]">Active Tables</div>
              <div className="text-sm font-bold text-[#0B1714]">14/18</div>
              <div className="text-[8px] font-mono text-[#002D23] font-semibold">Table QR Active</div>
            </div>
            <div className="p-2 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD]">
              <div className="text-[9px] font-mono text-[#64736D]">KDS In Prep</div>
              <div className="text-sm font-bold text-[#0B1714]">6</div>
              <div className="text-[8px] font-mono text-[#B99A5B] font-semibold">8m avg prep ⏳</div>
            </div>
          </div>

          {/* Live Order Flow */}
          <div className="p-2.5 rounded-2xl bg-[#FFFEFA] border border-[#DDE3DD] text-left">
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#DDE3DD]/60">
              <span className="text-[11px] font-bold text-[#0B1714]">Live Order Flow</span>
              <div className="flex gap-1 text-[9px]">
                <button
                  type="button"
                  onClick={() => setFilter('all')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    filter === 'all'
                      ? 'bg-[#002D23] text-white font-semibold'
                      : 'text-[#64736D] hover:bg-[#F7F5EC]'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('qr')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    filter === 'qr'
                      ? 'bg-[#002D23] text-white font-semibold'
                      : 'text-[#64736D] hover:bg-[#F7F5EC]'
                  }`}
                >
                  Table QR
                </button>
                <button
                  type="button"
                  onClick={() => setFilter('pos')}
                  className={`px-1.5 py-0.5 rounded transition-colors ${
                    filter === 'pos'
                      ? 'bg-[#002D23] text-white font-semibold'
                      : 'text-[#64736D] hover:bg-[#F7F5EC]'
                  }`}
                >
                  Counter POS
                </button>
              </div>
            </div>

            <div className="space-y-1 text-[10px]">
              {filteredOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between p-1 rounded bg-[#F7F5EC] hover:bg-stone-200/60 transition-colors"
                >
                  <span className="font-mono font-bold text-[#0B1714]">{o.id}</span>
                  <span className="font-medium text-[#64736D]">{o.source}</span>
                  <span className="text-[#64736D] text-[9px]">{o.type}</span>
                  <span className="font-bold text-[#0B1714]">{o.amount}</span>
                  <span className={`px-1 py-0.5 rounded font-mono text-[8px] font-bold ${o.statusBg}`}>
                    {o.status}
                  </span>
                  <span className="text-[#64736D] text-[8px]">{o.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Floating QR Menu Mobile Phone Preview */}
      <div className="hidden sm:block absolute bottom-2.5 left-4 z-20 w-48 bg-[#FFFEFA] rounded-[24px] p-2 border-4 border-[#001F19] shadow-2xl text-left">
        <div className="w-12 h-2.5 bg-[#001F19] rounded-full mx-auto mb-1.5" />
        <div className="rounded-xl bg-[#F7F5EC] p-2 border border-[#DDE3DD]">
          <div className="rounded-lg bg-gradient-to-r from-[#002D23] to-[#001F19] text-[#FFFEFA] p-2 mb-2 text-center shadow-xs">
            <div className="text-[9px] font-bold">BrewPluse QR Menu</div>
            <div className="text-[8px] text-[#B99A5B]">Instant mobile order</div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between p-1 bg-[#FFFEFA] rounded border border-[#DDE3DD]">
              <span className="text-[8px] font-bold text-[#0B1714]">Cappuccino</span>
              <span className="text-[8px] font-bold text-[#002D23]">₹120</span>
            </div>
            <div className="flex items-center justify-between p-1 bg-[#FFFEFA] rounded border border-[#DDE3DD]">
              <span className="text-[8px] font-bold text-[#0B1714]">Croissant</span>
              <span className="text-[8px] font-bold text-[#002D23]">₹90</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge 1: Cafe Owner Cost */}
      <div className="hidden lg:flex absolute bottom-3 left-56 z-20 bg-[#FFFEFA]/95 backdrop-blur-md px-3 py-2 rounded-[12px] border border-[#DDE3DD] shadow-lg items-center gap-2.5 text-left">
        <div className="w-7 h-7 rounded-[8px] bg-[#002D23]/10 flex items-center justify-center text-[#002D23] font-bold">
          <span className="material-symbols-outlined text-[16px]">verified</span>
        </div>
        <div>
          <div className="text-[9px] font-bold text-[#0B1714]">Cafe Owner Cost</div>
          <div className="text-xs font-bold text-[#002D23]">₹0/mo Forever</div>
          <div className="text-[8px] text-[#64736D]">Customer pays ₹1 fee</div>
        </div>
      </div>

      {/* Floating Badge 2: Kitchen Screen Synced */}
      <div className="hidden md:flex absolute bottom-3 right-4 z-20 bg-[#FFFEFA]/95 backdrop-blur-md px-3 py-2 rounded-[12px] border border-[#DDE3DD] shadow-lg items-center gap-2 text-left">
        <div className="w-7 h-7 rounded-[8px] bg-[#002D23]/10 flex items-center justify-center text-[#002D23]">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
        </div>
        <div>
          <div className="text-[9px] font-bold text-[#0B1714]">Kitchen Screen Synced</div>
          <div className="text-[8px] font-mono text-[#002D23] font-semibold">Zero lost paper tickets</div>
        </div>
      </div>
    </div>
  );
}
