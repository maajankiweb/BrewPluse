'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import DashboardShell from '@/components/dashboard/DashboardShell';
import {
  Sparkles,
  Plus,
  Shield,
  ArrowRight,
  QrCode,
  Table2,
  Download,
  Printer,
  X,
  ExternalLink,
  Trash2,
  Check,
  Smartphone,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

const DEFAULT_TABLES = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'VIP Lounge'];

export default function TablesPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [tables, setTables] = useState<string[]>([]);
  const [newTableLabel, setNewTableLabel] = useState('');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [originUrl, setOriginUrl] = useState('https://brewpluse.com');
  const [downloading, setDownloading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize from localStorage or defaults
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOriginUrl(window.location.origin);
      try {
        const saved = localStorage.getItem(`brewpluse::tables_${storeSlug}`);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTables(parsed);
            return;
          }
        }
      } catch (e) {
        // fallback
      }
      setTables(DEFAULT_TABLES);
      try {
        localStorage.setItem(`brewpluse::tables_${storeSlug}`, JSON.stringify(DEFAULT_TABLES));
      } catch (e) {}
    }
  }, [storeSlug]);

  const saveTables = (newTables: string[]) => {
    setTables(newTables);
    try {
      localStorage.setItem(`brewpluse::tables_${storeSlug}`, JSON.stringify(newTables));
    } catch (e) {}
  };

  const handleAddTable = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newTableLabel.trim();
    if (!trimmed) return;
    if (tables.includes(trimmed)) {
      alert('A table with this name already exists!');
      return;
    }
    const updated = [...tables, trimmed];
    saveTables(updated);
    setNewTableLabel('');
  };

  const handleDeleteTable = (tableToDelete: string) => {
    if (confirm(`Are you sure you want to remove "${tableToDelete}"?`)) {
      const updated = tables.filter((t) => t !== tableToDelete);
      saveTables(updated);
      if (selectedTable === tableToDelete) {
        setIsQrModalOpen(false);
        setSelectedTable(null);
      }
    }
  };

  const handleOpenQrModal = (tableName: string) => {
    setSelectedTable(tableName);
    setIsQrModalOpen(true);
    setCopiedLink(false);
  };

  const getTableQrUrl = (tableName: string) => {
    return `${originUrl}/m/${storeSlug}?table=${encodeURIComponent(tableName)}`;
  };

  const getQrImageUrl = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=15&format=png&data=${encodeURIComponent(
      data
    )}`;
  };

  const handleCopyLink = () => {
    if (!selectedTable) return;
    const url = getTableQrUrl(selectedTable);
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Render sticker to canvas and trigger PNG download
  const handleDownloadSticker = async () => {
    if (!selectedTable) return;
    setDownloading(true);

    try {
      const qrUrl = getQrImageUrl(getTableQrUrl(selectedTable));
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = qrUrl;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 600;
        canvas.height = 820;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Background
        ctx.fillStyle = '#FFFFFF';
        ctx.roundRect(0, 0, 600, 820, 24);
        ctx.fill();

        // Dark header bar
        ctx.fillStyle = '#0B2B1A';
        ctx.roundRect(24, 24, 552, 120, 16);
        ctx.fill();

        // Header Title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 26px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('SCAN TO ORDER & PAY', 300, 72);

        ctx.fillStyle = '#A3E635';
        ctx.font = 'bold 15px monospace';
        ctx.fillText('CONTACTLESS QR MENU · INSTANT UPI', 300, 105);

        // QR Code in center
        ctx.drawImage(img, 100, 180, 400, 400);

        // Table Label Badge
        ctx.fillStyle = '#F59E0B';
        ctx.roundRect(120, 610, 360, 64, 16);
        ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText(selectedTable.toUpperCase(), 300, 652);

        // Footer Brand Note
        ctx.fillStyle = '#65736D';
        ctx.font = '14px sans-serif';
        ctx.fillText('Powered by BrewPluse Cafe OS · Zero app download needed', 300, 725);

        // UPI icons note
        ctx.fillStyle = '#0B2B1A';
        ctx.font = 'bold 13px monospace';
        ctx.fillText('GPay · PhonePe · Paytm · NetBanking', 300, 755);

        // Convert to data url and download
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `BrewPluse-${storeSlug}-${selectedTable.replace(/\s+/g, '_')}-QR.png`;
        link.href = dataUrl;
        link.click();
        setDownloading(false);
      };

      img.onerror = () => {
        alert('Could not download QR sticker. Please right click on the QR image to save.');
        setDownloading(false);
      };
    } catch (e) {
      setDownloading(false);
    }
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
                  BrewPluse Smart QR Table System
                </h3>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white uppercase tracking-wider">
                  LIVE QR ENGINE
                </span>
              </div>
              <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
                Guests scan their table sticker with smartphone camera and order directly from mobile browser with zero app download.
              </p>
            </div>
          </div>
          <Link
            href={`/m/${storeSlug}?table=Demo%20Table`}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 self-start md:self-auto shrink-0 cursor-pointer"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>PREVIEW CUSTOMER WEB MENU</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Visual Floor Planner Toolbar */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-[#12201B] dark:text-white">
                Dining Floor & Table QR Codes
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                {tables.length} ACTIVE TABLES
              </span>
            </div>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] mt-0.5">
              Add table names or seating labels. Generate print-ready table stands and contactless ordering links.
            </p>
          </div>

          <form onSubmit={handleAddTable} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="e.g. Table 6, Patio 2, Bar A"
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

        {/* Tables Grid */}
        {tables.length === 0 ? (
          <div className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-20 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-[#8D9792] flex items-center justify-center mx-auto">
              <Shield className="w-7 h-7" />
            </div>
            <p className="text-base font-bold text-[#12201B] dark:text-white">No tables placed</p>
            <p className="text-xs text-[#65736D] dark:text-[#9AB2A8] max-w-sm mx-auto">
              Add a table using the control panel above to generate its official QR code.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tables.map((t, idx) => {
              const customerUrl = getTableQrUrl(t);
              return (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0E2018] border border-[#E5ECE8] dark:border-[#1E382E] rounded-2xl p-4 space-y-3 hover:shadow-md transition-shadow relative group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-[#E8F6EF] dark:bg-[#142E25] text-[#0B5C45] dark:text-[#10B981] flex items-center justify-center">
                      <Table2 className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                        Active QR
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDeleteTable(t)}
                        title="Delete Table"
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-[#12201B] dark:text-white">{t}</h4>
                    <p className="text-[11px] text-[#8D9792] truncate">{customerUrl}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleOpenQrModal(t)}
                      className="py-2 px-2.5 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>View QR</span>
                    </button>
                    <Link
                      href={customerUrl}
                      target="_blank"
                      className="py-2 px-2 rounded-xl bg-[#F8FAF8] dark:bg-[#11241C] border border-[#E5ECE8] dark:border-[#1E382E] text-xs font-semibold text-[#12201B] dark:text-white flex items-center justify-center gap-1 hover:bg-[#EBEFEA] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Test Menu</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Printable & Download QR Modal */}
        {isQrModalOpen && selectedTable && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-[#0E2018] rounded-3xl max-w-md w-full border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">
                    Table QR Code &amp; Acrylic Stand
                  </h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {selectedTable} · Ready to download &amp; print
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsQrModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white flex items-center justify-center cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body: Mockup Stand Card */}
              <div className="p-5 overflow-y-auto space-y-4">
                <div
                  id="printable-qr-stand"
                  className="rounded-2xl border-2 border-[#0B2B1A] bg-white p-6 text-center space-y-4 shadow-md text-neutral-900"
                >
                  {/* Stand Header */}
                  <div className="bg-[#0B2B1A] text-white py-3 px-4 rounded-xl space-y-0.5">
                    <p className="text-[10px] font-mono tracking-widest uppercase text-amber-400 font-bold">
                      BREWPLUSE CONTACTLESS ORDERING
                    </p>
                    <h4 className="text-lg font-black tracking-tight">SCAN TO ORDER &amp; PAY</h4>
                  </div>

                  {/* High Res QR */}
                  <div className="relative mx-auto w-52 h-52 bg-white p-2 rounded-2xl border border-neutral-200 shadow-inner flex items-center justify-center">
                    <img
                      src={getQrImageUrl(getTableQrUrl(selectedTable))}
                      alt={`QR code for ${selectedTable}`}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Table Label Badge */}
                  <div className="inline-block bg-amber-500 text-neutral-950 font-black text-sm px-6 py-2 rounded-full uppercase tracking-wider shadow-xs">
                    {selectedTable}
                  </div>

                  {/* Footnote */}
                  <div className="text-[11px] text-neutral-500 space-y-1 pt-1 border-t border-neutral-100">
                    <p className="font-semibold text-neutral-700">Open mobile camera · Scan to browse menu</p>
                    <p className="font-mono text-[10px] text-emerald-800">
                      Zero app install · GPay, PhonePe, Paytm, Cards
                    </p>
                  </div>
                </div>

                {/* Direct Link Copy */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 text-xs">
                  <span className="text-neutral-400 font-mono text-[11px] truncate flex-1 select-all">
                    {getTableQrUrl(selectedTable)}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-1 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors shrink-0 cursor-pointer text-[11px]"
                  >
                    {copiedLink ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/30 flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadSticker}
                  disabled={downloading}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B2B1A] hover:bg-[#124229] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  <span>{downloading ? 'Generating PNG...' : 'Download Sticker (PNG)'}</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-800 dark:text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-neutral-100 transition-all cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
