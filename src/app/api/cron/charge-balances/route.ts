import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendBalanceReminder, sendPreTripSOP } from '@/lib/emails/send'

export async function GET(request: NextRequest) {
  // Verify this is called by Vercel Cron
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Build day-after-tomorrow's date string in YYYY-MM-DD format (48 hours before departure)
  const dayAfterTomorrow = new Date()
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
  const departureDateStr = dayAfterTomorrow.toISOString().slice(0, 10) // "YYYY-MM-DD"

  // Query confirmed rental bookings departing in 2 days (balance due 48 hours before departure)
  // startDate is stored as a string (YYYY-MM-DD) in the schema
  let bookings: Awaited<ReturnType<typeof prisma.rentalBooking.findMany>> = []
  try {
    bookings = await prisma.rentalBooking.findMany({
      where: {
        status: 'CONFIRMED',
        startDate: departureDateStr,
      },
    })
  } catch (err) {
    console.error('DB query failed:', err)
    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }

  const results: Array<{ bookingId: string; status: string; error?: string }> = []

  for (const booking of bookings) {
    try {
      console.log(`Processing balance emails for booking ${booking.id} — departure ${departureDateStr}`)

      // TODO: Full Stripe balance charge requires payment method ID stored from initial checkout.
      // For now, we send pre-trip emails. Stripe charge logic can be added once
      // stripePaymentMethodId capture is implemented in the checkout flow.

      await sendBalanceReminder(booking.email, {
        firstName: booking.firstName,
        bookingRef: booking.id,
        startDate: booking.startDate,
        balanceAmount: booking.balanceAmount,
        pickupAddress: '8983 Okeechobee Blvd, West Palm Beach, FL 33411',
        pickupTime: '10:00 AM',
      })

      await sendPreTripSOP(booking.email, {
        firstName: booking.firstName,
        bookingRef: booking.id,
        startDate: booking.startDate,
        pickupAddress: '8983 Okeechobee Blvd, West Palm Beach, FL 33411',
        pickupTime: '10:00 AM',
        totalDays: booking.days,
      })

      results.push({ bookingId: booking.id, status: 'emails_sent' })
    } catch (err) {
      console.error(`Failed for booking ${booking.id}:`, err)
      results.push({ bookingId: booking.id, status: 'failed', error: String(err) })
    }
  }

  return NextResponse.json({
    date: departureDateStr,
    processed: results.length,
    results,
  })
}
