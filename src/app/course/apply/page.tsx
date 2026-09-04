'use client'

import { useState } from 'react'
import Link from 'next/link'

const TRACKS = [
  { id: 'direct', label: 'Direct Booking System', sub: 'Website, email funnels, Google Vacation Rentals setup' },
  { id: 'automation', label: 'Automation Stack', sub: 'PMS, dynamic pricing, guest messaging, ops systems' },
  { id: 'content', label: 'Content & Growth Engine', sub: 'Local guide, social content, influencer + SEO flywheel' },
]

const UNIT_COUNTS = [
  '1 property',
  '2–5 properties',
  '6–15 properties',
  '16–30 properties',
  '30+ properties',
]

const TIMELINES = [
  'ASAP — I\'m ready to move now',
  'Within 30 days',
  'Within 60–90 days',
  'Just exploring for now',
]

type FormState = {
  name: string
  email: string
  phone: string
  propertyUrl: string
  units: string
  track: string
  currentRevenue: string
  revenueGoal: string
  timeline: string
  biggestChallenge: string
  heardFrom: string
}

const INITIAL: FormState = {
  name: '',
  email: '',
  phone: '',
  propertyUrl: '',
  units: '',
  track: '',
  currentRevenue: '',
  revenueGoal: '',
  timeline: '',
  biggestChallenge: '',
  heardFrom: '',
}

export default function ApplyPage() {
  const [form, setForm] = useState<FormState>(INITIAL)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  function set(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.email || !form.track || !form.units || !form.timeline) {
      setError('Please fill in all required fields.')
      return
    }
    setError('')
    setStatus('submitting')
    try {
      const res = await fetch('/api/course/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        throw new Error('Submission failed')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-[var(--sf-navy)] flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-[var(--sf-gold)]/20 flex items-center justify-center mb-8">
            <svg className="w-8 h-8 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="font-[var(--font-display)] text-3xl font-bold text-white mb-4">
            Application Received.
          </h1>
          <p className="text-white/60 leading-relaxed mb-8">
            Ben reviews every application personally. You&apos;ll get a direct reply at <strong className="text-white">{form.email}</strong> within 1 business day — not a form letter, an actual response about your property and goals.
          </p>
          <p className="text-sm text-white/30 mb-10">
            Questions in the meantime?{' '}
            <a href="mailto:ben@spokebnb.com" className="text-[var(--sf-gold)] hover:underline">ben@spokebnb.com</a>
          </p>
          <Link
            href="/course"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/40 hover:text-white/70 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to SpokeBnB
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--sf-navy)]">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/course" className="text-white/40 hover:text-white/70 text-sm transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Portfolio / Custom — Application
          </span>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Intro */}
        <div className="text-center mb-12">
          <h1 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white mb-4">
            Apply for Portfolio / Custom
          </h1>
          <p className="text-white/50 leading-relaxed">
            For operators with multiple properties, a portfolio brand, or a build scope that doesn't fit the standard product. Ben reviews every application personally and scopes each engagement individually. This application takes 4 minutes.
          </p>
        </div>

        {/* Context reminder */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--sf-gold)] mb-4">What happens after you apply</p>
          <ul className="space-y-2.5">
            {[
              'Ben reviews your application personally — usually within 1 business day',
              'You\'ll get a direct reply scoping what a build for your portfolio would look like',
              'If it\'s a fit, we schedule a 30-minute call to align on deliverables, timeline, and price',
              'No payment collected until scope is agreed upon — no pressure, no sales script',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                <svg className="w-4 h-4 mt-0.5 shrink-0 text-[var(--sf-gold)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                Full Name <span className="text-[var(--sf-gold)]">*</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Ben Hoadley"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[var(--sf-gold)]/50 focus:bg-white/8 transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                Email <span className="text-[var(--sf-gold)]">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[var(--sf-gold)]/50 transition-all"
                required
              />
            </div>
          </div>

          {/* Phone + Property URL */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                Phone (optional)
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => set('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[var(--sf-gold)]/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                Airbnb or VRBO Listing URL
              </label>
              <input
                type="url"
                value={form.propertyUrl}
                onChange={(e) => set('propertyUrl', e.target.value)}
                placeholder="airbnb.com/rooms/..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[var(--sf-gold)]/50 transition-all"
              />
            </div>
          </div>

          {/* Unit count */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-3">
              How many STR properties do you operate? <span className="text-[var(--sf-gold)]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {UNIT_COUNTS.map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => set('units', u)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    form.units === u
                      ? 'bg-[var(--sf-gold)] border-[var(--sf-gold)] text-white'
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white/80'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Track selection */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-3">
              Which track are you most interested in? <span className="text-[var(--sf-gold)]">*</span>
            </label>
            <div className="space-y-3">
              {TRACKS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => set('track', t.id)}
                  className={`w-full text-left px-5 py-4 rounded-xl border transition-all ${
                    form.track === t.id
                      ? 'bg-[var(--sf-gold)]/10 border-[var(--sf-gold)]/50 text-white'
                      : 'bg-white/5 border-white/10 text-white/60 hover:border-white/20'
                  }`}
                >
                  <p className={`font-semibold text-sm mb-0.5 ${form.track === t.id ? 'text-white' : 'text-white/70'}`}>
                    {t.label}
                  </p>
                  <p className="text-xs text-white/40">{t.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Revenue */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                Approx. current annual STR revenue
              </label>
              <input
                type="text"
                value={form.currentRevenue}
                onChange={(e) => set('currentRevenue', e.target.value)}
                placeholder="e.g. $66,000/yr"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[var(--sf-gold)]/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
                Your 12-month revenue goal
              </label>
              <input
                type="text"
                value={form.revenueGoal}
                onChange={(e) => set('revenueGoal', e.target.value)}
                placeholder="e.g. $120,000/yr"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[var(--sf-gold)]/50 transition-all"
              />
            </div>
          </div>

          {/* Timeline */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-3">
              When are you looking to get started? <span className="text-[var(--sf-gold)]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {TIMELINES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => set('timeline', t)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    form.timeline === t
                      ? 'bg-[var(--sf-gold)] border-[var(--sf-gold)] text-white'
                      : 'bg-white/5 border-white/10 text-white/50 hover:border-white/30 hover:text-white/80'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Biggest challenge */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
              What&apos;s the #1 challenge with your STR right now?
            </label>
            <textarea
              value={form.biggestChallenge}
              onChange={(e) => set('biggestChallenge', e.target.value)}
              placeholder="e.g. Too dependent on Airbnb, pricing feels like guesswork, can't get direct bookings..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[var(--sf-gold)]/50 transition-all resize-none"
            />
          </div>

          {/* Heard from */}
          <div>
            <label className="block text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">
              How did you hear about SpokeBnB?
            </label>
            <input
              type="text"
              value={form.heardFrom}
              onChange={(e) => set('heardFrom', e.target.value)}
              placeholder="Instagram, Facebook group, referral, Google..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 text-sm focus:outline-none focus:border-[var(--sf-gold)]/50 transition-all"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          {status === 'error' && (
            <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
              Something went wrong. Email{' '}
              <a href="mailto:ben@spokebnb.com" className="underline">ben@spokebnb.com</a>{' '}
              directly and we&apos;ll get you sorted.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-[var(--sf-gold)] text-white font-semibold py-4 rounded-xl text-base hover:bg-[var(--sf-gold)]/90 hover:shadow-lg transition-all disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Submitting your application…' : 'Submit Application →'}
          </button>

          <p className="text-xs text-white/25 text-center leading-relaxed">
            By submitting, you agree to our{' '}
            <Link href="/course/legal/terms" className="underline hover:text-[var(--sf-gold)]">Terms of Service</Link>{' '}
            and{' '}
            <Link href="/course/legal/privacy" className="underline hover:text-[var(--sf-gold)]">Privacy Policy</Link>.
            No payment is collected at this stage. Ben will reach out to discuss fit before any commitment.
          </p>
        </form>
      </div>
    </div>
  )
}
