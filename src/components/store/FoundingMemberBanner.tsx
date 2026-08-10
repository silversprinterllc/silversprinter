'use client'

import { useState } from 'react'

const SPOTS_REMAINING = 12

const perks = [
  'Full course access as modules launch (all 14 modules)',
  'Founding Member badge — permanent recognition',
  'Direct Slack access to Ben (not available at any other tier)',
  'Priority enrollment for future Intensives & cohorts',
  '60+ templates, checklists & swipe files',
  'Local Guide Engine Playbook — the crown jewel module',
  'Lifetime access + every future update',
]

export default function FoundingMemberBanner() {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/course/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier: 'founding' }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Something went wrong. Please try again or email ben@spokebnb.com')
      }
    } catch {
      alert('Something went wrong. Please try again or email ben@spokebnb.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="founding-member"
      aria-label="Founding Member Pre-Sale"
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1B2A4A 0%, #0F1B33 100%)' }}
    >
      {/* Subtle gold corner accent */}
      <div
        className="absolute top-0 right-0 w-64 h-64 opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, #D4A017 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 opacity-[0.07] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at bottom left, #D4A017 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-[#D4A017]/15 border border-[#D4A017]/30 text-[#D4A017] text-xs font-bold tracking-widest uppercase px-5 py-2 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Limited Pre-Sale
          </span>
        </div>

        {/* Headline */}
        <div className="text-center mb-10">
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Founding Member
            <br />
            <span className="sf-gold-gradient">Pre-Sale</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Be one of the first 20 operators to lock in lifetime access at half price.
            Build your revenue system alongside us from day one.
          </p>
        </div>

        {/* Main card */}
        <div className="bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: perks */}
            <div>
              <p className="text-[#D4A017] text-xs font-semibold tracking-widest uppercase mb-5">
                What Founding Members Get
              </p>
              <ul className="space-y-3">
                {perks.map((perk) => (
                  <li key={perk} className="flex gap-3 text-sm">
                    <svg
                      className="w-4 h-4 mt-0.5 shrink-0 text-[#D4A017]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-white/80">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: pricing + CTA */}
            <div className="text-center md:text-left">
              {/* Spots remaining badge */}
              <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
                </span>
                Only {SPOTS_REMAINING} spots remaining
              </div>

              {/* Price */}
              <div className="mb-2">
                <span className="text-white/40 text-lg line-through mr-3">$1,997</span>
                <span className="text-white text-5xl font-bold">$997</span>
              </div>
              <p className="text-[#D4A017] text-sm font-semibold mb-1">
                50% off — Founding Members only
              </p>
              <p className="text-white/30 text-xs mb-8">
                One-time payment &middot; Lifetime access
              </p>

              {/* CTA */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all cursor-pointer disabled:opacity-60"
                style={{
                  background: 'linear-gradient(135deg, #D4A017 0%, #B8860B 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 24px rgba(212, 160, 23, 0.3)',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(212, 160, 23, 0.5)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(212, 160, 23, 0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                {loading ? (
                  'Redirecting to checkout...'
                ) : (
                  <>
                    Claim Your Founding Member Spot
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>

              <p className="text-white/20 text-xs mt-4">
                Secure checkout via Stripe &middot; 14-day guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
