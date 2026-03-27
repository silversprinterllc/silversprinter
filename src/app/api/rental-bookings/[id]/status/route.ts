import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendReviewRequest } from '@/lib/emails/send'

const VALID_STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await req.json()

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      )
    }

    const booking = await prisma.rentalBooking.update({
      where: { id },
      data: { status },
    })

    // When a booking is marked COMPLETED, send the review request email
    if (status === 'COMPLETED') {
      const reviewToken = booking.reviewToken ?? booking.id

      // If reviewToken is not yet set on the booking, persist a generated one
      if (!booking.reviewToken) {
        try {
          await prisma.rentalBooking.update({
            where: { id: booking.id },
            data: { reviewToken: booking.id },
          })
        } catch (err) {
          console.error('Failed to set reviewToken:', err)
        }
      }

      try {
        await sendReviewRequest(booking.email, {
          firstName: booking.firstName,
          bookingRef: booking.id,
          reviewToken,
          tripType: booking.tripType || 'Self-Drive Rental',
        })
      } catch (emailError) {
        console.error('Review request email failed:', emailError)
        // Don't throw — status update succeeded
      }
    }

    return NextResponse.json({ booking })
  } catch (error: unknown) {
    console.error('Rental booking status update error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
