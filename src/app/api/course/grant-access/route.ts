import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

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
    const response = NextResponse.redirect(new URL('/course/modules', req.url))

    response.cookies.set('sbnb_access', JSON.stringify({ tier, granted: Date.now() }), {
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
