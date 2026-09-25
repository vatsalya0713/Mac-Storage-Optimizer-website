import { getAllPosts } from '@/lib/blog'

const SITE_URL = 'https://macdiskcleaner.com'

// Generated as a route (not a static public/ file) so it always lists the
// current set of pages and blog posts as content is added — no manual sync.
export async function GET() {
  const posts = getAllPosts('en')

  const lines = [
    '# MacDiskCleaner',
    '',
    '> A one-time-purchase Mac storage cleaner for macOS: junk file removal, duplicate detection, large-file scanning, a privacy cleaner, and an app uninstaller that removes leftover files. Free tier available; Pro is a single $12.99 purchase, no subscription.',
    '',
    'MacDiskCleaner supports macOS 12 Monterey and later, on Apple Silicon (M1–M4) and Intel Macs. The desktop app is downloaded from the website and unlocked with a license key purchased once, activated per-device.',
    '',
    '## Product',
    `- [Home](${SITE_URL}/): overview, features, pricing (free tier + $12.99 one-time Pro), FAQ.`,
    `- [Free Mac Cleaner](${SITE_URL}/free-mac-cleaner): details on what's included in the free tier vs. Pro.`,
    `- [vs. CleanMyMac X & OnyX](${SITE_URL}/vs/cleanmymac): feature-by-feature comparison against the other well-known Mac cleaners.`,
    `- [Contact](${SITE_URL}/contact): support, bug reports, and feature suggestions.`,
    '',
    '## Guides',
    ...posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    '',
    '## Other languages',
    `Home page is also available in Spanish (${SITE_URL}/es), German (${SITE_URL}/de), and French (${SITE_URL}/fr).`,
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
