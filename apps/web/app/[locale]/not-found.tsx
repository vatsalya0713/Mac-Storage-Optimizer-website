import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { DownloadButton } from '@/components/site/DownloadButton'

export default function NotFound() {
  const t = useTranslations('notFound')
  const tc = useTranslations('common')
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-white flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-[520px] text-center">
          <p className="text-[13px] font-bold text-[#007AFF] mb-3">404</p>
          <h1 className="text-[36px] sm:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F] mb-4">{t('title')}</h1>
          <p className="text-[16px] text-[#6E6E73] leading-relaxed mb-8">{t('text')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <DownloadButton label={tc('downloadForMac')} />
            <Link href="/" className="text-[14px] font-semibold text-[#007AFF] px-4 py-3">{t('home')}</Link>
            <Link href="/pricing" className="text-[14px] font-semibold text-[#007AFF] px-4 py-3">{t('pricing')}</Link>
            <Link href="/blog" className="text-[14px] font-semibold text-[#007AFF] px-4 py-3">{t('guides')}</Link>
            <Link href="/contact" className="text-[14px] font-semibold text-[#007AFF] px-4 py-3">{t('contact')}</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
