# LESSON 2.2 (UPDATED): Website Blueprint & Build

*11 URLs that scale into the full ecosystem*

## Production Notes
- **Format:** OBSBOT screen recording (primary — full site build) + Canon 70D (intro/close)
- **Target Length:** 18-20 minutes (expanded due to expanded blueprint)
- **Visuals Needed:** Site architecture wireframe (11 URLs), platform comparison, lakesidelandingflx.com page-by-page walkthrough
- **Screen Recording:** Lodgify or OwnerRez build, plus a tour of the 11 Lakeside Landing FLX URLs so students see the finished version of what they're starting
- **This is a BUILD-ALONG lesson**

---

## VIDEO SCRIPT

### HOOK (0:00 - 0:40) [CANON 70D]

"By the end of this lesson, you will have a live direct booking site. Not 5 pages. Eleven URLs. Some will be fully built out in this lesson. Some will be placeholders that we fill in during Module 2B and Module 9. But the structure — the foundation of the full ecosystem — gets laid today.

If you've taken other STR courses, you've probably built a 5-page site. That was the old way. We're building for a business that will grow. Follow along, build as I build."

### PLATFORM SELECTION (0:40 - 3:30) [CANON 70D + SLIDES]

"**[SLIDE: Platform Comparison]**

Three realistic options:

**Option 1: Lodgify — Best for Most Hosts ($12-59/mo)**
- All-in-one: website + booking engine + channel manager + payments
- Pre-built vacation rental templates
- Fastest to a live site
- Good for: 1-10 units, operators who want to ship today

**Option 2: OwnerRez — Best for Power Users ($40+/mo)**
- Best booking engine and channel manager in the industry
- Website builder is more basic — pairs with WordPress for custom design
- Advanced features: damage deposits, rental agreements, tax handling
- Good for: operators who want maximum control

**Option 3: Custom Next.js Build — Best for Ecosystem Operators**
- Build it yourself or hire a dev (the Lakeside Landing FLX approach)
- Stack: Next.js 15 + Tailwind CSS + Vercel hosting
- Every URL in the ecosystem is a real, purpose-built page
- You have full control over SEO, schema, page speed, animations, and integrations
- Good for: operators serious about Module 2B's SEO engine

**[SLIDE: Which One Should You Pick?]**

Here's the honest take. Lodgify or OwnerRez is the minimum viable setup. You can absolutely run a great direct booking business on either — and you should start there if this is your first rodeo. Get to revenue, then upgrade.

But if you're willing to go further — if you already have a technical co-founder, or a budget for a developer, or the skills yourself — the custom Next.js build unlocks the full ecosystem potential. lakesidelandingflx.com is the working example. Next.js 15, Tailwind, Vercel, custom-built. Every page in the ecosystem is a real page with real SEO signals. The site loads in under a second. The /local-guide engine we'll build in Module 2B is native, not bolted on.

For this lesson, I'll demonstrate in Lodgify — because that's where most of you will start. But every URL we talk about can (and should) exist on your site regardless of platform. The blueprint is platform-agnostic. The execution differs."

### SITE ARCHITECTURE — THE 11-URL FOUNDATION (3:30 - 7:00) [OBSBOT + SLIDES]

"Before we touch the builder, let's map the site. Every URL here either generates revenue, generates traffic, or captures a relationship. Nothing is decorative.

**[SLIDE: The 11-URL Site Architecture]**

**Core booking URLs:**

**1. /home** — Hero + social proof + primary CTA
- Hero image + property name + 3-4 word experiential tagline
- 3 social proof elements: review count, press mentions, featured quote
- Primary CTA: 'Check Availability'
- Secondary CTAs: explore packages, explore local guide
- This page answers 3 questions in 5 seconds: what, why should I care, what do I do next

**2. /[property-name]** — The property page itself
- Example: lakesidelandingflx.com/lakeside-landing
- Photos, description, amenities, reviews, availability calendar, pricing
- Your Airbnb listing without the Airbnb tax

**3. /book** — The booking flow
- Date picker, guest count, pricing breakdown, add-on upsell ('Add a chef dinner to your stay?'), payment
- Three steps: pick dates, add info, pay
- This is where /add-ons get cross-sold at the highest-converting moment

**Trust & identity URLs:**

**4. /about** — Who you are, why you started
- Your face, your story, your reviews
- Critical for direct bookings — guests need to feel safe booking outside Airbnb

**Revenue-amplifier URLs:**

**5. /packages** — Curated experience bundles (pattern: lakesidelandingflx.com/packages)
- This is where /packages/fall-wine-weekend, /packages/reunion-compound, /packages/shoulder-reset live
- Each package is its own URL, its own pitch, its own booking flow
- Revenue target: packages sell for $2,000+ vs. room rate + 10%
- Developed in depth in Module 9

**6. /add-ons** — In-stay upsells (pattern: lakesidelandingflx.com/add-ons)
- /add-ons/chef-dinner, /add-ons/grocery-stocking, /add-ons/pontoon-cruise, /add-ons/winery-tasting
- Sold at checkout, in pre-arrival email, and in the in-property welcome card
- 40-60% margin on packaged experiences
- Developed in depth in Module 9

**Retention URLs:**

**7. /insider** — Loyalty page (pattern: lakesidelandingflx.com/insider)
- Members get early access to dates, Insider-only pricing, complimentary add-ons
- Email capture doubles as loyalty enrollment
- This is the 'come back' engine

**8. /refer** — Referral page
- $50 for them / $50 for you
- Unique tracked URL per guest
- Automated via your email platform

**9. /gift** — Gift cards
- Someone else's money, pre-paid and pre-committed
- Perfect for holiday season push
- Huge acquisition channel that most hosts ignore

**Ecosystem URLs (placeholders for Module 2B):**

**10. /local-guide** — The SEO engine
- This is a placeholder in Module 2 — just a page that says 'Guide coming soon'
- In Module 2B, this becomes a hub that links to /local-guide/wineries, /local-guide/restaurants, /local-guide/things-to-do, and dozens more sub-pages
- Each sub-page ranks in Google for a specific query and funnels traffic back to /book
- This is the single highest-traffic source once built

**11. /links** — Backlink partner page
- Placeholder now. In Module 2B, becomes your partner exchange page: wineries you recommend link back to you, and you list them here
- Drives domain authority, which drives /local-guide rankings

**[SLIDE: The Ecosystem Map]**

Look at this. 11 URLs. Four jobs. Book, trust, monetize, rank. Every URL serves one or more. Nothing decorative. This is what separates a brochure from an operating system."

### LIVE BUILD (7:00 - 16:00) [OBSBOT + SCREEN RECORDING]

"Let's build. I'm using Lodgify — the steps in OwnerRez or a custom build are analogous.

**[SCREEN RECORDING: Lodgify dashboard]**

**Step 1: Account + property (2 min)**
Sign up for Starter ($12/mo). Enter property details.

**Step 2: Template (1 min)**
Pick 'Starter' or 'Classic.' Don't spend 3 hours picking a template.

**Step 3: /home (3 min)**
- Hero image + headline formula: [Experience] + [Location]
  Example: 'Your Private Finger Lakes Wine Country Retreat'
- Sub-headline: 1 sentence on the primary differentiator
- 3 social proof elements above the fold
- 'Check Availability' CTA — prominent, contrasting color
- Below the fold: 3-4 feature highlights, top 2-3 reviews, 'Book Direct & Save' callout
- Below that: preview cards linking to /packages and /local-guide

**Step 4: /[property-name] (3 min)**
- All pro photos in optimized order
- Description rewritten in your brand voice (not Airbnb boilerplate)
- Amenity list
- Availability calendar widget
- Booking widget with Insider pricing visible

**Step 5: /book (2 min)**
- Connect Stripe
- Set nightly rate 5-10% below Airbnb rate
- Set minimums, cleaning fee, damage deposit
- Enable instant booking
- Enable add-on upsell at checkout (we populate the actual add-ons in Module 9)

**Step 6: /about (1 min)**
- Your photo, your story, your hosting journey
- Contact email + phone

**Step 7: /packages (2 min — placeholder)**
- Create the page with placeholder copy: '3 curated packages coming soon'
- We fully build this in Module 9 with /packages/fall-wine-weekend, /packages/reunion-compound, and /packages/shoulder-reset

**Step 8: /add-ons (1 min — placeholder)**
- 'Chef dinners, grocery stocking, pontoon cruises, winery tastings — coming soon'
- Fully built in Module 9

**Step 9: /insider (1 min)**
- Simple email capture page
- Headline: 'Join the Insider List'
- Benefits: early access, Insider-only pricing, complimentary add-on on return stays
- Capture → goes straight into your email platform

**Step 10: /refer (1 min)**
- Simple referral landing: '$50 for you, $50 for them'
- Explainer paragraph + email capture

**Step 11: /gift (30 sec — placeholder)**
- 'Gift cards coming soon' — we'll activate in Lesson 4 of this module

**Step 12: /local-guide (30 sec — placeholder)**
- 'Our insider guide to the [region] is coming soon. Join the Insider list to be notified when it drops.'
- Fully built in Module 2B

**Step 13: /links (30 sec — placeholder)**
- One-liner: 'Local partners, wineries, and businesses we recommend'
- We activate the backlink exchange in Module 2B

**Step 14: Domain + publish (2 min)**
- Buy a custom domain — short, memorable, includes the property name or location
- Connect it to Lodgify (or point DNS to Vercel if you went custom)
- Publish"

### POST-BUILD OPTIMIZATION (16:00 - 18:00) [CANON 70D]

"**[SLIDE: 7 Conversion Boosters]**

1. **'Book Direct & Save' badge** — visible on every page. Gives guests a reason to book here instead of Airbnb.
2. **Reviews everywhere** — pull your best Airbnb reviews onto /home, /[property-name], and /about.
3. **Mobile responsive** — test on your phone right now. 60%+ of traffic is mobile.
4. **Fast load** — compress images (TinyPNG). Every second of load time costs you conversions.
5. **Clear contact info** — email + phone visible on every page.
6. **Secure payment badge** — 'Secure Payment by Stripe' near the booking form.
7. **Analytics** — install GA4 now. We set up full measurement in Lesson 6.

**[SLIDE: Ecosystem-Ready URL Structure]**

One more thing — critically important — we cover this in depth in Lesson 4, but set the precedent now: your URL slugs should be clean, descriptive, and human-readable. '/finger-lakes/wineries' — not '/page?id=123.' This is not cosmetic. In Module 2B we'll build out dozens of guide sub-pages, and the URL structure you set today determines how much Google trusts those pages later. Set it up right, set it up once."

### CLOSE (18:00 - 19:00) [CANON 70D]

"You now have the 11-URL foundation live. Some pages are fully built. Some are placeholders. That's intentional — Module 2 builds the skeleton, Module 2B builds the SEO muscle, Module 9 builds the revenue fat.

**[SLIDE: Homework]**

1. Complete all 11 URLs on your site (placeholders are fine for /packages, /add-ons, /gift, /local-guide, /links)
2. Test the full booking flow in test mode
3. Add the 'Book Direct & Save' badge
4. Pull 5 best reviews and display them on /home, /[property-name], and /about
5. Test on mobile
6. Visit lakesidelandingflx.com and compare your structure — same URLs, same job for each URL
7. Share your site in the community for feedback

In Lesson 3, we build the data capture system — StayFi, email collection, and the database that makes this ecosystem compound.

See you there."

---

## SLIDES OUTLINE

| # | Title | Visual |
|---|---|---|
| 1 | Title Card | "Website Blueprint & Build" |
| 2 | Platform Comparison | 3 options incl. custom Next.js |
| 3 | Ecosystem Operator vs MVP Operator | Which platform fits you |
| 4 | The 11-URL Foundation | Full site map |
| 5 | Core URLs | /home /[property] /book /about |
| 6 | Revenue URLs | /packages /add-ons — Lakeside examples |
| 7 | Retention URLs | /insider /refer /gift |
| 8 | Ecosystem URLs | /local-guide /links — placeholders |
| 9 | 7 Conversion Boosters | Numbered |
| 10 | Ecosystem-Ready URLs | Clean slug examples |
| 11 | Homework | 7 items |

---

## TEMPLATES PROVIDED

1. **11-URL Site Map Template** — every page, every headline, every CTA
2. **/home Copy Template** — hero headline formula, social proof layout, CTA hierarchy
3. **/about Copy Template** — 4-paragraph founder story
4. **/insider Copy Template** — benefit-stack landing page
5. **/refer Copy Template** — $50-for-$50 referral landing
6. **FAQ Template** — 8 pre-written Q&As
7. **Domain Name Brainstorm Worksheet**
8. **Conversion Checklist** — 7-point post-build audit
9. **Ecosystem URL Slug Reference** — how to structure every sub-page for Module 2B

---

## STUDENT DELIVERABLES

- [ ] Platform selected (Lodgify, OwnerRez, or custom)
- [ ] All 11 URLs published (placeholders OK on /packages, /add-ons, /gift, /local-guide, /links)
- [ ] Stripe connected
- [ ] Nightly rates set (5-10% below Airbnb)
- [ ] All pro photos uploaded
- [ ] 'Book Direct & Save' badge visible everywhere
- [ ] 5+ reviews displayed on /home, /[property], and /about
- [ ] Booking flow tested
- [ ] Mobile tested
- [ ] Custom domain connected
- [ ] lakesidelandingflx.com walkthrough completed for structural comparison
