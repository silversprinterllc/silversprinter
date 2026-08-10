'use client'

import { useState } from 'react'

interface FormState {
  firstName: string
  email: string
  propertyLocation: string
}

const initial: FormState = {
  firstName: '',
  email: '',
  propertyLocation: '',
}

interface GuidebookFormProps {
  variant?: 'dark' | 'light'
}

export default function GuidebookForm({ variant = 'dark' }: GuidebookFormProps) {
  const [form, setForm] = useState<FormState>(initial)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line no-console
    console.log('[Guidebook Request]', form)
    setSubmitted(true)
  }

  if (submitted) {
    const wrapper =
      variant === 'dark'
        ? 'bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-[var(--sf-gold)]/20 text-white'
        : 'bg-white rounded-2xl p-8 border border-[var(--sf-gold)]/30 shadow-lg text-[var(--sf-navy)]'

    return (
      <div className={wrapper}>
        <svg className="w-10 h-10 text-[var(--sf-gold)] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <p className="font-semibold text-center text-lg">Check your inbox.</p>
        <p className={`text-sm text-center mt-1 ${variant === 'dark' ? 'text-white/60' : 'text-[var(--sf-navy)]/60'}`}>
          Your Notion guidebook template is on its way — usually under 30 seconds.
        </p>
      </div>
    )
  }

  const inputClass =
    variant === 'dark'
      ? 'w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/40 transition'
      : 'w-full bg-white border border-[var(--sf-navy)]/15 rounded-lg px-4 py-3 text-[var(--sf-navy)] placeholder-[var(--sf-navy)]/40 text-sm focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition'

  const labelClass =
    variant === 'dark'
      ? 'block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2'
      : 'block text-xs font-semibold text-[var(--sf-navy)]/80 uppercase tracking-wider mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="gb-firstName" className={labelClass}>
            First name
          </label>
          <input
            id="gb-firstName"
            name="firstName"
            type="text"
            required
            value={form.firstName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="gb-email" className={labelClass}>
            Email
          </label>
          <input
            id="gb-email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="gb-location" className={labelClass}>
          Property location
        </label>
        <input
          id="gb-location"
          name="propertyLocation"
          type="text"
          placeholder="e.g. Finger Lakes, NY"
          value={form.propertyLocation}
          onChange={handleChange}
          className={inputClass}
        />
        <p className={`text-xs mt-1.5 ${variant === 'dark' ? 'text-white/40' : 'text-[var(--sf-navy)]/50'}`}>
          Helps us tailor future content to your market (optional).
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-[var(--sf-gold)] text-white px-6 py-4 rounded-xl text-base font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-xl"
      >
        Send Me the Template
      </button>

      <p className={`text-xs text-center ${variant === 'dark' ? 'text-white/30' : 'text-[var(--sf-navy)]/50'}`}>
        No spam. Unsubscribe anytime. Free Notion template, delivered instantly.
      </p>
    </form>
  )
}
