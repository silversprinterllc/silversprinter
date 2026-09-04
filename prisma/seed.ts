import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  // ─── Vehicles ─────────────────────────────────────────────────────────────

  const meridian = await prisma.vehicle.upsert({
    where: { slug: 'the-meridian' },
    update: {},
    create: {
      name: 'The Meridian',
      slug: 'the-meridian',
      tagline: 'Refined comfort for every journey',
      description:
        'The Meridian sets the standard for luxury ground transportation. With 12 captain seats wrapped in full-grain leather, a starlight ceiling, and 4K screens throughout, every mile feels first-class.',
      capacity: 12,
      basePrice: 150,
      pricePerHour: 120,
      pricePerDay: 850,
      year: 2024,
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      color: 'Obsidian Black',
      status: 'AVAILABLE',
      features: [
        'Leather captain seats',
        'Starlight ceiling',
        '4K screens',
        'WiFi',
        'USB-C hubs',
        'Dual-zone climate control',
      ],
      amenities: ['WiFi', 'USB-C', 'AC', 'Entertainment', 'Leather Seats'],
      imageUrls: ['/images/vehicles/meridian-1.jpg', '/images/vehicles/meridian-2.jpg'],
    },
  })

  const noir = await prisma.vehicle.upsert({
    where: { slug: 'the-noir' },
    update: {},
    create: {
      name: 'The Noir',
      slug: 'the-noir',
      tagline: 'Executive privacy, redefined',
      description:
        'The Noir is our most exclusive offering — a 10-passenger executive conversion with suede interior, a curated mini bar, and a privacy partition that makes every ride feel like a private suite.',
      capacity: 10,
      basePrice: 200,
      pricePerHour: 160,
      pricePerDay: 1100,
      year: 2024,
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      color: 'Midnight Blue',
      status: 'AVAILABLE',
      features: [
        'Suede interior',
        'Mini bar',
        'Mood lighting',
        'Privacy partition',
        'Tinted privacy glass',
        'Ambient lighting system',
      ],
      amenities: ['Mini Bar', 'WiFi', 'USB-C', 'AC', 'Privacy Partition'],
      imageUrls: ['/images/vehicles/noir-1.jpg', '/images/vehicles/noir-2.jpg'],
    },
  })

  const summit = await prisma.vehicle.upsert({
    where: { slug: 'the-summit' },
    update: {},
    create: {
      name: 'The Summit',
      slug: 'the-summit',
      tagline: 'Adventure without compromise',
      description:
        'The Summit blends rugged capability with premium comfort. Built for those who refuse to sacrifice luxury for adventure — all-terrain ready with panoramic windows and smart storage.',
      capacity: 8,
      basePrice: 175,
      pricePerHour: 140,
      pricePerDay: 950,
      year: 2024,
      make: 'Mercedes-Benz',
      model: 'Sprinter',
      color: 'Alpine White',
      status: 'AVAILABLE',
      features: [
        'All-terrain capability',
        'Roof rack',
        'Cooler + storage',
        'USB-C hubs',
        'Panoramic windows',
        'Adventure gear storage',
      ],
      amenities: ['WiFi', 'USB-C', 'AC', 'Panoramic Windows', 'Storage'],
      imageUrls: ['/images/vehicles/summit-1.jpg', '/images/vehicles/summit-2.jpg'],
    },
  })

  console.log(`Seeded vehicles: ${meridian.name}, ${noir.name}, ${summit.name}`)

  // ─── Addons ───────────────────────────────────────────────────────────────

  const addons = await Promise.all([
    prisma.addon.upsert({
      where: { id: 'addon-champagne' },
      update: {},
      create: {
        id: 'addon-champagne',
        name: 'Champagne Service',
        description: 'Premium champagne and flutes for your journey',
        price: 30,
        category: 'Beverages',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-audio' },
      update: {},
      create: {
        id: 'addon-audio',
        name: 'Premium Audio',
        description: 'Custom playlist curated to your preferences',
        price: 20,
        category: 'Entertainment',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-partition' },
      update: {},
      create: {
        id: 'addon-partition',
        name: 'Privacy Partition',
        description: 'Full privacy divider between cabin and driver',
        price: 50,
        category: 'Privacy',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-redcarpet' },
      update: {},
      create: {
        id: 'addon-redcarpet',
        name: 'Red Carpet Arrival',
        description: 'Red carpet, door service, and white-glove greeting',
        price: 40,
        category: 'Experience',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-refreshments' },
      update: {},
      create: {
        id: 'addon-refreshments',
        name: 'Chilled Refreshments',
        description: 'Assorted chilled beverages and light snacks',
        price: 25,
        category: 'Beverages',
        isActive: true,
      },
    }),
    prisma.addon.upsert({
      where: { id: 'addon-floral' },
      update: {},
      create: {
        id: 'addon-floral',
        name: 'Floral Arrangement',
        description: 'Fresh floral arrangement for special occasions',
        price: 35,
        category: 'Decor',
        isActive: true,
      },
    }),
  ])

  console.log(`Seeded ${addons.length} addons`)

  // ─── Chauffeurs ───────────────────────────────────────────────────────────

  const chauffeurs = await Promise.all([
    prisma.chauffeur.upsert({
      where: { email: 'marcus.j@silversprinter.com' },
      update: {},
      create: {
        name: 'Marcus J.',
        phone: '+13055550101',
        email: 'marcus.j@silversprinter.com',
        bio: 'Marcus has been with SilverSprinter since the beginning. Known for his impeccable discretion and encyclopedic knowledge of Miami, he is our most requested chauffeur.',
        rating: 4.99,
        totalTrips: 312,
        isActive: true,
      },
    }),
    prisma.chauffeur.upsert({
      where: { email: 'rachel.l@silversprinter.com' },
      update: {},
      create: {
        name: 'Rachel L.',
        phone: '+13055550102',
        email: 'rachel.l@silversprinter.com',
        bio: 'Rachel brings executive-level professionalism to every ride. A former hospitality director, she anticipates every need before you ask.',
        rating: 4.97,
        totalTrips: 208,
        isActive: true,
      },
    }),
    prisma.chauffeur.upsert({
      where: { email: 'devon.k@silversprinter.com' },
      update: {},
      create: {
        name: 'Devon K.',
        phone: '+13055550103',
        email: 'devon.k@silversprinter.com',
        bio: "Devon's calm demeanor and meticulous attention to detail make him the go-to chauffeur for corporate clients and VIP transfers.",
        rating: 4.95,
        totalTrips: 156,
        isActive: true,
      },
    }),
  ])

  console.log(`Seeded ${chauffeurs.length} chauffeurs`)

  // ─── Corporate Account ────────────────────────────────────────────────────

  const acme = await prisma.corporateAccount.upsert({
    where: { accountRef: 'ACM-0042' },
    update: {},
    create: {
      accountRef: 'ACM-0042',
      companyName: 'Acme Capital Partners',
      billingEmail: 'billing@acmecapital.com',
      billingAddress: '100 Brickell Ave, Suite 2400, Miami, FL 33131',
      paymentTerms: 30,
      seatLimit: 10,
      coordinatorName: 'Jennifer Walsh',
      coordinatorPhone: '+13055550200',
      isActive: true,
    },
  })

  console.log(`Seeded corporate account: ${acme.companyName}`)
  console.log('Seeding complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
