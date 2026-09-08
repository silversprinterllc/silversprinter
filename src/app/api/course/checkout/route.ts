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
  system: {
    name: 'SpokeBnB — The System',
    price: 199700, // $1,997
    description: 'Self-paced course: all 15 modules, 60+ templates, lifetime access. Teaches operators how to generate and direct demand to their owned booking destination.',
    paymentPlan: {
      installments: 4,
      installmentAmount: 54900, // $549
      label: 'Payment Plan 1 of 4 — SpokeBnB System',
    },
  },
  build: {
    name: 'SpokeBnB — The Build',
    price: 549700, // $5,497
    description: 'Productized direct-booking website build. Responsive property site, booking path, PMS integration, SEO foundation, analytics, and launch QA — handed off and live.',
  },
  founding: {
    name: 'SpokeBnB — Founding Member',
    price: 99700, // $997
    description: 'Founding Member pre-sale: all 15 modules, 60+ templates, lifetime access, and direct Slack access to Ben. 50% off — limited to 20 operators.',
  },
}

export async function POST(req: NextRequest) {
  try {
    const { tier, email, planType = 'full' } = await req.json()

    const product = PRODUCTS[tier]
    if (!product) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.NODE_ENV === 'production'
        ? (() => { throw new Error('NEXT_PUBLIC_APP_URL is required in production') })()
        : 'http://localhost:3000')
    const isPlan = planType === 'plan' && !!product.paymentPlan

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
