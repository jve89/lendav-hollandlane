# PLAN.md — build phases

One phase per session. Fresh session each time. Commit on every green phase, without exception.

---

## Read the ORDER, not the integers

**The phases run in the order printed below, and since 26 July 2026 that is no longer
numerical order.** Launch moved: the content drop now happens *before* it, and the ranking
work *after* it.

| Order | Phase | |
|---|---|---|
| — | Phases 0–6 | ✅ complete and committed |
| 1 | **Phase 9 — SEO, performance, launch readiness** | **next** · launch-blocking |
| 2 | Phase 10 — real content drop | launch-blocking |
| — | **LAUNCH** | |
| 3 | Phase 7 — regional pages | post-launch |
| 4 | Phase 8 — blog infrastructure | post-launch |

**Phase 9 is next.** Then Phase 10, then launch. Phases 7 and 8 come after it.

The integers are kept only because `src/` cites them: **37 comments reference `Phase 10` by
number across twenty files** — 24 of them in the ten service markdown files, 13 in ten
source files — and nine further files cite Phases 6–9. Renumbering would edit all of them
to gain nothing, because the numbers are labels and the order is the instruction. **Do not
execute the phases numerically.**

**Re-anchor prompt for each session:**
> Read SPEC.md, ARCHITECTURE.md and PLAN.md. Take the next phase from the order table at
> the top of PLAN — the phases are **not** in numerical order, so do not infer it from the
> integers. Tell me which phase you have taken and why before doing anything else. Plan
> first, do not write anything until I approve.

**Gate for every phase:** `npm run verify` exits 0.

---

## Phase 0 — Walking skeleton ✅ *(scaffolded already — verify, then commit)*

The thinnest possible end-to-end slice: one route in two locales, rendered from a layout, building to static HTML.

- `npm create astro` with TypeScript strict, static output
- `astro.config.mjs` with i18n (`et` default unprefixed, `en` prefixed) and sitemap
- `src/config/site.ts` with real structure and TODO values
- `src/i18n/{ui,routes,utils}.ts` with two locales wired
- `BaseLayout.astro` emitting head, hreflang, JSON-LD
- `/` and `/en/` rendering "LennuPesu" and a language switch that works
- `scripts/check-html.mjs`
- Scripts in `package.json`; `.gitignore`; `.env.example`

**Verify:** `npm run verify` exits 0 · `/` and `/en/` both build · language switch navigates between them · `grep -r "+372" src/ --exclude-dir=config` returns nothing.

**Commit:** `chore: walking skeleton, i18n routing, verify gate`

---

## Phase 1 — Design system and shell

**Design source: `reference/direction-d.html`** — the approved direction. *Not*
`reference/one-pager-v1.html`, which is superseded for design and kept only for its
Estonian copy in Phase 2.

Port direction D's tokens and layout. No page content yet.

Direction D's decisions, which Phase 1 must carry across:

- **Near-black base.** `#07090D` page, `#0C1017` raised, `#11161F` panel, `#1B222D` hairline.
- **Cyan accent.** `#22D3EE` on dark ink `#04222B`; `#0E7490` for accent text on light.
- **Floating glass pill navigation.** Absolutely positioned over the hero, translucent
  fill, backdrop blur, full-round radius, hairline border.
- **Large, tight, centred headline type.** Fluid clamp, line-height ~1.03, letter-spacing
  ~-0.035em, weight 800, balanced wrapping.
- **A light section for services.** White paper background with its own ink, muted and
  line tokens — the one deliberate inversion in the page.

Then:

- `tokens.css` (colour, type scale, spacing, radii, shadow) and `global.css`
- `Header.astro` with nav, language switch, phone CTA, mobile toggle
- `Footer.astro` reading company details from `site.ts`
- `PageLayout.astro`
- `404.astro` in both locales

**Port the layout, not the copy.** Direction D predates the customer-language rule in
CLAUDE.md and still shows `Transpordiameti luba · SAIL II` in a hero pill and the full
regulation number in its proof strip. Those strings do not come across. Its phone number
and prices are placeholders and come from `site.ts`.

**Verify:** gate passes · header and footer render on `/` and `/en/` · mobile nav works at 390px · no hardcoded contact details · no `SAIL II`, `SORA` or `785/2004` in any customer-facing string.

**Commit:** `feat: design tokens, header, footer, page layout`

---

## Phase 2 — Home page

Port the one-page site into components. This is the highest-traffic page; do it properly.

- `Hero`, `TrustBar`, `ServiceCard` grid, `CompareTable`, `Faq` excerpt, `Cta`
- Both locales
- Real Estonian copy from the existing one-pager, marked `<!-- needs-native-review -->`

**Verify:** gate passes · Lighthouse mobile ≥95 performance and ≥95 accessibility on `/` · one `<h1>` · no layout shift.

**Commit:** `feat: home page`

---

## Phase 3 — Content collections

Schemas before content. A bad frontmatter key must fail the build.

- `src/content.config.ts` with zod schemas for `services`, `locations`, `jobs`, `posts`
  — note the path: **not** `src/content/config.ts`, which is the deprecated Astro 4
  location. See ARCHITECTURE section 5.
- One real service file in each locale (`katusepesu.md` / `roof-cleaning.md`) to prove the schema
- `BeforeAfter.astro` with its empty state — build this now, before there are any photos, so the empty path is the default path

**Verify:** gate passes · deliberately breaking a frontmatter field fails `npm run check` · `BeforeAfter` renders the empty state without any job files present.

**Commit:** `feat: content collections and schemas`

---

## Phase 4 — Service pages

Five services × two locales, from the content collection.

Roof cleaning · facade cleaning · solar panels · windows and glass · gutters.

- `teenused/index.astro` and `teenused/[slug].astro`, plus `en/services/`
- `Service` JSON-LD per page
- Each page: what it covers, what it costs, what it does not cover, how long it takes, quote CTA
- Leave the chemicals section unconfirmed — the product and its Estonian biocide authorisation are not confirmed. Recorded as a repo comment, with a finished sentence on the page that names no product. See CLAUDE.md

**Verify:** gate passes · every service reachable in both locales · hreflang pairs correct between localised slugs.

**Commit:** `feat: service pages`

---

## Phase 5 — Pricing, FAQ, credentials

- `hinnakiri.astro` — `PriceTable` from `site.ts`, ex-VAT labelling, what changes a price, minimum job value
- `kkk.astro` — full FAQ with `FAQPage` JSON-LD; two answers are still unconfirmed (chemicals, water and power) and follow the repo-comment rule in CLAUDE.md rather than rendering a `TODO:` onto the page. Neither may be answered with a guess, and an unanswered question is better left out of the FAQ than answered vaguely
- `meist.astro` — the operator, the authorisation, the insurance, the equipment. This is the page that beats the incumbent, so write it like it matters.

**Verify:** gate passes · no price hardcoded outside `site.ts` · JSON-LD validates.

**Commit:** `feat: pricing, FAQ, credentials`

---

## Phase 6 — Contact and quote form ✅ *(launch-blocking · done)*

- `kontakt.astro` with `QuoteForm`, phone, service area, season
- Formspree wired via `PUBLIC_FORMSPREE_ID`, native `<form method="POST">`, no client JS
- Works with JavaScript disabled
- Thank-you page in both locales, `noindex`, reached via Formspree's `_next`

**No email address is printed on the contact page, or anywhere else on the site.**
`site.email` is on an unregistered domain. The footer's `mailto:` row and the `email` key
in the sitewide `LocalBusiness` JSON-LD both went in this phase; the `mailto:` fallback in
`Hero`, `Cta` and `Header` went with them rather than being left as an unreachable branch.
The form is the written channel now. All of it comes back in one line when the domain
resolves.

**Two independent guards against a form that posts nowhere,** because `import.meta.env` is
inlined at build time and an unset variable would otherwise ship a page that looks right
and drops every enquiry: `env.schema` in `astro.config.mjs` fails the build, and
`check-html.mjs` check 5 fails on the built output. Both were confirmed to fire.

**Verify:** gate passes · a real test submission arrives in the inbox · form submits with JS off · required-field validation is native.

**Commit:** `feat: contact page and quote form`

---

## Phase 9 — SEO, performance, launch readiness *(next · launch-blocking)*

Follows Phase 6. Readiness, not the launch event itself — launch is after Phase 10.

Add to this phase's scope: the **privacy policy page**, which the GDPR notice on
`/kontakt` deliberately keeps short by deferring to. It needs the retention period from
the blocked list below.

- Sitemap with hreflang — **see the known limitation below, which is the real work in this line**
- OG images per page type
- Favicon and touch icons
- Analytics decision and installation
- Full-site Lighthouse pass
- Link check across every page
- Redirects: `www` → apex, `.com` → `.ee`

### Known limitation: `@astrojs/sitemap` cannot pair localised slugs

Found in Phase 4, recorded here because this is the phase that has to deal with it.

The integration's `i18n` option groups URLs into alternate sets by **stripping the locale prefix and matching the remaining path**. That works when the two locales share a slug. Ours never do — CLAUDE.md forbids it, because an Estonian searcher must land on an Estonian URL. So `teenused/katusepesu` and `services/roof-cleaning` are two different keys and neither gets an `<xhtml:link>` at all.

Confirmed in the built output: `/` and `/en` are paired correctly, because the Estonian home page's path after prefix-stripping is empty in both. **Every other page in the site has no alternates in the sitemap.** Ten service pages today; every location page and every post later.

This does not affect the pages themselves. `BaseLayout` emits a correct, slug-paired `hreflang` set in the `<head>` of every page, and that is the signal search engines actually act on. The sitemap is the secondary channel.

**Proposed fix, for this phase to implement — do not build it earlier.** Drop the integration's `i18n` option and build the alternate sets ourselves in `serialize`, from the same source the pages use. `src/i18n/collections.ts` already produces `{ locale, href }[]` for a content-derived route and `alternates()` does it for a static one; a small map from URL to alternate set, built once at config time, is all `serialize` needs. The `serialize` hook is already in `astro.config.mjs` for trailing-slash normalisation, so this extends a function that exists rather than adding a mechanism.

Two things to check when doing it: `serialize` receives absolute URLs, and the `links` array wants `{ url, lang }` with `lang` as the BCP 47 tag — `bcp47()` in `i18n/utils.ts` already produces it. If that turns out not to work, the fallback is to write the sitemap ourselves from an endpoint, which is more code than this is worth; reconsider whether the sitemap needs alternates at all before going there, given the `<head>` already carries them.

**Verify:** gate passes · Lighthouse ≥95/95 on home, one service page and pricing · sitemap lists every page, with correct alternates on every page **or** the limitation above resolved and the fix noted here · every page's `<head>` carries a slug-paired hreflang set — this is the one that must hold unconditionally · zero broken links.

**Commit:** `feat: SEO, performance, launch readiness`

---

## Phase 10 — Real content drop *(launch-blocking — the last thing before launch)*

Not a build phase. This is why the empty states exist, and it is the last work that happens
before the site goes live. **It used to sit after launch, at "~October 2026". That was an
unchecked assumption and it was wrong in both respects.**

The source is a **controlled first job on family property**, flown as soon as the kit
arrives — not a paying customer's roof. One flight answers most of what the site currently
cannot say:

- **Hero footage** into `public/video/`, plus its poster still — SPEC section 9's FOOTAGE
  state, under the 2 MB desktop cap and the 12-second loop limit. Mobile still fetches zero
  bytes of video.
- **A before/after pair** into `src/content/jobs/`, which fills `BeforeAfter` on both home
  pages the moment the file lands — no code change needed, that is the contract.
- **A measured job duration and throughput**, feeding both the copy and the financial
  model, and restoring the figure `CompareTable` currently withholds.
- **The water and power answer**, replacing the unconfirmed FAQ entry in `src/i18n/faq.ts`.

**What the flight does not settle:** the cleaning product and its Estonian biocide
authorisation. That is a purchasing decision, not a flying one. It stays unconfirmed on
CLAUDE.md's terms — no product named, no claim about one made — until the operator answers
it. See the blocked list below, which now records a promise on six pages that depends on
this answer.

**No testimonial from the family job.** It would not be fabricated, so CLAUDE.md permits
it, and it is still not to be used. A first review profile that opens with a relative is a
reputational risk out of all proportion to the value of one review. **The reviews section
stays absent until an arm's-length customer has paid for a job and agreed to be quoted.**
`published: false` on the job file governs whether the photos appear; the `testimonial` and
`testimonialAuthor` fields stay empty, and the schema's both-or-neither rule keeps them
that way.

Also in this phase, because it gates launch rather than the footage: the **native-speaker
Estonian review**, clearing every `needs-native-review` marker.

---

## LAUNCH

Everything above ships.

**The gate here is not `npm run verify`.** That has been green since Phase 0 and proves only
that the site is not broken — see SPEC section 6. The gate is the list below being empty.

---

## Phase 7 — Regional pages *(post-launch)*

The first ranking work after launch. Tallinn and Harjumaa only. No other towns until a
completed job justifies one.

**Verify:** gate passes · each page has region-specific substance, not a template with the name swapped.

**Commit:** `feat: Tallinn and Harjumaa pages`

---

## Phase 8 — Blog infrastructure *(post-launch)*

The machine, not the posts. `blogi/index.astro` renders an honest empty state.

First posts, when there is time and something real to say, target informational searches: how to tell moss from lichen, when to clean an Estonian roof, what pressure does to fibre-cement, drone versus scaffolding cost.

**Verify:** gate passes · empty state renders · adding one draft post appears in dev and is excluded from the production build.

**Commit:** `feat: blog infrastructure`

---

## Blocked on the operator, not on code

**Every item here blocks launch.** None of them blocks Phase 6 or Phase 9. The first three
block Phase 10.

**Equipment, and the first flight.** Ordered within the week; delivered roughly a week after
that; flown on family property as soon as it arrives. Phase 10 has no input at all until
this happens.

**The water and power answer.** Expected out of that first flight.

**The `needs-operator-review` claims.** Eight markers today, one at the top of four services
in both locales — windows, gutters, facade, solar. Every claim under a marker is confirmed
or cut; the marker does not come out any other way.

**The cleaning product decision — and a promise on six pages that depends on it.** Five
service pages and the FAQ, in both locales, tell the reader that the quote will name the
product *and the Estonian biocide authorisation it is permitted under* — in Estonian,
"millise Eesti biotsiidiloa alusel see on lubatud". Twelve strings; six pages per locale.

That sentence **presupposes a biocidal product, and it may be false**. The regulatory
trigger is the **claim, not the chemistry**: Terviseamet's definition of a biocide excludes
purely physical or mechanical products, so an operator who cleans with a surfactant and
water pressure while making no claim about killing or deterring organisms is not using a
biocide at all. On that route there is no authorisation, nothing to name, and the promise is
false on all six pages.

The sentence must be rewritten to survive **both** routes — biocidal product with an
authorisation to cite, or physical cleaning with no authorisation and no organism-killing
claim made anywhere on the site. **Not in this commit, and not by guessing which route it
is.** It is blocked on the operator's product decision and the rewrite belongs to the phase
that has the answer.

**The final business name.** `site.brand` and `site.brandText` are provisional. This is the
whole reason the name is written in one file and nowhere else in `src/`.

**`lennupesu.ee` registered and DNS pointed.** Blocked in turn on the name being settled.

**A working email address.** Blocked on the domain, which is blocked on the name.
`site.email` is unconfirmed and `Credentials` deliberately does not print it.

**A Formspree plan decision — the thank-you redirect is a paid feature.** The account is on
the free tier, where `_next` is ignored: a submitter is sent to Formspree's own thanks page
instead of ours. Measured in Phase 6, not assumed — two identical POSTs both 302'd to
`https://formspree.io/thanks`. Everything else on the free tier works, including delivery
and `_subject`, so this costs polish rather than enquiries. `/aitah` and `/en/thank-you` are
built and correct; upgrading the plan is the only remaining step. Prefer keeping `_next`
over the dashboard's redirect setting, which is one URL per form and would send Estonian and
English visitors to the same page. **Decide before launch:** upgrade, or accept that the
visitor's last impression of the enquiry is a Formspree-branded page.

**A data retention period for form submissions.** The GDPR notice on `/kontakt` says what
is collected, what it is used for, who holds it, that an external form service handles it
and that it is not passed on — but it does not say for how long the enquiry is kept,
because nobody has decided. Not invented, per CLAUDE.md. Phase 9's privacy policy needs the
answer and the inline notice gains a sentence when it exists.

**Google Business Profile verified.** One of the two discovery channels named in SPEC
section 2.

**Native-speaker Estonian review.** All Estonian copy in this repo is AI-drafted and
unverified. Twelve `needs-native-review` markers; each is cleared by a native speaker
signing the copy off, or the copy is rewritten.

The registry code, the VAT number, the legal name and the phone number came off this list
when they landed in `site.ts`. **The Formspree account came off it in Phase 6**, when the
form was built against a real endpoint and a test submission arrived in the inbox. The list
is only worth reading if it is true, so take an item off it the moment it is answered.
