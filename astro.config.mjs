import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

/** `https://lennupesu.ee/teenused/` -> `https://lennupesu.ee/teenused`. The root keeps its slash. */
const stripTrailingSlash = (url) =>
  url.endsWith('/') && new URL(url).pathname !== '/' ? url.slice(0, -1) : url

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
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'et', locales: { et: 'et-EE', en: 'en-GB' } },
      // The 404 pages are real routes but must never be submitted for indexing.
      filter: (page) => !/\/404\/?$/.test(page),
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
