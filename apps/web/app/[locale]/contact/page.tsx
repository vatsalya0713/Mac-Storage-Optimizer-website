import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { pageMetadata } from '@/lib/seo'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ContactForm } from './ContactForm'

type Params = { locale: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })
  return pageMetadata({ locale, pathname: '/contact', title: t('metaTitle'), description: t('metaDescription') })
}

export default async function ContactPage({ params }: { params: Promise<Params> }) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <Navbar />
      <ContactForm />
      <Footer />
    </>
  )
}
