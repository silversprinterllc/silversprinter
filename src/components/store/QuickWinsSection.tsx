'use client'

import { useState } from 'react'

type Category = 'All' | 'Pricing' | 'Distribution' | 'Direct Bookings' | 'Guest Experience' | 'Operations' | 'Data & Intel'

interface Tip {
  id: number
  category: Exclude<Category, 'All'>
  title: string
  action: string
  time: string
  roi: string
  spoke: string[] // maps to quiz spoke tags for future personalization
}

const TIPS: Tip[] = [
  {
    id: 1,
    category: 'Pricing',
    title: 'Gap-Night Pricing — Fill the Holes',
    action: 'A 1–2 night gap between bookings earns $0 by default. In PriceLabs, enable "Gap Fill" under Customizations — set a 20–30% discount trigger for orphan nights. A filled gap at 75% ADR beats an empty gap at 0% every time. Setup takes 15 minutes. Check your calendar monthly to verify it\'s working.',
    time: '15 min setup',
    roi: 'Measurable in 30 days',
    spoke: ['pricing'],
  },
  {
    id: 2,
    category: 'Pricing',
    title: 'The 72-Hour Last-Minute Rule',
    action: 'Create a pricing rule in your dynamic tool: if a date is within 72 hours of arrival and still unbooked, price it 12–18% below your comp set. You\'re not giving away value — you\'re capturing demand that otherwise books your neighbor. This window has the highest booking intent and the lowest price sensitivity among last-minute travelers.',
    time: '20 min setup',
    roi: 'Fills dates that would otherwise go empty',
    spoke: ['pricing'],
  },
  {
    id: 3,
    category: 'Pricing',
    title: 'Minimum Stay Segmentation by Season',
    action: 'Three-tier minimum stay: 3-night minimum in peak season, 2-night in shoulder, 1-night allowed in deep off-season. Most hosts set one blanket minimum. Segmenting by season prevents peak weekends from being burned by Friday-only or Saturday-only bookings — the ones that block surrounding dates and kill your weekly revenue.',
    time: '30 min setup',
    roi: '12–18% ADR lift in peak season, reported by operators who implement it',
    spoke: ['pricing'],
  },
  {
    id: 4,
    category: 'Distribution',
    title: 'Get on Google Vacation Rentals (Free)',
    action: 'Your listing can appear directly in Google Search and Google Maps — no Airbnb, no commission — via Google Vacation Rentals. Connect through Lodgify, Hostaway, Guesty, or OwnerRez (takes 30 minutes). Guests who book through Google search convert directly. This is the distribution channel most hosts don\'t know exists.',
    time: '30 min to connect',
    roi: 'Zero-commission bookings from Google organic search',
    spoke: ['distribution'],
  },
  {
    id: 5,
    category: 'Distribution',
    title: 'Vrbo Premier Host — Claim What You Likely Already Qualify For',
    action: 'Vrbo\'s algorithm gives Premier Hosts 3–5x more search visibility. Requirements: 4.3+ rating, sub-24hr response time, under 5% cancellation rate, and 5+ bookings or 3+ reviews. Most hosts who qualify have never claimed it. Check your Vrbo dashboard under "Premier Host" — if you\'re eligible and haven\'t opted in, you\'re invisible to a significant share of Vrbo demand.',
    time: '10 min to check and claim',
    roi: '3–5x search visibility increase on Vrbo',
    spoke: ['distribution'],
  },
  {
    id: 6,
    category: 'Distribution',
    title: 'Furnished Finder for Off-Season Fill',
    action: 'Travel nurses, remote workers, and relocating families book 30–90 day stays at flat monthly rates. A single 45-day mid-term booking at 60% of your nightly rate fills your slow season without Airbnb fees. List on Furnished Finder (free listing) in 20 minutes. Pro tip: set your MTR minimum at 28 nights to avoid the nightly-rate regulation trigger in most markets.',
    time: '20 min to list',
    roi: 'Single booking can replace 2–3 weeks of STR vacancy',
    spoke: ['distribution'],
  },
  {
    id: 7,
    category: 'Direct Bookings',
    title: 'StayFi: Turn Your WiFi Into a Lead Capture Machine',
    action: 'Replace your router password with a StayFi landing page ($15/month). Every guest who connects to WiFi sees your direct booking site and enters their email before getting access. Average operator captures 60–80% of guest emails — automatically. That list becomes your direct marketing channel. The payback period on one direct booking is typically under 30 days.',
    time: '1 hour setup',
    roi: 'Email list of every past guest — the asset most hosts never build',
    spoke: ['direct-bookings', 'guest-capture'],
  },
  {
    id: 8,
    category: 'Direct Bookings',
    title: 'The Departure Card — $12 for Permanent Direct Booking Real Estate',
    action: 'A business-card-sized insert left at checkout: your direct booking URL, a QR code that links to it, and one sentence — "Book direct next time. No platform fees. Same calendar." $12 buys 500 cards on Vistaprint. Every guest who rebooks direct saves you 15%+ in OTA fees. The card sits in their wallet or phone camera roll. This is the cheapest recurring marketing spend in STR.',
    time: '1 hour to design and order',
    roi: 'One repeat direct booking pays for 500 cards',
    spoke: ['direct-bookings'],
  },
  {
    id: 9,
    category: 'Guest Experience',
    title: 'The 48-Hour Review Window',
    action: 'Send your review request 48 hours after checkout — not on departure day. On checkout day, guests are traveling, distracted, and the experience is already competing with their next thing. At 48 hours, the memory is still warm and they\'re settled. Conversion on review requests at 48 hours runs 2–3x higher than same-day requests. Script: "Hi [name], hope you made it home. If you have 2 minutes, an honest review helps travelers like you find us."',
    time: 'Automate once in your PMS',
    roi: '2–3x review conversion rate vs. day-of requests',
    spoke: ['reviews', 'guest-experience'],
  },
  {
    id: 10,
    category: 'Guest Experience',
    title: 'The Pre-Arrival 3-Message Sequence',
    action: 'Three automated messages: (1) Booking confirmation — house rules summary, check-in process overview. (2) 3 days before arrival — full check-in instructions, door code, parking, local recommendations. (3) Morning of arrival — door code reminder, WiFi password, your contact number. This sequence alone eliminates 80% of day-of guest questions and puts guests in a 5-star mindset before they\'ve seen your property.',
    time: '1 hour to write and automate in your PMS',
    roi: 'Measurable reduction in day-of messages; pre-conditions 5-star reviews',
    spoke: ['automation', 'guest-experience'],
  },
  {
    id: 11,
    category: 'Operations',
    title: 'Unique Expiring Door Codes Per Guest',
    action: 'If you\'re reusing the same lockbox code for every guest, you have no way of knowing who has access to your property. OwnerRez, Hospitable, and Hostaway all auto-generate unique door codes per reservation that expire at checkout. Setup takes about an hour and is included in most PMS subscriptions. You get a clean audit trail and eliminate the liability of a former guest retaining access.',
    time: '1 hour setup',
    roi: 'Eliminates liability and key management entirely',
    spoke: ['automation', 'operations'],
  },
  {
    id: 12,
    category: 'Operations',
    title: 'Replace Your Welcome Book With a Live Google Doc',
    action: 'Printed welcome books go out of date the day a restaurant closes or a trail reopens. Share a live Google Doc link in your pre-arrival message instead. You update it once, every future guest gets the current version. Guests share the doc with friends planning trips to your area. It\'s also searchable by Google. Time to create: 2 hours. Time to maintain: 15 minutes per month.',
    time: '2 hours to create',
    roi: 'Zero reprint costs; living marketing asset that guests share',
    spoke: ['operations', 'guest-experience'],
  },
  {
    id: 13,
    category: 'Data & Intel',
    title: 'AirDNA Market Minder — Free Weekly Competitive Intelligence',
    action: 'Sign up for AirDNA\'s free Market Minder email at airdna.co. Every week it tells you occupancy rate, ADR trend, and RevPAR movement in your specific market — before it shows up in your calendar. When market occupancy starts dropping, you price more aggressively before you feel the vacancy. When it\'s climbing, you hold rate instead of discounting. Two minutes to read. The information advantage over hosts who don\'t track this is compounding.',
    time: '5 min to sign up',
    roi: 'Market intelligence that drives better pricing decisions every week',
    spoke: ['data', 'pricing'],
  },
  {
    id: 14,
    category: 'Data & Intel',
    title: 'The 90-Day Comp Set Audit',
    action: 'Identify 5 comparable properties in your market. Screenshot or note their calendar occupancy once per month for 90 days. At the end of 90 days you\'ll know who\'s consistently winning, who\'s discounting to fill, and what the actual price-to-occupancy relationship is in your submarket. Free. 20 minutes per month. This is the exercise that operators charging 30% above comp set ADR run every quarter.',
    time: '20 min/month',
    roi: 'Reveals the pricing and positioning gaps your competitors don\'t want you to see',
    spoke: ['data', 'distribution'],
  },
  {
    id: 15,
    category: 'Guest Experience',
    title: 'The Upsell at Booking Confirmation',
    action: 'Send a Typeform (free) with 3 questions at booking confirmation: (1) Any special occasions we should know about? (2) Want early check-in or late checkout? (3) Interested in a pre-stocked fridge? Guests convert on upsells 3–4x more readily at booking confirmation than on arrival — they\'re still in the excitement window. Average upsell revenue runs $35–85 per booking for operators who implement this. Typeform connects to most email tools and takes 30 minutes to build.',
    time: '30 min to build',
    roi: '$35–85 average upsell revenue per booking',
    spoke: ['guest-experience', 'revenue'],
  },
]

const CATEGORIES: Category[] = ['All', 'Pricing', 'Distribution', 'Direct Bookings', 'Guest Experience', 'Operations', 'Data & Intel']

const CATEGORY_COLORS: Record<string, string> = {
  Pricing: '#10B981',
  Distribution: '#3B82F6',
  'Direct Bookings': '#8B5CF6',
  'Guest Experience': '#F59E0B',
  Operations: '#6B7280',
  'Data & Intel': '#D4A017',
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
            Specific, implementable, and measurable. Each one is something a real operator can run this week —
            not a concept, not a category. Free, no strings attached.
          </p>
        </div>

        {/* Quiz CTA */}
        <div className="mb-10 bg-[var(--sf-navy)]/[0.03] border border-[var(--sf-navy)]/8 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--sf-navy)]/60 text-center sm:text-left">
            <span className="font-semibold text-[var(--sf-navy)]">Not sure which tips matter most for your property?</span>
            {' '}Take the free saturation quiz — it scores your operation and surfaces your highest-leverage gaps.
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
                  {/* Number */}
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

                  {/* Chevron */}
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
            These are the tactics. The System shows you how they fit together.
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
