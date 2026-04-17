import { Suspense } from 'react'
import { BookingWizardWrapper } from '@/components/booking/BookingWizardWrapper'

export default function BookPage() {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Urgency banner */}
      <div className="w-full bg-[#1a1612] border-b border-[#c9a96e]/20 py-3 px-6 text-center">
        <p className="text-xs text-[#a09890] tracking-wide">
          <span className="text-[#c9a96e] font-medium">One vehicle.</span>{' '}
          Weekends book fast — especially tournament season and holiday weekends.
        </p>
      </div>
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
        <BookingWizardWrapper />
      </Suspense>
    </div>
  )
}
