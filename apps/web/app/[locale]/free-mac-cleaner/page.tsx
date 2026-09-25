import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Check, Download, ChevronRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  // English-only content today (see plan: new landing pages translate once
  // validated) — canonical always points at the unprefixed English URL so a
  // locale-prefixed visit (e.g. /es/free-mac-cleaner, which renders the same
  // English text) doesn't get indexed as separate duplicate content.
  return {
    title: 'Free Mac Cleaner — Clean Junk, Duplicates & Large Files at No Cost',
    description: 'Download a free Mac storage cleaner with no trial period. Clean up to 2 GB of junk, find duplicates, and locate large files — completely free, forever.',
    alternates: { canonical: '/free-mac-cleaner' },
  }
}

const FREE_FEATURES = [
  'Junk file cleanup — up to 2 GB per scan',
  'Full duplicate file scanner, no limits',
  'Full large file finder, no limits',
  'Safe deletion — everything goes to Trash first',
  'No account, no trial period, no credit card',
]

const PRO_UPSELL = [
  'Unlimited junk cleaning (no 2 GB cap)',
  'App uninstaller that removes leftover files',
  'Privacy cleaner & startup manager',
  'Scheduled automatic scans',
]

const FAQS = [
  {
    q: 'Is MacDiskCleaner really free, or is this a trial?',
    a: 'The free tier has no trial period and no expiration. It includes a full duplicate file scanner, a full large file finder, and junk cleanup up to 2 GB per scan — permanently, not for a limited time.',
  },
  {
    q: 'What\'s the catch?',
    a: 'The only limit on the free tier is a 2 GB cap on junk cleaning per scan and a monthly scan limit. Everything else — duplicates, large files — is fully unlocked. Pro removes those limits and adds an app uninstaller, privacy cleaner, and scheduled scans.',
  },
  {
    q: 'Does it work on my MacBook?',
    a: 'Yes. It supports macOS 12 Monterey and later, on both Apple Silicon (M1–M4) and Intel MacBooks.',
  },
  {
    q: 'Is it safe to use a free cleaner?',
    a: 'Yes, as long as it moves files to Trash before permanent deletion — which is exactly how MacDiskCleaner works, on both the free and Pro tiers.',
  },
]

export default async function FreeMacCleanerPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-[820px] mx-auto text-center">
          <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
            <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
            <ChevronRight size={13} />
            <span>Free Mac Cleaner</span>
          </div>
          <h1 className="text-[36px] sm:text-[46px] md:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F] mb-6">
            A free Mac cleaner that's <span className="text-[#007AFF]">actually free.</span>
          </h1>
          <p className="text-[19px] text-[#6E6E73] leading-relaxed max-w-[620px] mx-auto mb-10">
            No trial period. No credit card. Clean junk files, find duplicates, and locate large files hogging your storage — download and start scanning in under a minute.
          </p>
          <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[16px] py-[14px] px-8 inline-flex">
            <Download size={16} /> Download Free for Mac
          </a>
        </div>
      </section>

      <section className="py-20 bg-[#F5F5F7] px-6">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bento-card p-8">
            <p className="text-[14px] font-semibold text-[#007AFF] mb-4">Included free, forever</p>
            <ul className="space-y-3">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-[#1D1D1F]">
                  <Check size={16} className="text-[#34C759] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bento-card p-8">
            <p className="text-[14px] font-semibold text-[#6E6E73] mb-4">Unlocked with Pro ($12.99 one-time)</p>
            <ul className="space-y-3 mb-6">
              {PRO_UPSELL.map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px] text-[#1D1D1F]">
                  <Check size={16} className="text-[#007AFF] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {f}
                </li>
              ))}
            </ul>
            <Link href="/#pricing" className="text-[14px] font-semibold text-[#007AFF] flex items-center gap-1">
              See full Pro details <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-[720px] mx-auto">
          <h2 className="text-[32px] font-extrabold tracking-tight text-[#1D1D1F] mb-10 text-center">Frequently asked</h2>
          <div className="divide-y divide-[rgba(0,0,0,0.06)]">
            {FAQS.map((f) => (
              <details key={f.q} className="group py-5 cursor-pointer">
                <summary className="flex justify-between items-center text-[16px] font-semibold text-[#1D1D1F] list-none">
                  {f.q}
                  <ChevronRight size={17} className="text-[#6E6E73] transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-[15px] text-[#6E6E73] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  )
}
