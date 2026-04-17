export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/availability?vehicleId=X&month=2026-04
 * Returns blocked dates for a vehicle in a given month.
 */
export async function GET(req: NextRequest) {
  const vehicleId = req.nextUrl.searchParams.get('vehicleId')
  const month = req.nextUrl.searchParams.get('month') // format: YYYY-MM

  if (!vehicleId || !month) {
    return NextResponse.json({ error: 'vehicleId and month required' }, { status: 400 })
  }

  const [year, mon] = month.split('-').map(Number)
  const startDate = new Date(year, mon - 1, 1)
  const endDate = new Date(year, mon, 0, 23, 59, 59) // last day of month

  // Get manually blocked dates from VehicleAvailability
  const manualBlocks = await prisma.vehicleAvailability.findMany({
    where: {
      vehicleId,
      date: { gte: startDate, lte: endDate },
      isBlocked: true,
    },
    select: { date: true, reason: true },
  })

  // Get dates with active bookings
  const activeBookings = await prisma.booking.findMany({
    where: {
      vehicleId,
      status: { in: ['CONFIRMED', 'CHAUFFEUR_ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'] },
      pickupAt: { gte: startDate, lte: endDate },
    },
    select: { pickupAt: true, estimatedDuration: true },
  })

  // Build set of blocked date strings (YYYY-MM-DD)
  const blockedDates = new Set<string>()

  for (const block of manualBlocks) {
    blockedDates.add(block.date.toISOString().split('T')[0])
  }

  for (const booking of activeBookings) {
    const pickupDate = new Date(booking.pickupAt)
    // Block the pickup day and any additional days based on duration
    const days = Math.max(1, Math.ceil((booking.estimatedDuration || 120) / (24 * 60)))
    for (let i = 0; i < days; i++) {
      const d = new Date(pickupDate)
      d.setDate(d.getDate() + i)
      blockedDates.add(d.toISOString().split('T')[0])
    }
  }

  return NextResponse.json(
    { blocked: Array.from(blockedDates).sort() },
    { headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
  )
}
