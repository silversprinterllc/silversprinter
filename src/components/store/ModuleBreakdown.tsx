'use client'

import { useState } from 'react'

interface Lesson {
  title: string
  summary: string
  bullets: string[]
}

interface Module {
  number: string
  title: string
  subtitle: string
  transformation: string
  lessons: Lesson[]
  tools?: string
  duration?: string
  phase?: string
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const STACK = [
  {
    phase: 'Day 1 — Required Before First Guest',
    color: 'bg-[var(--sf-gold)]/10 border-[var(--sf-gold)]/30',
    labelColor: 'text-[var(--sf-gold)]',
    tools: [
      { name: 'STR Insurance', cost: '$125–250/mo', note: 'Proper Insurance, Steadily, or CBIZ. Non-negotiable.' },
      { name: 'PMS (Property Management System)', cost: '$40–70/mo', note: 'Hospitable (1–5 units) or OwnerRez (direct-booking first). Pick one. Affiliate programs available.' },
      { name: 'PriceLabs', cost: '$19.99/mo', note: 'Dynamic pricing. Connects to your PMS. Set it and audit weekly. Affiliate: PriceLabs referral program.' },
      { name: 'Smart Lock', cost: '$150–250 one-time hardware', note: 'August, Schlage, or Yale. Keyless entry is non-negotiable. One-time purchase — not a subscription.' },
      { name: 'Noise Monitor', cost: '$10/mo + $99 device (one-time)', note: 'Minut or NoiseAware. Device is one-time hardware. $10/mo is the monitoring subscription. Affiliate: Minut referral program.' },
      { name: 'Turno', cost: 'Free–$8/mo', note: 'Cleaning operations and photo-verified turnover management. Affiliate: Turno referral program.' },
    ],
  },
  {
    phase: 'Month 1–3 — Add As You Grow',
    color: 'bg-[var(--sf-navy)]/[0.04] border-[var(--sf-navy)]/10',
    labelColor: 'text-[var(--sf-navy)]',
    tools: [
      { name: 'StayFi', cost: '$15/mo per property', note: 'Branded WiFi splash page that captures every guest\'s email and name. Affiliate: StayFi referral program.' },
      { name: 'Kit (email platform)', cost: '$9–29/mo', note: 'Guest email sequences, newsletters, return booking campaigns. Affiliate: 30% recurring commission — the best in the stack.' },
      { name: 'Canva Pro', cost: '$10/mo', note: 'QR cards, welcome assets, social templates. Free tier works initially. Affiliate: Canva affiliate program.' },
      { name: 'Direct Booking Site Hosting', cost: '$0–20/mo', note: 'OwnerRez includes basic site. Custom Next.js site on Vercel is $20/mo.' },
    ],
  },
  {
    phase: 'Month 3–12 — Growth Layer',
    color: 'bg-[var(--sf-navy)]/[0.04] border-[var(--sf-navy)]/10',
    labelColor: 'text-[var(--sf-navy)]',
    tools: [
      { name: 'Google Search Console', cost: 'Free', note: 'Tracks organic search traffic. Required for SEO work in Module 08.' },
      { name: 'Ahrefs Webmaster Tools', cost: 'Free', note: 'Backlink tracking and keyword research. Paid plan not required.' },
      { name: 'Google Analytics 4', cost: 'Free', note: 'Site traffic and conversion tracking.' },
      { name: 'Buffer or Later', cost: '$15–18/mo', note: 'Social scheduling. Only needed once you have consistent content output.' },
      { name: 'AirDNA', cost: '$99/mo (cancel after 2 months)', note: 'Market research for pricing and acquisition analysis. Research tool, not a permanent subscription.' },
    ],
  },
  {
    phase: 'As Needed — Add When Relevant',
    color: 'bg-[var(--sf-navy)]/[0.04] border-[var(--sf-navy)]/10',
    labelColor: 'text-[var(--sf-navy)]',
    tools: [
      { name: 'Viator Partner Account', cost: 'Free (8% commission)', note: 'Affiliate revenue from experience bookings. Set up when writing guide pages.' },
      { name: 'Minoan Experience', cost: 'Free (commission-based)', note: 'Shoppable property — guests buy what they use. Set up during Module 12.' },
      { name: 'Lob (direct mail)', cost: '$0.75–2 per card', note: 'Physical postcards to past guests. Used for seasonal win-back campaigns.' },
      { name: 'Hostaway', cost: '$100+/mo', note: 'Only needed at 5+ units. Replace Hospitable when you outgrow it.' },
    ],
  },
]

const STACK_TOTAL = 'Steady-state for most operators: $104–142/mo (PMS + PriceLabs + Minut monitoring + StayFi + Kit + Canva). Smart lock and noise monitor are one-time hardware — not recurring. AirDNA is a 2–3 month research tool, then cancelled. Full build-out ceiling is ~$200–370/mo. SpokeBnB participates in referral programs for tools we recommend — disclosed where applicable.'

// ─── Modules ─────────────────────────────────────────────────────────────────

const modules: Module[] = [

  // ── MODULE 00: FOUNDATION ─────────────────────────────────────────────────
  {
    number: '00',
    title: 'Foundation — The Hub',
    subtitle: 'The mental model that makes everything else work',
    transformation: '"My rental is a listing" → "My rental is a hospitality business with 10 distribution channels"',
    duration: '2 hours',
    phase: 'Phase 1: Acquire',
    lessons: [
      {
        title: 'The Hub-and-Spoke Model',
        summary: 'Your property is the hub. Every booking channel, content channel, and revenue stream is a spoke. The goal is never to depend on any single spoke — including Airbnb.',
        bullets: [
          'The 10 spokes: distribution platforms, direct booking, local SEO, content, creators, guest retention, experiences, sponsors, referrals, and acquisition',
          'Why platform dependence is the single biggest risk in STR operations — and how to structurally eliminate it',
          'The three stages every operator moves through: Operational (months 1–3), Growth (months 3–12), Scale (year 2+)',
          'Map where you are today and define what you\'re building toward before you touch anything else',
        ],
      },
      {
        title: 'The Three Numbers That Define Your Business',
        summary: 'Occupancy Rate, ADR, and RevPAR. Every decision in this course connects to one of these three. Learn to read them before you optimize anything.',
        bullets: [
          'Occupancy Rate: your filled nights ÷ available nights. Target: 70–85% for most leisure markets',
          'ADR (Average Daily Rate): gross revenue ÷ booked nights. This is what you optimize with pricing strategy — not just what you charge on a slow Tuesday',
          'RevPAR (Revenue Per Available Room): ADR × Occupancy. The single metric that captures both dimensions of performance',
          'Benchmark your current or projected numbers against your market using AirDNA comp data (covered in Module 01)',
          'Set 12-month targets for all three before you start building — you need a scorecard',
        ],
      },
      {
        title: 'Your Property Is a Hospitality Business',
        summary: 'The shift from "landlord mindset" to "operator mindset" is the most valuable thing this module delivers.',
        bullets: [
          'Hospitality businesses are optimized — they don\'t just wait for bookings. Every guest touchpoint, pricing decision, and marketing move is intentional.',
          'The hotel analogy: a 40-room hotel has a revenue manager, a marketing team, a GM, and a maintenance department. You are all four. The systems in this course replace the headcount.',
          'Operators who treat their STR like a hotel clear 30–50% more revenue than operators who treat it like a passive income rental',
          'Your time cost: after completing this course, your target is under 2 hours/week per property of active management. Everything else is automated, delegated, or eliminated.',
        ],
      },
      {
        title: 'What You Are Building — The 12-Month Roadmap',
        summary: 'A preview of where this course takes you, so you understand the destination before you start the work.',
        bullets: [
          'Month 1: operational foundation — insured, permitted, listed, automated, priced correctly',
          'Month 3: guest data captured, direct booking site live, review flywheel running, 4.8+ rating established',
          'Month 6: local SEO content live, email sequences working, returning guest campaigns active',
          'Month 12: 20–30% of revenue from direct bookings, creator network active, multiple revenue layers generating income',
          'Year 2+: compounding SEO, portfolio growth, optional service business (Module 14)',
        ],
      },
    ],
  },

  // ── MODULE 01: ACQUISITION ────────────────────────────────────────────────
  {
    number: '01',
    title: 'Acquisition — Buy the Right Property Before You Buy',
    subtitle: 'The most expensive STR mistake happens before the first guest ever checks in',
    transformation: '"I found a property I love" → "I have a data-verified acquisition with a defined guest avatar, a clear differentiation strategy, and a conservative underwrite"',
    duration: '2–3 weeks of research before any offer',
    phase: 'Phase 1: Acquire',
    tools: 'AirDNA, municipality websites, SpokeBnB Regulation Database, licensed STR inspector',
    lessons: [
      {
        title: 'Define Your Guest Avatar Before You Search',
        summary: 'Every operational decision flows downstream from one question: who are you hosting and why do they come here? Answer this before you look at a single property.',
        bullets: [
          'The avatar card — five dimensions: demographics (age, income, travel party size), psychographics (what they\'re escaping, what they\'re seeking), booking behavior (lead time, LOS, price sensitivity), review language (what words do they use about properties they love?), and non-negotiable amenities (the one thing they filter for)',
          'The 5 guest types that sustain STR businesses: couples retreats, family reunions, adventure travelers, work-cation remote workers, and occasion travel (bachelorette, anniversary, milestone). Each has different property requirements, minimum stay tolerance, and price sensitivity.',
          'Your avatar dictates your acquisition criteria before you search: couples need privacy, outdoor soaking tubs, and master-quality bedrooms. Families need sleeping for 6–10, a fully equipped kitchen, and stair gates if the area skews young. Adventure travelers need gear storage, a hose-off area, and proximity to the activity.',
          'The differentiator question: what one thing would your ideal guest mention in every review if you executed perfectly? Name that thing before you close. It becomes your capital investment priority.',
          'How to research your avatar: search your target market on Airbnb, read 30+ reviews for your comp properties. The guests\' own words tell you exactly who they are, what they value, and what they\'ll pay extra for. Do this before you tour anything.',
          'The mismatch warning: a property you love but that doesn\'t match your avatar is a business problem from day one. The waterfront property with one bedroom in a family market will always underperform, regardless of how well you optimize it.',
        ],
      },
      {
        title: 'Market Viability Analysis',
        summary: 'Your avatar tells you who. The market analysis tells you where. These two together define which geographic markets are worth entering — and which ones look good but aren\'t.',
        bullets: [
          'The 5 market indicators to analyze before you tour a single property: (1) ADR growth year-over-year, (2) occupancy stability across all four demand seasons — not just peak, (3) supply growth rate — how many new listings are entering?, (4) regulatory environment — stable, restricted, or at risk?, (5) RevPAR vs. acquisition carrying cost',
          'AirDNA market summary: pull this for any market before you visit. It shows demand trends, average revenue per listing by bedroom count, and supply growth. The data is directional — verify against your own comp analysis of 8–10 real listings.',
          'The saturation test: if your comp set is averaging 80%+ occupancy during shoulder season, there is demand capacity. If they are fighting for 50% occupancy year-round, you are entering a commoditized market where price becomes your only lever. That is not a business you want to build.',
          'Seasonality modeling: identify the four demand periods for your market — peak (2–3 months), high shoulder (2–3 months), low shoulder (3–4 months), off-season (1–3 months). Model revenue for all four. The off-season floor is your debt service stress test. If the property cannot service debt on off-season revenue alone, you need a larger cushion or a lower acquisition price.',
          'Regulatory risk: beyond the permit you need today, what is the regulatory environment? Pending moratorium? Cap on new STR licenses? HOA restrictions in target neighborhoods? A regulation change that eliminates your permit can remove 100% of income from a property you are still paying for.',
          'The SpokeBnB regulation database (free tool): covers key US vacation markets with monthly updates. Use it as your first check — then verify current status with the actual municipality before close.',
        ],
      },
      {
        title: 'Property-Level Analysis',
        summary: 'You have identified a viable market. Now you are evaluating individual properties. This scorecard separates the cash-flowing acquisitions from the expensive hobby farms.',
        bullets: [
          'The STR acquisition scorecard — 10 factors to grade before you offer: bedroom/bathroom count aligned to your avatar\'s party size, outdoor space quality and usable square footage, parking capacity, water or amenity access (lake, pool, beach — the single highest-value STR amenity), proximity to the demand driver (5 minutes from the lake is priced differently than 15), architectural character and photographic hook, lot size and neighbor proximity (noise complaints come from here), physical condition (what deferred maintenance will surface in a guest\'s first week?), expansion potential (ADU, detached garage, additional sleeping), and zoning/permitting stability',
          'What adds Airbnb value that does not add appraisal value — and therefore is underpriced at acquisition: hot tub ($5K–12K installed, adds $30–80/night), outdoor fire pit ($1K–3K, adds $15–25/night), game room ($3K–8K, adds $15–30/night), dedicated workspace (negligible cost, adds $10–15/night for work-cation positioning)',
          'The proximity premium: in lakefront and mountain markets, on-the-water or ski-in/ski-out properties earn 40–80% more than "close by" properties. The acquisition price gap is often smaller than the revenue gap. Always model revenue at each proximity tier before assuming "close" is close enough.',
          'Physical inspection priorities specific to STR operations: roof age and condition, HVAC (age and deferred service), hot water heater, plumbing material (no polybutylene), electrical panel capacity (200A if hot tub is planned), septic condition if applicable, deck and railing structural integrity, and any guest-visible cosmetic issue that will show in listing photos',
          'The "would a guest notice?" test for every inspection finding: a cracked grout line is cosmetic. A rattling HVAC is a 3-star review waiting to happen. Categorize every finding by its guest-experience impact, not just its repair cost.',
        ],
      },
      {
        title: 'Analyzing an Existing STR Business',
        summary: 'A property with an active Airbnb listing and underperforming numbers is a different acquisition than a property with no rental history. Both create opportunities. The underperformer is often the better deal.',
        bullets: [
          'Why underperforming STRs are frequently the best acquisition: bad photos + one platform + flat manual pricing + no automation + no guest communication = a property running at 40–60% of its revenue potential. You can fix all of those. You cannot fix location.',
          'The underperforming STR audit: pull the property\'s Airbnb URL from AirDNA or ask the listing agent for it. Analyze: review score, review count, review recency (active or abandoned?), calendar occupancy over the past 12 months, pricing structure (flat or dynamic?), listing photos (amateur or professional?), platform distribution (Airbnb only, or others?)',
          'What you can fix after acquisition: photos, listing copy, pricing strategy, platform distribution, automation, guest communication, cleaner quality, amenity additions. All of these are fixable in 30 days with the systems in this course.',
          'What you cannot fix: bad location, structural issues, persistent noise from neighbors or traffic, insufficient lot size, low bedroom count relative to your target avatar\'s group size, and proximity deficit to the demand driver. Buy the bones — fix the operations.',
          'Due diligence documentation to request from the seller: 24–36 months of platform payout reports (Airbnb year-end statements), Schedule E from the last 2–3 tax returns, maintenance history and known deferred items, active vendor relationships, current permit status, and whether the STR permit is transferable to the new owner',
          'The permit transferability question: in many jurisdictions, the STR permit is tied to the owner, not the property. When you buy, you may need to apply for a new permit — and in markets with a permit cap, that permit may not be available. This is a material acquisition risk. Confirm before you offer.',
          'Revenue normalization when analyzing historical data: if the seller ran only Airbnb with flat manual pricing and no direct bookings, their revenue is an artificially low floor. Your post-acquisition revenue will be measurably higher from operations improvements alone — even if market conditions stay identical.',
        ],
      },
      {
        title: 'Theme and Differentiation Strategy',
        summary: 'Theme is your positioning. It is the one thing you want every guest to say about your property in their review. You choose it before you close — it shapes what you pay for and what you invest in after.',
        bullets: [
          'The four theme categories: experiential (the cabin, the treehouse, the glass dome — architecture IS the experience), lifestyle (the wine retreat, the surf shack, the farmhouse — the activity defines the stay), amenity-led (the hot tub mountain house, the game room getaway, the pool-on-the-ridge), and location-led (the lakefront, the ski-in/ski-out, the walkable downtown loft)',
          'How theme drives acquisition criteria: a wine retreat needs outdoor dining space, wine storage feature, natural light for photography, and proximity to vineyards. A family reunion property needs sleeping for 10+, a large yard, a fully equipped kitchen, and proximity to family activities. Your theme is a property requirement checklist.',
          'The differentiation test — run it before you offer: search your target market on Airbnb, filter to your comp set by bedroom count and proximity, sort by Guest Favorite. What does the #1 listing have that properties ranked 10–20 do not? That is what the market rewards. Now ask: can you offer it, or can you offer something distinct that serves the same guest need?',
          'The "would they name it?" test: if your property would have a name, what would it be? The Lakehouse. The Treehouse on the Ridge. The Blue Door Cottage. If you can name it in 3 words, you have a theme. If you cannot, you do not have a positioning yet — and without positioning, you compete only on price.',
          'Theme is a capital commitment, not a decorating decision: once established, your improvement budget, your photography, your listing copy, and your local guide all reinforce the same thing. A wine retreat does not need a foosball table. A family adventure property does not need a wine wall. Focus is leverage.',
          'The local advantage: your theme should incorporate something that is only available in your specific market. "Hot tub mountain house" is generic. "Hot tub mountain house with direct trail access to the Appalachian Trail" is a defensible position.',
        ],
      },
      {
        title: 'The Improvement and Value-Add Plan',
        summary: 'The capital you deploy in year 1 should be ranked by revenue impact per dollar, not personal preference. This is not a renovation — it is an investment allocation.',
        bullets: [
          'The STR improvement ROI hierarchy: (1) outdoor space and signature amenity — hot tub, fire pit, outdoor kitchen, deck, pool. This is your highest-return category. (2) Photography-ready curb appeal — the first photo determines click-through rate. (3) Master bedroom — luxury linens, blackout shades, hotel-quality pillows. (4) Kitchen — fully equipped, not apartment-grade. (5) Secondary bedrooms last.',
          'Hot tub ROI model: installed cost $5K–12K. Typical ADR lift: $30–80/night. At a $50/night lift and 150 nights booked, that is $7,500 in additional annual revenue — payback in 12–18 months. This is the single most consistently high-ROI STR improvement across every market.',
          'The three categories of improvement: revenue-generating upgrades (calculable ROI — do these first), non-negotiable repairs (deferred maintenance that will generate a complaint in the first guest week — do these before you list), and "nice to have" items (things that improve the stay but will not move your rate — defer these to year 2 after you know what guests actually respond to)',
          'What NOT to spend on before your first booking: interior decor that does not photograph, branded throw pillows from a boutique, fourth TVs in rooms guests sleep but do not watch in, and "smart home" gadgets that require more than one step to operate',
          'The 90-day improvement calendar: pre-listing (all non-negotiable repairs + your first signature amenity), months 1–3 (professional photography refresh after signature amenity is installed + second revenue-generating upgrade), year 2 (outdoor kitchen, additional sleeping capacity, expansion permits if available)',
          'Capital planning: before you close, identify the top 3 revenue-generating improvements you can make in year 1 and underwrite them into your acquisition budget. They are not surprise expenses — they are the plan.',
        ],
      },
      {
        title: 'Acquisition Bias — The Most Expensive Mistake in STR',
        summary: 'Acquisition bias is what happens when you fall in love with a property and start rationalizing the numbers instead of analyzing them. It has ended more STR businesses than bad markets have.',
        bullets: [
          'The five warning signs you are in acquisition bias: (1) you are explaining away the off-season occupancy data, (2) you are projecting ADR significantly above current comps without a clear differentiation reason, (3) you are minimizing or deferring deferred maintenance costs ("we\'ll figure that out later"), (4) you have stopped seriously looking at other properties, (5) you are using emotional language in your financial model ("but the views are INCREDIBLE")',
          'The 80% rule: if the deal does not underwrite at 80% of your projected revenue, it is not a deal yet. It might become one after a price reduction, inspection adjustments, or a better market timing. Do not close on hope.',
          'The "what if I\'m wrong" model — run it explicitly: Model A is your projection. Model B is occupancy 15 points lower and ADR 10% lower than your Model A assumptions. Is the property cash-flow neutral in Model B? If not, how close to loss are you — and what is your buffer?',
          'The outside voice: before you close, have someone who does not love the property review your pro forma. A CPA who works with STR investors, an experienced STR operator, or a trusted advisor who will push back. Not a friend who will validate. The pushback is the value.',
          'Overpaying vs. underpaying: overpaying 5–10% for the right property in the right market is recoverable — revenue compounds. Paying any price for the wrong property in a saturated or regulatory-risk market is very hard to recover from. The acquisition decision is the highest-leverage decision you will make in this business.',
          'The acquisition volume rule: the best deals come after you have seriously analyzed 10–15 properties. By the time you find the right one, you have enough market context to recognize it without rationalizing it.',
        ],
      },
      {
        title: 'The Pre-Offer Checklist',
        summary: 'Before you submit an offer, these categories should all have answers. The ones that do not have answers are your negotiation leverage — or your reason to walk.',
        bullets: [
          'Legal & regulatory (confirm before offer): STR permit available in this specific address\'s jurisdiction, permit status if it exists (active? lapsed? transferable?), HOA CC&Rs reviewed for STR restrictions, zoning confirmed as STR-eligible, no pending local moratorium or regulatory review',
          'Financial (model before offer): 36-month conservative revenue projection at 80% of your avatar-specific comp set ADR and 75% occupancy, full operating expense model (insurance, PMS, pricing tool, cleaning, maintenance, utilities, capital reserves), cap rate at asking price, DSCR calculation at projected net income, 5-year exit model at 3× NOI',
          'Operational (due diligence items to request from seller): 24–36 months of platform payout reports, Schedule E from last 2–3 tax returns, maintenance history, active vendor contacts, any active guest stays that convey with purchase, and direct booking site or guest list if applicable',
          'Physical (inspection priorities for STR): roof, HVAC age and condition, hot water heater, plumbing material and pressure, electrical panel capacity, septic (if applicable and last service date), deck and balcony structural integrity, and any guest-visible issue that will appear in a listing photo or a review',
          'Negotiation leverage: every inspection finding is a negotiation point. A $3,000 HVAC replacement is a $3,000 price reduction ask. A non-transferable permit with uncertain replacement timeline is a material discount or a walk. Know your leverage before you sit across from the seller.',
          'When to walk: if the permit is non-transferable in a capped market, if the physical inspection reveals structural issues that change the underwrite, or if the seller cannot produce 24 months of income documentation for a claimed high-revenue property — walk. The next property is out there.',
        ],
      },
      {
        title: 'Tax Strategy — Know the Tools Before You Close',
        summary: 'This is not tax advice. But understanding the tax tools available to STR owners before you close — and discussing them with a CPA who specializes in real estate — can put more money in your pocket than any amenity upgrade. Some of these decisions have to be made at or before purchase.',
        bullets: [
          'Basic depreciation: residential rental property depreciates over 27.5 years using straight-line depreciation. On a $500,000 property (land excluded), that is roughly $16,000/year in non-cash depreciation deductions — a powerful offset to your rental income. Ask your CPA before your first filing.',
          'Cost segregation: a cost segregation study reclassifies portions of your property from 27.5-year depreciation to 5, 7, or 15-year schedules. Fixtures, flooring, appliances, landscaping, and personal property components accelerate. On a $400,000 STR, a cost seg study typically identifies $50,000–100,000 of assets eligible for accelerated depreciation. Study cost: $3,000–6,000. Potential year-1 tax benefit: substantially higher. Not every property benefits equally — your CPA models this before you commission the study.',
          'Bonus depreciation (Section 168(k)): assets identified in a cost segregation study may qualify for bonus depreciation — an accelerated write-off in year 1 instead of over the asset\'s useful life. Bonus depreciation percentages have been declining annually under current tax law (100% through 2022, phasing down). Get current rates from your CPA — the number matters significantly to your first-year tax picture.',
          'The Short-Term Rental exception to passive activity rules: STRs with an average guest stay of 7 days or fewer are not classified as rental activity under IRS passive activity rules. This means losses from the property (including depreciation) may be deductible against non-passive income — subject to material participation tests. This is one of the most powerful tax advantages available to STR owners and does not apply to long-term rentals. The rules are specific. Work with a CPA who knows them.',
          'Material participation: to use STR losses against active income, you must materially participate in the activity (500+ hours/year, or the only participant, or 100+ hours and not less than any other participant). The systems in this course — you managing your own listings, guest communications, and operations — often satisfy these tests. Document your hours. Your CPA will ask.',
          'Entity structure: most STR operators hold property in an LLC for liability protection. A single-member LLC is a disregarded entity for tax purposes — it files on Schedule E of your personal return. Multiple properties may warrant a series LLC or holding structure. If you operate the service business in Module 14, that income may belong in a separate entity. Do not mix the property-owning entity and the service business entity. Discuss structure with a CPA before you close on your first property.',
          'QBI deduction (Section 199A): some STR operators may qualify for the 20% qualified business income deduction on net rental income, particularly if the activity qualifies as a trade or business under IRS standards. The rules changed in 2024 guidance — have your CPA confirm your eligibility.',
          '1031 exchange: when you sell a property and roll the proceeds into a replacement property within the IRS timeline (45-day identification window, 180-day close), you defer capital gains taxes entirely. For operators who build a portfolio and eventually exit, the 1031 exchange is how you compound without triggering the tax bill. SpokeBnB connects operators with 1031-qualified brokerage resources for both relinquished and replacement property when the time comes. Covered in depth in Module 13.',
          'The CPA question list for acquisition day: (1) Does this property qualify for the STR exception to passive activity rules? (2) What are the projected year-1 tax benefits from bonus depreciation at current rates? (3) Is a cost seg study worth commissioning on this property? (4) What entity structure should hold this property? (5) What records should I keep from day one to maximize deductions? This conversation, before you close, is worth more than any course module.',
        ],
      },
    ],
  },

  // ── MODULE 02: GET LISTED ─────────────────────────────────────────────────
  {
    number: '02',
    title: 'Get Listed — Platform Setup from Day One',
    subtitle: 'Build your listing correctly once. Optimization never stops.',
    transformation: '"I don\'t know where to start" OR "I\'m already listed but underperforming" → "Three distribution channels, each dialed in, connected to one calendar"',
    duration: '1 week',
    phase: 'Phase 2: Launch',
    tools: 'Airbnb, VRBO, Google Vacation Rentals, Hospitable or OwnerRez',
    lessons: [
      {
        title: 'Platform Basics — Account Setup and Host Requirements',
        summary: 'If you are new to hosting, this lesson walks through account creation. If you are an existing host, use it to audit your profile and settings.',
        bullets: [
          'Creating your Airbnb host account: go to airbnb.com/host/homes. You will need: government ID verification, a real profile photo (face visible, smile), a complete bio (guests read this — write it like a hospitality professional, not an investor), phone verification, and a payment method connected',
          'Host profile matters: your response rate, your review score as a host, and your profile completeness all affect your listing\'s visibility in Airbnb search. An incomplete profile is a trust signal working against you.',
          'Category selection: choose Entire Home for any property where guests have exclusive access. Never select Private Room or Hotel for a whole-property STR — the category changes how guests find you.',
          'Two settings to configure immediately: (1) Turn off Smart Pricing — Airbnb\'s algorithm optimizes for Airbnb\'s booking volume, not your revenue. You will replace it with PriceLabs in Module 04. (2) Turn Instant Book on — listings without Instant Book lose 30–40% of search visibility.',
          'Co-host setup: if you are working with a property manager or operational partner, add them as a co-host. They get their own login, their own message access, and their own notification settings. You stay the primary host.',
          'VRBO account: create at vrbo.com/list-your-property. VRBO requires separate identity verification. Your Airbnb content does not transfer — you will build the VRBO listing separately with different copy optimized for VRBO\'s guest expectations.',
        ],
      },
      {
        title: 'Building Your Airbnb Listing from Zero',
        summary: 'The listing builder walkthrough — what every section asks and how to answer it in a way that converts browsers into bookings.',
        bullets: [
          'Title formula: [Signature Feature] + [Property Type] + [Location Hook]. "Lakefront A-Frame with Private Dock · 10 min to Wine Trail" outperforms "Cozy Lake House" in every metric.',
          'Photo sequence that converts: hero exterior (best angle, natural light, no fish-eye distortion) → main living space → master bedroom → kitchen → outdoor feature → secondary bedrooms → bathrooms → detail shots → location or view. First photo decides whether anyone reads anything else.',
          'Description structure: opening hook (the experience, not the address), property details (rooms, layout, capacity), the location (what makes this specific spot special), the honest note (what guests should know before they book — set accurate expectations)',
          'Amenity tagging: every amenity you physically have must be tagged. Untagged amenities do not exist in Airbnb search filters. Go through the full amenity list and check every box that applies — WiFi, dedicated workspace, washer/dryer, parking, pet-friendly, hot tub, lake access.',
          'House rules: keep them factual and friendly. The tone of your rules is a preview of you as a host. No paragraph-long prohibitions — guests will not read them and Airbnb will not enforce unwritten rules in a dispute.',
          'Pricing your first 30 days manually: set rates 10–20% below your intended steady-state price for your first month. Your goal for the first 10 bookings is reviews, not maximum revenue. Reviews unlock algorithmic visibility that no amount of discounting can buy.',
        ],
      },
      {
        title: 'Getting Your First Reviews — The Bootstrapping Problem',
        summary: 'New listings get less visibility until they have reviews. Reviews require bookings. Bookings require visibility. Here is how to break the cycle.',
        bullets: [
          'The Airbnb new listing boost: Airbnb gives new listings a temporary algorithmic boost for the first 30–60 days to help them get initial bookings. Price competitively during this window — this is the most important 60 days of your listing\'s life.',
          'The fastest path to first reviews: ask friends, family, or your own network to book and stay (even at cost). A guest who knows you will leave a thoughtful 5-star review and you can coach them on what to include.',
          'Optimizing the review ask: review requests go out within 2 hours of checkout (not the next day). The message acknowledges something specific from their stay. It links directly to the review page. Under 4 sentences.',
          'The review content you want: "5-star communication, perfectly clean property, exactly as described, smooth check-in process." These are the Airbnb algorithm\'s scoring categories. When your early guests know what matters, they write reviews that help you.',
          'Target: 10 reviews before you stop the new-listing discounting strategy. After 10 reviews, you have enough social proof to support full-market pricing.',
          'Responding to every early review: respond within 48 hours, even to 5-star reviews. Airbnb rewards engagement. Your responses are also public — they show future guests who you are as a host.',
        ],
      },
      {
        title: 'Airbnb Listing Optimization for Existing Hosts',
        summary: 'Airbnb is an algorithm. Understanding what it rewards is the difference between page 1 and page 7 for your target guest.',
        bullets: [
          'The Airbnb search ranking factors: overall review score (4.8+ needed for top placement), response rate (target 100%), acceptance rate (target 90%+), Instant Book status, listing completeness, and save rate (how often guests "heart" your listing without booking — a signal of visual appeal)',
          'Superhost vs. Guest Favorite: Superhost = 4.8+ rating, 90% response rate, 10+ stays, low cancellations — a host credibility badge. Guest Favorite = algorithmic, earned by sustained 5-star performance and high save rate. Both improve visibility. Neither can be bought.',
          '40-point listing audit: use the free SpokeBnB Listing Audit tool (/course/audit) to get a personalized review of your specific listing with a ranked fix list. The top 5 fixes account for 80% of the conversion improvement.',
          'Photo refresh ROI: professional photography on an existing listing typically lifts bookings 20–40%. If your photos are older than 18 months or were not taken by a professional, this is your highest-return optimization — typically $300–600 for a full session.',
          'Listing algorithm maintenance: Airbnb periodically rolls out algorithm updates. Subscribe to the Airbnb Host Community newsletter and check your listing stats monthly — a sudden ranking drop almost always has a specific cause.',
        ],
      },
      {
        title: 'VRBO — Setup and Optimization',
        summary: 'VRBO is not Airbnb with a different logo. The guest is different. The copy is different. The strategy is different.',
        bullets: [
          'VRBO traveler profile: older, higher income, traveling in family or multi-family groups, expecting whole-home access, longer average LOS (4–7 nights vs. 2–3 on Airbnb), and more likely to read your full listing description',
          'VRBO listing differences from Airbnb: lead with capacity and layout, emphasize outdoor space and full kitchen amenities, write longer description copy — VRBO guests actually read it. Your Airbnb title may need modification for VRBO\'s different search algorithm.',
          'Premier Host qualification (VRBO\'s equivalent of Superhost): 90%+ response rate, 4.5+ average rating, low cancellation rate, and at least 5 reviews. Achieving Premier Host status increases search placement.',
          '5-night minimum strategy on VRBO: VRBO\'s traveler expects and plans for longer stays. A 5-night minimum on VRBO filters out the lower-margin weekend bookings and protects your premium dates for full-week reservations.',
          'VRBO pricing: your PMS syncs rates across both platforms. You can apply a per-platform rate modifier — price VRBO 3–5% higher than Airbnb to account for their slightly different fee structure. Configure this in PriceLabs or your PMS.',
        ],
      },
      {
        title: 'Google Vacation Rentals',
        summary: 'Free organic visibility in Google search results. Most operators miss this channel entirely — which means it is an uncontested advantage for those who use it.',
        bullets: [
          'How it works: Google Vacation Rentals pulls availability and pricing directly from compatible PMSs and displays them in Google search results alongside hotel and OTA listings — at zero commission',
          'Compatible PMSs: OwnerRez, Lodgify, Hostaway, Guesty. Confirm your PMS connects to GVR before assuming. The connection requires a direct booking site with real-time availability.',
          'What you get: your property appears in searches like "Seneca Lake lakehouse rental September" alongside Airbnb and Vrbo results. When a guest clicks, they land on your direct site, not an OTA.',
          'Expected lift: 5–15% additional direct site traffic once established. The compound effect builds over 6–12 months as Google indexes your property pages.',
          'Setup time: 30–60 minutes once your PMS is connected. Ongoing maintenance: zero.',
        ],
      },
      {
        title: 'Channel Manager and Calendar Sync',
        summary: 'Double bookings are a platform penalty, a guest nightmare, and entirely preventable with the right connection method.',
        bullets: [
          'Your PMS is the single source of truth for your calendar. All platforms read from the PMS — you never update platform calendars directly.',
          'API connection vs. iCal: iCal has up to a 24-hour sync delay. API syncs in real-time. That 24-hour window is how double bookings happen. Always connect via API when the platform supports it. Both Airbnb and VRBO support API connection through your PMS.',
          'Testing your sync: after connecting, block a date in your PMS and confirm it blocks on both Airbnb and VRBO within 60 seconds. If it takes longer, your connection is iCal, not API.',
          'Platform-specific pricing: configure per-platform rate modifiers in your PMS or PriceLabs — e.g., VRBO at +4% over Airbnb base rates. This runs automatically once configured.',
          'What to do when a double booking happens despite proper setup (rare but possible): cancel the later booking immediately, contact the guest personally before they see the cancellation, and cover one night\'s rate at a comparable local hotel if needed. Never let the guest absorb the operational error.',
        ],
      },
    ],
  },

  // ── MODULE 03: OPERATIONS ─────────────────────────────────────────────────
  {
    number: '03',
    title: 'Operations — From Purchase to Day-One Ready',
    subtitle: 'The systems every operator needs before accepting a single booking',
    transformation: '"I have a property" → "I have an insured, automated, professionally managed business"',
    duration: '1–2 weeks',
    phase: 'Phase 2: Launch',
    tools: 'Proper Insurance / Steadily, Hospitable or OwnerRez, PriceLabs, August / Schlage, Minut, Turno',
    lessons: [
      {
        title: 'Insurance — The Non-Negotiable First Step',
        summary: 'Your homeowner\'s policy almost certainly excludes short-term rental activity. One uninsured incident can end the business.',
        bullets: [
          'Why homeowner\'s insurance explicitly excludes commercial rental use — and what "commercial" means in the policy language',
          'STR-specific carriers: Proper Insurance ($1,800–3,500/yr), Steadily ($1,200–2,800/yr), CBIZ (commercial portfolio pricing). Get quotes from all three before you choose.',
          'What to look for: $1M+ commercial liability, $25K+ guest damage protection, loss-of-income coverage (covers lost revenue during covered repairs — this matters when your roof fails in July)',
          'What to disclose accurately: rental frequency, platform(s), property type, guest capacity. Misrepresentation voids the policy at the moment you need it most.',
          'Platform coverage (Airbnb AirCover, VRBO\'s $1M guarantee) supplements your insurance — it does not replace it. Never operate without your own STR-specific policy.',
          'Add your property to the policy before you publish your listing.',
        ],
      },
      {
        title: 'Permits, Licenses & Compliance',
        summary: 'Every jurisdiction is different. Operating without a permit is not a gray area — it is a listing takedown and potentially a fine.',
        bullets: [
          'How to find your requirement: search "[city name] short-term rental permit" and "[county name] transient occupancy tax registration" — most municipalities publish this on their official website',
          'Common requirements: STR license/permit, Transient Occupancy Tax (TOT) registration, business license, zoning clearance. Many markets require all four.',
          'Platform tax remittance: Airbnb and VRBO collect and remit TOT automatically in most major jurisdictions. Confirm whether your market is included before you remit separately — double remittance is a compliance problem.',
          'The compliance calendar: permit renewal date, annual tax filing, quarterly remittance if applicable. Put these in your calendar with 30-day advance reminders.',
          'HOA and deed restrictions: confirm before you close, not after. Some prohibit STR outright. Others allow it with restrictions on minimum nights or guest count.',
        ],
      },
      {
        title: 'Smart Home Setup',
        summary: 'Keyless entry and noise monitoring are operational necessities, not luxury upgrades.',
        bullets: [
          'Keyless entry: August Smart Lock Pro ($229, Bluetooth + WiFi, retrofits existing deadbolt), Schlage Encode ($229, WiFi native), Yale Assure 2 ($179, works with most PMSs). All three support unique per-guest codes.',
          'Why keyless is non-negotiable: no lost keys, no lockouts, no key exchange, unique codes that expire at checkout, remote access if a guest gets locked out at midnight',
          'Guest code delivery: your PMS generates a unique code per booking and sends it automatically via your check-in day message. No manual work after initial setup.',
          'Noise monitoring: Minut ($10/mo + $99 device one-time) or NoiseAware ($15/mo + $199 device one-time). Detects decibel spikes without recording audio. Increasingly required by STR insurance carriers.',
          'Smart thermostat (recommended): Ecobee or Nest — remote temperature control and occupancy detection for energy management between stays.',
          'What not to install: interior cameras are illegal in most jurisdictions and will get your listing removed from every platform immediately. Outdoor cameras on entrances only.',
        ],
      },
      {
        title: 'The Cleaning System',
        summary: 'Your cleaner is your most important operational relationship. This system makes it reliable, photo-verified, and backup-proof.',
        bullets: [
          'Finding your cleaner: Turno marketplace (browse local cleaning teams with STR experience and reviews from other hosts), Thumbtack, host referrals from your market',
          'Cleaning fee strategy: set the fee to cover your actual cleaning cost — it is not a profit center. Underpricing it creates resentment and turnover in your cleaning team.',
          'Photo-verified checklist in Turno: build a room-by-room checklist. Cleaner uploads timestamped photos of each completed section before marking the turnover done. You see it in real time.',
          'The turnover window: checkout at 10am, check-in at 3–4pm. Six hours minimum. Never sacrifice this window for a same-day booking unless a second confirmed cleaner is already assigned.',
          'Always have a backup cleaner identified and available. One day-of cancellation without a backup means canceling a guest — which triggers platform penalties and potential Superhost status loss.',
          'Restock system: your cleaning team manages a supply checklist. You replenish monthly via a standing Subscribe & Save order. No ad hoc supply runs.',
        ],
      },
      {
        title: 'The Maintenance Network',
        summary: 'Build your vendor network before you need it. At 11pm on a Friday with guests checking in Saturday, you have no time to search.',
        bullets: [
          'The six vendor categories to have on file before Day 1: licensed plumber, electrician, HVAC technician, general handyman, locksmith, landscaping/snow removal',
          'Qualifying your vendors: "Do you work with short-term rentals? Can you respond same-day for guest emergencies?" Not every contractor will — and you need ones who will.',
          'The Emergency Protocol: (1) Acknowledge the guest within 30 minutes regardless of hour — silence is worse than any problem, (2) Assess — is the guest safe? Is the property safe? (3) Dispatch with a vendor ETA you communicate to the guest, (4) Compensate if the issue affected the stay — a proactive partial refund is cheaper than a platform dispute and a public 1-star review, (5) Document with timestamped photos and vendor receipts for insurance claims.',
          'Partial refund guide: minor inconvenience (10–20% of night\'s rate), stay significantly impacted (50% of affected nights), property uninhabitable (full refund + help finding alternative if possible).',
          'Preventative maintenance calendar: HVAC filter quarterly, hot tub chemical check weekly, exterior gutter clean spring/fall, full property walk-through after every 20 stays.',
        ],
      },
      {
        title: 'Property Setup and Initial Inventory',
        summary: 'What a guest actually needs — and what separates a 4.7 rating from a 5.0.',
        bullets: [
          'Essentials checklist: bedroom (hotel-quality linens, extra pillows, blackout shades, phone charger by the bed), bathroom (hair dryer, full-size toiletries, first aid kit), kitchen (basic cookware set, coffee and filters, olive oil, salt, pepper, dish soap, paper towels, trash bags), outdoor (weather-rated furniture, grill brush, extra trash bags)',
          'The "thoughtful detail" list — what moves the review: an umbrella by the door for rainy arrivals, a local restaurant card handwritten by you, WiFi password in large print framed on the counter, a welcome note with one personal line about why you love this property',
          'The house manual: one physical binder (index-tabbed) and one digital version (Notion or TouchStay). Covers: check-in and checkout instructions, WiFi, all appliance guides, trash pickup day, parking instructions, local emergency numbers, and your direct contact.',
          'Photography-ready staging before your listing photos: remove personal items, maximize natural light, make every bed hotel-crisp, declutter surfaces, remove excess furniture that crowds the space. Hire a real estate or lifestyle photographer — not a friend with an iPhone.',
        ],
      },
      {
        title: 'Your PMS — The Central Nervous System',
        summary: 'One platform that connects your listings, calendar, messages, cleaning, and pricing. Without it, you are doing everything manually.',
        bullets: [
          'What a PMS does: syncs your calendar across all platforms in real-time (no double bookings), unifies your inbox across Airbnb and VRBO, delivers your 6 automated messages, manages cleaning auto-scheduling via Turno, and feeds data to PriceLabs',
          'Decision guide: Hospitable ($39–69/mo) — best for 1–5 units, fastest setup, strong Airbnb integration, excellent AI message assist. OwnerRez ($40/mo) — best if direct bookings are a priority, more technical but more powerful, includes basic direct booking site.',
          'Day 1 PMS setup: connect Airbnb via API (not iCal), connect VRBO via API, load your 6-message template library, configure cleaning auto-scheduling via Turno integration.',
          'Connect PriceLabs on the same day: the two tools work together — PriceLabs pushes optimized nightly rates to your PMS, which pushes them to your listings. Once configured, this runs automatically.',
        ],
      },
      {
        title: 'Guest Communication Foundation',
        summary: 'The six messages every guest receives automatically, before you ever read a notification.',
        bullets: [
          'Message 1 — Booking Confirmation (immediate): thank them by name, confirm dates and property name, tell them what is coming next',
          'Message 2 — Pre-Arrival (5 days before): directions, parking, what to bring, any property-specific notes',
          'Message 3 — Check-In Day (morning of): smart lock code, step-by-step entry instructions, your phone number for emergencies only',
          'Message 4 — Mid-Stay Check-In (day 2 for stays of 3+ nights): brief, genuine — "Hope you\'re having a great time. Anything you need, just say the word."',
          'Message 5 — Checkout Reminder (morning of checkout): checkout time, 3-step checklist (lock up, start dishwasher, close windows), thank them in advance',
          'Message 6 — Post-Stay Thank You (within 2 hours of checkout): genuine note, direct link to leave a review. This message is the single highest-leverage action for your review rate.',
          'All six load into your PMS and send automatically. After initial setup, your guest communication requires zero active time.',
        ],
      },
      {
        title: 'The Emergency Response Protocol',
        summary: 'What to do when something goes wrong — at any hour, with guests on property.',
        bullets: [
          'Pin in your PMS inbox: all 6 vendor numbers, Airbnb resolution center, VRBO support, your insurance claims number. When something goes wrong, you open one document.',
          'Guest locks out: smart lock app — generate a new code remotely in 60 seconds. This is why keyless entry is non-negotiable.',
          'Appliance failure: message the guest with ETA for vendor response. If the failure significantly impacts the stay, offer a partial refund proactively — do not wait for them to ask.',
          'Noise complaint from neighbors: acknowledge the complaint, message the guest with a calm house rules reminder, document the time and nature of the complaint.',
          'Guest damages property: photo-document everything before touching anything. File through Airbnb/VRBO resolution center within their reporting window (24 hours for Airbnb). Escalate to insurance if above platform coverage threshold.',
          'Unsafe situation: guest safety first — evacuate if needed. Platform and insurance communication is secondary to safety.',
        ],
      },
      {
        title: 'The Pre-Launch Checklist',
        summary: 'Fifteen items to verify before you accept your first booking.',
        bullets: [
          '✓ STR insurance policy active and confirmed in writing',
          '✓ Local STR permit or license in hand (or confirmed exempt)',
          '✓ Smart lock installed, tested, and connected to PMS for auto-code delivery',
          '✓ Noise monitor installed and armed',
          '✓ Primary cleaner confirmed with Turno checklist built and photo verification enabled',
          '✓ Backup cleaner identified and available',
          '✓ All 6 maintenance vendor categories have a confirmed contact',
          '✓ PMS connected to Airbnb and VRBO via API (test the sync — block a date and confirm it appears on both platforms within 60 seconds)',
          '✓ PriceLabs connected and base price set with guardrails',
          '✓ All 6 message templates loaded and trigger-tested',
          '✓ House manual complete — physical binder and digital version',
          '✓ Emergency contact sheet pinned in PMS inbox',
          '✓ Property fully stocked per inventory checklist',
          '✓ Test your own check-in: walk through every step a guest will take',
          '✓ First 30 days priced manually — collect baseline data before automating',
        ],
      },
    ],
  },

  // ── MODULE 04: REVENUE ENGINE ─────────────────────────────────────────────
  {
    number: '04',
    title: 'Revenue Engine — Pricing That Responds to Demand',
    subtitle: 'Let data set your prices. Your gut is expensive.',
    transformation: '"I charge $200/night year-round" → "My pricing responds to market demand in real-time and I never leave money on the table"',
    duration: '1 week',
    phase: 'Phase 3: Revenue & Systems',
    tools: 'PriceLabs, AirDNA (2–3 months), Beyond Pricing (alternative)',
    lessons: [
      {
        title: 'Pricing Psychology',
        summary: 'Guests compare your price to alternatives — hotels, competitors, vacation budget. Not to your costs.',
        bullets: [
          'Build your value stack: list every amenity, experience, and convenience your property offers that a comparable hotel does not. This is what justifies your rate.',
          'The underpricing trap: low prices signal low quality and attract the guests most likely to cause problems and leave the lowest reviews',
          'Price anchoring: your premium-season rate sets the anchor. Off-season feels reasonable by comparison — not cheap. Never lead with the discount.',
          'The premium test: raise your base price 20% and hold it for 30 days. If occupancy stays above 70%, you were underpriced. If it drops below 60%, walk it back 10%.',
        ],
      },
      {
        title: 'Market Data and Competitive Intelligence',
        summary: 'You cannot price in a vacuum. Your competitors\' calendars are public — use them.',
        bullets: [
          'AirDNA setup: pull RevPAR, ADR, and occupancy benchmarks for your specific market filtered by bedroom count and property type. Compare your current performance to the market median and the top quartile.',
          'Your comp set (8–10 listings): same bedroom count, similar location radius, similar amenity tier. Track their rate changes weekly — their pricing tells you what the market is willing to pay in real time.',
          'Seasonal demand mapping: pull 12 months of historical occupancy data and identify your four demand periods with specific month ranges. Label each as peak, high shoulder, low shoulder, or off-season.',
          'Local event calendar: identify 10–20 annual events in your market that spike demand. Load each one into PriceLabs as a custom event with a specific rate lift percentage.',
        ],
      },
      {
        title: 'PriceLabs Setup and Configuration',
        summary: 'The algorithm that makes more money than any pricing you would set manually.',
        bullets: [
          'Connect PriceLabs to your PMS via the API connection already established in Module 03. PriceLabs reads your calendar and pushes rates to your listings automatically.',
          'Set your base price: what you would charge for a Tuesday in mid-shoulder season at 100% occupancy. Everything adjusts from this anchor.',
          'Non-negotiable guardrails: minimum price (the absolute floor — never go below this), maximum price (prevents the algorithm from pricing above your market ceiling and killing bookings)',
          'Day-of-week rules: weekends typically run 25–40% above weekday base in leisure markets. Configure this explicitly rather than relying on the algorithm to learn it.',
          'Last-minute discount tiers: 15% off if the night is open 7 days out, 25% off at 3 days. You are filling calendar gaps, not training guests to wait for discounts.',
          'Weekly 15-minute audit: check your calendar 45 days out and manually adjust any anomalies — events the algorithm missed or rate spikes that look unreasonable relative to comps.',
        ],
      },
      {
        title: 'Length of Stay and Revenue Optimization',
        summary: 'Nightly rate is one number. Total revenue per stay is what actually matters.',
        bullets: [
          'Minimum night strategy by season: peak season (4–5 night minimum — protects weekend premium and reduces cleaning frequency), shoulder season (3 nights), off-season (2 nights to fill the calendar)',
          'Length-of-stay discount ladder: 5% for 7+ nights, 10% for 14+ nights, 15% for 28+ nights. Longer stays reduce cleaning cost per night and improve occupancy without lowering ADR meaningfully.',
          'Cleaning fee calibration: set the cleaning fee to recover your actual cleaning cost. A correctly priced cleaning fee acts as a natural filter — it discourages single-night bookings that are not worth the turnover cost.',
          'True RevPAR calculation: total revenue (nightly rate + cleaning fee + pet fee + add-on revenue) ÷ total available nights. This is the only metric that captures full property performance and should be your monthly tracking number.',
        ],
      },
    ],
  },

  // ── MODULE 05: SYSTEMS & AUTOMATION ──────────────────────────────────────
  {
    number: '05',
    title: 'Systems & Automation — Your Business Without You',
    subtitle: 'Every repeating task should happen automatically or not at all',
    transformation: '"I manage everything manually" → "My business runs in under 2 hours per property per week"',
    duration: '2 weeks',
    phase: 'Phase 3: Revenue & Systems',
    tools: 'Hospitable / OwnerRez / Hostaway, Turno, PriceLabs, StayFi',
    lessons: [
      {
        title: 'The Automation Audit',
        summary: 'Map every task you do in a week. Categorize each one: automate, delegate, or eliminate.',
        bullets: [
          'Track every STR task for one full week — guest messages, pricing checks, calendar updates, cleaning coordination, supply orders, review requests, social posts',
          'Apply the three filters: Can this be automated by your PMS or a connected tool? Can it be delegated to your cleaner, handyman, or VA? Does it actually need to happen at all?',
          'The 2-hour target: after completing this module, your weekly active time per property should be under 2 hours. Track it and hold the standard.',
          'The five operational workflows to systematize: guest communication, cleaning and turnover, maintenance, pricing, and reporting',
        ],
      },
      {
        title: 'Guest Messaging Automation',
        summary: 'You already built 6 templates in Module 03. Now configure the triggers so they send without you.',
        bullets: [
          'Configure each template in your PMS with its exact trigger: booking confirmed, X days before check-in, check-in day morning, day 2 of stay, checkout morning, 2 hours after checkout',
          'AI-assisted replies for common guest questions: Hospitable and Hostaway both include AI co-pilots that draft responses to incoming questions. You review and approve in under 5 minutes instead of writing from scratch.',
          'Escalation flags: configure your PMS to send you a priority notification (not just email — push to phone) for any message containing words like "emergency," "broken," "flooded," or "unsafe."',
          'Response time metric: Airbnb\'s algorithm rewards sub-1-hour response rates. With automation, your effective response time for common questions is under 5 minutes.',
        ],
      },
      {
        title: 'Cleaning and Turnover Automation',
        summary: 'Every checkout triggers a cleaning. Every cleaning gets photo-verified. No manual scheduling, no group texts.',
        bullets: [
          'Turno connects to your PMS — every confirmed booking automatically schedules a cleaning for the checkout date. Cleaner is notified without any action from you.',
          'Photo-verified completion: each section of the turnover checklist requires a timestamped photo before the cleaner can mark it complete. You see the property condition after every single turnover.',
          'Turnover quality score: Turno tracks photo-verified completion rates per cleaner. Use this data quarterly to review cleaner performance.',
          'Supply restock system: cleaner marks supplies as low during turnover. You review the list monthly and place a single replenishment order. No ad hoc runs.',
        ],
      },
      {
        title: 'Marketing and Retention Automation',
        summary: 'Guests who had a great stay should hear from you again before they book somewhere else.',
        bullets: [
          'Post-stay review request (automated, 2 hours after checkout): already set up in Module 03. This single automation is the highest-leverage action in your entire review strategy.',
          'Return guest invitation (automated, 90 days post-checkout): direct calendar access link, no discount required. Calendar access alone converts at 3–4× the rate of a discount email.',
          'Referral trigger (automated, 30 days post-checkout): "Do you know someone who would love this place?" with a unique tracking link. Target: 10–20% of new direct bookings from referrals by month 18.',
          'StayFi integration: connects guest WiFi opt-ins to your email platform automatically. Every guest who connects to your WiFi enters your email marketing sequence without manual import.',
        ],
      },
      {
        title: 'Operational Reporting',
        summary: 'You cannot improve what you do not measure. Set up monthly reporting once and let it run.',
        bullets: [
          'Monthly performance dashboard: RevPAR vs. prior month, occupancy rate, ADR, direct booking percentage, review count and score — pull from your PMS in under 15 minutes',
          'Cleaning performance: Turno photo completion rate, flagged issues, time-to-complete vs. your standard turnover window',
          'The annual audit: once per year, review every tool you pay for. Cancel anything you have not actively used in 60 days. Renegotiate anything you use heavily.',
        ],
      },
      {
        title: 'Building Your SOPs',
        summary: 'A Standard Operating Procedure is a written process anyone on your team can follow without calling you.',
        bullets: [
          'Start with the four most critical SOPs: guest cannot access property, maintenance emergency, guest damage claim, and negative review response',
          'SOP format: trigger (when does this apply?), decision tree (if X then Y), resources needed (vendor contacts, platform support), and resolution (what does done look like?)',
          'Store SOPs in Notion and share with your cleaner and handyman. Update after any incident the existing SOPs did not cover.',
          'The "72-hour unavailable" test: if you were unreachable for 72 hours, could your property keep operating? If not, identify the gap and build the SOP.',
        ],
      },
    ],
  },

  // ── MODULE 06: GUEST CAPTURE & LTV ───────────────────────────────────────
  {
    number: '06',
    title: 'Guest Capture & Lifetime Value',
    subtitle: 'Every OTA booking is a first-party relationship waiting to happen',
    transformation: '"Guests book once and disappear" → "I own my guest relationships and fill my calendar without discounting"',
    duration: '3 weeks',
    phase: 'Phase 4: Growth',
    tools: 'StayFi, Kit, Lob, OwnerRez, Stripe',
    lessons: [
      {
        title: 'Why Guest Data Is Your Most Valuable Asset',
        summary: 'Airbnb owns the guest relationship. You need to own it too — because Airbnb can change fees, change algorithms, or delist your property. Your guest list cannot be taken from you.',
        bullets: [
          'The math: a returning direct guest costs $0 to acquire. An OTA booking costs 15.5%. At 150 stays/year and 30% direct, you keep $11,625 that was going to Airbnb.',
          'Direct guests are also higher quality: they chose to find you specifically, booked with no algorithm pushing them, and are more likely to leave detailed reviews',
          'What you are building: a first-party owned database of guests who know you, trust you, and prefer booking directly — and who refer their friends',
        ],
      },
      {
        title: 'The Five Capture Surfaces',
        summary: 'One Airbnb booking can produce three or four first-party relationships. Here is how to capture all of them.',
        bullets: [
          'Surface 1 — StayFi WiFi: branded splash page. Every adult who connects provides name + email. Your highest-volume capture surface.',
          'Surface 2 — Physical Guestbook + QR: a premium bound book with a QR to your /guestbook page. Captures occasion, message, mailing address — what WiFi capture doesn\'t get.',
          'Surface 3 — The Dock List: a "be first to know when dates open" form on your direct booking site. Captures prospects before they ever book.',
          'Surface 4 — Pre-Arrival Party Registration: "Who\'s coming with you?" captures every adult guest\'s name and email, not just the reservation holder.',
          'Surface 5 — On-Property QR Ecosystem: /return (rebooking), /friends (referral), /guide (local recommendations). Each page has its own attribution.',
        ],
      },
      {
        title: 'StayFi Setup and Integration',
        summary: 'StayFi is how OTA guests become owned first-party relationships.',
        bullets: [
          'Hardware: replace or supplement your router with a StayFi access point. Most installations take under 30 minutes.',
          'Branded splash page: your property photo, name, and a "Connect to WiFi" form. Name + email + optional marketing consent checkbox. Never gate WiFi access — guests who decline marketing still get the WiFi.',
          'PMS integration: StayFi connects to OwnerRez and other PMSs to pull reservation data — it knows which guest is checking in and pre-populates fields where available.',
          'Email platform connection: captured emails push to Kit (or Mailchimp, Klaviyo) automatically. Your guest is in your list the moment they connect.',
          'StayFi also captures pre-arrival data — party size, arrival time, pets — which populates your check-in message with personalized details.',
        ],
      },
      {
        title: 'The Demand Pressure Ladder',
        summary: 'How to fill slow months without destroying your rate. Price is the last lever, not the first.',
        bullets: [
          'Levels 0–1: organic demand and existing content are working. If the calendar fills without intervention, do not touch it.',
          'Levels 2–3: email to past guests (calendar access) → retargeting ads to site visitors',
          'Levels 4–5: new prospecting content → direct mail postcard to physical mailing list',
          'Levels 6–7: SMS to opt-in list → minimum-stay relaxation (drop from 3 nights to 2)',
          'Level 8: rate reduction — only after every other lever has run. Never more than 20% below base.',
          'The principle: increase willingness to pay before you decrease price. A guest who received a personal email about an opening values that access differently than a guest who saw a discount ad.',
        ],
      },
      {
        title: 'Calendar Release and Rate Protection',
        summary: 'The most powerful rate-protection tool is not software. It is controlled access.',
        bullets: [
          '"Summer dates just opened — sharing with past guests first" creates exclusivity. A discount coupon creates a habit of waiting for the next one.',
          'Implementation: email your past guest list 60–90 days before high-demand dates open. Include a direct booking link. No discount required.',
          '"Rare opening" framing: "Three September weekends just reopened — sharing with past guests before they go back on Airbnb." Converts at 3–4× the rate of a discount email.',
          'Works only if you have a list — which is why Module 06 comes before the advanced marketing modules.',
        ],
      },
      {
        title: 'Post-Checkout Sequences',
        summary: 'The relationship starts at checkout. Configure these once and they run for years.',
        bullets: [
          'Day 1: Thank you — genuine, no sales pitch. Sets the tone for the direct relationship.',
          'Day 2–3: Review request — specific to their stay, direct link to the review page. Target: 40%+ response rate.',
          'Day 30: Relationship email — beautiful property photography and a seasonal note. Zero discount. Zero CTA. Just maintaining the connection.',
          'Day 180: Return invitation — direct calendar access, one CTA. "The fall calendar just opened — past guests get first look."',
          'Day 365 / lapse: "About this time last year..." — the most effective re-engagement opening in hospitality. Personal, specific, no pressure.',
        ],
      },
      {
        title: 'The Loyalty Program',
        summary: 'Reward your best guests without training everyone to wait for a deal.',
        bullets: [
          'Insider tiers: Standard (all returning guests — early calendar access), Loyal (3+ stays — 10% direct-for-life + priority communication), VIP (5+ stays — peak date priority, personalized pre-arrival)',
          'Never discount publicly: your loyalty rate is a private benefit. Guests feel privileged, not entitled.',
          'Gift cards via Stripe: $500/$1,000/$2,500 denominations. "Give the gift of [Property]" acquires new guests at zero marketing cost and generates immediate cash flow before the stay.',
          'Physical postcards via Lob ($1.50 each) to lapsed guests: outperforms email to the same segment. A property photo and a handwritten-style note.',
        ],
      },
      {
        title: 'Review Generation Engine',
        summary: 'Reviews are social proof, algorithmic fuel, and your highest-converting sales tool.',
        bullets: [
          'Send the review request within 2 hours of checkout — not the next day. The guest experience is freshest in the first few hours and they haven\'t written a review for anyone else yet.',
          'High-converting review request: acknowledge one specific detail from their stay, link directly to the platform review page, under 4 sentences.',
          '72-hour follow-up if no review: shorter, softer. Target: 15–20% additional reviews from this follow-up alone.',
          'Responding to reviews: every review within 48 hours. 5-star responses: brief and personal. 3-star and below: acknowledge, address, close with an invitation to return. A professional response to a negative review often converts future guests better than three 5-star reviews.',
        ],
      },
      {
        title: 'Segmenting Your Guest Database',
        summary: 'Not all guests are equal. The ones who return, refer, and review at 5 stars are your most valuable segment — and they need to be treated differently.',
        bullets: [
          'Lifecycle segments: prospect → upcoming → current → recent → returning → loyal → lapsed (12+ months since last stay)',
          'Identity segments built from StayFi and guestbook data: couples, family, wine traveler, adventure, work-cation, occasion (birthday, anniversary)',
          'Source segments: direct (highest LTV), OTA-origin captured via StayFi, website prospect who has not yet booked',
          'GDPR and privacy basics: consent must be channel-specific and auditable. Know what each guest opted in to, and honor it.',
        ],
      },
    ],
  },

  // ── MODULE 07: DIRECT BOOKING ENGINE ─────────────────────────────────────
  {
    number: '07',
    title: 'Direct Booking Engine',
    subtitle: 'Build the channel you own completely — no fees, no algorithm, no permission needed',
    transformation: '"I depend on Airbnb" → "My direct site is the hub. Platforms are discovery channels that feed it."',
    duration: '3 weeks',
    phase: 'Phase 4: Growth',
    tools: 'OwnerRez or Lodgify, Stripe, Google Business Profile, Kit',
    lessons: [
      {
        title: 'The Economics of Direct Bookings',
        summary: 'Every direct booking is a 15.5% raise. The math compounds every year.',
        bullets: [
          'Calculate your annual OTA fee bleed: gross Airbnb revenue × 15.5%. For most mid-range operators, this is $6,000–18,000/year.',
          '30% direct booking target in year 1. 50% in year 2. At $100K gross and 50% direct, you keep $7,750/year that was going to Airbnb.',
          'Direct guests are also higher-quality: they chose to find you specifically, not just the cheapest option in a search filter.',
        ],
      },
      {
        title: 'Website Blueprint and Build',
        summary: 'A direct booking site has one job: convert visitors into confirmed reservations.',
        bullets: [
          'Platform choice: OwnerRez ($40/mo, already your PMS if you chose it in Module 03 — your site is included) or Lodgify ($12–59/mo, website-first with built-in booking engine)',
          'Five essential pages: Home (hero + booking widget), Property (full details + gallery), Location (local guide preview), Reviews (social proof aggregated), and a booking flow (calendar + availability + Stripe payment)',
          'Trust elements above the fold: star rating + review count, Airbnb and VRBO profile links (your verified external reviews), any media mentions or press',
          'Mobile-first design: 65–70% of vacation rental searches happen on mobile. Your site must be fast and fully bookable on a phone.',
        ],
      },
      {
        title: 'Copywriting for Conversion',
        summary: 'The words on your site are your sales team. Write for the booking decision.',
        bullets: [
          'Headline formula: [Outcome] + [Location] + [Differentiator] — "Your Private Lake Escape on Seneca Lake — with a Dock, a Kayak, and No Neighbors"',
          'Lead with experience, not specs: "Wake up to lake views and coffee on the dock" converts better than "3BR/2BA lakefront property with 150ft dock"',
          'Direct booking trust copy: "Booking directly is secure — all payments processed by Stripe. Same cancellation policy as Airbnb."',
          'The guarantee: "If anything isn\'t right about your stay, tell us and we\'ll make it right." A direct booking guarantee converts hesitant guests without requiring a discount.',
        ],
      },
      {
        title: 'Google Business Profile',
        summary: 'Free local search visibility that sends direct traffic without advertising spend.',
        bullets: [
          'Claim your Google Business Profile as a "Vacation Rental." Complete every field: photos, description, amenities, check-in times.',
          'Reviews on your GBP compound your SEO and conversion — add Google review requests alongside platform review requests in your post-checkout sequence.',
          'Google Posts (every 2–4 weeks): seasonal availability, property updates, local events. Posts appear directly in search results.',
          'Expected lift: 10–20 additional direct inquiries per year from GBP alone, at zero cost.',
        ],
      },
      {
        title: 'Traffic — Getting People to Your Site',
        summary: 'A site with no traffic is a billboard in a forest.',
        bullets: [
          'Google Vacation Rentals (set up in Module 02): free metasearch placement, ongoing with no effort',
          'Google Business Profile (this module): local search visibility',
          'Email to captured guest list (Module 06): every campaign is a direct traffic event — your list is your most reliable traffic source',
          'Content and SEO (Module 08): guide pages and local content build organic search traffic that compounds over 12–24 months',
          'Paid search (optional, once your site converts well): Google Ads targeting "[your city] vacation rental" at $10–20/day. Profitable above $250 ADR.',
        ],
      },
    ],
  },

  // ── MODULE 08: LOCAL GUIDE & SEO ──────────────────────────────────────────
  {
    number: '08',
    title: 'Local Guide & SEO — The Compounding Channel',
    subtitle: 'Build a content ecosystem that ranks, earns backlinks, and drives bookings while you sleep',
    transformation: '"My site just takes bookings" → "My site is the local authority — and that authority fills my calendar"',
    duration: '4–6 weeks build, then 15 min/month maintenance',
    phase: 'Phase 4: Growth',
    tools: 'Google Search Console, Google Analytics 4, Ahrefs Webmaster Tools (free), Viator Partner, HARO/Qwoted',
    lessons: [
      {
        title: 'The Local Guide Flywheel',
        summary: 'Content authority compounds where advertising doesn\'t. Every dollar you spend on ads stops when you stop spending. Every piece of content keeps working.',
        bullets: [
          'The flywheel: content authority → higher Google rankings → more organic traffic → more direct bookings → more reviews → higher authority → better rankings',
          'The 12-month timeline: build for 3–4 months with minimal visible results. Month 6–9: organic traffic begins. Month 12+: direct bookings from organic search become measurable.',
          'Why STR operators have an unfair advantage: you have firsthand, verified local knowledge that no travel blog or OTA can replicate. Google\'s E-E-A-T framework explicitly rewards this.',
        ],
      },
      {
        title: 'The Five-Page Ecosystem',
        summary: 'A specific URL architecture that builds authority from your property page outward.',
        bullets: [
          'Layer 1 — Property pages: /book and /property. Rank for "[property name]" and "[city] vacation rental".',
          'Layer 2 — /local-guide: your entry point to the content ecosystem. "The Complete [Region] Travel Guide."',
          'Layer 3 — /[region]: regional authority hub. Covers everything about your area. Targets "[region name]" as a standalone search.',
          'Layer 4 — /[region]/[activity]: activity-specific subpages. /finger-lakes/wineries, /finger-lakes/hiking. Each targets specific activity searches.',
          'Layer 5 — Specific venue pages: individual winery, restaurant, or experience pages. These earn backlinks — local businesses link to pages that feature them.',
          'Internal linking: every layer links down to the next and up to property pages. Ranking authority flows through the entire ecosystem.',
        ],
      },
      {
        title: 'Writing Guide Pages That Rank',
        summary: 'The difference between a guide page that sits there and one that dominates Google is execution depth, not topic selection.',
        bullets: [
          'Minimum length: 1,500 words for activity pages, 2,500+ for regional hub pages. Thin content does not rank in competitive local travel searches.',
          'Structure: H1 (target keyword in first 5 words), intro that answers the search query in the first 100 words, H2 sections for each sub-topic, internal links to related pages',
          'The "genuinely useful" test: would a local resident read this and recommend it to a visitor? If not, it is not good enough yet.',
          'Photos you took, recommendations you made personally, insider details no algorithm can generate — this is the content Google cannot fake and your competitors cannot copy.',
        ],
      },
      {
        title: 'The Local Business Partnership Loop',
        summary: 'Get local businesses to link to you. Their link is your credibility — and their referral is your booking.',
        bullets: [
          'The three-tier framework: Featured (full page on your site + backlink exchange), Mentioned (sidebar recommendation + soft ask), Affiliate (Viator-linked experience with 8% commission)',
          'Outreach sequence: email the business owner, introduce yourself as a local STR host, offer to feature them on your guide page in exchange for a link to your property. Conversion rate: 25–35%.',
          'These relationships also feed Module 11 (Experiences) — you package their services for your guests and earn margin on the experience.',
        ],
      },
      {
        title: 'The Seven Backlink Sources',
        summary: 'Domain authority is permanent capital. A backlink earned today keeps working for years.',
        bullets: [
          'Category 1 — Tourism boards and CVBs: register your property with your regional destination marketing organization. Free, high authority, often permanent.',
          'Category 2 — Local media and travel blogs: pitch your property as a feature to regional lifestyle writers. One DR40+ feature can move your rankings measurably.',
          'Category 3 — Local business partners: via the /links and guide page strategy above',
          'Category 4 — STR-specific and local directories: Hipcamp, Glamping Hub, regional tourism sites. Low effort, cumulative authority.',
          'Category 5 — HARO/Qwoted: respond to journalist queries about vacation rentals. A mention in a national publication is a high-authority link.',
          'Category 6 — Content-earned links: genuinely useful guide pages earn natural links when other sites reference them.',
          'Category 7 — Guest posts: one article per quarter for a regional travel blog or STR publication.',
        ],
      },
      {
        title: 'Technical SEO Basics',
        summary: 'You do not need to be a developer. You need to not make the common mistakes that prevent Google from indexing your site.',
        bullets: [
          'Claim Google Search Console and submit your sitemap on day one of your site going live — this is the single highest-priority SEO action.',
          'Page speed: run your site through Google PageSpeed Insights (free). Fix anything flagged Critical.',
          'Title tags and meta descriptions: every page needs a unique, keyword-specific title (under 60 characters) and description (under 160 characters).',
          'GSC monitoring (15 min/month): which queries generate impressions, which pages get clicks, which pages have dropped. This is your monthly dashboard.',
        ],
      },
      {
        title: 'Monetizing the Guide',
        summary: 'Your guide pages are a revenue asset — not just a traffic asset.',
        bullets: [
          'Viator affiliate links: embed 8% commission experience links naturally within activity guide pages. The kayak tour link in your "Things to Do" page earns every time a guest books.',
          'Package pages: /packages/fall-wine-weekend — accommodation + partner experience, priced as a bundle at a premium over components sold separately.',
          'Revenue potential at 200 guests/year: $1,600–3,200/year in Viator commissions at standard conversion rates. More from package add-ons.',
        ],
      },
      {
        title: 'The 90-Day Backlink Sprint',
        summary: 'Week-by-week plan to go from zero backlinks to a defensible local authority position.',
        bullets: [
          'Weeks 1–2: claim GSC and Ahrefs Webmaster Tools (free), submit to 5 tourism board directories, send first 10 local business outreach emails',
          'Weeks 3–4: publish first 3 guide pages, follow up on outreach, claim GBP, submit first Google Post',
          'Weeks 5–8: publish 3 more guide pages, begin HARO responses (15-minute daily habit), secure first 3 partner backlinks',
          'Weeks 9–12: pitch one regional media outlet for a property feature, reach 15+ referring domains, track GSC query data',
          'Month 4+: 15 minutes/month — check GSC, one HARO response per week, one new guide page per month',
          'What done looks like at 12 months: 30–50 referring domains, Domain Rating 20–30, page 1 rankings for 3–5 local search terms, measurable direct booking traffic from organic search',
        ],
      },
    ],
  },

  // ── MODULE 09: CONTENT & SOCIAL ───────────────────────────────────────────
  {
    number: '09',
    title: 'Content & Social — Build the Audience That Books',
    subtitle: 'Content that converts — not content that performs for algorithms',
    transformation: '"I post when I remember" → "My content runs on a system and directly drives bookings"',
    duration: '2 weeks to build the system',
    phase: 'Phase 4: Growth',
    tools: 'Canva, CapCut, Buffer or Later, Google Business Profile',
    lessons: [
      {
        title: 'Content Strategy for STR',
        summary: 'You are a hospitality operator using content to drive bookings — not a travel influencer. That distinction changes everything.',
        bullets: [
          'Goal: not followers or likes — direct bookings and inquiries. Measure content success by booking attribution, not engagement rate.',
          'Four content pillars: Property (the experience of staying), Local (your area through an insider\'s lens), Behind the scenes (the work that makes the stay great), Guest stories (social proof in motion, with permission)',
          'Platform selection: Instagram + TikTok for visual/lifestyle properties. Pinterest for search-driven discovery. YouTube for area guides that compound over time.',
          'The 30-day calendar: 3 posts/week across 2 platforms. Planned 2 weeks ahead. Executed in 2 batch sessions per month — not daily improvisation.',
        ],
      },
      {
        title: 'Short-Form Video — The Highest-Reach Format',
        summary: 'One well-executed property video can outperform $500 of Google Ads. Here is how to make it.',
        bullets: [
          'The five formats that work: property tour (most viewed), "reasons to book" (most converting), local area walkthrough (builds destination desire), day-in-the-life (makes guests envision the stay), guest experience (with permission)',
          'Hook formula — the first 2 seconds decide everything: start mid-action or with a specific question. "You\'ve never seen a sunrise like this from a private dock" outperforms "Welcome to Lakeside Landing."',
          'CapCut for editing: free, mobile-based, templates built for travel content. Keep videos under 30 seconds for maximum reach.',
          'Post strategy: TikTok 3–4x/week, Reels 3x/week if you have the content volume. Three quality videos outperform seven mediocre ones every time.',
        ],
      },
      {
        title: 'Pinterest and YouTube — Evergreen Traffic',
        summary: 'Instagram posts decay in 48 hours. Pinterest and YouTube drive traffic for years.',
        bullets: [
          'Pinterest Business account: 5 boards targeting your guest personas — "[Region] Vacation Ideas," "[Region] Wineries," "Lakefront Getaways," etc. Every guide page from Module 08 gets a pinned vertical graphic.',
          'YouTube: a 3–5 minute property tour walkthrough with narration ranks for "[property name] tour" and "[city] vacation rental" — and the authority compounds.',
          'Repurposing stack: one YouTube video → 3 short-form clips → 1 blog post → 5 Stories → 3 Pinterest pins. One production, seven distribution points.',
        ],
      },
      {
        title: 'Measurement — What to Keep and What to Cut',
        summary: 'If a channel has produced no booking inquiries or direct traffic after 90 days of consistent effort, reallocate the time.',
        bullets: [
          'Attribution tracking: UTM parameters on your bio link so GA4 shows which platform sent each visitor to your direct booking site',
          'The 90-day rule: if a platform shows no booking-related signal after 90 consistent days, cut it and reinvest time in what\'s working',
          'User-generated content: when guests tag you, repost immediately. Guest content converts better than your own — it is authentic social proof at zero production cost.',
          'Scale what works: your best-performing organic video becomes a $10/day Meta retargeting ad. You already know it connects with your audience.',
        ],
      },
    ],
  },

  // ── MODULE 10: CREATOR NETWORK ────────────────────────────────────────────
  {
    number: '10',
    title: 'Creator & Influencer Network',
    subtitle: 'Hosted stays that produce content, reach, and bookings',
    transformation: '"I\'ve never worked with influencers" → "Creators promote my property to their engaged audience — I trade vacancy nights for measurable exposure"',
    duration: '2 weeks',
    phase: 'Phase 4: Growth',
    lessons: [
      {
        title: 'The Creator Economy for STR',
        summary: 'A micro-influencer with 12,000 highly engaged followers in your target demographic can outperform paid advertising at a fraction of the cost.',
        bullets: [
          'The economics: 2–3 nights of vacancy (your marginal cost) in exchange for content reaching 10,000–100,000 targeted people',
          'Micro vs. macro: a creator with 15,000 engaged followers in the couples-travel niche outperforms a creator with 500,000 mixed followers. Engagement rate (4%+) matters more than follower count.',
          'Creator stays are also a product improvement tool: watch what they photograph, what they skip, and what they caption. Your best guests are telling you exactly what matters.',
        ],
      },
      {
        title: 'Finding, Vetting, and Pitching Creators',
        summary: 'The right creator is specific to your property type and guest demographic. Do not send the same pitch to every travel account.',
        bullets: [
          'Where to find them: Instagram (search your city + travel hashtags), TikTok (search "[region] travel" and watch engagement), creator marketplaces (Collabstr, AspireIQ)',
          'Five-point vetting checklist: engagement rate (4%+), geographic audience match (40%+ in your target markets), content quality, follower count in sweet spot (5K–100K for micro), portfolio of professional brand collaborations',
          'What to offer: complimentary stay in exchange for 1 Reel/TikTok + 3 Stories + content rights to use on your platforms. Get this in writing before the stay.',
          'The outreach message: under 100 words, reference a specific piece of their content, explain the fit with your property, make the offer clear. Target 10–15% response rate from qualified creators.',
        ],
      },
      {
        title: 'Managing the Stay and Maximizing Content',
        summary: 'The stay is a production. Set it up so the creator has everything they need — then get out of the way.',
        bullets: [
          'Send a creator welcome packet: the best times and locations for photos, hero shots to capture (dock at sunrise, fireplace with wine, kayak on the water), and house rules that affect filming',
          'Content rights: your collaboration agreement explicitly grants you permission to repost, use in ads, and use on your site — in perpetuity. Verbal agreements are not agreements.',
          'Repurpose everything: their Reel becomes your Reel repost. Their photos become your listing photos, direct site gallery, and Meta ad creative.',
          'Build an ambassador tier: give return stays to creators who drove measurable results. Two or three creators per season, rotating, building an ongoing relationship.',
        ],
      },
    ],
  },

  // ── MODULE 11: EXPERIENCES ────────────────────────────────────────────────
  {
    number: '11',
    title: 'Curated Experiences & Revenue Layers',
    subtitle: 'Turn your property into a full hospitality offering with packaged revenue beyond the room rate',
    transformation: '"Guests just book a stay" → "Guests book $2,400 packages and $300 add-ons"',
    duration: '2 weeks',
    phase: 'Phase 5: Scale',
    tools: 'Viator Partner Account, Minoan Experience, Stripe, local experience providers',
    lessons: [
      {
        title: 'The Experience Economy',
        summary: 'People pay a premium for experiences. Your property is already an experience. The layers you build around it multiply revenue without adding inventory.',
        bullets: [
          'Five experience categories: Food (chef dinner, winery tour, farm-to-table picnic), Adventure (kayak tour, boat charter, guided hike), Culture (local art, music, historical tour), Wellness (yoga, massage, spa day), Family (kid activities, photography session)',
          'Revenue model: you earn from package markup, affiliate commission, or partner referral arrangement',
          '"Wine Weekend Package" at $2,400 (2 nights + winery tour + chef dinner) vs. the same nights at $900/night. Packaging increases both perceived value and actual revenue.',
        ],
      },
      {
        title: 'Package Design',
        summary: 'A package is not a discount. It is a curated experience with a premium price.',
        bullets: [
          'Package architecture: accommodation (your rate) + experience component (partner service) + convenience layer (you handle the booking) = package price 25–40% above components bought separately',
          '"The Wine Country Retreat" converts better than "3-Night Stay + Winery Tour Package." The name is the product.',
          'A/B test package pricing: offer two versions at different price points. The higher-converting one becomes your standard.',
          'Build your first package around what your market already supports: wine country, water sports, ski, family reunion, corporate off-site.',
        ],
      },
      {
        title: 'Add-On Revenue',
        summary: 'Small add-ons at scale are meaningful recurring revenue.',
        bullets: [
          'The /add-ons page: chef dinner, grocery stocking, pontoon rental, winery tour, airport transfer — each with a photo, description, and Stripe payment link',
          'Pre-arrival upsell email (10 days before check-in): "Make your stay extraordinary." Conversion rate: 15–25% of guests purchase at least one add-on.',
          'Partner margin structure: negotiate 15–20% for you on any partner service you facilitate. For lower-margin partners, a flat referral fee works better.',
          'Revenue potential: 150 stays/year × 20% attachment × $150 average add-on = $4,500/year at minimal ongoing effort',
        ],
      },
      {
        title: 'Viator Partner Integration',
        summary: 'Embed commission-earning experience links into your guide pages and welcome communications.',
        bullets: [
          'Create your Viator Partner account (free) and generate affiliate links for experiences in your market. 8% commission, 30-day cookie.',
          'Place links in: guide pages (naturally within activity content), pre-arrival email, the /add-ons page',
          'GetYourGuide (8% commission) as the European-market alternative for operators outside North America',
          'Revenue at 200 guests/year, 15% experience booking rate, $120 average: ~$2,880/year in passive Viator commissions',
        ],
      },
      {
        title: 'The Local Partner Network',
        summary: 'Your local partners are your experience providers, your backlink sources, and your referral channel simultaneously.',
        bullets: [
          'Identify 8–12 local experience providers aligned with your guest avatar',
          'Qualify each: professional? reliable? do they handle STR guest groups? will they link back to your property?',
          'Cross-promotion: you feature them on your guide pages, they mention your property to their customers. Referrals go both ways.',
          'Quarterly review: renew active partners, replace underperformers, identify new experiences your guests request that you don\'t yet offer.',
        ],
      },
    ],
  },

  // ── MODULE 12: SPONSORS & PARTNERSHIPS ───────────────────────────────────
  {
    number: '12',
    title: 'Sponsors & Brand Partnerships',
    subtitle: 'Let brands subsidize your property expenses in exchange for authentic access to your guests',
    transformation: '"My property costs me money" → "Brands fund upgrades and amenities in exchange for reach"',
    duration: '2 weeks',
    phase: 'Phase 5: Scale',
    lessons: [
      {
        title: 'Local Business Partnerships',
        summary: 'The easiest partnerships to land — and the most immediately valuable for your guests.',
        bullets: [
          'Your pitch in one sentence: "I send you qualified guests who are already in the area and actively looking for great experiences. You give my guests a reason to choose you."',
          'Deal structures: discount card (guest gets 15% off, you get $25/month flat sponsorship), referral commission (10% of any booking from your guests), product placement (they supply product, you feature it)',
          'Who to target first: the businesses your guests already ask about — restaurants, wineries, boat rentals, local tours',
          'Revenue target: $200–600/month from 3–5 local partner arrangements at a well-positioned mid-range property',
        ],
      },
      {
        title: 'Brand Partnerships and Product Placement',
        summary: 'Premium brands pay to be in premium spaces. Your property qualifies.',
        bullets: [
          'Minoan Experience: connects STR hosts with brands. Guests can purchase items in the property through the Minoan platform. You earn commission on every sale.',
          'How to find brand partnership programs: search "[brand name] hospitality partnership" or "[brand name] vacation rental program" — many premium brands have formal programs',
          'What brands want: authentic, natural-light photography of their product in a real, beautiful setting — not a staged product shot',
          'Negotiate upward: start with product exchange (free product for organic features). Once you have documented results, negotiate cash compensation.',
          'One or two premium product relationships, tastefully executed. Do not clutter your property or turn it into a showcase.',
        ],
      },
      {
        title: 'B2B and Corporate Use',
        summary: 'Corporate bookings pay more, stay longer, and cause fewer problems.',
        bullets: [
          'Corporate use cases: team off-site retreats, client entertainment, executive work sessions, real estate photography and video shoots',
          'Corporate rate: flat rate per night for the full property, 3-night minimum, cleaning included',
          'How to reach corporate clients: LinkedIn outreach to operations managers and executive assistants at companies within driving distance, direct outreach to real estate agencies for shoot opportunities',
          'Peerspace or Tagvenue listing: a "/corporate" page on your direct site plus a listing on these platforms captures corporate demand without Airbnb-level commission',
          'The revenue upside: a corporate group at $1,200/night for 4 nights is $4,800 with zero OTA fee — the highest-margin booking type in your portfolio.',
        ],
      },
    ],
  },

  // ── MODULE 13: PORTFOLIO GROWTH & EXIT ───────────────────────────────────
  {
    number: '13',
    title: 'Acquisition at Scale, Portfolio Growth & Exit',
    subtitle: 'When you stop working in the business and start building assets',
    transformation: '"I manage a rental" → "I am building a portfolio of income-producing hospitality assets — and I know when and how to sell"',
    duration: '1 week (read + plan)',
    phase: 'Phase 5: Scale',
    lessons: [
      {
        title: 'Own vs. Operate — The Long-Term Math',
        summary: 'The system you have built in this course is worth owning, not just operating for someone else.',
        bullets: [
          'Equity appreciation + cash flow + tax advantages compound over 10 years in a way that OTA revenue alone never does',
          'When to consider ownership: when your current operation runs without you, when you have 12 months of direct booking data to underwrite a new acquisition, and when the local market supports the acquisition price',
          'DSCR loans: underwritten on the property\'s rental income, not your personal W-2. The standard financing vehicle for STR investment properties globally.',
          'The first acquisition framework is in Module 01 — this module covers your second, third, and fourth acquisitions using the data your operating system now generates.',
        ],
      },
      {
        title: 'Portfolio Architecture',
        summary: 'How to structure multiple properties so the system scales without scaling your workload.',
        bullets: [
          'The hub model scales: the same PMS, PriceLabs, Turno, and email platform runs 1 property or 10 with minimal additional overhead per property',
          'Each new property is a new hub: its own direct booking site, its own local guide, its own guest list. The template is already built.',
          'When to hire: when cleaning coordination exceeds 3 hours/week, add a co-host. Co-host (15–25% of revenue) handles operations; you stay in strategy.',
          'The goal: own the right properties and build the systems that run without you — not own the most properties.',
        ],
      },
      {
        title: 'Exit-Ready — Preparing Your Business to Be Sold or Financed',
        summary: 'The same systems that make you a great operator make your business worth more to a buyer and to a lender. Build exit-ready from day one.',
        bullets: [
          'What buyers and DSCR lenders need: 24–36 months of verifiable rental income, a reconciled P&L (gross platform payouts vs. net after fees, cleaning, maintenance, insurance), and platform performance history (review score, Superhost status, listing longevity)',
          'Gross vs. net: buyers and lenders care about net operating income (NOI). Gross Airbnb payouts are not your income. Know the difference and know your real number.',
          'Why your SpokeBnB system commands a premium at sale: a guest database, direct booking site, functioning email sequences, and an SEO content ecosystem are proprietary distribution assets. A buyer who acquires your property also acquires those assets — and pays a premium for them.',
          'DSCR loan documentation package: 12–24 months of bank statements showing rental deposits, platform payout reports (Airbnb and VRBO year-end statements), Schedule E from tax returns, current insurance declarations, and active STR permit status',
          'STR business valuation: most sell at 2–4× annual NOI. A property with stable occupancy, 4.8+ reviews, and owned distribution channels sits at the high end. One dependent on a single platform with no guest data sits at the low end.',
          'Disposition timing: begin exit preparation 18–24 months before you plan to sell — enough runway to show consistent, clean books and the compounding track record buyers pay a premium for.',
          'SpokeBnB brokerage resources: when you are ready to sell or acquire, we connect you with specialists in STR property and business transactions — relinquished property, replacement property, and 1031 exchange structure.',
        ],
      },
    ],
  },

  // ── MODULE 14: BUILD FOR OTHERS ───────────────────────────────────────────
  {
    number: '14',
    title: 'Build It for Others — The Service Track',
    subtitle: 'Turn your ecosystem expertise into a six-figure service business',
    transformation: '"I built this for my property" → "I build this for operators — at a flat project fee with a compounding retainer"',
    duration: '2 weeks',
    phase: 'Phase 5: Scale',
    tools: 'Next.js template, Vercel Teams, Kit Agency, Notion',
    lessons: [
      {
        title: 'The Gap Nobody Is Filling',
        summary: 'Software gives operators tools. Management companies take their revenue. Nobody builds them a permanent, owned ecosystem.',
        bullets: [
          'Software tools (Hospitable, OwnerRez, PriceLabs): functional but no strategy, no SEO, no local guide, no flywheel',
          'Management companies: 25–40% of gross revenue, permanently. You own nothing.',
          'OTAs: 15.5–25% per booking, forever. The guest relationship belongs to the platform.',
          'The gap: a custom-built, permanently-owned direct booking ecosystem at a flat project fee. This is the business you built for yourself. It is now a service you can sell.',
        ],
      },
      {
        title: 'Client Qualification',
        summary: 'You cannot build an effective ecosystem for an operator who is not ready for one.',
        bullets: [
          'Ideal client profile: 3+ years operating, 4.5+ star average, 50+ reviews, measurable repeat guest rate, ADR above $250/night',
          'The ROI math must work: at $250 ADR and 150 nights/year, a 15.5% OTA fee is $5,813/year. A $5,000 build pays back in under 12 months.',
          'The qualifying question: "Do you have your past guests\' email addresses?" If no — they haven\'t built the relationship you need to build on. Send them to Module 06 first.',
        ],
      },
      {
        title: 'The 10-Minute Sales Conversation',
        summary: 'Three numbers and one question. No pitch deck required.',
        bullets: [
          'Step 1: Get their gross annual Airbnb revenue',
          'Step 2: Multiply by 15.5% — that is their annual OTA fee. Say it out loud.',
          'Step 3: At 30% direct booking rate, how much do they keep instead?',
          'Step 4: How many months until the build pays for itself?',
          'The close: "The build pays for itself in under [X] months. After that, it\'s permanent margin improvement — no ongoing fee to me."',
        ],
      },
      {
        title: 'Pricing and Proposal',
        summary: 'Flat fees, not hourly. Defined scope, not open-ended.',
        bullets: [
          'Standard build (1 property): $4,997–7,500 flat. Includes site, PMS connection, booking flow, local guide framework, SEO foundation, analytics, GSC setup, QA, and launch.',
          'Premium build (2 properties or compound brand): $8,000–12,500 flat.',
          'Monthly retainer: $300–400/month. One new guide page per month (each one compounds SEO for years), 5 backlink outreach contacts, monthly GSC report. À la carte: $200–250/page for clients who want pages without a full retainer commitment.',
          'What is explicitly not included: photography, ongoing marketing execution, social management, paid advertising. Define this in writing.',
          'The 1-page proposal: client name, property URL, what you are building, what you are not building, timeline, price, payment schedule (50% upfront, 50% at launch).',
        ],
      },
      {
        title: 'The 5-Week Delivery Process',
        summary: 'Every build follows the same weekly milestones so you can run multiple clients without chaos.',
        bullets: [
          'Week 1: discovery call + intake form completed + site architecture approved by client',
          'Week 2: copy written, staging environment live, design mockup reviewed and signed off',
          'Weeks 3–4: full build — pages, local guide framework, PMS connection, booking flow, StayFi setup, email sequences',
          'Week 5: QA testing, launch, 60-minute client handoff call recorded for their reference',
          'The handoff: client owns the site, domain, email list, and all credentials. You hand over the keys. No vendor lock-in.',
        ],
      },
      {
        title: 'The Monthly Retainer — Recurring Revenue',
        summary: 'The retainer is a compounding SEO investment, not overhead. Frame it that way and clients renew.',
        bullets: [
          'What you deliver monthly: one new local guide page (each compounds SEO for years), five backlink outreach contacts, one GSC + analytics report showing the client their organic growth trend',
          'ROI framing for the client: at $400/month, after 12 months the client has 12 indexed guide pages building traffic, 60+ outreach contacts, and documented GSC rankings. Show them the GSC impression graph monthly — when it trends up, the retainer sells itself.',
          'Pricing flexibility: standard $300–400/month. Annual retainer ($3,600/year, billed once) gives you certainty and gives them a slight saving. À la carte: $200–250/page for clients who want flexibility over commitment.',
          'Natural retention: the value is compounding. A client 12 months in has a working SEO asset. They do not leave because leaving means abandoning it.',
          'No hostage strategy: give the client everything — files, credentials, source code. They stay because you keep delivering results.',
        ],
      },
      {
        title: 'Managing Multiple Clients',
        summary: 'The systems that make 10 clients feel like 3.',
        bullets: [
          'Notion project management: one workspace per client — intake form, milestone tracker, file storage, monthly report template',
          'Base site template: fork per client, swap brand tokens and content. The architecture is the same. The content is unique.',
          'Vercel Teams: all client sites on one account. Deployments take minutes. Zero per-site platform overhead.',
          'Recurring revenue target: $400/month × 10 clients = $48,000/year predictable income alongside your property revenue.',
        ],
      },
    ],
  },
]

// ─── Phase legend ─────────────────────────────────────────────────────────────

const PHASES = [
  { label: 'Phase 1: Acquire', sub: 'Modules 00–01' },
  { label: 'Phase 2: Launch', sub: 'Modules 02–03' },
  { label: 'Phase 3: Revenue & Systems', sub: 'Modules 04–05' },
  { label: 'Phase 4: Growth', sub: 'Modules 06–10' },
  { label: 'Phase 5: Scale', sub: 'Modules 11–14' },
]

// ─── Stack display ────────────────────────────────────────────────────────────

function TechStackSection() {
  const [open, setOpen] = useState(false)

  return (
    <div className="mb-10 rounded-2xl border border-[var(--sf-navy)]/10 overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[var(--sf-navy)]/[0.02] transition-colors"
      >
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--sf-gold)] mb-1">
            Full Tech Stack — Disclosed Upfront
          </p>
          <h3 className="font-semibold text-[var(--sf-navy)] text-base">
            Every tool you&apos;ll need, when you need it, and what it costs
          </h3>
          <p className="text-xs text-[var(--sf-navy)]/50 mt-0.5">{STACK_TOTAL}</p>
        </div>
        <svg
          className={`w-5 h-5 text-[var(--sf-navy)]/30 shrink-0 ml-4 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className={`sf-accordion-content ${open ? 'open' : ''}`}>
        <div className="sf-accordion-inner">
          <div className="px-6 pb-6 border-t border-[var(--sf-navy)]/5 space-y-6 pt-5">
            {STACK.map((phase) => (
              <div key={phase.phase}>
                <p className={`text-[10px] font-semibold tracking-widest uppercase mb-3 ${phase.labelColor}`}>
                  {phase.phase}
                </p>
                <div className="space-y-2">
                  {phase.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className={`flex items-start gap-4 rounded-xl p-3 border ${phase.color}`}
                    >
                      <div className="min-w-[140px] sm:min-w-[180px]">
                        <span className="text-sm font-semibold text-[var(--sf-navy)]">{tool.name}</span>
                        <span className="block text-xs text-[var(--sf-gold)] font-semibold mt-0.5">{tool.cost}</span>
                      </div>
                      <p className="text-xs text-[var(--sf-navy)]/60 leading-relaxed">{tool.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Module card ─────────────────────────────────────────────────────────────

function ModuleCard({ module, isOpen, onToggle }: { module: Module; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--sf-navy)]/5 overflow-hidden sf-card-hover">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 group min-h-[56px]"
      >
        <span className="text-xl sm:text-2xl font-bold text-[var(--sf-gold)]/40 font-[var(--font-display)] w-8 sm:w-10 shrink-0">
          {module.number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--sf-navy)] text-base sm:text-lg group-hover:text-[var(--sf-gold)] transition-colors">
            {module.title}
          </h3>
          <p className="text-xs sm:text-sm text-[var(--sf-navy)]/50 mt-0.5 line-clamp-1 sm:line-clamp-none">{module.subtitle}</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {module.duration && (
            <span className="hidden sm:inline text-xs text-[var(--sf-navy)]/40 bg-[var(--sf-navy)]/5 px-2.5 py-1 rounded-full">
              {module.duration}
            </span>
          )}
          <svg
            className={`w-5 h-5 text-[var(--sf-navy)]/30 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      <div className={`sf-accordion-content ${isOpen ? 'open' : ''}`}>
        <div className="sf-accordion-inner">
          <div className="px-4 sm:px-6 pb-5 sm:pb-6 border-t border-[var(--sf-navy)]/5">
            <div className="bg-[var(--sf-gold)]/5 rounded-lg px-4 py-3 mt-4 mb-6">
              <p className="text-sm text-[var(--sf-navy)]/70 italic">{module.transformation}</p>
            </div>

            <div className="space-y-5">
              {module.lessons.map((lesson, i) => (
                <div key={i}>
                  <h4 className="font-semibold text-[var(--sf-navy)] text-sm mb-1">
                    Lesson {i + 1}: {lesson.title}
                  </h4>
                  <p className="text-sm text-[var(--sf-navy)]/50 mb-2">{lesson.summary}</p>
                  <ul className="space-y-1">
                    {lesson.bullets.map((bullet, j) => (
                      <li key={j} className="flex gap-2 text-sm text-[var(--sf-navy)]/60">
                        <span className="text-[var(--sf-gold)] mt-0.5 shrink-0">&#x2713;</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {module.tools && (
              <div className="mt-5 pt-4 border-t border-[var(--sf-navy)]/5">
                <span className="text-xs font-semibold text-[var(--sf-navy)]/40 uppercase tracking-wider">
                  Tools &amp; Integrations:
                </span>
                <span className="text-sm text-[var(--sf-gold)] ml-2">{module.tools}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────

export default function ModuleBreakdown() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const lessonCount = modules.reduce((sum, m) => sum + m.lessons.length, 0)

  let currentPhase = ''

  return (
    <section id="modules" aria-label="Course modules" className="py-14 sm:py-20 lg:py-28 bg-[var(--sf-navy)]/[0.02]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Full Curriculum
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-4 mb-4">
            15 Modules. {lessonCount}+ Lessons.
            <br />
            <span className="sf-gold-gradient">An Owned Ecosystem.</span>
          </h2>
          <p className="text-[var(--sf-navy)]/60 max-w-2xl mx-auto">
            Built in operator-reality order — acquisition first, then launch, then revenue, then growth, then scale.
            Every module includes templates, swipe files, and step-by-step walkthroughs.
            The full tech stack and total cost are disclosed before you start.
          </p>
        </div>

        {/* Phase legend */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {PHASES.map((p) => (
            <div key={p.label} className="bg-white rounded-xl p-3 border border-[var(--sf-navy)]/5 text-center">
              <p className="text-[10px] font-semibold text-[var(--sf-navy)] leading-snug">{p.label}</p>
              <p className="text-[9px] text-[var(--sf-navy)]/40 mt-0.5">{p.sub}</p>
            </div>
          ))}
        </div>

        <TechStackSection />

        <div className="space-y-3">
          {modules.map((module, i) => {
            const showPhaseHeader = module.phase && module.phase !== currentPhase
            if (showPhaseHeader) currentPhase = module.phase!

            return (
              <div key={module.number}>
                {showPhaseHeader && (
                  <div className="pt-4 pb-2 px-1">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-[var(--sf-gold)]">
                      {module.phase}
                    </p>
                  </div>
                )}
                <ModuleCard
                  module={module}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              </div>
            )
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-[var(--sf-navy)]/40">
            {lessonCount} lessons{' · '}60+ templates{' · '}Copy-paste ready{' · '}Lifetime access
          </p>
        </div>
      </div>
    </section>
  )
}
