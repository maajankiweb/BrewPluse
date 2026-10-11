'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Printer,
  ChevronLeft,
  RefreshCw,
  CheckCircle2,
  Bluetooth,
  AlertCircle,
} from 'lucide-react';
import { useDemo } from '@/app/demo/demoContext';
import { thermalPrinter } from '@/lib/thermalPrinter';

export default function DemoPrintersSettingsPage() {
  const { notify } = useDemo();
  const [connecting, setConnecting] = useState(false);
  const [connectedBtDevice, setConnectedBtDevice] = useState<string | null>(null);

  const [printers, setPrinters] = useState([
    { id: 'p1', name: 'Billing Desk Printer', type: 'Bluetooth', model: 'BrewPluse-BT-80mm', status: 'Connected', isDefault: true },
    { id: 'p2', name: 'Kitchen KOT Printer', type: 'LAN Ethernet', model: 'Epson TM-T82III (192.168.1.120)', status: 'Connected', isDefault: false },
  ]);

  const handleConnectBluetooth = async () => {
    if (!thermalPrinter.isBluetoothSupported()) {
      notify('Web Bluetooth is supported on Google Chrome or Microsoft Edge.');
      return;
    }

    setConnecting(true);
    notify('Searching for nearby Bluetooth ESC/POS printers...');
    const result = await thermalPrinter.connect();
    setConnecting(false);

    if (result.success && result.deviceName) {
      setConnectedBtDevice(result.deviceName);
      setPrinters((prev) => [
        {
          id: `bt-${Date.now()}`,
          name: result.deviceName || 'Paired Bluetooth Printer',
          type: 'Bluetooth ESC/POS',
          model: result.deviceName || 'Thermal BT-80',
          status: 'Connected',
          isDefault: true,
        },
        ...prev.map((p) => ({ ...p, isDefault: false })),
      ]);
      notify(`Successfully paired with "${result.deviceName}"!`);
    } else {
      notify(result.error || 'Failed to connect printer.');
    }
  };

  const handleTestPrint = async (pName: string) => {
    notify(`Printing test receipt for ${pName}...`);
    await thermalPrinter.printReceipt({
      storeName: 'BrewPluse Artisan Coffee',
      storeAddress: 'Indiranagar 100ft Rd, Bengaluru',
      storePhone: '+91 9173807471',
      gstin: '29ABCDE1234F1Z5',
      orderNumber: 'TEST-001',
      tableNumber: 'Table 4',
      orderType: 'Dine-In',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [
        { name: 'Iced Spanish Latte', qty: 2, price: 240 },
        { name: 'Almond Croissant', qty: 1, price: 180 },
      ],
      subtotal: 660,
      cgst: 16.5,
      sgst: 16.5,
      total: 693,
      paymentMode: 'UPI (GPay)',
      footerMessage: 'Hardware & ESC/POS verification successful!',
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16 animate-fade-in">
      <Link
        href="/demo/settings"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-amber-600 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Settings</span>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#ebe8e3] dark:border-[#222225]">
        <div>
          <h1 className="text-2xl font-extrabold text-[#141210] dark:text-white flex items-center gap-2.5">
            <Printer className="w-6 h-6 text-amber-500" />
            <span>Thermal Printers Setup</span>
          </h1>
          <p className="text-xs text-[#686259] dark:text-zinc-400">
            Pair Web Bluetooth ESC/POS hardware, USB, and LAN receipt &amp; KOT printers with automatic slip cutting.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleConnectBluetooth}
            disabled={connecting}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <Bluetooth className="w-3.5 h-3.5" />
            <span>{connecting ? 'Pairing...' : 'Pair Bluetooth Printer'}</span>
          </button>

          <button
            onClick={() => notify('Scanning for local network thermal printers...')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold shadow-sm transition-all cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Scan LAN</span>
          </button>
        </div>
      </div>

      {connectedBtDevice && (
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center gap-3 text-xs text-blue-900 dark:text-blue-300 font-medium">
          <Bluetooth className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Active Web Bluetooth connection: <strong>{connectedBtDevice}</strong>. ESC/POS orders fire directly without print dialogs.</span>
        </div>
      )}

      <div className="space-y-4">
        {printers.map((prn) => (
          <div
            key={prn.id}
            className="bg-white dark:bg-[#121214] border border-[#ebe8e3] dark:border-[#222225] rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
                <Printer className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#141210] dark:text-white">
                    {prn.name}
                  </h3>
                  {prn.isDefault && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400">
                      Default Register
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 font-mono mt-0.5">
                  {prn.type} &bull; {prn.model}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ready to print (Online)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleTestPrint(prn.name)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
              >
                Test Print Receipt ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
