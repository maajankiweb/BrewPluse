/**
 * Audit Logging Service for Table Operations and Staff Payment Confirmations (Spec Section 9.10)
 */

export interface PaymentAuditEntry {
  id: string;
  storeId: string;
  sessionId: string;
  orderId?: string;
  amountPaise: number;
  method: string;
  receivedBy: {
    staffId?: string;
    email?: string;
    role?: string;
  };
  timestamp: Date;
  action: 'payment_received' | 'table_cleared' | 'order_cancelled' | 'refund_flagged' | 'refund_approved';
  notes?: string;
}

declare global {
  // eslint-disable-next-line no-var
  var auditLogs: PaymentAuditEntry[] | undefined;
}

if (!global.auditLogs) {
  global.auditLogs = [];
}

export function logPaymentAudit(entry: Omit<PaymentAuditEntry, 'id' | 'timestamp'>): PaymentAuditEntry {
  const record: PaymentAuditEntry = {
    ...entry,
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date(),
  };

  if (!global.auditLogs) global.auditLogs = [];
  global.auditLogs.push(record);

  // Keep last 1000 records in memory
  if (global.auditLogs.length > 1000) {
    global.auditLogs.shift();
  }

  return record;
}

export function getAuditLogs(storeId: string): PaymentAuditEntry[] {
  return (global.auditLogs || []).filter((log) => log.storeId === storeId);
}
