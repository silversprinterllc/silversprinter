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
            <div className="w-8 h-8 rounded-lg bg-[var(--sf-gold)] flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight text-white">
              Revenue<span className="text-[var(--sf-gold)]">PerNight</span>
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
