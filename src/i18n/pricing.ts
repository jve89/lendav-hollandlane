import type { Locale } from './ui'

/**
 * Pricing page copy, both locales. One module per page, as `home.ts` is.
 *
 * NO EURO AMOUNT, NO PERCENTAGE AND NO UNIT PRICE APPEARS IN THIS FILE. Every
 * figure on `/hinnakiri` comes out of `PriceTable`, which reads `site.prices`
 * and resolves each service's `priceKind` through `priceLine()`. If you are
 * about to type a number into a string below, it belongs in `site.ts`.
 *
 * NO TOTAL, NO ESTIMATE, NO CALCULATOR — SPEC section 4, and `noCalculator`
 * below says so to the visitor in as many words rather than leaving the absence
 * to be read as an oversight. An area-based calculator would quote jobs we
 * would refuse and undercut jobs we should charge more for.
 *
 * WHAT IS NOT CLAIMED HERE. No saving against scaffolding, no speed multiple,
 * no "most houses in a day", no guarantee about how long the result lasts.
 * Every factor listed under `factors` changes a quote in a direction anyone can
 * verify by looking at a roof; none of them carries a figure.
 *
 * needs-native-review — every Estonian string below is AI-drafted and has NOT
 * been read by a native speaker. Phase 10 clears it.
 */

/** A thing that moves the price, named and explained. Never quantified. */
export interface PriceFactor {
  readonly label: string
  readonly text: string
}

export interface PricingCopy {
  lead: string
  factors: {
    heading: string
    lead: string
    items: readonly PriceFactor[]
  }
  /** How a quote is reached. Renders as an ordered list — the steps are a sequence. */
  quote: {
    heading: string
    steps: readonly string[]
  }
  excluded: {
    heading: string
    items: readonly string[]
  }
  noCalculator: {
    heading: string
    body: string
  }
}

export const pricingCopy = {
  et: {
    lead: 'Katuse- ja fassaadipesu hind algab avaldatud ruutmeetrihinnast. Täpse hinna ütleme pärast objekti ülevaatust ja kirjalikult.',
    factors: {
      heading: 'Mis hinda muudab',
      lead: 'Ruutmeetrihind on lähtekoht, mitte lõplik arv. Need on asjad, mida objektil üle vaatame, enne kui hinna ütleme.',
      items: [
        {
          label: 'Pind ja kalle',
          text: 'Suurem katus on ruutmeetri kohta soodsam. Järsk kalle ja keeruline kuju teevad töö aeglasemaks.',
        },
        {
          label: 'Sambla ja mustuse hulk',
          text: 'Paks sammal nõuab rohkem aega kui õhuke kate. Seda on näha juba fotolt.',
        },
        {
          label: 'Katusematerjal',
          text: 'Materjal otsustab surve ja otsaku. Vana eterniit ja kulunud katend nõuavad ettevaatlikumat ja aeglasemat tööd.',
        },
        {
          label: 'Ligipääs ja ümbrus',
          text: 'Puud, elektriliinid, naabermajad ja kitsas õu mõjutavad seda, kust saame lennata ja kui kaua ülesseadmine võtab.',
        },
        {
          label: 'Kõrgus',
          text: 'Kõrgem hoone tähendab pikemat lendu ja rohkem ettevalmistust.',
        },
        {
          label: 'Lisatööd',
          text: 'Rennide puhastust ja fassaadipesu saab tellida sama käiguga. Koos tellides on üks väljasõit, mitte kaks.',
        },
      ],
    },
    quote: {
      heading: 'Kuidas pakkumiseni jõuame',
      steps: [
        'Saatke objekti aadress ja ligikaudne katuse- või seinapind.',
        'Vaatame objekti üle ja lepime kokku, mida töö hõlmab ja mida mitte.',
        'Saadame kirjaliku hinna. Pakkumine on siduv.',
        'Lepime aja kokku. Kui ilm töö edasi lükkab, lisatasu ei tule.',
      ],
    },
    excluded: {
      heading: 'Mida hind ei sisalda',
      items: [
        'Katuse remonti. Katkiseid kive, lahtiseid plekke ja vigaseid läbiviike me ei paranda. Kui me neid pesu käigus näeme, anname teile teada.',
        'Katuse värvimist ega katmist.',
        'Vihmaveesüsteemi vahetust ega korstna remonti.',
      ],
    },
    noCalculator: {
      heading: 'Miks siin kalkulaatorit ei ole',
      body: 'Me ei pane siia arvutust, mis annaks teile kohe lõpliku summa. Iga objekt tuleb enne hinna ütlemist üle vaadata ja arv, mille kalkulaator annaks, oleks kas teie või meie kahjuks vale. Hinnakiri ütleb, kust hind algab; pakkumine ütleb, mis see teie majal on.',
    },
  },
  en: {
    lead: 'Roof and facade cleaning start from the published square-metre price. The exact price comes after we have looked the property over, and it comes in writing.',
    factors: {
      heading: 'What changes the price',
      lead: 'The square-metre price is the starting point, not the final number. These are the things we look at before quoting.',
      items: [
        {
          label: 'Area and pitch',
          text: 'A bigger roof costs less per square metre. A steep pitch and an awkward shape make the work slower.',
        },
        {
          label: 'How much moss there is',
          text: 'Thick moss takes longer than a thin film. It is usually visible in a photograph.',
        },
        {
          label: 'The roofing material',
          text: 'The material decides the pressure and the nozzle. Old fibre-cement and worn coatings need slower, more careful work.',
        },
        {
          label: 'Access and surroundings',
          text: 'Trees, power lines, neighbouring houses and a tight yard all affect where we can fly from and how long setting up takes.',
        },
        {
          label: 'Height',
          text: 'A taller building means a longer flight and more preparation.',
        },
        {
          label: 'Extra work',
          text: 'Gutter clearing and facade cleaning can be done on the same visit. Booked together they are one trip, not two.',
        },
      ],
    },
    quote: {
      heading: 'How we get to a quote',
      steps: [
        'Send us the address and the approximate roof or wall area.',
        'We look the property over and agree what the work covers and what it does not.',
        'We send a written price. The quote is binding.',
        'We agree a date. If the weather postpones the job, there is no extra charge.',
      ],
    },
    excluded: {
      heading: 'What the price does not include',
      items: [
        'Roof repairs. We do not fix cracked tiles, loose flashing or failed penetrations. If we see any during the work, we tell you.',
        'Painting or coating the roof.',
        'Replacing guttering or repairing a chimney.',
      ],
    },
    noCalculator: {
      heading: 'Why there is no calculator here',
      body: 'There is no widget on this page that hands you a final figure. Every property has to be looked at before it can be priced, and the number a calculator produced would be wrong in your favour or in ours. The price list tells you where the price starts; the quote tells you what it is for your house.',
    },
  },
} as const satisfies Record<Locale, PricingCopy>
