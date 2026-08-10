# STR Regulation Lookup Tool — Complete Specification

**Property:** SpokeBnB.com
**Purpose:** Free, high-intent lead generation tool that surfaces short-term rental regulations per city/county. Owns SEO for the "[city] airbnb rules" keyword cluster. Feeds the Barefoot Realty acquisition pipeline.
**Build Type:** Static Next.js pages + JSON data layer
**Last Spec Revision:** 2026-04-15
**Competitive Moat:** Zero direct competitors. AirDNA, BNBCalc, Rabbu, and Mashvisor all ignore regulation — the single highest-risk variable in STR investing.

---

## SECTION 1: TOOL CONCEPT & USER FLOW

### 1.1 Strategic Positioning

Every STR investor asks the same question before buying property: **"Is this even legal here?"** Yet none of the major analytics platforms answer it. They serve revenue projections, occupancy estimates, and Zestimates — but they dodge regulation because it's hard to maintain. That's exactly why SpokeBnB should own it.

Three reasons this tool is the perfect top-of-funnel asset:

1. **High intent.** Someone searching "can I do Airbnb in Anna Maria Island" is weeks — not years — from buying property.
2. **High stickiness.** Regulations change. If they subscribe to alerts, we have an excuse to email them monthly forever.
3. **High authority.** Being the definitive regulation source makes SpokeBnB the default answer when a Realtor, CPA, or insurance agent gets asked this question.

### 1.2 User Flow

```
STEP 1 — LANDING
  ↓
  User arrives via:
    • SEO ("naples florida short term rental rules")
    • Internal link from a blog post
    • Referral from the SpokeBnB course
    • Direct from Barefoot Realty listing page

STEP 2 — STATE SELECT
  ↓
  Primary dropdown: State (FL highlighted as "most complete")
  Secondary: "Top Markets" quick-link grid (Orlando, Destin, 30A, Key West, etc.)

STEP 3 — CITY/COUNTY SELECT
  ↓
  Autocomplete search. Shows city + county (e.g., "Anna Maria Island, Manatee County").
  If user types a market we don't cover → "Not in our database yet — be the first to request it"
  (captures email + city of interest; high-value lead data)

STEP 4 — REGULATORY SNAPSHOT PAGE
  ↓
  Hero: Location name + large status badge
    [LEGAL] [RESTRICTED] [BANNED] [GRAY AREA] [PENDING CHANGES]

  Quick-Answer Card (above the fold):
    • Is STR legal?            Yes / No / Conditional
    • License required?        Yes / No
    • Minimum stay?            1 / 7 / 30 / 180+ nights
    • Approx annual cost?      $X license + $Y tax burden

  Full regulatory detail sections:
    1. Licensing & Registration
    2. Occupancy & Safety Requirements
    3. Tax Obligations (with total combined % in a banner)
    4. Zoning & Location Restrictions
    5. HOA / Condo Association Notes
    6. Recent Changes (last 12 months)
    7. Pending Legislation
    8. Sources & Last Verified date

  Sidebar (sticky on desktop):
    • CTA 1: "Alert me when [City] regulations change" (email capture)
    • CTA 2: "Considering buying in [City]? Talk to Barefoot Realty"
    • Related cities in same state (internal linking)

STEP 5 — EMAIL CAPTURE
  ↓
  Two-tier capture:
    Tier 1: "Get monthly updates for [City]" → single-city subscription
    Tier 2: "I'm researching multiple markets" → state-wide subscription + 7-day STR course drip

STEP 6 — SOFT CTA
  ↓
  Context-aware CTA based on status:
    LEGAL → "This market is STR-friendly. See the best neighborhoods for cash flow →"
    RESTRICTED → "Still want to invest here? Barefoot Realty knows the compliant pockets →"
    BANNED → "Consider a nearby legal market. Here are 3 alternatives →"
```

### 1.3 Design Principles

- **Speed.** Page must load in under 1.5s. Mostly static.
- **Mobile-first.** 60%+ of traffic will be mobile (searching on the couch, at open houses, or at closing).
- **Scannable.** Big status badge, big numbers, short paragraphs. No wall-of-text.
- **Trust.** Every claim sourced. "Last Verified: [date]" on every page.
- **Exit intent.** Before the user leaves, a soft modal: "Save this page — we'll email you when anything changes."

---

## SECTION 2: DATA STRUCTURE (Per Location)

Each location is a single JSON object conforming to the schema below. The frontend reads these at build time for static generation; a lightweight JS search index is generated for the autocomplete.

### 2.1 Canonical Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `slug` | string | Y | URL slug, e.g. `fl/anna-maria-island` |
| `locationName` | string | Y | Display name |
| `state` | string | Y | Two-letter code (FL, TN, etc.) |
| `county` | string | Y | County name without "County" suffix |
| `city` | string | N | If applicable |
| `strStatus` | enum | Y | `LEGAL` / `RESTRICTED` / `BANNED` / `GRAY_AREA` |
| `lastUpdated` | ISO date | Y | YYYY-MM-DD |
| `lastVerified` | ISO date | Y | Date a human checked sources |
| `confidence` | enum | Y | `VERIFIED` / `APPROXIMATE` / `OUTDATED` |
| `licenseRequired` | boolean | Y | |
| `licenseName` | string | N | e.g. "Vacation Rental License" |
| `licenseCost` | object | N | `{ initial: number, renewal: number, currency: "USD" }` |
| `licenseRenewal` | enum | N | `ANNUAL` / `BIENNIAL` / `ONE_TIME` / `N/A` |
| `inspectionsRequired` | boolean | Y | |
| `inspectionNotes` | string | N | |
| `occupancyLimit` | string | Y | e.g. "2 per bedroom + 2 additional, max 12" |
| `minimumNightStay` | number | Y | 0 = no minimum |
| `minimumStayNotes` | string | N | e.g. "7-day minimum in residential zones" |
| `ownerOccupancyRequired` | boolean | Y | |
| `hostedOnly` | boolean | Y | Hosted = owner present |
| `hostedVsUnhostedNotes` | string | N | |
| `taxes` | object | Y | See below |
| `zoningRestrictions` | string | Y | Plain-English summary |
| `hoaConsiderations` | string | N | General boilerplate note |
| `recentChanges` | array | Y | Events in last 12 months |
| `pendingLegislation` | array | Y | Known upcoming changes |
| `warnings` | array | Y | Warning codes (see Section 5) |
| `sources` | array | Y | Official municipal URLs |
| `relatedMarkets` | array | N | Slugs of nearby cities |

### 2.2 Tax Object

```json
{
  "stateSalesTax": 6.0,
  "countySurtax": 1.0,
  "touristDevelopmentTax": 5.0,
  "localSTRtax": 0.0,
  "combinedTotal": 12.0,
  "notes": "Tourist Development Tax collected separately from Florida DOR."
}
```

### 2.3 Recent Changes Entry

```json
{
  "date": "2025-09-15",
  "headline": "City council passed Ordinance 2025-17",
  "summary": "Added $500 annual fee and mandatory fire inspection.",
  "impact": "NEGATIVE",
  "sourceUrl": "https://..."
}
```

`impact` values: `POSITIVE` / `NEUTRAL` / `NEGATIVE`

### 2.4 Pending Legislation Entry

```json
{
  "billNumber": "HB 1537",
  "summary": "State pre-emption of local STR rules",
  "expectedDecision": "2026-05-01",
  "likelihood": "MODERATE",
  "sourceUrl": "https://..."
}
```

---

## SECTION 3: INITIAL DATABASE — FLORIDA FOCUS

> **Accuracy disclaimer shown on every FL page:** Florida's STR law is in flux due to ongoing state pre-emption efforts (HB 1537, SB 280 family of bills). All entries marked `APPROXIMATE` must be verified with the issuing municipality before any investment decision. The Barefoot Realty legal network can confirm current status for any specific property.

**All dollar figures, tax rates, and ordinance citations below should be verified by a VA prior to public launch.** Most reflect 2024-2025 publicly available data, current as of spec date. Each entry below is structured so it can be dropped directly into the JSON database.

---

### 3.1 Miami-Dade County (unincorporated)

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Certificate of Use + State DBPR Vacation Rental License
- **License Cost:** ~$185 Certificate of Use; ~$150–$300 state DBPR (depending on # of units)
- **Renewal:** Annual
- **Inspections:** Yes — fire safety + Certificate of Use inspection
- **Occupancy:** 2 per bedroom + 2, max varies by zoning
- **Minimum Stay:** Varies by zoning district; many residential districts require **6+ months** (effectively bans STR)
- **Owner Occupancy Required:** No (in permitted zones)
- **Hosted vs Unhosted:** Unhosted permitted in allowed zones only
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Miami-Dade Discretionary Surtax: 1.0%
  - Tourist Development Tax: 6.0%
  - **Combined: ~13.0%**
- **Zoning:** STRs only allowed in specific zoning districts — large swaths of Miami-Dade ban STR outright. Check BTR-ready zones.
- **Recent Changes:** Miami-Dade enforcement increased 2024–2025 with fines up to $5,000/day for unpermitted rentals.
- **Pending:** State pre-emption bills could override local rules.
- **Warnings:** `RESTRICTED_ZONING`, `HIGH_ENFORCEMENT_RISK`
- **Sources:** miamidade.gov, floridarevenue.com, myfloridalicense.com

---

### 3.2 Miami Beach

- **Status:** RESTRICTED (heavily)
- **Confidence:** VERIFIED
- **License Required:** Yes — Business Tax Receipt + Resort Tax Registration + State DBPR
- **License Cost:** ~$400–$600 BTR initial
- **Renewal:** Annual
- **Inspections:** Yes
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **6 months + 1 day** in most single-family residential zones (RS-1/2/3/4). STR effectively banned in these zones. Legal in specific multi-family/commercial districts.
- **Owner Occupancy Required:** No (where permitted)
- **Hosted vs Unhosted:** Unhosted only in approved zones
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Miami-Dade Surtax: 1.0%
  - Tourist Development Tax: 6.0%
  - **Miami Beach Resort Tax: 4.0%**
  - **Combined: ~17.0% (highest in Florida)**
- **Zoning:** Legal zones publicly listed; fines for violations are **$20,000 for first offense**, up to $100,000 for repeat.
- **Recent Changes:** Enforcement continues to intensify; platform compliance requirements tightened.
- **Pending:** Subject to state pre-emption challenges.
- **Warnings:** `RESTRICTED_ZONING`, `EXTREME_FINES`, `HIGH_TAX_BURDEN`
- **Sources:** miamibeachfl.gov, floridarevenue.com

---

### 3.3 Orlando / Orange County

- **Status:** RESTRICTED (within city of Orlando) / LEGAL (many Orange County zones)
- **Confidence:** APPROXIMATE
- **License Required:** Yes — City of Orlando requires "Home Share" permit; Orange County requires BTR
- **License Cost:** ~$275 (home share registration, Orlando)
- **Renewal:** Annual
- **Inspections:** Yes (Orlando home share)
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:**
  - **City of Orlando:** Home Share only — owner must be present. Whole-home unhosted STRs effectively banned.
  - **Orange County unincorporated (incl. much of "Orlando market"):** Legal in STR-zoned areas (Vacation Home Rental District)
- **Owner Occupancy Required:** Yes (City of Orlando), No (Orange County STR zones)
- **Hosted vs Unhosted:** Orlando city = hosted only. County = both allowed in proper zones.
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Orange County Tourist Development Tax: 6.0%
  - **Combined: ~12.5% (incl. 0.5% surtax)**
- **Zoning:** Vacation Home Rental District is the green-light zone for whole-home STR (primarily near Disney).
- **Recent Changes:** Orange County tightened registration requirements 2024.
- **Pending:** State pre-emption watch.
- **Warnings:** `CITY_VS_COUNTY_DIFFERENCE` — investor must confirm exact jurisdiction.
- **Sources:** orlando.gov, orangecountyfl.net

---

### 3.4 Kissimmee / Osceola County

- **Status:** LEGAL (one of Florida's most STR-friendly markets)
- **Confidence:** VERIFIED
- **License Required:** Yes — Osceola County BTR + State DBPR Vacation Rental License
- **License Cost:** ~$80 Osceola BTR; ~$150–$300 DBPR
- **Renewal:** Annual
- **Inspections:** Yes (state-level)
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** No minimum in designated Tourist Commercial / Short-Term Rental zones
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both allowed
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Osceola Discretionary Surtax: 1.5%
  - Tourist Development Tax: 6.0%
  - **Combined: ~13.5%**
- **Zoning:** Specific Tourist Commercial/Vacation Home zones (Reunion, ChampionsGate, Solterra, Windsor, Storey Lake, etc.) are STR-legal by design.
- **Recent Changes:** Osceola continues to permit STR in master-planned resort communities. Minor TDT collection rule tightening 2025.
- **Pending:** None major.
- **Warnings:** `HOA_HEAVY` — most resort communities have strict HOA rules that can be more restrictive than county.
- **Sources:** osceola.org, floridarevenue.com

---

### 3.5 Tampa / Hillsborough County

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Tampa BTR + State DBPR
- **License Cost:** ~$135 BTR
- **Renewal:** Annual
- **Inspections:** State DBPR inspection
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **7-day minimum** in most Tampa residential zones; **30-day minimum** in some single-family districts.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both, subject to zoning
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Hillsborough Surtax: 1.5%
  - Tourist Development Tax: 6.0%
  - **Combined: ~13.5%**
- **Zoning:** Commercial/Mixed-Use zones allow STR. Residential single-family typically requires 30+ day stays.
- **Recent Changes:** Tampa Housing Code updated enforcement mechanisms 2024.
- **Pending:** State pre-emption watch.
- **Warnings:** `MINIMUM_STAY_7D`, `ZONING_CRITICAL`
- **Sources:** tampagov.net, hillsboroughcounty.org

---

### 3.6 St. Petersburg / Pinellas County

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — City BTR + State DBPR
- **License Cost:** ~$87 BTR
- **Renewal:** Annual
- **Inspections:** State-level
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **STR (under 30 days) prohibited in single-family residential (NS-1)** and most residential zones. Allowed in downtown/tourist/commercial zones.
- **Owner Occupancy Required:** No (in allowed zones)
- **Hosted vs Unhosted:** Both (allowed zones only)
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Pinellas Surtax: 1.0%
  - Tourist Development Tax: 6.0%
  - **Combined: ~13.0%**
- **Zoning:** Heavily zoning-dependent. Confirm zone of target property before purchase.
- **Recent Changes:** St. Pete tightened enforcement 2024–2025.
- **Pending:** State pre-emption.
- **Warnings:** `RESTRICTED_ZONING`
- **Sources:** stpete.org, pinellascounty.org

---

### 3.7 Clearwater / Pinellas County

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — City BTR + State DBPR
- **License Cost:** ~$80 BTR
- **Renewal:** Annual
- **Inspections:** State DBPR
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **Under 31 days prohibited in most single-family zones**; allowed in Tourist (T) and Commercial zones (most of Clearwater Beach barrier island).
- **Owner Occupancy Required:** No (allowed zones)
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Pinellas Surtax: 1.0%
  - Tourist Development Tax: 6.0%
  - **Combined: ~13.0%**
- **Zoning:** Beach barrier island (T zones) is the STR sweet spot. Mainland single-family mostly restricted.
- **Recent Changes:** Minor procedural updates 2024.
- **Pending:** State pre-emption watch.
- **Warnings:** `MAINLAND_VS_BEACH_ZONING`
- **Sources:** myclearwater.com

---

### 3.8 Jacksonville / Duval County

- **Status:** LEGAL (relatively permissive for a major FL city)
- **Confidence:** APPROXIMATE
- **License Required:** Yes — City Short-Term Vacation Rental Certificate + State DBPR
- **License Cost:** ~$150 certificate
- **Renewal:** Annual
- **Inspections:** Yes — life-safety inspection required
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** No minimum (under 30-day stays permitted with certificate)
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Duval Surtax: 1.5%
  - Tourist Development Tax: 6.0%
  - **Combined: ~13.5%**
- **Zoning:** Permitted in most residential zones with certificate.
- **Recent Changes:** Jacksonville formalized the SVR Certificate program in 2022; enforcement ramping.
- **Pending:** Periodic council review.
- **Warnings:** `LIFE_SAFETY_INSPECTION_REQUIRED`
- **Sources:** coj.net, duvalcountytax.net

---

### 3.9 Fort Lauderdale / Broward County

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Vacation Rental Registration (city) + Broward BTR + State DBPR
- **License Cost:** ~$350 (city registration)
- **Renewal:** Annual
- **Inspections:** Yes — city inspection required before operation
- **Occupancy:** 2 per bedroom + 2, max 10
- **Minimum Stay:** No state-wide minimum, but Fort Lauderdale imposes strict operational rules — no under-21 renters, parking requirements, noise compliance.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Broward Surtax: 1.0%
  - Tourist Development Tax: 6.0%
  - **Combined: ~13.0%**
- **Zoning:** Allowed in most zones with registration; HOA/condo association overlay is common.
- **Recent Changes:** Registration fees increased 2024; responsible-party rule enforced.
- **Pending:** State pre-emption watch.
- **Warnings:** `HIGH_REGISTRATION_COST`, `STRICT_OPERATIONS_RULES`
- **Sources:** fortlauderdale.gov, broward.org

---

### 3.10 Hollywood (FL) / Broward County

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — City Vacation Rental Registration + State DBPR
- **License Cost:** ~$300 city registration
- **Renewal:** Annual
- **Inspections:** Yes
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **7-day minimum in most single-family residential zones**; no minimum in multi-family and hotel zones on the beach.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Broward Surtax: 1.0%
  - Tourist Development Tax: 6.0%
  - **Combined: ~13.0%**
- **Zoning:** Beach-side multifamily is the premier STR zone. Single-family inland has 7-day minimum.
- **Recent Changes:** Registration program tightened 2024.
- **Pending:** Monitor for ordinance updates.
- **Warnings:** `MINIMUM_STAY_7D_SOME_ZONES`
- **Sources:** hollywoodfl.org

---

### 3.11 Naples / Collier County

- **Status:** LEGAL (in properly zoned areas); city of Naples is more restrictive
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Collier County BTR + State DBPR
- **License Cost:** ~$50 BTR
- **Renewal:** Annual
- **Inspections:** State-level
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:**
  - **City of Naples:** STR allowed but heavily regulated. Limit of **3 rental transactions per year** in some residential zones (effectively kills STR). Confirm zone.
  - **Unincorporated Collier / Marco Island area:** Generally more permissive.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Collier Surtax: 0.0% (no local surtax)
  - Tourist Development Tax: 5.0%
  - **Combined: ~11.0%**
- **Zoning:** City of Naples strictly caps rentals per year in many zones.
- **Recent Changes:** City of Naples enforcement increased 2023-2024.
- **Pending:** Collier County periodic review.
- **Warnings:** `CITY_VS_COUNTY_DIFFERENCE`, `RENTAL_FREQUENCY_CAP`
- **Sources:** naplesgov.com, colliercountyfl.gov

---

### 3.12 Marco Island / Collier County

- **Status:** LEGAL
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Collier BTR + State DBPR
- **License Cost:** ~$50 BTR
- **Renewal:** Annual
- **Inspections:** State-level
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **7-day minimum** in most Marco Island residential zones (zoning ordinance defines "tourist rental" as <30 days, permitted in RT/C zones).
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Collier Surtax: 0.0%
  - Tourist Development Tax: 5.0%
  - **Combined: ~11.0%**
- **Zoning:** RT (Residential Tourist) is the green zone.
- **Recent Changes:** Minor operational updates.
- **Pending:** None major.
- **Warnings:** `MINIMUM_STAY_7D`
- **Sources:** cityofmarcoisland.com, colliercountyfl.gov

---

### 3.13 Sarasota / Sarasota County

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Sarasota County BTR + State DBPR
- **License Cost:** ~$45 BTR
- **Renewal:** Annual
- **Inspections:** State-level
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:**
  - **City of Sarasota:** Single-family residential zones typically require **1-month minimum**. Commercial/tourist zones permit shorter.
  - **Siesta Key (unincorporated):** Historically permissive — **no minimum stay in RMF (multi-family) zones**; 7-day or longer minimums in some zones.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Sarasota Surtax: 1.0%
  - Tourist Development Tax: 6.0%
  - **Combined: ~13.0%**
- **Zoning:** Siesta Key is the STR sweet spot.
- **Recent Changes:** Siesta Key residents' push for tighter rules ongoing; no major ordinance changes as of spec date.
- **Pending:** Watch Siesta Key town-hood movement and state pre-emption.
- **Warnings:** `RESTRICTED_ZONING_CITY`, `SIESTA_KEY_PENDING_REVIEW`
- **Sources:** sarasotagov.com, scgov.net

---

### 3.14 Bradenton / Manatee County

- **Status:** LEGAL (varies by municipality within county)
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Manatee BTR + State DBPR
- **License Cost:** ~$45 BTR
- **Renewal:** Annual
- **Inspections:** State-level
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:**
  - Manatee County (unincorporated): generally permissive
  - City of Bradenton: **7-day minimum** in many residential zones
  - City of Bradenton Beach: Pre-existing STR friendly with operational rules
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Manatee Surtax: 1.0%
  - Tourist Development Tax: 5.0%
  - **Combined: ~12.0%**
- **Zoning:** City-by-city within Manatee — critical to verify.
- **Recent Changes:** Ongoing ordinance discussion at municipal levels.
- **Pending:** Watch.
- **Warnings:** `MUNICIPALITY_VARIES`
- **Sources:** mymanatee.org, cityofbradenton.com

---

### 3.15 Key West / Monroe County

- **Status:** BANNED (effectively) in most of Key West
- **Confidence:** VERIFIED
- **License Required:** Yes, and licenses are **capped/frozen**; new licenses virtually unavailable
- **License Cost:** Original grandfathered licenses sell for $100,000+
- **Renewal:** Annual
- **Inspections:** Yes
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **28-day minimum** citywide for non-licensed STRs. Only properties with grandfathered Transient Licenses can operate <28-day rentals, and the moratorium on new licenses has been in place for years.
- **Owner Occupancy Required:** No (for licensed properties)
- **Hosted vs Unhosted:** Both (licensed)
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Monroe Surtax: 1.5%
  - Tourist Development Tax: 5.0%
  - Tourist Impact Tax: 1.0%
  - **Combined: ~13.5%**
- **Zoning:** The 28-day rule is citywide.
- **Recent Changes:** License moratorium continues. Enforcement fines exceed $20,000 for unlicensed STR.
- **Pending:** State pre-emption could force Key West to open up — actively contested.
- **Warnings:** `BANNED_WITHOUT_LEGACY_LICENSE`, `EXTREME_FINES`, `28_DAY_MINIMUM`
- **Sources:** cityofkeywest-fl.gov, monroecounty-fl.gov

---

### 3.16 Florida Keys (general — unincorporated Monroe)

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Monroe County Vacation Rental License + State DBPR
- **License Cost:** ~$250 county license
- **Renewal:** Annual
- **Inspections:** Yes
- **Occupancy:** 2 per bedroom + 2, max varies
- **Minimum Stay:** **28-day minimum in many unincorporated Keys zones** unless a Vacation Rental Permit has been issued. Permits are limited.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both (permitted)
- **Taxes:** Same as Key West — ~13.5% combined
- **Zoning:** URM, SR zones mostly restricted to 28+ days. IS (Improved Subdivision) with permit allowed.
- **Recent Changes:** Permit cap; long waitlists.
- **Pending:** State pre-emption.
- **Warnings:** `PERMIT_CAP`, `28_DAY_MINIMUM_DEFAULT`
- **Sources:** monroecounty-fl.gov

---

### 3.17 Destin / Walton County (NOTE: Destin is in Okaloosa County)

**Correction:** Destin is in **Okaloosa County**. "30A / South Walton" is in Walton County.

- **Status:** LEGAL (highly STR-friendly)
- **Confidence:** VERIFIED
- **License Required:** Yes — City of Destin BTR + State DBPR + Okaloosa BTR
- **License Cost:** ~$75 city BTR
- **Renewal:** Annual
- **Inspections:** Yes — life safety
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** No minimum in most zones
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Okaloosa Surtax: 1.0%
  - Tourist Development Tax: 5.0%
  - **Combined: ~12.0%**
- **Zoning:** Broadly permissive; Destin is purpose-built tourist town.
- **Recent Changes:** Destin passed registration ordinance 2021; tweaks since.
- **Pending:** None major.
- **Warnings:** None critical. `COUNTY_CORRECTION` — Destin = Okaloosa, not Walton.
- **Sources:** cityofdestin.com, myokaloosa.com

---

### 3.18 30A / South Walton / Walton County

- **Status:** LEGAL (one of the most STR-friendly in Florida)
- **Confidence:** VERIFIED
- **License Required:** Yes — Walton County BTR + State DBPR; **Walton Certificate of Registration** required (HB 1147 compliant registration system)
- **License Cost:** ~$150 Certificate of Registration
- **Renewal:** Annual
- **Inspections:** Yes — life safety + BOCA compliance
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** No minimum
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Walton Surtax: 1.0%
  - Tourist Development Tax: 5.0%
  - **Combined: ~12.0%**
- **Zoning:** Broadly permissive. 30A is purpose-built beach resort corridor.
- **Recent Changes:** Walton implemented robust Certificate of Registration program 2023-2024 in response to state pressure.
- **Pending:** None major.
- **Warnings:** None critical.
- **Sources:** co.walton.fl.us

---

### 3.19 Panama City Beach / Bay County

- **Status:** LEGAL
- **Confidence:** VERIFIED
- **License Required:** Yes — PCB BTR + State DBPR
- **License Cost:** ~$75 BTR
- **Renewal:** Annual
- **Inspections:** State-level
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** No minimum
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Bay Surtax: 1.0%
  - Tourist Development Tax: 5.0%
  - **Combined: ~12.0%**
- **Zoning:** Purpose-built tourist market.
- **Recent Changes:** PCB tightened noise and parking enforcement 2024.
- **Pending:** None major.
- **Warnings:** `HIGH_SPRING_BREAK_ENFORCEMENT`
- **Sources:** pcbgov.com

---

### 3.20 Pensacola Beach / Escambia County

- **Status:** LEGAL
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Escambia BTR + State DBPR (Pensacola Beach is on Santa Rosa Island, managed by Santa Rosa Island Authority — separate leasehold rules)
- **License Cost:** ~$45 BTR
- **Renewal:** Annual
- **Inspections:** State-level
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** No minimum
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Escambia Surtax: 1.5%
  - Tourist Development Tax: 5.0%
  - **Combined: ~12.5%**
- **Zoning:** Pensacola Beach is leasehold (SRIA) — unique land structure. Confirm leasehold terms in any purchase.
- **Recent Changes:** SRIA lease renewal discussions ongoing.
- **Pending:** Watch SRIA leasehold structure.
- **Warnings:** `LEASEHOLD_NOT_FEE_SIMPLE` (for Pensacola Beach proper)
- **Sources:** myescambia.com, sria-fla.com

---

### 3.21 Daytona Beach / Volusia County

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Daytona Beach BTR + State DBPR
- **License Cost:** ~$100 BTR
- **Renewal:** Annual
- **Inspections:** State-level
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **7-day minimum in most residential zones.** Beachside condos and Resort zones permit shorter stays.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Volusia Surtax: 0.5%
  - Tourist Development Tax: 6.0%
  - **Combined: ~12.5%**
- **Zoning:** Beachside/tourist zones are the STR sweet spot.
- **Recent Changes:** Minor updates to event-period enforcement (Bike Week, Race Weeks).
- **Pending:** None major.
- **Warnings:** `MINIMUM_STAY_7D_RESIDENTIAL`, `EVENT_ENFORCEMENT`
- **Sources:** codb.us, volusia.org

---

### 3.22 New Smyrna Beach / Volusia County

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — NSB BTR + State DBPR
- **License Cost:** ~$150 BTR
- **Renewal:** Annual
- **Inspections:** Yes (city-level for safety)
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **7-day minimum in single-family residential zones (R-1, R-2).** Shorter stays permitted in commercial/tourist zones and pre-existing "grandfathered" properties.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Volusia Surtax: 0.5%
  - Tourist Development Tax: 6.0%
  - **Combined: ~12.5%**
- **Zoning:** R-1/R-2 = 7+ days. Beach/tourist zones more permissive.
- **Recent Changes:** NSB has tightened STR rules — registration required for all STRs since 2022.
- **Pending:** Review ongoing.
- **Warnings:** `MINIMUM_STAY_7D_RESIDENTIAL`
- **Sources:** cityofnsb.com

---

### 3.23 Anna Maria Island (Anna Maria / Holmes Beach / Bradenton Beach) / Manatee County

- **Status:** RESTRICTED (island-wide, heavily regulated)
- **Confidence:** VERIFIED
- **License Required:** Yes — City Vacation Rental Certificate (each of 3 cities has separate rule) + Manatee BTR + State DBPR
- **License Cost:** ~$300–$700 depending on city
- **Renewal:** Annual
- **Inspections:** Yes — annual inspection
- **Occupancy:** **Strict occupancy caps** — Holmes Beach: 2 per bedroom + 2, max 8–12 depending on unit. Overage fines are severe.
- **Minimum Stay:** No minimum (currently) but cities have considered 7-day minimum multiple times
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Manatee Surtax: 1.0%
  - Tourist Development Tax: 5.0%
  - **Combined: ~12.0%**
- **Zoning:** Island-wide residential zoning. Heavy regulation via operational rules (occupancy, parking, noise, trash).
- **Recent Changes:** Holmes Beach enforcement increased; Bradenton Beach inspection regime tightened 2024-2025.
- **Pending:** Recurring discussion of minimum night stay.
- **Warnings:** `STRICT_OCCUPANCY_CAPS`, `HIGH_OPERATIONAL_SCRUTINY`, `THREE_CITIES_ONE_ISLAND`
- **Sources:** cityofannamaria.com, holmesbeachfl.org, cityofbradentonbeach.com

---

### 3.24 Fort Myers Beach / Lee County

- **Status:** LEGAL (in designated zones; post-Ian redevelopment ongoing)
- **Confidence:** APPROXIMATE
- **License Required:** Yes — FMB BTR + State DBPR + Lee BTR
- **License Cost:** ~$100 BTR
- **Renewal:** Annual
- **Inspections:** State-level + rebuild code compliance
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:** **7-day minimum in most residential zones** (RS); no minimum in commercial/resort zones.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Lee Surtax: 0.5%
  - Tourist Development Tax: 5.0%
  - **Combined: ~11.5%**
- **Zoning:** Commercial/resort = short stays; residential = 7+ days.
- **Recent Changes:** Post-Hurricane Ian (Sept 2022) rebuild codes affect rental operations. Flood elevation rules crucial.
- **Pending:** Continuing rebuild-related code updates.
- **Warnings:** `POST_HURRICANE_REBUILD_CODES`, `FLOOD_INSURANCE_CRITICAL`
- **Sources:** fortmyersbeachfl.gov, leegov.com

---

### 3.25 Sanibel / Captiva / Lee County

- **Status:** RESTRICTED
- **Confidence:** APPROXIMATE
- **License Required:** Yes — Sanibel BTR + State DBPR + Lee BTR (Captiva is unincorporated Lee County, same Lee rules)
- **License Cost:** ~$85 BTR
- **Renewal:** Annual
- **Inspections:** State-level
- **Occupancy:** 2 per bedroom + 2
- **Minimum Stay:**
  - **Sanibel:** **Minimum 28-day rentals in most residential zones.** Limited "Resort Housing" zones permit shorter stays.
  - **Captiva:** More permissive in designated Captiva Residential and Commercial zones; many allow <7 days.
- **Owner Occupancy Required:** No
- **Hosted vs Unhosted:** Both
- **Taxes:**
  - FL State Sales Tax: 6.0%
  - Lee Surtax: 0.5%
  - Tourist Development Tax: 5.0%
  - **Combined: ~11.5%**
- **Zoning:** Sanibel protects residential character fiercely — STR is effectively Resort Housing zones only.
- **Recent Changes:** Post-Ian rebuild focus. STR rules unchanged.
- **Pending:** None major.
- **Warnings:** `SANIBEL_28_DAY_MINIMUM`, `CAPTIVA_MORE_PERMISSIVE`, `POST_HURRICANE_REBUILD_CODES`
- **Sources:** mysanibel.com, leegov.com

---

## SECTION 4: TOP 10 NON-FL MARKETS

### 4.1 Nashville, TN (Davidson County)

- **Status:** RESTRICTED
- **License:** Yes — Short-Term Rental Property Permit. Type 1 (owner-occupied) broadly permitted. Type 2 (non-owner-occupied) heavily restricted, many zones capped at 3%.
- **Cost:** $50 permit
- **Minimum Stay:** None (under STRP permit)
- **Taxes:** TN State Sales 7.0% + Davidson Local 2.25% + Hotel Occupancy 6.0% + TN Business Tax. **Combined: ~15.25%**
- **Warnings:** `OWNER_OCCUPANCY_FOR_TYPE_1_ZONES`, `TYPE_2_CAP`
- **Sources:** nashville.gov

### 4.2 Asheville, NC

- **Status:** RESTRICTED (heavily for whole-home STR)
- **License:** Homestay (owner-occupied) — permitted citywide. Whole-home STR — banned in most residential zones; only allowed in specific Resort and Commercial zones.
- **Cost:** ~$150 homestay permit
- **Minimum Stay:** 30+ days outside permitted zones (effectively medium-term)
- **Taxes:** NC State Sales 4.75% + Buncombe Local 2.25% + Occupancy Tax 6.0%. **Combined: ~13.0%**
- **Warnings:** `WHOLE_HOME_BANNED_MOST_ZONES`, `HOMESTAY_ONLY`
- **Sources:** ashevillenc.gov

### 4.3 Gatlinburg, TN (Sevier County)

- **Status:** LEGAL (most STR-friendly in the Smokies)
- **License:** Yes — Business License + Hotel-Motel tax registration
- **Cost:** ~$100 business license
- **Minimum Stay:** None
- **Taxes:** TN State 7.0% + Sevier Local 2.75% + Hotel Tax 3.0%. **Combined: ~12.75%**
- **Warnings:** None critical.
- **Sources:** gatlinburgtn.gov, seviercountytn.gov

### 4.4 Sevierville / Pigeon Forge, TN (Sevier County)

- **Status:** LEGAL (highly STR-friendly — cabin rental capital)
- **License:** Yes — Business License + Sevier County Overnight Lodging registration
- **Cost:** ~$100
- **Minimum Stay:** None
- **Taxes:** TN State 7.0% + Sevier Local 2.75% + Hotel Tax 3.0%. **Combined: ~12.75%**
- **Warnings:** None critical. Heavy HOA/resort-community overlay in cabin developments.
- **Sources:** seviervilletn.org, mypigeonforge.com

### 4.5 Joshua Tree, CA (San Bernardino County)

- **Status:** RESTRICTED (since 2023)
- **License:** Yes — San Bernardino County STR Permit; **cap of 1 STR per 100 parcels** in unincorporated areas.
- **Cost:** ~$760 initial + $440 renewal (approximate)
- **Minimum Stay:** 2 nights
- **Taxes:** CA State 7.25% + Local add-ons + Transient Occupancy Tax 7%. **Combined: ~15.25%**
- **Warnings:** `STR_CAP_ONE_PER_100_PARCELS`, `WAITLIST_FOR_NEW_PERMITS`, `HIGH_DENIAL_RATE`
- **Sources:** countyofsanbernardino.gov

### 4.6 Big Bear Lake, CA

- **Status:** RESTRICTED (cap imposed 2022)
- **License:** Yes — city STR permit; **cap on total STR permits** (~3,000 citywide).
- **Cost:** ~$260 initial permit
- **Minimum Stay:** 2 nights
- **Taxes:** CA State 7.25% + Big Bear TOT 8.0%. **Combined: ~15.25%**
- **Warnings:** `PERMIT_CAP_REACHED`, `WAITLIST`
- **Sources:** citybigbearlake.com

### 4.7 Park City, UT

- **Status:** LEGAL in permitted zones (heavily nightly-rental-zoned)
- **License:** Yes — Nightly Rental License + Utah Sales Tax registration
- **Cost:** ~$250 annually
- **Minimum Stay:** None in nightly-rental zones
- **Taxes:** UT State 4.85% + Summit Local 1.8% + Transient Room Tax 3.0% + Resort Tax 1.1%. **Combined: ~10.75%+**
- **Warnings:** `ZONE_CRITICAL` — only nightly-rental-zoned properties can STR.
- **Sources:** parkcity.org

### 4.8 Hilton Head, SC (Beaufort County)

- **Status:** LEGAL (highly STR-friendly)
- **License:** Yes — Hilton Head Short-Term Rental Permit + Business License + Beaufort registration
- **Cost:** ~$250 permit
- **Minimum Stay:** None
- **Taxes:** SC State 5.0% + Beaufort 1.0% + Accommodations Tax 2.0% + Local Accommodations 3.0%. **Combined: ~11.0%+**
- **Warnings:** `PLANTATION_HOA_OVERLAY` — most Hilton Head properties are in master-planned plantations with own rules.
- **Sources:** hiltonheadislandsc.gov

### 4.9 Outer Banks, NC (Dare County / Currituck County)

- **Status:** LEGAL (highly STR-friendly — long-established rental market)
- **License:** Yes — county-level registration and Occupancy Tax registration
- **Cost:** ~$25–$75
- **Minimum Stay:** None
- **Taxes:** NC State 4.75% + Dare Local 1.0% + Occupancy Tax 6.0%. **Combined: ~11.75%**
- **Warnings:** `FLOOD_INSURANCE_CRITICAL` (coastal), `SEPTIC_INSPECTION_REQUIRED`
- **Sources:** darenc.gov, co.currituck.nc.us

### 4.10 Finger Lakes, NY (Seneca, Yates, Schuyler Counties)

- **Status:** LEGAL (varies town-by-town; NY STR oversight is municipal)
- **License:** Most towns require a permit or registration; some require bed-and-breakfast-style inspection
- **Cost:** $50–$300 depending on town
- **Minimum Stay:** None (most towns); some wine-country towns have imposed 2-night minimums
- **Taxes:** NY State 4.0% + County 3.0%–4.0% + Occupancy Tax 4.0%. **Combined: ~11.0%–12.0%**
- **Warnings:** `TOWN_LEVEL_VARIATION`, `WINE_COUNTRY_RESIDENTIAL_PUSHBACK`
- **Sources:** co.seneca.ny.us, yatescounty.org, schuylercounty.us

---

## SECTION 5: WARNING SYSTEM

Each warning code drives a standardized UI badge and tooltip. Codes are stored in the `warnings` array on each location record.

### 5.1 Warning Codes Reference

| Code | Display | Severity | Tooltip |
|---|---|---|---|
| `BANNED_STRS_PROHIBITED` | BANNED: STRs not currently allowed | CRITICAL | STR is unlawful in this jurisdiction. Do not purchase for STR purposes. |
| `BANNED_WITHOUT_LEGACY_LICENSE` | BANNED without grandfathered license | CRITICAL | Only pre-existing licensed properties can operate. New licenses unavailable. |
| `OWNER_OCCUPIED_ONLY` | RESTRICTED: Owner-occupied only | HIGH | Whole-home absentee STR not permitted. Must live on-site. |
| `30_DAY_MINIMUM` | RESTRICTED: 30+ day minimum stays | HIGH | Not viable for nightly STR. Medium-term rental only. |
| `28_DAY_MINIMUM` | RESTRICTED: 28+ day minimum stays | HIGH | Not viable for nightly STR. Medium-term rental only. |
| `MINIMUM_STAY_7D` | RESTRICTED: 7-day minimum stays | MODERATE | Weekly rental only. Viable but limits turnover. |
| `MINIMUM_STAY_7D_RESIDENTIAL` | 7-day minimum in residential zones | MODERATE | Nightly STR permitted in commercial/tourist zones only. |
| `RESTRICTED_ZONING` | RESTRICTED: Zoning-dependent | HIGH | Legality depends on specific zone of target property. |
| `CITY_VS_COUNTY_DIFFERENCE` | CAUTION: City and county rules differ | MODERATE | Confirm exact jurisdiction of target property. |
| `MUNICIPALITY_VARIES` | CAUTION: Varies by town/city | MODERATE | Each municipality has its own rules within this county. |
| `PENDING_LEGISLATION_REVIEW` | PENDING: Legislation under review | MODERATE | Rules may change. Check back monthly. |
| `STATE_PREEMPTION_WATCH` | PENDING: State pre-emption possible | MODERATE | State-level action could override local rules. |
| `GRAY_AREA_ENFORCEMENT` | GRAY AREA: Enforcement varies | MODERATE | Technical rules exist but enforcement is inconsistent. Consult local attorney. |
| `HIGH_ENFORCEMENT_RISK` | WARNING: Active enforcement | HIGH | Municipality actively pursuing violations. Fines likely if non-compliant. |
| `EXTREME_FINES` | WARNING: Extreme fines | HIGH | Fines exceed $10,000 per violation. |
| `HIGH_TAX_BURDEN` | WARNING: Combined tax exceeds 15% | MODERATE | Factor into pro-forma cash flow analysis. |
| `PERMIT_CAP` / `PERMIT_CAP_REACHED` | CAUTION: Permit cap | HIGH | New permits limited or unavailable. Check waitlist. |
| `STRICT_OCCUPANCY_CAPS` | CAUTION: Strict occupancy caps | MODERATE | Occupancy enforced; overage fines significant. |
| `HOA_HEAVY` | CAUTION: HOA rules may override | MODERATE | Many properties in HOA/resort communities with own STR rules. |
| `LEASEHOLD_NOT_FEE_SIMPLE` | CAUTION: Leasehold land | HIGH | Property is on leased land, not fee-simple. Review lease terms. |
| `FLOOD_INSURANCE_CRITICAL` | CAUTION: Flood zone | MODERATE | Coastal / flood risk. Insurance costs material. |
| `POST_HURRICANE_REBUILD_CODES` | CAUTION: Post-hurricane codes | MODERATE | Rebuild and elevation rules affect viability and cost. |
| `LIFE_SAFETY_INSPECTION_REQUIRED` | NOTE: Life-safety inspection | LOW | Smoke/CO/egress inspection required prior to operation. |
| `EVENT_ENFORCEMENT` | NOTE: Event-period enforcement | LOW | Heightened enforcement during peak events. |
| `OUTDATED_DATA` | WARNING: Data may be outdated | HIGH | Last verified more than 180 days ago. |

### 5.2 Warning Display Logic

```
For each warning on the page, display:
  [SEVERITY-COLORED BADGE]  [Warning Display Text]  [?]  <- tooltip

Color scheme:
  CRITICAL  → Red background, white text
  HIGH      → Orange background, white text
  MODERATE  → Yellow background, black text
  LOW       → Gray background, black text

Above-the-fold prominence:
  CRITICAL warnings surface in hero status badge
  HIGH warnings surface in quick-answer card
  MODERATE/LOW appear in dedicated "Things to Know" section
```

---

## SECTION 6: LANDING PAGE COPY

### 6.1 Hero — Homepage of `/regulations/`

**Headline:**
> Is Short-Term Rental Legal in Your Market? Check Before You Buy.

**Subhead:**
> Every STR investor should ask this question first. We're the only tool that answers it. Free regulatory snapshots for 35+ US markets — licensing costs, tax burden, minimum stays, zoning restrictions, and pending legislation.

**Primary CTA (search):**
> Enter your city → [autocomplete search box] → [Check Regulations]

**Under the search box (trust row):**
> Updated monthly. Sourced from municipal websites. 25 Florida markets deeply profiled. No signup required.

**Secondary CTA (state grid):**
> Or browse by state:
> [ Florida (25) ] [ Tennessee (3) ] [ California (2) ] [ North Carolina (2) ] [ South Carolina (1) ] [ Utah (1) ] [ New York (1) ]

### 6.2 City Page Template — e.g. `/regulations/fl/anna-maria-island`

**H1:**
> Is Short-Term Rental Legal in Anna Maria Island, FL?

**Status Hero:**
> **[RESTRICTED]** Anna Maria Island, FL — Last verified: 2026-04-15

**Quick-Answer Card (above fold):**

| Question | Answer |
|---|---|
| Is STR legal? | **Yes, with heavy regulation** |
| License required? | **Yes — $300–$700/yr** |
| Minimum stay? | **None currently** |
| Combined tax burden? | **12.0%** |
| Owner-occupied required? | No |

**Body headings (full page):**

1. The Short Version — Can I Do STR Here?
2. Licensing & Registration
3. Occupancy & Safety Requirements
4. Tax Obligations
5. Zoning & Location Restrictions
6. HOA / Condo Association Considerations
7. Recent Regulation Changes (Last 12 Months)
8. Pending Legislation to Watch
9. Warnings & Things to Know
10. Sources & How We Verify
11. Related Florida Markets

**Example result snippets (3-4 for the landing page):**

> **ANNA MARIA ISLAND, FL** — RESTRICTED. STR legal but strict occupancy caps, 3 cities on one island with separate rules, annual inspections. Combined tax burden 12%. Current minimum stay: none (under review).

> **KEY WEST, FL** — BANNED (effectively). License moratorium since mid-2000s. Grandfathered licenses trade for $100K+. 28-day minimum citywide. Enforcement fines exceed $20K.

> **30A / SOUTH WALTON, FL** — LEGAL. One of Florida's most STR-friendly markets. Certificate of Registration required ($150/yr). No minimum stay. Combined tax 12%.

> **NASHVILLE, TN** — RESTRICTED. Whole-home (Type 2) STRs capped at 3% per census tract and banned in most residential zones. Owner-occupied (Type 1) permitted citywide.

### 6.3 Email Capture Copy (in-page and modal)

**In-page (sidebar card):**
> **Get alerts when Anna Maria Island regulations change.**
>
> Regulations here change. We track every ordinance revision, tax rate update, and pending bill. One email per month — only when something relevant changes.
>
> [ Your email ] [ Alert Me ]
>
> *No spam. Unsubscribe anytime. We also send you our free STR Legality Checklist.*

**Exit-intent modal:**
> **Wait — save this page.**
>
> Regulations in [City] will change. Be the first to know.
>
> [ Email ] [ Send Me Updates ]

### 6.4 Trust Signals (footer on every city page)

- Updated monthly — last review: [DATE]
- Sourced from: [Municipal website], [State DOR], [County tax collector]
- Verified by SpokeBnB research team
- Not legal advice — always confirm with the municipality or a licensed attorney before purchase.

### 6.5 Soft CTA — Barefoot Realty (status-aware)

**If status = LEGAL:**
> **Ready to buy in [City]?**
> Barefoot Realty & Investments specializes in STR-ready properties in Florida's top vacation markets. We find the ones that actually cash flow — compliant, rentable, and underpriced.
> [ Get a property consult → ]

**If status = RESTRICTED:**
> **Still want to invest here?**
> The map has more green than it looks. Barefoot Realty knows the specific zones, condos, and legacy-permitted properties where STR works in [City]. If there's a compliant play, we'll find it.
> [ Talk to an STR-first Realtor → ]

**If status = BANNED:**
> **Consider a nearby legal market.**
> [City] isn't an option — but these three markets within a 2-hour drive are.
> [List of 3 related legal markets with links]
> Or: [ Talk to Barefoot Realty about Florida markets that work → ]

---

## SECTION 7: SEO STRATEGY

### 7.1 Primary Keyword Cluster (per city)

For each city in the database, target:

1. `[city] short term rental rules` — high intent, mid volume
2. `[city] airbnb regulations` — high intent, mid volume
3. `can I do airbnb in [city]` — high intent, question-format
4. `[city] vacation rental license` — ultra-high intent (ready to apply)
5. `[city] str ordinance` — high intent, policy-researcher audience
6. `is airbnb legal in [city]` — question-format, feeds featured snippets
7. `[city] airbnb laws` — high intent
8. `[city] short term rental license cost` — high intent, commercial
9. `[city] vacation rental registration` — high intent, procedural

### 7.2 URL Structure

```
/regulations/                            ← hub page (state grid, top markets, search)
/regulations/[state]/                    ← state hub (list of all cities in state)
/regulations/[state]/[city-slug]         ← city detail page (the money page)
/regulations/compare/[city1]-vs-[city2]  ← comparison pages (future)
/regulations/glossary                    ← STR terminology reference page
/regulations/florida-str-guide           ← state-level pillar content
```

Examples:
- `/regulations/fl/anna-maria-island`
- `/regulations/fl/key-west`
- `/regulations/tn/nashville`

### 7.3 Meta Templates

**Title template (city page):**
```
Is Airbnb Legal in {{city}}, {{state}}? {{year}} STR Rules & Licensing | SpokeBnB
```

Example: `Is Airbnb Legal in Anna Maria Island, FL? 2026 STR Rules & Licensing | SpokeBnB`

**Meta description template:**
```
{{city}}, {{state}} short-term rental rules: license cost ${{licenseCost}}, {{minimumStay}} minimum stay, {{combinedTax}}% combined tax. Verified {{lastVerified}}. Check before you buy.
```

**H1:**
```
Is Short-Term Rental Legal in {{city}}, {{state}}?
```

### 7.4 Schema Markup

Every city page should include:

**LocalBusiness/Place schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Place",
  "name": "{{city}}, {{state}}",
  "address": { "@type": "PostalAddress", "addressLocality": "{{city}}", "addressRegion": "{{state}}", "addressCountry": "US" }
}
```

**FAQPage schema** (5-7 questions per city, derived from the regulation data):

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Is Airbnb legal in {{city}}?", "acceptedAnswer": { "@type": "Answer", "text": "{{statusNarrative}}" } },
    { "@type": "Question", "name": "Do I need a license to Airbnb in {{city}}?", "acceptedAnswer": { "@type": "Answer", "text": "{{licenseNarrative}}" } },
    { "@type": "Question", "name": "What is the minimum stay for STR in {{city}}?", "acceptedAnswer": { "@type": "Answer", "text": "{{minStayNarrative}}" } },
    { "@type": "Question", "name": "What taxes do I owe on STR revenue in {{city}}?", "acceptedAnswer": { "@type": "Answer", "text": "{{taxNarrative}}" } },
    { "@type": "Question", "name": "How much does an STR license cost in {{city}}?", "acceptedAnswer": { "@type": "Answer", "text": "{{costNarrative}}" } }
  ]
}
```

**BreadcrumbList schema** — Home > Regulations > State > City

**Dataset schema** — The overall regulation database as a structured Dataset (signals authority to Google).

### 7.5 Internal Linking Strategy

Every city page links to:

1. **3–5 related cities in the same state** (sidebar "Related Markets")
2. **Module 10 — Barefoot Advantage** (contextual CTA)
3. **State-level pillar content** (e.g. `/regulations/florida-str-guide`)
4. **Comparison pages** (e.g. `Nashville vs. Gatlinburg for STR`)
5. **SpokeBnB course pages** (e.g. "Module 02 — Direct Booking" when relevant)
6. **Blog posts** (e.g. "How FL House Bill 1537 could change STR pre-emption")

Every city page receives links from:
1. Same-state city pages (bidirectional)
2. State pillar page
3. Relevant blog posts (editorial)
4. Comparison pages
5. Glossary page (when terms referenced)

Target: **7–12 internal inbound links** per city page within 6 months of launch.

### 7.6 Content Supplements

- **State pillar:** `/regulations/florida-str-guide` — 3,000-word authoritative guide to FL STR law covering state DBPR, local pre-emption debate, tax structure, and enforcement trends. Links out to all 25 FL city pages.
- **Comparison posts:** `/regulations/compare/key-west-vs-anna-maria-island-for-str-investment`
- **Timely news posts:** `/blog/hb-1537-str-preemption-what-it-means-for-investors`
- **Glossary:** `/regulations/glossary` (what is BTR, DBPR, TDT, etc.)

---

## SECTION 8: MAINTENANCE PLAN

### 8.1 Monthly Cadence

**Week 1 of each month (VA task):**
- Verify 25% of the database (rotating) — 6–9 cities per week
- Check each city's official municipal website for ordinance updates
- Check state-level legislature trackers for pending bills
- Update `lastVerified` date on each record
- Log any changes in a central changelog spreadsheet

**Week 2:**
- Send monthly email to subscribers grouped by city
- Email sent ONLY if that city had a meaningful change in the last 30 days
- Fallback: quarterly "nothing changed in [city]" email (maintains list hygiene)

**Week 3:**
- Review user-submitted "Spotted an outdated entry" tickets
- Investigate and update
- Thank contributor by email + grant "Contributor" badge on future email sends

**Week 4:**
- Publish 1 editorial piece tied to regulatory news (feeds blog, internal linking, social)
- Quarterly: run an annual audit checkpoint if we're at month 3/6/9/12

### 8.2 Annual Deep Audit (Q1 each year)

- Full re-verification of every field in every record
- Confidence level recalibration (demote any `VERIFIED` over 12 months old to `APPROXIMATE`)
- Source URL validation (purge dead links)
- Add 5-10 new cities based on subscriber requests and traffic data
- Publish an annual "State of STR Regulation" report (huge backlink magnet)

### 8.3 Crowdsourced Updates

On every city page, footer:

> **Spotted something outdated?**
> Help other investors. Tell us what changed and we'll verify within 7 days.
> [ Quick form: field + change + source URL + email ]

Submissions route to the research team inbox. Contributors get their name/initials (opt-in) on the updated page's "Last Verified by" field.

### 8.4 Budget

- **VA:** $200/month for 15-20 hrs of monitoring (approx. $12–$15/hr)
- **Tools:** $50/month for BillTrack50 (legislation tracking) + Ahrefs seat share
- **Attorney retainer:** $300/month for 2-hour monthly call to review high-stakes changes
- **Total maintenance:** $550/month

Return threshold: $550 recovered via 1 Barefoot Realty consult → 1 acquisition in 6 months.

### 8.5 Change Notification Logic

When a city's regulation changes:
1. Update the record
2. Log the change to `recentChanges` array
3. Trigger automated email to all subscribers for that city (single-city subscribers + state-wide subscribers)
4. Email format:
   - Subject: `[City] just changed its STR rules — here's what it means`
   - Body: TL;DR + impact rating + what to do next + CTA to Barefoot if the change creates opportunity

---

## SECTION 9: MONETIZATION

### 9.1 Revenue Vectors

**Vector 1 — Email Capture → 7-Day Course Drip → $1,997 SpokeBnB Course**
- Every visitor sees city-specific email capture
- Capture email → begins 7-day drip: "The 7 things most STR investors get wrong"
- Day 7 CTA: enroll in full SpokeBnB course
- Expected conversion: 1.5–3% of email captures → course purchase
- Per email captured: ~$30–$60 EV

**Vector 2 — Barefoot Realty Pipeline**
- City-page CTAs route to Barefoot Realty consult booking
- Audience is self-qualified: researching regulations = weeks from purchasing property
- 1 closed transaction = $15K–$50K commission to Barefoot
- Target: 2 closed transactions/month attributable to this tool within 12 months

**Vector 3 — Affiliate Placements**
- **STR Insurance:** Proper, Steadily, Obie (standard ~$50–$150 per quote/policy)
- **STR Attorneys:** Flat placement fee per referral (~$100–$250)
- **STR CPAs / Tax Pros:** Flat placement fee (~$100)
- **Tax collection tools:** Avalara MyLodgeTax affiliate
- **Lock/safety tools:** smart lock, CO/smoke affiliate
- Strategic placement: after tax section and warnings section, contextually relevant
- Expected revenue: $500–$2,000/month at scale

**Vector 4 — Future Paid Tier: "Compliance Pro" — $29/month**
- Automatic email alerts within 24 hours of any ordinance change
- Quarterly compliance checklist per property
- Access to attorney office hours (group call, 1/month)
- Private regulation community
- Target: 500 subscribers in year 2 = $14,500/month recurring

**Vector 5 — White-Label Licensing (future)**
- License the database to STR property managers, Realtors, insurance brokers, CPA firms
- Tier pricing: $99/month individual → $499/month firm → $2,500/month enterprise
- Target: 20 firm subscribers year 2 = $10,000/month

### 9.2 Expected Annual Revenue at Scale (Year 2)

| Vector | Monthly | Annual |
|---|---|---|
| Email → Course | $8,000 | $96,000 |
| Barefoot Realty (2 deals × $25K avg / 12) | ~$4,000 | ~$50,000 |
| Affiliates | $1,500 | $18,000 |
| Compliance Pro (500 × $29) | $14,500 | $174,000 |
| White-label (20 × $499) | $10,000 | $120,000 |
| **Total** | **~$38,000** | **~$458,000** |

### 9.3 First 90-Day Revenue Target

Year 1 month 1-3 priorities:
- Ship the tool with 35 cities
- Rank top 10 on organic for 5 target city terms
- Capture 500 emails
- Attribute 1 Barefoot Realty deal ($15K–$25K)

Break-even on VA/tooling within 90 days.

---

## SECTION 10: TECHNICAL IMPLEMENTATION

### 10.1 Recommended Stack

**Winner: Next.js static generation + JSON data layer + Vercel**

Why not Airtable + frontend:
- Airtable rate limits cause performance issues under SEO traffic
- Next.js SSG with JSON is faster (TTFB <100ms), better for SEO, near-zero hosting cost
- Git-based data is superior for audit trails (every change tracked)

Why not full CMS (Sanity, Contentful):
- Overkill for structured small-dataset content
- JSON checked into repo gives the research VA full history via GitHub PRs

Architecture:

```
spokebnb.com/                              (Next.js site — already exists)
├── src/app/regulations/
│   ├── page.tsx                           ← regulations hub
│   ├── [state]/page.tsx                   ← state landing
│   ├── [state]/[city]/page.tsx            ← city detail (main SEO pages)
│   ├── compare/[comparison]/page.tsx      ← comparison pages
│   ├── glossary/page.tsx
│   └── components/
│       ├── StatusBadge.tsx
│       ├── QuickAnswerCard.tsx
│       ├── WarningList.tsx
│       ├── TaxBreakdown.tsx
│       ├── RecentChangesFeed.tsx
│       ├── EmailCaptureCard.tsx
│       ├── BarefootCTACard.tsx
│       └── RegulationSearch.tsx
├── src/data/regulations/
│   ├── fl/
│   │   ├── anna-maria-island.json
│   │   ├── key-west.json
│   │   └── ... (25 FL entries)
│   ├── tn/
│   ├── ca/
│   └── ... other states
└── src/lib/regulations/
    ├── loadRegulations.ts
    ├── buildSearchIndex.ts
    └── schema.ts                          ← TypeScript + Zod schema
```

### 10.2 Build Flow

1. **Build time:** `loadRegulations()` reads all JSON files
2. Validates each against Zod schema (fail build if invalid)
3. Generates search index (`Fuse.js` or `FlexSearch`) and writes to `public/regulation-search.json`
4. Generates static pages for every city via `generateStaticParams`
5. Ships with full JSON-LD schema injected per page

### 10.3 Search Interface

- Client-side fuzzy search with `Fuse.js` (fast, no backend needed)
- Search indexes on: city name, county, state, common aliases (e.g., "AMI" → Anna Maria Island)
- Autocomplete dropdown showing city + state + status badge
- Fallback for no match → "Request this market" email capture

### 10.4 Email Capture Integration

- Provider: ConvertKit (existing SpokeBnB provider) or Beehiiv
- Each city has unique tag (e.g., `reg-sub-fl-anna-maria-island`)
- Automated sequences:
  - Immediate: welcome + free "STR Legality Checklist" PDF
  - Day 1-7: 7-day STR course drip
  - Monthly: only on city-specific change events
  - Quarterly: newsletter fallback

### 10.5 Mobile-First Considerations

- Status badge must be **visible above the fold on a 375px-wide viewport**
- Quick-answer card must stack vertically; taxes row most critical
- Sticky bottom CTA bar on mobile: "Alert me" button always accessible
- Tap targets for state grid: minimum 44×44px
- All tables become card stacks on viewports <768px

### 10.6 Performance Targets

- LCP: <1.5s on 4G mobile
- TBT: <100ms
- CLS: <0.05
- Bundle size per page: <60KB JS gzipped
- Pages: fully static, cached on Vercel edge CDN
- Images: optimized, lazy-loaded, AVIF/WebP

### 10.7 JSON Schema (Zod / TypeScript)

```typescript
// src/lib/regulations/schema.ts
import { z } from "zod";

export const STRStatus = z.enum(["LEGAL", "RESTRICTED", "BANNED", "GRAY_AREA"]);
export const Confidence = z.enum(["VERIFIED", "APPROXIMATE", "OUTDATED"]);
export const Impact = z.enum(["POSITIVE", "NEUTRAL", "NEGATIVE"]);
export const Likelihood = z.enum(["LOW", "MODERATE", "HIGH"]);
export const LicenseRenewal = z.enum(["ANNUAL", "BIENNIAL", "ONE_TIME", "N/A"]);

export const WarningCode = z.enum([
  "BANNED_STRS_PROHIBITED",
  "BANNED_WITHOUT_LEGACY_LICENSE",
  "OWNER_OCCUPIED_ONLY",
  "30_DAY_MINIMUM",
  "28_DAY_MINIMUM",
  "MINIMUM_STAY_7D",
  "MINIMUM_STAY_7D_RESIDENTIAL",
  "RESTRICTED_ZONING",
  "CITY_VS_COUNTY_DIFFERENCE",
  "MUNICIPALITY_VARIES",
  "PENDING_LEGISLATION_REVIEW",
  "STATE_PREEMPTION_WATCH",
  "GRAY_AREA_ENFORCEMENT",
  "HIGH_ENFORCEMENT_RISK",
  "EXTREME_FINES",
  "HIGH_TAX_BURDEN",
  "PERMIT_CAP",
  "PERMIT_CAP_REACHED",
  "STRICT_OCCUPANCY_CAPS",
  "HOA_HEAVY",
  "LEASEHOLD_NOT_FEE_SIMPLE",
  "FLOOD_INSURANCE_CRITICAL",
  "POST_HURRICANE_REBUILD_CODES",
  "LIFE_SAFETY_INSPECTION_REQUIRED",
  "EVENT_ENFORCEMENT",
  "OUTDATED_DATA",
  "RENTAL_FREQUENCY_CAP",
  "MAINLAND_VS_BEACH_ZONING",
  "HIGH_REGISTRATION_COST",
  "STRICT_OPERATIONS_RULES",
  "HIGH_SPRING_BREAK_ENFORCEMENT",
  "MINIMUM_STAY_7D_SOME_ZONES",
  "COUNTY_CORRECTION",
  "SIESTA_KEY_PENDING_REVIEW",
  "SANIBEL_28_DAY_MINIMUM",
  "CAPTIVA_MORE_PERMISSIVE",
  "OWNER_OCCUPANCY_FOR_TYPE_1_ZONES",
  "TYPE_2_CAP",
  "WHOLE_HOME_BANNED_MOST_ZONES",
  "HOMESTAY_ONLY",
  "STR_CAP_ONE_PER_100_PARCELS",
  "WAITLIST_FOR_NEW_PERMITS",
  "HIGH_DENIAL_RATE",
  "WAITLIST",
  "ZONE_CRITICAL",
  "PLANTATION_HOA_OVERLAY",
  "SEPTIC_INSPECTION_REQUIRED",
  "TOWN_LEVEL_VARIATION",
  "WINE_COUNTRY_RESIDENTIAL_PUSHBACK",
  "THREE_CITIES_ONE_ISLAND",
  "ZONING_CRITICAL"
]);

export const LicenseCost = z.object({
  initial: z.number().nullable(),
  renewal: z.number().nullable(),
  currency: z.literal("USD").default("USD"),
  notes: z.string().optional()
});

export const TaxObject = z.object({
  stateSalesTax: z.number(),
  countySurtax: z.number().default(0),
  touristDevelopmentTax: z.number().default(0),
  localSTRtax: z.number().default(0),
  cityTax: z.number().default(0),
  combinedTotal: z.number(),
  notes: z.string().optional()
});

export const RecentChange = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  headline: z.string(),
  summary: z.string(),
  impact: Impact,
  sourceUrl: z.string().url()
});

export const PendingLegislation = z.object({
  billNumber: z.string().optional(),
  summary: z.string(),
  expectedDecision: z.string().optional(),
  likelihood: Likelihood,
  sourceUrl: z.string().url().optional()
});

export const Source = z.object({
  label: z.string(),
  url: z.string().url(),
  type: z.enum(["MUNICIPAL", "COUNTY", "STATE", "FEDERAL", "LEGAL_NEWS", "OTHER"])
});

export const RegulationEntry = z.object({
  slug: z.string().regex(/^[a-z]{2}\/[a-z0-9-]+$/),
  locationName: z.string(),
  state: z.string().length(2),
  county: z.string(),
  city: z.string().optional(),
  aliases: z.array(z.string()).default([]),
  strStatus: STRStatus,
  lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  lastVerified: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  confidence: Confidence,

  licenseRequired: z.boolean(),
  licenseName: z.string().optional(),
  licenseCost: LicenseCost.optional(),
  licenseRenewal: LicenseRenewal.optional(),

  inspectionsRequired: z.boolean(),
  inspectionNotes: z.string().optional(),

  occupancyLimit: z.string(),
  minimumNightStay: z.number().int().nonnegative(),
  minimumStayNotes: z.string().optional(),

  ownerOccupancyRequired: z.boolean(),
  hostedOnly: z.boolean(),
  hostedVsUnhostedNotes: z.string().optional(),

  taxes: TaxObject,

  zoningRestrictions: z.string(),
  hoaConsiderations: z.string().optional(),

  recentChanges: z.array(RecentChange).default([]),
  pendingLegislation: z.array(PendingLegislation).default([]),
  warnings: z.array(WarningCode).default([]),

  sources: z.array(Source).min(1),
  relatedMarkets: z.array(z.string()).default([]),

  seo: z.object({
    titleOverride: z.string().optional(),
    metaDescriptionOverride: z.string().optional()
  }).optional()
});

export type RegulationEntry = z.infer<typeof RegulationEntry>;
```

### 10.8 Example Record — Anna Maria Island

```json
{
  "slug": "fl/anna-maria-island",
  "locationName": "Anna Maria Island",
  "state": "FL",
  "county": "Manatee",
  "aliases": ["AMI", "Holmes Beach", "Bradenton Beach", "Anna Maria"],
  "strStatus": "RESTRICTED",
  "lastUpdated": "2026-04-15",
  "lastVerified": "2026-04-15",
  "confidence": "VERIFIED",

  "licenseRequired": true,
  "licenseName": "Vacation Rental Certificate (city) + Manatee BTR + State DBPR Vacation Rental License",
  "licenseCost": {
    "initial": 500,
    "renewal": 500,
    "currency": "USD",
    "notes": "Varies by city ($300–$700). State DBPR adds $150–$300."
  },
  "licenseRenewal": "ANNUAL",

  "inspectionsRequired": true,
  "inspectionNotes": "Annual life-safety inspection in Holmes Beach and Bradenton Beach.",

  "occupancyLimit": "2 per bedroom + 2, max 8-12 depending on city",
  "minimumNightStay": 0,
  "minimumStayNotes": "No minimum currently. Multiple proposals for 7-night minimum under review.",

  "ownerOccupancyRequired": false,
  "hostedOnly": false,
  "hostedVsUnhostedNotes": "Both permitted with certificate.",

  "taxes": {
    "stateSalesTax": 6.0,
    "countySurtax": 1.0,
    "touristDevelopmentTax": 5.0,
    "localSTRtax": 0.0,
    "cityTax": 0.0,
    "combinedTotal": 12.0,
    "notes": "Tourist Development Tax collected by Manatee County Tax Collector."
  },

  "zoningRestrictions": "Island is three cities (Anna Maria, Holmes Beach, Bradenton Beach) each with separate residential overlay. STR permitted in most residential zones with certificate, subject to strict occupancy/parking/noise operational rules.",
  "hoaConsiderations": "Many condos and some neighborhoods have rental restrictions tighter than city ordinances — ALWAYS read HOA docs before purchase.",

  "recentChanges": [
    {
      "date": "2025-06-10",
      "headline": "Holmes Beach increased inspection fee",
      "summary": "Annual vacation rental inspection fee rose from $350 to $500.",
      "impact": "NEGATIVE",
      "sourceUrl": "https://holmesbeachfl.org/"
    }
  ],

  "pendingLegislation": [
    {
      "billNumber": "Holmes Beach Ord. Proposal 2026-03",
      "summary": "7-night minimum stay under active city council review.",
      "expectedDecision": "2026-09-01",
      "likelihood": "MODERATE",
      "sourceUrl": "https://holmesbeachfl.org/"
    }
  ],

  "warnings": [
    "STRICT_OCCUPANCY_CAPS",
    "THREE_CITIES_ONE_ISLAND",
    "PENDING_LEGISLATION_REVIEW",
    "LIFE_SAFETY_INSPECTION_REQUIRED"
  ],

  "sources": [
    { "label": "City of Anna Maria", "url": "https://cityofannamaria.com/", "type": "MUNICIPAL" },
    { "label": "Holmes Beach, FL", "url": "https://holmesbeachfl.org/", "type": "MUNICIPAL" },
    { "label": "Bradenton Beach, FL", "url": "https://cityofbradentonbeach.com/", "type": "MUNICIPAL" },
    { "label": "Manatee County Tax Collector", "url": "https://mymanatee.org/", "type": "COUNTY" },
    { "label": "Florida DBPR Vacation Rentals", "url": "https://myfloridalicense.com/DBPR/", "type": "STATE" }
  ],

  "relatedMarkets": [
    "fl/bradenton",
    "fl/sarasota",
    "fl/fort-myers-beach",
    "fl/marco-island",
    "fl/clearwater"
  ]
}
```

### 10.9 Deployment Plan

**Week 1-2:** Build page components + schema + 5 cities
**Week 3-4:** Fill remaining 20 Florida + 10 non-FL entries
**Week 5:** Email capture integration, exit-intent modal, schema markup, sitemap
**Week 6:** QA, mobile polish, performance audit
**Week 7:** Launch + submit to Google Search Console
**Week 8+:** Content marketing (blog posts, social, backlinks), monthly VA cadence begins

### 10.10 Legal Disclaimer (site-wide footer on every regulation page)

> Information on SpokeBnB regulation pages is compiled from publicly available municipal, county, state, and federal sources. We make best efforts to keep it current but regulations change frequently. **This is not legal or financial advice.** Before purchasing property or operating a short-term rental, verify current rules with the issuing municipality and consult a licensed attorney and CPA. SpokeBnB disclaims liability for any reliance on this content.

---

## APPENDIX A: LAUNCH CHECKLIST

- [ ] All 25 Florida entries JSON-validated
- [ ] All 10 non-FL entries JSON-validated
- [ ] Every entry has ≥1 verified municipal source URL
- [ ] Every entry has `lastVerified` within 30 days of launch
- [ ] Page components built and QA'd on 3 breakpoints (375 / 768 / 1280)
- [ ] Sitemap submitted to Google Search Console
- [ ] JSON-LD schema validated via Rich Results Test
- [ ] Email capture provider integrated (ConvertKit tags per city)
- [ ] Barefoot Realty CTA tracking (UTM params)
- [ ] Internal linking: every city has ≥3 inbound and ≥3 outbound links
- [ ] Exit-intent modal tested on desktop + mobile
- [ ] Legal disclaimer on every page
- [ ] Analytics events: search, page view, email capture, CTA click
- [ ] VA trained on monthly update workflow
- [ ] Changelog spreadsheet live
- [ ] First 5 backlink targets outreached (REI forums, FL Realtor blogs, BiggerPockets mentions)

---

## APPENDIX B: EDITORIAL CALENDAR (FIRST 90 DAYS)

**Week 1:** Launch announcement blog post on SpokeBnB.
**Week 2:** "Florida STR Regulation Map: 25 Markets Ranked by STR-Friendliness"
**Week 3:** "Key West STR: Why $100K Licenses Aren't Going Away"
**Week 4:** "HB 1537: The Florida Bill That Could Change Every Local STR Ordinance"
**Week 5:** "Anna Maria Island vs. Siesta Key: Which Is More STR-Friendly in 2026?"
**Week 6:** "Nashville STR Permits: How to Read the Map Before You Buy"
**Week 7:** "The Tax Math: What Your 30A Airbnb Actually Owes"
**Week 8:** "Hurricane Zones + STR: What Post-Ian Rebuild Codes Mean for Investors"
**Week 9:** "The 10 Worst STR Markets to Buy In 2026"
**Week 10:** "The 10 Best STR Markets to Buy In 2026"
**Week 11:** "Gatlinburg vs. Pigeon Forge vs. Sevierville: STR Investor Comparison"
**Week 12:** "What to Do If Your Target City Just Banned Airbnb"

Each post cross-links 5+ regulation pages and ends with Barefoot CTA.

---

## APPENDIX C: COMPETITIVE ANALYSIS

| Feature | AirDNA | BNBCalc | Rabbu | Mashvisor | **SpokeBnB Regulation Tool** |
|---|---|---|---|---|---|
| STR revenue projections | Yes | Yes | Yes | Yes | No (not the point) |
| Regulation status | No | No | No | No | **Yes (Legal/Restricted/Banned)** |
| License cost | No | No | No | No | **Yes** |
| Tax breakdown | Partial | No | No | No | **Yes (combined %)** |
| Minimum stay rules | No | No | No | No | **Yes** |
| Recent regulation changes | No | No | No | No | **Yes (last 12 months)** |
| Pending legislation | No | No | No | No | **Yes** |
| Email alerts on changes | No | No | No | No | **Yes** |
| Official source citations | No | No | No | No | **Yes** |
| Free to use | Partial | Partial | Partial | Partial | **Yes (entirely)** |

**Moat:** No incumbent is willing to do the manual municipal research required. By being first AND being accurate, SpokeBnB becomes the answer when any Realtor, insurance agent, or CPA is asked "is STR legal here?"

---

## SPEC END

Build order: Data layer first (JSON schema + 5 sample cities) → page components → full database → email capture → launch → content marketing flywheel.

The data is the product. The website is just the delivery mechanism. Accuracy is everything.
