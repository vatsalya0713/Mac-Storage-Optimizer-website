import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This admin panel had no authentication at all — anyone with the URL could
// view every customer email, copy license keys, revoke keys, and generate
// unlimited free ones. This gates every route behind a shared password
// (ADMIN_PASSWORD env var), checked via a session cookie set at /login.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/login' || pathname.startsWith('/api/login')) {
    return NextResponse.next()
  }

  const session = request.cookies.get('admin_session')?.value
  const expected = process.env.ADMIN_PASSWORD

  if (!expected || session !== expected) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|png|svg|ico)).*)',
}
