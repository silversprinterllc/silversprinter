import type { Metadata } from 'next'
import { ContactForm } from '@/components/marketing/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Sterling Route — Book, Inquire, or Apply for the Road Club',
  description: 'Questions about the van, availability, Road Club membership, or corporate rates. We respond within a few hours.',
}

export default function ContactPage() {
  return (
    <div className="bg-[#0a0a0a] text-[#f0e6d0]">

      {/* HERO */}
      <section className="py-20 px-6 border-b border-[#c9a96e]/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a96e] mb-6">Response within a few hours</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#f0e6d0] mb-5">Let&apos;s Talk.</h1>
          <p className="text-[#a09890] text-base leading-relaxed max-w-xl">
            Whether you&apos;re ready to book, have questions, or want to apply for Sterling Reserve — this is where it starts.
          </p>
        </div>
      </section>

      <ContactForm />

    </div>
  )
}
