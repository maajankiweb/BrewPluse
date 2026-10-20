import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
};

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;
let analytics: Analytics | null = null;

function getFirebaseApp(): FirebaseApp | null {
  if (app) return app;
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    return null;
  }
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
    if (!activeApp) return null;
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
    if (!activeApp) return null;
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
    const activeApp = getFirebaseApp();
    if (supported && activeApp) {
      analytics = getAnalytics(activeApp);
      return analytics;
    }
  } catch (error) {
    console.warn('[FirebaseClient] Analytics initialization note:', error);
  }
  return null;
}

// Initialize on load if config is present
try {
  app = getFirebaseApp();
  if (app) {
    db = getFirestore(app);
    auth = getAuth(app);
    if (typeof window !== 'undefined') {
      getFirebaseAnalytics().catch(() => {});
    }
  }
} catch (error) {
  console.warn('[FirebaseClient] Eager initialization note:', error);
}

// Suppress harmless Firebase WebChannel stream abort warnings on fast refresh / unmount
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const message = reason?.message || String(reason || '');
    const name = reason?.name;
    if (
      name === 'AbortError' ||
      message.includes('signal is aborted without reason') ||
      message.includes('The user aborted a request') ||
      message.includes('aborted without reason')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation?.();
    }
  });
}

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export { app, db, auth, analytics, googleProvider, firebaseConfig };

