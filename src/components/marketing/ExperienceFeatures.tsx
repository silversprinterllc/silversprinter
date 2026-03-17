import { MapPin, RotateCcw, Sliders, Star } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Live GPS Tracking',
    description: 'Watch your chauffeur approach in real time. Share the tracking link with anyone.',
  },
  {
    icon: RotateCcw,
    title: 'Instant Rebooking',
    description: 'One tap to rebook your last journey. All preferences saved automatically.',
  },
  {
    icon: Sliders,
    title: 'Curate Your Cabin',
    description: 'Set temperature, lighting, music, and more before you step inside.',
  },
  {
    icon: Star,
    title: 'Loyalty Rewards',
    description: 'Earn points on every ride. Unlock tier perks up to Black status.',
  },
]

export function ExperienceFeatures() {
  return (
    <section className="py-24 px-6 bg-[#0f0d0b] relative overflow-hidden">
      <div className="absolute inset-0 dot-texture" />
      <hr className="gold-rule mb-16 max-w-7xl mx-auto" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">The Experience</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">Every detail considered</h2>
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
