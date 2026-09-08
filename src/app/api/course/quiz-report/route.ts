import { NextRequest, NextResponse } from 'next/server'
import { resend } from '@/lib/resend'

const COURSE_FROM = process.env.COURSE_FROM_EMAIL || 'ben@spokebnb.com'
const BEN_EMAIL = 'ben@spokebnb.com'
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://spokebnb.com'

function esc(s: unknown): string {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

const TONE_COLORS: Record<string, string> = {
  critical: '#EF4444',
  warning: '#F59E0B',
  positive: '#10B981',
}

const TONE_LABELS: Record<string, string> = {
  critical: '⚠ CRITICAL',
  warning: '◆ WATCH',
  positive: '✓ STRENGTH',
}

const BUCKET_COLORS: Record<string, string> = {
  strong: '#10B981',
  competitive: '#3B82F6',
  'at-risk': '#F59E0B',
  critical: '#EF4444',
}

type Finding = { title: string; body: string; tone: 'positive' | 'warning' | 'critical' }
type Move = { title: string; body: string }

interface ReportPayload {
  email: string
  name?: string
  location?: string
  score: number
  bucketId: string
  bucketLabel: string
  bucketHeadline: string
  bucketSummary: string
  findings: Finding[]
  moves: Move[]
}

function buildReportEmail(p: ReportPayload): string {
  const bucketColor = BUCKET_COLORS[p.bucketId] || '#D4A017'
  const greeting = p.name ? `Hi ${esc(p.name)},` : 'Hi,'
  const locationLine = p.location ? `<p style="margin:0 0 4px;font-size:13px;color:rgba(247,243,234,0.4);">Market: ${esc(p.location)}</p>` : ''

  const findingsHtml = p.findings.map((f) => {
    const color = TONE_COLORS[f.tone] || '#D4A017'
    const label = TONE_LABELS[f.tone] || ''
    return `
      <div style="margin-bottom:16px;padding:16px 18px;background:rgba(255,255,255,0.04);border-left:3px solid ${color};border-radius:0 8px 8px 0;">
        <p style="margin:0 0 4px;font-size:10px;font-weight:700;letter-spacing:0.1em;color:${color};">${label}</p>
        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#F7F3EA;">${esc(f.title)}</p>
        <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(247,243,234,0.6);">${esc(f.body)}</p>
      </div>`
  }).join('')

  const movesHtml = p.moves.map((m, i) => `
    <div style="margin-bottom:14px;padding:14px 18px;background:rgba(212,160,23,0.08);border:1px solid rgba(212,160,23,0.2);border-radius:8px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#D4A017;letter-spacing:0.08em;">MOVE ${i + 1}</p>
      <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#F7F3EA;">${esc(m.title)}</p>
      <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(247,243,234,0.6);">${esc(m.body)}</p>
    </div>`
  ).join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your STR Saturation Report</title></head>
<body style="margin:0;padding:20px 10px;background:#0D1B2A;font-family:system-ui,-apple-system,sans-serif;">
  <div style="max-width:560px;margin:0 auto;">

    <!-- Header -->
    <div style="padding:24px 28px 20px;border-bottom:1px solid rgba(255,255,255,0.08);">
      <p style="margin:0 0 4px;font-size:10px;text-transform:uppercase;letter-spacing:0.18em;color:#D4A017;font-weight:700;">SpokeBnB</p>
      <h1 style="margin:0;font-size:18px;font-weight:700;color:#F7F3EA;">Your STR Saturation Diagnostic</h1>
    </div>

    <!-- Greeting -->
    <div style="padding:22px 28px 0;">
      <p style="margin:0 0 18px;font-size:15px;color:rgba(247,243,234,0.7);">${greeting}</p>
      <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:rgba(247,243,234,0.65);">Here's your full diagnostic. These findings are generated from your specific answers — not a generic template.</p>
    </div>

    <!-- Score card -->
    <div style="margin:0 28px 24px;padding:20px 24px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:12px;text-align:center;">
      ${locationLine}
      <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:0.12em;color:${bucketColor};">${esc(p.bucketLabel)}</p>
      <p style="margin:0 0 4px;font-size:52px;font-weight:800;color:#F7F3EA;line-height:1;">${p.score}</p>
      <p style="margin:0 0 14px;font-size:12px;color:rgba(247,243,234,0.3);">out of 100</p>
      <p style="margin:0;font-size:14px;font-weight:600;color:#F7F3EA;">${esc(p.bucketHeadline)}</p>
    </div>

    <!-- Summary -->
    <div style="padding:0 28px 24px;">
      <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(247,243,234,0.6);">${esc(p.bucketSummary)}</p>
    </div>

    <!-- Findings -->
    <div style="padding:0 28px 24px;">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(247,243,234,0.3);">What We Found</p>
      ${findingsHtml}
    </div>

    <!-- Moves -->
    <div style="padding:0 28px 24px;">
      <p style="margin:0 0 14px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(247,243,234,0.3);">Your Top ${p.moves.length} Moves</p>
      ${movesHtml}
    </div>

    <!-- CTA -->
    <div style="padding:0 28px 28px;text-align:center;">
      <a href="${APP_URL}/course#pricing" style="display:inline-block;background:#D4A017;color:#09263A;font-weight:700;font-size:14px;padding:14px 32px;border-radius:8px;text-decoration:none;margin-bottom:14px;">See the Full System →</a>
      <p style="margin:12px 0 0;font-size:12px;color:rgba(247,243,234,0.25);">Questions? Reply to this email — it goes directly to me.<br>— Ben</p>
    </div>

    <!-- Footer -->
    <div style="padding:16px 28px;border-top:1px solid rgba(255,255,255,0.06);">
      <p style="margin:0;font-size:11px;color:rgba(247,243,234,0.2);">SpokeBnB · A product of Barefoot Realty &amp; Investments · <a href="${APP_URL}/course/legal/privacy" style="color:rgba(247,243,234,0.3);">Privacy Policy</a></p>
    </div>
  </div>
</body>
</html>`
}

function buildAdminNotification(p: ReportPayload): string {
  return `<div style="font-family:system-ui,sans-serif;padding:20px;background:#f5f5f5;">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;">
    <div style="background:#09263A;padding:14px 20px;">
      <p style="margin:0;font-size:13px;font-weight:700;color:#D4A017;">Quiz Lead — Score ${p.score} (${esc(p.bucketLabel)})</p>
    </div>
    <div style="padding:16px 20px;">
      <p style="margin:0 0 6px;font-size:14px;"><strong>Email:</strong> ${esc(p.email)}</p>
      ${p.name ? `<p style="margin:0 0 6px;font-size:14px;"><strong>Name:</strong> ${esc(p.name)}</p>` : ''}
      ${p.location ? `<p style="margin:0 0 6px;font-size:14px;"><strong>Market:</strong> ${esc(p.location)}</p>` : ''}
      <p style="margin:0 0 6px;font-size:14px;"><strong>Bucket:</strong> ${esc(p.bucketLabel)}</p>
      <p style="margin:0;font-size:14px;"><strong>Score:</strong> ${p.score}/100</p>
    </div>
    <div style="padding:10px 20px 16px;">
      <a href="mailto:${esc(p.email)}" style="background:#D4A017;color:#09263A;font-weight:700;padding:9px 20px;border-radius:6px;text-decoration:none;font-size:13px;">Reply to Lead</a>
    </div>
  </div>
</div>`
}

export async function POST(req: NextRequest) {
  try {
    const body: ReportPayload = await req.json()
    const { email, name, score, bucketId, findings, moves } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    }
    if (typeof score !== 'number' || !bucketId || !Array.isArray(findings) || !Array.isArray(moves)) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const [reportResult, adminResult] = await Promise.allSettled([
      resend.emails.send({
        from: `Ben at SpokeBnB <${COURSE_FROM}>`,
        to: email,
        replyTo: BEN_EMAIL,
        subject: `Your STR Saturation Score: ${score}/100 — ${body.bucketLabel}`,
        html: buildReportEmail(body),
      }),
      resend.emails.send({
        from: `SpokeBnB <${COURSE_FROM}>`,
        to: BEN_EMAIL,
        subject: `Quiz lead: ${score}/100 (${body.bucketLabel})${name ? ` — ${name}` : ''} — ${email}`,
        html: buildAdminNotification(body),
      }),
    ])

    if (reportResult.status === 'rejected') {
      console.error('[quiz-report] report email failed:', reportResult.reason)
      return NextResponse.json({ error: 'Failed to send report' }, { status: 500 })
    }
    if (adminResult.status === 'rejected') {
      console.error('[quiz-report] admin email failed:', adminResult.reason)
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[quiz-report] error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
