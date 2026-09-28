import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import latest from '@/public/downloads/latest.json'
import { Check, Cpu, Download, ChevronRight } from 'lucide-react'
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
  { num: '01', title: 'Open the .dmg file', desc: 'Your browser downloads it directly — no installer wizard.' },
  { num: '02', title: 'Drag to Applications', desc: 'Drop the MacDiskCleaner icon into your Applications folder.' },
  { num: '03', title: 'Open and scan', desc: 'Launch it from Applications. The first time, macOS may ask you to confirm (see the note below) — that only happens once, and later updates install themselves.' },
]

export default async function DownloadsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-[820px] mx-auto text-center">
            <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
              <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
              <ChevronRight size={13} />
              <span>Download</span>
            </div>
            <h1 className="text-[36px] sm:text-[46px] md:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F] mb-6">
              One download. <span className="text-[#007AFF]">Every Mac.</span>
            </h1>
            <p className="text-[19px] text-[#6E6E73] leading-relaxed max-w-[620px] mx-auto mb-10">
              MacDiskCleaner ships as a single universal binary compiled natively for both Apple Silicon and Intel — no need to pick a version, it just runs fast on whichever Mac you have.
            </p>
            <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[16px] py-[14px] px-8 inline-flex">
              <AppleLogo size={16} /> Download Free for Mac
            </a>
            <p className="text-[13px] text-[#6E6E73] mt-5">
              Version {latest.version} · {(latest.sizeBytes / 1_048_576).toFixed(1)} MB · released{' '}
              {new Date(`${latest.releasedAt}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
              {' · '}
              <Link href="/changelog" className="text-[#007AFF] font-medium">What&apos;s new</Link>
              {' · '}
              <Link href="/security" className="text-[#007AFF] font-medium">Verify checksum</Link>
            </p>
          </div>
        </section>

        <section className="pt-4 pb-16 px-6">
          <div className="max-w-[720px] mx-auto bento-card p-8 text-center">
            <p className="text-[13px] font-semibold text-[#007AFF] mb-2">FASTEST INSTALL — NO macOS WARNING</p>
            <h2 className="text-[22px] font-bold text-[#1D1D1F] mb-2">Install from Terminal in one line</h2>
            <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-5 max-w-[520px] mx-auto">
              Open Terminal, paste this, press Return. It downloads the latest version, checks its published checksum, installs it in Applications and opens it — with no security prompt.
            </p>
            <code className="block bg-[#F5F5F7] rounded-xl px-4 py-3 text-[13px] text-[#1D1D1F] break-all select-all">curl -fsSL https://www.macdiskcleaner.com/install.sh | bash</code>
            <p className="text-[12px] text-[#9A9A9E] mt-4">
              Prefer to read it first? <a href="/install.sh" className="text-[#007AFF]">View the script</a>. Or use the regular download above.
            </p>
          </div>
        </section>

        <section className="py-16 bg-[#F5F5F7] px-6">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            <a href="/downloads/MacDiskCleaner.dmg" className="bento-card p-8 hover:shadow-lg transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#007AFF]/10 flex items-center justify-center mb-4">
                <Cpu size={20} className="text-[#007AFF]" />
              </div>
              <p className="text-[17px] font-bold text-[#1D1D1F] mb-1">Apple Silicon</p>
              <p className="text-[14px] text-[#6E6E73] mb-4">M1, M2, M3, and M4 Macs — runs fully native, no Rosetta.</p>
              <span className="text-[14px] font-semibold text-[#007AFF] flex items-center gap-1">
                Download <ChevronRight size={14} />
              </span>
            </a>
            <a href="/downloads/MacDiskCleaner.dmg" className="bento-card p-8 hover:shadow-lg transition-shadow">
              <div className="w-11 h-11 rounded-xl bg-[#6E6E73]/10 flex items-center justify-center mb-4">
                <Cpu size={20} className="text-[#6E6E73]" />
              </div>
              <p className="text-[17px] font-bold text-[#1D1D1F] mb-1">Intel</p>
              <p className="text-[14px] text-[#6E6E73] mb-4">Any Intel-based Mac — the same download, natively compiled.</p>
              <span className="text-[14px] font-semibold text-[#007AFF] flex items-center gap-1">
                Download <ChevronRight size={14} />
              </span>
            </a>
          </div>
          <p className="text-[13px] text-[#6E6E73] text-center max-w-[560px] mx-auto mt-6">
            Both buttons download the exact same file — it's a universal binary containing native code for both chip architectures, so macOS automatically runs the right one. Nothing to choose, nothing to get wrong.
          </p>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-10 text-center">Installing takes under a minute</h2>
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

        <section className="py-16 px-6">
          <div className="max-w-[720px] mx-auto bento-card p-8">
            <h2 className="text-[22px] font-bold text-[#1D1D1F] mb-2">If macOS says it can&apos;t open the app</h2>
            <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-5">
              MacDiskCleaner is downloaded directly from this website rather than the App Store, so macOS asks you to confirm the first launch. It takes ten seconds:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[14px] text-[#1D1D1F]">
              <div>
                <p className="font-semibold mb-2">macOS 15 Sequoia or later</p>
                <ol className="space-y-1.5 list-decimal pl-5 text-[#6E6E73]">
                  <li>Open MacDiskCleaner once and click <strong>Done</strong> on the warning.</li>
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
              <summary className="cursor-pointer font-semibold text-[#1D1D1F]">Prefer Terminal?</summary>
              <p className="mt-2">Paste this once, then open the app normally:</p>
              <code className="block mt-2 bg-[#F5F5F7] rounded-lg px-3 py-2 text-[12px] break-all text-[#1D1D1F]">xattr -dr com.apple.quarantine /Applications/MacDiskCleaner.app</code>
            </details>
            <p className="text-[12px] text-[#9A9A9E] mt-5">
              You can verify your download with its published checksum on the <Link href="/security" className="text-[#007AFF]">safety page</Link>.
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
