import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
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

    // Course modules: verified purchase only — separate from next-auth
    if (pathname.startsWith('/course/modules')) {
      if (!req.cookies.has('sbnb_access')) {
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
