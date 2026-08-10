# LESSON 1: System Architecture

## Production Notes
- **Format:** Canon 70D talking head (primary) + slides + brief screen recording
- **Target Length:** 8-10 minutes
- **Visuals Needed:** System architecture diagram, time audit worksheet, tool integration map

---

## VIDEO SCRIPT

### HOOK (0:00 - 0:30) [CANON 70D]

"How many hours a week do you spend managing your rental? If you're like most hosts, it's somewhere between 15 and 30 hours per property. Responding to messages. Coordinating cleaners. Checking prices. Sending check-in instructions. Managing reviews.

After this module, that number drops to under 2 hours per property per week. Not because you're cutting corners — because you're building systems that do the work for you."

### THE TIME AUDIT (0:30 - 3:00) [CANON 70D + SLIDES]

"Before we automate anything, we need to know where your time goes. Let's do a quick time audit.

**[SLIDE: Time Audit — 5 Categories]**

Every task in your STR business falls into one of 5 categories:

**1. Guest Communication** (typically 30-40% of your time)
- Responding to inquiries
- Sending booking confirmations
- Pre-arrival instructions
- Mid-stay check-ins
- Post-stay thank you and review requests
- Handling questions, complaints, issues

**2. Cleaning & Turnovers** (typically 15-25%)
- Scheduling cleaners
- Coordinating timing between checkout and next check-in
- Quality control (was it actually cleaned properly?)
- Inventory management (toilet paper, soap, coffee, etc.)

**3. Pricing & Revenue** (typically 5-15%)
- Checking competitor rates
- Adjusting seasonal pricing
- Responding to booking inquiries about rates
- Running revenue reports

**4. Marketing & Guest Retention** (typically 5-10%)
- Posting on social media
- Responding to reviews
- Sending email campaigns
- Managing referral programs

**5. Admin & Coordination** (typically 15-25%)
- Calendar management
- Platform communication
- Maintenance coordination
- Financial tracking

**[SLIDE: Time Audit Template]**

Open the Time Audit Worksheet in your course resources. For each category, estimate how many hours per week you currently spend. Be honest — most hosts underestimate by 30-50%.

Here's what a typical host looks like BEFORE automation:

| Category | Hours/Week |
|----------|-----------|
| Guest Communication | 6 hours |
| Cleaning & Turnovers | 3 hours |
| Pricing & Revenue | 2 hours |
| Marketing & Retention | 2 hours |
| Admin & Coordination | 4 hours |
| **Total** | **17 hours/week** |

And here's what it looks like AFTER this module:

| Category | Before | After | Savings |
|----------|--------|-------|---------|
| Guest Communication | 6 hrs | 0.5 hrs | 92% automated |
| Cleaning & Turnovers | 3 hrs | 0.25 hrs | 92% automated |
| Pricing & Revenue | 2 hrs | 0.1 hrs | 95% automated (PriceLabs) |
| Marketing & Retention | 2 hrs | 0.5 hrs | 75% automated |
| Admin & Coordination | 4 hrs | 0.5 hrs | 88% automated |
| **Total** | **17 hrs** | **1.85 hrs** | **89% reduction** |

That's 15 hours per week back. 60 hours per month. Time you can spend growing your portfolio, building content, or living your life."

### THE SYSTEM ARCHITECTURE (3:00 - 6:00) [SLIDES + SCREEN RECORDING]

"Now let's map the system that makes this possible.

**[SLIDE: System Architecture Diagram]**

At the center: your PMS. This is the brain. Everything connects to it and through it.

**[ANIMATION: Building outward from PMS]**

Connected to the PMS:
- **Channel Manager** → syncs calendars and rates to Airbnb, VRBO, Booking.com, Google (built in Module 1)
- **Dynamic Pricing (PriceLabs)** → pushes optimized rates to PMS daily (built in Module 3)
- **Guest Messaging** → auto-sends messages based on booking events (we build this in Lesson 2)
- **Cleaning Automation (Turno)** → auto-schedules cleaners on checkout (we build this in Lesson 3)
- **Email/SMS Platform** → automated sequences for retention (built in Module 2)
- **Guest WiFi (StayFi)** → captures emails on arrival (built in Module 2)
- **Payment Processing (Stripe)** → handles direct booking payments (built in Module 2)

**[SLIDE: The Integration Map]**

Here's how the data flows:

1. Guest books on Airbnb → PMS receives booking → Auto-message sent → Cleaning auto-scheduled → PriceLabs blocks dates and adjusts surrounding rates
2. Guest connects to WiFi → StayFi captures email → Email added to database → Welcome sequence triggered
3. Guest checks out → Cleaning triggered → Review request sent → Return guest sequence queued for 6 months
4. Empty night detected → PriceLabs drops rate → Orphan day filled → Revenue saved

Every step is automatic. You set it up once. It runs forever.

**[SLIDE: PMS Selection Reminder]**

If you haven't chosen your PMS yet, here's the quick guide:

| You Have | Best PMS | Why |
|----------|---------|-----|
| 1-2 properties, starting out | Hospitable ($29/mo) | Cheapest, excellent messaging automation |
| 1-5 properties, want control | OwnerRez ($40-80/mo) | Best direct booking integration |
| 3-10+ properties, scaling | Hostaway ($100+/mo) | Best all-in-one: channel manager + automation + reporting |
| 10+ properties, enterprise | Guesty ($200+/mo) | Most powerful, most complex |

If you're already on a PMS from Module 1 setup, stick with it. If not, pick one now — the rest of this module builds on it."

### THE AUTOMATION MINDSET (6:00 - 7:30) [CANON 70D]

"Here's the principle that makes automation work:

**[SLIDE: 'If it happens every time, automate it.']**

Every task in your business falls into one of three buckets:

1. **Automate** — It happens the same way every time. A guest books → send confirmation. A guest checks out → schedule cleaning. A night is empty → drop price. These are RULES, not decisions. Automate them.

2. **Template** — It happens often but needs slight customization. Guest asks about parking → send the parking template with property-specific details. Maintenance issue → send the vendor dispatch template. These save 90% of the work.

3. **Handle personally** — It's unique, complex, or high-stakes. A guest complaint about a broken AC at 11pm. A potential legal issue. A guest who wants to extend their stay by 3 weeks. These need your judgment.

The goal: automate bucket 1 completely, template bucket 2, and only spend YOUR time on bucket 3. That's how 17 hours becomes 2."

### CLOSE (7:30 - 8:30) [CANON 70D]

"You've mapped your time, understood the system architecture, and adopted the automation mindset.

**[SLIDE: Homework]**

1. Complete the Time Audit Worksheet — where are YOUR hours going?
2. Confirm your PMS is set up and connected to your channels
3. Draw your system architecture on paper — PMS at center, what's connected, what's missing
4. Identify your top 3 time-draining tasks — these are what we automate first

In Lesson 2, we tackle the biggest time drain: guest messaging. We build a complete message library and configure auto-sends that handle 90% of guest communication without you typing a word.

See you there."

---

## TEMPLATES PROVIDED

1. **Time Audit Worksheet** — 5 categories with hours/week fields and before/after comparison
2. **System Architecture Template** — Blank diagram to fill in with connected tools
3. **PMS Comparison Matrix** — Features, pricing, and recommendations by portfolio size

---

## STUDENT DELIVERABLES

- [ ] Time Audit Worksheet completed
- [ ] PMS confirmed and connected to channels
- [ ] System architecture drawn (what's connected, what's missing)
- [ ] Top 3 time-draining tasks identified
