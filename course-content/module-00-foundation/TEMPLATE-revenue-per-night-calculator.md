# Revenue Per Night Calculator — Spreadsheet Blueprint

## Instructions for Building in Google Sheets

Create a Google Sheet with the following tabs and structure. Use conditional formatting (green = above market, red = below) and auto-calculations where noted.

---

## TAB 1: PROPERTY OVERVIEW

### Section 1: Property Basics
| Cell | Label | Input Type | Notes |
|------|-------|-----------|-------|
| B3 | Property Name | Text | e.g., "Sunset Beach House" |
| B4 | Market / City | Text | e.g., "Destin, FL" |
| B5 | Property Type | Dropdown | House, Condo, Apartment, Cabin, Other |
| B6 | Bedrooms | Number | |
| B7 | Max Guests | Number | |
| B8 | Total Available Nights/Year | Number | Default 365, subtract personal use |
| B9 | Date Range Analyzed | Text | e.g., "Jan 2025 - Dec 2025" |

### Section 2: Current Performance
| Cell | Label | Input Type | Formula |
|------|-------|-----------|---------|
| B12 | Total Gross Rental Income (12mo) | Currency | User input |
| B13 | Total Booked Nights (12mo) | Number | User input |
| B14 | **Occupancy Rate** | Percentage | =B13/B8 |
| B15 | **Average Daily Rate (ADR)** | Currency | =B12/B13 |
| B16 | **Revenue Per Night (RevPAR)** | Currency | =B12/B8 |
| B17 | Revenue Per Night (check) | Currency | =B15*B14 (should match B16) |

### Section 3: Market Benchmark (from AirDNA)
| Cell | Label | Input Type | Formula |
|------|-------|-----------|---------|
| B20 | Market Avg Occupancy Rate | Percentage | User input from AirDNA |
| B21 | Market Avg ADR | Currency | User input from AirDNA |
| B22 | Market Avg RevPAR | Currency | =B21*B20 |
| B23 | Market Top 25% Occupancy | Percentage | User input from AirDNA |
| B24 | Market Top 25% ADR | Currency | User input from AirDNA |
| B25 | Market Top 25% RevPAR | Currency | =B24*B23 |

### Section 4: Your Position vs Market
| Cell | Label | Formula | Formatting |
|------|-------|---------|------------|
| B28 | Occupancy vs Market | =B14-B20 | Green if positive, red if negative |
| B29 | ADR vs Market | =B15-B21 | Green if positive, red if negative |
| B30 | RevPAR vs Market | =B16-B22 | Green if positive, red if negative |
| B31 | **Diagnosis** | IF logic (see below) | Bold text |

**Diagnosis Logic:**
- If Occupancy below market AND ADR below market: "Both metrics need work. Start with pricing (Module 3) and distribution (Module 1)."
- If Occupancy below market AND ADR at/above market: "Your rate is fine — you need more demand. Focus on distribution (Module 1) and direct booking (Module 2)."
- If Occupancy at/above market AND ADR below market: "You're filling nights but undercharging. Focus on pricing (Module 3) and premium positioning."
- If both at/above market: "Strong baseline. Focus on direct booking (Module 2) to cut commissions and guest retention (Module 7) to compound growth."

### Section 5: Revenue Gap Analysis
| Cell | Label | Formula |
|------|-------|---------|
| B34 | Current Annual Revenue | =B12 |
| B35 | Revenue at Market Average | =B21*B20*B8 |
| B36 | Revenue at Top 25% | =B24*B23*B8 |
| B37 | **Gap to Market Average** | =B35-B34 |
| B38 | **Gap to Top 25%** | =B36-B34 |
| B39 | Gap to Market Avg (monthly) | =B37/12 |
| B40 | Gap to Top 25% (monthly) | =B38/12 |

---

## TAB 2: EXPENSES & NET REVENUE

### Section 6: Monthly Expense Breakdown
| Cell | Label | Input Type |
|------|-------|-----------|
| B3 | Mortgage / Rent | Currency |
| B4 | Property Insurance | Currency |
| B5 | Utilities (electric, water, internet, gas) | Currency |
| B6 | Cleaning Cost per Turnover | Currency |
| B7 | Estimated Turnovers per Month | Number |
| B8 | Monthly Cleaning Total | =B6*B7 |
| B9 | Supplies & Consumables | Currency |
| B10 | Software/Tools (PMS, pricing, etc.) | Currency |
| B11 | Platform Fees/Commissions (avg monthly) | Currency |
| B12 | Maintenance Reserve (% of revenue) | Currency (=Tab1!B12*0.07/12) |
| B13 | Property Management Fee (if applicable) | Currency |
| B14 | Other | Currency |
| B15 | **Total Monthly Expenses** | =SUM(B3:B14) |
| B16 | **Total Annual Expenses** | =B15*12 |

### Section 6b: Net Revenue
| Cell | Label | Formula |
|------|-------|---------|
| B19 | Gross Annual Revenue | =Tab1!B12 |
| B20 | Total Annual Expenses | =B16 |
| B21 | **Net Annual Revenue** | =B19-B20 |
| B22 | **Net Revenue Per Night** | =B21/Tab1!B8 |
| B23 | **Profit Margin** | =B21/B19 |
| B24 | Margin Health | IF(B23>=0.4,"Healthy",IF(B23>=0.25,"Needs improvement","Warning")) |

---

## TAB 3: SPOKE ASSESSMENT

### Section 7: Hub-and-Spoke Status
| Cell | Spoke | Status (Dropdown) | Revenue Impact Estimate |
|------|-------|-------------------|------------------------|
| B3 | 1. Distribution Platforms | Active / Partial / Missing | User input: how many platforms? |
| B4 | 2. Direct Booking Engine | Active / Partial / Missing | User input: % direct bookings |
| B5 | 3. Dynamic Pricing | Active / Partial / Missing | User input: using a tool? |
| B6 | 4. Automation & Systems | Active / Partial / Missing | User input: hours/week on ops |
| B7 | 5. Content & Social Media | Active / Partial / Missing | User input: posting? Y/N |
| B8 | 6. Creator & Influencer Network | Active / Partial / Missing | User input: any creator stays? |
| B9 | 7. Guest Network & Retention | Active / Partial / Missing | User input: repeat booking %? |
| B10 | 8. Curated Experiences | Active / Partial / Missing | User input: any experience revenue? |
| B12 | **Spokes Active** | =COUNTIF(B3:B10,"Active") | Out of 8 |
| B13 | **System Capacity** | =B12/8 | Percentage |
| B14 | **Spokes to Build** | =8-B12 | Number |

### Section 7b: Priority Recommendation
Auto-generated based on spoke status and Section 4 diagnosis:

| Priority | Module | Condition |
|----------|--------|-----------|
| 1 | Dynamic Pricing (Module 3) | If B5 = "Missing" |
| 2 | Distribution (Module 1) | If B3 = "Missing" or "Partial" |
| 3 | Automation (Module 4) | If B6 = "Missing" |
| 4 | Direct Booking (Module 2) | If B4 = "Missing" |
| 5 | Guest Network (Module 7) | If B9 = "Missing" |
| 6 | Content (Module 5) | If B7 = "Missing" |
| 7 | Creator Network (Module 6) | If B8 = "Missing" |
| 8 | Experiences (Module 9) | If B10 = "Missing" |

---

## TAB 4: TARGETS & ROADMAP

### Section 8: 12-Month Targets
| Cell | Label | Input Type | Notes |
|------|-------|-----------|-------|
| B3 | Target Occupancy Rate | Percentage | Suggest: market top 25% |
| B4 | Target ADR | Currency | Based on positioning tier |
| B5 | **Target Revenue Per Night** | =B4*B3 | Auto-calculated |
| B6 | **Target Annual Revenue** | =B5*Tab1!B8 | Auto-calculated |
| B7 | **Revenue Increase Needed** | =B6-Tab1!B12 | Dollar amount |
| B8 | **Monthly Revenue Increase** | =B7/12 | Monthly target |

### Section 8b: Roadmap Dates
| Cell | Label | Input Type |
|------|-------|-----------|
| B11 | Program Start Date | Date |
| B12 | Tier 1 Complete (Modules 0,1,3,4) | Date (=B11+28 suggested) |
| B13 | Direct Booking Site Launch (Module 2) | Date (=B11+56 suggested) |
| B14 | Content Launch (Module 5) | Date (=B11+70 suggested) |
| B15 | First Creator Stay (Module 6) | Date (=B11+90 suggested) |
| B16 | 90-Day System Audit | Date (=B11+90) |
| B17 | 6-Month Review | Date (=B11+180) |
| B18 | 12-Month Target Date | Date (=B11+365) |

### Section 8c: Commission Savings Projection
| Cell | Label | Formula |
|------|-------|---------|
| B21 | Current Annual Platform Fees | User input |
| B22 | Target Direct Booking % | Percentage (suggest 30-40%) |
| B23 | Projected Fee Savings | =B21*B22 |
| B24 | **Total Projected Revenue + Savings** | =B6+B23 |

---

## TAB 5: COMPETITIVE MATRIX

### Section: Top 5 Competitors
| Column | Header |
|--------|--------|
| A | Property Name / Listing Link |
| B | Nightly Rate (low season) |
| C | Nightly Rate (high season) |
| D | Estimated Occupancy |
| E | Number of Reviews |
| F | Average Review Score |
| G | Key Amenities (top 3) |
| H | Positioning Tier (Budget/Mid/Premium) |
| I | Estimated Annual Revenue |
| J | Notes / Weaknesses |

Row 8: YOUR PROPERTY (highlighted in gold)
Row 9: Market Average (from AirDNA)

---

## DESIGN NOTES

- **Colors:** Navy (#1B2A4A) headers, Gold (#D4A017) accents, Cream (#FAF7F2) backgrounds
- **Logo:** RevenuePerNight branding on header row of each tab
- **Conditional Formatting:**
  - Green = above market average
  - Red = below market average
  - Gold = at target level
- **Print Layout:** Each tab should fit on one printed page (for students who want to post it on their wall)
- **Protection:** Lock formula cells, allow input cells to be edited
- **Mobile:** Test that it works in Google Sheets mobile app (many students will use on phone)

---

## DISTRIBUTION

- Host on Google Sheets (view-only master, students "Make a Copy")
- Also provide as downloadable .xlsx for Excel users
- Link in course platform resources section
- Also works as the lead magnet (Sections 1-5 only for free download, full version for enrolled students)
