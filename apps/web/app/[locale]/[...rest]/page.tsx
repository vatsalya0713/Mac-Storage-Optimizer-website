import { notFound } from 'next/navigation'

// Any unknown URL lands here so the branded not-found page renders inside the
// normal site layout (with the correct 404 status).
export default function CatchAll() {
  notFound()
}
