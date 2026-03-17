export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const addons = await prisma.addon.findMany({ where: { isActive: true }, orderBy: { price: 'asc' } })
  return NextResponse.json(addons)
}
