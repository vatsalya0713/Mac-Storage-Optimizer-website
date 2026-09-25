import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for MacDiskCleaner.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-32 px-6">
      <div className="max-w-[720px] mx-auto prose prose-lg prose-headings:font-bold">
        <h1>Terms of Service</h1>
        <p className="text-[14px] text-[#6E6E73]">Last updated: January 2026</p>

        <h2>License</h2>
        <p>
          The MacDiskCleaner free tier may be used indefinitely under the limits described on our
          <Link href="/free-mac-cleaner"> Free Mac Cleaner</Link> page. A Pro license is a one-time
          purchase granting a perpetual license to use MacDiskCleaner Pro on up to the number of devices
          shown at checkout, along with lifetime updates.
        </p>

        <h2>Refunds</h2>
        <p>
          We offer a full refund on Pro purchases within 30 days of purchase, no questions asked. Contact
          support@macdiskcleaner.com with your license key to request one.
        </p>

        <h2>Acceptable use</h2>
        <p>
          MacDiskCleaner deletes files only after you review and approve them, moving them to Trash first.
          You are responsible for reviewing what's selected before confirming a cleanup.
        </p>

        <h2>No warranty</h2>
        <p>
          MacDiskCleaner is provided "as is." While we design every deletion to be reversible via Trash
          until you empty it, we're not liable for data loss resulting from files you've explicitly
          confirmed for deletion.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms from time to time; continued use of MacDiskCleaner constitutes acceptance of the current terms.</p>
      </div>
      </main>
      <Footer />
    </>
  )
}
