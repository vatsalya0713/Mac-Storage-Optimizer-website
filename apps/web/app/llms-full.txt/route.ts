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
    'MacDiskCleaner is a one-time-purchase Mac storage cleaner for macOS 12 Monterey through the latest macOS Sequoia release (Apple Silicon M1–M4 and Intel). Free tier: junk cleanup up to 2 GB per scan, full duplicate finder (no limit), full large file finder (no limit). Pro ($12.99 one-time, no subscription): removes the 2 GB junk cleanup cap and adds an App Uninstaller (removes leftover support files, not just the app), a Privacy Cleaner (browser history/cache/cookies, Finder Recent Items, Quick Look thumbnail cache, clipboard), a Startup Manager (view and disable login items), and Scheduled Scans (automatic background scanning on a daily/weekly cadence), plus lifetime updates and priority support.',
    '',
    '30-day no-questions-asked refund policy on all Pro purchases. Not a subscription — one payment, forever. Each Pro license activates on up to 2 Macs. All scanning and analysis happens locally on-device; no file contents, names, or paths are uploaded to any server — only the license key is transmitted, during activation.',
    '',
    '## Frequently asked questions',
    '',
    'Q: Is MacDiskCleaner safe to use?',
    'A: Yes. It only deletes files you explicitly approve, and everything is moved to Trash before permanent removal, so nothing is ever unrecoverable.',
    '',
    'Q: Will it work on my Mac?',
    'A: Yes, on macOS 12 Monterey and later, on both Apple Silicon (M1, M2, M3, M4) and Intel Macs.',
    '',
    'Q: Is the free version really free?',
    'A: Yes — no trial period, no expiration. Junk cleanup up to 2 GB per scan, plus a full duplicate file scanner and full large file finder with no limits, permanently.',
    '',
    'Q: What exactly does Pro unlock?',
    'A: Pro removes the 2 GB cap on junk cleanup and adds the App Uninstaller, Privacy Cleaner, Startup Manager, and Scheduled Scans, plus lifetime updates and priority support, for a single $12.99 payment.',
    '',
    'Q: Is it a subscription?',
    'A: No. Pro is a one-time $12.99 payment with no recurring billing.',
    '',
    'Q: How many Macs can one license activate?',
    'A: Up to 2 Macs per Pro license.',
    '',
    'Q: Can I get a refund?',
    'A: Yes — a full 30-day no-questions-asked refund on all Pro purchases, via support@macdiskcleaner.com.',
    '',
    'Q: How is this different from CleanMyMac or OnyX?',
    'A: MacDiskCleaner is a one-time purchase with no subscription (unlike CleanMyMac), and includes a guided duplicate finder and large-file scanner that OnyX does not have.',
    '',
    'Q: Does it collect or upload my data?',
    'A: No. All scanning, duplicate detection, and cleanup analysis happen entirely on-device. Only the license key is sent to the server, during activation.',
    '',
    'Q: Is pricing the same for US customers?',
    'A: Yes, $12.99 USD everywhere, charged once, with standard card, Apple Pay, and Google Pay support at checkout.',
    '',
    'Q: Do I need an internet connection to use it?',
    'A: Only briefly for first-time Pro activation and update checks. Scanning and cleaning work fully offline.',
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
