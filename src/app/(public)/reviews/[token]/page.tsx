import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'
import { ReviewForm } from '@/components/reviews/ReviewForm'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Leave a Review — Sterling Route',
  robots: { index: false },
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  const { token } = await params

  const booking = await prisma.booking.findUnique({
    where: { bookingRef: token },
    include: { user: true, review: true },
  })

  const renderMessage = (heading: string, sub: string) => (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">
      <PublicNav />
      <div className="max-w-lg mx-auto px-6 pt-28 pb-24 text-center">
        <div className="w-16 h-px bg-[#433d38] mx-auto mb-8" />
        <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-3">Review</p>
        <h1 className="font-serif text-2xl text-[#a09890] mb-4">{heading}</h1>
        <p className="text-sm text-[#5f5850]">{sub}</p>
      </div>
      <Footer />
    </div>
  )

  if (!booking) {
    return renderMessage(
      'This review link is invalid.',
      'The link may have expired or the booking reference is incorrect.'
    )
  }

  if (booking.review) {
    return renderMessage(
      'This review has already been submitted.',
      'You can only leave one review per trip. Thank you for the feedback.'
    )
  }

  if (booking.status !== 'COMPLETED') {
    return renderMessage(
      'Your trip isn\'t complete yet.',
      'Review links are sent after your trip is marked complete. Check back after your rental ends.'
    )
  }

  const firstName = booking.user.name?.split(' ')[0] ?? 'there'

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f0e6d0]">
      <PublicNav />

      <div className="max-w-2xl mx-auto px-6 pt-24 pb-24">
        <div className="mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Post-Trip Review</p>
          <h1 className="font-serif text-4xl text-[#f0e6d0] mb-4">
            How was your trip, {firstName}?
          </h1>
          <p className="text-[#5f5850] text-sm leading-relaxed max-w-md">
            Booking ref <span className="text-[#a09890]">#{booking.bookingRef}</span> · {new Date(booking.pickupAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="border-t border-[#2a2724] pt-10">
          <ReviewForm bookingRef={booking.bookingRef} firstName={firstName} />
        </div>
      </div>

      <Footer />
    </div>
  )
}
