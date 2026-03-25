import { BookingWizard } from '@/components/booking/BookingWizard'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'Book the Van — Sterling Route',
  description: "Reserve South Florida's premier luxury self-drive van.",
}

export default async function BookPage() {
  let addons: { id: string; name: string; description: string | null; price: number; category: string | null }[] = []
  let vehicleId = ''

  try {
    const dbAddons = await prisma.addon.findMany({ where: { isActive: true }, orderBy: { category: 'asc' } })
    addons = dbAddons.map(a => ({
      id: a.id,
      name: a.name,
      description: a.description,
      price: Number(a.price),
      category: a.category,
    }))
  } catch {}

  try {
    const van = await prisma.vehicle.findUnique({ where: { slug: 'silversprinter' } })
    vehicleId = van?.id ?? ''
  } catch {}

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-16">
      <BookingWizard addons={addons} vehicleId={vehicleId} />
    </main>
  )
}
