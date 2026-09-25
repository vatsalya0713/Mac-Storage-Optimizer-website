// Lightweight in-memory sliding-window rate limiter.
//
// Honest limitation: Vercel serverless functions don't share memory across
// instances/regions, so this only throttles requests that land on the same
// warm instance — it raises the bar against naive scripted abuse (the
// common case) but isn't a hard distributed guarantee. If this project
// starts seeing real abuse, replace with Upstash Redis (@upstash/ratelimit)
// for a proper distributed limiter — same call signature, swap the
// implementation here.
const buckets = new Map<string, { count: number; resetAt: number }>()

// Prevent unbounded memory growth from unique IPs over a long-running instance.
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
