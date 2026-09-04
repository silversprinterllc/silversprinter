'use client'

import { useState } from 'react'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/course/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
    } catch {
      // Deliver the success state regardless — the user gave their email
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  return (
    <section aria-label="Get the Revenue Per Night Calculator" className="py-14 sm:py-20 lg:py-24 sf-navy-gradient relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(212,160,23,0.5) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
          Free Tool
        </span>
        <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
          Get the Revenue Per Night
          <br />
          <span className="sf-gold-gradient">Calculator — Free</span>
        </h2>
        <p className="text-white/50 mb-8 max-w-lg mx-auto">
          The same calculator we use on our own properties. Enter your market, bedroom count, and current rate —
          it outputs your revenue range, occupancy target, and nightly rate opportunity.
        </p>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-[var(--sf-gold)]/20">
            <svg className="w-10 h-10 text-[var(--sf-gold)] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-white font-semibold">Check your inbox.</p>
            <p className="text-white/50 text-sm mt-1">
              We sent the calculator link to {email}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[var(--sf-gold)] focus:ring-1 focus:ring-[var(--sf-gold)] transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--sf-gold)] text-white px-6 py-3.5 rounded-xl text-sm font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-lg whitespace-nowrap disabled:opacity-60"
            >
              {loading ? 'Sending...' : 'Send Me the Calculator'}
            </button>
          </form>
        )}

        <p className="text-white/20 text-xs mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
