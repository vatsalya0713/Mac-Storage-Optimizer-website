import fs from 'node:fs'
import matter from 'gray-matter'
import { getPostSlugs, getPostPath } from '@/lib/blog'

const SITE_URL = 'https://www.macdiskcleaner.com'

// The "full" variant of /llms.txt: complete page content inline, not just
// links, so an AI agent can answer questions about MacDiskCleaner from this
// single fetch without crawling the whole site.
export async function GET() {
  const sections = [
    '# MacDiskCleaner — full content export for AI agents',
    '',
    'MacDiskCleaner is a one-time-purchase Mac storage cleaner for macOS 12+ (Apple Silicon and Intel). Free tier: junk cleanup up to 2 GB per scan, full duplicate finder, full large file finder. Pro ($12.99 one-time, no subscription): unlimited junk cleaning, app uninstaller with leftover-file removal, privacy cleaner, startup manager, scheduled scans, lifetime updates.',
    '',
    '30-day refund policy on all Pro purchases. Not a subscription — one payment, forever.',
    '',
    '---',
  ]

  for (const slug of getPostSlugs('en')) {
    const source = fs.readFileSync(getPostPath('en', slug), 'utf8')
    const { data, content } = matter(source)
    sections.push(`\n## ${data.title}\n`)
    sections.push(`Source: ${SITE_URL}/blog/${slug}\n`)
    sections.push(content.trim())
    sections.push('\n---')
  }

  return new Response(sections.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
