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
    subtitle: 'Be visible everywhere travelers search',
    transformation: '"I\'m on Airbnb" → "I\'m on 6+ platforms simultaneously"',
    duration: '2 weeks',
    tools: 'Hostaway, Rankbreeze, AutoRank, AirDNA',
    lessons: [
      {
        title: 'Platform Economics',
        summary: 'Not all platforms are equal. Understand where your ideal guests search.',
        bullets: [
          'Compare commission structures across 6 platforms',
          'Identify which platforms dominate in YOUR market',
          'Calculate revenue impact of adding 2-3 new platforms',
          'Set up platform-specific pricing adjustments',
        ],
      },
      {
        title: 'Airbnb Algorithm Mastery',
        summary: 'Learn what the algorithm rewards and how to earn Guest Favorite status.',
        bullets: [
          'Optimize for search ranking factors: response time, booking rate, reviews',
          'Track your ranking with Rankbreeze ($29/mo)',
          'Implement listing SEO with keyword-rich titles and descriptions',
          'Configure Instant Book and algorithm-friendly settings',
        ],
      },
      {
        title: 'VRBO, Booking.com & Beyond',
        summary: 'Each platform has different audiences and different rules.',
        bullets: [
          'Set up VRBO for families and group travelers',
          'Configure Booking.com for international and business guests',
          'List on Google Vacation Rentals (free)',
          'Add Expedia and TripAdvisor to round out portfolio',
        ],
      },
      {
        title: 'Channel Manager Setup',
        summary: 'Sync 6 platforms without double bookings or price mismatches.',
        bullets: [
          'Choose and configure your channel manager',
          'Connect all platforms to a single calendar',
          'Set up unified inbox for all guest messages',
          'Test sync and verify everything works',
        ],
      },
    ],
  },
  {
    number: '02',
    title: 'Direct Booking Engine',
    subtitle: 'Own your guest relationships and keep the commission',
    transformation: '"I depend on Airbnb" → "40% of bookings come direct, commission-free"',
    duration: '3 weeks',
    tools: 'Lodgify/OwnerRez, StayFi, Stripe',
    lessons: [
      {
        title: 'Strategy & Economics',
        summary: 'Calculate your OTA commission bleed and set direct booking targets.',
        bullets: [
          'Calculate how much you lose to OTA fees annually ($4K-$12K for most hosts)',
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
    subtitle: 'Turn one-time guests into your #1 revenue source',
    transformation: '"Guests book once and disappear" → "Past guests fill my calendar"',
    duration: '1 week',
    tools: 'StayFi, TouchStay, email platform',
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
        title: 'Repeat Bookings & Referrals',
        summary: 'A guest who books twice is worth 5x a first-timer.',
        bullets: [
          'Create a Return Guest rate (10-15% off direct)',
          'Build loyalty tiers: Silver, Gold, Platinum with escalating perks',
          'Launch a "Give $50, Get $50" referral program with automated tracking',
          'Target: 10-20% of bookings from referrals within 18 months',
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
    subtitle: 'Monetize guest activities through commissions and upsells',
    transformation: '"Guests just sleep here" → "Guests have a premium lifestyle experience"',
    duration: '1 week',
    tools: 'Hostfully, TouchStay, Viator, Airbnb Experiences',
    lessons: [
      {
        title: 'Airbnb Experiences',
        summary: 'A separate income stream AND a marketing channel for your property.',
        bullets: [
          'Design your Airbnb Experience (food tour, adventure, workshop)',
          'Set pricing per guest ($50-$200 per person, Airbnb takes 20%)',
          'Cross-promote: Experience listing links back to your property',
          'Revenue potential: $400-$6,400/month additional',
        ],
      },
      {
        title: 'Viator & Activity Affiliates',
        summary: 'Earn 8% commission on every activity guests book through your links.',
        bullets: [
          'Set up Viator affiliate account (8% per booking, 30-day cookie)',
          'Embed affiliate links in your digital guidebook',
          'Curate "Top 10 Experiences" list for your market',
          'Revenue potential: $1,600/year passive at 200 guests/year',
        ],
      },
      {
        title: 'Premium Add-Ons & Experience Packages',
        summary: 'Personal chefs, wine tours, boat charters — package and profit.',
        bullets: [
          'Partner with 8-12 local experience providers',
          'Negotiate referral commissions (10-20%) or exclusive guest rates',
          'Create "experience packages" on your direct booking site',
          'Send the upsell email 3 days before check-in with curated recommendations',
        ],
      },
      {
        title: 'Digital Guidebook as Revenue Engine',
        summary: 'Your guidebook isn\'t a convenience — it\'s a storefront.',
        bullets: [
          'Build your TouchStay or Hostfully guidebook with embedded affiliate links',
          'Add "Book Now" buttons for all experience partners',
          'Track click-through and booking data monthly',
          'Update seasonally for relevant activities',
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
            10 Modules. 8 Demand Channels.
            <br />
            <span className="sf-gold-gradient">One Complete System.</span>
          </h2>
          <p className="text-[var(--sf-navy)]/60 max-w-2xl mx-auto">
            Click any module to see the full lesson breakdown, tools, and
            implementation timeline. Every module includes templates, swipe files,
            and step-by-step walkthroughs.
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
