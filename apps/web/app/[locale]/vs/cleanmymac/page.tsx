import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { pick } from '@/lib/localized'
import { pageMetadata } from '@/lib/seo'
import { vsCleanMyMac } from '@/content/pages/vs'
import { ComparisonPage } from '@/components/site/ComparisonPage'

const PATH = '/vs/cleanmymac'
type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  const c = pick(vsCleanMyMac, locale)
  return pageMetadata({ locale, pathname: PATH, title: c.metaTitle, description: c.metaDescription })
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return <ComparisonPage locale={locale} pathname={PATH} copy={pick(vsCleanMyMac, locale)} />
}
