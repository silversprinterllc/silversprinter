import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis'

export async function recordTrackingPoint(
  bookingId: string,
  lat: number,
  lng: number,
  heading?: number,
  speed?: number
) {
  await prisma.tripTracking.create({ data: { bookingId, lat, lng, heading, speed } })
  await redis.publish(`tracking:${bookingId}`, JSON.stringify({ lat, lng, heading, speed, ts: Date.now() }))
}

export async function getLatestTrackingPoint(bookingId: string) {
  return prisma.tripTracking.findFirst({
    where: { bookingId },
    orderBy: { recordedAt: 'desc' },
  })
}
