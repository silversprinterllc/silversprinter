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

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        if (
          pathname.startsWith('/portal') ||
          pathname.startsWith('/dispatcher') ||
          pathname.startsWith('/corporate')
        ) {
          return !!token
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ['/portal/:path*', '/dispatcher/:path*', '/corporate/:path*'],
}
