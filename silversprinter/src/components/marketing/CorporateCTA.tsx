import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const perks = ['Net-30 invoicing', 'Multi-rider team accounts', 'Dedicated coordinator']

export function CorporateCTA() {
  return (
    <section className="py-24 px-6 bg-[#0f0d0b] relative overflow-hidden">
      <div className="absolute inset-0 dot-texture" />
      <hr className="gold-rule mb-16 max-w-7xl mx-auto" />
      <div className="relative max-w-3xl mx-auto text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">For Business</p>
        <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-6">Elevated corporate travel</h2>
        <p className="text-[#a09890] mb-8 leading-relaxed">
          Purpose-built for executive teams and business travelers who refuse to compromise.
        </p>
        <ul className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
          {perks.map((perk) => (
            <li key={perk} className="flex items-center gap-2 text-sm text-[#a09890]">
              <CheckCircle size={16} className="text-[#c9a96e]" />
              {perk}
            </li>
          ))}
        </ul>
        <Button size="lg" asChild>
          <Link href="/corporate">Explore Corporate Accounts</Link>
        </Button>
      </div>
    </section>
  )
}
