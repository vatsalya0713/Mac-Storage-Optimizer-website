import { getTranslations } from 'next-intl/server'
import { Check, ChevronRight, X } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Cell, ComparisonCopy } from '@/content/pages/vs'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { PageHero } from './PageHero'
import { FaqSection } from './FaqSection'
import { DownloadCTA } from './DownloadCTA'

function CellView({ value }: { value: Cell }) {
  if (value === true) return <Check size={18} className="text-[#34C759] mx-auto" strokeWidth={2.5} aria-label="Yes" />
  if (value === false) return <X size={18} className="text-[#D1D1D6] mx-auto" strokeWidth={2.5} aria-label="No" />
  return <span className="text-[13px] text-[#1D1D1F] font-medium">{value}</span>
}

// Shared layout for the /vs/* pages: hero, feature table, key differences,
// verdict cards, FAQ (with FAQPage markup) and a download CTA.
export async function ComparisonPage({ locale, pathname, copy: c }: { locale: string; pathname: string; copy: ComparisonCopy }) {
  const t = await getTranslations('common')
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white break-words hyphens-auto">
        <PageHero locale={locale} pathname={pathname} homeLabel={t('home')} crumb={c.breadcrumb} title={c.h1} lead={c.lead} showDownload={false} />

        <section className="px-6 pb-6">
          <div className="max-w-[900px] mx-auto overflow-x-auto">
            <table className="w-full border-collapse bento-card overflow-hidden min-w-[560px]">
              <thead>
                <tr className="bg-[#F5F5F7] border-b border-[rgba(0,0,0,0.06)]">
                  <th className="text-left p-4 text-[13px] font-semibold text-[#6E6E73]">&nbsp;</th>
                  {c.columns.map((col, i) => (
                    <th key={col} scope="col" className={`p-4 text-[14px] font-bold ${i === 0 ? 'text-[#007AFF]' : 'text-[#1D1D1F]'}`}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((row) => (
                  <tr key={row.label} className="border-b border-[rgba(0,0,0,0.06)] last:border-0">
                    <th scope="row" className="p-4 text-left text-[14px] text-[#1D1D1F] font-medium">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className="p-4 text-center">
                        <CellView value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="max-w-[900px] mx-auto text-[12px] text-[#9A9A9E] mt-3">{c.tableNote}</p>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-8 text-center">{c.differencesTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {c.differences.map((d) => (
                <div key={d.title} className="bento-card p-7">
                  <h3 className="text-[16px] font-bold text-[#1D1D1F] mb-2">{d.title}</h3>
                  <p className="text-[14px] text-[#6E6E73] leading-relaxed">{d.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-8 text-center">{c.verdictTitle}</h2>
            <div className={`grid grid-cols-1 gap-5 ${c.verdicts.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
              {c.verdicts.map((v, i) => (
                <div key={v.name} className={`bento-card p-7 ${i === 0 ? 'border-2 border-[#007AFF]/30' : ''}`}>
                  <h3 className="feature-title">{v.name}</h3>
                  <p className="feature-desc">{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-6">
          <div className="max-w-[720px] mx-auto">
            <FaqSection items={c.faq} title={t('faqTitle')} />
            <DownloadCTA className="mt-16" title={c.ctaTitle} text={c.ctaText} />
            <ul className="mt-10 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2 justify-center">
              {c.related.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} className="text-[14px] font-semibold text-[#007AFF] inline-flex items-center gap-1 hover:underline">
                    <ChevronRight size={14} /> {r.label}
                  </Link>
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
