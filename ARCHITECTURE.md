# ARCHITECTURE.md — Lendav Hollandlane website

**Version 2.0 · 8 August 2026** — **a second pillar was added to the site and
almost nothing here had to change, which is itself the thing worth recording.**
Section 3 gains the paragraph that explains why: a **static page registered in
`routes.ts` pairs for hreflang and the sitemap through `alternates(routeKey)`,
while a collection page pairs through `collections.ts` and has to be handed its
alternates as a prop** — so the inspection line cost two route-map values and no
pairing code at all. Section 4 lists `i18n/inspection.ts`, `PathChooser.astro`
and the two new pages. Section 6 gains the **`PathChooser` contract** and records
**one named exception to `QuoteForm`'s "options come from the collection" rule**:
inspection is not a service in the collection and must not become one, so its
`<option>` comes from `i18n/inspection.ts` instead. Nothing was removed, no slug
moved, no redirect exists, and the client-JavaScript exception list in section 2
is untouched — `PathChooser` is two links in a list. **SPEC section 11 is new and
governs what the inspection page may say**; it is stricter than anything else on
this site and this document does not restate it.

**Version 1.9 · 29 July 2026** — **the hero video is built, so the third
client-JavaScript exception in section 2 flips from PLANNED to BUILT and the
Hero contract in section 6 is rewritten as a single accurate contract with its
SUPERSEDED-PENDING box removed.** What shipped differs from what 1.8 anticipated
on four counts, each recorded where it belongs: the video is a **scrimmed
background** behind the hero text rather than a media band above the price
block; a new `--hero-scrim` token carries the overlay; the hero text is
**remapped in the footage state** because no scrim alpha PLAN permits can hold
AA over a bright frame; and the `<source media="...">` gate **no longer carries a
width condition**, so a phone fetches the video too — a product decision, taken
against the fact that most of this site's traffic is mobile, and reversible on a
PageSpeed number rather than on a precaution. Section 8 gains **check 7**, which
fails the build if any file under `public/video/` exceeds 1.5 MB. Section 4
records that the poster lives in `src/assets/` while the video lives in
`public/video/`, and why. **SPEC sections 6 and 9 were corrected in the same
commit** — they described a media band and promised zero video bytes on mobile,
and both statements are now false. The open `TODO:` in the old contract, asking
whether `media` on `<source>` is honoured, is **answered for Chrome** below.

**Version 1.8 · 27 July 2026** — **section 2 names a third client-JavaScript
exception, and it is planned rather than built**: the hero video's viewport-entry
playback, approved with the rest of the visual decisions now written into PLAN's
Phase 10. It is listed before it exists so it arrives as a decision rather than as
a script in a diff, and nothing may be written against it until there is real
footage. The paragraph in section 2 that said the hero needs no script is amended
rather than deleted — `<source media="...">` still decides what is *fetched*, and
both reduced-motion guards stand. **The Hero contract in section 6 is marked
SUPERSEDED-PENDING in place rather than rewritten**, with a box naming what it
contradicts and what still stands; the session that holds the footage reconciles
it, because writing the replacement now would specify a hero against footage
nobody has seen. **The palette decision in the same batch — every
`.section--paper` section moving off `--paper` to `--panel`, all four of them, both
home pages and both service index pages — is recorded in PLAN only**, because it
changes no architecture: it is a token and contrast question.
The full reasoning for both halves is in the Claude Project doc
`launch/footage-and-visual-plan.md` — in the "AIF Drone Services" project, **not in
this repository**, despite reading like a repo path. The split is deliberate: PLAN
holds the binding constraints, that doc holds the reasoning, and neither is a copy
of the other. No code changed with this version.

**Version 1.7 · 27 July 2026** — **records live infrastructure that existed only
in external dashboards and was written down nowhere.** Four changes, all in
section 9: the **`www` → apex redirect** and **DNSSEC**, which section 9 had
listed as the two items still outstanding and which are now done; **Cloudflare's
Managed robots.txt**, which was on by default, was rewriting the served
`/robots.txt`, and has been turned off — **a fourth instance of the
external-dashboard hazard pattern**, so the count in the 1.6 note below is
superseded; and **Google Search Console and Bing Webmaster Tools** registration.
Section 9 also gains the **email limitation** — Cloudflare Email Routing is
receive-only, and outbound mail is not domain-aligned — and section 10 gains the
mailbox upgrade as a deferred decision. No code changed with this version.

**Version 1.6 · 26 July 2026** — **a paragraph in section 6 was false and is
deleted.** It said Formspree's spam filtering accepted six localhost submissions
and then silently discarded them; all six were in fact delivered, to a mailbox
the session that wrote it could not see. What replaces it is the rule that failure actually taught
— verify your observation channel before drawing a conclusion from silence —
with both mailboxes named. **There were three dashboard hazards outside this
repository at that point, not four** — the fourth arrived with 1.7 above, and
the three named here are unchanged. Version 1.5 named
**two client-JavaScript exceptions** in section 2 rather than one: the quote form
submits by `fetch` and navigates to our own thank-you page, because Formspree's
`_next` redirect is a paid feature, with the native POST unchanged beneath it;
section 6's `QuoteForm` contract and its `_next` paragraph were rewritten with
it. Version 1.4 recorded a live domain rather than a migration in section 9, and
the tested email address in sections 5 and 6; two dashboard items remain there,
the `www` → apex redirect and DNSSEC. Version 1.3 settled the business name as
**Lendav Hollandlane** and the domain as `lendavhollandlane.ee`. Version 1.2
settled hosting and analytics (section 1), the sitemap's hreflang and the OG/icon
set (section 7), and check 6 (section 8).

---

## 1. Stack

| Layer | Package | Pinned | Why |
|---|---|---|---|
| Framework | `astro` | `^7.1.3` | Static output, zero client JS by default, first-class i18n and content collections. The right tool for a content site. |
| Language | `typescript` (dev) | `^5.9.0` | Content collection schemas are typed; a bad frontmatter key fails the build instead of the page. Held at 5.x: `@astrojs/check` peers `^5 \|\| ^6`, so TypeScript 7 is not yet available to us. |
| Type checking | `@astrojs/check` (dev) | `^0.9.4` | Powers `npm run check`. Astro-aware diagnostics for `.astro` files; a plain `tsc` cannot read them. |
| Styling | Plain CSS with custom properties | — | No Tailwind. The design tokens already exist from the one-pager, and this removes a build dependency and a class-name vocabulary from every future session. |
| Markdown | `@astrojs/markdown-satteri` | `0.3.4` | Astro 7's own Markdown processor, named explicitly so we can add a hast plugin. Astro already depends on it at this exact version, so declaring it installs nothing — see below. |
| Sitemap | `@astrojs/sitemap` | `^3.7.3` | Generates sitemap with hreflang alternates. |
| Forms | Formspree (external) | — | No backend, no database, free tier. Endpoint lives in one env var. |
| Hosting | Cloudflare Pages, static | — | **Decided Phase 9.** Free tier permits commercial use, unlimited bandwidth, 500 builds/month. See below. |
| Analytics | **None, deliberately** | — | **Decided Phase 9 — this is a decision, not a deferral.** See below. |

That table is the whole dependency list. `package.json` carries `astro`,
`@astrojs/sitemap` and `@astrojs/markdown-satteri` as dependencies, `typescript` and
`@astrojs/check` as devDependencies, and nothing else.

**`@astrojs/markdown-satteri` is the one line on that list that cost nothing**, and
the reasoning is worth keeping because the next session will meet the same question.
Astro 7.1.3 depends on it at the exact version `0.3.4`, so it was already in
`node_modules` before we named it; `npm install` after adding it reported *"up to
date"* and installed zero packages. Declaring it does not add a dependency so much as
stop an import relying on npm hoisting. The alternative — `@astrojs/markdown-remark`,
which Astro 7 no longer installs — is a real tree of unified, remark and rehype
packages, and it was rejected. See section 5.

### Hosting — why Cloudflare Pages, and why not the other two

Decided in Phase 9, which is where this table stopped saying "Vercel or Netlify".
Recorded so it is not relitigated.

**Vercel is out on its own terms.** The Hobby plan forbids commercial use, and this
is the marketing site of a business that takes money. That leaves Vercel Pro at
$20/month, which fails SPEC section 7 — "hosting must be free or near-free". The
prohibition is the decisive fact here, not the price.

**Cloudflare Pages over Netlify** on the metering. Netlify's free tier permits
commercial use too, so the choice came down to what happens when the site starts
working: Netlify now bills against a 300-credit monthly allowance, at 15 credits per
production deploy and 20 credits per GB served — *as researched on 26 July 2026;
hosting pricing moves and this figure should be re-checked, not trusted.* That is
roughly 20 deploys a month at zero traffic, and a site that ships a 2 MB desktop
hero video at Phase 10 spends the rest on bandwidth. Cloudflare's unlimited
bandwidth and 500 builds/month have no such failure mode. **The video is the reason**
— on a text-only site the two were interchangeable.

**Netlify Forms was the argument for Netlify, and it was rejected.** It would have
retired the Formspree paid-redirect item from PLAN's blocked list, because its
custom success page is free and per-form. But that item is a *thank-you page*: the
enquiry itself already arrives on Formspree's free tier. A hosting platform is not
chosen to fix the last screen a converted visitor sees. **Formspree stays**, and the
plan-upgrade question stays an independent, deferrable decision.

### Analytics — none, and that is the decision

**This slot is empty on purpose. Do not read it as an oversight and install
something.** This table named "Plausible or Vercel Analytics" until Phase 9; both
were rejected, and so was Cloudflare's own Web Analytics.

The reasoning that ruled out Google Analytics — a cookie banner costs more than the
data is worth at this scale — turns out to rule out the alternatives too, one step
further on. Plausible and Cloudflare are both cookieless and need no banner, but
both are a client-side beacon on a site whose architecture is zero JavaScript
(section 2) and whose Lighthouse gate is ≥95 (SPEC section 6). Plausible also costs
€9/month against a site expecting a few hundred visits.

More to the point, **a pageview counter does not answer either question this
business actually has.** Three sources do, all free and none of them a script:

- **Google Search Console** — which queries the site ranks for, which is the entire
  point of SPEC section 3 item 6. It answers this better than any analytics tool.
- **The Google Business Profile dashboard** — local discovery, the other channel
  named in SPEC section 2.
- **The Formspree dashboard** — enquiries received, which *is* the success metric in
  SPEC section 6. Not a proxy for it.

Reversible in one line the day a real question arrives that these three cannot
answer. Until then the site sets no cookies, needs no consent UI, and can say so on
`/privaatsus` truthfully.

**A trap, in the same class as the Formspree dashboard settings in section 6:
Cloudflare can inject its Web Analytics beacon into a Pages project from the
dashboard, with no repository change and no build.** If anyone switches that on, the
no-analytics and no-cookies claims on `/privaatsus` become false silently, and
nothing in this repository can detect it. The warning is duplicated at the top of
`src/i18n/privacy.ts`, next to the copy it would falsify, because that is where
somebody will be standing when it matters.

This is the third of **four** settings that live in someone else's dashboard, change
what visitors get, and cannot be seen from this repository. The other three are
Formspree's reCAPTCHA and domain restriction in section 6, and Cloudflare's Managed
robots.txt in section 9. They are recorded next to the thing each would falsify
rather than gathered into a list, deliberately — a list is read once, and a warning
beside the copy is read by whoever is about to break it.

**Node 22.12 or newer.** Astro 7 requires it and will refuse to run below it. Declared in three places so it cannot drift: `.nvmrc` (`22`), the `engines.node` field in `package.json`, and the Node version configured on the deploy host. Package manager: npm.

No other runtime dependencies. Adding one requires explicit approval — see CLAUDE.md.

## 2. Rendering and output

`output: 'static'`. Every page is prerendered HTML at build time. No SSR, no serverless functions, no runtime environment beyond a CDN.

`compressHTML: true` is set explicitly. Astro 7 changed the default to `'jsx'`, which strips whitespace between elements — including the significant space in markup like `<a>x</a> <a>y</a>`. The behaviour we want is stated in the config, not inherited from a default that has already changed once.

**Client-side JavaScript is permitted only for three named exceptions, one of which is planned rather than built, and this list is closed the same way the dependency list is.** Anything not on it is a violation; anything on it must not be deleted as one.

1. **The mobile navigation toggle, and FAQ disclosure.** Both use native `<details>`, so **this exception has never actually been taken** — it costs zero bytes. It stays named because the toggle is where a future session would reach for a script first.
2. **The quote form's Formspree submit** — `QuoteForm.astro`, one `is:inline` script, 23 lines of code. **This was the only client JavaScript the site shipped until 3 August 2026**, when hero footage landed and exception 3 below started being emitted. It is still the only script on any page except the two home pages. Full contract in section 6; the reasoning is below.
3. **The hero video's viewport-entry playback — BUILT, 29 July 2026.** `Hero.astro`, one `is:inline` script, 22 lines. Approved on 27 July 2026 and named on this list before it existed, precisely so it arrived as a decision that was taken rather than as a script that turned up in a diff. The hero loads `preload="none"` and an `IntersectionObserver` starts playback when the hero enters the viewport, **pausing it when it leaves and resuming on re-entry** — browsers throttle timers off-screen but keep decoding video, so an observer that disconnected after first entry would leave a phone decoding for the rest of the session. Full contract in section 6; the budget and the acceptance gate stay in PLAN. **It is emitted only when the footage exists** — which it now does, so **as of 3 August 2026 the two home pages ship this script**, and the no-footage hero that shipped nothing is a state the repository can return to by deleting two files rather than the state it is in. Not a precedent for a fourth.

The language switch is a link to a real URL, not a JS toggle — this matters for indexing.

### The second exception, stated so it is not deleted on sight

**What it buys.** Formspree's `_next` redirect is a paid feature, so on the free tier a visitor who submits lands on Formspree's own English, Formspree-branded thanks page. That is the last screen a customer sees at the moment they have committed, and `/aitah` and `/en/thank-you` were built, correct and unreachable. Formspree accepts AJAX on the free tier — only the server-side redirect is gated — so the script POSTs with `fetch` and navigates to our own page, in the visitor's own language. It buys the final screen of the one journey SPEC section 1 says this site exists for.

**What it costs.** One inline script on `/kontakt` and `/en/contact` — no extra request, no package, and it is the only executable `<script>` in the built site (the other fifty are `application/ld+json`). Measured on the preview build, before and after: Lighthouse 100/100/100/100 on both form factors either way, total blocking time 0 ms either way, and **page weight 8 KiB → 9 KiB**. That kilobyte is the whole cost, and it is mostly the comments, which are not stripped because `is:inline` means Astro does not touch the script. The dependency list in section 1 is untouched: `@formspree/ajax` and `@formspree/react` are still rejected, and doing this in 23 lines without them is the argument against them made concrete.

**Why it is progressive enhancement rather than a dependency, which is the whole basis on which it was taken.** With JavaScript disabled there is no listener, nothing calls `preventDefault()`, and the browser performs exactly the native POST it performed before the script existed — landing on Formspree's page, which is precisely what happened before. **It degrades to yesterday's behaviour, not to broken, and the enquiry arrives either way.** Any failure of the enhanced path — `fetch` throwing, CORS refused, a non-ok response — falls back to `form.submit()` for the same reason. A form that stops working when a script fails would not have been permitted here whatever it bought.

### The third exception, as built

The hero video was originally specified inside that budget with no script at all: `<video>` with `autoplay muted loop playsinline`, and `<source media="...">` deciding per-viewport and per-motion-preference which file is fetched, if any. **What was permitted, and what was built, changes what starts playback and nothing else** — `preload="none"` plus a viewport-entry trigger. What did not change: `<source media="...">` still decides *what is fetched*, both reduced-motion guards in section 6 still stand, and a third-party video player is still a dependency decision rather than an implementation detail. **The rule underneath is unchanged too — a hero that needs JavaScript to decide what to *load* is a design that has gone wrong**; deferring when it *plays* is a different thing, and it is the only thing that was permitted.

**It passes the same test the quote form's exception passes, and that is the whole basis on which it was taken.** With JavaScript disabled there is no observer, nothing calls `play()`, `preload="none"` means the mp4 is never fetched, the `is-playing` class is never added, and the visitor keeps the poster. **Measured rather than argued**, on a build with the media present and scripts disabled: `readyState` 0 (`HAVE_NOTHING`) and `networkState` 1 (`IDLE`) — the video element requested no bytes at all — with the poster layer at full opacity, in both locales. It degrades to a *designed* state, not to a broken one, exactly as `BeforeAfter`'s empty state does.

**What could not be observed, and should be, once someone runs this on a normal machine.** Actual decode and playback were never seen: the automated browser reported `document.visibilityState === 'hidden'` throughout, and Chrome will neither load media nor deliver `IntersectionObserver` callbacks to a page it is not rendering. What *was* confirmed is that the observer fires and calls `play()` — `paused` went false with nothing calling it by hand — and that the poster-fade rule works when `is-playing` is applied. **Pause-on-exit was not observed and is inferred from the code.** Same class of gap as Phase 6's "works with JavaScript disabled", which was strong-but-by-proxy for a while: write it up as inferred until somebody watches it.

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
- **Slugs are localised, not shared.** An Estonian searcher must land on an Estonian URL containing an Estonian keyword.

**Where the mapping lives, and it is two places, not one.** This document said until Phase 4 that `src/i18n/routes.ts` was the single source of truth for cross-language links and hreflang. That is true only of *static* pages, and stating it unqualified was wrong, because a page whose slug comes from a content collection cannot have that slug in `routes.ts` as well — the slug is frontmatter, validated by the schema, and duplicating it in a route map would create two places to change one URL.

So:

| Page | Slug lives in | Alternates come from |
|---|---|---|
| Static (`/hinnakiri`, `/meist`, …) | `src/i18n/routes.ts` | `alternates(routeKey)` in `i18n/utils.ts` |
| Content-derived (`/teenused/katusepesu`, later a location or a post) | the entry's frontmatter | `localisedAlternates()` in `i18n/collections.ts`, passed to `BaseLayout` as the `alternates` prop |

`routes.ts` still owns the **section** a content-derived page sits in — the first segment of its URL, its breadcrumb parent and its navigation highlight all come from the route key. What it does not own is the last segment.

Pairing across locales therefore needs a key the entries share. For `services` that key is `icon`, which is an alias of `ServiceKey` and 1:1 with the service; `servicePairs()` in `i18n/services.ts` asserts that every key resolves to exactly one entry per locale, which is what makes the pairing safe rather than merely likely. `locations` and `posts` will each need to answer the same question when they arrive.

### Why the inspection pillar was cheap, and it is this distinction

**Added 8 August 2026, and worth writing down because the next new page is a
choice between these two shapes rather than an obvious default.** The inspection
line is a **static page**, so it took the top row of the table above and
absolutely nothing else:

- Two values in `routes.ts` — `inspection: { et: '/inspektsioon', en: '/en/inspection' }`.
- `BaseLayout` derives the whole `hreflang` set from `alternates('inspection')`
  with **no `alternates` prop passed**, because the route key already knows both
  slugs.
- `astro.config.mjs` lifts that set back out of the built `<head>` for the
  sitemap, so both pages arrived in `sitemap-0.xml` with correct
  `<xhtml:link>` alternates **before anything was written about them** — 26 URLs
  to 28, 78 `xhtml:link` to 84, and check 6 green on the first build.
- The language switch retargets itself from the same array, so it cannot
  disagree with the hreflang.

**A collection page would have been the bottom row and a materially larger
job:** a schema entry, a locale-paired key with an assertion behind it like
`servicePairs()`, a `getStaticPaths`, a `localisedAlternates()` call, and an
`alternates` prop threaded to `BaseLayout` on every page in the section.
`services` needs all of that because it has ten leaves whose slugs are content;
**a section with exactly one page in it needs none of it, and modelling it as a
collection would buy an editing workflow nobody asked for at the cost of the
pairing being derived rather than declared.**

**So: one page per locale, static. Several pages whose slugs are authored as
content, a collection.** The line is the number of leaves, not the importance of
the section — the inspection page is a pillar of the business and is still one
static file per locale.

*One consequence, recorded because it is a first for this repository:* the
industrial service markdown files now contain **a typed internal link** —
`](/inspektsioon)` and `](/en/inspection)` — where every other internal link on
the site is built by `path()` from the route map. Markdown cannot import, so
there is no way to route it through `path()` short of a hast plugin, which is a
large mechanism for two links. **What makes it acceptable is that
`scripts/check-html.mjs` check 1 fails the build on a broken internal link**, so
if either slug ever moves, the link cannot rot silently — the same bargain as
`astro.config.mjs`'s domain copy, which check 6 guards. If a third such link ever
appears, revisit it as a mechanism rather than adding a fourth.
- UI strings live in `src/i18n/ui.ts` as a typed object keyed by locale. A missing key is a type error.
- Page content lives in content collections, one file per locale.

`routing.redirectToDefaultLocale` is deliberately not set. Since Astro 6 it may only be used when `prefixDefaultLocale` is `true`, which is not our routing shape.

**Russian readiness:** adding `'ru'` to the locales array, a `ru` key to `ui.ts`, a `ru` column to `routes.ts`, and `ru/` content files is the entire job. No structural change. This is the reason for localised slugs and a route map rather than shared slugs.

## 4. File tree

The root is written `<repo root>/` rather than named. Nothing that names the root
reaches the build, so a neutral label costs nothing — and it keeps a copy of a
name out of a diagram that does not need one.

```
<repo root>/
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
├── reference/
│   └── icons/                      # SVG sources for the rasters below; not served
├── public/
│   ├── favicon.svg
│   ├── favicon-32.png
│   ├── apple-touch-icon.png        # 180×180, full bleed — iOS masks it itself
│   ├── robots.txt
│   ├── video/                      # hero.mp4. NOT processed by Astro — see below.
│   │                               #   check 7 enforces the 1.5 MB cap on this path
│   └── images/
│       └── og/                     # default.png — one image, no text. See section 7
└── src/
    ├── assets/                     # hero-poster.jpg — PROCESSED by Astro. See below.
    ├── content.config.ts           # zod schemas for every collection
    ├── config/
    │   ├── site.ts                 # SINGLE SOURCE: phone, email, prices, company details, service area
    │   └── formspree.ts            # the form endpoint; the only place `formspree.io` is typed
    ├── i18n/
    │   ├── ui.ts                   # UI strings per locale
    │   ├── routes.ts               # static route map, built routes, nav order
    │   ├── utils.ts                # getLocale, t(), path(), formatPrice, priceLine, vatNote
    │   ├── collections.ts          # locale guard + alternates for localised collections
    │   ├── services.ts             # services: cross-locale pairing and its assertion
    │   ├── home.ts                 # home page copy — lists, not UI strings
    │   ├── pricing.ts              # pricing page copy; contains no figure at all
    │   ├── faq.ts                  # the FAQ, its id space, and the token resolver
    │   ├── about.ts                # credentials page copy; the one place SORA/SAIL II render
    │   ├── inspection.ts           # inspection page copy. SPEC section 11 binds every string
    │   │                           #   in it; the prohibitions are repeated at the top of the file
    │   ├── contact.ts              # contact + form copy, the GDPR notice, which fields are required
    │   └── privacy.ts              # the privacy policy; retention as a criterion, not a number
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
    │   ├── PathChooser.astro       # the two pillars, directly under the hero on both home pages
    │   ├── TrustBar.astro
    │   ├── ServiceCard.astro
    │   ├── ServiceGrid.astro       # the card list + its flex layout, in one place
    │   ├── PriceTable.astro        # prices from site.ts; never takes an amount
    │   ├── PricingDetails.astro    # /hinnakiri below the table, so the twins cannot drift
    │   ├── CompareTable.astro      # drone vs scaffolding
    │   ├── BeforeAfter.astro       # renders a job's photo pair, or an explicit empty state
    │   ├── FaqList.astro           # the <details> list; used by Faq and FaqGroups
    │   ├── Faq.astro               # the home page's three-question excerpt
    │   ├── FaqGroups.astro         # the whole FAQ in its three groups, for /kkk
    │   ├── Credentials.astro       # /meist body: what we hold, who holds it, identifiers
    │   ├── QuoteForm.astro
    │   └── Cta.astro
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
        ├── inspektsioon.astro                 # the inspection pillar. Static, not a collection
        ├── meist.astro
        ├── kkk.astro
        ├── kontakt.astro
        ├── privaatsus.astro
        ├── aitah.astro                        # Formspree `_next` target; noindex, not in sitemap
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
            ├── inspection.astro
            ├── about.astro
            ├── faq.astro
            ├── contact.astro
            ├── privacy.astro
            ├── thank-you.astro
            ├── services/{index,[slug]}.astro
            ├── areas/[slug].astro
            └── blog/{index,[slug]}.astro
```

**The hero's two assets live in two directories, and that is deliberate rather
than an inconsistency to tidy up.** Anyone swapping in real footage — or looking
for the poster in three weeks — needs this in one sentence:

| asset | lives in | because |
|---|---|---|
| `hero-poster.jpg` | `src/assets/` | Astro **processes** it. That is what produces the AVIF/WebP `srcset` at four widths, the intrinsic `width`/`height` that stops any layout shift, and a build error if it goes missing. Nothing in `public/` can be processed — this is the same reason `jobs`' photos live in `src/`. |
| `hero.mp4` | `public/video/` | Astro does **not** process video, so `src/` would buy nothing — and `scripts/check-html.mjs` check 7 enforces the 1.5 MB cap against this exact path. |

Swapping in real footage is dropping both files at those two paths. No code
change, the same contract `BeforeAfter` has. The poster's extension is not fixed:
`Hero.astro` globs `hero-poster.{jpg,jpeg,png,webp,avif}`, so the operator can
drop whatever the camera produced.

**`Seo.astro` was removed from this tree in Phase 5, and it is not coming.** It
was listed here from the start and never built, because `BaseLayout` owns the
`<head>` — the title and its brand suffix, the canonical, the hreflang set, Open
Graph and every JSON-LD block. A component that also emitted head tags would be
a second place for a page to describe itself, which is precisely the failure the
`alternates` and `jsonLd` props exist to prevent. See the `BaseLayout` contract
in section 6.

## 5. Data model

### `src/config/site.ts` — the single source of truth

```ts
export const site = {
  brand: 'Lendav Hollandlane',        // same string as brandText; the split is retired
  brandText: 'Lendav Hollandlane',
  legalName: 'AIF OÜ',                // the LEGAL name; the brand above is a trading name
  operator: 'Johan van Erkel',        // sole operator; holds the remote pilot competency
  regCode: '16654436',
  vatNumber: 'EE102744992',
  phone: '+372 5400 4610',
  phoneHref: 'tel:+37254004610',
  email: 'info@lendavhollandlane.ee', // receives mail; tested 26 July 2026
  domain: 'https://lendavhollandlane.ee',
  vatRate: 0.24,
  prices: {
    roofFrom: 3.0,                    // EUR per m², EXCLUDING VAT
    facadeFrom: 3.0,
    minimumJob: 450,
  },
  season: { fromMonth: 4, toMonth: 10 },   // April–October
  credentials: {
    authority: 'Transpordiamet',
    authorisationEt: 'Erikategooria käitamisluba (SORA, SAIL II)',
    authorisationEn: 'Specific-category operational authorisation (SORA, SAIL II)',
    insuranceRef: 'Määrus (EÜ) 785/2004',
    insuranceRefEn: 'Regulation (EC) 785/2004',
  },
  serviceArea: { baseEt: 'Tallinn ja Harjumaa', baseEn: 'Tallinn and Harju county' },
} as const
```

This example is the shape of the real file, not an abbreviation of it. It had
drifted on four counts — the legal name, `season`'s key names, the locale-split
`credentials` fields, and the missing `brandText` and `serviceArea` — and a code
example that disagrees with the code is the failure class that has already cost
this project three sessions. Keep it in step or delete it; do not let it rot.

Nothing else in the codebase hardcodes a phone number, an email address or a price. A grep for `+372` outside this file is a bug.

**The brand name is on the same footing**, and the rule paid for itself on 26 July 2026: the business was renamed to `Lendav Hollandlane` by editing two lines here. `brand` and `brandText` now hold the same string — the wordmark/running-text split is retired, though both keys stay — and neither is written anywhere else in `src/` or `public/`. `legalName` is separate and unchanged, because the brand is a trading name of AIF OÜ. The ` | <brand>` suffix on a page title is composed in `BaseLayout` — see the contract in section 6 — so an authored `meta.*.title` or `seoTitle` carries only the page-specific part, and `seoTitle` fails the build if it contains a pipe. `grep -rni "Lendav Hollandlane" src/ public/ --exclude=site.ts` returning anything is a bug. See CLAUDE.md, "The brand name".

**`domain` is the one value on this list that is NOT single-sourced.** `astro.config.mjs` and `public/robots.txt` each hold their own copy, and neither can import this file today. Check 6 fails the build if the config's copy drifts from the canonical URLs built here; **nothing at all guards `robots.txt`**, whose `Sitemap:` line would point at a dead domain silently. Tracked as Phase 11 in PLAN. Note that the file is unguarded at the far end as well as at this one: Cloudflare can rewrite the `robots.txt` it serves without touching the copy in `public/` — section 9.

### Content collections (`src/content.config.ts`)

Schemas live at `src/content.config.ts`, not inside `src/content/`. Every collection declares a loader — `glob({ pattern, base })` — and the schema `z` is imported from `astro/zod`, not from `astro:content`. Both are Astro 6/7 requirements, not preferences.

**Markdown bodies render through Sätteri, and `rehypePlugins` is a trap.** Astro 7
replaced unified/remark/rehype with the Sätteri processor. `markdown.rehypePlugins`
and `markdown.remarkPlugins` still appear in the config types, but they are
deprecated shims that **throw at config validation** unless `@astrojs/markdown-remark`
is installed — and Astro 7 does not install it. The check is in
`astro/dist/core/config/validate.js`, in `coerceLegacyMarkdownPlugins`. An earlier
version of this document said rehype plugins merely needed that package added, which
was true of Astro 6 and is now stale in the direction that wastes a session.

The supported extension point is `markdown.processor: satteri({ hastPlugins, mdastPlugins, features })`.
`astro.config.mjs` uses it for exactly one plugin, `lendav-hollandlane-strip-html-comments`,
which removes HTML comments from rendered markdown so the `<!-- unconfirmed: ... -->`
and `<!-- needs-native-review -->` markers required by CLAUDE.md stay in the repo
instead of shipping. Setting `processor` explicitly costs nothing: Astro appends its
own hast plugins — syntax highlighting, image marking, heading ids — around the
user's inside `createSatteriMarkdownProcessor`.

The plugin operates on the hast tree rather than on serialized HTML, and that is
load-bearing rather than incidental. A fenced code block is a `<pre>` of escaped text
nodes, never a comment node, so a post that *displays* HTML source is unreachable
from the plugin. A regex over `dist/` could not draw that line, which is why the
post-build alternative was rejected — Phase 8 is blog infrastructure and the planned
posts are technical.

Every schema is a `z.strictObject`, not a `z.object`. `z.object` strips an unknown
key silently, so a misspelled optional field would validate and the page would
render wrong; `strictObject` raises `unrecognized_keys` and fails the build. This
is what "a bad frontmatter key must fail the build" requires. Astro 7 ships Zod 4,
where `strictObject` is the current spelling of this.

**`services`** — one markdown file per service per locale.
`title, slug, locale, summary, priceKind, priceNote?, order, icon, seoTitle, seoDescription, faqRefs[]`

`priceKind` is a REFERENCE — one of `roof | facade | quote | addon` — that
`ServiceCard` and `PriceTable` resolve against `site.prices`. It is deliberately
not a `priceFrom` amount: a euro figure typed into a markdown file breaks the
single-source rule in CLAUDE.md, which overrides this document. `priceNote` is
prose and never a figure.

`faqRefs` is still not a `reference()`, because there is no `faq` collection —
the FAQ is UI copy in two locales, not a set of files. **It stopped being a
plain string array in Phase 5**, which built the id space it was waiting for:
`faqIds` in `src/i18n/faq.ts` is a closed tuple, `content.config.ts` builds
`z.enum(faqIds)` from it, and a service file naming a question that does not
exist now fails the build instead of referencing nothing. Every service file has
it `[]` today.

**Where the VAT rate lives.** `site.vatRate`, and the ex-VAT note interpolates
it through `vatNote()` in `i18n/utils.ts`. Until Phase 5 the note typed "24%"
into `ui.ts` while `site.vatRate` sat unread, which is worse than not having the
field: a later session reads the config, assumes it is the source, changes it,
and nothing moves. The rate is formatted by `Intl`, so the symbol is not typed
either.

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

- **`BaseLayout`** — props `{ title, description, locale, routeKey, brandSuffix?, ogImage?, headerVariant?, noindex?, alternates?, jsonLd? }`. Emits `<html lang>`, canonical, the full `hreflang` set, the icon and `theme-color` tags, Open Graph and Twitter card, and `LocalBusiness` JSON-LD built from `site.ts`. **`ogImage` now has a default** — the one sitewide image, section 7 — so a page that passes nothing still emits a card; no page overrides it today. `theme-color` is resolved from `tokens.css` rather than typed, and throws if the token is gone. Every page goes through it. **It also owns the `<title>` brand suffix**: `title` is the page-specific part only, and ` | ${site.brandText}` is composed here, in the one expression every page title passes through — `PageLayout` forwards and composes nothing. `<title>` and `og:title` are both built from that string so they cannot drift apart. `brandSuffix={false}` suppresses the suffix for a page whose title already carries the brand; it does not license authoring the name, which still comes from `site.brandText`. No page sets it today. **No page writes its own `<head>`** — which is why the two Phase 4 additions are props and not a head slot. `alternates` overrides the `routeKey`-derived hreflang set for a page whose slug is localised per locale, and also retargets the language switch, so the two can never disagree; see section 3. `jsonLd` takes structured data as *data* and serialises it here, in the one file that escapes `<` before writing it into a `<script>` body — a page assembling its own JSON-LD string is the failure `scripts/check-html.mjs` exists to catch.
- **`BeforeAfter`** — props `{ jobId?, locale }`. Renders the photo pair when the job exists and `published` is true. When no jobs exist it renders an explicit, styled empty state that says photos are added after real work. It must never render a placeholder that could be mistaken for a real result. `locale` is required because both the empty state and the images' alt text are localised. `jobId` is optional: a caller that selects "the newest published job" has nothing to pass until a job exists, and must not invent an id that resolves to nothing. Both home pages use it that way, so the evidence section on `/` fills itself the moment a job file lands. The empty state uses no heading element, so it cannot disturb the calling page's heading order, and it is sized to its own sentence rather than to the image pair it replaces — at full width an empty panel reads as a reserved slot, which is the impression CLAUDE.md rules out.
- **`Hero`** — props `{ locale, headline, sub }`. The home page hero specified in SPEC section 9. A type-led hero — headline, sub, and the price and credentials block — which **gains a scrimmed background video** when the footage exists, and renders exactly as it always did when it does not. The no-footage state is the default path and the launch state. Full contract below.
- **`PathChooser`** — props `{ locale }`. **Added 8 August 2026 with the second pillar.** The fork directly under the hero on both home pages: two cards, side by side from 760px and stacked below it, sending a visitor to cleaning (`path('services')` — the existing services index) or to inspection (`path('inspection')`). It takes **only `locale`**, like `TrustBar`, `Cta` and `CompareTable`; every string comes from `homeCopy[locale].paths` and **neither card knows its own address** — both hrefs are resolved through `path()` from a `ROUTE_KEYS` tuple typed `readonly RouteKey[]`, so a key that is not a real route fails to compile. **The copy is keyed by route key rather than held in an array**, which is what stops a copy edit reordering the cards and silently swapping the two destinations. **The link is the title, not the card**, with an `::after` overlay extending the hit area — the same construction and the same reasoning as `ServiceCard`, so the accessible name is the pillar's title rather than the title, the body and the call to action run together; the visible cta line is consequently `aria-hidden`. **Zero client JavaScript**: it is two links in a list, not a tab strip, a toggle or a carousel, and it must not become one — the list in section 2 is closed. **No new colour values**: it borrows `.card` and the existing `--pill-fill`/`--pill-line` chip pair, and the two cards are deliberately *not* differentiated by accent, because they are equals and accenting one makes the other read as secondary. **The inspection card's body copy is bound by SPEC section 11** like everything else about that pillar, and it is the string most likely to be quietly improved into a claim, because it is short and it is selling.
- **`QuoteForm`** — props `{ locale, defaultService? }`. A native `<form action method="POST">` posting straight to Formspree. **That native POST is the baseline, and it is the requirement rather than an optimisation: it works with JavaScript disabled, and it is what runs when the enhancement does not.** On top of it sits one `is:inline` script — the second named exception in section 2, and the only client JavaScript on the site — which intercepts the submit, POSTs by `fetch` with `Accept: application/json`, and navigates to our own thank-you page, because Formspree's `_next` redirect is a paid feature. **It reads the redirect target out of the rendered `_next` field rather than from a second copy of the expression that built it**, so the two mechanisms cannot disagree, and it navigates by same-origin path so a preview build stays on the preview build. Any failure — `fetch` throwing, CORS refused, a non-ok response — logs and calls `form.submit()`, so the browser posts natively; none of those failure modes leaves a submission on Formspree, so the re-post cannot duplicate an enquiry. *(This bullet said "**Zero client JavaScript** … because there is no script to disable" until 26 July 2026. There is now a script to disable, and disabling it returns the form to the native POST rather than breaking it — which is the honest version of the same guarantee.)* `@formspree/ajax` and `@formspree/react` are still rejected — they are dependencies, the list in section 1 is closed, and the AJAX path needs neither. Native HTML validation only: `required`, `type="email"`, `inputmode`, `autocomplete`, no scripted checks and no `novalidate`. **Required: name, email, address. Optional: phone, area, message** — the reasoning is in `src/i18n/contact.ts` and is deliberate; a required area field a homeowner cannot answer is a field they abandon. The service options come from `servicesFor()`, never from a list in the component, so they cannot drift from the service pages — **with exactly one named exception, added 8 August 2026, which is an exception to that rule rather than the end of it.** Inspection is not an entry in the `services` collection and **must not become one**: a seventh `serviceKey` would put it into the services grid, the price table and `/teenused`, all of which describe cleaning work with a published per-m² price. But a visitor arriving from `/inspektsioon` has to be able to say what they want, and a select offering only cleaning would make them either describe it in the message field or pick a wrong answer. So one `<option>` is appended after the collection-derived six, from `inspectionServiceOption` in `i18n/inspection.ts` — **still not typed in the component**, and kept beside the page that justifies it so it leaves with that page if the page ever does. It is rendered last and is never preselected: `defaultService` compares against a collection slug, and inventing one for this option would put a fake id into a collection-shaped comparison. **A second such option is not licensed by this one.** Spam is Formspree's `_gotcha` honeypot only — no CAPTCHA, no third-party script — hidden from sight, from the tab order and from assistive tech. `_next` must be an **absolute** URL, built from `site.domain` and the route map.

  **The endpoint comes from `src/config/formspree.ts`, which imports the id from `astro:env/client` — not from `import.meta.env`.** That is the difference between a guard and a comment. `import.meta.env` is inlined at build time in a static build, so an unset variable becomes `undefined`, the form posts nowhere, and `npm run verify` passes: the page builds and every link resolves. `astro.config.mjs` declares `PUBLIC_FORMSPREE_ID` required in `env.schema`, and Astro coerces an empty string to missing before validating, so **both a missing and an empty value fail `astro build`**. `scripts/check-html.mjs` check 5 is the second, independent guard, asserting on the built output. Do not simplify the import back.

  **Two Formspree settings live in their dashboard, outside this repository, and both break a native no-JavaScript POST if enabled: reCAPTCHA, and domain restriction.** reCAPTCHA injects a client-side challenge this form cannot complete; domain restriction rejects submissions whose `Referer` does not match a configured host, which includes `localhost` and any preview deploy. A session debugging a submission that vanishes, 403s, or bounces should check the dashboard before reading a line of code — nothing in this repo can express or detect either setting. These are two of the **four** external-dashboard hazards; the other two are Cloudflare's Web Analytics beacon (section 1) and its Managed robots.txt (section 9).

  **Verify your observation channel before drawing a conclusion from silence. An empty search result is evidence only if you have confirmed you are searching the right place.** The Gmail connector available to a session in this repository is authorised on `johanvanerkel@gmail.com`. **Enquiries do not go there.** They go to `info@lendavhollandlane.ee`, which Cloudflare Email Routing forwards to `jovanerkel@gmail.com` — a different mailbox, three letters apart in the local part. So a session that searches Gmail for Formspree notifications and finds nothing has learned nothing about delivery. Phase 6's test submissions were visible only because Formspree delivered to the connector's own address at the time; the recipient changed afterwards and the instrument did not. This cost a session on 26 July 2026, which concluded from an empty search that six accepted submissions had been silently dropped, and wrote it into both documents as a hazard — every one of the six had in fact arrived. It is the same class of trap as the stale preview server in section 8: about the instruments, not about the code, and invisible precisely because the wrong reading looks like a finding. **Those two personal addresses are named because the note is useless without them, and this repository is private — which is a reason to keep it private.** Two personal mailboxes in a document are unremarkable in a private repo and a small leak in a public one. If this repository is ever opened up — as a portfolio piece, an example, anything — **this paragraph is one of the first things to redact.**

  **`_next` is a paid feature and is still ignored by Formspree.** Measured in Phase 6, not assumed: two identical POSTs were each accepted with a 302 to `https://formspree.io/thanks`, never to the `_next` value. Formspree documents the custom "Thank You" redirect as *"Available on: Personal, Professional, Business plans"*, and this account is on the free tier. Everything else on the free tier works — the submission arrives, all seven fields map, `_subject` is honoured, **and AJAX submission works, which is what the enhancement above rests on.**

  **What changed on 26 July 2026 is who performs the redirect, not whether Formspree will.** The page now reads `_next` and navigates itself, so **`/aitah` and `/en/thank-you` are reached by every visitor who has JavaScript** — they are the ordinary destination, not dead pages. A visitor without JavaScript still lands on Formspree's page, exactly as everyone did before. The field stays because it costs nothing and starts working server-side the day the plan is upgraded, at which point the no-JS visitor gets our page too. That upgrade is therefore no longer the difference between our thank-you page and Formspree's; it is the difference for the no-JS minority only, which is a much smaller decision — see PLAN's blocked list. This is a third Formspree-side concern outside the repo, in the same class as the two above. **It is not one of the four external-dashboard hazards**, and the enumerations are different on purpose: those four are settings that silently change what a visitor gets. The plan tier is known, its effect was measured, and it is written down here. Note also that the dashboard's redirect setting is **one URL per form** and cannot vary by locale, whereas `_next` is per-submission — which is why this form sends each locale to its own page, why the dashboard setting is not an equivalent substitute, and why the script can be locale-correct without knowing its own locale.
- **`PriceTable`** — props `{ locale, entries }`, where `entries` are `services` collection entries. It reads prices from `site.ts` and **never takes a price**: each row's figure comes from resolving that entry's `priceKind` through `priceLine()`, and the minimum job comes from `site.prices.minimumJob`. Taking entries rather than rows is what stops the table disagreeing with the service page it links to. It **always renders the ex-VAT note**, and that is not a prop — CLAUDE.md requires every displayed price to be labelled excluding VAT, and a caller that could switch the label off would eventually be a caller that did. No total, no estimate, no calculator: SPEC section 4.
- **`Faq` / `FaqList` / `FaqGroups`** — `FaqList` is the `<details>` list and owns the disclosure markup; `Faq` is the home page's three-question excerpt around it; `FaqGroups` is the whole set in its three groups for `/kkk`. All three read `i18n/faq.ts` through `faqEntries()`, which resolves `{season}`, `{minimum}`, `{area}` and `{authority}` from `site.ts` — and because the FAQ page's `FAQPage` JSON-LD is built from the same resolved objects it renders, the structured data cannot drift from the visible answer.
- **`Credentials`** — props `{ locale }`. The body of `/meist`. Every fact is read from `site.ts` via `aboutSections()`: the operator, the legal name, the authority, the exact authorisation and insurance references, the area and the season. **The identifiers block prints the email address** alongside the registry and VAT numbers, restored on 26 July 2026 when the address was tested — this is the page a KÜ board comes to for documents, and a written route belongs beside them.

### `Hero` — the contract

Built 29 July 2026. This replaces the SUPERSEDED-PENDING contract that stood here from
27 July, which specified `autoplay` with no script and a media band above the price
block. Both are gone; what follows is what ships.

**The footage on the site today is not the operator's, and this is a dated, temporary
exception.** `public/video/hero.mp4` and `src/assets/hero-poster.jpg` contain
**manufacturer-supplied footage of a third party's building, used with the supplier's
written permission**, installed **3 August 2026** as a placeholder pending the operator's
first controlled flight. It is decorative hero background only — the media container is
`aria-hidden`, it carries no caption, no address, no date and no claim, and it appears in
no before/after pair. It is permitted by the scoped amendment to the no-stock-footage rule
in **SPEC section 9**, which is conditional and which **excludes before/after imagery in
all circumstances**: borrowed media may never fill `BeforeAfter`. **Removal trigger — it is
replaced the moment the operator has his own footage, and the swap is two file copies with
no code change.** Do not delete it as a rule violation before then, and do not leave it a
day after. PLAN's Phase 10 carries the same record.

**Structure.** One `<section>`. In the no-footage state it contains only the type: the
pills, the `h1`, the sub, the actions, and the price and credentials block. **When the
footage exists the section gains a background behind that type — not a band above it.**
Nothing sits between the type and the price block, and the block is not a separate
component boundary; the pairing is the point. The block reads its price from `site.ts` via
`PriceTable`'s rules (from-price, `alates` prefix, excluding VAT, labelled) and its
credentials from `site.credentials`. The Hero never takes a price, a phone number or a
credential as a prop.

*Background, not a band, is the one structural thing that changed.* PLAN's Phase 10 list
said "scrimmed background loop … background, not foreground" and that list governs. SPEC
section 9 said "media band" and **was corrected in the same commit** rather than left to
contradict this.

**The layers, bottom to top.** All of them are `position: absolute; inset: 0`, so they add
no height and nothing can shift when the page loads. `.hero` is `position: relative` with
`isolation: isolate`, which keeps them in their own stacking context and out of the
header's way — `Header.astro` is fixed at `z-index: 60`.

| z | layer | |
|---|---|---|
| 4 | `.hero__inner` | the type |
| 3 | `.hero::after` | the radial glow |
| 2 | `.hero__scrim` | `var(--hero-scrim)`, uniform |
| 1 | `.hero__poster` | `<Picture>`, faded out once playback starts |
| 0 | `.hero__video` | `<video>`, `object-fit: cover` |

**The glow and the video do not fight, and this is the decision.** `--hero-glow` is
unchanged in value and geometry; it simply moved off `.hero`'s `background` shorthand onto
`.hero::after` so it can paint *above* the scrim. Over `--bg` it lifts, which is its job
today. Over scrimmed footage `#14202e` is darker than most frames, so the identical layer
reads as a vignette. Same token, both times concentrating attention on the type. The
no-footage rendering is pixel-identical to the old shorthand — the same gradient over the
same base colour.

**Media, when footage exists.** Native `<video>`, no player library. No `controls`, no
`autoplay`, no sound, **no audio track in the file at all** — stripped at encode (`-an`),
not muted at playback. `muted` and `playsinline` are both load-bearing: `muted` is what
lets a scripted `play()` run without a user gesture, and without `playsinline` iOS takes
the video fullscreen. The media container is `aria-hidden`, because it is decoration —
every claim it makes visually is also made in text beneath it. A hero that only
communicates through video fails for a screen reader and fails with the video blocked.

**One encoding, `mp4`.** Only one file is ever fetched, so a second is repository weight
the browser never sees. If real footage cannot meet 1.5 MB as H.264 at acceptable quality,
a `webm` goes *ahead* of it with the same `media` attribute — a decision to take against a
real encode, not in advance.

**The poster is a `<picture>`, and the `poster` attribute is deliberately not used.** The
attribute takes a single URL and cannot carry a `srcset`, which would throw away the whole
responsive pipeline; using both would fetch two stills and show the wrong one. So the
poster is an Astro `<Picture>` — AVIF and WebP at 640/960/1280/1920, `sizes="100vw"`,
`alt=""`, `loading="eager"`, `fetchpriority="high"`, with the intrinsic `width` and
`height` that stop any layout shift. It sits *above* the video and fades out only when
playback actually starts, so there is never a frame in which an undecoded `<video>` paints
an empty box. **If playback never starts, for any reason, the poster simply stays** — and
that covers no JavaScript, reduced motion, a failed fetch and an unsupported codec with
one mechanism.

**Both reduced-motion guards, plus guard one in its script form.** Neither original guard
is dropped because another exists.

*Guard one — the fetch never happens.* `<source media="...">` gates whether any file is
selected at all. When nothing matches, `currentSrc` is empty, the browser fetches nothing,
and `play()` rejects:

```html
<video class="hero__video" muted loop playsinline preload="none">
  <source src="/video/hero.mp4" type="video/mp4"
          media="(prefers-reduced-motion: no-preference)">
</video>
```

**There is no width condition, and its absence is a decision rather than an omission.**
This gate read `(min-width: 48em) and …` in the old contract, which meant no phone ever saw
the hero video. Excluding mobile is a *product* decision dressed as a performance guard:
the poster is the LCP element and is already painted, and the video is `preload="none"`
fetched on viewport entry, so it never competes for LCP. Most of this site's traffic is
mobile — SPEC section 7 — so a hero video no mobile visitor ever sees defeats its purpose.
**If PageSpeed mobile on the deployed site drops below 90, re-add the width condition,
citing that number.** Decide it on a measurement, and do not reinstate it as a precaution.

Media queries on `<source>` are evaluated once at page load and never re-evaluated on
resize — correct for a landing page, and the reason no resize listener is needed.

*Guard one, in the script.* The observer checks `matchMedia('(prefers-reduced-motion: reduce)')`
and does not observe at all. This is not a third guard; it closes the hole guard one has
always had — a browser that ignores `media` on `<source>` would fetch and play anyway —
and with a scripted trigger it costs one line.

*Guard two — no motion is ever visible.* Independently of both, CSS removes the video:

```css
@media (prefers-reduced-motion: reduce) {
  .hero__video { display: none; }
}
```

The poster needs no rule of its own: it is already above the video and only fades on
`is-playing`, which cannot be added when the video is gone.

**Why all of them.** They fail differently. Guard one saves the bandwidth but depends on
`media` on `<source>` being honoured. Guard two cannot prevent a download, but it is plain
CSS that has worked for a decade and it guarantees the accessibility outcome regardless.
One protects the budget, the other protects the visitor.

**The old `TODO:` here asked whether `media` on `<source>` is honoured. Answered for
Chrome, 29 July 2026, by direct test rather than by reading release notes:** a `<source>`
whose query is false leaves `currentSrc` **empty** and fetches nothing, and a true one
resolves — tested with `(min-width: 99999px)`, `(min-width: 1px)`,
`(prefers-reduced-motion: reduce)` and `(prefers-reduced-motion: no-preference)`, which is
the specific case that was in doubt. **Still unverified on real iOS Safari and Android
Chrome**, and that remains worth doing on a real handset; if either ignores it the design
still holds, because guard two carries the accessibility outcome and only the bandwidth
saving is lost.

**Playback.** An `IntersectionObserver` at `threshold: 0.25` starts playback on entry and
**pauses on exit, resuming on re-entry**. The observer is deliberately *not* disconnected
after first entry: browsers throttle timers off-screen but keep decoding video, so
disconnecting would leave a phone decoding for the rest of the session for something nobody
is looking at. `play()`'s rejection is swallowed — that is the entire fallback path, since
a rejection means guard one left no source or the codec failed, and in both cases the
poster is already the right answer. The script is emitted **only when the footage exists**.

**The footage-state text remap, which is measured and is not styling.** The scrim alone
cannot make this hero accessible, and no alpha PLAN permits can. Against the worst case a
frame can present — pure white, the same bound `--glass-media` is derived against —
`--ink-3` reaches 2.26:1 and `--muted` 1.76:1, and at PLAN's 65% ceiling they are still
2.70:1 and 2.10:1. So under `.hero--media`:

| element | becomes | on a pure-white frame |
|---|---|---|
| pills | `--glass-media` + `--ink-on-glass` | 11.37:1 |
| lead, price line | `--ink` | 4.87:1 |
| `h1` | `--ink`, unchanged | 4.87:1 |
| both buttons' border | `--ink` | 4.87:1 (non-text, 1.4.11) |

**The requirement to preserve if these are ever re-tuned: every piece of hero text clears
4.5:1 against a pure-white frame, with no assumption about what the footage contains.**
The cost is that the hero carries its hierarchy through size and weight rather than colour
whenever the video is present — the same deviation recorded at the head of `tokens.css` for
Direction D's three dim greys, taken for the same reason. The scrim alpha has a hard floor
of **0.58**, below which even `--ink` fails; the derivation is beside `--hero-scrim`.

**The fallback chain.** Three states, all implemented:

1. **Video** — the poster paints immediately and is the LCP element; the video fades in over it once it is actually playing.
2. **Poster only** — the still that matches whatever clip is installed. Served to reduced-motion visitors, to anyone without JavaScript, and to anyone whose video fails. *(This said "a real still from our own footage", which is the intended end state and is not true of the placeholder above.)*
3. **No footage at all** — no video, no poster, no scrim, no reserved band. A designed, image-free hero carried by type and the tokens. Not a grey box, not a blurred gradient standing in for a photograph, not the words "video coming soon".

**State 3 is the default path**, and it is enforced by construction rather than by
discipline: the media layers render only when the assets are actually present, so a
repository with no footage in it emits the type-led hero and nothing else. It must look
finished, because it is the state every preview build and every review renders in until the
first flight lands its footage, and it is what launch falls back to if that footage slips
or turns out unusable.

*(Corrected in Phase 6. This line said "it is what the site launches with and may be what it runs on for months", which was true only under the old ordering, where launch preceded the content drop. SPEC section 9 was corrected first; this was the last copy of the old launch order in the documents. The design decision is unchanged — state 3 is still the default path.)*

**What state 3 must not become.** It must not acquire an illustration of a drone we do not own, a grey box, or the words "video coming soon". SPEC section 4 and CLAUDE.md apply to the hero identically. The marker for missing footage lives in the repo, not rendered onto the production home page — the visitor sees a complete image-free hero, and the marker exists so a future session does not mistake the empty state for a finished one.

*This sentence read "a stock image, a stock video … or a photograph of someone else's roof" until 3 August 2026, and the site now ships exactly that.* **The prohibition is not repealed, it is scoped** — SPEC section 9's amendment permits third-party footage as decorative hero background under four conditions that must hold together, and the placeholder above meets them. Everything the sentence forbade that is *not* covered by those four conditions is still forbidden, and **before/after imagery is excluded from the exception in all circumstances**. Read the amendment before concluding either that the placeholder is a violation or that the rule has gone.

**Budget.** The poster is the LCP element and is the only hero asset counted against the
500 KB first-load budget in SPEC section 6. The video is capped at **1.5 MB** for
**8–16 seconds**. **SPEC section 9 and PLAN Phase 10 now carry the same two numbers**, and
where they ever differ again the tighter one governs — a ceiling is not a licence to spend
up to it. The cap is measured as the single file the browser actually fetches.
`scripts/check-html.mjs` **check 7 enforces it mechanically** — section 8. Footage that
cannot meet it is re-cut or re-encoded, not exempted.

*Two corrections, 3 August 2026.* This read "8–12 seconds at 1080p — PLAN's number, tighter
than SPEC section 9's 2 MB and 12 seconds on both counts". **The 2 MB half was already
wrong**: SPEC's ceiling became 1.5 MB on 29 July and this sentence was not updated with it,
so it described a gap that had closed. The seconds half is now 8–16 in both documents —
widened on the first real cut, reasoning in SPEC section 9. **"At 1080p" is dropped rather
than restated**: the clip installed today is 1280×720, so keeping it would assert a
requirement the repository does not meet. Resolution is a quality judgement about the
shot; the byte cap is the constraint, and it is the only one check 7 can enforce.

**Mobile is no longer zero bytes of video, and SPEC sections 6 and 9 were corrected to
match.** Both said the 500 KB budget was satisfied because no phone fetched any video. That
stopped being true when the width condition came off guard one. The video is still outside
the first-load critical path — `preload="none"`, fetched on viewport entry, after the
poster has painted — but it is no longer zero, and the honest arbiter is now PageSpeed
mobile on the deployed site rather than an argument. **PLAN's acceptance gate is unchanged
and is the thing that decides this: below 90, revert.**

**Hosting.** Self-hosted in `public/video/`, served as a static asset by the same CDN as the rest of the site. No video CDN, no HLS, no player library — see SPEC section 9 for the reasoning. This is a closed decision; adding a video host is a dependency change and needs approval like any other. The poster is the exception to the directory, and section 4 says why.

## 7. SEO

- One `<h1>` per page, containing the target Estonian keyword naturally.
- `hreflang` alternates on every page, plus `x-default` pointing at Estonian.
- Canonical URLs absolute, from `site.domain`.
- `LocalBusiness` JSON-LD sitewide; `Service` JSON-LD on service pages; `FAQPage` JSON-LD on the FAQ page only.
- Sitemap generated at build; `robots.txt` in `public/`. Link to it as `/sitemap-index.xml` — since Astro 6, endpoints with a file extension are only reachable without a trailing slash. **What `public/robots.txt` says and what the edge serves are two different questions** — Cloudflare's Managed robots.txt overrode this file until 27 July 2026 and would again if switched back on. Section 9.
- Images: Astro's `<Image>`, WebP, explicit width and height, `loading="lazy"` below the fold. Alt text is required — a missing alt fails the build check.
- `BreadcrumbList` JSON-LD on any page that renders a visible breadcrumb, built by `PageLayout` from the same `trail` array the breadcrumb renders. It is **not** emitted on pages whose breadcrumb is not shown: structured data describing a trail the reader cannot see is the mismatch Google's guidance warns about, and every other piece of structured data on this site is backed by something visible.

### The sitemap's hreflang, and why it is not the integration's

`@astrojs/sitemap`'s `i18n` option pairs URLs by **stripping the locale prefix and
matching the rest of the path**. Our slugs are localised and never shared, so it
paired nothing: `/` and `/en` had alternates, and **the other twenty pages had none
at all**, silently, from Phase 0 to Phase 9.

The option is dropped. `astro.config.mjs` now builds the alternate sets in
`serialize` by reading each page's own `<head>` back out of the built HTML, so the
sitemap and the page are the same bytes and cannot drift. The reasoning, and the
three facts about Astro's and the integration's internals that make it safe, are
written at the top of that file. `scripts/check-html.mjs` check 6 asserts on the
finished XML that it worked — see section 8.

PLAN proposed rebuilding the sets at config time from `i18n/collections.ts` instead.
That is not possible: the service slugs live in collection frontmatter and reach
code only through `astro:content`, which does not exist while the config is being
evaluated. Recorded here and in the config so it is not attempted again.

### Open Graph, favicon and touch icons

**One OG image for the whole site, and it carries no text.** PLAN asked for one per
page type; that collapsed to one deliberately. There is no photography — SPEC
section 4 and CLAUDE.md forbid stock and Phase 10 has not happened — so per-type
variants would differ only by a word, and a baked word is the problem: a wordmark
or a price rendered into a PNG is a copy of an unsettled `site.ts` value that no
grep can reach. `og:title` and `og:description` already carry the words from the
single source, and every social card renders them beside the image. **Phase 10's
real before/after photography is the trigger for revisiting this**, not a spare
afternoon.

`BaseLayout` owns the tags, as it owns the rest of the head: `og:image` with its
width, height and alt, `og:site_name` and `og:locale`/`og:locale:alternate` from
`site.brandText` and `bcp47()`, and `twitter:card=summary_large_image`.

**`theme-color` reads `--bg` out of `tokens.css` at build time** via Vite's `?raw`,
and throws if the token cannot be found. This tag was held back until Phase 9 on the
grounds that it would mean typing a token hex outside `tokens.css`; resolving it is
the answer to that objection rather than a way around it. **No web manifest** — it
would exist only to hold a second copy of two hexes, and nobody adds a cleaning
company to a home screen.

**The known, unreachable copies of token hexes.** A raster cannot read a CSS custom
property, so these files bake `--bg` (`#07090D`) and `--accent` (`#22D3EE`), and
`og-default.svg` also bakes `--hero-glow`. **When a token changes, these change by
hand:**

| File | Holds |
|---|---|
| `public/favicon.svg` | bg, accent |
| `reference/icons/apple-touch-icon.svg` | bg, accent |
| `reference/icons/og-default.svg` | bg, hero glow, accent |
| `public/favicon-32.png`, `public/apple-touch-icon.png`, `public/images/og/default.png` | rebuilt from the SVGs above |

The mark is the droplet that was already in `public/favicon.svg`; nothing was
invented for it, and it is not wordmark-derived, so the business name does not
reach any of these.

**That sentence was false until the rename, and this is how.** `public/favicon.svg`
carried `role="img"` with the old business name in its `aria-label` — the mark was
not wordmark-derived, but
the file still held a copy of the name, and it sat outside the `src/`-only brand
guard where no session could see it. The `aria-label` and its `role` were removed
rather than translated: the SVG is referenced only from `<link rel="icon">`, where an
accessible name is never surfaced, so nothing is lost, and leaving the name in would
have made the guard fire on its own file. The guard in CLAUDE.md now covers `public/`.

**Rasterise with Chrome, not with ImageMagick alone** — IM's
built-in SVG renderer ignored the radial gradient and faceted the curves. The exact
commands are in the header comment of each SVG source.

## 8. Verification gates

```jsonc
// package.json scripts
"dev":     "astro dev",
"build":   "astro build",
"preview": "astro preview",
"check":   "astro check",
"links":   "node scripts/check-html.mjs",   // links, JSON-LD, headings, meta, no comments, forms, sitemap, video size
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

### Why `check-html` fails on any HTML comment

Check 4 in `scripts/check-html.mjs`. Every `<!-- unconfirmed: ... -->` and
`<!-- needs-native-review -->` marker written into a markdown content file in Phase 4
was in production: **37 comments across 10 service pages**, internal English
engineering notes citing PLAN by phase number, sitting on Estonian customer pages.
The convention in CLAUDE.md says the marker lives in the repo and never on the page;
nothing was enforcing the second half. `meist.astro` was unaffected only by luck —
its markers are JS comments in frontmatter, which the compiler discards.

The guard is on **the whole class, not on the words in use today**. A grep for
`unconfirmed` would have caught this leak and missed the next convention word, which
is the same failure repeated. Any HTML comment in any built page fails the build.

Two deliberate details:

- **`<pre>` and `<code>` are exempt.** A post that displays HTML source must not fail
  the build for the markup it is teaching. Phase 8 is blog infrastructure and the
  planned posts are technical, so this is a real case. Those regions are masked with
  equal-length filler before scanning, so everything outside them still fails and the
  reported offsets stay true.
- **Astro preserves `<!-- -->` in `.astro` templates and strips `{/* */}`.** A comment
  in a template is therefore a build failure now. Use `{/* */}` or a frontmatter
  comment. Three templates already do; none used the HTML form.

### Why `check-html` fails on a form that posts nowhere

Check 5, added in Phase 6 with the quote form. Every `<form>` in the built output must
have an `action` that is an absolute `https` URL and a `method` of `POST`, and any
`_next` hidden field must be an absolute URL.

`import.meta.env` is inlined at build time in a static build. A deploy host with no
`PUBLIC_FORMSPREE_ID` set therefore emits a contact page whose form action is empty or
contains the literal `undefined` — **and `npm run verify` passes**, because the page
builds, the JSON-LD parses and every internal link resolves. The result is a contact
page that looks correct and silently discards every enquiry, which for a site whose one
job is to produce a written enquiry is the worst failure available. It is invisible
until somebody asks why nobody is calling.

`astro.config.mjs` declares the variable required in `env.schema` and that fails the
build first — verified against Astro 7.1.3's own source, which coerces `''` to
`undefined` before validating, so an empty value fails exactly as an absent one does.
**Check 5 is not redundant with it.** It asserts on the built artefact rather than on
the config, so it still fires if a future session deletes the schema entry, changes form
provider, or breaks the action some other way. Same reasoning as check 4: guard the
class — a form that posts nowhere — not the name of one environment variable.

All three failure modes were confirmed to fail the gate, not assumed: an empty action,
an action containing `undefined`, and a relative `_next`.

### Why `check-html` compares the sitemap against every page

Check 6, added in Phase 9. Every built page that is not `noindex` must appear in
`dist/sitemap-0.xml`, its `<xhtml:link>` set must equal the `hreflang` set in its own
`<head>`, and a `noindex` page must **not** appear.

It exists because the sitemap shipped for four phases with the alternates missing
from **twenty of its twenty-two URLs** and nothing noticed — `@astrojs/sitemap`'s
`i18n` option cannot pair localised slugs, and its failure mode is silence rather
than an error. Section 7 has the fix.

Two details, on the same reasoning as checks 4 and 5. The sets are compared **by
value, not counted**: the failure being guarded against is an *empty* set, which any
check that merely asked "is this URL listed?" would have passed. And the page's own
`<link rel="canonical">` is its identity, because `BaseLayout` builds the canonical
and the self-referencing alternate from one array — so a page this check can find at
all has already proved those two agree.

Confirmed to fail, not assumed: restoring the `i18n` option and rebuilding produced
twelve `sitemap: (none)` errors across the service pages in both locales.

### Why `check-html` fails on an oversized hero video

Check 7, added in Phase 10 with the hero video. Every file under **`public/video/`** must
be at or under **1.5 MB** — the same cap SPEC section 9 and PLAN Phase 10 both now state.
*(This said "tighter than SPEC section 9's 2 MB". SPEC's ceiling came down to 1.5 MB on
29 July 2026 and the two have agreed since.)*

It exists because that cap is **the one hero constraint a machine can actually check**. The
rest of PLAN's list is a judgement about footage — 8–16 seconds, no audio track, a scrimmed
background loop, is the shot any good — and none of that is mechanisable. A byte count is.
The CSS `@supports` gap is documented as a manual step for precisely the opposite reason,
so where a guard *can* be mechanical it should be one rather than a paragraph somebody is
trusted to have read. The failure it prevents is also a slow one: an oversized video does
not break the page, it just makes it expensive, and nothing else in the gate would notice.

**It reads `public/video/`, not `dist/video/`, and that is deliberate.** `public/` is what
the repository commits and it cannot silently pass. If Astro's static-copy behaviour ever
changed, or the directory were excluded from the build, a check reading `dist/` would
report success on a file it never saw — the silent-pass failure class checks 4, 5 and 6 all
exist to prevent, and this check should not reintroduce it at the moment it is added.

**An absent `public/video/` is not an error.** That is the no-footage state, which SPEC
section 9 calls a finished design rather than a missing asset, and it is what the repository
holds today.

Confirmed to fail, not assumed, and at the boundary rather than only in the obvious case: a
928 MB clip fails with its size reported; **1,572,864 bytes exactly passes and 1,572,865
fails**; an absent directory passes with `0 video file(s)`. The message prints the byte
counts as well as the megabytes, because a file one byte over rounds to *"1.50 MB exceeds
the 1.50 MB cap"*, which reads like a bug in the check rather than a file to re-encode.

### Lighthouse is run ad hoc and is NOT a project dependency

SPEC section 6 gates on Lighthouse ≥95 performance and ≥95 accessibility, but
Lighthouse is deliberately **not** in `package.json` and must not be added. It is
invoked one-off:

```
npx --yes lighthouse http://localhost:4321/ --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo
```

The dependency rule in CLAUDE.md protects what ships and what a future session
inherits. A measurement tool invoked by hand is neither. **A later session should
neither install it nor read its absence from the table in section 1 as a gap.**

Run it against `npm run preview`, never `astro dev` — dev serves unbundled and
unminified and the numbers are meaningless. Note that `preview` falls back to port
4322 if 4321 is taken, and a stale server from an earlier session on 4321 will answer
happily; check which one you are measuring.

**Localhost numbers are not the numbers that count.** The real run is against the
deployed site on Cloudflare's CDN, and it is on PLAN's launch checklist.

## 9. Deployment

**Cloudflare Pages, static.** Decided in Phase 9 — the reasoning is in section 1 and
is not to be relitigated. Connected to the GitHub repo; push to `main` deploys.
Preview deploys on branches. Rollback is redeploying a previous build, which is
instant.

**Project settings, none of which live in this repository:**

| Setting | Value |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22.12 or newer — Astro 7 will not build on Node 20 |
| Build environment variable | `PUBLIC_FORMSPREE_ID` |

Node is pinned three ways so it cannot drift: `.nvmrc`, `engines.node`, and the
host. Cloudflare Pages is documented to read `.nvmrc`, which this repo already
carries, but **set `NODE_VERSION` in the dashboard as well and confirm at the first
deploy** — that behaviour was not verified against Cloudflare's own build-configuration
page in Phase 9, and a silent fallback to an older Node would fail the build with a
message that does not say why.

**`PUBLIC_FORMSPREE_ID` must be set as a build variable, or the build fails.** That
is the Phase 6 guard working as designed, not a misconfiguration — see section 8. A
first deploy that errors on a missing environment variable is the intended outcome;
the alternative is a contact page that looks right and drops every enquiry.

### DNS — live

**`lendavhollandlane.ee` resolves and serves the site.** Confirmed by test on
26 July 2026, the same day the migration finished. What is done:

- Nameservers delegated from the Estonian registrar to Cloudflare.
- The apex and `www` both attached as custom domains on the Pages project.
- TLS live on both.
- **Cloudflare Email Routing active**, forwarding `info@lendavhollandlane.ee` to
  the operator's mailbox. A test message was sent and arrived.

**Both of the items this section listed as remaining are now done**, on
27 July 2026, and both were dashboard work. They have their own subsections
below: the `www` → apex Redirect Rule, and DNSSEC.

**A `.com` redirect is NOT confirmed.** This section previously specified a `.com`
→ `.ee` redirect under the old name, and no one has said whether a `.com` under
the new name is registered. Do not assume it is and do not buy one on the strength of this
line: if `lendavhollandlane.com` is or becomes ours, it redirects to the `.ee`
exactly as the old one would have; if it is not, there is nothing to configure
and the launch checklist item is a no-op.

**`.ee` is not a TLD Cloudflare Registrar sells.** The domain is registered at an
Estonian registrar and its **nameservers are pointed at Cloudflare**. Whoever does
this work should not go looking for `.ee` in the Cloudflare dashboard and conclude
something is wrong. Delegating the nameservers is also what makes apex CNAME
flattening available, which is what lets the apex point at a `pages.dev` project at
all.

**Email routing came up with the migration, and the suppressions are gone.**
`site.email` receives mail, tested. The three places that withheld it are
restored: `Footer.astro`'s email row, the `email` key in the sitewide
`LocalBusiness` JSON-LD, and the identifiers block in `Credentials`. That was the
whole of the "one line when it works" promise those files carried from Phase 6.

**Both redirects are dashboard and DNS work, not repository files.** A `_redirects`
file in `public/` matches on path, not on host, so it cannot express either of
them; the host-based rules are Cloudflare Bulk Redirects or Redirect Rules. Nothing
was added to the repo for them on purpose — a half-built redirect file that looks
like the job is done is worse than an empty slot on the blocked list.

### `www` → apex — done, as a Redirect Rule

A Cloudflare Redirect Rule named **"Redirect from WWW to root"** 301s
`https://www.lendavhollandlane.ee/*` to the apex, **preserving the path and the
query string**. Configured 27 July 2026. This closes the duplicate-content
question the canonical tag was mitigating rather than solving: the two hostnames
no longer serve identical HTML, because one of them no longer serves HTML at all.

**`www` remains a valid DNS record and a Pages custom domain, and that is not
leftover work.** The rule intercepts at the edge, which means it only runs for
requests that reach the zone — so the DNS record is what makes the redirect
reachable. **Deleting the record would break the redirect rather than enforce
it**: `www` would stop resolving, and a visitor who typed it would get a DNS
failure instead of a 301 to the page they wanted. Leave both in place.

### DNSSEC — active, and this is the one that can take the whole domain down

Cloudflare signs the zone, and the **DS record is published at the `.ee` registry
via Zone.ee**, which acts here as *registrar* rather than as DNS host — the
nameservers are still Cloudflare's. The published DS is **key tag 2371, algorithm
13 (ECDSAP256SHA256), digest type 2 (SHA-256)**.

**The standing hazard, which is why this is written down rather than just marked
done.** If the nameservers are ever moved off Cloudflare — to Zone.ee, to another
host, in an emergency, for any reason — then **DNSSEC must be disabled at
Cloudflare and the DS record removed at Zone.ee *before* the switch, and the old
DS TTL must be allowed to expire.** Otherwise validating resolvers cannot build a
chain of trust to the new nameservers and return **SERVFAIL for the entire
domain**. Not a degraded site: no website and **no email**, for everyone whose
resolver validates, until the DS is withdrawn and the TTL runs out. A nameserver
change that would otherwise be a five-minute job becomes an outage of unknown
length, and the failure looks like the new host being broken rather than like the
old signature still being enforced.

### Managed robots.txt — turned off, deliberately

**Cloudflare's "Managed robots.txt" setting (AI Crawl Control → Overview) was
enabled by default and was rewriting the `/robots.txt` this site serves.** What
the edge returned was not `public/robots.txt`: it carried Content-Signal
declarations and `Disallow` rules for ClaudeBot, GPTBot, Google-Extended,
Amazonbot and five other crawlers, none of which is in this repository and none
of which any session here had decided on. It was switched off on 27 July 2026, so
**`public/robots.txt` is again the single source for what crawlers are told.**

**This is the fourth instance of the external-dashboard hazard pattern**, with
Formspree's reCAPTCHA and domain restriction (section 6) and Cloudflare's Web
Analytics beacon injection (section 1). It has the same shape as the other three:
a default-on toggle in someone else's UI changes what visitors — here, crawlers —
receive, with no commit, no build and no trace in the repository.

**No build check can catch it, and this one is worth stating plainly because
`scripts/check-html.mjs` catches so much else.** Nothing in this project fetches
the served `robots.txt` and compares it against the repo's copy; `npm run verify`
runs against `dist/`, where the file is correct by construction. The check that
would catch it is an assertion about a live URL, which no build-time gate can
make. Re-checking the setting is on PLAN's launch checklist for the same reason
the Web Analytics toggle is.

**Why AI crawlers are allowed, since the default was to block them.** This site's
purpose is lead generation, not traffic monetisation — SPEC section 1. Nothing
here is sold by the pageview, so a crawler that reads the site and never sends a
visitor costs us nothing, while an AI assistant that can name a Tallinn drone
roof-cleaning operator with a published price and a stated authorisation is a
discovery channel of exactly the kind SPEC section 2 describes. **Being citable
is upside.** The calculus would be different for a publisher; it is not one.

### Email — receive-only, and outbound is not domain-aligned

**Cloudflare Email Routing forwards mail; it does not send it.** That is the
limitation, and it is a property of the service rather than a misconfiguration.
`info@lendavhollandlane.ee` receives and forwards correctly, which is what the
site's contact routes depend on.

**Outbound mail as `info@lendavhollandlane.ee` currently goes through Gmail's
SMTP with an App Password.** The consequence is that **SPF and DKIM validate as
`gmail.com`, not as `lendavhollandlane.ee`** — the message is authenticated, but
against the wrong domain, so neither mechanism is *aligned* with the From
address. The domain publishes **no DMARC record**, and alignment is only enforced
by DMARC, so in practice this is accepted and mail is delivered.

**What this means for anyone changing DNS: publishing a strict DMARC policy would
break outbound mail.** `p=quarantine` or `p=reject` on this domain, with outbound
still going through Gmail SMTP, would fail every reply the business sends to a
customer — including quotes, which is the one message this whole site exists to
produce. Do not add a DMARC record as a routine hardening step without changing
the sending path first.

**The upgrade path is a real mailbox on the domain**, with SPF and DKIM published
for it so both align — Zone Premium Email at €3.95/month billed annually is the
obvious candidate, alongside the domain that is already registered there. It
would also make DMARC safe to publish. **Deferred until there is revenue**, as a
cost decision rather than a technical one; see section 10.

### Search Console and Bing — registered

**Google Search Console: a Domain property, `sc-domain:lendavhollandlane.ee`.**
The domain form was chosen over a URL-prefix property because it covers every
subdomain and both protocols at once, which is the right shape for a site that
also answers on `www` and redirects it. Verification was automatic — Cloudflare
wrote the TXT record itself, being both the DNS host and the integration:

```
google-site-verification=3oEQO-IRgRFsDkug9tzD-7IMVyEWYo4KkCWxP3QLZoY
```

**That TXT record on the apex must not be deleted.** It is the only thing holding
the verification, and removing it during an unrelated DNS tidy-up would drop the
property — taking with it the ranking data that ARCHITECTURE section 1 names as
the reason this site runs no analytics at all.

`sitemap-index.xml` has been submitted. The site is also registered with **Bing
Webmaster Tools**.

## 10. Decisions deliberately deferred

Whether Decap CMS is ever needed (only if publishing becomes a real blocker) · Russian (structure is ready, content is not).

**Whether the inspection business gets a section here or its own domain — still deferred, but the question has narrowed.** As of 8 August 2026 it is **one static page per locale on this site**, plus a card on each home page: the smallest shape the question has, taken because it cost two route-map values and no pairing code (section 3). What is still open is whether it ever earns a `/inspektsioon/*` section with pages of its own — at which point it becomes a content collection and the section 3 reasoning runs the other way — or a separate domain. **Neither is decided by the page existing**, and a future session should not read the page as a commitment to either.

**A real mailbox on the domain, so outbound mail is domain-aligned.** Today
outbound goes through Gmail SMTP and authenticates as `gmail.com`; the domain
publishes no DMARC, so it is delivered. A hosted mailbox — Zone Premium Email at
€3.95/month annually, for instance — would align SPF and DKIM and make a DMARC
policy safe to publish. **Deferred until there is revenue.** It is a recurring
cost against a business that has not yet taken a job, and nothing is broken while
it waits. Section 9 has the detail and the one thing not to do meanwhile, which
is publish DMARC without moving the sending path first.

**Analytics and hosting came off this list in Phase 9.** Both are decided, in section 1: Cloudflare Pages, and no analytics at all. The analytics slot being empty is the decision — do not read it as a gap and fill it.
