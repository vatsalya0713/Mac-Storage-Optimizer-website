import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { routing } from '@/i18n/routing'

export type BlogFaq = { q: string; a: string }

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  /** Last substantive revision (YYYY-MM-DD). Falls back to `date`. */
  updated?: string
  keywords: string[]
  /** One-paragraph direct answer shown above the article (and read by AI answer engines). */
  tldr?: string
  /** Rendered as a visible FAQ with matching FAQPage markup. */
  faq?: BlogFaq[]
  /** Slugs of hand-picked related posts. */
  related?: string[]
}

export type BlogPostMeta = BlogFrontmatter & { slug: string; locale: string; minutes: number }

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

// Every locale has its own folder (content/blog/<locale>/<slug>.mdx). A slug
// is the same in every language, so hreflang can pair translations by slug.
function localeDir(locale: string) {
  return path.join(BLOG_DIR, locale)
}

export function getPostPath(locale: string, slug: string) {
  return path.join(localeDir(locale), `${slug}.mdx`)
}

export function postExists(locale: string, slug: string) {
  return /^[a-z0-9-]+$/.test(slug) && fs.existsSync(getPostPath(locale, slug))
}

export function getPostSlugs(locale: string): string[] {
  const dir = localeDir(locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

/** Locales in which this slug has been written/translated. */
export function getPostLocales(slug: string): string[] {
  return routing.locales.filter((l) => postExists(l, slug))
}

function readTime(content: string) {
  const words = content.replace(/[#*_`>|-]/g, ' ').split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export function getPost(locale: string, slug: string) {
  if (!postExists(locale, slug)) return null
  const source = fs.readFileSync(getPostPath(locale, slug), 'utf8')
  const { data, content } = matter(source)
  const meta: BlogPostMeta = { ...(data as BlogFrontmatter), slug, locale, minutes: readTime(content) }
  return { meta, content }
}

export function getPostFrontmatter(locale: string, slug: string): BlogFrontmatter | null {
  return getPost(locale, slug)?.meta ?? null
}

/**
 * Posts for a locale's blog index. A post not yet translated into `locale`
 * falls back to its English version so the index never hides content.
 */
export function getAllPosts(locale: string): BlogPostMeta[] {
  const slugs = new Set([...getPostSlugs(locale), ...getPostSlugs(routing.defaultLocale)])
  return [...slugs]
    .map((slug) => getPost(locale, slug)?.meta ?? getPost(routing.defaultLocale, slug)?.meta)
    .filter((p): p is BlogPostMeta => Boolean(p))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** Hand-picked related posts first, then posts sharing the most keywords. */
export function getRelatedPosts(post: BlogPostMeta, limit = 3): BlogPostMeta[] {
  const all = getAllPosts(post.locale).filter((p) => p.slug !== post.slug)
  const picked = (post.related ?? [])
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is BlogPostMeta => Boolean(p))
  if (picked.length >= limit) return picked.slice(0, limit)

  const words = new Set(post.keywords.flatMap((k) => k.toLowerCase().split(/\s+/)))
  const scored = all
    .filter((p) => !picked.includes(p))
    .map((p) => ({
      p,
      score: p.keywords.flatMap((k) => k.toLowerCase().split(/\s+/)).filter((w) => words.has(w)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p)
  return [...picked, ...scored].slice(0, limit)
}
