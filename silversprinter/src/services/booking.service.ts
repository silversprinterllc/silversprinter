import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { calculateQuote } from './pricing.service'
import { checkAvailability } from './availability.service'
import { generateBookingRef } from '@/lib/utils'
import type { CreateBookingInput } from '@/types/booking'

export async function createBooking(userId: string, input: CreateBookingInput) {
  const pickupAt = new Date(input.pickupAt)
  const durationMinutes = input.estimatedHours ? input.estimatedHours * 60 : 120

  // Server-side availability check
  const { available } = await checkAvailability(input.vehicleId, pickupAt, pickupAt, durationMinutes)
  if (!available) throw new Error('Vehicle is not available for the requested time')

  // Server-side price calculation
  const user = await prisma.user.findUnique({ where: { id: userId } })
  const quote = await calculateQuote({
    vehicleId: input.vehicleId,
    serviceType: input.serviceType,
    pickupAt,
    estimatedHours: input.estimatedHours,
    estimatedDays: input.estimatedDays,
    addonIds: input.addonIds,
    corporateAccountId: input.corporateAccountId,
    loyaltyTier: user?.loyaltyTier,
  })

  // Create Stripe PaymentIntent for deposit
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(quote.depositAmount * 100),
    currency: 'usd',
    metadata: { userId, vehicleId: input.vehicleId },
    automatic_payment_methods: { enabled: true },
  })

  // Create booking in DB
  const booking = await prisma.booking.create({
    data: {
      bookingRef: generateBookingRef(),
      userId,
      vehicleId: input.vehicleId,
      chauffeurId: input.chauffeurId,
      corporateAccountId: input.corporateAccountId,
      serviceType: input.serviceType,
      status: 'PENDING',
      pickupAddress: input.pickupAddress,
      pickupLat: input.pickupLat,
      pickupLng: input.pickupLng,
      destinationAddress: input.destinationAddress,
      destinationLat: input.destinationLat,
      destinationLng: input.destinationLng,
      pickupAt,
      estimatedDuration: durationMinutes,
      passengers: input.passengers,
      notes: input.notes,
      poNumber: input.poNumber,
      cabinTemp: input.cabinTemp,
      musicPreference: input.musicPreference,
      lightingMood: input.lightingMood,
      welcomeNote: input.welcomeNote,
      baseAmount: quote.baseAmount,
      extrasAmount: quote.extrasAmount,
      gratuityAmount: quote.gratuityAmount,
      serviceFeeAmount: quote.serviceFeeAmount,
      totalAmount: quote.totalAmount,
      depositAmount: quote.depositAmount,
      stripePaymentIntentId: paymentIntent.id,
      addons: input.addonIds.length > 0 ? {
        create: await buildAddonRecords(input.addonIds),
      } : undefined,
    },
  })

  return { booking, clientSecret: paymentIntent.client_secret }
}

async function buildAddonRecords(addonIds: string[]) {
  const addons = await prisma.addon.findMany({ where: { id: { in: addonIds } } })
  return addons.map((a) => ({
    addonId: a.id,
    name: a.name,
    price: a.price,
  }))
}
