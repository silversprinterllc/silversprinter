export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { calculateQuote } from '@/services/pricing.service'
import { redis } from '@/lib/redis'
import { z } from 'zod'

const quoteSchema = z.object({
  vehicleId: z.string(),
  serviceType: z.enum(['AIRPORT_TRANSFER', 'HOURLY_CHARTER', 'EVENT', 'WEDDING', 'CORPORATE', 'MULTI_DAY_TOUR']),
  pickupAt: z.string(),
  estimatedHours: z.number().optional(),
  estimatedDays: z.number().optional(),
  addonIds: z.array(z.string()).default([]),
  corporateAccountId: z.string().optional(),
  loyaltyTier: z.string().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const input = quoteSchema.parse(body)

    const cacheKey = `quote:${input.vehicleId}:${input.pickupAt}:${input.serviceType}:${input.addonIds.join(',')}`
    const cached = await redis.get(cacheKey).catch(() => null)
    if (cached) return NextResponse.json(JSON.parse(cached))

    const quote = await calculateQuote({ ...input, pickupAt: new Date(input.pickupAt) })

    await redis.setex(cacheKey, 300, JSON.stringify(quote)).catch(() => {})

    return NextResponse.json(quote)
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
