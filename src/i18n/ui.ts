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
 * AI-drafted on the same terms. So is `cta.quoteShort`, added with the rename —
 * and it is the one most worth a native speaker's attention, because it is a
 * terse label on the highest-value button on the site and it was chosen under a
 * width constraint. `Päring` is a noun where `cta.quote` is an imperative; if a
 * native speaker has a better six-character answer, take it, but re-measure at
 * 320px before committing it.
 *
 * `footer.emailTitle` was added when the address started working. It is the one
 * Estonian string here that is a dictionary word rather than drafted prose —
 * `E-post` is the standard term — and it is a visually-hidden label in the
 * footer and a visible one on `/meist`.
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
    /** Never in the menu. See the note on `thanks` in `utils.ts`. */
    'nav.thanks': 'Aitäh',
    /** Footer only, not in the menu. See the note on `privacy` in `routes.ts`. */
    'nav.privacy': 'Privaatsus',
    'nav.areas': 'Piirkonnad',
    'nav.blog': 'Blogi',
    'nav.notFound': 'Lehte ei leitud',
    'nav.label': 'Peamenüü',
    'nav.menu': 'Menüü',

    // calls to action
    'cta.quote': 'Küsi pakkumist',
    /**
     * The header pill below 22.5em (360px), and NOTHING ELSE. `cta.quote` is
     * the label everywhere the width allows it — this exists because the pill
     * does not, and only on the narrowest phones. Chosen by measurement at
     * 320px, not by eye; the breakpoint is measured too. See the notes on
     * `.nav__brand` and the CTA media query in `Header.astro`.
     *
     * A native speaker has since read it: `Päring` is correct, and `Saada
     * päring` would be better as a phrase — but it does not fit at all below
     * 333px and does not clear the 10px bar until 343px, and this slot exists
     * to survive 320px. The fuller wording cannot live here. She also read
     * `cta.quote` and preferred it as it stands, so no string moved.
     */
    'cta.quoteShort': 'Päring',
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
    'meta.contact.title': 'Küsi pakkumist',
    'meta.contact.description':
      'Saada objekti aadress ja teenus, mida vajad. Vastame kirjalikult. Katuse- ja fassaadipesu kogu Eestis.',
    'meta.thanks.title': 'Päring saadetud',
    'meta.thanks.description': 'Sinu päring jõudis kohale.',
    'meta.privacy.title': 'Privaatsus ja andmekaitse',
    'meta.privacy.description':
      'Mida päringuvorm küsib, milleks me seda kasutame ja kui kaua hoiame. Küpsiseid ega analüütikat me ei kasuta.',

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
     * THE PRICE-TABLE CELL FOR `priceKind: 'quote'`. Identical in value to
     * `cta.quote` today, and deliberately a separate key.
     *
     * `priceLine()` returned `t('cta.quote')` here until now, which made one
     * string simultaneously a BUTTON LABEL and a PRICE-COLUMN CELL on four
     * service entries — solar panels and windows, in both locales. Those are
     * different registers that will eventually want to diverge, and while they
     * shared a key, editing the button silently rewrote the price table. This
     * splits them at equal value, so the divergence costs a string change
     * rather than a refactor. Nothing visible changed when it was introduced.
     *
     * needs-native-review, and specifically in THIS context rather than as a
     * button. A price column reading "Küsi pakkumist" may want to be something
     * closer to "hind kokkuleppel" — but that is the native speaker's call and
     * not ours, and no guess ships in the meantime. The button wording itself
     * she has now seen and endorsed.
     */
    'price.quote': 'Küsi pakkumist',
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

    // contact and thank-you page headings
    'contact.heading': 'Küsi pakkumist',
    'thanks.heading': 'Aitäh, päring on saadetud',
    'privacy.heading': 'Privaatsus ja andmekaitse',

    // 404
    'notFound.heading': 'Lehte ei leitud',
    'notFound.body':
      'Seda lehte ei ole olemas või on see kolinud. Alusta avalehelt või helista meile.',
    'notFound.backHome': 'Tagasi avalehele',

    // footer
    'footer.navTitle': 'Lehed',
    'footer.contactTitle': 'Kontakt',
    'footer.emailTitle': 'E-post',
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
    //
    // NARROWED 3 AUGUST 2026, AND THE SCOPE IS THE POINT. This said "iga foto
    // sellel lehel" — every photo on this page — which became false the moment
    // the placeholder hero poster landed a few hundred pixels above it. The
    // promise is now about BEFORE AND AFTER photos, which is where it does the
    // work: those are evidence of our own jobs, and SPEC section 9's scoped
    // footage exception excludes them in all circumstances. Do not widen it back
    // to every image on the page, and do not weaken it here — the hero needs no
    // disclaimer because it claims nothing.
    'beforeAfter.emptyHeading': 'Fotod lisame pärast esimesi töid',
    'beforeAfter.emptyBody':
      'Iga enne ja pärast foto on meie enda töö. Ostetud ega võõraid pilte me siia ei pane, seega enne ja pärast pilte siin veel ei ole.',
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
    /** Never in the menu. See the note on `thanks` in `utils.ts`. */
    'nav.thanks': 'Thank you',
    /** Footer only, not in the menu. See the note on `privacy` in `routes.ts`. */
    'nav.privacy': 'Privacy',
    'nav.areas': 'Areas',
    'nav.blog': 'Blog',
    'nav.notFound': 'Page not found',
    'nav.label': 'Main navigation',
    'nav.menu': 'Menu',

    // calls to action
    'cta.quote': 'Get a quote',
    /**
     * Translates the Estonian `Päring`, noun for noun. "Quote me" measured
     * 3px wider and still fitted, but it is not what the Estonian says, and
     * English here is a translation rather than a parallel original —
     * CLAUDE.md, language rules. See `cta.quoteShort` in the `et` block.
     */
    'cta.quoteShort': 'Enquiry',
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
    'meta.contact.title': 'Get a quote',
    'meta.contact.description':
      'Send us the address and the service you need. We reply in writing. Roof and facade cleaning across Estonia.',
    'meta.thanks.title': 'Enquiry sent',
    'meta.thanks.description': 'Your enquiry has reached us.',
    'meta.privacy.title': 'Privacy and data protection',
    'meta.privacy.description':
      'What the quote form asks for, what we use it for, and how long we keep it. We set no cookies and run no analytics.',

    // services index
    'services.heading': 'Services',
    'services.lead':
      'Five services, all done by drone. Pick one to see what it covers and what it does not.',

    // the price vocabulary — see the Estonian block
    'price.from': 'From',
    'price.unit': '/m²',
    'price.addon': 'As an add-on',
    /** The price-table cell for `priceKind: 'quote'`. See the Estonian block. */
    'price.quote': 'Get a quote',
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

    // contact and thank-you page headings
    'contact.heading': 'Get a quote',
    'thanks.heading': 'Thank you — your enquiry is on its way',
    'privacy.heading': 'Privacy and data protection',

    // 404
    'notFound.heading': 'Page not found',
    'notFound.body':
      'This page does not exist, or it has moved. Start from the home page, or give us a call.',
    'notFound.backHome': 'Back to the home page',

    // footer
    'footer.navTitle': 'Pages',
    'footer.contactTitle': 'Contact',
    'footer.emailTitle': 'Email',
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

    // before/after evidence. Narrowed 3 August 2026 with its Estonian source —
    // see the note there. The claim covers before and after photos, not every
    // image on the page.
    'beforeAfter.emptyHeading': 'Photos go up after the first jobs',
    'beforeAfter.emptyBody':
      'Every before and after photo is our own work. We do not put stock or borrowed images here, so there are no before and after photos yet.',
    'beforeAfter.before': 'Before',
    'beforeAfter.after': 'After',
    'beforeAfter.altBefore': 'Before cleaning, {town}',
    'beforeAfter.altAfter': 'After cleaning, {town}',
    'beforeAfter.areaUnit': 'm²',
  },
} as const

export type UIKey = keyof (typeof ui)['et']
