import type { Metadata } from 'next'
import fs from 'node:fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { notFound } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { getPostSlugs, getPostPath, getPostFrontmatter } from '@/lib/blog'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ChevronRight, Download } from 'lucide-react'

export function generateStaticParams() {
  return getPostSlugs('en').map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const meta = getPostFrontmatter('en', slug)
  if (!meta) return {}

  // English-only content today — canonical pinned to the unprefixed URL
  // (see the note in app/[locale]/free-mac-cleaner/page.tsx).
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'article',
      publishedTime: meta.date,
    },
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { slug } = await params
  const filePath = getPostPath('en', slug)

  if (!fs.existsSync(filePath)) notFound()

  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    datePublished: data.date,
    author: { '@type': 'Organization', name: 'MacDiskCleaner' },
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pt-32 pb-32">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <article className="max-w-[720px] mx-auto px-6">
          <div className="flex items-center gap-1.5 text-[13px] text-[#6E6E73] mb-8">
            <Link href="/" className="hover:text-[#1D1D1F]">MacDiskCleaner</Link>
            <ChevronRight size={13} />
            <Link href="/blog" className="hover:text-[#1D1D1F]">Blog</Link>
          </div>

          <h1 className="text-[32px] md:text-[46px] font-extrabold tracking-[-0.03em] text-[#1D1D1F] leading-tight mb-4">
            {data.title}
          </h1>
          <p className="text-[17px] text-[#6E6E73] mb-6">{data.description}</p>

          <a
            href="/downloads/MacDiskCleaner.dmg"
            className="btn-primary text-[14px] py-2.5 px-6 inline-flex mb-12"
          >
            <Download size={15} /> Download Free
          </a>

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:no-underline hover:prose-a:underline prose-table:text-[15px]">
            <MDXRemote
              source={content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          <div className="mt-16 bento-card p-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-[17px] font-bold text-[#1D1D1F] mb-1">Ready to clean up your Mac?</p>
              <p className="text-[14px] text-[#6E6E73]">Free to download. No account required to start.</p>
            </div>
            <a href="/downloads/MacDiskCleaner.dmg" className="btn-primary text-[14px] py-3 px-6 flex-shrink-0">
              <Download size={15} /> Download Free
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
