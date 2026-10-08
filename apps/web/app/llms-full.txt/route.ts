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
    'MacDiskCleaner is a one-time-purchase Mac storage cleaner for macOS 14 Sonoma and later, including the latest macOS release (Apple Silicon M1–M4 and Intel). Free tier: unlimited scanning and browsing of duplicates, large files, old files, downloads and junk, plus 2 GB of total (lifetime) cleanup. Pro ($12.99 one-time, no subscription): removes the 2 GB cleanup cap and adds an App Uninstaller (removes leftover support files, not just the app), a Privacy Cleaner (browser history/cache/cookies, Finder Recent Items, Quick Look thumbnail cache, clipboard), a Startup Manager (view and disable login items), and Scheduled Scans (automatic background scanning on a daily/weekly cadence), plus lifetime updates and priority support. The app also has a Developer tab that safely clears Xcode DerivedData, node_modules, CocoaPods, Cargo target folders, Gradle output, Python environments and package-manager caches (project-aware, labelled Safe to rebuild or Review first, never touching source code or .git, everything moved to Trash). The app checks for updates automatically and installs them in one click; each release publishes a SHA-256 checksum at https://www.macdiskcleaner.com/security and release notes at https://www.macdiskcleaner.com/changelog.',
    '',
    '30-day no-questions-asked refund policy on all Pro purchases. Not a subscription — one payment, forever. Each Pro license activates on one Mac (movable to a new Mac by deactivating the old one). All scanning and analysis happens locally on-device; no file contents, names, or paths are uploaded to any server — only the license key is transmitted, during activation.',
    '',
    '## Frequently asked questions',
    '',
    'Q: Is MacDiskCleaner safe to use?',
    'A: Yes. It only deletes files you explicitly approve, and everything is moved to Trash before permanent removal, so nothing is ever unrecoverable.',
    '',
    'Q: Will it work on my Mac?',
    'A: Yes, on macOS 14 Sonoma and later, on both Apple Silicon (M1, M2, M3, M4) and Intel Macs.',
    '',
    'Q: Is the free version really free?',
    'A: Yes — no trial period, no expiration. Scanning and browsing every result are free forever, plus 2 GB of total cleanup. Once 2 GB has been cleaned, the app asks for Pro or a license key before deleting more.',
    '',
    'Q: What exactly does Pro unlock?',
    'A: Pro removes the 2 GB cleanup cap and adds the App Uninstaller, Privacy Cleaner, Startup Manager, and Scheduled Scans, plus lifetime updates and priority support, for a single $12.99 payment.',
    '',
    'Q: Is it a subscription?',
    'A: No. Pro is a one-time $12.99 payment with no recurring billing.',
    '',
    'Q: How many Macs can one license activate?',
    'A: One Mac per Pro license. To move it, deactivate the license in the old app or contact support.',
    '',
    'Q: Can I get a refund?',
    'A: Yes — a full 30-day no-questions-asked refund on all Pro purchases, via support@macdiskcleaner.com.',
    '',
    'Q: How is this different from CleanMyMac or OnyX?',
    'A: MacDiskCleaner is a one-time purchase with no subscription (CleanMyMac is mainly a yearly subscription), and includes a guided duplicate finder and large-file scanner that OnyX does not have. It does not include malware scanning (CleanMyMac does) or advanced system tweaks (OnyX does).',
    '',
    'Q: Does it collect or upload my data?',
    'A: No. All scanning, duplicate detection, and cleanup analysis happen entirely on-device. No file names, paths or contents are ever sent. The only data sent is the license key with a one-way hashed device ID (activation), the total amount cleaned on the free plan (a single number), and update checks.',
    '',
    'Q: Is pricing the same for US customers?',
    'A: Yes, $12.99 USD everywhere, charged once, with standard card, Apple Pay, and Google Pay support at checkout.',
    '',
    'Q: Do I need an internet connection to use it?',
    'A: Only for Pro activation, periodic licence checks and update checks. Scanning and cleaning themselves run on the Mac.',
    '',
    '---',
  ]

  // MDX components aren't meaningful to an AI reader: keep the key labels, drop the CTA.
  const plain = (mdx: string) =>
    mdx
      .replace(/<DownloadCTA\s*\/>/g, '')
      .replace(/<Kbd>(.*?)<\/Kbd>/g, '$1')
      .replace(/\n{3,}/g, '\n\n')
      .trim()

  for (const slug of getPostSlugs('en')) {
    const source = fs.readFileSync(getPostPath('en', slug), 'utf8')
    const { data, content } = matter(source)
    sections.push(`\n## ${data.title}\n`)
    sections.push(`Source: ${SITE_URL}/blog/${slug} (also in Spanish, German and French at /es, /de and /fr + /blog/${slug})\n`)
    if (data.tldr) sections.push(`Quick answer: ${data.tldr}\n`)
    sections.push(plain(content))
    if (Array.isArray(data.faq) && data.faq.length) {
      sections.push('\n### FAQ')
      for (const f of data.faq as { q: string; a: string }[]) sections.push(`Q: ${f.q}\nA: ${f.a}\n`)
    }
    sections.push('\n---')
  }

  return new Response(sections.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
