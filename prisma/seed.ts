import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding SilverSprinter database...')

  // ─── Vehicle ──────────────────────────────────────────────────────────────

  const van = await prisma.vehicle.upsert({
    where: { slug: 'silversprinter' },
    update: {},
    create: {
      name: 'The SilverSprinter',
      slug: 'silversprinter',
      tagline: "South Florida's Finest Mobile Suite",
      description:
        'A custom-built Mercedes Sprinter unlike anything you can rent anywhere else in South Florida. ' +
        '10 passengers across 6 captain chairs and 2 fold-flat benches. Private commode, sink, microwave, ' +
        'mini fridge, 32" TV, Bluetooth, and WiFi. This is your living room on wheels — for golf trips, ' +
        'game days, corporate events, or any occasion that deserves the finest ride.',
      capacity: 10,
      basePrice: 350,
      pricePerHour: null,
      pricePerDay: 595,
      year: 2021,
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      color: 'Silver',
      status: 'AVAILABLE',
      features: [
        '6 captain chairs + 2 fold-flat benches',
        'Private commode & sink',
        'Microwave & mini fridge',
        '32" TV · Bluetooth · WiFi streaming',
        'Sleeps 2 (benches fold flat)',
        'USB-C charging at every seat',
      ],
      amenities: [
        'WiFi',
        'TV',
        'Bluetooth',
        'Mini Fridge',
        'Microwave',
        'Private Restroom',
        'USB-C',
        'AC',
        'Sleeping Capable',
      ],
      imageUrls: [
        '/gallery/DSC04726.JPG',
        '/gallery/DSC04731.JPG',
        '/gallery/DSC04741.JPG',
        '/gallery/DSC04746.JPG',
        '/gallery/DSC04751.JPG',
        '/gallery/DSC04756.JPG',
      ],
    },
  })

  console.log(`Seeded vehicle: ${van.name}`)

  // ─── Add-ons ──────────────────────────────────────────────────────────────
  // Relevant for self-drive rental — golf, game day, corporate, occasions

  const addons = await Promise.all([
    prisma.addon.upsert({
      where: { id: 'addon-cooler' },
      update: {},
      create: {
        id: 'addon-cooler',
        name: 'Stocked Cooler',
        description: 'Arrives loaded: 2 bags of ice, 24 bottles of water, 12 assorted sodas, 6 sports drinks. Ready to go at pickup. You handle the beer — we handle the basics.',
        price: 65,
        category: 'Beverages',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-golf' },
      update: {},
      create: {
        id: 'addon-golf',
        name: 'Golf Trip Setup',
        description: 'Cargo area configured for clubs: non-slip mat, tie-down straps, organized storage. Includes a printed course guide for your destination (Streamsong, Cabot Citrus Farms, TPC Sawgrass, Innisbrook — or your choice). Pickup is smooth. Unload is smooth. Nothing shifts in transit.',
        price: 45,
        category: 'Golf',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-tailgate' },
      update: {},
      create: {
        id: 'addon-tailgate',
        name: 'Tailgate Package',
        description: 'Folding table, 6 camp chairs, reusable stadium cups, bottle opener, disposable serving trays. Everything you need for a proper pre-game setup — none of it left behind. You pack in, you pack out.',
        price: 55,
        category: 'Game Day',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-champagne' },
      update: {},
      create: {
        id: 'addon-champagne',
        name: 'Champagne Service',
        description: 'Two bottles of Moët & Chandon (or equivalent) chilled and waiting in the fridge. Flutes for 10. Gold napkins. No corkage, no fuss. Ideal for milestones, celebrations, or any trip that deserves a proper send-off. Note: Alcohol service is for passengers only — not the driver, ever.',
        price: 75,
        category: 'Occasions',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-refreshments' },
      update: {},
      create: {
        id: 'addon-refreshments',
        name: 'Premium Snack Board',
        description: 'Artisan board: charcuterie, aged cheeses, crackers, nuts, dried fruit, chocolate. Serves 6–8. Pre-arranged at pickup. Pairs with the champagne service or stands on its own. No wilted gas station snacks on a Sterling Route trip.',
        price: 85,
        category: 'Food',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-floral' },
      update: {},
      create: {
        id: 'addon-floral',
        name: 'Floral Arrangement',
        description: 'Fresh arrangement from a local Palm Beach County florist. Suitable for anniversaries, proposals, birthdays, or any occasion that calls for flowers. Specify occasion and color preference at booking. Add-on must be requested 72 hours in advance.',
        price: 60,
        category: 'Occasions',
        isActive: true,
      },
    }),
  ])

  console.log(`Seeded ${addons.length} add-ons`)

  // ─── Hoadley Group Corporate Account ─────────────────────────────────────

  const hoadley = await prisma.corporateAccount.upsert({
    where: { accountRef: 'HGP-0001' },
    update: {},
    create: {
      accountRef: 'HGP-0001',
      companyName: 'The Hoadley Group',
      billingEmail: 'info@thehoadleygroup.com',
      billingAddress: 'South Florida, FL',
      paymentTerms: 0,
      seatLimit: 10,
      coordinatorName: 'Owner',
      isActive: true,
    },
  })

  console.log(`Seeded corporate account: ${hoadley.companyName}`)
  console.log('✅ Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
