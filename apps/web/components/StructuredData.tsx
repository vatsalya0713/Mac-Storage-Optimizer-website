const SITE_URL = 'https://www.macdiskcleaner.com'

const FAQ_ITEMS = [
  {
    q: 'Is MacDiskCleaner safe to use?',
    a: 'Yes. MacDiskCleaner only deletes files you explicitly approve, and everything is moved to Trash before permanent removal so nothing is ever unrecoverable.',
  },
  {
    q: 'Does MacDiskCleaner work on Apple Silicon and Intel Macs?',
    a: 'Yes. MacDiskCleaner supports macOS 12 Monterey and later on both Apple Silicon (M1, M2, M3, M4) and Intel Macs.',
  },
  {
    q: 'Is the free version of MacDiskCleaner really free?',
    a: 'Yes, the free tier is completely free with no trial period, covering basic junk cleaning, a duplicate file scanner, and a large file finder.',
  },
  {
    q: 'How is MacDiskCleaner different from CleanMyMac X?',
    a: 'MacDiskCleaner is a one-time $12.99 purchase with no subscription, is lighter on system resources, and focuses on doing the essential cleanup tasks exceptionally well.',
  },
  {
    q: 'Can I get a refund on MacDiskCleaner Pro?',
    a: 'Yes, MacDiskCleaner offers a full 30-day no-questions-asked refund on all Pro purchases.',
  },
]

export function StructuredData({ locale }: { locale: string }) {
  const path = locale === 'en' ? '' : `/${locale}`
  const url = `${SITE_URL}${path}`

  const organization = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'MacDiskCleaner',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.jpg`,
  }

  const website = {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'MacDiskCleaner',
    publisher: { '@id': `${SITE_URL}/#organization` },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const softwareApplication = {
    '@type': 'SoftwareApplication',
    '@id': `${url}/#software`,
    name: 'MacDiskCleaner',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'macOS 12+',
    url,
    image: `${SITE_URL}/app-icon.jpg`,
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Pro', price: '12.99', priceCurrency: 'USD' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1200',
      bestRating: '5',
    },
  }

  const faqPage =
    locale === 'en'
      ? {
          '@type': 'FAQPage',
          '@id': `${url}/#faq`,
          mainEntity: FAQ_ITEMS.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        }
      : null

  const graph = [organization, website, softwareApplication, faqPage].filter(Boolean)

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  )
}
