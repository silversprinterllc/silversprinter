import { prisma } from '@/lib/prisma'
import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'
import { ReviewForm } from './ReviewForm'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Leave a Review — Sterling Route',
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  let booking: {
    id: string
    firstName: string
    lastName: string
    status: string
    tripType: string | null
    review: { id: string } | null
  } | null = null

  try {
    const found = await prisma.rentalBooking.findUnique({
      where: { reviewToken: token },
      include: { review: { select: { id: true } } },
    })
    if (found) {
      booking = {
        id: found.id,
        firstName: found.firstName,
        lastName: found.lastName,
        status: found.status,
        tripType: found.tripType,
        review: found.review,
      }
    }
  } catch {
    // DB error — treat as not found
  }

  if (!booking || booking.review) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">
        <PublicNav />
        <div className="max-w-lg mx-auto px-6 pt-28 pb-24 text-center">
          <div className="w-16 h-px bg-[#433d38] mx-auto mb-8" />
          <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-3">Review</p>
          <h1 className="font-serif text-2xl text-[#a09890]">
            This review link is invalid or has already been used.
          </h1>
        </div>
        <Footer />
      </div>
    )
  }

  const defaultName = `${booking.firstName} ${booking.lastName}`

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">
      <PublicNav />

      <div className="max-w-lg mx-auto px-6 pt-28 pb-24">
        <div className="mb-10">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">
            Sterling Route
          </p>
          <h1 className="font-serif text-4xl text-[#f0e6d0] mb-3">
            Share Your Experience
          </h1>
          <div className="w-16 h-px bg-[#c9a96e] mb-5" />
          <p className="text-sm text-[#a09890] leading-relaxed">
            Thank you for riding with Sterling Route. Your feedback helps us improve and
            helps others plan their trip.
          </p>
        </div>

        <ReviewForm
          token={token}
          defaultName={defaultName}
          tripType={booking.tripType}
        />
      </div>

      <Footer />
    </div>
  )
}
