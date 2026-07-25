# PLAN.md — build phases

One phase per session. Fresh session each time. Commit on every green phase, without exception.

**Re-anchor prompt for each session:**
> Read SPEC.md, ARCHITECTURE.md and PLAN.md. We are doing Phase N. Plan first, do not write anything until I approve.

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
- Leave the chemicals section as a `TODO:` marker — the product and its Estonian biocide authorisation are not confirmed

**Verify:** gate passes · every service reachable in both locales · hreflang pairs correct between localised slugs.

**Commit:** `feat: service pages`

---

## Phase 5 — Pricing, FAQ, credentials

- `hinnakiri.astro` — `PriceTable` from `site.ts`, ex-VAT labelling, what changes a price, minimum job value
- `kkk.astro` — full FAQ with `FAQPage` JSON-LD; two answers ship as `TODO:` markers (chemicals, water and power)
- `meist.astro` — the operator, the authorisation, the insurance, the equipment. This is the page that beats the incumbent, so write it like it matters.

**Verify:** gate passes · no price hardcoded outside `site.ts` · JSON-LD validates.

**Commit:** `feat: pricing, FAQ, credentials`

---

## Phase 6 — Contact and quote form

- `kontakt.astro` with `QuoteForm`, phone, email, service area, season
- Formspree wired via `PUBLIC_FORMSPREE_ID`
- Works with JavaScript disabled
- Thank-you page in both locales

**Verify:** gate passes · a real test submission arrives in the inbox · form submits with JS off · required-field validation is native.

**Commit:** `feat: contact page and quote form`

---

## Phase 7 — Regional pages

Tallinn and Harjumaa only. No other towns until a completed job justifies one.

**Verify:** gate passes · each page has region-specific substance, not a template with the name swapped.

**Commit:** `feat: Tallinn and Harjumaa pages`

---

## Phase 8 — Blog infrastructure

The machine, not the posts. `blogi/index.astro` renders an honest empty state.

First posts, when there is time and something real to say, target informational searches: how to tell moss from lichen, when to clean an Estonian roof, what pressure does to fibre-cement, drone versus scaffolding cost.

**Verify:** gate passes · empty state renders · adding one draft post appears in dev and is excluded from the production build.

**Commit:** `feat: blog infrastructure`

---

## Phase 9 — SEO, performance, launch

- Sitemap with hreflang; `robots.txt`
- OG images per page type
- Favicon and touch icons
- Analytics decision and installation
- Full-site Lighthouse pass
- Link check across every page
- Redirects: `www` → apex, `.com` → `.ee`

**Verify:** gate passes · Lighthouse ≥95/95 on home, one service page and pricing · sitemap lists every page with correct alternates · zero broken links.

**Commit:** `feat: SEO, performance, launch readiness`

---

## Phase 10 — Real content drop *(after the first jobs, ~October 2026)*

Not a build phase. This is why the empty states exist.

- Before/after photo pairs into `src/content/jobs/`
- Real customer reviews
- The confirmed cleaning product and its biocide authorisation, replacing the FAQ TODO
- Water and power answer, replacing the other FAQ TODO
- Measured figures — throughput, job duration — feeding both the copy and the financial model
- Native-speaker Estonian review, removing every `needs-native-review` marker

---

## Blocked on the operator, not on code

Registry code and VAT number · real phone number and email · Formspree account · the cleaning product and its Estonian biocide authorisation · the water and power answer · `lennupesu.ee` registered and DNS pointed · Google Business Profile verified · native-speaker Estonian review.

None of these block Phases 0–8. All of them block launch.
