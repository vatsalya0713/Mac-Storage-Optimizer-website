import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AppleLogo } from '@/components/AppleLogo'
import { ChevronRight, Download } from 'lucide-react'
import changelog from '@/content/changelog.json'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'MacDiskCleaner Changelog — Release Notes & Version History',
    description: 'Every MacDiskCleaner release: new features, fixes and improvements. The app checks for updates automatically and installs them in one click.',
    alternates: { canonical: '/changelog' },
  }
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

export default async function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-12 px-6">
          <div className="max-w-[720px] mx-auto text-center">
            <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
              <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
              <ChevronRight size={13} />
              <span>Changelog</span>
            </div>
            <h1 className="text-[36px] sm:text-[46px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F] mb-5">
              What&apos;s <span className="text-[#007AFF]">new.</span>
            </h1>
            <p className="text-[18px] text-[#6E6E73] leading-relaxed max-w-[560px] mx-auto mb-8">
              MacDiskCleaner checks for updates on its own and installs them in one click — your results, settings and license are kept. You can also choose <strong>MacDiskCleaner → Check for Updates…</strong> any time.
            </p>
            <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[15px] py-3 px-7 inline-flex">
              <AppleLogo size={15} /> Download the latest version <Download size={15} />
            </a>
          </div>
        </section>

        <section className="pb-24 px-6">
          <div className="max-w-[720px] mx-auto space-y-5">
            {changelog.map((release, index) => (
              <article key={release.version} className="bento-card p-8">
                <div className="flex items-baseline justify-between gap-4 mb-4 flex-wrap">
                  <h2 className="text-[22px] font-extrabold text-[#1D1D1F]">
                    Version {release.version}
                    {index === 0 && <span className="ml-3 align-middle text-[11px] font-bold text-[#007AFF] bg-[#007AFF]/10 rounded-full px-2.5 py-1">LATEST</span>}
                  </h2>
                  <time dateTime={release.date} className="text-[13px] text-[#6E6E73]">{formatDate(release.date)}</time>
                </div>
                <ul className="space-y-2.5">
                  {release.notes.map((note) => (
                    <li key={note} className="flex items-start gap-3 text-[15px] text-[#1D1D1F] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#007AFF] flex-shrink-0" /> {note}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
