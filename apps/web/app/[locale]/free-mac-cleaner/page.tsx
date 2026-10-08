import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Check, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { pick } from '@/lib/localized'
import { pageMetadata } from '@/lib/seo'
import { freeMacCleanerCopy } from '@/content/pages/free-mac-cleaner'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/site/PageHero'
import { FaqSection } from '@/components/site/FaqSection'
import { DownloadCTA } from '@/components/site/DownloadCTA'

const PATH = '/free-mac-cleaner'
type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  const c = pick(freeMacCleanerCopy, locale)
  return pageMetadata({ locale, pathname: PATH, title: c.metaTitle, description: c.metaDescription })
}

export default async function FreeMacCleanerPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('common')
  const c = pick(freeMacCleanerCopy, locale)

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

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bento-card p-8">
              <h2 className="text-[14px] font-semibold text-[#007AFF] mb-4">{c.freeLabel}</h2>
              <ul className="space-y-3">
                {c.freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] text-[#1D1D1F]">
                    <Check size={16} className="text-[#34C759] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bento-card p-8">
              <h2 className="text-[14px] font-semibold text-[#6E6E73] mb-4">{c.proLabel}</h2>
              <ul className="space-y-3 mb-6">
                {c.proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] text-[#1D1D1F]">
                    <Check size={16} className="text-[#007AFF] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="text-[14px] font-semibold text-[#007AFF] flex items-center gap-1">
                {c.proLink} <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 px-6">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-3 text-center">{c.howTitle}</h2>
            <p className="text-[15px] text-[#6E6E73] text-center mb-12 max-w-[480px] mx-auto">{c.howLead}</p>
            <ol className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {c.steps.map((s, i) => (
                <li key={s.title} className="bento-card p-7 text-center">
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-[17px] font-bold"
                    style={{ background: ['#EBF4FF', '#EDFAF0', '#FFF1F0'][i], color: ['#007AFF', '#34C759', '#FF3B30'][i] }}
                  >
                    {i + 1}
                  </div>
                  <p className="text-[16px] font-bold text-[#1D1D1F] mb-1">{s.title}</p>
                  <p className="text-[14px] text-[#6E6E73] leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="max-w-[720px] mx-auto bento-card p-8">
            <h2 className="text-[20px] font-bold text-[#1D1D1F] mb-2">{c.compareTitle}</h2>
            <p className="text-[14px] text-[#6E6E73] mb-4">{c.compareLead}</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {c.compareLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-center gap-1 text-[14px] font-semibold text-[#007AFF] hover:underline">
                    <ChevronRight size={14} /> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[720px] mx-auto">
            <FaqSection items={c.faq} title={t('faqTitle')} />
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-[720px] mx-auto">
            <DownloadCTA />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
