'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import DashboardShell from '@/components/dashboard/DashboardShell';
import { Sparkles, CloudUpload, WandSparkles } from 'lucide-react';

export default function LiveCafePage() {
  const routeParams = useParams();
  const storeSlug = (routeParams?.storeSlug as string) || 'brewpluse';
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <DashboardShell storeSlug={storeSlug}>
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 animate-in fade-in duration-300">
        <div className="w-full max-w-4xl mx-auto py-8 px-4 sm:px-6">
          <div className="bg-[#12141c] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Spatial Floor Plan Detection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Build your cafe
              </h1>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-medium">
                Show BrewPluse your space and we&apos;ll create an editable digital version of your cafe.
              </p>
            </div>

            <label className="group relative border-2 border-dashed border-white/15 hover:border-amber-500/50 rounded-3xl p-8 sm:p-12 text-center bg-black/20 hover:bg-black/30 transition-all cursor-pointer block">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 group-hover:bg-amber-500/10 text-neutral-400 group-hover:text-amber-400 flex items-center justify-center mx-auto transition-colors border border-white/10">
                  <CloudUpload className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-base font-bold text-white">
                    {selectedFile ? selectedFile.name : 'Upload cafe photo or floor plan'}
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Drag and drop, or browse your files (JPEG, PNG, WEBP up to 15MB)
                  </p>
                </div>
              </div>
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                disabled={!selectedFile}
                className="w-full sm:flex-1 h-12 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:pointer-events-none active:scale-95 text-black font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer"
              >
                <WandSparkles className="w-4 h-4" />
                <span>Create My Cafe</span>
              </button>
              <Link
                href={`/dashboard/${storeSlug}/tables`}
                className="w-full sm:w-auto px-6 h-12 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs flex items-center justify-center transition-all border border-white/10 cursor-pointer"
              >
                Start Manually
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
