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
              A Roamly rental policy costs between $15–$45 per day depending on coverage level.
              It covers you specifically for the dates of your Sterling Route rental. It takes
              about five minutes to get a quote.
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

          <div className="space-y-8">
            {[
              {
                n: '01',
                title: 'Go to Roamly',
                body: 'Visit roamly.com and click \u2018Get a Quote\u2019 or \u2018Rent an RV/Van.\u2019 Roamly specializes in peer-to-peer and private vehicle rentals.',
              },
              {
                n: '02',
                title: 'Enter Your Trip Details',
                body: 'Enter your rental dates, vehicle type (passenger van / Sprinter), and your driver information. The quote takes your specific dates into account.',
              },
              {
                n: '03',
                title: 'Select $1M Liability Coverage',
                body: 'Choose the coverage tier that includes minimum $1,000,000 in liability. We recommend also selecting collision damage waiver (CDW) to cover your deductible in case of an incident.',
              },
              {
                n: '04',
                title: 'Send Proof to Sterling Route',
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

          <div className="mt-10">
            <a
              href="https://roamly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-medium px-8 py-3 hover:bg-[#d4b87a] transition-colors duration-200"
            >
              Get a Roamly Quote →
            </a>
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
            Roamly is our recommended provider because it&apos;s fast, purpose-built for this type
            of rental, and we&apos;ve found it to be the most seamless experience for renters. You
            are not required to use Roamly specifically — any policy meeting the minimum
            requirements above from a licensed U.S. insurer will be accepted, subject to
            verification.
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
                  I confirm I will obtain minimum $1,000,000 liability coverage through Roamly or
                  an equivalent licensed insurer before taking possession of the vehicle.
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
