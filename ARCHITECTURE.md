# ARCHITECTURE.md — LennuPesu website

**Version 1.1 · 25 July 2026**

---

## 1. Stack

| Layer | Package | Pinned | Why |
|---|---|---|---|
| Framework | `astro` | `^7.1.3` | Static output, zero client JS by default, first-class i18n and content collections. The right tool for a content site. |
| Language | `typescript` (dev) | `^5.9.0` | Content collection schemas are typed; a bad frontmatter key fails the build instead of the page. Held at 5.x: `@astrojs/check` peers `^5 \|\| ^6`, so TypeScript 7 is not yet available to us. |
| Type checking | `@astrojs/check` (dev) | `^0.9.4` | Powers `npm run check`. Astro-aware diagnostics for `.astro` files; a plain `tsc` cannot read them. |
| Styling | Plain CSS with custom properties | — | No Tailwind. The design tokens already exist from the one-pager, and this removes a build dependency and a class-name vocabulary from every future session. |
| Sitemap | `@astrojs/sitemap` | `^3.7.3` | Generates sitemap with hreflang alternates. |
| Forms | Formspree (external) | — | No backend, no database, free tier. Endpoint lives in one env var. |
| Hosting | Vercel or Netlify, static | — | Free, atomic deploys, instant rollback. Nothing to patch. |
| Analytics | Plausible or Vercel Analytics | — | Decided at Phase 9. No Google Analytics — cookie banner cost outweighs the benefit at this scale. |

That table is the whole dependency list. `package.json` carries `astro` and `@astrojs/sitemap` as dependencies, `typescript` and `@astrojs/check` as devDependencies, and nothing else.

**Node 22.12 or newer.** Astro 7 requires it and will refuse to run below it. Declared in three places so it cannot drift: `.nvmrc` (`22`), the `engines.node` field in `package.json`, and the Node version configured on the deploy host. Package manager: npm.

No other runtime dependencies. Adding one requires explicit approval — see CLAUDE.md.

## 2. Rendering and output

`output: 'static'`. Every page is prerendered HTML at build time. No SSR, no serverless functions, no runtime environment beyond a CDN.

`compressHTML: true` is set explicitly. Astro 7 changed the default to `'jsx'`, which strips whitespace between elements — including the significant space in markup like `<a>x</a> <a>y</a>`. The behaviour we want is stated in the config, not inherited from a default that has already changed once.

Client-side JavaScript is permitted only for: the mobile navigation toggle, and FAQ disclosure (which uses native `<details>`, so in practice this is zero JS). The language switch is a link to a real URL, not a JS toggle — this matters for indexing.

The hero video is deliberately inside that budget: `<video>` with `autoplay muted loop playsinline` needs no script, and `<source media="...">` can decide per-viewport and per-motion-preference which file is fetched, if any. A hero that needs JavaScript to decide what to load is a design that has gone wrong, and a third-party video player is a dependency decision, not an implementation detail. See the Hero contract in section 6.

## 3. Internationalisation

```js
// astro.config.mjs
i18n: {
  defaultLocale: 'et',
  locales: ['et', 'en'],          // 'ru' appends here, nothing else changes
  routing: { prefixDefaultLocale: false }
}
```

- Estonian is served at the root: `/teenused/katusepesu`
- English is prefixed: `/en/services/roof-cleaning`
- **Slugs are localised, not shared.** An Estonian searcher must land on an Estonian URL containing an Estonian keyword. The mapping between them lives in `src/i18n/routes.ts`, which is the single source of truth for cross-language links and hreflang tags.
- UI strings live in `src/i18n/ui.ts` as a typed object keyed by locale. A missing key is a type error.
- Page content lives in content collections, one file per locale.

`routing.redirectToDefaultLocale` is deliberately not set. Since Astro 6 it may only be used when `prefixDefaultLocale` is `true`, which is not our routing shape.

**Russian readiness:** adding `'ru'` to the locales array, a `ru` key to `ui.ts`, a `ru` column to `routes.ts`, and `ru/` content files is the entire job. No structural change. This is the reason for localised slugs and a route map rather than shared slugs.

## 4. File tree

```
lennupesu/
├── SPEC.md
├── ARCHITECTURE.md
├── CLAUDE.md
├── PLAN.md
├── README.md
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── .nvmrc                          # 22
├── .env.example                    # PUBLIC_FORMSPREE_ID
├── .gitignore
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── video/                      # hero loop, if self-hosted — see section 6
│   └── images/
│       ├── hero/                   # hero poster still, from our own footage
│       └── og/                     # social share images
└── src/
    ├── content.config.ts           # zod schemas for every collection
    ├── config/
    │   └── site.ts                 # SINGLE SOURCE: phone, email, prices, company details, service area
    ├── i18n/
    │   ├── ui.ts                   # UI strings per locale
    │   ├── routes.ts               # localised slug map + hreflang pairs
    │   └── utils.ts                # getLocale, t(), localisedPath()
    ├── styles/
    │   ├── tokens.css              # colours, spacing, type scale, radii
    │   └── global.css              # element defaults, layout primitives
    ├── layouts/
    │   ├── BaseLayout.astro        # html/head, meta, hreflang, JSON-LD, header, footer
    │   └── PageLayout.astro        # BaseLayout + page heading + breadcrumbs
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── LangSwitch.astro
    │   ├── Hero.astro
    │   ├── TrustBar.astro
    │   ├── ServiceCard.astro
    │   ├── PriceTable.astro
    │   ├── CompareTable.astro      # drone vs scaffolding
    │   ├── BeforeAfter.astro       # renders a job's photo pair, or an explicit empty state
    │   ├── Faq.astro
    │   ├── QuoteForm.astro
    │   ├── Cta.astro
    │   └── Seo.astro
    ├── content/
    │   ├── services/
    │   │   ├── et/                 # katusepesu.md, fassaadipesu.md, ...
    │   │   └── en/
    │   ├── locations/
    │   │   ├── et/                 # tallinn.md, harjumaa.md
    │   │   └── en/
    │   ├── jobs/                   # completed jobs: photos, area, duration, town
    │   │   └── photos/             # real before/after photos, in src/ so <Image> can process them
    │   └── posts/
    │       ├── et/                 # empty at launch
    │       └── en/
    └── pages/
        ├── index.astro                        # ET home
        ├── hinnakiri.astro
        ├── meist.astro
        ├── kkk.astro
        ├── kontakt.astro
        ├── teenused/
        │   ├── index.astro
        │   └── [slug].astro
        ├── piirkonnad/
        │   └── [slug].astro
        ├── blogi/
        │   ├── index.astro
        │   └── [slug].astro
        ├── 404.astro
        └── en/
            ├── index.astro
            ├── pricing.astro
            ├── about.astro
            ├── faq.astro
            ├── contact.astro
            ├── services/{index,[slug]}.astro
            ├── areas/[slug].astro
            └── blog/{index,[slug]}.astro
```

## 5. Data model

### `src/config/site.ts` — the single source of truth

```ts
export const site = {
  brand: 'LennuPesu',
  legalName: 'AIF Drone Services OÜ',
  regCode: 'TODO',
  vatNumber: 'TODO',
  phone: '+372 0000 0000',          // TODO
  phoneHref: 'tel:+3720000000',
  email: 'info@lennupesu.ee',
  domain: 'https://lennupesu.ee',
  vatRate: 0.24,
  prices: {
    roofFrom: 3.00,                 // EUR per m², EXCLUDING VAT
    facadeFrom: 3.00,
    minimumJob: 450,
  },
  season: { from: 4, to: 10 },      // April–October
  credentials: {
    authority: 'Transpordiamet',
    authorisation: 'Erikategooria käitamisluba (SORA, SAIL II)',
    insurance: 'Määrus (EÜ) 785/2004',
  },
} as const
```

Nothing else in the codebase hardcodes a phone number, an email address or a price. A grep for `+372` outside this file is a bug.

### Content collections (`src/content.config.ts`)

Schemas live at `src/content.config.ts`, not inside `src/content/`. Every collection declares a loader — `glob({ pattern, base })` — and the schema `z` is imported from `astro/zod`, not from `astro:content`. Both are Astro 6/7 requirements, not preferences.

Markdown bodies render through Astro's own Markdown pipeline. Remark or rehype plugins are not available without adding the optional `@astrojs/markdown-remark` peer, which is a new dependency and therefore needs approval before anyone reaches for it.

Every schema is a `z.strictObject`, not a `z.object`. `z.object` strips an unknown
key silently, so a misspelled optional field would validate and the page would
render wrong; `strictObject` raises `unrecognized_keys` and fails the build. This
is what "a bad frontmatter key must fail the build" requires. Astro 7 ships Zod 4,
where `strictObject` is the current spelling of this.

**`services`** — one markdown file per service per locale.
`title, slug, locale, summary, priceKind, priceNote?, order, icon, seoTitle, seoDescription, faqRefs[]`

`priceKind` is a REFERENCE — one of `roof | facade | quote | addon` — that
`ServiceCard` resolves against `site.prices`. It is deliberately not a `priceFrom`
amount: a euro figure typed into a markdown file breaks the single-source rule in
CLAUDE.md, which overrides this document. `priceNote` is prose and never a figure.
`faqRefs` is a plain string array, not a `reference()`, because there is no `faq`
collection — the FAQ id space arrives with Phase 5.

**`locations`** — one per region we can honestly claim.
`name, slug, locale, intro, isPrimary, jobRefs[], seoTitle, seoDescription`
Body must contain region-specific substance. A location file with no `jobRefs` and under 300 words fails review — see CLAUDE.md.

**`jobs`** — a completed job. This is the evidence layer and it is locale-independent.
`date, town, service, areaM2, durationHours, roofType, beforeImage, afterImage, videoUrl?, testimonial?, testimonialAuthor?, published`
Referenced by locations and service pages. `published: false` until the customer has agreed.

There is no `id` field: the glob loader derives the entry id from the filename, so
declaring one in frontmatter would collide with it. `beforeImage` and `afterImage`
use the `image()` schema helper and resolve relative to the entry
(`./photos/x.jpg`), which is what gives them WebP, intrinsic width and height, and
a build error when a photo is missing — none of which a `public/` path can do.
`testimonial` and `testimonialAuthor` are enforced as both-or-neither: an
unattributed review must not be publishable.

**`posts`** — blog. Empty at launch.
`title, slug, locale, date, excerpt, heroImage?, tags[], draft`

## 6. Component contracts

- **`BaseLayout`** — props `{ title, description, locale, path, ogImage? }`. Emits `<html lang>`, canonical, full `hreflang` set from `routes.ts`, Open Graph, and `LocalBusiness` JSON-LD built from `site.ts`. Every page goes through it. No page writes its own `<head>`.
- **`BeforeAfter`** — props `{ jobId?, locale }`. Renders the photo pair when the job exists and `published` is true. When no jobs exist it renders an explicit, styled empty state that says photos are added after real work. It must never render a placeholder that could be mistaken for a real result. `locale` is required because both the empty state and the images' alt text are localised. `jobId` is optional: a caller that selects "the newest published job" has nothing to pass until a job exists, and must not invent an id that resolves to nothing. Both home pages use it that way, so the evidence section on `/` fills itself the moment a job file lands. The empty state uses no heading element, so it cannot disturb the calling page's heading order, and it is sized to its own sentence rather than to the image pair it replaces — at full width an empty panel reads as a reserved slot, which is the impression CLAUDE.md rules out.
- **`Hero`** — props `{ locale, headline, sub }`. The home page hero specified in SPEC section 9. Renders a looped video of our own work with the price and credentials block directly beneath it, and degrades through a defined chain when the footage does not exist. Full contract below.
- **`QuoteForm`** — props `{ locale, defaultService? }`. Posts to Formspree via `PUBLIC_FORMSPREE_ID`. Native HTML validation only. Progressive enhancement: works with JavaScript disabled. Note that `import.meta.env` values are inlined as strings and never coerced.
- **`PriceTable`** — reads prices from `site.ts`. Always renders the ex-VAT note. Never takes prices as props.

### `Hero` — the contract

**Structure.** One `<section>` containing the media band, then the price and credentials block. Nothing sits between them and the block is not a separate component boundary — the pairing is the point. The block reads its price from `site.ts` via `PriceTable`'s rules (from-price, `alates` prefix, excluding VAT, labelled) and its credentials from `site.credentials`. The Hero never takes a price, a phone number or a credential as a prop.

**Media, when footage exists.** Native `<video>`, no player library. No `controls`, no sound, no audio track in the file at all. `muted` and `playsinline` are both load-bearing: without them iOS refuses to autoplay and takes the video fullscreen. The element carries no `aria-label` and is `aria-hidden`, because it is decoration — every claim it makes visually is also made in text beneath it. A hero that only communicates through video fails for a screen reader and fails with the video blocked.

**Two independent guards, both required.** Reduced motion is protected twice, and neither guard is a fallback for the other. They are built together or the component is not done.

*Guard one — the fetch never happens.* `<source media="...">` gates which file is fetched on viewport and motion preference. When nothing matches, the browser fetches nothing and paints the poster:

```html
<video autoplay muted loop playsinline preload="none"
       poster="/images/hero/poster.webp" aria-hidden="true">
  <source src="/video/hero.webm" type="video/webm"
          media="(min-width: 48em) and (prefers-reduced-motion: no-preference)">
  <source src="/video/hero.mp4" type="video/mp4"
          media="(min-width: 48em) and (prefers-reduced-motion: no-preference)">
</video>
```

Media queries on `<source>` are evaluated once at page load and never re-evaluated on resize — correct for a landing page, and the reason no resize listener is needed.

*Guard two — no motion is ever visible.* Independently of the above, CSS hides the video outright when the visitor has asked for reduced motion, revealing the poster beneath:

```css
@media (prefers-reduced-motion: reduce) {
  .hero__video { display: none; }
  .hero__poster { display: block; }
}
```

**Why both.** They fail differently. Guard one is the one that saves bandwidth, but it depends on `media` on `<source>` being honoured — support was removed from the spec in 2014 and only restored in Chrome 120 and Firefox 120, so a browser that ignores it silently fetches and plays the video. Guard two cannot prevent the download, but it is plain CSS that has worked for a decade and it guarantees the accessibility outcome regardless. One protects the budget, the other protects the visitor. Neither may be dropped on the grounds that the other exists.

`TODO:` verify guard one on real iOS Safari and Android Chrome once footage exists, particularly `prefers-reduced-motion` inside the `media` attribute. If it turns out not to be honoured the design still holds — guard two carries the accessibility outcome and only the bandwidth saving is lost — but we should know rather than assume.

**The fallback chain.** Three states, and the component must implement all three from the start:

1. **Video** — poster paints immediately and is the LCP element; video replaces it when decoded.
2. **Poster only** — a real still from our own footage. Served to phones, to reduced-motion visitors, and to anyone whose video fails.
3. **No footage at all** — no video, no poster. Renders a designed, image-free hero: the headline, the sub, and the price and credentials block, carried by type and the tokens in `tokens.css`. Not a grey box, not a blurred gradient standing in for a photograph, not the words "video coming soon".

State 3 is the **default path** and ships first, exactly as `BeforeAfter`'s empty state does. It must look finished, because it is what the site launches with and may be what it runs on for months. A hero that looks broken without footage will ship looking broken.

**What state 3 must not become.** It must not acquire a stock image, a stock video, an illustration of a drone we do not own, or a photograph of someone else's roof. SPEC section 4 and CLAUDE.md apply to the hero identically. The `TODO:` marker for missing footage lives in the repo, not rendered onto the production home page — the visitor sees a complete image-free hero, and the marker exists so a future session does not mistake the empty state for a finished one.

**Budget.** The poster is the LCP element and is the only hero asset counted against the 500 KB first-load budget in SPEC section 6, which is binding on mobile. It is WebP or AVIF with explicit `width` and `height`, and no hero asset may introduce layout shift — the media band reserves its aspect ratio in CSS before anything loads. The video is capped at **2 MB on desktop**, measured as the single file the browser actually fetches rather than the sum of the encodings offered, with a **maximum loop length of 12 seconds**. On mobile the video budget is zero bytes, because no video is fetched. Footage that cannot meet the caps is re-cut or re-encoded, not exempted.

**Hosting.** Self-hosted in `public/video/`, served as a static asset by the same CDN as the rest of the site. No video CDN, no HLS, no player library — see SPEC section 9 for the reasoning. This is a closed decision; adding a video host is a dependency change and needs approval like any other.

## 7. SEO

- One `<h1>` per page, containing the target Estonian keyword naturally.
- `hreflang` alternates on every page, plus `x-default` pointing at Estonian.
- Canonical URLs absolute, from `site.domain`.
- `LocalBusiness` JSON-LD sitewide; `Service` JSON-LD on service pages; `FAQPage` JSON-LD on the FAQ page only.
- Sitemap generated at build; `robots.txt` in `public/`. Link to it as `/sitemap-index.xml` — since Astro 6, endpoints with a file extension are only reachable without a trailing slash.
- Images: Astro's `<Image>`, WebP, explicit width and height, `loading="lazy"` below the fold. Alt text is required — a missing alt fails the build check.

## 8. Verification gates

```jsonc
// package.json scripts
"dev":     "astro dev",
"build":   "astro build",
"preview": "astro preview",
"check":   "astro check",
"links":   "node scripts/check-html.mjs",   // links, JSON-LD, headings, meta
"sync":    "astro sync --force",            // evict the content cache; see below
"verify":  "npm run sync && npm run check && npm run build && npm run links"
```

`npm run verify` exiting 0 is the technical definition of done for every phase. It is a floor, not proof the site works — see SPEC section 6.

### Why `verify` starts with `sync --force`

Astro's content layer keeps a persistent store at `node_modules/.astro/data-store.json`. **Deleting a content file does not evict its entry from that store.** The glob loader reports `No files found matching …` for the now-empty directory and the stale entry survives regardless, so `getCollection` keeps returning content that is no longer in the repository.

This was not theoretical. It was found in Phase 3 and it fails in both directions:

- **Silently, which is the dangerous one.** A deleted job kept rendering on the home page — town, area and photos — while `npm run verify` exited 0 and the `BeforeAfter` empty state disappeared. A gate that passes on content the repository does not contain is not a gate.
- **Loudly.** A deleted job whose photos went with it failed the build on an unresolvable `image()` path, from an entry no file on disk declares.

`astro sync --force` clears the content layer and repopulates it from disk, which fixes both. It runs **first**, before `check`, for two reasons:

1. `astro check` has no `--force` of its own, so whatever store exists when it runs is what it validates. Forcing at the head of the chain is the only way to give every later step the truth. Putting `--force` on `astro build` instead would correct `dist/` but still let `check` — the step that runs first and can abort the gate — pass or fail on content that is not there.
2. It is a supported flag rather than a hand-rolled `rm -rf` of an Astro internal path. That path has already moved once, from `.astro/` to `node_modules/.astro/`, and a stale `.astro/data-store.json` left behind by the old location is exactly what made this bug hard to read.

**Cost: about +0.85 s, roughly +23%** — `npm run verify` goes from ~3.8 s to ~4.6 s on this machine. Most of that is a fourth Node process starting, not the eviction itself; the store holds two files today. Correctness of the gate is worth a second, and this is the cheapest place in the project to buy it.

## 9. Deployment

Static build to `dist/`. Connected to the GitHub repo; push to `main` deploys. Preview deploys on branches. Rollback is redeploying a previous build, which is instant.

The deploy host must be set to Node 22 (22.12 or newer). Astro 7 will not build on Node 20.

DNS: `lennupesu.ee` apex plus `www` redirecting to apex. `lennupesu.com` redirects to `.ee`.

## 10. Decisions deliberately deferred

Analytics vendor (Phase 9) · whether Decap CMS is ever needed (only if publishing becomes a real blocker) · Russian (structure is ready, content is not) · whether the survey business gets a section here or its own domain.
