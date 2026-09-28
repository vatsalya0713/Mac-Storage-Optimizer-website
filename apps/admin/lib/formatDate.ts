/// Pinned to a fixed locale AND timezone so server-rendered HTML and client
/// hydration always agree. Passing `undefined` for either lets each side
/// use its own runtime default (Node's default locale vs. the browser's),
/// which differed here (server: en-US "Sep 25, 2026, 09:44 PM", client:
/// "25 Sept 2026, 21:44") and caused a hydration mismatch.
const LOCALE = 'en-US'

export function formatDateTime(value: string | Date): string {
  return new Date(value).toLocaleString(LOCALE, {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString(LOCALE, { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' })
}

export function formatShortDate(value: string | Date): string {
  return new Date(value).toLocaleDateString(LOCALE, { timeZone: 'UTC', month: 'short', day: 'numeric' })
}
