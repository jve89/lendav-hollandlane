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
  /**
   * The inspection line — the second pillar, added 8 August 2026.
   *
   * A STATIC page, deliberately, and that is the whole reason it was cheap.
   * `services` is a section whose leaves come from a content collection, so its
   * children pair across locales through `i18n/collections.ts` and every one of
   * them has to be handed to `BaseLayout` as an `alternates` prop. This entry is
   * the page, not a section: the two slugs sit here, `alternates('inspection')`
   * pairs them, and the sitemap picks the pair up out of the built `<head>` with
   * no further work. See ARCHITECTURE section 3.
   *
   * It is NOT a service and must not become one. There is no `/pesu` counterpart
   * and the cleaning card on the home page points at this `services` index —
   * adding a seventh `serviceKey` for inspection would put it in the price
   * table, the services grid and the quote form's collection-derived options,
   * all of which describe cleaning work with a published per-m² price.
   */
  inspection: { et: '/inspektsioon', en: '/en/inspection' },
  pricing:  { et: '/hinnakiri',   en: '/en/pricing' },
  about:    { et: '/meist',       en: '/en/about' },
  faq:      { et: '/kkk',         en: '/en/faq' },
  contact:  { et: '/kontakt',     en: '/en/contact' },
  /**
   * Where Formspree redirects after a successful POST, via the `_next` hidden
   * field. Never linked from anywhere on the site and deliberately absent from
   * `navOrder`; it exists as a route key so the URL is built by `path()` from
   * this map like every other, rather than typed into a component.
   */
  thanks:   { et: '/aitah',       en: '/en/thank-you' },
  /**
   * The privacy policy. Deliberately NOT in `navOrder`: it belongs in the footer,
   * where a reader looks for it, and putting it in the main menu would spend one
   * of five nav slots on the page nobody arrives wanting.
   */
  privacy:  { et: '/privaatsus',  en: '/en/privacy' },
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
 * `inspection` IS DELIBERATELY NOT IN `navOrder`, AND IT IS NOT AN OVERSIGHT —
 * it was added here on 8 August 2026 and taken out again the same day.
 *
 * It is in `builtRoutes` below, so `path('inspection', locale)` resolves and the
 * page is built, indexed and paired for hreflang like any other. What it is not
 * is a menu item. The page is reached from three in-page pointers — a section on
 * both home pages, a note under the services grid, and a block under the price
 * table — each of which arrives in the middle of a washing argument, at the
 * moment the offer is relevant. A sixth nav entry competes with the five that
 * carry the washing journey and gives a visitor no reason to click it.
 *
 * Note the consequence, since it is the reason this comment is here rather than
 * in a commit message: `Footer.astro` renders `liveNav` too, so leaving the key
 * out of `navOrder` is also what keeps inspection out of the footer. There is no
 * second list to remember. See SPEC section 11 — inspection is a POINTER
 * wherever the washing set appears, never a MEMBER of it.
 */

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
  /**
   * The inspection pillar, 8 August 2026 — added LAST, after both pages built
   * and `npm run links` was green on them, exactly as the note above requires.
   * Adding it first would have put `/inspektsioon` and `/en/inspection` into
   * the navigation of every page on the site at once, and failed the link check
   * on all thirty of them rather than on the two that were missing.
   */
  'inspection',
  'pricing',
  'about',
  'faq',
  /**
   * Phase 6. Adding `contact` here is what turns every quote CTA on the site
   * into a link to the form: `Hero`, `Cta` and `Header` each resolve their
   * target as `builtRoutes.has('contact') ? path('contact', locale) : mailto:…`
   * and none of the three needed editing. That conditional was written in
   * Phase 1 for this moment.
   */
  'contact',
  'thanks',
  /** Phase 9. Linked from the footer's bottom row, on every page. */
  'privacy',
  'notFound',
])

/** The navigation entries that currently resolve to a real page. */
export const liveNav = navOrder.filter((key) => builtRoutes.has(key))
