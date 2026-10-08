import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Check, ChevronRight, Hammer, Shield, FolderGit2, RotateCcw } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { pick } from '@/lib/localized'
import { pageMetadata } from '@/lib/seo'
import { developersCopy } from '@/content/pages/developers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/site/PageHero'
import { FaqSection } from '@/components/site/FaqSection'
import { DownloadCTA } from '@/components/site/DownloadCTA'

const PATH = '/developers'
const SAFETY_ICONS = [FolderGit2, Shield, RotateCcw, Hammer]
type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  const c = pick(developersCopy, locale)
  return pageMetadata({ locale, pathname: PATH, title: c.metaTitle, description: c.metaDescription })
}

export default async function DevelopersPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('common')
  const c = pick(developersCopy, locale)

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
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-3 text-center">{c.findsTitle}</h2>
            <p className="text-[15px] text-[#6E6E73] text-center mb-10 max-w-[520px] mx-auto">{c.findsLead}</p>
            <div className="bento-card overflow-hidden">
              <div className="hidden md:grid grid-cols-[180px_1fr_1fr] gap-6 px-6 py-3 bg-[#FAFAFA] border-b border-[rgba(0,0,0,0.06)] text-[12px] font-semibold text-[#6E6E73] uppercase tracking-wide">
                <span>{c.colTool}</span>
                <span>{c.colItems}</span>
                <span>{c.colRestore}</span>
              </div>
              {c.targets.map((row) => (
                <div key={row.tool} className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] gap-2 md:gap-6 px-6 py-5 border-b border-[rgba(0,0,0,0.06)] last:border-0">
                  <p className="text-[15px] font-bold text-[#1D1D1F]">{row.tool}</p>
                  <p className="text-[14px] text-[#1D1D1F]">{row.items}</p>
                  <p className="text-[14px] text-[#6E6E73] font-mono">{row.restore}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-10 text-center">{c.safetyTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {c.safety.map((s, i) => {
                const Icon = SAFETY_ICONS[i] ?? Shield
                return (
                  <div key={s.title} className="bento-card p-7">
                    <div className="w-10 h-10 rounded-xl bg-[#007AFF]/10 flex items-center justify-center mb-4">
                      <Icon size={19} className="text-[#007AFF]" />
                    </div>
                    <h3 className="text-[16px] font-bold text-[#1D1D1F] mb-2">{s.title}</h3>
                    <p className="text-[14px] text-[#6E6E73] leading-relaxed">{s.text}</p>
                  </div>
                )
              })}
            </div>
            <p className="text-center mt-8 text-[14px]">
              <Link href="/security" className="font-semibold text-[#007AFF] inline-flex items-center gap-1">
                {c.safetyLink} <ChevronRight size={14} />
              </Link>
            </p>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[560px] mx-auto">
            <h2 className="text-[22px] font-bold text-[#1D1D1F] mb-6 text-center">{c.pricingTitle}</h2>
            <ul className="space-y-3 bento-card p-8">
              {c.pricingPoints.map((r) => (
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
            <DownloadCTA className="mt-16" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
