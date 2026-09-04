'use client'

import { useMemo, useState } from 'react'

type Status = 'LEGAL' | 'RESTRICTED' | 'BANNED' | 'GRAY_AREA'

interface RegulationRecord {
  slug: string
  state: string
  city: string
  county: string
  status: Status
  headline: string
  licenseRequired: boolean
  licenseCost: string
  minimumStay: string
  taxes: {
    stateSales: number
    local: number
    tourist: number
    cityTax?: number
    combined: number
    notes: string
  }
  summary: string
  lastUpdated: string
}

const DATA: RegulationRecord[] = [
  {
    slug: 'fl/miami-beach',
    state: 'FL',
    city: 'Miami Beach',
    county: 'Miami-Dade',
    status: 'RESTRICTED',
    headline: 'Heavily restricted by zoning — strict residential bans',
    licenseRequired: true,
    licenseCost: '$400–$600 BTR + State DBPR',
    minimumStay: '6 months + 1 day in most single-family zones',
    taxes: {
      stateSales: 6.0,
      local: 1.0,
      tourist: 6.0,
      cityTax: 4.0,
      combined: 17.0,
      notes: 'Miami Beach Resort Tax adds 4% — highest combined burden in Florida.',
    },
    summary:
      'Legal only in specific multi-family and commercial districts. Fines start at $20,000 for first offense, up to $100,000 for repeat violations. Enforcement is aggressive.',
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'fl/orlando',
    state: 'FL',
    city: 'Orlando',
    county: 'Orange',
    status: 'LEGAL',
    headline: 'Legal in Orange County STR zones (with license)',
    licenseRequired: true,
    licenseCost: '$275 Home Share (Orlando) · Orange Co. BTR',
    minimumStay: 'None in Vacation Home Rental District',
    taxes: {
      stateSales: 6.0,
      local: 0.5,
      tourist: 6.0,
      combined: 12.5,
      notes: 'Orange County Tourist Development Tax collected separately.',
    },
    summary:
      'City of Orlando restricts whole-home STR (home-share only). Orange County unincorporated — including the main "Orlando market" near Disney — allows STR in the Vacation Home Rental District. Confirm exact jurisdiction before purchase.',
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'fl/key-west',
    state: 'FL',
    city: 'Key West',
    county: 'Monroe',
    status: 'BANNED',
    headline: 'Moratorium on new licenses — grandfathered only',
    licenseRequired: true,
    licenseCost: 'Grandfathered licenses resell for $100,000+',
    minimumStay: '28 days citywide (without legacy license)',
    taxes: {
      stateSales: 6.0,
      local: 1.5,
      tourist: 6.0,
      combined: 13.5,
      notes: 'Includes 1% Tourist Impact Tax unique to Monroe County.',
    },
    summary:
      'Effectively banned. License moratorium has been in place for years. Only pre-existing grandfathered Transient Licenses can operate under-28-day rentals. Enforcement fines exceed $20,000 per violation.',
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'fl/destin',
    state: 'FL',
    city: 'Destin',
    county: 'Okaloosa',
    status: 'LEGAL',
    headline: 'Straightforward — purpose-built tourist town',
    licenseRequired: true,
    licenseCost: '~$75 city BTR + State DBPR + Okaloosa BTR',
    minimumStay: 'None',
    taxes: {
      stateSales: 6.0,
      local: 1.0,
      tourist: 5.0,
      combined: 12.0,
      notes: 'Note: Destin is in Okaloosa County, not Walton County.',
    },
    summary:
      'One of Florida\'s most STR-friendly markets. Broadly permissive zoning. Life-safety inspection required prior to operation. No recent major changes.',
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'fl/sarasota',
    state: 'FL',
    city: 'Sarasota',
    county: 'Sarasota',
    status: 'RESTRICTED',
    headline: 'Siesta Key permissive, city more restrictive',
    licenseRequired: true,
    licenseCost: '~$45 Sarasota County BTR + State DBPR',
    minimumStay: '1 month in city residential zones · No min on Siesta Key RMF',
    taxes: {
      stateSales: 6.0,
      local: 1.0,
      tourist: 6.0,
      combined: 13.0,
      notes: 'Sarasota County surtax 1% + TDT 6%.',
    },
    summary:
      'City of Sarasota restricts single-family residential to 1-month minimums. Siesta Key (unincorporated) is historically permissive — no minimum stay in multi-family zones. Siesta Key town-hood movement under watch.',
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'tn/nashville',
    state: 'TN',
    city: 'Nashville',
    county: 'Davidson',
    status: 'RESTRICTED',
    headline: 'Type 1 vs Type 2 — whole-home heavily capped',
    licenseRequired: true,
    licenseCost: '~$50 STRP permit',
    minimumStay: 'None (under STRP permit)',
    taxes: {
      stateSales: 7.0,
      local: 2.25,
      tourist: 6.0,
      combined: 15.25,
      notes: 'TN Business Tax may also apply.',
    },
    summary:
      'Type 1 (owner-occupied) broadly permitted citywide. Type 2 (non-owner-occupied) capped at 3% per census tract and banned in most residential zones.',
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'nc/asheville',
    state: 'NC',
    city: 'Asheville',
    county: 'Buncombe',
    status: 'RESTRICTED',
    headline: 'Homestay-only in most residential zones',
    licenseRequired: true,
    licenseCost: '~$150 homestay permit',
    minimumStay: '30+ days outside permitted zones',
    taxes: {
      stateSales: 4.75,
      local: 2.25,
      tourist: 6.0,
      combined: 13.0,
      notes: 'Buncombe County occupancy tax 6%.',
    },
    summary:
      'Homestay (owner-occupied) permitted citywide. Whole-home STR banned in most residential zones — allowed only in specific Resort and Commercial zones. Effectively medium-term rental outside those pockets.',
    lastUpdated: '2026-04-15',
  },
  {
    slug: 'ny/finger-lakes',
    state: 'NY',
    city: 'Finger Lakes',
    county: 'Seneca / Yates / Schuyler',
    status: 'LEGAL',
    headline: 'Legal — varies by county/town',
    licenseRequired: true,
    licenseCost: '$50–$300 depending on town',
    minimumStay: 'None (most towns); some wine-country towns impose 2-night min',
    taxes: {
      stateSales: 4.0,
      local: 3.5,
      tourist: 4.0,
      combined: 11.5,
      notes: 'County rates 3–4% + occupancy tax 4%.',
    },
    summary:
      'NY STR oversight is municipal — rules vary town-by-town. Most towns require a permit or registration; some require a bed-and-breakfast-style inspection. Residential pushback in wine-country towns is an ongoing watch.',
    lastUpdated: '2026-04-15',
  },
]

const STATE_OPTIONS = [
  { code: 'FL', name: 'Florida' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'NY', name: 'New York' },
]

function statusStyle(status: Status) {
  switch (status) {
    case 'LEGAL':
      return {
        bg: 'bg-emerald-50',
        border: 'border-emerald-300',
        text: 'text-emerald-700',
        badgeBg: 'bg-emerald-500',
      }
    case 'RESTRICTED':
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-300',
        text: 'text-amber-700',
        badgeBg: 'bg-amber-500',
      }
    case 'BANNED':
      return {
        bg: 'bg-red-50',
        border: 'border-red-300',
        text: 'text-red-700',
        badgeBg: 'bg-red-500',
      }
    case 'GRAY_AREA':
      return {
        bg: 'bg-gray-50',
        border: 'border-gray-300',
        text: 'text-gray-700',
        badgeBg: 'bg-gray-500',
      }
  }
}

interface CityAlertFormProps {
  city: string
}

function CityAlertForm({ city }: CityAlertFormProps) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // eslint-disable-next-line no-console
    console.log('[Regulation Alert Signup]', { city, email })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-lg bg-[var(--sf-gold)]/10 border border-[var(--sf-gold)]/30 p-4 text-center">
        <p className="text-sm font-semibold text-[var(--sf-navy)]">You&apos;re on the list.</p>
        <p className="text-xs text-[var(--sf-navy)]/60 mt-1">
          You&apos;ll only hear from us when {city} rules change.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-[var(--sf-navy)]/15 px-3 py-2.5 text-sm text-[var(--sf-navy)] focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition"
        />
        <button
          type="submit"
          className="bg-[var(--sf-gold)] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--sf-gold)]/90 transition-all whitespace-nowrap"
        >
          Alert Me
        </button>
      </div>
      <p className="text-xs text-[var(--sf-navy)]/50">
        One email per month — only when something changes.
      </p>
    </form>
  )
}

function ResultCard({ record }: { record: RegulationRecord }) {
  const style = statusStyle(record.status)

  return (
    <div className={`rounded-2xl border-2 ${style.border} ${style.bg} p-6 sm:p-8 shadow-sm`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div>
          <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--sf-navy)]">
            {record.city}, {record.state}
          </h3>
          <p className="text-sm text-[var(--sf-navy)]/60 mt-0.5">{record.county} County</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 ${style.badgeBg} text-white px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider uppercase`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            {record.status.replace('_', ' ')}
          </span>
        </div>
      </div>

      <p className={`text-sm font-semibold ${style.text} mb-5`}>{record.headline}</p>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-xl p-4 border border-[var(--sf-navy)]/5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--sf-navy)]/50 mb-1.5">
            License required
          </div>
          <div className="font-semibold text-[var(--sf-navy)] text-sm">
            {record.licenseRequired ? 'Yes' : 'No'}
          </div>
          <div className="text-xs text-[var(--sf-navy)]/60 mt-1">{record.licenseCost}</div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-[var(--sf-navy)]/5">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--sf-navy)]/50 mb-1.5">
            Minimum stay
          </div>
          <div className="font-semibold text-[var(--sf-navy)] text-sm">{record.minimumStay}</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-5 border border-[var(--sf-navy)]/5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--sf-navy)]/50">
            Tax breakdown
          </div>
          <div className="font-[var(--font-display)] text-2xl font-bold text-[var(--sf-gold)]">
            {record.taxes.combined.toFixed(2)}%
          </div>
        </div>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-[var(--sf-navy)]/60">State sales tax</span>
            <span className="font-medium text-[var(--sf-navy)]">{record.taxes.stateSales}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--sf-navy)]/60">County / local surtax</span>
            <span className="font-medium text-[var(--sf-navy)]">{record.taxes.local}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--sf-navy)]/60">Tourist development tax</span>
            <span className="font-medium text-[var(--sf-navy)]">{record.taxes.tourist}%</span>
          </div>
          {record.taxes.cityTax ? (
            <div className="flex justify-between">
              <span className="text-[var(--sf-navy)]/60">City / resort tax</span>
              <span className="font-medium text-[var(--sf-navy)]">{record.taxes.cityTax}%</span>
            </div>
          ) : null}
        </div>
        <p className="text-xs text-[var(--sf-navy)]/50 mt-3 pt-3 border-t border-[var(--sf-navy)]/10">
          {record.taxes.notes}
        </p>
      </div>

      <p className="text-sm text-[var(--sf-navy)]/80 leading-relaxed mb-5">{record.summary}</p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-[var(--sf-navy)]/50 mb-5 pb-5 border-b border-[var(--sf-navy)]/10">
        <span>Last updated: {record.lastUpdated}</span>
        <span>Sourced from municipal + state records</span>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl p-5 border border-[var(--sf-gold)]/30">
        <h4 className="font-semibold text-[var(--sf-navy)] text-base mb-1">
          Get monthly alerts when {record.city} regulations change
        </h4>
        <p className="text-xs text-[var(--sf-navy)]/60 mb-4">
          Rules change. We track every ordinance, tax update, and pending bill.
        </p>
        <CityAlertForm city={record.city} />
      </div>
    </div>
  )
}

export default function RegulationSearch() {
  const [selectedState, setSelectedState] = useState<string>('')
  const [selectedCity, setSelectedCity] = useState<string>('')

  const citiesForState = useMemo(() => {
    if (!selectedState) return []
    return DATA.filter((r) => r.state === selectedState)
  }, [selectedState])

  const result = useMemo(() => {
    if (!selectedState || !selectedCity) return null
    return DATA.find((r) => r.state === selectedState && r.city === selectedCity) ?? null
  }, [selectedState, selectedCity])

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value)
    setSelectedCity('')
  }

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-[var(--sf-navy)]/10 mb-8">
        <div className="text-center mb-6">
          <span className="text-[var(--sf-gold)] text-xs font-semibold tracking-widest uppercase">
            Check Your Market
          </span>
          <h3 className="font-[var(--font-display)] text-2xl sm:text-3xl font-bold text-[var(--sf-navy)] mt-2">
            Select state, then city
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="state" className="block text-xs font-semibold text-[var(--sf-navy)] uppercase tracking-wider mb-2">
              State
            </label>
            <select
              id="state"
              value={selectedState}
              onChange={handleStateChange}
              className="w-full rounded-lg border border-[var(--sf-navy)]/15 bg-white px-4 py-3 text-sm text-[var(--sf-navy)] focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition"
            >
              <option value="">Select a state...</option>
              {STATE_OPTIONS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="city" className="block text-xs font-semibold text-[var(--sf-navy)] uppercase tracking-wider mb-2">
              City
            </label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
              className="w-full rounded-lg border border-[var(--sf-navy)]/15 bg-white px-4 py-3 text-sm text-[var(--sf-navy)] focus:outline-none focus:border-[var(--sf-gold)] focus:ring-2 focus:ring-[var(--sf-gold)]/20 transition disabled:bg-[var(--sf-cream)] disabled:text-[var(--sf-navy)]/40"
            >
              <option value="">{selectedState ? 'Select a city...' : 'Pick a state first'}</option>
              {citiesForState.map((c) => (
                <option key={c.slug} value={c.city}>
                  {c.city}
                </option>
              ))}
            </select>
          </div>
        </div>

        {!result && (
          <p className="text-xs text-center text-[var(--sf-navy)]/50 mt-5">
            Sample coverage: 5 Florida markets · Nashville · Asheville · Finger Lakes. Full database
            covers 35+ US markets.
          </p>
        )}
      </div>

      {result && <ResultCard record={result} />}
    </div>
  )
}
