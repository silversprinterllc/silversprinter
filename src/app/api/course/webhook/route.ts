import { NextRequest } from 'next/server'
import type Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { resend } from '@/lib/resend'

const COURSE_FROM = process.env.COURSE_FROM_EMAIL || 'ben@spokebnb.com'
const BEN_EMAIL = 'ben@spokebnb.com'
// Set LMS_JOIN_URL in Vercel env vars once Skool/Kajabi is configured
const LMS_URL = process.env.LMS_JOIN_URL || 'https://spokebnb.com/course'

const TIER_NAMES: Record<string, string> = {
  system: 'SpokeBnB System',
  build: 'SpokeBnB Build',
}

const TIER_COPY: Record<string, { subject: string; body: string; cta?: string }> = {
  system: {
    subject: "You're in — SpokeBnB System is unlocked",
    body: "Your course access is ready. Click below to start Module 0 — it's 45 minutes and it reframes how you think about your property and where your revenue actually comes from.",
    cta: 'Start Module 0',
  },
  build: {
    subject: "SpokeBnB Build — we're getting started",
    body: "Your Build is confirmed. I'll reach out within 1 business day with the intake questionnaire — that's the document that drives your site. The more you put in, the stronger the first build will be.",
  },
}

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    const secret =
      process.env.STRIPE_COURSE_WEBHOOK_SECRET || process.env.STRIPE_WEBHOOK_SECRET!
    event = stripe.webhooks.constructEvent(body, sig, secret)
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  if (event.type !== 'checkout.session.completed') {
    return new Response('OK', { status: 200 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const tier = session.metadata?.tier
  if (!tier || !TIER_NAMES[tier]) {
    return new Response('OK', { status: 200 })
  }

  const customerEmail =
    session.customer_email ||
    (session.customer_details as Stripe.Checkout.Session.CustomerDetails | null)?.email ||
    null

  const tierName = TIER_NAMES[tier]
  const copy = TIER_COPY[tier]
  const amount = session.amount_total
    ? `$${(session.amount_total / 100).toLocaleString('en-US')}`
    : ''
  const planType = session.metadata?.plan_type || 'full'

  if (customerEmail) {
    await resend.emails
      .send({
        from: `Ben at SpokeBnB <${COURSE_FROM}>`,
        to: customerEmail,
        replyTo: BEN_EMAIL,
        subject: copy.subject,
        html: buildStudentEmail({ tierName, body: copy.body, cta: copy.cta, amount, planType }),
      })
      .catch((err) => console.error('[course/webhook] student email failed:', err))
  }

  // Internal notification to Ben
  await resend.emails
    .send({
      from: `SpokeBnB Checkout <${COURSE_FROM}>`,
      to: BEN_EMAIL,
      subject: `💰 New enrollment: ${tierName}${customerEmail ? ` — ${customerEmail}` : ''}`,
      html: buildAdminEmail({ tierName, customerEmail, amount, planType, session }),
    })
    .catch((err) => console.error('[course/webhook] admin email failed:', err))

  return new Response('OK', { status: 200 })
}

function buildStudentEmail({
  tierName,
  body,
  cta,
  amount,
  planType,
}: {
  tierName: string
  body: string
  cta?: string
  amount: string
  planType: string
}) {
  const amountNote =
    planType === 'plan'
      ? `First payment of ${amount} received. Subsequent charges will be collected monthly.`
      : amount
        ? `Payment of ${amount} received.`
        : ''

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:20px;background:#f0ede8;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:540px;margin:0 auto;background:#09263A;border-radius:12px;overflow:hidden;">
    <div style="padding:28px 32px 20px;border-bottom:1px solid rgba(255,255,255,0.08);">
      <p style="margin:0 0 6px;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#D4A017;font-weight:600;">SpokeBnB</p>
      <h1 style="margin:0 0 6px;font-size:22px;font-weight:700;color:#F7F3EA;line-height:1.25;">${tierName}</h1>
      ${amountNote ? `<p style="margin:0;font-size:12px;color:rgba(247,243,234,0.35);">${amountNote}</p>` : ''}
    </div>
    <div style="padding:24px 32px;">
      <p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65);">${body}</p>
      ${cta ? `<a href="${LMS_URL}" style="display:inline-block;background:#D4A017;color:#09263A;font-weight:700;font-size:14px;padding:12px 26px;border-radius:8px;text-decoration:none;">${cta} →</a>` : ''}
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:24px 0;">
      <p style="margin:0;font-size:13px;color:rgba(247,243,234,0.3);">Questions? Reply to this email — it goes directly to me.</p>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(247,243,234,0.3);">— Ben</p>
    </div>
  </div>
</body>
</html>`
}

function buildAdminEmail({
  tierName,
  customerEmail,
  amount,
  planType,
  session,
}: {
  tierName: string
  customerEmail: string | null
  amount: string
  planType: string
  session: Stripe.Checkout.Session
}) {
  const rows = [
    ['Tier', tierName],
    ['Email', customerEmail || 'Not captured'],
    ['Amount', planType === 'plan' ? `${amount} (installment 1)` : amount],
    ['Payment type', planType],
    ['Session ID', session.id],
  ]
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-size:12px;color:#888;border-bottom:1px solid #f0ede8;">${k}</td><td style="padding:6px 12px;font-size:13px;font-weight:600;border-bottom:1px solid #f0ede8;">${v}</td></tr>`)
    .join('')

  return `<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;background:#f5f5f5;padding:20px;">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
    <div style="background:#09263A;padding:16px 20px;">
      <p style="margin:0;font-size:13px;font-weight:700;color:#D4A017;">New SpokeBnB Enrollment</p>
    </div>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
  </div>
</body></html>`
}
