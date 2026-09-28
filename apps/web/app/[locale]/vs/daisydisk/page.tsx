import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Check, X, Download, ChevronRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  // English-only content today — canonical pinned to the unprefixed URL
  // (see the same note in app/[locale]/free-mac-cleaner/page.tsx).
  return {
    title: 'MacDiskCleaner vs DaisyDisk — Full Comparison',
    description: 'Compare MacDiskCleaner and DaisyDisk on features and price. DaisyDisk visualizes disk space; MacDiskCleaner finds and safely removes what\'s wasting it.',
    alternates: { canonical: '/vs/daisydisk' },
  }
}

type Row = { label: string; mdc: boolean | string; daisy: boolean | string }

const ROWS: Row[] = [
  { label: 'Price', mdc: 'Free + $12.99 one-time', daisy: 'One-time purchase' },
  { label: 'Visual disk space map', mdc: false, daisy: true },
  { label: 'Junk file cleaner', mdc: true, daisy: false },
  { label: 'Duplicate file finder', mdc: true, daisy: false },
  { label: 'Large file scanner', mdc: true, daisy: 'Manual, via the map view' },
  { label: 'App uninstaller (removes leftovers)', mdc: true, daisy: false },
  { label: 'Privacy cleaner', mdc: true, daisy: false },
  { label: 'Scheduled automatic scans', mdc: true, daisy: false },
  { label: 'Free tier available', mdc: true, daisy: false },
  { label: 'Files reviewed before deletion', mdc: true, daisy: true },
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

const FAQS = [
  {
    q: 'What does DaisyDisk do differently?',
    a: 'DaisyDisk\'s strength is its visual "sunburst" map of what\'s using your disk space — you explore folders visually and delete manually. It doesn\'t scan for duplicates, junk, or leftover app files automatically.',
  },
  {
    q: 'Can I use both?',
    a: 'Sure — some people use a visual disk-map tool to explore storage and a guided cleaner like MacDiskCleaner for automated junk/duplicate detection and safe removal. They solve different parts of the same problem.',
  },
  {
    q: 'Does MacDiskCleaner show a visual breakdown too?',
    a: 'Yes — the Storage view shows a breakdown by folder and file type, though DaisyDisk\'s interactive sunburst visualization is more detailed for manually exploring exactly where space went.',
  },
]

export default async function VsDaisyDiskPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-[820px] mx-auto text-center">
            <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
              <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
              <ChevronRight size={13} />
              <span>vs. DaisyDisk</span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] md:text-[52px] font-extrabold tracking-[-0.03em] leading-[1.08] text-[#1D1D1F] mb-6">
              MacDiskCleaner vs DaisyDisk
            </h1>
            <p className="text-[18px] text-[#6E6E73] leading-relaxed max-w-[620px] mx-auto">
              DaisyDisk shows you a beautiful visual map of your disk — then you manually decide what to delete. MacDiskCleaner automatically finds junk, duplicates, and large files, and includes a genuinely free tier.
            </p>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="max-w-[760px] mx-auto overflow-x-auto">
            <table className="w-full border-collapse bento-card overflow-hidden">
              <thead>
                <tr className="bg-[#F5F5F7] border-b border-[rgba(0,0,0,0.06)]">
                  <th className="text-left p-4 text-[13px] font-semibold text-[#6E6E73]">&nbsp;</th>
                  <th className="p-4 text-[14px] font-bold text-[#007AFF]">MacDiskCleaner</th>
                  <th className="p-4 text-[14px] font-bold text-[#1D1D1F]">DaisyDisk</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-[rgba(0,0,0,0.06)] last:border-0">
                    <td className="p-4 text-[14px] text-[#1D1D1F] font-medium">{row.label}</td>
                    <td className="p-4 text-center"><Cell value={row.mdc} /></td>
                    <td className="p-4 text-center"><Cell value={row.daisy} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="py-24 bg-[#F5F5F7] px-6">
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
