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
  legalName: 'AIF OÜ',

  regCode: '16654436',
  vatNumber: 'EE102744992',
  phone: '+372 5400 4610',
  phoneHref: 'tel:+37254004610',

  /**
   * unconfirmed: lennupesu.ee is not registered and the business name is not
   * final, so this address does not yet receive mail. Do not print it as a
   * working contact route on any page, and do not invent a different one —
   * replace it only when the domain exists. PLAN, blocked on the operator.
   */
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
