'use client'

import { useState } from 'react'

type Category = 'All' | 'Acquisition' | 'Operations' | 'Distribution' | 'Direct Bookings' | 'Guest Experience' | 'Visibility'

interface Tip {
  id: number
  category: Exclude<Category, 'All'>
  title: string
  action: string
  time: string
  roi: string
}

const TIPS: Tip[] = [
  // ─── ACQUISITION ────────────────────────────────────────────────────────────
  {
    id: 1,
    category: 'Acquisition',
    title: 'The Pre-Tour Street View Walk',
    action: 'Before you visit any property, open Google Street View and spend 20 minutes mapping the immediate surroundings: the 3 nearest neighbor structures and how close they are (noise complaint geography), where 6–8 guests actually park, and any nuisance source within 500 feet — a bar, a busy road, a commercial parking lot. Things that end up in 3-star reviews were always in the property\'s surroundings before you bought it. You can see most of them for free without leaving your desk.',
    time: '20 min per property',
    roi: 'Filters out properties that will never review well regardless of how well you operate them',
  },
  {
    id: 2,
    category: 'Acquisition',
    title: 'The Soft Launch Protocol',
    action: 'Your first 3–5 guest stays should be people you know — friends, family, colleagues — who will tell you exactly what broke, what confused them, and what they\'d have loved. Run these stays at cost. Ask for written feedback on the check-in experience, every appliance, the house manual, and the checkout instructions. One honest soft-launch guest who tells you the shower runs cold after 8 minutes is worth more than 10 strangers who leave it in a 3-star public review. Fix everything they find. Then list publicly.',
    time: '2–3 weeks before public launch',
    roi: 'Eliminates preventable 1–3 star reviews from your review history permanently',
  },

  // ─── OPERATIONS ─────────────────────────────────────────────────────────────
  {
    id: 3,
    category: 'Operations',
    title: 'The Neighbor Introduction',
    action: 'Before your first guest ever checks in, knock on the doors of your 3 closest neighbors. Tell them: you\'re a professional host with noise monitoring equipment, a local contact available 24/7, and a house rules policy on quiet hours. Give them your cell directly. Neighbors who know you call you when something\'s off. Neighbors who don\'t know you call code enforcement. This 30-minute conversation costs nothing and protects your permit.',
    time: '30 min, one time',
    roi: 'Prevents neighbor complaints from becoming permit-level problems',
  },
  {
    id: 4,
    category: 'Operations',
    title: 'Noise Monitor Disclosure in House Rules',
    action: 'You\'ve installed the noise monitor. Most hosts stop there. Add one sentence to your Airbnb house rules: "Property is equipped with exterior noise monitoring. Quiet hours begin at 10pm." A guest who knows you monitor noise doesn\'t throw the party. The disclosure is also an insurance audit trail — if you ever file a claim for an event, your house rules document that you proactively disclosed monitoring and set expectations. Deterrence and documentation in one sentence.',
    time: '5 min',
    roi: 'Behavioral deterrent at no cost; creates a clean insurance paper trail',
  },
  {
    id: 5,
    category: 'Operations',
    title: 'The Amenity Request Log',
    action: 'Start a running note — a Google Sheet or Notion doc — tracking every amenity, appliance, or feature a guest requests in messaging or mentions in a review. After 20 stays, you have a prioritized improvement list built entirely from what your actual guests asked for. The hot tub, the bike rack, the second TV, the kayak — the requests tell you what they\'ll pay more for before you spend the money. Five minutes per review cycle. Compounding value over years.',
    time: '5 min per review cycle',
    roi: 'Prioritizes your improvement budget by actual guest demand, not guesswork',
  },

  // ─── DISTRIBUTION ────────────────────────────────────────────────────────────
  {
    id: 6,
    category: 'Distribution',
    title: 'Furnished Finder for Off-Season Fill',
    action: 'Travel nurses, remote workers, and relocating families book 30–90 day stays at flat monthly rates — and they don\'t care about peak weekends. A single 45-day mid-term booking at 60% of your nightly rate fills your slow season with zero OTA fees and one turnover instead of fifteen. List on Furnished Finder (free listing) in under 30 minutes. Set your minimum at 28 nights — most STR permit regulations apply only to stays under 30 days, so the 28-night floor puts mid-term guests in a different regulatory category.',
    time: '30 min to list',
    roi: 'One mid-term booking replaces 2–3 weeks of vacancy at zero OTA commission',
  },

  // ─── DIRECT BOOKINGS ─────────────────────────────────────────────────────────
  {
    id: 7,
    category: 'Direct Bookings',
    title: 'The Departure Card',
    action: 'A business-card-sized insert left at checkout: your direct booking URL on one side, a QR code that links to it on the other, and one line — "Book direct next time. No platform fees. Same calendar." $12 buys 500 cards on Vistaprint. Design it in Canva in 20 minutes. Every guest who rebooks direct saves you 15%+ in OTA fees. The card sits in their wallet or in their phone camera roll. It\'s the cheapest recurring marketing spend in STR.',
    time: '$12 + 30 min design',
    roi: 'One repeat direct booking covers the cost of 500 cards',
  },
  {
    id: 8,
    category: 'Direct Bookings',
    title: 'Early Check-In / Late Checkout as On-Demand Revenue',
    action: 'If the night before a booking is unbooked, offer early check-in at $75–100 via Stripe or your PMS. If the night after is unbooked, late checkout is the same. Most operators either give this away for free or just say no. Neither converts. Mention it in your booking confirmation: "Early check-in is available for $75 if the prior night is open." At 150 stays/year and 20% attachment, that\'s $2,250/year from calendar gaps that would have been empty anyway.',
    time: '1 hour to build the flow',
    roi: '$2,000–3,500/year in add-on revenue from existing guests, no new marketing needed',
  },

  // ─── GUEST EXPERIENCE ────────────────────────────────────────────────────────
  {
    id: 9,
    category: 'Guest Experience',
    title: 'The Live Google Doc Welcome Guide',
    action: 'A printed welcome book goes out of date the day a restaurant closes or a trail reopens. Replace it with a shared Google Doc link in your pre-arrival message. Update it once and every future guest gets the current version — no reprinting. Guests share it with friends planning trips to your area. It\'s searchable and linkable. Because it\'s a real URL, you can see how often it\'s opened. Build time: 2 hours. Maintenance: 15 minutes per month.',
    time: '2 hours to build',
    roi: 'Zero reprint cost; living asset that guests organically share',
  },
  {
    id: 10,
    category: 'Guest Experience',
    title: 'The Pet Policy 30-Day Test',
    action: 'Most operators decide pet policy based on gut feel. Run a 30-day test instead: open your listing to pets at your standard cleaning fee plus a $75–100 pet fee. After 30 days, check: did pet bookings arrive, what was the property condition, and did net revenue improve? In outdoor, lake, and nature markets, the pet-friendly filter removes 25–40% of your competitive listings from search results. The data — not your preference — should make this call.',
    time: '30-day test, 1 hour to set up',
    roi: 'In the right market, adding pets can increase your bookable demand pool by 25–40%',
  },

  // ─── VISIBILITY ──────────────────────────────────────────────────────────────
  {
    id: 11,
    category: 'Visibility',
    title: 'Read Your Airbnb Insights Dashboard',
    action: 'Airbnb Insights shows three numbers most hosts never look at: impressions (how often you appeared in search), click-through rate (what percentage clicked), and listing saves (how many browsers hearted you). These three numbers tell you exactly where your problem is. High impressions + low clicks: your hero photo or title isn\'t stopping the scroll. High clicks + low saves: your gallery disappoints. High saves + low bookings: your price or calendar is the barrier. Know your problem before you change anything.',
    time: '10 min/month',
    roi: 'Tells you the right fix before you spend money on the wrong one',
  },
  {
    id: 12,
    category: 'Visibility',
    title: 'Search Your Own Market as a Guest',
    action: 'Once per year, open Airbnb as a guest and search your own market. Filter to your comp set by bedroom count and price. Sort by Guest Favorite. Click the top 5 listings and read their reviews word for word. Count what guests mention most — the specific amenity, the location advantage, the feeling they describe. Compare those features to yours. This one exercise — 45 minutes, free — tells you more about your competitive position than any analytics tool.',
    time: '45 min/year',
    roi: 'Reveals competitive positioning gaps that no dashboard surfaces',
  },
  {
    id: 13,
    category: 'Visibility',
    title: 'Quarterly Listing Title Test',
    action: 'Your Airbnb title drives your click-through rate — and Insights shows you exactly what that rate is. Run a title test quarterly: change only one element (lead feature, location hook, or property type framing) and hold it for 30 days. Then compare click-through rate to the prior 30 days. Over four tests per year, you converge on the exact combination of words that converts your market\'s browsers. Most operators set a title on day one and never revisit it.',
    time: '5 min per quarter',
    roi: 'A 20% click-through improvement compounds across every search impression your listing gets',
  },
  {
    id: 14,
    category: 'Visibility',
    title: 'Host Profile as a Conversion Tool',
    action: 'When two similar listings compete for the same guest, they read your host profile. A profile photo where you\'re smiling outdoors (not a corporate headshot), a bio that names your specific location and why you host there, and recent host reviews that mention your name convert hesitant guests. An outdated 3-year-old profile photo with no recent activity reads as absentee management. Update yours every 18 months. Takes 20 minutes. Most hosts skip it entirely.',
    time: '20 min every 18 months',
    roi: 'Converts hesitant guests comparing you against a similar-priced property',
  },
  {
    id: 15,
    category: 'Visibility',
    title: 'Host-to-Host Intelligence in Your Market',
    action: 'Most STR operators treat neighboring hosts as competition. The best ones treat them as their highest-quality market intelligence source. Find 3–5 other professional hosts in your area through local host Facebook groups, Airbnb community events, or cleaner referrals. Propose a quarterly coffee or call. What you get: handyman and cleaner referrals, advance notice of local events that book out your comps, honest pricing intel you can\'t get from any tool, and someone to call when a guest situation escalates.',
    time: '1 coffee per quarter',
    roi: 'Market intelligence, vendor referrals, and a support network that costs nothing',
  },
]

const CATEGORIES: Category[] = ['All', 'Acquisition', 'Operations', 'Distribution', 'Direct Bookings', 'Guest Experience', 'Visibility']

const CATEGORY_COLORS: Record<string, string> = {
  Acquisition: '#8B5CF6',
  Operations: '#6B7280',
  Distribution: '#3B82F6',
  'Direct Bookings': '#8B5CF6',
  'Guest Experience': '#F59E0B',
  Visibility: '#D4A017',
}

export default function QuickWinsSection() {
  const [active, setActive] = useState<Category>('All')
  const [expanded, setExpanded] = useState<number | null>(null)

  const visible = active === 'All' ? TIPS : TIPS.filter((t) => t.category === active)

  return (
    <section id="quick-wins" aria-label="15 Operator Quick Wins" className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            No Email Required
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-3 mb-4">
            15 Tactics That Move the Needle
          </h2>
          <p className="text-[var(--sf-navy)]/50 max-w-2xl mx-auto text-sm leading-relaxed">
            Specific, implementable, and measurable. Tactics most operators haven&apos;t tried —
            not a replay of what every STR blog already covers.
          </p>
        </div>

        {/* Quiz CTA */}
        <div className="mb-10 bg-[var(--sf-navy)]/[0.03] border border-[var(--sf-navy)]/8 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--sf-navy)]/60 text-center sm:text-left">
            <span className="font-semibold text-[var(--sf-navy)]">Not sure which tactics apply to your operation?</span>
            {' '}The free saturation quiz scores your property across 8 dimensions and shows where your highest-leverage gaps are.
          </p>
          <a
            href="/course/quiz"
            className="shrink-0 inline-flex items-center gap-2 bg-[var(--sf-navy)] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[var(--sf-navy)]/90 transition-all whitespace-nowrap"
          >
            Take the Quiz →
          </a>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setExpanded(null) }}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                active === cat
                  ? 'bg-[var(--sf-navy)] text-white'
                  : 'bg-[var(--sf-navy)]/5 text-[var(--sf-navy)]/60 hover:bg-[var(--sf-navy)]/10'
              }`}
            >
              {cat}
              {cat !== 'All' && (
                <span className="ml-1.5 opacity-50">{TIPS.filter((t) => t.category === cat).length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tips list */}
        <div className="space-y-3">
          {visible.map((tip) => {
            const isOpen = expanded === tip.id
            const color = CATEGORY_COLORS[tip.category] || '#D4A017'
            return (
              <div
                key={tip.id}
                className="border border-[var(--sf-navy)]/8 rounded-2xl overflow-hidden transition-all duration-200"
                style={{ background: isOpen ? 'rgba(9,38,58,0.02)' : 'white' }}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : tip.id)}
                  className="w-full text-left px-6 py-5 flex items-start gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold mt-0.5"
                    style={{ background: `${color}15`, color }}
                  >
                    {tip.id}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                        style={{ background: `${color}15`, color }}
                      >
                        {tip.category}
                      </span>
                      <span className="text-[11px] text-[var(--sf-navy)]/30">{tip.time}</span>
                    </div>
                    <p className="font-semibold text-sm text-[var(--sf-navy)] leading-snug group-hover:text-[var(--sf-gold)] transition-colors">
                      {tip.title}
                    </p>
                    {!isOpen && (
                      <p className="text-xs text-[var(--sf-navy)]/40 mt-1 line-clamp-1">{tip.action}</p>
                    )}
                  </div>

                  <svg
                    className={`shrink-0 w-4 h-4 text-[var(--sf-navy)]/30 mt-1 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pl-11">
                      <p className="text-sm text-[var(--sf-navy)]/70 leading-relaxed mb-4">{tip.action}</p>
                      <div className="flex items-start gap-2">
                        <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <p className="text-xs font-semibold" style={{ color }}>{tip.roi}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[var(--sf-navy)]/40 mb-4">
            These are tactics adjacent to the system. The system shows you how they fit together.
          </p>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 bg-[var(--sf-gold)] text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-lg hover:shadow-[var(--sf-gold)]/20"
          >
            See The System →
          </a>
        </div>
      </div>
    </section>
  )
}
