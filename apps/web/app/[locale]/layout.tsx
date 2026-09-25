import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { StructuredData } from '@/components/StructuredData'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  const siteUrl = 'https://macdiskcleaner.com'
  const path = locale === routing.defaultLocale ? '/' : `/${locale}`

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t('homeTitle'),
      template: `%s | ${t('siteName')}`,
    },
    description: t('homeDescription'),
    alternates: {
      canonical: path,
      languages: {
        en: '/',
        es: '/es',
        de: '/de',
        fr: '/fr',
        'x-default': '/',
      },
    },
    icons: {
      icon: '/favicon.png',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      title: t('homeTitle'),
      description: t('homeDescription'),
      url: path,
      siteName: t('siteName'),
      images: ['/hero-macbook.jpg'],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('homeTitle'),
      description: t('homeDescription'),
      images: ['/hero-macbook.jpg'],
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.className} bg-white text-[#1D1D1F] antialiased`} suppressHydrationWarning>
        <StructuredData locale={locale} />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
