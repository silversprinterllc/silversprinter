import { createHmac } from 'crypto'
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const COOKIE_SECRET =
  process.env.COOKIE_SECRET ||
  (process.env.NODE_ENV === 'development' ? 'dev-secret-do-not-use-in-prod' : '')

export function signCookieValue(tier: string, granted: number): string {
  const payload = `${tier}:${granted}`
  const sig = createHmac('sha256', COOKIE_SECRET).update(payload).digest('hex')
  return `${payload}:${sig}`
}

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.redirect(new URL('/course#pricing', req.url))
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.redirect(new URL('/course#pricing', req.url))
    }

    const tier = (session.metadata?.tier as string) || 'system'
    const granted = Date.now()
    const response = NextResponse.redirect(new URL('/course/modules', req.url))

    response.cookies.set('sbnb_access', signCookieValue(tier, granted), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    })

    return response
  } catch (err) {
    console.error('[grant-access] Stripe error:', err)
    return NextResponse.redirect(new URL('/course#pricing', req.url))
  }
}
