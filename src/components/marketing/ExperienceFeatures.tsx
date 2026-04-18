import { Toilet, Thermometer, Users, ShieldCheck } from 'lucide-react'

const features = [
  {
    icon: Toilet,
    title: 'Private Commode On Board',
    description: 'Full private bathroom — commode and sink. No gas station stops. No detours. You leave when you want and arrive when you planned.',
  },
  {
    icon: Thermometer,
    title: 'Set Before You Arrive',
    description: 'Tell us how you want the van. Temperature dialed in, cooler stocked, preferences on file. Open the door and it\'s already right.',
  },
  {
    icon: Users,
    title: 'The Whole Group, Every Mile',
    description: 'Ten seats. One vehicle. The conversation that starts in the driveway doesn\'t get split across three cars. That\'s the whole point.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Renters Only',
    description: 'Every renter is identity-verified and must carry active rental insurance before keys are released. We protect the van and we protect you.',
  },
]

export function ExperienceFeatures() {
  return (
    <section className="py-24 px-6 bg-[#0f0d0b] relative overflow-hidden">
      <div className="absolute inset-0 dot-texture" />
      <hr className="gold-rule mb-16 max-w-7xl mx-auto" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">What You Get</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">Built different. On purpose.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="border-l border-[#433d38]/50 pl-6">
              <Icon size={24} className="text-[#c9a96e] mb-4" />
              <h3 className="font-serif text-lg text-[#f0e6d0] mb-2">{title}</h3>
              <p className="text-sm text-[#5f5850] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
