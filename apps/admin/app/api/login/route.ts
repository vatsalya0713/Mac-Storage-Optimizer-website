import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual, createHash } from 'node:crypto'
import { rateLimit, clientIp } from '@/lib/rateLimit'

// Hash both sides to a fixed-length digest before comparing — avoids
// leaking the real password's length via how long the comparison takes,
// and avoids passing timingSafeEqual two buffers of different lengths
// (which throws rather than safely returning false).
function safeEqual(a: string, b: string) {
  const hashA = createHash('sha256').update(a).digest()
  const hashB = createHash('sha256').update(b).digest()
  return timingSafeEqual(hashA, hashB)
}

export async function POST(request: NextRequest) {
  // 10 attempts/minute per IP — slows down brute-forcing the shared
  // password without needing external infra. See lib/rateLimit.ts for the
  // honest limitation (per-instance, not distributed).
  if (!rateLimit(`login:${clientIp(request)}`, 10, 60_000)) {
    return NextResponse.json({ error: 'Too many attempts, try again shortly' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const password = body?.password as string | undefined

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD is not configured on the server' },
      { status: 500 }
    )
  }

  if (!password || !safeEqual(password, expected)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })
  return response
}
