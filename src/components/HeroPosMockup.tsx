'use client';

import React, { useState } from 'react';

export default function HeroPosMockup() {
  const [activeTab, setActiveTab] = useState<'all' | 'dine-in' | 'takeaway'>('all');

  const orders = [
    { id: '#BP-8941', table: 'T-04', customer: 'Rohan Sharma', items: 'Cortado & Almond Croissant', type: 'Dine-in', amount: '₹480', status: 'Settled', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200', time: 'Just now' },
    { id: '#BP-8940', table: 'T-02', customer: 'Priya Nair', items: 'Nitro Cold Brew & Sourdough Toast', type: 'Dine-in', amount: '₹620', status: 'KDS Prep', statusColor: 'bg-amber-100 text-amber-800 border-amber-200', time: '3 min ago' },
    { id: '#BP-8939', table: 'Counter', customer: 'Aarav Patel', items: 'Single Origin Flat White (Oat)', type: 'Takeaway', amount: '₹290', status: 'Ready', statusColor: 'bg-blue-100 text-blue-800 border-blue-200', time: '6 min ago' },
    { id: '#BP-8938', table: 'Delivery', customer: 'Neha Kapoor', items: 'Pour Over Guji & Walnut Cake', type: 'Takeaway', amount: '₹540', status: 'Settled', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200', time: '11 min ago' },
  ];

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter((o) => o.type.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="relative w-full rounded-2xl md:rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-[#181d1a] to-[#0f1311] border border-[#2b3530] shadow-2xl overflow-hidden text-left">
      {/* Top subtle lighting highlight */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />

      {/* Main Terminal Shell */}
      <div className="w-full rounded-xl md:rounded-2xl border border-[#26312a] bg-[#121614] overflow-hidden flex flex-col md:flex-row shadow-inner">
        
        {/* Left Dark Sidebar Navigation */}
        <aside className="w-44 bg-[#0c0f0d] text-gray-300 p-3.5 hidden md:flex flex-col justify-between shrink-0 border-r border-[#1e2722]">
          <div>
            <div className="flex items-center gap-2 px-1 py-1 mb-4">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                BP
              </span>
              <span className="font-extrabold text-sm tracking-tight text-white">
                Brew<span className="text-emerald-400">Pluse</span>
                <span className="text-[9px] font-mono ml-1 px-1 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-normal">v3.2</span>
              </span>
            </div>

            <nav className="space-y-1 text-xs font-medium">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-400 font-semibold border border-emerald-500/20">
                <span className="material-symbols-outlined text-[15px]">point_of_sale</span> Live Counter
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-default">
                <span className="material-symbols-outlined text-[15px]">table_bar</span> Floor &amp; Tables
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-default">
                <span className="material-symbols-outlined text-[15px]">soup_kitchen</span> KDS Queue
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-default">
                <span className="material-symbols-outlined text-[15px]">qr_code_scanner</span> Dynamic QR
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-default">
                <span className="material-symbols-outlined text-[15px]">receipt_long</span> Orders Ledger
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-default">
                <span className="material-symbols-outlined text-[15px]">query_stats</span> Sales &amp; Cohorts
              </div>
            </nav>
          </div>

          <div className="pt-3 border-t border-[#1e2722] text-[10px] text-gray-500 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Soundbox Online
            </span>
            <span className="font-mono text-gray-600">8ms</span>
          </div>
        </aside>

        {/* Right Dashboard Workspace */}
        <div className="flex-1 p-3.5 sm:p-5 bg-[#141816] flex flex-col justify-between overflow-hidden">
          
          {/* Top terminal bar */}
          <div className="flex items-center justify-between pb-3 border-b border-[#222a25]">
            <div>
              <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <span>The Roast Room • Indiranagar</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  POS #01 Active
                </span>
              </div>
              <div className="text-[11px] text-gray-400 mt-0.5">
                Real-time synchronized floor • Offline-ready terminal
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-[#1a211d] border border-[#2b3530] text-[11px] font-mono text-gray-300">
                Shift: Morning Rush ▼
              </span>
            </div>
          </div>

          {/* 4 Metric cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3">
            <div className="p-2.5 rounded-xl bg-[#18201b] border border-[#26312a]">
              <div className="text-[10px] font-mono text-gray-400">Today's Revenue</div>
              <div className="text-base font-bold text-white mt-0.5">₹38,420</div>
              <div className="text-[9px] font-mono text-emerald-400 font-semibold mt-0.5">▲ +18.4% vs avg</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#18201b] border border-[#26312a]">
              <div className="text-[10px] font-mono text-gray-400">Table Turn Time</div>
              <div className="text-base font-bold text-white mt-0.5">28 min</div>
              <div className="text-[9px] font-mono text-emerald-400 font-semibold mt-0.5">▼ 6m faster with QR</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#18201b] border border-[#26312a]">
              <div className="text-[10px] font-mono text-gray-400">Active Tables</div>
              <div className="text-base font-bold text-white mt-0.5">14 / 18</div>
              <div className="text-[9px] font-mono text-gray-400 mt-0.5">78% floor capacity</div>
            </div>

            <div className="p-2.5 rounded-xl bg-[#18201b] border border-[#26312a]">
              <div className="text-[10px] font-mono text-gray-400">UPI Soundbox</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">100% Instant</div>
              <div className="text-[9px] font-mono text-emerald-400 mt-0.5">Zero missed alerts</div>
            </div>
          </div>

          {/* Live Orders + Kitchen Activity */}
          <div className="grid grid-cols-12 gap-3 mt-1">
            
            {/* Live orders table */}
            <div className="col-span-12 md:col-span-7 p-3 rounded-xl bg-[#18201b] border border-[#26312a]">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#242e28]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white">Live Orders Feed</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="flex gap-1 text-[10px]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('all')}
                    className={`px-2 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                      activeTab === 'all' ? 'bg-emerald-500 text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('dine-in')}
                    className={`px-2 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                      activeTab === 'dine-in' ? 'bg-emerald-500 text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Dine-in
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('takeaway')}
                    className={`px-2 py-0.5 rounded font-medium cursor-pointer transition-colors ${
                      activeTab === 'takeaway' ? 'bg-emerald-500 text-white font-bold' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Takeaway
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-[11px]">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-1.5 rounded-lg bg-[#131715] hover:bg-[#1f2923] border border-[#202923] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-emerald-400 font-bold">{order.table}</span>
                      <span className="font-mono text-[10px] text-gray-500">{order.id}</span>
                      <span className="font-medium text-gray-200 hidden sm:inline">{order.customer}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 truncate max-w-[140px] hidden lg:inline">
                      {order.items}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold font-mono text-white">{order.amount}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Kitchen & Floor status */}
            <div className="col-span-12 md:col-span-5 p-3 rounded-xl bg-[#18201b] border border-[#26312a] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#242e28]">
                  <span className="text-xs font-bold text-white">Barista KDS Pipeline</span>
                  <span className="text-[10px] font-mono text-emerald-400">Peak Throttle</span>
                </div>

                <div className="space-y-2 mt-2.5">
                  <div className="p-2 rounded-lg bg-[#131715] border border-[#222c25]">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-amber-400 font-bold">Ticket #904 • Barista Station</span>
                      <span className="font-mono text-gray-400">2m prep</span>
                    </div>
                    <div className="text-xs font-semibold text-gray-200 mt-1">2x Oat Cortado (Double Ristretto)</div>
                  </div>
                  <div className="p-2 rounded-lg bg-[#131715] border border-[#222c25]">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-emerald-400 font-bold">Ticket #902 • Hot Kitchen</span>
                      <span className="font-mono text-gray-400">Ready</span>
                    </div>
                    <div className="text-xs font-semibold text-gray-200 mt-1">Avocado Truffle Brioche Toast</div>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 mt-2 border-t border-[#242e28] flex items-center justify-between text-[10px] font-mono text-gray-400">
                <span>Avg Ticket Speed: <strong className="text-white">4.2 min</strong></span>
                <span className="text-emerald-400 font-semibold">99.8% Accuracy</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Smart Badges showcasing BrewPluse Unique Tech */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {/* Badge 1: Audio Soundbox */}
        <div className="bg-[#151c17] px-3 py-2 rounded-xl border border-emerald-500/20 shadow-md flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <span className="material-symbols-outlined text-[18px]">volume_up</span>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">Instant UPI Soundbox Sync</div>
            <div className="text-[10px] text-gray-400">Audible confirmation on every QR payment</div>
          </div>
        </div>

        {/* Badge 2: Dual QR */}
        <div className="bg-[#151c17] px-3 py-2 rounded-xl border border-emerald-500/20 shadow-md flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <span className="material-symbols-outlined text-[18px]">qr_code_2</span>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">Dynamic Table Split &amp; Tip</div>
            <div className="text-[10px] text-gray-400">Guests order &amp; pay per table in seconds</div>
          </div>
        </div>

        {/* Badge 3: Zero Outage */}
        <div className="bg-[#151c17] px-3 py-2 rounded-xl border border-emerald-500/20 shadow-md flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <span className="material-symbols-outlined text-[18px]">wifi_off</span>
          </div>
          <div>
            <div className="text-[11px] font-bold text-white">Offline Write-Ahead Logging</div>
            <div className="text-[10px] text-gray-400">Keeps printing tickets even when Wi-Fi drops</div>
          </div>
        </div>
      </div>

    </div>
  );
}
