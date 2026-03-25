import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await req.json()

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be APPROVED or REJECTED.' },
        { status: 400 }
      )
    }

    const review = await prisma.rentalReview.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json({ review })
  } catch (error: unknown) {
    console.error('Review moderate error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
