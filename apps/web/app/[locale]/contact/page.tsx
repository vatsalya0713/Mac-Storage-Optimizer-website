import type { Metadata } from 'next'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ContactForm } from './ContactForm'

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
