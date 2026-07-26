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
 * `@formspree/react`. Both are client-side JavaScript dependencies and the
 * dependency list in ARCHITECTURE section 1 is closed.
 *
 * `QuoteForm.astro` DOES submit this endpoint by `fetch`, and that rejection
 * stands rather than being softened by it: the whole AJAX path is 23
 * inline lines with no package behind them, which is the argument against both
 * libraries made concrete. The native POST remains the baseline — a form that
 * still works with JavaScript disabled is the reason this stack was chosen at
 * all, and the script is an enhancement on top of it, not a replacement for it.
 * See ARCHITECTURE section 2, "the second named exception".
 */
export const formspreeAction = `https://formspree.io/f/${PUBLIC_FORMSPREE_ID}`
