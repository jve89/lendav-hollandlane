import type { Locale } from './ui'

/**
 * Localised slug map. Slugs are NOT shared across locales: an Estonian searcher
 * must land on a URL containing an Estonian keyword.
 *
 * This is the single source for cross-language links and hreflang alternates
 * OF STATIC PAGES. It is not the whole story since Phase 4: a page whose slug
 * comes from a content collection — a service, and later a location or a post —
 * has its slug in frontmatter, not here, and pairs across locales through the
 * collection instead. `i18n/collections.ts` builds those alternates and
 * `BaseLayout` takes them as a prop. The route keys below still name the
 * section such a page belongs to, which is what its breadcrumb, its navigation
 * highlight and the first segment of its URL are built from.
 *
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
  notFound: { et: '/404',         en: '/en/404' },
} as const satisfies Record<string, Record<Locale, string>>

export type RouteKey = keyof typeof routes

/**
 * The navigation, in order. Header and footer both read this, so the two can
 * never drift apart.
 */
export const navOrder = [
  'services',
  'pricing',
  'about',
  'faq',
  'contact',
] as const satisfies readonly RouteKey[]

/**
 * Routes that have a built page RIGHT NOW.
 *
 * Navigation renders only these. A link to a page that does not exist yet fails
 * `npm run links`, which is the gate — so rather than weakening the gate or
 * shipping empty placeholder pages, each phase adds its own routes here as they
 * land: Phase 5 adds `pricing`/`about`/`faq`, Phase 6 `contact`, Phase 7
 * `areas`, Phase 8 `blog`.
 *
 * Add the key LAST, after the pages build. Adding `services` early makes every
 * page in the site emit `/teenused` and `/en/services`, so one missing index
 * fails `npm run links` on all of them at once.
 *
 * This is also why a future session cannot accidentally ship a nav link to a 404.
 */
export const builtRoutes: ReadonlySet<RouteKey> = new Set<RouteKey>([
  'home',
  'services',
  'pricing',
  'about',
  'faq',
  'notFound',
])

/** The navigation entries that currently resolve to a real page. */
export const liveNav = navOrder.filter((key) => builtRoutes.has(key))
