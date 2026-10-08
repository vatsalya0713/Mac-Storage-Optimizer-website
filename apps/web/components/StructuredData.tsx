import latest from '@/public/downloads/latest.json'

// Site-wide entities only (organization, website, the app itself). Page-level
// markup such as FAQPage and BreadcrumbList is emitted by the page that
// visibly shows that content.
const SITE_URL = 'https://www.macdiskcleaner.com'

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
  }

  const softwareApplication = {
    '@type': 'SoftwareApplication',
    '@id': `${url}/#software`,
    name: 'MacDiskCleaner',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'macOS 14+',
    softwareVersion: latest.version,
    fileSize: `${Math.round(latest.sizeBytes / 1_048_576)}MB`,
    downloadUrl: `${SITE_URL}/api/download`,
    releaseNotes: `${SITE_URL}/changelog`,
    datePublished: latest.releasedAt,
    url,
    image: `${SITE_URL}/app-icon.jpg`,
    offers: [
      { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Pro', price: '12.99', priceCurrency: 'USD' },
    ],
  }

  const graph = [organization, website, softwareApplication]

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }) }}
    />
  )
}
