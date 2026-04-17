export const dynamic = 'force-dynamic'

import { prisma } from '@/lib/prisma'
import { PublicNav } from '@/components/layout/PublicNav'
import { Footer } from '@/components/layout/Footer'
import { HeroSection } from '@/components/marketing/HeroSection'
import { FleetShowcase } from '@/components/marketing/FleetShowcase'
import { ExperienceFeatures } from '@/components/marketing/ExperienceFeatures'
import { TestimonialsSection } from '@/components/marketing/TestimonialsSection'
import { CorporateCTA } from '@/components/marketing/CorporateCTA'
import { TripTypes } from '@/components/marketing/TripTypes'
import { ReferralSection } from '@/components/marketing/ReferralSection'
import { HowItWorks } from '@/components/marketing/HowItWorks'

export default async function HomePage() {
  const vehicles = await prisma.vehicle.findMany({
    where: { status: 'AVAILABLE' },
    orderBy: { basePrice: 'asc' },
  })

  const vehicleData = vehicles.map((v) => ({
    name: v.name,
    slug: v.slug,
    tagline: v.tagline ?? '',
    capacity: v.capacity,
    basePrice: Number(v.basePrice),
    features: v.features,
  }))

  return (
    <div className="bg-[#0a0a0a]">
      <PublicNav />
      <HeroSection />
      <FleetShowcase vehicles={vehicleData} />
      <ExperienceFeatures />
      <HowItWorks />
      <TripTypes />
      <TestimonialsSection />
      <ReferralSection />
      <CorporateCTA />
      <Footer />
    </div>
  )
}
