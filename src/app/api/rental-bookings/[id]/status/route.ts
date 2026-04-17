import { NextRequest, NextResponse } from 'next/server'

const VALID_STATUSES = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED']

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    void (await params)
    const { status } = await req.json()

    if (!VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `status must be one of: ${VALID_STATUSES.join(', ')}` },
        { status: 400 }
      )
    }

    // Status update pending schema migration
    return NextResponse.json(
      { error: 'Rental booking status update temporarily unavailable.' },
      { status: 503 }
    )
  } catch (error: unknown) {
    console.error('Rental booking status update error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
