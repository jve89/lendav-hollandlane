# ARCHITECTURE.md — LennuPesu website

**Version 1.0 · 25 July 2026**

---

## 1. Stack

| Layer | Choice | Pinned | Why |
|---|---|---|---|
| Framework | Astro | `^5.14.0` | Static output, zero client JS by default, first-class i18n and content collections. The right tool for a content site. |
| Language | TypeScript | `^5.9.0` | Content collection schemas are typed; a bad frontmatter key fails the build instead of the page. |
| Styling | Plain CSS with custom properties | — | No Tailwind. The design tokens already exist from the one-pager, and this removes a build dependency and a class-name vocabulary from every future session. |
| Sitemap | `@astrojs/sitemap` | `^3.6.0` | Generates sitemap with hreflang alternates. |
| Forms | Formspree (external) | — | No backend, no database, free tier. Endpoint lives in one env var. |
| Hosting | Vercel or Netlify, static | — | Free, atomic deploys, instant rollback. Nothing to patch. |
| Analytics | Plausible or Vercel Analytics | — | Decided at Phase 9. No Google Analytics — cookie banner cost outweighs the benefit at this scale. |

**Node 22 LTS.** Package manager: npm.

No other runtime dependencies. Adding one requires explicit approval — see CLAUDE.md.

## 2. Rendering and output

`output: 'static'`. Every page is prerendered HTML at build time. No SSR, no serverless functions, no runtime environment beyond a CDN.

Client-side JavaScript is permitted only for: the mobile navigation toggle, and FAQ disclosure (which uses native `<details>`, so in practice this is zero JS). The language switch is a link to a real URL, not a JS toggle — this matters for indexing.

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
├── .env.example                    # PUBLIC_FORMSPREE_ID
├── .gitignore
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── images/
│       ├── jobs/                   # real before/after photos, added after each job
│       └── og/                     # social share images
└── src/
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
    │   ├── config.ts               # zod schemas for every collection
    │   ├── services/
    │   │   ├── et/                 # katusepesu.md, fassaadipesu.md, ...
    │   │   └── en/
    │   ├── locations/
    │   │   ├── et/                 # tallinn.md, harjumaa.md
    │   │   └── en/
    │   ├── jobs/                   # completed jobs: photos, area, duration, town
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

### Content collections (`src/content/config.ts`)

**`services`** — one markdown file per service per locale.
`title, slug, locale, summary, priceFrom?, priceUnit?, priceNote?, order, icon, seoTitle, seoDescription, faqRefs[]`

**`locations`** — one per region we can honestly claim.
`name, slug, locale, intro, isPrimary, jobRefs[], seoTitle, seoDescription`
Body must contain region-specific substance. A location file with no `jobRefs` and under 300 words fails review — see CLAUDE.md.

**`jobs`** — a completed job. This is the evidence layer and it is locale-independent.
`id, date, town, service, areaM2, durationHours, roofType, beforeImage, afterImage, videoUrl?, testimonial?, testimonialAuthor?, published`
Referenced by locations and service pages. `published: false` until the customer has agreed.

**`posts`** — blog. Empty at launch.
`title, slug, locale, date, excerpt, heroImage?, tags[], draft`

## 6. Component contracts

- **`BaseLayout`** — props `{ title, description, locale, path, ogImage? }`. Emits `<html lang>`, canonical, full `hreflang` set from `routes.ts`, Open Graph, and `LocalBusiness` JSON-LD built from `site.ts`. Every page goes through it. No page writes its own `<head>`.
- **`BeforeAfter`** — props `{ jobId }`. Renders the photo pair when the job exists and `published` is true. When no jobs exist it renders an explicit, styled empty state that says photos are added after real work. It must never render a placeholder that could be mistaken for a real result.
- **`QuoteForm`** — props `{ locale, defaultService? }`. Posts to Formspree via `PUBLIC_FORMSPREE_ID`. Native HTML validation only. Progressive enhancement: works with JavaScript disabled.
- **`PriceTable`** — reads prices from `site.ts`. Always renders the ex-VAT note. Never takes prices as props.

## 7. SEO

- One `<h1>` per page, containing the target Estonian keyword naturally.
- `hreflang` alternates on every page, plus `x-default` pointing at Estonian.
- Canonical URLs absolute, from `site.domain`.
- `LocalBusiness` JSON-LD sitewide; `Service` JSON-LD on service pages; `FAQPage` JSON-LD on the FAQ page only.
- Sitemap generated at build; `robots.txt` in `public/`.
- Images: Astro's `<Image>`, WebP, explicit width and height, `loading="lazy"` below the fold. Alt text is required — a missing alt fails the build check.

## 8. Verification gates

```jsonc
// package.json scripts
"dev":     "astro dev",
"build":   "astro build",
"preview": "astro preview",
"check":   "astro check",
"links":   "node scripts/check-html.mjs",   // links, JSON-LD, headings, meta
"verify":  "npm run check && npm run build && npm run links"
```

`npm run verify` exiting 0 is the technical definition of done for every phase. It is a floor, not proof the site works — see SPEC section 6.

## 9. Deployment

Static build to `dist/`. Connected to the GitHub repo; push to `main` deploys. Preview deploys on branches. Rollback is redeploying a previous build, which is instant.

DNS: `lennupesu.ee` apex plus `www` redirecting to apex. `lennupesu.com` redirects to `.ee`.

## 10. Decisions deliberately deferred

Analytics vendor (Phase 9) · whether Decap CMS is ever needed (only if publishing becomes a real blocker) · Russian (structure is ready, content is not) · whether the survey business gets a section here or its own domain.
