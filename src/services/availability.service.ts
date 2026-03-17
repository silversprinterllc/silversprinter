import { prisma } from '@/lib/prisma'
import { addMinutes, startOfDay, endOfDay } from 'date-fns'
import type { ServiceType } from '@prisma/client'

const BUFFER_MINUTES = 90

export async function checkAvailability(
  vehicleId: string,
  date: Date,
  startTime: Date,
  durationMinutes: number
): Promise<{ available: boolean; nextAvailableSlot?: Date; conflicts?: any[] }> {
  const blocked = await prisma.vehicleAvailability.findFirst({
    where: { vehicleId, date: startOfDay(date), isBlocked: true },
  })
  if (blocked) return { available: false }

  const requestedEnd = addMinutes(startTime, durationMinutes + BUFFER_MINUTES)

  const conflicts = await prisma.booking.findMany({
    where: {
      vehicleId,
      status: { in: ['CONFIRMED', 'CHAUFFEUR_ASSIGNED', 'EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'] },
      pickupAt: { gte: startOfDay(date), lte: endOfDay(date) },
    },
    select: { pickupAt: true, estimatedDuration: true },
  })

  for (const booking of conflicts) {
    const bookingEnd = addMinutes(booking.pickupAt, (booking.estimatedDuration || 120) + BUFFER_MINUTES)
    const overlaps = startTime < bookingEnd && requestedEnd > booking.pickupAt
    if (overlaps) return { available: false, conflicts }
  }

  return { available: true }
}

export async function getAvailableVehicles(
  date: Date,
  serviceType: ServiceType,
  passengers: number
): Promise<any[]> {
  const allVehicles = await prisma.vehicle.findMany({
    where: { status: 'AVAILABLE', capacity: { gte: passengers } },
  })

  const available: any[] = []
  for (const vehicle of allVehicles) {
    const { available: isAvail } = await checkAvailability(vehicle.id, date, date, 120)
    if (isAvail) available.push(vehicle)
  }
  return available
}
