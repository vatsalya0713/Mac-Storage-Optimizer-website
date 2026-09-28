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
    description: 'Download a free Mac storage cleaner with no trial period. Scan everything for free, forever, and clean up to 2 GB at no cost — duplicates, large files, junk and more.',
    alternates: { canonical: '/free-mac-cleaner' },
  }
}

const FREE_FEATURES = [
  'Scan your whole Mac — every result visible, nothing blurred',
  'Duplicates, large & old files, downloads and junk',
  'Free cleanup up to 2 GB in total (lifetime allowance)',
  'Safe deletion — everything goes to Trash first',
  'No account, no trial period, no credit card',
]

const PRO_UPSELL = [
  'Unlimited cleanup — no 2 GB cap',
  'App uninstaller that removes leftover files',
  'Privacy cleaner & startup manager',
  'Scheduled automatic scans',
]

const FAQS = [
  {
    q: 'Is MacDiskCleaner really free, or is this a trial?',
    a: 'There is no trial period and no expiration. Scanning and browsing are free forever, and you can clean up 2 GB in total for free — permanently, not for a limited time.',
  },
  {
    q: 'What\'s the catch?',
    a: 'The one limit is a 2 GB lifetime cleanup allowance: you can scan as often as you like and see every duplicate, large file and junk item, but once you have deleted 2 GB in total the app asks for Pro (or a license key) before removing more. Pro removes the cap and adds an app uninstaller, privacy cleaner, startup manager, and scheduled scans.',
  },
  {
    q: 'Does it work on my MacBook?',
    a: 'Yes. It supports macOS 12 Monterey through the latest macOS Sequoia release, on both Apple Silicon (M1–M4) and Intel MacBooks.',
  },
  {
    q: 'Is it safe to use a free cleaner?',
    a: 'Yes, as long as it moves files to Trash before permanent deletion — which is exactly how MacDiskCleaner works, on both the free and Pro tiers.',
  },
  {
    q: 'Does the free tier upload any of my data?',
    a: 'No. Scanning and cleanup analysis run entirely on your Mac — nothing about your files is ever sent to a server, free or Pro.',
  },
  {
    q: 'If I upgrade later, do I lose anything from the free tier?',
    a: 'No. Pro is strictly additive — nothing you had is taken away, and space you already cleaned stays cleaned. Pro removes the 2 GB cap and unlocks four extra tools.',
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

      <section className="py-24 px-6">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-3 text-center">How the free tier works</h2>
          <p className="text-[15px] text-[#6E6E73] text-center mb-12 max-w-[480px] mx-auto">Three steps, no account, no trial countdown.</p>
          <svg viewBox="0 0 900 200" className="w-full h-auto" role="img" aria-label="Scan, review, and clean diagram">
            <line x1="150" y1="60" x2="750" y2="60" stroke="#D1D1D6" strokeWidth="2" strokeDasharray="6 6" />
            <g>
              <circle cx="150" cy="60" r="44" fill="#EBF4FF" />
              <path d="M150 40a20 20 0 100 40 20 20 0 000-40zm0 6a14 14 0 110 28 14 14 0 010-28z" fill="#007AFF" transform="translate(0,0)" />
              <circle cx="150" cy="60" r="10" fill="#007AFF" />
              <text x="150" y="132" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1D1D1F">1. Scan</text>
              <text x="150" y="154" textAnchor="middle" fontSize="12.5" fill="#6E6E73">One click, full Mac</text>
            </g>
            <g>
              <circle cx="450" cy="60" r="44" fill="#EDFAF0" />
              <rect x="428" y="42" width="44" height="36" rx="4" fill="none" stroke="#34C759" strokeWidth="3" />
              <line x1="436" y1="52" x2="464" y2="52" stroke="#34C759" strokeWidth="2.5" />
              <line x1="436" y1="61" x2="458" y2="61" stroke="#34C759" strokeWidth="2.5" />
              <line x1="436" y1="70" x2="464" y2="70" stroke="#34C759" strokeWidth="2.5" />
              <text x="450" y="132" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1D1D1F">2. Review</text>
              <text x="450" y="154" textAnchor="middle" fontSize="12.5" fill="#6E6E73">You choose what goes</text>
            </g>
            <g>
              <circle cx="750" cy="60" r="44" fill="#FFF1F0" />
              <path d="M732 46h36l-3 34a4 4 0 01-4 4h-22a4 4 0 01-4-4z" fill="none" stroke="#FF3B30" strokeWidth="3" strokeLinejoin="round" />
              <line x1="726" y1="46" x2="774" y2="46" stroke="#FF3B30" strokeWidth="3" />
              <line x1="742" y1="46" x2="744" y2="38" stroke="#FF3B30" strokeWidth="3" />
              <line x1="758" y1="46" x2="756" y2="38" stroke="#FF3B30" strokeWidth="3" />
              <text x="750" y="132" textAnchor="middle" fontSize="16" fontWeight="700" fill="#1D1D1F">3. Clean</text>
              <text x="750" y="154" textAnchor="middle" fontSize="12.5" fill="#6E6E73">Moved to Trash first</text>
            </g>
          </svg>
        </div>
      </section>

      <section className="py-24 px-6">
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
