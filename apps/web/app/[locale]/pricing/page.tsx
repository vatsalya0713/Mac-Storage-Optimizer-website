import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Check } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { pick } from '@/lib/localized'
import { pageMetadata } from '@/lib/seo'
import { pricingCopy } from '@/content/pages/pricing'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageHero } from '@/components/site/PageHero'
import { FaqSection } from '@/components/site/FaqSection'
import { DownloadButton } from '@/components/site/DownloadButton'

const PATH = '/pricing'
type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  const c = pick(pricingCopy, locale)
  return pageMetadata({ locale, pathname: PATH, title: c.metaTitle, description: c.metaDescription })
}

export default async function PricingPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('common')
  const c = pick(pricingCopy, locale)

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
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bento-card p-8 flex flex-col">
              <h2 className="text-[14px] font-semibold text-[#6E6E73] mb-1">{c.freeName}</h2>
              <p className="text-[40px] font-extrabold text-[#1D1D1F] mb-1">$0</p>
              <p className="text-[13px] text-[#6E6E73] mb-6">{c.freeSub}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {c.freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px] text-[#1D1D1F]">
                    <Check size={16} className="text-[#34C759] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {f}
                  </li>
                ))}
              </ul>
              <DownloadButton variant="outline" className="w-full" />
            </div>

            <div className="bento-card p-8 border-2 border-[#007AFF] relative flex flex-col">
              <span className="absolute -top-3 left-8 bg-[#007AFF] text-white text-[11px] font-bold px-3 py-1 rounded-full">{c.proBadge}</span>
              <h2 className="text-[14px] font-semibold text-[#007AFF] mb-1">{c.proName}</h2>
              <p className="text-[40px] font-extrabold text-[#1D1D1F] mb-1">$12.99</p>
              <p className="text-[13px] text-[#6E6E73] mb-6">{c.proSub}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {c.proFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px] text-[#1D1D1F]">
                    <Check size={16} className="text-[#007AFF] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {f}
                  </li>
                ))}
              </ul>
              <Link href={{ pathname: '/', hash: 'pricing' }} className="btn-primary text-[14px] py-3 px-6 w-full justify-center inline-flex">
                {c.proCta}
              </Link>
            </div>
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="max-w-[760px] mx-auto">
            <h2 className="text-[24px] font-extrabold tracking-tight text-[#1D1D1F] mb-6 text-center">{c.compareTitle}</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bento-card overflow-hidden text-[14px]">
                <thead>
                  <tr className="bg-[#F5F5F7] border-b border-[rgba(0,0,0,0.06)]">
                    <th className="text-left p-4 font-semibold text-[#6E6E73]">&nbsp;</th>
                    <th className="p-4 font-bold text-[#1D1D1F]">{c.freeName}</th>
                    <th className="p-4 font-bold text-[#007AFF]">{c.proName}</th>
                  </tr>
                </thead>
                <tbody>
                  {c.compareRows.map((r) => (
                    <tr key={r.label} className="border-b border-[rgba(0,0,0,0.06)] last:border-0">
                      <td className="p-4 text-[#1D1D1F] font-medium">{r.label}</td>
                      <td className="p-4 text-center text-[#6E6E73]">{r.free}</td>
                      <td className="p-4 text-center text-[#1D1D1F] font-semibold">{r.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[720px] mx-auto">
            <FaqSection items={c.faq} title={c.faqTitle} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
