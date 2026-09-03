'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Who is this for?',
    a: 'Independent STR and hospitality operators running 1–30 units, anywhere in the world, who want to stop depending on a single platform and build a direct-booking business they own and control. The hub-and-spoke model applies whether your property is in the Finger Lakes, the Scottish Highlands, or Bali. The System works from one property. The Build is available for any property ready for a direct-booking site.',
  },
  {
    q: 'What is the difference between The System and The Build?',
    a: 'The System is education — it teaches you how to generate and direct demand across 10 spokes, from distribution platforms and direct bookings to content, creators, and guest retention. The Build is infrastructure — we build your direct-booking website, connect it to your PMS, and hand it off ready to take bookings. You can buy one, the other, or both. They are independent.',
  },
  {
    q: 'I only have one property. Is this too advanced for me?',
    a: 'No. The System is designed for 1–10 unit owners. You will build every system from scratch — direct booking website, pricing engine, guest retention, content strategy. The modules scale with you. The Build is available for single properties as well as portfolios.',
  },
  {
    q: 'How is SpokeBnB different from other STR courses?',
    a: 'Most courses teach one thing — Airbnb arbitrage, co-hosting, or direct bookings in isolation. SpokeBnB teaches the full operating model: 10 spokes covering distribution, direct booking, dynamic pricing, automation, content, creator marketing, guest retention, experiences, and property acquisition — in one system built from properties we actually operate.',
  },
  {
    q: 'What does The Build actually deliver?',
    a: 'A property-specific responsive website: custom domain, PMS integration (OwnerRez, Hostaway, Hospitable, and others), booking path, gallery, amenities, location, reviews, FAQ, SEO foundation, analytics, Search Console setup, and launch QA. We work from your intake, build the first version, and hand it off. Standard timeline is 3–4 weeks from completed intake.',
  },
  {
    q: 'What does The Build not include?',
    a: 'Ongoing marketing execution — paid ads, social media management, email campaigns, SEO writing, influencer outreach, OTA management, or revenue management. Those activities live in The System (which teaches you how to run them yourself) or with specialized providers. The Build is website infrastructure, not an ongoing retainer.',
  },
  {
    q: 'Do I need to buy additional tools?',
    a: 'For The System — yes. The full tech stack is disclosed upfront in the curriculum so there are no surprises. Budget roughly $200–370/month at full build-out (excluding STR insurance). The Phase 1 essentials — PMS, PriceLabs, smart lock, noise monitor, and Turno — run $70–80/month plus insurance. Every tool is introduced when you need it, not all at once. For The Build — your PMS is the core integration requirement. We handle the setup.',
  },
  {
    q: 'What is the 14-day conditional money-back guarantee?',
    a: 'This applies to The System. Complete Modules 0 and 1 and submit your homework within 14 days. If you do not see the value, email us and we will refund every penny. The guarantee does not apply to The Build, which is a service engagement with defined deliverables.',
  },
  {
    q: 'What does the acquisition module cover?',
    a: 'Module 12 covers Acquisition & Portfolio Growth — market data methodology, cap rate analysis, DSCR loan structures, off-market sourcing, and portfolio architecture for scaling from one property to many. It applies globally. For Florida-specific STR acquisition, SpokeBnB partners with Barefoot Realty & Investments, a licensed Florida brokerage.',
  },
  {
    q: 'I have multiple properties. Which product applies?',
    a: 'The System applies regardless of portfolio size. For The Build, the standard $4,997 product covers one property brand. If you have multiple properties, a portfolio brand, or complex booking architecture — apply through the Portfolio / Custom path and we will scope it correctly.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" aria-label="Frequently asked questions" className="py-14 sm:py-20 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[var(--sf-gold)] text-sm font-semibold tracking-widest uppercase">
            Questions
          </span>
          <h2 className="font-[var(--font-display)] text-3xl sm:text-4xl font-bold text-[var(--sf-navy)] mt-4">
            Frequently Asked
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-[var(--sf-navy)]/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-4 sm:px-6 py-4 flex items-center justify-between gap-3 sm:gap-4 hover:bg-[var(--sf-navy)]/[0.02] transition-colors min-h-[52px]"
              >
                <span className="font-medium text-[var(--sf-navy)] text-sm">{faq.q}</span>
                <svg
                  className={`w-4 h-4 text-[var(--sf-navy)]/30 shrink-0 transition-transform ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`sf-accordion-content ${openIndex === i ? 'open' : ''}`}>
                <div className="sf-accordion-inner">
                  <div className="px-4 sm:px-6 pb-4">
                    <p className="text-sm text-[var(--sf-navy)]/50 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
