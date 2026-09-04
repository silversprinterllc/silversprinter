# SpokeBnB Free Listing Audit Framework

**Version:** 1.0
**Owner:** SpokeBnB Team
**Purpose:** High-touch, scarcity-driven lead capture that delivers real value, surfaces course gaps naturally, and converts at 15-25% within 7 days.
**Cadence:** 5 audits per week, Monday/Tuesday/Wednesday delivery window.
**Case Study:** Lakeside Landing FLX (our own property — $82K/yr annualized target, Year 1 of rebuild → $147K/yr projected Year 2 with full system)

---

## SECTION 1: LANDING PAGE COPY

### URL
`spokebnb.com/audit` (canonical) with aliases `/free-audit`, `/listing-audit`

### Above-the-Fold

#### Headline (H1)
**Get a Free Personalized Listing Audit — 5 Spots Available This Week**

#### Subhead
I'll record a 10-minute Loom video reviewing your Airbnb listing using the same framework we're deploying at Lakeside Landing FLX — targeting $82K/yr (annualized, Year 1 of rebuild) toward $147K/yr (projected Year 2 with the full system). You'll get a 40-point scorecard, five specific changes you can make this weekend, and my honest take on why your listing is (or isn't) converting. No credit card. No "discovery call." Just the audit.

#### Primary CTA Button
**Claim Your Spot (3 of 5 Remaining This Week)**

#### Sub-CTA Microcopy
*Audits delivered within 72 hours. Zero-obligation. If I can't find at least $5K/yr in upside, I'll tell you straight.*

---

### "What You'll Receive" (Deliverables Block)

Every audit includes:

- **10-15 minute Loom video** walkthrough of your listing — screen-recorded, with me narrating every scroll, click, and observation a real guest would have
- **40-point Scorecard PDF** graded A-F across 8 categories (Title, Hero Photo, Photo Sequence, Copy, Pricing, Amenities, Reviews, Settings)
- **Top 5 Priority Fixes** ranked by ROI impact — what to change first, what to change this week, what to leave alone
- **Benchmark Comparison** against 3 top-performing listings in your market (comp set pulled before the call)
- **Revenue Opportunity Estimate** — a realistic dollar range of additional annual revenue you're leaving on the table
- **Optional 15-minute follow-up call** to walk through findings and answer questions
- **Private Notion page** with everything above, permanently accessible

---

### "What We Audit" (Trust-Building Specificity Block)

Here's exactly what gets reviewed, point by point:

- Your listing title's hook, keyword density, and length optimization
- Your hero photo's composition, time-of-day, and emotional trigger
- Your first 5 photos and whether the sequence tells a story
- Your description's opening 2 lines (the part Airbnb actually shows)
- Your pricing curve across seasons, weekends, and length-of-stay
- Your minimum-night logic vs. your market's booking behavior
- Your amenities list — what's missing, what's underselling
- Your review response rate and how you handle critical feedback
- Your cancellation policy vs. conversion rate
- Your check-in process clarity
- Your house rules tone (friendly vs. punitive)
- Your instant book setting vs. market demand
- Your platform distribution (Airbnb-only = risk)
- Your direct booking funnel (if any)

---

### Application Form

**Form Title:** Tell me about your listing (takes 90 seconds)

Fields shown in Section 2 below. Embedded via Typeform, Tally, or Fillout with Calendly handoff on submit.

---

### Scarcity Counter

Dynamic element at top of page, updates live via backend:

```
X SPOTS REMAINING THIS WEEK
Week of [Month DD] — resets every Monday at 6 AM ET
```

Styling: red accent when 2 or fewer remain. Replace counter with "All spots claimed — join the waitlist" when zero.

Waitlist capture: email + property URL, triggers priority invite the following Monday.

---

### Social Proof Placeholders

Three testimonial slots with this structure:

**[HEADSHOT]**
"[2-3 sentence specific, numeric outcome quote]"
— [First Name] [Last Initial], [Market + Property Type]
[Revenue lift or metric: e.g., "+$18K in 90 days"]

**Launch phase copy** (use until real testimonials exist):
"Early audits have been booked by hosts from Asheville, Broken Bow, Joshua Tree, Finger Lakes, and Smoky Mountains. Testimonials coming as audits are completed."

---

### FAQ Section

**Q1: What's the catch? Why is this free?**
Two reasons. First, I run SpokeBnB — a course teaching hosts what I learned building Lakeside Landing FLX. Some audit recipients realize they want the full system; most don't, and that's fine. Second, I limit to 5 per week so each audit gets real attention — this isn't a scaled lead-gen funnel.

**Q2: How is this different from the automated audit tools I've seen?**
Those tools scrape your listing and spit out a generic report. I actually watch a 10-minute Loom of your listing, compare it to 3 comps in your market, and tell you the specific line in your description that's killing conversion. No bot can do that.

**Q3: Do I need to get on a sales call?**
No. The audit is delivered as a Loom video and PDF. The 15-minute follow-up call is optional and only if you want to walk through findings. If I think SpokeBnB is a fit for you, I'll mention it once at the end of the Loom — take it or leave it.

**Q4: My listing is brand new / has under 5 reviews. Can I still apply?**
Yes, and you're actually one of the best candidates. Fixing positioning before reviews pile up saves you months. I'll note on your scorecard that Reviews category is N/A and weight the other 7 categories to 35 points.

**Q5: How long until I get my audit back?**
Within 72 hours of your spot being confirmed. You'll get a calendar reminder, a Loom link, and a PDF scorecard — all emailed. If you booked the optional call, that's scheduled separately within 7 days.

---

### Footer CTA (Repeat)

**Only 5 audits per week. No renewals, no bulk, no exceptions.**
**[Claim Your Spot]**

---

## SECTION 2: APPLICATION FORM STRUCTURE

### Form Platform
Tally.so or Fillout (conditional logic support). 6 required questions + 3 optional + 2 disqualifier filters. Redirects to Calendly booking page on submit.

### Required Fields

1. **First & Last Name**
   - Type: Short text
   - Why: Personalization on Loom + email

2. **Email Address**
   - Type: Email (validated)
   - Why: Delivery + CRM entry

3. **Airbnb Listing URL**
   - Type: URL (validated — must contain `airbnb.com/rooms/` or `airbnb.com/h/`)
   - Why: The entire audit hinges on this
   - Helper text: "Paste the full URL from your listing page. VRBO or direct-book URL works too — just note which platform in the next field."

4. **Property Type**
   - Type: Single-select dropdown
   - Options: Cabin / Lake House / Beach House / Urban Condo / Suburban Home / Mountain Retreat / Desert / A-Frame-Unique / Other
   - Why: Lets me pull the right comp set

5. **Current Performance (past 12 months)**
   - Type: Single-select
   - Options:
     - Brand new — under 10 nights booked
     - Under $30K gross revenue
     - $30K–$60K gross revenue
     - $60K–$100K gross revenue
     - $100K–$150K gross revenue
     - $150K+ gross revenue
   - Why: Calibrates the audit depth and opportunity estimate

6. **Biggest Challenge Right Now**
   - Type: Long text (200 char min, 500 max)
   - Prompt: "In 2-3 sentences, what's the #1 thing you want me to figure out? (e.g., 'occupancy is fine but ADR is flat,' 'great summers but dead November-March,' 'stuck on 4.7 stars can't crack 4.9')"
   - Why: Focuses the Loom — highest-value question on the form

### Optional Fields

7. **City / Region**
   - Type: Short text
   - Why: Comp pull (also inferable from URL but faster if they provide)

8. **Have you tried any paid tools yet?** (AirDNA, PriceLabs, Rankbreeze, etc.)
   - Type: Checkbox multi-select
   - Why: Tells me where they are on the sophistication curve

9. **Anything you want me to look at specifically?**
   - Type: Long text, optional
   - Why: Some hosts have a theory they want validated

### Disqualifier / Filter Questions

10. **Is this listing currently live and bookable?**
    - Type: Yes / No / Launching within 30 days
    - Filter: "No" responses get a polite redirect to a pre-launch resource + waitlist. Don't burn an audit slot on a listing I can't see live.

11. **Do you own, co-host, or manage this property?**
    - Type: Owner / Co-host / Property Manager / Considering buying
    - Filter: "Considering buying" redirects to Barefoot Realty lead magnet (useful cross-sell). Owner, co-host, and PM all proceed.

### Submit Button Copy

**[ Send My Application — I'll Respond Within 24 Hours ]**

Microcopy under button:
*If a spot is open, you'll get a calendar link immediately after submitting. If this week is full, you'll be offered the first slot next week.*

### Post-Submit Redirect

On submit, conditional logic:
- If a spot remains this week: redirect to Calendly for 72-hour delivery window confirmation + optional follow-up call booking
- If full: redirect to waitlist confirmation + "Here's the lesson from Module 1 you can start with today" (free sample content to keep them warm)

---

## SECTION 3: AUDIT CHECKLIST — 40-POINT SCORECARD

Each category scored 1-5 per criterion. 8 categories total. Max score: 40.

**Grade Scale:**
- 36-40 = A (Top 5% — dial in edges)
- 32-35 = A- / B+ (Strong, small leaks)
- 28-31 = B (Solid foundation, clear gaps)
- 24-27 = C (Functional but leaking revenue)
- 20-23 = D (Multiple structural issues)
- Under 20 = F (Full rebuild — biggest upside)

### Category 1: Listing Title (5 points)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Hook** | Generic ("Nice Cabin in Mountains") | Descriptive but flat | Emotional trigger in first 3 words |
| **Keywords** | No searchable terms | 1-2 generic terms | Market-specific + differentiator keywords |
| **Length** | Under 30 or over 50 chars | 30-40 chars | 40-50 chars, no truncation on mobile |
| **Differentiator** | Nothing unique stated | Generic feature mentioned | Specific competitive edge in title |
| **Accuracy** | Misleading or exaggerated | Mostly accurate | Every word defensible on delivery |

### Category 2: Hero Photo (5 points)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Composition** | Phone snapshot, cluttered | Acceptable framing | Rule of thirds, clear focal point |
| **Lighting** | Dark, flat, or blown out | Natural but uneven | Golden hour or professional balance |
| **Time-of-day** | Midday harsh or dusk dark | Daytime standard | Sunset, sunrise, or twilight staged |
| **Emotional Hook** | No story | Pretty but static | Implies experience (lit fire pit, set table, lake w/ kayak) |
| **Professionalism** | Clearly amateur | DIY passable | Obviously professional or professional-quality |

### Category 3: Photo Sequence (5 points)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Order** | Random or room-by-room | Logical but obvious | Story arc: arrival → common → private → amenity → bonus |
| **Variety** | All interior, no outside | Some mix | Interior/exterior/detail/lifestyle all represented |
| **Lifestyle Shots** | None — empty rooms only | 1-2 staged | 3+ shots with implied people (fire, meal, book) |
| **Detail Shots** | None | A few | Signature details: coffee bar, bath amenities, view framed |
| **Exterior Coverage** | One exterior shot | Front + yard | Full exterior storytelling: approach, yard, nighttime, view |

### Category 4: Description Copy (5 points)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Hook in First 2 Lines** | "Welcome to our..." snooze | Mentions one feature | Specific, sensory, benefit-led opening |
| **Scannable Structure** | Wall of text | Some paragraph breaks | Headers, bullets, bolded keywords |
| **Benefit-Driven** | Lists features only | Mix of features/benefits | Every feature tied to guest experience |
| **Unique Amenities Highlighted** | Buried or missing | Listed in body | Called out with icon/header near top |
| **Local Color** | Zero mention of area | Generic area line | Specific local wins: restaurants, trails, secrets |

### Category 5: Pricing Strategy (5 points)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Seasonal Variation** | Flat rate year-round | 2-season split | 4+ season rates or dynamic pricing tool |
| **Weekend Premiums** | None | Small bump | 15-40% weekend lift appropriate to market |
| **Length-of-Stay Discounts** | None or random | Weekly only | Weekly + monthly + gap-night strategy |
| **Minimum Night Logic** | 1-night always or 7-night always | Standard 2-night | Market-tuned, weekend/holiday stretched |
| **Competitive Positioning** | Way below or way above comps | Mid-pack | Intentional premium or value play w/ data |

### Category 6: Amenities Listed (5 points)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Completeness** | Under 20 amenities | 20-35 | 40+ with accurate tags |
| **Premium Amenities Highlighted** | Hidden in list | Mentioned in copy | Called out in title, photos, and top of description |
| **Accuracy** | Listed amenities not present | Mostly accurate | Every listed amenity verified and visible in photos |
| **Guest Favorites Tagged** | None tagged | Default 2-3 | 5+ guest favorites with photos tied to each |
| **Accessibility Filters** | Ignored | Partially complete | Fully complete (expands discoverability) |

### Category 7: Reviews & Ratings (5 points)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Volume** | Under 10 reviews | 10-40 reviews | 40+ reviews |
| **Overall Rating** | Under 4.7 | 4.7-4.85 | 4.9+ |
| **Recency** | Last review 60+ days ago | Within 30 days | Within 14 days |
| **Response Rate** | Under 50% | 50-80% | Every review responded to |
| **Response Quality** | Generic or defensive | Polite, brief | Personal, specific, turns critiques into selling points |

**Note:** For listings under 10 reviews, mark N/A and redistribute 5 points across the other 7 categories (each becomes 5.71 points).

### Category 8: Settings & Policies (5 points)

| Criterion | 1 | 3 | 5 |
|---|---|---|---|
| **Instant Book** | Off without reason | On with heavy filters | On with smart filters tuned to market |
| **Cancellation Policy** | Strict on a mid-market property | Moderate default | Chosen intentionally to match ADR + market |
| **House Rules Clarity** | Wall of punitive rules | Standard rules | Friendly-toned, specific, no surprises |
| **Check-In Process** | Vague or only on request | Listed in "Other things to note" | Detailed guidebook, video, pre-arrival email |
| **Additional Guest Fees / Pet Policy** | Hidden or punitive | Listed | Transparent, competitive, called out in copy |

### Scoring Output

Score is calculated, graded, and displayed at top of PDF as:

```
OVERALL SCORE: 28 / 40 = 70% = C+
REVENUE OPPORTUNITY: $12K-$24K / year
TOP 5 PRIORITIES: [listed below]
```

---

## SECTION 4: AUDIT DELIVERY FORMAT

Three deliverables per audit: Loom video, PDF scorecard, optional call.

### 4a. Loom Video Script Template (10-15 minutes)

**Pre-recording prep** (5 min before hitting record):
- Have their listing open in a tab
- Have 2-3 comp listings open in adjacent tabs
- Have scorecard pre-filled so you can reference the grades
- Have their application responses pulled up

**Script Structure:**

**[0:00-0:45] Intro & Context** (keep it under 45 seconds)

> "Hey [First Name], this is [Your Name] from SpokeBnB. Thanks for sending over [Property Name]. You mentioned [quote their biggest challenge from application] — I focused a lot of this audit there. Here's how I'm going to do this: I'll walk through your listing the same way a guest would, in order, and then land on your top 5 priorities. At the end there's a PDF scorecard you'll get alongside this video with grades for all 8 categories. Let's jump in."

**[0:45-2:00] First Impression Pass**

Share screen on their listing. Scroll slowly from top.

> "Okay — this is what a guest sees in the first 3 seconds. [Read title aloud]. Let's talk about what that's doing and not doing..."

Cover: Title, hero photo, price block, top review snippet. Be direct but kind.

**[2:00-5:00] Photos & Copy Walkthrough**

Scroll through photos in order.

> "First photo — [reaction]. This is your hero, so let's talk about what it's selling. [Analysis]. Second photo — [reaction]. Here's where I'd reorder..."

Then scroll to description.

> "Your first two lines are what Airbnb shows before the 'read more' truncation. Right now they read: [read aloud]. Here's what I'd change and why..."

**[5:00-8:00] Pricing, Amenities, Settings Deep-Dive**

Open their calendar view.

> "Let's look at your pricing. I'm pulling up 3 comps in [market] — [names]. Here's what's happening: [observation]. You're [over/under/matching] on weekends but [gap] on midweeks..."

Cover: pricing curve, minimum nights, cancellation policy, instant book, amenities missing.

**[8:00-11:00] Reviews Audit**

Scroll to reviews section.

> "You've got [X] reviews at [Y] stars. Let's look at your responses. This one from [month] is a good template — [analysis]. This one I'd rewrite because..."

**[11:00-13:00] The Top 5 Priorities**

Go back to the top of the listing or switch to a simple document/whiteboard.

> "Okay, here are the 5 things I'd do if this were my property. Ranked by ROI:
> 1. [Specific action]. Why: [reason]. Estimated impact: [dollar or % range].
> 2. [Specific action]. Why: [reason]. Estimated impact: [dollar or % range].
> 3. [Specific action]. Why: [reason]. Estimated impact: [dollar or % range].
> 4. [Specific action]. Why: [reason]. Estimated impact: [dollar or % range].
> 5. [Specific action]. Why: [reason]. Estimated impact: [dollar or % range].
> You can do 1 and 2 this weekend. 3 and 4 this month. 5 needs a little more planning."

**[13:00-14:30] Overall Score + Soft Pitch**

> "Overall score: [X] out of 40, which is a [letter grade]. Your biggest strengths are [1-2 categories where they scored 4+]. Your biggest leaks are [1-2 categories where they scored 2 or lower]. Revenue opportunity I'd estimate is $[low]-$[high] per year if you executed all 5 priorities.
>
> Last thing — you'll probably notice that three of your top 5 priorities map directly to how we run Lakeside Landing FLX. If you want the full playbook — the pricing engine, direct booking setup, content system — that's what SpokeBnB covers. I'll drop a link in the follow-up email with a 20% launch code (LAUNCH497) that's good for 7 days. No pressure. Whether you join or not, you've got five things you can implement this weekend that'll move the needle.
>
> Thanks for sending this over. PDF is in your inbox. If you want the optional 15-minute call to ask questions, the Calendly link is in that same email. Good luck."

**[End record]**

### 4b. PDF Scorecard Layout

**File format:** 1-page landscape PDF, designed in Canva or Figma, delivered alongside Loom.

**Visual hierarchy:**

**TOP STRIP** (full width)
- Left: SpokeBnB logo
- Center: "Listing Audit Scorecard"
- Right: Audit date + auditor initials

**HEADER ROW** (big, above fold)
- Property name + first photo thumbnail
- Overall score: **28/40 = 70% = C+** (large, color-coded: green A-B, yellow C, red D-F)
- Revenue opportunity: **$12K-$24K / year** (supporting line)

**EIGHT CATEGORY BLOCKS** (2 rows × 4 columns grid)

Each block contains:
- Category name
- Score: 3/5 (letter grade next to number)
- One-line strength
- One-line gap
- Color bar (green 4-5, yellow 3, red 1-2)

**BOTTOM STRIP — TOP 5 PRIORITIES**
Numbered list with:
- Action
- Module mapping (subtle, italic): "See SpokeBnB Module 3"
- Impact estimate

**FOOTER**
- Optional call CTA + Calendly link
- "Your LAUNCH497 code (20% off, 7 days) is in your email"
- Social handles

**Color palette:** Match SpokeBnB brand. Neutral base (cream/white) with one accent color for scores.

### 4c. Optional Phone Call Structure (15 minutes)

Booked via Calendly, triggered by audit recipient choosing to schedule.

**[0:00-1:00] Warm Open**

> "Hey [Name], good to meet you. Did you get a chance to watch the Loom?"

If yes — skip to their questions. If no — ask which of the top 5 priorities they want to start with.

**[1:00-10:00] Findings Discussion**

Let them lead. Answer questions specifically. Don't re-deliver the Loom — assume they watched.

Common threads:
- "How would I actually implement #2?" → walk through practically, reference module later
- "I tried that and it didn't work because..." → diagnose, re-explain
- "How do I know if this is working?" → talk metrics, tracking

**[10:00-13:00] Recommend Next Steps**

> "Based on what you're telling me, here's what I'd prioritize this week: [pick 1-2 from their top 5]. After that, [next logical step]. If you want to get there faster, the SpokeBnB course is what we use internally — LAUNCH497 is still good through [date]. But to be clear: you can do all 5 priorities without the course. The course just compresses the timeline."

**[13:00-15:00] Soft Pitch (only if they show buying signals)**

Buying signals: "How much is the course?", "What's in Module X?", "Does it cover [specific thing]?"

If signals present:
> "Course is $1,997 normally, $1,500 with your code. Module breakdown is on the sales page — happiest to walk you through any specific module before you decide. Refund policy is 30 days, no questions asked."

If no signals:
> "Either way, really appreciate you applying. If there's anything I can help with in the next few weeks, shoot me an email. And if you end up implementing those top 5, send me a before-and-after screenshot — I love seeing results."

---

## SECTION 5: SOFT COURSE PITCH FRAMEWORK

### Mapping Findings to Modules

Every audit naturally surfaces gaps. The pitch isn't "buy the course" — it's "here's where the fix lives." Use this mapping table during the Loom and on the PDF.

| Audit Finding | SpokeBnB Module | Specific Lesson |
|---|---|---|
| Flat pricing, no seasonality | Module 3: Dynamic Pricing | Lesson 2 (Seasonal Curves) + Lesson 5 (PriceLabs Setup) |
| Weak description / buried hook | Module 2: Direct Booking Engine | Lesson 4 (Conversion Copy Framework) |
| Airbnb-only listing | Module 1: Distribution Platforms | Lesson 1 (Multi-Channel Strategy) + Lesson 3 (VRBO Setup) |
| No automation / manual messaging | Module 4: Automation & Systems | Lesson 2 (Hospitable Setup) + Lesson 6 (Guest Journey Automation) |
| No social / no content / no following | Module 5: Content & Social | Lesson 1 (Content Engine Template) + Lesson 4 (Reels Strategy) |
| No direct booking funnel | Module 2: Direct Booking Engine | Lesson 1-3 (Stack Setup) |
| No creator partnerships | Module 6: Creators | Lesson 2 (Outreach Templates) |
| No experiences / upsells | Module 9: Experiences | Lesson 1 (Upsell Framework) |
| Considering buying more properties | Module 10: Barefoot Realty | Full module (acquisition playbook) |

### The Closing Line (scripted, always used)

**End of Loom:**
> "Want me to walk you through exactly how to fix this? The full SpokeBnB System is what we're running on our own properties — including Lakeside Landing FLX, where the system is designed to go from an $82K annualized Year 1 base toward $147K in Year 2 (projected) using these exact plays. I'll send over a 20% launch code (LAUNCH497) in the follow-up email. That drops it from $1,997 to $1,500 and is good for 7 days. No pressure either way — you've got 5 things you can implement this weekend that don't cost a dollar."

### The Discount Code

**Code:** `LAUNCH497`
**Discount:** 20% off ($1,997 → $1,500)
**Expiration:** 7 days from audit delivery timestamp
**Audience:** Audit recipients only (one-time use per email)
**Tracking:** UTM tag `?utm_source=audit&utm_medium=loom&utm_campaign=launch497`

### Follow-up Email Mention

Code is mentioned:
1. At end of Loom video (once, verbal)
2. In PDF footer (once, visual)
3. In delivery email (once, with countdown)
4. In Day 3 follow-up email (once, reminder)
5. In Day 7 expiration email (once, final call)

Total: 5 mentions over 7 days. Never more. Never pushy.

---

## SECTION 6: AUTOMATION & TRACKING

### Tech Stack

- **Form:** Tally.so or Fillout
- **Scheduling:** Calendly (72-hour delivery window + optional 15-min call)
- **Notifications:** Slack webhook → #audit-inbox channel
- **CRM:** HubSpot Free, Notion, or Airtable
- **Email:** ConvertKit, ActiveCampaign, or Loops
- **Loom:** Loom Business (password + custom domain)
- **Payments:** Stripe (for course conversions)

### Automation Flow

**Trigger 1: Application Submitted**
- Form data → Zapier/Make webhook
- Creates CRM record tagged `audit-applicant`
- Sends Slack alert to #audit-inbox with full application
- Sends applicant confirmation email ("Got your application — 24hr response")
- Decrements spots-remaining counter on landing page (via Webflow CMS or equivalent)

**Trigger 2: Application Approved**
- Manual review (5 min per applicant)
- CRM tag updated to `audit-scheduled`
- Sends applicant Calendly link for delivery window + optional call
- Creates calendar block for 60 minutes (30 research + 15 record + 15 buffer)

**Trigger 3: Audit Delivered**
- Loom link + PDF attached → delivery email
- CRM tag updated to `audit-delivered`
- Triggers 7-day follow-up email sequence
- Generates LAUNCH497 code (unique or shared) with 7-day expiration

**Trigger 4: Course Purchased**
- Stripe webhook → CRM tag `audit-converted`
- Removes from audit follow-up sequence
- Adds to course onboarding sequence
- Slack alert to #wins channel

**Trigger 5: No Purchase After 7 Days**
- CRM tag updated to `audit-nurture`
- Added to 30-day re-engagement sequence
- Flagged for quarterly check-in email

### Pre-Call Prep Checklist (30 minutes before recording)

Use this checklist before every Loom. Don't skip steps.

- [ ] Read full application again — pull biggest challenge quote
- [ ] Open listing in incognito tab (see what guests see, not what owner sees)
- [ ] Open 3 comparable listings in same market/property type
- [ ] Pull AirDNA or Rankbreeze market data (if available)
- [ ] Pre-fill scorecard with 8 category scores
- [ ] Draft top 5 priorities in notes doc (bullets, not script)
- [ ] Calculate revenue opportunity range
- [ ] Identify 1-3 module mappings for the soft pitch
- [ ] Set Loom to 1080p, clean desktop, close personal tabs
- [ ] Water ready, notifications silenced

### Post-Audit Follow-Up Email Sequence (3 emails over 7 days)

**Email 1: Delivery (Day 0)**
Subject: **Your SpokeBnB Audit is Ready — [Property Name]**

Body:
> Hey [First Name],
>
> Your audit is done. Here's the package:
>
> - **Loom video (14 min):** [Loom URL]
> - **PDF Scorecard:** [Attachment]
> - **Optional 15-min call:** [Calendly URL]
>
> Quick summary: you scored **[X]/40 = [grade]**. Your biggest opportunities are [category 1] and [category 2]. Revenue upside I'd estimate is **$[low]-$[high]/year** if you execute the top 5.
>
> If you want to fast-track the full playbook, your audit recipient code **LAUNCH497** is good for **7 days** — drops SpokeBnB from $1,997 to $1,500.
>
> [Course Link]
>
> Either way, you've got 5 things to implement this weekend. Let me know if questions.
>
> — [Your Name]

**Email 2: Check-In (Day 3)**
Subject: **Did you start on #1 yet?**

Body:
> Hey [First Name],
>
> Quick check-in — curious if you've had a chance to start on priority #1 from the audit.
>
> That one's usually the fastest win. If you hit a wall, reply and tell me where you're stuck. I'll help.
>
> Also: LAUNCH497 code expires in 4 days. If SpokeBnB is on your radar, now's the moment.
>
> [Course Link]
>
> — [Your Name]

**Email 3: Expiration (Day 7)**
Subject: **Your LAUNCH497 code expires tonight**

Body:
> Hey [First Name],
>
> Last heads-up — your audit recipient code expires at midnight tonight.
>
> If SpokeBnB isn't the right fit, ignore this and good luck with the implementations. If it IS the right fit, here's the link one last time:
>
> [Course Link]
>
> After tonight, the course goes back to $1,997 and I don't issue retro codes.
>
> Rooting for you either way.
>
> — [Your Name]

### CRM Tagging Strategy

| Tag | Meaning | Next Action |
|---|---|---|
| `audit-applicant` | Submitted form, not reviewed | Review within 24hr |
| `audit-disqualified` | Didn't meet criteria | Add to nurture list |
| `audit-scheduled` | Approved, delivery pending | Deliver within 72hr |
| `audit-delivered` | Audit sent, in 7-day window | Monitor opens/clicks |
| `audit-call-booked` | Booked optional 15-min call | Prep for call |
| `audit-converted` | Purchased course | Onboard to course |
| `audit-nurture` | Audit delivered, no purchase after 7 days | 30-day re-engage |
| `audit-quarterly` | Nurture exhausted | Quarterly check-in cadence |

### 30-Day Re-Engagement Sequence (Audited but Didn't Buy)

**Day 14:** "Quick win you can try this weekend" — free content linked to one of their top 5 priorities
**Day 21:** Case study email — Lakeside Landing FLX numbers or another host's before/after
**Day 30:** "Course is $1,997 — no discount, but I'll answer your questions live this Friday" (office hours invite)

After Day 30, moved to quarterly cadence (light touch, 4x/year).

---

## SECTION 7: SCALING STRATEGY

The audit only works at small scale. Here's how to expand without breaking the magic.

### Stage 1: Founder-Led (Weeks 1-12)
- 5 audits/week, founder delivers every one
- Target: 60 audits in first 12 weeks
- Goal: Refine framework, collect 15+ testimonials, lock scorecard
- Conversion target: 15% = 9 course sales = $13,500+ in revenue

### Stage 2: VA-Assisted (Month 4-6)
**Hire:** One VA, part-time, $8-15/hr
**VA Role:**
- Triage applications against disqualifier criteria
- Pull comp data before founder's audit
- Pre-fill scorecard with mechanical items (photo count, review count, amenity count)
- Handle all scheduling, reminders, follow-up email sends
- Flag buying signals in post-audit responses

**Founder still delivers every Loom.** Video quality is the product.

### Stage 3: Trained Coach (Month 7-12)
**Hire:** Junior coach, $25-40/audit, likely a SpokeBnB course graduate
**Coach Role:**
- Deliver Looms for "Tier 2" audits (under $30K revenue hosts, new listings)
- Founder continues delivering "Tier 1" (over $60K revenue hosts, high-conversion-likelihood)
**Quality control:** Founder reviews every Coach Loom for first 20 audits before approving solo delivery

### Stage 4: Paid Audit Tier (Month 12+)
**Pricing shift:**
- Keep free audits at 3/week (founder delivers)
- Add paid $197 audit (coach delivers, faster turnaround, more detailed)
- $197 paid audit includes **$197 course credit** — functions as a try-before-you-buy
- Conversion on paid audits typically 40%+ (already warm, already invested)

**Why this works:** Free audits still drive top-of-funnel. Paid audits filter for intent. Both lead to course.

### Scarcity Caps (Never Break These)

| Channel | Weekly Cap | Reasoning |
|---|---|---|
| Free audits | 5 | Maintains "rare opportunity" perception |
| Paid audits | 10 | Still feels exclusive at $197 |
| Total audits/week | 15 | Max sustainable without quality drop |

If demand exceeds caps: waitlist + "first available next week." Never expand to clear backlog — backlog IS the marketing.

### When to Pull the Plug on Free Audits

Kill the free tier when any of these hit:
- Conversion rate on free audits drops below 10% (2 conversions per 20 audits)
- Applicant quality drops (under 50% meet qualifier criteria)
- Course sales from other channels exceed free audit conversions 3:1
- Founder time on audits exceeds 10 hrs/week and other growth channels are starving

Replace with: $197 paid audit only + one free audit/month raffled to email list.

---

## SECTION 8: PROMOTION

Case study anchor: **Lakeside Landing FLX** ($82K/yr annualized target, Year 1 of rebuild → $147K/yr projected Year 2). Hook: "Want me to look at YOUR listing using the same system we're building at our own property?"

### Facebook Group Post — Variation A (Direct)

> I just opened 5 Free Listing Audit spots this week.
>
> Here's the deal: I'll record a 10-15 min Loom walking through your Airbnb listing, grade it on a 40-point scorecard, and give you the top 5 things to fix this weekend. No sales call. No hour-long webinar. Just the audit.
>
> I'm using this exact framework at Lakeside Landing FLX — targeting $82K annualized in Year 1 of rebuilding our direct booking system, on a trajectory toward $147K in Year 2. I'm running audits to sharpen the playbook and build case studies for a course I'm launching.
>
> 5 spots. First come first served. Link in comments.

### Facebook Group Post — Variation B (Story)

> My Finger Lakes rental is targeting $82K/yr as the Year 1 annualized benchmark as we rebuild the direct booking system.
>
> The prior owners were doing around $125-130K combined (Airbnb + direct). We're rebuilding from an Airbnb-only baseline and the system is designed to reach $147K in Year 2. Same house. Same market. Different playbook.
>
> The framework we're using is the same one in this audit.
>
> I've been getting asked how I did it, so this week I'm running 5 free listing audits. I'll Loom your listing, score it out of 40, and give you 5 changes ranked by ROI.
>
> If you want in, link's in comments.

### Facebook Group Post — Variation C (Curiosity)

> Hosts: want to know exactly why your listing isn't converting?
>
> I've got 5 free audit spots this week. I'll record a Loom walking through your listing the way a guest sees it and give you a 40-point scorecard with your top 5 fixes.
>
> Last person I audited went from 62% occupancy to 81% in 60 days by changing 3 things (all free). Another dropped minimum nights and added $11K in fall revenue.
>
> No sales call. Link in comments. 5 spots only.

### TikTok / Reels Script (30-45 seconds)

**[0:00-0:03] Hook** (text overlay + direct-to-camera)
> "I'm auditing 5 Airbnb listings for free this week. Here's what I'm looking at."

**[0:03-0:10] Show the listing** (screen share or b-roll of listing page)
> "First: your title. You have 50 characters. Most people waste them on 'cozy cabin.' Big mistake."

**[0:10-0:20] Pain Point** (cuts between example listings)
> "Second: your first photo. It shouldn't show the room. It should show the experience. Fire pit at dusk beats living room at noon every time."

**[0:20-0:30] Credibility** (b-roll of Lakeside Landing)
> "I'm running this exact framework on my own Finger Lakes rental — targeting $82K in Year 1, $147K in Year 2. Now I'm applying it for 5 hosts per week. Free."

**[0:30-0:42] CTA**
> "Link in bio. 5 spots. Then it's closed till next week."

**[0:42-0:45] End card**
> "spokebnb.com/audit"

**Hashtags:** #airbnbhost #shorttermrental #airbnbtips #strinvesting #airbnboptimization

### Email to Existing List

**Subject:** I'm auditing 5 listings this week (free)

**Body:**
> Hey,
>
> Short one.
>
> I'm opening 5 Free Listing Audit spots this week. You get a 10-15 min Loom walking through your listing, a 40-point scorecard, and your top 5 fixes ranked by ROI.
>
> I've been quietly running these for a few weeks. Early results:
> - Host in Asheville: +$11K in fall revenue by changing minimum nights
> - Host in Broken Bow: +28% click-through by swapping hero photo
> - Host in Finger Lakes: +$4K/month by fixing pricing curve
>
> If you want a spot, it's first come first served. Once 5 are claimed, waitlist.
>
> **[Claim Your Spot]**
>
> — [Your Name]
>
> P.S. Full disclosure: I'm pre-selling SpokeBnB, which is the full system behind these audits. If the audit surfaces gaps you want help fixing at scale, I'll mention the course once. If not, you still walk away with 5 things to implement this weekend.

### LinkedIn Post (Property Manager Segment)

> Short-term rental property managers: if you manage 3+ listings and revenue has plateaued, I'm running free listing audits this week.
>
> I'm using this framework to rebuild Lakeside Landing FLX's direct booking system — targeting $82K annualized in Year 1, $147K projected in Year 2. Now I'm auditing 5 operator listings per week to refine the playbook.
>
> What you get:
> → 10-15 min Loom video walkthrough of your top-performing (or lowest-performing) listing
> → 40-point scorecard across Title, Photos, Copy, Pricing, Amenities, Reviews, Settings
> → Top 5 fixes ranked by revenue impact
> → Benchmark comparison against 3 market comps
>
> No sales call. No obligation. If you manage a portfolio and want to spot-check your standard operating procedure, this is the fastest way.
>
> Link in comments. 5 spots per week, reset every Monday.

---

## APPENDIX: QUALITY CHECKLIST

Before any audit goes out, verify:

- [ ] Loom is under 15 minutes and over 10 minutes
- [ ] Scorecard PDF has all 8 categories graded
- [ ] Top 5 priorities are ranked by ROI (not by category order)
- [ ] Revenue opportunity range is specific to their market/tier
- [ ] Each priority has an estimated dollar or percentage impact
- [ ] Module mapping appears at least once (in Loom) but under 3 times total
- [ ] LAUNCH497 mentioned exactly once verbally
- [ ] Case study (Lakeside Landing) referenced no more than twice
- [ ] Host's application quote referenced at least once
- [ ] Tone stayed kind, specific, and direct — not salesy

**The product is the audit. The course is the upsell. If the audit isn't genuinely useful without the course, the framework is broken.**

---

**END OF FRAMEWORK**
