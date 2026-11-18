# BrewPluse Pilot Launch & Go-Live Run Sheet
*Launch Lead Playbook*

## 1. The Pre-Launch Pilot Gate (Real-World Test)
Before public marketing, execute a **3-Cafe Physical Pilot**:
- **Locations**: 3 friendly specialty coffee shops in Bangalore (Indiranagar / Koramangala).
- **Setup**: Install 10 acrylic table QR stands per cafe + link their UPI QR accounts.
- **Success Criteria**:
  - Minimum 150 QR orders processed across 72 hours.
  - Zero order drops or payment verification failures.
  - Average order submission time under 30 seconds.
  - Barista feedback score &ge; 4.8 / 5.

---

## 2. Launch Countdown Schedule

- **T-7 Days: Preflight Verification**
  - Verify `npx tsc --noEmit` and production Next.js build passes.
  - Confirm Android APK (`brewpluse-app.apk`) installs cleanly on Android 10, 12, 13, and 14 devices.
  - Test Razorpay live key and UPI intent triggers on real ₹10 transactions.
- **T-3 Days: Creator & Community Seeding**
  - Share early access APK with 20 prominent coffee shop influencers, cafe consultants, and baristas.
  - Distribute "The Death of the ₹30,000 POS" announcement teaser on LinkedIn and X.
- **T-1 Day: Production Lock & Dry Run**
  - Run full simulated order-to-kitchen-to-receipt cycle across 5 concurrent tables.
  - Verify Cloudflare SSL, DNS records, and sitemap indexation.
- **Launch Day (Day 0): Public Launch**
  - 8:00 AM: Publish Product Hunt launch and live demo URL (`brewpluse.com/demo`).
  - 10:00 AM: Post founder video walkthrough on LinkedIn and X.
  - 12:00 PM: Launch WhatsApp direct outreach to 100 cafe owner leads.
  - 4:00 PM: Monitor live telemetry dashboard for active cafe signups and order traffic.

---

## 3. Post-Launch 30-Day Metrics to Watch

1. **Active Stores**: Target 50 live cafes onboarded by Day 30.
2. **Order Volume Velocity**: Target 1,000+ daily orders processed across the network.
3. **Cart Abandonment Rate**: Keep below 12% on the customer table ordering flow.
4. **Hardware Bundle Attach Rate**: Target 18% of new cafes ordering acrylic QR stands.
