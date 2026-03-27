'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'

const DAILY_RATE = 995

const ADD_ONS = [
  { id: 'stocked-cooler', name: 'Stocked Cooler', price: 65, description: 'Arrives loaded: 2 bags of ice, 24 bottles of water, 12 assorted sodas, 6 sports drinks. Ready to go at pickup. You handle the beer — we handle the basics.' },
  { id: 'golf-trip-setup', name: 'Golf Trip Setup', price: 45, description: 'Cargo area configured for clubs: non-slip mat, tie-down straps, organized storage. Includes a printed course guide for your destination (Streamsong, Cabot Citrus Farms, TPC Sawgrass, Innisbrook — or your choice). Pickup is smooth. Unload is smooth. Nothing shifts in transit.' },
  { id: 'tailgate-package', name: 'Tailgate Package', price: 55, description: 'Folding table, 6 camp chairs, reusable stadium cups, bottle opener, disposable serving trays. Everything you need for a proper pre-game setup — none of it left behind. You pack in, you pack out.' },
  { id: 'champagne-service', name: 'Champagne Service', price: 75, description: 'Two bottles of Moët & Chandon (or equivalent) chilled and waiting in the fridge. Flutes for 10. Gold napkins. No corkage, no fuss. Ideal for milestones, celebrations, or any trip that deserves a proper send-off. Note: Alcohol service is for passengers only — not the driver, ever.' },
  { id: 'premium-snack-board', name: 'Premium Snack Board', price: 50, description: 'Artisan board: charcuterie, aged cheeses, crackers, nuts, dried fruit, chocolate. Serves 6–8. Pre-arranged at pickup. Pairs with the champagne service or stands on its own. No wilted gas station snacks on a Sterling Route trip.' },
  { id: 'floral-arrangement', name: 'Floral Arrangement', price: 60, description: 'Fresh arrangement from a local Palm Beach County florist. Suitable for anniversaries, proposals, birthdays, or any occasion that calls for flowers. Specify occasion and color preference at booking. Add-on must be requested 72 hours in advance.' },
]

const TRIP_TYPES = [
  { id: 'Golf Trip', label: 'Golf Trip' },
  { id: 'Game Day', label: 'Game Day' },
  { id: 'Corporate / Real Estate', label: 'Corporate / Real Estate' },
  { id: 'Family & Occasions', label: 'Family & Occasions' },
  { id: 'Other', label: 'Other' },
]

const HEAR_ABOUT_OPTIONS = [
  'Google Search',
  'Instagram',
  'Friend/Referral',
  'Golf Course',
  'Real Estate Agent',
  'Hoadley Group',
  'Other',
]

type FormData = {
  startDate: string
  endDate: string
  passengerCount: number
  tripType: string
  tripTypeOther: string
  specialRequests: string
  selectedAddOns: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  hearAboutUs: string
  agreedToTerms: boolean
  agreedToInsurance: boolean
}

const inputClass =
  'w-full bg-[#1a1612] border border-[#433d38]/70 text-[#f0e6d0] placeholder-[#5f5850] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors'
const labelClass = 'block text-xs tracking-[0.15em] uppercase text-[#5f5850] mb-2'

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

export default function BookPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormData>({
    startDate: '',
    endDate: '',
    passengerCount: 4,
    tripType: '',
    tripTypeOther: '',
    specialRequests: '',
    selectedAddOns: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hearAboutUs: '',
    agreedToTerms: false,
    agreedToInsurance: false,
  })

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function toggleAddOn(id: string) {
    setForm((prev) => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(id)
        ? prev.selectedAddOns.filter((a) => a !== id)
        : [...prev.selectedAddOns, id],
    }))
  }

  const today = new Date().toISOString().split('T')[0]

  const pricing = useMemo(() => {
    if (!form.startDate || !form.endDate) return null
    const start = new Date(form.startDate + 'T12:00:00')
    const end = new Date(form.endDate + 'T12:00:00')
    const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000))
    const baseTotal = DAILY_RATE * days
    const selected = ADD_ONS.filter((a) => form.selectedAddOns.includes(a.id))
    const addonsTotal = selected.reduce((s, a) => s + a.price, 0)
    const subtotal = baseTotal + addonsTotal
    const deposit = Math.round(subtotal * 0.35)
    const balance = subtotal - deposit
    return { days, baseTotal, addonsTotal, subtotal, deposit, balance }
  }, [form.startDate, form.endDate, form.selectedAddOns])

  function canNext() {
    if (step === 1) {
      if (!form.startDate || !form.endDate || !form.tripType) return false
      if (new Date(form.endDate) <= new Date(form.startDate)) return false
      if (form.tripType === 'Other' && !form.tripTypeOther.trim()) return false
      return true
    }
    if (step === 2) return true
    if (step === 3) {
      return !!(
        form.firstName &&
        form.lastName &&
        form.email &&
        form.phone &&
        form.agreedToTerms &&
        form.agreedToInsurance
      )
    }
    return true
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')
    try {
      const selectedAddOnDetails = ADD_ONS.filter((a) =>
        form.selectedAddOns.includes(a.id)
      ).map((a) => ({ name: a.name, price: a.price }))

      const res = await fetch('/api/bookings/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          addOns: selectedAddOnDetails,
          pricing,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      if (data.url) {
        window.location.href = data.url
      } else {
        router.push('/book/confirmation')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const STEP_LABELS: Record<number, string> = {
    1: 'Trip Details',
    2: 'Add-Ons',
    3: 'Your Information',
    4: 'Summary & Deposit',
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">
      <PublicNav />

      {/* Insurance reminder banner */}
      <div className="border-b border-[#c9a96e]/30 bg-[#0a0a0a] px-6 py-3 mt-16">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-[#a09890] leading-snug">
            Before your dates are confirmed: email insurance proof to{' '}
            <a href="mailto:hello@sterlingroute.com" className="text-[#c9a96e]/80 hover:text-[#c9a96e] transition-colors">
              hello@sterlingroute.com
            </a>{' '}
            —{' '}
            <a
              href="https://www.roamly.com/get-your-quote"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors underline underline-offset-2"
            >
              Get Roamly coverage →
            </a>
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="border-b border-[#433d38]/40 py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-2">Self-Drive Rental</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6">Reserve the Van</h1>

          {/* Step indicator */}
          <div className="flex items-center gap-3">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 flex items-center justify-center text-xs font-medium border transition-colors ${
                    s < step
                      ? 'bg-[#c9a96e] border-[#c9a96e] text-[#0a0a0a]'
                      : s === step
                      ? 'border-[#c9a96e] text-[#c9a96e]'
                      : 'border-[#433d38] text-[#433d38]'
                  }`}
                >
                  {s < step ? '✓' : s}
                </div>
                {s < 4 && (
                  <div
                    className={`h-px w-8 md:w-14 transition-colors ${
                      s < step ? 'bg-[#c9a96e]' : 'bg-[#433d38]'
                    }`}
                  />
                )}
              </div>
            ))}
            <p className="ml-3 text-xs text-[#5f5850]">{STEP_LABELS[step]}</p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-5 gap-10 pb-24">
        {/* Main form */}
        <div className="lg:col-span-3 space-y-8">

          {/* STEP 1 — Trip Details */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#f0e6d0]">Trip Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Start Date</label>
                  <input
                    type="date"
                    min={today}
                    value={form.startDate}
                    onChange={(e) => set('startDate', e.target.value)}
                    className={inputClass + ' [color-scheme:dark]'}
                  />
                </div>
                <div>
                  <label className={labelClass}>End Date</label>
                  <input
                    type="date"
                    min={form.startDate || today}
                    value={form.endDate}
                    onChange={(e) => set('endDate', e.target.value)}
                    className={inputClass + ' [color-scheme:dark]'}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Passenger Count</label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={form.passengerCount}
                  onChange={(e) =>
                    set('passengerCount', Math.min(10, Math.max(1, Number(e.target.value))))
                  }
                  className={inputClass}
                />
                <p className="text-xs text-[#433d38] mt-1">Maximum 10 passengers</p>
              </div>

              <div>
                <label className={labelClass}>Trip Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TRIP_TYPES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => set('tripType', t.id)}
                      className={`px-4 py-3 text-sm text-left border transition-colors ${
                        form.tripType === t.id
                          ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10'
                          : 'border-[#433d38]/70 text-[#a09890] hover:border-[#c9a96e]/50'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {form.tripType === 'Other' && (
                <div>
                  <label className={labelClass}>Tell us about your trip</label>
                  <input
                    type="text"
                    value={form.tripTypeOther}
                    placeholder="Describe your trip…"
                    onChange={(e) => set('tripTypeOther', e.target.value)}
                    className={inputClass}
                  />
                </div>
              )}

              <div>
                <label className={labelClass}>
                  Special Requests{' '}
                  <span className="normal-case text-[#433d38]">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.specialRequests}
                  placeholder="Anything we should know about your trip…"
                  onChange={(e) => set('specialRequests', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          )}

          {/* STEP 2 — Add-Ons */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#f0e6d0] mb-1">Add-Ons</h2>
                <p className="text-sm text-[#5f5850]">
                  Optional extras delivered with the van. All flat fees, not per-day.
                </p>
              </div>

              <div className="space-y-3">
                {ADD_ONS.map((addon) => {
                  const selected = form.selectedAddOns.includes(addon.id)
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      className={`w-full text-left px-5 py-4 border transition-all ${
                        selected
                          ? 'border-[#c9a96e] bg-[#c9a96e]/8'
                          : 'border-[#433d38]/70 hover:border-[#c9a96e]/40'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium mb-1 ${
                              selected ? 'text-[#c9a96e]' : 'text-[#f0e6d0]'
                            }`}
                          >
                            {addon.name}
                          </p>
                          <p className="text-xs text-[#5f5850] leading-relaxed">
                            {addon.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-sm text-[#c9a96e]">+{fmt(addon.price)}</span>
                          <div
                            className={`w-5 h-5 border flex items-center justify-center text-xs transition-colors ${
                              selected
                                ? 'bg-[#c9a96e] border-[#c9a96e] text-[#0a0a0a]'
                                : 'border-[#433d38]'
                            }`}
                          >
                            {selected && '✓'}
                          </div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* STEP 3 — Your Information */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#f0e6d0]">Your Information</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input
                    type="text"
                    value={form.firstName}
                    placeholder="First"
                    onChange={(e) => set('firstName', e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input
                    type="text"
                    value={form.lastName}
                    placeholder="Last"
                    onChange={(e) => set('lastName', e.target.value)}
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  placeholder="you@example.com"
                  onChange={(e) => set('email', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  placeholder="(561) 000-0000"
                  onChange={(e) => set('phone', e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>How did you hear about us?</label>
                <select
                  value={form.hearAboutUs}
                  onChange={(e) => set('hearAboutUs', e.target.value)}
                  className={inputClass + ' bg-[#1a1612]'}
                >
                  <option value="">Select one…</option>
                  {HEAR_ABOUT_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-4">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div
                    onClick={() => set('agreedToTerms', !form.agreedToTerms)}
                    className={`mt-0.5 w-5 h-5 border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                      form.agreedToTerms
                        ? 'bg-[#c9a96e] border-[#c9a96e] text-[#0a0a0a]'
                        : 'border-[#433d38] group-hover:border-[#c9a96e]/50'
                    }`}
                  >
                    {form.agreedToTerms && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    onClick={() => set('agreedToTerms', !form.agreedToTerms)}
                    className="text-sm text-[#a09890] leading-relaxed cursor-pointer"
                  >
                    I confirm I have read and agree to the{' '}
                    <a
                      href="/rental-terms"
                      target="_blank"
                      className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      rental terms and cancellation policy
                    </a>
                    .
                  </span>
                </label>

                <label className="flex items-start gap-4 cursor-pointer group">
                  <div
                    onClick={() => set('agreedToInsurance', !form.agreedToInsurance)}
                    className={`mt-0.5 w-5 h-5 border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                      form.agreedToInsurance
                        ? 'bg-[#c9a96e] border-[#c9a96e] text-[#0a0a0a]'
                        : 'border-[#433d38] group-hover:border-[#c9a96e]/50'
                    }`}
                  >
                    {form.agreedToInsurance && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span
                    onClick={() => set('agreedToInsurance', !form.agreedToInsurance)}
                    className="text-sm text-[#a09890] leading-relaxed cursor-pointer"
                  >
                    I understand I must obtain insurance through{' '}
                    <a
                      href="https://www.roamly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c9a96e] hover:text-[#d4b87a] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Roamly
                    </a>{' '}
                    before my trip.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4 — Summary & Deposit */}
          {step === 4 && pricing && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#f0e6d0]">Summary &amp; Deposit</h2>

              <div className="border border-[#433d38]/50 divide-y divide-[#433d38]/30">
                <div className="px-5 py-4">
                  <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-3">
                    Trip Details
                  </p>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Dates</span>
                      <span className="text-[#f0e6d0]">
                        {form.startDate} → {form.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Duration</span>
                      <span className="text-[#f0e6d0]">
                        {pricing.days} {pricing.days === 1 ? 'day' : 'days'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Passengers</span>
                      <span className="text-[#f0e6d0]">{form.passengerCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Trip Type</span>
                      <span className="text-[#f0e6d0]">{form.tripType}</span>
                    </div>
                  </div>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-3">Guest</p>
                  <p className="text-sm text-[#f0e6d0]">
                    {form.firstName} {form.lastName}
                  </p>
                  <p className="text-sm text-[#5f5850]">
                    {form.email} · {form.phone}
                  </p>
                </div>

                {form.selectedAddOns.length > 0 && (
                  <div className="px-5 py-4">
                    <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-3">
                      Add-Ons
                    </p>
                    <div className="space-y-1">
                      {ADD_ONS.filter((a) => form.selectedAddOns.includes(a.id)).map((a) => (
                        <div key={a.id} className="flex justify-between text-sm">
                          <span className="text-[#a09890]">{a.name}</span>
                          <span className="text-[#f0e6d0]">{fmt(a.price)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="px-5 py-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#5f5850]">
                      {fmt(DAILY_RATE)}/day × {pricing.days} {pricing.days === 1 ? 'day' : 'days'}
                    </span>
                    <span className="text-[#f0e6d0]">{fmt(pricing.baseTotal)}</span>
                  </div>
                  {pricing.addonsTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Add-ons</span>
                      <span className="text-[#f0e6d0]">{fmt(pricing.addonsTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-2 border-t border-[#433d38]/30">
                    <span className="text-[#a09890]">Subtotal</span>
                    <span className="text-[#f0e6d0]">{fmt(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-base pt-1">
                    <span className="text-[#c9a96e] font-semibold">Deposit due today (35%)</span>
                    <span className="text-[#c9a96e] font-semibold">{fmt(pricing.deposit)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#433d38] pt-1">
                    <span>Balance due 24 hours before departure (65%)</span>
                    <span>{fmt(pricing.balance)}</span>
                  </div>
                </div>
              </div>

              <div className="border border-[#c9a96e]/30 bg-[#c9a96e]/5 px-5 py-4">
                <p className="text-sm font-semibold text-[#c9a96e]">
                  Pickup location confirmed after deposit — Palm Beach County, FL
                </p>
              </div>

              {error && (
                <div className="border border-red-800/50 bg-red-900/20 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-medium py-4 hover:bg-[#d4b87a] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? 'Processing…'
                  : `Confirm & Pay ${fmt(pricing.deposit)} Deposit`}
              </button>
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between items-center pt-8 border-t border-[#433d38]/30">
              <button
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                disabled={step === 1}
                className="text-sm text-[#5f5850] hover:text-[#a09890] transition-colors disabled:opacity-0 disabled:pointer-events-none"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep((s) => Math.min(4, s + 1))}
                disabled={!canNext()}
                className="bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-medium px-8 py-3 hover:bg-[#d4b87a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          )}
          {step === 4 && (
            <button
              onClick={() => setStep(3)}
              className="mt-2 text-sm text-[#5f5850] hover:text-[#a09890] transition-colors"
            >
              ← Back to edit
            </button>
          )}
        </div>

        {/* Pricing Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 border border-[#433d38]/50 bg-[#1a1612]/50 p-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4">
              Your Reservation
            </p>

            {!pricing ? (
              <div className="space-y-2 text-sm text-[#5f5850]">
                <p>Select your dates to see pricing.</p>
                <div className="h-px bg-[#433d38]/30 my-4" />
                <p className="text-xs">{fmt(DAILY_RATE)}/day flat rate</p>
                <p className="text-xs">35% deposit to reserve</p>
                <p className="text-xs">Balance due 24 hrs before departure</p>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#5f5850]">
                    {pricing.days}d × {fmt(DAILY_RATE)}
                  </span>
                  <span className="text-[#f0e6d0]">{fmt(pricing.baseTotal)}</span>
                </div>
                {pricing.addonsTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-[#5f5850]">Add-ons</span>
                    <span className="text-[#f0e6d0]">{fmt(pricing.addonsTotal)}</span>
                  </div>
                )}
                <div className="h-px bg-[#433d38]/30" />
                <div className="flex justify-between font-medium">
                  <span className="text-[#a09890]">Total</span>
                  <span className="text-[#f0e6d0]">{fmt(pricing.subtotal)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-[#c9a96e]">Deposit (35%)</span>
                  <span className="text-[#c9a96e] font-medium">{fmt(pricing.deposit)}</span>
                </div>
                <div className="flex justify-between text-xs text-[#433d38]">
                  <span>Balance 24 hrs prior</span>
                  <span>{fmt(pricing.balance)}</span>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-[#433d38]/30 space-y-2 text-xs text-[#433d38]">
              <p>✓ 10 passenger capacity</p>
              <p>✓ Private commode &amp; sink</p>
              <p>✓ WiFi · 32&quot; TV · Streaming</p>
              <p>✓ Microwave &amp; mini fridge</p>
              <p>✓ Sleeps 2 (benches fold flat)</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
