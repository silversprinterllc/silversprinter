import { prisma } from '@/lib/prisma'
import { isSurgePeriod, isHoliday } from '@/lib/utils'
import type { ServiceType } from '@prisma/client'
import type { QuoteInput, QuoteResult, LineItem } from '@/types/booking'

const SERVICE_FEE = Number(process.env.SERVICE_FEE) || 12
const DEPOSIT_PCT = Number(process.env.DEPOSIT_PERCENTAGE) || 20
const GRATUITY_PCT = Number(process.env.SUGGESTED_GRATUITY_PERCENTAGE) || 20
const CORPORATE_DISCOUNT = 0.05
const SURGE_MULTIPLIER = 1.25

export async function calculateQuote(input: QuoteInput): Promise<QuoteResult> {
  const vehicle = await prisma.vehicle.findUnique({ where: { id: input.vehicleId } })
  if (!vehicle) throw new Error('Vehicle not found')

  const basePrice = Number(vehicle.basePrice)
  const hourlyRate = vehicle.pricePerHour ? Number(vehicle.pricePerHour) : basePrice * 0.8
  const dailyRate = vehicle.pricePerDay ? Number(vehicle.pricePerDay) : basePrice * 5.5

  const lineItems: LineItem[] = []
  let baseAmount = 0

  switch (input.serviceType as ServiceType) {
    case 'AIRPORT_TRANSFER':
      baseAmount = basePrice
      lineItems.push({ label: 'Airport Transfer', amount: baseAmount })
      break
    case 'HOURLY_CHARTER': {
      const hours = Math.max(input.estimatedHours || 2, 2)
      baseAmount = hourlyRate * hours
      lineItems.push({ label: `Hourly Charter (${hours}h × $${hourlyRate})`, amount: baseAmount })
      break
    }
    case 'EVENT':
    case 'WEDDING':
      baseAmount = basePrice * 1.5
      lineItems.push({ label: `${input.serviceType === 'WEDDING' ? 'Wedding' : 'Event'} Package`, amount: baseAmount })
      break
    case 'CORPORATE':
      baseAmount = basePrice
      lineItems.push({ label: 'Corporate Transfer', amount: baseAmount })
      break
    case 'MULTI_DAY_TOUR': {
      const days = Math.max(input.estimatedDays || 1, 1)
      baseAmount = dailyRate * days
      lineItems.push({ label: `Multi-Day Tour (${days}d × $${dailyRate})`, amount: baseAmount })
      break
    }
    default:
      baseAmount = basePrice
      lineItems.push({ label: 'Transfer', amount: baseAmount })
  }

  // Corporate discount
  if (input.corporateAccountId) {
    const discount = baseAmount * CORPORATE_DISCOUNT
    baseAmount -= discount
    lineItems.push({ label: 'Corporate Discount (5%)', amount: -discount })
  }

  // Loyalty tier discount
  const tierDiscounts: Record<string, number> = { GOLD: 0.05, PLATINUM: 0.10, BLACK: 0.15 }
  if (input.loyaltyTier && tierDiscounts[input.loyaltyTier]) {
    const discount = baseAmount * tierDiscounts[input.loyaltyTier]
    baseAmount -= discount
    lineItems.push({ label: `${input.loyaltyTier} Member Discount`, amount: -discount })
  }

  // Surge pricing
  let isSurgePriced = false
  let surgeMultiplier: number | undefined
  if (isSurgePeriod(input.pickupAt) || isHoliday(input.pickupAt)) {
    isSurgePriced = true
    surgeMultiplier = SURGE_MULTIPLIER
    const surgeAdd = baseAmount * (SURGE_MULTIPLIER - 1)
    baseAmount = baseAmount * SURGE_MULTIPLIER
    lineItems.push({ label: 'Surge Pricing (1.25×)', amount: surgeAdd })
  }

  // Addons
  let extrasAmount = 0
  if (input.addonIds.length > 0) {
    const addons = await prisma.addon.findMany({ where: { id: { in: input.addonIds } } })
    for (const addon of addons) {
      const price = Number(addon.price)
      extrasAmount += price
      lineItems.push({ label: addon.name, amount: price })
    }
  }

  const gratuityAmount = Math.round(baseAmount * (GRATUITY_PCT / 100) * 100) / 100
  const serviceFeeAmount = SERVICE_FEE
  const totalAmount = baseAmount + extrasAmount + serviceFeeAmount
  const depositAmount = Math.round(totalAmount * (DEPOSIT_PCT / 100) * 100) / 100
  const balanceAmount = totalAmount - depositAmount

  lineItems.push({ label: 'Service Fee', amount: serviceFeeAmount })

  return {
    baseAmount: Math.round(baseAmount * 100) / 100,
    extrasAmount: Math.round(extrasAmount * 100) / 100,
    gratuityAmount,
    serviceFeeAmount,
    totalAmount: Math.round(totalAmount * 100) / 100,
    depositAmount,
    balanceAmount: Math.round(balanceAmount * 100) / 100,
    lineItems,
    isSurgePriced,
    surgeMultiplier,
  }
}
