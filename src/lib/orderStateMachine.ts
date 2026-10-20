/**
 * Order State Machine Validation per TABLE_QR_ORDERING_SPEC.md Section 4.1
 * 
 * Order status flow:
 * pending_payment -> placed -> accepted -> preparing -> ready -> served -> completed
 * Any of (placed, accepted, preparing) -> cancelled
 */

export type OrderStatus =
  | 'pending_payment'
  | 'placed'
  | 'accepted'
  | 'preparing'
  | 'ready'
  | 'served'
  | 'completed'
  | 'cancelled';

export const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  placed: ['accepted', 'preparing', 'ready', 'cancelled'],
  accepted: ['preparing', 'ready', 'cancelled'],
  preparing: ['ready', 'served', 'cancelled'],
  ready: ['served', 'completed'],
  served: ['completed'],
  pending_payment: ['placed', 'cancelled'],
  completed: [],
  cancelled: [],
};

export function isValidOrderTransition(
  currentStatus: string,
  targetStatus: string
): { valid: boolean; reason?: string } {
  if (currentStatus === targetStatus) {
    return { valid: true };
  }

  const allowed = ALLOWED_TRANSITIONS[currentStatus];
  if (!allowed || !allowed.includes(targetStatus)) {
    return {
      valid: false,
      reason: `Invalid status transition: cannot move order from '${currentStatus}' to '${targetStatus}'.`,
    };
  }

  return { valid: true };
}

/**
 * Determine the next logical status in standard kitchen progression:
 * placed -> accepted -> preparing -> ready -> served
 */
export function getNextLogicalStatus(currentStatus: string): OrderStatus | null {
  switch (currentStatus) {
    case 'placed':
      return 'accepted';
    case 'accepted':
      return 'preparing';
    case 'preparing':
      return 'ready';
    case 'ready':
      return 'served';
    default:
      return null;
  }
}
