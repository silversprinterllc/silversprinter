import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    if (!['DISPATCHER', 'SUPER_ADMIN'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const { verificationStatus } = await req.json()

    if (!['PENDING', 'CLEARED', 'FLAGGED'].includes(verificationStatus)) {
      return NextResponse.json(
        { error: 'verificationStatus must be PENDING, CLEARED, or FLAGGED.' },
        { status: 400 }
      )
    }

    const booking = await prisma.rentalBooking.update({
      where: { id },
      data: { verificationStatus },
    })

    return NextResponse.json({ booking })
  } catch (error: unknown) {
    console.error('Booking verify error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
