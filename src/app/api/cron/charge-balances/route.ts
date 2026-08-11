import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { sendBalanceReminder } from '@/lib/emails/send'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sterlingroute.com'
  const now = new Date()
  const windowStart = new Date(now.getTime() + 44 * 60 * 60 * 1000) // 44h from now
  const windowEnd = new Date(now.getTime() + 52 * 60 * 60 * 1000)   // 52h from now

  // Find confirmed bookings with deposit paid, pickup in the 48h window, balance not yet sent
  const bookings = await prisma.booking.findMany({
    where: {
      status: 'CONFIRMED',
      depositPaidAt: { not: null },
      pickupAt: { gte: windowStart, lte: windowEnd },
      notifications: { none: { type: 'BALANCE_REMINDER' } },
    },
    include: { user: true },
  })

  const results: Array<{ bookingRef: string; status: string; error?: string }> = []

  for (const booking of bookings) {
    try {
      const balance = Number(booking.totalAmount) - Number(booking.depositAmount)
      if (balance <= 0) {
        results.push({ bookingRef: booking.bookingRef, status: 'skipped_no_balance' })
        continue
      }

      // Create a Stripe Checkout Session for the balance
      let checkoutUrl: string | null = null
      const stripeKey = process.env.STRIPE_SECRET_KEY || ''
      if (!stripeKey.includes('placeholder')) {
        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          customer_email: booking.user.email,
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `Sterling Route Balance — Ref #${booking.bookingRef}`,
                  description: `Remaining balance due for your trip on ${booking.pickupAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.`,
                },
                unit_amount: Math.round(balance * 100),
              },
              quantity: 1,
            },
          ],
          metadata: { bookingId: booking.id, bookingRef: booking.bookingRef, type: 'balance' },
          success_url: `${appUrl}/book/success?ref=${booking.bookingRef}`,
          cancel_url: `${appUrl}/contact`,
          expires_at: Math.floor(booking.pickupAt.getTime() / 1000), // expires at pickup time
        })
        checkoutUrl = session.url
      }

      // Send balance reminder email
      const firstName = booking.user.name?.split(' ')[0] ?? 'there'
      await sendBalanceReminder(booking.user.email, {
        firstName,
        bookingRef: booking.bookingRef,
        startDate: booking.pickupAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
        balanceAmount: balance,
        pickupAddress: booking.pickupAddress,
        pickupTime: booking.pickupAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
      })

      // If we have a payment link, send a follow-up with it (append to email body via a second send)
      if (checkoutUrl) {
        await prisma.bookingNotification.create({
          data: { bookingId: booking.id, type: 'BALANCE_REMINDER', channel: 'EMAIL', status: `SENT|url=${checkoutUrl}` },
        })
      } else {
        await prisma.bookingNotification.create({
          data: { bookingId: booking.id, type: 'BALANCE_REMINDER', channel: 'EMAIL' },
        })
      }

      results.push({ bookingRef: booking.bookingRef, status: 'sent' })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'unknown error'
      console.error(`Balance reminder failed for ${booking.bookingRef}:`, msg)
      results.push({ bookingRef: booking.bookingRef, status: 'error', error: msg })
    }
  }

  return NextResponse.json({
    date: now.toISOString().slice(0, 10),
    processed: results.length,
    results,
  })
}
