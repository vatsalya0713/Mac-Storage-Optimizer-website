import { getTranslations } from 'next-intl/server'
import { getLatestRelease } from '@/lib/latestRelease'
import { DownloadButton } from './DownloadButton'

// Download card shown at the top and bottom of every article and landing
// page (and usable inside MDX). Version and size come from the current
// release, so the copy is always accurate after an update.
export async function DownloadCTA({
  title,
  text,
  variant = 'card',
  className = '',
}: {
  title?: string
  text?: string
  variant?: 'card' | 'highlight'
  className?: string
}) {
  const [t, latest] = await Promise.all([getTranslations('common'), getLatestRelease()])
  const size = (latest.sizeBytes / 1_048_576).toFixed(1)
  return (
    <div
      className={`not-prose bento-card p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left ${
        variant === 'highlight' ? 'border-2 border-[#007AFF]/20 bg-[#F5F9FF]' : ''
      } ${className}`}
    >
      <div>
        <p className="text-[17px] font-bold text-[#1D1D1F] mb-1">{title ?? t('ctaTitle')}</p>
        <p className="text-[14px] text-[#6E6E73] leading-relaxed">{text ?? t('ctaSubtitle')}</p>
        <p className="text-[12px] text-[#9A9A9E] mt-1.5">{t('versionLine', { version: latest.version, size })}</p>
      </div>
      <DownloadButton />
    </div>
  )
}
