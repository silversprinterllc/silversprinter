import { Suspense } from 'react'
import { BookingWizardWrapper } from '@/components/booking/BookingWizardWrapper'

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a]" />}>
      <BookingWizardWrapper />
    </Suspense>
  )
}
