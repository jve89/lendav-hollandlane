/**
 * The form endpoint, composed in one place.
 *
 * `formspree.io` is typed here and nowhere else, for the same reason no
 * component types a phone number: when the provider or the account changes it
 * changes in one line. See CLAUDE.md, "The single-source rule". The id itself is
 * not here — it is environment configuration, not business data, so it does not
 * belong in `site.ts` either.
 *
 * THE IMPORT BELOW IS THE GUARD. `astro:env/client` is validated against
 * `env.schema` in `astro.config.mjs`, where `PUBLIC_FORMSPREE_ID` is declared
 * required — so a missing or empty value fails `astro build` rather than
 * producing a form that posts nowhere. Reading `import.meta.env` directly would
 * compile, inline `undefined`, and ship a broken contact page that passes every
 * gate. Do not "simplify" this import back to `import.meta.env`.
 *
 * The value is public by design: it is visible in the `action` attribute of
 * every built contact page. Nothing is being hidden here.
 */
import { PUBLIC_FORMSPREE_ID } from 'astro:env/client'

/**
 * Where the quote form POSTs.
 *
 * Native `<form action method="POST">` — no `@formspree/ajax`, no
 * `@formspree/react`. Both are client-side JavaScript dependencies, the
 * dependency list in ARCHITECTURE section 1 is closed, and a form that works
 * with JavaScript disabled is the reason this stack was chosen at all.
 */
export const formspreeAction = `https://formspree.io/f/${PUBLIC_FORMSPREE_ID}`
