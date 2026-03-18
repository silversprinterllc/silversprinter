export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createBooking } from '@/services/booking.service'
import { z } from 'zod'

const createBookingSchema = z.object({
  vehicleId: z.string(),
  serviceType: z.enum(['AIRPORT_TRANSFER', 'HOURLY_CHARTER', 'EVENT', 'WEDDING', 'CORPORATE', 'MULTI_DAY_TOUR']),
  pickupAddress: z.string().min(1),
  pickupLat: z.number().optional(),
  pickupLng: z.number().optional(),
  destinationAddress: z.string().min(1),
  destinationLat: z.number().optional(),
  destinationLng: z.number().optional(),
  pickupAt: z.string(),
  estimatedHours: z.number().optional(),
  estimatedDays: z.number().optional(),
  passengers: z.number().min(1).max(20).default(1),
  addonIds: z.array(z.string()).default([]),
  chauffeurId: z.string().optional(),
  cabinTemp: z.number().optional(),
  musicPreference: z.string().optional(),
  lightingMood: z.string().optional(),
  welcomeNote: z.string().optional(),
  notes: z.string().optional(),
  corporateAccountId: z.string().optional(),
  poNumber: z.string().optional(),
})

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const where: any = { userId: session.user.id }
  if (status) where.status = status

  const bookings = await prisma.booking.findMany({
    where,
    include: { vehicle: true, chauffeur: true, addons: true },
    orderBy: { pickupAt: 'desc' },
  })

  return NextResponse.json(bookings)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await req.json()
    const input = createBookingSchema.parse(body)
    const result = await createBooking(session.user.id, input)
    return NextResponse.json(result, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 })
  }
}
