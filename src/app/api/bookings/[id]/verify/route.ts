import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { verificationStatus } = await req.json()

    if (!['PENDING', 'CLEARED', 'FLAGGED'].includes(verificationStatus)) {
      return NextResponse.json(
        { error: 'verificationStatus must be PENDING, CLEARED, or FLAGGED.' },
        { status: 400 }
      )
    }

    // verificationStatus field pending schema migration
    const booking = await prisma.booking.findUnique({
      where: { id },
    })
    void verificationStatus

    return NextResponse.json({ booking })
  } catch (error: unknown) {
    console.error('Booking verify error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
