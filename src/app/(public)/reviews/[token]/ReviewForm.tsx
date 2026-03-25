'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'

type Props = {
  token: string
  defaultName: string
  tripType: string | null
}

export function ReviewForm({ token, defaultName, tripType }: Props) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [body, setBody] = useState('')
  const [renterName, setRenterName] = useState(defaultName)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const inputClass =
    'w-full bg-[#1a1612] border border-[#433d38]/70 text-[#f0e6d0] placeholder-[#5f5850] px-4 py-3 text-sm focus:outline-none focus:border-[#c9a96e] transition-colors'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) {
      setError('Please select a star rating.')
      return
    }
    if (body.trim().length < 20) {
      setError('Please write at least 20 characters.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, rating, body, renterName }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong.')
      setSubmitted(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-px bg-[#c9a96e] mx-auto mb-6" />
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Thank You</p>
        <p className="font-serif text-2xl text-[#f0e6d0] mb-4">Review Submitted</p>
        <p className="text-[#a09890] text-sm leading-relaxed">
          Your review will be published after a quick review.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Star Rating */}
      <div>
        <p className="text-xs tracking-[0.15em] uppercase text-[#5f5850] mb-3">
          Your Rating
        </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-colors"
            >
              <Star
                size={32}
                className={`transition-colors ${
                  star <= (hovered || rating)
                    ? 'text-[#c9a96e] fill-[#c9a96e]'
                    : 'text-[#433d38]'
                }`}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Review Body */}
      <div>
        <label className="block text-xs tracking-[0.15em] uppercase text-[#5f5850] mb-2">
          Tell us about your trip
        </label>
        <textarea
          rows={5}
          value={body}
          required
          minLength={20}
          placeholder="Share your experience on the Sterling Route…"
          onChange={(e) => setBody(e.target.value)}
          className={inputClass + ' resize-none'}
        />
        <p className="text-xs text-[#433d38] mt-1">Minimum 20 characters</p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-xs tracking-[0.15em] uppercase text-[#5f5850] mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={renterName}
          onChange={(e) => setRenterName(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {tripType && (
        <p className="text-xs text-[#5f5850]">
          Trip type: <span className="text-[#a09890]">{tripType}</span>
        </p>
      )}

      {error && (
        <div className="border border-red-800/50 bg-red-900/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-widest uppercase font-medium py-4 hover:bg-[#d4b87a] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  )
}
