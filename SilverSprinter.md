# Vantara — Luxury Sprinter Van Booking Site
## Claude Code Build Specification

> **How to use this file:** Paste this entire document into Claude Code and say _"Build this project."_ Claude Code will scaffold the full-stack application end-to-end. Each section is a self-contained build instruction.

---

## Project overview

Build a full-stack luxury sprinter van charter booking platform called **Vantara**. The aesthetic is dark-gold luxury — think private jet charter meets high-end concierge. The platform serves three user types: consumers (individual bookings), corporate clients (team accounts with invoicing), and internal dispatchers (operations dashboard).

**Core tech stack:**
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS
- Backend: Next.js API routes + Node.js microservices
- Database: PostgreSQL (via Prisma ORM)
- Cache: Redis (via ioredis)
- Auth: NextAuth.js (JWT + OAuth)
- Payments: Stripe
- SMS: Twilio
- Maps: Google Maps Platform
- File storage: AWS S3
- Job queue: BullMQ
- Deployment target: Vercel (frontend) + Railway or Render (services + DB)

---

## 1. Project scaffold

```bash
npx create-next-app@latest vantara --typescript --tailwind --app --src-dir
cd vantara
npm install prisma @prisma/client
npm install next-auth @auth/prisma-adapter
npm install stripe @stripe/stripe-js
npm install twilio
npm install @googlemaps/js-api-loader
npm install ioredis bullmq
npm install @aws-sdk/client-s3
npm install zod react-hook-form @hookform/resolvers
npm install date-fns
npm install resend  # transactional email
npm install @radix-ui/react-dialog @radix-ui/react-select @radix-ui/react-tabs
npm install lucide-react
npm install recharts
npm install -D prisma
```

Initialize Prisma:
```bash
npx prisma init
```

---

## 2. Environment variables

Create `.env.local` with these keys (Claude Code: create the file with placeholder values, add comments explaining each):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vantara"
REDIS_URL="redis://localhost:6379"

# Auth
NEXTAUTH_SECRET="generate-random-32-char-string"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Twilio
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
TWILIO_FROM_NUMBER="+1..."

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_KEY=""

# AWS S3
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="us-east-1"
AWS_S3_BUCKET="vantara-media"

# Email (Resend)
RESEND_API_KEY=""
FROM_EMAIL="hello@vantara.com"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
DEPOSIT_PERCENTAGE=20
SERVICE_FEE=12
SUGGESTED_GRATUITY_PERCENTAGE=20
```

---

## 3. Database schema (Prisma)

File: `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── Users ───────────────────────────────────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  phone         String?
  avatarUrl     String?
  role          UserRole  @default(CONSUMER)
  loyaltyPoints Int       @default(0)
  loyaltyTier   LoyaltyTier @default(SILVER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  bookings      Booking[]
  reviews       Review[]
  preferences   UserPreferences?
  corporateMembers CorporateMember[]
  savedLocations SavedLocation[]

  @@map("users")
}

enum UserRole {
  CONSUMER
  CORPORATE_ADMIN
  CORPORATE_RIDER
  DISPATCHER
  SUPER_ADMIN
}

enum LoyaltyTier {
  SILVER
  GOLD
  PLATINUM
  BLACK
}

model UserPreferences {
  id                String  @id @default(cuid())
  userId            String  @unique
  preferredVehicleId String?
  preferredChauffeurId String?
  cabinTemp         Int?    @default(68)
  musicPreference   String?
  lightingMood      String?
  welcomeNote       String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  vehicle           Vehicle? @relation(fields: [preferredVehicleId], references: [id])
  chauffeur         Chauffeur? @relation(fields: [preferredChauffeurId], references: [id])

  @@map("user_preferences")
}

model SavedLocation {
  id        String @id @default(cuid())
  userId    String
  label     String  // "Home", "Office", "MIA Terminal"
  address   String
  lat       Float
  lng       Float
  user      User   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("saved_locations")
}

// ─── Auth (NextAuth) ──────────────────────────────────────────────────────────

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}

// ─── Fleet ────────────────────────────────────────────────────────────────────

model Vehicle {
  id            String   @id @default(cuid())
  name          String   // "The Meridian"
  slug          String   @unique
  tagline       String?
  description   String?  @db.Text
  capacity      Int
  basePrice     Decimal  @db.Decimal(10,2)
  pricePerHour  Decimal? @db.Decimal(10,2)
  pricePerDay   Decimal? @db.Decimal(10,2)
  year          Int
  make          String   @default("Mercedes-Benz")
  model         String   @default("Sprinter")
  color         String?
  licensePlate  String?
  status        VehicleStatus @default(AVAILABLE)
  features      String[] // ["Leather captain seats", "Starlight ceiling", "4K screens", "WiFi"]
  amenities     String[]
  imageUrls     String[]
  tourUrl       String?  // 360° virtual tour URL
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  bookings      Booking[]
  availability  VehicleAvailability[]
  preferences   UserPreferences[]

  @@map("vehicles")
}

enum VehicleStatus {
  AVAILABLE
  IN_SERVICE
  MAINTENANCE
  RETIRED
}

model VehicleAvailability {
  id          String   @id @default(cuid())
  vehicleId   String
  date        DateTime @db.Date
  isBlocked   Boolean  @default(false)
  reason      String?
  vehicle     Vehicle  @relation(fields: [vehicleId], references: [id])

  @@unique([vehicleId, date])
  @@map("vehicle_availability")
}

// ─── Chauffeurs ───────────────────────────────────────────────────────────────

model Chauffeur {
  id          String   @id @default(cuid())
  name        String
  phone       String
  email       String   @unique
  avatarUrl   String?
  bio         String?  @db.Text
  rating      Decimal  @default(5.0) @db.Decimal(3,2)
  totalTrips  Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  bookings    Booking[]
  reviews     Review[]
  preferences UserPreferences[]

  @@map("chauffeurs")
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

model Booking {
  id                String        @id @default(cuid())
  bookingRef        String        @unique @default(cuid()) // Human-readable: VAN-2025-XXXX
  userId            String
  vehicleId         String
  chauffeurId       String?
  corporateAccountId String?

  serviceType       ServiceType
  status            BookingStatus @default(PENDING)

  pickupAddress     String
  pickupLat         Float?
  pickupLng         Float?
  destinationAddress String
  destinationLat    Float?
  destinationLng    Float?

  pickupAt          DateTime
  estimatedDuration Int?          // minutes
  actualDuration    Int?          // minutes

  passengers        Int           @default(1)
  notes             String?       @db.Text
  internalNotes     String?       @db.Text

  // Pricing
  baseAmount        Decimal       @db.Decimal(10,2)
  extrasAmount      Decimal       @default(0) @db.Decimal(10,2)
  gratuityAmount    Decimal       @default(0) @db.Decimal(10,2)
  serviceFeeAmount  Decimal       @default(0) @db.Decimal(10,2)
  totalAmount       Decimal       @db.Decimal(10,2)
  depositAmount     Decimal       @db.Decimal(10,2)
  depositPaidAt     DateTime?

  // Stripe
  stripePaymentIntentId  String?
  stripeDepositId        String?

  // PO number for corporate
  poNumber          String?

  // Cabin preferences snapshot
  cabinTemp         Int?
  musicPreference   String?
  lightingMood      String?
  welcomeNote       String?

  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  user              User          @relation(fields: [userId], references: [id])
  vehicle           Vehicle       @relation(fields: [vehicleId], references: [id])
  chauffeur         Chauffeur?    @relation(fields: [chauffeurId], references: [id])
  corporateAccount  CorporateAccount? @relation(fields: [corporateAccountId], references: [id])
  addons            BookingAddon[]
  tracking          TripTracking[]
  review            Review?
  notifications     BookingNotification[]

  @@map("bookings")
}

enum ServiceType {
  AIRPORT_TRANSFER
  HOURLY_CHARTER
  EVENT
  WEDDING
  CORPORATE
  MULTI_DAY_TOUR
}

enum BookingStatus {
  PENDING
  CONFIRMED
  CHAUFFEUR_ASSIGNED
  EN_ROUTE
  ARRIVED
  IN_PROGRESS
  COMPLETED
  CANCELLED
  NO_SHOW
}

model BookingAddon {
  id          String   @id @default(cuid())
  bookingId   String
  addonId     String
  name        String
  price       Decimal  @db.Decimal(10,2)
  booking     Booking  @relation(fields: [bookingId], references: [id])
  addon       Addon    @relation(fields: [addonId], references: [id])

  @@map("booking_addons")
}

model Addon {
  id          String   @id @default(cuid())
  name        String
  description String?
  price       Decimal  @db.Decimal(10,2)
  category    String?
  isActive    Boolean  @default(true)
  bookings    BookingAddon[]

  @@map("addons")
}

// ─── Tracking ─────────────────────────────────────────────────────────────────

model TripTracking {
  id          String   @id @default(cuid())
  bookingId   String
  lat         Float
  lng         Float
  heading     Float?
  speed       Float?
  recordedAt  DateTime @default(now())
  booking     Booking  @relation(fields: [bookingId], references: [id])

  @@map("trip_tracking")
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

model Review {
  id          String   @id @default(cuid())
  bookingId   String   @unique
  userId      String
  chauffeurId String?
  rating      Int      // 1–5
  comment     String?  @db.Text
  createdAt   DateTime @default(now())

  booking     Booking   @relation(fields: [bookingId], references: [id])
  user        User      @relation(fields: [userId], references: [id])
  chauffeur   Chauffeur? @relation(fields: [chauffeurId], references: [id])

  @@map("reviews")
}

// ─── Corporate ────────────────────────────────────────────────────────────────

model CorporateAccount {
  id              String   @id @default(cuid())
  accountRef      String   @unique // ACM-0042
  companyName     String
  billingEmail    String
  billingAddress  String?
  paymentTerms    Int      @default(30) // Net-30
  seatLimit       Int      @default(5)
  coordinatorName String?
  coordinatorPhone String?
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())

  members         CorporateMember[]
  bookings        Booking[]
  invoices        Invoice[]

  @@map("corporate_accounts")
}

model CorporateMember {
  id                 String  @id @default(cuid())
  corporateAccountId String
  userId             String
  memberRole         CorporateMemberRole @default(RIDER)
  isActive           Boolean @default(true)
  joinedAt           DateTime @default(now())

  corporateAccount   CorporateAccount @relation(fields: [corporateAccountId], references: [id])
  user               User             @relation(fields: [userId], references: [id])

  @@unique([corporateAccountId, userId])
  @@map("corporate_members")
}

enum CorporateMemberRole {
  ADMIN
  RIDER
}

model Invoice {
  id                 String        @id @default(cuid())
  invoiceRef         String        @unique // INV-2025-0047
  corporateAccountId String
  periodStart        DateTime
  periodEnd          DateTime
  subtotal           Decimal       @db.Decimal(10,2)
  tax                Decimal       @default(0) @db.Decimal(10,2)
  total              Decimal       @db.Decimal(10,2)
  status             InvoiceStatus @default(PENDING)
  dueAt              DateTime
  paidAt             DateTime?
  pdfUrl             String?
  stripeInvoiceId    String?
  createdAt          DateTime      @default(now())

  corporateAccount   CorporateAccount @relation(fields: [corporateAccountId], references: [id])

  @@map("invoices")
}

enum InvoiceStatus {
  PENDING
  SENT
  PAID
  OVERDUE
  VOID
}

// ─── Notifications ────────────────────────────────────────────────────────────

model BookingNotification {
  id          String   @id @default(cuid())
  bookingId   String
  type        String   // CONFIRMATION, CHAUFFEUR_ASSIGNED, EN_ROUTE, ARRIVED, COMPLETED, REVIEW_REQUEST
  channel     String   // EMAIL, SMS, PUSH
  sentAt      DateTime @default(now())
  status      String   @default("SENT")
  booking     Booking  @relation(fields: [bookingId], references: [id])

  @@map("booking_notifications")
}

// ─── Loyalty ──────────────────────────────────────────────────────────────────

model LoyaltyTransaction {
  id          String   @id @default(cuid())
  userId      String
  points      Int      // positive = earned, negative = redeemed
  reason      String   // "TRIP_COMPLETED", "REVIEW_LEFT", "REFERRAL", "REDEMPTION"
  bookingId   String?
  createdAt   DateTime @default(now())

  @@map("loyalty_transactions")
}
```

After writing the schema, run:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 4. Seed data

File: `prisma/seed.ts`

Seed the database with:

**Vehicles (3):**
1. The Meridian — 12-passenger Mercedes Sprinter 2024. Base price $150. Features: Leather captain seats, Starlight ceiling, 4K screens, WiFi, USB-C hubs, climate control.
2. The Noir — 10-passenger Executive conversion. Base price $200. Features: Suede interior, Mini bar, Mood lighting, Partition, Tinted privacy glass.
3. The Summit — 8-passenger Adventure edition. Base price $175. Features: All-terrain capability, Roof rack, Cooler + storage, USB-C hubs, Panoramic windows.

**Addons (6):**
- Champagne service — $30
- Premium audio (custom playlist) — $20
- Privacy partition — $50
- Red carpet arrival — $40
- Chilled refreshments — $25
- Floral arrangement — $35

**Chauffeurs (3):**
- Marcus J. — 312 trips, 4.99 rating
- Rachel L. — 208 trips, 4.97 rating
- Devon K. — 156 trips, 4.95 rating

**Test corporate account:**
- Acme Capital Partners, account ref ACM-0042, Net-30

Run seed:
```bash
npx prisma db seed
```

---

## 5. File & folder structure

```
src/
├── app/
│   ├── (public)/                    # Marketing pages (no auth required)
│   │   ├── page.tsx                 # Homepage
│   │   ├── fleet/
│   │   │   ├── page.tsx             # Fleet showcase
│   │   │   └── [slug]/page.tsx      # Vehicle detail
│   │   ├── book/
│   │   │   └── page.tsx             # Booking wizard
│   │   ├── corporate/page.tsx       # Corporate landing
│   │   └── about/page.tsx
│   ├── (auth)/                      # Auth pages
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── portal/                      # Client portal (auth required)
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Dashboard / upcoming trips
│   │   ├── history/page.tsx
│   │   ├── preferences/page.tsx
│   │   ├── loyalty/page.tsx
│   │   └── tracking/[bookingId]/page.tsx  # Live GPS tracking
│   ├── corporate/                   # Corporate portal (corporate auth)
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Dashboard
│   │   ├── riders/page.tsx
│   │   ├── invoices/page.tsx
│   │   ├── usage/page.tsx
│   │   └── book/page.tsx            # Book for team
│   ├── dispatcher/                  # Internal ops dashboard (admin auth)
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # All active bookings map view
│   │   ├── bookings/page.tsx
│   │   ├── fleet/page.tsx
│   │   └── chauffeurs/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── bookings/
│       │   ├── route.ts             # GET list, POST create
│       │   ├── [id]/route.ts        # GET, PATCH, DELETE
│       │   ├── [id]/cancel/route.ts
│       │   └── [id]/tracking/route.ts
│       ├── vehicles/
│       │   ├── route.ts
│       │   ├── [slug]/route.ts
│       │   └── availability/route.ts
│       ├── quote/route.ts           # POST — instant price calculation
│       ├── chauffeurs/route.ts
│       ├── addons/route.ts
│       ├── payments/
│       │   ├── create-intent/route.ts
│       │   ├── confirm/route.ts
│       │   └── webhook/route.ts     # Stripe webhooks
│       ├── corporate/
│       │   ├── accounts/route.ts
│       │   ├── members/route.ts
│       │   └── invoices/route.ts
│       ├── loyalty/
│       │   └── transactions/route.ts
│       └── upload/route.ts          # S3 presigned URLs
├── components/
│   ├── ui/                          # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Badge.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   └── LoadingSpinner.tsx
│   ├── booking/
│   │   ├── BookingWizard.tsx        # 4-step wizard container
│   │   ├── steps/
│   │   │   ├── Step1Configure.tsx
│   │   │   ├── Step2Customize.tsx
│   │   │   ├── Step3Review.tsx
│   │   │   └── Step4Payment.tsx
│   │   ├── VehicleCard.tsx
│   │   ├── AddonCard.tsx
│   │   ├── ChauffeurCard.tsx
│   │   ├── QuoteBar.tsx
│   │   └── BookingConfirmation.tsx
│   ├── portal/
│   │   ├── PortalNav.tsx
│   │   ├── TripCard.tsx
│   │   ├── LiveTrackingBanner.tsx
│   │   ├── TripHistory.tsx
│   │   ├── PreferencesForm.tsx
│   │   └── LoyaltyPanel.tsx
│   ├── corporate/
│   │   ├── CorporateNav.tsx
│   │   ├── RiderTable.tsx
│   │   ├── InvoiceTable.tsx
│   │   ├── UsageChart.tsx
│   │   └── TeamBookingForm.tsx
│   ├── tracking/
│   │   ├── LiveMap.tsx              # Google Maps with real-time chauffeur dot
│   │   └── TrackingTimeline.tsx     # Status milestones
│   ├── layout/
│   │   ├── PublicNav.tsx
│   │   ├── Footer.tsx
│   │   ├── PortalSidebar.tsx
│   │   └── DispatcherSidebar.tsx
│   └── marketing/
│       ├── HeroSection.tsx
│       ├── FleetShowcase.tsx
│       ├── StatsRow.tsx
│       ├── ExperienceFeatures.tsx
│       ├── TestimonialsSection.tsx
│       └── CorporateCTA.tsx
├── lib/
│   ├── prisma.ts                    # Prisma client singleton
│   ├── redis.ts                     # Redis client
│   ├── stripe.ts                    # Stripe client
│   ├── twilio.ts                    # Twilio client
│   ├── s3.ts                        # AWS S3 client
│   ├── maps.ts                      # Google Maps helpers
│   ├── queue.ts                     # BullMQ queue definitions
│   ├── auth.ts                      # NextAuth config
│   └── utils.ts                     # Shared helpers
├── services/
│   ├── booking.service.ts           # Business logic for bookings
│   ├── pricing.service.ts           # Quote and pricing engine
│   ├── availability.service.ts      # Vehicle availability checks
│   ├── notification.service.ts      # Email + SMS dispatch
│   ├── loyalty.service.ts           # Points calculation
│   ├── invoice.service.ts           # Corporate invoice generation
│   └── tracking.service.ts          # GPS data processing
├── workers/
│   ├── notification.worker.ts       # Process notification queue jobs
│   ├── invoice.worker.ts            # Generate monthly invoices
│   └── loyalty.worker.ts            # Post-trip points calculation
├── hooks/
│   ├── useBooking.ts                # Booking wizard state
│   ├── useQuote.ts                  # Real-time quote updates
│   ├── useTracking.ts               # WebSocket GPS tracking
│   └── usePortal.ts                 # Portal data fetching
└── types/
    ├── booking.ts
    ├── vehicle.ts
    ├── user.ts
    └── api.ts
```

---

## 6. Core services — detailed implementation

### 6a. Pricing service (`src/services/pricing.service.ts`)

Build a `calculateQuote(input)` function that accepts:
```typescript
interface QuoteInput {
  vehicleId: string
  serviceType: ServiceType
  pickupAt: Date
  estimatedHours?: number  // for hourly bookings
  estimatedDays?: number   // for multi-day
  addonIds: string[]
  corporateAccountId?: string  // for corporate discount
}
```

Returns:
```typescript
interface QuoteResult {
  baseAmount: number
  extrasAmount: number
  gratuityAmount: number    // suggested, not required
  serviceFeeAmount: number  // flat $12
  totalAmount: number
  depositAmount: number     // 20% of total
  balanceAmount: number     // 80% of total
  lineItems: LineItem[]
  isSurgePriced: boolean
  surgeMultiplier?: number
}
```

Pricing rules:
- Airport transfer: use vehicle base price
- Hourly charter: vehicle hourly rate × hours (minimum 2 hours)
- Event/wedding: flat rate = base price × 1.5 (premium multiplier)
- Multi-day tour: vehicle daily rate × days
- Corporate accounts: apply 5% discount automatically
- Surge pricing: apply 1.25× multiplier on Fri/Sat evenings (5pm–2am) and major holidays
- Addons: sum all selected addon prices
- Suggested gratuity: 20% of base amount (shown but optional)
- Service fee: flat $12
- Deposit: 20% of total (configured via env var)
- Balance: remaining 80%, due 48 hours before trip

### 6b. Availability service (`src/services/availability.service.ts`)

Build `checkAvailability(vehicleId, date, startTime, durationMinutes)`:
- Query blocked dates from `vehicle_availability` table
- Query existing confirmed/in-progress bookings for that vehicle on that date
- Account for 90-minute buffer between bookings (cleaning + travel)
- Return `{ available: boolean, nextAvailableSlot?: Date, conflicts?: Booking[] }`

Build `getAvailableVehicles(date, serviceType, passengers)`:
- Filter vehicles by capacity >= passengers
- Filter out blocked/maintenance vehicles
- Filter out vehicles already booked for that date/time window
- Return available vehicles with pricing

### 6c. Notification service (`src/services/notification.service.ts`)

Build `sendBookingNotification(bookingId, event)` where event is:

| Event | Email | SMS |
|-------|-------|-----|
| `BOOKING_CONFIRMED` | Full confirmation with details + calendar invite | "Your Vantara booking is confirmed for [date]. Booking ref: [ref]" |
| `CHAUFFEUR_ASSIGNED` | Chauffeur profile + contact details | "Marcus J. has been assigned to your trip. He can be reached at [phone]." |
| `CHAUFFEUR_EN_ROUTE` | — | "Your chauffeur is on the way. Estimated arrival: 8 minutes." |
| `CHAUFFEUR_ARRIVED` | — | "Marcus is outside. The Meridian is parked at [location]." |
| `TRIP_COMPLETED` | Receipt PDF + loyalty points earned | "Trip complete. You earned 192 loyalty points. Rate your ride: [link]" |
| `REVIEW_REQUEST` | 24h later — review request email | — |
| `BALANCE_DUE` | 48h before trip — balance charge reminder | "Your balance of $153.60 will be charged in 24 hours." |
| `CORPORATE_INVOICE` | Monthly invoice PDF attached | — |

Use Resend for email with React Email templates. Use Twilio for SMS.

### 6d. Loyalty service (`src/services/loyalty.service.ts`)

Points rules:
- Every $1 spent = 10 points
- 5-star review left = +50 bonus points
- Referral completes first booking = +200 points
- Corporate booking = 2× multiplier

Tier thresholds:
- Silver: 0–999 points
- Gold: 1,000–2,999 points
- Platinum: 3,000–7,499 points
- Black: 7,500+ points

Tier perks (store in constants):
- Gold: 5% discount, priority booking
- Platinum: 10% discount, complimentary upgrade once/month, dedicated coordinator
- Black: 15% discount, always-on chauffeur preference, free add-ons on every booking

Build `awardPoints(userId, bookingId, reason)` that:
1. Calculates points based on booking total + multipliers
2. Creates `LoyaltyTransaction` record
3. Updates user's `loyaltyPoints` total
4. Checks if tier upgrade is needed, updates `loyaltyTier` if so
5. Triggers notification if tier upgraded

---

## 7. API routes — implementation details

### `POST /api/quote`
Accept quote input, call pricing service, return quote result. Cache result in Redis for 5 minutes with key `quote:{vehicleId}:{date}:{serviceType}:{addonIds}`. No auth required.

### `POST /api/bookings`
1. Validate input with Zod schema
2. Re-run availability check (prevent race conditions)
3. Re-calculate price server-side (never trust client price)
4. Create `Booking` record with status `PENDING`
5. Create Stripe PaymentIntent for deposit amount
6. Return `{ bookingId, clientSecret }` for Stripe Elements

### `POST /api/payments/webhook`
Handle Stripe webhook events:
- `payment_intent.succeeded`: Update booking to `CONFIRMED`, trigger `BOOKING_CONFIRMED` notification, enqueue loyalty points job
- `payment_intent.payment_failed`: Update booking to `PENDING`, notify user
- `invoice.paid` (corporate): Update invoice status, trigger receipt email

### `GET /api/bookings/[id]/tracking`
WebSocket endpoint (or Server-Sent Events) that streams GPS coordinates for active bookings. The chauffeur's mobile app PUTs coordinates every 10 seconds to `POST /api/bookings/[id]/tracking`. This endpoint streams those back to the client portal.

### `GET /api/vehicles/availability?date=&vehicleId=`
Return availability slots for a given date. Used by the booking calendar to show green/red days.

---

## 8. Page implementations

### 8a. Homepage (`app/(public)/page.tsx`)

Sections (in order):
1. **Hero** — full-bleed dark background, animated gold gradient, headline "Travel in absolute comfort", sub "Custom-configured sprinter vans · Professional chauffeurs · 24/7 concierge". CTA: "Book now" + "View fleet". Stats bar below: 12 vehicles, 4.98 avg rating, 2400+ trips, 24/7 concierge.
2. **Quick booking widget** — inline booking bar with: service type tabs (Airport Transfer / Hourly / Event / Corporate), pickup field, destination field, date picker, vehicle selector, instant quote display. Submits to `/book` page with pre-filled query params.
3. **Fleet showcase** — 3-column grid of vehicle cards. Each card: vehicle photo, name, capacity, key features, base price, "View details" CTA.
4. **Experience features** — 4-card grid: Live GPS tracking, Instant rebooking, Curate your cabin, Loyalty rewards.
5. **Social proof** — 3 testimonial cards with star ratings, client name, trip type.
6. **Corporate CTA** — dark section: "For business travel" — headline, 3 feature bullets (Net-30 invoicing, Multi-rider accounts, Dedicated coordinator), CTA "Explore corporate accounts".
7. **Footer** — links, contact, social icons.

Design language for the entire public site:
- Color palette: near-black background (`#0a0a0a`), warm white text (`#f0e6d0`), gold accent (`#c9a96e` / `#b8934a`)
- Fonts: Cormorant Garamond (serif, for headlines and large numbers), Jost (sans-serif, for UI)
- No rounded corners on anything except vehicle cards and input fields
- Gold horizontal rule dividers between sections
- Subtle grid/dot background texture on dark sections (CSS only, low opacity)

### 8b. Vehicle detail page (`app/(public)/fleet/[slug]/page.tsx`)

- Hero: full-width image gallery (swipeable), vehicle name in large serif, capacity badge
- Specs grid: capacity, year, make/model, features list
- Amenities section: icon grid (WiFi, AC, leather seats, etc.)
- Pricing section: base price, hourly rate, daily rate
- 360° virtual tour embed (if tourUrl exists)
- "Book this vehicle" sticky CTA button that opens booking wizard with this vehicle pre-selected
- Reviews section: average rating, recent reviews

### 8c. Booking wizard (`app/(public)/book/page.tsx`)

4-step wizard (as designed above). State managed with React context or Zustand.

**Step 1 — Configure:**
- Service type selector (tabs: Airport Transfer, Hourly Charter, Event, Corporate)
- Pickup address (Google Places Autocomplete)
- Destination address (Google Places Autocomplete)
- Date picker (disable past dates, disable dates with no vehicle availability)
- Time picker
- Passenger count selector
- Vehicle selection cards (filter by capacity, show availability)
- Live quote display updates on every change

**Step 2 — Customize:**
- Add-on cards (6 enhancements, toggle on/off, running total updates)
- Chauffeur preference cards (show top 3 available, option for "no preference")
- Cabin preferences: temperature slider, music style selector, lighting mood selector, welcome note textarea
- Special requests textarea

**Step 3 — Review:**
- Two-column: trip summary (service, vehicle, route, date, chauffeur) + price breakdown (base, extras, gratuity, service fee, total)
- Deposit note: "20% due today, balance 48h before"
- Edit buttons on each section that jump back to relevant step

**Step 4 — Payment:**
- Stripe Elements card input
- Apple Pay / Google Pay buttons (Stripe Payment Request API)
- Deposit amount prominently displayed
- Security badges
- On success: redirect to `/portal` with confirmation modal

### 8d. Client portal (`app/portal/page.tsx`)

Requires auth. Tabs: Upcoming, History, Preferences, Loyalty (as designed above).

**Upcoming tab:**
- Live banner if any booking is currently active (pulsing dot, chauffeur name, ETA)
- List of upcoming booking cards, each with: route, date/time, vehicle, chauffeur, status badge, action buttons (Track Live, Contact Chauffeur, Modify, Cancel)

**History tab:**
- Table of past bookings with: route, date, vehicle, chauffeur, price, rating given
- "Rebook" button on each row that pre-fills booking wizard

**Preferences tab:**
- Form to set and save default preferences (vehicle, chauffeur, cabin temp, music, lighting, welcome note)
- Saved locations manager (add/edit/delete)

**Loyalty tab:**
- Points balance (large gold number)
- Tier badge + progress bar to next tier
- Points breakdown: cash value, free upgrades available, tier discount %
- Earning rules table
- Transaction history

### 8e. Live tracking page (`app/portal/tracking/[bookingId]/page.tsx`)

Full-page map (Google Maps) with:
- Real-time chauffeur location dot (animated, gold)
- Client pickup marker
- Destination marker
- Route polyline
- Status timeline sidebar: Booking Confirmed → Chauffeur Assigned → En Route → Arrived → In Progress → Completed (check marks as each milestone passes)
- ETA display (updates every 30 seconds)
- Chauffeur info card: name, photo, rating, phone number (tap to call on mobile)
- "Share tracking link" button that generates a public read-only tracking URL

Updates via Server-Sent Events polling every 10 seconds.

### 8f. Dispatcher dashboard (`app/dispatcher/page.tsx`)

Protected route (role: DISPATCHER or SUPER_ADMIN).

**Main view:**
- Full-page Google Maps showing all active bookings as color-coded markers (gold = in progress, blue = en route, gray = assigned)
- Sidebar panel with all today's bookings, sortable by time, status, vehicle
- Each booking card: expand to see full details, assign/reassign chauffeur, update status, add notes

**Bookings list (`/dispatcher/bookings`):**
- Table of all bookings with filters: date range, status, vehicle, service type
- Export to CSV
- Bulk status update

**Fleet management (`/dispatcher/fleet`):**
- Vehicle list with current status (available/in service/maintenance)
- Toggle maintenance mode
- Block availability dates (vacation, service)

**Chauffeur management (`/dispatcher/chauffeurs`):**
- Chauffeur list with current assignment status
- Rating summary
- Today's schedule per chauffeur

---

## 9. Design system (Tailwind config)

File: `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#fdf8ee',
          100: '#f7e9c8',
          200: '#efd292',
          300: '#e4b85a',
          400: '#c9a96e',
          500: '#b8934a',
          600: '#9a7438',
          700: '#7c5a2a',
          800: '#5e431f',
          900: '#3f2d14',
        },
        onyx: {
          50:  '#f5f4f2',
          100: '#e0ddd8',
          200: '#c4bfb8',
          300: '#a09890',
          400: '#807870',
          500: '#5f5850',
          600: '#433d38',
          700: '#2a2520',
          800: '#1a1612',
          900: '#0a0a0a',
        },
        cream: {
          50:  '#fdfcf9',
          100: '#f8f4ec',
          200: '#f0e6d0',
          300: '#e4d2b0',
          400: '#d4b888',
          500: '#c09a60',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Jost', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #c9a96e 0%, #b8934a 50%, #9a7438 100%)',
      }
    },
  },
  plugins: [],
}

export default config
```

---

## 10. Stripe integration — payment flow

### Deposit + balance model

1. **At booking creation:** Create a Stripe `PaymentIntent` for deposit amount (20%). Attach booking metadata.
2. **At checkout (Step 4):** Use Stripe Elements to confirm the payment intent (deposit charged immediately).
3. **48 hours before trip:** BullMQ job runs, creates second `PaymentIntent` for balance amount, charges saved payment method automatically (or sends payment link if card not saved).
4. **Stripe webhook:** On `payment_intent.succeeded`, update booking status + trigger notifications.

### Corporate invoicing

1. Create Stripe Customer for each corporate account at onboarding
2. All corporate bookings are created with `collection_method: 'send_invoice'`
3. At month end, BullMQ job groups all corporate bookings into a Stripe Invoice
4. Stripe sends invoice directly, or use `finalize_and_send`
5. Webhook on `invoice.paid` updates `Invoice` record in DB

---

## 11. Real-time tracking — WebSocket architecture

Use Next.js Route Handler with Server-Sent Events (SSE) for simplicity:

**Client-side (portal tracking page):**
```typescript
const eventSource = new EventSource(`/api/bookings/${bookingId}/tracking/stream`)
eventSource.onmessage = (event) => {
  const { lat, lng, heading, eta } = JSON.parse(event.data)
  updateMapMarker(lat, lng, heading)
  updateETA(eta)
}
```

**Chauffeur app** (simple mobile web app or React Native):
- Every 10 seconds, POST `{ lat, lng, heading, speed }` to `/api/bookings/:id/tracking`
- This writes to `trip_tracking` table AND publishes to Redis pub/sub channel `tracking:{bookingId}`

**SSE stream endpoint** (`/api/bookings/[id]/tracking/stream`):
- Subscribes to Redis channel `tracking:{bookingId}`
- Streams updates to connected clients via SSE
- Disconnects on booking completion

---

## 12. Email templates

Use React Email (`npm install @react-email/components`). Create templates in `src/emails/`:

- `BookingConfirmation.tsx` — booking details, route map image, add to calendar button, chauffeur info (once assigned), what to expect section
- `ChauffeurAssigned.tsx` — chauffeur photo, name, rating, phone, vehicle photo
- `TripReceipt.tsx` — itemized receipt, loyalty points earned, review link
- `ReviewRequest.tsx` — 24h post-trip, star rating selector that links to review page
- `BalanceDue.tsx` — 48h before trip, balance amount, last 4 digits of card being charged
- `CorporateInvoice.tsx` — invoice table with all trips, totals, payment instructions

---

## 13. Queue workers

File: `src/workers/notification.worker.ts`

Define BullMQ queues:
- `notifications` — processes email/SMS sends
- `post-trip` — runs 1 hour after trip completion (loyalty points + review request)
- `balance-charge` — runs 48h before trip (charge balance payment)
- `invoice-generation` — runs 1st of every month at 6am (corporate invoices)

Start workers alongside the Next.js app (use a separate process in production, co-located in development).

---

## 14. Auth configuration

File: `src/lib/auth.ts`

NextAuth providers:
1. **Google OAuth** — primary social login
2. **Email Magic Link** — passwordless email login via Resend
3. **Credentials** — for dispatcher admin login only (email + password, bcrypt)

Session strategy: JWT

Callbacks:
- `jwt` callback: attach `user.role`, `user.loyaltyTier`, `user.loyaltyPoints` to token
- `session` callback: expose role + loyalty info to client
- `authorized` callback: protect `/portal`, `/corporate`, `/dispatcher` routes

Middleware (`src/middleware.ts`):
- Redirect unauthenticated users from protected routes to `/login`
- Redirect non-admin users from `/dispatcher` to `/portal`
- Redirect non-corporate users from `/corporate` to `/portal`

---

## 15. Build phases

### Phase 1 — MVP (weeks 1–6)
Build in this order:
1. Database schema + seed data
2. Auth (NextAuth + Google OAuth)
3. Public homepage + fleet showcase
4. Vehicle detail pages
5. Booking wizard (Steps 1–4)
6. Stripe deposit payment
7. Booking confirmation emails (Resend)
8. Client portal — Upcoming tab
9. Basic dispatcher dashboard (bookings table)

### Phase 2 — Core features (weeks 7–10)
1. Stripe balance charge (48h before)
2. SMS notifications (Twilio)
3. Live GPS tracking (SSE + chauffeur app)
4. Client portal — History + Preferences + Loyalty tabs
5. Loyalty points system
6. Post-trip reviews

### Phase 3 — Corporate & Advanced (weeks 11–14)
1. Corporate account portal (all tabs)
2. Net-30 invoicing with Stripe
3. Corporate member management
4. Usage reports + charts
5. Dispatcher map view (Google Maps)
6. Surge pricing engine
7. AI concierge chatbot (Claude API)

### Phase 4 — Polish (weeks 15–16)
1. Mobile optimization / PWA
2. Performance audit (Lighthouse)
3. Error monitoring (Sentry)
4. Analytics (Mixpanel or Amplitude)
5. SEO optimization
6. Security audit

---

## 16. Claude Code prompts for each module

After scaffolding, use these targeted prompts in Claude Code:

**Booking wizard:**
> "Build the BookingWizard component with 4 steps as specified. Use React context for state. Step 1 includes Google Places Autocomplete for pickup/destination. The quote bar at the bottom updates in real time on every input change by calling /api/quote."

**Pricing engine:**
> "Build the pricing.service.ts with the calculateQuote function. Implement surge pricing for Friday/Saturday evenings and holidays. Apply the corporate 5% discount when corporateAccountId is present."

**Live tracking:**
> "Build the live tracking page with Google Maps showing a real-time chauffeur marker. Use Server-Sent Events to stream updates from /api/bookings/[id]/tracking/stream. Show the status timeline sidebar with milestone checkmarks."

**Corporate portal:**
> "Build the corporate portal dashboard with 4 tabs: Team Riders, Invoices, Usage Report, Book for Team. The Usage Report tab should show a bar chart using Recharts with spend per rider and trips per service type."

**Dispatcher dashboard:**
> "Build the dispatcher dashboard with a full-page Google Maps view showing all active bookings as markers. Sidebar lists today's bookings with status badges. Clicking a marker opens a booking detail panel where the dispatcher can assign a chauffeur or update status."

**Stripe webhooks:**
> "Build the Stripe webhook handler at /api/payments/webhook. Handle payment_intent.succeeded (confirm booking, trigger notifications, enqueue loyalty job), payment_intent.payment_failed (notify user), and invoice.paid (mark corporate invoice as paid)."

---

## 17. Deployment checklist

- [ ] Set all environment variables in Vercel dashboard
- [ ] Run `npx prisma migrate deploy` against production DB
- [ ] Configure Stripe webhook endpoint to `https://yourdomain.com/api/payments/webhook`
- [ ] Set up Redis instance (Upstash recommended for serverless)
- [ ] Configure Twilio phone number and webhook
- [ ] Set up Google Maps API key with billing enabled
- [ ] Configure Resend domain and sender email
- [ ] Set up S3 bucket with proper CORS + IAM policy
- [ ] Configure NextAuth URL to production domain
- [ ] Enable Vercel Analytics
- [ ] Set up Sentry error monitoring
- [ ] Configure custom domain + SSL in Vercel

---

## 18. Key business rules (never violate)

1. **Never trust client-side pricing.** Always recalculate price server-side before charging.
2. **Availability race condition.** Re-check availability inside the booking creation transaction (use Prisma transactions with row locking).
3. **Deposit is non-refundable** within 24 hours of trip. Build this into the cancellation policy.
4. **Balance charged 48 hours before trip** automatically. Send reminder 72 hours before.
5. **Chauffeur assigned at least 2 hours before trip.** If unassigned, alert dispatcher via email.
6. **Corporate bookings** must always have a PO number or be explicitly marked as "no PO required."
7. **Loyalty points** are only awarded after trip status reaches `COMPLETED`.
8. **Surge pricing** must be shown transparently in the quote — never hidden.

---

*Generated by Claude · Vantara build specification v1.0*
