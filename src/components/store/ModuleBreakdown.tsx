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
}

const modules: Module[] = [
  {
    number: '00',
    title: 'Foundation — The Hub',
    subtitle: 'The framework that makes everything else work',
    transformation: '"My rental is a listing" → "My rental is a hospitality business"',
    duration: '30 min',
    lessons: [
      {
        title: 'The Hub-and-Spoke Model',
        summary: 'Your property is the hub. Every booking channel is a spoke. More spokes = more demand.',
        bullets: [
          'Map the 8 demand channels on paper',
          'Identify which spokes you currently have (and which are missing)',
          'Understand why diversification protects you from algorithm changes',
        ],
      },
      {
        title: 'Your Three Numbers',
        summary: 'Occupancy Rate, ADR, and RevPAR — the only metrics that matter.',
        bullets: [
          'Calculate your current Occupancy Rate, ADR, and RevPAR',
          'Benchmark against your market using AirDNA data',
          'Set 12-month targets for each metric',
        ],
      },
      {
        title: 'Market Positioning',
        summary: 'Where your property sits determines which strategies apply.',
        bullets: [
          'Identify your tier: luxury, mid-market, or budget',
          'Analyze your top 5 competitors',
          'Find your pricing sweet spot using market data',
        ],
      },
      {
        title: 'Revenue Per Night Baseline',
        summary: 'Calculate your starting score — this is the number we move.',
        bullets: [
          'Complete the Revenue Per Night calculator (template provided)',
          'Factor in all income sources and expenses',
          'Set your target Revenue Per Night for 12 months out',
        ],
      },
    ],
  },
  {
    number: '01',
    title: 'Distribution Platforms',
    subtitle: 'Three owned channels beat scattered distribution',
    transformation: '"Be on every platform" → "Own three channels. Skip the rest."',
    duration: '1 week',
    tools: 'Hospitable, Hostaway, Rankbreeze, AirDNA',
    lessons: [
      {
        title: 'The Platform Philosophy — Why Less Is More',
        summary: 'The operator insight: platforms that don\'t protect you aren\'t worth the listings.',
        bullets: [
          'Side-by-side comparison: Airbnb vs VRBO vs Booking.com vs Expedia',
          'The "Owned + Two Spokes" framework',
          'Decision framework: when to add a platform, when to drop one',
          'Live case study: Lakeside Landing FLX — rebuilding from Airbnb-only to multi-channel in real time (documented as you watch)',
        ],
      },
      {
        title: 'Airbnb — The Discovery Engine',
        summary: 'Why Airbnb is channel #1 (44% market share, AirCover, guest favorite algorithm).',
        bullets: [
          'Listing SEO: titles, descriptions, photo sequence, amenities',
          'AirCover $3M protection — what it covers and how to leverage it',
          'Superhost vs Guest Favorite — earn both',
          'Audit your current listing against the 40-point scorecard',
        ],
      },
      {
        title: 'VRBO — The Family + Group Channel',
        summary: 'Whole-home only, older wealthier demographic — perfect for luxury/waterfront.',
        bullets: [
          'Key VRBO differences from Airbnb (guest behavior, pricing, cancellation)',
          'Premier Host program — how to qualify',
          'VRBO listing optimization (what\'s different from Airbnb)',
          'The 5-night minimum strategy for luxury properties',
        ],
      },
      {
        title: 'Google Vacation Rentals — The Free Amplifier',
        summary: 'Metasearch engine that sends Google\'s organic traffic to your direct booking site.',
        bullets: [
          'Why most hosts miss this free channel',
          'Requirements to list (direct site + compatible PMS)',
          'Setup via Lodgify, OwnerRez, or direct integration',
          'Expected 5-10% lift on direct site traffic',
        ],
      },
      {
        title: 'The Platforms You SHOULD NOT Use',
        summary: 'Booking.com, Expedia, TripAdvisor — why they fail hosts at $300+ ADR.',
        bullets: [
          'Address visibility, weak dispute support, no damage coverage equivalent',
          '"Pay at property" no-show risk on Booking.com',
          '15% flat commissions, wrong guest demographic for leisure properties',
          'How to politely decline platform rep outreach',
        ],
      },
      {
        title: 'Channel Manager Setup + Calendar Sync',
        summary: 'Sync three platforms cleanly — no double bookings, unified inbox.',
        bullets: [
          'Hospitable (1-3 units), Hostaway (4+), Lodgify (direct-site-first)',
          'iCal vs direct integrations',
          'Platform-specific pricing strategy',
          'Walkthrough: Hospitable setup for Lakeside Landing + Smooth Sailing',
        ],
      },
    ],
  },
  {
    number: '02',
    title: 'Direct Booking Engine',
    subtitle: 'The center of gravity for your entire business',
    transformation: '"I depend on Airbnb" → "My direct site is the hub. Platforms are spokes."',
    duration: '3 weeks',
    tools: 'Lodgify, OwnerRez, Next.js, StayFi, Stripe',
    lessons: [
      {
        title: 'Strategy & Economics',
        summary: 'Calculate your OTA commission bleed and set direct booking targets.',
        bullets: [
          'Calculate how much Airbnb\'s 15.5% host fee costs you annually — for most hosts, $4K–$15K you could redirect to direct bookings',
          'Set a 12-month direct booking percentage target (goal: 30-40%)',
          'Define your ideal guest avatar for direct bookings',
          'Map your direct booking funnel on paper',
        ],
      },
      {
        title: 'Website Blueprint & Build',
        summary: 'A direct booking website that does one job: convert visitors into confirmed bookings.',
        bullets: [
          'Choose your platform: Lodgify ($12-59/mo) or OwnerRez ($40/mo)',
          'Build 5 essential pages using our proven template',
          'Connect PMS with real-time availability and payment processing',
          'Add trust elements: reviews, badges, guarantee language',
        ],
      },
      {
        title: 'Copy, Images & Conversion',
        summary: 'The words and photos on your site are your sales team.',
        bullets: [
          'Write your headline using our "Outcome + Location + Differentiator" formula',
          'Create platform-specific descriptions using swipe file templates',
          'Sequence photos for maximum conversion (hero, lifestyle, detail shots)',
          'Install urgency triggers and social proof elements',
        ],
      },
      {
        title: 'Guest Data & List Building',
        summary: 'Your guest list is your most valuable asset. Platforms don\'t give it to you.',
        bullets: [
          'Install StayFi branded WiFi ($15/mo) to capture every guest\'s email',
          'Set up pre-arrival and post-stay data capture forms',
          'Build and segment your guest database',
          'Create capture points at every touchpoint',
        ],
      },
      {
        title: 'Email & SMS Funnels',
        summary: 'Automated messages that bring guests back without lifting a finger.',
        bullets: [
          'Build 5 email sequences: Welcome, Pre-Arrival, Mid-Stay, Post-Stay, Win-Back',
          'Set up SMS for booking confirmations, check-in, and review requests',
          'Create a monthly newsletter template',
          'Configure abandoned inquiry follow-up',
        ],
      },
      {
        title: 'Traffic & Launch',
        summary: 'A website without traffic is a billboard in the desert.',
        bullets: [
          'Optimize Google Business Profile (10-20 direct bookings/year from this alone)',
          'Create 4 SEO blog posts targeting local vacation rental keywords',
          'Set up Instagram and TikTok content pillars',
          'Launch basic Google Ads campaign ($10-20/day)',
        ],
      },
    ],
  },
  {
    number: '02B',
    title: 'The Local Guide Engine',
    subtitle: 'Build a compounding SEO + backlink flywheel around your property',
    transformation: '"My site just takes bookings" → "My site IS the authority for my region"',
    duration: '4 weeks (compounds for years)',
    tools: 'Next.js, Google Search Console, GA4, Ahrefs, Viator',
    lessons: [
      {
        title: 'The Local Guide Flywheel',
        summary: 'Why content + backlinks + SEO compounds — beating any ad spend long-term.',
        bullets: [
          'The 3-layer flywheel: content authority → backlinks → organic bookings',
          'Why focus less on Airbnb listing, more on guide pages',
          'Traffic attribution case study from lakesidelandingflx.com',
          'The 12-month play with a 10-year payoff',
        ],
      },
      {
        title: 'The Five-Page Ecosystem Structure',
        summary: 'Property → guide index → regional hub → activity subpages → specific venues.',
        bullets: [
          'Layer 1 Property pages (money pages)',
          'Layer 2 /local-guide (traffic entry point)',
          'Layer 3 /[region] (authority hub)',
          'Layer 4 /[region]/wineries, /[region]/live-music (activity subpages)',
          'Layer 5 specific venue pages (backlink magnets)',
        ],
      },
      {
        title: 'Writing Guide Pages That Rank',
        summary: 'The difference between a guide page that sits there and one that dominates Google.',
        bullets: [
          '1,500-word minimum for regional authority content',
          'H1/H2/H3 structure + target keyword + 5 secondary keywords',
          'The "genuinely useful" test — would a local recommend it?',
          'E-E-A-T signals: Experience, Expertise, Authoritativeness, Trustworthiness',
        ],
      },
      {
        title: 'The Local Business Partnership Loop',
        summary: 'Get wineries, restaurants, and experience partners to link BACK to you.',
        bullets: [
          'The 3-tier partnership framework (featured / mentioned / affiliate)',
          'Outreach email + DM templates (tested across 100+ outreaches)',
          'The /links partner showcase page strategy',
          'The 90-day relationship arc to backlink + referral',
        ],
      },
      {
        title: 'Building the Backlink Magnet',
        summary: 'Go from zero backlinks to 20+ in 90 days — the right way.',
        bullets: [
          'Local tourism/chamber directory submissions (free, high authority)',
          'Local blogger and journalist pitches',
          'Guest post strategy for regional travel sites',
          'What to avoid: paid link farms, Fiverr links, guest posts on junk blogs',
        ],
      },
      {
        title: 'Monetizing the Guide',
        summary: 'Packages, add-ons, and affiliate revenue turn SEO traffic into cash.',
        bullets: [
          'Package pages like /packages/fall-wine-weekend ($2,400 bundles)',
          'Add-on upsells: chef dinner, pontoon cruise, winery tour',
          'Viator 8% affiliate integration in guide pages',
          'Pre-arrival upsell email (10 days before check-in)',
        ],
      },
      {
        title: 'Measuring the Flywheel',
        summary: 'The 5 metrics that tell you the ecosystem is working.',
        bullets: [
          'Organic search traffic (Google Search Console + GA4)',
          'Top-performing landing pages',
          'Backlink count and quality (Ahrefs)',
          'Direct bookings attributed to guide traffic',
          'Revenue per visitor',
        ],
      },
      {
        title: 'The Compounding Timeline',
        summary: 'Honest expectations: zero in month 1-3, acceleration in year 2, authority by year 3.',
        bullets: [
          'Month 1-3: Foundation (zero traffic, that\'s normal)',
          'Month 4-6: Ignition (first organic trickles)',
          'Year 2: Compounding (30-40% of direct bookings from search)',
          'Year 3+: You outrank professional PM companies in your micro-market',
        ],
      },
    ],
  },
  {
    number: '02C',
    title: 'The Backlink Authority System',
    subtitle: 'Become the most trusted property on the internet in your market',
    transformation: '"What is a backlink?" → "I have 50+ backlinks and own my local Google rankings"',
    duration: '2 weeks build + 15 min/month ongoing',
    tools: 'Ahrefs Webmaster Tools, Google Search Console, HARO/Qwoted',
    lessons: [
      {
        title: 'Why Backlinks Are Your Unfair Advantage',
        summary: 'Domain authority is permanent capital. Every backlink you earn today still counts in 5 years.',
        bullets: [
          'How Domain Rating (DR) works and why STR owners have an edge',
          'The math: $0 organic traffic vs 23% OTA fee forever',
          'Why most STR owners have never done this — your opportunity window',
          'What makes a backlink legitimate vs. spam',
        ],
      },
      {
        title: 'The 7 Link Sources for STR Properties',
        summary: 'Tourism boards, local partners, directories, media — ranked by effort vs. impact.',
        bullets: [
          'Category 1: CVB/tourism board registrations (easiest, highest authority)',
          'Category 2: Local media and travel blogs (highest authority, moderate effort)',
          'Category 3: Local business partner links via your /links page',
          'Category 4–7: Directories, associations, content-earned links, podcast appearances',
        ],
      },
      {
        title: 'Build Your Backlink Target List in 60 Minutes',
        summary: 'The research sprint that gives you 20–40 prioritized outreach targets.',
        bullets: [
          'The tourism board sweep: search strings + submission process',
          'The local business pull from your own guest guide',
          'The media scan: travel bloggers, regional publications, press targets',
          'Free directory submissions worth 30 minutes of your time',
        ],
      },
      {
        title: 'The Media Pitch System (HARO + Direct Outreach)',
        summary: 'Get featured in regional publications and travel blogs — with or without paying for ads.',
        bullets: [
          'How HARO and Qwoted work — the daily 4-hour response window',
          'The press stay pitch: template for travel bloggers',
          'The expert contribution pitch: template for regional media',
          'The follow-up sequence that converts without chasing',
        ],
      },
      {
        title: 'The /links Partner Page System',
        summary: 'Your passive link engine — build it once, earn backlinks for years.',
        bullets: [
          'The Lakeside Landing /links page as the exact reference model',
          'Structure and copy template for your own partner directory',
          'The partner outreach email sequence (25–35% conversion rate)',
          'How to turn warm business relationships into permanent backlinks',
        ],
      },
      {
        title: 'Tracking Authority + The 90-Day Backlink Plan',
        summary: 'The week-by-week calendar to go from DR 0 to DR 25+ and Page 1 for local searches.',
        bullets: [
          'Set up Ahrefs Webmaster Tools + Google Search Console (free)',
          'The 90-day action calendar: quick wins, media pitching, compounding content',
          'What "done" looks like: DR benchmarks, referring domains, GSC traffic',
          '15 min/month maintenance routine after the initial build',
        ],
      },
      {
        title: 'Advanced Plays: Competitor Analysis + Link Reclamation',
        summary: 'Ethically steal your competitor\'s links and recover mentions that should be linking to you.',
        bullets: [
          'Competitor backlink analysis with Ahrefs — find gaps you can fill',
          'The skyscraper technique: build better content, poach their links',
          'Unlinked brand mention reclamation (40–60% conversion rate)',
          'Broken link recovery and image attribution link requests',
        ],
      },
    ],
  },
  {
    number: '03',
    title: 'Dynamic Pricing & Revenue',
    subtitle: 'Let data set your prices instead of your gut',
    transformation: '"I charge $200/night year-round" → "My pricing responds to demand in real-time"',
    duration: '1 week',
    tools: 'PriceLabs, AirDNA, Beyond Pricing',
    lessons: [
      {
        title: 'Pricing Psychology',
        summary: 'Guests compare your price to alternatives, not your costs.',
        bullets: [
          'Build your value stack to justify premium rates',
          'Understand price anchoring against hotels and competitors',
          'Learn why underpricing actually costs you bookings',
          'Master round-number vs. charm pricing strategies',
        ],
      },
      {
        title: 'Market Data & Competitive Analysis',
        summary: 'You can\'t price in a vacuum. Know what your market is charging.',
        bullets: [
          'Pull market benchmarks from AirDNA (occupancy, ADR, RevPAR)',
          'Identify and track your top 10 competitors\' pricing',
          'Map seasonal demand patterns with exact date ranges',
          'Identify local events that spike demand',
        ],
      },
      {
        title: 'Dynamic Pricing Setup',
        summary: 'Install the engine that makes you more money than manual pricing ever could.',
        bullets: [
          'Install and configure PriceLabs ($19.99/mo)',
          'Set base, minimum, and maximum price guardrails',
          'Configure seasonal, day-of-week, and event-based rules',
          'Enable orphan-day gap filling and last-minute discounts',
        ],
      },
      {
        title: 'Length-of-Stay & Revenue Maximization',
        summary: 'Optimize for total revenue, not just nightly rate.',
        bullets: [
          'Build discount ladders for 7, 14, and 30-night stays',
          'Set minimum night requirements by season',
          'Configure cleaning fees, pet fees, and upsell pricing',
          'Calculate true Revenue Per Night across all income sources',
        ],
      },
    ],
  },
  {
    number: '04',
    title: 'Automation & Systems',
    subtitle: 'Run your business in under 2 hours per property per week',
    transformation: '"I manage everything manually" → "My business runs on systems"',
    duration: '2 weeks',
    tools: 'Hospitable/Hostaway, Turno, PriceLabs, StayFi',
    lessons: [
      {
        title: 'System Architecture',
        summary: 'Map every repeating task and decide what gets automated, delegated, or eliminated.',
        bullets: [
          'Audit your weekly time spend per property',
          'Map the 5 operational workflows',
          'Choose your PMS as the central nervous system',
          'Create your system architecture diagram (template provided)',
        ],
      },
      {
        title: 'Guest Messaging Automation',
        summary: 'Stop typing the same check-in instructions for the 200th time.',
        bullets: [
          'Build your 8-message template library (templates provided)',
          'Configure trigger-based auto-sends in your PMS',
          'Set up AI-powered smart replies for common questions',
          'Create escalation rules for edge cases',
        ],
      },
      {
        title: 'Cleaning & Maintenance Automation',
        summary: 'Every checkout triggers a cleaning. Every cleaning gets verified. No group texts.',
        bullets: [
          'Set up Turno (free-$8/mo) for auto-scheduled cleanings',
          'Create photo-verified cleaning checklists',
          'Build a maintenance request workflow',
          'Set up inventory tracking for supplies',
        ],
      },
      {
        title: 'Marketing & Loyalty Automation',
        summary: 'Turn one-time guests into repeat bookers automatically.',
        bullets: [
          'Configure post-stay review request sequences',
          'Build a "Return Guest" automated offer',
          'Set up referral program with automated tracking',
          'Create a seasonal campaign calendar',
        ],
      },
      {
        title: 'Owner Reporting & Scale',
        summary: 'If you want to scale past 5 units, you need reporting that runs itself.',
        bullets: [
          'Set up automated monthly owner reports',
          'Create a property performance dashboard',
          'Build SOPs for every repeatable task',
          'Define your "add a property" playbook',
        ],
      },
      {
        title: 'Monthly Automation Audit',
        summary: 'Systems drift. A 30-minute monthly check keeps everything running tight.',
        bullets: [
          'Run the Monthly Audit checklist (template provided)',
          'Review response times, pricing performance, cleaning scores',
          'Check email open rates and repeat booking conversions',
          'Identify one automation to add or improve each month',
        ],
      },
    ],
  },
  {
    number: '05',
    title: 'Content & Social Media',
    subtitle: 'Build a content engine that drives bookings while you sleep',
    transformation: '"I don\'t post about my rental" → "My content drives discovery across 5 platforms"',
    duration: '2 weeks',
    tools: 'Canva, CapCut, Later/Buffer, Tailwind',
    lessons: [
      {
        title: 'Content Strategy & Pillars',
        summary: 'Define 4 content pillars and a 30-day calendar that produces consistent results.',
        bullets: [
          'Define your 4 pillars: Property Tours, Local Guides, Behind-the-Scenes, Guest Experiences',
          'Identify which platforms matter for YOUR property type',
          'Create a 30-day content calendar (template provided)',
          'Understand the content-to-booking funnel',
        ],
      },
      {
        title: 'Short-Form Video (TikTok & Reels)',
        summary: 'The highest-reach, lowest-cost content format. One viral video = thousands in bookings.',
        bullets: [
          'Learn the 5 video formats that work for STR',
          'Master hook formulas — the first 2 seconds decide everything',
          'Edit with CapCut: transitions, text overlays, trending audio',
          'Post strategy: TikTok 4-5x/week, Reels 3-4x/week, Shorts 2-3x/week',
        ],
      },
      {
        title: 'Long-Form & Pinterest',
        summary: 'YouTube and Pinterest are long-term assets that generate traffic for years.',
        bullets: [
          'YouTube strategy: property tours, area guides, evergreen SEO content',
          'Write 4 SEO blog posts using templates (provided)',
          'Set up Pinterest Business with 5 keyword-rich boards',
          'Repurpose: 1 YouTube video → 3 Reels + 1 blog post + 5 Stories + 3 Pins',
        ],
      },
      {
        title: 'User-Generated Content & Measurement',
        summary: 'Guest-created content is more trusted than anything you produce — and it\'s free.',
        bullets: [
          'Create "Instagrammable moments" in your property',
          'Encourage sharing with branded hashtag and incentives',
          'Track which content types drive actual bookings',
          'Scale winners: turn best-performing video into an ad',
        ],
      },
    ],
  },
  {
    number: '06',
    title: 'Creator & Influencer Network',
    subtitle: 'Creators promote your property to their audiences for free stays',
    transformation: '"I\'ve never worked with influencers" → "Creators promote my property monthly"',
    duration: '2 weeks',
    lessons: [
      {
        title: 'The Creator Economy for STR',
        summary: 'Why micro-influencers with 10K followers can outperform months of paid advertising.',
        bullets: [
          'Understand why STR is a perfect influencer product',
          'Learn micro vs. macro influencer economics',
          'Calculate the ROI: 2-3 nights of vacancy vs. 10-50 bookings',
          'Plan a "creator program" vs. one-off deals',
        ],
      },
      {
        title: 'Finding, Vetting & Outreach',
        summary: 'Where to find creators, how to filter fakes, and the pitch that gets responses.',
        bullets: [
          'Source creators from Instagram, TikTok, YouTube, and creator marketplaces',
          'Apply the 5-point vetting checklist (engagement, geography, quality, demographics, portfolio)',
          'Use the outreach DM/email template (tested across 200+ outreaches)',
          'Structure the deal: deliverables, content rights, and payment terms',
        ],
      },
      {
        title: 'Managing Stays & Repurposing Content',
        summary: 'The stay is the production. Set it up for success and milk the content for months.',
        bullets: [
          'Create a "creator welcome packet" with property highlights and shot list',
          'Repost creator content on your channels with permission',
          'Use creator photos on your direct booking site and listings',
          'Build an ongoing creator network with annual stays and ambassador tier',
        ],
      },
    ],
  },
  {
    number: '07',
    title: 'Guest Network & Retention',
    subtitle: 'The Insider, Referral, and Gift Card mechanics that compound LTV',
    transformation: '"Guests book once and disappear" → "Past guests are my highest-LTV segment"',
    duration: '2 weeks',
    tools: 'StayFi, TouchStay, Stripe, email platform',
    lessons: [
      {
        title: 'Building a Guest Database',
        summary: 'Capture the guest relationship platforms don\'t want you to have.',
        bullets: [
          'Install StayFi branded WiFi for automatic email capture',
          'Set up pre-arrival and post-stay data collection forms',
          'Segment guests by type, dates, source, and lifetime value',
          'Understand GDPR/privacy compliance basics',
        ],
      },
      {
        title: 'Post-Checkout Journey',
        summary: 'The relationship starts at checkout — configure 5 automated sequences.',
        bullets: [
          'Day 1: Thank you + review request',
          'Day 30: Share your experience + referral offer',
          'Day 180: Time to come back + return guest discount',
          'Anniversary/birthday: seasonal message + special offer',
        ],
      },
      {
        title: 'Review Generation Engine',
        summary: 'Reviews are social proof AND algorithmic fuel. Automate the ask.',
        bullets: [
          'Deploy review request at 24 hours post-checkout, follow up at 72 hours',
          'Use the high-converting review request template (40%+ response rate)',
          'Handle negative reviews with response templates and de-escalation scripts',
          'Target: 90%+ review rate on Airbnb, 20+ reviews on Google in year one',
        ],
      },
      {
        title: 'The Insider Program — Loyalty Mechanics',
        summary: 'Exclusive perks for direct bookers. The /insider page pattern from lakesidelandingflx.com.',
        bullets: [
          'Tier 1 (email signup): early access + insider-only shoulder rates',
          'Tier 2 (after 1st stay): 10% off direct bookings for life',
          'Tier 3 (after 3rd stay): 15% off + free add-on + peak date first access',
          'Tier 4 (top 10 by LTV): private concierge + annual insider weekend',
        ],
      },
      {
        title: 'The Referral Engine',
        summary: 'Turn happy guests into your unpaid sales team. Trackable, rewarded, automated.',
        bullets: [
          '"Give $X, Get $X" program structure (cash, experience, or status reward)',
          'Unique code vs unique link vs form-based attribution',
          'The post-stay referral prompt email (sent 48 hours after check-out)',
          'Target: 10-20% of direct bookings from referrals within 18 months',
        ],
      },
      {
        title: 'Gift Cards & Gift Experiences',
        summary: 'Someone who loves your property gifts a stay to their parents. You get a new guest with zero marketing.',
        bullets: [
          'Set up the gift card purchase flow (like lakesidelandingflx.com/gift)',
          'Denominations that work: $500, $1,000, $2,500, custom',
          'Cash flow benefit: money received today, fulfillment later',
          '"Give the Gift of [Property]" holiday campaign',
        ],
      },
    ],
  },
  {
    number: '08',
    title: 'Product Placement & Sponsors',
    subtitle: 'Turn your property into a brand partnership platform',
    transformation: '"My rental costs me money" → "Brands subsidize my property"',
    duration: '2 weeks',
    lessons: [
      {
        title: 'Local Business Partnerships',
        summary: 'The easiest partnerships to land — and the most valuable for guest experience.',
        bullets: [
          'Identify 10-15 local businesses serving your guest demographic',
          'Pitch: "I send you customers. You give my guests a perk. We both win."',
          'Structure deals: discount cards, commissions, or flat sponsorship',
          'Revenue target: $100-$500/month per property from local partners alone',
        ],
      },
      {
        title: 'Brand Partnerships & Product Placement',
        summary: 'Get premium products in your rental for free — or get paid to feature them.',
        bullets: [
          'Research brands with hospitality partnership programs',
          'Use our outreach template for brand partnerships',
          'Set up Minoan Experience for shoppable stays (guests buy what they use)',
          'Display products tastefully — like a boutique hotel, not an infomercial',
        ],
      },
      {
        title: 'B2B & Corporate Deals',
        summary: 'Businesses will pay to reach your guests or use your property.',
        bullets: [
          'Identify B2B opportunities: real estate, tour operators, wedding planners',
          'Create corporate retreat packages (property + experiences)',
          'Offer your property as a photo/video shoot location',
          'Structure corporate rate agreements for repeat business bookings',
        ],
      },
    ],
  },
  {
    number: '09',
    title: 'Curated Experiences',
    subtitle: 'The monetization layer that converts Local Guide traffic into premium revenue',
    transformation: '"Guests just book rooms" → "Guests buy $2,400 packages + $500 add-ons"',
    duration: '2 weeks',
    tools: 'Next.js, Viator, Airbnb Experiences, local partners',
    lessons: [
      {
        title: 'The Experience Economy',
        summary: 'Experiences drive 20-40% higher ADR AND are the monetization layer of your local guide.',
        bullets: [
          'Why experience positioning commands premium rates',
          'The 5 experience categories: Food, Adventure, Culture, Wellness, Family',
          'Revenue model: commissions + package markups + flat referral fees',
          'How Module 2B (Local Guide) feeds traffic to Module 9 (Experiences)',
        ],
      },
      {
        title: 'Package Design Workshop',
        summary: 'How lakesidelandingflx.com /packages/fall-wine-weekend justifies $2,400 price tags.',
        bullets: [
          'Fall Wine Weekend, Reunion Compound, Shoulder Reset package patterns',
          'Pricing psychology: room rate + experience margin + convenience markup',
          'Target 40-60% margin on packaged experiences',
          'A/B testing package performance',
        ],
      },
      {
        title: 'Add-On Revenue Engine',
        summary: 'Chef dinner, grocery stocking, pontoon cruise, winery tasting — the /add-ons pattern.',
        bullets: [
          'Design add-on page flow (like /add-ons/chef-dinner)',
          'Negotiate with partners: 10-20% margin for you',
          'Pre-arrival upsell email (10 days before check-in)',
          'In-property welcome card with QR codes to book add-ons',
        ],
      },
      {
        title: 'Viator & Affiliate Integration',
        summary: 'Embed 8% commission links INTO your guide pages, not a separate guidebook.',
        bullets: [
          'Set up Viator partner account (8% per booking, 30-day cookie)',
          'Place affiliate links naturally in /[region]/wineries, /[region]/things-to-do',
          'Curate "Top 10 Experiences" that earn while you sleep',
          'Revenue potential: $1,600/year passive at 200 guests/year',
        ],
      },
      {
        title: 'Airbnb Experiences',
        summary: 'Optional, lower priority. Great if you have expertise to share.',
        bullets: [
          'Design your Experience (food tour, adventure, workshop)',
          'Set pricing per guest ($50-$200, Airbnb takes 20%)',
          'Cross-promote: Experience listing links back to property',
          'Reframe: use this to drive Airbnb bookings to YOUR property',
        ],
      },
      {
        title: 'Building the Local Partner Network',
        summary: 'Every partner becomes a backlink, a referral, and a revenue stream.',
        bullets: [
          'Vet 8-12 local experience providers',
          'Tie each partner to a guide page feature',
          'Cross-promotion: they link to you, you feature them',
          'Quarterly partnership review: renew, renegotiate, or replace',
        ],
      },
    ],
  },
  {
    number: '10',
    title: 'The Barefoot Advantage',
    subtitle: 'Build long-term wealth through property ownership',
    transformation: '"I rent someone else\'s property" → "I own high-performing assets in premium markets"',
    duration: '1 week',
    lessons: [
      {
        title: 'Ownership vs. Arbitrage',
        summary: 'The math over 5-10 years makes the case clear.',
        bullets: [
          'Compare long-term wealth building: owning vs. renting from others',
          'Understand equity appreciation + cash flow + tax advantages',
          'Calculate when ownership becomes the obvious play',
        ],
      },
      {
        title: 'Florida STR Market Analysis',
        summary: 'Identify high-yield markets using data, not hype.',
        bullets: [
          'Use AirDNA to analyze Florida\'s top STR submarkets',
          'Understand seasonal patterns, regulations, and supply trends',
          'Identify markets where RevPAR supports premium acquisition prices',
        ],
      },
      {
        title: 'Financing & Acquisition',
        summary: 'How to finance vacation rental purchases and source off-market deals.',
        bullets: [
          'Explore DSCR loans, conventional, and portfolio lending for STR',
          'How Barefoot Realty & Investments sources off-market deals',
          'Property disposition and 1031 exchange strategies',
          'Build your portfolio: from 1 unit to 10 to 20+',
        ],
      },
    ],
  },
  {
    number: '11',
    title: 'Scale — Build It for Others',
    subtitle: 'Turn your ecosystem into a six-figure service business',
    transformation: '"I built this for my property" → "I build this for operators across the country — at $10K a build"',
    duration: '2 weeks',
    tools: 'Next.js template, Vercel Teams, Kit Agency, Notion',
    lessons: [
      {
        title: 'The Three Gaps Nobody Is Filling',
        summary: 'Why every competing option — software tools, management companies, and OTAs — leaves operators underserved.',
        bullets: [
          'Software tools (Lodgify, Hospitable, OwnerRez): functional but no strategy, no SEO, no flywheel',
          'Management companies (Wander, AvantStay): 20–50% forever, you own nothing',
          'OTAs: $88K/year on a $150K gross property — to platforms, not to you',
          'The gap: custom-built, permanently-owned ecosystem at a flat fee',
        ],
      },
      {
        title: 'Qualifying Your Ideal Client',
        summary: 'The five questions that tell you in 10 minutes whether to build for them.',
        bullets: [
          'Target: 3+ years operating, 4.5+ stars, 50+ reviews, 25%+ repeat guests',
          'ADR $400+/night — where the ROI math is undeniable',
          'Red flags: first-year operators, budget properties, operators with guest complaints',
          'The question that closes every deal: "Do you have your past guests\' emails?"',
        ],
      },
      {
        title: 'The 10-Minute Sales Conversation',
        summary: 'Three numbers and a question. No deck required.',
        bullets: [
          'Step 1: Get their gross revenue number',
          'Step 2: Calculate their OTA fee (multiply by 23%)',
          'Step 3: Show them their direct booking savings at 30% and 50% conversion',
          'Step 4: Drop the investment — and show Year 1 ROI',
        ],
      },
      {
        title: 'The 1-Page Proposal + Pricing Architecture',
        summary: 'What to charge, how to present it, and how to close.',
        bullets: [
          'Standard build (1 property): $7,500–10,000 setup + $350–400/month',
          'Premium build (2 properties / compound model): $12,500–15,000',
          'Track selection: Direct Booking, Content & SEO, or Full Ecosystem',
          'Tool margins: StayFi, Kit, Vercel hosting — $500–1,200/year per client',
        ],
      },
      {
        title: 'The 5-Week Delivery Process',
        summary: 'Week-by-week milestones from discovery call to launch and training.',
        bullets: [
          'Week 1: Discovery + strategy + site architecture document',
          'Week 2: Copy writing + staging environment + Figma mockup',
          'Weeks 3–4: Build + Local Guide pages + email sequences + StayFi',
          'Week 5: QA + launch + 60-minute operator training call',
        ],
      },
      {
        title: 'The Monthly Retainer — Keeping Clients for Years',
        summary: 'Why $400/month × 10 clients = $48K/year in recurring revenue.',
        bullets: [
          'Monthly report: DR, referring domains, GSC traffic, direct booking revenue',
          'Monthly content: 1 new guide page per client (compounding SEO)',
          '5 backlink outreach contacts per month per client',
          'Own the technical infrastructure — natural retention, zero hostage strategy',
        ],
      },
      {
        title: 'Managing Multiple Clients — The Systems Stack',
        summary: 'The tools, templates, and processes that make 10 clients feel like 3.',
        bullets: [
          'Notion project management: intake form, milestone tracker, monthly report',
          'Base site template: fork per client, swap brand tokens and content',
          'Claude API for first-draft Local Guide pages (1,200 words in 10 minutes)',
          'Vercel Teams: all client sites on one account, zero maintenance overhead',
        ],
      },
      {
        title: 'Case Study — Lakeside Landing FLX',
        summary: 'The reference property. The proof of concept. Your portfolio.',
        bullets: [
          'Full walkthrough of lakesidelandingflx.com architecture on screen',
          'The 11-page URL structure and why each page exists',
          'Ahrefs + GSC data: DR growth, organic traffic, referring domains',
          'The pitch: "I built this for my property. I can build it for yours."',
        ],
      },
    ],
  },
]

function ModuleCard({ module, isOpen, onToggle }: { module: Module; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--sf-navy)]/5 overflow-hidden sf-card-hover">
      {/* Header — always visible */}
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
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expandable Content */}
      <div className={`sf-accordion-content ${isOpen ? 'open' : ''}`}>
        <div className="sf-accordion-inner">
          <div className="px-4 sm:px-6 pb-5 sm:pb-6 border-t border-[var(--sf-navy)]/5">
            {/* Transformation */}
            <div className="bg-[var(--sf-gold)]/5 rounded-lg px-4 py-3 mt-4 mb-6">
              <p className="text-sm text-[var(--sf-navy)]/70 italic">{module.transformation}</p>
            </div>

            {/* Lessons */}
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

            {/* Tools */}
            {module.tools && (
              <div className="mt-5 pt-4 border-t border-[var(--sf-navy)]/5">
                <span className="text-xs font-semibold text-[var(--sf-navy)]/40 uppercase tracking-wider">
                  Tools & Integrations:
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

export default function ModuleBreakdown() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="modules" aria-label="Course modules" className="py-14 sm:py-20 lg:py-28 bg-[var(--sf-navy)]/[0.02]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Full Curriculum
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-4 mb-4">
            14 Modules. 95+ Lessons.
            <br />
            <span className="sf-gold-gradient">An Owned Ecosystem.</span>
          </h2>
          <p className="text-[var(--sf-navy)]/60 max-w-2xl mx-auto">
            The modern STR operator doesn&apos;t spread across eight platforms.
            They own their direct site, build a local SEO moat, and let discovery
            platforms feed the ecosystem. Every module includes templates, swipe
            files, and step-by-step walkthroughs.
          </p>
        </div>

        {/* Module Accordions */}
        <div className="space-y-3">
          {modules.map((module, i) => (
            <ModuleCard
              key={module.number}
              module={module}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Summary stat */}
        <div className="mt-10 text-center">
          <p className="text-sm text-[var(--sf-navy)]/40">
            {modules.reduce((sum, m) => sum + m.lessons.length, 0)} lessons
            {' \u00B7 '}60+ templates{' \u00B7 '}
            Copy-paste ready{' \u00B7 '}Lifetime access
          </p>
        </div>
      </div>
    </section>
  )
}
