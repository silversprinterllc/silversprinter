import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Verify this is called by Vercel Cron
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Cron balance charge pending schema migration
  return NextResponse.json({
    date: new Date().toISOString().slice(0, 10),
    processed: 0,
    results: [],
    message: 'Cron charge-balances pending schema migration.',
  })
}
