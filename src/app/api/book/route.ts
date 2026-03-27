import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const schema = z.object({
  vehicleId: z.string().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  tripType: z.string().min(1),
  passengers: z.number().min(1).max(10),
  selectedAddons: z.array(z.string()),
  serviceType: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  pickupCity: z.string(),
  destination: z.string(),
  requests: z.string(),
})

function getDayRate(dateStr: string): number {
  const d = new Date(dateStr + 'T12:00:00')
  const dow = d.getDay()
  if (dow === 5 || dow === 6 || dow === 0) return 1095
  return 795
}

function calcPricing(startDate: string, endDate: string) {
  const start = new Date(startDate + 'T12:00:00')
  const end = new Date(endDate + 'T12:00:00')
  const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)))
  let baseTotal = 0
  for (let i = 0; i < days; i++) {
    const d = new Date(start)
    d.setDate(d.getDate() + i)
    baseTotal += getDayRate(d.toISOString().split('T')[0])
  }
  return { days, baseTotal }
}

const SERVICE_TYPES = ['AIRPORT_TRANSFER','HOURLY_CHARTER','EVENT','WEDDING','CORPORATE','MULTI_DAY_TOUR'] as const
type ServiceType = typeof SERVICE_TYPES[number]

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const input = schema.parse(body)

    // Find or create user
    let user = await prisma.user.findUnique({ where: { email: input.email } })
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: input.email,
          name: `${input.firstName} ${input.lastName}`,
          phone: input.phone,
          role: 'CONSUMER',
        },
      })
    }

    // Fetch add-ons to get authoritative prices
    const addons = input.selectedAddons.length > 0
      ? await prisma.addon.findMany({ where: { id: { in: input.selectedAddons }, isActive: true } })
      : []

    // Calculate pricing server-side
    const { days, baseTotal } = calcPricing(input.startDate, input.endDate)
    const addonsTotal = addons.reduce((s, a) => s + Number(a.price), 0)
    const subtotal = baseTotal + addonsTotal
    const deposit = Math.ceil(subtotal * 0.35)
    const balance = subtotal - deposit

    // Validate service type
    const svcType: ServiceType = SERVICE_TYPES.includes(input.serviceType as ServiceType)
      ? (input.serviceType as ServiceType)
      : 'EVENT'

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId: user.id,
        vehicleId: input.vehicleId,
        serviceType: svcType,
        status: 'PENDING',
        pickupAt: new Date(input.startDate + 'T10:00:00'),
        pickupAddress: input.pickupCity || 'Palm Beach County, FL',
        destinationAddress: input.destination || input.tripType,
        passengers: input.passengers,
        notes: [
          input.requests,
          `Trip type: ${input.tripType}`,
          `End date: ${input.endDate}`,
          addons.length > 0 ? `Add-ons: ${addons.map(a => a.name).join(', ')}` : '',
        ].filter(Boolean).join('\n'),
        baseAmount: baseTotal,
        extrasAmount: addonsTotal,
        serviceFeeAmount: 0,
        gratuityAmount: 0,
        totalAmount: subtotal,
        depositAmount: deposit,
        addons: {
          create: addons.map(a => ({
            addonId: a.id,
            name: a.name,
            price: Number(a.price),
          })),
        },
      },
    })

    // Try Stripe checkout — skip if placeholder key
    const stripeKey = process.env.STRIPE_SECRET_KEY || ''
    if (!stripeKey.includes('placeholder')) {
      try {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://sterlingroute.com'

        // We only charge the deposit (35%)
        // Use a single line item for the deposit
        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          customer_email: input.email,
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: `Sterling Route Deposit — ${input.tripType}`,
                  description: `35% deposit for ${days}-day rental · ${input.startDate} → ${input.endDate}. Balance of $${balance.toFixed(0)} due 48 hours before departure.`,
                },
                unit_amount: Math.round(deposit * 100),
              },
              quantity: 1,
            },
          ],
          metadata: {
            bookingId: booking.id,
            bookingRef: booking.bookingRef,
          },
          success_url: `${appUrl}/book/success?ref=${booking.bookingRef}&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${appUrl}/book?cancelled=true`,
        })

        // Save Stripe session ID
        await prisma.booking.update({
          where: { id: booking.id },
          data: { stripePaymentIntentId: session.id },
        })

        return NextResponse.json({ bookingRef: booking.bookingRef, checkoutUrl: session.url })
      } catch (stripeErr) {
        console.error('Stripe error:', stripeErr)
        // Fall through to return booking without checkout URL
      }
    }

    // No Stripe — just return booking ref (manual payment flow)
    return NextResponse.json({ bookingRef: booking.bookingRef })
  } catch (err: unknown) {
    console.error('Booking error:', err)
    const message = err instanceof Error ? err.message : 'Booking failed'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
