import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Check, X, Download, ChevronRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  // English-only content today — canonical pinned to the unprefixed URL
  // (see the same note in app/[locale]/free-mac-cleaner/page.tsx).
  return {
    title: 'MacDiskCleaner vs CleanMyMac X vs OnyX — Full Comparison',
    description: 'Compare MacDiskCleaner, CleanMyMac X, and OnyX on price, features, and safety. See which Mac cleaner fits before you download.',
    alternates: { canonical: '/vs/cleanmymac' },
  }
}

type Row = { label: string; mdc: boolean | string; cmm: boolean | string; onyx: boolean | string }

const ROWS: Row[] = [
  { label: 'Price', mdc: 'Free + $12.99 one-time', cmm: 'Subscription', onyx: 'Free' },
  { label: 'Junk file cleaner', mdc: true, cmm: true, onyx: true },
  { label: 'Duplicate finder', mdc: true, cmm: true, onyx: false },
  { label: 'Large file scanner', mdc: true, cmm: true, onyx: false },
  { label: 'App uninstaller (removes leftovers)', mdc: true, cmm: true, onyx: false },
  { label: 'Privacy cleaner', mdc: true, cmm: true, onyx: false },
  { label: 'Scheduled automatic scans', mdc: true, cmm: true, onyx: false },
  { label: 'Beginner-friendly guided UI', mdc: true, cmm: true, onyx: false },
  { label: 'Files reviewed before deletion', mdc: true, cmm: true, onyx: 'Varies' },
]

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === 'boolean') {
    return value ? (
      <Check size={18} className="text-[#34C759] mx-auto" strokeWidth={2.5} />
    ) : (
      <X size={18} className="text-[#D1D1D6] mx-auto" strokeWidth={2.5} />
    )
  }
  return <span className="text-[13px] text-[#1D1D1F] font-medium">{value}</span>
}

export default async function VsCleanMyMacPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-[820px] mx-auto text-center">
          <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
            <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
            <ChevronRight size={13} />
            <span>vs. CleanMyMac X</span>
          </div>
          <h1 className="text-[32px] sm:text-[40px] md:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.08] text-[#1D1D1F] mb-6">
            MacDiskCleaner vs CleanMyMac X vs OnyX
          </h1>
          <p className="text-[18px] text-[#6E6E73] leading-relaxed max-w-[620px] mx-auto">
            Same job — freeing up space and keeping your Mac clean — three very different approaches to price and complexity. Here's the honest comparison.
          </p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-[900px] mx-auto overflow-x-auto">
          <table className="w-full border-collapse bento-card overflow-hidden">
            <thead>
              <tr className="bg-[#F5F5F7] border-b border-[rgba(0,0,0,0.06)]">
                <th className="text-left p-4 text-[13px] font-semibold text-[#6E6E73]">&nbsp;</th>
                <th className="p-4 text-[14px] font-bold text-[#007AFF]">MacDiskCleaner</th>
                <th className="p-4 text-[14px] font-bold text-[#1D1D1F]">CleanMyMac X</th>
                <th className="p-4 text-[14px] font-bold text-[#1D1D1F]">OnyX</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label} className="border-b border-[rgba(0,0,0,0.06)] last:border-0">
                  <td className="p-4 text-[14px] text-[#1D1D1F] font-medium">{row.label}</td>
                  <td className="p-4 text-center"><Cell value={row.mdc} /></td>
                  <td className="p-4 text-center"><Cell value={row.cmm} /></td>
                  <td className="p-4 text-center"><Cell value={row.onyx} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F7] px-6">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          <div className="bento-card p-7">
            <h3 className="feature-title">MacDiskCleaner</h3>
            <p className="feature-desc">Best if subscription fatigue is why you're looking for an alternative in the first place. One-time $12.99, genuinely useful free tier.</p>
          </div>
          <div className="bento-card p-7">
            <h3 className="feature-title">CleanMyMac X</h3>
            <p className="feature-desc">Best if you want the widest possible feature set and don't mind paying for it every year.</p>
          </div>
          <div className="bento-card p-7">
            <h3 className="feature-title">OnyX</h3>
            <p className="feature-desc">Best for technically confident users who want free, manual system maintenance tools with no guided cleanup.</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <h2 className="text-[32px] font-extrabold tracking-tight text-[#1D1D1F] mb-4">Try it before you decide</h2>
        <p className="text-[16px] text-[#6E6E73] mb-8">Free download, no account required.</p>
        <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[16px] py-[14px] px-8 inline-flex">
          <Download size={16} /> Download Free
        </a>
      </section>
      </main>
      <Footer />
    </>
  )
}
