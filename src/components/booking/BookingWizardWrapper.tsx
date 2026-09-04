'use client'
import { useSearchParams } from 'next/navigation'
import { BookingWizard } from './BookingWizard'

export function BookingWizardWrapper() {
  const params = useSearchParams()
  const vehicleId = params.get('vehicleId') ?? undefined
  return <BookingWizard initialVehicleId={vehicleId} />
}
