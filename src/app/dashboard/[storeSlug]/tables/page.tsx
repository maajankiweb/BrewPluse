'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  Eye,
  Layers,
  Copy,
} from 'lucide-react';
import Link from 'next/link';

interface TableRecord {
  id: string;
  storeId: string;
  number: string;
  label?: string;
  token: string;
  isActive: boolean;
}

export default function TablesPage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';

  const [tables, setTables] = useState<TableRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newTableNumber, setNewTableNumber] = useState('');
  const [newTableLabel, setNewTableLabel] = useState('');
  const [selectedTable, setSelectedTable] = useState<TableRecord | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [qrData, setQrData] = useState<{ qrDataUrl: string; targetUrl: string } | null>(null);
  const [loadingQr, setLoadingQr] = useState(false);
  const [copiedToken, setCopiedToken] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }

  async function fetchTables() {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/tables?storeSlug=${encodeURIComponent(storeSlug)}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.tables)) {
        setTables(data.tables);
      }
    } catch (err) {
      console.error('Failed to load tables:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTables();
  }, [storeSlug]);

  async function handleCreateTable(e: React.FormEvent) {
    e.preventDefault();
    if (!newTableNumber.trim()) return;

    setCreating(true);
    try {
      const res = await fetch(`/api/admin/tables?storeSlug=${encodeURIComponent(storeSlug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: newTableNumber.trim(),
          label: newTableLabel.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Table "${data.table.number}" created and saved!`);
        setNewTableNumber('');
        setNewTableLabel('');
        fetchTables();
      } else {
        showToast(data?.error?.message || 'Failed to create table');
      }
    } catch (err) {
      showToast('Network error while creating table');
    } finally {
      setCreating(false);
    }
  }

  async function handleBatchCreate10() {
    setCreating(true);
    try {
      const startNum = tables.length + 1;
      const batch = Array.from({ length: 10 }, (_, i) => ({
        number: `Table ${startNum + i}`,
      }));

      const res = await fetch(`/api/admin/tables?storeSlug=${encodeURIComponent(storeSlug)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tables: batch }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Created 10 extra tables in bulk!`);
        fetchTables();
      } else {
        showToast(data?.error?.message || 'Failed to create tables');
      }
    } catch (err) {
      showToast('Error during batch creation');
    } finally {
      setCreating(false);
    }
  }

  async function handleOpenQr(table: TableRecord) {
    setSelectedTable(table);
    setQrModalOpen(true);
    setLoadingQr(true);
    try {
      const res = await fetch(`/api/admin/tables/${table.id}/qr?storeSlug=${encodeURIComponent(storeSlug)}`);
      const data = await res.json();
      if (data.success) {
        setQrData({ qrDataUrl: data.qrDataUrl, targetUrl: data.targetUrl });
      }
    } catch (err) {
      console.error('Failed to load QR:', err);
    } finally {
      setLoadingQr(false);
    }
  }

  async function handleRegenerateToken(table: TableRecord) {
    if (!confirm(`Are you sure you want to regenerate the QR code for ${table.number}? The previous QR code will immediately stop working.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/tables/${table.id}/regenerate-token?storeSlug=${encodeURIComponent(storeSlug)}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Token for ${table.number} regenerated! Old QR invalidated.`);
        fetchTables();
        if (selectedTable?.id === table.id) {
          handleOpenQr(data.table);
        }
      } else {
        showToast(data?.error?.message || 'Failed to regenerate token');
      }
    } catch (err) {
      showToast('Error regenerating token');
    }
  }

  async function handleDeleteTable(table: TableRecord) {
    if (!confirm(`Delete ${table.number}? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/admin/tables/${table.id}?storeSlug=${encodeURIComponent(storeSlug)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Table removed`);
        fetchTables();
      } else {
        showToast(data?.error?.message || 'Failed to delete table');
      }
    } catch (err) {
      showToast('Error deleting table');
    }
  }

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans animate-in fade-in duration-300">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-[#062F23] text-white shadow-2xl border border-emerald-500/30 text-xs font-bold animate-fade-in flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-zinc-800 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-black text-[#062F23] dark:text-white tracking-tight">Tables &amp; QR Codes</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 text-[11px] font-bold border border-emerald-200 dark:border-emerald-800">
                {tables.length} Tables Active
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-neutral-400">
              10 tables are automatically initialized and saved for your cafe. You can manually add extra tables (e.g. Table 11, Rooftop, Patio) anytime.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={handleBatchCreate10}
              disabled={creating}
              className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-neutral-200 text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>+10 Tables Bulk</span>
            </button>

            <a
              href={`/api/admin/tables/qr-sheet?storeSlug=${encodeURIComponent(storeSlug)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-md shadow-emerald-950/20 flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-400" />
              <span>Print A4 QR Sheet</span>
            </a>
          </div>
        </div>

        {/* Add Table Bar */}
        <form
          onSubmit={handleCreateTable}
          className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-3"
        >
          <div className="flex-1 w-full flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder='Table number (e.g. "Table 1" or "T4")'
              value={newTableNumber}
              onChange={(e) => setNewTableNumber(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder='Optional label (e.g. "Window Seat", "Terrace")'
              value={newTableLabel}
              onChange={(e) => setNewTableLabel(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
            <span>Add Table</span>
          </button>
        </form>

        {/* Tables Grid */}
        {loading ? (
          <div className="p-12 text-center text-xs text-gray-400 font-medium animate-pulse">
            Loading tables from database...
          </div>
        ) : tables.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <Table2 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-gray-800">No dining tables yet</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
              Add your first dining table above or use "+10 Tables Bulk" to generate your first dining floor plan.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tables.map((t) => (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-extrabold text-[#062F23]">{t.number}</h3>
                      {t.label ? (
                        <p className="text-[11px] font-medium text-emerald-700">{t.label}</p>
                      ) : (
                        <p className="text-[11px] text-gray-400 font-mono">Token: {t.token.slice(0, 6)}...</p>
                      )}
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" title="Active"></span>
                  </div>
                </div>

                <div className="pt-4 mt-2 border-t border-gray-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenQr(t)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>View QR</span>
                  </button>

                  <a
                    href={`/t/${t.token}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-emerald-700 transition-all"
                    title="Test Customer Scan"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleRegenerateToken(t)}
                    className="p-2 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-700 transition-all cursor-pointer"
                    title="Regenerate Token (Invalidate old QR)"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteTable(t)}
                    className="p-2 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all cursor-pointer"
                    title="Delete Table"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Single Table QR Modal */}
        {qrModalOpen && selectedTable && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={(e) => {
              if (e.target === e.currentTarget) setQrModalOpen(false);
            }}
          >
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl text-center font-sans border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="text-left">
                  <h3 className="text-lg font-black text-[#062F23]">{selectedTable.number}</h3>
                  <p className="text-xs text-gray-500">{selectedTable.label || 'Dining Area'}</p>
                </div>
                <button
                  onClick={() => setQrModalOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {loadingQr || !qrData ? (
                <div className="w-64 h-64 mx-auto bg-gray-50 rounded-2xl flex items-center justify-center text-xs text-gray-400 animate-pulse">
                  Generating QR code...
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F8FAF8] rounded-2xl border border-gray-100 inline-block shadow-inner">
                    <img
                      src={qrData.qrDataUrl}
                      alt={`QR for ${selectedTable.number}`}
                      className="w-56 h-56 mx-auto rounded-xl object-contain bg-white p-2"
                    />
                  </div>

                  <div className="text-left text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <div className="text-[10px] text-gray-400 uppercase font-mono font-bold mb-1">Target URL</div>
                    <div className="truncate text-gray-700 font-mono text-[11px] select-all">
                      {qrData.targetUrl}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`/api/admin/tables/${selectedTable.id}/qr?format=png`}
                      download={`qr-${selectedTable.number}.png`}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#062F23] hover:bg-[#0B5C45] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Download PNG</span>
                    </a>

                    <a
                      href={qrData.targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      title="Open Customer Link"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Test Scan</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
