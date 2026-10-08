import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es', 'de', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  // No automatic redirects based on Accept-Language or a remembered cookie:
  // every URL always serves the language it names. Search engines (and
  // visitors following a shared link) must be able to reach each version;
  // hreflang tells Google which one to show, and the language switcher lets
  // people change it themselves.
  localeDetection: false,
  // hreflang is emitted per page in the HTML (lib/seo.ts), which knows which
  // pages are really translated. The middleware's automatic Link header would
  // advertise /es|/de|/fr versions of English-only pages too, contradicting
  // their canonicals.
  alternateLinks: false,
})

export type Locale = (typeof routing.locales)[number]
