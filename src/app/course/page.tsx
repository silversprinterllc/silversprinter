import Header from '@/components/store/Header'
import HeroSection from '@/components/store/HeroSection'
import FoundingMemberBanner from '@/components/store/FoundingMemberBanner'
import TrustBar from '@/components/store/TrustBar'
import HubAndSpoke from '@/components/store/HubAndSpoke'
import QuizPromo from '@/components/store/QuizPromo'
import ModuleBreakdown from '@/components/store/ModuleBreakdown'
import PricingTiers from '@/components/store/PricingTiers'
import BundleOffer from '@/components/store/BundleOffer'
import ToolStack from '@/components/store/ToolStack'
import InstructorBio from '@/components/store/InstructorBio'
import TestimonialsSection from '@/components/store/TestimonialsSection'
import FAQ from '@/components/store/FAQ'
import EmailCapture from '@/components/store/EmailCapture'
import FreeToolsSection from '@/components/store/FreeToolsSection'
import Footer from '@/components/store/Footer'

export default function CoursePage() {
  return (
    <main>
      {/* Sticky Navigation */}
      <Header />

      {/* 1. Hero — headline, hub-and-spoke visual, dual CTAs */}
      <HeroSection />

      {/* 1.5 Founding Member Pre-Sale — limited spots, 50% off */}
      <FoundingMemberBanner />

      {/* 2. Trust Bar — 5 credibility icons */}
      <TrustBar />

      {/* 2.5 Free Tools — lead capture grid, placed high to catch non-buyers */}
      <FreeToolsSection />

      {/* 3. Program Overview — Hub-and-Spoke framework, problem/solution, 10 spokes */}
      <HubAndSpoke />

      {/* 3.5 Quiz Promo — Saturation diagnostic lead magnet */}
      <QuizPromo />

      {/* 4. Full Curriculum — 10 modules with expandable accordion */}
      <ModuleBreakdown />

      {/* 5. Instructor / Credibility */}
      <InstructorBio />

      {/* 6. Testimonials — 3 result cards */}
      <TestimonialsSection />

      {/* 7. Pricing — 3 tiers: Course / Intensive / DFY */}
      <PricingTiers />

      {/* 8. Full Revenue Engine Bundle — $25K DFY */}
      <BundleOffer />

      {/* 9. Recommended Tools */}
      <ToolStack />

      {/* 10. FAQ — 10 expandable questions */}
      <FAQ />

      {/* 11. Email Capture — Revenue Per Night Calculator lead magnet */}
      <EmailCapture />

      {/* 12. Footer */}
      <Footer />
    </main>
  )
}
