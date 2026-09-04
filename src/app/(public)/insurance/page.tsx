'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'

const checkboxClass = (checked: boolean) =>
  `mt-0.5 w-5 h-5 border flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
    checked
      ? 'bg-[#c9a96e] border-[#c9a96e] text-[#0a0a0a]'
      : 'border-[#433d38] hover:border-[#c9a96e]/50'
  }`

function Checkmark() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

export default function InsurancePage() {
  const router = useRouter()
  const [checks, setChecks] = useState({ c1: false, c2: false, c3: false })

  const allChecked = checks.c1 && checks.c2 && checks.c3

  function toggle(key: keyof typeof checks) {
    setChecks(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">
      <PublicNav />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="border-b border-[#433d38]/40 pt-32 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.35em] uppercase text-[#c9a96e] mb-4">
            Required Before Every Rental
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] leading-tight mb-6">
            Insurance First.<br />Then We Talk Dates.
          </h1>
          <p className="text-[#5f5850] text-base leading-relaxed max-w-xl">
            Sterling Route requires minimum $1,000,000 liability coverage on every rental.
            This is not optional. It protects you — not just us.
          </p>
        </div>
      </section>

      {/* ── WHY YOUR PERSONAL POLICY ISN'T ENOUGH ────────────────────── */}
      <section className="py-16 px-6 border-b border-[#433d38]/30">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-serif text-2xl text-[#f0e6d0]">
            Why Your Personal Auto Policy Isn&apos;t Enough
          </h2>
          <div className="space-y-6 text-sm text-[#a09890] leading-relaxed">
            <p>
              Most personal auto insurance policies contain a commercial use exclusion. The moment
              money changes hands on a rental, you are operating in commercial territory. Your
              personal policy may deny the claim.
            </p>
            <p>
              Rental-specific policies from providers like Bonzah or RentalCover are built for
              exactly this situation. They cover you specifically for the dates of your Sterling
              Route rental and take about five minutes to obtain.
            </p>
            <p>
              We verify insurance before releasing keys. No coverage confirmation = no keys.
              This policy protects everyone in the vehicle, not just the driver.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW TO GET COVERED ───────────────────────────────────────── */}
      <section className="py-16 px-6 border-b border-[#433d38]/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-2xl text-[#f0e6d0] mb-10">
            How to Get Covered in 5 Minutes
          </h2>

          {/* Two provider options side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
            {/* Option 1 — Bonzah */}
            <div className="border border-[#433d38]/60 bg-[#1a1612]/60 p-6 space-y-4">
              <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e]">Option 1</p>
              <p className="font-serif text-xl text-[#f0e6d0]">Bonzah</p>
              <p className="text-sm text-[#a09890] leading-relaxed">
                bonzah.com — Instant quote by rental dates. Covers damage and third-party
                liability. Sold in 24-hour increments. Works with all licensed rental companies.
              </p>
              <a
                href="https://bonzah.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#0a0a0a] font-sans text-xs tracking-widest uppercase font-medium px-6 py-2.5 hover:bg-[#d4b87a] transition-colors duration-200"
              >
                Get Bonzah Quote →
              </a>
            </div>

            {/* Option 2 — RentalCover */}
            <div className="border border-[#433d38]/60 bg-[#1a1612]/60 p-6 space-y-4">
              <p className="text-xs tracking-[0.25em] uppercase text-[#c9a96e]">Option 2</p>
              <p className="font-serif text-xl text-[#f0e6d0]">RentalCover</p>
              <p className="text-sm text-[#a09890] leading-relaxed">
                rentalcover.com — Global rental insurance including excess cover, damage and
                theft protection. 4.7/5 stars from 19,000+ reviews. Select your dates and
                vehicle type for instant quote.
              </p>
              <a
                href="https://rentalcover.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#0a0a0a] font-sans text-xs tracking-widest uppercase font-medium px-6 py-2.5 hover:bg-[#d4b87a] transition-colors duration-200"
              >
                Get RentalCover Quote →
              </a>
            </div>
          </div>

          <div className="space-y-8">
            {[
              {
                n: '01',
                title: 'Choose Your Provider',
                body: 'Select Bonzah (bonzah.com) or RentalCover (rentalcover.com) — both work and both provide instant quotes.',
              },
              {
                n: '02',
                title: 'Enter Your Rental Dates',
                body: 'Enter your rental dates matching your Sterling Route booking dates exactly. The quote is specific to those dates.',
              },
              {
                n: '03',
                title: 'Select Vehicle Type: Passenger Van / Sprinter Van',
                body: 'Choose the coverage tier that includes minimum $1,000,000 in liability. We recommend also selecting collision damage waiver (CDW) to cover your deductible in case of an incident.',
              },
              {
                n: '04',
                title: 'Purchase and Email Proof',
                body: 'Once purchased, email your insurance confirmation to hello@sterlingroute.com with your name and intended rental dates in the subject line. We\u2019ll confirm receipt within a few hours.',
              },
            ].map(step => (
              <div key={step.n} className="flex gap-6">
                <div className="shrink-0">
                  <span className="font-serif text-3xl text-[#c9a96e]/50">{step.n}</span>
                </div>
                <div className="pt-1">
                  <p className="text-sm font-medium text-[#f0e6d0] mb-2">{step.title}</p>
                  <p className="text-sm text-[#a09890] leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COVERAGE REQUIREMENTS BOX ─────────────────────────────────── */}
      <section className="py-16 px-6 border-b border-[#433d38]/30">
        <div className="max-w-3xl mx-auto">
          <div className="border border-[#c9a96e]/50 bg-[#c9a96e]/5 p-8">
            <h2 className="font-serif text-2xl text-[#f0e6d0] mb-6">
              Minimum Coverage Requirements
            </h2>
            <ul className="space-y-3">
              {[
                'Minimum $1,000,000 combined single limit liability',
                'Coverage specific to your rental dates (not a blanket policy)',
                'Your name listed as the insured driver',
                'Vehicle described as: Mercedes-Benz Sprinter Passenger Van',
                'Policy confirmation email sent to hello@sterlingroute.com before departure',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-[#a09890]">
                  <span className="text-[#c9a96e] mt-0.5 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-[#5f5850] leading-relaxed">
              Already have RV or specialty vehicle rental coverage that meets these requirements?
              Email us at{' '}
              <a
                href="mailto:hello@sterlingroute.com"
                className="text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors"
              >
                hello@sterlingroute.com
              </a>{' '}
              before booking and we&apos;ll verify.
            </p>
          </div>
        </div>
      </section>

      {/* ── ALTERNATIVE COVERAGE NOTE ────────────────────────────────── */}
      <section className="py-12 px-6 border-b border-[#433d38]/30">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-[#5f5850] leading-relaxed max-w-2xl">
            Bonzah and RentalCover are our recommended providers because they&apos;re
            purpose-built for exactly this type of rental. You are not required to use either
            — any policy meeting the minimum requirements from a licensed U.S. insurer will
            be accepted.
          </p>
        </div>
      </section>

      {/* ── CONFIRMATION GATE ─────────────────────────────────────────── */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="border border-[#433d38]/60 bg-[#1a1612]/60 p-8 space-y-6">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
                Confirm Before Proceeding
              </p>
              <h2 className="font-serif text-2xl text-[#f0e6d0]">
                I&apos;m Ready to Book
              </h2>
            </div>

            <div className="space-y-5">
              {/* Checkbox 1 */}
              <label className="flex items-start gap-4 cursor-pointer group">
                <div
                  onClick={() => toggle('c1')}
                  className={checkboxClass(checks.c1)}
                >
                  {checks.c1 && <Checkmark />}
                </div>
                <span
                  onClick={() => toggle('c1')}
                  className="text-sm text-[#a09890] leading-relaxed cursor-pointer"
                >
                  I understand that personal auto insurance typically does not cover commercial rentals.
                </span>
              </label>

              {/* Checkbox 2 */}
              <label className="flex items-start gap-4 cursor-pointer group">
                <div
                  onClick={() => toggle('c2')}
                  className={checkboxClass(checks.c2)}
                >
                  {checks.c2 && <Checkmark />}
                </div>
                <span
                  onClick={() => toggle('c2')}
                  className="text-sm text-[#a09890] leading-relaxed cursor-pointer"
                >
                  I confirm I will obtain minimum $1,000,000 liability coverage through Bonzah,
                  RentalCover, or an equivalent licensed insurer before taking possession of the vehicle.
                </span>
              </label>

              {/* Checkbox 3 */}
              <label className="flex items-start gap-4 cursor-pointer group">
                <div
                  onClick={() => toggle('c3')}
                  className={checkboxClass(checks.c3)}
                >
                  {checks.c3 && <Checkmark />}
                </div>
                <span
                  onClick={() => toggle('c3')}
                  className="text-sm text-[#a09890] leading-relaxed cursor-pointer"
                >
                  I will email proof of coverage to hello@sterlingroute.com before my departure date.
                </span>
              </label>
            </div>

            <div className="pt-2">
              <button
                onClick={() => allChecked && router.push('/book')}
                disabled={!allChecked}
                className={`w-full font-sans text-sm tracking-widest uppercase font-medium py-4 transition-colors duration-200 ${
                  allChecked
                    ? 'bg-[#c9a96e] text-[#0a0a0a] hover:bg-[#d4b87a] cursor-pointer'
                    : 'bg-[#1a1612] text-[#433d38] border border-[#433d38]/50 cursor-not-allowed'
                }`}
              >
                I&apos;m Covered — Proceed to Booking
              </button>
              <p className="mt-3 text-xs text-[#433d38] leading-relaxed">
                You&apos;ll also confirm insurance compliance within the booking form and rental agreement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
