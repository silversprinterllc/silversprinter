import Link from 'next/link'

const specs = [
  {
    title: 'MAD Daycruiser D6',
    body: 'Custom luxury conversion on the Mercedes-Benz Sprinter platform. Built by Midwestern Automotive Design for people who take what they drive seriously.',
  },
  {
    title: '10 Occupants Maximum',
    body: 'Driver + 9 passengers. 1 front seat, 4 captain chairs, 2 fold-flat benches. 10 belts. Not one more.',
  },
  {
    title: 'Private Commode & Sink',
    body: 'A self-contained bathroom on board. The detail that changes a long trip from an ordeal into a non-event.',
  },
  {
    title: 'Full Galley',
    body: 'Microwave, mini fridge, and cooler. Real food, real drinks, on the road.',
  },
  {
    title: '32" TV + WiFi + Bluetooth',
    body: 'Streaming, gaming, film. Entertainment that works at every seat.',
  },
  {
    title: 'Sleeps 2',
    body: 'Rear benches fold flat. A golf trip that ends at midnight doesn\'t need a hotel.',
  },
]

export function FleetShowcase() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a] border-b border-[#c9a96e]/20">
      <div className="max-w-5xl mx-auto">

        <div className="mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">The Vehicle</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-4">
            One Van. The Right One.
          </h2>
          <p className="text-[#5f5850] text-base leading-relaxed max-w-xl">
            Midwestern Automotive Design Daycruiser D6 — a luxury Sprinter conversion maintained to the same standard as when the owner&apos;s own family is inside.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#c9a96e]/10 mb-12">
          {specs.map((spec) => (
            <div key={spec.title} className="bg-[#0a0a0a] p-8">
              <div className="w-6 h-px bg-[#c9a96e]/50 mb-5" />
              <h3 className="font-serif text-lg text-[#f0e6d0] mb-2">{spec.title}</h3>
              <p className="text-[#5f5850] text-sm leading-relaxed">{spec.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/insurance"
            className="inline-block bg-[#c9a96e] text-[#0a0a0a] font-sans text-xs tracking-[0.2em] uppercase font-medium px-10 py-4 hover:bg-[#d4b87a] transition-colors duration-200"
          >
            Check Availability
          </Link>
          <Link
            href="/fleet"
            className="inline-block border border-[#c9a96e]/40 text-[#c9a96e] font-sans text-xs tracking-[0.2em] uppercase px-10 py-4 hover:bg-[#c9a96e]/10 transition-colors duration-200"
          >
            Van Details
          </Link>
        </div>
      </div>
    </section>
  )
}
