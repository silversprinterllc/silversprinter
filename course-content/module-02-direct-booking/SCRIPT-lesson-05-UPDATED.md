# LESSON 2.5 (UPDATED): Email & SMS Funnels

*Automating the ecosystem's communication layer*

## Production Notes
- **Format:** OBSBOT screen recording (email platform setup) + Canon 70D (strategy + close)
- **Target Length:** 13-15 minutes
- **Screen Recording:** ConvertKit/Mailchimp sequence builder, SMS setup in PMS, Zapier-style connection between booking system and email platform

---

## VIDEO SCRIPT

### HOOK (0:00 - 0:30) [CANON 70D]

"You have a guest database. You have a site with 11 URLs. Now we wire them together with automation — 5 email sequences and 3 SMS flows that run 24/7 without you touching them. Once configured, they generate bookings on autopilot AND they feed the packages, the Insider list, and the referral program we're building into the ecosystem."

### THE 5 EMAIL SEQUENCES (0:30 - 4:00) [CANON 70D + SLIDES]

"**[SLIDE: The 5 Sequences]**

**Sequence 1: Welcome Series** (triggered on booking)
- Email 1: Booking confirmation + what to expect + /insider invitation
- Email 2 (3 days pre-arrival): Pre-arrival guide + add-on menu (Module 9 tie-in)
- Email 3 (day of arrival): Welcome + house basics

**Sequence 2: Mid-Stay Check-In** (2 days into stay)
- One email: 'How's it going? Anything we can add?'
- Soft pitch on remaining add-ons (chef dinner, late checkout)

**Sequence 3: Post-Stay + Review Request** (24h after checkout)
- Email 1 (24h): Thank you + review link
- Email 2 (72h, if no review): Gentle reminder
- Email 3 (7 days, if no review): Final ask + 10% direct booking credit

**Sequence 4: Return Guest Offer** (6 months post-checkout)
- Email 1 (6 mo): 'Ready to come back?' + 10-15% direct booking discount
- Email 2 (7 mo): 'Your favorite dates are still open'
- Email 3 (10 mo): 'Anniversary of your stay' + final offer

**Sequence 5: Referral Ask** (30 days post-checkout)
- Single email with unique /refer tracking link

**[SLIDE: What Changed vs. The Old Email Playbook]**

The old version of this lesson treated email as its own thing. In the ecosystem model, every email serves another URL:

- Welcome email → funnels to /insider
- Pre-arrival email → funnels to /add-ons and /packages
- Post-stay email → funnels to review + future /refer ask
- Return guest email → funnels back to /book with Insider pricing
- Referral email → funnels to /refer

Every email is a door back into the site. Nothing stands alone."

### BUILDING THE SEQUENCES (4:00 - 10:00) [OBSBOT + SCREEN RECORDING]

"I'm using ConvertKit — process is nearly identical in Mailchimp or ActiveCampaign.

**[SCREEN RECORDING: ConvertKit dashboard]**

**Sequence 1 — Welcome Series setup:**

Trigger: tag 'New Booking' applied via PMS or Zapier.

Email 1 — Booking Confirmation:
- Subject: 'You're booked! Here's what happens next at [Property Name]'
- Body: personal greeting, dates confirmed, what to expect, your direct contact, AND a soft invitation — 'If you'd like first dibs on future stays + Insider-only pricing, join the list: [Insider URL]'

Delay → 3 days before check-in → Email 2 — Pre-Arrival Guide:
- Check-in instructions, WiFi, parking, local recs
- AND an add-on menu: 'Most guests add at least one of these before arrival. Just reply to this email and we'll set it up: chef dinner ($150/person), grocery stocking ($75 service fee), wine tour ($100/person), sunset boat charter ($450).'
- This IS the Module 9 upsell trigger. The email sequence sells the add-ons.

Delay → day of arrival → Email 3 — Welcome:
- 'Your home is ready.' Short, warm, accessible.

**[SCREEN RECORDING: Sequence 1 fully configured]**

**Sequence 3 — Post-Stay + Review Request setup:**

Trigger: tag 'Checked Out' applied via PMS.

Email 1 (24h): Thank you + review ask.
Email 2 (72h, no review): Gentle nudge.
Email 3 (7d, no review): '10% off your next direct booking — just for sharing your feedback.' Code: LOVE10.

Note the redirect: the reward is a direct booking discount, not an Airbnb voucher. Every incentive pushes the guest toward the direct channel.

**[SCREEN RECORDING: Remaining sequences — fast build]**

Sequence 4 (Return Guest) — trigger at 6 months.
Sequence 5 (Referral) — trigger at 30 days, unique /refer link.

**[SLIDE: Segmentation Rules]**

Before you activate, set your segment routing:

- Guests who purchased a package → tag 'Package Buyer' → receive a 'VIP' version of the return guest sequence with early access
- Guests who opened 3+ add-on emails → tag 'High-Intent Add-On' → offer a custom package in return guest sequence
- Guests who joined /insider → tag 'Insider' → exclusive dates before public availability
- Guests who referred 1+ friends → tag 'Referrer' → treated as VIP forever

This is how the ecosystem compounds. You're not blasting everyone the same email. You're routing based on behavior."

### SMS FLOWS (10:00 - 12:00) [OBSBOT + SCREEN RECORDING]

"**[SLIDE: 3 SMS Flows]**

SMS open rate: 95%+. Use sparingly. High-value messages only.

**SMS 1 — Booking Confirmation** (immediately post-booking):
'Hi [Name]! Your stay at [Property] is confirmed for [Dates]. Check-in details via email. Text this number anytime! - [Your Name]'

**SMS 2 — Check-In Day** (morning of check-in):
'Welcome day! Check-in at [Time]. Access code: [Code]. WiFi: [Network]/[Password]. Enjoy!'

**SMS 3 — Review Request** (24h post-checkout):
'Thanks for staying with us! 2 min review would mean a lot: [Link]. - [Your Name]'

**[SCREEN RECORDING: PMS SMS template setup]**

Most PMS platforms (Hostaway, Hospitable, OwnerRez) have native SMS. Twilio if you need custom. Keep under 160 characters."

### CLOSE (12:00 - 13:00) [CANON 70D]

"**[SLIDE: Homework]**

1. Set up all 5 sequences using provided templates
2. Set up segmentation tags: Package Buyer, High-Intent Add-On, Insider, Referrer
3. Configure 3 SMS flows in your PMS
4. Test every sequence with yourself as the guest
5. Confirm every email links back to at least one site URL (except pure service messages)

In Lesson 6, we measure. GA4, Direct Booking %, ecosystem-aware KPIs.

See you there."

---

## TEMPLATES PROVIDED

1. **Welcome Series** — 3 emails, fully written
2. **Mid-Stay Check-In** — 1 email
3. **Post-Stay + Review Request** — 3 emails
4. **Return Guest Offer** — 3 emails, with VIP Package Buyer variant
5. **Referral Ask** — 1 email
6. **SMS Templates** — 3 messages
7. **Segmentation Playbook** — which tag, which sequence, which offer
8. **Automation Setup Guide** — ConvertKit, Mailchimp, ActiveCampaign

---

## STUDENT DELIVERABLES

- [ ] All 5 email sequences built and active
- [ ] Segmentation tags configured
- [ ] All 3 SMS flows configured
- [ ] End-to-end tests passed
- [ ] Every email links back to at least one ecosystem URL
