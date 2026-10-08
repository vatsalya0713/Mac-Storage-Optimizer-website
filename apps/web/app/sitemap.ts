import type { MetadataRoute } from 'next'
import { getPost, getPostLocales, getPostSlugs } from '@/lib/blog'
import { routing } from '@/i18n/routing'
import { SITE_URL, absoluteUrl } from '@/lib/seo'
import latest from '@/public/downloads/latest.json'

function languageAlternates(pathname: string, available: readonly string[] = routing.locales) {
  const languages: Record<string, string> = Object.fromEntries(available.map((l) => [l, absoluteUrl(l, pathname)]))
  if (available.includes(routing.defaultLocale)) languages['x-default'] = absoluteUrl(routing.defaultLocale, pathname)
  return languages
}

// Pages translated into every locale: each language version is listed with
// hreflang alternates pointing at its siblings.
const TRANSLATED_PAGES: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/free-mac-cleaner', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/downloads', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/clear-system-data-mac', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/developers', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs/cleanmymac', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/vs/onyx', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/vs/daisydisk', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/security', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
  { path: '/contact', priority: 0.3, changeFrequency: 'yearly' },
]

// English-only pages (release notes and legal text): only the canonical
// English URL is listed.
const ENGLISH_ONLY = [
  { path: '/changelog', priority: 0.5, changeFrequency: 'weekly' as const },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  // Search engines discount sitemaps whose <lastmod> changes on every fetch, so
  // use real dates: the last release for product pages, the post's own date for articles.
  const released = new Date(`${latest.releasedAt}T00:00:00Z`)

  const pages: MetadataRoute.Sitemap = TRANSLATED_PAGES.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: released,
      changeFrequency,
      priority: locale === routing.defaultLocale ? priority : Math.round(priority * 0.9 * 10) / 10,
      alternates: { languages: languageAlternates(path) },
    })),
  )

  const englishOnly: MetadataRoute.Sitemap = ENGLISH_ONLY.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: released,
    changeFrequency,
    priority,
  }))

  // Every written translation of every post, paired by slug.
  const posts: MetadataRoute.Sitemap = getPostSlugs(routing.defaultLocale).flatMap((slug) => {
    const available = getPostLocales(slug)
    const path = `/blog/${slug}`
    return available.map((locale) => {
      const meta = getPost(locale, slug)?.meta
      return {
        url: absoluteUrl(locale, path),
        lastModified: new Date(`${(meta?.updated ?? meta?.date ?? latest.releasedAt).slice(0, 10)}T00:00:00Z`),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: { languages: languageAlternates(path, available) },
      }
    })
  })

  return [...pages, ...englishOnly, ...posts]
}
