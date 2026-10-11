'use client';

import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Sparkles,
  Plus,
  Shield,
  ArrowRight,
  QrCode,
  Table2,
} from 'lucide-react';



export default function TablesPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [newTableLabel, setNewTableLabel] = useState('');
  const [tables, setTables] = useState<string[]>([]);

  const handleAddTable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableLabel.trim()) return;
    setTables((prev) => [...prev, newTableLabel.trim()]);
    setNewTableLabel('');
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-4">
        {/* Hardware Promotional Banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#12201B] dark:text-white">
                  Get your BrewPluse QR Setup
                </h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white uppercase tracking-wider">
                  OFFICIAL HARDWARE
                </span>
              </div>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                Make it easier for customers to scan, tap, and connect with your cafe.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 self-start md:self-auto shrink-0 cursor-pointer"
          >
            <span>SHOP BREWPLUSE HARDWARE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visual Floor Planner Toolbar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#12201B] dark:text-white">
                Visual Floor Planner
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                {tables.length} TABLES
              </span>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Map dining layouts, manage locks on active tables, and download mobile-friendly QR codes
            </p>
          </div>

          <form onSubmit={handleAddTable} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Table number or label"
              value={newTableLabel}
              onChange={(e) => setNewTableLabel(e.target.value)}
              className="h-10 px-3.5 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-medium focus:outline-none focus:border-[#10B981] flex-1 md:w-56"
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>ADD TABLE</span>
            </button>
          </form>
        </div>

        {/* Tables Grid or Empty State */}
        {tables.length === 0 ? (
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-20 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-[#8D9792] flex items-center justify-center mx-auto">
              <Shield className="w-7 h-7" />
            </div>
            <p className="text-base font-bold text-[#12201B] dark:text-white">No tables placed</p>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-sm mx-auto">
              Add a table using the control panel above to begin floor operations.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {tables.map((t, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F6EF] text-[#0B5C45] flex items-center justify-center">
                    <Table2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    Available
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#12201B] dark:text-white">{t}</h4>
                  <p className="text-[11px] text-[#8D9792]">Dining Floor</p>
                </div>
                <button
                  type="button"
                  className="w-full py-2 rounded-lg bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5 text-[#0B5C45]" />
                  <span>Download QR</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
