'use client'

import { useState, useMemo, createContext, useContext } from 'react'
import type { BookingWizardState, QuoteResult } from '@/types/booking'

// Legacy context — kept for step sub-components that may still import it
interface WizardContextValue {
  state: BookingWizardState
  update: (patch: Partial<BookingWizardState>) => void
  next: () => void
  back: () => void
  goTo: (step: 1 | 2 | 3 | 4) => void
}

const WizardContext = createContext<WizardContextValue | null>(null)

export function useWizard() {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used inside BookingWizard')
  return ctx
}

// Silence unused import warning
void (0 as unknown as QuoteResult)

type Addon = {
  id: string
  name: string
  description: string | null
  price: number
  category: string | null
}

type Props = {
  addons: Addon[]
  vehicleId: string
}

type FormData = {
  startDate: string
  endDate: string
  tripType: string
  passengers: number
  selectedAddons: string[]
  firstName: string
  lastName: string
  email: string
  phone: string
  pickupCity: string
  destination: string
  requests: string
}

const TRIP_TYPES = ['Golf', 'Game Day', 'Corporate', 'Family / Occasion', 'Other']

const SERVICE_TYPE_MAP: Record<string, string> = {
  'Golf': 'MULTI_DAY_TOUR',
  'Game Day': 'EVENT',
  'Corporate': 'CORPORATE',
  'Family / Occasion': 'EVENT',
  'Other': 'EVENT',
}

function getDayRate(dateStr: string): number {
  const d = new Date(dateStr + 'T12:00:00')
  const dow = d.getDay()
  // Fri=5, Sat=6, Sun=0 → peak weekend rate
  if (dow === 5 || dow === 6 || dow === 0) return 1095
  return 795
}

function calcPricing(form: FormData, addons: Addon[]) {
  if (!form.startDate || !form.endDate) return null
  const start = new Date(form.startDate + 'T12:00:00')
  const end = new Date(form.endDate + 'T12:00:00')
  const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))

  let baseTotal = 0
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    baseTotal += getDayRate(d.toISOString().split('T')[0])
  }

  const selected = addons.filter(a => form.selectedAddons.includes(a.id))
  const addonsTotal = selected.reduce((s, a) => s + a.price, 0)
  const subtotal = baseTotal + addonsTotal
  const deposit = Math.ceil(subtotal * 0.35)

  return { days, baseTotal, addonsTotal, subtotal, deposit, balance: subtotal - deposit }
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

const inputClass = 'w-full bg-[#1a1612] border border-[#433d38]/70 text-[#f0e6d0] placeholder-[#5f5850] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors'
const labelClass = 'block text-xs tracking-[0.15em] uppercase text-[#5f5850] mb-2'

export function BookingWizard({ addons, vehicleId }: Props) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState<FormData>({
    startDate: '', endDate: '', tripType: '', passengers: 4,
    selectedAddons: [],
    firstName: '', lastName: '', email: '', phone: '',
    pickupCity: 'Palm Beach County, FL', destination: '', requests: '',
  })

  const pricing = useMemo(() => calcPricing(form, addons), [form, addons])

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function toggleAddon(id: string) {
    setForm(prev => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(id)
        ? prev.selectedAddons.filter(a => a !== id)
        : [...prev.selectedAddons, id],
    }))
  }

  function canNext() {
    if (step === 1) {
      if (!form.startDate || !form.endDate || !form.tripType) return false
      if (new Date(form.endDate) <= new Date(form.startDate)) return false
      return true
    }
    if (step === 2) return true
    if (step === 3) return !!(form.firstName && form.lastName && form.email && form.phone)
    return true
  }

  async function handleReserve() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          vehicleId,
          serviceType: SERVICE_TYPE_MAP[form.tripType] ?? 'EVENT',
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        window.location.href = '/book/success?ref=' + encodeURIComponent(data.bookingRef)
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  // Today's date string for min date
  const today = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0] pb-24">
      {/* Header */}
      <div className="border-b border-[#433d38]/40 bg-[#0a0a0a] py-10 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-2">Self-Drive Rental</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6">Reserve the Van</h1>
          {/* Progress */}
          <div className="flex items-center gap-3">
            {[1,2,3,4].map(s => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-7 h-7 flex items-center justify-center text-xs font-medium border transition-colors ${
                  s < step ? 'bg-[#c9a96e] border-[#c9a96e] text-[#0a0a0a]'
                  : s === step ? 'border-[#c9a96e] text-[#c9a96e]'
                  : 'border-[#433d38] text-[#433d38]'
                }`}>
                  {s < step ? '✓' : s}
                </div>
                {s < 4 && <div className={`h-px w-8 md:w-16 transition-colors ${s < step ? 'bg-[#c9a96e]' : 'bg-[#433d38]'}`} />}
              </div>
            ))}
            <p className="ml-3 text-xs text-[#5f5850]">
              {step === 1 ? 'Dates & Trip' : step === 2 ? 'Add-Ons' : step === 3 ? 'Your Details' : 'Review & Pay'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Main form */}
        <div className="lg:col-span-3">

          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#f0e6d0]">When &amp; What</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Pickup Date</label>
                  <input type="date" min={today} value={form.startDate}
                    onChange={e => set('startDate', e.target.value)}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Return Date</label>
                  <input type="date" min={form.startDate || today} value={form.endDate}
                    onChange={e => set('endDate', e.target.value)}
                    className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Trip Type</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {TRIP_TYPES.map(t => (
                    <button key={t} type="button"
                      onClick={() => set('tripType', t)}
                      className={`px-4 py-3 text-sm text-left border transition-colors ${
                        form.tripType === t
                          ? 'border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/10'
                          : 'border-[#433d38]/70 text-[#a09890] hover:border-[#c9a96e]/50'
                      }`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>Number of Passengers</label>
                <select value={form.passengers} onChange={e => set('passengers', Number(e.target.value))} className={inputClass}>
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} {n === 1 ? 'passenger' : 'passengers'}</option>
                  ))}
                </select>
              </div>

              {pricing && (
                <div className="border border-[#433d38]/50 bg-[#1a1612]/50 p-4 text-sm">
                  <p className="text-[#c9a96e] text-xs tracking-widest uppercase mb-2">Estimated Rate</p>
                  <p className="text-[#f0e6d0]">{pricing.days} {pricing.days === 1 ? 'day' : 'days'} · {fmt(pricing.baseTotal)}</p>
                  <p className="text-[#5f5850] text-xs mt-1">Weekdays $795/day · Weekends &amp; Sundays $1,095/day</p>
                </div>
              )}
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="font-serif text-2xl text-[#f0e6d0] mb-1">Add-Ons</h2>
                <p className="text-sm text-[#5f5850]">Optional extras delivered with the van. All optional.</p>
              </div>

              {addons.length === 0 ? (
                <p className="text-sm text-[#5f5850]">No add-ons available at this time.</p>
              ) : (
                <div className="space-y-3">
                  {addons.map(addon => {
                    const selected = form.selectedAddons.includes(addon.id)
                    return (
                      <button key={addon.id} type="button" onClick={() => toggleAddon(addon.id)}
                        className={`w-full text-left px-5 py-4 border transition-all ${
                          selected
                            ? 'border-[#c9a96e] bg-[#c9a96e]/8'
                            : 'border-[#433d38]/70 hover:border-[#c9a96e]/40'
                        }`}>
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-sm font-medium ${selected ? 'text-[#c9a96e]' : 'text-[#f0e6d0]'}`}>{addon.name}</span>
                              {addon.category && (
                                <span className="text-xs text-[#433d38] border border-[#433d38]/50 px-2 py-0.5">{addon.category}</span>
                              )}
                            </div>
                            {addon.description && (
                              <p className="text-xs text-[#5f5850] leading-relaxed">{addon.description}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-sm text-[#c9a96e]">+{fmt(addon.price)}</span>
                            <div className={`w-5 h-5 border flex items-center justify-center text-xs transition-colors ${
                              selected ? 'bg-[#c9a96e] border-[#c9a96e] text-[#0a0a0a]' : 'border-[#433d38]'
                            }`}>
                              {selected && '✓'}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#f0e6d0]">Your Details</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input type="text" value={form.firstName} placeholder="First"
                    onChange={e => set('firstName', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input type="text" value={form.lastName} placeholder="Last"
                    onChange={e => set('lastName', e.target.value)} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" value={form.email} placeholder="you@example.com"
                  onChange={e => set('email', e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="tel" value={form.phone} placeholder="(561) 000-0000"
                  onChange={e => set('phone', e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Pickup Location</label>
                <input type="text" value={form.pickupCity}
                  placeholder="City or address where you'll pick up the van"
                  onChange={e => set('pickupCity', e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Primary Destination</label>
                <input type="text" value={form.destination}
                  placeholder="e.g. Streamsong Resort, Hard Rock Stadium, Key West…"
                  onChange={e => set('destination', e.target.value)} className={inputClass} />
              </div>

              <div>
                <label className={labelClass}>Special Requests <span className="normal-case text-[#433d38]">(optional)</span></label>
                <textarea rows={3} value={form.requests}
                  placeholder="Anything we should know about your trip…"
                  onChange={e => set('requests', e.target.value)} className={inputClass} />
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && pricing && (
            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-[#f0e6d0]">Review &amp; Pay Deposit</h2>

              <div className="border border-[#433d38]/50 divide-y divide-[#433d38]/30">
                <div className="px-5 py-4">
                  <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-3">Trip Details</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Dates</span>
                      <span className="text-[#f0e6d0]">{form.startDate} → {form.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Duration</span>
                      <span className="text-[#f0e6d0]">{pricing.days} {pricing.days === 1 ? 'day' : 'days'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Trip Type</span>
                      <span className="text-[#f0e6d0]">{form.tripType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Passengers</span>
                      <span className="text-[#f0e6d0]">{form.passengers}</span>
                    </div>
                    {form.destination && (
                      <div className="flex justify-between">
                        <span className="text-[#5f5850]">Destination</span>
                        <span className="text-[#f0e6d0]">{form.destination}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-5 py-4">
                  <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-3">Guest</p>
                  <p className="text-sm text-[#f0e6d0]">{form.firstName} {form.lastName}</p>
                  <p className="text-sm text-[#5f5850]">{form.email} · {form.phone}</p>
                </div>

                {pricing.addonsTotal > 0 && (
                  <div className="px-5 py-4">
                    <p className="text-xs tracking-widest uppercase text-[#c9a96e] mb-3">Add-Ons</p>
                    <div className="space-y-1">
                      {addons.filter(a => form.selectedAddons.includes(a.id)).map(a => (
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
                    <span className="text-[#5f5850]">Van rental ({pricing.days}d)</span>
                    <span className="text-[#f0e6d0]">{fmt(pricing.baseTotal)}</span>
                  </div>
                  {pricing.addonsTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-[#5f5850]">Add-ons</span>
                      <span className="text-[#f0e6d0]">{fmt(pricing.addonsTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium pt-2 border-t border-[#433d38]/30">
                    <span className="text-[#a09890]">Total</span>
                    <span className="text-[#f0e6d0]">{fmt(pricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-base pt-1">
                    <span className="text-[#c9a96e]">Deposit due today (35%)</span>
                    <span className="text-[#c9a96e] font-medium">{fmt(pricing.deposit)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-[#433d38] pt-1">
                    <span>Balance due 24 hrs before departure</span>
                    <span>{fmt(pricing.balance)}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#5f5850] border-l-2 border-[#c9a96e]/30 pl-4 leading-relaxed">
                Your deposit is fully refundable up to 7 days before your trip. By proceeding, you agree to the Sterling Route rental terms. Rental agreement and insurance verification through Outdoorsy will be sent after booking.
              </div>

              {error && (
                <div className="border border-red-800/50 bg-red-900/20 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                onClick={handleReserve}
                disabled={loading}
                className="w-full bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-medium py-4 hover:bg-[#d4b87a] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing…' : `Pay ${pricing ? fmt(pricing.deposit) : ''} Deposit`}
              </button>
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between items-center mt-8 pt-8 border-t border-[#433d38]/30">
              <button
                onClick={() => setStep(s => (s - 1) as 1|2|3|4)}
                disabled={step === 1}
                className="text-sm text-[#5f5850] hover:text-[#a09890] transition-colors disabled:opacity-0"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(s => (s + 1) as 1|2|3|4)}
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
              className="mt-4 text-sm text-[#5f5850] hover:text-[#a09890] transition-colors"
            >
              ← Back to edit
            </button>
          )}
        </div>

        {/* Pricing sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 border border-[#433d38]/50 bg-[#1a1612]/50 p-6">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-4">Your Reservation</p>

            {!pricing ? (
              <div className="space-y-2 text-sm text-[#5f5850]">
                <p>Select your dates to see pricing.</p>
                <div className="h-px bg-[#433d38]/30 my-4" />
                <p className="text-xs">Weekdays from $795/day</p>
                <p className="text-xs">Weekends from $1,095/day</p>
                <p className="text-xs">35% deposit to reserve</p>
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#5f5850]">{pricing.days}d rental</span>
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
                  <span>Balance due 24 hrs prior</span>
                  <span>{fmt(pricing.balance)}</span>
                </div>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-[#433d38]/30 space-y-3 text-xs text-[#433d38]">
              <p>✓ 10 passenger capacity</p>
              <p>✓ Private commode &amp; sink</p>
              <p>✓ WiFi · 32&quot; TV · Streaming</p>
              <p>✓ Microwave &amp; mini fridge</p>
              <p>✓ Sleeps 2 (benches fold flat)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
