/**
 * SINGLE SOURCE OF TRUTH.
 *
 * Contact details, prices, company identifiers and credentials live here and nowhere else.
 * If you are about to type a phone number, an email, a euro amount or a registry code
 * into any other file, you are making a mistake. Import it from here.
 *
 * See CLAUDE.md, "The single-source rule".
 */
/**
 * THE BUSINESS NAME IS SETTLED: Lendav Hollandlane.
 *
 * Both words are always capitalised. Ordinary Estonian prose would lowercase
 * the idiom, but this is a proper business name and Estonian convention
 * capitalises those — Vana Tallinn, Must Puudel.
 *
 * `brand` and `brandText` hold the SAME STRING. The wordmark/running-text split
 * is retired; both keys stay because the wordmark may be styled differently
 * later and keeping them costs nothing. Neither is written anywhere else in
 * `src/` or `public/` — see CLAUDE.md, "The brand name".
 *
 * IT IS A TRADING NAME, NOT THE LEGAL NAME. `legalName` below is unchanged and
 * stays AIF OÜ. That the two are separate fields is exactly why this rename
 * touched four values instead of the whole repository.
 */
export const site = {
  brand: 'Lendav Hollandlane',
  brandText: 'Lendav Hollandlane',
  legalName: 'AIF OÜ',

  /**
   * The person who holds the remote pilot competency and flies every job. Sole
   * operator of the company.
   *
   * It lives here rather than in the about page's copy for the same reason the
   * legal name does: it identifies the business, it is written in two locales,
   * and when it changes it must change in one line. Estonian copy that uses it
   * is phrased so the NOMINATIVE is grammatical — nothing declines it.
   */
  operator: 'Johan van Erkel',

  regCode: '16654436',
  vatNumber: 'EE102744992',
  phone: '+372 5400 4610',
  phoneHref: 'tel:+37254004610',

  /**
   * unconfirmed: the domain is registered and owned, but Cloudflare Email
   * Routing is not configured — this address receives nothing today and has
   * never been tested. Do not print it as a working contact route on any page,
   * and do not invent a different one. The suppressions in `Footer.astro` and
   * the `LocalBusiness` JSON-LD in `BaseLayout.astro` both point here and both
   * come back in one line once a test message arrives. PLAN, blocked on the
   * operator.
   *
   * (The reason changed with the rename. It used to be that the domain was
   * unregistered and the name was not final; both are now settled. The rule is
   * unchanged — an address that receives nothing is not published.)
   */
  email: 'info@lendavhollandlane.ee',

  /**
   * The address the site WILL live at. `lendavhollandlane.ee` is registered and
   * owned; DNS is mid-migration to Cloudflare and does not resolve yet. This
   * has always been the future address rather than the current one, so nothing
   * here waits on the migration.
   *
   * NOT SINGLE-SOURCED, and that is a known gap rather than an oversight:
   * `astro.config.mjs` and `public/robots.txt` each hold their own copy and
   * neither can import this file today. Check 6 in `scripts/check-html.mjs`
   * catches the first if it drifts; NOTHING catches the second. PLAN Phase 11.
   */
  domain: 'https://lendavhollandlane.ee',

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
