import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ChevronRight, Clock } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { getAllPosts } from '@/lib/blog'
import { absoluteUrl, formatDate, pageMetadata } from '@/lib/seo'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { DownloadCTA } from '@/components/site/DownloadCTA'
import { JsonLd } from '@/components/site/JsonLd'

type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'common' })
  return pageMetadata({ locale, pathname: '/blog', title: t('blogTitle'), description: t('blogDescription') })
}

export default async function BlogIndex({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('common')
  const posts = getAllPosts(locale)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-32">
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: t('blogTitle'),
            description: t('blogDescription'),
            inLanguage: locale,
            url: absoluteUrl(locale, '/blog'),
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: posts.map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: absoluteUrl(p.locale, `/blog/${p.slug}`),
                name: p.title,
              })),
            },
          }}
        />
        <div className="max-w-[820px] mx-auto px-6 break-words hyphens-auto">
          <Breadcrumbs
            locale={locale}
            pathname="/blog"
            align="left"
            items={[{ label: t('home'), href: '/' }, { label: t('blogBreadcrumb') }]}
          />
          <h1 className="text-[40px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F] mb-4">{t('blogH1')}</h1>
          <p className="text-[18px] text-[#6E6E73] mb-14 max-w-[560px]">{t('blogLead')}</p>

          <div className="divide-y divide-[rgba(0,0,0,0.06)]">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-center justify-between gap-6 py-7">
                <div>
                  <h2 className="text-[19px] font-bold text-[#1D1D1F] mb-1.5 group-hover:text-[#007AFF] transition-colors">{post.title}</h2>
                  <p className="text-[15px] text-[#6E6E73] leading-relaxed">{post.description}</p>
                  <p className="flex items-center gap-2 text-[12px] text-[#9A9A9E] mt-2">
                    <span>{formatDate(post.updated ?? post.date, locale)}</span>
                    <span aria-hidden>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={12} /> {t('readTime', { minutes: post.minutes })}
                    </span>
                  </p>
                </div>
                <ChevronRight size={18} className="text-[#6E6E73] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>

          <DownloadCTA className="mt-16" />
        </div>
      </main>
      <Footer />
    </>
  )
}
