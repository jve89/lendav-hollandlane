import { site } from '../config/site'
import type { Locale } from './ui'
import { monthRange } from './utils'

/**
 * Credentials page copy, both locales. One module per page, as `home.ts` is.
 *
 * THIS IS THE ONE FILE WHERE `SORA`, `SAIL II` AND THE INSURANCE REGULATION MAY
 * APPEAR — and even here they are not typed. They arrive as `{authorisation}`
 * and `{insurance}`, resolved from `site.credentials` by `aboutSections()`.
 * CLAUDE.md's customer-language rule governs WHERE those references appear, not
 * whether they are exact: on this page the reader has come looking for
 * documents and the precision is an advantage. In hero copy, in a badge, or in
 * body text aimed at a homeowner they are noise, and they do not go there.
 *
 * TODO(equipment): THE EQUIPMENT PARAGRAPH IS DELIBERATELY ABSENT, AND ITS
 * ABSENCE IS NOT AN OVERSIGHT. The kit is not yet in the operator's possession,
 * and this page will not claim gear the business does not own. Do not add a
 * drone make or model, a rig or payload name, a tank capacity, a nozzle or
 * pressure figure, a water-handling description, a photograph of equipment, or
 * anything of the form "we fly a …", until it has been delivered. The page is
 * written to read finished without it: what it sells is the authorisation, the
 * insurance, the published price and the fact that nobody walks on the roof.
 *
 * ALSO NOT CLAIMED, on the same footing: years of experience, a job count, a
 * team size, a customer list, a qualification beyond the remote pilot
 * competency, or a founding date. None of it is in the repository and none of
 * it may be invented. See CLAUDE.md.
 *
 * needs-native-review — every Estonian string below is AI-drafted and has NOT
 * been read by a native speaker. Phase 10 clears it.
 */

export interface AboutSection {
  readonly heading: string
  /** One or more paragraphs. May contain the tokens resolved below. */
  readonly body: readonly string[]
}

export interface AboutCopy {
  lead: string
  sections: readonly AboutSection[]
}

export const aboutCopy = {
  et: {
    lead: 'Katuse-, fassaadi- ja päikesepaneelide pesu droonilt. Luba, kindlustus ja hinnad on avalikud — allpool on kirjas, mis meil täpselt on.',
    sections: [
      {
        heading: 'Kes tööd teeb',
        body: [
          '{operator} on {legalName} ainuke käitaja ja lendab ise igal tööl. Tal on kaugpiloodi pädevus.',
          'See tähendab, et hinnast, tööst ja tulemusest räägite kogu aeg sama inimesega. Vahendajat ega alltöövõtjat vahel ei ole.',
        ],
      },
      {
        heading: 'Käitamisluba',
        // The token LEADS the sentence, deliberately. `site.credentials` values
        // carry their own capital — "Erikategooria käitamisluba (SORA, SAIL
        // II)" — and Estonian would not capitalise it mid-sentence. Writing a
        // lowercased copy of the value here to make a sentence flow would put a
        // credential outside `site.ts`, so the copy is shaped around the value
        // instead. The document-line reading suits a credentials page.
        body: [
          '{authorisation}, mille on väljastanud {authority}.',
          'See on luba, mida drooniga töötamine elamute ja hoonestatud alade kohal nõuab. Loa koopia saadame nõudmisel, ka enne töö tellimist.',
        ],
      },
      {
        heading: 'Vastutuskindlustus',
        body: [
          'Töö on kaetud kolmandale isikule tekitatud kahju kindlustusega. Alus: {insurance}.',
          'Kindlustustõendi saadame nõudmisel. Korteriühistu ja ärikliendi puhul saadame selle koos pakkumisega, ilma et peaks küsima.',
        ],
      },
      {
        heading: 'Katusele ei astuta',
        body: [
          'Kogu meeskond jääb maapinnale. Tellinguid ega tõstukit ei ole vaja ja redelit katusele ei panda.',
          'Suurim kahju katusele tekib tavaliselt siis, kui keegi selle peal kõnnib. Kui katusel on nõrku kohti, ei ole neil kellegi raskust kanda.',
        ],
      },
      {
        heading: 'Hinnad on avaldatud',
        body: [
          'Ruutmeetrihind on kirjas hinnakirjas, mitte kõne taga. Pakkumine on kirjalik ja siduv.',
          'Kalkulaatorit me ei paku: iga objekt tuleb enne hinna ütlemist üle vaadata.',
        ],
      },
      {
        heading: 'Kus ja millal me töötame',
        // `{area}` is "Tallinn ja Harjumaa" — see the note in `faq.ts` on why
        // this is three sentences rather than one with two `ja`s in it.
        body: ['Baas on {area}. Teenindame kogu Eestit. Hooaeg: {season}.'],
      },
      {
        heading: 'Korteriühistule ja ärikliendile',
        body: [
          'Esitame käitamisloa koopia, vastutuskindlustuse tõendi ja objektipõhise riskianalüüsi.',
          'Riskianalüüs tehakse konkreetse objekti kohta, mitte üldise vormina.',
        ],
      },
    ],
  },
  en: {
    lead: 'Roof, facade and solar panel cleaning by drone. The authorisation, the insurance and the prices are all public — what we hold is set out below.',
    sections: [
      {
        heading: 'Who does the work',
        body: [
          '{operator} is the sole operator of {legalName} and flies every job himself. He holds the remote pilot competency.',
          'It means you deal with the same person about the price, the work and the result. There is no middleman and no subcontractor in between.',
        ],
      },
      {
        heading: 'Operational authorisation',
        // The token leads the sentence — see the note on the Estonian block.
        body: [
          '{authorisation}, issued by {authority}.',
          'This is the authorisation that drone work over houses and built-up areas requires. We send a copy of it on request, including before you book.',
        ],
      },
      {
        heading: 'Liability insurance',
        body: [
          'The work is covered by third-party liability insurance, on the basis of {insurance}.',
          'We send proof of cover on request. For a housing association or a commercial client it comes with the quote, without being asked for.',
        ],
      },
      {
        heading: 'Nobody walks on the roof',
        body: [
          'The whole crew stays on the ground. No scaffolding, no lift, and no ladder against the roof.',
          'Most roof damage during cleaning comes from someone walking on it. If the roof has weak spots, nothing is asking them to carry a person.',
        ],
      },
      {
        heading: 'The prices are published',
        body: [
          'The square-metre price is on the price list, not behind a phone call. The quote is written and binding.',
          'We do not offer a calculator: every property has to be looked at before it can be priced.',
        ],
      },
      {
        heading: 'Where and when we work',
        body: ['We are based in {area} and work across Estonia. The season runs {season}.'],
      },
      {
        heading: 'For housing associations and commercial clients',
        body: [
          'We supply a copy of the operational authorisation, proof of liability insurance and a site-specific risk assessment.',
          'The risk assessment is written for the property in question, not issued as a generic form.',
        ],
      },
    ],
  },
} as const satisfies Record<Locale, AboutCopy>

/**
 * The sections, with every token resolved from `site.ts`. The one place a token
 * is replaced — same contract as `faqEntries()`.
 *
 * `{authorisation}` and `{insurance}` are locale-split in `site.credentials`,
 * which is why they are picked here rather than being one key: the Estonian
 * page must say "Erikategooria käitamisluba", not the English wording.
 */
export function aboutSections(locale: Locale): readonly AboutSection[] {
  const et = locale === 'et'
  const tokens: Record<string, string> = {
    '{operator}': site.operator,
    '{legalName}': site.legalName,
    '{authority}': site.credentials.authority,
    '{authorisation}': et
      ? site.credentials.authorisationEt
      : site.credentials.authorisationEn,
    '{insurance}': et ? site.credentials.insuranceRef : site.credentials.insuranceRefEn,
    '{area}': et ? site.serviceArea.baseEt : site.serviceArea.baseEn,
    '{season}': monthRange(site.season.fromMonth, site.season.toMonth, locale),
  }

  const resolve = (text: string) =>
    Object.entries(tokens).reduce((out, [token, value]) => out.replaceAll(token, value), text)

  return aboutCopy[locale].sections.map((section) => ({
    heading: section.heading,
    body: section.body.map(resolve),
  }))
}
