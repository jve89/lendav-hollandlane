import type { Locale } from './ui'

/**
 * Inspection page copy, both locales. One module per page, and it mirrors
 * `about.ts` deliberately — same `lead` + `sections[]` shape, same resolver
 * contract — so the page is a composition rather than a template with prose in
 * it.
 *
 * READ THIS BEFORE EDITING A SINGLE SENTENCE BELOW. This page describes work
 * that has never been done, for a line of business that holds no qualification
 * of any kind, using payloads the operator does not own. Three prohibitions
 * bind every string in this file, they are not stylistic, and SPEC section 11
 * is the governing copy:
 *
 * 1. NO CLAIM OR IMPLICATION OF WORK COMPLETED. No job count, no "we have
 *    inspected", no case study, no photograph of a result. Where the page lists
 *    kinds of job it says in the copy itself that the list describes the kind
 *    of work and not work already done — the same sentence, for the same
 *    reason, as the industrial service page.
 *
 * 2. NO CLAIM OR IMPLICATION OF A QUALIFICATION, CERTIFICATION, LICENCE OR
 *    PROFESSIONAL STANDING. Specifically forbidden, by name: energiamärgis,
 *    energiaaudit, energiaaudiitor, structural assessment, engineering opinion,
 *    insurance determination, and the words "expert", "certified" and
 *    "official" applied to us.
 *
 *    WHAT IS SOLD IS IMAGERY PLUS A WRITTEN RECORD OF WHAT IS VISIBLE ON IT —
 *    dated, with locations marked, one plain observation per finding. Writing
 *    "there are three cracked tiles at the ridge" is DESCRIPTION, and
 *    description is not a regulated activity. Do not retreat from that.
 *
 *    THIS COPY SAID "we produce no report, no assessment and no certificate"
 *    UNTIL 8 AUGUST 2026, AND IT WAS WRONG TWICE OVER. It sold RAW
 *    PHOTOGRAPHS, which nobody pays a premium for. And it made the referral to
 *    another professional sound like a PREREQUISITE when it is an EXCEPTION:
 *    most findings need no second professional at all — a housing association
 *    looking at photographs of cracked tiles does not need an engineer to
 *    decide to get repair quotes. The correction is recorded rather than
 *    quietly applied, because "no report" reads like the SAFE wording and a
 *    future session tightening this page will reach for it again.
 *
 *    The line to preserve if any of this is ever re-drafted: WE REPLACE THE
 *    SCAFFOLDING, NOT THE EXPERT. Where a finding genuinely does need an
 *    assessment, a calculation or a formal document, that is a next step with a
 *    different professional — and what we hand them is what they start from,
 *    which turns their day into an hour. That is the argument, and it is a
 *    better one than a borrowed credential would be.
 *
 *    NOTHING ON THIS PAGE MAKES A REGULATORY CLAIM EITHER, AND THAT IS AN
 *    OMISSION WITH A REASON. Which airspace, altitudes, distances and object
 *    types are permitted follows from the operational authorisation, and
 *    whether that authorisation reaches inspection flights is unverified. So
 *    the page states none of it and answers the question by scoping instead:
 *    we say whether we can take a site on when we have been told what it is.
 *    Do not add "we hold an official authorisation" here from the home page on
 *    the grounds that it is true elsewhere.
 *
 * 3. TODO(equipment): NO EQUIPMENT CLAIM, AND THE PROHIBITION AT THE TOP OF
 *    `about.ts` APPLIES HERE IN FULL. No drone make or model, no camera or
 *    payload name, no sensor specification, no resolution, no flight time. The
 *    payloads for this work are rented and nothing is owned yet. The thermal
 *    section below is written so it survives that: it agrees to arrange the
 *    imagery and states one general physical fact about when a thermal
 *    difference is visible at all. It promises no sensor and no season.
 *
 * THE THERMAL SECTION CARRIES A SECOND BOUNDARY AND IT IS LOAD-BEARING, NOT
 * THOROUGHNESS. `content/services/{et,en}/…solar…` says we do no thermal-camera
 * or output measurement and no electrical work. That disclaimer is true,
 * protective, and STAYS — do not "reconcile" it by weakening it. The risk is
 * that a visitor meets an offer of thermal imagery here and a refusal of
 * thermal-camera work there and reads a contradiction; on a close reading there
 * is none, and a visitor does not do a close reading. So the boundary is stated
 * on THIS side instead: thermal imagery is documentation, never measurement and
 * never diagnosis, and that holds with solar panels in the frame.
 *
 * DO NOT ADD A CROSS-LINK FROM THE SOLAR PAGE TO THIS ONE. It looks like the
 * obvious tidy-up and it is the one thing that would make this worse: no
 * thermal job has been flown and no payload has been rented, so a link from a
 * cleaning page saying "we do this over here" advertises a service that has
 * never been performed. Revisit after the first one. SPEC section 11 records
 * the decision and this reason.
 *
 * NO PRICE, NO TURNAROUND, NO AVAILABILITY. Quote-based only, on exactly the
 * terms the industrial service page uses. `site.ts` holds no inspection price
 * and this file must never become the place one is typed.
 *
 * NO REPORT FORMAT IS DESCRIBED, AND THAT IS A DECISION RATHER THAN AN
 * OVERSIGHT. The copy says the record is written, dated and located, and stops
 * there: no page count, no file type, no section structure, no sample. None of
 * that is decided, and a page that specifies it commits the operator to a
 * deliverable shape before he has produced one. Describing the format is also
 * how a plain description starts sounding like a regulated document.
 *
 * NOR DOES THE PAGE SAY WHETHER THE WORK IS FREE OR PAID. Not decided, not
 * needed. Do not add "free with a clean" or "charged separately".
 *
 * needs-native-review — every Estonian string below is AI-drafted and has NOT
 * been read by a native speaker. Phase 10 clears it.
 */

export interface InspectionSection {
  readonly heading: string
  /** One or more paragraphs. */
  readonly body: readonly string[]
  /**
   * An optional bulleted list under the paragraphs. Used once, for the kinds of
   * job worth asking about — where the paragraph immediately above it is the
   * one that says the list is not a portfolio.
   */
  readonly list?: readonly string[]
}

export interface InspectionCopy {
  lead: string
  sections: readonly InspectionSection[]
}

export const inspectionCopy = {
  et: {
    lead: 'Lendame ja pildistame pinnad, mida muidu ilma tellingute, tõstuki või katusel kõndimiseta näha ei ole. Saate pildid ja kirjaliku ülevaate sellest, mis neil näha on: kus see on ja mis see on. Me asendame tellingud, mitte spetsialisti.',
    sections: [
      {
        heading: 'Mida te tellides saate',
        body: [
          'Pildid ja nende juurde kirjaliku ülevaate. Iga tähelepanek on kirjas eraldi: kuupäev, asukoht objektil ja see, mis pildil näha on.',
          'Kirjeldame seda, mis pildil on — näiteks et harjal on kolm pragunenud katusekivi või et ühes kohas on plekiliide lahti. See on kirjeldus, mitte hinnang: ütleme, mida on näha, mitte seda, mida sellega peale hakata.',
          'Materjal on teie oma. Saatke see edasi kellele soovite — katusefirmale, ehitajale, ühistu juhatusele, kindlustusele. Meie luba selleks vaja ei ole.',
        ],
      },
      {
        heading: 'Mida me ei tee',
        body: [
          'Me ei väljasta akte ega sertifikaate, ei hinda konstruktsiooni, ei diagnoosi elektrisüsteeme ega ütle, mis remont maksma läheb.',
          'Enamik tähelepanekuid ei vaja selleks kedagi teist. Kui ühistu näeb fotolt pragunenud katusekive, ei ole inseneri vaja selleks, et otsustada remondipakkumisi küsida.',
          'Kui mõni tähelepanek nõuab hinnangut, arvutust või ametlikku dokumenti, on see järgmine samm ja selle teeb oma ala spetsialist. Meie materjal on täpselt see, millelt tema alustab — ja see teeb tema päevatööst tunni, sest keegi ei pea enam üles ronima.',
          'Katusele ei astu keegi ja tellinguid me ei püstita. Kogu meeskond jääb maapinnale.',
        ],
      },
      {
        heading: 'Millistest objektidest tasub küsida',
        body: [
          'Allolev nimekiri ütleb, millistest töödest me räägime — mitte seda, mis on juba tehtud. Kui teie objekt on selline või sarnane, tasub küsida:',
        ],
        list: [
          'katused ja katusekatted',
          'fassaadid, liitekohad ja plekitööd',
          'korstnad ja katuseläbiviigud',
          'vihmaveesüsteemid',
          'päikesepaneelid ja nende kinnitused',
          'tööstushooned, laod ja tootmishooned',
          'kõrged rajatised ja kõrgel asuvad konstruktsioonid',
          'ehitusjärgu pildistamine',
        ],
      },
      {
        heading: 'Termopilt',
        body: [
          'Termopilti saab eraldi kokku leppida. Öelge seda päringus, siis räägime selle koos ülejäänuga läbi.',
          'Termopilt on dokumenteerimine, mitte mõõtmine ega diagnostika, ja see piir kehtib ka siis, kui pildil on päikesepaneelid. Paneelide tootlikkust ega väljundit me ei mõõda ning elektrisüsteemi me ei diagnoosi ega otsi sellest rikkeid — need on elektritööd ja neid teeb päikeseelektri paigaldaja.',
          'Üks üldine füüsikaline asjaolu, mis ei ole meiepoolne lubadus: termopilt näitab pinnatemperatuuri erinevusi, ja neid on näha ainult siis, kui pindade vahel on temperatuurivahe. Ilma selleta ei ole pildil midagi eristada. Millal see teie objektil nii on, lepime läbirääkimisel kokku.',
          'Mida temperatuurierinevus tähendab, ütleb teie oma spetsialist. Meie anname pildi ja selle juurde aja ja tingimused, millal see tehti.',
        ],
      },
      {
        heading: 'Kuidas küsida ja kuidas hind kujuneb',
        body: [
          'Ruutmeetrihinda ülevaatusele ei ole, ja see ei ole väljajätt. Hind sõltub objektist, sellest mida on vaja pildistada ja kui palju materjali te soovite.',
          'Kirjutage meile ja öelge, mis objekt see on ja kui kõrge, kus see asub, mida te näha soovite ja kellele materjal läheb. Selle põhjal ütleme, kas ja kuidas me töö ette võtame, mida see hõlmab ja mida mitte. Alles siis tuleb hind, ja see tuleb kirjalikult.',
          'Kui objekt selleks tööks ei sobi, ütleme seda läbirääkimisel, mitte pärast.',
        ],
      },
      {
        heading: 'Pesu ja ülevaatus on kaks eri tööd',
        body: [
          'Pesu ei ole ülevaatus ja ülevaatus ei ole pesu. Neid saab tellida koos ja sama käiguga, aga need lepitakse kokku ja hinnastatakse eraldi.',
          /* THE BEFORE-A-WASH CONNECTION, and it is ONE sentence on purpose.
             Ülevaatus is a standalone service and this paragraph is secondary —
             an option, not the definition. Phrased as an OFFER ("saab ... üle
             vaadata"), never as a report: nobody has done this, no inspection
             job has been performed, and "kliendid tellivad sageli" would be
             constraint 1 arriving through a side door. See the note over
             `inspectionPointers`. */
          'Ülevaatust saab tellida ka enne pesu: kui te ei ole kindel, kas pesu on üldse vaja, saab objekti enne üle vaadata ja siis otsustada.',
          'Kui soovite mõlemat, kirjutage seda päringusse — siis vastame mõlemale ühes kirjas.',
        ],
      },
    ],
  },
  en: {
    lead: 'We fly and photograph the surfaces you cannot otherwise see without scaffolding, a lift, or somebody standing on the roof. You get the images and a written record of what is visible on them: where it is, and what it is. We replace the scaffolding, not the expert.',
    sections: [
      {
        heading: 'What you get',
        body: [
          'The images, and a written record to go with them. Each observation is set out on its own: the date, where on the property it is, and what is visible there.',
          'We describe what is in the picture — that there are three cracked tiles at the ridge, say, or that a flashing has lifted in one place. That is description, not judgement: we say what can be seen, not what to do about it.',
          'The material is yours. Pass it on to whoever you like — a roofing firm, a builder, the board of a housing association, an insurer. You do not need our permission.',
        ],
      },
      {
        heading: 'What we do not do',
        body: [
          'We issue no certificates, we do not assess structure, we do not diagnose electrical systems, and we do not tell you what a repair will cost.',
          'Most findings need none of that. A housing association looking at photographs of cracked tiles does not need an engineer in order to decide to get repair quotes.',
          'Where a finding does need an assessment, a calculation or a formal document, that is the next step and it belongs to a specialist in that field. What we hand you is exactly what they start from — and it turns their day into an hour, because nobody has to climb anything to begin.',
          'Nobody walks on the roof and we put up no scaffolding. The whole crew stays on the ground.',
        ],
      },
      {
        heading: 'The sites worth asking about',
        body: [
          'The list below says which jobs we discuss — not what has already been done. If yours is one of these, or close to one, it is worth asking:',
        ],
        list: [
          'roofs and roof coverings',
          'facades, junctions and sheet metalwork',
          'chimneys and roof penetrations',
          'guttering and downpipes',
          'solar panels and their mountings',
          'industrial buildings, warehouses and production halls',
          'tall structures and constructions at height',
          'photography during a build',
        ],
      },
      {
        heading: 'Thermal imagery',
        body: [
          'Thermal imagery can be agreed separately. Say so in your enquiry and we scope it with the rest.',
          'A thermal image is documentation, not measurement and not diagnosis, and that boundary holds when there are solar panels in the frame. We do not measure the output or the productivity of panels, and we do not diagnose an electrical system or look for faults in it — that is electrical work and it is for a solar installer.',
          'One general physical fact, which is not a promise from us: a thermal image shows differences in surface temperature, and those are only visible when there is a temperature difference between the surfaces to begin with. Without one there is nothing on the image to tell apart. When that holds on your site is something we agree at the scoping stage.',
          'What a temperature difference means is for your own specialist to say. We supply the image, with the time and the conditions it was taken in.',
        ],
      },
      {
        heading: 'How to ask, and how the price is reached',
        body: [
          'There is no square-metre price for this, and that is not an omission. The price depends on the site, on what has to be photographed, and on how much material you want.',
          'Write to us and tell us what the structure is and how tall, where it is, what you want to see, and who the material is for. From that we tell you whether and how we would take the work on, what it covers and what it does not. The price comes after that, and it comes in writing.',
          'If the site turns out not to suit this work, we say so at the scoping stage, not afterwards.',
        ],
      },
      {
        heading: 'Cleaning and inspection are two different jobs',
        body: [
          'Cleaning is not an inspection and an inspection is not a clean. They can be booked together and flown on the same visit, but they are scoped and priced separately.',
          /* The before-a-wash connection — one sentence, secondary, and phrased
             as an offer. See the note on the Estonian block. */
          'An inspection can also be booked before a wash: if you are not sure whether a wash is needed at all, you can have the property looked at first and decide afterwards.',
          'If you want both, say so in your enquiry and we answer both in the same email.',
        ],
      },
    ],
  },
} as const satisfies Record<Locale, InspectionCopy>

/**
 * The sections, widened to the declared interface — the same accessor shape
 * `aboutSections()` has, and for a reason that is not cosmetic.
 *
 * `as const satisfies` keeps the literal types, so `section.list` does not
 * exist on a section that has no list and a page mapping over the raw array
 * fails `astro check` on the optional field. Reading through here is what makes
 * `list` an `InspectionSection['list']` again.
 *
 * There is NO TOKEN RESOLUTION here today, and that is not an oversight: this
 * page states no price, no area, no season and no credential, so there is
 * nothing from `site.ts` to resolve. If a fact from the single source is ever
 * needed in this copy, it arrives as a `{token}` and is replaced here, exactly
 * as `aboutSections()` and `faqEntries()` do it — never typed into a string.
 */
export function inspectionSections(locale: Locale): readonly InspectionSection[] {
  return inspectionCopy[locale].sections
}

/**
 * THE THREE POINTERS — the inspection copy that appears on WASHING surfaces.
 *
 * Added 8 August 2026, replacing `PathChooser`. Inspection is reached from
 * three places, decreasing in size, each arriving in the middle of a washing
 * argument at the moment the offer is relevant:
 *
 *   home     a full section on both home pages, after the before/after evidence
 *            and before `CompareTable`
 *   services a short note under the six-card grid on `/teenused`
 *   pricing  a short block under the washing price table on `/hinnakiri`
 *
 * THE GOVERNING RULE, AND IT IS SPEC SECTION 11: inspection appears wherever the
 * washing set appears **as a POINTER, never as a MEMBER of the set**. Not a
 * seventh card in the grid, not a seventh row in the price table, not a seventh
 * `serviceKey`. It is a standalone service that happens to be linkable from the
 * washing pages. A card would read as a seventh service; a table row would imply
 * a per-m² price it does not have.
 *
 * THEY LIVE HERE RATHER THAN IN `home.ts`, `pricing.ts` OR `ui.ts`, and that is
 * the same reasoning `inspectionServiceOption` below already rests on: every one
 * of these strings is bound by the prohibitions at the top of THIS file, and a
 * session editing them should be standing next to those prohibitions rather than
 * two files away from them. It also means the pointers leave with the page if
 * the page ever goes.
 *
 * THREE PIECES OF COPY, NOT ONE COMPONENT WITH A SIZE PROP. They differ in
 * length, in shape and in what they have to say — the pricing block has to
 * answer "what does it cost" and the other two do not — so each has its own
 * component and its own markup. Do not unify them.
 *
 * THE ERROR THIS COPY IS MOST LIKELY TO ACQUIRE, and it is worth naming because
 * it is one word away at all times: **the connection to washing is phrased as an
 * OFFER, never as a REPORT.** Write "you can have it looked at first". Never
 * "customers often have it looked at first", "many housing associations start
 * here", "this is a common first step", or anything else implying it has
 * happened. **No inspection job has been performed and no customer has done
 * this.** That is constraint 1 — the unperformed-work prohibition — arriving
 * through a side door, and a sentence in the reporting voice reads so naturally
 * that it will not look like a violation.
 */
export interface InspectionPointer {
  readonly heading: string
  readonly body: readonly string[]
  /** Link text. A phrase, never "Read more" — it is the link's accessible name. */
  readonly cta: string
}

export interface InspectionPointers {
  home: InspectionPointer
  services: InspectionPointer
  pricing: InspectionPointer
}

export const inspectionPointers = {
  et: {
    home: {
      heading: 'Ülevaatus droonilt',
      body: [
        'Pesu kõrval teeme ka teist tööd: lendame ja pildistame pinnad, mida muidu ilma tellingute, tõstuki või katusel kõndimiseta näha ei ole. Katus, korsten, plekiliited, fassaadi ülemine serv, rennid — need kohad, mille seisukorrast räägitakse tavaliselt oletustes, sest keegi ei ole neid lähedalt näinud.',
        'Saate pildid ja kirjaliku ülevaate sellest, mis neil näha on: kuupäev, asukoht objektil ja see, mis seal on. Kirjeldame, mida on näha — näiteks et harjal on kolm pragunenud katusekivi. Akte ega sertifikaate me ei väljasta, konstruktsiooni ei hinda ja remondi maksumust ei ütle.',
        'Enamik tähelepanekuid ei vaja selleks kedagi teist. Kui mõni siiski vajab, on see järgmine samm ja selle teeb oma ala spetsialist — meie materjal on täpselt see, millelt tema alustab. Me asendame tellingud, mitte spetsialisti.',
        'Ülevaatust saab tellida ka enne pesu, kui te ei ole kindel, kas pesu üldse vaja on.',
      ],
      cta: 'Vaata, kuidas ülevaatus käib',
    },
    services: {
      heading: 'Ülevaatus on eraldi töö',
      body: [
        'Ülevaatus ei ole selles nimekirjas ega ole pesuteenus. Selle puhul me ei pese midagi: lendame, pildistame ja paneme kirja, mis pildil näha on.',
        'Kui te ei ole kindel, kas pesu on üldse vaja, saab objekti enne üle vaadata ja siis otsustada.',
      ],
      cta: 'Ülevaatus droonilt',
    },
    pricing: {
      heading: 'Ülevaatuse hind',
      body: [
        'Ülevaatus ei ole selles tabelis, sest sellel ei ole ruutmeetrihinda. Hinna ütleme töö kaupa: see sõltub objektist, ligipääsust ja sellest, mida te dokumenteeritud näha soovite.',
        'Kirjutage, mis objekt see on ja mida te näha soovite. Ütleme hinna kirjalikult.',
      ],
      cta: 'Vaata, kuidas ülevaatus käib',
    },
  },
  en: {
    home: {
      heading: 'Inspection by drone',
      body: [
        'Alongside the washing we do a second kind of work: we fly and photograph the surfaces you cannot otherwise see without scaffolding, a lift, or somebody standing on the roof. The roof, the chimney, the flashings, the top edge of a facade, the gutters — the places whose condition usually gets discussed in guesses, because nobody has seen them close up.',
        'You get the images and a written record of what is visible on them: the date, where on the property it is, and what is there. We describe what can be seen — that there are three cracked tiles at the ridge, say. We issue no certificates, we do not assess structure, and we do not tell you what a repair will cost.',
        'Most findings need nobody else at all. Where one does, that is the next step and it belongs to a specialist in that field — and what we hand them is exactly what they start from. We replace the scaffolding, not the expert.',
        'An inspection can also be booked before a wash, if you are not sure whether a wash is needed at all.',
      ],
      cta: 'See how an inspection works',
    },
    services: {
      heading: 'Inspection is separate work',
      body: [
        'Inspection is not on this list and it is not a washing service. Nothing gets washed: we fly, we photograph, and we write down what is visible on the images.',
        'If you are not sure whether a wash is needed at all, you can have the property looked at first and decide afterwards.',
      ],
      cta: 'Inspection by drone',
    },
    pricing: {
      heading: 'What an inspection costs',
      body: [
        'Inspection is not in this table, because it has no square-metre price. It is quoted per job: it depends on the property, on the access, and on what you want documented.',
        'Write and tell us what the property is and what you want to see. We give the price in writing.',
      ],
      cta: 'See how an inspection works',
    },
  },
} as const satisfies Record<Locale, InspectionPointers>

/**
 * One pointer, widened to the declared interface — same reason as
 * `inspectionSections()` above: `as const satisfies` keeps the literal types,
 * and a component mapping over the raw array trips over readonly literals.
 */
export function inspectionPointer(
  surface: keyof InspectionPointers,
  locale: Locale,
): InspectionPointer {
  return inspectionPointers[locale][surface]
}

/**
 * The extra option in the quote form's service `<select>`, and the ONE string
 * in this file that is rendered outside the inspection page.
 *
 * It lives here rather than in `contact.ts` on purpose. `QuoteForm`'s options
 * otherwise come from `servicesFor()` — the contract in ARCHITECTURE section 6,
 * which exists so the options cannot drift from the service pages — and this is
 * the single, named exception to it: inspection is not a service in the
 * collection and must not become one. Keeping the string beside the page that
 * justifies it means the option leaves with the page if the page ever does.
 *
 * The VALUE is what lands in the operator's inbox, so it says what the work is
 * rather than being terse. It is not a preselectable `defaultService`: nothing
 * links to the form with it chosen, and inventing an id for it would put a
 * fake slug into a collection-shaped comparison.
 */
export const inspectionServiceOption = {
  et: 'Ülevaatus droonilt',
  en: 'Inspection by drone',
} as const satisfies Record<Locale, string>
