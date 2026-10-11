# ☕ BrewPluse — The Complete Cafe & Restaurant Operating System

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Capacitor](https://img.shields.io/badge/Capacitor-Android-119EFF?style=for-the-badge&logo=capacitor)](https://capacitorjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-green?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Admin%20%26%20Firestore-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Razorpay](https://img.shields.io/badge/Razorpay-Payment%20Gateway-02042B?style=for-the-badge&logo=razorpay)](https://razorpay.com/)

> **BrewPluse** is a modern, all-in-one cafe management platform, POS counter billing system, contactless QR table ordering engine, and Kitchen Display System (KDS). Built as a full-stack Next.js web application paired with an Android mobile app powered by Capacitor.

---

## 🌟 Key Highlights & Modules

### 1. ⚡ Smart POS Counter Billing (`/dashboard/[storeSlug]/pos`)
- **Fast Keyboard & Touch Workflow**: Instant item search, category filters, and quick add.
- **Dine-in, Takeaway & Delivery Modes**: Table assignment or customer contact tagging.
- **Split Bills & Flexible Payments**: Supports Cash, Card, UPI, and Split Tender.
- **Kitchen Order Ticket (KOT)**: Generates and prints KOT tickets directly to thermal kitchen printers.
- **58mm / 80mm ESC/POS Thermal Printing**: Instant thermal receipts with custom cafe branding.

### 2. 📲 Public Customer QR Table Ordering (`/m/[storeSlug]`)
- **App-Free Web Menu**: Customers scan table QR stickers to immediately view the interactive digital menu on their phone browser without downloading an app.
- **Live Cart & Search**: Search items, filter by categories (Coffee, Food, Desserts, Tea), and select customizations.
- **Promo Codes & Discounts**: Instant coupon validation (e.g. `WELCOME50`, `BREW50`).
- **AI 5★ Google Review Booster**: Smart review generator with one-click copy and Google Maps redirection.

### 3. 💳 Razorpay Online Payment Integration
- **Direct UPI & Card Collections**: Seamless in-drawer checkout supporting Google Pay, PhonePe, Paytm, Debit/Credit Cards, and Net Banking.
- **Cryptographic Signature Verification**: HMAC-SHA256 verification protects against spoofed or incomplete payments.
- **Real-Time Payment Status Sync**: Automatically updates order status to `paid` and marks invoices across MongoDB and Firestore.
- **Local Dev / Test Fallback**: Graceful mock mode allows full checkout flow testing even before production keys are configured.

### 4. 🍳 Kitchen Display System — KDS (`/dashboard/[storeSlug]/kds`)
- **Real-Time Order Kanban**: Categorizes incoming tickets into *Received*, *Preparing*, and *Ready*.
- **Visual Timers & Alerts**: Color-coded elapsed time badges with audio cues for incoming kitchen orders.
- **Live Sync**: Syncs with both POS orders and customer QR orders simultaneously.

### 5. 🪑 Dynamic Table Management & QR Generator (`/dashboard/[storeSlug]/tables`)
- **Visual Floor Layout**: Manage tables, section allocation, and seating capacities.
- **Printable Table QR Stickers**: One-click SVG/PNG high-resolution QR sticker generator with custom store branding and table numbers for printing and acrylic stands.

### 6. 🤖 AI Menu Digitization & Brewie Copilot
- **Paper Menu OCR to Digital Menu**: Upload a smartphone photo of physical paper menus; Google Gemini Vision / NVIDIA Nemotron auto-extracts categories, items, and pricing into the database.
- **Brewie AI Business Assistant**: Natural language insights for sales forecasting, top-performing dishes, and stock reordering.

### 7. 🔄 Real-Time Dual Database Architecture
- **MongoDB + Firebase Firestore**: Zero-data-loss architecture. Orders, products, and customer profiles are simultaneously synced to MongoDB for relational analytics and Firebase Firestore for instant live listeners across Android and Web.

### 8. 📱 Cross-Platform Android App (Capacitor)
- Native Android build ready under [`android/`](file:///d:/BrewPluse/android) with offline asset caching and hardware printer support.

---

## 🏗️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Actions, Route Handlers) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Lucide Icons |
| **Databases** | MongoDB (Mongoose) + Firebase Firestore & Auth |
| **Payments** | Razorpay Node SDK & Checkout JS |
| **Mobile Native** | Capacitor 7 (Android) |
| **AI Vision** | Google Gemini API / NVIDIA Nemotron |
| **Printing** | ESC/POS Thermal Printing & Web Print API |

---

## 📁 Project Structure

```text
BrewPluse/
├── android/                   # Native Android studio project (Capacitor)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── menu/          # Menu CRUD & AI OCR scanner
│   │   │   ├── orders/        # Orders creation & status updates
│   │   │   ├── payments/
│   │   │   │   └── razorpay/  # Order creation & signature verification
│   │   │   └── tables/        # Table layout endpoints
│   │   ├── dashboard/         # Owner / Manager POS, KDS & analytics
│   │   ├── demo/              # Interactive interactive walkthrough
│   │   └── m/[storeSlug]/     # Customer Web QR table ordering page
│   ├── components/            # Reusable UI components & layouts
│   └── lib/
│       ├── firebaseAdmin.ts   # Firebase Firestore & Auth synchronization
│       ├── mongodb.ts         # MongoDB connection singleton
│       ├── razorpay.ts        # Razorpay helper & cryptographic verifier
│       └── models/            # Mongoose schemas (Order, Menu, User, Table)
└── .env.local                 # Environment secrets
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.x or 20.x
- MongoDB (Local or Atlas URI)
- (Optional) Razorpay Account for live payment processing
- (Optional) Firebase project for Firestore dual-sync

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/maajankiweb/BrewPluse.git
cd BrewPluse

# Install dependencies
npm install
```

### 3. Environment Configuration

Create or update `.env.local` in the root directory:

```env
# MongoDB Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/brewpluse

# Razorpay Payment Gateway
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx

# Firebase Admin SDK (Optional for live sync)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# AI Digitization (Optional)
GEMINI_API_KEY=your_gemini_api_key
NVIDIA_API_KEY=nvapi-your_nvidia_key
```

### 4. Running the Web Application

```bash
# Start Next.js development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.
- Owner Dashboard: `http://localhost:3000/dashboard/brewpluse`
- POS Billing: `http://localhost:3000/dashboard/brewpluse/pos`
- Kitchen KDS: `http://localhost:3000/dashboard/brewpluse/kds`
- Customer QR Ordering: `http://localhost:3000/m/brewpluse?table=Table%201`

### 5. Building & Syncing Android App

```bash
# Build production bundle
npm run build

# Sync assets to Android
npx cap sync android

# Open Android project in Android Studio
npx cap open android
```

---

## 🛡️ License & Credits

Built with ❤️ for modern cafes, restaurants, food trucks, and cloud kitchens by **BrewPluse**.
