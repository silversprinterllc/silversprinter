export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import { sendBookingNotification } from '@/services/notification.service'
import { awardPoints } from '@/services/loyalty.service'

async function sendOwnerSms(message: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const to = process.env.TWILIO_TO_NUMBER
  const from = process.env.TWILIO_FROM_NUMBER
  if (!sid || !token || !to || !from) {
    console.warn('[sms] Twilio env vars missing — skipping SMS')
    return
  }
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${sid}:${token}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ To: to, From: from, Body: message }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error('[sms] Twilio error:', res.status, err)
    }
  } catch (err) {
    console.error('[sms] fetch failed:', err)
  }
}

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
        await sendOwnerSms(
          `Sterling Route PAYMENT: $${(pi.amount / 100).toFixed(0)} deposit confirmed — Booking ${booking.bookingRef}`
        )
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
