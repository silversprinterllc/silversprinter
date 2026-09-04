import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { token, rating, body, renterName } = await req.json()

    if (!token || !rating || !body || !renterName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be 1–5.' }, { status: 400 })
    }

    if (body.trim().length < 20) {
      return NextResponse.json({ error: 'Review must be at least 20 characters.' }, { status: 400 })
    }

    const booking = await prisma.booking.findUnique({
      where: { bookingRef: token },
      include: { review: true },
    })

    if (!booking) {
      return NextResponse.json({ error: 'Invalid review link.' }, { status: 404 })
    }

    if (booking.status !== 'COMPLETED') {
      return NextResponse.json({ error: 'Reviews can only be submitted for completed trips.' }, { status: 400 })
    }

    if (booking.review) {
      return NextResponse.json({ error: 'A review has already been submitted for this booking.' }, { status: 409 })
    }

    await prisma.review.create({
      data: {
        bookingId: booking.id,
        userId: booking.userId,
        rating,
        comment: body.trim(),
      },
    })

    return NextResponse.json({ success: true })
  } catch (error: unknown) {
    console.error('Review submit error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
