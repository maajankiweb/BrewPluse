'use client';

import React, { useState } from 'react';

export default function HeroPosMockup() {
  const [activeTab, setActiveTab] = useState<'all' | 'dine-in' | 'takeaway'>('all');

  const orders = [
    { id: '#BP1289', name: 'Emma Watson', type: 'Dine-in', amount: '₹1,250', status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-800', time: '2 min ago' },
    { id: '#BP1287', name: 'James Smith', type: 'Takeaway', amount: '₹450', status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-800', time: '5 min ago' },
    { id: '#BP1284', name: 'Olivia Brown', type: 'Delivery', amount: '₹1,480', status: 'Preparing', statusColor: 'bg-amber-100 text-amber-800', time: '7 min ago' },
    { id: '#BP1278', name: 'William Jones', type: 'Dine-in', amount: '₹750', status: 'Paid', statusColor: 'bg-emerald-100 text-emerald-800', time: '10 min ago' },
  ];

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter((o) => o.type.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="relative w-full rounded-2xl md:rounded-3xl p-3 sm:p-4 bg-white/80 border border-[#E7E5E0] shadow-xl backdrop-blur-md overflow-hidden">
      {/* Tablet Screen */}
      <div className="w-full rounded-xl border border-[#EBE8E3] bg-[#FCFCFA] overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Dark Sidebar */}
        <aside className="w-40 bg-[#161a18] text-white p-3 hidden md:flex flex-col justify-between shrink-0 text-left">
          <div>
            <div className="flex items-center gap-2 px-1 py-1.5 mb-3">
              <span className="w-5 h-5 rounded bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">local_cafe</span>
              </span>
              <span className="font-extrabold text-xs tracking-tight text-white">
                Brew<span className="text-emerald-400">Pluse</span>
              </span>
            </div>

            <nav className="space-y-0.5 text-[11px] font-medium text-gray-300">
              <div className="flex items-center gap-2 px-2 py-1 rounded bg-emerald-600/20 text-emerald-400 font-semibold cursor-default">
                <span className="material-symbols-outlined text-[14px]">dashboard</span> Dashboard
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default">
                <span className="material-symbols-outlined text-[14px]">receipt_long</span> Orders
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default">
                <span className="material-symbols-outlined text-[14px]">restaurant_menu</span> Menu
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default">
                <span className="material-symbols-outlined text-[14px]">qr_code_2</span> QR Menu
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default">
                <span className="material-symbols-outlined text-[14px]">group</span> Customers
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default">
                <span className="material-symbols-outlined text-[14px]">bar_chart</span> Analytics
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default">
                <span className="material-symbols-outlined text-[14px]">military_tech</span> Loyalty
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default">
                <span className="material-symbols-outlined text-[14px]">receipt_long</span> Billing &amp; Usage
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default">
                <span className="material-symbols-outlined text-[14px]">two_wheeler</span> Delivery
              </div>
              <div className="flex items-center gap-2 px-2 py-1 rounded hover:text-white cursor-default">
                <span className="material-symbols-outlined text-[14px]">settings</span> Settings
              </div>
            </nav>
          </div>
        </aside>

        {/* Right Dashboard Main Area */}
        <div className="flex-1 p-3.5 sm:p-4 bg-[#FBFBFA] flex flex-col justify-between overflow-hidden">
          
          {/* Top greeting bar */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#EBE8E3]">
            <div className="text-left">
              <div className="text-xs font-bold text-[#1a1715] flex items-center gap-1">
                Good morning, Alex
              </div>
              <div className="text-[10px] text-gray-500">
                Here&apos;s what&apos;s happening in your cafe today
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-md bg-white border border-[#EBE8E3] text-[10px] font-mono font-medium text-gray-700">
                Cafe Coffee Day ▼
              </span>
              <div className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] font-bold">
                A
              </div>
            </div>
          </div>

          {/* 4 Metric cards */}
          <div className="grid grid-cols-4 gap-2 my-2.5 text-left">
            <div className="p-2 rounded-lg bg-white border border-[#EBE8E3]">
              <div className="text-[9px] font-mono text-gray-500">Total Orders</div>
              <div className="text-sm font-bold text-[#1a1715]">128</div>
              <div className="text-[8px] font-mono text-emerald-600 font-semibold">▲ 16% vs yesterday</div>
            </div>

            <div className="p-2 rounded-lg bg-white border border-[#EBE8E3]">
              <div className="text-[9px] font-mono text-gray-500">Revenue</div>
              <div className="text-sm font-bold text-[#1a1715]">₹24,860</div>
              <div className="text-[8px] font-mono text-emerald-600 font-semibold">▲ 21% vs yesterday</div>
            </div>

            <div className="p-2 rounded-lg bg-white border border-[#EBE8E3]">
              <div className="text-[9px] font-mono text-gray-500">New Customers</div>
              <div className="text-sm font-bold text-[#1a1715]">36</div>
              <div className="text-[8px] font-mono text-emerald-600 font-semibold">▲ 12% vs yesterday</div>
            </div>

            <div className="p-2 rounded-lg bg-white border border-[#EBE8E3]">
              <div className="text-[9px] font-mono text-gray-500">Pending Orders</div>
              <div className="text-sm font-bold text-[#1a1715]">8</div>
              <div className="text-[8px] font-mono text-amber-600 font-semibold">15m avg ⏳</div>
            </div>
          </div>

          {/* Live Orders + Sales Overview chart */}
          <div className="grid grid-cols-12 gap-2.5 mt-1 text-left">
            
            {/* Live orders widget */}
            <div className="col-span-12 md:col-span-7 p-2.5 rounded-xl bg-white border border-[#EBE8E3]">
              <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-gray-100">
                <span className="text-[11px] font-bold text-[#1a1715]">Live Orders</span>
                <div className="flex gap-1 text-[9px]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('all')}
                    className={`px-1.5 py-0.2 rounded font-semibold cursor-pointer ${
                      activeTab === 'all' ? 'bg-black text-white' : 'text-gray-500'
                    }`}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('dine-in')}
                    className={`px-1.5 py-0.2 rounded font-semibold cursor-pointer ${
                      activeTab === 'dine-in' ? 'bg-black text-white' : 'text-gray-500'
                    }`}
                  >
                    Dine-in
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('takeaway')}
                    className={`px-1.5 py-0.2 rounded font-semibold cursor-pointer ${
                      activeTab === 'takeaway' ? 'bg-black text-white' : 'text-gray-500'
                    }`}
                  >
                    Takeaway
                  </button>
                </div>
              </div>

              <div className="space-y-1 text-[10px]">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-1 rounded hover:bg-[#F8F7F4] transition-colors"
                  >
                    <span className="font-mono font-bold text-gray-800">{order.id}</span>
                    <span className="font-medium text-gray-700">{order.name}</span>
                    <span className="text-gray-500 text-[9px]">{order.type}</span>
                    <span className="font-bold">{order.amount}</span>
                    <span className={`px-1 py-0.2 rounded font-mono text-[8px] font-bold ${order.statusColor}`}>
                      {order.status}
                    </span>
                    <span className="text-gray-400 text-[8px]">{order.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales Overview chart */}
            <div className="col-span-12 md:col-span-5 p-2.5 rounded-xl bg-white border border-[#EBE8E3] flex flex-col justify-between">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold text-[#1a1715]">Sales Overview</span>
                <span className="text-[9px] font-mono text-gray-500">This Week ▼</span>
              </div>

              <div className="relative w-full h-24 my-1 flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 160 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="heroChartFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  <path d="M0,45 Q25,40 45,30 T90,25 T130,18 T160,8 L160,60 L0,60 Z" fill="url(#heroChartFill)" />
                  <path d="M0,45 Q25,40 45,30 T90,25 T130,18 T160,8" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="160" cy="8" r="3.5" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                </svg>
                <div className="absolute top-0 right-0 bg-emerald-700 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                  ₹24,860
                </div>
              </div>

              <div className="flex justify-between font-mono text-[8px] text-gray-400 pt-1 border-t border-gray-100">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span className="text-emerald-700 font-bold">Sun</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Smartphone Mockup (Bottom Left) */}
      <div className="hidden sm:block absolute bottom-2.5 left-4 z-20 w-48 bg-white rounded-[24px] p-2 border-4 border-[#161a18] shadow-2xl text-left">
        <div className="w-12 h-2.5 bg-black rounded-full mx-auto mb-1.5" />
        <div className="rounded-xl bg-[#F8F7F4] p-2 border border-gray-200">
          <div className="rounded-lg bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-2 mb-2 text-center shadow-2xs">
            <div className="text-[9px] font-bold">Good coffee.</div>
            <div className="text-[8px] opacity-90">Great mood.</div>
            <span className="mt-1 inline-block px-1.5 py-0.2 rounded bg-white/20 text-[7px] font-bold uppercase">
              Order Now
            </span>
          </div>
          <div className="flex gap-1 font-mono text-[8px] mb-1.5">
            <span className="px-1.5 py-0.2 rounded bg-emerald-700 text-white font-bold">All</span>
            <span className="px-1.5 py-0.2 rounded bg-white text-gray-600">Coffee</span>
            <span className="px-1.5 py-0.2 rounded bg-white text-gray-600">Food</span>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between p-1 bg-white rounded border border-gray-100">
              <span className="text-[8px] font-bold text-gray-800">Cappuccino</span>
              <span className="text-[8px] font-bold text-emerald-800">+ Add</span>
            </div>
            <div className="flex items-center justify-between p-1 bg-white rounded border border-gray-100">
              <span className="text-[8px] font-bold text-gray-800">Croissant</span>
              <span className="text-[8px] font-bold text-emerald-800">+ Add</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Badge 1: Cafe-Faced Mode */}
      <div className="hidden lg:flex absolute bottom-3 left-56 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-emerald-200 shadow-lg items-center gap-2.5 text-left">
        <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
          <span className="material-symbols-outlined text-[16px]">store</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-gray-800">Cafe-Faced Mode</span>
            <span className="px-1 py-0.2 rounded bg-gray-100 text-gray-700 text-[7px] font-bold border border-gray-200">
              READY
            </span>
          </div>
          <div className="text-xs font-bold text-emerald-800">Fee Covered by Cafe</div>
          <div className="text-[8px] text-gray-400">₹0 fee for customer</div>
        </div>
      </div>

      {/* Floating Badge 2: Order Delivered */}
      <div className="hidden md:flex absolute bottom-3 left-1/2 translate-x-4 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-gray-200 shadow-lg items-center gap-2 text-left">
        <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
        </div>
        <div>
          <div className="text-[9px] font-bold text-[#1a1715]">Order Delivered</div>
          <div className="text-[8px] font-mono text-emerald-700 font-semibold">#CF1266</div>
          <div className="text-[8px] text-gray-500">Delivered in 24 min</div>
        </div>
      </div>

      {/* Floating Badge 3: Customer Facing */}
      <div className="hidden lg:flex absolute bottom-3 right-4 z-20 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl border border-gray-200 shadow-lg items-center gap-2.5 text-left">
        <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
          <span className="material-symbols-outlined text-[16px]">person</span>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-bold text-gray-800">Customer Facing: ON</span>
            <span className="px-1 py-0.2 rounded bg-emerald-600 text-white text-[7px] font-bold">ON</span>
          </div>
          <div className="text-[9px] font-bold text-emerald-800">+₹1 per order</div>
          <div className="text-[8px] text-gray-400">Paid by customer</div>
        </div>
      </div>

    </div>
  );
}
