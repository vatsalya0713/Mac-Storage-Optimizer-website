import { ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { absoluteUrl } from '@/lib/seo'
import { JsonLd } from './JsonLd'

export type Crumb = { label: string; href?: string }

// Visible breadcrumb trail plus BreadcrumbList JSON-LD with absolute,
// locale-correct URLs. The last crumb is the current page (no link).
export function Breadcrumbs({
  locale,
  items,
  pathname,
  align = 'center',
}: {
  locale: string
  items: Crumb[]
  pathname: string
  align?: 'center' | 'left'
}) {
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: items.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.label,
            item: absoluteUrl(locale, c.href ?? pathname),
          })),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className={`flex flex-wrap items-center gap-1.5 text-[13px] text-[#6E6E73] mb-8 ${align === 'center' ? 'justify-center' : ''}`}
      >
        {items.map((c, i) => (
          <span key={`${c.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={13} />}
            {c.href && i < items.length - 1 ? (
              <Link href={c.href} className="hover:text-[#1D1D1F]">
                {c.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? 'page' : undefined}>{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}
