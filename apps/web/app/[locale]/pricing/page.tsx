import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Check, Download, ChevronRight } from 'lucide-react'
import { AppleLogo } from "@/components/AppleLogo"

export async function generateMetadata(): Promise<Metadata> {
  // English-only content today, same convention as /free-mac-cleaner and
  // /vs/cleanmymac — canonical always points at the unprefixed English URL.
  return {
    title: 'MacDiskCleaner Pricing — Free Tier & $12.99 One-Time Pro',
    description: 'MacDiskCleaner pricing: scan everything free and clean up to 2 GB at no cost, then unlock unlimited cleanup with a $12.99 one-time Pro purchase — no subscription, ever.',
    alternates: { canonical: '/pricing' },
  }
}

const FREE_FEATURES = [
  'Scan your whole Mac — nothing hidden or blurred',
  'Duplicates, large & old files, downloads and junk, all visible',
  'Free cleanup up to 2 GB in total (lifetime allowance)',
  'Unlimited scans',
  'Safe deletion — everything goes to Trash first',
]

const PRO_FEATURES = [
  'Unlimited cleanup — no 2 GB cap',
  'App Uninstaller — removes leftover support files',
  'Privacy Cleaner — browser history, cache, cookies, Recent Items',
  'Startup Manager — see and disable login items',
  'Scheduled Scans — automatic background scanning',
  'Lifetime updates',
  'Priority support',
]

const FAQS = [
  {
    q: 'Is Pro a subscription?',
    a: 'No. It\'s a single $12.99 payment — no recurring billing, ever. You own the license.',
  },
  {
    q: 'How many Macs can one license activate?',
    a: 'Each Pro license activates on one Mac. Getting a new Mac? Choose Deactivate License in the old app (or contact support) and activate it on the new one.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes — a full 30-day no-questions-asked refund on all Pro purchases. Email support@macdiskcleaner.com with your license key.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'Card, Apple Pay, and Google Pay, all in USD, processed securely at checkout.',
  },
  {
    q: 'What happens when I reach the free 2 GB?',
    a: 'Scanning and browsing stay free forever — you can always see everything MacDiskCleaner finds. Once you have cleaned up 2 GB in total, the app asks for Pro (or a license key) before it deletes anything more. The 2 GB is a lifetime allowance, not a monthly one.',
  },
  {
    q: 'If I stay on the free tier, does anything expire?',
    a: 'No. There is no trial period and nothing expires — scanning and browsing are free forever, and your 2 GB cleanup allowance never resets or disappears.',
  },
]

export default async function PricingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-[820px] mx-auto text-center">
            <div className="flex items-center justify-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
              <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
              <ChevronRight size={13} />
              <span>Pricing</span>
            </div>
            <h1 className="text-[36px] sm:text-[46px] md:text-[60px] font-extrabold tracking-[-0.03em] leading-[1.05] text-[#1D1D1F] mb-6">
              Simple. Honest. <span className="text-[#007AFF]">One price.</span>
            </h1>
            <p className="text-[19px] text-[#6E6E73] leading-relaxed max-w-[620px] mx-auto">
              No subscriptions. No hidden fees. Pay once for Pro, or use a genuinely free tier forever.
            </p>
          </div>
        </section>

        <section className="pb-20 px-6">
          <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bento-card p-8">
              <p className="text-[14px] font-semibold text-[#6E6E73] mb-1">Free</p>
              <p className="text-[40px] font-extrabold text-[#1D1D1F] mb-1">$0</p>
              <p className="text-[13px] text-[#6E6E73] mb-6">Forever free, always.</p>
              <ul className="space-y-3 mb-8">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px] text-[#1D1D1F]">
                    <Check size={16} className="text-[#34C759] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {f}
                  </li>
                ))}
              </ul>
              <a
                href="/api/download"
                className="text-[14px] font-semibold py-3 px-6 w-full justify-center inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.12)] text-[#1D1D1F] hover:bg-[#F5F5F7] transition-colors"
              >
                <AppleLogo size={15} /> Download Free <Download size={15} />
              </a>
            </div>

            <div className="bento-card p-8 border-2 border-[#007AFF] relative">
              <span className="absolute -top-3 left-8 bg-[#007AFF] text-white text-[11px] font-bold px-3 py-1 rounded-full">BEST VALUE</span>
              <p className="text-[14px] font-semibold text-[#007AFF] mb-1">Pro</p>
              <p className="text-[40px] font-extrabold text-[#1D1D1F] mb-1">$12.99</p>
              <p className="text-[13px] text-[#6E6E73] mb-6">One-time. No subscription ever.</p>
              <ul className="space-y-3 mb-8">
                {PRO_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14px] text-[#1D1D1F]">
                    <Check size={16} className="text-[#007AFF] flex-shrink-0 mt-0.5" strokeWidth={2.5} /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/#pricing" className="btn-primary text-[14px] py-3 px-6 w-full justify-center inline-flex">
                Get Pro — $12.99
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#F5F5F7] px-6">
          <div className="max-w-[720px] mx-auto">
            <h2 className="text-[28px] font-extrabold tracking-tight text-[#1D1D1F] mb-10 text-center">Pricing questions</h2>
            <div className="divide-y divide-[rgba(0,0,0,0.06)]">
              {FAQS.map((f) => (
                <details key={f.q} className="group py-5 cursor-pointer">
                  <summary className="flex justify-between items-center text-[16px] font-semibold text-[#1D1D1F] list-none">
                    {f.q}
                    <ChevronRight size={17} className="text-[#6E6E73] transition-transform group-open:rotate-90" />
                  </summary>
                  <p className="mt-3 text-[15px] text-[#6E6E73] leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
