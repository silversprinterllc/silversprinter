'use client'

import { useState } from 'react'

const faqs = [
  {
    q: 'Who is this program for?',
    a: 'Experienced or aspiring STR hosts and operators running 1-30 units who want to stop relying on a single platform and build a diversified, high-revenue hospitality business. If you own or manage vacation rentals and want more bookings, higher nightly rates, and systems that run without you — this is for you.',
  },
  {
    q: 'I only have one property. Is this too advanced for me?',
    a: 'No. The core program ($1,997) is designed for 1-10 unit owners. You will build every system from scratch — direct booking website, pricing engine, guest retention, content strategy. The modules scale with you. Start with one property. The system works the same way at 10.',
  },
  {
    q: 'How is this different from other STR courses?',
    a: 'Most courses teach one thing — Airbnb arbitrage, co-hosting, or direct bookings. RevenuePerNight teaches the entire ecosystem. The Hub-and-Spoke model builds 8 demand channels around your property simultaneously. No other program covers distribution, direct booking, dynamic pricing, automation, content, influencer marketing, guest retention, experiences, and property acquisition in one system.',
  },
  {
    q: 'Do I need to buy additional tools?',
    a: 'Yes — budget $100-200/month for your tech stack (PMS, pricing tool, email capture, cleaning automation). Every tool is recommended based on ROI, not affiliate deals. We show you the cheapest effective option and when to upgrade. Most hosts recoup tool costs within the first month of optimization.',
  },
  {
    q: 'How long does it take to see results?',
    a: 'Dynamic pricing improvements show within days. Your direct booking website can be live in 1-2 weeks. Most students see measurable revenue increases within 30-60 days. The full system — all 8 demand channels humming — takes 3-6 months to mature. The 8-week implementation roadmap gets you there systematically.',
  },
  {
    q: 'What is the difference between the Intensive and DFY?',
    a: 'The Intensive ($2,997) is done-with-you — you build it yourself with live coaching, expert review, and group accountability over 6 weeks. The DFY ($7,500) is done-for-you — our team builds your system while you approve milestones. Choose Intensive if you want to learn the system deeply. Choose DFY if your time is worth more than the price difference.',
  },
  {
    q: 'What is the 30-day money-back guarantee?',
    a: 'If you complete Module 0 (Foundation) and Module 1 (Distribution Platforms) within 30 days and do not see the value, email us for a full refund. No questions, no hoops, no hard feelings. We are confident because the system works — but we want you to be too.',
  },
  {
    q: 'Can I take the Intensive for more than one track?',
    a: 'Yes. Each Intensive track (Direct Booking, Automation, Content & Growth) is a separate 6-week cohort. You can take one now and another later, or purchase the Full Revenue Engine bundle ($25,000) which includes all DFY builds.',
  },
  {
    q: 'What is The Barefoot Advantage module?',
    a: 'Module 10 teaches property acquisition strategy — how to identify, finance, and purchase high-performing STR properties in premium Florida markets. It is developed by Barefoot Realty & Investments, a licensed Florida brokerage. This module is included with all tiers and positions you to build long-term wealth through ownership, not just optimization.',
  },
  {
    q: 'How do I access the course after purchasing?',
    a: 'Immediately. You get lifetime access to all modules, templates, and future updates. New modules and tool guides are added regularly at no extra cost. Intensive cohort students also get access to the private Slack channel and call recordings.',
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
