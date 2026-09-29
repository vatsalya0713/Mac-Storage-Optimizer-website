import { NextRequest, NextResponse } from 'next/server'
import { timingSafeEqual, createHash } from 'node:crypto'
import { rateLimit, clientIp } from '@/lib/rateLimit'
import { sessionToken } from '@/lib/session'
import { supabaseAdmin } from '@/lib/supabase'

// Best-effort only — logging an attempt must never affect whether login
// succeeds or fails. Awaited (with a short timeout) rather than
// fire-and-forget, since a serverless function can freeze the instant it
// returns a response, before a background write actually completes.
async function logAttempt(ip: string, success: boolean) {
  const insert = Promise.resolve(supabaseAdmin.from('login_attempts').insert([{ ip, success }]))
    .then(({ error }) => {
      if (error) console.error('login_attempts insert failed (non-fatal):', error.message)
    })
    .catch((error: unknown) => console.error('login_attempts insert failed (non-fatal):', error instanceof Error ? error.message : error))
  await Promise.race([insert, new Promise((resolve) => setTimeout(resolve, 800))])
}

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
    await logAttempt(clientIp(request), false)
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  await logAttempt(clientIp(request), true)

  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', sessionToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
  return response
}
