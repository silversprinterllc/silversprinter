import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      firstName,
      lastName,
      email,
      phone,
      startDate,
      endDate,
      passengerCount,
      tripType,
      tripTypeOther,
      specialRequests,
      hearAboutUs,
      addOns,
      pricing,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !startDate || !endDate || !tripType) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    if (!pricing) {
      return NextResponse.json({ error: 'Pricing data missing.' }, { status: 400 })
    }

    // Check date availability — no overlapping CONFIRMED or PENDING bookings
    const overlapping = await prisma.rentalBooking.findFirst({
      where: {
        status: { in: ['PENDING', 'CONFIRMED'] },
        AND: [
          { startDate: { lte: endDate } },
          { endDate: { gte: startDate } },
        ],
      },
    })

    if (overlapping) {
      return NextResponse.json(
        { error: 'Those dates are unavailable. Please select different dates.' },
        { status: 409 }
      )
    }

    // Create the booking
    const reviewToken = crypto.randomUUID()

    const booking = await prisma.rentalBooking.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        startDate,
        endDate,
        days: pricing.days,
        passengerCount: passengerCount ?? 1,
        tripType,
        tripTypeOther: tripType === 'Other' ? tripTypeOther : null,
        specialRequests: specialRequests || null,
        hearAboutUs: hearAboutUs || null,
        dailyRate: pricing.avgRate ?? 995,
        baseTotal: pricing.baseTotal,
        addonsTotal: pricing.addonsTotal,
        subtotal: pricing.subtotal,
        depositAmount: pricing.deposit,
        balanceAmount: pricing.balance,
        status: 'PENDING',
        reviewToken,
        addOns: {
          create: Array.isArray(addOns)
            ? addOns.map((a: { name: string; price: number }) => ({
                name: a.name,
                price: a.price,
              }))
            : [],
        },
      },
    })

    const days = pricing.days as number
    const depositAmountCents = Math.round(pricing.deposit * 100)
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL || 'https://sterlingroute.com'

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Sterling Route — ${days} Day Rental`,
              description: `${startDate} to ${endDate} · Deposit (35%)`,
            },
            unit_amount: depositAmountCents,
          },
          quantity: 1,
        },
      ],
      customer_email: email,
      metadata: {
        bookingId: booking.id,
      },
      success_url: `${appUrl}/book/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/book?cancelled=true`,
    })

    // Update booking with stripe session id
    await prisma.rentalBooking.update({
      where: { id: booking.id },
      data: { stripeSessionId: session.id },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: unknown) {
    console.error('Booking create error:', error)
    const message =
      error instanceof Error ? error.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
