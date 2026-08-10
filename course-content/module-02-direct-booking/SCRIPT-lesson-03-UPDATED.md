# LESSON 2.3 (UPDATED): Tech Stack & Guest Data Capture

*Picking tools that scale into the ecosystem*

## Production Notes
- **Format:** OBSBOT screen recording (StayFi, email platform, tech stack demo) + Canon 70D (strategy)
- **Target Length:** 12-14 minutes
- **Screen Recording:** StayFi dashboard, email platform (ConvertKit/Mailchimp), form builder, quick tour of the Lakeside Landing FLX tech stack

---

## VIDEO SCRIPT

### HOOK (0:00 - 0:30) [CANON 70D]

"The most valuable asset in your STR business isn't the property — it's your guest database. Every guest who stays has a name, an email, a phone number, a trip purpose, and a reason to come back. If they booked on Airbnb, you have none of that. Airbnb keeps it.

This lesson does two things. First, we pick the tech stack that turns your site into a compounding asset. Second, we install five data capture points that feed guests into your database automatically — so your ecosystem actually has fuel."

### THE TECH STACK DECISION (0:30 - 3:30) [CANON 70D + SLIDES]

"Before we capture anything, let's make sure the plumbing is right.

**[SLIDE: The Minimum Viable Stack]**

If you're starting today and want the fastest path to live:

- **Site + booking:** Lodgify ($12-59/mo) or OwnerRez ($40+/mo)
- **Data capture:** StayFi WiFi ($15/mo)
- **Email platform:** ConvertKit free tier or Mailchimp free tier (up to 500 contacts)
- **SMS:** your PMS's built-in SMS, or Twilio for custom
- **Analytics:** Google Analytics 4 (free)
- **Form builder:** Google Forms (free) or Typeform (free tier)

That stack runs you about $27/month at minimum. It's enough to run a professional direct booking business at one or two properties.

**[SLIDE: The Ecosystem Operator Stack]**

If you're serious about the full ecosystem — the one Module 2B and Module 9 build out — this is what lakesidelandingflx.com runs on:

- **Site:** Next.js 15 + Tailwind CSS, hosted on Vercel
- **Booking engine:** OwnerRez or Hostaway (connected via API)
- **Payments:** Stripe (direct integration)
- **CMS for /local-guide content:** Sanity or MDX files in the repo
- **Data capture:** StayFi + native site forms + PMS pre-arrival
- **Email:** ConvertKit or Customer.io for segmentation-heavy automation
- **SMS:** Twilio
- **Analytics:** GA4 + Vercel Analytics + Hotjar for behavior
- **Schema / SEO:** native structured data on every page (critical for Module 2B)

**[SLIDE: Which Stack Fits Your Situation]**

Pick MVP if:
- You're building your first direct site
- You're bootstrapping
- You want to be live this week

Pick Ecosystem if:
- You're ready to treat this as a real business
- You have, or can hire, a developer (budget: $5K-15K for the initial custom build)
- You plan to commit to Module 2B's SEO engine seriously
- You're going to have 3+ properties eventually

Honest take: start MVP. Get to revenue. Validate the model. THEN upgrade to custom when you're ready to pour fuel on the fire. Lakeside Landing FLX didn't start on Next.js — it started on a template site, proved the model, and rebuilt custom once the revenue justified it."

### WHY GUEST DATA MATTERS (3:30 - 5:00) [CANON 70D + SLIDES]

"**[SLIDE: The Most Expensive Guest Is the First One]**

The first booking is expensive — commissions, ads, content, time. The second booking from the same guest is almost free. Cost to email a past guest: basically zero. 10,000x cheaper than acquiring someone new.

But you can only email them if you HAVE their email. And you can only have it if you capture it.

**[SLIDE: 5 Capture Points]**

1. **WiFi login** — StayFi captures 70-90% of guests automatically
2. **Pre-arrival form** — trip details + direct email (even for Airbnb bookings)
3. **Booking form** — direct bookings capture everything automatically
4. **Post-stay survey** — catches anyone you missed + generates feedback
5. **Website opt-in** — /insider, /refer, /local-guide capture prospective guests before they book

All five feed the same database. Same email list. Same segmentation. Same ecosystem."

### STAYFI SETUP (5:00 - 8:00) [OBSBOT + SCREEN RECORDING]

"**[SCREEN RECORDING: stayfi.com]**

**Step 1: Sign up ($15/mo)**
Base plan covers one property, 200 contacts.

**Step 2: Connect your router**
Works with most routers. If incompatible, StayFi sells pre-configured routers for ~$99.

**Step 3: Customize the splash page**
- Property name + logo
- Welcome message: 'Welcome to [Property Name]! Connect below.'
- Email capture (required)
- Optional: phone, name, 'Subscribe for return guest pricing' checkbox
- Brand it to match your site — same typography, same colors

Keep it simple. Every extra field reduces completion.

**Step 4: Email platform integration**
StayFi integrates with Mailchimp, ConvertKit, ActiveCampaign. Auto-tag new captures as 'StayFi' so you know the source.

**Step 5: Test**
Connect to your WiFi. Confirm splash page loads. Enter test email. Verify it lands in StayFi dashboard AND email platform.

Every guest who connects to WiFi now automatically enters your database. This is passive capture — it runs 24/7 regardless of booking source."

### PRE-ARRIVAL FORM (8:00 - 9:30) [OBSBOT + SCREEN RECORDING]

"**[SCREEN RECORDING: PMS message + Google Forms]**

PMS auto-sends this 3-5 days before check-in.

Message:
'Hi [Guest Name]! We're excited to host you at [Property Name] starting [Date]. Quick 2-minute form to help us customize your stay: [LINK]'

Form fields:
- Full name
- Email (gets you direct email even on Airbnb bookings — critical)
- Phone
- Trip purpose (vacation, family reunion, anniversary, work)
- Special occasions (birthday, anniversary — triggers surprise touches)
- Special requests (crib, early check-in, dietary)
- 'Interested in add-ons for your stay?' checkbox (feeds the Module 9 upsell sequence)

That last checkbox is gold. It opts the guest into the pre-arrival upsell email that sells chef dinners, wine tours, and boat charters before they arrive."

### WEBSITE OPT-IN POINTS (9:30 - 10:30) [CANON 70D]

"Direct site captures aren't just /book. You have multiple opt-in surfaces:

**[SLIDE: Site-Wide Capture Surfaces]**

- **/insider** — join the Insider list (highest-quality opt-in)
- **/refer** — past guest enrolls their friends (referral capture)
- **/local-guide** — 'download our complete Finger Lakes guide' (Module 2B lead magnet)
- **/gift** — someone buying a gift card also opts into your list
- **Exit intent popup** on /home — 'Get 10% off your first direct booking'

Each surface captures a different intent level. /insider is warm; exit intent is cold. Segment accordingly."

### DATABASE + SEGMENTATION (10:30 - 12:00) [CANON 70D + SLIDES]

"**[SLIDE: Guest Database Structure]**

Track these fields:

| Field | Source | Use |
|---|---|---|
| Name | Booking / form | Personalization |
| Email | StayFi / booking / form | Primary channel |
| Phone | Form / PMS | SMS |
| Stay dates | PMS | Anniversary / return offer timing |
| Booking source | PMS | Channel tracking |
| Trip purpose | Form | Segmentation |
| Special occasions | Form | Surprise touches |
| Add-on interest | Form checkbox | Module 9 upsell trigger |
| Insider status | /insider opt-in | Loyalty segment |
| Review status | Post-stay | Follow-up logic |
| Lifetime value | Calculated | VIP identification |

**[SLIDE: Segmentation]**

- First-timers
- Repeat guests
- Insiders (/insider opt-ins)
- Referrers
- High-value (long stays, premium dates, purchased packages)
- By trip type (couples, families, groups, business)

Segmentation is what makes Module 9 work — you can't send the Romance Package to a family reunion. The database is the source of truth. Everything downstream runs off these tags."

### CLOSE (12:00 - 13:00) [CANON 70D]

"Your tech stack is picked. Your 5 capture points are live. Your database is structured.

**[SLIDE: Homework]**

1. Confirm your tech stack — MVP or Ecosystem
2. Set up StayFi + branded WiFi splash page
3. Build pre-arrival form with add-on interest checkbox
4. Configure PMS pre-arrival auto-send
5. Build post-stay survey
6. Pick email platform and connect to StayFi
7. Set up initial segments: First-timer, Repeat, Insider, Referrer
8. Test: connect to your own WiFi, confirm capture works end-to-end

In Lesson 4, we build the email and SMS sequences that turn this database into a booking machine.

See you there."

---

## TEMPLATES PROVIDED

1. **Tech Stack Decision Worksheet** — MVP vs. Ecosystem scorecard
2. **Pre-Arrival Form Template** — with add-on interest checkbox
3. **Post-Stay Survey Template**
4. **PMS Message Templates** — pre-arrival + post-stay
5. **Guest Database Google Sheet** — fully structured with all fields and tags
6. **Segmentation Playbook** — which email goes to which segment

---

## STUDENT DELIVERABLES

- [ ] Tech stack confirmed (MVP or Ecosystem)
- [ ] StayFi configured and branded
- [ ] Pre-arrival form created (with add-on checkbox)
- [ ] PMS pre-arrival auto-message set
- [ ] Post-stay survey created
- [ ] Email platform selected and connected to StayFi
- [ ] Initial segments created
- [ ] End-to-end capture test passed
