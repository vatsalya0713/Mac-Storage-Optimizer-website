import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ChevronRight, Clock, Sparkles } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { getPost, getPostLocales, getPostSlugs, getRelatedPosts } from '@/lib/blog'
import { SITE_URL, absoluteUrl, formatDate, pageMetadata } from '@/lib/seo'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { DownloadCTA } from '@/components/site/DownloadCTA'
import { FaqSection } from '@/components/site/FaqSection'
import { JsonLd } from '@/components/site/JsonLd'
import { mdxComponents } from '@/components/site/MdxComponents'

type Params = { locale: string; slug: string }

export function generateStaticParams() {
  return getPostSlugs(routing.defaultLocale).map((slug) => ({ slug }))
}

// A post that hasn't been translated yet is served in English at the
// localized URL, with its canonical pointing at the English original so the
// two are never indexed as duplicates.
function resolvePost(locale: string, slug: string) {
  const own = getPost(locale, slug)
  if (own) return { post: own, translated: true }
  const fallback = getPost(routing.defaultLocale, slug)
  return fallback ? { post: fallback, translated: false } : null
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params
  const resolved = resolvePost(locale, slug)
  if (!resolved) return {}
  const { meta } = resolved.post
  const contentLocale = resolved.translated ? locale : routing.defaultLocale
  return pageMetadata({
    locale: contentLocale,
    pathname: `/blog/${slug}`,
    title: meta.title,
    description: meta.description,
    available: getPostLocales(slug),
    type: 'article',
    publishedTime: meta.date,
    modifiedTime: meta.updated ?? meta.date,
    keywords: meta.keywords,
  })
}

export default async function BlogPost({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const resolved = resolvePost(locale, slug)
  if (!resolved) notFound()

  const { meta, content } = resolved.post
  const contentLocale = resolved.translated ? locale : routing.defaultLocale
  const t = await getTranslations('common')
  const related = getRelatedPosts(meta)
  const pathname = `/blog/${slug}`
  const modified = meta.updated ?? meta.date

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-32">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: meta.title,
            description: meta.description,
            datePublished: meta.date,
            dateModified: modified,
            inLanguage: contentLocale,
            keywords: meta.keywords.join(', '),
            image: `${SITE_URL}/hero-macbook.jpg`,
            mainEntityOfPage: absoluteUrl(contentLocale, pathname),
            author: { '@type': 'Organization', name: 'MacDiskCleaner', url: SITE_URL },
            publisher: {
              '@type': 'Organization',
              name: 'MacDiskCleaner',
              logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.jpg` },
            },
            about: { '@id': `${SITE_URL}/#software` },
          }}
        />
        <article className="max-w-[720px] mx-auto px-6 break-words hyphens-auto" lang={contentLocale}>
          <Breadcrumbs
            locale={locale}
            pathname={pathname}
            align="left"
            items={[
              { label: t('home'), href: '/' },
              { label: t('blogBreadcrumb'), href: '/blog' },
              { label: meta.title },
            ]}
          />

          <h1 className="text-[32px] md:text-[46px] font-extrabold tracking-[-0.03em] text-[#1D1D1F] leading-tight mb-4">
            {meta.title}
          </h1>
          <p className="text-[17px] text-[#6E6E73] mb-4">{meta.description}</p>
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#9A9A9E] mb-8">
            <span>{t('updated', { date: formatDate(modified, locale) })}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={13} /> {t('readTime', { minutes: meta.minutes })}
            </span>
          </p>

          {meta.tldr && (
            <div className="rounded-2xl border border-[#007AFF]/20 bg-[#F5F9FF] px-5 py-4 mb-8">
              <p className="flex items-center gap-1.5 text-[13px] font-bold text-[#007AFF] mb-1.5">
                <Sparkles size={14} /> {t('quickAnswer')}
              </p>
              <p className="text-[15px] text-[#1D1D1F] leading-relaxed">{meta.tldr}</p>
            </div>
          )}

          <DownloadCTA className="mb-12" />

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#007AFF] prose-a:no-underline hover:prose-a:underline prose-table:text-[15px] prose-code:before:content-none prose-code:after:content-none prose-code:break-words prose-td:align-top">
            <MDXRemote
              source={content}
              components={mdxComponents({ title: t('inlineCtaTitle'), text: t('inlineCtaText') })}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {meta.faq && meta.faq.length > 0 && (
            <FaqSection
              items={meta.faq}
              title={t('faqTitle')}
              className="mt-14"
              headingClassName="text-[26px] font-extrabold tracking-tight text-[#1D1D1F] mb-4"
            />
          )}

          <DownloadCTA className="mt-16" />

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="text-[20px] font-bold text-[#1D1D1F] mb-2">{t('relatedTitle')}</h2>
              <div className="divide-y divide-[rgba(0,0,0,0.06)]">
                {related.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex items-center justify-between gap-6 py-5">
                    <div>
                      <p className="text-[16px] font-semibold text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">{p.title}</p>
                      <p className="text-[14px] text-[#6E6E73] leading-relaxed line-clamp-2">{p.description}</p>
                    </div>
                    <ChevronRight size={17} className="text-[#6E6E73] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
              <Link href="/blog" className="inline-flex items-center gap-1 mt-4 text-[14px] font-semibold text-[#007AFF]">
                {t('allGuides')} <ChevronRight size={14} />
              </Link>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </>
  )
}
