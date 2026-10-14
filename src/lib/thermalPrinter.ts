/**
 * BrewPluse Thermal Printer Driver
 * Supports Web Bluetooth ESC/POS Direct Printing (58mm & 80mm)
 * with graceful fallback to Browser System Thermal Print.
 */

// Common Bluetooth Printer Service UUIDs
const BLUETOOTH_PRINT_SERVICES = [
  '000018f0-0000-1000-8000-00805f9b34fb', // Standard POS Printer Service
  'e7810a71-73ae-499d-8c15-faa9aef0c3f2', // Sunmi / Rongta
  '49535343-fe7d-4ae5-8fa9-9fafd205e455', // ISSC Transparent
];

// ESC/POS Commands
const ESC = 0x1b;
const GS = 0x1d;

export interface ThermalReceiptData {
  storeName: string;
  storeAddress?: string;
  storePhone?: string;
  gstin?: string;
  orderNumber: string;
  tableNumber?: string;
  orderType: string;
  timestamp: string;
  items: Array<{
    name: string;
    qty: number;
    price: number;
  }>;
  subtotal: number;
  cgst: number;
  sgst: number;
  total: number;
  paymentMode: string;
  footerMessage?: string;
  paperWidth?: '58mm' | '80mm';
}

class ThermalPrinterManager {
  private bluetoothDevice: any = null;
  private characteristic: any = null;

  public isBluetoothSupported(): boolean {
    return typeof window !== 'undefined' && 'bluetooth' in navigator;
  }

  public getConnectedDeviceName(): string | null {
    return this.bluetoothDevice?.name || null;
  }

  /**
   * Request and pair with a nearby Bluetooth Thermal Printer
   */
  public async connect(): Promise<{ success: boolean; deviceName?: string; error?: string }> {
    if (!this.isBluetoothSupported()) {
      return {
        success: false,
        error: 'Web Bluetooth is not supported in this browser. Please use Google Chrome or Edge.',
      };
    }

    try {
      const nav: any = navigator;
      const device = await nav.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: BLUETOOTH_PRINT_SERVICES,
      });

      this.bluetoothDevice = device;
      const server = await device.gatt.connect();

      // Find compatible writable characteristic
      let writableChar = null;
      for (const serviceUuid of BLUETOOTH_PRINT_SERVICES) {
        try {
          const service = await server.getPrimaryService(serviceUuid);
          const chars = await service.getCharacteristics();
          for (const c of chars) {
            if (c.properties.write || c.properties.writeWithoutResponse) {
              writableChar = c;
              break;
            }
          }
        } catch {
          // Continue searching other services
        }
        if (writableChar) break;
      }

      if (!writableChar) {
        return {
          success: false,
          error: 'Printer paired, but no writable ESC/POS print channel was detected.',
        };
      }

      this.characteristic = writableChar;
      return { success: true, deviceName: device.name || 'Thermal POS Printer' };
    } catch (err: any) {
      if (err.name === 'NotFoundError') {
        return { success: false, error: 'Pairing cancelled by user.' };
      }
      return { success: false, error: err.message || 'Bluetooth connection failed.' };
    }
  }

  /**
   * Send ESC/POS commands to print formatted thermal receipt
   */
  public async printReceipt(data: ThermalReceiptData): Promise<{ success: boolean; error?: string }> {
    if (!this.characteristic) {
      // Graceful fallback to browser print dialog
      this.printViaBrowserFallback(data);
      return { success: true };
    }

    try {
      const buffer: number[] = [];

      // 1. Initialize Printer (ESC @)
      buffer.push(ESC, 0x40);

      // 2. Center Align (ESC a 1)
      buffer.push(ESC, 0x61, 0x01);

      // Double Height + Double Width for Store Header (ESC ! 0x30)
      buffer.push(ESC, 0x21, 0x30);
      this.writeText(buffer, `${data.storeName}\n`);

      // Normal font (ESC ! 0x00)
      buffer.push(ESC, 0x21, 0x00);
      if (data.storeAddress) this.writeText(buffer, `${data.storeAddress}\n`);
      if (data.storePhone) this.writeText(buffer, `Tel: ${data.storePhone}\n`);
      if (data.gstin) this.writeText(buffer, `GSTIN: ${data.gstin}\n`);

      this.writeText(buffer, '--------------------------------\n');

      // Left Align (ESC a 0)
      buffer.push(ESC, 0x61, 0x00);
      this.writeText(buffer, `Order: #${data.orderNumber}\n`);
      if (data.tableNumber) this.writeText(buffer, `Table: ${data.tableNumber}\n`);
      this.writeText(buffer, `Type:  ${data.orderType.toUpperCase()}\n`);
      this.writeText(buffer, `Date:  ${data.timestamp}\n`);
      this.writeText(buffer, '--------------------------------\n');

      // Items Column Header
      this.writeText(buffer, 'ITEM             QTY      PRICE\n');
      this.writeText(buffer, '--------------------------------\n');

      for (const item of data.items) {
        const name = item.name.length > 15 ? item.name.slice(0, 14) + '.' : item.name.padEnd(16);
        const qty = item.qty.toString().padStart(3);
        const price = `Rs ${item.price * item.qty}`.padStart(11);
        this.writeText(buffer, `${name} ${qty} ${price}\n`);
      }

      this.writeText(buffer, '--------------------------------\n');

      // Right Align for Totals
      buffer.push(ESC, 0x61, 0x02);
      this.writeText(buffer, `Subtotal: Rs ${data.subtotal.toFixed(2)}\n`);
      this.writeText(buffer, `CGST (2.5%): Rs ${data.cgst.toFixed(2)}\n`);
      this.writeText(buffer, `SGST (2.5%): Rs ${data.sgst.toFixed(2)}\n`);

      // Bold Total
      buffer.push(ESC, 0x45, 0x01); // Bold on
      this.writeText(buffer, `TOTAL: Rs ${data.total.toFixed(2)}\n`);
      buffer.push(ESC, 0x45, 0x00); // Bold off

      this.writeText(buffer, `Tender: ${data.paymentMode.toUpperCase()}\n`);

      // Center Align Footer
      buffer.push(ESC, 0x61, 0x01);
      this.writeText(buffer, '================================\n');
      this.writeText(buffer, `${data.footerMessage || 'Thank you for visiting! Powered by BrewPluse.'}\n\n`);

      // Paper Feed & Partial Cut (GS V 66 0)
      buffer.push(0x0a, 0x0a, 0x0a);
      buffer.push(GS, 0x56, 0x42, 0x00);

      // Send to Bluetooth Characteristic in chunks of 512 bytes
      const uint8 = new Uint8Array(buffer);
      const chunkSize = 512;
      for (let i = 0; i < uint8.length; i += chunkSize) {
        const chunk = uint8.slice(i, i + chunkSize);
        await this.characteristic.writeValue(chunk);
      }

      return { success: true };
    } catch (err: any) {
      // Fallback if writing fails
      this.printViaBrowserFallback(data);
      return { success: true };
    }
  }

  /**
   * Browser print thermal layout fallback
   */
  public printViaBrowserFallback(data: ThermalReceiptData) {
    if (typeof window === 'undefined') return;

    const paperWidth = data.paperWidth || '80mm';
    const widthPx = paperWidth === '58mm' ? 280 : 380;
    const bodyWidth = paperWidth === '58mm' ? '50mm' : '72mm';
    const fontSize = paperWidth === '58mm' ? '11px' : '12px';

    const printWindow = window.open('', '_blank', `width=${widthPx},height=600`);
    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt #${data.orderNumber}</title>
        <style>
          @page { size: ${paperWidth} auto; margin: 0; }
          body {
            font-family: 'Courier New', monospace;
            width: ${bodyWidth};
            margin: 0 auto;
            padding: 8mm 2mm;
            font-size: ${fontSize};
            color: #000;
          }
          .center { text-align: center; }
          .right { text-align: right; }
          .bold { font-weight: bold; }
          .divider { border-top: 1px dashed #000; margin: 6px 0; }
          .title { font-size: ${paperWidth === '58mm' ? '14px' : '16px'}; font-weight: bold; }
          table { width: 100%; border-collapse: collapse; font-size: ${paperWidth === '58mm' ? '10px' : '11px'}; }
          th, td { padding: 2px 0; }
        </style>
      </head>
      <body>
        <div class="center title">${data.storeName}</div>
        ${data.storeAddress ? `<div class="center">${data.storeAddress}</div>` : ''}
        ${data.storePhone ? `<div class="center">Tel: ${data.storePhone}</div>` : ''}
        ${data.gstin ? `<div class="center">GSTIN: ${data.gstin}</div>` : ''}
        <div class="divider"></div>
        <div>Order: #${data.orderNumber} | ${data.orderType.toUpperCase()}</div>
        ${data.tableNumber ? `<div>Table: ${data.tableNumber}</div>` : ''}
        <div>Date: ${data.timestamp}</div>
        <div class="divider"></div>
        <table>
          <thead>
            <tr><th align="left">ITEM</th><th align="center">QTY</th><th align="right">AMT</th></tr>
          </thead>
          <tbody>
            ${data.items.map(i => `<tr><td>${i.name}</td><td align="center">${i.qty}</td><td align="right">₹${i.price * i.qty}</td></tr>`).join('')}
          </tbody>
        </table>
        <div class="divider"></div>
        <div class="right">Subtotal: ₹${data.subtotal.toFixed(2)}</div>
        <div class="right">CGST (2.5%): ₹${data.cgst.toFixed(2)}</div>
        <div class="right">SGST (2.5%): ₹${data.sgst.toFixed(2)}</div>
        <div class="right bold" style="font-size: 14px; margin-top: 4px;">TOTAL: ₹${data.total.toFixed(2)}</div>
        <div class="right">Paid Via: ${data.paymentMode.toUpperCase()}</div>
        <div class="divider"></div>
        <div class="center" style="margin-top: 8px;">${data.footerMessage || 'Thank you for visiting!'}</div>
        <div class="center" style="font-size: 9px; margin-top: 4px;">BrewPluse Cloud POS</div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  }

  /**
   * Kitchen Order Ticket (KOT) Direct Printing
   * Prints dedicated slip with modifiers for kitchen prep station
   */
  public async printKOT(
    data: {
      orderNumber: string;
      table: string;
      timestamp: string;
      items: Array<{
        name: string;
        qty: number;
        modifiers?: string[];
        notes?: string;
      }>;
      notes?: string;
      paperWidth?: '58mm' | '80mm';
    },
    paperWidth: '58mm' | '80mm' = '80mm'
  ) {
    return this.printKot(data, data.paperWidth || paperWidth);
  }

  public async printKot(
    data: {
      orderNumber: string;
      table: string;
      timestamp: string;
      items: Array<{
        name: string;
        qty: number;
        modifiers?: string[];
        notes?: string;
      }>;
      notes?: string;
      paperWidth?: '58mm' | '80mm';
    },
    paperWidth: '58mm' | '80mm' = '80mm'
  ): Promise<{ success: boolean; error?: string }> {
    const effectiveWidth = data.paperWidth || paperWidth;
    // If Web Bluetooth characteristic is connected, write ESC/POS bytes
    if (this.characteristic) {
      try {
        const buffer: number[] = [];
        buffer.push(ESC, 0x40); // Init
        buffer.push(ESC, 0x61, 0x01); // Center
        buffer.push(ESC, 0x45, 0x01); // Bold on
        this.writeText(buffer, '*** KITCHEN ORDER TICKET (KOT) ***\n');
        this.writeText(buffer, `ORDER #${data.orderNumber}\n`);
        buffer.push(ESC, 0x45, 0x00); // Bold off

        this.writeText(buffer, `TABLE / DEST: ${data.table.toUpperCase()}\n`);
        this.writeText(buffer, `TIME: ${data.timestamp}\n`);
        this.writeText(buffer, paperWidth === '58mm' ? '------------------------\n' : '--------------------------------\n');

        // Left align items
        buffer.push(ESC, 0x61, 0x00);
        for (const item of data.items) {
          buffer.push(ESC, 0x45, 0x01);
          this.writeText(buffer, `${item.qty}x ${item.name}\n`);
          buffer.push(ESC, 0x45, 0x00);
          if (item.modifiers && item.modifiers.length > 0) {
            this.writeText(buffer, `   * ${item.modifiers.join(', ')}\n`);
          }
          if (item.notes) {
            this.writeText(buffer, `   Note: ${item.notes}\n`);
          }
        }

        this.writeText(buffer, paperWidth === '58mm' ? '------------------------\n' : '--------------------------------\n');
        if (data.notes) {
          this.writeText(buffer, `Special Instructions: ${data.notes}\n`);
        }
        buffer.push(0x0a, 0x0a, 0x0a);
        buffer.push(GS, 0x56, 0x42, 0x00); // Cut

        const uint8 = new Uint8Array(buffer);
        const chunkSize = 512;
        for (let i = 0; i < uint8.length; i += chunkSize) {
          const chunk = uint8.slice(i, i + chunkSize);
          await this.characteristic.writeValue(chunk);
        }
        return { success: true };
      } catch (err: any) {
        console.warn('[ThermalPrinter] Bluetooth KOT print failed, falling back to browser window:', err);
      }
    }

    // Browser thermal window fallback
    if (typeof window !== 'undefined') {
      const widthPx = paperWidth === '58mm' ? 280 : 380;
      const printWindow = window.open('', '_blank', `width=${widthPx},height=500`);
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>KOT #${data.orderNumber}</title>
            <style>
              @page { size: ${paperWidth} auto; margin: 0; }
              body {
                font-family: 'Courier New', monospace;
                width: ${paperWidth === '58mm' ? '50mm' : '72mm'};
                margin: 0 auto;
                padding: 6mm 2mm;
                font-size: ${paperWidth === '58mm' ? '11px' : '13px'};
                color: #000;
              }
              .center { text-align: center; }
              .bold { font-weight: bold; }
              .divider { border-top: 2px dashed #000; margin: 6px 0; }
              .item-mod { font-size: 11px; padding-left: 12px; color: #333; }
            </style>
          </head>
          <body>
            <div class="center bold" style="font-size: 16px;">KITCHEN ORDER TICKET</div>
            <div class="center bold" style="font-size: 18px; margin: 4px 0;">#${data.orderNumber}</div>
            <div class="center bold">${data.table.toUpperCase()}</div>
            <div class="center" style="font-size: 11px;">${data.timestamp}</div>
            <div class="divider"></div>
            <div>
              ${data.items
                .map(
                  (i) => `
                <div style="margin: 4px 0;">
                  <span class="bold" style="font-size: 14px;">${i.qty}x ${i.name}</span>
                  ${
                    i.modifiers && i.modifiers.length > 0
                      ? `<div class="item-mod">↳ ${i.modifiers.join(', ')}</div>`
                      : ''
                  }
                  ${i.notes ? `<div class="item-mod">Note: ${i.notes}</div>` : ''}
                </div>
              `
                )
                .join('')}
            </div>
            <div class="divider"></div>
            ${data.notes ? `<div style="font-size: 12px;"><strong>Chef Note:</strong> ${data.notes}</div><div class="divider"></div>` : ''}
            <div class="center" style="font-size: 10px; margin-top: 8px;">BrewPulse KDS Printer Stream</div>
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 200);
      }
    }

    return { success: true };
  }

  private writeText(buffer: number[], text: string) {
    for (let i = 0; i < text.length; i++) {
      buffer.push(text.charCodeAt(i));
    }
  }
}

export const thermalPrinter = new ThermalPrinterManager();
