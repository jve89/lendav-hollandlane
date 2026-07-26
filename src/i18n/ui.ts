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
 * notFound.*, and all footer.* keys except price.vatNote) and in Phase 3 (every
 * beforeAfter.* key) is AI-drafted and has NOT been read by a native speaker.
 * CLAUDE.md's `<!-- needs-native-review -->` marker is for content files; this is
 * TypeScript, so the marker is this comment. Phase 10 clears it. The Phase 4
 * additions — every price.* and services.* key, and meta.services.* — are
 * AI-drafted on the same terms.
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

    /**
     * Metadata. A `meta.*.title` carries ONLY the page-specific part — the
     * ` | <brand>` suffix is composed in `BaseLayout` from `site.brandText`.
     * Do not type the brand into one of these. See CLAUDE.md, "The brand name".
     */
    'meta.home.title': 'Katuse- ja fassaadipesu droonilt',
    'meta.home.description':
      'Katuse-, fassaadi- ja päikesepaneelide pesu droonilt. Ilma tellingute ja redeliteta, katusele astumata. Kogu Eesti.',
    'meta.notFound.title': 'Lehte ei leitud',
    'meta.notFound.description': 'Seda lehte ei ole olemas või on see kolinud.',
    'meta.services.title': 'Teenused ja hinnad',
    'meta.services.description':
      'Katusepesu, fassaadipesu, päikesepaneelide pesu, aknad ja vihmaveesüsteemid. Kõik drooniga, katusele astumata. Hinnad on avaldatud.',
    'meta.pricing.title': 'Hinnakiri',
    'meta.pricing.description':
      'Katuse- ja fassaadipesu ruutmeetrihind, väikseima töö maksumus ja see, mis hinda muudab. Kõik hinnad on ilma käibemaksuta.',
    'meta.faq.title': 'KKK',
    'meta.faq.description':
      'Vastused katuse kahjustamise, ilma, hinna, lubade ja kindlustuse kohta. Mida me ei tea, seda me ei väida.',
    'meta.about.title': 'Meist',
    'meta.about.description':
      'Käitamisluba, vastutuskindlustus ja see, kes tööd teeb. Katusele ei astuta ja hinnad on avaldatud.',

    // services index
    'services.heading': 'Teenused',
    'services.lead':
      'Viis teenust, kõik drooniga. Vali teenus, et näha, mida see hõlmab ja mida mitte.',

    /**
     * The price vocabulary. It lived in `home.ts` until Phase 4, when the price
     * line started rendering on the services index and on five service pages —
     * at which point the home page copy module was no longer its owner. The
     * AMOUNT is never here; `priceLine` in `utils.ts` reads it from `site.ts`.
     */
    'price.from': 'Alates',
    'price.unit': '/m²',
    'price.addon': 'Lisateenusena',
    /**
     * `{vat}` is replaced by `vatNote()` in `utils.ts` from `site.vatRate`. Do
     * not write the rate into this string: it was typed here until Phase 5
     * while `site.vatRate` sat unread, which is the shape of every drift this
     * repository has already paid for. Estonian VAT has moved once and will
     * move again — when it does, it moves in one line, in `site.ts`.
     *
     * Called through `vatNote(locale)`, never `t('price.vatNote')`, which would
     * render the token.
     */
    'price.vatNote': 'Hinnad ei sisalda käibemaksu {vat}.',

    /**
     * The price table. The AMOUNTS are never here — `PriceTable` reads them
     * from `site.prices` and resolves each service's `priceKind` through
     * `priceLine`. These are the column headers and the labels around them.
     */
    'priceTable.caption': 'Teenuste hinnad',
    'priceTable.service': 'Teenus',
    'priceTable.price': 'Hind',
    'priceTable.minimum': 'Väikseima töö maksumus',
    'priceTable.minimumNote':
      'Sellest väiksema töö puhul ei tasu väljasõit ja ülesseadmine end ära.',

    // pricing, FAQ and credentials page headings
    'pricing.heading': 'Katusepesu ja fassaadipesu hinnad',
    'about.heading': 'Load, kindlustus ja see, kes lendab',
    'faq.heading': 'Korduma kippuvad küsimused',
    /** The home page's link to the full FAQ. */
    'faq.all': 'Kõik korduma kippuvad küsimused',

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
    'footer.claimNoRoofWalk': 'Katusele ei astuta.',
    'footer.claimInsured': 'Töö on kindlustatud.',
    'footer.claimPermitted': 'Meil on ametlik luba lendamiseks elamute kohal.',

    // before/after evidence. The empty state is the DEFAULT state at launch and
    // states a policy about ourselves, which is verifiable — it never apologises
    // for a missing photo and never promises one by a date.
    'beforeAfter.emptyHeading': 'Fotod lisame pärast esimesi töid',
    'beforeAfter.emptyBody':
      'Iga foto sellel lehel on meie enda töö. Ostetud ega võõraid pilte me ei kasuta, seega enne ja pärast pilte siin veel ei ole.',
    'beforeAfter.before': 'Enne',
    'beforeAfter.after': 'Pärast',
    'beforeAfter.altBefore': 'Enne pesu, {town}',
    'beforeAfter.altAfter': 'Pärast pesu, {town}',
    /** Unit symbol, kept here so a third locale can change it. */
    'beforeAfter.areaUnit': 'm²',
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

    // metadata — page-specific part only; see the Estonian block
    'meta.home.title': 'Roof and facade cleaning by drone',
    'meta.home.description':
      'Roof, facade and solar panel cleaning by drone. No scaffolding, no ladders, nobody on your roof. Across Estonia.',
    'meta.notFound.title': 'Page not found',
    'meta.notFound.description': 'This page does not exist, or it has moved.',
    'meta.services.title': 'Services and prices',
    'meta.services.description':
      'Roof cleaning, facade cleaning, solar panels, windows and guttering. All by drone, with nobody on your roof. Prices published.',
    'meta.pricing.title': 'Pricing',
    'meta.pricing.description':
      'The square-metre price for roof and facade cleaning, the minimum job, and what moves the price. All prices exclude VAT.',
    'meta.faq.title': 'FAQ',
    'meta.faq.description':
      'Answers on roof damage, weather, price, authorisations and insurance. Where we do not know, we do not claim.',
    'meta.about.title': 'About us',
    'meta.about.description':
      'The operational authorisation, the liability insurance, and the person who does the work. Nobody walks on your roof and the prices are published.',

    // services index
    'services.heading': 'Services',
    'services.lead':
      'Five services, all done by drone. Pick one to see what it covers and what it does not.',

    // the price vocabulary — see the Estonian block
    'price.from': 'From',
    'price.unit': '/m²',
    'price.addon': 'As an add-on',
    /** `{vat}` comes from `site.vatRate` via `vatNote()`. See the Estonian block. */
    'price.vatNote': 'Prices exclude {vat} VAT.',

    // the price table — see the Estonian block
    'priceTable.caption': 'Service prices',
    'priceTable.service': 'Service',
    'priceTable.price': 'Price',
    'priceTable.minimum': 'Minimum job',
    'priceTable.minimumNote': 'Below this the trip and the setup do not pay for themselves.',

    // pricing, FAQ and credentials page headings
    'pricing.heading': 'Roof and facade cleaning prices',
    'about.heading': 'The authorisation, the insurance and the person who flies',
    'faq.heading': 'Frequently asked questions',
    'faq.all': 'All frequently asked questions',

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
    'footer.claimNoRoofWalk': 'Nobody walks on your roof.',
    'footer.claimInsured': 'The work is insured.',
    'footer.claimPermitted': 'We hold an official authorisation to fly over houses.',

    // before/after evidence
    'beforeAfter.emptyHeading': 'Photos go up after the first jobs',
    'beforeAfter.emptyBody':
      'Every photo on this site is our own work. We do not use stock or borrowed images, so there are no before and after photos here yet.',
    'beforeAfter.before': 'Before',
    'beforeAfter.after': 'After',
    'beforeAfter.altBefore': 'Before cleaning, {town}',
    'beforeAfter.altAfter': 'After cleaning, {town}',
    'beforeAfter.areaUnit': 'm²',
  },
} as const

export type UIKey = keyof (typeof ui)['et']
