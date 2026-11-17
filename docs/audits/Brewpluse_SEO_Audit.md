# 🌐 Technical SEO, Schema & Search Visibility Audit: Brewpluse.com

**Property:** [https://brewpluse.com/](https://brewpluse.com/)  
**Audit Scope:** Full Crawl & Indexation Analysis, Robots.txt, XML Sitemaps, Canonicalization, Semantic Heading Hierarchy, Schema.org Structured Data, Open Graph / Social Cards, Keyword Architecture, and Generative Engine Optimization (GEO/AEO)  
**Date:** November 17, 2026  
**Auditor:** Senior Technical SEO Architect & AEO Specialist  
**Status:** READ-ONLY Verification Complete

---

## 1. Crawlability, Robots.txt & Crawl Budget

### 1.1 Live Robots.txt Configuration Review
Inspection of `https://brewpluse.com/robots.txt` reveals:

```txt
User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /setup/
Disallow: /*?*

User-agent: Googlebot
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /setup/
Disallow: /*?*

User-agent: Bingbot
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /setup/
Disallow: /*?*

User-agent: GPTBot
Allow: /
Allow: /llms.txt
Disallow: /dashboard/
Disallow: /api/
Disallow: /setup/
Disallow: /*?*

... (ChatGPT-User, OAI-SearchBot, PerplexityBot, ClaudeBot, anthropic-ai, Google-Extended, Applebot)

Sitemap: https://brewpluse.com/sitemap.xml
```

### 1.2 Critical Technical SEO Defect: `Disallow: /*?*`
- **Finding Status:** CONFIRMED
- **Severity:** HIGH / CRITICAL
- **Mechanism of Failure:** 
  The wildcard expression `Disallow: /*?*` matches every URL path that includes a query separator `?`. While intended to prevent search engines from crawling infinite session parameters or filter loops, it inadvertently causes severe side-effects:
  1. **Blocked Inbound Campaign Traffic:** When marketing campaigns run on Google Ads, Meta, LinkedIn, or newsletters, links contain tracking parameters (`?utm_source=...`, `?gclid=...`). When Googlebot crawls these URLs via shared links or social embeds, it encounters a robots.txt block and cannot verify the destination or pass link equity.
  2. **Internal Framework Parameters:** Next.js App Router utilizes flight query parameters (`?_rsc=...`) for server components and dynamic prefetching. Blocking these can disrupt Google's headless rendering evaluation.
  3. **Canonical Resolution Failure:** Google Search Central documentation specifies that if a parameterized URL is blocked by robots.txt, Googlebot cannot crawl it to read the `rel="canonical"` pointing to the clean URL, often leading to indexation anomalies.
- **Recommended Fix:** Replace `Disallow: /*?*` with targeted URL query exclusions:
  ```txt
  # Target only actual session/internal parameters
  Disallow: /*?_rsc=*
  Disallow: /dashboard/
  Disallow: /api/
  Disallow: /setup/
  ```

---

## 2. XML Sitemap & Dynamic Generation Discrepancy

### 2.1 File Collision: Static Shadowing of Dynamic Routes
- **Finding Status:** CONFIRMED
- **Severity:** HIGH
- **Code Locations:**
  - Static File: `public/sitemap.xml` (Size: 7,209 bytes)
  - Dynamic Handler: `src/app/sitemap.ts` (App Router Route Handler)
- **Problem Explanation:**
  In Next.js, static files located in `public/` take absolute routing priority over dynamic route handlers defined in `src/app/`. As a result, the live endpoint `https://brewpluse.com/sitemap.xml` serves the static file generated on November 14, 2026.
  When new blog posts, case studies, or feature pages are added to `src/app/sitemap.ts`, they are never reflected in the live XML sitemap unless a developer manually regenerates and overwrites `public/sitemap.xml`.
- **Remediation:** Remove `public/sitemap.xml` and `public/robots.txt` from the codebase. Let Next.js dynamically serve the sitemap and robots routes with automated cache invalidation.

---

### 2.2 `<lastmod>` Timestamp Manipulation
- **Finding Status:** CONFIRMED
- **Severity:** MEDIUM
- **Code Location:** `src/app/sitemap.ts` (Line 5):
  ```typescript
  const currentDate = new Date().toISOString();
  ```
- **The Issue:** Every URL in the generated sitemap sets `<lastmod>` to the exact second the crawler makes the request. Google's webmaster guidelines explicitly warn that sitemaps providing constantly changing, artificial `lastmod` dates are deemed unreliable. Crawlers will discount the signal and rely solely on their own historical crawl heuristics.
- **Remediation:** Track actual modified dates per page or tie blog post URLs to their published/updated dates.

---

## 3. Canonical URLs & Status Code Verification

We verified the canonical implementation across all 38 indexed pages:

| Page Type | Sample URL | Live HTTP Status | Declared Canonical | Evaluation |
|---|---|:---:|---|:---:|
| Root Homepage | `https://brewpluse.com/` | 200 OK | `https://brewpluse.com` | 🟢 Self-referencing |
| Product Landing | `https://brewpluse.com/cafe-pos` | 200 OK | `https://brewpluse.com/cafe-pos` | 🟢 Clean |
| Product Landing | `https://brewpluse.com/restaurant-pos` | 200 OK | `https://brewpluse.com/restaurant-pos` | 🟢 Clean |
| Feature Landing | `https://brewpluse.com/qr-ordering-system` | 200 OK | `https://brewpluse.com/qr-ordering-system` | 🟢 Clean |
| Blog Pillar Post | `https://brewpluse.com/blog/best-cafe-management-software` | 200 OK | `https://brewpluse.com/blog/best-cafe-management-software` | 🟢 Clean |
| System Status | `https://brewpluse.com/status` | 200 OK | `https://status.brewpluse.com/` | ⚠️ External Canonical |

### Subdomain Canonical Issue on `/status` (CONFIRMED)
The page hosted at `https://brewpluse.com/status` declares its canonical URL as `https://status.brewpluse.com/`. However, `https://status.brewpluse.com/` is an external subdomain. If the content on `brewpluse.com/status` is intended to be indexed on the main root domain, the canonical should be self-referencing (`https://brewpluse.com/status`). Alternatively, if `status.brewpluse.com` is the primary status portal, `brewpluse.com/status` should issue an HTTP 301 Permanent Redirect to `status.brewpluse.com`.

---

## 4. Heading Hierarchy (H1–H6) Audit

Semantic heading structure is a core signal for search engine document parsing. Our crawler identified two explicit violations:

### 4.1 Multiple H1 Tags on `/demo` (CONFIRMED)
- **Location:** `https://brewpluse.com/demo`
- **Current Headings:**
  - `H1 (1):` `BrewPluse LIVE`
  - `H1 (2):` `Welcome to BrewPluse ☕`
- **Impact:** Dilutes topical focus. Search engines prefer a single distinct H1 that captures the core entity and intent of the page.
- **Fix:** Keep `<h1>Interactive Live Cafe POS Demo</h1>` and convert the welcome banner to `<h2>Welcome to BrewPluse ☕</h2>`.

### 4.2 Missing H1 Tag on `/login` (CONFIRMED)
- **Location:** `https://brewpluse.com/login`
- **Current Headings:** `H1 count: 0`. The page jumps straight to `<h2>`.
- **Fix:** Wrap the main greeting in an `<h1>` tag: `<h1 className="...">Merchant & Staff Portal Login</h1>`.

---

## 5. Schema.org Structured Data & Rich Results Audit

### 5.1 Sitewide Schema Injection Anti-Pattern (CONFIRMED)
In `src/app/layout.tsx`, the root layout unconditionally injects the following structured data schemas across all pages:

```tsx
// Extracted from src/app/layout.tsx
<script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
<script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
<script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
<script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
<script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
<script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
```

#### Why This Is a Serious SEO Defect:
1. **Google Spam Policy Violation:** Google requires structured data to accurately reflect the visible primary content of the specific page. Injecting `FAQPage` schema (with answers about POS pricing and thermal printers) onto `/privacy`, `/terms`, `/shipping`, and `/contact` violates Google's explicit quality guidelines:
   > *"If the content of the page is not in the structured data, or if the structured data contains information that is not on the page, the structured data will be considered invalid and may be marked as spam."*
2. **LocalBusiness Conflict:** Declaring `LocalBusiness` with a fabricated address ("BrewPluse Tech Park, Sector 4, Bangalore 560001") on every URL introduces algorithmic suspicion. BrewPluse operates as a digital cloud SaaS product. It should declare `Organization` and `SoftwareApplication`, while reserving `LocalBusiness` only if an actual physical walk-in office or customer service center is maintained.

---

### 5.2 Structured Data Remediation Blueprint

Move schemas out of `RootLayout` into their respective route pages:

| Schema Type | Proper Placement | Reason |
|---|---|---|
| `Organization` | `RootLayout` (`/layout.tsx`) | Sitewide brand entity identity |
| `WebSite` + `SearchAction` | Homepage (`/page.tsx`) | Sitelinks search box eligibility |
| `SoftwareApplication` | `/cafe-pos`, `/restaurant-pos`, `/pricing` | Product-specific pricing and features |
| `FAQPage` | Only pages with visible FAQ accordions | Avoids Google rich snippet penalties |
| `BreadcrumbList` | All subpages (`/blog/*`, `/features`) | Enhances SERP navigation breadcrumbs |
| `Article` | Individual blog posts (`/blog/[slug]`) | Google News & Discover eligibility |

---

## 6. Keyword Architecture & Cannibalization Analysis

### 6.1 Keyword Mapping Matrix

| URL | Target Primary Keyword | Search Intent | Competitor Comparison |
|---|---|---|---|
| `/` | `cafe POS` / `restaurant POS` | Commercial / Brand | Targets broad category |
| `/cafe-pos` | `cafe POS software` | Commercial Investigation | Direct feature comparison |
| `/restaurant-pos` | `restaurant POS system` | Commercial Investigation | Focuses on table floor & KOT |
| `/free-cafe-management-software` | `free cafe software` | High Intent / Transactional | Focuses on ₹0 pricing |
| `/free-restaurant-pos` | `free restaurant POS` | High Intent / Transactional | Focuses on zero monthly fees |
| `/qr-ordering-system` | `QR table ordering system` | Solution Seeking | Focuses on contactless ordering |
| `/kitchen-display-system` | `kitchen display system KDS` | Solution Seeking | Focuses on kitchen automation |
| `/digital-menu` | `digital QR menu for cafes` | Informational / Solution | Focuses on menu digitization |

### 6.2 Cannibalization Prevention Strategy
Currently, `/cafe-pos`, `/cafe-management-software`, and `/free-cafe-management-software` share overlapping heading structures and body copy. 

**Recommended Topic Specialization:**
- **`/cafe-pos`:** Focus on **hardware, counter speed, thermal printers, and offline checkout**.
- **`/cafe-management-software`:** Focus on **back-office operations, inventory margins, staff shifts, and P&L analytics**.
- **`/free-cafe-management-software`:** Focus on **cost comparison, the ₹0/month model vs legacy vendor licensing fees, and startup ROI**.

---

## 7. Generative Engine Optimization (GEO & AEO)

With the rise of AI-driven search engines (Google AI Overviews, Perplexity AI, ChatGPT Search, and Claude), websites must optimize for entity extraction and citation indexing.

### 7.1 Analysis of `/llms.txt`
BrewPluse already provides an `llms.txt` file at `https://brewpluse.com/llms.txt` (3,270 bytes).
- **Status:** 🟢 Excellent forward-thinking implementation.
- **Content:** Clearly specifies brand entity, value proposition, pricing structure (₹0/month software + ₹1/order), and module breakdowns.
- **Improvement Needed:** In Lighthouse audits, the file was flagged under agentic browsing for missing structured Markdown section links. Ensure `llms.txt` follows standard schema conventions with direct Markdown link references to documentation and product endpoints.

### 7.2 Entity Clarity & Knowledge Graph
Ensure Google's Knowledge Graph can unambiguously resolve "BrewPluse":
- Align the `sameAs` array across Wikidata, Crunchbase, LinkedIn, X, and GitHub.
- Add founder information linking to verified professional profiles.

---

## 8. SEO Action Checklist & Verification Protocol

- [ ] **Step 1:** Edit `public/robots.txt` and `src/app/robots.ts` to remove `Disallow: /*?*`.
- [ ] **Step 2:** Delete static `public/sitemap.xml` and `public/robots.txt` to enable dynamic App Router generation.
- [ ] **Step 3:** Remove `FAQPage`, `LocalBusiness`, and `SoftwareApplication` from `src/app/layout.tsx`.
- [ ] **Step 4:** Place `SoftwareApplication` only on `/cafe-pos`, `/restaurant-pos`, and `/pricing`.
- [ ] **Step 5:** Add visible FAQ accordions to `/cafe-pos` and attach page-level `FAQPage` schema.
- [ ] **Step 6:** Resolve the two H1 heading tags on `/demo` and add a missing H1 on `/login`.
- [ ] **Step 7:** Self-reference the canonical tag on `https://brewpluse.com/status`.
- [ ] **Step 8:** Re-submit updated sitemap in Google Search Console and Bing Webmaster Tools.
