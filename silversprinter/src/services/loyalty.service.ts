import { prisma } from '@/lib/prisma'
import type { LoyaltyTier } from '@prisma/client'

const POINTS_PER_DOLLAR = 10
const REVIEW_BONUS = 50
const REFERRAL_BONUS = 200
const CORPORATE_MULTIPLIER = 2

const TIER_THRESHOLDS: Record<LoyaltyTier, number> = {
  SILVER: 0,
  GOLD: 1000,
  PLATINUM: 3000,
  BLACK: 7500,
}

function getTierForPoints(points: number): LoyaltyTier {
  if (points >= 7500) return 'BLACK'
  if (points >= 3000) return 'PLATINUM'
  if (points >= 1000) return 'GOLD'
  return 'SILVER'
}

export const TIER_PERKS = {
  SILVER: { discount: 0, description: 'Standard member' },
  GOLD: { discount: 0.05, description: '5% discount · Priority booking' },
  PLATINUM: { discount: 0.10, description: '10% discount · Complimentary upgrade once/month · Dedicated coordinator' },
  BLACK: { discount: 0.15, description: '15% discount · Always-on chauffeur preference · Free add-ons on every booking' },
}

export async function awardPoints(
  userId: string,
  reason: 'TRIP_COMPLETED' | 'REVIEW_LEFT' | 'REFERRAL' | 'REDEMPTION',
  bookingId?: string
) {
  let points = 0

  if (reason === 'TRIP_COMPLETED' && bookingId) {
    const booking = await prisma.booking.findUnique({ where: { id: bookingId } })
    if (!booking) return
    points = Math.floor(Number(booking.totalAmount) * POINTS_PER_DOLLAR)
    if (booking.corporateAccountId) points *= CORPORATE_MULTIPLIER
  } else if (reason === 'REVIEW_LEFT') {
    points = REVIEW_BONUS
  } else if (reason === 'REFERRAL') {
    points = REFERRAL_BONUS
  }

  if (points === 0) return

  await prisma.loyaltyTransaction.create({
    data: { userId, points, reason, bookingId },
  })

  const user = await prisma.user.update({
    where: { id: userId },
    data: { loyaltyPoints: { increment: points } },
  })

  const newTier = getTierForPoints(user.loyaltyPoints)
  if (newTier !== user.loyaltyTier) {
    await prisma.user.update({ where: { id: userId }, data: { loyaltyTier: newTier } })
  }

  return { points, newTier }
}

export async function getLoyaltySummary(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user) throw new Error('User not found')

  const tierOrder: LoyaltyTier[] = ['SILVER', 'GOLD', 'PLATINUM', 'BLACK']
  const currentIndex = tierOrder.indexOf(user.loyaltyTier)
  const nextTier = tierOrder[currentIndex + 1] as LoyaltyTier | undefined
  const pointsToNextTier = nextTier ? TIER_THRESHOLDS[nextTier] - user.loyaltyPoints : null

  const transactions = await prisma.loyaltyTransaction.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 20,
  })

  return {
    points: user.loyaltyPoints,
    tier: user.loyaltyTier,
    perks: TIER_PERKS[user.loyaltyTier],
    nextTier,
    pointsToNextTier,
    cashValue: user.loyaltyPoints / 100,
    transactions,
  }
}
