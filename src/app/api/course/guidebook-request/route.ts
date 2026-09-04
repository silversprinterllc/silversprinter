import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

const COURSE_FROM = process.env.COURSE_FROM_EMAIL || 'ben@spokebnb.com'
const BEN_EMAIL = 'ben@spokebnb.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://spokebnb.com'

export async function POST(req: NextRequest) {
  try {
    const { firstName, email, propertyLocation } = await req.json()

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }

    await resend.emails
      .send({
        from: `SpokeBnB <${COURSE_FROM}>`,
        to: BEN_EMAIL,
        subject: `Guidebook request — ${firstName || email}`,
        html: `<div style="font-family:system-ui,sans-serif;padding:20px"><p>New guidebook template request:</p><p><strong>${firstName || '—'}</strong> — ${email}</p><p style="color:#888">Location: ${propertyLocation || 'not provided'}</p></div>`,
      })
      .catch((err) => console.error('[guidebook-request] admin email failed:', err))

    await resend.emails
      .send({
        from: `Ben at SpokeBnB <${COURSE_FROM}>`,
        to: email,
        replyTo: BEN_EMAIL,
        subject: 'Your SpokeBnB Guidebook Template',
        html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:20px;background:#f0ede8;font-family:system-ui,sans-serif">
<div style="max-width:520px;margin:0 auto;background:#09263A;border-radius:12px;overflow:hidden">
<div style="padding:26px 30px 18px;border-bottom:1px solid rgba(255,255,255,0.08)">
<p style="margin:0 0 5px;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#D4A017;font-weight:600">SpokeBnB</p>
<h1 style="margin:0;font-size:20px;font-weight:700;color:#F7F3EA">Your Guidebook Template${firstName ? `, ${firstName}` : ''}</h1>
</div>
<div style="padding:22px 30px">
<p style="margin:0 0 14px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65)">The SpokeBnB Local Area Guidebook is a Notion template built for STR operators who want guests to book local experiences and earn referral income while they stay.</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65)">Duplicate it to your Notion workspace, swap the placeholder content with your local recommendations, and share the link with every guest.</p>
<a href="${APP_URL}/course/guidebook" style="display:inline-block;background:#D4A017;color:#09263A;font-weight:700;font-size:14px;padding:12px 26px;border-radius:8px;text-decoration:none;margin-bottom:20px">Access the Template →</a>
<hr style="border:none;border-top:1px solid rgba(255,255,255,0.07);margin:0 0 18px">
<p style="margin:0;font-size:13px;color:rgba(247,243,234,0.3)">Questions? Reply here — it goes directly to me.</p>
<p style="margin:6px 0 0;font-size:13px;color:rgba(247,243,234,0.3)">— Ben</p>
</div>
</div>
</body></html>`,
      })
      .catch((err) => console.error('[guidebook-request] delivery email failed:', err))

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[guidebook-request] error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
