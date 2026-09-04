import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
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

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent?: string; booking_ref?: string }>
}) {
  const { payment_intent, booking_ref } = await searchParams

  if (!payment_intent && !booking_ref) {
    notFound()
  }

  const booking = await prisma.booking.findFirst({
    where: payment_intent
      ? { stripePaymentIntentId: payment_intent }
      : { bookingRef: booking_ref },
    include: { addons: true, vehicle: true },
  })

  if (!booking) notFound()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">
      <PublicNav />

      <div className="max-w-2xl mx-auto px-6 pt-28 pb-24">
        <div className="text-center mb-12">
          <CheckCircle size={52} className="text-[#c9a96e] mx-auto mb-6" strokeWidth={1.5} />
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
            Deposit Received
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-4">
            You&apos;re Confirmed.
          </h1>
          <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-5" />
          <p className="text-[#a09890] leading-relaxed">
            Your deposit has been received. We&apos;ll be in touch to confirm the details.
          </p>
        </div>

        <div className="border border-[#c9a96e]/40 bg-[#1a1612] divide-y divide-[#433d38]/40 mb-8">
          <div className="px-6 py-4">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c9a96e] mb-3">
              Booking Reference
            </p>
            <p className="font-mono text-xl text-[#f0e6d0]">
              {booking.bookingRef.slice(0, 8).toUpperCase()}
            </p>
          </div>

          <div className="px-6 py-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-[#5f5850] mb-1">Vehicle</p>
              <p className="text-[#f0e6d0]">{booking.vehicle.name}</p>
            </div>
            <div>
              <p className="text-xs text-[#5f5850] mb-1">Pickup</p>
              <p className="text-[#f0e6d0]">
                {new Date(booking.pickupAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#5f5850] mb-1">Service</p>
              <p className="text-[#f0e6d0]">{booking.serviceType.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <p className="text-xs text-[#5f5850] mb-1">Passengers</p>
              <p className="text-[#f0e6d0]">{booking.passengers}</p>
            </div>
          </div>

          <div className="px-6 py-4 text-sm">
            <div className="flex justify-between">
              <span className="text-[#5f5850]">Deposit paid today</span>
              <span className="text-[#c9a96e] font-semibold">
                {fmt(Number(booking.depositAmount))}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/portal"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#c9a96e] text-[#c9a96e] font-sans text-sm tracking-widest uppercase font-medium hover:bg-[#c9a96e]/10 transition-colors duration-200"
          >
            View My Bookings
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-[#433d38]/60 text-[#a09890] font-sans text-sm tracking-widest uppercase font-medium hover:border-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
