import type { ReactNode } from 'react'
import { Breadcrumbs } from './Breadcrumbs'
import { DownloadButton } from './DownloadButton'

// Shared hero for landing pages: breadcrumb trail, H1 with an accented tail,
// lead paragraph and (optionally) the download button.
export function PageHero({
  locale,
  pathname,
  homeLabel,
  crumb,
  title,
  accent,
  lead,
  showDownload = true,
  downloadLabel,
  children,
}: {
  locale: string
  pathname: string
  homeLabel: string
  crumb: string
  title: string
  accent?: string
  lead: string
  showDownload?: boolean
  downloadLabel?: string
  children?: ReactNode
}) {
  return (
    <section className="pt-32 pb-16 px-6">
      <div className="max-w-[820px] mx-auto text-center break-words hyphens-auto">
        <Breadcrumbs locale={locale} pathname={pathname} items={[{ label: homeLabel, href: '/' }, { label: crumb }]} />
        <h1 className="text-[34px] sm:text-[44px] md:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.06] text-[#1D1D1F] mb-6">
          {title}
          {accent && (
            <>
              {' '}
              <span className="text-[#007AFF]">{accent}</span>
            </>
          )}
        </h1>
        <p className="text-[18px] sm:text-[19px] text-[#6E6E73] leading-relaxed max-w-[640px] mx-auto mb-10">{lead}</p>
        {showDownload && <DownloadButton size="lg" label={downloadLabel} />}
        {children}
      </div>
    </section>
  )
}
