# LESSON 2.6 (UPDATED): Measurement & Optimization

*The ecosystem-aware dashboard*

## Production Notes
- **Format:** OBSBOT screen recording (GA4, dashboard review) + Canon 70D (strategy)
- **Target Length:** 10-12 minutes
- **Screen Recording:** Google Analytics 4 setup, Lodgify/custom analytics, monthly audit walkthrough

---

## VIDEO SCRIPT

### HOOK (0:00 - 0:20) [CANON 70D]

"You have a direct booking engine. A data capture system. Automated funnels. Placeholder URLs ready for Module 2B and Module 9. Now we install the dashboard that tells you what's working and where to focus next."

### THE 6 METRICS THAT MATTER IN AN ECOSYSTEM BUSINESS (0:20 - 2:30) [SLIDES]

"**[SLIDE: The 6 Metrics]**

The old lesson tracked 4 metrics. In the ecosystem model, you track 6:

**1. Website Traffic** — by source (organic, direct, social, referral, paid, /local-guide)
**2. Conversion Rate** — % of visitors who book (industry: 1-3%, ecosystem target: 3-5%)
**3. Direct Booking %** — direct / total bookings (Year 1 target: 20-30%)
**4. Commission Savings** — $ you didn't pay platforms
**5. Average Booking Value** — including packages and add-ons (this is the Module 9 signal)
**6. Email List Growth Rate** — new captures per month (this is the ecosystem health signal)

ABV and list growth are the two that reveal whether the ecosystem is compounding. A business with growing ABV is monetizing better per guest. A business with growing list size is storing future bookings in a bank you don't pay commission on."

### GOOGLE ANALYTICS 4 SETUP (2:30 - 5:00) [OBSBOT + SCREEN RECORDING]

"**[SCREEN RECORDING: GA4]**

**Step 1:** analytics.google.com → create account.
**Step 2:** Create property for your site.
**Step 3:** Copy Measurement ID (G-XXX). Paste into your platform:
- Lodgify: Settings > Integrations > Google Analytics
- WordPress: Site Kit by Google plugin
- Next.js: add to root layout, fire pageviews on route change
**Step 4:** Verify with Real-time report (visit own site, see yourself).

**[SCREEN RECORDING: Setting up events]**

Configure conversion events:
- `booking_completed` — fires on booking confirmation page
- `insider_signup` — fires on /insider form submission
- `referral_signup` — fires on /refer form submission
- `package_view` — fires on any /packages/* page view
- `addon_click` — fires on any /add-ons/* CTA click

These events let you measure ecosystem engagement, not just bookings.

**[SCREEN RECORDING: Acquisition report]**

Reports > Acquisition > Traffic acquisition. This shows:
- Visitors by source
- Which source converts best
- Which source feeds /insider signups
- Which source feeds /packages views

The traffic source with highest conversion is where you invest more. When Module 2B is built, /local-guide-driven organic traffic usually becomes the top source by volume AND conversion."

### MONTHLY ECOSYSTEM AUDIT (5:00 - 8:00) [CANON 70D + SLIDES]

"**[SLIDE: Monthly Ecosystem Dashboard]**

| Metric | This Month | Last Month | Trend |
|---|---|---|---|
| Total visitors | | | |
| Organic visitors | | | |
| /local-guide visitors (M2B) | | | |
| Booking conversion rate | | | |
| Direct bookings | | | |
| Platform bookings | | | |
| **Direct %** | | | |
| Direct revenue | | | |
| **Average booking value** | | | |
| Package sales count | | | |
| Add-on attach rate | | | |
| /insider new signups | | | |
| Referrals generated | | | |
| Email list size | | | |
| Commission saved | | | |
| **Revenue Per Night** | | | |

First of every month. 15 minutes. Data comes from GA4 (traffic + events), PMS (bookings + revenue), email platform (list + signups), and your booking system (package/add-on counts).

**[SLIDE: Reading the Dashboard]**

**Traffic low:** Double down on Module 2B content. Or increase paid spend as a supplement.

**Traffic fine, conversion low:** Something on the site is broken. Test hero image, headline, CTA copy, price display.

**Direct % stagnant:** Your traffic sources may be sending wrong personas. Check /insider signup rate by source.

**ABV stagnant:** Packages and add-ons aren't being discovered or aren't compelling. Revisit Module 9.

**List growth stagnant:** Capture points are leaking. Audit StayFi, pre-arrival form completion, /insider conversion rate.

**Everything growing:** You're winning. Increase budget on the highest-converting channel."

### A/B TESTING IN AN ECOSYSTEM (8:00 - 9:30) [CANON 70D]

"**[SLIDE: A/B Priority Stack]**

Test one element at a time. Ecosystem priority order:

1. **Hero image** — biggest conversion impact
2. **Primary CTA text** — 'Check Availability' vs 'Book Direct & Save'
3. **/insider opt-in placement** — footer vs. modal vs. inline card
4. **/packages preview card on /home** — does showing packages on home raise ABV?
5. **Price display** — nightly rate vs. 'From $X' vs. total for typical stay
6. **Add-on presentation at checkout** — all at once vs. stepped

Run each test at least 2 weeks or 200 visitors. Keep the winner. Move on.

Ecosystem tests also include cross-URL ones:
- Does adding a /local-guide teaser on /home increase time on site?
- Does /refer on the thank-you page outperform /refer in email?
- Does /insider before /book reduce bookings by adding friction?

These are higher-order tests once you have traffic."

### MODULE 2 WRAP-UP (9:30 - 11:30) [CANON 70D]

"**[SLIDE: Module 2 Summary]**

- Lesson 2.1: Understood the economics — the site as ecosystem center of gravity
- Lesson 2.2: Built 11-URL foundation (Lakeside Landing FLX pattern)
- Lesson 2.3: Tech stack picked, 5 capture points installed
- Lesson 2.4: Copy, images, and ecosystem-ready URL structure set
- Lesson 2.5: 5 email sequences + 3 SMS flows live and segmented
- Lesson 2.6: GA4 and ecosystem-aware dashboard installed
- Lesson 2.7: Local Guide Flywheel activated as primary traffic strategy

**[SLIDE: The Foundation Is Built]**

Your direct booking engine is live. Your capture system runs 24/7. Your automations fire on schedule. Your measurement is wired. Your URL structure is ready for the next two modules to pour fuel on.

**[SLIDE: What's Next]**

Module 2B — Local Guide Engine — turns /local-guide and /links into the SEO flywheel that drives organic traffic into every one of your 11 URLs. It's the traffic ecosystem.

Module 9 — Curated Experiences — turns /packages and /add-ons into the revenue ecosystem that doubles your average booking value.

Module 2 built the stage. Modules 2B and 9 fill the theater.

See you in Module 2B."

---

## TEMPLATES PROVIDED

1. **Monthly Ecosystem Dashboard** — Google Sheet, auto-calc trends, all 16 metrics
2. **A/B Testing Log** — ecosystem-level tests included
3. **GA4 Event Configuration Guide** — conversion events for every key URL
4. **Ecosystem KPI Glossary** — plain-English definitions

---

## STUDENT DELIVERABLES

- [ ] GA4 installed
- [ ] Conversion events configured (5 events minimum)
- [ ] Tracking verified in real-time
- [ ] Month 1 dashboard populated
- [ ] First A/B test planned
- [ ] MODULE 2 — COMPLETE
