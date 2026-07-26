import { readFile } from 'node:fs/promises'
import { defineConfig, envField } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { satteri } from '@astrojs/markdown-satteri'

/** `https://lennupesu.ee/teenused/` -> `https://lennupesu.ee/teenused`. The root keeps its slash. */
const stripTrailingSlash = (url) =>
  url.endsWith('/') && new URL(url).pathname !== '/' ? url.slice(0, -1) : url

/**
 * Pages that are real routes but must never be submitted for indexing.
 *
 * The 404s, and the two thank-you pages: both are `noindex` in their own
 * `<head>`, and submitting a noindexed URL in the sitemap tells a crawler two
 * contradictory things about the same page. A thank-you page also has no
 * standalone value in results — it is only meaningful directly after a POST.
 */
const noIndexPaths = /\/(404|aitah|thank-you)\/?$/

/**
 * THE SITEMAP'S hreflang ALTERNATES ARE READ BACK OUT OF THE BUILT PAGES.
 *
 * The integration's own `i18n` option cannot do this for us. It groups URLs into
 * alternate sets by STRIPPING THE LOCALE PREFIX AND MATCHING THE REMAINING PATH,
 * which only works when the two locales share a slug. Ours never do — CLAUDE.md
 * forbids it, because an Estonian searcher must land on an Estonian URL. So
 * `teenused/katusepesu` and `services/roof-cleaning` were two different keys and
 * NEITHER GOT AN `<xhtml:link>` AT ALL. Only `/` and `/en` paired, because the
 * Estonian home page's path after prefix-stripping is empty in both. Twenty
 * pages shipped with no alternates; the option is dropped below.
 *
 * PLAN proposed rebuilding the map here from `i18n/collections.ts`. That cannot
 * be done, and the reason is worth keeping so the next session does not try it:
 * those helpers are pure and importable, but the SERVICE SLUGS are not. They live
 * in collection frontmatter and reach code only through `astro:content`, a virtual
 * module that does not exist while this config is being evaluated — and the
 * content-layer store is not populated that early even if it did. Re-parsing the
 * markdown with `fs` at config time would be a second parser for data the content
 * layer already owns, and a second parser is a second answer.
 *
 * So the alternates come from the one place that already has them right:
 * `BaseLayout` emits a correct, slug-paired hreflang set into the `<head>` of
 * every page, including `x-default`. This lifts that set back out of the built
 * HTML. The sitemap and the `<head>` are then THE SAME BYTES, so they cannot
 * drift — which is a stronger guarantee than rebuilding them from a shared
 * function would have given.
 *
 * Three facts make it safe, all verified against the installed source rather
 * than assumed:
 *
 *  - `astro:build:done` fires AFTER `viteBuild()` has written `dist/`
 *    (`astro/dist/core/build/index.js`), which is the same window Pagefind and
 *    the HTML-compression integrations read the output in.
 *  - `serialize` is awaited per item — `await Promise.resolve(serialize(item))`
 *    in `@astrojs/sitemap/dist/index.js` — so it may be async and do file I/O.
 *  - The `xhtml` namespace is declared unconditionally, from
 *    `SITEMAP_CONFIG_DEFAULTS.namespaces`, NOT from the `i18n` option. Dropping
 *    `i18n` therefore does not invalidate the XML.
 *
 * `scripts/check-html.mjs` check 6 is the second, independent guard: it asserts
 * on the finished sitemap that every indexable page is listed and that its
 * alternate set matches its own `<head>`.
 */
const DIST = 'dist'

/** Astro emits `<link rel="alternate" hreflang="et-EE" href="...">`. Attribute order is not assumed. */
const ALTERNATE_LINK = /<link\b[^>]*\brel="alternate"[^>]*>/gi

async function alternatesFromBuiltPage(url) {
  const { pathname } = new URL(url)

  /* Directory build format, so every page is `<path>/index.html`. The flat
     `404.html` form is never reached: `noIndexPaths` filters it out first. */
  const file = `${DIST}${pathname.endsWith('/') ? pathname : `${pathname}/`}index.html`

  let html
  try {
    html = await readFile(file, 'utf8')
  } catch (cause) {
    throw new Error(
      `sitemap: could not read ${file} to recover the hreflang set for ${url}. The sitemap's ` +
        `alternates are lifted out of the built pages; if the output layout has changed, this ` +
        `function must change with it rather than silently emitting a sitemap without them.`,
      { cause },
    )
  }

  const links = []
  for (const tag of html.matchAll(ALTERNATE_LINK)) {
    const lang = /\bhreflang="([^"]+)"/i.exec(tag[0])?.[1]
    const href = /\bhref="([^"]+)"/i.exec(tag[0])?.[1]
    if (lang && href) links.push({ lang, url: stripTrailingSlash(href) })
  }

  /* Loudly, not quietly. Shipping a sitemap whose alternate sets have silently
     vanished is the exact failure this replaces, and it was invisible for four
     phases. A page that cannot produce its own hreflang set fails the build. */
  if (links.length === 0) {
    throw new Error(
      `sitemap: ${file} carries no <link rel="alternate"> tags, so ${url} would be listed with ` +
        `no hreflang alternates. Every page goes through BaseLayout, which emits them — if this ` +
        `fires, either that changed or this parser did.`,
    )
  }

  return links
}

/**
 * Strip HTML comments out of rendered markdown.
 *
 * The `<!-- unconfirmed: ... -->` and `<!-- needs-native-review -->` markers are a
 * repo convention (CLAUDE.md): they record what the business has not confirmed, and
 * they are for us, not for the visitor. Astro throws away JS comments in `.astro`
 * frontmatter, which is why `meist.astro` was never affected — but a comment in a
 * markdown body is content, and it rendered. Thirty-seven of them shipped: internal
 * English engineering notes, citing PLAN by phase number, on Estonian customer
 * pages. `scripts/check-html.mjs` check 4 fails the build if any ever comes back.
 *
 * This runs on the hast tree rather than on serialized HTML, and that is the whole
 * reason it is safe. A fenced code block is a `<pre>` of escaped text nodes, never a
 * comment node, so a post that *displays* HTML source cannot be reached from here. A
 * regex over `dist/` could not tell those two apart.
 *
 * The `raw` visitor is all-or-nothing on purpose: it drops a raw node that is
 * comments and whitespace only, and leaves a node with mixed content alone rather
 * than rewriting authored markup behind the author's back. A comment that survives
 * because it was embedded in real HTML then fails check 4 loudly, and a human
 * decides what to do about it.
 */
const stripHtmlComments = {
  name: 'lennupesu-strip-html-comments',
  comment: (node, ctx) => ctx.removeNode(node),
  raw: (node, ctx) => {
    if (node.value.replace(/<!--[\s\S]*?-->/g, '').trim() === '') ctx.removeNode(node)
  },
}

export default defineConfig({
  site: 'https://lennupesu.ee',
  output: 'static',
  trailingSlash: 'ignore',
  // Stated, not inherited. Astro 7 changed the default from true to 'jsx',
  // which strips whitespace between elements — including the significant
  // space in markup like `<a>x</a> <a>y</a>`.
  compressHTML: true,
  i18n: {
    defaultLocale: 'et',
    // Adding 'ru' here is the whole job. See ARCHITECTURE.md section 3.
    locales: ['et', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  /**
   * Sätteri is Astro 7's markdown processor. Naming it here is what lets us add a
   * hast plugin; `markdown.rehypePlugins` is a deprecated shim that throws unless
   * `@astrojs/markdown-remark` is installed, and it is not. See ARCHITECTURE
   * section 5. Astro appends its own hast plugins — highlighting, image marking,
   * heading ids — around ours, so setting `processor` explicitly loses none of them.
   */
  markdown: {
    processor: satteri({ hastPlugins: [stripHtmlComments] }),
  },
  /**
   * THE BUILD FAILS IF `PUBLIC_FORMSPREE_ID` IS MISSING OR EMPTY. That is the
   * whole reason this block exists, and it is not decoration.
   *
   * `import.meta.env` is inlined at build time in a static build, so a deploy
   * host with no environment variable set produces a contact form whose
   * `action` points at nothing — and `npm run verify` passes, because the page
   * builds and every link resolves. A contact page that looks right and
   * silently drops every enquiry is the worst failure this site can have: it is
   * invisible until someone asks why nobody is calling.
   *
   * Verified against Astro 7.1.3's own source rather than assumed:
   * `astro/dist/env/vite-plugin-env.js` coerces `''` to `undefined` before
   * validating, so `optional: false` rejects an empty value as well as an
   * absent one — both halves of the requirement, with no `min` needed. It
   * throws from `buildStart()`, so `astro build` is where it fires. It
   * deliberately does not throw during `astro sync`, which is why `npm run
   * verify` can still generate types before it builds.
   *
   * `scripts/check-html.mjs` check 5 is the second, independent guard: it
   * asserts on the built output that no `<form>` posts to an empty or relative
   * action. If a future session deletes this block, that one still fires.
   */
  env: {
    schema: {
      PUBLIC_FORMSPREE_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: false,
      }),
    },
  },
  integrations: [
    sitemap({
      /**
       * NO `i18n` OPTION, DELIBERATELY. It cannot pair localised slugs — see
       * `alternatesFromBuiltPage` above, which replaces it. Do not restore it:
       * it would overwrite the correct alternate sets with the empty ones that
       * shipped for four phases.
       *
       * Dropping it also drops the integration's own status-code-page
       * exclusion, which derived its locale list from this option. Nothing is
       * lost — `noIndexPaths` in the filter below already covers `/404`,
       * `/en/404`, `/aitah` and `/en/thank-you`, and covers them by intent
       * rather than by filename convention.
       */
      filter: (page) => !noIndexPaths.test(page),
      /**
       * One URL form for the whole site: NO TRAILING SLASH, except the root.
       *
       * The integration builds its entries from the emitted file paths, which
       * under the directory build format all end in a slash. Every other URL
       * the site publishes — `routes.ts`, canonical, hreflang, every internal
       * link — has no trailing slash, so without this the sitemap submitted a
       * second spelling of every page.
       *
       * The alternates are resolved BEFORE the URL is stripped, because the
       * lookup needs the directory path that names the file on disk.
       */
      serialize: async (item) => ({
        ...item,
        links: await alternatesFromBuiltPage(item.url),
        url: stripTrailingSlash(item.url),
      }),
    }),
  ],
})
