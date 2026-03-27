import { NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { sendBookingConfirmation, sendOwnerBookingNotification } from '@/lib/emails/send'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const bookingId = session.metadata?.bookingId

    if (bookingId) {
      let booking: Awaited<ReturnType<typeof prisma.rentalBooking.update>> | null = null
      try {
        booking = await prisma.rentalBooking.update({
          where: { id: bookingId },
          data: {
            status: 'CONFIRMED',
          },
        })
      } catch (err) {
        console.error('Failed to update rental booking status:', err)
      }

      if (booking) {
        // Fetch add-ons for the booking
        let addOnNames: string[] = []
        try {
          const addOns = await prisma.rentalBookingAddOn.findMany({
            where: { bookingId: booking.id },
            select: { name: true },
          })
          addOnNames = addOns.map((a) => a.name)
        } catch (err) {
          console.error('Failed to fetch add-ons:', err)
        }

        // Send confirmation email to renter
        try {
          await sendBookingConfirmation(booking.email, {
            firstName: booking.firstName,
            bookingRef: booking.id,
            startDate: booking.startDate,
            endDate: booking.endDate,
            totalDays: booking.days,
            tripType: booking.tripType || 'Self-Drive Rental',
            passengers: booking.passengerCount,
            addOns: addOnNames,
            depositAmount: booking.depositAmount,
            balanceAmount: booking.balanceAmount,
            balanceDueDate: '48 hours before departure',
          })
        } catch (emailError) {
          console.error('Booking confirmation email failed:', emailError)
          // Don't throw — booking is confirmed even if email fails
        }

        // Send owner notification
        try {
          await sendOwnerBookingNotification({
            firstName: booking.firstName,
            lastName: booking.lastName,
            email: booking.email,
            phone: booking.phone,
            bookingRef: booking.id,
            startDate: booking.startDate,
            endDate: booking.endDate,
            tripType: booking.tripType || 'Self-Drive Rental',
            passengers: booking.passengerCount,
            depositAmount: booking.depositAmount,
            totalAmount: booking.subtotal,
          })
        } catch (emailError) {
          console.error('Owner notification email failed:', emailError)
        }
      }
    }
  }

  return new Response('OK', { status: 200 })
}
