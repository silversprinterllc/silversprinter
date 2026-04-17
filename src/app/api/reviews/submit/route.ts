import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { token, rating, body, renterName } = await req.json()

    if (!token || !rating || !body || !renterName) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Rating must be 1–5.' }, { status: 400 })
    }

    if (body.trim().length < 20) {
      return NextResponse.json(
        { error: 'Review must be at least 20 characters.' },
        { status: 400 }
      )
    }

    // Review submission pending schema migration
    return NextResponse.json(
      { error: 'Review submission temporarily unavailable.' },
      { status: 503 }
    )
  } catch (error: unknown) {
    console.error('Review submit error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
