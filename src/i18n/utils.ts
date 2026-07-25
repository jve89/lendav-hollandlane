import { ui, defaultLocale, locales, type Locale, type UIKey } from './ui'
import { routes, type RouteKey } from './routes'

/** Derive the active locale from a URL pathname. */
export function getLocale(pathname: string): Locale {
  const seg = pathname.split('/').filter(Boolean)[0]
  return (locales as readonly string[]).includes(seg ?? '') ? (seg as Locale) : defaultLocale
}

/** Translate a UI key. Missing keys are a compile-time error, not a runtime fallback. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key]
  }
}

/** Resolve a named route in a given locale. */
export function path(key: RouteKey, locale: Locale): string {
  return routes[key][locale]
}

/** Every locale alternate for a named route, for hreflang and the language switch. */
export function alternates(key: RouteKey): { locale: Locale; href: string }[] {
  return locales.map((l) => ({ locale: l, href: routes[key][l] }))
}

/** The locale to switch to. With two locales this is "the other one". */
export function otherLocale(locale: Locale): Locale {
  return locales.find((l) => l !== locale) ?? defaultLocale
}

/** BCP 47 tag for `lang`, `hreflang` and `Intl`. Written once, not per template. */
const bcp47Tags = {
  et: 'et-EE',
  en: 'en-GB',
} as const satisfies Record<Locale, string>

export function bcp47(locale: Locale): string {
  return bcp47Tags[locale]
}

/**
 * The navigation label for a route. Declared as a total map, so adding a route
 * without giving it a label is a compile-time error rather than a blank link.
 */
const navLabelKeys = {
  home: 'nav.home',
  services: 'nav.services',
  pricing: 'nav.pricing',
  about: 'nav.about',
  faq: 'nav.faq',
  contact: 'nav.contact',
  areas: 'nav.areas',
  blog: 'nav.blog',
  notFound: 'nav.notFound',
} as const satisfies Record<RouteKey, UIKey>

export function navLabel(key: RouteKey, locale: Locale): string {
  return ui[locale][navLabelKeys[key]]
}

/**
 * Format a euro amount in the reader's language — "3 €" in Estonian, "€3" in English.
 *
 * The AMOUNT always comes from `site.ts`; this only decides how it is written. The
 * euro symbol and its placement come from `Intl`, so neither is typed anywhere in
 * the repository. Trailing zeroes are dropped: a from-price reads "3 €", not
 * "3,00 €". `PriceTable` reuses this in Phase 5, which is why it lives here rather
 * than inside a component.
 */
export function formatPrice(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(bcp47(locale), {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

/**
 * Format a month range in the reader's language — "aprill–oktoober", "April–October".
 * Month numbers are 1-based and come from `site.ts`; no month name is ever typed
 * into this repository, which is also what makes Russian a drop-in.
 */
export function monthRange(fromMonth: number, toMonth: number, locale: Locale): string {
  const format = new Intl.DateTimeFormat(bcp47(locale), { month: 'long' })
  const name = (m: number) => format.format(new Date(Date.UTC(2000, m - 1, 1)))
  return `${name(fromMonth)}–${name(toMonth)}`
}
