# CLAUDE.md — working rules for this repository

Read this first, every session. These rules override convenience, speed and your own preferences.

---

## Session protocol

1. At the start of every session, read `SPEC.md`, `ARCHITECTURE.md` and `PLAN.md` before touching anything.
2. Work on **one phase at a time**, in the order given in `PLAN.md`. Do not begin the next phase.
3. Enter plan mode and get the approach approved **before** writing or editing any file.
4. When the phase is complete, run `npm run verify`, report the result, and **stop**. Do not continue, do not start tidying, do not "also fix" something you noticed.
5. If you notice a problem outside the current phase, write it down in your report. Do not fix it.

## Code rules

- **Return full files, not fragments.** When changing a file, output its complete new contents.
- **Read a file before editing it.** Never edit from memory or assumption.
- **No new dependencies without asking.** Not a package, not a font, not a CDN script, not an icon library. If you think one is needed, stop and make the case. The dependency list in `ARCHITECTURE.md` is closed until explicitly reopened.
- **No Tailwind, no CSS framework, no component library.** Plain CSS with the tokens in `src/styles/tokens.css`.
- **Do not restructure files that are not part of the current phase**, however tempting.
- Keep client-side JavaScript at zero unless a phase explicitly calls for it. **There are exactly three named exceptions, one of which is planned rather than built, and the list is closed the same way the dependency list is.** Anything not on it needs approval; anything on it must not be deleted as a violation:
  1. **The mobile nav toggle** (and FAQ disclosure). Both are a native `<details>`, so this exception has never actually been taken — it costs zero bytes. It stays named because the toggle is where a session would reach for a script first.
  2. **The quote form's Formspree submit** — one `is:inline` script in `QuoteForm.astro`, 23 lines of code. **This was the only client JavaScript the site shipped until 3 August 2026**, when hero footage landed and item 3 below began to be emitted; it is still the only script on any page but the two home pages. It exists because Formspree's `_next` redirect is a paid feature, so without it a visitor who submits lands on Formspree's own English, Formspree-branded page at the moment they have committed. It is **progressive enhancement, not a dependency**: with JavaScript disabled there is no listener and the browser performs the same native POST it always did, landing on Formspree's page. It degrades to yesterday's behaviour rather than to broken, and the enquiry arrives either way — that is the whole basis on which the exception was taken, and it is the test any third exception must pass. Reasoning in ARCHITECTURE section 2; contract in section 6.
  3. **The hero video's viewport-entry playback — BUILT 29 July 2026.** `Hero.astro`, one `is:inline` script, 22 lines: an `IntersectionObserver` that starts playback on viewport entry and pauses it on exit. **It passes the test item 2 sets, and this was measured rather than argued** — with scripts disabled the video element reports `readyState 0` and `networkState IDLE`, meaning it requested no bytes at all, and the visitor sees the poster, which is a finished state by design rather than a broken one. It defers *when the video plays*, never *what the page loads*. **The script is emitted only when the footage exists** — which it has since 3 August 2026, so **the two home pages now ship it**. The no-footage hero that shipped zero client JavaScript is a state the repository returns to by deleting two files, not the state it is in. Constraints, budget and the acceptance gate are in PLAN's Phase 10; the full contract is ARCHITECTURE section 6.
- TypeScript strict. No `any`. A content schema violation must fail the build, not degrade silently.
- Semantic HTML. One `<h1>` per page. Headings in order. Every image has meaningful alt text.

## The single-source rule

Contact details, prices, company identifiers and credentials live **only** in `src/config/site.ts`.

If you are about to type a phone number, an email address, a euro amount or a registry code anywhere else in the codebase, you are making a mistake. Import it.

`grep -r "+372" src/ --exclude=site.ts` returning anything is a bug.

Note the exclude pattern is the **bare filename**. `--exclude=config/site.ts` looks
right and excludes nothing: BSD grep matches `--exclude` against the basename, so
that form reports `site.ts`'s own phone number every time it runs. A guard that
cries wolf on every run is a guard people stop running, and then it protects
nothing.

## The brand name

**The business name is settled: `Lendav Hollandlane`.** It lives in
`src/config/site.ts` as `site.brand` and `site.brandText`, and it is written
nowhere else in `src/` or `public/`.

**Both words are always capitalised.** Ordinary Estonian prose would lowercase
the idiom, but this is a proper business name and Estonian convention
capitalises those — Vana Tallinn, Must Puudel. There is no lowercase form and no
`LendavHollandlane` wordmark spelling.

**`brand` and `brandText` now hold the same string.** The wordmark/running-text
split is retired. Both keys stay because the wordmark may be styled differently
later and keeping them costs nothing — but neither may be given a different
value without a reason written down here.

**It is a trading name, not the legal name.** `site.legalName` is `AIF OÜ` and
did not change with the rename. That the two are separate fields is precisely
why the rename touched four values instead of the whole repository.

This is the same rule as the one above and it exists for the same reason: the
name was authored in sixteen places before Phase 4 closed — the `seoTitle` of all
ten service content files and six `meta.*.title` strings in `ui.ts` — and every
later phase would have added more. **The rule was paid off on 26 July 2026**, when
the business was renamed by editing two lines in `site.ts`. Do not undo it by
typing the name somewhere convenient.

**The `<title>` brand suffix is composed, not authored.** `BaseLayout` builds
` | ${site.brandText}` onto every page title, and every `<title>` on the site
goes through `BaseLayout` — directly or through `PageLayout`, which only
forwards. An authored string — a `meta.*.title` key, a `seoTitle` in frontmatter
— carries **only the page-specific part**. `seoTitle` enforces this in the schema:
a pipe in it fails the build.

**A page that should not carry the suffix** passes `brandSuffix={false}` to
`BaseLayout` or `PageLayout` — for a title written brand-first, for instance. That
prop suppresses the suffix. It does **not** license typing the name into a string;
the name still comes from `site.brandText`. No page sets it today.

`grep -rni "Lendav Hollandlane" src/ public/ --exclude=site.ts` returning
anything is a bug. The same basename caveat applies.

**`public/` is in that guard because a leak got past it.** `public/favicon.svg`
carried the old business name in an `aria-label` from Phase 0 to the rename — a
copy of the name in a file the guard never scanned, invisible to every session
that ran it. The `aria-label` is gone (the SVG is only ever referenced from
`<link rel="icon">`, where an accessible name is never surfaced), and the guard
now covers the directory rather than that one file.

**The guard matches the spaced brand only, deliberately.** The domain form
`lendavhollandlane` is a different string, and it has two known copies outside
`site.ts` — `astro.config.mjs` and `public/robots.txt`, neither of which can
import it today. Folding the unspaced form into this grep would make it fire on
every run, which is the cry-wolf failure described above. Those copies are
tracked as PLAN Phase 11 instead.

**The old name survives in exactly two files, and both are frozen.** README and
ARCHITECTURE section 4 said until 26 July 2026 that the repository, the git
remote, the local folder and `package.json`'s `name` would keep the old name
because they name the repository rather than the business. They did not keep it —
all four are now `lendav-hollandlane` — so that note is retired rather than
qualified, and this is the criterion that replaces it:

```
grep -rni "lennupesu" . --exclude-dir=node_modules --exclude-dir=.git \
  --exclude-dir=dist --exclude-dir=.astro --exclude=CLAUDE.md
```

returns **exactly `reference/one-pager-v1.html` and `reference/direction-d.html`**.
Anything else is a leak. Note the shape: unlike the two guards above, a clean run
here is not an empty one, so the test is *which* files, not *whether any*.

**Those two files are frozen design artefacts and are not to be corrected.** They
are the design history — `one-pager-v1.html` is the original single-file site,
`direction-d.html` the approved direction — and they carry the old name, the old
`.ee` domain and the old legal name because that is what was true when they were
written. Editing them to say `Lendav Hollandlane` would falsify what they are, and
it is the same mistake as porting `direction-d.html`'s `SAIL II` hero pill on the
grounds that it is in the file. Read them, port from them, leave them alone.

`--exclude=CLAUDE.md` is on that grep because this paragraph spells the old name
out, so without it the guard reports itself and the criterion could never read
"exactly two" — the same reason the brand guard above excludes `site.ts`. The cost
is that a leak *into this file* is invisible to it, which is acceptable: this file
is rules, it never ships, and the only reason it holds the string is to define the
test. The bare filename is the correct form here, per the caveat above.

## Content rules — these are the important ones

**Never invent content.** This site belongs to a real business with a real reputation and real regulatory obligations. Specifically:

- **No fabricated testimonials or reviews.** Not even as placeholders, not even marked as examples. If there are no reviews, the section does not exist.
- **No stock photography.** Every image is a photo of this operator's own work. If there are no photos, render the explicit empty state.

  **One scoped exception exists, it is live right now, and you will meet the files before you meet the rule — so read this before deleting anything.** `public/video/hero.mp4` and `src/assets/hero-poster.jpg` are **not the operator's work**. They are third-party footage used with written permission, installed 3 August 2026 as a placeholder, and they are **permitted**. Do not remove them as a violation of the line above.

  **The exception is defined in SPEC section 9 and only there.** It turns on four conditions that must hold together; they are not restated here, because a second copy of a rule is a rule that drifts. Go and read them before applying the exception to anything else — it is narrow, it is conditional, and *"there is already third-party media on the site"* is not one of the conditions.

  **What you may not infer from it, ever: that before/after imagery is covered. It is excluded in all circumstances** — permitted, captioned, third-party or not. The hero is decoration; a before/after pair is evidence of *our own work*, and a borrowed one is a false claim whoever owns the copyright. `BeforeAfter`'s empty state stays the answer until a real job file lands. **That boundary is the one this rule exists to hold, and it is not crossed by analogy from the hero.**
- **No invented case studies, statistics, customer counts or "trusted by" claims.**
- **No fabricated regulatory or technical claims.** Do not write that a product is biodegradable, that a chemical is approved, that a drone is certified, or that a process is guaranteed, unless the exact claim is already written in `SPEC.md` or `src/config/site.ts`.
- **Where real copy does not yet exist, never write plausible filler.** Filler that reads like real copy is worse than an obvious gap, because it survives into production unnoticed.

**How an unconfirmed fact is handled. Revised in Phase 4 — the earlier rule shipped the literal string `TODO:` onto the live page, and that is no longer what we do.**

The marker lives **in the repo, never on the page**, as an HTML comment in the content file. It names what is unconfirmed and forbids the specific thing a future session would be tempted to write:

```
<!-- unconfirmed: the cleaning product and its Estonian biocide authorisation
     are not confirmed. Do not name a product here, and do not make any claim
     about one, until they are. PLAN Phase 10 replaces this section. -->
```

What the visitor reads in its place is **a finished sentence that states no unconfirmed fact**. Usually that means saying where the answer will come from, or saying plainly that we do not publish one and why:

- *"Ütleme pakkumises, millist puhastusainet teie objektil kasutame ja millise Eesti biotsiidiloa alusel see on lubatud."* — a commitment about our own conduct, which is verifiable. It names no product.
- *"Me ei avalda selle kohta arvu. Meie enda objektidel ei ole veel mõõtmisi tehtud."* — a refusal with its reason. It invents no figure.

**The prohibition is unchanged and absolute: do not invent a fact to fill the gap.** Not a product name, not a percentage, not a duration, not a certification. The substance of the old rule was never the string `TODO:` — it was that the reader must not be misled. A sentence that promises an answer later misleads nobody; a sentence that guesses the answer does.

This applies identically to a missing **asset** — a photo, a video, a logo — which gets a **finished empty state**, not a marker. `BeforeAfter` and `Hero` are the reference implementations: both ship their no-asset state as the **default** path, and both must look finished. For `BeforeAfter` that is still the state the site launches in — there are no job photos. `Hero` has carried placeholder footage since 3 August 2026, so its empty state is no longer what launches; **the requirement on it is unchanged and the reasoning is the same one**, because the media layers are gated on the assets existing, and that is exactly what makes removing the placeholder a two-file deletion rather than a rewrite.

So there is now one rule, not two: **the gap is recorded in the repo and never rendered as a gap.** What ships is finished copy or a finished empty state, and in neither case does it assert something we cannot stand behind.

**"In the repo, never on the page" is now enforced, because for a while it was not.**
Every marker above shipped: 37 HTML comments across the ten service pages, in
production, naming what the business does not know and citing PLAN by phase number.
Markdown comments are content and rendered; the `.astro` files escaped only because
their markers are JS comments in frontmatter, which the compiler throws away. Two
things hold the line now, and neither replaces the other:

- `astro.config.mjs` strips HTML comments out of rendered markdown, in the AST.
- `scripts/check-html.mjs` check 4 **fails the build** if any HTML comment reaches any
  built page — the whole class, not a word list, so the next convention marker cannot
  leak the way `unconfirmed:` did. Comments inside `<pre>` and `<code>` are exempt, so
  a post that displays HTML source still builds.

Two consequences for how you write. In a **markdown** content file, keep using
`<!-- ... -->`; it is stripped at build and the guard confirms it. In an **`.astro`**
template, do not — Astro preserves `<!-- -->` and it will fail the build. Use
`{/* ... */}` or a frontmatter comment.

**Claims that are permitted**, because they are verifiable:
- Operational authorisation from Transpordiamet for specific-category operations (SORA, SAIL II)
- Third-party liability insurance under Regulation (EC) 785/2004
- Nobody walks on the roof
- Published prices
- Service across Estonia

**Claims that are forbidden:**
- "First in Estonia", "only drone operator", "Estonia's leading" — Droonipesu OÜ (pesutech.ee) already operates nationwide. These claims are false and competitively reckless.
- **That a competitor lacks an authorisation, a competency or insurance — asserted OR implied.** Their website does not state one; that is all we know, and it is not the same fact. A permission missing from a marketing site is not a permission missing from the operator. **This is the obvious next temptation and it is why the rule is written here**, next to the entry above: the competitive research on 26 July 2026 found no regulatory language anywhere on their site (SPEC section 10), and the gap between *"they do not say so"* and *"they do not have it"* is where this would go wrong.

  Watch the **soft forms**, because a flat "they are unlicensed" is not what anyone would actually write. These are all forbidden: *"the only drone operator with a permit"*, *"unlike others, we are insured"*, *"the only one that can legally fly over houses"*, and any comparative construction that leaves the reader to draw it. They are unverifiable, and they collapse straight back into the "only" claim already banned on the line above.

  Say what is ours instead, with no comparison attached: we hold the authorisation, we are insured, here are the references. A reader comparing two sites will notice which one says so, and that inference is theirs to draw rather than ours to plant. Unlike most content slips in this repo, this one has a route to a legal problem rather than an embarrassing correction.
- Any specific percentage, speed multiple or saving that is not backed by a measurement in this repo.
- Guarantees about outcomes, longevity or damage.

## The inspection line — read SPEC section 11 before editing a word of it

`/inspektsioon` and `/en/inspection` are the second line of business, added
8 August 2026. The copy — the page **and its three pointers** — is in
`src/i18n/inspection.ts`, and it is the **highest-risk copy on this site**: it
describes work that has never been done, for a line of business that holds **no
qualification of any kind**, using payloads the operator does not own.

**Two structural rules, both of which a tidy-up will want to break:**

- **POINTER, NEVER MEMBER.** Inspection appears everywhere the washing set
  appears — the services grid, the price table, `/teenused`, `/hinnakiri` — but
  never *inside* it. Not a seventh service card, not a seventh price-table row,
  not a seventh `serviceKey`, not a nav item. It is a standalone service that
  happens to be linkable from the washing pages. The six washing services stay
  six, and they are now headed "Droonipesu teenused" / "Droonipesu hinnad" so
  they read as *a* set rather than *the* set.
- **OFFER, NEVER REPORT.** Any copy connecting inspection to washing says *"you
  can have it looked at first"* — never *"customers often…"*, *"many housing
  associations start here"*, or anything else in the reporting voice. **No
  inspection job has been performed and no customer has done this.** This is the
  no-unperformed-work rule arriving through a side door, and it is the single
  most likely error in this area, because the reporting voice reads so naturally
  that it does not look like a violation.

`inspection` being absent from `navOrder` is deliberate, not an oversight — and
because `Footer.astro` renders `liveNav` too, that one omission is also what
keeps it out of the footer. ARCHITECTURE section 3 says why.

Three things it must never claim, and they are absolute:

- **No work done.** No job count, no case study, no "we have inspected". Where it
  lists kinds of job it says in the copy the visitor reads that the list describes
  the kind of work and not completed work — same rule as the industrial page.
- **No qualification, certification, licence or professional standing** — claimed
  *or implied*. What is sold is imagery and documented observations; the
  interpretation belongs to the client's own specialist and the page says so, as
  a selling point rather than as small print. Watch the soft forms: *"our
  assessment"*, *"our findings"*, *"professional inspection"* are the same claim
  with the noun moved.
- **No equipment.** The `TODO(equipment)` prohibition in `about.ts` applies here
  in full — no drone, no camera, no payload, no sensor.

**The full rule, including what may not be said about airspace, prices,
turnaround and thermal imaging, is SPEC section 11. It is not restated here** —
a second copy of a rule is a rule that drifts, which is the same reason the
footage exception lives only in SPEC section 9. The prohibitions are also written
at the top of `src/i18n/inspection.ts`, beside the strings they govern, because
that is where somebody will be standing when it matters.

**Customer language, not regulator language.** Customer-facing pages use the customer's language, not the regulator's.

`SAIL II`, `SORA` and `määrus (EÜ) 785/2004` must not appear in hero copy, in badges or pills, or in body text aimed at homeowners. A homeowner does not know what SAIL II is and will not look it up. The term buys no trust and spends attention that the price and the benefit need.

State the benefit instead:

- nobody walks on your roof
- the work is insured
- we are permitted to fly over houses

The exact regulatory references belong on the **credentials page** and in the **KÜ and commercial small print**, where the reader has come looking for documents and the precision is an advantage rather than noise. This rule governs *where* those references appear, not whether they are stated accurately — where they do appear they remain exact, per SPEC section 5.

Note that `reference/direction-d.html` predates this rule and still carries `Transpordiameti luba · SAIL II` in a hero pill and the full regulation number in its proof strip. Port its layout, not those strings.

## Pricing rules

- Every price displayed is **excluding VAT** and must be labelled as such. Estonian VAT is 24%.
- Prices are read from `site.ts`. Never hardcoded, never passed as props to `PriceTable`.
- "Alates" / "From" prefixes are required on per-m² prices.
- Do not display a total, an estimate or a calculator. See `SPEC.md` section 4.

## Language rules

- **Estonian is the source of truth.** Write Estonian first, then translate to English. Never write English first and translate outward.
- Estonian copy is written for Estonian homeowners: short sentences, no marketing English, no borrowed idiom. If a phrase would only make sense to someone who thinks in English, rewrite it.
- The brand is written **Lendav Hollandlane**, both words capitalised, everywhere. Estonian would lowercase the bare idiom; a business name is capitalised, as in Vana Tallinn and Must Puudel. It is never declined in copy — phrase the sentence so the nominative is grammatical, as `site.operator` already requires.
- Slugs are localised. Never share a slug across locales. The map in `src/i18n/routes.ts` is authoritative.
- A UI string missing from a locale is a type error, not a fallback.
- Estonian copy in this repo has been drafted by an AI and must be treated as unverified until a native speaker signs it off. Mark new Estonian copy with `<!-- needs-native-review -->` in the content file.

## Location page rule

A location page may only exist if there is a completed, published job in `src/content/jobs/` for that region, or it is one of the two launch regions (Tallinn, Harjumaa).

Do not generate location pages in bulk. Thin, templated town pages are a ranking liability and this project will not ship them.

## Definition of done

A phase is done when `npm run verify` exits 0 **and** you have reported what you changed and what you did not.

`npm run verify` passing means the site is not broken. It does not mean the phase achieved anything. Say plainly if you think the work is technically complete but substantively weak.

## When you are unsure

Stop and ask. A wrong assumption written confidently into copy about chemicals, certifications or pricing has consequences outside this repository.
