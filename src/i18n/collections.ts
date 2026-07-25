/**
 * Helpers for content collections whose entries are localised — one file per
 * locale, in a locale directory, with a slug that differs per language.
 *
 * `services` is the first of these. `locations` (Phase 7) and `posts` (Phase 8)
 * are the same shape and must reuse what is here rather than copy it.
 *
 * WHAT IS DELIBERATELY *NOT* HERE: the rule that every key exists in every
 * locale. That is a `services` rule, not a collection rule — a blog post may
 * legitimately exist in Estonian only, and `locations` has no cross-locale
 * pairing key at all today. Generalising it would either weaken it to
 * uselessness for services or make Phase 8 fight it, so it lives in
 * `services.ts` where it is true. See the phase report.
 */
import { locales, type Locale } from './ui'
import { path } from './utils'
import type { RouteKey } from './routes'

/**
 * The shape every localised entry shares, whichever collection it came from.
 * Declared structurally so this module never imports `astro:content` types and
 * never has to know the union of collection names.
 */
export interface LocalisedEntry {
  readonly id: string
  readonly filePath?: string | undefined
  readonly data: { readonly locale: Locale }
}

/**
 * The locale a file DECLARES must match the locale directory it SITS IN.
 *
 * zod cannot see the file path, so `locale: en` inside `et/` validates — this is
 * the KNOWN LIMIT written into `content.config.ts`, and this is the guard it
 * promises. Without it the failure is not a build error but an English page
 * published at an Estonian URL, advertising itself as Estonian in hreflang.
 *
 * `base` is the collection's loader `base` without the leading `./`, e.g.
 * `src/content/services`. The glob loader sets `filePath` repo-root-relative
 * with POSIX separators — verified against the content layer store, where the
 * Estonian roof entry reads `src/content/services/et/katusepesu.md`.
 *
 * `filePath` is typed optional because the content layer allows entries with no
 * file behind them. A glob loader always sets it, so `undefined` here is a bug
 * and throws rather than skipping the check silently.
 */
export function assertEntryLocale(base: string, entry: LocalisedEntry): void {
  const { filePath } = entry
  if (filePath === undefined) {
    throw new Error(
      `${base}: entry "${entry.id}" has no filePath, so its locale directory cannot be ` +
        `checked. Every entry in this collection is a markdown file under ${base}/<locale>/, ` +
        `so this should be impossible.`,
    )
  }

  const prefix = `${base}/`
  const segment = filePath.startsWith(prefix)
    ? filePath.slice(prefix.length).split('/')[0]
    : undefined

  if (segment === undefined || !(locales as readonly string[]).includes(segment)) {
    throw new Error(
      `${filePath}: this file must sit in a locale directory — one of ${locales.join(', ')} — ` +
        `directly under ${base}/.`,
    )
  }

  if (segment !== entry.data.locale) {
    throw new Error(
      `${filePath}: frontmatter declares locale "${entry.data.locale}" but the file sits in ` +
        `"${segment}/". Move the file or fix the frontmatter. A mismatch publishes the wrong ` +
        `language at a localised URL, which is worse than a build failure.`,
    )
  }
}

/**
 * hreflang alternates for an entry whose slug is localised, BETWEEN the paired
 * slugs — `/teenused/katusepesu` and `/en/services/roof-cleaning`, not the two
 * index routes that `alternates()` in `utils.ts` would return.
 *
 * Built by mapping over `locales`, so the order matches `alternates()` exactly.
 * `BaseLayout` no longer depends on that order for x-default, but a caller
 * reading the array positionally still would.
 *
 * A locale with no entry falls back to that locale's index route rather than
 * being dropped: a missing translation should send the reader to the section
 * they wanted in their own language, not to a page in a language they do not
 * read. Phase 8 needs this; `services` never hits it, because its completeness
 * assertion fires first.
 */
export function localisedAlternates(
  routeKey: RouteKey,
  slugByLocale: Partial<Record<Locale, string>>,
): { locale: Locale; href: string }[] {
  return locales.map((locale) => {
    const slug = slugByLocale[locale]
    return {
      locale,
      href: slug === undefined ? path(routeKey, locale) : entryHref(routeKey, locale, slug),
    }
  })
}

/** `/teenused` + `katusepesu` -> `/teenused/katusepesu`. No trailing slash, matching `routes.ts`. */
export function entryHref(routeKey: RouteKey, locale: Locale, slug: string): string {
  return `${path(routeKey, locale)}/${slug}`
}
