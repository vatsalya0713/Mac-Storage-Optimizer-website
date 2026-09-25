// Lightweight in-memory sliding-window rate limiter — see the identical
// file in apps/web/lib/rateLimit.ts for the honest limitation (per-instance
// only, not a distributed guarantee). Used here to slow down password
// brute-forcing against /api/login.
const buckets = new Map<string, { count: number; resetAt: number }>()
const MAX_BUCKETS = 5000

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || now > bucket.resetAt) {
    if (buckets.size >= MAX_BUCKETS) buckets.clear()
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return true
  }

  if (bucket.count >= limit) return false

  bucket.count += 1
  return true
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  return forwarded?.split(',')[0]?.trim() || 'unknown'
}
