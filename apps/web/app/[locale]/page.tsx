import { getTranslations } from 'next-intl/server'
import { JsonLd } from '@/components/site/JsonLd'
import HomeContent from './HomeContent'

// Server wrapper so the home FAQ's structured data is emitted only here,
// alongside the FAQ visitors actually see (it used to be injected site-wide
// from the layout, which Google treats as markup that doesn't match the page).
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'faq' })
  const items = t.raw('items') as { q: string; a: string }[]

  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          inLanguage: locale,
          mainEntity: items.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <HomeContent />
    </>
  )
}
