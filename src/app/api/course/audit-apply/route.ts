import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

const COURSE_FROM = process.env.COURSE_FROM_EMAIL || 'ben@spokebnb.com'
const BEN_EMAIL = 'ben@spokebnb.com'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, email, propertyUrl, propertyType, numberOfUnits, monthlyBookings, biggestChallenge } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    const rows = [
      ['Name', firstName || '—'],
      ['Email', email],
      ['Property URL', propertyUrl || '—'],
      ['Property Type', propertyType || '—'],
      ['Units', numberOfUnits || '—'],
      ['Monthly Bookings', monthlyBookings || '—'],
      ['Challenge', biggestChallenge || '—'],
    ]
      .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;font-weight:600;color:#09263A;vertical-align:top">${k}</td><td style="padding:6px 0;color:#555">${v}</td></tr>`)
      .join('')

    await resend.emails
      .send({
        from: `SpokeBnB <${COURSE_FROM}>`,
        to: BEN_EMAIL,
        subject: `Audit application — ${firstName || email}`,
        html: `<div style="font-family:system-ui,sans-serif;padding:20px;max-width:540px"><h2 style="margin:0 0 16px;color:#09263A">New Listing Audit Application</h2><table>${rows}</table></div>`,
      })
      .catch((err) => console.error('[audit-apply] admin email failed:', err))

    await resend.emails
      .send({
        from: `Ben at SpokeBnB <${COURSE_FROM}>`,
        to: email,
        replyTo: BEN_EMAIL,
        subject: 'Got your audit application',
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:20px;background:#f0ede8;font-family:system-ui,sans-serif">
<div style="max-width:520px;margin:0 auto;background:#09263A;border-radius:12px;overflow:hidden">
<div style="padding:26px 30px 18px;border-bottom:1px solid rgba(255,255,255,0.08)">
<p style="margin:0 0 5px;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#D4A017;font-weight:600">SpokeBnB</p>
<h1 style="margin:0;font-size:20px;font-weight:700;color:#F7F3EA">Application received${firstName ? `, ${firstName}` : ''}.</h1>
</div>
<div style="padding:22px 30px">
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65)">If a spot is open, you'll get a calendar link within 24 hours. If this week is full, I'll reach out with the next available slot.</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65)">Keep an eye on your inbox — and check spam just in case.</p>
<hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:0 0 18px">
<p style="margin:0;font-size:13px;color:rgba(247,243,234,0.3)">Questions? Reply to this email — it goes directly to me.</p>
<p style="margin:6px 0 0;font-size:13px;color:rgba(247,243,234,0.3)">— Ben</p>
</div>
</div>
</body></html>`,
      })
      .catch((err) => console.error('[audit-apply] confirmation email failed:', err))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[audit-apply] error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
