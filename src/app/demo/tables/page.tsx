'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  QrCode,
  Users,
  Download,
  Printer,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  Coffee,
  ExternalLink,
} from 'lucide-react';
import { useDemo, TableInfo } from '../demoContext';

export default function DemoTablesPage() {
  const { tables, updateTableStatus } = useDemo();
  const [selectedQrTable, setSelectedQrTable] = useState<TableInfo | null>(null);
  const [zoneFilter, setZoneFilter] = useState('All');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [targetUrl, setTargetUrl] = useState<string>('');

  useEffect(() => {
    if (!selectedQrTable) {
      setQrDataUrl('');
      setTargetUrl('');
      return;
    }

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://brewpluse.com';
    const url = `${origin}/m/demo?table=${encodeURIComponent(selectedQrTable.name)}`;
    setTargetUrl(url);

    QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#062F23',
        light: '#FFFFFF',
      },
    })
      .then((data) => setQrDataUrl(data))
      .catch((err) => console.error('Failed to generate table QR:', err));
  }, [selectedQrTable]);

  const filtered = tables.filter((t) => {
    if (zoneFilter === 'Outdoor') return t.name.startsWith('Outdoor');
    if (zoneFilter === 'Balcony') return t.name.startsWith('Balcony');
    if (zoneFilter === 'Indoor') return t.name.startsWith('Table');
    return true;
  });

  const vacantCount = tables.filter((t) => t.status === 'vacant').length;
  const occupiedCount = tables.filter((t) => t.status === 'occupied').length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <QrCode className="w-6 h-6 text-amber-500" />
            <span>Floor Plan &amp; Table QR Stands</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Dine-in table floor arrangement with custom QR codes for direct mobile ordering.
          </p>
        </div>

        {/* Live Occupancy Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 text-xs font-bold font-mono">
            <span>{vacantCount} Vacant</span>
            <span>&bull;</span>
            <span className="text-amber-600 dark:text-amber-400">{occupiedCount} Occupied</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['All', 'Indoor', 'Outdoor', 'Balcony'].map((zone) => (
          <button
            key={zone}
            onClick={() => setZoneFilter(zone)}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
              zoneFilter === zone
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 shadow-xs'
                : 'bg-neutral-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            {zone}
          </button>
        ))}
      </div>

      {/* Table Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((tbl) => (
          <div
            key={tbl.id}
            className={`bg-white dark:bg-[#121214] border rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-2xs transition-all ${
              tbl.status === 'occupied'
                ? 'border-amber-400 bg-amber-50/10'
                : tbl.status === 'reserved'
                ? 'border-purple-300 dark:border-purple-800'
                : 'border-[#ebe8e3] dark:border-[#222225] hover:border-emerald-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-base text-[#141210] dark:text-white">
                  {tbl.name}
                </span>

                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    tbl.status === 'occupied'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-400'
                      : tbl.status === 'reserved'
                      ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-400'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-400'
                  }`}
                >
                  {tbl.status}
                </span>
              </div>

              <div className="space-y-1 text-xs text-zinc-500">
                <p className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>Capacity: {tbl.capacity} Guests</span>
                </p>
                {tbl.activeOrderNumber && (
                  <p className="font-mono text-amber-600 dark:text-amber-400 font-bold">
                    Active: #{tbl.activeOrderNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#ebe8e3]/70 dark:border-[#222225] flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedQrTable(tbl)}
                className="flex-1 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:bg-neutral-100 dark:hover:bg-zinc-800 text-[11px] font-bold flex items-center justify-center gap-1 text-zinc-700 dark:text-zinc-300"
              >
                <QrCode className="w-3.5 h-3.5 text-amber-500" />
                <span>View QR</span>
              </button>

              <select
                value={tbl.status}
                onChange={(e) => updateTableStatus(tbl.id, e.target.value as TableInfo['status'])}
                className="bg-neutral-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-[11px] h-7 px-2 font-semibold text-[#141210] dark:text-white"
              >
                <option value="vacant">Vacant</option>
                <option value="occupied">Occupied</option>
                <option value="reserved">Reserved</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Stand Preview Modal */}
      {selectedQrTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-3xl p-6 shadow-2xl space-y-5 text-center">
            <div className="flex justify-between items-center pb-2 border-b dark:border-zinc-700">
              <span className="font-bold text-xs uppercase tracking-wider text-zinc-400">
                Table QR Stand
              </span>
              <button
                onClick={() => setSelectedQrTable(null)}
                className="p-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-zinc-800 text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stand Graphic Mockup */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-zinc-900 dark:to-zinc-800 border border-[#ebe8e3] dark:border-zinc-700 shadow-inner space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#141210] dark:text-white">
                <Coffee className="w-4 h-4 text-emerald-600" />
                <span>BrewPluse Flagship Cafe</span>
              </div>

              {/* QR Emblem */}
              <div className="w-44 h-44 bg-white p-2 rounded-2xl shadow-md mx-auto flex flex-col items-center justify-center border border-zinc-200">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`Scannable QR for ${selectedQrTable.name}`}
                    className="w-36 h-36 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-36 h-36 flex items-center justify-center text-xs text-zinc-400">
                    Generating QR...
                  </div>
                )}
                <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase mt-1">
                  {selectedQrTable.name}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-extrabold text-[#141210] dark:text-white">
                  Scan with any Mobile Camera to Order
                </p>
                <p className="text-[10px] text-zinc-500 font-mono">
                  Direct customer menu &bull; Table auto-assigned
                </p>
                {targetUrl && (
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline pt-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Test Scan (Open Customer Menu)</span>
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => window.print()}
                className="py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 font-bold text-xs hover:bg-neutral-100 dark:hover:bg-zinc-800 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Stand</span>
              </button>
              <button
                onClick={() => setSelectedQrTable(null)}
                className="py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
