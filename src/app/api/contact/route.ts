import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_build_only')
const FROM = process.env.FROM_EMAIL || 'hello@sterlingroute.com'
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'ben@thehoadleygroup.com'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  inquiryType: z.string().optional(),
  preferredDates: z.string().optional(),
  message: z.string().min(20),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    await resend.emails.send({
      from: FROM,
      to: OWNER_EMAIL,
      replyTo: data.email,
      subject: `New Sterling Route Inquiry — ${data.name}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f0e6d0;padding:32px;border-radius:4px;">
          <h1 style="color:#c9a96e;font-size:24px;font-family:Georgia,serif;font-weight:400;margin:0 0 24px;">New Contact Inquiry</h1>
          <table cellpadding="0" cellspacing="0" border="0" width="100%">
            <tr>
              <td width="140" style="font-size:13px;color:#6b6058;padding:6px 0;">Name</td>
              <td style="font-size:13px;color:#f0e6d0;padding:6px 0;font-weight:600;">${data.name}</td>
            </tr>
            <tr>
              <td style="font-size:13px;color:#6b6058;padding:6px 0;">Email</td>
              <td style="font-size:13px;padding:6px 0;"><a href="mailto:${data.email}" style="color:#c9a96e;text-decoration:none;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="font-size:13px;color:#6b6058;padding:6px 0;">Phone</td>
              <td style="font-size:13px;color:#f0e6d0;padding:6px 0;">${data.phone}</td>
            </tr>
            ${data.inquiryType ? `<tr><td style="font-size:13px;color:#6b6058;padding:6px 0;">Inquiry Type</td><td style="font-size:13px;color:#f0e6d0;padding:6px 0;">${data.inquiryType}</td></tr>` : ''}
            ${data.preferredDates ? `<tr><td style="font-size:13px;color:#6b6058;padding:6px 0;">Preferred Dates</td><td style="font-size:13px;color:#f0e6d0;padding:6px 0;">${data.preferredDates}</td></tr>` : ''}
          </table>
          <div style="margin:20px 0 0;padding:16px;background:#1a1612;border-radius:4px;">
            <p style="font-size:13px;color:#6b6058;margin:0 0 8px;">Message</p>
            <p style="font-size:14px;color:#f0e6d0;margin:0;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 })
    }
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
  }
}
