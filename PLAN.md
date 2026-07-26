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
| — | Phase 9 — SEO, performance, launch readiness | ✅ complete and committed |
| 1 | **Phase 10 — real content drop** | **next** · launch-blocking · blocked on the operator |
| — | **LAUNCH** | |
| 2 | Phase 7 — regional pages | post-launch |
| 3 | Phase 8 — blog infrastructure | post-launch |
| 4 | Phase 11 — single-source the domain | post-launch · splittable |

**Phase 10 is next, and it is blocked on equipment rather than on code** — see the
blocked list. Then launch. Phases 7 and 8 come after it.

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
- `/` and `/en/` rendering the brand from `site.ts` and a language switch that works
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
`site.email` receives no mail — the domain was unregistered when this phase ran, and
since the rename it is registered but Cloudflare Email Routing is not configured. The
reason changed; the outcome did not. The footer's `mailto:` row and the `email` key
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

## Phase 9 — SEO, performance, launch readiness ✅ *(launch-blocking · done)*

Readiness, not the launch event itself — launch is after Phase 10.

- **Sitemap hreflang — fixed.** All 24 URLs now carry slug-paired alternates; two
  did before. See below.
- **OG image, favicon and touch icons** — one sitewide OG image carrying no text,
  and the icon set built from the droplet mark already in the repo. ARCHITECTURE
  section 7 has the reasoning and lists the token hexes the rasters unavoidably bake.
- **Analytics — DECIDED AS NONE.** Not deferred. ARCHITECTURE section 1.
- **Hosting — DECIDED AS CLOUDFLARE PAGES.** ARCHITECTURE sections 1 and 9.
- **Privacy policy page**, both locales, with retention stated as a criterion.
- **Full-site Lighthouse pass** — 100/100/100/100 on all four pages, both form
  factors, localhost. Numbers in the phase report; the run that counts is post-deploy
  and is on the launch checklist below.
- **Link check** — clean. Every external URL in the built output is our own domain.
- **Redirects — NOT DONE, blocked on DNS.** Deliberately not half-built; see below.

### The sitemap limitation, and how it was actually resolved

`@astrojs/sitemap`'s `i18n` option pairs URLs by stripping the locale prefix and
matching the remaining path, which cannot work on localised slugs. `/` and `/en`
paired; **the other twenty pages had no `<xhtml:link>` at all.**

**PLAN's proposed fix could not be built as written, and this is why.** It said to
rebuild the alternate map at config time from `i18n/collections.ts`. Those helpers
are pure and importable, but the *service slugs* are not: they live in collection
frontmatter and reach code only through `astro:content`, a virtual module that does
not exist while `astro.config.mjs` is evaluated — and the content-layer store is not
populated that early even if it did.

**What was built instead, in the same `serialize` hook:** the alternates are read
back out of each page's own built `<head>`, which `BaseLayout` already gets right.
The sitemap and the page are then the same bytes and cannot drift — a stronger
guarantee than sharing a function would have given. `scripts/check-html.mjs` check 6
asserts on the finished XML that it worked, and was confirmed to fail on the old
behaviour. Detail in `astro.config.mjs` and ARCHITECTURE sections 7 and 8.

**Verified:** gate passes · Lighthouse ≥95/95 on home, a service page, pricing and
contact, mobile and desktop · sitemap lists every indexable page with correct
alternates on every one · every page's `<head>` carries a slug-paired hreflang set ·
zero broken links.

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

**Do at deploy, in this order:**

1. Cloudflare Pages project: build `npm run build`, output `dist`, Node 22,
   `PUBLIC_FORMSPREE_ID` set as a build variable. **The build failing on a missing
   `PUBLIC_FORMSPREE_ID` is the guard working, not a misconfiguration** —
   ARCHITECTURE section 9.
2. **Finish the DNS migration** — `lendavhollandlane.ee` is registered and owned,
   but its nameservers are still moving to Cloudflare and it does not resolve.
   Then `www` → apex. A `.com` → `.ee` redirect is listed only *if* a `.com`
   under the new name turns out to be ours; nobody has said it is, so do not
   assume it and do not buy one on the strength of this line. Dashboard work —
   ARCHITECTURE section 9.
3. **Re-run Lighthouse against the deployed site.** The Phase 9 pass was 100 across
   the board but it was localhost, with no CDN, no TLS handshake and no real
   latency. Those are not the numbers SPEC section 6 gates on.
4. Search Console: verify the property, submit `/sitemap-index.xml`.
5. Send one real enquiry through the deployed form and confirm it arrives.
6. **Confirm Cloudflare Web Analytics is OFF** and that no beacon is injected.
   `/privaatsus` states that the site runs no analytics; a dashboard toggle can make
   that false with no commit and nothing in the repo can detect it. See
   `src/i18n/privacy.ts`.

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

## Phase 11 — single-source the domain *(post-launch · take it in halves)*

**`site.domain` is the one value in `site.ts` that is not actually single-sourced.**
The rename commit on 26 July 2026 had to hand-edit the same domain in three files,
which is exactly the sweep the single-source rule exists to prevent. Recorded as work
rather than as a note, because a note in a session report scrolls away.

**The safe half — `public/robots.txt`, and do this one first.** Convert it to
`src/pages/robots.txt.ts`, an endpoint returning the same two directives plus a
`Sitemap:` line built from `site.domain`. A standard, well-trodden Astro pattern; low
risk.

**This is the copy that nothing guards, which is why it is the urgent one.** Check 6
in `scripts/check-html.mjs` compares the sitemap's URLs against each page's own
canonical, so `astro.config.mjs`'s copy drifting from `site.ts` fails the build. But
**nothing in this repository reads `robots.txt` at all.** A `Sitemap:` line left
pointing at a dead domain would fail silently and invisibly — no error, no failing
gate, just a crawler that never finds the sitemap. That is the exact failure class
this project has already paid for twice: the twenty pages with no hreflang, and the
thirty-seven HTML comments in production.

**The half that needs investigation — `astro.config.mjs`.** Importing
`src/config/site.ts` into it would close the last copy. It is plausible, since Astro
supports `astro.config.ts` at all, but **it is unverified** whether its config loader
transforms a `.ts` import from an `.mjs` config. Verify that against the installed
source in `node_modules` before writing anything, exactly as the sitemap and
`env.schema` questions were verified. If it does not work, say so here and leave the
copy in place with its comment — a documented second copy that check 6 guards is an
acceptable outcome, and better than a config that fails to load.

Doing the halves separately is the point: the safe one closes the unguarded gap
without taking on the risky one.

**Verify:** gate passes · `dist/robots.txt` carries the `Sitemap:` line built from
`site.domain` · changing `site.domain` alone moves every canonical, every hreflang,
every sitemap `<loc>`, the `_next` field **and** `robots.txt`.

**Commit:** `refactor: single-source the domain`

---

## Blocked on the operator, not on code

**Every item here blocks launch.** Phases 6 and 9 are done and none of these blocked
them. The first three block Phase 10, which is now the next phase — so this list is
no longer background reading.

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

**A working email address.** `site.email` is `info@lendavhollandlane.ee` and receives
nothing: **Cloudflare Email Routing is not configured.** That is now the whole of the
blocker — the name is settled and the domain is registered, so this no longer waits on
either. `Credentials` deliberately does not print it, `Footer.astro`'s email row is
suppressed and the `email` key is absent from the sitewide `LocalBusiness` JSON-LD;
all three come back in one line once a test message actually arrives. Configure the
routing, send one, and only then restore them.

**A Formspree plan decision — the thank-you redirect is a paid feature.** The account is on
the free tier, where `_next` is ignored: a submitter is sent to Formspree's own thanks page
instead of ours. Measured in Phase 6, not assumed — two identical POSTs both 302'd to
`https://formspree.io/thanks`. Everything else on the free tier works, including delivery
and `_subject`, so this costs polish rather than enquiries. `/aitah` and `/en/thank-you` are
built and correct; upgrading the plan is the only remaining step. Prefer keeping `_next`
over the dashboard's redirect setting, which is one URL per form and would send Estonian and
English visitors to the same page. **Decide before launch:** upgrade, or accept that the
visitor's last impression of the enquiry is a Formspree-branded page.

**A data retention period for form submissions — NO LONGER BLOCKING, and here is what
was done instead.** Phase 9 stated a **criterion** rather than a number, on both
`/privaatsus` and the inline notice: the enquiry is kept for as long as it takes to
answer it and finish the job, and is deleted on request. GDPR permits that, it is
true today, it invents nothing, and it survives a real policy being written later.
**If the operator ever chooses an actual period, it replaces the criterion in
`src/i18n/privacy.ts` and `src/i18n/contact.ts`** — but nothing is waiting on it, and
a future session must not substitute a guessed number for the criterion.

**A legal read of the privacy policy.** The page is drafted by an AI. Every sentence
is a statement about our own conduct that is true as far as this repository can tell,
and it claims no certification, no audit and no DPO — but that is not the same as a
lawyer having read it. Cheap to fix, and it is the one page on the site with
consequences outside the repository.

**Google Search Console verification.** No longer blocked on the domain being
registered — it is. It now waits only on the DNS migration to Cloudflare finishing, so
that `lendavhollandlane.ee` resolves and can be verified. It is the ranking half of the
analytics decision (ARCHITECTURE section 1), so the site has no answer to "which
searches find us" until it is done. Submit `/sitemap-index.xml` at the same time.

**Google Business Profile verified.** One of the two discovery channels named in SPEC
section 2, and the local-discovery half of the same analytics decision.

**Native-speaker Estonian review.** All Estonian copy in this repo is AI-drafted and
unverified. Twelve `needs-native-review` markers; each is cleared by a native speaker
signing the copy off, or the copy is rewritten.

The registry code, the VAT number, the legal name and the phone number came off this list
when they landed in `site.ts`. **The Formspree account came off it in Phase 6**, when the
form was built against a real endpoint and a test submission arrived in the inbox. A data
retention period came off it in Phase 9, replaced by a criterion rather than a number.

**Two more came off on 26 July 2026, in the rename commit:**

- **The final business name.** Settled as **Lendav Hollandlane**, a trading name of
  AIF OÜ. `site.brand` and `site.brandText` hold it and nothing else does. The legal
  name did not change.
- **`lendavhollandlane.ee` registered.** Registered and owned at an Estonian
  registrar — **`.ee` is not a TLD Cloudflare Registrar sells**, so do not go looking
  for it in that dashboard. Pointing the nameservers at Cloudflare is in progress and
  is a launch-checklist step, not a blocker on the operator: the decision is made and
  the money is spent. ARCHITECTURE section 9.

The list is only worth reading if it is true, so take an item off it the moment it is
answered.
