import type { Metadata } from 'next'

// Post-checkout page: shows the buyer's license key, so it must never be indexed.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: null, languages: {} },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
