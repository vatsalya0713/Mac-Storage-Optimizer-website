import { getAllPosts } from '@/lib/blog'

const SITE_URL = 'https://www.macdiskcleaner.com'

// Generated as a route (not a static public/ file) so it always lists the
// current set of pages and blog posts as content is added — no manual sync.
export async function GET() {
  const posts = getAllPosts('en')

  const lines = [
    '# MacDiskCleaner',
    '',
    '> MacDiskCleaner is a Mac storage cleaner app for macOS that removes junk files, finds duplicate files, and locates large files to free up disk space. The free tier cleans up to 2 GB of junk per scan with unlimited duplicate and large-file scanning; Pro is a single $12.99 one-time purchase (not a subscription) that adds an App Uninstaller, Privacy Cleaner, Startup Manager, and Scheduled Scans.',
    '',
    '## Key facts',
    '- Platform: macOS 12 Monterey through the latest macOS Sequoia release, Apple Silicon (M1–M4) and Intel.',
    '- Pricing: Free tier ($0, forever) and Pro ($12.99 USD, one-time payment, no subscription).',
    '- Pro license activates on up to 2 Macs per purchase.',
    '- 30-day no-questions-asked refund policy on Pro purchases.',
    '- Privacy: all scanning and cleanup analysis happens locally on the Mac. No file contents, names, or paths are ever uploaded to a server.',
    '- Safety: files are always moved to Trash before permanent deletion, never deleted outright.',
    '- Distribution: direct download from the website, not the Mac App Store. No account or signup required.',
    '',
    '## Free tier vs. Pro',
    '| Feature | Free | Pro |',
    '|---|---|---|',
    '| Junk file cleanup | Up to 2 GB per scan | Unlimited |',
    '| Duplicate file finder | Unlimited | Unlimited |',
    '| Large file finder | Unlimited | Unlimited |',
    '| App Uninstaller (removes leftover files) | No | Yes |',
    '| Privacy Cleaner (browser history/cache/cookies, Recent Items, Quick Look cache, clipboard) | No | Yes |',
    '| Startup Manager (login items) | No | Yes |',
    '| Scheduled Scans (automatic background scans) | No | Yes |',
    '| Price | $0 | $12.99 one-time |',
    '',
    '## Product pages',
    `- [Home](${SITE_URL}/): overview, features, pricing, FAQ.`,
    `- [Free Mac Cleaner](${SITE_URL}/free-mac-cleaner): full detail on what's included in the free tier vs. Pro.`,
    `- [vs. CleanMyMac X & OnyX](${SITE_URL}/vs/cleanmymac): feature-by-feature comparison against the other well-known Mac cleaners.`,
    `- [Contact](${SITE_URL}/contact): support, bug reports, and feature suggestions.`,
    `- [Privacy Policy](${SITE_URL}/privacy)`,
    `- [Terms of Service](${SITE_URL}/terms)`,
    '',
    '## Frequently asked questions',
    'Is MacDiskCleaner safe to use? Yes — it only deletes files you explicitly approve, and everything is moved to Trash before permanent removal.',
    'Is the free version really free? Yes, with no trial period: junk cleanup up to 2 GB per scan, plus unlimited duplicate and large-file scanning, permanently.',
    'Is Pro a subscription? No — it is a single $12.99 payment with no recurring billing.',
    'How many Macs can one license activate? Up to 2 Macs per Pro license.',
    'How is it different from CleanMyMac or OnyX? MacDiskCleaner is one-time-purchase (unlike CleanMyMac\'s subscription) and includes a guided duplicate/large-file finder that OnyX lacks.',
    'Does it collect or upload data? No — all analysis is local; only the license key is sent to the server, during activation.',
    '',
    '## Guides',
    ...posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    '',
    '## Other languages',
    `Home page is also available in Spanish (${SITE_URL}/es), German (${SITE_URL}/de), and French (${SITE_URL}/fr). All other pages (Free Mac Cleaner, comparison, blog, contact, legal) are English-only.`,
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
