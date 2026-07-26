import { site } from '../config/site'
import type { Locale } from './ui'

/**
 * Privacy policy copy, both locales. One module per page, as `about.ts` and
 * `contact.ts` are.
 *
 * The inline notice inside the quote form covers the FORM. This page covers the
 * SITE, which is why PLAN put it in Phase 9 rather than Phase 6, and why the
 * notice on `/kontakt` is allowed to stay short: it defers to this.
 *
 * NO COMPANY NAME, REGISTRY CODE, PHONE NUMBER OR EMAIL IS TYPED BELOW. `{company}`
 * and `{regCode}` resolve from `site.ts` in `privacyContent()`, the same mechanism
 * `contactContent()` and `faqEntries()` use. The routes offered for a deletion or
 * access request are the phone number and the quote form, and both work.
 *
 * No email address appears at all, and as of 26 July 2026 that is no longer
 * because the address is broken — `site.email` works. Whether this page should
 * now ALSO offer it is an open question rather than a settled one: email is the
 * conventional route for a GDPR request, and a policy offering only a phone
 * number and a web form may read as offering no route at all. It is Estonian
 * copy on the one page with consequences outside this repository, so it is
 * paired with the legal read of this policy on PLAN's blocked list. Do not
 * resolve it by adding the address here on a tidy-up.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * TWO CLAIMS ON THIS PAGE CAN BE FALSIFIED FROM A DASHBOARD, WITH NO COMMIT.
 *
 * This is the same class of hazard as the Formspree reCAPTCHA and domain-restriction
 * settings documented in Phase 6: real, outside this repository, and undetectable
 * from inside it. Both belong to the host.
 *
 *   1. ANALYTICS. Cloudflare can inject its Web Analytics beacon into a Pages
 *      project from the dashboard. Nothing changes in the repo, no build runs, and
 *      the "we run no analytics" sentence below becomes false silently. Analytics
 *      is DECIDED as none — ARCHITECTURE section 1 — so if anyone ever turns that
 *      switch on, this page must be rewritten in the same hour.
 *
 *   2. COOKIES. Cloudflare's own bot-management cookie (`__cf_bm`) is set by the
 *      edge, not by this site, and Bot Fight Mode is a dashboard toggle. THIS IS
 *      WHY the sentence below says what *we* do — we set no cookies, we run no
 *      analytics — rather than the broader "this site sets no cookies", which we
 *      could not stand behind. Do not "tighten" it into the broader claim.
 *
 * The host is named in the copy on purpose. It processes visitors' IP addresses in
 * order to serve the page, which is a disclosure a reader is entitled to, and it
 * is a fact about our infrastructure rather than a contact detail or a price — so
 * it is written here rather than in `site.ts`, on the same footing as Formspree
 * already is in `contact.ts`. ARCHITECTURE sections 1 and 9 are where the hosting
 * decision lives; if it ever changes, this file changes with it.
 * ────────────────────────────────────────────────────────────────────────────
 *
 * WHAT THIS PAGE DELIBERATELY DOES NOT SAY. It states no retention period in days
 * or months, because nobody has decided one and CLAUDE.md forbids inventing it. It
 * states a CRITERION instead — how long the enquiry is needed for — which GDPR
 * permits, is true today, and survives a real policy being written later. Same
 * pattern as the unconfirmed FAQ answers. Do not replace the criterion with a
 * number until the operator has chosen one.
 *
 * It also claims no certification, no audit, no standard and no DPO, because there
 * is none.
 *
 * needs-native-review — every Estonian string below is AI-drafted and has NOT been
 * read by a native speaker. Phase 10 clears it.
 *
 * needs-legal-review — this is legal copy written by an AI. Every sentence is a
 * statement about our own conduct that is true as far as this repository can tell,
 * but that is not the same as a lawyer having read it. See the Phase 9 report.
 */

export interface PrivacySection {
  readonly heading: string
  /** One or more paragraphs. May contain the tokens resolved below. */
  readonly body: readonly string[]
}

export interface PrivacyCopy {
  lead: string
  sections: readonly PrivacySection[]
}

const copy = {
  et: {
    lead: 'Sellel lehel on kirjas, milliseid andmeid me küsime, milleks neid kasutame ja kui kaua hoiame. Lühidalt: küsime ainult seda, mis on pakkumise tegemiseks vaja, ja ei anna seda kellelegi edasi.',
    sections: [
      {
        heading: 'Kes andmeid töötleb',
        body: [
          'Vastutav töötleja on {company}, registrikood {regCode}.',
          'Kõigis andmetega seotud küsimustes saab meiega ühendust võtta telefoni teel või päringuvormi kaudu.',
        ],
      },
      {
        heading: 'Mida me kogume',
        body: [
          'Ainus koht, kus see veebileht sinu käest midagi küsib, on päringuvorm.',
          'Kohustuslikud väljad on nimi, e-posti aadress ja objekti aadress. Vabatahtlikud on telefoninumber, ligikaudne pind ja see, mida sa objektist kirjutad.',
          'Rohkem me ei küsi. Kontot siin luua ei saa ja midagi muud me sinu kohta ei kogu.',
        ],
      },
      {
        heading: 'Milleks me neid kasutame',
        body: [
          'Kasutame neid ainult selleks, et koostada sulle pakkumine ja võtta sinuga selle asjus ühendust.',
          'Õiguslik alus on sinu enda soov pakkumist saada: töötleme andmeid sinu palvel, enne kui lepingust üldse juttu on.',
          'Uudiskirju ega turunduskirju me ei saada.',
        ],
      },
      {
        heading: 'Kes neid näeb',
        body: [
          'Päringut näeb {company}. Me ei müü andmeid ega anna neid edasi kolmandatele isikutele.',
          'Vormi saadetisi vahendab Formspree, Ameerika Ühendriikide ettevõte. Ilma selleta ei jõuaks vormi sisu meieni.',
          'Veebilehte majutab Cloudflare. Nagu iga majutaja, näeb ka see lehe kättetoimetamiseks külastaja IP-aadressi.',
        ],
      },
      {
        heading: 'Kui kaua me neid hoiame',
        body: [
          'Kindlat tähtaega päevades me ei ole valinud ega taha seda välja mõelda. Hoiame päringut nii kaua, kui kulub sellele vastamiseks ja töö lõpetamiseks.',
          'Kui soovid, et kustutaksime su päringu varem, ütle seda — kustutame.',
        ],
      },
      {
        heading: 'Küpsised ja analüütika',
        body: [
          'Me ei sea küpsiseid ja me ei kasuta analüütikat. Siin ei ole Google Analyticsit ega ühtki muud külastajate loendurit.',
          'Seepärast ei ole sellel lehel ka küpsiseteadet: ei ole midagi, millega nõustuda.',
        ],
      },
      {
        heading: 'Sinu õigused',
        body: [
          'Sul on õigus küsida, milliseid andmeid me sinu kohta hoiame, lasta need parandada või lasta need kustutada.',
          'Selleks helista meile või kirjuta päringuvormi kaudu.',
          'Kui jääd meie vastusega rahule, on asi sellega korras. Kui ei jää, saad pöörduda Andmekaitse Inspektsiooni poole.',
        ],
      },
    ],
  },
  en: {
    lead: 'This page says what we ask for, what we use it for, and how long we keep it. In short: we ask only for what a quote needs, and we pass it to nobody.',
    sections: [
      {
        heading: 'Who processes the data',
        body: [
          'The controller is {company}, registry code {regCode}.',
          'For anything to do with your data, reach us by phone or through the quote form.',
        ],
      },
      {
        heading: 'What we collect',
        body: [
          'The quote form is the only place on this site that asks you for anything.',
          'The required fields are your name, your email address and the property address. The optional ones are your phone number, the approximate area, and whatever you write about the property.',
          'We ask for nothing else. There is no account to create here and we collect nothing else about you.',
        ],
      },
      {
        heading: 'What we use it for',
        body: [
          'Only to prepare your quote and to contact you about it.',
          'The lawful basis is your own request for a quote: we process the data at your request, before there is any contract to speak of.',
          'We send no newsletters and no marketing.',
        ],
      },
      {
        heading: 'Who sees it',
        body: [
          'Your enquiry is seen by {company}. We do not sell it and we do not pass it to third parties.',
          'Submissions are carried by Formspree, a United States company. Without it the contents of the form would not reach us.',
          'The site is hosted by Cloudflare. Like any host, it sees a visitor IP address in order to deliver the page.',
        ],
      },
      {
        heading: 'How long we keep it',
        body: [
          'We have not set a fixed period in days, and we are not going to invent one. We keep an enquiry for as long as it takes to answer it and to finish the job.',
          'If you would rather we deleted your enquiry sooner, say so and we will.',
        ],
      },
      {
        heading: 'Cookies and analytics',
        body: [
          'We set no cookies and we run no analytics. There is no Google Analytics here and no other visitor counter.',
          'That is why this site has no cookie banner: there is nothing to consent to.',
        ],
      },
      {
        heading: 'Your rights',
        body: [
          'You have the right to ask what data we hold about you, to have it corrected, and to have it deleted.',
          'Call us, or write through the quote form.',
          'If our answer settles it, good. If it does not, you can take the matter to the Estonian Data Protection Inspectorate.',
        ],
      },
    ],
  },
} as const satisfies Record<Locale, PrivacyCopy>

/**
 * The privacy copy with its tokens resolved from `site.ts`.
 *
 * Same shape as `contactContent()`, so the next fact this page needs has an
 * obvious place to be resolved rather than being typed in.
 */
export function privacyContent(locale: Locale): PrivacyCopy {
  const c = copy[locale]
  return {
    ...c,
    sections: c.sections.map((section) => ({
      ...section,
      body: section.body.map((line) =>
        line.replace('{company}', site.legalName).replace('{regCode}', site.regCode),
      ),
    })),
  }
}
