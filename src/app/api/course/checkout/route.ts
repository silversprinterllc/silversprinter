import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

type ProductConfig = {
  name: string
  price: number
  description: string
  paymentPlan?: {
    installments: number
    installmentAmount: number
    label: string
  }
}

const PRODUCTS: Record<string, ProductConfig> = {
  founding: {
    name: 'SpokeBnB — Founding Member',
    price: 99700,
    description: 'Founding Member pre-sale: full course access, founding badge, direct Slack access to Ben, priority for future intensives.',
  },
  system: {
    name: 'SpokeBnB — The System',
    price: 199700, // $1,997
    description: 'Self-paced course: all 13 modules, 60+ templates, lifetime access.',
    paymentPlan: {
      installments: 4,
      installmentAmount: 54900, // $549
      label: 'Payment Plan 1 of 4 — The System',
    },
  },
  intensive: {
    name: 'SpokeBnB — The Intensive',
    price: 499700, // $4,997
    description: 'Done-with-you cohort: full course + 5 coaching calls + track-specific build + Slack support.',
    paymentPlan: {
      installments: 3,
      installmentAmount: 174900, // $1,749
      label: 'Payment Plan 1 of 3 — The Intensive',
    },
  },
  concierge: {
    name: 'SpokeBnB — The Concierge',
    price: 750000, // $7,500
    description: 'Done-for-you build: full system built by our team in 5 weeks.',
    paymentPlan: {
      installments: 2,
      installmentAmount: 395000, // $3,950
      label: 'Payment Plan 1 of 2 — The Concierge',
    },
  },
}

export async function POST(req: NextRequest) {
  try {
    const { tier, email, planType = 'full' } = await req.json()

    // 'tier' can be base tier key; 'planType' is 'full' | 'plan'
    const product = PRODUCTS[tier]
    if (!product) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const isPlan = planType === 'plan' && product.paymentPlan

    const lineItemPrice = isPlan ? product.paymentPlan!.installmentAmount : product.price
    const lineItemName = isPlan ? product.paymentPlan!.label : product.name
    const lineItemDescription = isPlan
      ? `${product.paymentPlan!.installments} payments of $${(product.paymentPlan!.installmentAmount / 100).toFixed(0)}. Subsequent charges collected monthly.`
      : product.description

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email || undefined,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: lineItemName,
              description: lineItemDescription,
            },
            unit_amount: lineItemPrice,
          },
          quantity: 1,
        },
      ],
      success_url: `${appUrl}/course/thank-you?session_id={CHECKOUT_SESSION_ID}&tier=${tier}`,
      cancel_url: `${appUrl}/course#pricing`,
      metadata: {
        tier,
        plan_type: planType,
        product_name: product.name,
        ...(isPlan && {
          installment_number: '1',
          total_installments: String(product.paymentPlan!.installments),
        }),
      },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    console.error('Course checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
