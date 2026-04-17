import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Leave a Review — Sterling Route',
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ token: string }>
}) {
  // Review token lookup pending schema migration
  void (await params)

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
