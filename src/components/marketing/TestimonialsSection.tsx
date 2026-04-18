import Link from 'next/link'

const standards = [
  {
    label: 'One owner. Not a fleet.',
    body: 'This is Benjamin Hoadley\'s vehicle — a MAD Daycruiser D6 he purchased for his family and made available to rent. You are not getting a random car from a lot. You know exactly what you\'re getting.',
  },
  {
    label: 'Cleaned and inspected between every rental.',
    body: 'Not spot-cleaned. Cleaned. Interior detailed, commode emptied and sanitized, surfaces wiped, fridge cleared. The van you pick up is not the van someone else just returned.',
  },
  {
    label: 'Insurance before keys.',
    body: 'Every renter must carry active rental insurance through Bonzah or RentalCover before departure. It\'s not optional. It protects you, it protects us, and it means nobody is rolling the dice on a $200,000 vehicle.',
  },
  {
    label: 'Identity verified on every booking.',
    body: 'We run identity verification on the primary renter before confirming. This is a deliberate friction point — one that keeps the van in the right hands and keeps your experience consistent.',
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <hr className="gold-rule mb-16 max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Our Standards</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">What you should expect.</h2>
          <p className="text-[#5f5850] text-sm mt-4 max-w-md mx-auto leading-relaxed">
            We are new. We don&apos;t have hundreds of reviews yet.
            What we have is a standard — and you should hold us to it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#c9a96e]/10">
          {standards.map(({ label, body }) => (
            <div key={label} className="bg-[#0a0a0a] p-10 md:p-12">
              <div className="w-8 h-px bg-[#c9a96e] mb-6" />
              <h3 className="font-serif text-xl text-[#f0e6d0] mb-4 leading-snug">{label}</h3>
              <p className="text-sm text-[#5f5850] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[#5f5850] leading-relaxed max-w-lg mx-auto">
            Once you&apos;ve rented, we&apos;ll ask for your honest review.{' '}
            <Link href="/contact" className="text-[#c9a96e]/70 hover:text-[#c9a96e] transition-colors">
              Questions before you book? Start here →
            </Link>
          </p>
        </div>

      </div>
    </section>
  )
}
