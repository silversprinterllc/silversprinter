# Revenue Per Night Calculator -- Complete Build Specification

> **Purpose:** Lead magnet (free version) + course tool (full version) for STR owners to diagnose revenue gaps and track Hub-and-Spoke implementation progress.
>
> **Format:** Google Sheets workbook. Every formula below is written in Google Sheets syntax and can be entered directly. Cell references use the format `'Tab Name'!CellRef`.
>
> **Brand:** Navy #1B2A4A headers, Gold #D4A017 accents, Cream #FAF7F2 input cells, White #FFFFFF formula/output cells, Red #CC3333 warnings, Green #2E7D32 positive indicators, Yellow #F9A825 caution.
>
> **Conventions:**
> - `[INPUT]` = user-editable cell (cream background, thin gold border)
> - `[CALC]` = auto-calculated formula cell (light gray background, locked)
> - `[DISPLAY]` = formatted output (locked, styled)
> - All currency formatted as `$#,##0` or `$#,##0.00`
> - All percentages formatted as `0.0%`
> - Input cells use data validation where noted

---

## TAB 1: PROPERTY SNAPSHOT

**Sheet name:** `Property Snapshot`

### Section A: Property Identity (Rows 1-12)

| Row | Col A (Label) | Col B (Value) | Col C (Notes/Helper) | Type |
|-----|---------------|---------------|----------------------|------|
| 1 | **PROPERTY SNAPSHOT** | *(merge A1:F1, Navy bg, white 18pt bold)* | | Header |
| 2 | *Fill in the cream-colored cells. Everything else calculates automatically.* | | | Instruction |
| 3 | | | | Spacer |
| 4 | Property Name | [INPUT] | *e.g., "Lakeside Landing FLX"* | Text |
| 5 | Location (City, State) | [INPUT] | *e.g., "Seneca Lake, NY"* | Text |
| 6 | Property Type | [INPUT] | Dropdown | Dropdown |
| 7 | Number of Bedrooms | [INPUT] | *Whole number* | Number |
| 8 | Bathrooms | [INPUT] | | Number |
| 9 | Max Guests | [INPUT] | *Licensed occupancy* | Number |
| 10 | Square Footage | [INPUT] | *Optional* | Number |
| 11 | Year Acquired | [INPUT] | | Number |
| 12 | Unique Selling Point | [INPUT] | *e.g., "180-degree lake views, private dock"* | Text |

**Data validation for B6 (Property Type):**
```
Dropdown list: Lakefront, Beachfront, Mountain/Ski, Urban, Suburban, Rural/Farm, Desert, Island, Riverfront, Vineyard/Wine Country, Historic/Downtown, Other
```

### Section B: Financial Basis (Rows 14-22)

| Row | Col A (Label) | Col B (Value) | Col C (Notes) | Type |
|-----|---------------|---------------|---------------|------|
| 14 | **FINANCIAL BASIS** | | | Section header (navy bg) |
| 15 | Purchase Price / Basis | [INPUT] | *Original purchase price* | Currency |
| 16 | Down Payment | [INPUT] | | Currency |
| 17 | Total Cash Invested | [INPUT] | *Down payment + closing + initial renovations* | Currency |
| 18 | Current Mortgage Balance | [INPUT] | | Currency |
| 19 | Monthly Mortgage Payment (P&I) | [INPUT] | *Principal + Interest only* | Currency |
| 20 | Annual Property Tax | [INPUT] | | Currency |
| 21 | Annual Insurance Premium | [INPUT] | | Currency |
| 22 | **Annual Debt Service** | `=B19*12+B20+B21` | [CALC] | Currency |

### Section C: Platform Distribution (Rows 24-35)

| Row | Col A (Label) | Col B (Active? Y/N) | Col C (Commission %) | Col D (Est. % of Bookings) | Type |
|-----|---------------|---------------------|----------------------|---------------------------|------|
| 24 | **CURRENT PLATFORM DISTRIBUTION** | | | | Section header |
| 25 | *Check each platform you currently list on* | | *Their fee* | *Your estimate* | |
| 26 | Airbnb | [INPUT] | [INPUT, default 15%] | [INPUT] | Checkbox + % |
| 27 | VRBO / HomeAway | [INPUT] | [INPUT, default 8%] | [INPUT] | Checkbox + % |
| 28 | Booking.com | [INPUT] | [INPUT, default 15%] | [INPUT] | Checkbox + % |
| 29 | Google Vacation Rentals | [INPUT] | [INPUT, default 0%] | [INPUT] | Checkbox + % |
| 30 | Direct Booking Website | [INPUT] | [INPUT, default 3%] | [INPUT] | Checkbox + % |
| 31 | TripAdvisor / FlipKey | [INPUT] | [INPUT, default 3%] | [INPUT] | Checkbox + % |
| 32 | Houfy | [INPUT] | [INPUT, default 0%] | [INPUT] | Checkbox + % |
| 33 | Furnished Finder | [INPUT] | [INPUT, default 0%] | [INPUT] | Checkbox + % |
| 34 | Other | [INPUT] | [INPUT] | [INPUT] | Checkbox + % |
| 35 | **Platforms Active** | `=COUNTIF(B26:B34,"Y")` | **Blended Commission** | `=SUMPRODUCT(C26:C34,D26:D34)/SUM(D26:D34)` | [CALC] |

**Data validation for B26:B34:** Dropdown: `Y, N`

**Data validation for D26:D34:** Number between 0 and 100, with helper text: "What percentage of your bookings come from this platform? All should total 100%"

| Row | Col A | Col B | Type |
|-----|-------|-------|------|
| 36 | Booking % Check | `=SUM(D26:D34)` | [CALC] -- should equal 100% |
| 37 | | `=IF(B36<>100,"Warning: Platform percentages should total 100%","")` | Conditional |

**Conditional formatting for B36:**
- If value <> 100: Red background, bold
- If value = 100: Green background

---

## TAB 2: CURRENT PERFORMANCE

**Sheet name:** `Current Performance`

### Section A: Season Definitions (Rows 1-10)

| Row | Col A | Col B (Peak) | Col C (Shoulder) | Col D (Off-Season) | Col E (Notes) | Type |
|-----|-------|-------------|-------------------|---------------------|----------------|------|
| 1 | **CURRENT PERFORMANCE** | *(merge A1:F1)* | | | | Header |
| 2 | *Enter your actual numbers from the last 12 months* | | | | | Instruction |
| 3 | | | | | | Spacer |
| 4 | **SEASON DEFINITIONS** | **Peak** | **Shoulder** | **Off-Season** | | Section header |
| 5 | Start Date | [INPUT] | [INPUT] | [INPUT] | *e.g., Jun 1* | Date |
| 6 | End Date | [INPUT] | [INPUT] | [INPUT] | *e.g., Sep 15* | Date |
| 7 | Number of Days in Season | [INPUT] | [INPUT] | [INPUT] | *Must total 365* | Number |
| 8 | Season Days Check | `=B7+C7+D7` | | | `=IF(E8<>365,"Must equal 365","OK")` | [CALC] |
| 9 | Minimum Night Requirement | [INPUT] | [INPUT] | [INPUT] | *Current min stay* | Number |
| 10 | Suggested Minimum | `=IF(B7>90,3,IF(B7>60,2,1))` | `=IF(C7>90,2,1)` | `=IF(D7>120,1,1)` | *Based on season length* | [CALC] |

**Conditional formatting for E8:**
- "Must equal 365": Red bg
- "OK": Green bg

### Section B: Revenue by Season (Rows 12-24)

| Row | Col A | Col B (Peak) | Col C (Shoulder) | Col D (Off-Season) | Col E (Annual Total) | Type |
|-----|-------|-------------|-------------------|---------------------|----------------------|------|
| 12 | **REVENUE BY SEASON** | **Peak** | **Shoulder** | **Off-Season** | **Annual** | Section header |
| 13 | Average Daily Rate (ADR) | [INPUT] | [INPUT] | [INPUT] | `=SUMPRODUCT(B13:D13,B17:D17)/SUM(B17:D17)` | Currency |
| 14 | Target / Asking Rate | [INPUT] | [INPUT] | [INPUT] | | Currency |
| 15 | Rate Capture % | `=B13/B14` | `=C13/C14` | `=D13/D14` | `=E13/SUMPRODUCT(B14:D14,B17:D17)*SUM(B17:D17)` | [CALC] % |
| 16 | | | | | | Spacer |
| 17 | Nights Booked | [INPUT] | [INPUT] | [INPUT] | `=SUM(B17:D17)` | Number |
| 18 | Available Nights | `=B7` | `=C7` | `=D7` | `=SUM(B18:D18)` | [CALC] |
| 19 | **Occupancy Rate** | `=B17/B18` | `=C17/C18` | `=D17/D18` | `=E17/E18` | [CALC] % |
| 20 | | | | | | Spacer |
| 21 | **Gross Revenue** | `=B13*B17` | `=C13*C17` | `=D13*D17` | `=SUM(B21:D21)` | [CALC] Currency |
| 22 | **RevPAR** | `=B21/B18` | `=C21/C18` | `=D21/D18` | `=E21/E18` | [CALC] Currency |
| 23 | **Revenue Per Night** | | | | `=E21/365` | [CALC] Currency, GOLD highlight, 24pt |
| 24 | Revenue Per Night Rank | | | | `=IF(E23>=500,"Elite (Top 5%)",IF(E23>=300,"Strong (Top 15%)",IF(E23>=180,"Average",IF(E23>=100,"Below Average","Underperforming"))))` | [CALC] |

**Conditional formatting for E24:**
- "Elite": Green bg, gold text
- "Strong": Green bg
- "Average": Yellow bg
- "Below Average": Orange bg
- "Underperforming": Red bg, white text

### Section C: Commission Analysis (Rows 26-34)

| Row | Col A | Col B (Value) | Col C (Notes) | Type |
|-----|-------|---------------|---------------|------|
| 26 | **COMMISSION ANALYSIS** | | | Section header |
| 27 | Gross Annual Revenue | `=E21` | | [CALC] |
| 28 | Blended Commission Rate | `='Property Snapshot'!D35` | *From platform distribution* | [CALC] |
| 29 | **Total Commissions Paid** | `=B27*B28` | | [CALC] Currency, RED |
| 30 | Net Revenue After Commissions | `=B27-B29` | | [CALC] Currency |
| 31 | | | | |
| 32 | If 30% were direct (3% processing only): | | | Label |
| 33 | Commission Savings | `=B27*0.30*(B28-0.03)` | *Shifting 30% to direct* | [CALC] Green |
| 34 | **Net Revenue with Direct Mix** | `=B30+B33` | | [CALC] Currency, GREEN |

### Section D: Occupancy Diagnostics (Rows 36-44)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 36 | **OCCUPANCY DIAGNOSTICS** | | | Section header |
| 37 | Total Vacant Nights | `=E18-E17` | | [CALC] |
| 38 | Revenue Lost to Vacancy | `=B37*E13` | *At your weighted ADR* | [CALC] Currency, RED |
| 39 | Revenue Lost at 50% ADR (gap fill) | `=B37*E13*0.50` | *If you filled gaps at half price* | [CALC] |
| 40 | | | | |
| 41 | Peak Vacancy Nights | `=B18-B17` | | [CALC] |
| 42 | Peak Revenue Lost | `=B41*B13` | *Most expensive gaps* | [CALC] RED |
| 43 | Shoulder Vacancy Nights | `=C18-C17` | | [CALC] |
| 44 | Off-Season Vacancy Nights | `=D18-D17` | | [CALC] |

---

## TAB 3: REVENUE GAP ANALYSIS

**Sheet name:** `Revenue Gap Analysis`

### Section A: Platform Expansion Opportunity (Rows 1-22)

| Row | Col A | Col B | Col C | Col D | Col E | Type |
|-----|-------|-------|-------|-------|-------|------|
| 1 | **REVENUE GAP ANALYSIS** | *(merge A1:F1)* | | | | Header |
| 2 | *This calculates how much revenue you are leaving on the table* | | | | | Instruction |
| 3 | | | | | | |
| 4 | **PLATFORM EXPANSION** | **Currently On?** | **Est. Booking Lift** | **Est. Additional Revenue** | **Source** | Section header |
| 5 | VRBO / HomeAway | `=IF('Property Snapshot'!B27="Y","Already Active","NOT LISTED")` | `=IF(B5="NOT LISTED",0.25,0)` | `=C5*'Current Performance'!E21` | *Whole-home: 20-30% lift* | [CALC] |
| 6 | Booking.com | `=IF('Property Snapshot'!B28="Y","Already Active","NOT LISTED")` | `=IF(B6="NOT LISTED",0.12,0)` | `=C6*'Current Performance'!E21` | *International + last-minute: 10-15% lift* | [CALC] |
| 7 | Google Vacation Rentals | `=IF('Property Snapshot'!B29="Y","Already Active","NOT LISTED")` | `=IF(B7="NOT LISTED",0.07,0)` | `=C7*'Current Performance'!E21` | *Free listings, SEO traffic: 5-10% lift* | [CALC] |
| 8 | Direct Booking Website | `=IF('Property Snapshot'!B30="Y","Already Active","NOT LISTED")` | `=IF(B8="NOT LISTED",0.10,0)` | `=C8*'Current Performance'!E21` | *Repeat guests + SEO: saves 15% commission* | [CALC] |
| 9 | TripAdvisor / FlipKey | `=IF('Property Snapshot'!B31="Y","Already Active","NOT LISTED")` | `=IF(B9="NOT LISTED",0.05,0)` | `=C9*'Current Performance'!E21` | *Review-driven traffic: 3-7% lift* | [CALC] |
| 10 | Houfy | `=IF('Property Snapshot'!B32="Y","Already Active","NOT LISTED")` | `=IF(B10="NOT LISTED",0.03,0)` | `=C10*'Current Performance'!E21` | *Zero-commission platform: 2-5% lift* | [CALC] |
| 11 | Furnished Finder | `=IF('Property Snapshot'!B33="Y","Already Active","NOT LISTED")` | `=IF(B11="NOT LISTED",0.04,0)` | `=C11*'Current Performance'!E21` | *Mid-term stays: 3-5% lift* | [CALC] |
| 12 | | | | | | |
| 13 | **Total Platform Expansion Revenue** | | | `=SUM(D5:D11)` | | [CALC] GREEN, bold |
| 14 | Platforms Not Yet Active | `=COUNTIF(B5:B11,"NOT LISTED")` | | | | [CALC] |

### Section B: Dynamic Pricing Opportunity (Rows 16-24)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 16 | **DYNAMIC PRICING OPPORTUNITY** | | | Section header |
| 17 | Are you using a dynamic pricing tool? | [INPUT] | Dropdown: Yes, No | |
| 18 | Current Pricing Strategy | [INPUT] | Dropdown: Fixed rates year-round, Seasonal rates only, Manual adjustments, Dynamic pricing tool | |
| 19 | | | | |
| 20 | ADR Lift from Dynamic Pricing | `=IF(B17="No",IF(B18="Fixed rates year-round",0.30,IF(B18="Seasonal rates only",0.20,IF(B18="Manual adjustments",0.15,0))),0)` | *Research: 15-40% ADR lift* | [CALC] |
| 21 | Estimated ADR After Dynamic Pricing | `='Current Performance'!E13*(1+B20)` | | [CALC] Currency |
| 22 | **Additional Revenue from Pricing** | `='Current Performance'!E17*('Current Performance'!E13*B20)` | *At current occupancy* | [CALC] GREEN |
| 23 | Revenue from Event-Based Pricing | `=IF(B17="No",'Current Performance'!E21*0.05,0)` | *Concerts, festivals, holidays: ~5% lift* | [CALC] |
| 24 | **Total Pricing Opportunity** | `=B22+B23` | | [CALC] GREEN, bold |

### Section C: Commission Savings (Rows 26-34)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 26 | **COMMISSION SAVINGS OPPORTUNITY** | | | Section header |
| 27 | Current Direct Booking % | `='Property Snapshot'!D30` | | [CALC] |
| 28 | Target Direct Booking % (12 months) | [INPUT, suggest 30%] | *Industry achievable: 25-40%* | % |
| 29 | Revenue to Shift to Direct | `='Current Performance'!E21*(B28-B27)/100` | | [CALC] |
| 30 | Current Blended Commission Rate | `='Current Performance'!B28` | | [CALC] |
| 31 | Direct Booking Processing Cost | 0.03 | *Stripe/PayPal: ~3%* | Fixed |
| 32 | Commission Saved Per Dollar Shifted | `=B30-B31` | | [CALC] |
| 33 | **Annual Commission Savings** | `=B29*B32` | | [CALC] GREEN, bold |
| 34 | Monthly Commission Savings | `=B33/12` | | [CALC] |

### Section D: Total Revenue Gap (Rows 36-50)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 36 | **YOUR TOTAL REVENUE GAP** | *(merge A36:C36, Navy bg, gold text, 16pt)* | | Section header |
| 37 | | | | |
| 38 | Current Annual Gross Revenue | `='Current Performance'!E21` | | [CALC] |
| 39 | | | | |
| 40 | + Platform Expansion Revenue | `=D13` | | [CALC] |
| 41 | + Dynamic Pricing Revenue | `=B24` | | [CALC] |
| 42 | + Commission Savings | `=B33` | | [CALC] |
| 43 | | | | |
| 44 | **TOTAL REVENUE GAP** | `=SUM(B40:B42)` | *This is what you are leaving on the table every year* | [CALC] RED bg, white text, 24pt, bold |
| 45 | Monthly Revenue Gap | `=B44/12` | | [CALC] |
| 46 | Daily Revenue Gap | `=B44/365` | | [CALC] |
| 47 | | | | |
| 48 | **Potential Annual Revenue** | `=B38+B44` | | [CALC] GREEN, 20pt |
| 49 | **Potential Revenue Per Night** | `=B48/365` | | [CALC] GREEN, 20pt |
| 50 | **You are currently capturing** | `=B38/B48` | *of your property's full potential* | [CALC] % -- see formatting below |

**Conditional formatting for B50:**
- >= 80%: Green bg, text "Strong -- fine-tune for maximum"
- 60-79%: Yellow bg, text "Moderate gaps -- significant upside available"
- 40-59%: Orange bg, text "Major gaps -- you are leaving serious money on the table"
- < 40%: Red bg, white text, "Critical -- your property is dramatically underperforming"

**Visual bar for B50:** Use a SPARKLINE or REPT formula in C50:
```
=REPT("█",ROUND(B50*20,0))&REPT("░",20-ROUND(B50*20,0))
```

---

## TAB 4: HUB-AND-SPOKE SCORECARD

**Sheet name:** `Hub-and-Spoke Scorecard`

### Section A: Header and Instructions (Rows 1-4)

| Row | Col A | Col B | Col C | Col D | Col E |
|-----|-------|-------|-------|-------|-------|
| 1 | **HUB-AND-SPOKE SCORECARD** | *(merge A1:E1)* | | | |
| 2 | *Rate each spoke honestly (1 = not started, 5 = fully optimized). The system is only as strong as its weakest spoke.* | | | | |
| 3 | | | | | |
| 4 | **Spoke** | **Score (1-5)** | **What This Means** | **Your Notes** | **Priority** |

**Data validation for all B cells in scoring section:** Number between 1 and 5, whole numbers only.

### Section B: Spoke Scoring (Rows 5-14)

**Spoke 1: Distribution Platforms (Row 5)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 1. Distribution Platforms | [INPUT: 1-5] | `=IF(B5=1,"On 1 platform only",IF(B5=2,"On 2 platforms",IF(B5=3,"On 3-4 platforms",IF(B5=4,"On 5+ platforms, listings optimized",IF(B5=5,"All relevant platforms, A+ listings, SEO-optimized","")))))` | [INPUT: free text] | `=IF(B5<=2,"HIGH",IF(B5<=3,"MEDIUM","MAINTAIN"))` |

**Spoke 2: Direct Booking (Row 6)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 2. Direct Booking | [INPUT: 1-5] | `=IF(B6=1,"No direct booking site",IF(B6=2,"Basic website, no booking engine",IF(B6=3,"Booking site live, <10% direct",IF(B6=4,"20-30% direct, email list active",IF(B6=5,"30%+ direct, email list >500, return guest program","")))))` | [INPUT] | `=IF(B6<=2,"HIGH",IF(B6<=3,"MEDIUM","MAINTAIN"))` |

**Spoke 3: Dynamic Pricing (Row 7)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 3. Dynamic Pricing | [INPUT: 1-5] | `=IF(B7=1,"Fixed rates, no adjustments",IF(B7=2,"Seasonal rates only",IF(B7=3,"Pricing tool installed, basic config",IF(B7=4,"Pricing tool + event-based + LOS discounts",IF(B7=5,"Fully tuned: orphan days, demand surges, gap-night pricing","")))))` | [INPUT] | `=IF(B7<=2,"HIGH",IF(B7<=3,"MEDIUM","MAINTAIN"))` |

**Spoke 4: Automation (Row 8)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 4. Automation | [INPUT: 1-5] | `=IF(B8=1,"Everything manual",IF(B8=2,"Some templates, manual scheduling",IF(B8=3,"Guest messaging automated, manual cleaning",IF(B8=4,"Messaging + cleaning + reviews automated",IF(B8=5,"Full stack: PMS, messaging, cleaning, reviews, smart locks, pricing","")))))` | [INPUT] | `=IF(B8<=2,"HIGH",IF(B8<=3,"MEDIUM","MAINTAIN"))` |

**Spoke 5: Content & Social (Row 9)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 5. Content & Social | [INPUT: 1-5] | `=IF(B9=1,"No social presence",IF(B9=2,"Accounts exist, post occasionally",IF(B9=3,"Posting 2-3x/week on 1-2 platforms",IF(B9=4,"Consistent schedule, reels/TikTok, growing following",IF(B9=5,"Content engine: blog, video, social, email, driving direct bookings","")))))` | [INPUT] | `=IF(B9<=2,"MEDIUM",IF(B9<=3,"MEDIUM","MAINTAIN"))` |

**Spoke 6: Creator Network (Row 10)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 6. Creator Network | [INPUT: 1-5] | `=IF(B10=1,"No creator relationships",IF(B10=2,"Hosted 1 creator, no system",IF(B10=3,"2-5 creator stays, some content produced",IF(B10=4,"Active creator program, regular stays, content pipeline",IF(B10=5,"Creator stays monthly, UGC library, affiliate commissions generating bookings","")))))` | [INPUT] | `=IF(B10<=2,"MEDIUM",IF(B10<=3,"MEDIUM","MAINTAIN"))` |

**Spoke 7: Guest Network (Row 11)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 7. Guest Network | [INPUT: 1-5] | `=IF(B11=1,"No guest database or follow-up",IF(B11=2,"Collect emails, no follow-up system",IF(B11=3,"Email list active, occasional newsletters",IF(B11=4,"Guest database, referral program, loyalty tiers",IF(B11=5,"Full CRM: segmented emails, loyalty tiers, referral bonuses, 20%+ repeat guests","")))))` | [INPUT] | `=IF(B11<=2,"HIGH",IF(B11<=3,"MEDIUM","MAINTAIN"))` |

**Spoke 8: Product Placement / Sponsors (Row 12)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 8. Product Placement | [INPUT: 1-5] | `=IF(B12=1,"No brand or local partnerships",IF(B12=2,"A few local business cards/flyers",IF(B12=3,"1-3 active partnerships, some revenue",IF(B12=4,"5+ partnerships, monthly revenue, welcome basket sponsors",IF(B12=5,"Integrated sponsor ecosystem: welcome box, in-property placement, digital guidebook partners","")))))` | [INPUT] | `=IF(B12<=2,"LOW",IF(B12<=3,"LOW","MAINTAIN"))` |

**Spoke 9: Curated Experiences (Row 13)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 9. Curated Experiences | [INPUT: 1-5] | `=IF(B13=1,"No guidebook or experience offerings",IF(B13=2,"Basic PDF guidebook",IF(B13=3,"Digital guidebook, 1-2 experience partnerships",IF(B13=4,"Active upsell system: experiences, chef, boat, massage",IF(B13=5,"Full experience marketplace: pre-arrival upsells, concierge, 10%+ ancillary revenue","")))))` | [INPUT] | `=IF(B13<=2,"LOW",IF(B13<=3,"MEDIUM","MAINTAIN"))` |

**Spoke 10: Property Acquisition / Barefoot Advantage (Row 14)**

| Col A | Col B | Col C | Col D | Col E |
|-------|-------|-------|-------|-------|
| 10. Property Acquisition (Barefoot Advantage) | [INPUT: 1-5] | `=IF(B14=1,"Single property, no growth plan",IF(B14=2,"Interested in growth, no plan",IF(B14=3,"Active deal analysis, 1 additional property in pipeline",IF(B14=4,"2-4 properties, system replicated across portfolio",IF(B14=5,"5+ properties, acquisition system, STR-first underwriting, arbitrage or co-hosting","")))))` | [INPUT] | `=IF(B14<=2,"LOW",IF(B14<=3,"MEDIUM","MAINTAIN"))` |

### Section C: Aggregate Scores (Rows 16-28)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 16 | | | | Spacer |
| 17 | **SCORECARD RESULTS** | *(merge A17:C17, navy bg)* | | Section header |
| 18 | | | | |
| 19 | **Total Spoke Score** | `=SUM(B5:B14)` | **out of 50** | [CALC] 24pt |
| 20 | **Spoke Score Percentage** | `=B19/50` | | [CALC] % |
| 21 | | | | |
| 22 | **Spoke Grade** | `=IF(B20>=0.9,"A",IF(B20>=0.8,"B",IF(B20>=0.7,"C",IF(B20>=0.6,"D","F"))))` | | [CALC] 36pt, see formatting |
| 23 | Grade Description | `=IF(B22="A","Hub-and-Spoke system fully activated. Focus on optimization.",IF(B22="B","Strong foundation. 2-3 spokes need attention.",IF(B22="C","Moderate system. Several spokes missing or underdeveloped.",IF(B22="D","Early stage. Most spokes need building.",IF(B22="F","Starting from scratch. Massive upside potential.","")))))` | | [CALC] |
| 24 | | | | |
| 25 | Weakest Spoke | `=INDEX(A5:A14,MATCH(MIN(B5:B14),B5:B14,0))` | Score: `=MIN(B5:B14)` | [CALC] RED |
| 26 | Strongest Spoke | `=INDEX(A5:A14,MATCH(MAX(B5:B14),B5:B14,0))` | Score: `=MAX(B5:B14)` | [CALC] GREEN |
| 27 | HIGH Priority Spokes | `=COUNTIF(E5:E14,"HIGH")` | *Fix these first* | [CALC] |
| 28 | MEDIUM Priority Spokes | `=COUNTIF(E5:E14,"MEDIUM")` | *Build these next* | [CALC] |

**Conditional formatting for B22 (Spoke Grade):**
- "A": Green bg, white text
- "B": Light green bg
- "C": Yellow bg
- "D": Orange bg
- "F": Red bg, white text

### Section D: Revenue Per Night Potential by Spoke Activation (Rows 30-42)

| Row | Col A | Col B (Revenue Impact) | Col C (Formula Logic) | Type |
|-----|-------|------------------------|----------------------|------|
| 30 | **REVENUE PER NIGHT POTENTIAL** | | | Section header |
| 31 | *Estimated annual revenue impact of activating each spoke* | | | |
| 32 | | | | |
| 33 | Distribution (if scored < 4) | `=IF(B5<4,'Revenue Gap Analysis'!D13,0)` | *Additional platform revenue* | [CALC] |
| 34 | Direct Booking (if scored < 4) | `=IF(B6<4,'Revenue Gap Analysis'!B33+'Current Performance'!E21*0.10,0)` | *Commission savings + booking lift* | [CALC] |
| 35 | Dynamic Pricing (if scored < 4) | `=IF(B7<4,'Revenue Gap Analysis'!B24,0)` | *ADR optimization* | [CALC] |
| 36 | Automation (if scored < 4) | `=IF(B8<4,'Current Performance'!E21*0.05,0)` | *Reduced gaps, faster response, more reviews* | [CALC] |
| 37 | Content & Social (if scored < 4) | `=IF(B9<4,'Current Performance'!E21*0.05,0)` | *Content-driven organic demand* | [CALC] |
| 38 | Creator Network (if scored < 4) | `=IF(B10<4,'Current Performance'!E21*0.05,0)` | *UGC and creator-driven bookings* | [CALC] |
| 39 | Guest Network (if scored < 4) | `=IF(B11<4,'Current Performance'!E21*0.08,0)` | *Repeat bookings + referrals* | [CALC] |
| 40 | Product Placement (if scored < 4) | `=IF(B12<4,200*12,0)` | *$200/month partnership revenue* | [CALC] |
| 41 | Curated Experiences (if scored < 4) | `=IF(B13<4,'Current Performance'!E19*'Property Snapshot'!B9*8,0)` | *$8/guest/stay experience revenue* | [CALC] |
| 42 | Property Acquisition (if scored < 4) | `=IF(B14<4,0,0)` | *Varies by market -- enter manually if applicable* | [CALC] |
| 43 | | | | |
| 44 | **Total Revenue Potential from Spoke Activation** | `=SUM(B33:B42)` | | [CALC] GREEN, bold, 20pt |
| 45 | **Projected Revenue Per Night** | `=('Current Performance'!E21+B44)/365` | | [CALC] GOLD, bold, 24pt |
| 46 | **RPN Increase** | `=B45-'Current Performance'!E23` | *Per night gain* | [CALC] GREEN |

---

## TAB 5: INVESTMENT METRICS

**Sheet name:** `Investment Metrics`

### Section A: Operating Expenses Summary (Rows 1-20)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 1 | **INVESTMENT METRICS** | *(merge A1:D1)* | | Header |
| 2 | *Property financial health and return analysis* | | | Instruction |
| 3 | | | | |
| 4 | **ANNUAL OPERATING EXPENSES** | | | Section header |
| 5 | Property Tax | `='Property Snapshot'!B20` | | [CALC] |
| 6 | Insurance | `='Property Snapshot'!B21` | | [CALC] |
| 7 | Utilities (annual) | [INPUT] | *Electric, gas, water, internet, trash* | Currency |
| 8 | Cleaning (annual) | [INPUT] | *All turnover costs for the year* | Currency |
| 9 | Supplies & Consumables | [INPUT] | *Toiletries, linens, kitchen, etc.* | Currency |
| 10 | Lawn / Snow / Maintenance | [INPUT] | | Currency |
| 11 | Software & Tools | [INPUT] | *PMS, pricing tool, website, etc.* | Currency |
| 12 | Platform Commissions | `='Current Performance'!B29` | | [CALC] |
| 13 | Property Management Fee | [INPUT] | *0 if self-managed* | Currency |
| 14 | Maintenance Reserve | `='Current Performance'!E21*0.07` | *7% of gross revenue* | [CALC] |
| 15 | CapEx Reserve | `='Current Performance'!E21*0.05` | *5% for capital expenditures* | [CALC] |
| 16 | Miscellaneous | [INPUT] | | Currency |
| 17 | | | | |
| 18 | **Total Operating Expenses** | `=SUM(B5:B16)` | | [CALC] Currency, bold |
| 19 | **Expense Ratio** | `=B18/'Current Performance'!E21` | *Target: under 60%* | [CALC] % |
| 20 | Expense Ratio Health | `=IF(B19<=0.45,"Excellent",IF(B19<=0.55,"Good",IF(B19<=0.65,"Fair","High -- review expenses")))` | | [CALC] |

**Conditional formatting for B19:**
- <= 45%: Green
- 46-55%: Light green
- 56-65%: Yellow
- > 65%: Red

### Section B: Net Operating Income (Rows 22-28)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 22 | **NET OPERATING INCOME (NOI)** | | | Section header |
| 23 | Gross Annual Revenue | `='Current Performance'!E21` | | [CALC] |
| 24 | Total Operating Expenses | `=B18` | | [CALC] |
| 25 | **NOI (before debt service)** | `=B23-B24` | | [CALC] Currency, bold, 20pt |
| 26 | | | | |
| 27 | Annual Debt Service | `='Property Snapshot'!B22` | *Mortgage + tax + insurance* | [CALC] |
| 28 | **Annual Cash Flow (after debt)** | `=B25-B27` | | [CALC] Currency, bold -- GREEN if positive, RED if negative |

### Section C: Core Investment Metrics -- Current (Rows 30-46)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 30 | **CURRENT INVESTMENT METRICS** | | | Section header (navy bg) |
| 31 | | **Your Property** | **Benchmark** | |
| 32 | **Cap Rate** | `=B25/'Property Snapshot'!B15` | *Good STR: 8-12%* | [CALC] % |
| 33 | Cap Rate Rating | `=IF(B32>=0.10,"Strong",IF(B32>=0.07,"Healthy",IF(B32>=0.04,"Below Target","Underperforming")))` | | [CALC] |
| 34 | | | | |
| 35 | **Cash-on-Cash Return** | `=B28/'Property Snapshot'!B17` | *Good STR: 10-20%* | [CALC] % |
| 36 | CoC Rating | `=IF(B35>=0.15,"Excellent",IF(B35>=0.10,"Strong",IF(B35>=0.05,"Moderate","Underperforming")))` | | [CALC] |
| 37 | | | | |
| 38 | **DSCR (Debt Service Coverage)** | `=IF('Property Snapshot'!B22>0,B25/'Property Snapshot'!B22,"N/A -- no debt")` | *Target: > 1.25* | [CALC] |
| 39 | DSCR Rating | `=IF(ISNUMBER(B38),IF(B38>=1.5,"Strong",IF(B38>=1.25,"Adequate",IF(B38>=1.0,"Tight","Below 1.0 -- negative cash flow"))),"N/A")` | | [CALC] |
| 40 | | | | |
| 41 | **GRM (Gross Rent Multiplier)** | `=IF('Current Performance'!E21>0,'Property Snapshot'!B15/'Current Performance'!E21,"N/A")` | *Lower = better. Target: 8-15* | [CALC] |
| 42 | GRM Rating | `=IF(ISNUMBER(B41),IF(B41<=10,"Excellent",IF(B41<=15,"Good",IF(B41<=20,"Fair","High -- property may be overpriced"))),"N/A")` | | [CALC] |
| 43 | | | | |
| 44 | **Break-Even Occupancy** | `=IF('Current Performance'!E13>0,(B18+'Property Snapshot'!B22)/('Current Performance'!E13*365),"N/A")` | *All costs / (ADR x 365)* | [CALC] % |
| 45 | Break-Even Rating | `=IF(ISNUMBER(B44),IF(B44<=0.40,"Strong buffer",IF(B44<=0.55,"Healthy",IF(B44<=0.70,"Tight margin","Dangerously high -- at risk"))),"N/A")` | | [CALC] |
| 46 | **Break-Even Nights Per Year** | `=IF(ISNUMBER(B44),ROUND(B44*365,0),"N/A")` | | [CALC] |

**Conditional formatting for B32, B35:**
- Green if above benchmark lower bound
- Yellow if marginal
- Red if below threshold

**Conditional formatting for B38:**
- >= 1.5: Green
- 1.25-1.49: Yellow
- 1.0-1.24: Orange
- < 1.0: Red

**Conditional formatting for B44:**
- <= 40%: Green
- 41-55%: Yellow
- 56-70%: Orange
- > 70%: Red

### Section D: Projected Metrics After Hub-and-Spoke (Rows 48-64)

| Row | Col A | Col B (Current) | Col C (Projected) | Col D (Change) | Type |
|-----|-------|-----------------|--------------------|--------------------|------|
| 48 | **PROJECTED METRICS: AFTER HUB-AND-SPOKE** | | | | Section header |
| 49 | *Based on your Revenue Gap Analysis and Spoke activation potential* | | | | |
| 50 | | **Current** | **Projected (12 mo)** | **Change** | |
| 51 | Gross Revenue | `='Current Performance'!E21` | `=B51+'Revenue Gap Analysis'!B44` | `=C51-B51` | [CALC] |
| 52 | Commissions (reduced via direct) | `='Current Performance'!B29` | `=C51*('Current Performance'!B28-('Revenue Gap Analysis'!B28-'Revenue Gap Analysis'!B27)/100*('Current Performance'!B28-0.03))` | `=C52-B52` | [CALC] |
| 53 | Operating Expenses (adjusted) | `=B18` | `=B18*1.05` | `=C53-B53` | [CALC] -- 5% increase for added tools |
| 54 | **NOI** | `=B25` | `=C51-C52-C53` | `=C54-B54` | [CALC] bold |
| 55 | **Annual Cash Flow** | `=B28` | `=C54-'Property Snapshot'!B22` | `=C55-B55` | [CALC] bold |
| 56 | | | | | |
| 57 | **Cap Rate** | `=B32` | `=C54/'Property Snapshot'!B15` | `=C57-B57` | [CALC] % |
| 58 | **Cash-on-Cash Return** | `=B35` | `=C55/'Property Snapshot'!B17` | `=C58-B58` | [CALC] % |
| 59 | **DSCR** | `=B38` | `=IF('Property Snapshot'!B22>0,C54/'Property Snapshot'!B22,"N/A")` | `=IF(ISNUMBER(C59),C59-B59,"N/A")` | [CALC] |
| 60 | **Break-Even Occupancy** | `=B44` | `=IF(C51/365>0,(C53+'Property Snapshot'!B22)/(C51/'Current Performance'!E17*365),"N/A")` | `=IF(ISNUMBER(C60),C60-B60,"N/A")` | [CALC] % |
| 61 | **Revenue Per Night** | `='Current Performance'!E23` | `=C51/365` | `=C61-B61` | [CALC] GOLD, bold |
| 62 | | | | | |
| 63 | **Property Value Increase** | | `=IF(B32>0,(C54/B32)-'Property Snapshot'!B15,0)` | *Based on current market cap rate* | [CALC] GREEN |
| 64 | *A higher NOI at the same cap rate means a more valuable property* | | | | Note |

**Conditional formatting for Col D (Change column):**
- Positive values: Green text with up arrow
- Negative values: Red text with down arrow
- Zero: Gray text

---

## TAB 6: 12-MONTH PROJECTION

**Sheet name:** `12-Month Projection`

### Section A: Header and Assumptions (Rows 1-8)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 1 | **12-MONTH REVENUE PROJECTION** | *(merge A1:N1)* | | Header |
| 2 | *Month-by-month projection of Hub-and-Spoke implementation impact* | | | |
| 3 | | | | |
| 4 | Program Start Date | [INPUT] | | Date |
| 5 | Current Monthly Revenue (avg) | `='Current Performance'!E21/12` | | [CALC] |
| 6 | Current Revenue Per Night | `='Current Performance'!E23` | | [CALC] |
| 7 | Baseline Annual Revenue | `='Current Performance'!E21` | | [CALC] |
| 8 | Revenue Gap (Annual) | `='Revenue Gap Analysis'!B44` | | [CALC] |

### Section B: Implementation Timeline (Rows 10-22)

Each spoke's revenue impact ramps in over a defined period. The model below assigns a "ramp factor" per month (0% = not started, rising to 100% = fully contributing).

| Row | Col A (Spoke / Action) | Col B (Start Mo) | Col C (Full Effect Mo) | Col D (Monthly Revenue at Full) | Col E (Source) |
|-----|------------------------|------------------|------------------------|--------------------------------|----------------|
| 10 | **IMPLEMENTATION RAMP SCHEDULE** | **Starts** | **Full By** | **Monthly Impact** | |
| 11 | Add VRBO | 1 | 3 | `='Revenue Gap Analysis'!D5/12` | *Platform expansion* |
| 12 | Add Booking.com | 1 | 4 | `='Revenue Gap Analysis'!D6/12` | *Platform expansion* |
| 13 | Add Google Vacation Rentals | 2 | 3 | `='Revenue Gap Analysis'!D7/12` | *Platform expansion* |
| 14 | Install Dynamic Pricing | 2 | 4 | `='Revenue Gap Analysis'!B24/12` | *ADR optimization* |
| 15 | Build Direct Booking Site | 3 | 6 | `='Revenue Gap Analysis'!B33/12` | *Commission savings* |
| 16 | Email Funnels + Retargeting | 4 | 7 | `='Current Performance'!E21*0.03/12` | *Direct booking lift* |
| 17 | Content Engine Launch | 4 | 8 | `='Current Performance'!E21*0.05/12` | *Organic demand* |
| 18 | Creator Partnerships | 5 | 9 | `='Current Performance'!E21*0.05/12` | *UGC + creator bookings* |
| 19 | Guest Retention System | 6 | 9 | `='Current Performance'!E21*0.08/12` | *Repeat + referral* |
| 20 | Experience Marketplace | 7 | 10 | `='Hub-and-Spoke Scorecard'!B41/12` | *Ancillary revenue* |
| 21 | Sponsor Partnerships | 6 | 10 | `=200` | *Partnership revenue* |
| 22 | Automation (time savings -> revenue) | 2 | 5 | `='Current Performance'!E21*0.03/12` | *Fewer gaps, faster response* |

### Section C: Month-by-Month Projection Table (Rows 24-40)

**Columns: A = Label, B-M = Month 1 through Month 12, N = Annual Total**

The ramp factor formula for a given spoke in month X:

```
=IF(X<StartMonth, 0, IF(X>=FullMonth, 1, (X-StartMonth+1)/(FullMonth-StartMonth+1)))
```

For example, if VRBO starts Month 1, full by Month 3, the ramp in Month 2 is:
```
=(2-1+1)/(3-1+1) = 0.667
```

| Row | Col A | Col B (Mo 1) | ... pattern for each month ... | Col N (Annual) |
|-----|-------|-------------|-------------------------------|----------------|
| 24 | **Month** | **1** | **2** through **12** | **Total** |
| 25 | Baseline Revenue (do nothing) | `=$B$5` | `=$B$5` *(repeated)* | `=SUM(B25:M25)` |
| 26 | | | | |
| 27 | + VRBO Ramp | `=IF(B24<$B$11,0,IF(B24>=$C$11,1,(B24-$B$11+1)/($C$11-$B$11+1)))*$D$11` | *(pattern for each month)* | `=SUM(B27:M27)` |
| 28 | + Booking.com Ramp | *(same ramp pattern using Row 12 values)* | | `=SUM(B28:M28)` |
| 29 | + Google VR Ramp | *(same ramp pattern using Row 13 values)* | | `=SUM(B29:M29)` |
| 30 | + Dynamic Pricing Ramp | *(same ramp pattern using Row 14 values)* | | `=SUM(B30:M30)` |
| 31 | + Direct Booking Savings | *(same ramp pattern using Row 15 values)* | | `=SUM(B31:M31)` |
| 32 | + Email Funnels | *(same ramp pattern using Row 16 values)* | | `=SUM(B32:M32)` |
| 33 | + Content Engine | *(same ramp pattern using Row 17 values)* | | `=SUM(B33:M33)` |
| 34 | + Creator Partnerships | *(same ramp pattern using Row 18 values)* | | `=SUM(B34:M34)` |
| 35 | + Guest Retention | *(same ramp pattern using Row 19 values)* | | `=SUM(B35:M35)` |
| 36 | + Experience Revenue | *(same ramp pattern using Row 20 values)* | | `=SUM(B36:M36)` |
| 37 | + Sponsor Revenue | *(same ramp pattern using Row 21 values)* | | `=SUM(B37:M37)` |
| 38 | + Automation Lift | *(same ramp pattern using Row 22 values)* | | `=SUM(B38:M38)` |
| 39 | | | | |
| 40 | **Total Projected Revenue** | `=B25+SUM(B27:B38)` | *(pattern)* | `=SUM(B40:M40)` |

**Master ramp formula template (for cell B27, VRBO example):**
```
=IF(B$24<$B$11,0,IF(B$24>=$C$11,$D$11,$D$11*(B$24-$B$11+1)/($C$11-$B$11+1)))
```
Copy across months (C27:M27), then adjust row references for each spoke (rows 28-38).

### Section D: Summary Metrics (Rows 42-52)

| Row | Col A | Col B (Mo 1) | ... | Col N (Annual) |
|-----|-------|-------------|-----|----------------|
| 42 | **SUMMARY** | | | |
| 43 | Baseline Revenue (Do Nothing) | `=B25` | | `=N25` |
| 44 | Projected Revenue (Hub-and-Spoke) | `=B40` | | `=N40` |
| 45 | **Monthly Uplift** | `=B44-B43` | | `=N45` |
| 46 | **Cumulative Uplift** | `=B45` | `=B46+C45` *(running sum)* | `=M46` |
| 47 | **Uplift %** | `=IF(B43>0,B45/B43,0)` | | `=IF(N43>0,N45/N43,0)` |
| 48 | | | | |
| 49 | **Revenue Per Night (Baseline)** | `=B43*12/365` | | `=N43/365` |
| 50 | **Revenue Per Night (Projected)** | `=B44*12/365` | | `=N44/365` |
| 51 | | | | |
| 52 | **Year 1 Total Additional Revenue** | | | `=N46` |

**Conditional formatting for Row 45 (Monthly Uplift):**
- Green background with intensity scaling: lightest green at low uplift, darkest green at highest month

**Conditional formatting for Row 47 (Uplift %):**
- Color scale: White (0%) to Gold (50%+)

### Section E: Visual Chart Data (Row 54-56)

These rows feed the embedded chart:

| Row | Col A | Col B-M |
|-----|-------|---------|
| 54 | Chart: Baseline | `=B25` repeated |
| 55 | Chart: Projected | `=B40` across months |
| 56 | Chart: Cumulative Uplift | `=B46` across months |

**Chart specification:**
- Combo chart: Baseline as gray dashed line, Projected as gold filled area, Cumulative Uplift as green bar overlay
- X-axis: Month 1-12
- Y-axis: Revenue ($)
- Title: "12-Month Revenue Trajectory: Baseline vs. Hub-and-Spoke"

---

## TAB 7: COURSE ROI CALCULATOR

**Sheet name:** `Course ROI Calculator`

### Section A: Tier Selection (Rows 1-12)

| Row | Col A | Col B | Col C | Col D | Type |
|-----|-------|-------|-------|-------|------|
| 1 | **COURSE ROI CALCULATOR** | *(merge A1:E1)* | | | Header |
| 2 | *See the exact return on your investment in the RevenuePerNight System* | | | | |
| 3 | | | | | |
| 4 | **SELECT YOUR TIER** | **Price** | **What's Included** | | Section header |
| 5 | Course (Self-Paced) | $1,997 | *10 modules, calculator, templates, community* | | |
| 6 | Intensive (Group Coaching) | $2,997 | *Course + 12 weeks group coaching + hot seats* | | |
| 7 | DFY (Done-For-You Setup) | $7,500 | *Intensive + we build your direct site, pricing, automation* | | |
| 8 | Full Bundle (White Glove) | $25,000 | *DFY + 12 months 1:1 + creator program + full system build* | | |
| 9 | | | | | |
| 10 | Which tier are you considering? | [INPUT] | Dropdown: Course, Intensive, DFY, Full Bundle | | |
| 11 | **Your Investment** | `=IF(B10="Course",1997,IF(B10="Intensive",2997,IF(B10="DFY",7500,IF(B10="Full Bundle",25000,0))))` | | | [CALC] Currency, bold |
| 12 | Monthly Payment Option (if applicable) | `=IF(B10="Course",ROUND(B11/6,0)&" x 6 months",IF(B10="Intensive",ROUND(B11/6,0)&" x 6 months",IF(B10="DFY",ROUND(B11/4,0)&" x 4 months",IF(B10="Full Bundle",ROUND(B11/12,0)&" x 12 months",""))))` | | | [CALC] |

### Section B: Your Revenue Gap Summary (Rows 14-22)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 14 | **YOUR NUMBERS (from your analysis)** | | | Section header |
| 15 | Current Annual Revenue | `='Current Performance'!E21` | | [CALC] |
| 16 | Current Revenue Per Night | `='Current Performance'!E23` | | [CALC] |
| 17 | Total Revenue Gap (Annual) | `='Revenue Gap Analysis'!B44` | | [CALC] RED |
| 18 | Potential Revenue (Year 1) | `='Revenue Gap Analysis'!B48` | | [CALC] GREEN |
| 19 | Spoke Score | `='Hub-and-Spoke Scorecard'!B19` | out of 50 | [CALC] |
| 20 | | | | |
| 21 | Estimated Year 1 Capture Rate | [INPUT, default 60%] | *Conservative: you won't close 100% of the gap in Year 1* | % |
| 22 | **Realistic Year 1 Revenue Increase** | `=B17*B21` | | [CALC] GREEN, bold, 20pt |

### Section C: ROI Calculation (Rows 24-38)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 24 | **YOUR COURSE ROI** | | | Section header (navy bg, gold text) |
| 25 | | | | |
| 26 | Year 1 Revenue Increase | `=B22` | | [CALC] |
| 27 | Course Investment | `=B11` | | [CALC] |
| 28 | Additional Tool Costs (Year 1) | [INPUT, default 1200] | *PriceLabs ~$30/mo, website ~$50/mo, email ~$20/mo* | Currency |
| 29 | **Total Investment** | `=B27+B28` | | [CALC] |
| 30 | | | | |
| 31 | **Net Return (Year 1)** | `=B26-B29` | | [CALC] GREEN if positive, RED if negative, 24pt |
| 32 | **ROI Percentage** | `=B31/B29` | | [CALC] %, bold, 24pt |
| 33 | **ROI Multiple** | `=B26/B29` | *"Your investment returned Xx"* | [CALC] |
| 34 | | | | |
| 35 | **Months to Break Even** | `=IF(B26>0,ROUNDUP(B29/(B26/12),0),"N/A -- no projected increase")` | | [CALC] bold |
| 36 | Break-Even Assessment | `=IF(ISNUMBER(B35),IF(B35<=3,"Rapid payback -- under 3 months",IF(B35<=6,"Strong payback -- under 6 months",IF(B35<=9,"Solid payback -- under 9 months",IF(B35<=12,"Pays for itself within the year","Longer payback -- consider a lower tier")))),"")` | | [CALC] |
| 37 | | | | |
| 38 | Daily Cost of Inaction | `=B17/365` | *You lose this much every day you wait* | [CALC] RED, bold |

**Conditional formatting for B32 (ROI %):**
- >= 500%: Green bg, gold text, "Exceptional ROI"
- 200-499%: Green bg
- 100-199%: Light green bg
- 50-99%: Yellow bg
- < 50%: Orange bg

**Conditional formatting for B35 (Break-Even Months):**
- 1-3: Green
- 4-6: Light green
- 7-9: Yellow
- 10-12: Orange
- > 12: Red

### Section D: 3-Year Cumulative Projection (Rows 40-54)

| Row | Col A | Col B (Year 1) | Col C (Year 2) | Col D (Year 3) | Col E (3-Year Total) | Type |
|-----|-------|----------------|----------------|----------------|---------------------|------|
| 40 | **3-YEAR CUMULATIVE BENEFIT** | **Year 1** | **Year 2** | **Year 3** | **3-Year Total** | Section header |
| 41 | *Revenue increases compound: Year 1 gains become the new baseline* | | | | | |
| 42 | | | | | | |
| 43 | Revenue Increase | `=B22` | `=B17*0.85` | `=B17*0.95` | `=SUM(B43:D43)` | [CALC] |
| 44 | | | *85% of gap closed by Y2* | *95% by Y3* | | Note |
| 45 | Cumulative Additional Revenue | `=B43` | `=B45+C43` | `=C45+D43` | `=D45` | [CALC] |
| 46 | Course Investment (one-time) | `=B29` | 0 | 0 | `=B29` | [CALC] |
| 47 | Ongoing Tool Costs | `=B28` | `=B28` | `=B28` | `=SUM(B47:D47)` | [CALC] |
| 48 | **Total Cost** | `=B46+B47` | `=C46+C47` | `=D46+D47` | `=SUM(B48:D48)` | [CALC] |
| 49 | | | | | | |
| 50 | **Net Benefit** | `=B43-B48` | `=C43-C48` | `=D43-D48` | `=SUM(B50:D50)` | [CALC] GREEN, bold |
| 51 | **Cumulative Net Benefit** | `=B50` | `=B51+C50` | `=C51+D50` | `=D51` | [CALC] GREEN, bold, 20pt |
| 52 | **3-Year ROI** | | | | `=E50/E48` | [CALC] %, bold, 24pt |
| 53 | **3-Year ROI Multiple** | | | | `=E45/E48` | [CALC] |
| 54 | **Total 3-Year Benefit vs. Do Nothing** | | | | `=E45` | [CALC] GREEN, 20pt |

### Section E: Example Properties (Rows 56-88)

| Row | Col A | Col B | Col C | Type |
|-----|-------|-------|-------|------|
| 56 | **REAL-WORLD EXAMPLES** | | | Section header |
| 57 | *These are based on actual properties to show typical outcomes* | | | |
| 58 | | | | |

**Example 1: Lakeside Landing FLX (Rows 59-73)**

| Row | Col A | Col B (Value) | Col C (Notes) | Type |
|-----|-------|---------------|---------------|------|
| 59 | **EXAMPLE 1: Lakeside Landing FLX** | | | Subsection (gold bg) |
| 60 | Property Type | Lakefront luxury | Seneca Lake, NY | |
| 61 | Purchase Price / Basis | $1,675,000 | | |
| 62 | Current Gross Revenue | $66,000 | Airbnb-only, Year 1 baseline | |
| 63 | ADR Range | $800 - $1,800 | Peak: $1,800, Shoulder: $1,100, Off: $800 | |
| 64 | Current Platforms | Airbnb only | 1 platform | |
| 65 | Current Occupancy | ~22% (80 nights) | Seasonal market | |
| 66 | Current Revenue Per Night | `=62000/365` | `=$169.86` | [CALC] |
| 67 | | | | |
| 68 | Revenue Gap Analysis: | | | |
| 69 | + Add VRBO (25% lift) | `=B62*0.25` | `=$16,500` | [CALC] |
| 70 | + Add Booking.com (12% lift) | `=B62*0.12` | `=$7,920` | [CALC] |
| 71 | + Dynamic Pricing (20% ADR lift) | `=B62*0.20` | `=$13,200` | [CALC] |
| 72 | + Direct Booking (commission savings) | `=B62*0.30*0.12` | `=$2,376` | [CALC] |
| 73 | + Guest Retention + Experiences | `=B62*0.10` | `=$6,600` | [CALC] |
| 74 | **Total Revenue Gap** | `=SUM(B69:B73)` | `=$46,596` | [CALC] bold |
| 75 | Year 1 at 60% capture | `=B74*0.60` | `=$27,958` | [CALC] |
| 76 | Course Investment (Intensive) | $2,997 | | |
| 77 | **ROI Multiple** | `=B75/B76` | `=9.3x` | [CALC] GREEN, bold |
| 78 | **Break-Even** | `=ROUNDUP(B76/(B75/12),0)` | `=2 months` | [CALC] GREEN |
| 79 | Projected Revenue Per Night | `=(B62+B75)/365` | `=$257.70` | [CALC] GOLD |
| 80 | RPN Increase | `=B79-B66` | `=+$87.84/night` | [CALC] GREEN |

**Example 2: Smooth Sailing (Rows 82-96)**

| Row | Col A | Col B (Value) | Col C (Notes) | Type |
|-----|-------|---------------|---------------|------|
| 82 | **EXAMPLE 2: Smooth Sailing** | | | Subsection (gold bg) |
| 83 | Property Type | Lakefront | Finger Lakes, NY | |
| 84 | Purchase Price / Basis | $560,000 | | |
| 85 | Previous Owner Gross Revenue | $57,000 | *Under old management* | |
| 86 | ADR Range | $375 - $425 | Peak: $425, Shoulder: $400, Off: $375 | |
| 87 | Current Platforms | Airbnb + VRBO | 2 platforms | |
| 88 | Current Occupancy | ~45% (165 nights) | | |
| 89 | Current Revenue Per Night | `=B85/365` | `=$156.16` | [CALC] |
| 90 | | | | |
| 91 | Revenue Gap Analysis: | | | |
| 92 | + Add Booking.com + Google (10% lift) | `=B85*0.10` | `=$5,700` | [CALC] |
| 93 | + Dynamic Pricing (25% ADR lift) | `=B85*0.25` | `=$14,250` | [CALC] |
| 94 | + Direct Booking (commission savings) | `=B85*0.25*0.12` | `=$1,710` | [CALC] |
| 95 | + Guest Retention + Experiences | `=B85*0.10` | `=$5,700` | [CALC] |
| 96 | + Content + Creator Bookings | `=B85*0.08` | `=$4,560` | [CALC] |
| 97 | **Total Revenue Gap** | `=SUM(B92:B96)` | `=$31,920` | [CALC] bold |
| 98 | Year 1 at 60% capture | `=B97*0.60` | `=$19,152` | [CALC] |
| 99 | Course Investment (Course tier) | $1,997 | | |
| 100 | **ROI Multiple** | `=B98/B99` | `=9.6x` | [CALC] GREEN, bold |
| 101 | **Break-Even** | `=ROUNDUP(B99/(B98/12),0)` | `=2 months` | [CALC] GREEN |
| 102 | Projected Revenue Per Night | `=(B85+B98)/365` | `=$208.64` | [CALC] GOLD |
| 103 | RPN Increase | `=B102-B89` | `=+$52.48/night` | [CALC] GREEN |

### Section F: Decision Summary (Rows 105-116)

| Row | Col A | Col B | Type |
|-----|-------|-------|------|
| 105 | | | |
| 106 | **YOUR DECISION SUMMARY** | *(merge A106:C106, navy bg, gold text, 16pt)* | Section header |
| 107 | | | |
| 108 | Your Revenue Gap (annual) | `=B17` | [CALC] RED |
| 109 | Your Revenue Gap (daily) | `=B38` | [CALC] RED |
| 110 | Your Course Investment | `=B11` | [CALC] |
| 111 | Your Year 1 Net Return | `=B31` | [CALC] GREEN |
| 112 | Your Break-Even | `=B35&" months"` | [CALC] |
| 113 | Your 3-Year Net Benefit | `=D51` | [CALC] GREEN |
| 114 | | | |
| 115 | Every day you delay costs you | `=B109` | [CALC] RED, bold, 20pt |
| 116 | Every month you delay costs you | `=B17/12` | [CALC] RED, bold |

---

## CONDITIONAL FORMATTING MASTER REFERENCE

Apply these formatting rules across the workbook:

### Color Scale Rules

| Rule Name | Applies To | Condition | Format |
|-----------|-----------|-----------|--------|
| Positive/Negative Currency | Any change/delta cell | > 0 | Green text (#2E7D32) |
| | | = 0 | Gray text (#757575) |
| | | < 0 | Red text (#CC3333) |
| Occupancy Health | Occupancy % cells | >= 70% | Green bg (#C8E6C9) |
| | | 50-69% | Yellow bg (#FFF9C4) |
| | | 30-49% | Orange bg (#FFE0B2) |
| | | < 30% | Red bg (#FFCDD2) |
| Score Health (1-5) | Spoke score cells | 5 | Dark green bg |
| | | 4 | Light green bg |
| | | 3 | Yellow bg |
| | | 2 | Orange bg |
| | | 1 | Red bg |
| Revenue Per Night Tier | RPN display cells | >= $500 | Gold bg, bold (#D4A017) |
| | | $300-499 | Green bg |
| | | $180-299 | Yellow bg |
| | | $100-179 | Orange bg |
| | | < $100 | Red bg |
| ROI Multiple | ROI cells | >= 10x | Green bg, gold text |
| | | 5-9x | Green bg |
| | | 2-4x | Light green bg |
| | | 1-2x | Yellow bg |
| | | < 1x | Red bg |

### Input Cell Formatting

| Element | Format |
|---------|--------|
| All input cells | Background: #FAF7F2 (cream), Border: 1px solid #D4A017 (gold), Font: 11pt |
| All formula cells | Background: #F5F5F5 (light gray), Locked, Font: 11pt |
| Section headers | Background: #1B2A4A (navy), Font: white, 14pt, bold |
| Big number displays | Font: 24pt or 36pt, Gold #D4A017 |
| Warning/Error text | Red #CC3333, italic |
| Helper/hint text | Gray #757575, italic, 9pt |

---

## LEAD MAGNET VERSION (Free Download)

For the free version distributed as a lead magnet, include these tabs only:

### Included (Unlocked):
1. **Property Snapshot** -- full tab
2. **Current Performance** -- full tab
3. **Revenue Gap Analysis** -- full tab (this is the hook -- they see their gap)
4. **Hub-and-Spoke Scorecard** -- full tab

### Locked (Teaser):
5. **Investment Metrics** -- Show headers and labels only. All formula cells display: *"Unlock in the full RevenuePerNight Calculator -- included with the course"*
6. **12-Month Projection** -- Show headers only. Display message: *"See your personalized 12-month revenue projection inside The RevenuePerNight System"*
7. **Course ROI Calculator** -- Show the tier pricing table (Section A) and the two examples (Section E). Lock Sections B-D with: *"Enter the course to calculate your personal ROI"*

### Lead Magnet CTA (new row at bottom of each unlocked tab):

In the last visible row of each unlocked tab, merge across all columns:

```
"You are leaving $[=Revenue Gap Analysis!B44] on the table every year.
The RevenuePerNight System shows you exactly how to capture it.
Enroll at [COURSE URL]"
```

Format: Navy bg, gold text, 14pt, centered.

---

## GOOGLE SHEETS BUILD NOTES

### Sheet Setup
- Create 7 tabs named exactly as specified: `Property Snapshot`, `Current Performance`, `Revenue Gap Analysis`, `Hub-and-Spoke Scorecard`, `Investment Metrics`, `12-Month Projection`, `Course ROI Calculator`
- Tab colors: Navy for input tabs (1-2), Gold for analysis tabs (3-4), Green for metrics tabs (5-7)
- Freeze Row 1 on every tab

### Protection
- Lock all formula cells (Edit > Protected sheets and ranges)
- Only cream-colored input cells should be editable
- Add a warning on attempt to edit locked cells: "This cell calculates automatically from your inputs"

### Data Validation Summary
| Field | Validation |
|-------|-----------|
| Property Type (Tab 1 B6) | Dropdown list |
| Platform Active Y/N (Tab 1 B26:B34) | Dropdown: Y, N |
| Commission % (Tab 1 C26:C34) | Number 0-100 |
| Booking % (Tab 1 D26:D34) | Number 0-100 |
| Season Days (Tab 2 B7:D7) | Number > 0, must sum to 365 |
| Min Night Req (Tab 2 B9:D9) | Number 1-30 |
| ADR (Tab 2 B13:D13) | Number > 0 |
| Nights Booked (Tab 2 B17:D17) | Number >= 0, <= season days |
| Dynamic Pricing Y/N (Tab 3 B17) | Dropdown: Yes, No |
| Pricing Strategy (Tab 3 B18) | Dropdown list |
| Spoke Scores (Tab 4 B5:B14) | Number 1-5, whole numbers |
| Course Tier (Tab 7 B10) | Dropdown: Course, Intensive, DFY, Full Bundle |
| Year 1 Capture Rate (Tab 7 B21) | Number 0-100% |

### Distribution
- Share as "Make a Copy" link (File > Share > Get link > Anyone with link > Viewer, then append `/copy` to the URL)
- Full version: share only with enrolled students via course platform
- Lead magnet version: share publicly via opt-in landing page
- File size target: under 1MB (no images)
- Test on mobile (Google Sheets app) before distributing

### Embedded Charts (optional but recommended)
1. **Tab 3:** Horizontal bar chart showing Revenue Gap components (Platform, Pricing, Commission)
2. **Tab 4:** Radar/spider chart of 10 spoke scores
3. **Tab 6:** Combo chart -- baseline (gray line) vs. projected (gold area) with cumulative uplift (green bars)
4. **Tab 7:** Simple bar chart -- Investment vs. Year 1 Return vs. 3-Year Return

---

## FORMULAS QUICK REFERENCE

For implementers, here is every core formula in a copyable list:

```
=== TAB 1: PROPERTY SNAPSHOT ===
B22 (Annual Debt Service):        =B19*12+B20+B21
B35 (Platforms Active):           =COUNTIF(B26:B34,"Y")
D35 (Blended Commission):        =SUMPRODUCT(C26:C34,D26:D34)/SUM(D26:D34)
B36 (Booking % Check):           =SUM(D26:D34)

=== TAB 2: CURRENT PERFORMANCE ===
E13 (Weighted ADR):               =SUMPRODUCT(B13:D13,B17:D17)/SUM(B17:D17)
B15 (Rate Capture %):             =B13/B14
B19 (Occupancy Rate):             =B17/B18
E17 (Total Nights Booked):        =SUM(B17:D17)
E18 (Total Available):            =SUM(B18:D18)
E19 (Annual Occupancy):           =E17/E18
B21 (Peak Gross Revenue):         =B13*B17
E21 (Annual Gross Revenue):       =SUM(B21:D21)
B22 (RevPAR):                     =B21/B18
E22 (Annual RevPAR):              =E21/E18
E23 (Revenue Per Night):          =E21/365
B29 (Total Commissions):          =B27*B28
B33 (Commission Savings):         =B27*0.30*(B28-0.03)
B37 (Vacant Nights):              =E18-E17
B38 (Revenue Lost):               =B37*E13

=== TAB 3: REVENUE GAP ANALYSIS ===
D5 (VRBO Additional Rev):         =IF(B5="NOT LISTED",0.25,0)*'Current Performance'!E21
D6 (Booking.com):                 =IF(B6="NOT LISTED",0.12,0)*'Current Performance'!E21
D7 (Google VR):                   =IF(B7="NOT LISTED",0.07,0)*'Current Performance'!E21
D8 (Direct):                      =IF(B8="NOT LISTED",0.10,0)*'Current Performance'!E21
D13 (Total Platform Rev):         =SUM(D5:D11)
B20 (ADR Lift %):                 =IF(B17="No",IF(B18="Fixed rates year-round",0.30,IF(B18="Seasonal rates only",0.20,IF(B18="Manual adjustments",0.15,0))),0)
B22 (Pricing Revenue):            ='Current Performance'!E17*('Current Performance'!E13*B20)
B24 (Total Pricing Opp):          =B22+B23
B33 (Commission Savings):         =B29*B32
B44 (TOTAL REVENUE GAP):          =SUM(B40:B42)
B48 (Potential Revenue):          =B38+B44
B49 (Potential RPN):              =B48/365
B50 (Capture %):                  =B38/B48

=== TAB 4: HUB-AND-SPOKE SCORECARD ===
B19 (Total Score):                =SUM(B5:B14)
B20 (Score %):                    =B19/50
B22 (Grade):                      =IF(B20>=0.9,"A",IF(B20>=0.8,"B",IF(B20>=0.7,"C",IF(B20>=0.6,"D","F"))))
B25 (Weakest Spoke):              =INDEX(A5:A14,MATCH(MIN(B5:B14),B5:B14,0))
B44 (Total Spoke Revenue):        =SUM(B33:B42)
B45 (Projected RPN):              =('Current Performance'!E21+B44)/365

=== TAB 5: INVESTMENT METRICS ===
B18 (Total OpEx):                 =SUM(B5:B16)
B19 (Expense Ratio):              =B18/'Current Performance'!E21
B25 (NOI):                        =B23-B24
B28 (Cash Flow):                  =B25-B27
B32 (Cap Rate):                   =B25/'Property Snapshot'!B15
B35 (Cash-on-Cash):               =B28/'Property Snapshot'!B17
B38 (DSCR):                       =IF('Property Snapshot'!B22>0,B25/'Property Snapshot'!B22,"N/A")
B41 (GRM):                        ='Property Snapshot'!B15/'Current Performance'!E21
B44 (Break-Even Occ):             =(B18+'Property Snapshot'!B22)/('Current Performance'!E13*365)
B46 (Break-Even Nights):          =ROUND(B44*365,0)
C57 (Projected Cap Rate):         =C54/'Property Snapshot'!B15
C58 (Projected CoC):              =C55/'Property Snapshot'!B17
C61 (Projected RPN):              =C51/365
B63 (Property Value Increase):    =IF(B32>0,(C54/B32)-'Property Snapshot'!B15,0)

=== TAB 6: 12-MONTH PROJECTION ===
Ramp formula (generic):           =IF(MonthNum<StartMonth,0,IF(MonthNum>=FullMonth,MonthlyImpact,MonthlyImpact*(MonthNum-StartMonth+1)/(FullMonth-StartMonth+1)))
B40 (Total Projected Mo Rev):     =B25+SUM(B27:B38)
B45 (Monthly Uplift):             =B44-B43
B46 (Cumulative Uplift):          =B45 (Mo1), then =PrevCumulative+CurrentUplift
N52 (Year 1 Additional Rev):      =M46

=== TAB 7: COURSE ROI CALCULATOR ===
B11 (Investment):                 =IF(B10="Course",1997,IF(B10="Intensive",2997,IF(B10="DFY",7500,IF(B10="Full Bundle",25000,0))))
B22 (Realistic Y1 Increase):     =B17*B21
B31 (Net Return Y1):              =B26-B29
B32 (ROI %):                      =B31/B29
B33 (ROI Multiple):               =B26/B29
B35 (Break-Even Months):          =ROUNDUP(B29/(B26/12),0)
B38 (Daily Cost of Inaction):     =B17/365
D51 (3-Year Cumulative Benefit):  =cumulative sum of annual net benefits
E52 (3-Year ROI):                 =E50/E48
```

---

## TESTING CHECKLIST

Before distributing, verify with these test inputs:

**Test Case 1: Lakeside Landing FLX**
- Purchase Price: $1,675,000 | Cash Invested: $450,000 | Mortgage: $8,200/mo
- Peak ADR: $1,800 | Shoulder ADR: $1,100 | Off-Season ADR: $800
- Peak Nights: 45/107 | Shoulder Nights: 25/107 | Off-Season Nights: 10/151
- Platform: Airbnb only (15% commission, 100% of bookings)
- Expected Revenue Per Night: ~$180 | Expected Revenue Gap: ~$40,000+

**Test Case 2: Smooth Sailing**
- Purchase Price: $560,000 | Cash Invested: $140,000 | Mortgage: $3,100/mo
- Peak ADR: $425 | Shoulder ADR: $400 | Off-Season ADR: $375
- Peak Nights: 80/107 | Shoulder Nights: 55/107 | Off-Season Nights: 30/151
- Platforms: Airbnb (70%) + VRBO (30%)
- Expected Revenue Per Night: ~$156 | Expected Revenue Gap: ~$25,000+

**Verify:**
- [ ] All formulas calculate without errors
- [ ] Revenue Per Night displays correctly on every tab that references it
- [ ] Spoke scores properly trigger conditional formatting
- [ ] ROI calculator returns sensible multiples for all 4 tiers
- [ ] 12-month projection shows increasing revenue each month
- [ ] Break-even months calculation is correct
- [ ] Conditional formatting fires correctly at all thresholds
- [ ] Lead magnet version properly locks premium tabs
- [ ] Data validation prevents invalid entries
- [ ] Mobile display is readable (test in Google Sheets app)

---

*This specification is the complete build guide. Every cell reference, every formula, and every conditional format rule is included. A Google Sheets developer should be able to build the finished calculator from this document alone, with zero ambiguity about what goes where.*
