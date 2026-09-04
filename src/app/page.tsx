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

export default function HomePage() {
  return (
    <div className="bg-[#0a0a0a]">
      <PublicNav />
      <HeroSection />
      <FleetShowcase />
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
