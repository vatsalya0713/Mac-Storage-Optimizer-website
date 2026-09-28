import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Check, Download, ChevronRight } from 'lucide-react'
import { AppleLogo } from "@/components/AppleLogo"

export async function generateMetadata(): Promise<Metadata> {
  // English-only content today, same convention as /free-mac-cleaner and
  // /vs/cleanmymac — canonical always points at the unprefixed English URL.
  return {
    title: 'How to Clear System Data on Mac (2026 Guide)',
    description: 'System Data is usually the biggest, least helpful storage category on your Mac. Here\'s what it actually is and how to safely reduce it.',
    alternates: { canonical: '/clear-system-data-mac' },
  }
}

const WHATS_INSIDE = [
  'App caches and logs that accumulate silently over months',
  'Leftover files from apps you uninstalled without removing their support files',
  'Old iOS/iPadOS device backups stored on your Mac',
  'Time Machine local snapshots',
  'Temporary files and swap files macOS creates and forgets to clean up',
]

const STEPS = [
  { num: '01', title: 'See the real breakdown', desc: 'MacDiskCleaner scans your Mac and shows what\'s actually inside System Data by folder and file type — not just a mystery number.' },
  { num: '02', title: 'Attack the biggest categories', desc: 'Caches and dev caches are usually the largest recoverable chunk, followed by logs and old backups.' },
  { num: '03', title: 'Clean safely', desc: 'Everything identified is moved to Trash first, never deleted outright, so nothing is ever unrecoverable.' },
]

const FAQS = [
  {
    q: 'What exactly is "System Data" on a Mac?',
    a: 'It\'s a catch-all category Apple\'s own Storage view uses for anything that isn\'t Apps, Documents, Photos, or a few other named categories — mostly caches, logs, temporary files, and old backups. Unlike other categories, you can\'t click into it in About This Mac to see what\'s inside.',
  },
  {
    q: 'Is it safe to delete System Data?',
    a: 'You can\'t delete "System Data" directly — it isn\'t one folder. What\'s safe is clearing the individual caches, logs, and leftover files that make it up, which is exactly what a proper cleanup tool targets.',
  },
  {
    q: 'Why does System Data keep growing back?',
    a: 'Caches and logs regenerate as you use apps and macOS itself. A one-time cleanup helps immediately, but scheduled scans (MacDiskCleaner Pro) catch it again before it becomes a "storage full" emergency.',
  },
  {
    q: 'How much space can clearing System Data recover?',
    a: 'Highly variable, but 20–50 GB is typical for a Mac that\'s never been cleaned. If you\'ve cleaned recently, expect less since caches take time to regenerate.',
  },
]

export default async function ClearSystemDataMacPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-[820px] mx-auto text-center">
            <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
              <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
              <ChevronRight size={13} />
              <span>Clear System Data</span>
            </div>
            <h1 className="text-[36px] sm:text-[46px] md:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F] mb-6">
              Clear "System Data" <span className="text-[#007AFF]">the right way.</span>
            </h1>
            <p className="text-[19px] text-[#6E6E73] leading-relaxed max-w-[620px] mx-auto mb-10">
              "System Data" is usually the biggest, least helpful category in About This Mac → Storage. Here's what's actually inside it, and how to safely reduce it.
            </p>
            <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[16px] py-[14px] px-8 inline-flex">
              <AppleLogo size={16} /> Download Free for Mac
            </a>
          </div>
        </section>

        <section className="py-16 bg-[#F5F5F7] px-6">
          <div className="max-w-[720px] mx-auto bento-card p-8">
            <h2 className="text-[20px] font-bold text-[#1D1D1F] mb-5">What's usually inside System Data</h2>
            <ul className="space-y-3">
              {WHATS_INSIDE.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[15px] text-[#1D1D1F]">
                  <Check size={16} className="text-[#34C759] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {w}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-10 text-center">Three steps to a real fix</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {STEPS.map((s) => (
                <div key={s.num} className="text-center">
                  <div className="text-[13px] font-bold text-[#007AFF] mb-2">{s.num}</div>
                  <p className="text-[15px] font-semibold text-[#1D1D1F] mb-1">{s.title}</p>
                  <p className="text-[13px] text-[#6E6E73] leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-10 text-center">Frequently asked</h2>
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

        <section className="mt-16 mb-24 px-6">
          <div className="max-w-[720px] mx-auto bento-card p-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-[17px] font-bold text-[#1D1D1F] mb-1">Ready to see what's really in System Data?</p>
              <p className="text-[14px] text-[#6E6E73]">Free to download. No account required to start.</p>
            </div>
            <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[14px] py-3 px-6 flex-shrink-0">
              <AppleLogo size={15} /> Download Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
