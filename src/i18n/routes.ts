import type { Locale } from './ui'

/**
 * Localised slug map. Slugs are NOT shared across locales: an Estonian searcher
 * must land on a URL containing an Estonian keyword.
 *
 * This is the single source for cross-language links and hreflang alternates.
 * Adding Russian means adding a `ru` value to every entry.
 */
export const routes = {
  home:     { et: '/',            en: '/en' },
  services: { et: '/teenused',    en: '/en/services' },
  pricing:  { et: '/hinnakiri',   en: '/en/pricing' },
  about:    { et: '/meist',       en: '/en/about' },
  faq:      { et: '/kkk',         en: '/en/faq' },
  contact:  { et: '/kontakt',     en: '/en/contact' },
  areas:    { et: '/piirkonnad',  en: '/en/areas' },
  blog:     { et: '/blogi',       en: '/en/blog' },
} as const satisfies Record<string, Record<Locale, string>>

export type RouteKey = keyof typeof routes
