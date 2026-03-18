export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const chauffeurs = await prisma.chauffeur.findMany({
    where: { isActive: true },
    orderBy: { rating: 'desc' },
    take: 10,
  })
  return NextResponse.json(chauffeurs)
}
