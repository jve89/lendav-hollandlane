import { site } from '../config/site'
import type { Locale } from './ui'
import { formatPrice, monthRange } from './utils'

/**
 * THE FAQ, AND THE ID SPACE `content.config.ts` HAS BEEN PROMISING SINCE PHASE 3.
 *
 * Three answers lived in `i18n/home.ts` until Phase 5, with no ids, because the
 * home page shipped before there was a FAQ page to own them. Now that `/kkk`
 * renders the full set, one of those two places had to stop being a source:
 * "does the drone damage my roof" cannot have two answers that a later edit can
 * fix in one file and miss in the other. So the answers live here, and
 * `Faq.astro` selects the home three BY ID through `homeFaqIds`.
 *
 * `faqRefs` in the services schema is `z.enum(faqIds)` as of this phase, so a
 * service file naming a question that does not exist fails the build rather
 * than silently referencing nothing.
 *
 * NO PRICE, PHONE NUMBER, EMAIL, MONTH NAME OR CREDENTIAL IS TYPED IN THIS
 * FILE. Answers carry tokens — `{season}`, `{minimum}`, `{area}`, `{authority}`
 * — and `faqEntries()` resolves them from `site.ts`. That is also what keeps
 * the visible answer and the `FAQPage` structured data identical: both come out
 * of the same resolved string, so they cannot drift.
 *
 * WHAT IS DELIBERATELY NOT ASKED HERE. A question with no honest answer is left
 * out rather than answered vaguely — CLAUDE.md. There is no question about how
 * many jobs we have done, how fast the work is, how long the result lasts, or
 * whether moss comes back, because every one of those needs a measurement this
 * business has not made. Three questions below ARE asked and answered with a
 * commitment about our own conduct rather than a fact; each carries an
 * `unconfirmed:` comment saying exactly what a future session may not invent.
 *
 * CUSTOMER LANGUAGE, NOT REGULATOR LANGUAGE. `SORA`, `SAIL II` and the
 * insurance regulation number do not appear in this file. A homeowner reading
 * an FAQ does not know what SAIL II is. The exact references are on the
 * credentials page, in `about.ts`, where the reader has come looking for
 * documents. See CLAUDE.md.
 *
 * needs-native-review — every Estonian string below is AI-drafted and has NOT
 * been read by a native speaker. The three moved from `home.ts` were already
 * marked; the eleven new ones are on the same terms, and so are the four
 * industrial questions added with the sixth service, plus the rewritten
 * `price-basis` answer. Phase 10 clears it. Nothing here has been reviewed.
 */

/** The three sections of the page. Order here is the order they render in. */
export const faqGroups = ['work', 'price', 'documents'] as const
export type FaqGroup = (typeof faqGroups)[number]

/**
 * Every question, by id. THIS TUPLE IS THE ID SPACE: `content.config.ts` builds
 * `z.enum(faqIds)` from it for `services.faqRefs`, so a question cannot be
 * referenced by a service file and be unknown here.
 *
 * Ids are stable and semantic, never positional. Renaming one is a breaking
 * change to any `faqRefs` that names it — which is the point of the enum.
 */
export const faqIds = [
  'roof-damage',
  'roof-materials',
  'weather',
  'frequency',
  'garden',
  'chemicals',
  'water-power',
  'duration',
  'price-basis',
  'minimum',
  'area',
  'permission',
  'insurance',
  'ku-documents',
  /**
   * The four industrial questions, added with the sixth service. They are
   * appended rather than interleaved by subject: `faqIds` order is render order
   * within a group, and a question is looked up by id from `faqRefs`, so moving
   * an existing id to make room would reshuffle `/kkk` for no gain. The group
   * map below is what actually places them on the page.
   */
  'industrial-scope',
  'industrial-price',
  'industrial-info',
  'industrial-documents',
] as const
export type FaqId = (typeof faqIds)[number]

/**
 * Which group each question sits in. Locale-independent — the grouping is
 * structure, not copy — and declared as a total map, so a new id without a
 * group is a compile error rather than a question that renders nowhere.
 */
export const faqGroupOf = {
  'roof-damage': 'work',
  'roof-materials': 'work',
  weather: 'work',
  frequency: 'work',
  garden: 'work',
  chemicals: 'work',
  'water-power': 'work',
  duration: 'work',
  'price-basis': 'price',
  minimum: 'price',
  area: 'price',
  permission: 'documents',
  insurance: 'documents',
  'ku-documents': 'documents',
  'industrial-scope': 'work',
  'industrial-price': 'price',
  'industrial-info': 'price',
  'industrial-documents': 'documents',
} as const satisfies Record<FaqId, FaqGroup>

/**
 * The three the home page shows. Roof damage, weather and season, cleaning
 * frequency: the three objections a homeowner arrives with.
 *
 * The unconfirmed three are deliberately NOT among them. A question we can only
 * answer with "we will tell you in the quote" belongs where a reader has come
 * looking for detail, not on the highest-traffic page, where it would spend
 * attention the price and the benefit need.
 */
export const homeFaqIds = ['roof-damage', 'weather', 'frequency'] as const

export interface FaqItem {
  readonly q: string
  /** May contain `{season}`, `{minimum}`, `{area}` or `{authority}`. */
  readonly a: string
}

export interface FaqCopy {
  /** The `<h2>` above each group on the FAQ page. */
  groups: Record<FaqGroup, string>
  items: Record<FaqId, FaqItem>
}

export const faqCopy = {
  et: {
    groups: {
      work: 'Töö ja katus',
      price: 'Hind ja tellimine',
      documents: 'Load ja dokumendid',
    },
    items: {
      'roof-damage': {
        q: 'Kas droon kahjustab katust?',
        a: 'Droon ei puutu katust. Survet ja otsakut reguleeritakse materjali järgi — eterniidile ja vanale katendile kasutame madalat survet. Suurim kahju katusele tekib tavaliselt siis, kui keegi selle peal kõnnib, ja seda me ei tee.',
      },
      'roof-materials': {
        q: 'Millistele katustele pesu sobib?',
        a: 'Pesu sobib plekk-, kivi- ja eterniitkatustele. Surve ja otsak valitakse katusematerjali järgi, mitte vastupidi. Kui materjal survepesu ei kannata, ütleme seda enne töö algust, mitte pärast.',
      },
      weather: {
        // `{season}` arrives from `monthRange` in the NOMINATIVE — "aprill–oktoober".
        // Estonian running text would want "aprillist oktoobrini" here, so the range
        // is given as a standalone label rather than inflected mid-sentence.
        q: 'Mis ilmaga te ei tööta?',
        a: 'Tugeva tuulega, vihmaga ja miinuskraadidega me ei lenda. Hooaeg: {season}. Kui ilm töö edasi lükkab, lepime uue aja kokku ilma lisatasuta.',
      },
      frequency: {
        // No interval is asserted. The one-pager's "iga 3–5 aasta tagant" has no
        // source behind it, so the answer explains what drives the interval
        // instead. A number returns when there is something to cite.
        q: 'Kui tihti tuleks katust pesta?',
        a: 'Seda otsustab maja, mitte kalender. Kiiremini sammalduvad katused, mis jäävad varju, mille lähedal kasvavad puud ja mille kalded on põhja poole. Ka katusematerjal loeb. Kõige kindlam märk on katus ise: kui sammal on nähtav, on aeg pesta.',
      },
      garden: {
        q: 'Kas aiale ja haljastusele tekib kahju?',
        a: 'Tellinguid ega tõstukit ei ole vaja, seega ei tooda aeda midagi rasket. Maapinnale jääb kerge varustus ja meeskond. Enne tööd vaatame ümbruse üle ja lepime kokku, kuhu varustus paigutame.',
      },
      chemicals: {
        // unconfirmed: the cleaning product and its Estonian biocide
        // authorisation are not confirmed. Do not name a product here, do not
        // describe one, and do not claim that anything is biodegradable, plant-
        // safe or approved, until they are. PLAN Phase 10 replaces this answer.
        // The sentence below is the one already shipped on all ten service
        // pages, deliberately word for word — two places must not promise
        // different things.
        q: 'Millist puhastusainet te kasutate?',
        a: 'Ütleme pakkumises, millist puhastusainet teie objektil kasutame ja millise Eesti biotsiidiloa alusel see on lubatud. Toodet me enne seda ei nimeta.',
      },
      'water-power': {
        // unconfirmed: what the rig needs from a site is not settled. Do not
        // publish a tank capacity, a hose length, a flow rate, a power
        // requirement or "we bring our own water" until it is. The answer below
        // states only what we control — what we will have told the customer, and
        // when. PLAN Phase 10 replaces it.
        q: 'Kas te vajate objektilt vett ja voolu?',
        a: 'Ütleme pakkumises, kas ja mida me teie objektilt vajame. Lepime selle kokku enne töö algust, mitte kohapeal.',
      },
      duration: {
        // unconfirmed: no job durations have been measured — the first jobs are
        // not done. Do not publish a figure, a range or a "most houses in a day"
        // here until there is one. Word for word from the service pages.
        q: 'Kui kaua töö võtab?',
        a: 'Ütleme kestuse pakkumises, teie objekti kohta eraldi. Üldist arvu me ei avalda: see sõltub objektist ja meil ei ole veel oma mõõtmisi, millele tugineda.',
      },
      'price-basis': {
        // THIS ANSWER ENUMERATES THE SERVICES, so it goes stale every time one is
        // added. It named four when there were five; `tööstusobjektid` was added
        // with the sixth. An enumeration that silently omits a service is not
        // merely incomplete — it tells a reader their job is not priced here.
        q: 'Kuidas hind kujuneb?',
        a: 'Katuse- ja fassaadipesu hind arvutatakse ruutmeetri järgi ja algab avaldatud hinnast. Aknad, päikesepaneelid, vihmaveesüsteemid ja tööstusobjektid hinnastame objekti järgi. Kõik hinnad on ilma käibemaksuta ja täpne hind on kirjas pakkumises.',
      },
      minimum: {
        q: 'Kas väikesel tööl on miinimumhind?',
        a: 'Jah. Väikseima töö maksumus on {minimum}. Sellest väiksema töö puhul ei tasu väljasõit ja ülesseadmine end ära. Hind on ilma käibemaksuta.',
      },
      area: {
        q: 'Kus te töötate?',
        // `{area}` is "Tallinn ja Harjumaa", so "Baas on {area} ja teenindame…"
        // would run two `ja`s together. Short sentences instead, which is what
        // CLAUDE.md asks of Estonian copy anyway.
        a: 'Baas on {area}. Teenindame kogu Eestit. Saatke objekti aadress, siis ütleme, millal saame tulla.',
      },
      permission: {
        // The sentence is built so that `{authority}` lands in the NOMINATIVE.
        // `site.credentials.authority` is "Transpordiamet", and Estonian would
        // need the genitive "Transpordiameti" in "…ameti käitamisluba" — so the
        // copy is phrased around the authority as the subject rather than
        // declining a value that comes from the single source. Writing the
        // inflected form here would put a credential outside `site.ts`.
        q: 'Kas teil on luba elamute kohal lennata?',
        a: 'Jah. Meil on käitamisluba, mis lubab lennata elamute ja hoonestatud alade kohal — selle on väljastanud {authority}. Loa koopia saadame nõudmisel.',
      },
      insurance: {
        q: 'Kas töö on kindlustatud?',
        a: 'Jah. Meil on tegevusega seotud vastutuskindlustus. Tõendi saadame nõudmisel, ka enne töö tellimist.',
      },
      'ku-documents': {
        q: 'Mida te korteriühistule ja ärikliendile esitate?',
        a: 'Käitamisloa koopia, vastutuskindlustuse tõendi ja objektipõhise riskianalüüsi. Küsige neid koos pakkumisega, siis saadame need hinnaga ühes kirjas.',
      },
      /**
       * The four industrial questions. NONE OF THEM ASSERTS A COMPLETED JOB, and
       * that is the constraint they were written under rather than a happy
       * accident: this business has cleaned nothing yet, and an FAQ is exactly
       * where a capability list would sound like a track record. Every answer is
       * either a statement about our own conduct — what we send, when we send
       * it, what we ask before quoting — or an explicit invitation to ask.
       * `industrial-scope` in particular does NOT open with "Jah": a bare yes to
       * "do you cover industrial buildings" reads as "we have done them", which
       * is the one thing it must not say.
       *
       * `industrial-documents` deliberately overlaps `ku-documents` and does not
       * repeat it: that answer lists the three documents, this one is about WHEN
       * they arrive and in what form, because a safety officer's problem is
       * lead time rather than the contents.
       */
      'industrial-scope': {
        q: 'Kas te teete ka tööstus- ja ärihooneid?',
        a: 'Tööstus- ja suurobjektidel on eraldi teenus ja need lepime enne pakkumist teiega läbi. Tehased, laod, spordihooned, põllumajandushooned, silod ja mahutid, päikesepargid, laevad ja tuulikud on objektid, mille kohta tasub küsida. Öelge, mis objekt see on, kui kõrge, millest on pind ja kuidas ligi pääseb — selle põhjal ütleme, kas ja kuidas me töö ette võtame.',
      },
      'industrial-price': {
        q: 'Kuidas kujuneb tööstusobjekti hind ja miks mitte ruutmeetri järgi?',
        a: 'Suurobjekti hinna otsustavad ligipääs, kõrgus, pinnakate ja see, kas ja kui kaua saab tööks tootmise või liikluse peatada. Kaks ühesuguse pinnaga hoonet võivad nõuda päris erinevat tööd. Ruutmeetrihind annaks siin arvu, mis oleks kas teie või meie kahjuks vale, seepärast me seda ei avalda. Hind tuleb pärast läbirääkimist ja kirjalikult.',
      },
      'industrial-info': {
        q: 'Mida on tööstusobjekti pakkumiseks vaja teada?',
        a: 'Mis hoone või rajatis see on ja kui kõrge; millest on pind, mida pesta tuleb; kuidas objektile ligi pääseb ja mis jääb selle ümber; kas töö saab käia tootmise ajal või on vaja seisakuakent; ja objekti aadress. Fotod aitavad. Kui midagi neist veel teada ei ole, kirjutage ikkagi — puuduva osa lepime läbirääkimisel kokku.',
      },
      'industrial-documents': {
        q: 'Mida saab meie tööohutuse eest vastutav inimene?',
        a: 'Käitamisloa koopia, vastutuskindlustuse tõendi ja objektipõhise riskianalüüsi. Saadame need kirjalikult enne töö algust, mitte töö päeval, nii et jõuate need oma majas edasi anda ja läbi vaadata. Küsige need koos pakkumisega, siis tulevad need hinnaga ühes kirjas.',
      },
    },
  },
  en: {
    groups: {
      work: 'The work and your roof',
      price: 'Price and booking',
      documents: 'Authorisations and documents',
    },
    items: {
      'roof-damage': {
        q: 'Will the drone damage my roof?',
        a: 'The drone never touches the roof. Pressure and nozzle are matched to the material — low pressure on fibre-cement and older coverings. Most roof damage during cleaning comes from someone walking on it, and we do not do that.',
      },
      'roof-materials': {
        q: 'Which roofs can be cleaned this way?',
        a: 'Sheet metal, tile and fibre-cement roofs. The pressure and the nozzle are chosen to suit the material, not the other way round. If the material will not take pressure washing, we say so before the work starts, not after.',
      },
      weather: {
        q: 'In what weather can you not work?',
        a: 'We do not fly in strong wind, rain or sub-zero temperatures. The season runs {season}. If the weather postpones a job, we reschedule at no extra cost.',
      },
      frequency: {
        q: 'How often should a roof be cleaned?',
        a: 'That depends on the house, not on the calendar. Moss comes back faster on roofs that sit in shade, have trees close by, or have north-facing pitches. The roofing material matters too. The surest sign is the roof itself: once you can see moss, it is time.',
      },
      garden: {
        q: 'Will the garden be damaged?',
        a: 'No scaffolding and no lift means nothing heavy comes into the garden. Light equipment and the crew stay on the ground. We look the surroundings over before the work and agree where the equipment will stand.',
      },
      chemicals: {
        q: 'What cleaning product do you use?',
        a: 'We name the product we will use on your property in the quote, together with the Estonian biocide authorisation it is permitted under. We do not name a product before that.',
      },
      'water-power': {
        q: 'Do you need water and power on site?',
        a: 'The quote says whether we need anything from your property, and what. We agree it before the work starts, not on the day.',
      },
      duration: {
        q: 'How long does the work take?',
        a: 'We give the duration in the quote, for your property specifically. We do not publish a general figure: it depends on the property, and we have no measurements of our own to stand on yet.',
      },
      'price-basis': {
        // Enumerates the services and goes stale when one is added — see the Estonian block.
        q: 'How is the price worked out?',
        a: 'Roof and facade cleaning are priced by the square metre, from the published price. Windows, solar panels, guttering and industrial work are priced per site. All prices exclude VAT, and the exact price is set out in the written quote.',
      },
      minimum: {
        q: 'Is there a minimum charge for a small job?',
        a: 'Yes. The smallest job we take is {minimum}. Below that the trip and the setup do not pay for themselves. The price excludes VAT.',
      },
      area: {
        q: 'Where do you work?',
        a: 'We are based in {area} and work across Estonia. Give us the address when you ask for a quote and we will tell you when we can come.',
      },
      permission: {
        q: 'Are you allowed to fly over houses?',
        a: 'Yes. We hold an operational authorisation from {authority} covering flights over houses and built-up areas. We send a copy of it on request.',
      },
      insurance: {
        q: 'Is the work insured?',
        a: 'Yes. We carry third-party liability insurance for the work. We send proof of it on request, including before you book.',
      },
      'ku-documents': {
        q: 'What do you supply to a housing association or a commercial client?',
        a: 'A copy of the operational authorisation, proof of liability insurance and a site-specific risk assessment. Ask for them with the quote and they arrive in the same email as the price.',
      },
      /** The four industrial questions — see the constraint note in the Estonian block. */
      'industrial-scope': {
        q: 'Do you cover industrial and commercial buildings?',
        a: 'Industrial and large-scale work is a service of its own, and every job is scoped with you before we quote. Factories, warehouses, sports halls, agricultural buildings, silos and tanks, solar arrays, ships and wind turbines are all structures worth asking about. Tell us what the structure is, how tall, what the surface is and how the site is reached — from that we tell you whether and how we would take the work on.',
      },
      'industrial-price': {
        q: 'How is industrial work priced, and why not by the square metre?',
        a: 'What decides the price on a large structure is access, height, the surface, and whether production or traffic has to stop for the work and for how long. Two buildings with the same surface area can be completely different jobs. A square-metre price here would produce a number that was wrong in your favour or in ours, so we do not publish one. The price comes after scoping, in writing.',
      },
      'industrial-info': {
        q: 'What do you need to know before you can quote an industrial site?',
        a: 'What the building or structure is and how tall; what the surface to be cleaned is made of; how the site is reached and what surrounds it; whether the work can run during production or needs a shutdown window; and the address. Photographs help. If you do not know some of it yet, write anyway — we settle the rest at the scoping stage.',
      },
      'industrial-documents': {
        q: 'What does our safety or facilities team get?',
        a: 'A copy of the operational authorisation, proof of liability insurance and a site-specific risk assessment. We send them in writing before the work starts rather than on the day, so there is time to pass them on and read them. Ask for them with the quote and they arrive in the same email as the price.',
      },
    },
  },
} as const satisfies Record<Locale, FaqCopy>

/** One question, with every token already resolved. */
export interface FaqEntry {
  readonly id: FaqId
  readonly group: FaqGroup
  readonly q: string
  readonly a: string
}

/**
 * The questions, resolved. THE ONE PLACE A TOKEN IS REPLACED.
 *
 * Both callers go through it — the home excerpt and the FAQ page — and the FAQ
 * page builds its `FAQPage` JSON-LD from the same returned objects it renders.
 * Structured data that disagrees with the visible answer is a Google penalty
 * and, worse, a page that says one thing to a person and another to a machine;
 * making them the same string by construction is cheaper than remembering.
 *
 * Defaults to every question, in `faqIds` order. `Faq.astro` passes
 * `homeFaqIds`.
 */
export function faqEntries(
  locale: Locale,
  ids: readonly FaqId[] = faqIds,
): readonly FaqEntry[] {
  const copy = faqCopy[locale]
  const season = monthRange(site.season.fromMonth, site.season.toMonth, locale)
  const minimum = formatPrice(site.prices.minimumJob, locale)
  const area = locale === 'et' ? site.serviceArea.baseEt : site.serviceArea.baseEn
  const authority = site.credentials.authority

  return ids.map((id) => ({
    id,
    group: faqGroupOf[id],
    q: copy.items[id].q,
    a: copy.items[id].a
      .replace('{season}', season)
      .replace('{minimum}', minimum)
      .replace('{area}', area)
      .replace('{authority}', authority),
  }))
}

/** The questions of one group, in `faqIds` order. Used by the FAQ page. */
export function faqEntriesByGroup(locale: Locale, group: FaqGroup): readonly FaqEntry[] {
  return faqEntries(locale).filter((entry) => entry.group === group)
}
