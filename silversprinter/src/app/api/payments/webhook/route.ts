export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendBookingNotification } from '@/services/notification.service'
import { awardPoints } from '@/services/loyalty.service'
import { twilioClient, TWILIO_FROM } from '@/lib/twilio'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  let event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'payment_intent.succeeded': {
      const pi = event.data.object as any
      const booking = await prisma.booking.findFirst({
        where: { stripePaymentIntentId: pi.id },
      })
      if (booking) {
        await prisma.booking.update({
          where: { id: booking.id },
          data: { status: 'CONFIRMED', depositPaidAt: new Date() },
        })

        // Block dates on the vehicle calendar
        const pickupDate = new Date(booking.pickupAt)
        const days = Math.max(1, Math.ceil((booking.estimatedDuration || 120) / (24 * 60)))
        for (let i = 0; i < days; i++) {
          const d = new Date(pickupDate)
          d.setDate(d.getDate() + i)
          d.setHours(0, 0, 0, 0)
          await prisma.vehicleAvailability.upsert({
            where: { vehicleId_date: { vehicleId: booking.vehicleId, date: d } },
            update: { isBlocked: true, reason: `Booking ${booking.bookingRef}` },
            create: { vehicleId: booking.vehicleId, date: d, isBlocked: true, reason: `Booking ${booking.bookingRef}` },
          }).catch(() => {}) // non-fatal
        }

        await sendBookingNotification(booking.id, 'BOOKING_CONFIRMED')
        // SMS to owner
        if (process.env.TWILIO_TO_NUMBER) {
          twilioClient.messages.create({
            to: process.env.TWILIO_TO_NUMBER,
            from: TWILIO_FROM,
            body: `Sterling Route PAYMENT: $${(pi.amount / 100).toFixed(0)} deposit confirmed — Booking ${booking.bookingRef}`,
          }).catch(() => {})
        }
      }
      break
    }
    case 'payment_intent.payment_failed': {
      const pi = event.data.object as any
      await prisma.booking.updateMany({
        where: { stripePaymentIntentId: pi.id },
        data: { status: 'PENDING' },
      })
      break
    }
  }

  return NextResponse.json({ received: true })
}
