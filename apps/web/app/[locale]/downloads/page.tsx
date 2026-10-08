import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Check, Download } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { pick } from '@/lib/localized'
import { formatDate, pageMetadata } from '@/lib/seo'
import { getLatestRelease } from '@/lib/latestRelease'
import { downloadsCopy } from '@/content/pages/downloads'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AppleLogo } from '@/components/AppleLogo'
import { DownloadStarter } from '@/components/DownloadStarter'
import { PageHero } from '@/components/site/PageHero'
import { FaqSection } from '@/components/site/FaqSection'
import { Rich } from '@/components/site/Rich'

const PATH = '/downloads'
type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  const c = pick(downloadsCopy, locale)
  return pageMetadata({ locale, pathname: PATH, title: c.metaTitle, description: c.metaDescription })
}

export default async function DownloadsPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, latest] = await Promise.all([getTranslations('common'), getLatestRelease()])
  const c = pick(downloadsCopy, locale)
  const versionLine = c.versionLine
    .replace('{version}', latest.version)
    .replace('{size}', (latest.sizeBytes / 1_048_576).toFixed(1))
    .replace('{date}', formatDate(latest.releasedAt, locale))

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white break-words hyphens-auto">
        <DownloadStarter />
        <PageHero
          locale={locale}
          pathname={PATH}
          homeLabel={t('home')}
          crumb={c.breadcrumb}
          title={c.h1}
          accent={c.h1Accent}
          lead={c.lead}
          showDownload={false}
        >
          <p className="text-[13px] text-[#6E6E73] -mt-6">
            {versionLine}
            {' · '}
            <Link href="/changelog" className="text-[#007AFF] font-medium">{c.whatsNew}</Link>
            {' · '}
            <Link href="/security" className="text-[#007AFF] font-medium">{c.verify}</Link>
          </p>
        </PageHero>

        <section className="pb-16 px-6">
          <div className="max-w-[720px] mx-auto bento-card p-8 sm:p-10 text-center border-2 border-[#007AFF]/20">
            <p className="text-[12px] font-bold text-[#007AFF] tracking-wide mb-2">{c.recommended}</p>
            <h2 className="text-[24px] font-bold text-[#1D1D1F] mb-2">{c.terminalTitle}</h2>
            <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-6 max-w-[540px] mx-auto">{c.terminalText}</p>
            <code className="block bg-[#F5F5F7] rounded-xl px-4 py-3 text-[13px] sm:text-[14px] text-[#1D1D1F] break-all select-all">
              curl -fsSL https://www.macdiskcleaner.com/install.sh | bash
            </code>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[12px] text-[#9A9A9E] mt-4">
              <span>{c.terminalHint}</span>
              <a href="/install.sh" className="text-[#007AFF] font-medium">{c.viewScript}</a>
            </div>
          </div>
        </section>

        <section className="pb-20 px-6">
          <ol className="max-w-[720px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {c.steps.map((s, i) => (
              <li key={s.title} className="text-center">
                <div className="text-[13px] font-bold text-[#007AFF] mb-2">0{i + 1}</div>
                <p className="text-[15px] font-semibold text-[#1D1D1F] mb-1">{s.title}</p>
                <p className="text-[13px] text-[#6E6E73] leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="py-16 bg-[#F5F5F7] px-6">
          <div className="max-w-[720px] mx-auto text-center">
            <h2 className="text-[13px] font-semibold text-[#6E6E73] mb-4">{c.dmgLabel}</h2>
            <a href="/api/download?src=downloads-page" className="btn-primary text-[15px] py-3 px-7 inline-flex">
              <AppleLogo size={15} /> {c.dmgButton} <Download size={15} />
            </a>
            <p className="text-[13px] text-[#6E6E73] max-w-[560px] mx-auto mt-5">{c.dmgNote}</p>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-[720px] mx-auto bento-card p-8">
            <h2 className="text-[22px] font-bold text-[#1D1D1F] mb-2">{c.gkTitle}</h2>
            <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-3">{c.gkIntro}</p>
            <p className="text-[14px] text-[#1D1D1F] leading-relaxed mb-5 bg-[#FFF6EB] border border-[#FFB020]/30 rounded-xl px-4 py-3">
              <Rich text={c.gkWarning} />
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-[14px] text-[#1D1D1F]">
              <div>
                <h3 className="font-semibold mb-2">{c.gkNewTitle}</h3>
                <ol className="space-y-1.5 list-decimal pl-5 text-[#6E6E73]">
                  {c.gkNewSteps.map((s) => <li key={s}><Rich text={s} /></li>)}
                </ol>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{c.gkOldTitle}</h3>
                <ol className="space-y-1.5 list-decimal pl-5 text-[#6E6E73]">
                  {c.gkOldSteps.map((s) => <li key={s}><Rich text={s} /></li>)}
                </ol>
              </div>
            </div>
            <details className="mt-6 text-[13px] text-[#6E6E73]">
              <summary className="cursor-pointer font-semibold text-[#1D1D1F]">{c.gkTerminalSummary}</summary>
              <p className="mt-2">{c.gkTerminalText}</p>
              <code className="block mt-2 bg-[#F5F5F7] rounded-lg px-3 py-2 text-[12px] break-all text-[#1D1D1F]">
                xattr -dr com.apple.quarantine /Applications/MacDiskCleaner.app
              </code>
            </details>
            <p className="text-[12px] text-[#9A9A9E] mt-5">
              {c.gkFooter}{' '}
              <Link href="/security" className="text-[#007AFF]">{c.verify} →</Link>
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[560px] mx-auto">
            <h2 className="text-[22px] font-bold text-[#1D1D1F] mb-6 text-center">{c.reqTitle}</h2>
            <ul className="space-y-3 bento-card p-8">
              {c.requirements.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[15px] text-[#1D1D1F]">
                  <Check size={16} className="text-[#34C759] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-[720px] mx-auto">
            <FaqSection items={c.faq} title={t('faqTitle')} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
