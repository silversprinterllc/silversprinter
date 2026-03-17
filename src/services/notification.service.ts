import { prisma } from '@/lib/prisma'
import { getResend, FROM_EMAIL } from '@/lib/resend'
import { getTwilioClient, TWILIO_FROM } from '@/lib/twilio'
import { formatDateTime } from '@/lib/utils'

type NotificationEvent =
  | 'BOOKING_CONFIRMED'
  | 'CHAUFFEUR_ASSIGNED'
  | 'CHAUFFEUR_EN_ROUTE'
  | 'CHAUFFEUR_ARRIVED'
  | 'TRIP_COMPLETED'
  | 'REVIEW_REQUEST'
  | 'BALANCE_DUE'
  | 'CORPORATE_INVOICE'

export async function sendBookingNotification(bookingId: string, event: NotificationEvent) {
  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { user: true, vehicle: true, chauffeur: true },
  })
  if (!booking) return

  const { user, vehicle, chauffeur } = booking

  try {
    switch (event) {
      case 'BOOKING_CONFIRMED':
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: `Your SilverSprinter booking is confirmed — ${booking.bookingRef}`,
          html: `
            <h2>Booking Confirmed</h2>
            <p>Your booking <strong>${booking.bookingRef}</strong> is confirmed.</p>
            <p><strong>Date:</strong> ${formatDateTime(booking.pickupAt)}</p>
            <p><strong>Vehicle:</strong> ${vehicle.name}</p>
            <p><strong>Pickup:</strong> ${booking.pickupAddress}</p>
            <p><strong>Destination:</strong> ${booking.destinationAddress}</p>
            <p><strong>Deposit paid:</strong> $${booking.depositAmount}</p>
            <p><strong>Balance due 48h before trip:</strong> $${Number(booking.totalAmount) - Number(booking.depositAmount)}</p>
          `,
        })
        if (user.phone) {
          await getTwilioClient().messages.create({
            body: `Your SilverSprinter booking is confirmed for ${formatDateTime(booking.pickupAt)}. Booking ref: ${booking.bookingRef}`,
            from: TWILIO_FROM,
            to: user.phone,
          })
        }
        break

      case 'CHAUFFEUR_ASSIGNED':
        if (chauffeur) {
          await getResend().emails.send({
            from: FROM_EMAIL,
            to: user.email,
            subject: `Your chauffeur has been assigned — ${booking.bookingRef}`,
            html: `
              <h2>Chauffeur Assigned</h2>
              <p><strong>${chauffeur.name}</strong> has been assigned to your trip.</p>
              <p>Contact: ${chauffeur.phone}</p>
              <p>Rating: ${chauffeur.rating}/5.0 · ${chauffeur.totalTrips} trips</p>
            `,
          })
          if (user.phone) {
            await getTwilioClient().messages.create({
              body: `${chauffeur.name} has been assigned to your trip. They can be reached at ${chauffeur.phone}.`,
              from: TWILIO_FROM,
              to: user.phone,
            })
          }
        }
        break

      case 'CHAUFFEUR_EN_ROUTE':
        if (user.phone) {
          await getTwilioClient().messages.create({
            body: `Your chauffeur is on the way. Estimated arrival: 8 minutes. Track live: ${process.env.NEXT_PUBLIC_APP_URL}/portal/tracking/${booking.id}`,
            from: TWILIO_FROM,
            to: user.phone,
          })
        }
        break

      case 'CHAUFFEUR_ARRIVED':
        if (user.phone) {
          await getTwilioClient().messages.create({
            body: `${chauffeur?.name ?? 'Your chauffeur'} has arrived. ${vehicle.name} is parked at ${booking.pickupAddress}.`,
            from: TWILIO_FROM,
            to: user.phone,
          })
        }
        break

      case 'TRIP_COMPLETED': {
        const points = Math.floor(Number(booking.totalAmount) * 10)
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: `Trip complete — You earned ${points} loyalty points`,
          html: `
            <h2>Trip Complete</h2>
            <p>Thank you for riding with SilverSprinter.</p>
            <p>You earned <strong>${points} loyalty points</strong> on this trip.</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal">Rate your ride</a></p>
          `,
        })
        if (user.phone) {
          await getTwilioClient().messages.create({
            body: `Trip complete. You earned ${points} loyalty points. Rate your ride: ${process.env.NEXT_PUBLIC_APP_URL}/portal`,
            from: TWILIO_FROM,
            to: user.phone,
          })
        }
        break
      }

      case 'REVIEW_REQUEST':
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: 'How was your ride? Leave a review',
          html: `
            <h2>How was your experience?</h2>
            <p>We hope you enjoyed your journey in ${vehicle.name}.</p>
            <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/portal">Leave a review</a></p>
          `,
        })
        break

      case 'BALANCE_DUE': {
        const balance = Number(booking.totalAmount) - Number(booking.depositAmount)
        await getResend().emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: `Balance of $${balance.toFixed(2)} due — ${booking.bookingRef}`,
          html: `
            <h2>Balance Due Soon</h2>
            <p>Your balance of <strong>$${balance.toFixed(2)}</strong> will be charged in 24 hours.</p>
            <p>Trip: ${formatDateTime(booking.pickupAt)}</p>
          `,
        })
        if (user.phone) {
          await getTwilioClient().messages.create({
            body: `Your balance of $${balance.toFixed(2)} will be charged in 24 hours for your SilverSprinter trip on ${formatDateTime(booking.pickupAt)}.`,
            from: TWILIO_FROM,
            to: user.phone,
          })
        }
        break
      }
    }

    await prisma.bookingNotification.create({
      data: { bookingId, type: event, channel: 'EMAIL_SMS', status: 'SENT' },
    })
  } catch (err) {
    console.error(`Notification failed [${event}]:`, err)
    await prisma.bookingNotification.create({
      data: { bookingId, type: event, channel: 'EMAIL_SMS', status: 'FAILED' },
    })
  }
}
