import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    void (await params)
    const { status } = await req.json()

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be APPROVED or REJECTED.' },
        { status: 400 }
      )
    }

    // Review moderation pending schema migration
    return NextResponse.json(
      { error: 'Review moderation temporarily unavailable.' },
      { status: 503 }
    )
  } catch (error: unknown) {
    console.error('Review moderate error:', error)
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
