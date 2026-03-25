import Link from 'next/link'

export const metadata = {
  title: 'Booking Confirmed — Sterling Route',
}

export default async function BookSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; session_id?: string }>
}) {
  const { ref } = await searchParams

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="max-w-lg text-center">
        <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-8" />
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Deposit Received</p>
        <h1 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6">
          You&apos;re on the<br />Sterling Route.
        </h1>
        <p className="text-[#a09890] leading-relaxed mb-4">
          Your deposit has been received and your dates are reserved. A confirmation will arrive in your inbox shortly.
        </p>
        {ref && (
          <p className="text-sm text-[#5f5850] mb-4">
            Booking reference: <span className="text-[#c9a96e] font-mono">{ref}</span>
          </p>
        )}
        <p className="text-sm text-[#5f5850] leading-relaxed mb-10">
          We&apos;ll follow up within a few hours with your rental agreement and insurance verification through Outdoorsy. The remaining balance is due 24 hours before your departure date.
        </p>
        <div className="w-16 h-px bg-[#433d38] mx-auto mb-8" />
        <Link href="/" className="text-sm text-[#c9a96e] hover:text-[#d4b87a] transition-colors tracking-widest uppercase">
          Return Home →
        </Link>
      </div>
    </div>
  )
}
