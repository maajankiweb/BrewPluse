import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBi5o5h5Lrb_BHiTVSbOwRg0mnWnUsHWOc',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'brewpluse.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'brewpluse',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'brewpluse.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '248612615090',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:248612615090:web:c7f9292d30f4af24adaaab',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-9CBBZ9B2TP',
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let analytics: Analytics | null = null;

function getFirebaseApp(): FirebaseApp {
  if (app) return app;
  const existingApps = getApps();
  if (existingApps.length > 0 && existingApps[0]) {
    app = existingApps[0];
    return app;
  }
  app = initializeApp(firebaseConfig);
  return app;
}

export function getFirebaseAuth(): Auth | null {
  if (auth) return auth;
  try {
    const activeApp = getFirebaseApp();
    auth = getAuth(activeApp);
    return auth;
  } catch (error) {
    console.error('[FirebaseClient] Auth initialization failed:', error);
    return null;
  }
}

export function getFirebaseDb(): Firestore | null {
  if (db) return db;
  try {
    const activeApp = getFirebaseApp();
    db = getFirestore(activeApp);
    return db;
  } catch (error) {
    console.error('[FirebaseClient] Firestore initialization failed:', error);
    return null;
  }
}

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') return null;
  if (analytics) return analytics;
  try {
    const supported = await isSupported();
    if (supported) {
      analytics = getAnalytics(getFirebaseApp());
      return analytics;
    }
  } catch (error) {
    console.warn('[FirebaseClient] Analytics initialization note:', error);
  }
  return null;
}

// Initialize on load if possible
try {
  app = getFirebaseApp();
  db = getFirestore(app);
  auth = getAuth(app);
  if (typeof window !== 'undefined') {
    getFirebaseAnalytics().catch(() => {});
  }
} catch (error) {
  console.warn('[FirebaseClient] Eager initialization note:', error);
}

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { app, db, auth, analytics, googleProvider, firebaseConfig };

