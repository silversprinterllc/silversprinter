'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ToolPageHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--sf-navy)]/95 backdrop-blur-md shadow-lg'
          : 'bg-[var(--sf-navy)]/70 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/course" className="flex items-center gap-2 group">
            <svg width="28" height="28" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="256" cy="256" r="150" fill="none" stroke="#D4A017" strokeWidth="14"/>
              <circle cx="256" cy="256" r="21" fill="none" stroke="#D4A017" strokeWidth="14"/>
              <g stroke="#D4A017" strokeWidth="14" strokeLinecap="round">
                <line x1="256" y1="235" x2="256" y2="120"/>
                <line x1="256" y1="277" x2="256" y2="392"/>
                <line x1="235" y1="256" x2="120" y2="256"/>
                <line x1="277" y1="256" x2="392" y2="256"/>
                <line x1="241" y1="241" x2="161" y2="161"/>
                <line x1="271" y1="271" x2="351" y2="351"/>
                <line x1="271" y1="241" x2="351" y2="161"/>
                <line x1="241" y1="271" x2="161" y2="351"/>
              </g>
            </svg>
            <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-white">
              Spoke<span className="text-[var(--sf-gold)]">BnB</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/course"
              className="text-sm font-medium text-white/80 hover:text-[var(--sf-gold)] transition-colors"
            >
              ← Back to Course
            </Link>
            <Link
              href="/course/quiz"
              className="text-sm font-medium text-white/80 hover:text-[var(--sf-gold)] transition-colors"
            >
              Free Tools
            </Link>
            <Link
              href="/course#pricing"
              className="bg-[var(--sf-gold)] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--sf-gold)]/90 transition-all hover:shadow-lg"
            >
              Enroll Now
            </Link>
          </nav>

          <Link
            href="/course"
            className="md:hidden text-sm font-medium text-white/80 hover:text-[var(--sf-gold)] transition-colors"
          >
            ← Course
          </Link>
        </div>
      </div>
    </header>
  )
}
