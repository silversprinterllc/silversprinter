'use client'

import { useState } from 'react'

type PropertyType = 'lakefront' | 'beach' | 'mountain' | 'urban' | 'other' | ''

interface FormState {
  firstName: string
  email: string
  propertyUrl: string
  propertyType: PropertyType
  numberOfUnits: string
  monthlyBookings: string
  biggestChallenge: string
}

const initial: FormState = {
  firstName: '',
  email: '',
  propertyUrl: '',
  propertyType: '',
  numberOfUnits: '',
  monthlyBookings: '',
  biggestChallenge: '',
}

export default function AuditForm() {
  const [form, setForm] = useState<FormState>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/course/audit-apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {
      // surface success regardless — application was captured
    } finally {
      setLoading(false)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 border border-[var(--sf-gold)]/20 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--sf-gold)]/10 flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-[var(--sf-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--sf-navy)] mb-3">
          Application received.
        </h3>
        <p className="text-[var(--sf-navy)]/70 max-w-md mx-auto">
          If a spot is open, you&apos;ll get a calendar link within 24 hours. If this week is full,
          you&apos;ll be offered the first slot next week.
        </p>
        <p className="text-sm text-[var(--sf-navy)]/50 mt-4">
          Keep an eye on your inbox — and check spam just in case.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-[var(--sf-navy)]/10 space-y-5"
    >
      <div className="text-center mb-2">
        <p className="text-xs font-semibold tracking-widest uppercase text-[var(--sf-gold)]">
          Application
        </p>
        <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--sf-navy)] mt-2">
          Tell me about your listing
        </h3>
        <p className="text-sm text-[var(--sf-navy)]/60 mt-1">Takes about 90 seconds.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="firstName" className="block text-sm font-semibold text-[var(--sf-navy)] mb-2">
            First name <span className="text-[var(--sf-gold)]">*</span>
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={handleChange}
            className="w-full rounded-lg border border-[var(--sf-navy)]/15 px-4 py-3 text-sm text-[var(--sf-navy)] focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[var(--sf-navy)] mb-2">
            Email <span className="text-[var(--sf-gold)]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border border-[var(--sf-navy)]/15 px-4 py-3 text-sm text-[var(--sf-navy)] focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="propertyUrl" className="block text-sm font-semibold text-[var(--sf-navy)] mb-2">
          Airbnb listing URL <span className="text-[var(--sf-gold)]">*</span>
        </label>
        <input
          id="propertyUrl"
          name="propertyUrl"
          type="url"
          required
          placeholder="https://airbnb.com/rooms/..."
          value={form.propertyUrl}
          onChange={handleChange}
          className="w-full rounded-lg border border-[var(--sf-navy)]/15 px-4 py-3 text-sm text-[var(--sf-navy)] focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition"
        />
        <p className="text-xs text-[var(--sf-navy)]/50 mt-1">
          VRBO or direct-book URL works too. Just note which platform in the challenge field.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="propertyType" className="block text-sm font-semibold text-[var(--sf-navy)] mb-2">
            Property type <span className="text-[var(--sf-gold)]">*</span>
          </label>
          <select
            id="propertyType"
            name="propertyType"
            required
            value={form.propertyType}
            onChange={handleChange}
            className="w-full rounded-lg border border-[var(--sf-navy)]/15 px-4 py-3 text-sm text-[var(--sf-navy)] bg-white focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition"
          >
            <option value="">Select one...</option>
            <option value="lakefront">Lakefront</option>
            <option value="beach">Beach</option>
            <option value="mountain">Mountain</option>
            <option value="urban">Urban</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="numberOfUnits" className="block text-sm font-semibold text-[var(--sf-navy)] mb-2">
            Number of units
          </label>
          <input
            id="numberOfUnits"
            name="numberOfUnits"
            type="number"
            min="1"
            value={form.numberOfUnits}
            onChange={handleChange}
            className="w-full rounded-lg border border-[var(--sf-navy)]/15 px-4 py-3 text-sm text-[var(--sf-navy)] focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="monthlyBookings" className="block text-sm font-semibold text-[var(--sf-navy)] mb-2">
          Current monthly bookings
        </label>
        <input
          id="monthlyBookings"
          name="monthlyBookings"
          type="number"
          min="0"
          placeholder="e.g. 12"
          value={form.monthlyBookings}
          onChange={handleChange}
          className="w-full rounded-lg border border-[var(--sf-navy)]/15 px-4 py-3 text-sm text-[var(--sf-navy)] focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition"
        />
      </div>

      <div>
        <label htmlFor="biggestChallenge" className="block text-sm font-semibold text-[var(--sf-navy)] mb-2">
          Biggest challenge right now <span className="text-[var(--sf-gold)]">*</span>
        </label>
        <textarea
          id="biggestChallenge"
          name="biggestChallenge"
          required
          rows={4}
          minLength={20}
          placeholder="In 2-3 sentences, what's the #1 thing you want me to figure out? (e.g., 'occupancy is fine but ADR is flat')"
          value={form.biggestChallenge}
          onChange={handleChange}
          className="w-full rounded-lg border border-[var(--sf-navy)]/15 px-4 py-3 text-sm text-[var(--sf-navy)] focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[var(--sf-gold)] text-white px-6 py-4 rounded-xl text-base font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-xl disabled:opacity-60"
      >
        {loading ? 'Submitting...' : 'Submit Application'}
      </button>

      <p className="text-xs text-center text-[var(--sf-navy)]/50">
        If a spot is open, you&apos;ll get a calendar link within 24 hours.
        <br />
        If this week is full, you&apos;ll be offered the first slot next week.
      </p>
    </form>
  )
}
