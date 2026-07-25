/**
 * The `services` collection, validated and paired across locales.
 *
 * Six pages consume this — two home pages, two index pages, two detail pages —
 * so the guard and the assertions live here once rather than being copied into
 * each `getStaticPaths`.
 *
 * PAIRING IS BY `data.icon`, AND THAT IS ONLY SAFE BECAUSE OF THE ASSERTION
 * BELOW. `icon` is typed `ServiceIcon`, which `home.ts` declares as an alias of
 * `ServiceKey` — "a service key and its icon are 1:1 by design". So the field
 * named for the drawing is in fact the service's identity. If someone changes a
 * facade file to `icon: roof`, the result is two `roof` entries and zero
 * `facade` entries for that locale, and `servicePairs` stops the build. A future
 * session must not remove that check on the grounds that it never fires: it is
 * what makes hreflang between localised slugs correct rather than merely
 * plausible.
 *
 * The cleaner shape would be a separate `key` field with `icon` derived from it,
 * which means editing `content.config.ts` — a Phase 3 file, and out of scope
 * here per CLAUDE.md. Noted in the phase report instead.
 *
 * NOT MEMOISED, deliberately. A module-level cache would go stale in
 * `astro dev`: this is not a content file, so Vite has no reason to invalidate
 * it when a markdown file changes. Ten entries cost nothing.
 */
import { getCollection, type CollectionEntry } from 'astro:content'
import { locales, type Locale } from './ui'
import { serviceKeys, type ServiceKey } from './home'
import { assertEntryLocale, entryHref, localisedAlternates } from './collections'

/** Must match the `base` declared for the collection in `content.config.ts`. */
const SERVICES_BASE = 'src/content/services'

export interface ServicePair {
  readonly key: ServiceKey
  /** Total over `Locale`, so `pair.entries[locale]` is never undefined. */
  readonly entries: Readonly<Record<Locale, CollectionEntry<'services'>>>
}

/**
 * Every service, in every locale, paired for hreflang.
 *
 * Throws rather than degrading. A service missing from one language is not a
 * page that renders without an alternate — it is a nav link to nothing and a
 * grid with a hole in it, and the build is the right place to find that out.
 */
export async function servicePairs(): Promise<readonly ServicePair[]> {
  const all = await getCollection('services')
  for (const entry of all) assertEntryLocale(SERVICES_BASE, entry)

  return serviceKeys.map((key) => {
    const entries = {} as Record<Locale, CollectionEntry<'services'>>

    for (const locale of locales) {
      const matches = all.filter((e) => e.data.icon === key && e.data.locale === locale)

      if (matches.length !== 1) {
        const found = matches.length
          ? ` Found: ${matches.map((m) => m.filePath ?? m.id).join(', ')}.`
          : ''
        throw new Error(
          `services: expected exactly one "${key}" entry for locale "${locale}", found ` +
            `${matches.length}.${found} Every key in serviceKeys must exist once in every ` +
            `locale — the services grid and the localised-slug hreflang pair both depend on it.`,
        )
      }

      entries[locale] = matches[0]!
    }

    return { key, entries }
  })
}

/**
 * One locale's services, in display order.
 *
 * Implemented over `servicePairs` so the guard and the assertion run on every
 * path into the collection, including the two home pages. The sort is total:
 * nothing in the schema stops two files declaring the same `order`, and a
 * comparator that returns 0 would let the grid reshuffle between builds.
 */
export async function servicesFor(
  locale: Locale,
): Promise<readonly CollectionEntry<'services'>[]> {
  const pairs = await servicePairs()
  return pairs
    .map((pair) => pair.entries[locale])
    .sort((a, b) => a.data.order - b.data.order || a.id.localeCompare(b.id))
}

/** `/teenused/katusepesu`, `/en/services/roof-cleaning`. */
export function serviceHref(locale: Locale, slug: string): string {
  return entryHref('services', locale, slug)
}

/** hreflang alternates for one service, between the localised slugs. */
export function serviceAlternates(pair: ServicePair): { locale: Locale; href: string }[] {
  return localisedAlternates(
    'services',
    Object.fromEntries(locales.map((l) => [l, pair.entries[l].data.slug])) as Record<
      Locale,
      string
    >,
  )
}
