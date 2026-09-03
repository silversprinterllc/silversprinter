import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

const TRACK_LABELS: Record<string, string> = {
  direct: 'Direct Booking System',
  automation: 'Automation Stack',
  content: 'Content & Growth Engine',
}

const COURSE_FROM = process.env.COURSE_FROM_EMAIL || 'ben@spokebnb.com'
const BEN_EMAIL = 'ben@spokebnb.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      name,
      email,
      phone,
      propertyUrl,
      units,
      track,
      currentRevenue,
      revenueGoal,
      timeline,
      biggestChallenge,
      heardFrom,
    } = body

    if (!name || !email || !track || !units || !timeline) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const applicationData = buildApplicationData({
      name, email, phone, propertyUrl, units, track,
      currentRevenue, revenueGoal, timeline, biggestChallenge, heardFrom,
    })
    const trackLabel = applicationData.goals.track

    // Notify Ben
    await resend.emails
      .send({
        from: `SpokeBnB Applications <${COURSE_FROM}>`,
        to: BEN_EMAIL,
        replyTo: email,
        subject: `New Concierge Application — ${name} (${trackLabel})`,
        html: buildAdminEmail(applicationData),
      })
      .catch((err) => console.error('[apply] admin email failed:', err))

    // Confirm receipt to applicant
    await resend.emails
      .send({
        from: `Ben at SpokeBnB <${COURSE_FROM}>`,
        to: email,
        replyTo: BEN_EMAIL,
        subject: "Application received — I'll be in touch",
        html: buildApplicantEmail(name),
      })
      .catch((err) => console.error('[apply] applicant email failed:', err))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Apply route error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

function buildAdminEmail(data: ReturnType<typeof buildApplicationData>) {
  const { applicant, property, goals, context } = data
  const rows = [
    ['Name', applicant.name],
    ['Email', applicant.email],
    ['Phone', applicant.phone],
    ['Listing URL', property.listingUrl],
    ['Units', property.units],
    ['Track', goals.track],
    ['Current Revenue', goals.currentRevenue],
    ['Revenue Goal', goals.revenueGoal],
    ['Timeline', goals.timeline],
    ['Biggest Challenge', context.biggestChallenge],
    ['Heard From', context.heardFrom],
    ['Submitted', data.submittedAt],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:7px 14px;font-size:12px;color:#777;border-bottom:1px solid #f0ede8;white-space:nowrap;">${k}</td><td style="padding:7px 14px;font-size:13px;border-bottom:1px solid #f0ede8;">${v}</td></tr>`
    )
    .join('')

  return `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;background:#f5f5f5;padding:20px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
    <div style="background:#09263A;padding:16px 20px;"><p style="margin:0;font-size:13px;font-weight:700;color:#D4A017;">New Concierge Application — ${applicant.name}</p></div>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>
    <div style="padding:14px 20px;background:#f9f9f9;"><a href="mailto:${applicant.email}" style="background:#D4A017;color:#09263A;font-weight:700;padding:9px 20px;border-radius:6px;text-decoration:none;font-size:13px;">Reply to Applicant</a></div>
  </div></body></html>`
}

function buildApplicantEmail(name: string) {
  const firstName = name.split(' ')[0]
  return `<!DOCTYPE html><html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:20px;background:#f0ede8;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:520px;margin:0 auto;background:#09263A;border-radius:12px;overflow:hidden;">
    <div style="padding:26px 30px 18px;border-bottom:1px solid rgba(255,255,255,0.08);">
      <p style="margin:0 0 5px;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#D4A017;font-weight:600;">SpokeBnB — The Concierge</p>
      <h1 style="margin:0;font-size:20px;font-weight:700;color:#F7F3EA;">Application received, ${firstName}.</h1>
    </div>
    <div style="padding:22px 30px;">
      <p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65);">I review every Concierge application myself. You'll get a personal reply at this email within 1 business day — not a form letter, an actual message about your property and your goals.</p>
      <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65);">In the meantime, if you want to get a head start, the full course curriculum is at <a href="https://spokebnb.com/course" style="color:#D4A017;">spokebnb.com/course</a>.</p>
      <hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:0 0 18px;">
      <p style="margin:0;font-size:13px;color:rgba(247,243,234,0.3);">Questions? Reply to this email — it goes directly to me.</p>
      <p style="margin:6px 0 0;font-size:13px;color:rgba(247,243,234,0.3);">— Ben</p>
    </div>
  </div>
</body></html>`
}

// Extracted so the type can be inferred for buildAdminEmail
function buildApplicationData(fields: {
  name: string
  email: string
  phone?: string
  propertyUrl?: string
  units: string
  track: string
  currentRevenue?: string
  revenueGoal?: string
  timeline: string
  biggestChallenge?: string
  heardFrom?: string
}) {
  return {
    submittedAt: new Date().toISOString(),
    applicant: { name: fields.name, email: fields.email, phone: fields.phone || 'Not provided' },
    property: { listingUrl: fields.propertyUrl || 'Not provided', units: fields.units },
    goals: {
      track: TRACK_LABELS[fields.track] || fields.track,
      currentRevenue: fields.currentRevenue || 'Not provided',
      revenueGoal: fields.revenueGoal || 'Not provided',
      timeline: fields.timeline,
    },
    context: {
      biggestChallenge: fields.biggestChallenge || 'Not provided',
      heardFrom: fields.heardFrom || 'Not provided',
    },
  }
}
