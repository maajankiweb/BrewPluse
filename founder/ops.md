# BrewPluse Day-One Operations & Systems Manual
*Head of Operations & Logistics*

## 1. Core Operating Stack & Infrastructure
- **Web Frontend & API**: Next.js 15 (App Router, Server Actions, Standalone Node runtime on Edge/Cloud).
- **Mobile Runtime**: Capacitor 8.5 with native Android APK container (`com.brewpluse.pos`).
- **Database & Sync**: Firestore / MongoDB with real-time websocket and server-sent event (SSE) updates.
- **Payments Gateway**: Unified UPI QR Generator + Razorpay SDK for cards/netbanking.
- **Printing Protocol**: Standard ESC/POS Bluetooth & TCP/Network direct socket printing (58mm & 80mm thermal paper).

---

## 2. Hardware Supply Chain & Sourcing
1. **Custom Acrylic Matte QR Table Stands**:
   - Material: 3mm cast acrylic with UV digital scratch-proof print and embedded NTAG213/215 NFC chips.
   - Sourcing cost: ₹65–₹85 per unit (bulk order of 250 units from local laser engravers in Surat/Delhi).
   - Retail price to cafe: ₹199–₹249 per unit (65% margin).
2. **58mm Thermal Bluetooth Receipt Printers**:
   - OEM Brand: Everycom / Xprinter direct importer wholesale.
   - Sourcing cost: ₹1,450 per unit.
   - Retail price to cafe: ₹2,499 per unit (42% margin).

---

## 3. Daily Cafe Operating SOPs (Built into Software)

### Opening Routine (7:30 AM):
1. Cashier turns on tablet, opens BrewPluse POS, enters cashier 4-digit PIN.
2. Enter opening float cash balance (e.g. ₹2,000 in cash drawer).
3. Tap *"Test Printer Connection"* &rarr; prints a 2-inch verification slip with date, time, and paper level.
4. Toggle menu item availability for the day (e.g. mark Fresh Avocados as In Stock).

### Mid-Day Shift (12:00 PM – 4:00 PM):
1. Monitor live KDS station. Incoming table orders automatically chime and print kitchen tickets.
2. Live orders status updates from Placed &rarr; Preparing &rarr; Ready &rarr; Served.
3. Split-bill and cash receipt printing executed in under 3 seconds per customer.

### Closing Reconciliation (11:00 PM):
1. Tap *"Day End Z-Report"* &rarr; automatically aggregates:
   - Total Cash Collected
   - Total UPI / QR Collections
   - Total Card Payments
   - Total Platform Convenience Fees
   - Net Tax/GST Summary
2. 1-Click WhatsApp export of Z-Report directly to the cafe owner's mobile phone.

---

## 4. Risk Register & Mitigation Strategy

| Risk Event | Severity | Probability | Built-In Mitigation Strategy |
| :--- | :---: | :---: | :--- |
| **Cafe WiFi drops during rush** | High | Medium | **Offline-First Cash Mode**: Transactions save to local IndexedDB and sync to cloud immediately once 4G/WiFi reconnects. |
| **Customer places fake order from outside cafe** | Medium | Low | **GPS Geofencing Security**: Patrons must be within 100 meters of cafe latitude/longitude to submit QR table orders. |
| **Thermal printer Bluetooth drops** | Low | Medium | Automatic auto-reconnect retry daemon with visual status indicator on top POS bar. |
