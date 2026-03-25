import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'
import { CheckCircle } from 'lucide-react'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Booking Confirmed — Sterling Route',
}

function fmt(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
}

function generateIcs(startDate: string, endDate: string, firstName: string): string {
  const start = startDate.replace(/-/g, '')
  const end = endDate.replace(/-/g, '')
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Sterling Route//EN',
    'BEGIN:VEVENT',
    `DTSTART;VALUE=DATE:${start}`,
    `DTEND;VALUE=DATE:${end}`,
    `SUMMARY:Sterling Route Van Rental`,
    `DESCRIPTION:Your Sterling Route rental. Pickup: 8983 Okeechobee Blvd\\, West Palm Beach\\, FL 33411`,
    `LOCATION:8983 Okeechobee Blvd\\, West Palm Beach\\, FL 33411`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
}

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id) {
    notFound()
  }

  let booking: {
    id: string
    firstName: string
    lastName: string
    email: string
    startDate: string
    endDate: string
    days: number
    passengerCount: number
    tripType: string | null
    depositAmount: number
    balanceAmount: number
    subtotal: number
    addOns: { id: string; name: string; price: number }[]
  } | null = null

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id)
    if (session.payment_status !== 'paid') {
      notFound()
    }
    const found = await prisma.rentalBooking.findFirst({
      where: { stripeSessionId: session_id },
      include: { addOns: true },
    })
    if (!found) notFound()
    booking = {
      id: found.id,
      firstName: found.firstName,
      lastName: found.lastName,
      email: found.email,
      startDate: found.startDate,
      endDate: found.endDate,
      days: found.days,
      passengerCount: found.passengerCount,
      tripType: found.tripType,
      depositAmount: found.depositAmount,
      balanceAmount: found.balanceAmount,
      subtotal: found.subtotal,
      addOns: found.addOns.map((a) => ({ id: a.id, name: a.name, price: a.price })),
    }
  } catch {
    notFound()
  }

  if (!booking) notFound()

  const bookingRef = booking.id.slice(0, 8).toUpperCase()
  const icsData = generateIcs(booking.startDate, booking.endDate, booking.firstName)
  const icsHref = `data:text/calendar;charset=utf-8,${encodeURIComponent(icsData)}`

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">
      <PublicNav />

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-24">
        {/* Hero */}
        <div className="text-center mb-12">
          <CheckCircle
            size={52}
            className="text-[#c9a96e] mx-auto mb-6"
            strokeWidth={1.5}
          />
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
            Deposit Received
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-4">
            You&apos;re Confirmed.
          </h1>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-5" />
          <p className="text-[#a09890] leading-relaxed">
            Your deposit has been received. Here&apos;s everything you need to know.
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="border border-[#c9a96e]/40 bg-[#1a1612] divide-y divide-[#433d38]/40 mb-8">
          <div className="px-6 py-4">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">
              Booking Reference
            </p>
            <p className="font-mono text-xl text-[#f0e6d0]">{bookingRef}</p>
          </div>

          <div className="px-6 py-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-[#5f5850] mb-1">Dates</p>
              <p className="text-[#f0e6d0]">
                {booking.startDate} → {booking.endDate}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#5f5850] mb-1">Duration</p>
              <p className="text-[#f0e6d0]">
                {booking.days} {booking.days === 1 ? 'day' : 'days'}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#5f5850] mb-1">Passengers</p>
              <p className="text-[#f0e6d0]">{booking.passengerCount}</p>
            </div>
            {booking.tripType && (
              <div>
                <p className="text-xs text-[#5f5850] mb-1">Trip Type</p>
                <p className="text-[#f0e6d0]">{booking.tripType}</p>
              </div>
            )}
          </div>

          {booking.addOns.length > 0 && (
            <div className="px-6 py-4">
              <p className="text-xs text-[#5f5850] mb-2">Add-Ons</p>
              <div className="space-y-1">
                {booking.addOns.map((a) => (
                  <div key={a.id} className="flex justify-between text-sm">
                    <span className="text-[#a09890]">{a.name}</span>
                    <span className="text-[#f0e6d0]">{fmt(a.price)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="px-6 py-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-[#5f5850]">Total paid today (deposit)</span>
              <span className="text-[#c9a96e] font-semibold">{fmt(booking.depositAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#5f5850]">Balance due</span>
              <span className="text-[#f0e6d0]">
                {fmt(booking.balanceAmount)} — 24 hours before departure (charged automatically)
              </span>
            </div>
          </div>
        </div>

        {/* Pickup Location — only shown after payment */}
        <div className="border border-[#c9a96e]/40 bg-[#1a1612] mb-8">
          <div className="px-6 py-3 border-b border-[#c9a96e]/20">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e]">
              Pickup &amp; Return
            </p>
          </div>
          <div className="px-6 py-5">
            <p className="text-[#f0e6d0] font-medium mb-1">8983 Okeechobee Blvd</p>
            <p className="text-[#f0e6d0] mb-3">West Palm Beach, FL 33411</p>
            <p className="text-sm text-[#5f5850]">Pickup and return at same location.</p>
            <p className="text-sm text-[#5f5850]">Exact timing confirmed via email.</p>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="mb-8">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">
            What Happens Next
          </p>
          <div className="space-y-4">
            {[
              'Check your email — confirmation and receipt on the way.',
              "We'll reach out 48 hours before to confirm your pickup time.",
              'Balance charged automatically 24 hours before departure.',
              'Pickup day: van is ready, stocked per your requests, fueled and clean.',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-7 h-7 border border-[#c9a96e]/50 flex items-center justify-center text-xs text-[#c9a96e] shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-[#a09890] leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Trip Quick Reference */}
        <div className="border border-[#433d38]/50 bg-[#1a1612] mb-8">
          <div className="px-6 py-3 border-b border-[#433d38]/40">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e]">
              Read Before You Drive
            </p>
          </div>
          <div className="px-6 py-5 space-y-4 text-sm text-[#a09890] leading-relaxed">
            <p>
              <span className="text-[#f0e6d0] font-medium">⛽ DIESEL ONLY</span> — Do not put
              regular or premium gasoline in this vehicle. Wrong fuel = catastrophic engine
              damage. Renter liability.
            </p>
            <p>
              <span className="text-[#f0e6d0] font-medium">🌉 BRIDGE CLEARANCE</span> — 10&apos;6&quot;
              minimum clearance required. Do not attempt low bridges, parking garages, or
              drive-throughs without confirming height.
            </p>
            <p>
              <span className="text-[#f0e6d0] font-medium">🚽 DUMP THE TANKS</span> — Black and
              grey water tanks must be dumped at or before return. $125 fee for
              non-compliance. No exceptions, no member waivers.
            </p>
            <p>
              <span className="text-[#f0e6d0] font-medium">🚭 NO SMOKING</span> — Anywhere inside
              the vehicle. $350 fee. No exceptions.
            </p>
            <p>
              <span className="text-[#f0e6d0] font-medium">⛽ RETURN FUEL FULL</span> — Same
              diesel level as departure. Failure to refill: fuel cost + $35.
            </p>
            <p>
              <span className="text-[#f0e6d0] font-medium">👥 10 PASSENGERS MAX</span> —
              Seatbelts required for all passengers.
            </p>
            <p>
              <span className="text-[#f0e6d0] font-medium">🕐 RETURN ON TIME</span> — Late
              returns: $95/hour first 3 hours, then full additional day at rack rate.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={icsHref}
            download="sterling-route-rental.ics"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#c9a96e] text-[#c9a96e] font-sans text-sm tracking-widest uppercase font-medium hover:bg-[#c9a96e]/10 transition-colors duration-200"
          >
            Add to Calendar
          </a>
          <Link
            href="/rental-terms"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#433d38]/60 text-[#a09890] font-sans text-sm tracking-widest uppercase font-medium hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors duration-200"
          >
            View Rental Terms
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
