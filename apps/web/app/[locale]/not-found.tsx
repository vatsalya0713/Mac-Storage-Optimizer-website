import { Download } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AppleLogo } from '@/components/AppleLogo'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-white flex items-center justify-center px-6 pt-32 pb-20">
        <div className="max-w-[520px] text-center">
          <p className="text-[13px] font-bold text-[#007AFF] mb-3">404</p>
          <h1 className="text-[36px] sm:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F] mb-4">
            That page isn&apos;t here.
          </h1>
          <p className="text-[16px] text-[#6E6E73] leading-relaxed mb-8">
            The link may be old or mistyped. Here are the places most people are looking for:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="/downloads" className="btn-primary text-[14px] py-3 px-6 inline-flex">
              <AppleLogo size={14} /> Download for Mac <Download size={14} />
            </a>
            <Link href="/" className="text-[14px] font-semibold text-[#007AFF] px-4 py-3">Home</Link>
            <Link href="/pricing" className="text-[14px] font-semibold text-[#007AFF] px-4 py-3">Pricing</Link>
            <Link href="/contact" className="text-[14px] font-semibold text-[#007AFF] px-4 py-3">Contact support</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
