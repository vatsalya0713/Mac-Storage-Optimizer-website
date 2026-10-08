import type { ComponentProps, ReactNode } from 'react'
import { Link } from '@/i18n/navigation'
import { DownloadCTA } from './DownloadCTA'

// Internal links in articles stay in the reader's language (/fr/… for French
// posts); files, API routes and anchors are left untouched.
function MdxLink({ href = '', children }: { href?: string; children?: ReactNode }) {
  const isInternalPage = href.startsWith('/') && !href.startsWith('/api/') && !/\.[a-z0-9]+(?:$|[?#])/i.test(href)
  if (isInternalPage) return <Link href={href}>{children}</Link>
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return <a href={href}>{children}</a>
}

function Kbd({ children }: { children?: ReactNode }) {
  return (
    <kbd className="inline-block min-w-[1.6em] rounded-md border border-[rgba(0,0,0,0.15)] border-b-2 bg-[#F5F5F7] px-1.5 py-0.5 text-center font-sans text-[0.85em] font-semibold text-[#1D1D1F] not-prose">
      {children}
    </kbd>
  )
}

function Callout({ type = 'tip', children }: { type?: 'tip' | 'warning' | 'note'; children?: ReactNode }) {
  const look =
    type === 'warning'
      ? 'border-[#FFB020]/40 bg-[#FFF6EB]'
      : type === 'note'
        ? 'border-[rgba(0,0,0,0.08)] bg-[#F5F5F7]'
        : 'border-[#34C759]/30 bg-[#F2FBF4]'
  return <div className={`my-6 rounded-2xl border px-5 py-4 text-[15px] leading-relaxed [&>p]:my-1 ${look}`}>{children}</div>
}

// Wide tables (long folder paths) scroll inside their own box on phones
// instead of widening the whole page.
function Table(props: ComponentProps<'table'>) {
  return (
    <div className="-mx-1 overflow-x-auto px-1">
      <table {...props} />
    </div>
  )
}

/** Components available inside every MDX article. */
export function mdxComponents(inlineCta: { title: string; text: string }) {
  return {
    a: MdxLink,
    table: Table,
    Kbd,
    Callout,
    DownloadCTA: () => <DownloadCTA variant="highlight" title={inlineCta.title} text={inlineCta.text} className="my-10" />,
  }
}
