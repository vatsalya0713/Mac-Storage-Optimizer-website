import { ChevronRight } from 'lucide-react'
import { JsonLd } from './JsonLd'

export type FaqItem = { q: string; a: string }

// Visible FAQ + matching FAQPage JSON-LD. Structured data must describe
// content the reader can actually see, so the markup is only ever emitted
// next to the rendered questions — never site-wide.
export function FaqSection({
  items,
  title,
  className = '',
  headingClassName = 'text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-8 text-center',
}: {
  items: FaqItem[]
  title: string
  className?: string
  headingClassName?: string
}) {
  if (!items.length) return null
  return (
    <section className={`not-prose ${className}`}>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }}
      />
      <h2 className={headingClassName}>{title}</h2>
      <div className="divide-y divide-[rgba(0,0,0,0.06)]">
        {items.map((f) => (
          <details key={f.q} className="group py-5 cursor-pointer">
            <summary className="flex justify-between items-center gap-4 text-[16px] font-semibold text-[#1D1D1F] list-none">
              {f.q}
              <ChevronRight size={17} className="text-[#6E6E73] flex-shrink-0 transition-transform group-open:rotate-90" />
            </summary>
            <p className="mt-3 text-[15px] text-[#6E6E73] leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
