'use client'

import { useState } from 'react'

const STARS = [1, 2, 3, 4, 5]

export function ReviewForm({ bookingRef, firstName }: { bookingRef: string; firstName: string }) {
  const [rating, setRating] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [comment, setComment] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (rating === 0) { setErrorMsg('Please select a rating.'); return }
    if (comment.trim().length < 20) { setErrorMsg('Please write at least 20 characters.'); return }
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: bookingRef, rating, body: comment, renterName: firstName }),
      })
      const json = await res.json()
      if (!res.ok) { setErrorMsg(json.error || 'Something went wrong.'); setStatus('error'); return }
      setStatus('success')
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-px bg-[#c9a96e] mx-auto mb-8" />
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Received</p>
        <h2 className="font-serif text-2xl text-[#f0e6d0] mb-4">Thank you, {firstName}.</h2>
        <p className="text-[#5f5850] text-sm max-w-sm mx-auto leading-relaxed">
          Your review has been submitted. We read every one.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-lg mx-auto">
      {/* Star rating */}
      <div>
        <p className="text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-4">Your Rating</p>
        <div className="flex gap-2">
          {STARS.map((s) => (
            <button
              key={s}
              type="button"
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setRating(s)}
              className="text-3xl transition-all duration-100 focus:outline-none"
              aria-label={`${s} star${s !== 1 ? 's' : ''}`}
            >
              <span className={(hovered || rating) >= s ? 'text-[#c9a96e]' : 'text-[#2a2520]'}>
                ★
              </span>
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-xs text-[#5f5850] mt-2">
            {['', 'Poor', 'Below average', 'Average', 'Good', 'Excellent'][rating]}
          </p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label className="block text-xs tracking-[0.3em] uppercase text-[#5f5850] mb-3" htmlFor="review-comment">
          Your Review
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          placeholder="Tell us about your experience — the vehicle, the pickup, the trip itself."
          className="w-full bg-[#0f0e0c] border border-[#2a2724] text-[#f0e6d0] placeholder-[#433d38] text-sm leading-relaxed px-4 py-3 focus:outline-none focus:border-[#c9a96e]/50 resize-none"
        />
        <p className="text-xs text-[#433d38] mt-1 text-right">{comment.length} chars (20 min)</p>
      </div>

      {errorMsg && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-[#c9a96e] text-[#0a0a0a] font-sans text-sm tracking-[0.2em] uppercase font-medium py-4 hover:bg-[#d4b87a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? 'Submitting…' : 'Submit Review'}
      </button>
    </form>
  )
}
