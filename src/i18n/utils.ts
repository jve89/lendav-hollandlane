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
