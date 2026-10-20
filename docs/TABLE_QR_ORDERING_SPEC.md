# Table QR Ordering + Pay-Now / Pay-Later — Implementation Spec (for AI Coding Agent)

**Product:** BrewPluse (Next.js App Router, MongoDB/Mongoose, Firebase/Firestore, Razorpay, Tailwind)
**Feature:** Guest scans a table QR → sees the menu → orders → order reaches Admin Dashboard + Kitchen → guest pays **now (online)** or **later (counter: cash / UPI QR)**.

---

## 0. Instructions to the Agent (read first)

1. **Inspect the repo before coding.** Find the existing orders, menu, store, auth, Razorpay and Firestore code (e.g. `src/app/api/orders`, `src/app/api/payments/razorpay`, `src/lib/razorpay.ts`, auth service, `firestore.rules`). Reuse conventions, models and UI components. Do not rewrite working modules; extend them.
2. Work on a feature branch. Small commits per phase (Section 12). Run lint + type-check + tests after every phase.
3. **Never trust the client** for prices, totals, store id, or payment status (Section 9).
4. No secrets in code. Add new env vars to `.env.example` only.
5. If something in this spec conflicts with the existing code, keep the existing public API stable, add new routes under `/api/public/*` and `/api/admin/*`, and note the decision in `docs/DECISIONS.md`.
6. Every new endpoint needs: input validation (zod), auth/role check where applicable, rate limit where public, and at least one test.

---

## 1. End-to-End Flow

```
[Printed QR on table]  →  https://<domain>/t/<tableToken>
        │
        ▼
Customer page: store + table resolved on SERVER from token
        │  (menu, availability, payment policy)
        ▼
Customer builds cart → taps "Place Order"
        │
        ├── Choice A: PAY NOW (online, Razorpay UPI/Card)
        │       order.status = pending_payment (hidden from kitchen)
        │       → Razorpay checkout → webhook "captured"
        │       → order.status = placed  → Kitchen + Admin see it
        │
        └── Choice B: PAY LATER (default)
                order.status = placed  → Kitchen + Admin see it immediately
                payment stays "unpaid" on the table's open tab
                (guest can order more items → same tab)
                        │
                        ▼ (after eating) guest taps "Request Bill / Pay"
                        ├── Pay online → Razorpay for whole tab
                        └── Pay at counter → "Bill requested" flag on Admin
                                cashier collects CASH or shows UPI QR
                                cashier taps "Mark Paid" (cash | upi_manual | card_pos)
                                        ▼
                                Table session closed → table = vacant
```

**Kitchen flow:** `placed → accepted → preparing → ready → served` (chef/barista bumps each step; item-level optional).

---

## 2. Key Concepts

| Concept | Meaning |
|---|---|
| **Table token** | Unguessable random string (12+ chars, URL-safe) stored per table. QR encodes `/t/<token>`. Regenerable (invalidates old QR). Never put `storeId`/table number alone in the URL. |
| **Table session** | One "dining visit" at a table. Groups multiple orders into one bill. Opened on first order, closed when paid/cleared. |
| **Order** | One submission from the cart. Belongs to a table session. Price snapshot at placement. |
| **Payment** | One or more payment records against a table session (online, cash, UPI manual, card at POS). |
| **Payment policy** (store setting) | `pay_first` \| `pay_later` \| `customer_choice` (**default**). |

---

## 3. Data Model (Mongoose; adapt names to existing schemas)

```ts
// Table
{
  _id, storeId, number: string, label?: string,          // "T4", "Terrace 2"
  token: string,                                          // unique, indexed, random
  isActive: boolean, createdAt, updatedAt
}
// index: { storeId:1, number:1 } unique; { token:1 } unique

// TableSession
{
  _id, storeId, tableId,
  status: 'open' | 'bill_requested' | 'paid' | 'closed',
  billRequestedAt?, closedAt?,
  customer?: { name?: string, phone?: string },
  currency: 'INR',
  totals: { subtotal, tax, serviceCharge, platformFee, discount, roundOff, grandTotal, paid, due },
  createdAt, updatedAt
}
// index: { storeId:1, tableId:1, status:1 }; at most ONE open session per table (enforce in code + partial unique index)

// Order
{
  _id, storeId, tableId, sessionId, orderNumber: string,  // per-store sequence e.g. "A-1042"
  source: 'qr_table' | 'pos' | 'waiter',
  items: [{
    menuItemId, name, qty, unitPrice, variant?: {id,name,price},
    addons?: [{id,name,price}], note?: string,
    taxPercent, lineTotal,
    status: 'queued'|'preparing'|'ready'|'served'|'cancelled'   // optional item-level KDS
  }],
  status: 'pending_payment'|'placed'|'accepted'|'preparing'|'ready'|'served'|'cancelled',
  paymentIntent: 'pay_now' | 'pay_later',
  notes?: string, idempotencyKey: string (unique per session),
  timestamps: { placedAt, acceptedAt, readyAt, servedAt },
  createdAt, updatedAt
}

// Payment
{
  _id, storeId, sessionId, orderId?: ObjectId,           // orderId set for pay-now single order
  mode: 'online' | 'cash' | 'upi_manual' | 'card_pos',
  amount: number, currency: 'INR',
  status: 'created' | 'captured' | 'failed' | 'refunded',
  razorpay?: { orderId, paymentId, signature? },
  receivedBy?: userId,                                    // staff who confirmed offline payment
  reference?: string,                                     // UPI txn id typed by cashier (optional)
  createdAt
}
// unique sparse index on razorpay.paymentId (idempotency)

// Store settings (extend existing)
{
  paymentPolicy: 'pay_first'|'pay_later'|'customer_choice',
  upiId?: string, upiName?: string,                       // for "UPI QR at counter"
  taxInclusive: boolean, serviceChargePercent: number,
  platformFeeMode: 'customer'|'cafe',                     // keep existing ₹1 logic
  acceptingOrders: boolean
}
```

**Money rules:** store amounts as integers in **paise** (or use a single consistent decimal helper). Round once, at the end, with a documented `roundOff` line.

---

## 4. Order & Payment State Machines

### Order status
```
pending_payment ──(payment captured)──► placed ──► accepted ──► preparing ──► ready ──► served
        │                                 │
        └──(timeout 15 min / failed)──► cancelled   (also: staff cancel from placed/accepted)
```
- `pay_later` orders are created directly as `placed`.
- `pending_payment` orders are **never** returned to Kitchen/Admin live board (only to the creator session). A cron/TTL job cancels them after 15 minutes.

### Session status
```
open ──(guest taps Request Bill)──► bill_requested ──(fully paid)──► paid ──(staff clear/auto 5 min)──► closed
open ──(fully paid online without bill request)──► paid
```
- `due = grandTotal - sum(captured payments)`. Session becomes `paid` only when `due <= 0`.
- A new order on a `paid`/`closed` session creates a **new** session.

### Payment rules
- Online payment amount is **always computed on the server** from the current session/order totals.
- Offline payment is recorded **only by authenticated staff** (cash / upi_manual / card_pos).
- Once a session is `paid`, further payment attempts are rejected (HTTP 409).

---

## 5. API Specification

All responses JSON. Errors: `{ error: { code, message } }` with correct HTTP status. Use zod for validation.

### 5.1 Public (customer) endpoints — no login, protected by table token + guest session + rate limit

| Method & Path | Purpose |
|---|---|
| `GET /api/public/table/:token` | Resolve token → `{store:{name,logo,currency,acceptingOrders,paymentPolicy,platformFeeMode}, table:{number}, activeSession?:{id,status,totals,orders[]}}`. 404 if token invalid/inactive. Sets a signed **guest-session cookie** (HttpOnly, SameSite=Lax) bound to `{tableId, sessionId?}`. |
| `GET /api/public/table/:token/menu` | Categories + items with `isAvailable` (86 toggle), variants, addons, dietary tags. Cache briefly (≤30s); revalidate on menu change. |
| `POST /api/public/orders` | Body: `{ tableToken, idempotencyKey, items:[{menuItemId, qty, variantId?, addonIds?, note?}], customer?:{name?,phone?}, paymentIntent:'pay_now'\|'pay_later', notes? }`. **Server**: validate token, store open, items available, qty 1–20, max 50 lines; load prices from DB; compute totals; create/attach open TableSession; create Order. If `pay_now`: create Razorpay order and return `{order, session, razorpay:{orderId,keyId,amount,currency}}`; else return `{order, session}`. Policy check: reject `pay_now` if store policy is `pay_later`, reject `pay_later` if `pay_first` (422). Idempotent on `idempotencyKey`. |
| `GET /api/public/session/:id` | Live tab for the guest (orders with statuses, totals, due). Requires matching guest-session cookie. Customer UI polls every 5 s (or uses SSE). |
| `POST /api/public/session/:id/request-bill` | Body `{ method:'online'\|'counter' }`. Sets `status='bill_requested'`, `billRequestedAt`. For `counter`: raises a dashboard alert ("Table 4 wants to pay at counter"). For `online`: also returns Razorpay order for `due`. |
| `POST /api/public/session/:id/pay-online` | Creates Razorpay order for current `due` (used for pay-later → pay online, or retry). Returns Razorpay checkout params. |
| `POST /api/public/payments/razorpay/verify` | Client success callback `{razorpay_order_id, razorpay_payment_id, razorpay_signature}`. Verify HMAC (see §9). This is **UX confirmation only**; final truth = webhook (idempotent, same handler). |
| `GET /api/public/upi-qr/:sessionId` | For "pay at counter by UPI": returns UPI deep link `upi://pay?pa=<upiId>&pn=<name>&am=<due>&cu=INR&tn=<Table-4-Order>` and a rendered QR. Display-only; payment still needs cashier confirmation. |

### 5.2 Webhook
`POST /api/payments/razorpay/webhook`
- Read the **raw body**; verify `X-Razorpay-Signature` with `RAZORPAY_WEBHOOK_SECRET` using `crypto.timingSafeEqual`. Reject if secret missing (in every environment except an explicit `NODE_ENV=test` mock).
- Handle `payment.captured` / `order.paid` → mark Payment `captured` (idempotent on `razorpay.paymentId`), update session totals, set pay-now Order `pending_payment → placed`, session `paid` if `due<=0`, push realtime event.
- Handle `payment.failed` → Payment `failed`; keep order `pending_payment` until TTL.
- Always respond 200 quickly after persisting; do heavy work async.

### 5.3 Staff endpoints — require session auth + role + `storeId` taken from the session (never from query/body)

| Method & Path | Roles | Purpose |
|---|---|---|
| `GET /api/admin/orders?status=&from=&to=` | owner, manager, cashier | Live + historical orders for own store. |
| `PATCH /api/admin/orders/:id/status` | owner, manager, cashier, chef | Move through allowed transitions only (validate state machine). |
| `GET /api/kitchen/orders` | chef, barista, manager, owner | Only `placed/accepted/preparing/ready`, oldest first, with elapsed time. |
| `GET /api/admin/tables` | owner, manager, cashier | Tables with current session status, due amount, bill-requested flag. |
| `GET /api/admin/table-sessions/:id` | same | Full bill: orders, totals, payments. |
| `POST /api/admin/table-sessions/:id/payments` | owner, manager, cashier | Body `{ mode:'cash'\|'upi_manual'\|'card_pos', amount, reference? }`. Records payment, updates `due`, closes session when settled. Idempotency key header required. |
| `POST /api/admin/table-sessions/:id/clear` | cashier+ | Force-close (after payment) → table vacant. |
| `POST /api/admin/orders/:id/cancel` | manager+ | Cancel with reason; if online-paid → trigger Razorpay refund flow (manual approve). |
| `CRUD /api/admin/tables` | owner, manager | Create/rename/disable tables. |
| `POST /api/admin/tables/:id/regenerate-token` | owner, manager | New token; old QR stops working. |
| `GET /api/admin/tables/:id/qr` and `/api/admin/tables/qr-sheet` | owner, manager | PNG/PDF of QR(s) with table number + store name for printing. |

### 5.4 Realtime
- Source of truth = MongoDB. After every order/session/payment change the server writes a **minimal mirror** to Firestore `liveOrders/{orderId}` / `liveTables/{tableId}` (fields: storeId, status, tableNumber, itemsSummary, updatedAt) using Admin SDK.
- Admin dashboard and Kitchen subscribe with Firestore `onSnapshot` filtered by `storeId` (requires staff Firebase custom token with `storeSlug`/`role` claims; see `firestore.rules`).
- Customer page does **not** use Firestore; it polls `GET /api/public/session/:id` (5 s, with ETag/`If-None-Match`).
- Fallback: if Firestore is unavailable, staff screens poll `GET /api/kitchen/orders` every 5 s.
- Staff screens play an audio chime on new `placed` orders and on `bill_requested`.

---

## 6. Pricing & Totals (server-side only)

1. Fetch items by id **scoped to the table's store**. Reject unknown/unavailable items (409 with list of unavailable ids).
2. `unitPrice = variant.price ?? item.price` + sum(addon prices). `line = unitPrice × qty`.
3. Tax per item (`taxPercent`); respect `taxInclusive`.
4. `serviceChargePercent` (optional) applied on subtotal.
5. Platform fee (₹1 logic): if store `platformFeeMode='customer'` add to the **online** payment total and show a separate line before payment; if `'cafe'`, do not charge the guest. Keep existing behaviour; do not change fee rules unless asked.
6. Coupons/loyalty are out of scope for this spec (leave hooks: `discount` field = 0).
7. Return a full breakdown to the client; the client only displays it.

---

## 7. Customer UI (route `app/t/[token]/page.tsx` and children; mobile-first, no login, no app install)

**Screens / components**
1. **Landing/Menu:** store name + "Table 4" badge; sticky category tabs; search; item cards (photo, price, veg/non-veg dot, "Add"); out-of-stock items greyed with "Unavailable".
2. **Item sheet:** variants (radio), add-ons (checkbox), note, qty stepper.
3. **Cart drawer:** line items, edit/remove, totals breakdown, optional name/phone, payment choice (when policy = `customer_choice`): **"Pay now (online)"** or **"Pay later (at the end)"**; primary button "Place Order".
4. **Order confirmation / tracker:** order number, live status steps (Received → Preparing → Ready → Served), "Add more items" (keeps same tab).
5. **My Tab / Bill:** all orders in the session, totals, amount due, buttons: **"Pay online"** and **"Pay at counter"** (shows UPI QR + "Please show this to the cashier" and bill number). After online success → receipt screen (downloadable/shareable link).
6. **States:** loading skeletons; empty cart; store closed ("Not accepting orders right now"); invalid/expired QR; network error with retry; payment failed with "Try again / Pay at counter".

**Behaviour rules**
- Cart persists in `sessionStorage` per table token; clears after successful order.
- Generate `idempotencyKey` (uuid) when the user taps Place Order; reuse on retry; disable the button while pending.
- Support both Hindi/English labels if i18n exists in the repo (do not add a new i18n framework).
- Accessibility: tap targets ≥ 44px, readable contrast, works at 360px width.

---

## 8. Admin Dashboard & Kitchen UI

**Admin (cashier/manager)**
- **Live Orders board:** columns `New (placed)`, `Preparing`, `Ready`, `Served`; each card: order no., table, items, elapsed time, payment badge (`Paid online` / `Unpaid – pay later` / `Bill requested`).
- **Tables view:** grid of tables colour-coded: vacant (grey), occupied (blue), bill requested (amber, pulsing), paid (green). Click → table detail.
- **Table detail / Bill:** orders list, totals, payments list, buttons: **Mark Paid (Cash)**, **Mark Paid (UPI)** (with optional reference), **Mark Paid (Card)**, **Print Bill** (thermal print existing util), **Clear Table**.
- **Alerts:** toast + chime on new order and on "wants to pay at counter".
- **Tables manager:** add/rename/disable tables, regenerate token, download QR sheet (PDF with 4 QR per A4, large table number).
- **Settings:** payment policy, UPI ID, service charge, accepting orders toggle.

**Kitchen (chef/barista) screen**
- Full-screen dark layout, large type. Tickets sorted oldest-first. Colour by age: green (<5 min), amber (5–10), red (>10) — thresholds configurable.
- Buttons: **Accept → Start → Ready** (single large tap targets). Optional per-item bump.
- Shows table number, notes (bold), variants/add-ons. Never shows prices or payment info.
- Audio chime on new ticket; "Recall" last bumped ticket.

---

## 9. Security & Abuse Prevention (mandatory)

1. **Authorization:** all `/api/admin/*` and `/api/kitchen/*` routes verify session/JWT, role, and use `storeId` **from the session**. Add a shared `requireStaff(roles[])` helper and apply to every route (the current code base has routes without auth — fix any you touch).
2. **Customer trust boundary:** `storeId`, prices, totals, `paymentStatus` are never accepted from the client. Resolve store/table only from `tableToken`.
3. **Razorpay:** keep `RAZORPAY_KEY_SECRET` and `RAZORPAY_WEBHOOK_SECRET` server-only. If a secret is missing outside `NODE_ENV=test`, **fail closed** (throw / 500) — never accept an unverified signature. Compare signatures with `crypto.timingSafeEqual`. Verify `amount` and `order_id` in the webhook match what the server created.
4. **Idempotency:** unique indexes on `Order.idempotencyKey` (per session) and `Payment.razorpay.paymentId`; webhook handler must be safe to run multiple times.
5. **Rate limiting:** per IP + per table token for `POST /api/public/*` (e.g. 10 orders / 10 min / table, 60 reads / min / IP). Return 429.
6. **Abuse limits:** max 50 lines, qty ≤ 20, max order value (configurable, default ₹10,000), name ≤ 80 chars, phone validated, notes ≤ 300 chars; sanitize on output (React escapes by default—never use `dangerouslySetInnerHTML`).
7. **Optional anti-prank (phase 5):** geofence — browser geolocation vs store lat/lng radius (configurable, with graceful fallback when permission denied). Do not hard-block if location is unavailable unless store enables strict mode.
8. **Cookies:** guest-session cookie HttpOnly, Secure, SameSite=Lax, 12 h expiry.
9. **Firestore:** clients never write orders directly. Mirror writes are server-only. Rules must restrict reads to staff of the same store (see `firestore.rules`).
10. **Logging/PII:** don't log full phone numbers or payment payloads; keep audit log of staff payment confirmations (`receivedBy`, time, amount).
11. **Refunds:** cancelling an online-paid order creates a `refund_pending` record for manager approval; call Razorpay refund API only from the server.

---

## 10. Edge Cases (must be handled and tested)

| Case | Expected behaviour |
|---|---|
| Double tap / network retry on Place Order | Same `idempotencyKey` → return existing order; no duplicate. |
| Item becomes unavailable after adding to cart | Server returns 409 with unavailable ids; UI highlights and lets guest remove. |
| Store closed / `acceptingOrders=false` | Menu viewable, ordering disabled with message. |
| Two phones at the same table | Both attach to the same open session; both see the same tab. |
| Guest pays online but closes browser before callback | Webhook completes the payment and releases the order. |
| Online payment fails | Order stays `pending_payment`; guest can retry or switch to pay-later (convert intent, status → `placed`). Auto-cancel after 15 min. |
| Cashier marks paid (cash) while guest opens online payment | Server checks `due` at capture time; if session already `paid`, reject/auto-refund flag and show message. |
| Partial payments (split bill) | Allowed: multiple Payment rows; session closes only when `due<=0`. |
| Price changed by owner mid-session | Existing orders keep their snapshot price; new orders use new price. |
| QR token regenerated | Old QR returns "This QR is no longer valid, please ask staff." |
| Chef marks `ready` / `served` out of order | State machine rejects invalid transitions (409). |
| Staff offline / Firestore down | Fallback polling; show "Reconnecting…" banner. |
| Cancelled item after payment | Totals recalculated; refund pending flagged to manager. |
| Table session left open for hours | Admin sees "stale session" badge after 3 h; manager can force-close. |

---

## 11. Environment Variables (add to `.env.example`, no real values)

```
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
GUEST_SESSION_SECRET=            # random 32+ bytes, no default fallback
TABLE_TOKEN_BYTES=9              # 9 bytes → 12 chars base64url
PENDING_PAYMENT_TTL_MINUTES=15
MAX_ORDER_VALUE_INR=10000
```
The app must refuse to start in production if `GUEST_SESSION_SECRET`, `RAZORPAY_KEY_SECRET` or `RAZORPAY_WEBHOOK_SECRET` is missing.

---

## 12. Implementation Phases & Acceptance Criteria

**Phase 1 — Tables & QR**
- Table model, CRUD API, token generation/regeneration, QR PNG/PDF export.
- ✅ Admin can create 10 tables and download a printable QR sheet; scanning opens `/t/<token>`; invalid token shows friendly error.

**Phase 2 — Customer menu & pay-later ordering**
- `GET table/menu` endpoints, customer menu UI, cart, `POST /api/public/orders` (`pay_later`), server-side pricing, TableSession creation, idempotency, rate limit.
- ✅ Guest can order from phone; order exists in DB as `placed`; tampering with price/store in the request has no effect (test).

**Phase 3 — Admin Dashboard + Kitchen**
- Live orders board, kitchen screen, status transitions, Firestore mirror + realtime listeners (with polling fallback), chime alerts.
- ✅ New order appears on both screens within 2 seconds; chef can move it to `served`; guest tracker updates within 10 seconds.

**Phase 4 — Payments**
- 4a Pay-now online: Razorpay order, checkout, webhook, `pending_payment → placed`.
- 4b Pay-later online: `request-bill` / `pay-online` for session `due`.
- 4c Pay-at-counter: bill-requested alert, UPI deep-link/QR display, staff "Mark Paid" (cash/upi_manual/card_pos), table clear.
- ✅ Using Razorpay **test mode**: pay-now order reaches kitchen only after webhook; duplicate webhook doesn't double-count; cashier can settle a table in ≤ 3 taps; session closes at `due=0`.

**Phase 5 — Hardening**
- Geofence (optional), refund-pending flow, stale-session badge, audit log, i18n labels, accessibility pass.
- ✅ All items in §10 covered by tests.

---

## 13. Testing Checklist

- **Unit:** price/tax calculator, state-machine transitions, signature verification (valid/invalid/missing secret), idempotency.
- **Integration (API):** create order (pay_later / pay_now), webhook replay, unauthorized access to `/api/admin/*` (must be 401/403), cross-store access attempt (must fail), rate limit 429.
- **E2E (Playwright):** scan flow (open `/t/<token>` on mobile viewport) → order → appears in kitchen → bump to served → request bill → cashier marks paid → table vacant. Plus: online test payment path with Razorpay test credentials.
- **Manual:** low network, two phones one table, printer receipt, QR print legibility at 5×5 cm.

---

## 14. Definition of Done

- All phase acceptance criteria pass; lint, type-check and tests are green.
- No endpoint in this feature is reachable without the required auth/rate-limit.
- No unverified-signature code path exists in production.
- `.env.example`, README section "Table QR ordering" and `docs/DECISIONS.md` updated.
- Demo script recorded in README: create table → print QR → order → kitchen → pay (online and counter).

---

## 15. Assumptions (change if your business rules differ)

1. Default policy is `customer_choice`; stores can lock it to `pay_first` or `pay_later`.
2. Pay-later orders go to the kitchen **immediately** (trust-based dining); pay-now orders go only after payment capture.
3. Offline UPI QR payments are **manually confirmed** by the cashier (no automatic verification). A later upgrade can use Razorpay dynamic UPI QR for auto-confirmation.
4. One open table session per table at a time.
5. Money is stored in paise; GST handled per item (`taxPercent`).
