import type { ServiceType, BookingStatus } from '@prisma/client'

export interface QuoteInput {
  vehicleId: string
  serviceType: ServiceType
  pickupAt: Date
  estimatedHours?: number
  estimatedDays?: number
  addonIds: string[]
  corporateAccountId?: string
  loyaltyTier?: string
}

export interface LineItem {
  label: string
  amount: number
}

export interface QuoteResult {
  baseAmount: number
  extrasAmount: number
  gratuityAmount: number
  serviceFeeAmount: number
  totalAmount: number
  depositAmount: number
  balanceAmount: number
  lineItems: LineItem[]
  isSurgePriced: boolean
  surgeMultiplier?: number
}

export interface BookingWizardState {
  step: 1 | 2 | 3 | 4
  serviceType: ServiceType | null
  vehicleId: string | null
  pickupAddress: string
  pickupLat?: number
  pickupLng?: number
  destinationAddress: string
  destinationLat?: number
  destinationLng?: number
  pickupAt: Date | null
  passengers: number
  addonIds: string[]
  chauffeurId: string | null
  cabinTemp: number
  musicPreference: string
  lightingMood: string
  welcomeNote: string
  notes: string
  corporateAccountId?: string
  quote: QuoteResult | null
}

export interface CreateBookingInput {
  vehicleId: string
  serviceType: ServiceType
  pickupAddress: string
  pickupLat?: number
  pickupLng?: number
  destinationAddress: string
  destinationLat?: number
  destinationLng?: number
  pickupAt: string
  estimatedHours?: number
  estimatedDays?: number
  passengers: number
  addonIds: string[]
  chauffeurId?: string
  cabinTemp?: number
  musicPreference?: string
  lightingMood?: string
  welcomeNote?: string
  notes?: string
  corporateAccountId?: string
  poNumber?: string
}
