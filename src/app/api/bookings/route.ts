export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')

  const where: Record<string, unknown> = { email: session.user.email }
  if (status) where.status = status

  const bookings = await prisma.rentalBooking.findMany({
    where,
    include: { addOns: true },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(bookings)
}
