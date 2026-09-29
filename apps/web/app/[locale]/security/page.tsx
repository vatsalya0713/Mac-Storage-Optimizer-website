import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AppleLogo } from '@/components/AppleLogo'
import { ChevronRight, Trash2, Lock, ShieldCheck, Eye, ListChecks, WifiOff, Download } from 'lucide-react'
import latest from '@/public/downloads/latest.json'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Is MacDiskCleaner Safe? How It Protects Your Files & Privacy',
    description:
      'MacDiskCleaner moves everything to the Trash, blocks protected system paths, works locally with no file uploads, and verifies every update with a published SHA-256 checksum.',
    alternates: { canonical: '/security' },
  }
}

const PROMISES = [
  { icon: Trash2, title: 'Everything goes to the Trash first', text: 'No file is erased outright. Cleanup uses macOS Trash, so anything you remove can be put back until you empty it.' },
  { icon: ShieldCheck, title: 'Protected paths are off limits', text: 'System folders, your Keychains, Preferences and privacy databases are on a hard block list. Every deletion is validated against it right before it happens — the last line of defence, independent of the screen you clicked from.' },
  { icon: ListChecks, title: 'You approve every deletion', text: 'Nothing is selected for you without a label. Recently used projects, Xcode archives and similar items are marked "Review first" and left unselected.' },
  { icon: WifiOff, title: 'Scanning stays on your Mac', text: 'File names, paths and contents are analysed locally and never uploaded. The only network calls are license activation, checkout, and the update check.' },
  { icon: Eye, title: 'Transparent about what it sees', text: 'You choose what a scan covers and where. Results are stored only on your Mac and can be cleared any time.' },
  { icon: Lock, title: 'Verified updates', text: 'Each release publishes a SHA-256 checksum. The built-in updater refuses to install a download that doesn\'t match it.' },
]

export default async function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-[820px] mx-auto text-center">
            <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
              <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
              <ChevronRight size={13} />
              <span>Safety &amp; privacy</span>
            </div>
            <h1 className="text-[36px] sm:text-[46px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F] mb-6">
              Built to be <span className="text-[#007AFF]">safe to trust.</span>
            </h1>
            <p className="text-[19px] text-[#6E6E73] leading-relaxed max-w-[620px] mx-auto">
              A cleaner is only useful if you can trust it with your files. Here is exactly how MacDiskCleaner protects them.
            </p>
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROMISES.map((p) => (
              <div key={p.title} className="bento-card p-7">
                <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center mb-4">
                  <p.icon size={19} className="text-[#007AFF]" />
                </div>
                <p className="text-[16px] font-bold text-[#1D1D1F] mb-2">{p.title}</p>
                <p className="text-[14px] text-[#6E6E73] leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[640px] mx-auto">
            <h2 className="text-[24px] font-extrabold tracking-tight text-[#1D1D1F] mb-2 text-center">Verify your download</h2>
            <p className="text-[14px] text-[#6E6E73] text-center mb-6">
              Version {latest.version}. Compare this checksum with your file: <code className="text-[12px]">shasum -a 256 MacDiskCleaner-{latest.version}.dmg</code>
            </p>
            <div className="bento-card p-6">
              <p className="text-[12px] font-semibold text-[#6E6E73] mb-2">SHA-256</p>
              <code className="block break-all text-[13px] font-mono text-[#1D1D1F]">{latest.sha256}</code>
            </div>
            <p className="text-[13px] text-[#6E6E73] mt-5 text-center leading-relaxed">
              MacDiskCleaner is distributed directly from this website. Because it isn&apos;t yet notarized by Apple, macOS asks you to confirm the first launch — see the steps on the download page. After that, updates install themselves.
            </p>
            <div className="text-center mt-8">
              <a href="/api/download" className="btn-primary text-[15px] py-3 px-7 inline-flex">
                <AppleLogo size={15} /> Download for Mac <Download size={15} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
