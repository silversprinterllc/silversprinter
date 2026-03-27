// Sterling Route Email Templates
// Design: dark bg (#0a0a0a), gold accents (#c9a96e), cream text (#f0e6d0)
// Cormorant Garamond headlines, clean sans-serif body

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Sterling Route</title>
  <!--[if mso]>
  <noscript>
    <xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:8px;">
              <span style="font-family:Georgia,serif;font-size:22px;font-weight:400;letter-spacing:0.18em;color:#c9a96e;text-transform:uppercase;">Sterling Route</span>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:36px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#c9a96e,transparent);"></div>
            </td>
          </tr>

          <!-- Body -->
          ${content}

          <!-- Footer -->
          <tr>
            <td style="padding-top:36px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#c9a96e 30%,#c9a96e 70%,transparent);"></div>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top:24px;padding-bottom:8px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#6b6058;line-height:1.6;">
                Questions? Reply to this email or text us.<br/>
                <span style="color:#a09080;">Sterling Route &middot; Palm Beach County, FL &middot; </span>
                <a href="mailto:hello@sterlingroute.com" style="color:#c9a96e;text-decoration:none;">hello@sterlingroute.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── 1. Booking Confirmation ──────────────────────────────────────────────────

export function bookingConfirmationEmail(data: {
  firstName: string
  bookingRef: string
  startDate: string
  endDate: string
  totalDays: number
  tripType: string
  passengers: number
  addOns: string[]
  depositAmount: number
  balanceAmount: number
  balanceDueDate: string
}): { subject: string; html: string } {
  const subject = `Your Sterling Route booking is confirmed — Ref #${data.bookingRef}`

  const addOnsHtml =
    data.addOns && data.addOns.length > 0
      ? data.addOns
          .map(
            (a) =>
              `<tr><td style="font-family:Arial,sans-serif;font-size:14px;color:#f0e6d0;padding:4px 0;">&bull; ${a}</td></tr>`
          )
          .join('')
      : `<tr><td style="font-family:Arial,sans-serif;font-size:14px;color:#6b6058;padding:4px 0;">None selected</td></tr>`

  const body = `
          <tr>
            <td style="padding-bottom:8px;">
              <h1 style="margin:0;font-family:Georgia,serif;font-size:42px;font-weight:400;color:#f0e6d0;letter-spacing:0.02em;line-height:1.1;">You&rsquo;re Booked.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:16px;color:#a09080;line-height:1.5;">Here&rsquo;s everything you need to know before your trip.</p>
            </td>
          </tr>

          <!-- Greeting -->
          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#f0e6d0;line-height:1.6;">Hi ${data.firstName},</p>
              <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:15px;color:#c0b0a0;line-height:1.6;">Your reservation is confirmed. Here are your booking details.</p>
            </td>
          </tr>

          <!-- Booking Details Box -->
          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2a2520;border-radius:4px;background-color:#111008;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a96e;">Booking Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="40%" style="font-family:Arial,sans-serif;font-size:13px;color:#6b6058;padding:6px 0;">Booking Ref</td>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#f0e6d0;padding:6px 0;font-weight:600;">#${data.bookingRef}</td>
                      </tr>
                      <tr>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#6b6058;padding:6px 0;">Dates</td>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#f0e6d0;padding:6px 0;">${data.startDate} &ndash; ${data.endDate} (${data.totalDays} day${data.totalDays !== 1 ? 's' : ''})</td>
                      </tr>
                      <tr>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#6b6058;padding:6px 0;">Trip Type</td>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#f0e6d0;padding:6px 0;">${data.tripType}</td>
                      </tr>
                      <tr>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#6b6058;padding:6px 0;">Passengers</td>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#f0e6d0;padding:6px 0;">${data.passengers}</td>
                      </tr>
                      <tr>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#6b6058;padding:6px 0;vertical-align:top;">Add-ons</td>
                        <td style="padding:6px 0;">
                          <table cellpadding="0" cellspacing="0" border="0">
                            ${addOnsHtml}
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Payment Summary -->
          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2a2520;border-radius:4px;background-color:#111008;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a96e;">Payment Summary</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#6b6058;padding:6px 0;">Deposit Paid</td>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#7ec88a;padding:6px 0;">$${data.depositAmount.toLocaleString()} &#10003;</td>
                      </tr>
                      <tr>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#6b6058;padding:6px 0;">Balance Due</td>
                        <td style="font-family:Arial,sans-serif;font-size:13px;color:#f0e6d0;padding:6px 0;">$${data.balanceAmount.toLocaleString()}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding:8px 0 0;">
                          <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#6b6058;line-height:1.5;">Balance of <strong style="color:#c0b0a0;">$${data.balanceAmount.toLocaleString()}</strong> will be charged automatically to your card on file ${data.balanceDueDate}.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Insurance Reminder -->
          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #c9a96e;border-radius:4px;background-color:#0f0c07;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a96e;">Insurance Required Before Your Trip</p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#c0b0a0;line-height:1.6;">
                      Email proof of <strong style="color:#f0e6d0;">$1M+ liability coverage</strong> to
                      <a href="mailto:hello@sterlingroute.com" style="color:#c9a96e;text-decoration:none;">hello@sterlingroute.com</a>
                      before your trip begins.<br/>
                      Need coverage? Get it at <a href="https://roamly.com" style="color:#c9a96e;text-decoration:none;">roamly.com</a> — fast, easy, designed for van rentals.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a96e;">Next Steps</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="top" style="font-family:Arial,sans-serif;font-size:13px;color:#c9a96e;font-weight:700;">1.</td>
                        <td style="font-family:Arial,sans-serif;font-size:14px;color:#c0b0a0;line-height:1.5;">Get Roamly insurance and email proof to <a href="mailto:hello@sterlingroute.com" style="color:#c9a96e;text-decoration:none;">hello@sterlingroute.com</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="top" style="font-family:Arial,sans-serif;font-size:13px;color:#c9a96e;font-weight:700;">2.</td>
                        <td style="font-family:Arial,sans-serif;font-size:14px;color:#c0b0a0;line-height:1.5;">Review your rental agreement at <a href="https://sterlingroute.com/rental-terms" style="color:#c9a96e;text-decoration:none;">sterlingroute.com/rental-terms</a></td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="top" style="font-family:Arial,sans-serif;font-size:13px;color:#c9a96e;font-weight:700;">3.</td>
                        <td style="font-family:Arial,sans-serif;font-size:14px;color:#c0b0a0;line-height:1.5;">Your balance of <strong style="color:#f0e6d0;">$${data.balanceAmount.toLocaleString()}</strong> will be auto-charged 24 hours before departure</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="top" style="font-family:Arial,sans-serif;font-size:13px;color:#c9a96e;font-weight:700;">4.</td>
                        <td style="font-family:Arial,sans-serif;font-size:14px;color:#c0b0a0;line-height:1.5;">You&rsquo;ll receive pickup details and a full trip checklist 48 hours before departure</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `

  return { subject, html: emailWrapper(body) }
}

// ─── 2. Balance Reminder ──────────────────────────────────────────────────────

export function balanceReminderEmail(data: {
  firstName: string
  bookingRef: string
  startDate: string
  balanceAmount: number
  pickupAddress: string
  pickupTime: string
}): { subject: string; html: string } {
  const subject = `Balance charged + pickup details — Sterling Route Ref #${data.bookingRef}`

  const body = `
          <tr>
            <td style="padding-bottom:8px;">
              <h1 style="margin:0;font-family:Georgia,serif;font-size:38px;font-weight:400;color:#f0e6d0;letter-spacing:0.02em;line-height:1.1;">Your Balance Has Been Charged.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:16px;color:#a09080;line-height:1.5;">Here&rsquo;s everything for tomorrow.</p>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#f0e6d0;line-height:1.6;">Hi ${data.firstName},</p>
              <p style="margin:8px 0 0;font-family:Arial,sans-serif;font-size:15px;color:#c0b0a0;line-height:1.6;">Your trip begins tomorrow. Your remaining balance has been processed and you&rsquo;re all set.</p>
            </td>
          </tr>

          <!-- Success Box -->
          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2d5a3d;border-radius:4px;background-color:#0a1a0f;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#7ec88a;line-height:1.5;">
                      &#10003;&nbsp; Balance of <strong>$${data.balanceAmount.toLocaleString()}</strong> charged successfully to card on file.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Pickup Details -->
          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #c9a96e;border-radius:4px;background-color:#0f0c07;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a96e;">Pickup Details</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:6px 0;">
                          <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#f0e6d0;line-height:1.5;">
                            &#128205;&nbsp; ${data.pickupAddress}
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#f0e6d0;line-height:1.5;">
                            &#128336;&nbsp; Your pickup time: <strong>${data.pickupTime}</strong>
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;">
                          <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#c9a96e;line-height:1.5;">
                            &#9981;&nbsp; The van will be fueled. Please return it full <strong>(DIESEL ONLY)</strong>.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Checklist Preview -->
          <tr>
            <td style="padding-bottom:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2a2520;border-radius:4px;background-color:#111008;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:14px;color:#a09080;line-height:1.5;">
                      Your full trip checklist is in the next email. Please read it before pickup.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
  `

  return { subject, html: emailWrapper(body) }
}

// ─── 3. Pre-Trip SOP ──────────────────────────────────────────────────────────

export function preTripSOPEmail(data: {
  firstName: string
  bookingRef: string
  startDate: string
  pickupAddress: string
  pickupTime: string
  totalDays: number
}): { subject: string; html: string } {
  const subject = `Trip checklist + van rules — Sterling Route Ref #${data.bookingRef}`

  // Calculate return date
  const startDateObj = new Date(data.startDate)
  startDateObj.setDate(startDateObj.getDate() + data.totalDays)
  const returnDate = startDateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const rules = [
    {
      title: 'DIESEL ONLY',
      body: 'This van runs on diesel. DO NOT put regular or premium gasoline in this vehicle. Look for the green diesel nozzle. Misfueling is your liability — minimum $3,000 repair.',
    },
    {
      title: 'BRIDGE CLEARANCE',
      body: "Vehicle height is 9'6\". Minimum bridge/garage clearance required: 10'6\". Do not enter parking garages without confirming clearance. Plan your route accordingly.",
    },
    {
      title: 'DUMP THE TANKS',
      body: 'The commode has a black water holding tank. You are responsible for dumping it before or at return. Failure to dump: $125 fee, no exceptions, no membership waivers.',
    },
    {
      title: 'NO SMOKING',
      body: 'Zero tolerance. Any evidence of smoking inside the vehicle: $500 fee, immediate.',
    },
    {
      title: 'NO PETS',
      body: 'No animals in the vehicle under any circumstances. Evidence of pets: $500 fee.',
    },
    {
      title: 'RETURN FULL',
      body: 'Fuel tank must be returned full (diesel). Failure to refuel: cost of fuel + $35 service fee.',
    },
    {
      title: '10 PASSENGER MAXIMUM',
      body: 'Do not exceed 10 passengers. Seatbelts required for all occupants at all times.',
    },
  ]

  const rulesHtml = rules
    .map(
      (r) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1e1a14;">
          <p style="margin:0 0 4px;font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#c9a96e;letter-spacing:0.05em;">&#9888;&nbsp; ${r.title}</p>
          <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#c0b0a0;line-height:1.6;">${r.body}</p>
        </td>
      </tr>`
    )
    .join('')

  const body = `
          <tr>
            <td style="padding-bottom:8px;">
              <h1 style="margin:0;font-family:Georgia,serif;font-size:38px;font-weight:400;color:#f0e6d0;letter-spacing:0.02em;line-height:1.1;">The Van Is Ready. Read This First.</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:16px;color:#a09080;line-height:1.5;">Your trip starts tomorrow. A few things that matter.</p>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:24px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#f0e6d0;line-height:1.6;">Hi ${data.firstName},</p>
            </td>
          </tr>

          <!-- Pickup -->
          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2a2520;border-radius:4px;background-color:#111008;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a96e;">Pickup</p>
                    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:14px;color:#f0e6d0;line-height:1.5;">&#128205;&nbsp; ${data.pickupAddress}</p>
                    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:14px;color:#f0e6d0;line-height:1.5;">&#128336;&nbsp; Pickup time: <strong>${data.pickupTime}</strong></p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#a09080;line-height:1.5;">Photo ID required at pickup. You must be the named renter.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Critical Rules -->
          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #c9a96e;border-radius:4px;background-color:#0f0c07;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a96e;">Critical Rules — Read Before You Go</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${rulesHtml}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Return -->
          <tr>
            <td style="padding-bottom:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2a2520;border-radius:4px;background-color:#111008;">
                <tr>
                  <td style="padding:24px;">
                    <p style="margin:0 0 16px;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#c9a96e;">Return</p>
                    <p style="margin:0 0 8px;font-family:Arial,sans-serif;font-size:14px;color:#f0e6d0;line-height:1.5;">&#128197;&nbsp; Return date: <strong>${returnDate}</strong></p>
                    <p style="margin:0 0 12px;font-family:Arial,sans-serif;font-size:14px;color:#f0e6d0;line-height:1.5;">&#128205;&nbsp; Return to: ${data.pickupAddress}</p>
                    <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#7ec88a;line-height:1.8;">
                      Tanks dumped &#10003;&nbsp;&nbsp;|&nbsp;&nbsp;Fuel full &#10003;&nbsp;&nbsp;|&nbsp;&nbsp;Clean interior &#10003;
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Closing -->
          <tr>
            <td style="padding-bottom:16px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:18px;font-style:italic;color:#c9a96e;line-height:1.6;">Have an incredible trip.</p>
              <p style="margin:4px 0 0;font-family:Arial,sans-serif;font-size:13px;color:#6b6058;">&#8212; The Sterling Route Team</p>
            </td>
          </tr>
  `

  return { subject, html: emailWrapper(body) }
}

// ─── 4. Review Request ────────────────────────────────────────────────────────

export function reviewRequestEmail(data: {
  firstName: string
  bookingRef: string
  reviewToken: string
  tripType: string
}): { subject: string; html: string } {
  const subject = `How was your Sterling Route trip? We'd love to hear.`
  const reviewUrl = `https://sterlingroute.com/reviews/${data.reviewToken}`

  const body = `
          <tr>
            <td style="padding-bottom:8px;">
              <h1 style="margin:0;font-family:Georgia,serif;font-size:42px;font-weight:400;color:#f0e6d0;letter-spacing:0.02em;line-height:1.1;">How Was It?</h1>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:15px;color:#f0e6d0;line-height:1.6;">Hi ${data.firstName},</p>
              <p style="margin:12px 0 0;font-family:Arial,sans-serif;font-size:15px;color:#c0b0a0;line-height:1.6;">
                We hope your ${data.tripType} trip went exactly as planned. Your honest review helps us improve and helps other travelers make the right decision.
              </p>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding-bottom:28px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="border-radius:3px;background-color:#c9a96e;">
                    <a href="${reviewUrl}" style="display:inline-block;padding:16px 40px;font-family:Arial,sans-serif;font-size:14px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#0a0a0a;text-decoration:none;">Leave Your Review &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding-bottom:32px;" align="center">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#6b6058;line-height:1.6;">Takes about 2 minutes. Completely optional &mdash; but genuinely appreciated.</p>
            </td>
          </tr>
  `

  return { subject, html: emailWrapper(body) }
}

// ─── 5. Sterling Reserve Application (owner notification) ────────────────────

export function reserveApplicationEmail(data: {
  firstName: string
  email: string
  phone: string
  tier: string
  message: string
}): { subject: string; html: string } {
  const subject = `New Sterling Reserve Application — ${data.tier} — ${data.firstName}`

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New Sterling Reserve Application</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0a;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="padding-bottom:8px;">
              <span style="font-family:Georgia,serif;font-size:20px;font-weight:400;letter-spacing:0.18em;color:#c9a96e;text-transform:uppercase;">Sterling Route</span>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:28px;">
              <div style="height:1px;background:#c9a96e;"></div>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:24px;">
              <h1 style="margin:0;font-family:Georgia,serif;font-size:28px;font-weight:400;color:#f0e6d0;">New Sterling Reserve Application</h1>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #2a2520;border-radius:4px;background-color:#111008;">
                <tr>
                  <td style="padding:24px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="140" style="font-size:13px;color:#6b6058;padding:6px 0;vertical-align:top;">Applicant Name</td>
                        <td style="font-size:13px;color:#f0e6d0;padding:6px 0;font-weight:600;">${data.firstName}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#6b6058;padding:6px 0;vertical-align:top;">Email</td>
                        <td style="font-size:13px;padding:6px 0;"><a href="mailto:${data.email}" style="color:#c9a96e;text-decoration:none;">${data.email}</a></td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#6b6058;padding:6px 0;vertical-align:top;">Phone</td>
                        <td style="font-size:13px;color:#f0e6d0;padding:6px 0;">${data.phone}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#6b6058;padding:6px 0;vertical-align:top;">Requested Tier</td>
                        <td style="font-size:13px;color:#c9a96e;padding:6px 0;font-weight:700;">${data.tier}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#6b6058;padding:6px 0;vertical-align:top;">Message</td>
                        <td style="font-size:13px;color:#c0b0a0;padding:6px 0;line-height:1.6;">${data.message || '(No message provided)'}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td>
              <p style="margin:0;font-size:12px;color:#6b6058;">Received via Sterling Reserve application form.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  return { subject, html }
}
