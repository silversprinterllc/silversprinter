import Link from 'next/link'
import { CheckCircle, Building2, Users, FileText, Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'

const perks = [
  {
    icon: FileText,
    title: 'Net-30 Invoicing',
    description: 'Consolidated monthly invoices. No credit card required. Simple AP approval.',
  },
  {
    icon: Users,
    title: 'Multi-Rider Accounts',
    description: 'Add unlimited team members. Set booking permissions per rider.',
  },
  {
    icon: Phone,
    title: 'Dedicated Coordinator',
    description: 'Your own SilverSprinter coordinator available by phone, text, and email.',
  },
  {
    icon: Building2,
    title: 'Centralized Reporting',
    description: 'Usage reports by rider, department, and service type. Export to CSV.',
  },
]

export default function CorporatePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Corporate</p>
          <h1 className="font-serif text-5xl md:text-6xl text-[#f0e6d0] mb-6">
            Built for business travel
          </h1>
          <p className="text-[#a09890] text-lg max-w-2xl mx-auto leading-relaxed">
            SilverSprinter Corporate gives your team premium ground transportation with the controls, reporting, and invoicing that finance actually approves.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/contact">Request a Demo</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {perks.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border border-[#433d38]/50 bg-[#1a1612] p-8">
              <Icon size={24} className="text-[#c9a96e] mb-4" />
              <h3 className="font-serif text-xl text-[#f0e6d0] mb-2">{title}</h3>
              <p className="text-sm text-[#5f5850] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="border border-[#c9a96e]/30 bg-[#c9a96e]/5 p-12 text-center">
          <h2 className="font-serif text-3xl text-[#f0e6d0] mb-4">Ready to get started?</h2>
          <p className="text-[#a09890] mb-8">Talk to our team to set up your corporate account in minutes.</p>
          <Button size="lg" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
