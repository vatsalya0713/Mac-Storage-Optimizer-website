import { useLocale, useTranslations } from 'next-intl'
import { Download } from 'lucide-react'
import { localizedPath } from '@/lib/seo'
import { AppleLogo } from '@/components/AppleLogo'

// The one download button used across pages and articles. It always goes to
// the visitor's own-language /downloads?start=1, which starts the latest
// release (resolved server-side by /api/download) and shows how to open it —
// so a new release never needs a link changed anywhere.
//
// It is a plain <a>, not a client-side Link, on purpose: a full page load
// guarantees the downloads page mounts and starts the download, even when the
// visitor is already on /downloads.
export function downloadHref(locale: string) {
  return `${localizedPath(locale, '/downloads')}?start=1`
}

export function DownloadButton({
  label,
  size = 'md',
  variant = 'primary',
  className = '',
}: {
  label?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'outline'
  className?: string
}) {
  const t = useTranslations('common')
  const locale = useLocale()
  const sizing =
    size === 'lg' ? 'text-[16px] py-[14px] px-8' : size === 'sm' ? 'text-[13px] py-2.5 px-5' : 'text-[14px] py-3 px-6'
  const icon = size === 'lg' ? 16 : 15
  const look =
    variant === 'primary'
      ? 'btn-primary'
      : 'inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.12)] text-[#1D1D1F] font-semibold hover:bg-[#F5F5F7] transition-colors'
  return (
    <a href={downloadHref(locale)} className={`${look} ${sizing} inline-flex justify-center flex-shrink-0 ${className}`}>
      <AppleLogo size={icon} /> {label ?? t('download')} <Download size={icon} />
    </a>
  )
}
