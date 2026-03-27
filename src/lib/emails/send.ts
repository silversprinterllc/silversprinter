import { Resend } from 'resend'
import {
  bookingConfirmationEmail,
  balanceReminderEmail,
  preTripSOPEmail,
  reviewRequestEmail,
  reserveApplicationEmail,
} from './templates'

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder_build_only')
const FROM = process.env.FROM_EMAIL || 'hello@sterlingroute.com'
const OWNER_EMAIL = process.env.OWNER_EMAIL || 'ben@thehoadleygroup.com'

export async function sendBookingConfirmation(
  to: string,
  data: Parameters<typeof bookingConfirmationEmail>[0]
) {
  const { subject, html } = bookingConfirmationEmail(data)
  return resend.emails.send({ from: FROM, to, subject, html })
}

export async function sendBalanceReminder(
  to: string,
  data: Parameters<typeof balanceReminderEmail>[0]
) {
  const { subject, html } = balanceReminderEmail(data)
  return resend.emails.send({ from: FROM, to, subject, html })
}

export async function sendPreTripSOP(
  to: string,
  data: Parameters<typeof preTripSOPEmail>[0]
) {
  const { subject, html } = preTripSOPEmail(data)
  return resend.emails.send({ from: FROM, to, subject, html })
}

export async function sendReviewRequest(
  to: string,
  data: Parameters<typeof reviewRequestEmail>[0]
) {
  const { subject, html } = reviewRequestEmail(data)
  return resend.emails.send({ from: FROM, to, subject, html })
}

export async function sendReserveApplicationNotification(
  data: Parameters<typeof reserveApplicationEmail>[0]
) {
  const { subject, html } = reserveApplicationEmail(data)
  return resend.emails.send({ from: FROM, to: OWNER_EMAIL, subject, html })
}

export async function sendOwnerBookingNotification(bookingData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  bookingRef: string
  startDate: string
  endDate: string
  tripType: string
  passengers: number
  depositAmount: number
  totalAmount: number
}) {
  return resend.emails.send({
    from: FROM,
    to: OWNER_EMAIL,
    subject: `New Booking: ${bookingData.firstName} ${bookingData.lastName} — ${bookingData.startDate} — Ref #${bookingData.bookingRef}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0a0a0a;color:#f0e6d0;padding:32px;border-radius:4px;">
        <h1 style="color:#c9a96e;font-size:24px;font-family:Georgia,serif;font-weight:400;margin:0 0 24px;">New Booking Received</h1>
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="160" style="font-size:13px;color:#6b6058;padding:6px 0;">Ref</td>
            <td style="font-size:13px;color:#f0e6d0;padding:6px 0;font-weight:600;">#${bookingData.bookingRef}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#6b6058;padding:6px 0;">Name</td>
            <td style="font-size:13px;color:#f0e6d0;padding:6px 0;">${bookingData.firstName} ${bookingData.lastName}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#6b6058;padding:6px 0;">Email</td>
            <td style="font-size:13px;padding:6px 0;"><a href="mailto:${bookingData.email}" style="color:#c9a96e;text-decoration:none;">${bookingData.email}</a></td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#6b6058;padding:6px 0;">Phone</td>
            <td style="font-size:13px;color:#f0e6d0;padding:6px 0;">${bookingData.phone}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#6b6058;padding:6px 0;">Dates</td>
            <td style="font-size:13px;color:#f0e6d0;padding:6px 0;">${bookingData.startDate} &ndash; ${bookingData.endDate}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#6b6058;padding:6px 0;">Trip Type</td>
            <td style="font-size:13px;color:#f0e6d0;padding:6px 0;">${bookingData.tripType}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#6b6058;padding:6px 0;">Passengers</td>
            <td style="font-size:13px;color:#f0e6d0;padding:6px 0;">${bookingData.passengers}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#6b6058;padding:6px 0;">Deposit</td>
            <td style="font-size:13px;color:#7ec88a;padding:6px 0;">$${bookingData.depositAmount.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="font-size:13px;color:#6b6058;padding:6px 0;">Total</td>
            <td style="font-size:13px;color:#f0e6d0;padding:6px 0;font-weight:600;">$${bookingData.totalAmount.toLocaleString()}</td>
          </tr>
        </table>
        <p style="margin:24px 0 0;font-size:12px;color:#6b6058;">Check the dispatcher dashboard for full details.</p>
      </div>
    `,
  })
}
