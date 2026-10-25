import QRCode from 'qrcode';

export interface PlatformUpiConfig {
  upiId: string;
  payeeName: string;
}

export function getPlatformUpiConfig(): PlatformUpiConfig {
  const upiId =
    process.env.NEXT_PUBLIC_PLATFORM_UPI_ID ||
    process.env.PLATFORM_UPI_ID ||
    'brewpluse@upi';

  const payeeName =
    process.env.NEXT_PUBLIC_PLATFORM_UPI_NAME ||
    process.env.PLATFORM_UPI_NAME ||
    'BrewPluse Technologies';

  return { upiId, payeeName };
}

export interface BuildUpiParams {
  upiId?: string;
  payeeName?: string;
  amount: number; // in ₹ (INR)
  transactionNote?: string;
  transactionRef?: string;
}

/**
 * Builds the official NPCI UPI Deep Link URI
 */
export function buildUpiUri(params: BuildUpiParams): string {
  const config = getPlatformUpiConfig();
  const pa = (params.upiId || config.upiId).trim();
  const pn = (params.payeeName || config.payeeName).trim();
  const am = Math.max(1, params.amount).toFixed(2);
  const tn = encodeURIComponent(params.transactionNote || 'BrewPluse Payment');
  const tr = encodeURIComponent(
    params.transactionRef || `BP-${Date.now().toString().slice(-8)}`
  );

  return `upi://pay?pa=${encodeURIComponent(pa)}&pn=${encodeURIComponent(pn)}&am=${am}&cu=INR&tn=${tn}&tr=${tr}`;
}

/**
 * Generates an SVG or PNG Data URL for a given UPI URI
 */
export async function generateUpiQrDataUrl(upiUri: string): Promise<string> {
  try {
    return await QRCode.toDataURL(upiUri, {
      width: 320,
      margin: 1.5,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    });
  } catch (error) {
    console.error('[platformUpi] QR Generation failed:', error);
    return '';
  }
}

/**
 * Validates standard Indian Banking UPI Reference Number (UTR / RRN)
 * Usually 12 digits (sometimes 10 to 22 characters alphanumeric)
 */
export function isValidUtr(utr: string): boolean {
  if (!utr) return false;
  const clean = utr.trim();
  return /^[0-9A-Za-z]{8,24}$/.test(clean);
}
