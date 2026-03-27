'use client'

import Link from 'next/link'
import { useState, FormEvent } from 'react'

const quickLinks = [
  {
    label: 'Ready to Book',
    href: '/book',
    sub: 'Check dates and reserve with a deposit',
  },
  {
    label: 'Sterling Reserve',
    href: '/sterling-reserve',
    sub: 'Apply for priority access and preferred rates',
  },
  {
    label: 'Rate Card',
    href: '/rates',
    sub: 'See daily rates, member pricing, and add-ons',
  },
  {
    label: 'FAQ',
    href: '/faq',
    sub: 'Quick answers to common questions',
  },
]

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    preferredDates: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const payload = {
        access_key: 'YOUR_WEB3FORMS_ACCESS_KEY',
        subject: 'New Sterling Route Inquiry',
        from_name: 'Sterling Route Website',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        inquiry_type: formData.inquiryType,
        preferred_dates: formData.preferredDates,
        message: formData.message,
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (json.success) {
        setSuccess(true)
      } else {
        setError('Something went wrong. Please try again or email us directly at hello@sterlingroute.com.')
      }
    } catch {
      setError('Network error. Please try again or email us directly at hello@sterlingroute.com.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">

        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-10">

          {/* Contact details */}
          <div className="space-y-5">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-1">Email</p>
              <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e] text-sm hover:text-[#d4b87a] transition-colors">
                hello@sterlingroute.com
              </a>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-1">Service Area</p>
              <p className="text-[#a09890] text-sm">Palm Beach County, Florida</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-1">Pickup Location</p>
              <p className="text-[#a09890] text-sm">8983 Okeechobee Blvd<br />(address confirmed at booking)</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-1">Hours</p>
              <p className="text-[#a09890] text-sm">Available by phone/text Mon–Sat 8am–8pm</p>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Quick Links</p>
            {quickLinks.map((ql) => (
              <Link
                key={ql.href}
                href={ql.href}
                className="block border border-[#433d38] p-4 hover:border-[#c9a96e]/50 transition-colors group"
              >
                <p className="text-sm text-[#f0e6d0] group-hover:text-[#c9a96e] transition-colors mb-1">{ql.label}</p>
                <p className="text-xs text-[#5f5850]">{ql.sub}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN — FORM */}
        <div className="lg:col-span-3">
          {success ? (
            <div className="border border-[#c9a96e]/30 bg-[#0f0e0c] p-10">
              <div className="w-8 h-px bg-[#c9a96e] mb-6" />
              <h2 className="font-serif text-3xl text-[#f0e6d0] mb-4">Message Received.</h2>
              <p className="text-[#a09890] text-base leading-relaxed mb-6">
                We&apos;ll be in touch within a few hours. In the meantime, check availability at{' '}
                <Link href="/book" className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors">/book</Link>.
              </p>
              <button
                onClick={() => {
                  setSuccess(false)
                  setFormData({ name: '', email: '', phone: '', inquiryType: '', preferredDates: '', message: '' })
                }}
                className="text-xs tracking-[0.2em] uppercase text-[#5f5850] hover:text-[#a09890] transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-2">
                  Full Name <span className="text-[#c9a96e]">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-[#0f0e0c] border border-[#433d38] text-[#f0e6d0] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e]/60 transition-colors placeholder:text-[#433d38]"
                  placeholder="Your full name"
                />
              </div>

              {/* Email + Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-2">
                    Email <span className="text-[#c9a96e]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0f0e0c] border border-[#433d38] text-[#f0e6d0] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e]/60 transition-colors placeholder:text-[#433d38]"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-2">
                    Phone <span className="text-[#c9a96e]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0f0e0c] border border-[#433d38] text-[#f0e6d0] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e]/60 transition-colors placeholder:text-[#433d38]"
                    placeholder="(561) 000-0000"
                  />
                </div>
              </div>

              {/* Inquiry Type */}
              <div>
                <label htmlFor="inquiryType" className="block text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-2">
                  Inquiry Type
                </label>
                <select
                  id="inquiryType"
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full bg-[#0f0e0c] border border-[#433d38] text-[#f0e6d0] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e]/60 transition-colors appearance-none"
                >
                  <option value="" className="bg-[#0f0e0c]">Select one…</option>
                  <option value="General Question" className="bg-[#0f0e0c]">General Question</option>
                  <option value="Booking Inquiry" className="bg-[#0f0e0c]">Booking Inquiry</option>
                  <option value="Sterling Reserve Application" className="bg-[#0f0e0c]">Sterling Reserve Application</option>
                  <option value="Corporate Rates" className="bg-[#0f0e0c]">Corporate Rates</option>
                  <option value="Hoadley Group Client" className="bg-[#0f0e0c]">Hoadley Group Client</option>
                  <option value="Other" className="bg-[#0f0e0c]">Other</option>
                </select>
              </div>

              {/* Preferred Dates */}
              <div>
                <label htmlFor="preferredDates" className="block text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-2">
                  Preferred Dates <span className="text-[#433d38]">(optional)</span>
                </label>
                <input
                  id="preferredDates"
                  name="preferredDates"
                  type="text"
                  value={formData.preferredDates}
                  onChange={handleChange}
                  className="w-full bg-[#0f0e0c] border border-[#433d38] text-[#f0e6d0] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e]/60 transition-colors placeholder:text-[#433d38]"
                  placeholder="e.g. June 14–16, flexible, or unsure"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-xs tracking-[0.2em] uppercase text-[#5f5850] mb-2">
                  Message <span className="text-[#c9a96e]">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  minLength={20}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#0f0e0c] border border-[#433d38] text-[#f0e6d0] text-sm px-4 py-3 focus:outline-none focus:border-[#c9a96e]/60 transition-colors placeholder:text-[#433d38] resize-none"
                  placeholder="Tell us about your trip, group size, dates, or any questions…"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-[#c9a96e] text-[#0a0a0a] font-sans text-xs tracking-[0.2em] uppercase font-medium px-12 py-4 hover:bg-[#d4b87a] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>

            </form>
          )}

          {/* Privacy note */}
          <p className="mt-8 text-xs text-[#433d38] leading-relaxed">
            We do not share your information with third parties. Your inquiry goes directly to the Sterling Route team.
          </p>
        </div>

      </div>
    </section>
  )
}
