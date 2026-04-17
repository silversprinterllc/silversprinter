import { NextRequest } from 'next/server'
import type Stripe from 'stripe'
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
    const bookingRef = session.metadata?.bookingRef ?? session.id
    const customerEmail = session.customer_email ?? ''

    if (bookingRef && customerEmail) {
      // Send basic confirmation with available session data
      try {
        await sendBookingConfirmation(customerEmail, {
          firstName: session.customer_details?.name?.split(' ')[0] ?? 'Guest',
          bookingRef,
          startDate: '',
          endDate: '',
          totalDays: 1,
          tripType: 'Self-Drive Rental',
          passengers: 1,
          addOns: [],
          depositAmount: (session.amount_total ?? 0) / 100,
          balanceAmount: 0,
          balanceDueDate: '48 hours before departure',
        })
      } catch (emailError) {
        console.error('Booking confirmation email failed:', emailError)
      }

      try {
        await sendOwnerBookingNotification({
          firstName: session.customer_details?.name?.split(' ')[0] ?? 'Guest',
          lastName: session.customer_details?.name?.split(' ').slice(1).join(' ') ?? '',
          email: customerEmail,
          phone: '',
          bookingRef,
          startDate: '',
          endDate: '',
          tripType: 'Self-Drive Rental',
          passengers: 1,
          depositAmount: (session.amount_total ?? 0) / 100,
          totalAmount: (session.amount_total ?? 0) / 100,
        })
      } catch (emailError) {
        console.error('Owner notification email failed:', emailError)
      }
    }
  }

  return new Response('OK', { status: 200 })
}
