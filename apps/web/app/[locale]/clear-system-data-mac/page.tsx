import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AlertTriangle, ChevronRight, Sparkles } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { pick } from '@/lib/localized'
import { pageMetadata } from '@/lib/seo'
import { clearSystemDataCopy } from '@/content/pages/clear-system-data'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/site/PageHero'
import { FaqSection } from '@/components/site/FaqSection'
import { DownloadCTA } from '@/components/site/DownloadCTA'

const PATH = '/clear-system-data-mac'
type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  const c = pick(clearSystemDataCopy, locale)
  return pageMetadata({ locale, pathname: PATH, title: c.metaTitle, description: c.metaDescription })
}

export default async function ClearSystemDataMacPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('common')
  const c = pick(clearSystemDataCopy, locale)

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
          downloadLabel={t('downloadForMac')}
        />

        <section className="pb-16 px-6">
          <div className="max-w-[720px] mx-auto rounded-2xl border border-[#007AFF]/20 bg-[#F5F9FF] px-6 py-5">
            <h2 className="flex items-center gap-1.5 text-[13px] font-bold text-[#007AFF] mb-1.5">
              <Sparkles size={14} /> {c.quickTitle}
            </h2>
            <p className="text-[15px] text-[#1D1D1F] leading-relaxed">{c.quick}</p>
          </div>
        </section>

        <section className="py-16 bg-[#F5F5F7] px-6">
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-[24px] font-extrabold tracking-tight text-[#1D1D1F] mb-6 text-center">{c.insideTitle}</h2>
            <div className="bento-card overflow-hidden">
              {c.inside.map((row) => (
                <div key={row.name} className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-6 px-6 py-4 border-b border-[rgba(0,0,0,0.06)] last:border-0">
                  <p className="text-[15px] font-semibold text-[#1D1D1F]">{row.name}</p>
                  <p className="text-[13px] text-[#6E6E73] font-mono break-all">{row.where}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-3 text-center">{c.manualTitle}</h2>
            <p className="text-[15px] text-[#6E6E73] text-center mb-10">{c.manualLead}</p>
            <ol className="space-y-6">
              {c.manual.map((step) => (
                <li key={step.title} className="bento-card p-6">
                  <h3 className="text-[17px] font-bold text-[#1D1D1F] mb-2">{step.title}</h3>
                  <p className="text-[15px] text-[#424245] leading-relaxed">{step.text}</p>
                  {step.code && (
                    <pre className="mt-3 bg-[#1D1D1F] text-[#F5F5F7] rounded-xl px-4 py-3 text-[13px] overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  )}
                </li>
              ))}
            </ol>

            <div className="mt-10 rounded-2xl border border-[#FFB020]/40 bg-[#FFF6EB] px-6 py-5">
              <h3 className="flex items-center gap-2 text-[16px] font-bold text-[#1D1D1F] mb-3">
                <AlertTriangle size={17} className="text-[#C2410C]" /> {c.avoidTitle}
              </h3>
              <ul className="space-y-2 list-disc pl-5 text-[14px] text-[#424245]">
                {c.avoid.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-10 text-center">{c.fastTitle}</h2>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {c.fast.map((s, i) => (
                <li key={s.title} className="bento-card p-6 text-center">
                  <div className="text-[13px] font-bold text-[#007AFF] mb-2">0{i + 1}</div>
                  <h3 className="text-[15px] font-semibold text-[#1D1D1F] mb-1">{s.title}</h3>
                  <p className="text-[13px] text-[#6E6E73] leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
            <p className="text-center mt-8 text-[14px]">
              <Link href="/blog/how-to-clear-system-data-mac" className="font-semibold text-[#007AFF] inline-flex items-center gap-1">
                {c.guideLink} <ChevronRight size={14} />
              </Link>
            </p>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-[720px] mx-auto">
            <FaqSection items={c.faq} title={t('faqTitle')} />
            <DownloadCTA className="mt-16" title={c.ctaTitle} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
