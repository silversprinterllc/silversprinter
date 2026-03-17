import type { UserRole, LoyaltyTier } from '@prisma/client'

export interface SessionUser {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  role: UserRole
  loyaltyTier: LoyaltyTier
  loyaltyPoints: number
}
