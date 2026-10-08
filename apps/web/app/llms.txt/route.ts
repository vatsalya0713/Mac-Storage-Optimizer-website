import { getAllPosts } from '@/lib/blog'

const SITE_URL = 'https://www.macdiskcleaner.com'

// Generated as a route (not a static public/ file) so it always lists the
// current set of pages and blog posts as content is added — no manual sync.
export async function GET() {
  const posts = getAllPosts('en')

  const lines = [
    '# MacDiskCleaner',
    '',
    '> MacDiskCleaner is a Mac storage cleaner app for macOS that removes junk files, finds duplicate files, and locates large files to free up disk space. Scanning is always free and shows every result; the free tier includes 2 GB of total (lifetime) cleanup, and after that the app asks for Pro. Pro is a single $12.99 one-time purchase (not a subscription) that adds an App Uninstaller, Privacy Cleaner, Startup Manager, and Scheduled Scans.',
    '',
    '## Key facts',
    '- Platform: macOS 14 Sonoma and later, including the latest macOS release. Ships as a single universal binary with native Apple Silicon (M1–M4) and Intel code — one download runs natively on both.',
    '- Pricing: Free tier ($0, forever) and Pro ($12.99 USD, one-time payment, no subscription).',
    '- One Pro license activates on one Mac; it can be moved to a new Mac by deactivating it on the old one.',
    '- 30-day no-questions-asked refund policy on Pro purchases.',
    '- Privacy: all scanning and cleanup analysis happens locally on the Mac. No file contents, names, or paths are ever uploaded to a server.',
    '- Safety: files are always moved to Trash before permanent deletion, never deleted outright.',
    '- Distribution: direct download from the website, not the Mac App Store. No account or signup required.',
    '',
    '## Free tier vs. Pro',
    '| Feature | Free | Pro |',
    '|---|---|---|',
    '| Cleanup (delete / optimize files) | 2 GB total, lifetime | Unlimited |',
    '| Scan & browse duplicates, large/old files, downloads, junk | Unlimited | Unlimited |',
    '| App Uninstaller (removes leftover files) | No | Yes |',
    '| Privacy Cleaner (browser history/cache/cookies, Recent Items, Quick Look cache, clipboard) | No | Yes |',
    '| Startup Manager (login items) | No | Yes |',
    '| Scheduled Scans (automatic background scans) | No | Yes |',
    '| Price | $0 | $12.99 one-time |',
    '',
    '## Product pages',
    `- [Home](${SITE_URL}/): overview, features, pricing, FAQ.`,
    `- [Download](${SITE_URL}/downloads): the universal macOS app, Apple Silicon and Intel.`,
    `- [Pricing](${SITE_URL}/pricing): free tier and Pro plan details.`,
    `- [For developers](${SITE_URL}/developers): the Developer tab — safely clears Xcode DerivedData, node_modules, CocoaPods, Cargo, Gradle, Python environments and package caches, with project-aware safe/review labels.`,
    `- [Changelog](${SITE_URL}/changelog): release notes and version history; the app updates itself.`,
    `- [Safety & privacy](${SITE_URL}/security): Trash-first cleanup, protected paths, local-only scanning, published SHA-256 checksums.`,
    `- [Free Mac Cleaner](${SITE_URL}/free-mac-cleaner): full detail on what's included in the free tier vs. Pro.`,
    `- [vs. CleanMyMac](${SITE_URL}/vs/cleanmymac): price model and feature comparison (CleanMyMac is mainly a yearly subscription; MacDiskCleaner is $12.99 once).`,
    `- [vs. OnyX](${SITE_URL}/vs/onyx): guided storage cleaner vs. free maintenance toolbox.`,
    `- [vs. DaisyDisk](${SITE_URL}/vs/daisydisk): automatic finder of junk/duplicates vs. visual disk map ($9.99).`,
    `- [Clear System Data on Mac](${SITE_URL}/clear-system-data-mac): what macOS "System Data" contains (Time Machine snapshots, caches, logs, device backups, developer data) and how to reduce it safely, with commands.`,
    `- [Contact](${SITE_URL}/contact): support, bug reports, and feature suggestions.`,
    `- [Privacy Policy](${SITE_URL}/privacy)`,
    `- [Terms of Service](${SITE_URL}/terms)`,
    '',
    '## Frequently asked questions',
    'Is MacDiskCleaner safe to use? Yes — it only deletes files you explicitly approve, and everything is moved to Trash before permanent removal.',
    'Is the free version really free? Yes, with no trial period: unlimited scanning and browsing, plus 2 GB of total cleanup, permanently. After 2 GB the app asks for Pro or a license key. Buying Pro from inside the app opens checkout directly and unlocks automatically.',
    'Is Pro a subscription? No — it is a single $12.99 payment with no recurring billing.',
    'How many Macs can one license activate? One Mac per Pro license; deactivate it in the old app (or contact support) to move it to a new Mac.',
    'How is it different from CleanMyMac or OnyX? MacDiskCleaner is a one-time purchase (CleanMyMac is mainly a yearly subscription) and includes a guided duplicate/large-file finder that OnyX lacks. It has no malware scanner.',
    'Does it collect or upload data? No — all analysis is local. Only the license key (with a hashed device ID), the free-plan cleanup total and update checks reach the server.',
    '',
    '## Guides',
    ...posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.description}`),
    '',
    '## Other languages',
    `Every product page and guide above is also available in Spanish, German and French: add /es, /de or /fr before the path (for example ${SITE_URL}/fr/free-mac-cleaner or ${SITE_URL}/de/blog/disk-cleanup-mac). Each language version has its own canonical URL and hreflang alternates. Release notes (changelog), the Privacy Policy and the Terms are English-only.`,
    '',
    '## Full content',
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): every guide in full, with quick answers and FAQs, in one file.`,
  ]

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  })
}
