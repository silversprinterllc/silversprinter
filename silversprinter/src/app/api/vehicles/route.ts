import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status') ?? 'AVAILABLE'

  const vehicles = await prisma.vehicle.findMany({
    where: { status: status as any },
    orderBy: { basePrice: 'asc' },
  })

  return NextResponse.json(vehicles)
}
