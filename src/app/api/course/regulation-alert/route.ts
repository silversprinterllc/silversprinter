import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

const COURSE_FROM = process.env.COURSE_FROM_EMAIL || 'ben@spokebnb.com'
const BEN_EMAIL = 'ben@spokebnb.com'

export async function POST(req: NextRequest) {
  try {
    const { email, city } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    await resend.emails
      .send({
        from: `SpokeBnB <${COURSE_FROM}>`,
        to: BEN_EMAIL,
        subject: `Regulation alert signup${city ? ` — ${city}` : ''}`,
        html: `<div style="font-family:system-ui,sans-serif;padding:20px"><p>New regulation alert subscriber:</p><p><strong>${email}</strong></p><p style="color:#888">City: ${city || 'not specified'}</p></div>`,
      })
      .catch((err) => console.error('[regulation-alert] admin email failed:', err))

    await resend.emails
      .send({
        from: `Ben at SpokeBnB <${COURSE_FROM}>`,
        to: email,
        replyTo: BEN_EMAIL,
        subject: "You're subscribed to STR regulation alerts",
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:20px;background:#f0ede8;font-family:system-ui,sans-serif">
<div style="max-width:520px;margin:0 auto;background:#09263A;border-radius:12px;overflow:hidden">
<div style="padding:26px 30px 18px;border-bottom:1px solid rgba(255,255,255,0.08)">
<p style="margin:0 0 5px;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#D4A017;font-weight:600">SpokeBnB</p>
<h1 style="margin:0;font-size:20px;font-weight:700;color:#F7F3EA">You're on the list.</h1>
</div>
<div style="padding:22px 30px">
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65)">We'll email you the moment regulations shift in${city ? ` ${city}` : ' your market'} — license requirements, minimum stays, pending legislation, or anything else that affects your operation.</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65)">You'll only hear from us when something actually changes. One email, no noise.</p>
<hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:0 0 18px">
<p style="margin:0;font-size:13px;color:rgba(247,243,234,0.3)">Questions? Reply here — it goes directly to me.</p>
<p style="margin:6px 0 0;font-size:13px;color:rgba(247,243,234,0.3)">— Ben</p>
</div>
</div>
</body></html>`,
      })
      .catch((err) => console.error('[regulation-alert] confirmation email failed:', err))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[regulation-alert] error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
