import type { MetadataRoute } from 'next'
import { getPostSlugs } from '@/lib/blog'
import { routing } from '@/i18n/routing'

const SITE_URL = 'https://www.macdiskcleaner.com'

function localizedUrl(locale: string, pathname: string) {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`
  // '/es/' 308-redirects to '/es' — list the final URL, never a redirect.
  if (pathname === '/') return prefix ? `${SITE_URL}${prefix}` : `${SITE_URL}/`
  return `${SITE_URL}${prefix}${pathname}`
}

function languageAlternates(pathname: string) {
  return Object.fromEntries(routing.locales.map((locale) => [locale, localizedUrl(locale, pathname)]))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Home ships in all 4 locales.
  const home: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: localizedUrl(locale, '/'),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages: languageAlternates('/') },
  }))

  // Everything below is English-only content today (see the plan note on
  // translating new pages once validated), so only the unprefixed URL is
  // listed — no locale alternates, to avoid advertising duplicate-content
  // locale-prefixed URLs that don't actually have translated copy.
  const englishOnly: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/free-mac-cleaner`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/downloads`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/developers`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/changelog`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/security`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/vs/cleanmymac`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/vs/onyx`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/vs/daisydisk`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/clear-system-data-mac`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    ...getPostSlugs('en').map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ]

  return [...home, ...englishOnly]
}
