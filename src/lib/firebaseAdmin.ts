import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, FieldValue, Firestore } from 'firebase-admin/firestore';
import { getAuth, Auth } from 'firebase-admin/auth';

let adminApp: App | null = null;
let firestoreDb: Firestore | null = null;
let adminAuth: Auth | null = null;

export function getAdminApp(): App | null {
  if (adminApp) return adminApp;

  const currentApps = getApps();
  if (currentApps.length > 0 && currentApps[0]) {
    adminApp = currentApps[0];
    return adminApp;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'brewpluse-app';
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (clientEmail && privateKey) {
    try {
      adminApp = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
      return adminApp;
    } catch (e: any) {
      console.warn('[FirebaseAdmin] Cert init failed:', e?.message);
    }
  }

  try {
    adminApp = initializeApp({ projectId });
    return adminApp;
  } catch (e: any) {
    console.warn('[FirebaseAdmin] Init note:', e?.message);
    return null;
  }
}

export function getAdminFirestore(): Firestore | null {
  if (firestoreDb) return firestoreDb;
  const app = getAdminApp();
  if (!app) return null;
  try {
    firestoreDb = getFirestore(app);
    return firestoreDb;
  } catch (e) {
    return null;
  }
}

export function getAdminAuth(): Auth | null {
  if (adminAuth) return adminAuth;
  const app = getAdminApp();
  if (!app) return null;
  try {
    adminAuth = getAuth(app);
    return adminAuth;
  } catch (e) {
    return null;
  }
}

// ----------------------------------------------------------------------
// Unified Firestore Synchronization Helpers (Website + Mobile App)
// ----------------------------------------------------------------------

/**
 * Sync order directly to Firestore collection 'orders'
 */
export async function syncOrderToFirestore(orderData: Record<string, any>): Promise<boolean> {
  const db = getAdminFirestore();
  if (!db) return false;

  try {
    const orderId = orderData.orderNumber || orderData.id || `order-${Date.now()}`;
    await db.collection('orders').doc(String(orderId)).set(
      {
        ...orderData,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (err: any) {
    console.warn('[FirebaseAdmin] Order sync note:', err.message);
    return false;
  }
}

/**
 * Sync invoice to Firestore collection 'invoices'
 */
export async function syncInvoiceToFirestore(invoiceData: Record<string, any>): Promise<boolean> {
  const db = getAdminFirestore();
  if (!db) return false;

  try {
    const invoiceId = invoiceData.invoiceNumber || invoiceData.orderNumber || `inv-${Date.now()}`;
    await db.collection('invoices').doc(String(invoiceId)).set(
      {
        ...invoiceData,
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (err: any) {
    console.warn('[FirebaseAdmin] Invoice sync note:', err.message);
    return false;
  }
}

/**
 * Sync menu catalog to Firestore collection 'menus'
 */
export async function syncMenuToFirestore(storeSlug: string, items: any[]): Promise<boolean> {
  const db = getAdminFirestore();
  if (!db) return false;

  try {
    await db.collection('menus').doc(storeSlug).set(
      {
        storeSlug,
        items,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    return true;
  } catch (err: any) {
    console.warn('[FirebaseAdmin] Menu sync note:', err.message);
    return false;
  }
}

/**
 * Store OTP in Firestore collection 'otps'
 */
export async function syncOtpToFirestore(email: string, otp: string, expiresAt: number): Promise<boolean> {
  const db = getAdminFirestore();
  if (!db) return false;

  try {
    await db.collection('otps').doc(email.trim().toLowerCase()).set({
      email: email.trim().toLowerCase(),
      otp,
      expiresAt,
      createdAt: FieldValue.serverTimestamp(),
    });
    return true;
  } catch (err: any) {
    console.warn('[FirebaseAdmin] OTP sync note:', err.message);
    return false;
  }
}

/**
 * Verify OTP from Firestore collection 'otps'
 */
export async function verifyOtpFromFirestore(email: string, providedOtp: string): Promise<boolean> {
  const db = getAdminFirestore();
  if (!db) return false;

  try {
    const cleanEmail = email.trim().toLowerCase();
    const docSnap = await db.collection('otps').doc(cleanEmail).get();
    if (!docSnap.exists) return false;

    const data = docSnap.data();
    if (!data) return false;

    if (Date.now() > (data.expiresAt || 0)) {
      await db.collection('otps').doc(cleanEmail).delete();
      return false;
    }

    if (data.otp === providedOtp.trim()) {
      await db.collection('otps').doc(cleanEmail).delete();
      return true;
    }

    return false;
  } catch (err: any) {
    console.warn('[FirebaseAdmin] OTP verify note:', err.message);
    return false;
  }
}
