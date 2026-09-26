import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

// English-only by design, same as /free-mac-cleaner, /vs/cleanmymac, and
// the blog — no `languages` alternates so untranslated locale URLs aren't
// advertised as duplicate content.
export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How MacDiskCleaner collects, uses, and protects your data.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-32 px-6">
      <div className="max-w-[720px] mx-auto prose prose-lg prose-headings:font-bold">
        <h1>Privacy Policy</h1>
        <p className="text-[14px] text-[#6E6E73]">Last updated: January 2026</p>

        <h2>What we collect</h2>
        <p>
          When you purchase MacDiskCleaner Pro, we collect your email address and name to generate and deliver
          your license key, and to provide support. Payment details are handled entirely by our payment
          processor, Dodo Payments — we never see or store your card details.
        </p>

        <h2>What the app itself accesses</h2>
        <p>
          MacDiskCleaner runs locally on your Mac and scans your file system to identify junk files, duplicates,
          and large files. It does not upload your file contents, file names, or scan results to our servers.
          The only network requests the app makes are to validate your license key.
        </p>

        <h2>Data we store</h2>
        <p>
          We store your license key, the email address associated with it, and a device identifier for each
          Mac you've activated it on (used only to enforce your plan's device limit). This data is kept for
          as long as your license is active, or as required by law.
        </p>

        <h2>Third parties</h2>
        <p>
          We use Dodo Payments (payment processing), Resend (transactional email), and Supabase (database
          hosting) to operate MacDiskCleaner. Each processes only the minimum data needed for their function.
        </p>

        <h2>Your rights</h2>
        <p>
          You can request a copy of your data or ask us to delete it at any time by contacting
          support@macdiskcleaner.com.
        </p>
      </div>
      </main>
      <Footer />
    </>
  )
}
