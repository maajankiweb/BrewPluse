export interface DbStore {
  id: string;
  name: string;
  slug: string;
  phone?: string;
  email: string;
  address?: string;
  gstin?: string;
  fssai_license?: string;
  upi_vpa?: string;
  currency: string;
  tax_rate: number;
  is_active: boolean;
  created_at: string;
}

export interface DbStaffUser {
  id: string;
  store_id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'owner' | 'manager' | 'cashier' | 'barista' | 'waiter';
  pin_hash?: string;
  is_active: boolean;
  last_login_at?: string;
}

export interface DbMenuItem {
  id: string;
  store_id: string;
  category_id?: string;
  name: string;
  description?: string;
  price: number;
  is_veg: boolean;
  in_stock: boolean;
  image_url?: string;
  preparation_time_mins: number;
}

export interface DbDiningTable {
  id: string;
  store_id: string;
  table_number: string;
  zone: string;
  capacity: number;
  qr_token: string;
  status: 'vacant' | 'occupied' | 'reserved' | 'cleaning';
  active_order_id?: string;
}

export interface DbOrder {
  id: string;
  store_id: string;
  order_number: string;
  table_id?: string;
  table_number?: string;
  order_type: 'dine_in' | 'takeaway' | 'delivery';
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  payment_mode: 'UPI' | 'Cash' | 'Card' | 'Pending';
  payment_status: 'pending' | 'paid' | 'refunded';
  customer_name?: string;
  customer_phone?: string;
  staff_id?: string;
  notes?: string;
  created_at: string;
}

export interface DbUsageWallet {
  id: string;
  store_id: string;
  balance: number;
  lifetime_orders_processed: number;
  last_deducted_at?: string;
}
