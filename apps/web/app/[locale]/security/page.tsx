import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Trash2, Lock, ShieldCheck, Eye, ListChecks, WifiOff, Feather } from 'lucide-react'
import { pick } from '@/lib/localized'
import { pageMetadata } from '@/lib/seo'
import { getLatestRelease } from '@/lib/latestRelease'
import { securityCopy } from '@/content/pages/security'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/site/PageHero'
import { FaqSection } from '@/components/site/FaqSection'
import { DownloadButton } from '@/components/site/DownloadButton'

const PATH = '/security'
const ICONS = [Trash2, ShieldCheck, ListChecks, WifiOff, Eye, Lock]
type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  const c = pick(securityCopy, locale)
  return pageMetadata({ locale, pathname: PATH, title: c.metaTitle, description: c.metaDescription })
}

export default async function SecurityPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const [t, latest] = await Promise.all([getTranslations('common'), getLatestRelease()])
  const c = pick(securityCopy, locale)
  const size = (latest.sizeBytes / 1_048_576).toFixed(0)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white break-words hyphens-auto">
        <PageHero
          locale={locale}
          pathname={PATH}
          homeLabel={t('home')}
          crumb={c.breadcrumb}
          title={c.h1}
          accent={c.h1Accent}
          lead={c.lead}
          showDownload={false}
        />

        <section className="pb-20 px-6">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {c.promises.map((p, i) => {
              const Icon = ICONS[i] ?? ShieldCheck
              return (
                <div key={p.title} className="bento-card p-7">
                  <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center mb-4">
                    <Icon size={19} className="text-[#007AFF]" />
                  </div>
                  <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-2">{p.title}</h2>
                  <p className="text-[14px] text-[#6E6E73] leading-relaxed">{p.text}</p>
                </div>
              )
            })}
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="max-w-[640px] mx-auto bento-card p-7 flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#34C759]/10 flex items-center justify-center flex-shrink-0">
              <Feather size={19} className="text-[#34C759]" />
            </div>
            <div>
              <h2 className="text-[16px] font-bold text-[#1D1D1F] mb-1.5">{c.sizeTitle.replace('{size}', size)}</h2>
              <p className="text-[14px] text-[#6E6E73] leading-relaxed">{c.sizeText}</p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[640px] mx-auto">
            <h2 className="text-[24px] font-extrabold tracking-tight text-[#1D1D1F] mb-2 text-center">{c.verifyTitle}</h2>
            <p className="text-[14px] text-[#6E6E73] text-center mb-6">{c.verifyText.replace('{version}', latest.version)}</p>
            <div className="bento-card p-6">
              <p className="text-[12px] font-semibold text-[#6E6E73] mb-2">SHA-256</p>
              <code className="block break-all text-[13px] font-mono text-[#1D1D1F]">{latest.sha256}</code>
              <p className="text-[12px] font-semibold text-[#6E6E73] mt-5 mb-2">Terminal</p>
              <code className="block break-all text-[13px] font-mono text-[#1D1D1F] bg-[#F5F5F7] rounded-lg px-3 py-2">
                shasum -a 256 ~/Downloads/MacDiskCleaner.dmg
              </code>
            </div>
            <p className="text-[13px] text-[#6E6E73] mt-5 text-center leading-relaxed">{c.notarizedNote}</p>
            <div className="text-center mt-8">
              <DownloadButton />
            </div>
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
