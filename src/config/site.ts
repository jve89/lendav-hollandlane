/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Contact details, prices, company identifiers and credentials live here and nowhere else.
 * If you are about to type a phone number, an email, a euro amount or a registry code
 * into any other file, you are making a mistake. Import it from here.
 *
 * See CLAUDE.md, "The single-source rule".
 */
export const site = {
  brand: 'LennuPesu',              // wordmark only; running text uses "Lennupesu"
  brandText: 'Lennupesu',
  legalName: 'AIF Drone Services OÜ',

  // TODO(operator): fill these before launch
  regCode: 'TODO',
  vatNumber: 'TODO',
  phone: '+372 0000 0000',
  phoneHref: 'tel:+3720000000',
  email: 'info@lennupesu.ee',

  domain: 'https://lennupesu.ee',

  /** Estonian standard rate. Every displayed price is EXCLUDING this. */
  vatRate: 0.24,

  /** All in EUR, excluding VAT. */
  prices: {
    roofFrom: 3.0,
    facadeFrom: 3.0,
    minimumJob: 450,
  },

  /** Washing season. The cleaning payload will not operate below 0 °C. */
  season: { fromMonth: 4, toMonth: 10 },

  credentials: {
    authority: 'Transpordiamet',
    authorisationEt: 'Erikategooria käitamisluba (SORA, SAIL II)',
    authorisationEn: 'Specific-category operational authorisation (SORA, SAIL II)',
    insuranceRef: 'Määrus (EÜ) 785/2004',
    insuranceRefEn: 'Regulation (EC) 785/2004',
  },

  serviceArea: { baseEt: 'Tallinn ja Harjumaa', baseEn: 'Tallinn and Harju county' },
} as const
