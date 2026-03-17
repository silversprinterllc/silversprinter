'use client'
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await signIn('email', { email, redirect: false })
    setSent(true)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="block font-serif text-2xl text-[#f0e6d0] text-center mb-10">
          Silver<span className="text-[#c9a96e]">Sprinter</span>
        </Link>

        {sent ? (
          <div className="border border-[#433d38]/50 bg-[#1a1612] p-8 text-center">
            <p className="text-[#c9a96e] font-serif text-xl mb-2">Check your email</p>
            <p className="text-sm text-[#5f5850]">We sent a magic link to {email}</p>
          </div>
        ) : (
          <div className="border border-[#433d38]/50 bg-[#1a1612] p-8">
            <h1 className="font-serif text-2xl text-[#f0e6d0] mb-6">Sign in</h1>

            <Button
              variant="outline"
              className="w-full mb-6"
              onClick={() => signIn('google', { callbackUrl: '/portal' })}
            >
              Continue with Google
            </Button>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-[#433d38]" />
              <span className="text-xs text-[#433d38]">or</span>
              <div className="flex-1 h-px bg-[#433d38]" />
            </div>

            <form onSubmit={handleMagicLink} className="space-y-4">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Magic Link'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
