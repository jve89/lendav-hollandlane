import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

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
    }),
  ],
})
