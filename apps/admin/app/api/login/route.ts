import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null)
  const password = body?.password as string | undefined

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD is not configured on the server' },
      { status: 500 }
    )
  }

  if (!password || password !== expected) {
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
