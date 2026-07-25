import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://lennupesu.ee',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'et',
    // Adding 'ru' here is the whole job. See ARCHITECTURE.md section 3.
    locales: ['et', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [sitemap({ i18n: { defaultLocale: 'et', locales: { et: 'et-EE', en: 'en-GB' } } })],
})
