import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Amanda R.',
    trip: 'Airport Transfer',
    rating: 5,
    quote: 'Absolutely seamless. Marcus was waiting at baggage claim, the van was immaculate, and we arrived at the hotel feeling like royalty.',
  },
  {
    name: 'James & Sofia K.',
    trip: 'Wedding Charter',
    rating: 5,
    quote: 'The Noir made our wedding day unforgettable. Red carpet arrival, champagne on board — every single detail was perfect.',
  },
  {
    name: 'Carlos M.',
    trip: 'Corporate Travel',
    rating: 5,
    quote: 'Our entire executive team uses SilverSprinter for airport runs. The Net-30 invoicing and dedicated coordinator make it effortless.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <hr className="gold-rule mb-16 max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Reviews</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">What our clients say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, trip, rating, quote }) => (
            <div key={name} className="border border-[#433d38]/50 bg-[#1a1612] p-8">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} className="text-[#c9a96e] fill-[#c9a96e]" />
                ))}
              </div>
              <p className="text-sm text-[#a09890] leading-relaxed mb-6 italic">"{quote}"</p>
              <div>
                <p className="text-sm font-medium text-[#f0e6d0]">{name}</p>
                <p className="text-xs text-[#5f5850] mt-0.5">{trip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
