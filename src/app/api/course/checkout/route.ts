import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const PRODUCTS: Record<string, { name: string; price: number; description: string }> = {
  founding: {
    name: 'SpokeBnB — Founding Member',
    price: 99700, // $997 in cents
    description: 'Founding Member pre-sale: full course access, founding badge, direct Slack access to Ben, priority for future intensives.',
  },
  system: {
    name: 'SpokeBnB — The System',
    price: 199700, // $1,997 in cents
    description: 'Self-paced course: all 10 modules, 60+ templates, lifetime access.',
  },
  intensive: {
    name: 'SpokeBnB — The Intensive',
    price: 299700, // $2,997 in cents
    description: 'Done-with-you cohort: full course + 5 coaching calls + Slack support.',
  },
  concierge: {
    name: 'SpokeBnB — The Concierge',
    price: 750000, // $7,500 in cents
    description: 'Done-for-you build: full system built by our team in 5 weeks.',
  },
}

export async function POST(req: NextRequest) {
  try {
    const { tier, email } = await req.json()

    const product = PRODUCTS[tier]
    if (!product) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/course/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/course#pricing`,
      metadata: {
        tier,
        product_name: product.name,
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Course checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
