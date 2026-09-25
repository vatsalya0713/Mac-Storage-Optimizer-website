import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { getAllPosts } from '@/lib/blog'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ChevronRight } from 'lucide-react'

export async function generateMetadata(): Promise<Metadata> {
  // English-only content today — canonical pinned to the unprefixed URL
  // (see the note in app/[locale]/free-mac-cleaner/page.tsx).
  return {
    title: 'Mac Cleanup Guides & Storage Tips',
    description: 'Practical guides for freeing up space, removing junk files, and keeping your Mac fast — from the team behind MacDiskCleaner.',
    alternates: { canonical: '/blog' },
  }
}

export default async function BlogIndex() {
  const posts = getAllPosts('en') // English cornerstone content today; see content/blog for locale expansion

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-32">
        <div className="max-w-[820px] mx-auto px-6">
          <h1 className="text-[40px] md:text-[52px] font-extrabold tracking-[-0.03em] text-[#1D1D1F] mb-4">
            Mac Cleanup Guides
          </h1>
          <p className="text-[18px] text-[#6E6E73] mb-14 max-w-[560px]">
            Practical, tested guides for freeing up space and keeping your Mac fast.
          </p>

          <div className="divide-y divide-[rgba(0,0,0,0.06)]">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex items-center justify-between gap-6 py-7">
                <div>
                  <h2 className="text-[19px] font-bold text-[#1D1D1F] mb-1.5 group-hover:text-[#007AFF] transition-colors">{post.title}</h2>
                  <p className="text-[15px] text-[#6E6E73] leading-relaxed">{post.description}</p>
                </div>
                <ChevronRight size={18} className="text-[#6E6E73] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
