import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const points = [
  'Leadership retreats — everyone in one vehicle, conversation starts on the road',
  'Client transport — arrive as a group, make the impression before you walk in',
  'Company offsites — Keys, golf, coast — handled',
]

export function CorporateCTA() {
  return (
    <section className="py-24 px-6 bg-[#0f0d0b] relative overflow-hidden">
      <div className="absolute inset-0 dot-texture" />
      <hr className="gold-rule mb-16 max-w-7xl mx-auto" />
      <div className="relative max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">For Business</p>
            <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6 leading-tight">
              The executive team deserves better than a rental minivan.
            </h2>
            <p className="text-[#a09890] text-base leading-relaxed mb-8">
              Self-drive access to South Florida&apos;s finest Sprinter. The whole team together,
              on the road that matters, in a vehicle that reflects the standard you hold everything else to.
            </p>
            <Button size="lg" asChild>
              <Link href="/corporate">Corporate Rentals →</Link>
            </Button>
          </div>
          <div className="space-y-6">
            {points.map((point) => (
              <div key={point} className="flex items-start gap-4">
                <span className="text-[#c9a96e] mt-1 shrink-0">—</span>
                <p className="text-[#a09890] text-sm leading-relaxed">{point}</p>
              </div>
            ))}
            <div className="pt-4 border-t border-[#433d38]/40">
              <p className="text-xs text-[#5f5850] leading-relaxed">
                Booking for a team? Contact us about group rates and multi-day arrangements.{' '}
                <Link href="/contact?type=corporate" className="text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors">
                  Get in touch →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
