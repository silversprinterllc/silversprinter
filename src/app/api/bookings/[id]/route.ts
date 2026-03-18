import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const booking = await prisma.booking.findUnique({
    where: { id },
    include: { vehicle: true, chauffeur: true, addons: true, tracking: { orderBy: { recordedAt: 'desc' }, take: 1 } },
  })

  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  if (booking.userId !== session.user.id && !['DISPATCHER', 'SUPER_ADMIN'].includes(session.user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  return NextResponse.json(booking)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const booking = await prisma.booking.findUnique({ where: { id } })
  if (!booking) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const isDispatcher = ['DISPATCHER', 'SUPER_ADMIN'].includes(session.user.role)
  if (booking.userId !== session.user.id && !isDispatcher) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const body = await req.json()
  const updated = await prisma.booking.update({ where: { id }, data: body })
  return NextResponse.json(updated)
}
