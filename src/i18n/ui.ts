export const locales = ['et', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'et'

/**
 * UI strings. A key missing from a locale is a TYPE ERROR, not a silent fallback
 * (enforced at the point of use in `utils.ts`, where `ui[locale][key]` is indexed
 * across the locale union). Adding Russian means adding a `ru` block here with
 * every key present.
 *
 * needs-native-review — every Estonian string added in Phase 1 (nav.home through
 * notFound.*, and all footer.* keys except footer.vatNote) is AI-drafted and has
 * NOT been read by a native speaker. CLAUDE.md's `<!-- needs-native-review -->`
 * marker is for content files; this is TypeScript, so the marker is this comment.
 * Phase 10 clears it.
 */
export const ui = {
  et: {
    // navigation
    'nav.home': 'Avaleht',
    'nav.services': 'Teenused',
    'nav.pricing': 'Hinnakiri',
    'nav.about': 'Meist',
    'nav.faq': 'KKK',
    'nav.contact': 'Kontakt',
    'nav.areas': 'Piirkonnad',
    'nav.blog': 'Blogi',
    'nav.notFound': 'Lehte ei leitud',
    'nav.label': 'Peamenüü',
    'nav.menu': 'Menüü',

    // calls to action
    'cta.quote': 'Küsi pakkumist',
    'cta.call': 'Helista',

    // accessibility
    'a11y.skip': 'Liigu põhisisu juurde',
    'a11y.breadcrumb': 'Asukoht lehel',

    // language switch
    'lang.switch': 'In English',
    'lang.label': 'Vaheta keelt',

    // metadata
    'meta.home.title': 'Katuse- ja fassaadipesu droonilt | Lennupesu',
    'meta.home.description':
      'Katuse-, fassaadi- ja päikesepaneelide pesu droonilt. Ilma tellingute ja redeliteta, katusele astumata. Kogu Eesti.',
    'meta.notFound.title': 'Lehte ei leitud | Lennupesu',
    'meta.notFound.description': 'Seda lehte ei ole olemas või on see kolinud.',

    // 404
    'notFound.heading': 'Lehte ei leitud',
    'notFound.body':
      'Seda lehte ei ole olemas või on see kolinud. Alusta avalehelt või helista meile.',
    'notFound.backHome': 'Tagasi avalehele',

    // footer
    'footer.navTitle': 'Lehed',
    'footer.contactTitle': 'Kontakt',
    'footer.companyTitle': 'Ettevõte',
    'footer.label': 'Jaluse menüü',
    'footer.regCode': 'Registrikood',
    'footer.vatNumber': 'KMKR number',
    'footer.areaTitle': 'Teeninduspiirkond',
    'footer.areaAll': 'Kogu Eesti',
    'footer.seasonTitle': 'Hooaeg',
    'footer.vatNote': 'Hinnad ei sisalda käibemaksu 24%.',
    'footer.claimNoRoofWalk': 'Katusele ei astuta.',
    'footer.claimInsured': 'Töö on kindlustatud.',
    'footer.claimPermitted': 'Meil on ametlik luba lendamiseks elamute kohal.',
  },
  en: {
    // navigation
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'nav.areas': 'Areas',
    'nav.blog': 'Blog',
    'nav.notFound': 'Page not found',
    'nav.label': 'Main navigation',
    'nav.menu': 'Menu',

    // calls to action
    'cta.quote': 'Get a quote',
    'cta.call': 'Call',

    // accessibility
    'a11y.skip': 'Skip to main content',
    'a11y.breadcrumb': 'Breadcrumb',

    // language switch
    'lang.switch': 'Eesti keeles',
    'lang.label': 'Switch language',

    // metadata
    'meta.home.title': 'Roof and facade cleaning by drone | Lennupesu',
    'meta.home.description':
      'Roof, facade and solar panel cleaning by drone. No scaffolding, no ladders, nobody on your roof. Across Estonia.',
    'meta.notFound.title': 'Page not found | Lennupesu',
    'meta.notFound.description': 'This page does not exist, or it has moved.',

    // 404
    'notFound.heading': 'Page not found',
    'notFound.body':
      'This page does not exist, or it has moved. Start from the home page, or give us a call.',
    'notFound.backHome': 'Back to the home page',

    // footer
    'footer.navTitle': 'Pages',
    'footer.contactTitle': 'Contact',
    'footer.companyTitle': 'Company',
    'footer.label': 'Footer navigation',
    'footer.regCode': 'Registry code',
    'footer.vatNumber': 'VAT number',
    'footer.areaTitle': 'Service area',
    'footer.areaAll': 'Across Estonia',
    'footer.seasonTitle': 'Season',
    'footer.vatNote': 'Prices exclude 24% VAT.',
    'footer.claimNoRoofWalk': 'Nobody walks on your roof.',
    'footer.claimInsured': 'The work is insured.',
    'footer.claimPermitted': 'We hold an official authorisation to fly over houses.',
  },
} as const

export type UIKey = keyof (typeof ui)['et']
