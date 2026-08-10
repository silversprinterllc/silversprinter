import type { Metadata } from 'next'
import Link from 'next/link'
import ToolPageHeader from '@/components/store/ToolPageHeader'
import Footer from '@/components/store/Footer'
import ToolFAQ from '@/components/store/ToolFAQ'
import AuditForm from './AuditForm'

export const metadata: Metadata = {
  title: 'Free Airbnb Listing Audit | {{BRAND_NAME}}',
  description:
    'Get a personalized 40-point audit of your Airbnb listing. 5 spots available per week.',
  alternates: { canonical: '/course/audit' },
}

const deliverables = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: '10-15 minute Loom walkthrough',
    body:
      'Screen-recorded review of your listing — narrated scroll-by-scroll with every observation a real guest would have.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: '40-point Scorecard PDF',
    body: 'Graded A–F across 8 categories: Title, Hero Photo, Photo Sequence, Copy, Pricing, Amenities, Reviews, Settings.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: 'Top 5 Priority Fixes',
    body: 'Ranked by ROI: what to change this weekend, what to change this month, what to leave alone.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Benchmark comparison',
    body: 'Side-by-side with 3 top-performing listings in your exact market — comp set pulled before the audit.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Revenue opportunity estimate',
    body: 'A realistic dollar range of additional annual revenue you\'re leaving on the table — tuned to your market.',
  },
]

const auditCategories = [
  {
    title: 'Listing Title',
    body: 'Hook strength, keyword density, length, differentiator, and whether every word holds up on delivery.',
  },
  {
    title: 'Hero Photo',
    body: 'Composition, lighting, time-of-day, emotional trigger, and professional polish.',
  },
  {
    title: 'Photo Sequence',
    body: 'Story arc, variety, lifestyle shots, detail shots, and full exterior storytelling.',
  },
  {
    title: 'Description Copy',
    body: 'Hook in first two lines, scannable structure, benefit-driven amenities, and specific local color.',
  },
  {
    title: 'Pricing Strategy',
    body: 'Seasonal variation, weekend premiums, length-of-stay discounts, minimum-night logic, competitive positioning.',
  },
  {
    title: 'Amenities',
    body: 'Completeness, premium amenities highlighted, accuracy, guest favorites tagged, accessibility filters.',
  },
  {
    title: 'Reviews & Ratings',
    body: 'Volume, overall rating, recency, response rate, and response quality — does each reply sell?',
  },
  {
    title: 'Settings & Policies',
    body: 'Instant book logic, cancellation policy, house rule tone, check-in process, pet/guest fees.',
  },
]

const faqItems = [
  {
    q: 'What\'s the catch? Why is this free?',
    a: 'Two reasons. First, I run the full STR system this audit comes from — some recipients realize they want the full playbook; most don\'t, and that\'s fine. Second, I limit to 5 per week so each audit gets real attention. This isn\'t a scaled lead-gen funnel.',
  },
  {
    q: 'How is this different from automated audit tools?',
    a: 'Those tools scrape your listing and spit out a generic report. I actually watch a 10-minute Loom of your listing, compare it to 3 comps in your market, and tell you the specific line in your description that\'s killing conversion. No bot can do that.',
  },
  {
    q: 'Do I need to get on a sales call?',
    a: 'No. The audit is delivered as a Loom video and PDF. A 15-minute follow-up call is optional and only if you want to walk through findings.',
  },
  {
    q: 'My listing is brand new / has under 5 reviews. Can I still apply?',
    a: 'Yes — and you\'re actually one of the best candidates. Fixing positioning before reviews pile up saves you months. I\'ll mark Reviews as N/A and weight the other 7 categories accordingly.',
  },
  {
    q: 'How long until I get my audit back?',
    a: 'Within 72 hours of your spot being confirmed. You\'ll get a Loom link and a PDF scorecard by email. If you booked the optional call, that\'s scheduled separately within 7 days.',
  },
]

const testimonials = [
  {
    quote:
      '+$11K in fall revenue by changing minimum nights. One Loom walkthrough, three specific changes — that was it.',
    name: 'Asheville host',
    meta: 'Mountain cabin · 2 units',
  },
  {
    quote:
      '+28% click-through after swapping the hero photo. I\'d have never noticed the issue without someone watching me see the listing cold.',
    name: 'Broken Bow host',
    meta: 'A-Frame · 1 unit',
  },
  {
    quote:
      '+$4K/month after fixing the pricing curve. The revenue opportunity range was dead-on by month two.',
    name: 'Finger Lakes host',
    meta: 'Lake house · 1 unit',
  },
]

const trustItems = [
  { label: '5 audits / week', sub: 'Hand-delivered' },
  { label: '72-hour turnaround', sub: 'Audit in your inbox' },
  { label: '$82K → $147K', sub: 'Case study' },
  { label: 'Zero-obligation', sub: 'No sales call' },
]

export default function AuditPage() {
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

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/course"
            className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-[var(--sf-gold)] transition-colors mb-6"
          >
            ← Back to Course
          </Link>

          {/* Scarcity badge */}
          <div className="inline-flex items-center gap-2 bg-[var(--sf-gold)]/15 border border-[var(--sf-gold)]/40 rounded-full px-4 py-2 mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--sf-gold)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--sf-gold)]" />
            </span>
            <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
              Spots remaining this week: 3
            </span>
          </div>

          <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
            Get a Free Personalized
            <br />
            <span className="sf-gold-gradient">Listing Audit</span>
          </h1>
          <p className="mt-5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-[var(--sf-gold)]">
            5 spots / week · No credit card · No sales call
          </p>
          <p className="mt-6 text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            I&apos;ll record a 10-minute Loom reviewing your Airbnb listing the same way I
            optimized Lakeside Landing FLX from <strong className="text-white">$82K/yr to $147K/yr</strong>.
            You&apos;ll get a 40-point scorecard, five specific changes you can make this
            weekend, and my honest take on why your listing is (or isn&apos;t) converting.
          </p>

          <div className="mt-8 flex justify-center">
            <a
              href="#apply"
              className="bg-[var(--sf-gold)] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-2xl"
            >
              Claim Your Spot (3 of 5 Remaining)
            </a>
          </div>
          <p className="mt-4 text-xs text-white/40 italic">
            Audits delivered within 72 hours. If I can&apos;t find at least $5K/yr in upside, I&apos;ll tell you straight.
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y border-[var(--sf-navy)]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {trustItems.map((t) => (
              <div key={t.label}>
                <div className="font-[var(--font-display)] text-lg sm:text-xl font-semibold text-[var(--sf-navy)]">
                  {t.label}
                </div>
                <div className="text-xs text-[var(--sf-navy)]/50 uppercase tracking-wider mt-1">
                  {t.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Receive */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[var(--sf-cream)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
              Deliverables
            </span>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--sf-navy)] mt-3">
              What You&apos;ll Receive
            </h2>
            <p className="text-[var(--sf-navy)]/60 mt-4 max-w-2xl mx-auto">
              Five deliverables. All within 72 hours. Permanently accessible in a private Notion page.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {deliverables.map((d, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-7 border border-[var(--sf-navy)]/10 shadow-sm sf-card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--sf-gold)]/10 text-[var(--sf-gold)] flex items-center justify-center mb-5">
                  {d.icon}
                </div>
                <h3 className="font-semibold text-[var(--sf-navy)] text-lg mb-2">{d.title}</h3>
                <p className="text-sm text-[var(--sf-navy)]/60 leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Audit */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
              40-Point Scorecard
            </span>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--sf-navy)] mt-3">
              What We Audit
            </h2>
            <p className="text-[var(--sf-navy)]/60 mt-4 max-w-2xl mx-auto">
              Eight categories. Five criteria each. Every one graded A–F with a one-line strength and one-line gap.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {auditCategories.map((cat, idx) => (
              <div
                key={cat.title}
                className="bg-[var(--sf-cream)] rounded-xl p-5 border border-[var(--sf-navy)]/10"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-[var(--font-display)] text-xl font-bold text-[var(--sf-gold)]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-semibold text-[var(--sf-navy)] text-sm">{cat.title}</h3>
                </div>
                <p className="text-xs text-[var(--sf-navy)]/60 leading-relaxed">{cat.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 sm:py-20 lg:py-24 bg-[var(--sf-cream)]">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <AuditForm />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
              Early Results
            </span>
            <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-3">
              Hosts who applied this framework
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-[var(--sf-cream)] rounded-2xl p-7 border border-[var(--sf-navy)]/10 sf-card-hover"
              >
                <div className="w-14 h-14 rounded-full bg-[var(--sf-navy)]/10 flex items-center justify-center mb-4">
                  <svg className="w-7 h-7 text-[var(--sf-navy)]/40" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <p className="text-[var(--sf-navy)] text-sm leading-relaxed italic mb-4">
                  &quot;{t.quote}&quot;
                </p>
                <div>
                  <div className="text-sm font-semibold text-[var(--sf-navy)]">{t.name}</div>
                  <div className="text-xs text-[var(--sf-navy)]/50">{t.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ToolFAQ items={faqItems} />

      {/* Footer CTA */}
      <section className="sf-navy-gradient py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase mb-3">
            Only 5 audits per week
          </p>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            No renewals. No bulk. No exceptions.
          </h2>
          <a
            href="#apply"
            className="inline-block bg-[var(--sf-gold)] text-white px-8 py-4 rounded-xl text-base font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-2xl"
          >
            Apply for the Audit
          </a>
          <div className="mt-8 pt-8 border-t border-white/10">
            <Link
              href="/course/quiz"
              className="text-sm text-white/60 hover:text-[var(--sf-gold)] transition-colors"
            >
              Not ready? Take the free Saturation Quiz →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
