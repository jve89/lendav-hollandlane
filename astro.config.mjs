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
      i18n: { defaultLocale: 'et', locales: { et: 'et-EE', en: 'en-GB' } },
      filter: (page) => !noIndexPaths.test(page),
      /**
       * One URL form for the whole site: NO TRAILING SLASH, except the root.
       *
       * The integration builds its entries from the emitted file paths, which
       * under the directory build format all end in a slash. Every other URL
       * the site publishes — `routes.ts`, canonical, hreflang, every internal
       * link — has no trailing slash, so without this the sitemap submitted a
       * second spelling of every page.
       */
      serialize: (item) => ({
        ...item,
        url: stripTrailingSlash(item.url),
        links: item.links?.map((link) => ({ ...link, url: stripTrailingSlash(link.url) })),
      }),
    }),
  ],
})
