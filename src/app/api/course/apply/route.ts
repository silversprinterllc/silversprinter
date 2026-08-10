import { NextRequest, NextResponse } from 'next/server'

const TRACK_LABELS: Record<string, string> = {
  direct: 'Direct Booking System',
  automation: 'Automation Stack',
  content: 'Content & Growth Engine',
}

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

    // Send notification email to Ben via SMTP or a service like Resend
    // For now, log and return success — wire SMTP/Resend when ready
    const applicationData = {
      submittedAt: new Date().toISOString(),
      applicant: {
        name,
        email,
        phone: phone || 'Not provided',
      },
      property: {
        listingUrl: propertyUrl || 'Not provided',
        units,
      },
      goals: {
        track: TRACK_LABELS[track] || track,
        currentRevenue: currentRevenue || 'Not provided',
        revenueGoal: revenueGoal || 'Not provided',
        timeline,
      },
      context: {
        biggestChallenge: biggestChallenge || 'Not provided',
        heardFrom: heardFrom || 'Not provided',
      },
    }

    console.log('[Concierge Application]', JSON.stringify(applicationData, null, 2))

    // TODO: Wire to Resend or SMTP
    // await resend.emails.send({
    //   from: 'SpokeBnB <noreply@spokebnb.com>',
    //   to: ['ben@thehoadleygroup.com'],
    //   subject: `New Concierge Application — ${name} (${TRACK_LABELS[track]})`,
    //   html: buildEmailHtml(applicationData),
    // })

    // TODO: Also add to Kit (ConvertKit) with tag "concierge-applicant"

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Apply route error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
