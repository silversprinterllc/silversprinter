import type { VehicleStatus } from '@prisma/client'

export interface VehicleWithDetails {
  id: string
  name: string
  slug: string
  tagline: string | null
  description: string | null
  capacity: number
  basePrice: number
  pricePerHour: number | null
  pricePerDay: number | null
  year: number
  make: string
  model: string
  color: string | null
  status: VehicleStatus
  features: string[]
  amenities: string[]
  imageUrls: string[]
  tourUrl: string | null
}
