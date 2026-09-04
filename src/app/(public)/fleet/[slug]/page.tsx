import { redirect } from 'next/navigation'

// There is one van. All vehicle detail routes redirect to /fleet.
export default function VehicleDetailPage() {
  redirect('/fleet')
}
