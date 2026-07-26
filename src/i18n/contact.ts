import { site } from '../config/site'
import type { Locale } from './ui'

/**
 * Contact page and quote form copy, both locales. One module per page, as
 * `pricing.ts` and `about.ts` are.
 *
 * NO PHONE NUMBER, EMAIL, COMPANY NAME, MONTH NAME OR PRICE IS TYPED IN THIS
 * FILE. The privacy notice carries a `{company}` token and `contactContent()`
 * resolves it from `site.legalName` — the same mechanism `faqEntries()` uses for
 * `{season}` and `{authority}`, and for the same reason: the legal name is not
 * settled either, and a string that names the company is a copy of the single
 * source. See CLAUDE.md, "The single-source rule".
 *
 * WHICH FIELDS ARE REQUIRED, AND WHY IT IS NOT AN OVERSIGHT. Required: name,
 * email, property address. Optional: phone, approximate area, message.
 *
 * SPEC section 3 item 5 wants an enquiry carrying an address and an approximate
 * area — but a homeowner usually does not know their roof area, and a required
 * field somebody cannot answer is a field they abandon. So the area is asked
 * for, left optional, and given a hint saying an estimate is fine because we
 * measure it ourselves. Native HTML validation cannot express "phone OR email",
 * so email carries the requirement and the phone number is the bonus. A later
 * session must not "tighten" this: the conversion cost of a required area field
 * is larger than the value of the answer.
 *
 * NO TIMEFRAME IS PROMISED ANYWHERE BELOW. Not on the form, not on the
 * thank-you page. "We reply within one working day" is a commitment nobody in
 * this business has made, and one person flying fifteen days a month cannot
 * stand behind it. What is promised — a written price, a site visit before the
 * price — is what `pricing.ts` already says and is verifiable conduct.
 *
 * needs-native-review — every Estonian string below is AI-drafted and has NOT
 * been read by a native speaker. Phase 10 clears it.
 */

/** A form field's visible copy. `hint` renders under the input, never as placeholder text. */
export interface FieldCopy {
  readonly label: string
  readonly hint?: string
}

export interface ContactCopy {
  lead: string
  form: {
    heading: string
    /** Appended to the label of every field that is not `required`. */
    optional: string
    fields: {
      name: FieldCopy
      email: FieldCopy
      phone: FieldCopy
      address: FieldCopy
      service: FieldCopy
      area: FieldCopy
      message: FieldCopy
    }
    submit: string
    /** Formspree's `_subject`, so the operator's inbox sorts itself. */
    subject: string
    /** Label for the `_gotcha` honeypot. Hidden from people and screen readers alike. */
    gotcha: string
    /** Bolded lead-in to the privacy notice. Not a heading — it sits inside the form. */
    privacyLead: string
    /** The GDPR notice, one sentence per entry. `{company}` resolves from site.ts. */
    privacy: readonly string[]
  }
  aside: {
    heading: string
    phoneLabel: string
    replyLabel: string
    reply: string
    areaLabel: string
    seasonLabel: string
    seasonNote: string
  }
  thanks: {
    lead: string
    nextHeading: string
    next: readonly string[]
    callLead: string
  }
}

const copy = {
  et: {
    lead: 'Kirjuta, mis objektiga on tegu ja kus see asub. Vaatame üle ja saadame kirjaliku hinna. Pakkumise küsimine ei kohusta millekski.',
    form: {
      heading: 'Objekti andmed',
      optional: '(valikuline)',
      fields: {
        name: { label: 'Nimi' },
        email: { label: 'E-post', hint: 'Siia saadame pakkumise.' },
        phone: { label: 'Telefon', hint: 'Kui eelistad, et helistame.' },
        address: { label: 'Objekti aadress', hint: 'Tänav, maja ning linn või vald.' },
        service: { label: 'Teenus' },
        area: {
          label: 'Ligikaudne pind',
          hint: 'Piisab hinnangust. Täpse pinna mõõdame ise üle, seega ära muretse, kui sa seda ei tea.',
        },
        message: {
          label: 'Mida sa objektist tead',
          hint: 'Katusematerjal, sambla hulk, hoone kõrgus, ligipääs õuele. Kirjuta see, mis teada on.',
        },
      },
      submit: 'Saada päring',
      subject: 'Uus päring veebilehelt',
      gotcha: 'Jäta see väli tühjaks',
      privacyLead: 'Andmekaitse.',
      privacy: [
        'Vormiga saadad meile oma nime, e-posti aadressi, objekti aadressi ja selle, mida ise tööst kirjutad. Telefoninumber, pind ja kirjeldus on vabatahtlikud.',
        'Kasutame neid andmeid ainult pakkumise koostamiseks ja sinuga selle asjus ühenduse võtmiseks. Muuks me neid ei kasuta.',
        'Andmeid hoiab {company}. Me ei müü neid ega anna edasi kolmandatele isikutele.',
        'Vormi saadetisi vahendab väline teenusepakkuja Formspree, mis on Ameerika Ühendriikide ettevõte.',
      ],
    },
    aside: {
      heading: 'Kontakt ja piirkond',
      phoneLabel: 'Telefon',
      replyLabel: 'Kuidas vastame',
      reply: 'Vastame kirjalikult. Kui jätad telefoninumbri, võime ka helistada.',
      areaLabel: 'Teeninduspiirkond',
      seasonLabel: 'Hooaeg',
      seasonNote: 'Pesutööd teeme hooajal. Päringuid ootame ka väljaspool seda.',
    },
    thanks: {
      lead: 'Päring on meieni jõudnud. Sinule ei ole vaja praegu midagi teha.',
      nextHeading: 'Mis edasi saab',
      next: [
        'Vaatame objekti üle. Kui on vaja fotot või täpsustust, küsime seda sinu käest.',
        'Saadame kirjaliku hinna. Pakkumine on siduv.',
        'Lepime aja kokku. Kui ilm töö edasi lükkab, lisatasu ei tule.',
      ],
      callLead: 'Kui tahad vahepeal midagi küsida, helista:',
    },
  },
  en: {
    lead: 'Tell us what the property is and where it is. We look it over and send a written price. Asking for a quote commits you to nothing.',
    form: {
      heading: 'About the property',
      optional: '(optional)',
      fields: {
        name: { label: 'Name' },
        email: { label: 'Email', hint: 'This is where the quote goes.' },
        phone: { label: 'Phone', hint: 'If you would rather we called.' },
        address: { label: 'Property address', hint: 'Street, number, and the town or parish.' },
        service: { label: 'Service' },
        area: {
          label: 'Approximate area',
          hint: 'An estimate is fine. We measure it properly ourselves, so do not worry if you do not know.',
        },
        message: {
          label: 'What you know about the property',
          hint: 'Roofing material, how much moss, the height of the building, access to the yard. Whatever you have.',
        },
      },
      submit: 'Send enquiry',
      subject: 'New enquiry from the website',
      gotcha: 'Leave this field empty',
      privacyLead: 'Data protection.',
      privacy: [
        'This form sends us your name, your email address, the property address, and whatever you write about the job. The phone number, the area and the description are optional.',
        'We use this only to prepare a quote and to contact you about it. Nothing else.',
        'The data is held by {company}. We do not sell it and we do not pass it on to anyone.',
        'Submissions are handled by an external form service, Formspree, which is a United States company.',
      ],
    },
    aside: {
      heading: 'Contact and area',
      phoneLabel: 'Phone',
      replyLabel: 'How we reply',
      reply: 'We reply in writing. If you leave a phone number, we may call instead.',
      areaLabel: 'Service area',
      seasonLabel: 'Season',
      seasonNote: 'The cleaning work runs in season. Enquiries are welcome outside it.',
    },
    thanks: {
      lead: 'Your enquiry has reached us. There is nothing you need to do right now.',
      nextHeading: 'What happens next',
      next: [
        'We look the property over. If we need a photograph or a detail, we ask you for it.',
        'We send a written price. The quote is binding.',
        'We agree a date. If the weather postpones the job, there is no extra charge.',
      ],
      callLead: 'If you want to ask something in the meantime, call:',
    },
  },
} as const satisfies Record<Locale, ContactCopy>

/**
 * The contact copy with its tokens resolved from `site.ts`.
 *
 * Only the privacy notice carries a token today, but it goes through a resolver
 * rather than being read directly so that the next fact someone needs in this
 * copy — the season, the area, a price — has an obvious place to be resolved
 * instead of being typed in. `faqEntries()` is the same shape.
 */
export function contactContent(locale: Locale) {
  const c = copy[locale]
  return {
    ...c,
    form: {
      ...c.form,
      privacy: c.form.privacy.map((line) => line.replace('{company}', site.legalName)),
    },
  }
}
