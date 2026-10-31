# BrewPluse SEO Prioritized Action Plan

Prioritized roadmap to execute based on findings from the Full SEO Audit, Page Analysis, GEO, Schema, and Local reviews.

---

## Phase 1: Critical Fixes (Immediate — Week 1)

### 1. Fix Schema Entity Mismatch in `src/app/layout.tsx`
- **Severity:** Critical
- **Problem:** `geoLocalSchema` tags BrewPluse as a `CafeOrCoffeeShop` with `servesCuisine`, confusing search engine knowledge graphs.
- **Action:** Replace `CafeOrCoffeeShop` with `SoftwareCompany` / `ProfessionalService`, specifying `knowsAbout: ["Point of Sale Systems", "Kitchen Display Systems", "Restaurant Management Software"]`.

### 2. Verify Domain Forwarding (`brewpluseh.com` → `brewpluse.com`)
- **Severity:** High
- **Problem:** Ensure typo domains or alternative domain iterations resolve via HTTP 301 to the canonical root `https://brewpluse.com/`.

### 3. Add `AggregateRating` to `SoftwareApplication` Schema
- **Severity:** High
- **Problem:** Missing review stars in Google search engine result pages (SERPs).
- **Action:** Add `aggregateRating: { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "142", "bestRating": "5" }` to `softwareSchema` in `src/app/layout.tsx`.

### 4. Optimize Homepage Meta Description
- **Severity:** Medium
- **Problem:** Current length is 163 chars (may truncate on mobile).
- **Action:** Trim to 148-152 chars in `src/app/layout.tsx` and `src/app/page.tsx`.

---

## Phase 2: High-Impact Improvements (Weeks 2–3)

### 1. Consolidate Static & Dynamic Sitemap
- Remove `public/sitemap.xml` in favor of Next.js 15 native `src/app/sitemap.ts` to eliminate duplicate definitions and avoid drift.

### 2. Add BreadcrumbList & SoftwareReview to Deep Feature Pages
- Ensure every landing page (`/cafe-pos`, `/restaurant-pos`, `/digital-menu`) has deep `BreadcrumbList` schema and explicit feature specs.

### 3. Polish Passage Quotability for AI Engines (AEO)
- Add distinct answer callout boxes on feature pages (e.g. `<blockquote>` or highlighted definition cards) answering high-volume questions like *"How much does a cafe POS cost in India?"* and *"Can I run BrewPluse offline?"*.

---

## Phase 3: Authority & Local Scaling (Month 2)

### 1. Launch City Landing Pages
- Create `/cafe-pos/bangalore`, `/cafe-pos/mumbai`, `/cafe-pos/delhi-ncr`.
- Customize content around regional GST compliance, local hardware supplier compatibility, and regional cafe trends.

### 2. Expand Entity Mentions for GEO
- Secure brand profiles and verified merchant listings on G2, Capterra, SourceForge, and Product Hunt.
- Publish YouTube video tutorials on thermal printer setup and QR ordering workflows (YouTube mentions have ~0.737 correlation with AI search citations).
