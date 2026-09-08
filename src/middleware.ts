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

// Explicit allow-list for Sterling Route. Every other host → SpokeBnB.
const STERLING_ROUTE_HOSTS = new Set([
  'sterlingroute.com',
  'www.sterlingroute.com',
])

function isSterlingRoute(host: string): boolean {
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) return true
  return STERLING_ROUTE_HOSTS.has(host)
}

export default withAuth(
  async function middleware(req) {
    const host = req.headers.get('host') || ''
    const { pathname } = req.nextUrl

    // ── Host-based routing ──────────────────────────────────────────────────
    // Any domain NOT on the Sterling Route allow-list serves SpokeBnB.
    // This covers spokebnb.com, www.spokebnb.com, all Vercel preview URLs, etc.
    if (!isSterlingRoute(host)) {
      if (!pathname.startsWith('/course') && !pathname.startsWith('/api/')) {
        const url = req.nextUrl.clone()
        url.pathname = '/course'
        return NextResponse.redirect(url, 302)
      }
      // SpokeBnB paths — only course-module cookie gate applies
      if (pathname.startsWith('/course/modules')) {
        const raw = req.cookies.get('sbnb_access')?.value
        const valid = raw ? await verifyCookie(raw) : false
        if (!valid) {
          return NextResponse.redirect(new URL('/course#pricing', req.url))
        }
      }
      return NextResponse.next()
    }

    // ── Sterling Route role checks ──────────────────────────────────────────
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
        const host = req.headers.get('host') || ''

        // SpokeBnB hosts: all paths are open — inner middleware handles course routing
        if (!isSterlingRoute(host)) return true

        // Sterling Route: require session for protected paths
        const { pathname } = req.nextUrl
        if (
          pathname.startsWith('/portal') ||
          pathname.startsWith('/dispatcher') ||
          pathname.startsWith('/corporate') ||
          pathname.startsWith('/course/deal-analysis')
        ) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  // Run on everything except Next.js internals and static assets.
  // This ensures branch-preview URLs are caught too.
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
