'use client'

import { useState } from 'react'

export default function RegulationAlertForm() {
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line no-console
    console.log('[Regulation Multi-City Alert]', { email, city })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[var(--sf-gold)]/30 text-white text-center">
        <svg className="w-10 h-10 text-[var(--sf-gold)] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="font-semibold">You&apos;re subscribed.</p>
        <p className="text-sm text-white/60 mt-1">
          We&apos;ll email you the moment regulations shift.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="City you're watching (e.g. Destin, FL)"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/40 transition"
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/40 transition"
        />
        <button
          type="submit"
          className="bg-[var(--sf-gold)] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[var(--sf-gold)]/90 transition-all whitespace-nowrap"
        >
          Send Me Alerts
        </button>
      </div>
      <p className="text-xs text-white/40 text-center">
        Free. Unsubscribe anytime. One email per month only when something changes.
      </p>
    </form>
  )
}
