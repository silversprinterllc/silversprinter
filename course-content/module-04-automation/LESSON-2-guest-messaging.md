# LESSON 2: Guest Messaging Automation

## Production Notes
- **Format:** OBSBOT screen recording (PMS message template builder) + Canon 70D (hook/close)
- **Target Length:** 10-12 minutes
- **Screen Recording:** Full PMS auto-message configuration (Hostaway/Hospitable as example)

---

## VIDEO SCRIPT

### HOOK (0:00 - 0:25) [CANON 70D]

"You're typing the same check-in instructions for the 200th time. The same WiFi password. The same parking directions. That ends today. We're building 8 message templates and wiring them to fire automatically — so every guest gets the right message at the right time without you touching your phone."

### THE 8-MESSAGE LIBRARY (0:25 - 3:00) [SLIDES]

"**[SLIDE: 8 Messages — The Complete Guest Journey]**

| # | Message | Trigger | Timing |
|---|---------|---------|--------|
| 1 | Inquiry Response | Guest sends inquiry | Within 5 minutes (auto) |
| 2 | Booking Confirmation | Booking confirmed | Immediately |
| 3 | Pre-Arrival Guide | Days before check-in | 3 days before |
| 4 | Check-In Instructions | Day of check-in | Morning of arrival |
| 5 | Welcome / First Night | After check-in time | Evening of arrival |
| 6 | Mid-Stay Check-In | During stay | Day 2 of stay |
| 7 | Check-Out Reminder | Day before checkout | Evening before |
| 8 | Thank You + Review | After checkout | 24 hours after |

You've already built Messages 2, 3, and 8 as EMAIL sequences in Module 2. These are the PMS-level PLATFORM messages — they send through Airbnb's messaging, VRBO's messaging, and Booking.com's messaging. Guests see them in the platform app they booked on.

Both layers (platform messages + email sequences) work together. The platform messages handle logistics. The email sequences handle relationship building and retention."

### SCREEN RECORDING: BUILDING ALL 8 MESSAGES (3:00 - 9:00) [OBSBOT]

"Open your PMS and follow along.

**[SCREEN RECORDING: PMS message template section]**

**Message 1: Inquiry Response (Auto-reply)**

This fires when a guest sends an inquiry — before they've booked. Speed matters: hosts who respond within 5 minutes are 50% more likely to get the booking.

Template:
'Hi [Guest First Name]! Thanks for your interest in [Property Name]. Yes, your dates ([Check-in] to [Check-out]) are available!

[Property Name] features [top 3 amenities] and is [distance] from [top attraction]. Perfect for [guest type based on group size].

I'd love to host you — feel free to book directly or let me know if you have any questions!

[Your Name]'

Configure trigger: When inquiry received → send immediately.

**[SCREEN RECORDING: Entering template, setting trigger, saving]**

**Message 2: Booking Confirmation**

'Hi [Guest First Name]! Great news — your booking at [Property Name] is confirmed for [Check-in] to [Check-out].

Here's what happens next:
- 3 days before arrival, I'll send you a complete arrival guide with check-in instructions, WiFi, parking, and local tips
- If you need anything before then, just message me here or text [phone number]

Looking forward to hosting you!
[Your Name]'

Trigger: Booking confirmed → send immediately.

**[SCREEN RECORDING: Quick setup of Message 2]**

**Message 3: Pre-Arrival Guide**

This is your most detailed message. Include:
- Check-in time and detailed instructions (door code, key location, parking spot)
- WiFi network and password
- House rules summary (quiet hours, no smoking, max guests, pet policy)
- 5 local recommendations: 2 restaurants, 1 activity, 1 grocery store, 1 coffee shop
- Emergency contact info
- Link to digital guidebook (if you have one)

Trigger: 3 days before check-in → send at 10am.

**[SCREEN RECORDING: Entering the pre-arrival template with all details]**

**Message 4: Check-In Day Instructions**

Short and actionable:
'Good morning [Guest Name]! Today's the day. Quick check-in recap:
- Check-in time: [Time]
- Door code: [Code]
- Parking: [Spot/instructions]
- WiFi: [Network] / [Password]

Text me at [number] when you arrive — happy to help if anything comes up. Enjoy! 🏖️'

Trigger: Day of check-in → send at 9am.

**[SCREEN RECORDING: Quick setup]**

**Messages 5-8:** [Walk through each setup in similar fashion, showing template entry and trigger configuration]

Message 5 (Welcome): Trigger at 7pm on check-in day. 'Settling in? Need anything?'
Message 6 (Mid-Stay): Trigger at 10am on day 2. 'How's everything? Any questions?'
Message 7 (Check-Out Reminder): Trigger at 6pm the day before checkout. Checkout instructions, trash, keys, leaving review.
Message 8 (Thank You + Review): Trigger 24 hours after checkout. Thank you + direct review link.

**[SCREEN RECORDING: Completing setup of all 8 messages, showing the full automation list]**"

### AI SMART REPLIES (9:00 - 10:00) [OBSBOT + SCREEN RECORDING]

"For questions that fall outside your 8 templates — 'Is there a grocery store nearby?' 'Can I check in early?' 'Is the pool heated?' — set up AI smart replies.

**[SCREEN RECORDING: PMS AI reply settings]**

Hospitable has built-in AI that reads guest messages and generates responses based on your property information. Hostaway's InboxAI does the same.

To set it up:
1. Go to your PMS AI settings
2. Fill in your property FAQ — every detail about your property, location, policies, and amenities
3. Enable AI auto-replies for common questions
4. Set it to DRAFT mode first (AI writes the reply, you approve before sending)
5. After you trust it (usually 2-3 weeks), switch to AUTO mode for common questions

Keep escalation rules: anything involving money, complaints, or safety gets flagged to you instead of auto-replied."

### CLOSE (10:00 - 10:45) [CANON 70D]

"Your guest messaging is now automated. 8 messages fire at the right time for every booking. AI handles one-off questions. You only step in for edge cases.

**[SLIDE: Homework]**

1. Build all 8 message templates in your PMS using our templates
2. Configure triggers and timing for each
3. Set up AI smart replies and populate your property FAQ
4. Test: create a test booking and verify all messages fire in sequence
5. Set to DRAFT mode for first 2 weeks, then switch to AUTO

In Lesson 3, we automate the second biggest time drain — cleaning and turnover coordination.

See you there."

---

## TEMPLATES PROVIDED

1. **8 Guest Message Templates** — Complete copy for all 8 messages, customizable per property
2. **Property FAQ Document** — 30+ Q&A pairs to feed into AI smart replies
3. **AI Reply Escalation Rules** — Which topics auto-reply vs flag to host

## STUDENT DELIVERABLES

- [ ] All 8 message templates entered in PMS
- [ ] All 8 triggers configured with correct timing
- [ ] AI smart replies enabled (draft mode)
- [ ] Property FAQ populated (30+ entries)
- [ ] Test booking run — all messages verified
