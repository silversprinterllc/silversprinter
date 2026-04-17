const steps = [
  {
    number: '01',
    title: 'Check Availability',
    body: 'Select your dates and trip type. One van, real-time calendar.',
  },
  {
    number: '02',
    title: 'Get Insured',
    body: 'Quick coverage through Bonzah or RentalCover. Takes 5 minutes.',
  },
  {
    number: '03',
    title: 'Pay Your Deposit',
    body: '35% secures your dates. Balance auto-charged 48 hours before departure.',
  },
  {
    number: '04',
    title: 'Take the Sterling Route',
    body: 'Pick up at 8983 Okeechobee Blvd. Everything\'s ready.',
  },
]

export function HowItWorks() {
  return (
    <section className="py-24 px-6 bg-[#0a0a0a]">
      <hr className="gold-rule mb-16 max-w-7xl mx-auto" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">The Process</p>
          <h2 className="font-serif text-4xl md:text-5xl text-[#f0e6d0]">How it works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map(({ number, title, body }) => (
            <div key={number} className="relative pl-6 border-l border-[#433d38]/50">
              <p className="font-serif text-4xl text-[#c9a96e]/20 mb-4 leading-none">{number}</p>
              <h3 className="font-serif text-lg text-[#f0e6d0] mb-2">{title}</h3>
              <p className="text-sm text-[#5f5850] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
