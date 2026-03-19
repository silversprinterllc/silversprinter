'use client'

import { useState } from 'react'

type FormState = {
  name: string
  email: string
  phone: string
  startDate: string
  endDate: string
  passengers: string
  tripType: string
  requests: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  phone: '',
  startDate: '',
  endDate: '',
  passengers: '',
  tripType: '',
  requests: '',
}

export default function BookPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputClass =
    'w-full bg-[#1a1612] border border-[#433d38]/70 text-[#f0e6d0] placeholder-[#5f5850] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors duration-200'

  const labelClass = 'block text-xs tracking-[0.15em] uppercase text-[#5f5850] mb-2'

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="max-w-lg text-center">
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Request Received</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6">
            Thank you, {form.name.split(' ')[0] || 'friend'}
          </h1>
          <p className="text-[#a09890] leading-relaxed mb-4">
            We&apos;ve received your inquiry and will be in touch shortly to confirm availability.
          </p>
          <p className="text-sm text-[#5f5850] leading-relaxed">
            You&apos;ll receive a link to complete your rental agreement and insurance through Outdoorsy once your dates are confirmed.
          </p>
          <div className="w-16 h-px bg-[#433d38] mx-auto mt-8" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0] pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Self-Drive Rental</p>
          <h1 className="font-serif text-5xl text-[#f0e6d0] mb-4">Check Availability</h1>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-5" />
          <p className="text-[#a09890] text-sm leading-relaxed">
            Tell us about your trip and we&apos;ll confirm availability. After submitting, you&apos;ll receive a link to complete your rental agreement and insurance through Outdoorsy.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>Full Name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="(555) 000-0000"
              value={form.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="startDate" className={labelClass}>Trip Start Date</label>
              <input
                id="startDate"
                name="startDate"
                type="date"
                required
                value={form.startDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="endDate" className={labelClass}>Trip End Date</label>
              <input
                id="endDate"
                name="endDate"
                type="date"
                required
                value={form.endDate}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Passengers */}
          <div>
            <label htmlFor="passengers" className={labelClass}>Number of Passengers</label>
            <input
              id="passengers"
              name="passengers"
              type="number"
              min="1"
              max="10"
              required
              placeholder="1 – 10"
              value={form.passengers}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Trip Type */}
          <div>
            <label htmlFor="tripType" className={labelClass}>Trip Type</label>
            <select
              id="tripType"
              name="tripType"
              required
              value={form.tripType}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select a trip type…</option>
              <option value="Golf">Golf</option>
              <option value="Game Day">Game Day</option>
              <option value="Corporate">Corporate</option>
              <option value="Family">Family / Occasion</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Special Requests */}
          <div>
            <label htmlFor="requests" className={labelClass}>Special Requests</label>
            <textarea
              id="requests"
              name="requests"
              rows={4}
              placeholder="Destination, pickup location, anything we should know…"
              value={form.requests}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Outdoorsy note */}
          <p className="text-xs text-[#5f5850] leading-relaxed border-l-2 border-[#c9a96e]/30 pl-4">
            After submitting, you&apos;ll receive a link to complete your rental agreement and insurance through Outdoorsy.
          </p>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-medium py-4 hover:bg-[#d4b87a] transition-colors duration-200"
          >
            Send Inquiry
          </button>
        </form>
      </div>
    </div>
  )
}
