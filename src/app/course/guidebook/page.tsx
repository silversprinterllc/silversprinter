import type { Metadata } from 'next'
import Link from 'next/link'
import ToolPageHeader from '@/components/store/ToolPageHeader'
import Footer from '@/components/store/Footer'
import ToolFAQ from '@/components/store/ToolFAQ'
import GuidebookForm from './GuidebookForm'

export const metadata: Metadata = {
  title: 'Free Local Area Guidebook Template | SpokeBnB',
  description:
    'Free Notion guidebook template for STR hosts — 9 sections, Viator affiliate placements, and a Finger Lakes example. Set up in 90 minutes.',
  alternates: { canonical: '/course/guidebook' },
}

const sections = [
  {
    num: '01',
    title: 'Welcome Page',
    body: 'Personal greeting, cover photo, quick-reference card (WiFi, check-in, host phone), and "what to do first" menu.',
  },
  {
    num: '02',
    title: 'Restaurants & Dining',
    body: 'Ten curated slots across six categories: fine dining, casual, quick eats, date night, family-friendly, late night.',
  },
  {
    num: '03',
    title: 'Activities & Attractions',
    body: 'Outdoor, cultural, shopping, and day-trip recommendations — each with time needed, cost, and an insider tip.',
  },
  {
    num: '04',
    title: 'Wineries / Breweries',
    body: 'Eight tasting-room slots with signature pours, suggested tour routes, and "bring home" bottle picks.',
  },
  {
    num: '05',
    title: 'Outdoor Recreation',
    body: 'Trails, lakes, water sports, and seasonal sections (winter / spring / summer / fall) with difficulty and pet rules.',
  },
  {
    num: '06',
    title: 'Special Experiences',
    body: 'The Viator affiliate section — 5–8 vetted experiences that earn 8% commission on every guest booking.',
  },
  {
    num: '07',
    title: 'Practical Information',
    body: 'Grocery, pharmacy, pet services, urgent care, gas stations — every answer to "where do I find..." pre-loaded.',
  },
  {
    num: '08',
    title: 'House Rules & Property Info',
    body: 'Quiet hours, trash days, hot tub/pool rules, parking instructions, and a check-out checklist.',
  },
  {
    num: '09',
    title: 'Emergency Information',
    body: 'Emergency contacts, nearest ER, plumber, electrician, HVAC, and poison control — one table, always at hand.',
  },
]

const faqItems = [
  {
    q: 'Is this really free?',
    a: 'Yes. No credit card. No "free trial." You get the full Notion template, the Finger Lakes pre-filled example, the Viator setup guide, and the QR-code Canva template. No upsell required.',
  },
  {
    q: 'Do I need a Notion account?',
    a: 'Yes, but the free tier works perfectly. Sign up at notion.so — takes 30 seconds.',
  },
  {
    q: 'Will this work for my beach rental / cabin / city loft?',
    a: 'Yes. The template is designed to be customized. The Finger Lakes example is just one illustration. Delete the winery section and add a beach section if that\'s your market.',
  },
  {
    q: 'What if I don\'t have Viator in my market?',
    a: 'The template works regardless. Viator covers 95%+ of US/EU markets. For the rest, we include instructions for local partnerships and alternative affiliate programs (GetYourGuide, TripAdvisor, Amazon).',
  },
  {
    q: 'Can I give it to my co-host or property manager?',
    a: 'Yes. One download, use across all your properties.',
  },
]

const whyItWorks = [
  {
    headline: 'Fewer guest messages',
    body: 'Every "where should we eat?" message you prevent is a better guest experience and a 5-star review closer.',
  },
  {
    headline: 'Passive Viator income',
    body: 'Earn 8% on every experience your guests book through your affiliate links. No extra work after initial setup.',
  },
  {
    headline: 'Faster setup than you think',
    body: 'Duplicate to Notion, swap in your property info and local picks. Most hosts are done in under 90 minutes.',
  },
]

export default function GuidebookPage() {
  return (
    <main>
      <ToolPageHeader />

      {/* Hero */}
      <section className="sf-navy-gradient pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(212,160,23,0.6) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/course"
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-[var(--sf-gold)] transition-colors mb-6"
          >
            ← Back to Course
          </Link>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="inline-block bg-[var(--sf-gold)]/15 border border-[var(--sf-gold)]/30 rounded-full px-3 py-1 text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase mb-5">
                Free Notion Template
              </span>
              <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
                The Local Guidebook Template That{' '}
                <span className="sf-gold-gradient">Earns Affiliate Revenue</span> While You Sleep
              </h1>
              <p className="mt-6 text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
                Give your guests a 5-star experience. Earn 8% commission on every Viator experience they
                book. Never answer &quot;where should we eat tonight?&quot; in your guest messages
                again.
              </p>
              <p className="mt-4 text-sm text-white/50">
                90 minutes to set up. Duplicate to Notion in one click. Free.
              </p>
            </div>

            {/* Notion-themed visual placeholder */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/10">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-[var(--sf-cream)] border-b border-[var(--sf-navy)]/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  <div className="ml-3 text-[10px] text-[var(--sf-navy)]/50 font-mono">
                    notion.so / lakeside-landing-flx-guide
                  </div>
                </div>
                <div className="p-5 sm:p-7 text-[var(--sf-navy)]">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">🏡</span>
                    <span className="text-xs font-mono text-[var(--sf-navy)]/40">Untitled</span>
                  </div>
                  <h3 className="font-[var(--font-display)] text-xl sm:text-2xl font-bold leading-tight">
                    Welcome to Lakeside Landing FLX
                  </h3>
                  <p className="text-xs text-[var(--sf-navy)]/50 italic mt-1">
                    Your Seneca Lake Escape — Where the Wine Trail Meets the Water
                  </p>
                  <div className="mt-5 space-y-2">
                    {[
                      { icon: '🍽️', label: 'Restaurants & Dining' },
                      { icon: '🎨', label: 'Activities & Attractions' },
                      { icon: '🍷', label: 'Wineries on the Seneca Lake Trail' },
                      { icon: '🚣', label: 'Outdoor Recreation' },
                      { icon: '✨', label: 'Special Experiences' },
                    ].map((row) => (
                      <div
                        key={row.label}
                        className="flex items-center gap-2.5 py-1.5 text-sm border-b border-[var(--sf-navy)]/5 last:border-0"
                      >
                        <span className="text-base">{row.icon}</span>
                        <span className="text-[var(--sf-navy)]/80">{row.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[var(--sf-gold)] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg">
                + Viator affiliate ready
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it works */}
      <section className="bg-white border-y border-[var(--sf-navy)]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            {whyItWorks.map((w) => (
              <div key={w.headline}>
                <div className="font-semibold text-[var(--sf-navy)] mb-1">{w.headline}</div>
                <div className="text-sm text-[var(--sf-navy)]/60 leading-relaxed">{w.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Inside */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--sf-cream)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
              9 Sections
            </span>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--sf-navy)] mt-3">
              Everything a guest needs, pre-built
            </h2>
            <p className="text-[var(--sf-navy)]/60 mt-4 max-w-2xl mx-auto">
              Nine Notion sub-pages with toggle sections, mobile-optimized, and ready to duplicate
              to your workspace in one click.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sections.map((s) => (
              <div
                key={s.num}
                className="bg-white rounded-2xl p-6 border border-[var(--sf-navy)]/10 shadow-sm sf-card-hover"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="font-[var(--font-display)] text-3xl font-bold text-[var(--sf-gold)]/40">
                    {s.num}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-[var(--sf-gold)]/10 text-[var(--sf-gold)] flex items-center justify-center text-xs font-semibold">
                    ✓
                  </span>
                </div>
                <h3 className="font-semibold text-[var(--sf-navy)] text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-[var(--sf-navy)]/60 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Filled Example */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
                Pre-Filled Example
              </span>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--sf-navy)] mt-3 mb-5">
                See what &quot;done right&quot; looks like
              </h2>
              <p className="text-[var(--sf-navy)]/70 leading-relaxed mb-5">
                The template ships with a fully completed Finger Lakes example —
                <strong className="text-[var(--sf-navy)]"> Lakeside Landing FLX</strong> — so you
                have a benchmark before you customize.
              </p>
              <p className="text-[var(--sf-navy)]/70 leading-relaxed">
                Real restaurants. Real wineries. Real personal notes. The exact tone and density
                that converts guests into 5-star evangelists (and Viator commission).
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  '10 restaurants with the exact dish to order',
                  '5 Seneca Lake wineries with bring-home bottle picks',
                  'Hidden spots tourists never find',
                  'Viator affiliate placements done right',
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[var(--sf-navy)]/80">
                    <svg className="w-5 h-5 text-[var(--sf-gold)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--sf-cream)] rounded-2xl p-7 border border-[var(--sf-navy)]/10 shadow-sm">
              <div className="text-xs font-semibold text-[var(--sf-gold)] uppercase tracking-wider mb-3">
                Sample Entry
              </div>
              <h3 className="font-[var(--font-display)] text-xl font-bold text-[var(--sf-navy)] mb-1">
                Stonecat Cafe
              </h3>
              <p className="text-xs text-[var(--sf-navy)]/50 mb-4">
                Fine Dining · $$$ · 12 min drive
              </p>
              <p className="text-sm text-[var(--sf-navy)]/70 italic leading-relaxed mb-4">
                &quot;Stonecat is the reason we moved to the area. Chef&apos;s tasting menu changes
                weekly based on what the local farms are harvesting. The patio overlooks Seneca
                Lake at sunset — ask for table 4 if they have it.&quot;
              </p>
              <div className="pt-4 border-t border-[var(--sf-navy)]/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--sf-navy)]/50">Order this:</span>
                  <span className="text-[var(--sf-navy)] font-medium">Duck confit · warm olive oil cake</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--sf-navy)]/50">Reservations:</span>
                  <span className="text-[var(--sf-navy)] font-medium">Required — book 2 wks ahead</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--sf-navy)]/50">Best for:</span>
                  <span className="text-[var(--sf-navy)] font-medium">Anniversary dinner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affiliate Revenue Math */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--sf-navy)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(212,160,23,0.6) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
              The Math
            </span>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-3">
              How the <span className="sf-gold-gradient">$4–$24 per booking</span> adds up
            </h2>
            <p className="text-white/60 mt-4 max-w-2xl mx-auto">
              Average Viator experience: $50–$300. Commission: 8%. That&apos;s $4–$24 per booking.
              Here&apos;s how the projection scales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                tier: 'Conservative',
                revenue: '$180/yr',
                math: '50 stays × 30% conversion × $12 avg commission',
                color: 'border-white/20',
              },
              {
                tier: 'Realistic',
                revenue: '$504/yr',
                math: '80 stays × 35% conversion × $18 avg commission',
                color: 'border-[var(--sf-gold)]/40',
              },
              {
                tier: 'Optimized',
                revenue: '$2,400/yr',
                math: '100 stays × 40% conversion × $60 avg commission',
                color: 'border-[var(--sf-gold)]',
                featured: true,
              },
            ].map((row) => (
              <div
                key={row.tier}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-7 border ${row.color} ${
                  row.featured ? 'ring-2 ring-[var(--sf-gold)]/40' : ''
                }`}
              >
                <div className="text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
                  {row.tier}
                </div>
                <div className="font-[var(--font-display)] text-4xl sm:text-5xl font-bold text-[var(--sf-gold)] mb-3">
                  {row.revenue}
                </div>
                <p className="text-xs text-white/60 leading-relaxed font-mono">{row.math}</p>
              </div>
            ))}
          </div>

          <p className="text-xs text-center text-white/40 mt-8 max-w-xl mx-auto">
            Figures based on optimized placement. Typical hosts earn $180–$800/yr. Results depend
            on location, guest volume, and curation quality. No affiliate revenue guaranteed.
          </p>
        </div>
      </section>

      {/* Email Capture */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--sf-cream)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-[var(--sf-gold)]/20">
            <div className="text-center mb-6">
              <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
                Free Download
              </span>
              <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-3">
                Send me the template
              </h2>
              <p className="text-[var(--sf-navy)]/60 mt-3 text-sm">
                Instant Notion duplicate link. No credit card. No gotchas.
              </p>
            </div>
            <GuidebookForm variant="light" />
          </div>
        </div>
      </section>


      {/* FAQ */}
      <ToolFAQ items={faqItems} />

      {/* Final CTA */}
      <section className="sf-navy-gradient py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-5">
            Stop answering &quot;<span className="sf-gold-gradient">where should we eat?</span>&quot;
            at 9 PM.
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Download the template. Set it up in 90 minutes. Get better reviews and affiliate
            revenue for the life of your property.
          </p>
          <div className="max-w-md mx-auto bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <GuidebookForm variant="dark" />
          </div>

          <div className="mt-10 pt-8 border-t border-white/10">
            <Link
              href="/course/quiz"
              className="text-sm text-white/60 hover:text-[var(--sf-gold)] transition-colors"
            >
              Curious if your market is saturated? Take the free quiz →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
