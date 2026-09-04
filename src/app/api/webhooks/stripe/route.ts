import { NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendBookingConfirmation, sendOwnerBookingNotification } from '@/lib/emails/send'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingRef = session.metadata?.bookingRef
    const bookingId = session.metadata?.bookingId
    const isBalance = session.metadata?.type === 'balance'

    if (!bookingRef) return new Response('OK', { status: 200 })

    try {
      const booking = await prisma.booking.findUnique({
        where: { bookingRef },
        include: { user: true, addons: true },
      })

      if (!booking) return new Response('OK', { status: 200 })

      if (isBalance) {
        // Balance payment — mark booking as having balance paid
        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: 'CONFIRMED' },
        })
        return new Response('OK', { status: 200 })
      }

      // Deposit payment — confirm booking and block calendar
      const now = new Date()
      await prisma.booking.update({
        where: { id: booking.id },
        data: {
          status: 'CONFIRMED',
          depositPaidAt: now,
          stripePaymentIntentId: bookingId ?? session.id,
        },
      })

      // Block vehicle availability for the rental period
      // pickupAt is the start; end date is stored in notes as "End date: YYYY-MM-DD"
      const endDateMatch = booking.notes?.match(/End date: (\d{4}-\d{2}-\d{2})/)
      const endDateStr = endDateMatch?.[1]
      if (endDateStr) {
        const start = new Date(booking.pickupAt)
        const end = new Date(endDateStr + 'T12:00:00')
        const dates: Date[] = []
        const cursor = new Date(start)
        while (cursor <= end) {
          dates.push(new Date(cursor))
          cursor.setDate(cursor.getDate() + 1)
        }
        await Promise.all(
          dates.map((d) =>
            prisma.vehicleAvailability.upsert({
              where: { vehicleId_date: { vehicleId: booking.vehicleId, date: d } },
              update: { isBlocked: true, reason: `Booking ${bookingRef}` },
              create: { vehicleId: booking.vehicleId, date: d, isBlocked: true, reason: `Booking ${bookingRef}` },
            })
          )
        )
      }

      // Award loyalty points (100 pts per rental day)
      const daysMatch = booking.notes?.match(/End date: (\d{4}-\d{2}-\d{2})/)
      const endDateForPoints = daysMatch?.[1]
      if (endDateForPoints) {
        const days = Math.max(
          1,
          Math.round(
            (new Date(endDateForPoints).getTime() - booking.pickupAt.getTime()) / (1000 * 60 * 60 * 24)
          )
        )
        const pts = days * 100
        await prisma.$transaction([
          prisma.loyaltyTransaction.create({
            data: { userId: booking.userId, points: pts, reason: 'BOOKING_COMPLETED', bookingId: booking.id },
          }),
          prisma.user.update({
            where: { id: booking.userId },
            data: { loyaltyPoints: { increment: pts } },
          }),
        ])
      }

      // Send confirmation email with real data
      const firstName = booking.user.name?.split(' ')[0] ?? 'Guest'
      const lastName = booking.user.name?.split(' ').slice(1).join(' ') ?? ''
      const startDate = booking.pickupAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
      const endDateFmt = endDateStr
        ? new Date(endDateStr + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
        : startDate
      const totalDays = endDateStr
        ? Math.max(1, Math.round((new Date(endDateStr).getTime() - booking.pickupAt.getTime()) / (1000 * 60 * 60 * 24)))
        : 1
      const addOnNames = booking.addons.map((a) => a.name)
      const total = Number(booking.totalAmount)
      const deposit = Number(booking.depositAmount)
      const balance = total - deposit
      const balanceDue = new Date(booking.pickupAt.getTime() - 48 * 60 * 60 * 1000)
        .toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

      await sendBookingConfirmation(booking.user.email, {
        firstName,
        bookingRef,
        startDate,
        endDate: endDateFmt,
        totalDays,
        tripType: booking.destinationAddress || 'Self-Drive Rental',
        passengers: booking.passengers,
        addOns: addOnNames,
        depositAmount: deposit,
        balanceAmount: balance,
        balanceDueDate: balanceDue,
      }).catch((e) => console.error('Confirmation email failed:', e))

      await sendOwnerBookingNotification({
        firstName,
        lastName,
        email: booking.user.email,
        phone: booking.user.phone ?? '',
        bookingRef,
        startDate,
        endDate: endDateFmt,
        tripType: booking.destinationAddress || 'Self-Drive Rental',
        passengers: booking.passengers,
        depositAmount: deposit,
        totalAmount: total,
      }).catch((e) => console.error('Owner notification failed:', e))
    } catch (err) {
      console.error('Webhook processing error:', err)
    }
  }

  return new Response('OK', { status: 200 })
}
