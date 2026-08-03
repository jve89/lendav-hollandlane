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
| 1 | **Phase 10 — real content drop, and the visual decisions** | **next** · launch-blocking · the footage half is blocked on the operator, the palette half is not |
| — | **LAUNCH** | |
| 2 | Phase 7 — regional pages | post-launch |
| 3 | Phase 8 — blog infrastructure | post-launch |
| 4 | Phase 11 — single-source the domain | post-launch · splittable |

**Phase 10 is next, and its content half is blocked on equipment rather than on code** — see
the blocked list. **Its palette half is blocked on nothing and can be taken first** — see
"The visual decisions" inside Phase 10. Then launch. Phases 7 and 8 come after it.

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

**AMENDED 26 JULY 2026 — "no client JS" is no longer true of this form, and it is the
only bullet above that moved.** The thank-you pages this phase built were unreachable,
because `_next` is a Formspree paid feature. Formspree accepts AJAX on the free tier, so
`QuoteForm.astro` gained a 23-line `is:inline` script that POSTs with `fetch` and navigate to
our own page. The native POST is untouched and runs whenever the script does not. This is
recorded here as an amendment rather than as a phase of its own, because it changes a
Phase 6 deliverable and does not move the order table at the top; Phase 10 is still next.
ARCHITECTURE section 2 names it as the second client-JavaScript exception, and the blocked
list below records what is left of the plan-upgrade question.

**"Works with JavaScript disabled" was tested BY PROXY, and that is not the same thing.**
What was done: the form node was replaced with a clone, which drops its event listeners,
and the resulting native submit was accepted with a 302 to Formspree's own page — plus a
`curl` POST of the same body, which also 302'd to `/thanks`, and a census confirming the
only executable `<script>` in the built site is this one. That is strong, and it is still a
proxy: **nobody has run the form with Chrome's "Disable JavaScript" actually switched on.**
Somebody should, once, from DevTools → ⋮ → Settings → Debugger. Until then this bullet is
inferred rather than observed, and it should not be written up as verified.

**No email address was printed anywhere on the site when this phase ran**, because
`site.email` received no mail: the domain was unregistered then, and after the rename
it was registered but Cloudflare Email Routing was not configured. The footer's
`mailto:` row and the `email` key in the sitewide `LocalBusiness` JSON-LD both went in
this phase, and the `mailto:` fallback in `Hero`, `Cta` and `Header` went with them
rather than being left as an unreachable branch.

**That was undone on 26 July 2026**, when Email Routing was configured and a test
message arrived. The footer row, the JSON-LD key and the identifiers block on `/meist`
all print the address now. The `Hero`, `Cta` and `Header` fallbacks did **not** come
back and are not owed: they were removed because a dead conditional anyone could
revive is worse than no conditional, and every one of those three asks for the form.
The contact page still prints no address either, and that is now a choice about what
converts rather than a suppression.

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
- **Redirects — NOT DONE.** They were blocked on DNS when this phase ran; the
  migration finished on 26 July 2026, so what remains is the dashboard work itself.
  Deliberately not half-built in the repo; see below.

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

- **Hero footage** into `public/video/hero.mp4`, plus its poster still into
  `src/assets/hero-poster.jpg` — SPEC section 9's FOOTAGE state. **Under 1.5 MB and 8–16
  seconds**, and check 7 fails the build if the video misses the byte cap. **Both paths are
  occupied today by a third-party placeholder** — see "The placeholder footage" below; this
  bullet is about the operator's own footage, which is still owed. **Mobile fetches the video too** — the width condition came off the
  `<source>` gate on 29 July 2026; see piece two below. Note the two directories: the
  poster is in `src/` so Astro can process it, the video in `public/` because Astro cannot
  process video. ARCHITECTURE section 4.
- **A before/after pair** into `src/content/jobs/`, which fills `BeforeAfter` on both home
  pages the moment the file lands — no code change needed, that is the contract. **But one
  pair is not the target state — see below, and read it before the first flight, because it
  changes what has to be shot.**

##### Before/after evidence is planned as several pairs mapped to services — NOT BUILT

**Recorded now rather than when it is built, because it is a shooting instruction before it
is a code change.** A session that reads only the bullet above will come back from the first
flights with one pair, and the pairs cannot be obtained retrospectively — the "before" no
longer exists once the roof is clean.

**The intended shape:**

- **One pair per service**, across the five: roof, facade, solar panels, windows, gutters.
- **Each service page carries its own pair** — the evidence on `/teenused/katusepesu` is a
  roof, not whatever job happens to be newest. A facade pair on the roof-cleaning page is
  weak evidence and mildly misleading.
- **The home pages carry a selection of two or three, not all five.** The home page is
  making one argument and then asking for the enquiry; five pairs is a gallery, and SPEC
  section 1 says this site is not a portfolio for its own sake.

**None of that exists.** `BeforeAfter` takes a single optional `jobId`, both home pages call
it with "the newest published job", and with no job files present every caller renders the
empty state — which is the launch state and a finished design, per SPEC section 9. Building
this means a service↔job mapping and a multi-pair caller, and it is **not** in scope for the
current phase.

**What it changes about the flights: five services need five sets of before shots, and the
before shot is the one that cannot be taken twice.** The first flight is one controlled job
on family property and will not produce all five. So this is a constraint on the *sequence*
of early jobs rather than on the first one — shoot every job as if its pair is the one that
will represent that service, and keep the before frames even for jobs that never get
published. `published: false` governs whether a pair appears; it costs nothing to have the
photographs and not use them, and everything to need them and not have them.

**Unchanged by any of this: the pairs are the operator's own work.** SPEC section 9's
third-party footage exception is decorative hero background only and **excludes before/after
imagery in all circumstances**.
- **A measured job duration and throughput**, feeding both the copy and the financial
  model, and restoring the figure `CompareTable` currently withholds.
- **The water and power answer**, replacing the unconfirmed FAQ entry in `src/i18n/faq.ts`.

**The pricing decision now has an external number to weigh, not only our own
measurements.** Competitive research on 26 July 2026 (SPEC section 10) found
pesutech.ee publishing **"Hind alates 2 EUR m²"** on both of its drone pages against
our €3. We are at least 50% dearer on the headline figure — more if their €2 includes
VAT, which their pages do not say — for a service a homeowner cannot tell apart from
two websites.

So when the first flight lands its throughput and cost data, the question is not only
*"what does this job cost us to do"* but *"what does it cost us to do at a price a
visitor will compare against €2"*. Both halves are needed before the price moves.

**The €450 minimum job is a separate question and it is answered in SPEC section 10,
not here.** It is not a second price gap; it is what keeps us out of a market we have
decided not to serve, and it stops binding at exactly the 150 m² that section 2 names
as the bottom of our target roof size. Read that before touching it. If it is
revisited at all, it is on throughput and cost data from real jobs — never because a
competitor quotes a lower number for work we do not want.

**Nothing is decided here and `site.prices` has not moved.** This is an input recorded
so the decision is made against it rather than in ignorance of it; €3 is a considered
price, not a placeholder waiting for a competitor. Re-check pesutech.ee at the time
rather than trusting the figure above — it is a snapshot of one day.

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

### The visual decisions — taken 27 July 2026

**The reasoning lives in the Claude Project doc `launch/footage-and-visual-plan.md` — in the
"AIF Drone Services" project, NOT in this repository.** That path looks like a repo path and
is not one; do not go looking for it here and do not conclude it is missing.

**The split is deliberate and the two are not copies of each other: PLAN.md holds the
binding constraints, the project doc holds the reasoning behind them.** What is below is
only what a session must not violate, deliberately without the argument for it. If you want
to know *why*, read that document rather than re-deriving it here — and if you disagree with
a constraint, that document is where the disagreement is settled, not this one.

**Phase 10 splits into two independent pieces, and only one of them waits on the footage.**
The palette change has no dependency on the flight and can be done first, on its own commit,
while the equipment is still in transit.

#### Piece one — the palette. Not blocked. Take it first.

**Move every `.section--paper` section off `--paper` (`#ffffff`) to `--panel` (`#11161f`),
with hairline-bordered cards.** The site then stays inside one dark family instead of
stepping ~18:1 in luminance between adjacent sections.

**This is all four usages, not the home page alone.** `src/pages/index.astro`,
`src/pages/en/index.astro`, `src/pages/teenused/index.astro` and
`src/pages/en/services/index.astro` — both home pages **and** both service index pages.
**Do not read this as a home-page change.** Leaving the service pages white does not
preserve a considered inversion, it **relocates the seam onto the pages that do the
selling** — a visitor who follows the home page's services grid to `/teenused` would cross
the same ~18:1 step, one click further in and on the page where they are choosing what to
buy. Removing the seam means removing it everywhere it occurs.

**The cost is explicit, and it is why this is not a token swap.** Phase 1 built a complete
parallel light-surface token set — Direction D's "one deliberate inversion" — and this
change makes most of it dead code: `--paper`, `--paper-ink`, `--paper-muted`, `--paper-line`,
`--accent-on-paper`, `--accent-wash`, `--accent-wash-line`, the `.section--paper` re-map
block in `global.css`, and `ServiceCard`'s paper-specific rules. **Removing it needs a
contrast audit, not a find-and-replace**: every pair validated against `#ffffff` has to be
re-validated against `#11161f`, and SPEC section 6 gates Lighthouse accessibility at ≥95.

**Because the decision covers every usage, the change belongs at the class rather than at
four call sites.** `.section--paper` either stops being a light surface or stops existing;
what must not happen is two of the four moving and the class surviving to invert the other
two.

**Two things are not deleted on sight.** `--ink-on-glass` exists *because* `.section--paper`
re-maps `--ink`, and `BeforeAfter` carries comments on how one component survives both
surfaces. Both may survive the change or may not; neither goes as an obvious leftover.

**Text-heavy pages are a separate decision and are not covered by this.** `/hinnakiri`,
`/kkk` and `/privaatsus` may legitimately be answered the other way — a lighter surface is
worth more for long reading than for a card grid. Do not fold them in on the grounds of
consistency.

#### Piece two — the hero video. BUILT 29 July 2026. Placeholder footage installed 3 August 2026.

**The component shipped first and the footage came later, and what is there now is not
ours.** The media layers render only when the assets are actually present, so between
29 July and 3 August the repository emitted the type-led no-footage hero — that state is
enforced by construction, not by discipline, and it still is. Swapping footage is dropping
two files: `src/assets/hero-poster.jpg` and `public/video/hero.mp4`. No code change.

##### The placeholder footage — a dated, temporary exception

**`public/video/hero.mp4` and `src/assets/hero-poster.jpg` contain manufacturer-supplied
footage of a third party's building, used with the supplier's written permission, installed
3 August 2026.** It is a placeholder pending the operator's first controlled flight, and it
is decorative hero background only: no caption, no context, no before/after pair, no claim
that the work is ours.

**This is permitted under the amended no-stock-footage rule in SPEC section 9, which is
scoped and conditional — read it before touching either file.** In particular,
**before/after imagery is excluded from that exception in all circumstances**; borrowed
footage may never fill `BeforeAfter`, whose empty state is still the answer until a real
job file lands.

**Removal trigger: it is replaced the moment the operator has his own footage** — the same
first flight this phase already waits on. **The swap is two file copies and no code
change.** It is not deleted as a violation in the meantime, and it is not kept a day past
the real footage arriving.

**It is 15.4 seconds, 1,233,248 bytes (1.18 MB), 1280×720, no audio track.** The clip is
what widened SPEC's loop-length bound from 8–12 to 8–16 seconds; the byte cap did not move
and is still the limit that governs.

It was built against a **pure-white placeholder clip** generated with ffmpeg and deleted
before the commit. That is not a violation of "do not build it speculatively": white is
the worst case a frame can present for contrast, so the placeholder was a *test fixture*
for the one thing that had to be got right, not a stand-in for footage nobody has seen.

Hard constraints, all of them, and what happened to each:

- **A scrimmed background loop.** Background, not foreground — built that way. The opacity
  band is corrected below.
- **The poster still is the LCP element and must stand alone.** Held. It is a responsive
  `<Picture>` in `src/assets/`, above the video, and it stays whenever playback does not
  start.
- **`preload="none"`, with playback triggered on viewport entry.** Held, plus **pause on
  exit and resume on re-entry** — an observer that disconnected after first entry would
  leave a phone decoding off-screen for the rest of the session.
- **No audio track in the file at all** — stripped at encode, not muted at playback. Held.
- **Under 1.5 MB total, for 8–16 seconds.** Held, and now **mechanically
  enforced**: check 7 in `scripts/check-html.mjs` fails the build on any file under
  `public/video/` over the cap. Confirmed to fire, including at the exact byte boundary.
  **The bound was 8–12 seconds until 3 August 2026** and was widened on the first real
  cut — SPEC section 9 has the reasoning, and the short version is that the byte cap is
  the constraint and the seconds were a judgement about encoding headroom that 1.18 MB
  disposed of. **The cap did not move and must not.** *Also dropped from this line:
  "at 1080p". The placeholder is 1280×720, so the phrase was about to become a
  requirement nothing in the repository meets. The operator's own footage should still be
  shot and delivered at 1080p where the cap allows — but resolution is a quality
  judgement here, not a constraint, and it was never the thing check 7 protects.*
- **`prefers-reduced-motion` honoured**, under both guards. Held, and guard one is now
  **confirmed honoured in Chrome by direct test** — a false `media` query on `<source>`
  leaves `currentSrc` empty and fetches nothing. Still unverified on real iOS Safari and
  Android Chrome.

**The 55–65% opacity band was wrong at its lower end, and this is the correction.** That
band came from a reference site rather than from any measurement of this design, and
55–57% ships a hero whose lead paragraph fails AA against a bright frame. **The measured
requirement is the AA-against-white floor, not the band**: every piece of hero text must
clear 4.5:1 against a pure-white frame with no assumption about what the footage contains.
Two things carry that together and neither is sufficient alone — a scrim alpha of **at
least 0.58** (60% shipped, for the margin) and the **footage-state text remap** in
`Hero.astro`. The full table is beside `--hero-scrim` in `tokens.css`.

**Footage brightness is a quality note and is NOT load-bearing for accessibility.** For
the record, the original tokens would also have held had the frame stayed at or below
about rgb(142) under the lead and rgb(100) under the price line. A future session must not
read that as a requirement on the grade, and must not weaken the remap on the grounds that
the real footage turned out dark — the remap is what makes the page safe against a frame
nobody has seen yet.

**A refinement for the session that has real footage, deliberately not attempted now:** a
**non-uniform scrim**, denser behind the text block and lighter toward the edges, would let
brighter footage through while giving the copy a proper floor. Note that the hero already
carries a radial glow (`--hero-glow`, `#14202e`) occupying exactly that space, so the
refinement is most likely **"the glow becomes the scrim"** rather than a third layer. It
was not designed here because we were testing against a flat placeholder, and a gradient
tuned against a flat colour tells you nothing. **If it ever exceeds 65% locally, that is an
amendment to make deliberately — not a violation**, because the band was never the
constraint.

**The `(min-width: 48em)` condition came OFF the `<source>` gate, and must not be
reinstated as a precaution.** Excluding phones is a product decision dressed as a
performance guard. The poster is the LCP element and is already painted; the video is
`preload="none"` and fetched on viewport entry, so it never competes for LCP. Most of this
site's traffic is mobile, and a hero video no mobile visitor ever sees defeats the point of
having one. **Decide it by measurement: if PageSpeed mobile on the deployed site drops
below 90, re-add the width condition citing that number.** The consequence is that mobile
is no longer zero bytes of video — **SPEC sections 6 and 9 said it was, and both were
corrected in the same commit** rather than left to contradict the code.

**The acceptance gate is a number, not a judgement, and it has not been met yet.** The
deployed site scores **99 on PageSpeed mobile today**, measured before the hero existed.
**If it drops below 90 after the hero ships, revert to the still frame.** Not
"investigate", not "optimise it later" — revert. The poster-only state is a finished
design, so reverting to it costs nothing but the video. **This gate stays open, but as of
3 August 2026 it is runnable rather than blocked** — it needed footage and a deploy, and
the placeholder supplies the footage half. A browser cannot tell whose building is in the
frame: 1.18 MB over the wire behaves identically whether the clip is ours or the
supplier's, so the number this gate wants can be measured now and does not have to wait
for the first flight. **Run it on the next deploy.** Re-run it when the real footage lands,
because a different encode is a different number.

**Viewport-entry playback is the third client-JavaScript exception, and the second
actually taken.** ARCHITECTURE section 2 carried it as a *planned* entry so it would arrive
as a decision rather than as a script that turned up in a diff; it is now marked BUILT. It
is not a precedent for a fourth.

**Still outstanding on this piece:** the operator's own footage — the placeholder above is
a stopgap and closes nothing — the native-speaker review below, the
post-deploy PageSpeed run, and playback verification on a real handset — Chrome's
`media`-on-`<source>` behaviour is confirmed but iOS Safari and Android Chrome are not, and
pause-on-exit is inferred from the code rather than observed.

#### Rejected, recorded so it is not re-proposed

- **A drag-slider for before/after images.** Needs JavaScript, and adds nothing over the two
  images side by side that `BeforeAfter` already renders.
- **Scroll-triggered reveals.** Decorative, needs an observer, and a bad trade against a
  zero-JS static site with a ≥95 Lighthouse gate.

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
2. **DNS — DONE, including both items that used to be listed here as
   remaining.** `lendavhollandlane.ee` resolves and serves the site as of
   26 July 2026: nameservers delegated to Cloudflare, apex and `www` attached to
   the Pages project, TLS live, Email Routing active. On 27 July 2026 the two
   outstanding dashboard items were closed:
   - **`www` → apex.** A Cloudflare Redirect Rule, "Redirect from WWW to root",
     301s `https://www.lendavhollandlane.ee/*` to the apex, preserving path and
     query string. **`www` stays as a DNS record and a Pages custom domain** —
     the rule runs at the edge, so deleting the record would break the redirect
     rather than enforce it.
   - **DNSSEC.** Active. Cloudflare signs the zone; the DS record (key tag 2371,
     algorithm 13, digest type 2) is published at the `.ee` registry through
     Zone.ee, acting as registrar rather than as DNS host. **Standing hazard:
     moving the nameservers off Cloudflare requires disabling DNSSEC at
     Cloudflare and removing the DS at Zone.ee first, and waiting out the old DS
     TTL** — otherwise validating resolvers return SERVFAIL for the whole
     domain, website and email both. ARCHITECTURE section 9.

   A `.com` → `.ee` redirect is listed only *if* a `.com` under the new name
   turns out to be ours; nobody has said it is, so do not assume it and do not
   buy one on the strength of this line. ARCHITECTURE section 9.
3. **Re-run Lighthouse against the deployed site.** The Phase 9 pass was 100 across
   the board but it was localhost, with no CDN, no TLS handshake and no real
   latency. Those are not the numbers SPEC section 6 gates on.
4. **Search Console — DONE, 27 July 2026.** Registered as a **Domain property**,
   `sc-domain:lendavhollandlane.ee`, verified automatically by a TXT record
   Cloudflare wrote on the apex
   (`google-site-verification=3oEQO-IRgRFsDkug9tzD-7IMVyEWYo4KkCWxP3QLZoY`).
   **That record must not be deleted** — it is the whole of the verification, and
   losing the property means losing the only ranking data this site collects.
   `sitemap-index.xml` submitted. Also registered with **Bing Webmaster Tools**.
5. **Send one real enquiry through the deployed form and confirm it in the inbox, not
   in the network panel.** A 200 from Formspree, or a 302 to its thanks page, says the
   request was well formed and the endpoint is right; it is not delivery. The mail still
   has Formspree's own sending and a Cloudflare Email Routing forward to survive, and it
   arrives at `info@lendavhollandlane.ee` — which forwards to the operator's mailbox, not
   to any address a session can search. ARCHITECTURE section 6. **Replying to it is a
   different path from receiving it**: Email Routing is receive-only, and outbound as
   `info@` goes through Gmail SMTP, so it authenticates as `gmail.com` — ARCHITECTURE
   section 9.
6. **Confirm Cloudflare Web Analytics is OFF** and that no beacon is injected.
   `/privaatsus` states that the site runs no analytics; a dashboard toggle can make
   that false with no commit and nothing in the repo can detect it. See
   `src/i18n/privacy.ts`.
7. **Confirm Cloudflare's Managed robots.txt is still OFF** (AI Crawl Control →
   Overview) and that `https://lendavhollandlane.ee/robots.txt` is byte-for-byte
   what `public/robots.txt` contains. It was **on by default** and was serving
   Content-Signal declarations and `Disallow` rules for ClaudeBot, GPTBot,
   Google-Extended, Amazonbot and five others until 27 July 2026. **No build
   check can catch this** — `npm run verify` reads `dist/`, where the file is
   correct by construction, and nothing fetches the served copy. Fetch it by
   hand. ARCHITECTURE section 9.

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

**This phase closes the repository end of that file and not the other end.** Even
as a generated endpoint, what the crawler receives is whatever Cloudflare serves,
and Cloudflare's Managed robots.txt was overriding it entirely until 27 July 2026
— see the launch checklist above and ARCHITECTURE section 9. Do not finish this
phase believing `robots.txt` is now guarded end to end: it is guarded up to
`dist/`, and the edge is checked by hand.

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
no longer background reading. **They block its footage half only**; the palette
decision inside Phase 10 is blocked on nothing and can be taken while this list stands.

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

**A Formspree plan decision — MOSTLY SOLVED ON 26 JULY 2026, and what is left is a much
smaller question.** The account is on the free tier, where `_next` is ignored: measured in
Phase 6, two identical POSTs both 302'd to `https://formspree.io/thanks`.

**What was done instead of upgrading.** Formspree accepts AJAX on the free tier — only the
server-side redirect is gated. `QuoteForm.astro` now intercepts the submit, POSTs with
`fetch`, and navigates to `/aitah` or `/en/thank-you` itself, reading the target out of the
same `_next` field. Twenty-three inline lines, no dependency, and the native POST is
untouched beneath it. **So every visitor with JavaScript already gets our thank-you page, in their own
language.** This was the second named client-JS exception; ARCHITECTURE section 2.

**What is left: do we care about the no-JS minority.** A visitor with JavaScript disabled
still lands on Formspree's page — which is what every visitor did before, so nothing
regressed, and the enquiry arrives either way. That is the entire remaining value of the
upgrade, against a paid plan. **Decide before launch,** but decide it as that question and
not as the old one: it is no longer "our page or a Formspree-branded page", it is "our page
for everyone, or our page for all but the no-JS minority". Keep `_next` in the form either
way — it costs nothing, the script depends on it, and it starts working server-side the day
the plan is upgraded. Do not swap it for the dashboard's redirect setting, which is one URL
per form and would send Estonian and English visitors to the same page.

**A data retention period for form submissions — NO LONGER BLOCKING, and here is what
was done instead.** Phase 9 stated a **criterion** rather than a number, on both
`/privaatsus` and the inline notice: the enquiry is kept for as long as it takes to
answer it and finish the job, and is deleted on request. GDPR permits that, it is
true today, it invents nothing, and it survives a real policy being written later.
**If the operator ever chooses an actual period, it replaces the criterion in
`src/i18n/privacy.ts` and `src/i18n/contact.ts`** — but nothing is waiting on it, and
a future session must not substitute a guessed number for the criterion.

**A legal read of the privacy policy — and, paired with it, whether the policy should
offer the email address as a route for an access or deletion request.** The page is
drafted by an AI. Every sentence is a statement about our own conduct that is true as
far as this repository can tell, and it claims no certification, no audit and no DPO —
but that is not the same as a lawyer having read it. Cheap to fix, and it is the one
page on the site with consequences outside the repository.

The email question arrived on 26 July 2026 with the working address, and it is
**deliberately one item with the legal read rather than two.** `/privaatsus` offers the
phone number and the quote form and no address at all; that was because `site.email`
received nothing, and that reason is gone. **The considered view is that it probably
should offer it**: email is the conventional route for a GDPR request, and a policy
offering only a phone number and a web form is unusual enough that a reader may assume
there is no route at all. It is not done here because it is Estonian copy on a legal
page, which is precisely the change that should not be made without the read it is
paired with. A future session must not resolve it by adding the address on a tidy-up —
`src/i18n/privacy.ts` says the same beside the copy.

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
  for it in that dashboard. ARCHITECTURE section 9.

**Two more came off later the same day, both confirmed by test rather than assumed:**

- **A working email address.** `info@lendavhollandlane.ee` receives mail: Cloudflare
  Email Routing forwards it to the operator's mailbox, and a test message was sent and
  arrived. The three suppressions it was holding down are restored — `Footer.astro`'s
  email row, the `email` key in the sitewide `LocalBusiness` JSON-LD, and the
  identifiers block in `Credentials` on `/meist`. That was the whole of the "one line
  when it works" promise. **The `Hero`, `Cta` and `Header` `mailto:` fallbacks are not
  owed and did not come back** — they were removed in Phase 6 because a dead
  conditional is worse than none, and all three ask for the form.
- **The DNS migration.** `lendavhollandlane.ee` resolves and serves the site:
  nameservers delegated to Cloudflare, apex and `www` attached to the Pages project,
  TLS live. This was already a launch-checklist step rather than a blocker; it is
  recorded here because **Google Search Console was blocked on it and no longer is.**
  The two dashboard items outstanding that day — `www` → apex, and DNSSEC — were
  both done on 27 July 2026; see the group below.

**And on 27 July 2026, the last item on this list that was not about the operator:**

- **Google Search Console verification — DONE, not merely unblocked.** It waited
  on the domain being registered, then on the DNS migration. Both cleared, and it
  is now a Domain property, `sc-domain:lendavhollandlane.ee`, verified by a
  Cloudflare-written TXT record on the apex, with `sitemap-index.xml` submitted and
  **Bing Webmaster Tools** registered alongside it. This is the ranking half of the
  analytics decision (ARCHITECTURE section 1) — the reason the site can run no
  analytics script and still answer "which searches find us". Launch-checklist
  step 4 has the record that must not be deleted.

**Nothing recorded on 27 July 2026 blocks anything.** Four pieces of live
infrastructure were configured in external dashboards that day and written into
ARCHITECTURE section 9 — the `www` → apex redirect, DNSSEC, Cloudflare's Managed
robots.txt turned off, and Search Console — plus the known email limitation:
Email Routing is receive-only, outbound as `info@` goes through Gmail SMTP and so
authenticates as `gmail.com` rather than the domain. **The domain publishes no
DMARC, which is what makes that work, and publishing a strict policy without
first moving the sending path would break every reply the business sends.** The
fix is a real mailbox on the domain and it is deferred until there is revenue —
ARCHITECTURE section 10. It is not on this list because nobody is waiting on it.

The list is only worth reading if it is true, so take an item off it the moment it is
answered.
