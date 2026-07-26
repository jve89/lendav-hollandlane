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
- Keep client-side JavaScript at zero unless a phase explicitly calls for it. The mobile nav toggle is the only expected exception.
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

**The business name is not settled.** It lives in `src/config/site.ts` as
`site.brand` (the wordmark, `LennuPesu`) and `site.brandText` (running text,
`Lennupesu`), and it is written nowhere else in `src/`.

This is the same rule as the one above and it exists for the same reason: the
name was authored in sixteen places before Phase 4 closed — the `seoTitle` of all
ten service content files and six `meta.*.title` strings in `ui.ts` — and every
later phase would have added more. When the name changes, it must change in one
line.

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

`grep -rn "Lennupesu" src/ --exclude=site.ts` returning anything is a bug. The
same basename caveat applies.

## Content rules — these are the important ones

**Never invent content.** This site belongs to a real business with a real reputation and real regulatory obligations. Specifically:

- **No fabricated testimonials or reviews.** Not even as placeholders, not even marked as examples. If there are no reviews, the section does not exist.
- **No stock photography.** Every image is a photo of this operator's own work. If there are no photos, render the explicit empty state.
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

This applies identically to a missing **asset** — a photo, a video, a logo — which gets a **finished empty state**, not a marker. `BeforeAfter` and `Hero` are the reference implementations: both ship their no-asset state as the default path, and both must look finished, because that is the state the site launches in.

So there is now one rule, not two: **the gap is recorded in the repo and never rendered as a gap.** What ships is finished copy or a finished empty state, and in neither case does it assert something we cannot stand behind.

**Claims that are permitted**, because they are verifiable:
- Operational authorisation from Transpordiamet for specific-category operations (SORA, SAIL II)
- Third-party liability insurance under Regulation (EC) 785/2004
- Nobody walks on the roof
- Published prices
- Service across Estonia

**Claims that are forbidden:**
- "First in Estonia", "only drone operator", "Estonia's leading" — Droonipesu OÜ (pesutech.ee) already operates nationwide. These claims are false and competitively reckless.
- Any specific percentage, speed multiple or saving that is not backed by a measurement in this repo.
- Guarantees about outcomes, longevity or damage.

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
- The brand is written **Lennupesu** in running text. **LennuPesu** is permitted only in the logo wordmark.
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
