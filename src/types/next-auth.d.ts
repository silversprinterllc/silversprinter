import type { UserRole, LoyaltyTier } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: UserRole
      loyaltyTier: LoyaltyTier
      loyaltyPoints: number
    }
  }

  interface User {
    role?: UserRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: UserRole
    loyaltyTier?: LoyaltyTier
    loyaltyPoints?: number
  }
}
