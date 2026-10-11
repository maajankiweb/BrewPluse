/**
 * BrewPulse IndexedDB Client-Side Offline Database
 * Provides true offline persistence for Cashier POS workflow,
 * Order buffering, and automatic synchronization when connectivity resumes.
 */

const DB_NAME = 'BrewPulse_POS_DB';
const DB_VERSION = 1;

export interface OfflineOrder {
  id: string;
  orderNumber: string;
  table: string;
  items: any[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMode: 'UPI' | 'Cash' | 'Card';
  status: 'preparing' | 'ready' | 'completed' | 'cancelled';
  createdAt: string;
  synced?: boolean;
  payTiming?: 'first' | 'last';
  customerName?: string;
  customerPhone?: string;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB is not supported in this environment.'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // 1. Store for all local orders
      if (!db.objectStoreNames.contains('orders')) {
        const orderStore = db.createObjectStore('orders', { keyPath: 'id' });
        orderStore.createIndex('orderNumber', 'orderNumber', { unique: false });
        orderStore.createIndex('createdAt', 'createdAt', { unique: false });
      }

      // 2. Store for active POS Cart state
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'key' });
      }

      // 3. Queue for orders placed offline waiting for cloud sync
      if (!db.objectStoreNames.contains('offlineQueue')) {
        const queueStore = db.createObjectStore('offlineQueue', { keyPath: 'id' });
        queueStore.createIndex('synced', 'synced', { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save an order to IndexedDB
 */
export async function saveOrderToIndexedDB(order: OfflineOrder): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('orders', 'readwrite');
      const store = tx.objectStore('orders');
      store.put(order);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to save order:', err);
  }
}

/**
 * Get all orders persisted in IndexedDB
 */
export async function getOrdersFromIndexedDB(): Promise<OfflineOrder[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('orders', 'readonly');
      const store = tx.objectStore('orders');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to read orders:', err);
    return [];
  }
}

/**
 * Persist cashier active cart into IndexedDB
 */
export async function saveCartToIndexedDB(cartItems: any[]): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cart', 'readwrite');
      const store = tx.objectStore('cart');
      store.put({ key: 'active_cart', items: cartItems, updatedAt: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to save cart:', err);
  }
}

/**
 * Retrieve saved cart from IndexedDB
 */
export async function getCartFromIndexedDB(): Promise<any[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('cart', 'readonly');
      const store = tx.objectStore('cart');
      const request = store.get('active_cart');
      request.onsuccess = () => resolve(request.result?.items || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to read cart:', err);
    return [];
  }
}

/**
 * Add an offline-created order to the sync queue
 */
export async function queueOfflineOrder(order: OfflineOrder): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('offlineQueue', 'readwrite');
      const store = tx.objectStore('offlineQueue');
      store.put({ ...order, queuedAt: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to queue offline order:', err);
  }
}

/**
 * Get all queued offline orders waiting for upload
 */
export async function getOfflineQueue(): Promise<OfflineOrder[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('offlineQueue', 'readonly');
      const store = tx.objectStore('offlineQueue');
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to read offline queue:', err);
    return [];
  }
}

/**
 * Clear queued offline order once synced to backend
 */
export async function clearOfflineQueueItem(orderId: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('offlineQueue', 'readwrite');
      const store = tx.objectStore('offlineQueue');
      store.delete(orderId);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('[IndexedDB] Failed to delete from offline queue:', err);
  }
}
