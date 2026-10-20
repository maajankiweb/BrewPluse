# Architectural Decision Records (ADRs) - Table QR Ordering & Pay-Now / Pay-Later

## ADR 1: Money Representation & Server-Side Truth
- **Context:** Financial calculation discrepancies and tampering vulnerability when computing totals on client devices.
- **Decision:** All prices and monetary calculations are strictly computed server-side in **paise** (integers) to prevent IEEE-754 floating point rounding errors. Client-submitted prices are completely ignored and discarded.

## ADR 2: Unified Hybrid Persistence (MongoDB + In-Memory Fallback + Firestore Mirror)
- **Context:** High-throughput cafe environments require sub-second live order synchronization to kitchen and cashier screens, but need full offline resilience and graceful degradation if cloud infrastructure experiences network hiccups.
- **Decision:**
  - MongoDB serves as the persistent system of record.
  - In-memory runtime registries (`runtimeOrders`, `runtimeTableSessions`, `runtimeTables`, `runtimePayments`) ensure continuous operation and fast idempotency checking even if the database is reconnecting.
  - Firestore mirrors tickets to `liveOrders` and `liveTables` collections for real-time reactive UI subscriptions, with automatic polling fallback when Firebase credentials or network are offline.

## ADR 3: State Machine & Kitchen Ticket Privacy Rule
- **Context:** Kitchen display systems (KDS) should optimize chef focus on preparation while protecting customer financial confidentiality.
- **Decision:**
  - Formal transition matrix enforced via `src/lib/orderStateMachine.ts`: `placed` -> `accepted` -> `preparing` -> `ready` -> `served`. Backward jumps and unauthorized state changes return HTTP 409 Conflict.
  - Per Spec Section 8: Kitchen tickets strip all item prices, line totals, and payment modes, displaying only quantities, variant modifiers, customer notes, and elapsed prep time.

## ADR 4: Cryptographic Webhook & Callback Verification
- **Context:** Razorpay payment tampering and replay attacks.
- **Decision:**
  - Client verify callbacks and server webhooks require cryptographic HMAC-SHA256 signature verification executed via `crypto.timingSafeEqual` to prevent timing attacks.
  - Replay idempotency: webhooks and verify callbacks are indexed on `razorpay.paymentId` (unique sparse index) to prevent duplicate balance deductions or double credits.

## ADR 5: Refund Flagging on Paid Order Cancellation
- **Context:** Staff cancelling an item or order that was already paid online.
- **Decision:**
  - Cancelling a paid order transitions `paymentStatus` to `refund_pending` and logs a high-priority audit record for manager review. Real money refunds are never triggered directly by untrusted client actions.
