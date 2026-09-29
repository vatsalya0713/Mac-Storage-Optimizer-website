import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import latest from '@/public/downloads/latest.json'
import { Check, Download, ChevronRight } from 'lucide-react'
import { AppleLogo } from "@/components/AppleLogo"

export async function generateMetadata(): Promise<Metadata> {
  // English-only content today, same convention as /free-mac-cleaner and
  // /vs/cleanmymac — canonical always points at the unprefixed English URL.
  return {
    title: 'Download MacDiskCleaner for Mac — Apple Silicon & Intel',
    description: 'Download MacDiskCleaner: one universal app that runs natively on both Apple Silicon (M1–M4) and Intel Macs. Free, no account required.',
    alternates: { canonical: '/downloads' },
  }
}

const REQUIREMENTS = [
  'macOS 14 Sonoma or later',
  'Apple Silicon (M1, M2, M3, M4) or Intel processor',
  '50 MB of free disk space',
  'No account or sign-up required',
]

const STEPS = [
  { num: '01', title: 'Open Terminal', desc: 'Applications → Utilities → Terminal (or search "Terminal" in Spotlight).' },
  { num: '02', title: 'Paste the command', desc: 'Copy the line below, paste it in, press Return.' },
  { num: '03', title: 'Done', desc: 'MacDiskCleaner installs and opens automatically — no security prompt. Every future update installs itself the same way.' },
]

export default async function DownloadsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-14 px-6">
          <div className="max-w-[820px] mx-auto text-center">
            <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
              <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
              <ChevronRight size={13} />
              <span>Download</span>
            </div>
            <h1 className="text-[36px] sm:text-[46px] md:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F] mb-6">
              One download. <span className="text-[#007AFF]">Every Mac.</span>
            </h1>
            <p className="text-[19px] text-[#6E6E73] leading-relaxed max-w-[620px] mx-auto mb-3">
              MacDiskCleaner ships as a single universal binary compiled natively for both Apple Silicon and Intel — no need to pick a version, it just runs fast on whichever Mac you have.
            </p>
            <p className="text-[13px] text-[#6E6E73]">
              Version {latest.version} · {(latest.sizeBytes / 1_048_576).toFixed(1)} MB · released{' '}
              {new Date(`${latest.releasedAt}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
              {' · '}
              <Link href="/changelog" className="text-[#007AFF] font-medium">What&apos;s new</Link>
              {' · '}
              <Link href="/security" className="text-[#007AFF] font-medium">Verify checksum</Link>
            </p>
          </div>
        </section>

        <section className="pb-16 px-6">
          <div className="max-w-[720px] mx-auto bento-card p-8 sm:p-10 text-center border-2 border-[#007AFF]/20">
            <p className="text-[12px] font-bold text-[#007AFF] tracking-wide mb-2">RECOMMENDED — INSTALLS WITH NO macOS WARNING</p>
            <h2 className="text-[24px] font-bold text-[#1D1D1F] mb-2">Install from Terminal</h2>
            <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-6 max-w-[520px] mx-auto">
              Because MacDiskCleaner isn&apos;t (yet) on the App Store, macOS normally shows a warning the first time you open an app downloaded from a website. This one command skips that entirely: it downloads the latest version, checks its published checksum, installs it in Applications and opens it — no warning, no extra clicks.
            </p>
            <code className="block bg-[#F5F5F7] rounded-xl px-4 py-3 text-[13px] sm:text-[14px] text-[#1D1D1F] break-all select-all">curl -fsSL https://www.macdiskcleaner.com/install.sh | bash</code>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-[#9A9A9E] mt-4">
              <span>Open Terminal (Applications → Utilities), paste, press Return.</span>
              <a href="/install.sh" className="text-[#007AFF] font-medium">View the script</a>
            </div>
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="max-w-[720px] mx-auto">
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

        <section className="py-16 bg-[#F5F5F7] px-6">
          <div className="max-w-[720px] mx-auto text-center">
            <p className="text-[13px] font-semibold text-[#6E6E73] mb-4">Prefer a regular download?</p>
            <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[15px] py-3 px-7 inline-flex">
              <AppleLogo size={15} /> Download the .dmg <Download size={15} />
            </a>
            <p className="text-[13px] text-[#6E6E73] max-w-[560px] mx-auto mt-5">
              Same universal file for Apple Silicon and Intel. macOS will show a one-time warning before the first launch — see exactly how to get past it just below.
            </p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-[720px] mx-auto bento-card p-8">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[22px] font-bold text-[#1D1D1F]">&quot;Apple could not verify this app...&quot;</h2>
            </div>
            <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-3">
              This is expected for the .dmg download — MacDiskCleaner isn&apos;t on the App Store, so macOS warns before the very first launch. It only happens once.
            </p>
            <p className="text-[14px] text-[#1D1D1F] leading-relaxed mb-5 bg-[#FFF6EB] border border-[#FFB020]/30 rounded-xl px-4 py-3">
              <strong>If the warning only offers &quot;Move to Bin&quot;:</strong> click <strong>Cancel</strong> or <strong>Done</strong> — don&apos;t click Move to Bin, the download is fine. Then follow the steps below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[14px] text-[#1D1D1F]">
              <div>
                <p className="font-semibold mb-2">macOS 15 Sequoia or later</p>
                <ol className="space-y-1.5 list-decimal pl-5 text-[#6E6E73]">
                  <li>Open MacDiskCleaner once; on the warning, click <strong>Done</strong> (not Move to Bin).</li>
                  <li>Open <strong>System Settings → Privacy &amp; Security</strong>.</li>
                  <li>Scroll down, click <strong>Open Anyway</strong> next to MacDiskCleaner, then confirm.</li>
                </ol>
              </div>
              <div>
                <p className="font-semibold mb-2">macOS 14 Sonoma or earlier</p>
                <ol className="space-y-1.5 list-decimal pl-5 text-[#6E6E73]">
                  <li>Right-click (or Control-click) MacDiskCleaner in Applications.</li>
                  <li>Choose <strong>Open</strong>.</li>
                  <li>Click <strong>Open</strong> again in the dialog.</li>
                </ol>
              </div>
            </div>
            <details className="mt-6 text-[13px] text-[#6E6E73]">
              <summary className="cursor-pointer font-semibold text-[#1D1D1F]">Prefer Terminal for an already-downloaded copy?</summary>
              <p className="mt-2">Paste this once, then open the app normally:</p>
              <code className="block mt-2 bg-[#F5F5F7] rounded-lg px-3 py-2 text-[12px] break-all text-[#1D1D1F]">xattr -dr com.apple.quarantine /Applications/MacDiskCleaner.app</code>
            </details>
            <p className="text-[12px] text-[#9A9A9E] mt-5">
              Once past this one-time check, every future update installs itself automatically with no warning at all. You can verify your download with its published checksum on the <Link href="/security" className="text-[#007AFF]">safety page</Link>.
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[560px] mx-auto">
            <h2 className="text-[22px] font-bold text-[#1D1D1F] mb-6 text-center">System requirements</h2>
            <ul className="space-y-3 bento-card p-8">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-[#1D1D1F]">
                  <Check size={16} className="text-[#34C759] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {r}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
