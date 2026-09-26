import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ContactForm } from './ContactForm'

// English-only by design, same as /free-mac-cleaner, /vs/cleanmymac, and
// the blog — no `languages` alternates so untranslated locale URLs aren't
// advertised as duplicate content.
export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Questions, bug reports, or feature suggestions for MacDiskCleaner — get in touch.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactForm />
      <Footer />
    </>
  )
}
