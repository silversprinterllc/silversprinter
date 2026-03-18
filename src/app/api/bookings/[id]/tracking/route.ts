import { NextRequest, NextResponse } from 'next/server'
import { recordTrackingPoint } from '@/services/tracking.service'
import { z } from 'zod'

const trackingSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  heading: z.number().optional(),
  speed: z.number().optional(),
})

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const data = trackingSchema.parse(body)
  await recordTrackingPoint(id, data.lat, data.lng, data.heading, data.speed)
  return NextResponse.json({ ok: true })
}
