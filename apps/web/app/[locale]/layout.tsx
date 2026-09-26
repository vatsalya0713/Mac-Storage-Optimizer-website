import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { StructuredData } from '@/components/StructuredData'
import '../globals.css'

const GA_MEASUREMENT_ID = 'G-77S20B60EY'

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
  const siteUrl = 'https://www.macdiskcleaner.com'
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
    verification: {
      google: 'K-3hGrI5bp9mqpqdkG1kn986ZE7B_rFpdolftpeZJo8',
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
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
