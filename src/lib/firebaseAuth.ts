import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, googleProvider, getFirebaseAuth, getFirebaseDb } from './firebaseClient';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null;
  role?: string;
  storeSlug?: string;
  createdAt?: any;
}

function resolveAuth(): any {
  const instance = auth || getFirebaseAuth();
  if (!instance) {
    throw new Error('Firebase Auth is not initialized. Please verify your Firebase configuration in .env.local.');
  }
  return instance;
}

function resolveDb(): any {
  return db || getFirebaseDb();
}

/**
 * Sign In with Email & Password
 */
export async function signInWithEmail(email: string, password: string): Promise<User> {
  const authInstance = resolveAuth();
  const userCredential = await signInWithEmailAndPassword(authInstance, email, password);
  return userCredential.user;
}

/**
 * Sign Up with Email & Password and create profile in Firestore
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  displayName?: string,
  storeName?: string
): Promise<User> {
  const authInstance = resolveAuth();
  const dbInstance = resolveDb();
  const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
  const user = userCredential.user;

  if (displayName) {
    await updateProfile(user, { displayName });
  }

  // Create Firestore User Document
  if (dbInstance) {
    try {
      const storeSlug = (storeName || 'my-cafe')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      await setDoc(doc(dbInstance, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.email?.split('@')[0],
        storeSlug,
        storeName: storeName || 'My Cafe',
        role: 'owner',
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      console.warn('[FirebaseAuth] Firestore user sync note:', e);
    }
  }

  return user;
}

/**
 * Sign In with Google Popup
 */
export async function signInWithGoogle(): Promise<User> {
  const authInstance = resolveAuth();
  const dbInstance = resolveDb();
  const result = await signInWithPopup(authInstance, googleProvider);
  const user = result.user;

  // Sync to Firestore
  if (dbInstance) {
    try {
      const userRef = doc(dbInstance, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        const storeSlug = (user.displayName || 'my-cafe')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          storeSlug,
          storeName: `${user.displayName}'s Cafe`,
          role: 'owner',
          createdAt: serverTimestamp(),
        });
      }
    } catch (e) {
      console.warn('[FirebaseAuth] Firestore Google sync note:', e);
    }
  }

  return user;
}

/**
 * Sign Out
 */
export async function logoutUser(): Promise<void> {
  const authInstance = auth || getFirebaseAuth();
  if (!authInstance) return;
  await signOut(authInstance);
  if (typeof window !== 'undefined') {
    localStorage.removeItem('brewpluse::active_user');
  }
}

/**
 * Subscribe to Auth State Changes
 */
export function onAuthChange(callback: (user: User | null) => void) {
  const authInstance = auth || getFirebaseAuth();
  if (!authInstance) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(authInstance, callback);
}
