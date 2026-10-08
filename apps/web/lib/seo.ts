import type { Metadata } from 'next'
import { routing, type Locale } from '@/i18n/routing'

export const SITE_URL = 'https://www.macdiskcleaner.com'

// Open Graph wants language_TERRITORY; these are the markets each locale targets.
const OG_LOCALE: Record<Locale, string> = { en: 'en_US', es: 'es_ES', de: 'de_DE', fr: 'fr_FR' }

export function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value)
}

/** '/pricing' → '/pricing' (en), '/es/pricing' (es). '/' → '/' or '/es'. */
export function localizedPath(locale: string, pathname: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  if (pathname === '/') return prefix || '/'
  return `${prefix}${pathname}`
}

export function absoluteUrl(locale: string, pathname: string) {
  const path = localizedPath(locale, pathname)
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

/**
 * canonical + hreflang for a page that exists in `available` locales.
 * Every translated URL points at itself as canonical and lists all siblings
 * (plus x-default → English), which is what Google expects for hreflang.
 */
export function localeAlternates(
  locale: string,
  pathname: string,
  available: readonly string[] = routing.locales,
): NonNullable<Metadata['alternates']> {
  const languages: Record<string, string> = {}
  for (const l of available) languages[l] = localizedPath(l, pathname)
  if (available.includes(routing.defaultLocale)) languages['x-default'] = localizedPath(routing.defaultLocale, pathname)
  return { canonical: localizedPath(locale, pathname), languages }
}

/** Full metadata for a translated page: title, description, hreflang, OG and Twitter. */
export function pageMetadata({
  locale,
  pathname,
  title,
  description,
  available = routing.locales,
  type = 'website',
  publishedTime,
  modifiedTime,
  keywords,
}: {
  locale: string
  pathname: string
  title: string
  description: string
  available?: readonly string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  keywords?: string[]
}): Metadata {
  const ogLocale = isLocale(locale) ? OG_LOCALE[locale] : OG_LOCALE.en
  return {
    // Titles that already name the brand skip the "| MacDiskCleaner" suffix
    // from the layout template, so they don't repeat it.
    title: title.includes('MacDiskCleaner') ? { absolute: title } : title,
    description,
    keywords,
    alternates: localeAlternates(locale, pathname, available),
    openGraph: {
      title,
      description,
      url: localizedPath(locale, pathname),
      siteName: 'MacDiskCleaner',
      locale: ogLocale,
      alternateLocale: available.filter((l) => l !== locale && isLocale(l)).map((l) => OG_LOCALE[l as Locale]),
      type,
      images: ['/hero-macbook.jpg'],
      ...(type === 'article' ? { publishedTime, modifiedTime } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/hero-macbook.jpg'] },
  }
}

/** Formats an ISO date (YYYY-MM-DD) for display in the page's language. */
export function formatDate(iso: string, locale: string) {
  const tag = locale === 'en' ? 'en-US' : locale
  return new Date(`${iso.slice(0, 10)}T00:00:00Z`).toLocaleDateString(tag, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
