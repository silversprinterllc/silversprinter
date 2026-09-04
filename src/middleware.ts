import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

const COOKIE_SECRET =
  process.env.COOKIE_SECRET ||
  (process.env.NODE_ENV === 'development' ? 'dev-secret-do-not-use-in-prod' : '')

const enc = new TextEncoder()

function hexToBytes(hex: string): ArrayBuffer {
  const buf = new ArrayBuffer(hex.length / 2)
  const bytes = new Uint8Array(buf)
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16)
  }
  return buf
}

async function verifyCookie(raw: string): Promise<boolean> {
  const parts = raw.split(':')
  if (parts.length !== 3) return false
  const [tier, granted, sig] = parts
  if (!tier || !granted || !sig) return false
  try {
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(COOKIE_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    return crypto.subtle.verify('HMAC', key, hexToBytes(sig), enc.encode(`${tier}:${granted}`))
  } catch {
    return false
  }
}

export default withAuth(
  async function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    if (pathname.startsWith('/dispatcher')) {
      if (!token || !['DISPATCHER', 'SUPER_ADMIN'].includes(token.role as string)) {
        return NextResponse.redirect(new URL('/portal', req.url))
      }
    }

    if (pathname.startsWith('/corporate')) {
      if (!token || !['CORPORATE_ADMIN', 'CORPORATE_RIDER', 'SUPER_ADMIN'].includes(token.role as string)) {
        return NextResponse.redirect(new URL('/portal', req.url))
      }
    }

    // Course modules: HMAC-verified purchase cookie — separate from next-auth
    if (pathname.startsWith('/course/modules')) {
      const raw = req.cookies.get('sbnb_access')?.value
      const valid = raw ? await verifyCookie(raw) : false
      if (!valid) {
        return NextResponse.redirect(new URL('/course#pricing', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        // These paths require a next-auth session
        if (
          pathname.startsWith('/portal') ||
          pathname.startsWith('/dispatcher') ||
          pathname.startsWith('/corporate') ||
          pathname.startsWith('/course/deal-analysis')
        ) {
          return !!token
        }
        // Course modules use purchase-cookie auth — let the inner middleware handle it
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/portal/:path*',
    '/dispatcher/:path*',
    '/corporate/:path*',
    '/course/deal-analysis/:path*',
    '/course/modules/:path*',
  ],
}
