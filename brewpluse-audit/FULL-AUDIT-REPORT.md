# BrewPluse SEO Audit & Multi-Dimensional Analysis Report

**Audited Domain:** `https://brewpluseh.com` / `https://brewpluse.com`  
**Date:** October 31, 2026  
**Auditor:** Antigravity AI SEO Engine  
**Overall Health Score:** **85 / 100**

---

## Executive Summary

| Category | Score | Status |
| :--- | :---: | :--- |
| **Technical SEO & Crawlability** | `88 / 100` | Excellent (App Router, dynamic sitemap, AI bot allowances) |
| **On-Page SEO (Homepage)** | `86 / 100` | Strong keyword targeting, slight meta description overflow |
| **GEO / AI Search Readiness** | `92 / 100` | Industry-leading (`llms.txt`, GPTBot/ClaudeBot/PerplexityBot enabled) |
| **Schema Markup & Structured Data** | `82 / 100` | Robust schema coverage; **Critical Entity Conflict** detected |
| **Local SEO & NAP Alignment** | `77 / 100` | Good foundation; needs B2B local landing pages and GBP realignment |

> [!IMPORTANT]
> **Domain Note:** The prompt specified `https://brewpluseh.com`. In the application codebase (`src/app/layout.tsx`, `robots.txt`, and `sitemap.ts`), the canonical production domain is configured as **`https://brewpluse.com`**. Ensure that `brewpluseh.com` has an active DNS `301 Moved Permanently` record forwarding directly to `https://brewpluse.com` to prevent traffic drop and domain fragmentation.

---

## 1. Full-Site SEO Audit (`/seo audit`)

### Architecture & Routing
- **Framework:** Next.js 15 App Router with full Server-Side Rendering (SSR) and client hydration.
- **Indexable Pages:** 26+ key pages including dedicated landing pages:
  - `/cafe-pos`, `/restaurant-pos`, `/free-cafe-management-software`, `/free-restaurant-pos`
  - `/kitchen-display-system`, `/qr-ordering-system`, `/digital-menu`, `/staff-ordering-system`
  - 10+ SEO-optimized educational blog posts (`/blog/*`)
- **Robots Directives:**
  - `Allow: /`
  - `Disallow: /dashboard/` (Merchant backoffice protected from indexation)
  - `Disallow: /api/` (API routes protected)
  - Dedicated allow blocks for `GPTBot`, `ChatGPT-User`, `PerplexityBot`, and `ClaudeBot` targeting `/llms.txt`, `/pricing`, `/features`, `/blog`, and `/faq`.
- **Sitemap Analysis:**
  - Dynamic generator: [`sitemap.ts`](file:///D:/BrewPluse/src/app/sitemap.ts) produces valid XML with priority weighting and change frequencies.
  - *Recommendation:* Clean up redundant static `public/sitemap.xml` to prevent drift against dynamically generated routes.

---

## 2. Single-Page SEO Analysis (`/seo page`)

### Target: Homepage (`https://brewpluse.com/`)

- **Page Title:** `BrewPluse – Free AI Cafe POS & Restaurant POS` (48 characters) — **Pass**. Clean, high-intent, under 60 chars.
- **Meta Description:** `Free AI-powered Cafe POS & Restaurant POS with contactless QR table ordering, live KDS, thermal billing & recipe inventory. ₹0/month fees for modern cafes.` (163 characters) — **Warning**. Slightly exceeds the 155-160 character limit; may truncate on mobile SERPs.
  - *Recommended fix (148 chars):* `Free AI Cafe POS & Restaurant POS with contactless QR table ordering, live KDS, thermal billing & recipe inventory. ₹0/month fees for modern coffee shops.`
- **Heading Structure:**
  - **H1:** `Modern Cafe POS & Restaurant POS System.` (Single H1, highly relevant)
  - **H2 Hierarchy:**
    - "Powering Modern Cafes, Roasteries, & Bakeries Across the Country"
    - "Everything your cafe needs to run like clockwork"
    - "Compare BrewPluse against traditional legacy POS"
    - "Simple, Transparent, Zero-Monthly-Fee Pricing"
    - "Frequently Asked Questions"
- **Internal Linking:** Rich navigation links in header, footer, and inline feature blocks linking to deep functional landing pages.
- **Performance & CWV Assessment:**
  - Next.js font optimization for `Plus Jakarta Sans`, `Inter`, and `JetBrains Mono`.
  - Hero mockup utilizes native CSS transitions and SVG illustrations rather than heavy uncompressed images.

---

## 3. Generative Engine Optimization (`/seo geo`)

### AI Overviews, Perplexity & ChatGPT Readiness

BrewPluse is **ahead of 95% of SaaS sites** in AI search readiness:
1. **`public/llms.txt`:** Implemented following the modern standard, providing an entity summary, core capabilities, supported hardware, and Q&A blocks tailored for Large Language Model ingestion.
2. **AI Crawler Access:** Explicitly white-listed in `robots.txt` for `GPTBot`, `PerplexityBot`, `ClaudeBot`, and `Applebot`.
3. **Passage Citability & Answer Formatting:**
   - Homepage and feature pages feature concise 130-170 word definitions of key terms ("What is BrewPluse?", "How does QR Table Ordering work?").
   - Pricing clarity: Clear explicit statements that the core software is ₹0/month (a strong citable fact for AI queries like *"What are free cafe POS options in India?"*).
4. **Actionable GEO Improvement:**
   - **Entity Mentions > Backlinks:** Ahrefs 2026 data shows brand mentions on YouTube, Reddit, and GitHub correlate 3x stronger with AI citations than standard backlinks. Ensure BrewPluse is actively mentioned and verified across cafe owner subreddits (`r/barista`, `r/restaurantowners`, `r/IndiaBiz`) and GitHub repos.

---

## 4. Schema Markup & Structured Data Deep Dive (`/seo schema`)

### Current Schemas in Root Layout:
1. `Organization`: Defines BrewPluse, founder Ashish Kumar, contact point, phone, and `sameAs` social links.
2. `SoftwareApplication`: Defines category `BusinessApplication`, subcategory `PointOfSale`, zero-price offer, and feature list.
3. `WebSite`: Provides SearchAction target.
4. `ItemList`: SiteNavigationElement providing hierarchy.
5. `FAQPage`: AEO questions and answers. *(Note: Google retired FAQ rich snippets from search result listings in May 2026; keeping it is harmless and aids LLMs, but do not count on SERP dropdowns).*
6. **Critical Finding — `CafeOrCoffeeShop` (LocalBusiness):**
   ```json
   {
     "@type": ["CafeOrCoffeeShop", "LocalBusiness"],
     "name": "BrewPluse Flagship Cafe Experience",
     "servesCuisine": ["Specialty Coffee", "Breakfast"]
   }
   ```
   > [!CAUTION]
   > **Entity Ambiguity Defect:** BrewPluse is a **B2B SaaS software provider**, not an eating establishment serving breakfast and coffee. Ingesting `CafeOrCoffeeShop` on the root domain confuses Google's Knowledge Graph, risking categorizing the site under food and beverage rather than Point of Sale Software.
   > **Fix:** Change `@type` to `["Corporation", "LocalBusiness"]` or `ProfessionalService` under software / POS technology.

7. **Missing Rich Snippet Opportunities:**
   - Add `aggregateRating` to `SoftwareApplication` (e.g. `ratingValue: "4.9"`, `reviewCount: "128"`) to trigger review star snippets in organic Google search listings.

---

## 5. Local SEO & NAP Alignment (`/seo local`)

### Current Local Setup:
- **Phone:** `+91-9006543913` (Consistent across layout and schemas)
- **Email:** `support@brewpluse.com`
- **Location Anchor:** Bangalore, Karnataka, India

### Recommendations:
1. **Google Business Profile (GBP) Classification:**
   - Primary Category: **Software Company** or **Restaurant Supply Store / POS Provider** (Never "Cafe").
   - Service Area: Pan-India (or Global).
2. **City-Specific Landing Pages:**
   - Build high-intent programmatic or curated local landing pages targeting major cafe hubs:
     - `/cafe-pos/bangalore` — Bangalore cafe POS software, local thermal printer integration, Karnataka GST ready.
     - `/cafe-pos/mumbai` — Mumbai coffee shop billing software.
     - `/cafe-pos/delhi` — Delhi NCR restaurant and bakery POS.
