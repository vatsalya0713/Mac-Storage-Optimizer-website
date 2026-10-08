import { routing, type Locale } from '@/i18n/routing'

export type Localized<T> = Record<Locale, T>

/** The page copy for `locale`, falling back to English for an unknown locale. */
export function pick<T>(content: Localized<T>, locale: string): T {
  return (content as Record<string, T>)[locale] ?? content[routing.defaultLocale]
}
