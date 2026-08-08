import type { Locale } from './ui'

/**
 * Home page copy, both locales.
 *
 * Why this file exists: the home page ships in Phase 2 and the `services` content
 * collection does not exist until Phase 3. Its repeating blocks — the service
 * cards, five comparison rows, three FAQ entries — are lists, not UI strings, so
 * they are modelled as arrays here rather than flattened into ~45 `ui.ts` keys.
 *
 * `satisfies Record<Locale, HomeCopy>` gives the same guarantee `ui.ts` gives:
 * a string missing from either locale is a COMPILE ERROR, not a silent fallback.
 * Adding Russian means adding a `ru` block with every field present.
 *
 * NO PRICE, PHONE NUMBER OR EMAIL IS TYPED IN THIS FILE. Cards carry a
 * `priceKind` — a reference that `ServiceCard` resolves against `site.ts`.
 * See CLAUDE.md, "The single-source rule".
 *
 * needs-native-review — every Estonian string below is AI-drafted, adapted from
 * reference/one-pager-v1.html and reference/direction-d.html, and has NOT been
 * read by a native speaker. CLAUDE.md's `<!-- needs-native-review -->` marker is
 * for content files; this is TypeScript, so the marker is this comment, as it is
 * in `ui.ts`. Phase 10 clears it.
 *
 * Dropped from the reference copy, deliberately: "enamik eramaju saab valmis ühe
 * päevaga" and "pakkumine 24 tunni jooksul". Both are operational figures and the
 * business has not completed a job yet — CLAUDE.md forbids a figure with no
 * measurement behind it. PLAN Phase 10 restores them once there are numbers.
 * Also dropped: the one-pager's "järeltöötlus, et sammal tagasi ei tuleks", which
 * is an outcome promise resting on an unconfirmed product, and its "iga 3–5 aasta
 * tagant" cleaning interval, which has no source. The FAQ answer now explains what
 * drives the interval rather than asserting a number.
 */

/**
 * The six services, as keys. The SINGLE source of the set: `content.config.ts`
 * builds `z.enum(serviceKeys)` from this tuple for both the `services.icon` and
 * the `jobs.service` field, so a service cannot exist in a content file and be
 * unknown to the card that draws it. Order here is not meaningful — the services
 * collection carries `order` for that.
 *
 * A service key and its icon are 1:1 by design, which is why `ServiceIcon` is an
 * alias rather than a second list to keep in step.
 *
 * `industrial` is the sixth and it was added after Phase 4, outside the phase
 * order. Adding a key here is the whole of a new service: `servicePairs()`
 * asserts one entry per key per locale, so the two markdown files are demanded
 * by the build, and the grid, the price table, the quote form's select and the
 * hreflang pairing all follow from the collection. The ONE thing that does not
 * follow is the icon — `ServiceCard`'s conditional chain has no exhaustiveness
 * check, so a key with no matching branch renders an empty chip and compiles.
 */
export const serviceKeys = ['roof', 'facade', 'solar', 'glass', 'gutter', 'industrial'] as const

/** Which price a service shows. A reference, never an amount. */
export const priceKinds = ['roof', 'facade', 'quote', 'addon'] as const

export type ServiceKey = (typeof serviceKeys)[number]

/** Which price a service card shows. A reference, never an amount. */
export type PriceKind = (typeof priceKinds)[number]

/** Which inline icon a service card draws. Paths live in `ServiceCard.astro`. */
export type ServiceIcon = ServiceKey

/**
 * The five service cards were authored here in Phase 2, because the `services`
 * content collection did not exist yet. Phase 4 built it and both home pages now
 * map over `servicesFor(locale)`, so `ServiceCardCopy` and the `cards` array are
 * gone — a card's title, body and priceKind come from its markdown file, which
 * is also what the service page renders. Two places to change a service was one
 * too many.
 *
 * The price vocabulary went the same way, into `ui.ts` as `price.from`,
 * `price.unit` and `price.addon`: once the price line rendered on the services
 * index and five service pages, the home page copy module was not its owner.
 */

/** `lead` renders bold and runs into `rest` as one sentence, as in direction D. */
export interface TrustItem {
  lead: string
  rest: string
}

export interface CompareRow {
  label: string
  drone: string
  alt: string
}

/**
 * `PathCard` AND THE `paths` BLOCK STOOD HERE AND ARE DELETED — built and
 * removed on 8 August 2026. The reason is worth more than the code was.
 *
 * `PathChooser` put two cards directly under the hero, cleaning and inspection,
 * and made the visitor pick one. **That is the wrong shape, because it forces an
 * either/or between two things that are frequently sequential.** Somebody who is
 * not sure whether their roof needs washing at all can have it looked at first
 * and decide afterwards; a chooser makes those two answers compete when one
 * leads to the other. It also put inspection above the washing argument, which
 * spends the top of the page on a service that is not what most visitors came
 * for.
 *
 * What replaced it is a full section further down — after the before/after
 * evidence, before `CompareTable` — where inspection is explained as a service
 * in its own right rather than offered as an alternative to a wash. Its copy
 * lives in `i18n/inspection.ts` with the other two pointers, not here. **Do not
 * reinstate a chooser.**
 */

/**
 * The three FAQ items left this file in Phase 5, for `i18n/faq.ts`, the same
 * way the service cards left it in Phase 4 and the price vocabulary left it for
 * `ui.ts`. `/kkk` renders the full set and the home page shows three of them;
 * two files holding the answer to "does the drone damage my roof" is one too
 * many, and the drift would be invisible until someone fixed one of them.
 *
 * The section heading went to `ui.ts` as `faq.heading`, because the home
 * section and the FAQ page's own `<h1>` are the same words and neither owns
 * them. `Faq.astro` now selects by id through `homeFaqIds`.
 */

export interface HomeCopy {
  hero: {
    headline: string
    sub: string
    pills: readonly [string, string, string]
    priceLead: string
    priceUnit: string
    vatNote: string
  }
  trust: {
    label: string
    items: readonly [TrustItem, TrustItem, TrustItem, TrustItem]
    fineprint: string
  }
  /**
   * The washing services section's LEAD only. The cards come from the
   * collection, and the heading moved to `ui.ts` as `services.washHeading` on
   * 8 August 2026 — the home page and `/teenused` must show the same words over
   * the same grid, and two copies of one string is how they stop doing that.
   */
  services: {
    lead: string
  }
  /**
   * The before/after evidence section. SPEC section 3 item 3.
   *
   * A HEADING AND NOTHING ELSE, deliberately. There is no lead: the only thing
   * left to say at launch is why there are no photos yet, and `BeforeAfter`'s
   * empty state already says it. A lead here would either duplicate that or
   * start making claims about work that has not been done.
   *
   * "Enne ja pärast" describes what the section shows. A heading like "Tehtud
   * tööd" would assert that completed work is on display, which is not true yet.
   */
  work: {
    heading: string
  }
  compare: {
    heading: string
    lead: string
    /** Visually hidden <caption>. */
    caption: string
    rowHeader: string
    columnDrone: string
    columnAlt: string
    rows: readonly CompareRow[]
  }
  cta: {
    heading: string
    body: string
  }
}

export const homeCopy = {
  et: {
    hero: {
      headline: 'Katuse- ja fassaadipesu droonilt',
      sub: 'Keegi ei astu teie katusele. Ilma tellingute ja redeliteta, kogu Eestis.',
      pills: ['Katusele ei astuta', 'Töö on kindlustatud', 'Ametlik luba lendamiseks'],
      priceLead: 'Hind alates',
      priceUnit: '/m²',
      vatNote: 'hinnale lisandub käibemaks',
    },
    trust: {
      label: 'Mida see teie jaoks tähendab',
      items: [
        {
          lead: 'Keegi ei astu teie katusele.',
          rest: 'Katusekivid, katend ja kinnitused jäävad terveks.',
        },
        {
          lead: 'Töö on kindlustatud.',
          rest: 'Vastutuskindlustuse tõendi saadame soovi korral.',
        },
        {
          lead: 'Meil on ametlik luba lendamiseks elamute kohal.',
          rest: 'Loa koopia esitame nõudmisel.',
        },
        {
          lead: 'Hinnad on avaldatud.',
          rest: 'Pakkumine on kirjalik ja siduv.',
        },
      ],
      fineprint:
        'Korteriühistutele ja äriklientidele esitame käitamisloa, vastutuskindlustuse tõendi ja objektipõhise riskianalüüsi.',
    },
    services: {
      lead: 'Avaldame hinnad, sest te ei peaks helistama selleks, et teada saada, kas see on teile taskukohane.',
    },
    work: {
      heading: 'Enne ja pärast',
    },
    compare: {
      heading: 'Miks droon, mitte tellingud',
      lead: 'Traditsiooniline katusepesu tähendab, et keegi kõnnib teie katusel ja te maksate tellingute või tõstuki eest.',
      caption: 'Droonipesu ja tellingutega pesu võrdlus',
      rowHeader: 'Mida võrdleme',
      columnDrone: 'Droonipesu',
      columnAlt: 'Tellingud, tõstuk või redel',
      rows: [
        {
          label: 'Katusekattele astumine',
          drone: 'Puudub',
          alt: 'Vältimatu — kivid ja katend võivad puruneda',
        },
        {
          label: 'Tellingute kulu',
          drone: 'Puudub',
          alt: 'Eraldi kulu, enne kui töö algab',
        },
        {
          label: 'Kõrgtööde risk',
          drone: 'Kogu meeskond jääb maapinnale',
          alt: 'Inimene töötab kõrgusel',
        },
        {
          label: 'Ligipääs keerulistele kohtadele',
          drone: 'Järsud kalded, kõrged viilud, pehme pinnas',
          alt: 'Sageli ei ole võimalik või läheb kalliks',
        },
        {
          label: 'Mõju aiale ja haljastusele',
          drone: 'Kerge maapealne varustus',
          alt: 'Tellingujalad ja tõstuk muru peal',
        },
      ],
    },
    cta: {
      heading: 'Küsi tasuta pakkumist',
      body: 'Saatke objekti aadress ja lühike kirjeldus. Vastame kirjaliku hinnaga.',
    },
  },
  en: {
    hero: {
      headline: 'Roof and facade cleaning by drone',
      sub: 'Nobody walks on your roof. No scaffolding, no ladders, anywhere in Estonia.',
      pills: ['Nobody walks on the roof', 'The work is insured', 'Officially authorised to fly'],
      priceLead: 'From',
      priceUnit: '/m²',
      vatNote: 'VAT is added to the price',
    },
    trust: {
      label: 'What this means for you',
      items: [
        {
          lead: 'Nobody walks on your roof.',
          rest: 'Tiles, coating and fixings stay intact.',
        },
        {
          lead: 'The work is insured.',
          rest: 'We send proof of liability cover on request.',
        },
        {
          lead: 'We hold an official authorisation to fly over houses.',
          rest: 'A copy of it is available on request.',
        },
        {
          lead: 'Our prices are published.',
          rest: 'The quote you get is written and binding.',
        },
      ],
      fineprint:
        'For housing associations and commercial clients we supply the operational authorisation, proof of liability insurance and a site-specific risk assessment.',
    },
    services: {
      lead: "We publish our prices, because you shouldn't have to call to find out whether you can afford it.",
    },
    work: {
      heading: 'Before and after',
    },
    compare: {
      heading: 'Why a drone instead of scaffolding',
      lead: 'Traditional roof cleaning means someone walks on your roof, and you pay for scaffolding or a lift.',
      caption: 'Drone cleaning compared with scaffolding',
      rowHeader: 'What we compare',
      columnDrone: 'Drone cleaning',
      columnAlt: 'Scaffolding, lift or ladder',
      rows: [
        {
          label: 'Walking on the roof covering',
          drone: 'None',
          alt: 'Unavoidable — tiles and coating can crack',
        },
        {
          label: 'Cost of scaffolding',
          drone: 'None',
          alt: 'A separate cost before the work even starts',
        },
        {
          label: 'Working-at-height risk',
          drone: 'The whole crew stays on the ground',
          alt: 'A person works at height',
        },
        {
          label: 'Access to awkward spots',
          drone: 'Steep pitches, tall gables, soft ground',
          alt: 'Often impossible, or expensive',
        },
        {
          label: 'Impact on the garden',
          drone: 'Light ground equipment only',
          alt: 'Scaffold feet and a lift on the lawn',
        },
      ],
    },
    cta: {
      heading: 'Ask for a free quote',
      body: 'Send us the address and a short description of the property. We reply with a written price.',
    },
  },
} as const satisfies Record<Locale, HomeCopy>
