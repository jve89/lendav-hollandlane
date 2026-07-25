export const locales = ['et', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'et'

/**
 * UI strings. A key missing from a locale is a TYPE ERROR, not a silent fallback.
 * Adding Russian means adding a `ru` block here with every key present.
 */
export const ui = {
  et: {
    'nav.services': 'Teenused',
    'nav.pricing': 'Hinnakiri',
    'nav.about': 'Meist',
    'nav.faq': 'KKK',
    'nav.contact': 'Kontakt',
    'cta.quote': 'Küsi pakkumist',
    'cta.call': 'Helista',
    'meta.home.title': 'Katuse- ja fassaadipesu droonilt | Lennupesu',
    'meta.home.description':
      'Katuse-, fassaadi- ja päikesepaneelide pesu droonilt. Ilma tellingute ja redeliteta, katusele astumata. Kogu Eesti.',
    'footer.vatNote': 'Hinnad ei sisalda käibemaksu 24%.',
    'lang.switch': 'In English',
  },
  en: {
    'nav.services': 'Services',
    'nav.pricing': 'Pricing',
    'nav.about': 'About',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    'cta.quote': 'Get a quote',
    'cta.call': 'Call',
    'meta.home.title': 'Roof and facade cleaning by drone | Lennupesu',
    'meta.home.description':
      'Roof, facade and solar panel cleaning by drone. No scaffolding, no ladders, nobody on your roof. Across Estonia.',
    'footer.vatNote': 'Prices exclude 24% VAT.',
    'lang.switch': 'Eesti keeles',
  },
} as const

export type UIKey = keyof (typeof ui)['et']
