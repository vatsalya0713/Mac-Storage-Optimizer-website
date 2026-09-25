import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type BlogFrontmatter = {
  title: string
  description: string
  date: string
  keywords: string[]
}

export type BlogPostMeta = BlogFrontmatter & { slug: string }

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

// Only 'en' has content today (see the plan: blog posts translate once we
// have data on which ones actually rank), but this reads whatever locale
// folders exist so adding es/de/fr later needs no code change here.
function localeDir(locale: string) {
  return path.join(BLOG_DIR, locale)
}

export function getAllPosts(locale: string): BlogPostMeta[] {
  const dir = localeDir(locale)
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const source = fs.readFileSync(path.join(dir, file), 'utf8')
      const { data } = matter(source)
      return { slug, ...(data as BlogFrontmatter) }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostSlugs(locale: string): string[] {
  const dir = localeDir(locale)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, ''))
}

export function getPostPath(locale: string, slug: string) {
  return path.join(localeDir(locale), `${slug}.mdx`)
}

export function getPostFrontmatter(locale: string, slug: string): BlogFrontmatter | null {
  const filePath = getPostPath(locale, slug)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data } = matter(source)
  return data as BlogFrontmatter
}
